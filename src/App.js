import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

const App = props => {
  console.log(generatePalette(seedColors[4]));
  return (
    <div className="">
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
  );
}

export default App;
