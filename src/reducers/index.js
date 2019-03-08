import { combineReducers } from 'redux';

const data = () => {
  return [
    {regions: 'regions', selected: 'flevo'}
  ];
};

export default combineReducers({
  regions: data
});
