import { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";

const AudioPlayer = ({ tracks }) => {
;   const [trackIndex, setTrackIndex] = useState(0); // index of track being played
    const [trackProgress, setTrackProgress] = useState(0); // current progress of the track
    const [isPlaying, setIsPlaying] = useState(false); // whether or not the track is being played

    const { title, description, genre, imageUrl, file } = tracks[trackIndex] || 0;
    // console.log("TRACKS ===>", tracks);
    // console.log("FILE ===>", file);
    // console.log("TITLE ===>", title);
    // console.log("TRACK INDEX ===>", trackIndex);

    // Refs
    const audioRef = useRef(new Audio(file));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const { duration } = audioRef.current;

    const toPrevTrack = () => {
        console.log('TODO go to prev');
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        };
    };

    const toNextTrack = () => {
        console.log('TODO go to next');
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        };
    };

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    }

    const onScrub = (value) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }

    // Call play/pause method when isPlaying changes
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Clean up when the component unmounts
    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(file);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true
        }
    }, [trackIndex]);

    return (
        <div className="audioplayer-container">
            <div className="track-info-container">
                <img
                    className="album-art"
                    src={imageUrl}
                />
                <h2 className="track-title">{title}</h2>
                <AudioControls 
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
                <input
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    className="progress"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                />
            </div>
        </div>
    );
}

export default AudioPlayer;