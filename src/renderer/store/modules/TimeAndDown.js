const state = {
  quarter: '1stQ',
  time: '0:00',
  down: '1st',
  distance: '0',
};

const mutations = {
  SET_TIME_AND_DOWN(state, payload) {
    const { quarter, time, down, distance } = payload;
    state.quarter = quarter;
    state.time = time;
    state.down = down;
    state.distance = distance;
  },
};

const getters = {
  getTimeAndDown(state) {
    return {
      ...state,
    };
  },
};

const actions = {
  setTimeAndDown({ commit }, { quarter, time, down, distance }) {
    commit('SET_TIME_AND_DOWN', { quarter, time, down, distance });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
