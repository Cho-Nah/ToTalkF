import { useState } from "react";
import { Button, Input } from "../../../lib/RangleUI/components";
import useInput from "../../../lib/RangleUI/hooks/useInput";
import "./Chat.scss";
import Message from "./Message";

const Chat = () => {
  const messageInput = useInput("");
  const myId = 1;
  const [messages, setMessages] = useState([
    {
      senderId: 3,
      content:
        "Далеко-далеко за словесными горами в стране гласных и согласных",
      date: new Date(),
    },
    {
      senderId: 1,
      content:
        "Грамматики снова заманивший моей жаренные заголовок имеет своих маленькая, точках сих.",
      date: new Date(),
    },
    {
      senderId: 3,
      content:
        "Ему рыбного курсивных свой проектах ее своих переписали ведущими!",
      date: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    setMessages((prev) => [
      ...prev,
      { senderId: 1, content: messageInput.value, date: new Date() },
    ]);
    messageInput.clear();
  };

  // const chatMessages = messages ? messages.filter(message => message.chatId === currentChat?.id) : [];

  return (
    <div className="layout">
      <div className="layout-block Chat">
        <div id="messages">
          {messages.map((message, id) => (
            <Message
              message={message}
              isOwn={message.senderId === myId}
              key={id}
            />
          ))}
        </div>

        <div className="flex-gap">
          <Input
            placeholder="Message..."
            value={messageInput.value}
            onChange={messageInput.onChange}
          />
          <Button
            className="p-1"
            isRipple
            isDisabled={messageInput.value.trim() ? false : true}
            icon={{ name: "send", isFilled: true, className: "mar-0" }}
            onClick={handleSendMessage}
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
