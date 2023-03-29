import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetLikes } from "../../store/like";
import { thunkCreateTrackPlaylist } from "../../store/playlist";
import "./AddPlaylistTrack.css";

const AddPlaylistTrack = ({ playlist }) => {
    const dispatch = useDispatch();
    const likes = Object.values(useSelector(state => state?.likes?.allLikes));
    console.log("LIKES", likes)

    const handleAdd = () => {
        dispatch(thunkCreateTrackPlaylist(playlist.id));
    }

    useEffect(() => {
        dispatch(thunkGetLikes());
    }, [dispatch]);

    return (
        <div>
            <div className="add-playlist-header-container">
                <div className="add-playlist-name-header">
                    {playlist.name} - <div className="add-playlist-description-header">Choose a song to add to your playlist</div>
                </div>
            </div>
            <div>
                {likes.map(like => {
                    console.log("LIKE", like);
                    return (
                        <>
                            <div className="playlist-add-container">
                                <div className="playlist-add-title">
                                    {like.Track.title}
                                </div>
                                <div className="playlist-add-image-plus">
                                    <div>
                                        <i onClick={handleAdd} class="fa-solid fa-plus"></i>
                                    </div>
                                    <div>
                                        <img src={like.Track.imageUrl} alt="playlist-like-imgs" />
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    );
};

export default AddPlaylistTrack;