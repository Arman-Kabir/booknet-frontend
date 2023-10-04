import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import './index.css'
import routes from './routes/routes';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import 'react-toastify/dist/ReactToastify.css';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';

// let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <RouterProvider router={routes} />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
)
