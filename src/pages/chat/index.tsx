import ChatWidget from "./ui/ChatWidget";

import "./ChatList.scss";
import { TabList } from "../../lib/RangleUI/components";
import { useState } from "react";

const ChatList = () => {
  // const [sendUserData, {isError}] = authAPI.useSendSignInMutation();
  const [currentTab, setCurrentTab] = useState("All");

  const chats = [
    {
      name: "Pringles",
      lastMessage: "lorem implusm si ledolur",
      tags: ["All", "Guests"],
    },
    {
      name: "Potatos",
      lastMessage: "lorem implusm si ledolur",
      tags: ["All", "Organisators"],
    },
    {
      name: "Cucumbers",
      lastMessage: "lorem implusm si ledolur",
      tags: ["All", "Guests"],
    },
    {
      name: "Venom",
      lastMessage: "lorem implusm si ledolur",
      tags: ["All", "Guests"],
    },
    {
      name: "Gojo Satoru",
      lastMessage: "Я на русском пишу чел",
      tags: ["All", "Organisators"],
    },
    {
      name: "Миша рипает",
      lastMessage: "lorem implusm si ledolur",
      tags: ["All", "Guests"],
    },
    {
      name: "Секретный",
      lastMessage: "lorem implusm si ledolur",
      tags: ["All", "Guests"],
    },
    {
      name: "Vuperr",
      lastMessage: "lorem implusm si ledolur",
      tags: ["All", "Organisators"],
    },
    {
      name: "Mickhail lomonos",
      lastMessage: "изысканные буквы",
      tags: ["All", "Guests"],
    },
  ];

  return (
    <div className="layout Chatlist">
      {/* <TabList></TabList>       */}
      <div className="layout-block list pad-0">
        <TabList
          className="pad-inline-05"
          isRipple
          // type="secondary"
          value={currentTab}
          isHoverDisabled
          onSwitch={setCurrentTab}
          tabs={[
            { value: "All" },
            { value: "Guests" },
            { value: "Organisators" },
          ]}
        />
        {chats
          .filter((cell) => cell.tags.includes(currentTab))
          .map((chat, id) => (
            <ChatWidget
              name={chat.name}
              desc={chat.lastMessage}
              chatId={id}
              key={id}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatList;
