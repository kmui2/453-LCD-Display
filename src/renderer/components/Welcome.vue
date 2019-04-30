<template>
  <div class="container">
    <h1>Battle for the Axe</h1>
    <div class="logo">
      <img src="../assets/axe.png">
    </div>
    <div class="footer">
      ECE 453: Embedded Microprocessor System Design
      <br>Kevin Mui, Lucia Muyolema, Weitai Qian, Sam Sweeney
      <br>Spring 2019
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
};
</script>

<style scoped>
/* CSS */
h1 {
  text-align: center;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1em;
}

.logo {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  height: 100%;
  margin: auto;
}

.footer {
  text-align: center;
}
</style>
