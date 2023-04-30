// import { BsMusicNoteBeamed } from 'react-icons/bs';
import { truncateDesc } from "../../../store/utils";
import "./AudioPlayerV2.css";

const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef, handleNext }) => {
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    return (
        <div>
            <audio
                src={currentTrack?.file} 
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={handleNext} 
            />
            <div className='audio-info-v2'>
                <div className='audio-image-v2'>
                    <img src={currentTrack?.imageUrl} alt="NO TRACK LOADED" />
                </div>
                <div className="text-v2">
                    <div>{currentTrack?.title}</div>
                    <div>{truncateDesc(currentTrack?.artist)}</div>
                </div>
            </div>
        </div>
    );
};

export default DisplayTrack;