import React, {
  useEffect
  //useState
} from "react";

//import useInput from "./hooks/useInput";

import WindowExample from "../components/preview/WindowExample";
import useEnv from "../lib/RangleUI/hooks/useEnv";
import { Window, WindowManager } from "../lib/RangleUI/components";
import Display from "../lib/RangleUI/display";

// import Icon from "./components/ui/Icon";
// import Menu from "./components/ui/Menu";
// import Badge from "./components/ui/Badge";
// import Modal from "./components/ui/Modal";
// import Range from "./components/ui/Range";
// import Input from "./components/ui/Input";
// import Switch from "./components/ui/Switch";
// import Button from "./components/ui/Button";
// import TabList from "./components/ui/TabList";
// import Checkbox from "./components/ui/Checkbox";
// import MenuItem from "./components/ui/MenuItem";
// import RadioGroup from "./components/ui/RadioGroup";
// import DropdownMenu from "./components/ui/DropdownMenu";

const App: React.FC = () => {
  const env = useEnv();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const input = useInput();
  // const [tabValue, setTabValue] = useState("Chats");
  // const [dropdownValue, setDropdownValue] = useState<string | null>(null);
  // const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  // const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  // const [radioValue, setRadioValue] = useState<string | null>(null);
  // const [rangeValue, setRangeValue] = useState(0);

  useEffect(() => {
    Display.updateRoot(env);
  }, [env]);

  return (
    <div className="App no-select" style={{ width: "35rem" }}>
      <WindowManager>
        <Window
          title="Rangle UI"
          options={[{
            children: "Reply",
            icon: { name: "reply"}
          }, {
            children: "Edit message",
            icon: { name: "edit" }
          }, {
            children: "Copy text",
            icon: { name: "content_copy" }
          }, {
            children: "Download",
            icon: { name: "download" }
          }, {
            children: "Pin",
            icon: { name: "keep" }
          }, {
            children: "Forward",
            icon: { name: "forward" }
          }, {
            children: "Select",
            icon: { name: "check_circle" }
          }, {
            children: "Delete",
            color: "error",
            icon: { name: "delete" }
          }, {
            children: "Report spam",
            color: "error",
            icon: { name: "flag" }
          }]}
        >
          <WindowExample />
        </Window>
      </WindowManager>
    </div>
  );
  
  // return (
  //   <div className="App layout custom-scroll no-select">
  //     {/* <ButtonPreview />
  //     <InputPreview />
  //     <SwitchPreview /> */}

  //     <div className="layout-block">
  //       <div className="layout-title">Components Preview</div>
  //       <div className="layout-subtitle">List view</div>
  //       <div className="sandbox">
  //         <div className="result">
  //           <Icon 
  //             isFilled
  //             name="favorite"
  //           />

  //           <TabList 
  //             value={tabValue}
  //             onSwitch={setTabValue}
  //             tabs={[{ 
  //               value: "Chats", 
  //               badge: { children: "1.5K" }
  //             }, {
  //               value: "Groups"
  //             }]}
  //           />

  //           <Button isRipple icon={{ name: "play_arrow", isFilled: true }}>Button</Button>

  //           <Button
  //             type="icon"
  //             icon={{ name: "more_vert" }}
  //           >
  //             <Menu isRipple shouldInstantCancel={false}> 
  //               <MenuItem icon={{ name: "reply" }}>Reply</MenuItem>
  //               <MenuItem icon={{ name: "edit" }}>Edit message</MenuItem>
  //               <MenuItem icon={{ name: "content_copy" }}>Copy text</MenuItem>
  //               <MenuItem icon={{ name: "download" }}>Download</MenuItem>
  //               <MenuItem icon={{ name: "keep" }}>Pin</MenuItem>
  //               <MenuItem icon={{ name: "forward" }}>Forward</MenuItem>
  //               <MenuItem icon={{ name: "check_circle" }}>Select</MenuItem>
  //               <MenuItem icon={{ name: "delete" }} color="error">Delete</MenuItem>
  //               <MenuItem icon={{ name: "flag" }} color="error">Report spam</MenuItem>
  //             </Menu>
  //           </Button>

  //           <Input placeholder="Input" value={input.value} onChange={input.onChange} />

  //           <DropdownMenu
  //             placeholder="DropdownMenu"
  //             onChange={setDropdownValue}
  //             activeValue={dropdownValue}
  //             options={[
  //               { value: "option 1" },
  //               { value: "option 2" }
  //             ]}
  //           />

  //           <Checkbox
  //             isRipple
  //             label="Checkbox"
  //             isHoverDisabled
  //             sublabel="subtitle preview"
  //             isChecked={isCheckboxChecked}
  //             onChange={setIsCheckboxChecked}
  //           />
            
  //           <Switch
  //             isRipple
  //             isSeparated
  //             isHoverDisabled
  //             isChecked={isSwitchChecked}
  //             onChange={setIsSwitchChecked}
  //             label="Switch"
  //           />

  //           <RadioGroup
  //             isRipple
  //             label="RadioGroup"
  //             sublabel="Sublabel"
  //             activeValue={radioValue}
  //             onChange={setRadioValue}
  //             buttons={[
  //               {
  //                 value: "option_1",
  //                 label: "Option 1",
  //                 sublabel: "sublabel 1"
  //               },
  //               {
  //                 value: "option_2",
  //                 label: "Option 2",
  //                 sublabel: "sublabel 2"
  //               }
  //             ]}
  //           />

  //           <Range
  //             min={0}
  //             max={180}
  //             label="Range"
  //             sublabel="Subtitle"
  //             value={rangeValue}
  //             onChange={setRangeValue}
  //             previewConfig={{
  //               formatter(value) {
  //                 var minutes = Math.floor(value / 60);
  //                 var seconds = value - minutes * 60;
  //                 return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  //               }
  //             }}
  //           />

  //           <Button isRipple onClick={() => setIsModalOpen(true)}>
  //             Open modal
  //           </Button>

  //           <Modal
  //             isOpen={isModalOpen}
  //             shouldClickAwayCancel={false}
  //             onCancel={() => setIsModalOpen(false)}
  //             buttons={[{
  //               id: "exit",
  //               color: "error",
  //               children: "Exit"
  //             }, {
  //               id: "cancel",
  //               children: "Cancel"
  //             }]}
  //           >
  //             Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Составитель текстов, повстречался последний, толку пунктуация, рыбного вскоре буквенных грамматики имени ipsum продолжил прямо знаках вопроса. Единственное над запятой взгляд!
  //             Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Составитель текстов, повстречался последний, толку пунктуация, рыбного вскоре буквенных грамматики имени ipsum продолжил прямо знаках вопроса. Единственное над запятой взгляд!
  //           </Modal>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default App;
