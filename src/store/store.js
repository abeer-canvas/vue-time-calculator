import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      timeInput: '',
      regexBlocks: /[0-9]{1,2}:[0-9]{1,2}[ap]m - [0-9]{1,2}:[0-9]{1,2}[ap]m/gi,
      regexExtraMin: /[+-][0-9]+(?=(m|min|mins|mint|mints|minute|minutes)\))/gi,
      timeBlocksArr: [],
      extraMinArr: [],
      totalMin: 0,
      totalExtraMin: 0,
      hh: 0,
      mm: 0,
      targetHours: 8
    }
  },
  mutations: {
    INSERT_TIME_INPUT(state, timeInput) {
      state.timeInput = timeInput;
    },
    DEFAULT_SETTING(state) {
      state.timeBlocksArr = [];
      state.extraMinArr = [];
      state.totalMin = 0;
      state.totalExtraMin = 0;
      state.hh = 0;
      state.mm = 0;
    },
    GATHERING_TIME_BLOCKS(state) {
      state.timeBlocksArr = state.timeInput.match(state.regexBlocks);
      console.log(state.timeBlocksArr);
    },
    GATHERING_EXTRA_MIN(state) {
      state.extraMinArr = state.timeInput.match(state.regexExtraMin);
      console.log(state.extraMinArr);
    },
    SUM_TOTAL_EXTRA_MIN(state) {
      state.totalExtraMin = 0;
      if (state.extraMinArr) {
        state.extraMinArr.forEach(block => {
          let Num = Number(block);
          state.totalExtraMin += Num;
        });
      }
    },
    ADD_TOTAL_BLOCK_MIN(state, totalBlockMin) {
      state.totalMin += totalBlockMin;
    },
    ADD_SUBTRACT_EXTRA_MIN(state) {
      if (state.totalExtraMin !== 0) {
        state.totalMin += state.totalExtraMin;
      }
    },
    TOTAL_TIME(state) {
      state.hh = (state.totalMin - (state.totalMin % 60)) / 60;
      state.mm = state.totalMin % 60;
    }
  },
  actions: {
    insertTimeInput(context, timeInput) {
      context.commit('INSERT_TIME_INPUT', timeInput);
    },
    defaultSetting(context) {
      context.commit('DEFAULT_SETTING');
    },
    gatheringTimeBlocks(context) {
      context.commit('GATHERING_TIME_BLOCKS');
    },
    gatheringExtraMin(context) {
      context.commit('GATHERING_EXTRA_MIN');
    },
    sumTotalExtraMin(context) {
      context.commit('SUM_TOTAL_EXTRA_MIN');
    },
    addTotalBlockMin(context, totalBlockMin) {
      context.commit('ADD_TOTAL_BLOCK_MIN', totalBlockMin);
    },
    addSubtractExtraMin(context) {
      context.commit('ADD_SUBTRACT_EXTRA_MIN');
    },
    totalTime(context) {
      context.commit('TOTAL_TIME');
    }
  },
  getters: {
    getTimeBlocksArray(state) {
      return state.timeBlocksArr;
    },
    hours(state) {
      return state.hh;
    },
    minutes(state) {
      return state.mm;
    },
    getTargetHours(state) {
      return state.targetHours;
    }
  }
});