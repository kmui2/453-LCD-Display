import Vue from 'vue';

const state = {
  player: 'X',
  grid: ['', '', '', '', '', '', '', '', '', ''],
  moves: 0,
};

const mutations = {
  // The MSP432 will handle the game logic.
  SET_TIC_TAC_TOE_PLAYER(state, payload) {
    const { player } = payload;
    state.player = player;
  },
  SET_TIC_TAC_TOE_SQUARE(state, payload) {
    // TODO: send i to MSP432
    const { i } = payload;
    Vue.set(state.grid, i, state.player);
    state.moves += 1;
  },
  CLEAR_TIC_TAC_TOE(state) {
    state.grid = ['', '', '', '', '', '', '', '', '', ''];
    state.moves = 0;
  },
};

const getters = {
  getTickTacToeGrid(state) {
    return state.grid;
  },
};

const winningStates = {
  0: [[1, 2], [4, 8], [3, 6]],
  1: [[0, 2], [4, 7]],
  2: [[0, 1], [4, 6], [5, 8]],
  3: [[0, 6], [4, 5]],
  4: [[0, 8], [1, 7], [2, 6], [3, 5]],
  5: [[2, 8], [3, 4]],
  6: [[0, 3], [2, 4], [7, 8]],
  7: [[1, 4], [6, 8]],
  8: [[0, 4], [2, 5], [6, 7]],
};

const actions = {
  async checkForWin({ state }, lastMove) {
    return winningStates[lastMove].some(
      ([req1, req2]) =>
        state.grid[req1] === state.player && state.grid[req2] === state.player,
    );
  },

  setTicTacToePlayer({ commit }, player) {
    commit('SET_TIC_TAC_TOE_PLAYER', { player });
  },

  async setTicTacToeSquare({ commit, dispatch, state }, i) {
    if (state.grid[i] !== '') {
      return;
    }
    commit('SET_TIC_TAC_TOE_SQUARE', { i });
    if (await dispatch('checkForWin', i)) {
      commit('CLEAR_TIC_TAC_TOE');
      // Player 1 is X and Player 2 is O
      await dispatch('sendWin', state.player === 'X' ? 1 : 2);
    } else if (state.moves === 9) {
      await dispatch('sendWin', 0);
    } else {
      await dispatch('setTicTacToePlayer', state.player === 'X' ? 'O' : 'X');
    }
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
