import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadTracks } from "../../../store/track";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import "./AudioPlayerV2.css";

const AudioPlayerV2 = () => {
    const dispatch = useDispatch();
    const tracks = Object.values(useSelector(state => state?.tracks?.allTracks));
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    console.log("TRACK INDEX", trackIndex);
    console.log("CURRENT TRACK", currentTrack);
    console.log("ALL TRACKS", tracks);

    const audioRef = useRef();
    const progressBarRef = useRef();
    // console.log(audioRef);

    const handleNext = () => {
        if (trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0])
        } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
        };
    };

    useEffect(() => {
        dispatch(thunkLoadTracks())
        // .then(_ => {
        //     console.log("TRACKSSSSS", tracks);
        //     setCurrentTrack(tracks[trackIndex])
        // })
        .then(setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        setCurrentTrack(tracks[trackIndex])
    }, [tracks])

    return isLoaded && (
        <div className="audio-player-v2">
            <div className="inner">
                <Controls 
                    audioRef={audioRef}
                    progressBarRef={progressBarRef}
                    duration={duration}
                    setTimeProgress={setTimeProgress}
                    tracks={tracks}
                    trackIndex={trackIndex}
                    setTrackIndex={setTrackIndex}
                    setCurrentTrack={setCurrentTrack}
                    handleNext={handleNext}
                />
                <ProgressBar
                    progressBarRef={progressBarRef}
                    audioRef={audioRef}
                    timeProgress={timeProgress}
                    duration={duration}
                />
                <DisplayTrack 
                    currentTrack={currentTrack}
                    audioRef={audioRef}
                    setDuration={setDuration}
                    progressBarRef={progressBarRef}
                    handleNext={handleNext}
                />
            </div>
        </div>
    );
};

export default AudioPlayerV2;