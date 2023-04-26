import { useEffect, useState, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const Waveform = ({ track }) => {
    console.log(track);
    
    useEffect(() => {
        const wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'blue',
            // progressColor: 'red'
        });

        wavesurfer.load(track?.file);
    })

    return (
        <div id="waveform"></div>
    )
}

export default Waveform;