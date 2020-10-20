const initState = {
    goals: [
        { id: "1", goal: "make this app", nuggets: "try hard" },
        { id: "2", goal: "make another app", nuggets: "and then harder" },
        { id: "3", goal: "make yet another app", nuggets: "and then harderer" }
    ]
};

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_PROJECT":
            console.log("project created", action.project)
            return {
                goals: [action.project, ...state.goals]
            }
        case "CREATE_PROJECT_ERR":
            console.log("create project error", action.err)
            return state;
        case "DELETE_PROJECT":
            console.log("project deleted")
            return state
        case "DELETE_PROJECT_ERR":
            console.log("project not deleted", action)
            return state
        default: 
            return state
    }
};

export default projectReducer