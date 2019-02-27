<template>
<!-- TODO: add condition to select background color -->
	<div class="container red">
		<div>Simon Says</div>
	</div>
</template>

<script>
  export default {
    name: 'simon-says',
  };
</script>

<style scoped>
	.container {
		width: 100vw;
		height: 100vh;
	}

	.red {
		background-color: red;
	}

	.blue {
		background-color: blue;
	}

	.green {
		background-color: green;
	}

	.yellow {
		background-color: yellow;
	}
</style>
