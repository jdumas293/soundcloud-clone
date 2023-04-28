import { useState } from "react";
import { useHistory } from "react-router-dom";
import SelectTrackButton from "../TrackComponents/AudioPlayerV2/SelectTrackButton";
import DeletePlaylistTrackButton from "./DeletePlaylistTrackButton";
import "./PlaylistTrackCard.css";

const PlaylistTrackCard = ({ track, playlist }) => {
    const history = useHistory();
    const [showSelectButton, setShowSelectButton] = useState(false);

    const handleMouseEnter = () => {
        setShowSelectButton(true);
    };

    const handleMouseLeave = () => {
        setShowSelectButton(false);
    };

    const handleClick = () => {
        history.push(`/tracks/${track.id}`)
    };

    return (
        <div>
            <div 
                className="playlist-track-image"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img onClick={handleClick} src={track.imageUrl} />
                {showSelectButton && <SelectTrackButton track={track} />}
            </div>
            <div className="playlist-track-info-container">
                <div className="playlist-track-title">
                    <div>{track.title}</div>
                    <div>{track.artist}</div>
                </div>
                <div className="trash-bin">
                    <DeletePlaylistTrackButton playlistId={playlist.id} track={track} />
                </div>
            </div>
        </div>
    )
}

export default PlaylistTrackCard;