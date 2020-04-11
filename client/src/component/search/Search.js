import React from 'react'

function SearchArea(props) {
    return (
        <div className="search-area">
            <form onSubmit={props.searchBook} action="">
                <input
                    className="search-bar"
                    onChange={props.handleSearch}
                    type="text"
                />
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchArea
