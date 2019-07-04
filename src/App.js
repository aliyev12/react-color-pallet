import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Palette from "./Palette";
import { Route, Switch } from "react-router-dom";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import NotFound from "./NotFound";
import "./App.css";

const App = props => {
  const [palettes, setPalettes] = useState([]);

  useEffect(() => {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    // If there are palletes in the local storage, then use them, otherwise just use the seed color pallets
    if (savedPalettes) {
      setPalettes(savedPalettes);
    } else {
      setPalettes(seedColors);
    }
  }, []);

  const handleSavePalette = pal => {
    const newPalette = [...palettes, pal];
    setPalettes(newPalette);
    syncLocalStorage(newPalette);
  };

  const deletePalette = id => {
    const newPalettes = palettes.filter(palette => palette.id !== id);
    setPalettes(palettes.filter(palette => palette.id !== id));
    syncLocalStorage(newPalettes);
  };

  const syncLocalStorage = pals => {
    // Save to localStorage
    window.localStorage.setItem("palettes", JSON.stringify(pals));
  };

  const findPalette = id => palettes.find(palette => palette.id === id);

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={routeProps => (
                  <div className="page">
                    <NewPaletteForm
                      savePalette={handleSavePalette}
                      palettes={palettes}
                      {...routeProps}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/"
                render={routeProps => (
                  <div className="page">
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={routeProps => {
                  if (findPalette(routeProps.match.params.id)) {
                    return (
                      <div className="page">
                        <Palette
                          palette={generatePalette(
                            findPalette(routeProps.match.params.id)
                          )}
                        />
                      </div>
                    );
                  } else {
                    return <NotFound />;
                  }
                }}
              />
              <Route
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                  <div className="page">
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </div>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default App;
