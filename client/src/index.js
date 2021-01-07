import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import loadUser from './components/auth/LoadUser';

//useEffect 보다 조금 빠르다
loadUser();

ReactDOM.render(<App />, document.getElementById('root'));
