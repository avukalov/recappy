import {
    CURRENT_COMPONENT
} from '../actions/types';


const initialState = {
  current_component: 'My recipes'
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
      case CURRENT_COMPONENT:
        return {
          current_component: payload
        };
      default:
        return state;
    }
}


  