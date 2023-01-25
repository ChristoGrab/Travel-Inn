import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    
    history.push("/");
  };

  return (
    <>
      <button id="profile-button" onClick={openMenu}>
       <i className="fa-solid fa-bars" id='profile-bars'/>
        <i className="fas fa-user-circle" id='profile-pic'/>
        {showMenu && (
        <div className="profile-dropdown">
          <Link to='/user/profile' className="manage-account-link">Manage Listings</Link>
          <Link to='/user/bookings' className="manage-account-link">Your Trips</Link>
          <button id="logout-button" onClick={logout}>Log Out</button>
        </div>
        )}
      </button>

      
    </>
  );
}

export default ProfileButton;
