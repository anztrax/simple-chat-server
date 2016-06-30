import React from 'react';
import ReactDOM from 'react-dom';

if(process.env.NODE_ENV !== 'production'){
  React.perf = require('react-addons-perf');
}

ReactDOM.render(
  <div>Hello world testing gan</div>,
  document.getElementById('app')
)