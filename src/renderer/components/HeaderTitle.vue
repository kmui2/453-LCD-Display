<template>
  <div class="header">
    <!-- TODO: -->
    <h1 class="title">{{ title }}</h1>
    <h1 class="quarter">{{ timeAndDown.quarter }}Q</h1>
    <h1 class="time">{{ timeAndDown.time }}</h1>
    <h1 class="down-distance">{{ timeAndDown.down }} & {{ timeAndDown.distance }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'header-title',
  props: {
    title: String,
  },
  computed: {
    ...mapGetters(['getOutcome', 'getTimeAndDown']),
    outcome() {
      return this.getOutcome;
    },
    timeAndDown() {
      return this.getTimeAndDown;
    },
  },
};
</script>

<style scoped>
/* CSS */
.header {
  display: flex;
  justify-content: space-around;
}

.title {
  margin-right: auto !important;
}

.header > * {
  margin-right: 1em;
}
</style>
