import React, { useState } from 'react';

const AudioPlayerContext = React.createContext([{}, () => {}]);

const AudioPlayerProvider = (props) => {

    const [currentTrack, setCurrentTrack] = useState({});

    return (
        <AudioPlayerContext.Provider value={[currentTrack, setCurrentTrack]}>
            {props.children}
        </AudioPlayerContext.Provider>
    );
};

export { AudioPlayerContext, AudioPlayerProvider }