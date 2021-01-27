import React from 'react';
import { Card, CardContent, Typography} from '@material-ui/core';
import './Message.css';

const Message = React.forwardRef(({username, message},ref) => {
        const isUser = username === message.username;

    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? "message__userCard": "message__guestCard" }>
                <CardContent>
                    <Typography color="textPrimary" variant="h5" component="h2">
                            {!isUser && `${message.username  || 'Anonymous'}: `} {message.data}
                        </Typography>
                </CardContent>
            </Card>
        </div>
    )
});

export default Message;