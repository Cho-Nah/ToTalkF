import { authAPI } from "../../app/services/AuthService";
import { Button, Input } from "../../lib/RangleUI/components";
import useInput from "../../lib/RangleUI/hooks/useInput";
import type { SignInResponse } from "../../models/user";

const MainPage = () => {
  const loginInput = useInput("");
  const passInput = useInput("");

  const [sendUserData, {}] = authAPI.useSendSignInMutation();

  const handleSign = async () => {
    const signData: SignInResponse = { login: loginInput.value, password: passInput.value}

    loginInput.clear();
    passInput.clear();

    const response = await sendUserData(signData);
  }

  return (
    <div className="sign-in layout">
      <div className="layout-block">
        <Input 
          placeholder="Login" 
          value={loginInput.value}
          onChange={loginInput.onChange}

        />
        <Input 
          placeholder="Password"
          value={passInput.value}
          onChange={passInput.onChange}
        />

        <Button
          isDisabled={loginInput.value.trim() && passInput.value.trim() ? false : true}
          // isRipple
          onClick={handleSign}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}

export default MainPage;