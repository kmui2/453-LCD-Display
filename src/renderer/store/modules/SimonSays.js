// function delay(ms) {
//   return function(x) {
//     return new Promise((resolve) => setTimeout(() => resolve(x), ms));
//   };
// }
const state = {
  color: undefined,
  colors: ['red', 'blue', 'green', 'yellow'],
  timer: 500,
  length: 5,
};

const mutations = {
  SET_SIMON_SAYS_COLOR(state, payload) {
    const { color } = payload;
    state.color = color;
  },
};

const getters = {
  getSimonSaysColor(state) {
    return state.color;
  },
};

const actions = {
  startSimonSays({ state, commit }) {
    for (let i = 0; i < state.length; i += 1) {
      commit('SET_SIMON_SAYS_COLOR', state.colors[i]);
    }
  },
  setSSColor({ commit }, color) {
    commit('SET_SIMON_SAYS_COLOR', { color });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
