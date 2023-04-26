import { useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const Waveform = () => {
    const [waveformLoaded, setWaveformLoaded] = useState(false);
    const webSurfer = useRef(null);
    const audioData = useRef(null);

    useEffect(() => {
        webSurfer.current = WaveSurfer.create({})
    })

    return (
        <div>WAVE HERE</div>
    )
}