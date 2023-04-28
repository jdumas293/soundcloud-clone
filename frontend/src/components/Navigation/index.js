import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import UploadTrack from '../TrackComponents/UploadTrack/UploadTrack';
import './Navigation.css';
import SearchFilter from './SearchFilter';
import logo from '../../assets/juke-main-logo.png';
import whitelogo from '../../assets/juke-logo-white.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-background-container'>
      {sessionUser ? (
        <div className='nav-container'>
          <div className='home-btn-container'>
            <div className='home-btn'>
              <NavLink exact to="/"><img id="logo-img" src={whitelogo} /></NavLink>
            </div>
          </div>
          <div className='search-filter'>
            <SearchFilter />
          </div>
          <div className='right-container'>
            <div className='upload-btn'>
              <OpenModalButton 
                buttonText="Upload"
                modalComponent={<UploadTrack />}
              />
            </div>
            <div className='profile-btn-container'>
              {isLoaded && (
                <ProfileButton user={sessionUser} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='nav-container'>
          <div className='home-btn-container'>
            <div>
              <NavLink exact to="/"><img id="logo-img" src={whitelogo} /></NavLink>
            </div>
          </div>
          <div className='right-container'>
            <div className='profile-btn-container'>
              {isLoaded && (
                <ProfileButton user={sessionUser} />
              )}
            </div>
          </div>
        </div>
      )}
  </div>
  );
}

export default Navigation;