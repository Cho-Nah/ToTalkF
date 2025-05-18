import { Button, Icon, Input } from "../../../lib/RangleUI/components";
import useInput from "../../../lib/RangleUI/hooks/useInput";
import "./Chat.scss";
import { chatApi } from "../../../app/services/ChatServise";
import { connectWsApi } from "../../../app/services/ConnectWs";
import { authAPI } from "../../../app/services/AuthService";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setMessages } from "../slice";
import Message from "./Message";

type OwnProps = {
  chatid: number
}

const Chat: React.FC<OwnProps> = ({chatid}) => {
  const {data: userData} = authAPI.useGetUserQuery({});
  connectWsApi.useConnectQuery(chatid);
  const {data: message} = chatApi.useConnectQuery(chatid);

  const [sendWsMessage] = chatApi.useSendMessageMutation();

  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.messages);

  useEffect(() => {
    if (message && message[0]) {
      dispatch(setMessages(message[0]));
    }
  }), [message];

  const messageInput = useInput("");

  const handleSendMessage = async (message: string) => {
    if (!messageInput.value.trim()) return;
    messageInput.clear();

    if (userData) {
      await sendWsMessage({message, sender: userData?.name, chatId: chatid});
    }
  }

  return (
    <div className="layout">
      <div className="layout-block Chat">
          <div id="messages">
          {messages.length !== 0 && messages.map((message, id) => <Message
            content={message.content}
            isOwn={message.sender === userData?.name}
            sender={messages[id + 1] && messages[id + 1].sender === message.sender
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