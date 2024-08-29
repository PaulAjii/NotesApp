<template>
	<div class="loader"></div>
</template>

<script setup></script>

<style scoped>
	.loader {
		width: 48px;
		height: 48px;
		border: 5px solid #fff;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		to {
			transform: rotate(360deg);
		}
	}
</style>
