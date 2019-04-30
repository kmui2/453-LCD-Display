<template>
  <div>
    <header-title title="Outcome"></header-title>
    <h2>{{ outcome }}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderTitle from './HeaderTitle';

export default {
  name: 'outcome',
  computed: {
    ...mapGetters(['getOutcome']),
    outcome() {
      return this.getOutcome;
    },
  },
  components: { HeaderTitle },
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
