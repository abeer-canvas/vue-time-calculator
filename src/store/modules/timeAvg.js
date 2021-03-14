export default {
  state() {
    return {
      totalMin4Avg: 0,
      totalDays: 0,
      avgTotalMin: 0,
      min4Avg: 0,
      hr4Avg: 0,
      targetAvgTime: 7,
      lastUpdate: '',
      isDateUpdated: true,
      passCode: '',
      password: '',

      // For Bulk Avg Box
      avgBoxInputs: '',
      regexTimes: /[0-9]+:[0-9]+/g,
      allInputsArr: [],
    };
  },
  mutations: {
    GET_ALL_AVG_INPUTS(state, allInputs) {
      state.avgBoxInputs = allInputs;
    },
    GATHERING_ALL_INPUTS(state) {
      if (!state.allInputsArr.length && state.avgBoxInputs) {
        state.allInputsArr = state.avgBoxInputs.match(state.regexTimes);
        state.totalDays += state.allInputsArr.length;
        state.avgBoxInputs = '';
      }
    },
    MINS_FROM_AVG_BOX(state, mins) {
      state.totalMin4Avg += mins;
      state.isDateUpdated = false;

      state.allInputsArr = [];
    },
    SINGLE_TIME_ADDING(state, singleTime) {
      state.isDateUpdated = false;
      if (singleTime) {
        state.totalMin4Avg += singleTime;
        state.totalDays++;
        alert('Added Successfully');
      }
    },
    GET_AVG(state) {

      if (state.totalMin4Avg) {
        let totalDays = state.totalDays;

        state.avgTotalMin = state.totalMin4Avg / totalDays;
        let minsPerDay = Math.round(state.avgTotalMin);
        let remainderMins = minsPerDay % 60;
        // remainderMins: minutes of eventual average time

        state.min4Avg = remainderMins;
        state.hr4Avg = (minsPerDay - remainderMins) / 60;
      } else {
        state.totalMin4Avg = 0;
      }
    },
    LOGGED_IN(state, payload) {
      state.password = payload;
    },
    LOGGED_OUT(state) {
      state.password = '';
    },
    FETCH_DATA(state, payload) {
      state.totalMin4Avg = payload.totalMin;
      state.totalDays = payload.totalDays;
      state.lastUpdate = payload.lastUpdate;
      state.isDateUpdated = payload.isDateUpdated;
      state.password = payload.password;
      state.passCode = payload.passCode;
    },
    UPDATE_DATE(state, payload) {
      state.lastUpdate = payload;
      state.isDateUpdated = true;
    }
  },
  actions: {
    getAllAvgInputs({ commit }, allInputs) {
      commit('GET_ALL_AVG_INPUTS', allInputs);
    },
    gatheringAllInputs({ commit }) {
      commit('GATHERING_ALL_INPUTS');
    },
    minsFromAvgBox({ commit }, mins) {
      commit('MINS_FROM_AVG_BOX', mins);
    },
    singleTimeAdding({ commit }, singleTime) {
      commit('SINGLE_TIME_ADDING', singleTime);
    },
    getAvg({ commit }) {
      commit('GET_AVG');
    },
    loggedIn(context, payload) {
      context.commit('LOGGED_IN', payload);

      let totalMin = context.rootGetters.totalMin4Avg;
      let totalDays = context.rootGetters.totalDays;
      let lastUpdate = context.rootGetters.lastUpdate;
      let isDateUpdated = context.rootGetters.isDateUpdated;
      let password = context.rootGetters.password;
      let passCode = context.rootGetters.passCode;

      fetch('https://time-calculator-abir-default-rtdb.firebaseio.com/time.json', {
        method: 'PUT',
        body: JSON.stringify({
          totalMin,
          totalDays,
          lastUpdate,
          isDateUpdated,
          password,
          passCode
        })
      }).then(response => {
        if (response.ok) {
          return response.json();

        } else {
          throw Error('Not added')
        }
      })

    },
    loggedOut(context) {
      context.commit('LOGGED_OUT');

      let totalMin = context.rootGetters.totalMin4Avg;
      let totalDays = context.rootGetters.totalDays;
      let lastUpdate = context.rootGetters.lastUpdate;
      let isDateUpdated = context.rootGetters.isDateUpdated;
      let password = context.rootGetters.password;
      let passCode = context.rootGetters.passCode;

      fetch('https://time-calculator-abir-default-rtdb.firebaseio.com/time.json', {
        method: 'PUT',
        body: JSON.stringify({
          totalMin,
          totalDays,
          lastUpdate,
          isDateUpdated,
          password,
          passCode
        })
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Not added')
        }
      })
    },
    timeAdded(context) {
      let totalMin = context.rootGetters.totalMin4Avg;
      let totalDays = context.rootGetters.totalDays;
      let lastUpdate = context.rootGetters.lastUpdate;
      let isDateUpdated = context.rootGetters.isDateUpdated;
      let password = context.rootGetters.password;
      let passCode = context.rootGetters.passCode;

      fetch('https://time-calculator-abir-default-rtdb.firebaseio.com/time.json', {
        method: 'PUT',
        body: JSON.stringify({
          totalMin,
          totalDays,
          lastUpdate,
          isDateUpdated,
          password,
          passCode
        })
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Not added')
        }
      })
    },
    timeFetching(context) {
      fetch('https://time-calculator-abir-default-rtdb.firebaseio.com/time.json')
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error('Not fetched')
          }
        }).then(data => {
          let timeDataArr = {
            totalMin: data.totalMin,
            totalDays: data.totalDays,
            lastUpdate: data.lastUpdate,
            isDateUpdated: data.isDateUpdated,
            password: data.password,
            passCode: data.passCode
          }

          context.commit('FETCH_DATA', timeDataArr);
          context.commit('GET_AVG');
        });
    },
    updateDate(context, payload) {
      context.commit('UPDATE_DATE', payload);

      let totalMin = context.rootGetters.totalMin4Avg;
      let totalDays = context.rootGetters.totalDays;
      let lastUpdate = context.rootGetters.lastUpdate;
      let isDateUpdated = context.rootGetters.isDateUpdated;
      let password = context.rootGetters.password;
      let passCode = context.rootGetters.passCode;

      fetch('https://time-calculator-abir-default-rtdb.firebaseio.com/time.json', {
        method: 'PUT',
        body: JSON.stringify({
          totalMin,
          totalDays,
          lastUpdate,
          isDateUpdated,
          password,
          passCode
        })
      });
    },
    // doUpdateDate(context) {
    //   context.commit('DO_UPDATE_DATE');
    // }
  },
  getters: {
    getAllInputsArr(state) {
      return state.allInputsArr;
    },
    totalMin4Avg(state) {
      return state.totalMin4Avg;
    },
    totalDays(state) {
      return state.totalDays;
    },
    lastUpdate(state) {
      return state.lastUpdate;
    },
    isDateUpdated(state) {
      return state.isDateUpdated;
    },
    // isLoggedIn(state) {
    //   return state.isLoggedIn;
    // },
    passCode(state) {
      return state.passCode;
    },
    password(state) {
      return state.password;
    },
    min4Avg(state) {
      return state.min4Avg;
    },
    hr4Avg(state) {
      return state.hr4Avg;
    },
    targetAvgTime(state) {
      return state.targetAvgTime;
    }
  }
}