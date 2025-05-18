import { useState } from "react";
import { TabList } from "../../lib/RangleUI/components";
import type { IEvent } from "../../models/event";

import EventElement from "./ui/EventElement";
import CreateChat from "../../features/createChat/CreateChat";
import { authAPI } from "../../app/services/AuthService";
import { useAppSelector } from "../../hooks/redux";

const MainPage = () => {
  const [currentTab, setCurrentTab] = useState("All Events");
  const {data: userData} = authAPI.useGetUserQuery({});
  const Events = useAppSelector(state => state.events);

  const events: IEvent[] = [{
    name: "Вяжем носки",
    slots: 8,
    selectedSlots: 3,
    contacts: "@AronSrg",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe obcaecati, commodi maxime inventore rerum aliquid architecto laboriosam, ratione doloribus quasi dolorum, deleniti unde sint perspiciatis aut aperiam! Eaque, dolor ea.",
    time: "18:40",
  },{
    name: "Пейнтбол",
    slots: 13,
    selectedSlots: 13,
    contacts: "@inpukk",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe obcaecati, commodi maxime inventore rerum aliquid architecto laboriosam, ratione doloribus quasi dolorum, deleniti unde sint perspiciatis aut aperiam! Eaque, dolor ea.",
    time: "19:20",
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
          {Events.concat(events).map(event => <EventElement
            name={event.name}
            selectedSlots={event.selectedSlots}
            slots={event.slots}
            contacts={event.contacts}
            time={event.time}
            desc={event.contacts}
            inQueue={event.inQueue}
          />)}

          {userData?.role !== "participant" && <CreateChat />}
      </div>
    </div>
  )
}

export default MainPage;