import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import serviceWork from './sw';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

serviceWork();
