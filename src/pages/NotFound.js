import React from 'react';
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="not-found">
            <h4>Страница не найдена</h4>
            <Link to="/">
                <button>На главную</button>
            </Link>
        </div>
    )
};

export default NotFound; 