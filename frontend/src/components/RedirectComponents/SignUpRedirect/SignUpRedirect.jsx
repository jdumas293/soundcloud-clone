import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import './SignUpRedirect.css';

const SignUpRedirect = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
          setErrors([]);
          await dispatch(sessionActions.signup({ email, username, password }))
            .catch(async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            });
            history.push("/");
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="entire-alt-signup">
            <div className="alt-login-header">
                <h3>Please sign up to access features!</h3>
            </div>
            <div className="alt-signup-demo">
                <p>Test the app with a demo user located in the profile menu</p>
            </div>
            <form className="alt-signup-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="alt-signup-info">
                    <div className="alt-signup-email">
                        <input 
                            type="text"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="alt-signup-username">
                        <input
                            type="text"
                            placeholder="Your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="alt-signup-pw">
                        <input
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="alt-signup-confirm-pw">
                        <input
                            type="password"
                            placeholder="Please confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="alt-signup-btn" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
};

export default SignUpRedirect;

