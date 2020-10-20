import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createProject } from '../../store/actions/projectActions';

class ProjectCreation extends Component {
    state = {
        goal: "",
        nuggets: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProject(this.state);
        setTimeout(() => {
            this.props.history.push("/")
        }, 300);
    }
    render() {
        const { auth } = this.props;

        if (!auth.uid) return <Redirect to="/" />

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="yellow ">
                    <h5 className="yellow blue-text lighten-text-2">
                        Create a goal, make a wish or just tell me something.. ;))
                    </h5>
                    <div className="input-field">
                        <label blue-text lighten-text-2 htmlFor="goal">Title</label>
                        <input type="text" id="goal" onChange={this.handleChange} required />
                    </div>
                    <div className="input-field ">
                        <label htmlFor="nugget">Details</label>
                        <textarea id="nuggets" onChange={this.handleChange} className="materialize-textarea"></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn waves-effect blue lighten-2 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreation)
