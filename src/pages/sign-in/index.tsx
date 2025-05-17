import { useContext } from "react";
import { authAPI } from "../../app/services/AuthService";
import { Button, Input, Window } from "../../lib/RangleUI/components";
import useInput from "../../lib/RangleUI/hooks/useInput";
import type { SignInResponse } from "../../models/user";

import { ManagerContext } from "../../lib/RangleUI/components/ui/WindowManager";
import RegisterPage from "../sign-up";
import ChatList from "../chat";

const AuthPage = () => {
  const manager = useContext(ManagerContext);
  const [sendUserData] = authAPI.useSendSignInMutation();

  const loginInput = useInput("");
  const passInput = useInput("");


  const handleWindowTransfer = () => {
    manager.createWindow(
      <Window title="Sign Up">
        <RegisterPage />
      </Window>
    );
  }

  const handle = () => {
    manager.createWindow(
      <Window title="Chats">
        <ChatList />
      </Window>
    );
  }

  const handleSign = async () => {
    const signData: SignInResponse = { login: loginInput.value, password: passInput.value}

    loginInput.clear();
    passInput.clear();

    const response = await sendUserData(signData);
    console.log(response);
    console.log();
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
            placeholder="Password"
            value={passInput.value}
            onChange={passInput.onChange}
          />

          <Button
            className="full-width form-button"
            isDisabled={loginInput.value.trim() && passInput.value.trim() ? false : true}
            isRipple
            // onClick={handleSign}
            onClick={handle}
          >
            Войти
          </Button>
            Don't have an account? <a className="link" style={{cursor: "pointer"}} onClick={handleWindowTransfer}>Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
