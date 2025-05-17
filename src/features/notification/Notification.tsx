import { useContext, useEffect, useRef, useState } from "react";
import { Button, Icon, Ripple, Window } from "../../lib/RangleUI/components";
import { ManagerContext } from "../../lib/RangleUI/components/ui/WindowManager";

import "./Notification.scss";

// type OwnProps = {
//   name: string;
//   desc: string;
//   chatId: number;
// }

const Notification = () => {
  const manager = useContext(ManagerContext);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  const handleWindowTransfer = () => {
    manager.createWindow(
      <Window title={`Notify`}>
        <div>hello</div>
      </Window>
    );
  }

  useEffect(() => {
    if (!isNotifyOpen) return;
      const id = setTimeout(() => {
        setIsNotifyOpen(false);
      }, 6000);

      return () => clearTimeout(id);
  }, [isNotifyOpen]);

  useEffect(() => {
      const id = setInterval(() => {
        setIsNotifyOpen(true);
      }, 7000)

      return () => clearInterval(id);
  }, []);

  console.log(isNotifyOpen);
  

  return (
    isNotifyOpen && 
    <div className="notify-container">
      <div className="notify ripple" onClick={handleWindowTransfer}>
          {/* <Badge 
            color="primary"
            className="icon-wrapper"
            icon={{ name: "exclamation", className: "icon"}}
          /> */}
          <Button color="primary" className="circle-indicator">
            <Icon 
             name="exclamation"
             className="icon"
            />
          </Button>

          <div>
            <div className="title">
              You successfully registreted in meeting!
            </div>
            <div className="caption">
              Click to see more
            </div>
          </div>
        <Ripple />
      </div>
    </div>
  );
}

export default Notification;