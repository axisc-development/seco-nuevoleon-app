import {INIT_APPLICATION} from '../actions/application.actions';
import manifest from '../../../app.json';

const {name, version} = manifest;

const initialState = {
  status: false,
  version: -1,
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_APPLICATION: {
      return {
        ...state,
        status: true,
        version,
        name,
      };
    }

    default: {
      return state;
    }
  }
};

export default applicationReducer;
