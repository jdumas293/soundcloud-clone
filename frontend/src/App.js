import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/TrackComponents/HomePage/HomePage";
import SingleTrackPage from "./components/TrackComponents/SingleTrackPage/SingleTrackPage";
import ProfilePage from "./components/ProfileComponents/ProfilePage";

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
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/profile'>
            <ProfilePage />
          </Route>
          <Route exact path='/tracks/:trackId'>
            <SingleTrackPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
