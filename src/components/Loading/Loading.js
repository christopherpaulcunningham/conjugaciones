import React from 'react';
import './Loading.css';

const Loading = (props) => {
    return (
        <div className="loading-container">
            <div className="loader">
                <div className="loading-spinner loading-full-height"></div>
            </div>
        </div>
    )
}

export default Loading;
