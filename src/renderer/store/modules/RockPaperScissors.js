const state = {
  resultSet: false,
  player1: undefined,
  player2: undefined,
  winner: undefined,
};

const mutations = {
  CLEAR_ROCK_PAPER_SCISSORS_RESULT(state) {
    state.resultSet = false;
  },
  SET_ROCK_PAPER_SCISSORS_RESULT(state, payload) {
    state.resultSet = true;
    state.player1 = payload.player1;
    state.player2 = payload.player2;
    state.winner = payload.winner;
  },
};

const getters = {
  isResultSet(state) {
    return state.resultSet;
  },
  getWinner(state) {
    return state.winner;
  },
  getPlayer1(state) {
    return state.player1;
  },
  getPlayer2(state) {
    return state.player2;
  }
};

const actions = {
  clearRockPaperScissorsResult({ commit }) {
    commit('CLEAR_ROCK_PAPER_SCISSORS_RESULT');
  },
  setRockPaperScissorsResult({ commit }, result) {
    commit('SET_ROCK_PAPER_SCISSORS_RESULT', result);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
