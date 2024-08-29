<template>
	<div class="thought">
		<header class="thought__header">
			<div class="thought__header-title">
				<span class="index__number">{{
					index < 9 ? `0${index + 1}` : index + 1
				}}</span>
				<h2
					v-if="!isEditing"
					class="thought__title"
				>
					{{ thought.title }}
				</h2>
				<input
					v-else
					class="thought__title"
					type="text"
					v-model="editedThought.title"
				/>
			</div>

			<div class="action__btns">
				<button
					title="Edit"
					class="edit__btn"
				>
					<i
						v-if="!isEditing"
						class="bx bx-edit"
						@click="toggleEditMode"
					></i>
					<i
						v-else
						class="bx bx-check"
						@click="toggleEditMode"
					></i>
				</button>
				<button
					title="Delete"
					class="del__btn"
					@click="deleteThought"
				>
					<i class="bx bx-trash"></i>
				</button>
			</div>
		</header>
		<p
			v-if="!isEditing"
			class="thought__description"
			v-html="formattedDescription"
		></p>
		<textarea
			v-else
			class="thought__description"
			v-model="editedThought.description"
			v-auto-resize
		></textarea>

		<div class="mod__date">
			<span class="mod__date-text"> Created: {{ dateCreated }} </span>

			<span class="mod__date-text">
				Last modified: {{ dateModified }}
			</span>
		</div>
	</div>
</template>

<script setup>
	import { defineProps, computed, ref, watch } from 'vue';
	import { formatDate } from '../utils';

	const props = defineProps({
		thought: {
			type: Object,
			required: true,
		},

		index: {
			type: Number,
			required: true,
		},
	});

	const emit = defineEmits(['delete-thought', 'edit-thought']);

	const title = ref(props.thought.title);
	const description = ref(props.thought.description);
	const isEditing = ref(false);
	const editedThought = ref({ ...props.thought });

	const dateCreated = computed(() => formatDate(props.thought.createdAt));
	const dateModified = computed(() => formatDate(props.thought.updatedAt));

	const deleteThought = async () => {
		emit('delete-thought', props.thought._id);
	};

	watch(
		() => props.thought,
		(newThought) => {
			editedThought.value = { ...newThought };
		},
		{ deep: true }
	);

	const formattedDescription = computed(() => {
		return editedThought.value.description.replace(/\n/g, '<br>');
	});

	const toggleEditMode = () => {
		if (isEditing.value) {
			emit('edit-thought', props.thought._id, editedThought.value);
		}
		isEditing.value = !isEditing.value;
	};
</script>

<style scoped>
	.thought {
		padding: 1.5rem 2rem 1rem;
		background-color: #fff;
		border-radius: 0.5rem;
		transition: all 0.3s ease;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.thought:hover {
		background-color: #f0f0f0;
	}

	.thought__header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.thought__header-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
	}

	.thought__header-title > .index__number {
		color: #2c3e50;
		font-size: 1.5rem;
		font-weight: 600;
		display: inline-block;
		padding-right: 0.5rem;
		border-right: 2px solid #2c3e50;
	}

	.action__btns {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.del__btn,
	.edit__btn {
		color: #34495e;
		font-size: 1.5rem;
		transition: all 0.3s ease;
	}

	.del__btn:hover {
		color: #e74c3c;
	}

	.edit__btn:hover {
		color: #2ecc71;
	}

	.thought__title {
		font-size: 1.5rem;
		color: #2c3e50;
		font-weight: 600;
		width: 100%;
	}

	.thought__description {
		font-size: 1.15rem;
		color: #7f8c8d;
		font-weight: 400;
		max-width: 90%;
		min-height: 50px;
		margin-bottom: 1rem;
	}

	input.thought__title,
	textarea.thought__description {
		width: 100%;
	}

	textarea.thought__description {
		resize: none;
		height: auto;
	}

	.mod__date {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.mod__date-text {
		font-size: 0.9rem;
		color: #7f8c8d;
		font-weight: 400;
	}
</style>
