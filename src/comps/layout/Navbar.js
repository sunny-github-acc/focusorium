import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux'
import Notifications from '../dashboard/Notifications'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Navbar = (props) => {
    const { auth, profile, notifications } = props;
    const right = "right";
    const defaultSide = "right";
    const links = auth.uid ? 
        <SignedInLinks profile={profile} side={right} /> : 
        <SignedOutLinks side={right} />
    const mobileLinks = auth.uid ? 
        <SignedInLinks profile={profile} side={defaultSide} /> : 
        <SignedOutLinks side={defaultSide} />
    const isVisible = auth.uid ? "" : "hide";
        return (
            <div className="c">
            <nav className="nav-wrapper blue lighten-2">
                
                <div className="container hide-on-small-only">
                    <Link to="/" className="brand-logo left">focusorium</Link>
                    <div className="right">
                        <a className={'dropdown-trigger yellow red-text text-lighten-2 btn-floating btn ' + isVisible}
                        href='/#' 
                        data-target='dropdown1'>
                            {profile.initials}
                        </a>
                    </div>
                    <ul className="right">
                        <a className={'dropdown-trigger ' + isVisible} 
                        style={{paddingRight: "10px"}} href='/#' data-target='dropdown2'>
                            Notifications 
                        </a>
                    </ul>
                    { links }
                </div>
                
                {/* mobile navbar */}
                <div className="container hide-on-med-and-up"> 
                    <Link to="/" className="brand-logo left mobile-title">focusorium</Link>
                    <a href="/#" className="sidenav-trigger right" data-target="slide-out">
                        <i className="material-icons">menu</i>
                    </a>
                    <Link className={"btn right notification-btn blue white-text btn-flat lighten-2 " + isVisible}
                    to='/notifications'>
                        <i className="material-icons">notifications</i> 
                    </Link>
                </div>
            </nav>

                {/* slide out  */}
                <ul id="slide-out" className="sidenav sidenav-close blue right" >
                    <div className="user-view"><li>
                        <a href="#user">{ mobileLinks }</a>
                    </li></div>
                </ul>
                
                {/* dropdown content user */}
                <div className="row">
                    <ul id='dropdown1' className='dropdown-content' >
                        <li><a className="yellow red-text center text-lighten-2" 
                        href="#!">{profile.firstName} {profile.lastName}</a></li>
                        <li><a className="yellow red-text center text-lighten-2" 
                        href="#!">{auth.email}</a></li>
                    </ul>
                </div>

                {/* dropdown content notifications */}
                <ul id='dropdown2' className='dropdown-content notifications'  style={{minWidth: "550px"}}>
                    <Notifications notifications={notifications} />
                </ul>
            
            </div>

        )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        notifications: state.firestore.ordered.notifications
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
    ])
)(Navbar)