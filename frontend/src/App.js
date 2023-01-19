import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import CreateSpotForm from './components/CreateSpotForm/CreateSpotForm'
import SpotDetails from './components/SpotDetailsPage'
import EditSpotForm from './components/EditSpotForm'
import DeleteModal from "./components/DeleteSpotModal/DeleteSpot";
import CreateReviewForm from "./components/CreateReviewForm";
import ProfilePage from "./components/UserAccount";
import UserBookings from "./components/UserAccount/UserBookings";
import UpdateReviewForm from "./components/UpdateReviewForm";
import UpdateBookingPage from "./components/UpdateBooking/UpdateBookingPage";
import ImageForm from "./components/Upload/ImageForm";
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
          <Route path="/spots/create" exact>
            <CreateSpotForm />
          </Route>
          <Route path="/spots/:spotId" exact>
            <SpotDetails />
          </Route>
          <Route path='/spots/:spotId/reviews/create' exact>
            <CreateReviewForm />
          </Route>
          <Route path="/spots/:spotId/edit" exact>
            <EditSpotForm />
          </Route>
          <Route path='/spots/:spotId/delete' exact>
            <DeleteModal />
          </Route>
          <Route path='/reviews/:reviewId/edit' exact>
            <UpdateReviewForm />
          </Route>
          <Route path='/bookings/:spotId/update/:bookingId' exact>
            <UpdateBookingPage />
          </Route>
          <Route path='/testing/:spotId' exact>
            <ImageForm />
          </Route>
          <Route path="/user/profile" exact>
            <ProfilePage />
          </Route>
          <Route path='/user/bookings' exact>
            <UserBookings />
          </Route>


        </Switch>
      )}
    </>
  );
}

export default App;
