<template>
	<form
		action=""
		@submit.prevent="submitNote"
		class="thought__form"
	>
		<div class="form__control">
			<label for="title">Title</label>
			<input
				v-model="title"
				type="text"
				id="title"
				placeholder="Title"
			/>
		</div>

		<div class="form__control">
			<label for="description">Description</label>
			<textarea
				v-model="description"
				id="description"
				placeholder="Description"
			></textarea>
		</div>

		<button
			class="submit__btn"
			type="submit"
		>
			Create
		</button>
	</form>
</template>

<script setup>
	import { ref, defineEmits } from 'vue';

	const emit = defineEmits(['create-note']);

	const title = ref('');
	const description = ref('');

	const submitNote = () => {
		const newNote = {
			title: title.value,
			description: description.value,
		};

		emit('create-note', newNote);

		title.value = '';
		description.value = '';
	};
</script>

<style scoped>
	.thought__form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-top: 2rem;
		margin-bottom: 4rem;
	}

	.form__control {
		display: flex;
		align-items: flex-end;
		gap: 1rem;
	}

	.form__control > label {
		width: 15%;
		font-size: 1.2rem;
		font-weight: 500;
		color: #34495e;
	}

	.form__control > input,
	.form__control > textarea {
		width: 100%;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid #34495e;
		font-size: 1.2rem;
	}

	.form__control > textarea {
		height: 120px;
		resize: none;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	.submit__btn {
		padding: 0.5rem 1rem;
		color: #fff;
		background-color: #34495e;
		display: inline-flex;
		justify-content: flex-end;
		align-items: center;
		border-radius: 0.5rem;
		border: 1px solid #34495e;
		font-size: 1.2rem;
		transition: all 0.3s ease;
		margin-left: auto;
	}

	.submit__btn:hover {
		background-color: #fff;
		color: #34495e;
	}
</style>
