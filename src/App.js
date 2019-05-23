import React from "react";
import Palette from "./Palette";
import { Route, Switch } from "react-router-dom";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from './PaletteList';

const App = props => {
  const findPalette = id => {
    return seedColors.find(palette => {
      return palette.id === id;
    });
  };
  return (
    <Switch>
      <Route exact path="/" render={routeProps => <PaletteList palettes={seedColors} {...routeProps} />} />
      <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route 
        path="/palette/:paletteId/:colorId" 
        render={(routeParams) => <h1>First param: {routeParams.match.params.paletteId}. Second param: {routeParams.match.params.colorId}</h1>} 
      />
    </Switch>

    // <div className="">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
};

export default App;
