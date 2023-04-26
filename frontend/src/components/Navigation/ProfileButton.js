import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/');
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    history.push('/profile');
  }

  const handleDemo = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="profile-btn">
        <button onClick={openMenu}>
          <i class="fa-solid fa-user 2xl"></i> &or;
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="authorized-user-info">
              <li>{user.username}</li>
              {/* <li>{user.email}</li> */}
            </div>
            <div className="authorized-user-btns">
              <div className="authorized-profile-btn">
                <button onClick={handleProfileClick}>Profile</button>
              </div>
              <div className="logout-btn">
                <button onClick={logout}>Log Out</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="unauthorized-dropdown">
              <div className="create-acct-btn">
                <OpenModalButton
                  buttonText="Create Account"
                  // onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
              <div className='login-btn'>
                <OpenModalButton
                  buttonText="Log In"
                  // onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div className="demouser-btn">
                {/* <OpenModalButton
                  buttonText="Demo User"
                  onButtonClick={() => {
                    dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
                    history.push('/')
                    }
                  }
                /> */}
                <button onClick={handleDemo}>Demo User</button>
              </div>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;