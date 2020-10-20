import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom';

// connect connects component with redux store

class Dashboard extends Component {
    render() {
        const { projects, auth } = this.props;
        
        if (!auth.uid) return <Redirect to="/login" />

        return (
            <div className="dashboard container">
                <div className="">
                    <ProjectList projects={projects}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection: "projects", orderBy: ["createdAt", "desc"]}
    ])
)(Dashboard)

// firestoreConnect connects redux and firestore