<template>
  <div class="container">
    <header-title title="Outcome"></header-title>
    <div class="body">
      <h1>{{ outcome }}</h1>
    </div>
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
.container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

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

.body {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: stretch;
  background: rgb(255, 151, 0);
  background: radial-gradient(
    circle,
    rgba(255, 151, 0, 1) 0%,
    rgba(255, 61, 61, 1) 100%
  );
}

.body > h1 {
  font-size: 5em;
  font-family: 'Comic Sans MS';
  margin: auto;
  text-align: center;
}
</style>
