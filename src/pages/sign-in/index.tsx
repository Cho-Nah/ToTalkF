// import { authAPI } from "../../app/services/AuthService";
import { Button, Input } from "../../lib/RangleUI/components";
import useInput from "../../lib/RangleUI/hooks/useInput";
import type { SignInResponse } from "../../models/user";

const MainPage = () => {
  const loginInput = useInput();
  const passInput = useInput();

  const handleSign = async () => {
    const signData: SignInResponse = { login: loginInput.value, password: passInput.value}

    // const [] = authAPI.
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
          isRipple
          onClick={handleSign}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}

export default MainPage;