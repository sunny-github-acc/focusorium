import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    // since mapState.. props now is accessible while inserted as argument
    return (
        <div>
            <ul className={props.side}>
                <li><NavLink to="/create">Get started</NavLink></li>
                <li><a href="#ff" onClick={props.signOut}>Log out</a></li>        
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)