import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/TrackComponents/HomePage/HomePage";
import SingleTrackPage from "./components/TrackComponents/SingleTrackPage/SingleTrackPage";
import ProfilePage from "./components/ProfileComponents/ProfilePage";
import SplashPage from "./components/SplashPage/SplashPage";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <AudioPlayerProvider>
        <Navigation isLoaded={isLoaded} />
          {isLoaded && (
            <Switch>
              <Route exact path='/splash'>
                <SplashPage />
              </Route>
              <ProtectedRoute exact path='/'>
                <HomePage />
                <Footer />
              </ProtectedRoute>
              <ProtectedRoute exact path='/profile'>
                <ProfilePage tabOverride={"ProfileTrack"}/>
                <Footer />
              </ProtectedRoute>
              <ProtectedRoute exact path='/tracks/:trackId'>
                <SingleTrackPage />
                <Footer />
              </ProtectedRoute>
              <ProtectedRoute exact path='/favorites/:userId'>
                <ProfilePage tabOverride={"FavoritesTab"} />
                <Footer />  
              </ProtectedRoute>
              <ProtectedRoute exact path='/playlists/:userId'>
                <ProfilePage tabOverride={"PlaylistTab"} />
                <Footer />
              </ProtectedRoute>
            </Switch>
          )}
      </AudioPlayerProvider>
    </>
  );
}

export default App;
