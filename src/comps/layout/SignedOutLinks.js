import React from 'react';
import { NavLink } from 'react-router-dom';

// NavLink vs Link???

const SignedOutLinks = ({side}) => {
    return (
        <div>
            <ul className={side}>
                <li><NavLink to="/signup">Signup</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
            </ul>
        </div>
    )
}

export default SignedOutLinks