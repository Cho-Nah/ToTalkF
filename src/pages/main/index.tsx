import { useState } from "react";
import { TabList } from "../../lib/RangleUI/components";
import type { IEvent } from "../../models/event";

import EventElement from "./ui/EventElement";
import CreateChat from "../../features/createChat/CreateChat";

const MainPage = () => {
  const [currentTab, setCurrentTab] = useState("All Events");

  const events: IEvent[] = [{
    name: "Вяжем носки",
    slots: 8,
    selectedSlots: 3,
    tagName: "@AronSrg",
    time: Date.now(),  //timestamp
  },{
    name: "Пейнтбол",
    slots: 13,
    selectedSlots: 13,
    tagName: "@inpukk",
    time: Date.now(),  //timestamp
    inQueue: 3
  }];

  return (
    <div className="layout">
      <div className="layout-block pad-0">
        <TabList
          className="pad-inline-05"
          isRipple
          type="secondary"
          value={currentTab}
          isHoverDisabled
          onSwitch={setCurrentTab}
          tabs={[
            { value: "All Events" },
            { value: "My subs" },
          ]}
        />
          {events.map(event => <EventElement
            name={event.name}
            selectedSlots={event.selectedSlots}
            slots={event.slots}
            tagName={event.tagName}
            time={event.time}
            inQueue={event.inQueue}
          />)}

          <CreateChat />
      </div>
    </div>
  )
}
export default MainPage;