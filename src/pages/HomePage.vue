<template>
	<header class="home__header">
		<div class="container">
			<div class="wrapper">
				<div class="header__logo">
					<i class="bx bxs-pen"></i>
					<p>PenThoughts</p>
				</div>

				<button
					@click="showNoteForm"
					class="header__btn"
					:class="{ btn__active: isNoteFormVisible }"
				>
					{{ isNoteFormVisible ? 'Close Form' : 'Create Note' }}
				</button>
			</div>
		</div>
	</header>

	<main>
		<div class="container">
			<ThoughtForm
				v-if="isNoteFormVisible"
				@create-note="createNote"
			/>

			<h1>My thoughts</h1>

			<div
				v-if="thoughts.data.length > 0"
				class="thoughts"
			>
				<Thought
					v-for="(thought, index) in thoughts.data"
					:key="thought.id"
					:thought="thought"
					:index="index"
					@delete-thought="deleteThought"
					@edit-thought="editThought"
				/>
			</div>

			<div v-else>
				<p>No thoughts yet</p>
			</div>
		</div>
	</main>
</template>

<script setup>
	import { defineProps, defineEmits, ref } from 'vue';
	import Thought from '../components/Thought.vue';
	import ThoughtForm from '../components/ThoughtForm.vue';

	const props = defineProps({
		thoughts: {
			type: Object,
			required: true,
		},

		isNoteFormVisible: {
			type: Boolean,
			required: true,
		},
	});

	const emit = defineEmits([
		'create-note',
		'show-note-form',
		'delete-thought',
		'edit-thought',
	]);

	const createNote = (newNote) => {
		emit('create-note', newNote);
	};

	const showNoteForm = () => {
		emit('show-note-form');
	};

	const deleteThought = (id) => {
		emit('delete-thought', id);
	};

	const editThought = (thoughtId, updatedNote) => {
		emit('edit-thought', thoughtId, updatedNote);
	};
</script>

<style scoped>
	.home__header {
		width: 100%;
		padding-block: 1rem;
		background-color: #34495e;
		position: fixed;
		top: 0;
		left: 0;
	}

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header__logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #fff;
	}

	.header__logo > i {
		font-size: 2rem;
	}

	.header__logo > p {
		font-size: 2rem;
		letter-spacing: 2px;
	}

	.header__btn {
		padding: 0.5rem 1rem;
		border: 1px solid #fff;
		background-color: #fff;
		color: #34495e;
		border-radius: 0.5rem;
		font-size: 1.2rem;
		letter-spacing: 2px;
		transition: all 0.3s ease;
	}

	.header__btn:hover {
		background-color: #34495e;
		color: #fff;
	}

	main {
		padding-block: 5rem 1rem;
		width: 100%;
	}

	main h1 {
		border-bottom: 1px solid #34495e;
		margin-block: 2rem 2rem;
	}

	.thoughts {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.btn__active {
		background-color: #cc2e2e;
		color: #fff;
		border-color: #cc2e2e;
	}

	.btn__active:hover {
		color: #cc2e2e;
	}
</style>
