import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadTracks } from "../../../store/track";
import TrackCard from "./TrackCard";
import "./HomePage.css";

const HomePage = () => {
    const dispatch = useDispatch();
    const tracks = Object.values(useSelector(state => state?.tracks?.allTracks));
    // console.log("TRACKS ===>", tracks);

    useEffect(() => {
        dispatch(thunkLoadTracks());
    }, [dispatch]);

    return (
        <>
            <div className="trackcard-container">
                {tracks.map(track => <TrackCard track={track} key={track.id} />)}                
            </div>
            <div className="contact-container">
                <i className="fa-brands fa-linkedin fa-xl" onClick={() => window.open('https://www.linkedin.com/in/josephdumas16/')}></i>
                <i className="fa-brands fa-github fa-xl" onClick={() => window.open('https://github.com/jdumas293')}></i>
            </div>
        </>
    )
}

export default HomePage;