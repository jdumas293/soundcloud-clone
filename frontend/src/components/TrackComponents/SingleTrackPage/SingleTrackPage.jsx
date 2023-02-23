import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { thunkLoadSingleTrack } from "../../../store/track";
import "./SingleTrackPage.css"

const SingleTrackPage = () => {
    const dispatch = useDispatch();
    const { trackId } = useParams();

    const track = useSelector(state => state.tracks.singleTrack);
    console.log(track);

    useEffect(() => {
        dispatch(thunkLoadSingleTrack(trackId));
    }, [dispatch, trackId]);

    return (
        <>
            <div className="singletrack-container">
                <div className="singletrack-info-container">
                    <div className="singletrack-title">
                        <h1>{track.title}</h1>
                    </div>
                    <div className="singletrack-description">
                        {track.description}
                    </div>
                    <div className="singletrack-genre">
                        Genre: {track.genre}
                    </div>
                </div>
                <div className="singletrack-img-container">
                    <img src={track.imageUrl} alt="" />
                </div>
            </div>
            <div className="singletrack-comments-container">
                COMMENTS HERE
            </div>
        </>
    )
}

export default SingleTrackPage;