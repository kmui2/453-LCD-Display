<template>
  <div>
    <header-title title="Rock Paper Sissors"></header-title>
    <h2>Make Your Selection</h2>
    <img src="../assets/Rock-paper-scissors.jpg" class="picture">
  </div>
</template>

<script>
import HeaderTitle from './HeaderTitle';

export default {
  name: 'rock-paper-sissors',
  components: { HeaderTitle },
};
</script>

<style scoped>
/* CSS */
.picture {
  width: 100vw;
}
</style>
