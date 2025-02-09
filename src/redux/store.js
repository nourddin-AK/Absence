import { createStore } from 'redux';
import group from './reducers';

const store = createStore(group);

export default store;
