import React from 'react';

function Message(props) {
    console.log(props);

    return (
        <div>
            <h2>{props.text}</h2>
        </div>
    )
}

export default Message;