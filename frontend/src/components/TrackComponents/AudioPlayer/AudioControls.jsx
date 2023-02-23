import "./AudioPlayer.css";

const AudioControls = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick}) => {
    return (
        <>
            <div className="audio-controls">
                <button
                    type="button"
                    className="prev-btn"
                    aria-label="Previous"
                    onClick={onPrevClick}
                >
                    <i className="fa-solid fa-backward" />
                </button>
                {isPlaying ? (
                    <button
                        type="button"
                        className="pause-btn"
                        aria-label="Pause"
                        onClick={() => onPlayPauseClick(false)}
                    >
                        <i className="fa-solid fa-pause" />
                    </button>
                ) : (
                    <button
                        type="button"
                        className="play-btn"
                        aria-label="Play"
                        onClick={() => onPlayPauseClick(true)}
                    >
                        <i className="fa-solid fa-play" />
                    </button>
                )}
                <button
                    type="button"
                    className="next-btn"
                    aria-label="Next"
                    onClick={onNextClick}
                >
                    <i className="fa-solid fa-forward" />
                </button>
            </div>
        </>
    );
};

export default AudioControls;