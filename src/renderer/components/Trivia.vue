<template>
  <div>
    <div>Trivia</div>
    <div class="grid" v-if="question !== undefined">
      <div class="question">
        <h1>{{ question[0] }}</h1>
      </div>
      <div class="choices-grid">
        <div class="A" v-bind:style="{ backgroundColor: question[5] === '0' ? 'yellow' : 'white' }">
          <h2>{{ question[1] }}</h2>
        </div>
        <div class="B" v-bind:style="{ backgroundColor: question[5] === '1' ? 'yellow' : 'white' }">
          <h2>{{ question[2] }}</h2>
        </div>
        <div class="C" v-bind:style="{ backgroundColor: question[5] === '2' ? 'yellow' : 'white' }">
          <h2>{{ question[3] }}</h2>
        </div>
        <div class="D" v-bind:style="{ backgroundColor: question[5] === '3' ? 'yellow' : 'white' }">
          <h2>{{ question[4] }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'trivia',
  computed: {
    ...mapGetters(['getQuestion']),
    question() {
      return this.getQuestion;
    },
  },
};
</script>

<style scoped>
.grid {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'question'
    'choices-grid';
  grid-template-rows: 1fr 4fr;
}

.choices-grid {
  grid-area: choices-grid;
  display: grid;
  grid-template-areas:
    'A B'
    'C D';
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
}
</style>
