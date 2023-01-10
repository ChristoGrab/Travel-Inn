import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import CreateSpotForm from './components/CreateSpotForm/CreateSpotForm'
import ViewSpotDetails from './components/ViewSpotDetails/index'
import EditSpotForm from './components/EditSpotForm'
import DeleteModal from "./components/DeleteSpotModal/DeleteSpot";
import CreateReviewForm from "./components/CreateReviewForm";
import ProfilePage from "./components/ProfilePage";
import "./index.css";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // any time the page is refreshed, the user will be logged in if they have a valid session token
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/user/profile" exact>
            <ProfilePage />
          </Route>
          <Route path="/create" exact>
            <CreateSpotForm />
          </Route>
          <Route path="/spots/:spotId" exact>
            <ViewSpotDetails />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route>
          <Route path='/spots/:spotId/delete'>
            <DeleteModal />
          </Route>
          <Route path='/spots/:spotId/review/new' exact>
            <CreateReviewForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
