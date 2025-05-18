import { useEffect } from "react";
import useEnv from "../lib/RangleUI/hooks/useEnv";
import Display from "../lib/RangleUI/display";
import { Window, WindowManager } from "../lib/RangleUI/components";

import AuthPage from "../pages/sign-in";

import MasterClassPage from "../pages/masterClass/MasterClass";

function App() {
  const env = useEnv();

  useEffect(() => {
    Display.updateRoot(env);
  }, [env]);

  return (
    <div className="App no-select">
      {/* <WindowManager> */}
      {/* <Window
          title="Starting"
          options={[
            {
              color: "error",
              children: "Delete",
              isRipple: true,
              icon: { name: "delete" },
            },
          ]}
        >
          <Welcome />
        </Window> */}
      {/* <Window title="Sign In">
          <MainPage />
          <AuthPage />
          <ChatList />
        </Window> */}
      {/* </WindowManager> */}
      {/* <Window title="Чаты">
        <ChatList />
      </Window> */}
      {/* <MainPage /> */}
      <MasterClassPage />
    </div>
  );
}

export default App;

{
  /* <div className='layout-block'>
  <div className="between">
    <Button color='success' isRipple icon={{name: 'favorite', isFilled: true}}>
      login
    </Button>

    <Button color='error' type='secondary' isRipple icon={{name: 'favorite', isFilled: true, className: 'icon-m0'}}>
      Subcribe
    </Button>
  </div>  
</div> */
}
