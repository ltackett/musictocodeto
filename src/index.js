import React from 'react';
import { render } from "react-dom";
import App from './components/App';

const wrapper = document.getElementById('app');
wrapper ? render(<App />, wrapper) : false;
