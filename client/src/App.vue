<template>
  <div id="app">
    <AutobotCounter />
    <AutobotList @selectAutobot="handleSelectAutobot" />
    <PostList :posts="posts" />
    <CommentList :comments="comments" />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import AutobotList from './components/AutobotList.vue';
import PostList from './components/PostList.vue';
import CommentList from './components/CommentList.vue';
import AutobotCounter from './components/AutobotCounter.vue';

// Setup Vuex store
const store = useStore();

// Computed properties to access state
const autobotCount = computed(() => store.getters.autobotCount);
const posts = computed(() => store.getters.posts);
const comments = computed(() => store.getters.comments);

// Watch for changes to selectedAutobot and fetch related posts and comments
const selectedAutobot = computed(() => store.getters.selectedAutobot);

watch(selectedAutobot, (newAutobot) => {
  if (newAutobot) {
    store.dispatch('fetchPosts', newAutobot.id);
  }
});

watch(() => store.getters.posts, async (newPosts) => {
  if (newPosts.length > 0) {
    // Create an array of fetchComments promises
    const fetchPromises = newPosts.map(post => store.dispatch('fetchComments', post.id));
    
    // Wait for all fetchComments actions to complete
    await Promise.all(fetchPromises);
  }
});

// Handle Autobot selection
function handleSelectAutobot(autobot) {
  store.dispatch('fetchPosts', autobot.id);
  store.commit('setSelectedAutobot', autobot);
}
</script>

<style>
#app {
  text-align: center;
  background: url('https://www.transparenttextures.com/patterns/dark-mosaic.png'); /* Subtle pattern */
  background-color: #121212; /* Base dark color */
  color: #e0e0e0; 
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  }
</style>
