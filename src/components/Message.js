import "./Message.css";

function Message({text}) {
    return (
        <div className="message-container">
            <p className="message-scroll">{text}</p>
        </div>
    )
}

export default Message;