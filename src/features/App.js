import React from 'react';
import { Route } from 'react-router-dom'

import Welcome from './Welcome/Welcome'
import Game from './Game/Game'


function App() {
  return (
    <div >
      <Route exact path="/" component={Welcome} />
      <Route exact path="/game" component={Game} />
    </div>
  );
}

export default App;
