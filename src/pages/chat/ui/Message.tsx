import React from 'react';
import './Message.scss';
import createClassName from '../../../lib/RangleUI/utils/createClassName';

type OwnProps = {
  // message: {sender: string, date: Date, content: string};
  // isOwn: boolean;
  // sender: string | null
  message: string
}

const Message: React.FC<OwnProps> = ({message
  // isOwn,
  // sender
}) => {  
  return (
    <div className={
      createClassName("Message")
      }>
      <div className="content">
        {/* {sender && <div className='message-sender'>{sender}</div>} */}

        <div className="text">
          {message.content}
        </div>

        <div className="time">
          {/* {`${message.date.getHours()}:${message.date.getMinutes()}`} */}
        </div>
      </div>
    </div>
  );
}

export default Message;