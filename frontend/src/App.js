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
import LoginRedirect from "./components/RedirectComponents/LoginRedirect/LoginRedirect";
import SignUpRedirect from "./components/RedirectComponents/SignUpRedirect/SignUpRedirect";

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
          <Route exact path='/login' >
            <LoginRedirect />
          </Route>
          <Route exact path='/signup'>
            <SignUpRedirect />
          </Route>
          <ProtectedRoute exact path='/'>
            <HomePage />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute exact path='/profile'>
            <ProfilePage />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute exact path='/tracks/:trackId'>
            <SingleTrackPage />
          </ProtectedRoute>  
        </Switch>
      )}
      {/* <Footer /> */}
    </>
  );
}

export default App;
