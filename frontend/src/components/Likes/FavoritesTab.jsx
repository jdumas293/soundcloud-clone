import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetLikes } from "../../store/like";
import LikeCard from "./LikeCard";
import './FavoritesTab.css';

const FavoritesTab = () => {
    const dispatch = useDispatch();
    const likes = Object.values(useSelector(state => state?.likes?.allLikes));

    useEffect(() => {
        dispatch(thunkGetLikes());
    }, [dispatch])

    return (
        <div className="like-card-container">
            {likes.map(like => <LikeCard like={like} key={like.id} />)}
        </div>
    )
}

export default FavoritesTab;