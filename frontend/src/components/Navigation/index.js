import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import CreateSpotButton from '../CreateSpotForm/index'
import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import Logo from '../../assets/TravelInn_Logo.png'

function Navigation({ isLoaded }) {

  const sessionUser = useSelector(state => state.session.user);
  // console.log("Session user in Navigation: ", sessionUser)

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="navbar-right">
      <CreateSpotButton />
      <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }

  return (
    <div className="top-navbar">
        <div className='navbar-left'>
          <img id="logo" src={Logo}></img>
          <NavLink exact to="/" id="app-name">Travel-Host</NavLink>
          </div>
          <div className='navbar-right'>
            {isLoaded && sessionLinks}
          </div>
    </div>
  );
}

export default Navigation;
