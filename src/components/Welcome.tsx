import React, { useContext, useState } from "react";
import { Badge, Button, Checkbox, DropdownMenu, Input, Window } from "../lib/RangleUI/components";
import { ManagerContext } from "../lib/RangleUI/components/ui/WindowManager";

import {} from "../lib/RangleUI/utils/numbers";

const Welcome = ({}) => {
  const manager = useContext(ManagerContext);
  const [checked, setChecked] = useState(false);
  const [dropVal, setdropVal] = useState<string | null>(null);

  const handleOpenWindow = () => {
    manager.createWindow(<Window title="New window"><Welcome /></Window>);
  }

  return (
    <div className="welcome layout">
      <div className="layout-block">
        <Button children="deep" isRipple onClick={handleOpenWindow} isDisabled/>
      </div>

      <div className="layout-block">
        <Input placeholder="Cool" />
      </div>

      <div className="layout-block">
        <Checkbox isChecked={checked} onChange={setChecked} label="click me" sublabel="please" color="warning" />
      </div>

      <div className="layout-block">
        <DropdownMenu options={[{
          value: "Alaska",
          label: "Sifon"
        },
        {
          value: "Nepal"
        },
        {
          value: "Pakistan"
        }]} 
        onChange={setdropVal}
        placeholder="hi!"
        value={dropVal}
        color={!dropVal ? "error" : "primary"}
        />
      </div>

      <div className="layout-block">
        <Checkbox isChecked={checked} onChange={setChecked} label="click me" sublabel="please" color="warning" />
      </div>
    </div>
  )
}

export default Welcome;