import { createStore } from 'vuex';

import timeBlocks from './modules/timeBlocks';
import timeAvg from './modules/timeAvg';

export default createStore({
  modules: {
    blocks: timeBlocks,
    timeAvg
  },
  state() {
    return {
      manualMessage: `Here I calculate how much time I am giving in Programming every day. The way I calculate it may not be convenient for you, though it works perfectly for me as it's a personal project.
      In the left side I calculate time-blocks which means how much time I spend continuously in a period. In the right side I can see what is the average time I give. This average started from the March 1st. Although you cannot calculate the average for you but you can calculate time-blocks. I attached this site to firebase and in order to protect my data I included a little login system.
      This is how the input system works:`
    };
  },
  getters: {
    manualMessage(state) {
      return state.manualMessage;
    }
  }
});