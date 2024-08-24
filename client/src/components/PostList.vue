<template>
  <div class="post-list">
    <h2 class="title">Post List</h2>
    <ul class="post-items">
      <li v-for="post in posts" :key="post.id" class="post-item">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const posts = computed(() => store.getters.posts);

const selectedAutobot = computed(() => store.getters.selectedAutobot);

// Watch for changes in the selectedAutobot and fetch posts accordingly
watch(selectedAutobot, (newAutobot) => {
  if (newAutobot) {
    store.dispatch('fetchPosts', newAutobot.id);
  }
});
</script>

<style scoped>
.post-list {
  padding: 20px;
  background: #1e1e1e; /* Dark background to match the app's theme */
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow for consistency */
  max-width: 400px; /* Ensure consistency in width */
  margin: 0 auto;  /* Center the container */
  margin-bottom: 20px; /* Add margin-bottom to separate from CommentList */
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

.post-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  padding: 15px; /* Adjust padding for better spacing */
  margin-bottom: 10px;
  border-radius: 10px; /* Match with other components */
  background-color: #2c2c2c; /* Dark background for individual items */
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2); /* Enhanced shadow for depth */
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.post-item:hover {
  background-color: #3c3c3c; /* Slightly lighter color on hover */
  transform: translateY(-2px); /* Subtle lift effect on hover */
}
</style>
