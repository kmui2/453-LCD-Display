const state = {
  question: undefined,
};

const mutations = {
  // The MSP432 will handle the game logic.
  SET_QUESTION(state, payload) {
    const { question } = payload;
    state.question = question;
  },
};

const getters = {
  getQuestion(state) {
    return state.question;
  },
};

export default {
  state,
  mutations,
  getters,
};
