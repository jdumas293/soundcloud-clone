import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetLikes } from "../../store/like";
import { thunkCreateTrackPlaylist } from "../../store/playlist";
import "./AddPlaylistTrack.css";

const AddPlaylistTrack = ({ playlist }) => {
    const dispatch = useDispatch();
    const likes = Object.values(useSelector(state => state?.likes?.allLikes));
    // console.log('LIKES', likes);

    const handleAdd = (track) => {
        // e.preventDefault();
        dispatch(thunkCreateTrackPlaylist(track, playlist.id));
    }

    useEffect(() => {
        dispatch(thunkGetLikes());
    }, [dispatch]);

    return (
        <div>
            <div>
                {likes.map(like => {
                    return (
                        <div className="playlist-add-container">
                            <div className="playlist-add-title">
                                {like.Track.title}
                            </div>
                            <div className="playlist-add-image-plus">
                                <div onClick={handleAdd(like.Track)}>
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                                <div>
                                    <img src={like.Track.imageUrl} alt="playlist-like-imgs" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AddPlaylistTrack;