import { useContext, useEffect } from "react";
import { authAPI } from "../../app/services/AuthService";
import { Button, Input, Window } from "../../lib/RangleUI/components";
import useInput from "../../lib/RangleUI/hooks/useInput";
import type { SignInResponse } from "../../models/user";

import { ManagerContext } from "../../lib/RangleUI/components/ui/WindowManager";
import MainPage from "../main";
import QuestionsAnswers from "../q&a";
import Notifications from "../notifications/Notifications";
import RegisterPage from "../sign-up";

const AuthPage = () => {
  const manager = useContext(ManagerContext);
  const [sendUserData] = authAPI.useSendSignInMutation();

  const loginInput = useInput("");
  const passInput = useInput("");

  useEffect(() => {
    const {data: userData} = authAPI.useGetUserQuery({});
    if (!userData) return;

    handleRegisterEnd();
  }, []);

  const handleQAOpen = () => {
    manager.createWindow(
      <Window title="Questions & Answers">
        <QuestionsAnswers />
      </Window>
    );
  }

  const handleNatificationsOpen = () => {
    manager.createWindow(
      <Window title="Notifications">
        <Notifications />
      </Window>
    );
  }

  const handleWindowTransfer = () => {
    manager.createWindow(
      <Window title="Sign Up">
        <RegisterPage />
      </Window>
    );
  }

  const handleRegisterEnd = () => {
    manager.createWindow(
      <Window title="Chats" options={[
          {children: "Notifications", icon: {name: "notifications_active", isFilled: true}, color: "primary", isRipple: true, onClick: handleNatificationsOpen},
          {children: "Questions & Answers", icon: {name: "help", isFilled: true}, isRipple: true, onClick: handleQAOpen}
      ]}>
        <MainPage/>
      </Window>
    );
  }

  const handleSign = async () => {
    const signData: SignInResponse = { login: loginInput.value, password: passInput.value}

    loginInput.clear();
    passInput.clear();

    const response = await sendUserData(signData);
    console.log(response);

    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);

      handleRegisterEnd();
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
            placeholder="Password"
            value={passInput.value}
            onChange={passInput.onChange}
          />

          <Button
            className="full-width form-button"
            isDisabled={loginInput.value.trim() && passInput.value.trim() ? false : true}
            isRipple
            onClick={handleSign}
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
