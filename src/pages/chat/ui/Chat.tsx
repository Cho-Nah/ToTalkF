import { Button, Icon, Input } from "../../../lib/RangleUI/components";
import useInput from "../../../lib/RangleUI/hooks/useInput";
import "./Chat.scss";
import { chatApi } from "../../../app/services/ChatServise";
import { connectWsApi } from "../../../app/services/ConnectWs";
import Message from "./Message";

type OwnProps = {
  chatid: number
}

const Chat: React.FC<OwnProps> = ({chatid}) => {
  const {data} = connectWsApi.useConnectQuery(chatid);
  const {data: messages} = chatApi.useConnectQuery(chatid);

  // setupSocketListeners(store, chatid);
  console.log(messages);
  
  const [sendWsMessage] = chatApi.useSendMessageMutation();

  const messageInput = useInput("");
  const myId = "Me";
  // const [messages, setMessages] = useState([{
  //   sender: "Pete",
  //   content: "Далеко-далеко за словесными горами в стране гласных и согласных", date: new Date()
  // }, {
  //   sender: "Me",
  //   content: "Грамматики снова заманивший моей жаренные заголовок имеет своих маленькая, точках сих.", date: new Date()
  // }, {
  //   sender: "YXUNGGG",
  //   content: "Ему рыбного курсивных свой проектах ее своих переписали ведущими!", date: new Date()
  // }]);

  const handleSendMessage = async (message: string) => {
    if (!messageInput.value.trim()) return;
    messageInput.clear();

    await sendWsMessage({message, chatId: chatid});
    // setMessages(prev => [...prev, {sender: "Me", content: messageInput.value, date: new Date()}]);
  }

  // Keyboard.register("Enter", handleSendMessage);
  // const chatMessages = messages ? messages.filter(message => message.chatId === currentChat?.id) : [];
  
  return (
    <div className="layout">
      <div className="layout-block Chat">
          <div id="messages">
          {messages && messages.map((message, id) => <Message
            message={message}
            // isOwn={message.sender === myId}
            // sender={messages[id + 1] && messages[id + 1].sender === message.sender 
              // ? null : message.sender}
            key={id}
          />)}
        </div>

        {/* <div className="flex-gap apsolute-bottom chat-controllers"> */}
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