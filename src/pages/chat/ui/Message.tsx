import React from 'react';
import './Message.scss';
import createClassName from '../../../lib/RangleUI/utils/createClassName';

type OwnProps = {
  message: {senderId: number, date: Date, content: string};
  isOwn: boolean;
}

const Message: React.FC<OwnProps> = ({message, isOwn}) => {
  console.log(message.date.getHours());
  
  return (
    <div className={createClassName("Message", isOwn && "own")}>
      <div className="content">
        <div className="text">
          {message.content}
        </div>

        <div className="time">
          {`${message.date.getHours()}:${message.date.getMinutes()}`}
        </div>
      </div>
    </div>
  );
}

export default Message;