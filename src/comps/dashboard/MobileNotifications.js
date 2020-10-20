import React from 'react';
import { connect } from 'react-redux'
import Notifications from '../dashboard/Notifications'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

const MobileNotifications = (props) => {
    const { notifications, auth } = props;
    
    if (!auth.uid) return <Redirect to="/" />

        return (
            <div className="container yellow">
                <Notifications notifications={notifications} />
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        notifications: state.firestore.ordered.notifications,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection: "notifications", limit: 10, orderBy: ["time", "desc"] }
    ])
)(MobileNotifications)