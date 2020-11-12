import React from 'react';
import ReactDOM from 'react-dom';
import { RTCClient } from './components/RTCClient';

const App = () => {
	return <RTCClient/>;
	
}

ReactDOM.render(<App/>, document.getElementById('root'));
