import { useState } from "react";
import { Button, Icon, Input, Modal, Switch } from "../../lib/RangleUI/components";
import useFlag from "../../lib/RangleUI/hooks/useFlag";
import useInput from "../../lib/RangleUI/hooks/useInput";

import "./CreateChat.scss";

const CreateChat = () => {
  const [isModalOpen, openModal, closeModal] = useFlag();
  // const [isSwitched, setIsSwitched] = useState(false);
  const nameInp = useInput();
  const contactInp = useInput();
  const timeInp = useInput();
  const descInp = useInput();
  const slotsInp = useInput();

  const handleCreateChat = () => {
    // console.log({ name: nameInp.value, contact: contactInp.value, forOrg: isSwitched });
    closeModal();
  }
  
  return (
    <>
      <div className="create-chat-container">
        <Button className="circle-button" isRipple onClick={openModal}>
          <Icon name="edit" />
        </Button>  
      </div>

      {isModalOpen && <Modal
        title="CreateChat"
        onCancel={closeModal}
        buttons={[]}
      >
        <Input 
          className="form-margin"
          placeholder="Event name"
          onChange={nameInp.onChange}
          value={nameInp.value}
        />

        <Input 
          className="form-margin"
          placeholder="Contacts"
          onChange={contactInp.onChange}
          value={contactInp.value}
        />

        <div className="modal-between">
          <Input 
            className="form-margin"
            placeholder="Time"
            onChange={timeInp.onChange}
            value={timeInp.value}
          />

          <Input 
            className="form-margin"
            placeholder="Slots"
            onChange={slotsInp.onChange}
            value={slotsInp.value}
          />
        </div>

        <Input 
          className="form-margin"
          placeholder="Description"
          onChange={descInp.onChange}
          value={descInp.value}
        />

        {/* <div className="row">
          <div className="column">
            <Switch
              isRipple
              isSeparated
              isHoverDisabled
              label="Organisators only"
              isChecked={isSwitched}
              onChange={setIsSwitched}
            />
          </div>
        </div> */}

        <Button 
          className="full-width create-button"
          children="Создать чат"
          onClick={handleCreateChat}
        />
      </Modal>}
    </>
  );
}

export default CreateChat;