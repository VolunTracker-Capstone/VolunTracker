import NotificationBox from ".//user/AccountSuccessNotification.jsx";

function NotificationTest() {
    return (
        <div className="NotificationTest">
            <h1>Notification Test</h1>
            <button>Open notification</button>
            <NotificationBox visible={true} text={"my notification"} />
        </div>
    );
}

export default NotificationTest