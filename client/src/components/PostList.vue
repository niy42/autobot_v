<template>
  <div class="post-list-container">
    <h2 class="title">Post List</h2>
    <ul class="post-items">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-body">{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import debounce from 'lodash/debounce';
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
.post-list-container {
  padding: 20px;
  background: #1e1e1e;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 20px;
  color: #e0e0e0;
}

.title {
  color: #e0e0e0;
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
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #2c2c2c;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.post-item:hover {
  background-color: #3c3c3c;
  transform: translateY(-2px);
}

.post-title {
  font-size: 20px;
  color: #ff79c6; 
  margin-bottom: 10px;
  text-transform: capitalize;
  letter-spacing: 1px;
}

.post-body {
  color: #e0e0e0;
  font-size: 16px;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .post-list-container {
    max-width: 100%;
    padding: 15px;
    justify-content: center;
    align-items: center;
  }
}
</style>
