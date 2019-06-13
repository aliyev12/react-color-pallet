import React, { useState } from "react";
import Palette from "./Palette";
import { Route, Switch } from "react-router-dom";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import NotFound from "./NotFound";

const App = props => {
  const [palettes, setPalettes] = useState(seedColors);

  const findPalette = id => palettes.find(palette => palette.id === id);

  // const savePalette = newPalette => {};

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <NewPaletteForm
            savePalette={newPalette => setPalettes([...palettes, newPalette])}
            palettes={palettes}
            {...routeProps}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList palettes={palettes} {...routeProps} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={routeProps => {
          if (findPalette(routeProps.match.params.id)) {
            return (
              <Palette
                palette={generatePalette(
                  findPalette(routeProps.match.params.id)
                )}
              />
            );
          } else {
            return <NotFound />;
          }
        }}
      />
      <Route
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
    </Switch>
  );
};

export default App;
