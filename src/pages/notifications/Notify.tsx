import type React from "react";
import { Ripple, Window } from "../../lib/RangleUI/components";
import { ErrorIcon, PrimaryIcon, SuccessIcon, WarningIcon } from "./Icons";
import { useContext } from "react";
import { ManagerContext } from "../../lib/RangleUI/components/ui/WindowManager";
import type { INotify } from "../../models/event";

const Notify: React.FC<INotify> = ({ icon, label, sublabel, window }) => {
  const manager = useContext(ManagerContext);

  const handleWindowTransfer = () => {
    manager.createWindow(
      <Window title={`Notify`}>
        {window}
      </Window>
    );
  }

  const pickIcon = () => {
    switch (icon) {
      case "warning":
        return <WarningIcon />
      case "success":
        return <SuccessIcon />
      case "primary":
        return <PrimaryIcon />
      case "error":
        return <ErrorIcon />
    }
  }

  return (
    <div className="notify-container" onClick={handleWindowTransfer}>
      <div className="notify ripple" 
      // onClick={handleWindowTransfer}
      >
        {pickIcon()}
        <div>
          <div className="block-title">
            {label}
          </div>

          {sublabel && <div className="block-caption">
            {sublabel}
          </div>}
        </div>
        <Ripple />
      </div>
    </div>
  );
}

export default Notify;