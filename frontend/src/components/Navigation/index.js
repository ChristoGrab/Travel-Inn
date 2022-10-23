import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link exact to="/"><img id="logo" src={Logo}></img></Link>
          </div>
          <div className='navbar-right'>
            {isLoaded && sessionLinks}
          </div>
    </div>
  );
}

export default Navigation;
