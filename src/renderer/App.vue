<template>
  <div id="app">
    <rock-paper-sissors v-if="screen == ROCK_PAPER_SCISSORS"></rock-paper-sissors>
    <simon-says v-if="screen == SIMON_SAYS"></simon-says>
    <tic-tac-toe v-if="screen == TIC_TAC_TOE"></tic-tac-toe>
    <trivia v-if="screen == TRIVIA"></trivia>
    <time-and-down v-if="screen == TIME_AND_DOWN"></time-and-down>
    <welcome v-if="screen == WELCOME"></welcome>
    <select-play v-if="screen == SELECT_PLAY"></select-play>
    <outcome v-if="screen == OUTCOME"></outcome>
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
import TimeAndDown from './components/TimeAndDown.vue';
import Welcome from './components/Welcome.vue';
import SelectPlay from './components/SelectPlay.vue';
import Outcome from './components/Outcome.vue';
import {
  ROCK_PAPER_SCISSORS,
  SIMON_SAYS,
  TIC_TAC_TOE,
  MAIN,
  TRIVIA,
  TIME_AND_DOWN,
  WELCOME,
  SELECT_PLAY,
  OUTCOME,
} from './constants/screens.js';

export default {
  name: 'LCD-vue',
  components: {
    RockPaperSissors,
    SimonSays,
    TicTacToe,
    Trivia,
    TimeAndDown,
    Welcome,
    SelectPlay,
    Outcome,
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
    TIME_AND_DOWN,
    WELCOME,
    SELECT_PLAY,
    OUTCOME,
  }),
};
</script>

<style>
/* CSS */
</style>
