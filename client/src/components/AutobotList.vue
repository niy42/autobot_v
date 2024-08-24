<template>
  <div class="autobot-list-container">
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
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// State for pagination
const pagination = reactive({
  currentPage: 1,
  limit: 10,
  totalPages: 1,
});

// Fetch Autobots and update total pages
const fetchAutobots = async () => {
  store.commit('setErrorMessage', null); // Clear previous error message
  console.log(`Fetching page ${pagination.currentPage} with limit ${pagination.limit}`);
  try {
    await store.dispatch('fetchAutobots', {
      page: pagination.currentPage,
      limit: pagination.limit
    });

    // Update pagination total pages
    const totalItems = store.getters.totalAutobots; // Make sure this getter is returning the correct value
    pagination.totalPages = totalItems ? Math.ceil(totalItems / pagination.limit) : 1;
    console.log(`Total pages: ${pagination.totalPages}`);
  } catch (error) {
    console.error('Dispatch failed:', error);
  }
};

// Computed properties to access state
const autobots = computed(() => store.getters.autobots);
const currentPage = computed(() => pagination.currentPage);
const totalPages = computed(() => pagination.totalPages);
const errorMessage = computed(() => store.getters.errorMessage);

const selectAutobot = (autobot) => {
  store.commit('setSelectedAutobot', autobot);
  store.dispatch('fetchPosts', autobot.id);
};

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
.autobot-list-container {
  padding: 20px;
  background-color: #1e1e1e; /* Dark background to match the app's theme */
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow for consistency */
  max-width: 400px; /* Ensure a consistent maximum width */
  width: 100%; /* Ensure the container takes up full width */
  margin: 0 auto; /* Center the container horizontally */
  margin-bottom: 20px; /* Add margin-bottom to separate from PostList */
  color: #e0e0e0; /* Light text color for readability */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

.autobot-list-title {
  color: #e0e0e0; /* Light text color to match the dark theme */
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.autobot-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.autobot-item {
  margin-bottom: 10px;
}

.autobot-button {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.autobot-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.autobot-button:active {
  background-color: #3e8e41;
  transform: scale(1);
}

.pagination {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Allow pagination buttons to wrap on small screens */
  margin-top: 10px;
}

.pagination button {
  margin: 5px;
  padding: 8px 12px; /* Increase padding for better touch targets */
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px; /* Adjust font size for better readability */
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .autobot-list-container {
    max-width: 100%; /* Allow container to be full width on small screens */
    padding: 15px;
  }

  .autobot-list-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .autobot-button {
    font-size: 16px;
    padding: 8px;
  }

  .pagination {
    flex-direction: column; /* Stack pagination buttons vertically on smaller screens */
  }

  .pagination button {
    width: 100%; /* Make pagination buttons full width on small screens */
    margin: 5px 0; /* Adjust margin for vertical stacking */
    padding: 10px; /* Increase padding for better touch targets */
    font-size: 18px; /* Increase font size for better readability */
  }
}

@media (max-width: 400px) {
  .autobot-list-title {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .autobot-button {
    font-size: 14px;
    padding: 6px;
  }

  .pagination button {
    font-size: 16px; /* Adjust font size for small screens */
    padding: 8px; /* Adjust padding for small screens */
  }

  .error-message {
    color: red;
    background-color: #f8d7da;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    text-align: center;
  }
}
</style>
