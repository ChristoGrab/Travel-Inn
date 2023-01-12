import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import CreateSpotButton from '../CreateSpotForm/index'
import SignupFormModal from '../SignupFormPage';
import DemoUser from '../DemoUser'

import './Navigation.css';
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
        <DemoUser />
      </div>
    );
  }

  return (
    <div className="top-navbar">
        <div className='navbar-left'>
          <Link to="/"><img id="logo" src={Logo} alt="Travel-Inn"></img></Link>
        </div>
        <div className="navbar-center" />
        <div className='navbar-right'>
          {isLoaded && sessionLinks}
        </div>
    </div>
  );
}

export default Navigation;
