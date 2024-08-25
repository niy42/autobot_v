<template>
  <div class="comment-list-container">
    <h2 class="title">Comment List</h2>
    <ul class="comment-items">
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        {{ comment.body }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const comments = computed(() => store.getters.comments);

const selectedPost = computed(() => {
  const selectedAutobot = store.getters.selectedAutobot;
  return selectedAutobot ? store.getters.posts.find(post => post.id === selectedAutobot.id) : null;
});

// Watch for changes in the selectedPost and fetch comments accordingly
watch(selectedPost, (newPost) => {
  if (newPost) {
    store.dispatch('fetchComments', newPost.id);
  }
});
</script>

<style scoped>
.comment-list-container {
  padding: 20px;
  background: #1e1e1e; /* Dark background to match the app's theme */
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow for a more pronounced effect */
  max-width: 400px; /* Ensure consistency in width */
  margin: 80px auto;  /* Center the container */
  color: #e0e0e0; /* Light text color for readability */
}

.title {
  color: #e0e0e0; /* Light text color to match the dark theme */
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.comment-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment-item {
  padding: 15px; /* Adjust padding for better spacing */
  margin-bottom: 10px;
  border-radius: 10px; /* Match with other components */
  background-color: #2c2c2c; /* Dark background for individual items */
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2); /* Enhanced shadow for depth */
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.comment-item:hover {
  background-color: #3c3c3c; /* Slightly lighter color on hover */
  transform: translateY(-2px); /* Subtle lift effect on hover */
}

@media (max-width: 600px) {
  .comment-list-container {
    max-width: 100%; /* Allow container to be full width on small screens */
    padding: 15px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}
</style>
