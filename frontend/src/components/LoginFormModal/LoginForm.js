import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true)
    
    setErrors([]);
    
    dispatch(sessionActions.login({ credential, password }))
    .catch( async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
      }
    );
  };

  return (
    <form className='login-form'
    onSubmit={handleSubmit}>
      <h3>Log In</h3>
        {formSubmitted && errors && (
          <li id="login-error">{errors}</li>
        )}
      <label className="form-label">
        Username or Email
        <input
          className='form-input'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className="form-label">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
