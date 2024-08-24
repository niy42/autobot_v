<!--Local state management-->
<!--<template>
  <div>
    <h1>Autobots Created: {{ autobotCount }}</h1>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      autobotCount: 0,
      socket: null,
    };
  },
  created() {
    this.socket = io('http://localhost:3000');
    this.socket.on('autobotCountUpdate', (count) => {
      this.autobotCount = count;
    });
  },
  beforeDestroy() {
    this.socket.disconnect();
  }
};
</script>-->

<!--Vuex-based management-->
<!--<template>
  <div>
    <h1>Autobot Count: {{ autobotCount }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['autobotCount']),
  },
  beforeUnmount() {
    // Clean up socket connection if necessary
    if (this.$socket) {
      this.$socket.disconnect();
    }
  }
};
</script>

<style scoped>
/* Add any styles you need here */
</style>-->

<template>
  <div>
    <h1>Autobots Created: {{ autobotCount }}</h1>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { io } from 'socket.io-client';

const store = useStore();
const autobotCount = computed(() => store.getters.autobotCount);

const socket = io('http://localhost:3000/');

socket.on('autobotCountUpdate', (count) => {
  store.dispatch('updateAutobotCount', count);
});
</script>
