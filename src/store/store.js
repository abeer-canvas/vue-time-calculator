import { createStore } from 'vuex';

import timeBlocks from './modules/timeBlocks';
import timeAvg from './modules/timeAvg';

export default createStore({
  modules: {
    blocks: timeBlocks,
    timeAvg
  },

});