const TrackCard = ({ track }) => {
    return (
        <>
            <div className="trackdetails-container">
                <div id="track-image">
                    <img src={track.imageUrl}></img>
                </div>
                <div className="track-title">
                    {track.title}
                </div>
                <div className="track-description">
                    {track.description}
                </div>
                <div id="track-genre">
                    {track.genre}
                </div>
            </div>
        </>
    )
}

export default TrackCard;