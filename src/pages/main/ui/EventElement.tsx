import { useContext } from "react";
import { Ripple, Window } from "../../../lib/RangleUI/components";
import type { IEvent } from "../../../models/event";
import { getTime } from "../../../utils/date";

import "./Event.scss";
import { ManagerContext } from "../../../lib/RangleUI/components/ui/WindowManager";
import EventPage from "../../event";

const EventElement: React.FC<IEvent> = ({name, slots, selectedSlots, contacts, time, inQueue}) => {
  const manager = useContext(ManagerContext);

  const handleWindowTransfer = () => {
    manager.createWindow(
      <Window title={`${name} Event`}>
        <EventPage tagName={contacts} selectedSlots={selectedSlots} slots={slots} id={1} />
      </Window>
    );
  }
  
  return (
    <div className="ripple full-size event" onClick={handleWindowTransfer}>
      <div className="between">
        <div className="block-title">
          {name}
        </div>

        <div className="block-title">
          {selectedSlots}/{slots}
        </div>
      </div>

      <div className="link small-link">
          {contacts}
      </div>

      <div className="block-caption">
        Время начала {time}
      </div>

      {inQueue
      ? <div className="block-caption">
          Людей в очереди: {inQueue}
        </div>
      : <div className="success">
          Регистрация открыта
        </div>
      }
      <Ripple />
    </div>
  );
}
export default EventElement;