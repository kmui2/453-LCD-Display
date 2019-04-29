<template>
  <div>
    <h1>Outcome</h1>
    <h2>{{ outcome }}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'outcome',
  computed: {
    ...mapGetters(['getOutcome']),
    outcome() {
      return this.getOutcome;
    },
  },
};
</script>

<style scoped>
/* CSS */
</style>
