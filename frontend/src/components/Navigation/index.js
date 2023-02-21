import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <div className='home-btn-container'>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
      </div>
      <div className="create-acct-btn">
        <OpenModalButton
          buttonText="Create Account"
          // onButtonClick={closeMenu}
          modalComponent={<SignupFormModal />}
        />
      </div>
      <div className='profile-btn-container'>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </div>
  );
}

export default Navigation;