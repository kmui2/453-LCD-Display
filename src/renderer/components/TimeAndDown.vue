<template>
  <div class="container">
    <div class="quarter">
      <div>{{ quarter }}</div>
    </div>
    <div class="time">
      <div class="value">{{ time }}</div>
    </div>
    <div class="down-distance-container">
      <div class="down">
        <div class="value">{{ down }}</div>
        <div class="annotation">Down</div>
      </div>
      <div class="and">
        <div class="value">&</div>
      </div>
      <div class="distance">
        <div class="value">{{ distance }}</div>
        <div class="annotation">Distance</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'time-and-down',
  computed: {
    ...mapGetters(['getTimeAndDown']),
    quarter() {
      return this.getTimeAndDown.quarter;
    },
    time() {
      return this.getTimeAndDown.time;
    },
    down() {
      return this.getTimeAndDown.down;
    },
    distance() {
      return this.getTimeAndDown.distance;
    },
  },
  methods: {
    ...mapActions(['setTimeAndDown']),
  },
};
</script>

<style scoped>
/* CSS */
.container {
  display: grid;
  grid-template-areas: 'quarter' 'time' 'down-distance-container';
  grid-template-rows: 10vh 50vh 40vh;
  width: 100vw;
  height: 100vh;
}

.quarter {
  grid-area: quarter;
  text-align: center;
  display: flex;
}

.quarter > div {
  margin: auto;
  font-size: 10vmin;
}

.time {
  grid-area: time;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.time .annotation {
  font-size: 10vmin;
}

.time .value {
  font-size: 50vmin;
}

.down-distance-container {
  grid-area: down-distance-container;
  display: flex;
}

.down {
  grid-area: down;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.and {
  grid-area: and;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.distance {
  grid-area: distance;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.down-distance-container .value {
  font-size: 20vmin;
}

.down-distance-container .annotation {
  font-size: 5vmin;
}
</style>
