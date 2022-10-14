import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton';
import "./Navigation.css"

function Navigation ({ isLoaded }) {
  
  const sessionUser = useSelector(state => state.session);
  console.log("Session user in Navigation: ", sessionUser)
  
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    )
  }
  
  return (
    <div className="navbar-container">
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  )
}

export default Navigation;