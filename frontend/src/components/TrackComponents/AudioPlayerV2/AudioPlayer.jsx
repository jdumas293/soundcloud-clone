import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";
import "./AudioPlayerV2.css";
import { thunkLoadTracks } from "../../../store/track";
import { useDispatch } from "react-redux";

const AudioPlayerV2 = () => {
    const dispatch = useDispatch();
    const tracks = useSelector(state => state?.tracks?.allTracks)
    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // console.log("FIRST TRACK!!!", tracks[1]?.file);

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
        .then(setIsLoaded(true));
    }, [dispatch]);

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