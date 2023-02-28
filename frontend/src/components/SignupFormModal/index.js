import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      {/* <h1>Sign Up</h1> */}
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="signup-form-container">
          <div className="signup-email-container">
              <input
                type="text"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
          </div>
          <div className="signup-username-container">
              <input
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
          </div>
          <div className="signup-pw-container">
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </div>
          <div className="signup-confirm-pw">
              <input
                type="password"
                placeholder="Please confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
          </div>
          <button type="submit">Continue</button>
          <div className="login-disclaimer">
            <p>When registering, you agree that we may use your provided data for the registration and to send you notifications on our products and services. You can unsubscribe from notifications at any time in your settings. For additional info please refer to our Privacy Policy.</p>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;