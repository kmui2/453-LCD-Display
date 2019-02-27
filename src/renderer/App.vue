<template>
  <div id="app">
    <rock-paper-sissors></rock-paper-sissors>
    <simon-says></simon-says>
    <tic-tac-toe></tic-tac-toe>
    <trivia></trivia>
  </div>
</template>

<script>
import RockPaperSissors from './components/RockPaperSissors.vue';
import SimonSays from './components/SimonSays.vue';
import TicTacToe from './components/TicTacToe.vue';
import Trivia from './components/Trivia.vue';

export default {
  name: 'LCD-vue',
  components: {
    RockPaperSissors,
    SimonSays,
    TicTacToe,
    Trivia,
  },
};
</script>

<style>
/* CSS */
</style>
