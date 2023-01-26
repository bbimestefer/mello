import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider, Modal } from './context/Modal';
import './index.css';
import App from './App';
import configureStore from './store';

const store = configureStore();


function Root() {
    return (
        <ModalProvider>
            <Provider store={store}>
                <App />
                <Modal />
            </Provider>
        </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Root />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
