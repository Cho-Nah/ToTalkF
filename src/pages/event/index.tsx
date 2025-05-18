import { useContext, useState } from "react";
import { Button, Window } from "../../lib/RangleUI/components"
import { ManagerContext } from "../../lib/RangleUI/components/ui/WindowManager";
import Chat from "../chat/ui/Chat";

type OwnProps = {
  tagName: string;
  slots: number;
  selectedSlots: number;
}

const EventPage: React.FC<OwnProps> = ({tagName, slots, selectedSlots}) => {
  const manager = useContext(ManagerContext);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleWindowTransfer = () => {
      manager.createWindow(
        <Window title="Chat" className="">
          <Chat />
        </Window>
      );
    }

  return (
    <div className="layout">
      <div className="layout-block">
        <Button 
          className="full-width"
          children="Чат"
          isDisabled={isRegistered ? false : true}
          isRipple
          onClick={handleWindowTransfer}
        />
      </div>
      <div className="layout-block">
        <div className="layout-title">
          Overview
        </div>
        <div className="layout-subtitle">
          What is Rangle?
        </div>
        RangleUI is a set of react components and utilities for the rapid development of web applications. 
        The library includes all the main UI units from buttons and input fields to modals and windows.
        This is not a framework, Rangle provides ready-made interactive and styled components, 
        but does not tell you how you should build your application.
        <br /><br/>
        Posted by <a className="link" href={`https://t.me/${tagName.slice(1)}`}>{tagName}</a>
      </div>

      <div className="layout-block">
        <Button 
          isRipple
          className="full-width"
          children={`Записаться ${selectedSlots + +isRegistered}/${slots}`}
          isDisabled={selectedSlots === slots ? true : false}
          onClick={() => setIsRegistered(prev => !prev)}
        />
      </div>
    </div>
  );
}
export default EventPage;