import { CHANGE_PROGRAM } from '../constants/ActionTypes';

const initialState = {
  name: '6 PM, My Country',
};

export default function activeProgram(state = initialState, action) {
  switch (action.type) {
  case CHANGE_PROGRAM:
  console.log("action : %o", action);
    return {
      name: action.program.programName,
      id: action.program.programId
    };

  default:
    return state;
  }
}
