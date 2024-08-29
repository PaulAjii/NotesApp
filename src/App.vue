<template>
	<div>
		<SplashScreen v-if="isLoading" />

		<div v-else>
			<HomePage
				@create-note="createNote"
				@show-note-form="showNoteForm"
				@delete-thought="deleteNote"
				@edit-thought="editNote"
				:thoughts="thoughts"
				:isNoteFormVisible="isNoteFormVisible"
			/>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, computed } from 'vue';
	import {
		fetchThoughts,
		createThought,
		deleteThought,
		editThought,
	} from './services';
	import SplashScreen from './pages/SplashScreen.vue';
	import HomePage from './pages/HomePage.vue';

	const isLoading = ref(true);
	const isNoteFormVisible = ref(false);
	const thoughts = ref({});

	const loadThoughts = async () => {
		try {
			thoughts.value = await fetchThoughts();
		} catch (error) {
			console.error('Error loading thoughts:', error);
		}
	};

	const createNote = async (newNote) => {
		try {
			showNoteForm();
			const newThought = await createThought(newNote);
			thoughts.value = {
				[newThought._id]: newThought,
				...thoughts.value,
			};
			await loadThoughts();
		} catch (error) {
			console.error('Error creating Note:', error);
		}
	};

	const deleteNote = async (id) => {
		try {
			await deleteThought(id);
			thoughts.value = { ...thoughts.value };
			await loadThoughts();
		} catch (error) {
			console.error('Error deleting Note:', error);
		}
	};

	const editNote = async (id, updatedNote) => {
		try {
			await editThought(id, updatedNote);
			thoughts.value = {
				...thoughts.value,
				[id]: {
					...thoughts.value[id],
					...updatedNote,
				},
			};
		} catch (error) {
			console.error('Error editing Note:', error);
		}
	};

	const showNoteForm = () => {
		isNoteFormVisible.value = !isNoteFormVisible.value;
	};

	onMounted(async () => {
		await loadThoughts();

		setTimeout(() => {
			isLoading.value = false;
		}, 5000);
	});
</script>
