import { useState } from "react";
import {
  Button,
  Icon,
  Input,
  Modal,
  Switch,
} from "../../lib/RangleUI/components";
import useFlag from "../../lib/RangleUI/hooks/useFlag";
import useInput from "../../lib/RangleUI/hooks/useInput";

import "./CreateChat.scss";

import { useSendEventsMutation } from "../../app/services/MasterClassServise";

const CreateChat = () => {
  const [isModalOpen, openModal, closeModal] = useFlag();
  const [isSwitched, setIsSwitched] = useState(false);
  const nameInp = useInput();
  const contactInp = useInput();

  const [sendEvent] = useSendEventsMutation();

  const handleCreateChat = async () => {
    try {
      const newEvent = {
        name: nameInp.value,
        contact: contactInp.value,
        forOrg: isSwitched,
      };
      await sendEvent(newEvent);
    } catch (error) {
      console.log("Ошибка отправки мастер-класса");
    }
    closeModal();
  };

  return (
    <>
      <div className="create-chat-container">
        <Button className="circle-button" isRipple onClick={openModal}>
          <Icon name="edit" />
        </Button>
      </div>

      {isModalOpen && (
        <Modal title="CreateChat" onCancel={closeModal} buttons={[]}>
          <Input
            className="form-margin"
            placeholder="Chat name"
            onChange={nameInp.onChange}
            value={nameInp.value}
          />

          <Input
            className="form-margin"
            placeholder="Contacts"
            onChange={contactInp.onChange}
            value={contactInp.value}
          />

          <div className="row">
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
          </div>

          <Button
            className="full-width create-button"
            children="Создать чат"
            onClick={handleCreateChat}
          />
        </Modal>
      )}
    </>
  );
};

export default CreateChat;
