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
import DeleteModal from "./components/DeleteSpotModal/DeleteSpot";
import AddPreviewImage from "./components/CreateSpotForm/AddPreviewImage";
import CreateReviewForm from "./components/CreateReviewForm";
import UserDetails from "./components/UserAccount";

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
          <Route path="/" exact>
            <SpotCard />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/user/profile" exact>
            <UserDetails />
          </Route>
          <Route path="/create" exact>
            <CreateSpotForm />
          </Route>
          <Route path="/create/image">
            <AddPreviewImage />
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
