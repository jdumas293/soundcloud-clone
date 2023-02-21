import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadTracks } from "../../store/track";
import TrackCard from "./TrackCard";

const LoadAllTracks = () => {
    const dispatch = useDispatch();
    const tracks = Object.values(useSelector(state => state.tracks.allTracks));
    // console.log("TRACKS ===>", tracks);

    useEffect(() => {
        dispatch(thunkLoadTracks());
    }, [dispatch]);

    return (
        <>
            <div className="trackcard-container">
                {tracks.map(track => <TrackCard track={track} />)}                
            </div>
        </>
    )
}

export default LoadAllTracks;