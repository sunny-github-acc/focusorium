export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorUID = getState().firebase.auth.uid;
        const createdAt = new Date();
        firestore.collection("projects").add({
            ...project,
            authorName: profile.firstName,
            authorLastName: profile.lastName,
            createdAt,
            authorUID
        }).then(() => {
            dispatch({ type: "CREATE_PROJECT", project});
        }).catch((err) => {
            dispatch({ type: "CREATE_PROJECT_ERR", err });
        })
    }
};

export const deleteProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection("projects")
        .doc(project)
        .delete()
        .then(() => {
            dispatch({ type: "DELETE_PROJECT", project });
        }).catch((err) => {
        dispatch({ type: "DELETE_PROJECT_ERR", err });
        })
    }
}