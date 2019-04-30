<template>
  <!-- TODO: add condition to select background color -->
  <div v-bind:style="{ backgroundColor: color || 'white' }" class="container">
    <header-title title="Simon Says"></header-title>
    <div v-if="color === undefined" class="cond">
      <h1 class="title">It's Simon Says!</h1>
      <h1>Ready?</h1>
      <div class="gif">
        <img src="../assets/good.gif">
      </div>
    </div>
    <div v-if="color === 'white'" class="cond">
      <h1>Now it's your turn!</h1>
      <div class="gif">
        <img src="../assets/trump_pointing.jpg">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderTitle from './HeaderTitle';

export default {
  name: 'simon-says',
  computed: {
    ...mapGetters(['getSimonSaysColor']),
    color() {
      return this.getSimonSaysColor;
    },
  },
  components: { HeaderTitle },
};
</script>

<style scoped>
.title {
  font-size: 4em;
  background: rgb(131, 58, 180);
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
}
.container {
  width: 100vw;
  height: 100vh;
}
.gif {
  display: flex;
}

.gif > img {
  margin: auto;
}

h1 {
  text-align: center;
}

.cond {
  display: flex;
  flex-direction: column;
}
</style>
