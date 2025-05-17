import { useContext, useState } from "react";
import { authAPI } from "../../app/services/AuthService";
import { Button, Input, RadioGroup } from "../../lib/RangleUI/components";
import useInput from "../../lib/RangleUI/hooks/useInput";
import type { SignUpResponse } from "../../models/user";
import { registerAPI } from "../../app/services/RegisterService";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/Store/store";
import { setName, setRole } from "../../models/UserSlice";

const RegisterPage = () => {
  // const manager = useContext(ManagerContext);
  const [sendUserData, { data }] = registerAPI.useCreatePostMutation();

  const loginInput = useInput("");
  const passInput = useInput("");
  const nameInput = useInput("");
  const [sepcRadio, setSpecRadio] = useState("");

  //Если юзаем slice
  const dispatch = useDispatch();

  const name = useSelector((state: RootState) => state.user.name);
  const role = useSelector((state: RootState) => state.user.role);

  const handleSign = async () => {
    const signData: SignUpResponse = {
      login: loginInput.value,
      password: passInput.value,
      name: nameInput.value,
      role: sepcRadio!,
    };

    loginInput.clear();
    passInput.clear();
    nameInput.clear();

    const response = await sendUserData(signData);

    if (response) {
      dispatch(setName(response.data.name));
      dispatch(setRole(response.data.role));
    }

    console.log(response);
  };

  return (
    <div className="sign-in layout">
      <div className="layout-block">
        <div className="auth-form">
          <Input
            className="form-margin"
            placeholder="Login"
            value={loginInput.value}
            onChange={loginInput.onChange}
          />

          <Input
            className="form-margin"
            placeholder="Name"
            value={nameInput.value}
            onChange={nameInput.onChange}
          />

          <Input
            className="form-margin"
            placeholder="Password"
            value={passInput.value}
            onChange={passInput.onChange}
          />

          <RadioGroup
            className="column form-margin"
            label="Выбери специализацию"
            sublabel="Выберай честно, это повлияет на дальнейшие действия"
            activeValue={sepcRadio}
            buttons={[
              {
                value: "participant",
                label: "Участник",
                sublabel: "Студенты, сотрудники компании, гости",
              },
              {
                value: "volunteer",
                label: "Волонтер",
                sublabel: "Помощник организатора",
              },
              {
                value: "organizer",
                label: "Организатор",
                sublabel: "Организатор мероприятия",
              },
            ]}
            onChange={setSpecRadio}
          />

          <Button
            className="full-width form-button"
            isDisabled={
              loginInput.value.trim() &&
              passInput.value.trim() &&
              nameInput.value.trim() &&
              sepcRadio
                ? false
                : true
            }
            isRipple
            onClick={handleSign}
          >
            Зарегестрироваться
          </Button>

          <p>Name: {name}</p>
          <p>Role: {role}</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
