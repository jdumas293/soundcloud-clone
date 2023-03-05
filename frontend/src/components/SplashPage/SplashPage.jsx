import './SplashPage.css';

const SplashPage = () => {
    return (
        <>
            <div className='splash-container'>
                <div className='splash-image-container'>
                    <img src="https://kidfromthe6ix.files.wordpress.com/2015/02/tumblr_ncviq9iwd01shh0v3o1_500.gif" alt="splash-img" /> 
                </div>
                <div className='splash-header'>
                    <p>Discover and share new music!</p>
                    <i class="fa-solid fa-music fa-sm"></i>
                </div>
            </div>
            <div className='splash-info-container'>
                <div className='splash-demo'>
                    <h4>PLEASE LOGIN, SIGN UP, OR USE THE DEMO USER LOCATED IN THE PROFILE MENU TO ACCESS ALL FEATURES!</h4>
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