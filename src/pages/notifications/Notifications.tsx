import type { INotify } from "../../models/event";

import AuthPage from "../sign-in";
import RegisterPage from "../sign-up";
import Notify from "./Notify";

import "./Notifications.scss";

const Notifications = () => {
  const notifications: INotify[] = [
    {
      label: "You have been succesfully reistered",
      sublabel: "Вас зарегистрировали на хакатон",
      icon: "success",
      window: <AuthPage />
    }, {
      label: "Oh no, you was deleted",
      sublabel: "Вас удалили с мастер класса",
      icon: "error",
      window: <RegisterPage />
    }
  ];

  return (
    <div className="layout">
      <div className="layout-block pad-0">
        {notifications.map(notify => <Notify
          label={notify.label}
          sublabel={notify.sublabel}
          icon={notify.icon}
          window={notify.window}
        />)}
      </div>
  </div>
  );
}

export default Notifications;