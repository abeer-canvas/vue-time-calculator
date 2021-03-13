import { createStore } from 'vuex';

import timeBlocks from './modules/timeBlocks';
import timeAvg from './modules/timeAvg';
import auth from './modules/auth';

export default createStore({
  modules: {
    blocks: timeBlocks,
    timeAvg,
    auth
  },

});