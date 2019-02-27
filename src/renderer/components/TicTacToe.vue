<template>
  <div>
    <div>Tic Tac Toe</div>
    <div class="grid">
      <div class="grid-0"></div>
      <div class="grid-1"></div>
      <div class="grid-2"></div>
      <div class="grid-3"></div>
      <div class="grid-4"></div>
      <div class="grid-5"></div>
      <div class="grid-6"></div>
      <div class="grid-7"></div>
      <div class="grid-8"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tic-tac-toe',
};
</script>

<style scoped>
/* TODO: add tic tac toe using grid areas */

.grid {
  display: grid;
  grid-template-areas:
    'grid-0 grid-1 grid-2'
    'grid-3 grid-4 grid-5'
    'grid-6 grid-7 grid-8';
  width: 75vh;
  height: 75vh;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}

/* CSS */
.grid-0 {
  grid-area: grid-0;
  border: solid;
}

.grid-1 {
  grid-area: grid-1;
  border: solid;
}

.grid-2 {
  grid-area: grid-2;
  border: solid;
}

.grid-3 {
  grid-area: grid-3;
  border: solid;
}

.grid-4 {
  grid-area: grid-4;
  border: solid;
}

.grid-5 {
  grid-area: grid-5;
  border: solid;
}

.grid-6 {
  grid-area: grid-6;
  border: solid;
}

.grid-7 {
  grid-area: grid-7;
  border: solid;
}

.grid-8 {
  grid-area: grid-8;
  border: solid;
}
</style>
