<template>
  <div class="home">
    <Searchbar />
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar.vue';

export default {
  name: 'HomeView',
  components: {
    Searchbar
  }
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
