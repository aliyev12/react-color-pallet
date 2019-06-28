import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    let savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    setPalettes(savedPalettes);
  });

  const handleSavePalette = pal => {
    const newPalette = [...palettes, pal];
    setPalettes(newPalette);
    syncLocalStorage(newPalette);
  };

  const syncLocalStorage = pals => {
    // Save to localStorage
    window.localStorage.setItem("palettes", JSON.stringify(pals));
  };

  const findPalette = id => palettes.find(palette => palette.id === id);

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <NewPaletteForm
            savePalette={handleSavePalette}
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
