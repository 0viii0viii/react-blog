import { Provider } from 'react-redux';
import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import MyRouter from './routes/Router'

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/custom.scss';

function App() {
  return (
    <Provider store={store}> 
      <ConnectedRouter history={history}>
        <MyRouter />
      </ConnectedRouter>
    </Provider>
  )
};


export default App;
