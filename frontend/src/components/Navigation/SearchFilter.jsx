import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadTracks } from "../../store/track";
import "./SearchFilter.css";
import { useHistory } from "react-router-dom";

const SearchFilter = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchInput, setSearchInput] = useState("");

    const tracks = Object.values(useSelector(state => state.tracks.allTracks));

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value.toLowerCase());
    };

    const handleSearch = () => {
        tracks.forEach(track => {
            if (track.title.toLowerCase().includes(searchInput)) {
                history.push(`/tracks/${track.id}`)
            }
        })
    };

    useEffect(() => {
        dispatch(thunkLoadTracks());
    }, [dispatch]);

    return (
		<div className="searchbar">
			<input 
                placeholder="Search by title"
                type="text" 
                value={searchInput}
                onChange={handleChange}
            />
            <div onClick={handleSearch} className="search-icon">
                <i class="fa-solid fa-magnifying-glass fa-sm"></i>
            </div>
		</div>
    )
}

export default SearchFilter;