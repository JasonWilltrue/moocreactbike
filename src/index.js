import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import Admin from './admin'
// import Admin from './pages/route-demo/route1/home'
// import Admin from './pages/route-demo/route2/router'
import Admin from './pages/route-demo/route3/router'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Admin />, document.getElementById('root'));
registerServiceWorker();
