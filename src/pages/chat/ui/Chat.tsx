import { Button, Icon, Input } from "../../../lib/RangleUI/components";
import useInput from "../../../lib/RangleUI/hooks/useInput";
import "./Chat.scss";
import { chatApi } from "../../../app/services/ChatServise";
import { authAPI } from "../../../app/services/AuthService";

import Message from "./Message";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setMessages } from "../slice";

type OwnProps = {
  chatid: number
}

const Chat: React.FC<OwnProps> = ({chatid}) => {
  const { data: userData } = authAPI.useGetUserQuery({});
  const { data: messages = [] } = chatApi.useConnectQuery(chatid);
  const [sendWsMessage] = chatApi.useSendMessageMutation();

  const myMessages = useAppSelector(state => state.messages);
  const dispatch = useAppDispatch();

  const messageInput = useInput("");

  useEffect(() => {
    if (messages.length === 0) return;
    if (myMessages[myMessages.length - 1] === messages[0]) return;
    dispatch(setMessages(messages));
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!messageInput.value.trim()) return;
    messageInput.clear();

    if (userData) {
      await sendWsMessage({ 
        message, 
        sender: userData.name, 
        chatId: chatid 
      });
    }
  };

  return (
    <div className="layout">
      <div className="layout-block Chat">
          <div id="messages">
          {myMessages.length !== 0 && myMessages.map((message, id) => <Message
            content={message.content}
            isOwn={message.sender === userData?.name}
            sender={myMessages[id + 1] && myMessages[id + 1].sender === message.sender
              ? null : message.sender
            }
            date={new Date()}
            key={id}
          />)}
        </div>

        <div className="layout-block user-controller">
          <div className="flex-gap">
            <Input
              placeholder="Message..."
              value={messageInput.value}
              onChange={messageInput.onChange}
              isNativePlaceholder
            />
            <Button
              className="send-button"
              isRipple
              isDisabled={messageInput.value.trim() ? false : true}
              onClick={() => handleSendMessage(messageInput.value)}
            >
              <Icon name="send" isFilled />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chat;