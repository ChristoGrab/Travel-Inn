import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import CreateSpotButton from '../CreateSpotForm/index'
import './Navigation.css';

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);
  // console.log("Session user in Navigation: ", sessionUser)

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="top-navbar">
        <div className='navbar-left'>
          <NavLink exact to="/" id="app-name">Travel-Host</NavLink>
          </div>
          <div className='navbar-right'>
            <CreateSpotButton />
            {isLoaded && sessionLinks}
          </div>
    </div>
  );
}

export default Navigation;
