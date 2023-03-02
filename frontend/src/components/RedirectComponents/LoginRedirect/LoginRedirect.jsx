import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import './LoginRedirect.css';
import { useHistory } from "react-router-dom";

const LoginRedirect = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(sessionActions.login({ credential, password }))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
                );

            history.push('/');
    };

    const redirectSignUp = (e) => {
        e.preventDefault();
        history.push('/signup');
    };

    return (
        <div className="entire-alt-login">
            <div className="alt-login-header">
                <h3>Please login or <button className="alt-login-signup-btn" onClick={redirectSignUp}>sign up</button> to access features!</h3>
            </div>
            <form className="alt-login-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="alt-login-info">
                    <div className="alt-login-cred">
                        <input
                            type="text"
                            placeholder="Your username or email"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </div>
                    <div className="alt-login-pw">
                        <input 
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button onClick={handleSubmit} className="alt-login-btn" type="submit">Continue</button>
                </div>
            </form>
        </div>

    );
};

export default LoginRedirect;