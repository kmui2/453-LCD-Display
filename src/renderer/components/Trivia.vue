<template>
  <div>
    <div>Trivia</div>
    <div class="grid">
      <div class="question"><h1>Question</h1></div>
      <div class="choices-grid">
        <div class="A"><h2>A</h2></div>
        <div class="B"><h2>B</h2></div>
        <div class="C"><h2>C</h2></div>
        <div class="D"><h2>D</h2></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'trivia',
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
