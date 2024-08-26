<template>
  <div class="autobot-post-container">
    <!-- Flex container for Autobot List and Post List -->
    <div class="content-wrapper">
      <!-- Autobot List Section -->
      <div class="autobot-list-container hide-scrollbar">
        <h2 class="autobot-list-title">Autobot List</h2>
        <!-- Error Message Display -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <ul class="autobot-list">
          <li v-for="autobot in autobots" :key="autobot.id" @click="selectAutobot(autobot)" class="autobot-item">
            <button class="autobot-button">{{ autobot.name }}</button>
          </li>
        </ul>

        <!-- Pagination Controls -->
        <div class="pagination">
          <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>

      <!-- Post List Section -->
      <div class="post-list-container hide-scrollbar" v-if="selectedAutobot">
        <h2 class="title">Posts for {{ selectedAutobot.name }}</h2>
        <ul class="post-items">
          <li v-for="post in posts" :key="post.id" class="post-item" @click="selectPost(post)">
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-body">{{ post.body }}</p>
            <p class="post-createdAt">Created at: {{ post.createdAt }}</p>

            <!-- Comment List Section inside the post -->
            <div class="comment-list-container hide-scrollbar" v-if="selectedPost && selectedPost.id === post.id">
              <h2 class="title">Comments for {{ selectedPost.title }}</h2>
              <ul class="comment-items">
                <li v-for="comment in comments" :key="comment.id" class="comment-item">
                  {{ comment.body }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import debounce from 'lodash/debounce';

// Set up the store
const store = useStore();

// State for pagination
const pagination = reactive({
  currentPage: 1,
  limit: 10,
  totalPages: 1,
});

// Create a debounced version of fetchPosts
const debouncedFetchPosts = debounce(async (autobotId) => {
  await store.dispatch('fetchPosts', autobotId);
}, 1000);

// Create a debounced version of fetchComments
const debouncedFetchComments = debounce(async (postId) => {
  await store.dispatch('fetchComments', postId);
}, 1000);

// Define selectAutobot function
const selectAutobot = (autobot) => {
  store.commit('setSelectedAutobot', autobot);
  debouncedFetchPosts(autobot.id);
};

// Define selectPost function
const selectPost = (post) => {
  store.commit('setSelectedPost', post);
  debouncedFetchComments(post.id);
};

// Fetch Autobots and update total pages
const fetchAutobots = async () => {
  store.commit('setErrorMessage', null); // Clear previous error message
  try {
    await store.dispatch('fetchAutobots', {
      page: pagination.currentPage,
      limit: pagination.limit
    });

    // Update pagination total pages
    const totalItems = store.getters.totalAutobots; // Make sure this getter is returning the correct value
    pagination.totalPages = totalItems ? Math.ceil(totalItems / pagination.limit) : 1;
  } catch (error) {
    store.commit('setErrorMessage', error.message);
  }
};

// Computed properties to access state
const autobots = computed(() => store.getters.autobots);
const currentPage = computed(() => pagination.currentPage);
const totalPages = computed(() => pagination.totalPages);
const errorMessage = computed(() => store.getters.errorMessage);
const selectedAutobot = computed(() => store.getters.selectedAutobot);
const selectedPost = computed(() => store.getters.selectedPost);
const posts = computed(() => store.getters.posts);
const comments = computed(() => store.getters.comments);

// Watch for changes in the selectedPost and fetch comments accordingly
watch(selectedPost, (newPost) => {
  if (newPost) {
    debouncedFetchComments(newPost.id);
  }
});

// Fetch autobots on mount
onMounted(() => {
  fetchAutobots();
});

// Pagination functions
const nextPage = () => {
  if (pagination.currentPage < pagination.totalPages) {
    pagination.currentPage++;
    fetchAutobots();
  }
};

const previousPage = () => {
  if (pagination.currentPage > 1) {
    pagination.currentPage--;
    fetchAutobots();
  }
};
</script>

<style scoped>
.autobot-post-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #1e1e1e;
  color: #e0e0e0;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start; /* Align items to the top */
}

.autobot-list-container, .post-list-container, .comment-list-container {
  padding: 20px;
  background: #2c2c2c;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.autobot-list-container {
  width: 300px; /* Set a fixed width for the Autobot list */
  max-height: 80vh; /* Adjust height to fit within the viewport, with some margin */
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  -webkit-overflow-scrolling: touch;
}

.post-list-container {
  flex: 1; /* Allow the post list to take remaining space */
  max-height: 80vh; /* Adjust height to fit within the viewport, with some margin */
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  -webkit-overflow-scrolling: touch;
}

.comment-list-container {
  padding: 10px;
  background: #2c2c2c;
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  -webkit-overflow-scrolling: touch;
}

.autobot-list-title, .title {
  color: #e0e0e0;
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.autobot-list, .post-items, .comment-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.autobot-item, .post-item, .comment-item {
  margin-bottom: 10px;
}

.autobot-button {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  color: #e0e0e0; /* Ensure text contrasts well with the background */
  background-color: #2c3e50; /* Midnight Blue background color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.autobot-button:hover {
  background-color: #34495e; /* Slightly lighter Midnight Blue for hover effect */
  transform: scale(1.05);
}

.autobot-button:active {
  background-color: #1b2a41; /* Even darker for active state */
  transform: scale(1);
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

.post-createdAt {
  color: #e0e6af;
  font-size: 12px;
}

.comment-item {
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #2c2c2c;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.comment-item:hover {
  background-color: #3c3c3c;
  transform: translateY(-2px);
}

/*.pagination {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
}

.pagination button {
  margin: 5px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}*/

.pagination {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
}

.pagination button {
  margin: 5px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #4682b4; /* Steel Blue background color */
  color: #e0e0e0; /* Light color for text to ensure readability */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 16px;
}

.pagination button:hover {
  background-color: #5a9bd4; /* Slightly lighter blue for hover effect */
}

.pagination button:disabled {
  background-color: #b0b0b0; /* Soft Gray for disabled state */
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 800px) {
  .content-wrapper {
    flex-direction: column;
  }

  .autobot-list-container {
    width: 100%; /* Make Autobot list full width on smaller screens */
    max-height: none; /* Remove height restriction on small screens */
  }
}

@media (max-width: 600px) {
  .autobot-post-container {
    padding: 15px;
  }

  .autobot-button {
    font-size: 16px;
    padding: 8px;
  }

  .pagination {
    flex-direction: column;
  }

  .pagination button {
    width: 100%;
    margin: 5px 0;
    padding: 10px;
    font-size: 18px;
  }
}

@media (max-width: 400px) {
  .autobot-list-title, .title {
    font-size: 18px;
  }

  .autobot-button {
    font-size: 14px;
    padding: 6px;
  }

  .pagination button {
    font-size: 16px;
    padding: 8px;
  }
  
  .hide-scrollbar {
    overflow: auto; /* Ensure the element is scrollable */
  }

  /* Hide scrollbar for Chrome, Safari, and Opera */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Internet Explorer, Edge, and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* Smooth scrolling */
  .hide-scrollbar {
    -webkit-overflow-scrolling: touch;
  }

}
</style>