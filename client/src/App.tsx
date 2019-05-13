import React from 'react';

import { Router } from '@reach/router'

import 'bootstrap/scss/bootstrap.scss'
import './scss/style.scss'

import Import from './pages/Import'
import Shoes from './pages/Shoes'


const App: React.FC = () => {
  return (
    <Router>
      <Shoes path="/" />
      <Shoes path="shoes" />
      <Import path="import" />
    </Router>
  );
}

export default App;
