import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadTracks } from "../../../store/track";
import TrackCard from "./TrackCard";
import "./HomePage.css";
// import AudioPlayer from "../AltAudioPlayer/AudioPlayer";

const HomePage = () => {
    const dispatch = useDispatch();
    const tracks = Object.values(useSelector(state => state?.tracks?.allTracks));
    // console.log("TRACKS ===>", tracks);

    useEffect(() => {
        dispatch(thunkLoadTracks());
    }, [dispatch]);

    return (
        <>
            <div className="track-display"></div>
            <div className="trackcard-container">
                {tracks.map(track => <TrackCard track={track} />)}                
                {/* <AudioPlayer tracks={tracks} /> */}
            </div>
        </>
    )
}

export default HomePage;