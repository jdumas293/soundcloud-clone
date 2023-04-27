import { useState } from "react";
import SelectTrackButton from "../TrackComponents/AudioPlayerV2/SelectTrackButton";
import DeletePlaylistTrackButton from "./DeletePlaylistTrackButton";
import "./PlaylistTrackCard.css";

const PlaylistTrackCard = ({ track, playlist }) => {
    const [showSelectButton, setShowSelectButton] = useState(false);

    const handleMouseEnter = () => {
        setShowSelectButton(true);
    };

    const handleMouseLeave = () => {
        setShowSelectButton(false);
    };

    return (
        <div>
            <div 
                className="playlist-track-image"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={track.imageUrl} />
                {showSelectButton && <SelectTrackButton track={track} />}
            </div>
            <div className="playlist-track-info-container">
                <div className="playlist-track-title">
                    <div>{track.title}</div>
                    <div>{track.artist}</div>
                </div>
                <div>
                    <DeletePlaylistTrackButton playlistId={playlist.id} track={track} />
                </div>
            </div>
        </div>
    )
}

export default PlaylistTrackCard;