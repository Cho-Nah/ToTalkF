import React from 'react';
import './Message.scss';
import createClassName from '../../../lib/RangleUI/utils/createClassName';

type OwnProps = {
  sender: string | null,
  date: Date,
  content: string;
  isOwn: boolean
}

const Message: React.FC<OwnProps> = ({
  content,
  isOwn,
  date,
  sender,
}) => {
  return (
    <div className={createClassName("Message", isOwn && "own")}>
      <div className="content">
        {sender && <div className='message-sender'>{sender}</div>}

        <div className="text">
          {content}
        </div>

        <div className="time">
          {`${date.getHours()}:${date.getMinutes()}`}
        </div>
      </div>
    </div>
  );
}

export default Message;