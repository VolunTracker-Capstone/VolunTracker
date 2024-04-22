import React from "react";

// eslint-disable-next-line react/prop-types
function AccountSuccessNotification({visible, text}){
    if (!visible) {
        return <></>;
    }
    return <div className="notification">{text}</div>;
}
export default AccountSuccessNotification
