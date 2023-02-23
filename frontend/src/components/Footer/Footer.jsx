import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadTracks } from "../../store/track";
import AudioPlayer from "../TrackComponents/AudioPlayer/AudioPlayer";
import './Footer.css';

const Footer = () => {
    const dispatch = useDispatch();
    const tracks = Object.values(useSelector(state => state.tracks.allTracks));

    useEffect(() => {
        dispatch(thunkLoadTracks());
    }, [dispatch]);

    return (
        <footer className="footer">
            <AudioPlayer tracks={tracks} />
        </footer>
    )
}

export default Footer;