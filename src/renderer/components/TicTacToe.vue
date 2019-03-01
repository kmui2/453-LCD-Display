<template>
  <div>
    <div>Tic Tac Toe</div>
    <div class="grid">
      <div style="grid-area-0" v-bind:class="{ active: grid[0] }" v-on:click="handleClick(0)">
        <h1>{{ grid[0] }}</h1>
      </div>
      <div style="grid-area-1" v-bind:class="{ active: grid[1] }" v-on:click="handleClick(1)">
        <h1>{{ grid[1] }}</h1>
      </div>
      <div style="grid-area-2" v-bind:class="{ active: grid[2] }" v-on:click="handleClick(2)">
        <h1>{{ grid[2] }}</h1>
      </div>
      <div style="grid-area-3" v-bind:class="{ active: grid[3] }" v-on:click="handleClick(3)">
        <h1>{{ grid[3] }}</h1>
      </div>
      <div style="grid-area-4" v-bind:class="{ active: grid[4] }" v-on:click="handleClick(4)">
        <h1>{{ grid[4] }}</h1>
      </div>
      <div style="grid-area-5" v-bind:class="{ active: grid[5] }" v-on:click="handleClick(5)">
        <h1>{{ grid[5] }}</h1>
      </div>
      <div style="grid-area-6" v-bind:class="{ active: grid[6] }" v-on:click="handleClick(6)">
        <h1>{{ grid[6] }}</h1>
      </div>
      <div style="grid-area-7" v-bind:class="{ active: grid[7] }" v-on:click="handleClick(7)">
        <h1>{{ grid[7] }}</h1>
      </div>
      <div style="grid-area-8" v-bind:class="{ active: grid[8] }" v-on:click="handleClick(8)">
        <h1>{{ grid[8] }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tic-tac-toe',
  data() {
    return {
      player: 'X',
      grid: ['', '', '', '', '', '', '', '', '', ''],
    };
  },
  methods: {
    handleClick(i) {
      this.$set(this.grid, i, this.player);
      this.player = this.player === 'X' ? 'O' : 'X';
    },
  },
};
</script>

<style scoped>
/* TODO: add tic tac toe using grid areas */

.active {
  background-color: grey;
}

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

.grid > div {
  border: solid;
  font-size: 3.5em;
  font-family: 'Gochi Hand', sans-serif;
}

.grid > div > h1 {
  margin: auto;
  text-align: center;
}
</style>
