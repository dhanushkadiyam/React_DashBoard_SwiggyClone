import React from 'react';
import {Link} from 'react-router-dom';

class NotFound extends React.Component {
    render() {
        return (
            <>
            <div className="errorSection">
                <h1>404</h1>
                <div>Page Not Found</div>
                <br />
                <Link to="/" style={{ fontSize: '1.5rem', color: 'darkblue', textDecoration: 'underline' }}>Go to Home Page</Link>
            </div>
            </>
        );
    }
}

export default NotFound