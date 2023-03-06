import './SplashPage.css';

const SplashPage = () => {
    return (
        <>
            <div className='splash-container'>
                <div className='splash-image-container'>
                    <img src="http://images.summitmedia-digital.com/esquiremagph/images/2019/02/07/MUSIC_COVER_FEB2019.jpg" alt="splash-img" /> 
                </div>
                <div className='splash-header'>
                    <p>Discover and share new music!</p>
                    {/* <i class="fa-solid fa-music fa-sm"></i> */}
                </div>
            </div>
            <div className='splash-info-container'>
                <div className='splash-demo'>
                    <p>PLEASE LOGIN, SIGN UP, OR USE OUR DEMO USER LOCATED IN THE PROFILE MENU TO ACCESS ALL FEATURES!</p>
                </div>
                <div className="splash-contact-container">
                    <i className="fa-brands fa-linkedin fa-xl" onClick={() => window.open('https://www.linkedin.com/in/josephdumas16/')}></i>
                    <i className="fa-brands fa-github fa-xl" onClick={() => window.open('https://github.com/jdumas293')}></i>
                </div>
            </div>
        </>
    );
};

export default SplashPage;