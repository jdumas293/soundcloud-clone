import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer/Footer";
import LoadAllTracks from "./components/TrackComponents/LoadAllTracks";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* <Route exact path='/'>
            <LoadAllTracks />
          </Route> */}
          <Route exact path='/tracks/:trackId'>
            THIS ROUTE WORKS
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
