import { CHANGE_PROGRAM } from '../constants/ActionTypes';

const initialState = {
  name: '6 PM, My Country',
};

export default function activeProgram(state = initialState, action) {
  switch (action.type) {
  case CHANGE_PROGRAM:
    return {
      name: action.ProgramName
    };

  default:
    return state;
  }
}
