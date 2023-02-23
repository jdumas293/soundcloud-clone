import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadTracks } from "../../store/track";
import OpenModalButton from '../OpenModalButton';
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import UploadTrack from "./UploadTrack/UploadTrack";
import TrackCard from "./TrackCard";

const LoadAllTracks = () => {
    const dispatch = useDispatch();
    const tracks = Object.values(useSelector(state => state?.tracks?.allTracks));
    // console.log("TRACKS ===>", tracks);

    useEffect(() => {
        dispatch(thunkLoadTracks());
    }, [dispatch]);

    return (
        <>
            {/* <div className="trackcard-container">
                {tracks.map(track => <TrackCard track={track} />)}                
            </div> */}
            <div>
                <OpenModalButton 
                    buttonText="Upload"
                    modalComponent={<UploadTrack />}
                />
            </div>
        </>
    )
}

export default LoadAllTracks;