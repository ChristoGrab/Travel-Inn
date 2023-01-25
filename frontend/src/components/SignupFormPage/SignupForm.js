import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css'

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // FORM fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  
  const [emailFieldIsActive, setEmailFieldIsActive] = useState(false)
  const [usernameFieldIsActive, setUsernameFieldIsActive] = useState(false)
  const [passwordFieldIsActive, setPasswordFieldIsActive] = useState(false)
  const [confirmPasswordFieldIsActive, setConfirmPasswordFieldIsActive] = useState(false)
  const [firstNameFieldIsActive, setFirstNameFieldIsActive] = useState(false)
  const [lastNameFieldIsActive, setLastNameFieldIsActive] = useState(false)
  
  const handleEmailFocus = (text) => {
    setEmail(text)
    if (text !== "") {
      setEmailFieldIsActive(true)
    } else {
      setEmailFieldIsActive(false)
    }
  }
  
  const handleUsernameFocus = (text) => {
    setUsername(text)
    if (text !== "") {
      setUsernameFieldIsActive(true)
    } else {
      setUsernameFieldIsActive(false)
    }
  }
  
  const handlePasswordFocus = (text) => {
    setPassword(text)
    if (text !== "") {
      setPasswordFieldIsActive(true)
    } else {
      setPasswordFieldIsActive(false)
    }
  }
  
  const handleConfirmPasswordFocus = (text) => {
    setConfirmPassword(text)
    if (text !== "") {
      setConfirmPasswordFieldIsActive(true)
    } else {
      setConfirmPasswordFieldIsActive(false)
    }
  }
  
  const handleFirstNameFocus = (text) => {
    setFirstName(text)
    if (text !== "") {
      setFirstNameFieldIsActive(true)
    } else {
      setFirstNameFieldIsActive(false)
    }
  }
  
  const handleLastNameFocus = (text) => {
    setLastName(text)
    if (text !== "") {
      setLastNameFieldIsActive(true)
    } else {
      setLastNameFieldIsActive(false)
    }
  }


  if (sessionUser) return <Redirect to="/" />

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }

    return setErrors(['Password fields must match']);
  };

  return (
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="auth-form-header">
        Sign Up
        </div>
        
        <h2>Welcome to Travel-Inn</h2>
        
        <div className='form-errors'>
          {errors.map((error, idx) => <li className="form-error" key={idx}>{error}</li>)}
        </div>
        
        <div className="auth-form-body">
          <div className="input-container">
          <input
            className="auth-form-input-top"
            type="text"
            value={email}
            onChange={(e) => handleEmailFocus(e.target.value)}
          />
          <label className={emailFieldIsActive ? 'filled' : "not-filled"}>Email</label>
          </div>

          <div className="input-container">
          <input
          className="auth-form-input-middle"
            type="text"
            value={username}
            onChange={(e) => handleUsernameFocus(e.target.value)}
            
          />
                <label className={usernameFieldIsActive ? 'filled' : 'not-filled'}>
          Username</label>
          </div>

          <div className="input-container">
          <input
          className="auth-form-input-middle"
            type="password"
            value={password}
            onChange={(e) => handlePasswordFocus(e.target.value)}
            
          />
               <label className={passwordFieldIsActive ? 'filled' : 'not-filled'}>
          Password </label>
          </div>

          <div className="input-container">
          <input
          className="auth-form-input-middle"
            type="password"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordFocus(e.target.value)}
            
          />
                  <label className={confirmPasswordFieldIsActive ? 'filled' : 'not-filled'}>
          Confirm Password
        </label>
        </div>
        
        <div className="input-container">
          <input
          className="auth-form-input-middle"
            type="text"
            value={firstName}
            onChange={(e) => handleFirstNameFocus(e.target.value)}
            
          />
                  <label className={firstNameFieldIsActive ? 'filled' : 'not-filled'}>
          First Name
        </label>
        </div>

        <div className="input-container">
          <input
          className="auth-form-input-bottom"
            type="text"
            value={lastName}
            onChange={(e) => handleLastNameFocus(e.target.value)}
            
          />
          <label className={lastNameFieldIsActive ? 'filled' : 'not-filled'}>Last Name</label>
          </div>
        
        </div>
        <button className="submit-button" type="submit">Sign Up</button>
      </form>
  );
}

export default SignupForm;
