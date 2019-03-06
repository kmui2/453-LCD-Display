<template>
  <div id="app">
    <rock-paper-sissors v-if="screen == ROCK_PAPER_SCISSORS"></rock-paper-sissors>
    <simon-says v-if="screen == SIMON_SAYS"></simon-says>
    <tic-tac-toe v-if="screen == TIC_TAC_TOE"></tic-tac-toe>
    <trivia v-if="screen == TRIVIA"></trivia>
    <div v-if="screen == MAIN">
      <h1>Main Screen</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RockPaperSissors from './components/RockPaperSissors.vue';
import SimonSays from './components/SimonSays.vue';
import TicTacToe from './components/TicTacToe.vue';
import Trivia from './components/Trivia.vue';
import {
  ROCK_PAPER_SCISSORS,
  SIMON_SAYS,
  TIC_TAC_TOE,
  MAIN,
  TRIVIA,
} from './constants/screens.js';

export default {
  name: 'LCD-vue',
  components: {
    RockPaperSissors,
    SimonSays,
    TicTacToe,
    Trivia,
  },
  computed: {
    ...mapGetters(['getScreen']),
    screen() {
      return this.getScreen;
    },
  },
  beforeCreate() {
    console.log('before create');
    this.$store.dispatch('startPortRead');
  },
  data: () => ({
    ROCK_PAPER_SCISSORS,
    SIMON_SAYS,
    TRIVIA,
    TIC_TAC_TOE,
    MAIN,
  }),
};
</script>

<style>
/* CSS */
</style>
