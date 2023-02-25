import "./Navigation.css";

const SearchFilter = () => {
    return (
        <div className="search-container">
			<div className="searchbar">
				<input 
                    type="text" 
                    placeholder="Search" 
                    className="search-input" 
                />
				<button className="search-button">Search</button>
			</div>
		</div>
    )
}

export default SearchFilter;