import {combineReducers} from 'redux';
import auth from './modules/auth';
import item from './modules/item';
import room from './modules/room';
import space from './modules/space';

export default combineReducers({
  auth,
  item,
  room,
  space,
});
