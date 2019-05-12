import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';

const App = props => {
  return (
    <div className="">
      <Palette {...seedColors[4]} />
    </div>
  );
}

export default App;
