import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotCard from "./components/SpotCard";
import CreateSpotForm from './components/CreateSpotForm/CreateSpotForm'
import ViewSpotDetails from './components/ViewSpotDetails/index'
import EditSpotForm from './components/EditSpotForm'

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
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/create" exact>
            <CreateSpotForm />
          </Route>
          <Route path="/" exact>
            <SpotCard />
          </Route>
          <Route path="/spots/:spotId" exact>
            <ViewSpotDetails />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
