import { useContext, useState } from "react";
import { Button, Input, RadioGroup, Window } from "../../lib/RangleUI/components";
import useInput from "../../lib/RangleUI/hooks/useInput";
import type { SignUpResponse } from "../../models/user";
import { registerAPI } from "../../app/services/RegisterService";
import { ManagerContext } from "../../lib/RangleUI/components/ui/WindowManager";
import MainPage from "../main";
import { authAPI } from "../../app/services/AuthService";

const RegisterPage = () => {
  const manager = useContext(ManagerContext);
  const [registerUser] = registerAPI.useCreatePostMutation();
  const [authUser] = authAPI.useSendSignInMutation();

  const loginInput = useInput("");
  const passInput = useInput("");
  const nameInput = useInput("");
  const [sepcRadio, setSpecRadio] = useState("");

    const handleWindowTransfer = () => {
    manager.createWindow(
      <Window title="Sign Up">
        <MainPage />
      </Window>
    );
  }

  const handleSign = async () => {
    const signData: SignUpResponse = {
      login: loginInput.value,
      password: passInput.value,
      name: nameInput.value,
      role: sepcRadio!
    }

    loginInput.clear();
    passInput.clear();
    nameInput.clear();

    const response = await registerUser(signData);
    console.log(response.data);

    if (response.data?.status) {
      const response =await authUser({
        login: signData.login,
        password: signData.password
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        console.log("token:", response.data.token);

        handleWindowTransfer();
      }
    }
  }

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
                { value: "participant", label: "Участник", sublabel: "Студенты, сотрудники компании, гости" },
                { value: "volunteer", label: "Волонтер", sublabel: "Помощник организатора" },
                { value: "organizer", label: "Организатор", sublabel: "Организатор мероприятия" }
              ]}
              onChange={setSpecRadio}
            />

          <Button
            className="full-width form-button"
            isDisabled={loginInput.value.trim() 
              && passInput.value.trim() 
              && nameInput.value.trim()
              && sepcRadio
              ? false : true}
            isRipple
            onClick={handleSign}
          >
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
