import React, { useContext } from "react";
import { ManagerContext } from "../../../lib/RangleUI/components/ui/WindowManager";
import { Badge, Ripple, Window } from "../../../lib/RangleUI/components";
import Chat from "./Chat";
import { randomInt } from "../../../lib/RangleUI/utils/numbers";

type OwnProps = {
  name: string;
  desc: string;
  chatId: number;
}

const ChatWidget: React.FC<OwnProps> = ({name, desc, chatId}) => {
  const manager = useContext(ManagerContext);

  const handleWindowTransfer = (chatId: number) => {
    manager.createWindow(
      <Window title={`${name} Chat`}>
        <Chat />
      </Window>
    );
  }

  return (
    <div className="chat ripple" onClick={() => handleWindowTransfer(chatId)}>
      <div>
        <div className="title">
          {name}
        </div>
        <div className="caption">
          {desc}
        </div>
      </div>
        <div>
          <Badge children={randomInt(1, 8)} color={randomInt(0, 2) ? "neutral" : "primary"} />
        </div>
      <Ripple />
    </div>
  );
}

export default ChatWidget;