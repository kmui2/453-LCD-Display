<template>
  <!-- TODO: add condition to select background color -->
  <div v-bind:style="{ backgroundColor: color || 'white' }" class="container">
    <div>Simon Says</div>
    <h1 v-if="color === undefined">Ready?</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'simon-says',
  computed: {
    ...mapGetters(['getSimonSaysColor']),
    color() {
      return this.getSimonSaysColor;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
