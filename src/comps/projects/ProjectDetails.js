import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Component } from 'react'
import { deleteProject } from '../../store/actions/projectActions'

class ProjectDetails extends Component {
    handleDelete = (e) => {
        this.props.deleteProject(this.props.match.params.id);
        this.props.history.push("/")
    }
    render() {
        const { project, auth, profile } = this.props;
        if (!auth.uid) return <Redirect to="/login" />  

        if (project) {
            return (
                <div className="container section project-details">
                    <div className="card yellow red-text text-lighten-2 z-depth-0">
                        <h4 className="card-content">{project.goal}</h4>
                        <h5 className="card-content" style={{paddingTop: "0"}}>{project.nuggets}</h5>
                        </div>
                    <div className="card-action yellow blue-text text-lighten-2"  
                    style={{padding: "5px"}}>
                        Posted by {profile.firstName} {profile.lastName}   <br />
                        {moment(project.createdAt.toDate()).calendar()} <br />
                        <button 
                        className="btn-small waves-effect wawes-dark z-depth-0 red left lighten-4 blue-text text-lighten-2"
                        onClick={this.handleDelete}
                        style={{marginTop: "15px"}}>
                            Delete this post
                        </button>
                    </div>
                </div>
        )
        } else {
            return (
                <div className="container title center">
                    <p>No projects at the moments</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    // ownProps > props of a component before we attatch anything to it
    return {
        project: project,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProject: (id) => dispatch(deleteProject(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(([
        { collection: "projects" }
    ]))
)(ProjectDetails)