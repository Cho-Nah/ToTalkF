import { useEffect } from 'react'
import useEnv from '../lib/RangleUI/hooks/useEnv';
import Display from '../lib/RangleUI/display';
import { Window, WindowManager } from '../lib/RangleUI/components';

import AuthPage from '../pages/sign-in';

function App() {
  const env = useEnv();

  useEffect(() => {
    Display.updateRoot(env);
  }, [env]);

  return (
    <div className='App no-select'>
      <WindowManager>
        <Window title='Sign In'>
          {/* <MainPage /> */}
          <AuthPage />
          {/* <ChatList /> */}
        </Window>
      </WindowManager>
    </div>
  );
}

export default App;