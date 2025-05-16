import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";


import "./WindowExample.scss";
import { ManagerContext } from "../../lib/RangleUI/components/ui/WindowManager";
import useFlag from "../../lib/RangleUI/hooks/useFlag";
import useInput from "../../lib/RangleUI/hooks/useInput";
import { Button, Checkbox, DropdownMenu, Input, Menu, MenuItem, Modal, RadioGroup, Range, Switch, TabList, Window } from "../../lib/RangleUI/components";

let interval: NodeJS.Timer;

const WindowExample: React.FC = () => {
  const manager = useContext(ManagerContext);

  const [isSwitched, setIsSwitched] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [dropdownValue, setDropdownValue] = useState<string | null>(null);
  const [radioValue, setRadioValue] = useState("red");
  const [currentTab, setCurrentTab] = useState("All");
  const [rangeValue, setRangeValue] = useState(0);
  const [isModalOpen, openModal, closeModal] = useFlag();

  const input = useInput();

  const handleButtonClick = useCallback(() => {
    manager.createWindow(
      <Window
        title="New window"
        options={[{
          children: "pidor"
        }]}
      >
        <WindowExample />
      </Window>
    );
  }, [manager]);

  const buttons: any[] = useMemo(() => [
    { children: "Open window", isRipple: true, onClick: handleButtonClick },
    { children: "Open window", isRipple: true, onClick: handleButtonClick, color: "error" },
    { children: "Open window", isRipple: true, onClick: handleButtonClick, color: "warning" },
    { children: "Open window", isRipple: true, onClick: handleButtonClick, color: "warning" },
    { children: "Open window", isRipple: true, onClick: handleButtonClick, icon: { name: "open_in_new" }},
    { children: "Open window", isRipple: true, onClick: handleButtonClick, isLoading: true },
    
    { children: "Open window", isRipple: true, onClick: handleButtonClick, type: "secondary" },
    { children: "Open window", isRipple: true, onClick: handleButtonClick, color: "error", type: "secondary" },
    { children: "Open window", isRipple: true, onClick: handleButtonClick, color: "warning", type: "secondary" },
    { children: "Open window", isRipple: true, onClick: handleButtonClick, color: "warning", type: "secondary" },
    { children: "Open window", isRipple: true, onClick: handleButtonClick, icon: { name: "open_in_new" }, type: "secondary" },
    { children: "Open window", isRipple: true, onClick: handleButtonClick, isLoading: true, type: "secondary" }
  ], [handleButtonClick]);

  useEffect(() => {
    if (interval || true) {
      return;
    }

    interval = setInterval(() => {
      setButtonIndex(prev => {
        return prev === buttons.length - 1 ? 0 : prev + 1;
      });
    }, 2000);
  }, [buttons]);

  return (
    <div className="WindowExample layout">
      {/* <div className="layout-overtitle">Overview</div>
      <div className="layout-oversubtitle">What is Rangle</div> */}
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
        Developed by <a className="link" href="https://t.me/jsarseny">@jsarseny</a>
      </div>

      {/* <div className="layout-overtitle">UI units</div>
      <div className="layout-oversubtitle">List of main components</div> */}
      <div className="layout-block">
        <div className="layout-title">UI units</div>
        <div className="layout-subtitle">List of main components</div>

        <div className="table">
          <div className="row">
            <div className="column">Button</div>
            <div className="column">
              {/* <Button {...buttons[buttonIndex]} /> */}
              <Button children="Error" type="secondary" color="error" onClick={handleButtonClick}/>
            </div>
          </div>

          <div className="row">
            <div className="column">Input</div>
            <div className="column">
              <Input                
                type="tel"
                value={input.value}
                onChange={input.onChange}
                placeholder="Phone number"
                //pattern={/^[0-9]{1,}$/i} 
              />
            </div>
          </div>

          <div className="row">
            <div className="column">DropdownMenu</div>
            <div className="column">
              <DropdownMenu 
                placeholder="Region"
                value={dropdownValue}
                onChange={setDropdownValue}
                options={[
                  { value: "Europe" },
                  { value: "Asia" },
                  { value: "North America" },
                  { value: "Soth America" },
                  { value: "Africa" },
                  { value: "Australia" }
                ]}
              />
            </div>
          </div>

          <div className="row">
            <div className="column">Switch</div>
            <div className="column">
              <Switch
                isRipple
                isSeparated
                isHoverDisabled
                label="Switch"
                isChecked={isSwitched}
                onChange={setIsSwitched}
              />
            </div>
          </div>

          <div className="row">
            <div className="column">Checkbox</div>
            <div className="column">
              <Checkbox
                label="Checkbox" 
                sublabel="turn me up too" 
                isChecked={isChecked}
                onChange={setIsChecked} 
                isRipple 
                isHoverDisabled 
              />
            </div>
          </div>

          <div className="row" style={{ height: "14rem" }}>
            <div className="column">RadioGroup</div>
            <div className="column">
              <RadioGroup
                label="RadioGroup"
                sublabel="Choose your favorite color"
                activeValue={radioValue}
                buttons={[
                  { value: "red", label: "Red", sublabel: "#ff0000" },
                  { value: "green", label: "Green", sublabel: "#00ff00" },
                  { value: "blue", label: "Blue", sublabel: "#0000ff" }
                ]}
                onChange={setRadioValue}
              />
            </div>
          </div>

          <div className="row">
            <div className="column">TabList</div>
            <div className="column">
              <TabList
                //type="secondary"
                value={currentTab}
                isHoverDisabled
                onSwitch={setCurrentTab}
                tabs={[
                  { value: "All" },
                  { value: "Unsorted" },
                  { value: "Incoming" },
                  { value: "Outgoing" },
                  { value: "Spam" },
                  { value: "Trash" }
                ]}
              />
            </div>
          </div>

          <div className="row">
            <div className="column">Menu + MenuItem</div>
            <div className="column">
              <Button 
                type="icon"
                icon={{ name: "menu" }}
              >
                <Menu directionY="top" directionX="left" shouldInstantCancel={false}>
                  <MenuItem icon={{ name: "remove" }}>Neutral</MenuItem>
                  <MenuItem isLoading>Loading</MenuItem>
                  <MenuItem icon={{ name: "check_circle" }} color="success">Success</MenuItem>
                  <MenuItem icon={{ name: "warning" }} color="warning">Warning</MenuItem>
                  <MenuItem icon={{ name: "error" }} color="error">Error</MenuItem>
                  <MenuItem icon={{ name: "animation" }} isRipple>Ripple</MenuItem>
                  <MenuItem icon={{ name: "do_not_disturb_on" }} isDisabled>Disabled</MenuItem>
                </Menu>
              </Button>
            </div>
          </div>

          <div className="row">
            <div className="column">Range</div>
            <div className="column">
              <Range
                value={rangeValue}
                min={0}
                step={1}
                max={2}
                onChange={setRangeValue}
                previewConfig={{
                  isDisabled: true
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="column">Modal</div>
            <div className="column">
              <Button children="Open modal" onClick={openModal} />
            </div>
          </div>

          {isModalOpen && <Modal
            title="Rangle UI"
            onCancel={closeModal}
            buttons={[{
              id: "lol",
              children: "approve",
              color: "success"
            },{
              id: "ll",
              children: "deny",
              color: "error"
            }]}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Debitis consequuntur pariatur labore, assumenda maiores a laboriosam hic placeat unde, 
            asperiores impedit rerum ad magnam repellat. Perspiciatis animi reprehenderit architecto pariatur?
          </Modal>}
        </div>
      </div>
    </div>
  );
}

export default WindowExample;