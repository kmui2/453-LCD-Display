import Vue from 'vue';
import Vuex from 'vuex';
// import {
//   /* createPersistedState, */ createSharedMutations,
// } from 'vuex-electron';

import modules from './modules';
/* eslint-disable no-console */
Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [
    /* createPersistedState(), */
    /* createSharedMutations() */
  ],
  strict: process.env.NODE_ENV !== 'production',
});
