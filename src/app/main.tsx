import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';

import "../lib/RangleUI/scss/index.scss";
import "./index.scss";
import { Provider } from 'react-redux';
import { store } from './Store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
