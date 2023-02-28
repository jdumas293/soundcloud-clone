import { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import { truncateDesc } from "../../../store/utils";
import './AudioPlayer.css';

const AudioPlayer = ({ tracks }) => {
    const [trackIndex, setTrackIndex] = useState(0); // index of track being played
    const [trackProgress, setTrackProgress] = useState(0); // current progress of the track
    const [isPlaying, setIsPlaying] = useState(false); // whether or not the track is being played
    // console.log("TRACKS ===>", tracks);
    
    const { title, description, genre, imageUrl, file } = tracks[trackIndex] || 0;

    // Refs
    const audioRef = useRef(new Audio(file));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const { duration } = audioRef.current;

    // Go to previous track
    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        };
    };

    // Go to next track
    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        };
    };

    const startTimer = () => {
        clearInterval(intervalRef.current); // clear interval when timer starts

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) { // if audioRef reaches the end
                toNextTrack(); // play next track
            } else {
                setTrackProgress(audioRef.current.currentTime); // else set track progress to the current time
            }
        }, [1000]); // 1 sec intervals
    }

    const onScrub = (value) => {
        clearInterval(intervalRef.current); // clear current interval
        audioRef.current.currentTime = value; 
        setTrackProgress(audioRef.current.currentTime); // set current time to value of scrubber
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

    // Listens for changes in the track index and load new track
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
                <div className="player-controls">
                    <AudioControls 
                        isPlaying={isPlaying}
                        onPrevClick={toPrevTrack}
                        onNextClick={toNextTrack}
                        onPlayPauseClick={setIsPlaying}
                    />
                </div>
                <div className="player-scrubber">
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
                <div className="player-info-container">
                    <div className="player-image">
                        <img
                            className="album-art"
                            src={imageUrl}
                        />
                    </div>
                    <div className="track-details">
                        <div className="player-track-title">{title}</div>
                        <div className="player-track-description">{truncateDesc(description)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;