const state = {
  outcome: undefined,
};

const mutations = {
  // The MSP432 will handle the game logic.
  SET_OUTCOME(state, payload) {
    const { outcome } = payload;
    state.outcome = outcome;
  },
};

const getters = {
  getOutcome(state) {
    return state.outcome;
  },
};

const actions = {
  setOutcome({ commit }, outcome) {
    commit('SET_OUTCOME', { outcome });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
