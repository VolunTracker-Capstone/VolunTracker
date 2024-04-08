import {useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const abortContr = new AbortController();
        fetchData(abortContr.signal);
        return () => {
            // Want to stop the fetch
            abortContr.abort();

        }
    }, [url]); // Whenever URL changes rerun
    const fetchData = (signal) => {
        fetch(url, {signal: signal})
            .then(resp => {
                if (!resp.ok) {
                    throw Error("Cannot fetch URL data for resource")
                }
                return resp.json()
            }).then(data => {
            setIsPending(false);
            setData(data);
            setError(null);
        }).catch((err) => {
            if (err.name === 'AbortError') {
                console.log("Fetch Aborted->")
                console.log(err.message);
            } else {
                console.log("Error:");
                console.log(err.message);
                setIsPending(false);
                setError(err.message);
            }
        });
    }
    console.log(data);
    return {data, isPending, error, fetchData}
}
export default useFetch;