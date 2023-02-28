import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "../TrackComponents/AudioPlayer/AudioPlayer";
import { thunkLoadTracks } from "../../store/track";
import './Footer.css';

const Footer = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const tracks = Object.values(useSelector(state => state?.tracks?.allTracks));
    // console.log("FOOTER TRACKS===>", tracks);

    useEffect(() => {
        dispatch(thunkLoadTracks())
            .then(setIsLoaded(true))
    }, [dispatch]);


    return isLoaded ? (
        <footer className="footer">
            <AudioPlayer tracks={tracks} />
        </footer>
    ) : (
        <div>
            Loading...
        </div>
    )
}

export default Footer;