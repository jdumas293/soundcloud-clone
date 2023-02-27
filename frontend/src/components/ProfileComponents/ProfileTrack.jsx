import "./ProfilePage.css";

const ProfileTrack = ({ track }) => {

    return (
            // <h1>YOUR TRACKS</h1>
        <div className="profiletrack-container">
            <div className="profiletrack-info-container">
                <div className="profiletrack-title">
                    {track.title}
                </div>
                <div className="profiletrack-description">
                    {track.description}
                </div>
                <div className="profiletrack-genre">
                    {track.genre}
                </div>
                <div className="profiletrack-btns-container">
                    <button className="edit-track-btn">EDIT</button>
                    <button className="delete-track-btn">DELETE</button>
                </div>
            </div>
            <div className="profiletrack-img-container">
                <img src={track.imageUrl} />
            </div>
        </div>
    )
}

export default ProfileTrack;