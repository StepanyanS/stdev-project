import { ProjectsActions, PROJECT_ACTION } from './projects.action';

const initialState = {
  projects: []
};

export function projectsReducer(state = initialState, action: ProjectsActions) {
  switch (action.type) {
    case PROJECT_ACTION.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    case PROJECT_ACTION.GET_PROJECTS:
      return {
        ...state,
        projects: [...action.payload]
      };
    case PROJECT_ACTION.DELETE_PROJECT:
      return {
        ...state,
        projects: [...state.projects.filter((project) => project.id !== action.payload)]
      };
    default:
      return state;
  }
}
