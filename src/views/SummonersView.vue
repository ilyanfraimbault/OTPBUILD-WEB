<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { getSummoners } from '../services/otpbuildService';
import type { Summoner, PaginatedResponse } from '../types';
import axios from 'axios';

const summoners = ref<Summoner[]>([]);
const loading = ref(true);
const error = ref('');
const currentPage = ref(1);
const pageSize = ref(50);
const totalPages = ref(0);
const totalCount = ref(0);
const isMounted = ref(true);
let cancelTokenSource = axios.CancelToken.source();

async function fetchSummoners(page: number = 1) {
  // Cancel any previous requests
  cancelTokenSource.cancel('Operation canceled due to new request.');
  // Create a new cancel token source
  cancelTokenSource = axios.CancelToken.source();

  loading.value = true;
  error.value = '';

  try {
    // Use the API directly with our cancel token
    const response = await axios.get(
      `/api/Summoners?page=${page}&pageSize=${pageSize.value}`,
      { cancelToken: cancelTokenSource.token }
    );

    // Only update state if the component is still mounted
    if (isMounted.value) {
      const data = response.data;
      summoners.value = data.items;
      totalPages.value = data.totalPages;
      totalCount.value = data.totalCount;
      currentPage.value = data.currentPage;
    }
  } catch (err) {
    // Only update error state if the component is still mounted and it's not a cancellation
    if (isMounted.value && !axios.isCancel(err)) {
      error.value = 'Failed to fetch summoners data';
      console.error(err);
    }
  } finally {
    // Only update loading state if the component is still mounted
    if (isMounted.value) {
      loading.value = false;
    }
  }
}

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchSummoners(page);
}

function goToPreviousPage() {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
}

function goToNextPage() {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
}

onMounted(() => {
  isMounted.value = true;
  fetchSummoners();
});

onUnmounted(() => {
  // Set mounted flag to false to prevent state updates
  isMounted.value = false;
  // Cancel any pending requests
  cancelTokenSource.cancel('Component unmounted');
});
</script>

<template>
  <div class="summoners-view">
    <h1>Summoners List</h1>

    <div v-if="loading" class="loading">
      Loading summoners data...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="summoners && summoners.length === 0" class="no-data">
      No summoners found.
    </div>

    <div v-else-if="summoners && summoners.length > 0">
      <div class="summoners-stats">
        <p>Showing {{ summoners.length }} of {{ totalCount }} summoners</p>
      </div>

      <div class="summoners-grid">
        <div v-for="summoner in summoners" :key="summoner.puuid" class="summoner-card">
          <div class="summoner-icon">
            <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${summoner.profileIconId}.jpg`" alt="Profile Icon" />
          </div>
          <div class="summoner-info">
            <h3>{{ summoner.gameName }} #{{ summoner.tagLine }}</h3>
            <router-link :to="`/summoner/${summoner.gameName}/${summoner.tagLine}`" class="view-details">
              View Details
            </router-link>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="pagination-button"
        >
          Previous
        </button>

        <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>

        <button
          @click="goToNextPage"
          :disabled="currentPage === totalPages"
          class="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summoners-view {
  width: 100%;
  padding: 0;
}

h1 {
  margin-bottom: 2rem;
  text-align: center;
  color: #1e293b;
}

.loading, .error, .no-data {
  text-align: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.error {
  color: red;
}

.no-data {
  color: #666;
}

.summoners-stats {
  margin-bottom: 1rem;
  color: #666;
}

.summoners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summoner-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.summoner-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.summoner-icon {
  width: 100%;
  height: 120px;
  overflow: hidden;
  background-color: #f0f0f0;
}

.summoner-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.summoner-info {
  padding: 1rem;
  text-align: center;
}

.summoner-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.view-details {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.view-details:hover {
  background-color: #45a049;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover:not(:disabled) {
  background-color: #45a049;
}

.pagination-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.875rem;
  color: #666;
}

@media (max-width: 768px) {
  .summoners-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .summoner-icon {
    height: 100px;
  }

  .summoner-info h3 {
    font-size: 0.875rem;
  }

  .view-details {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
