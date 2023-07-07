<template>
  <div>
    <CustomNavbar />
    <div class="custom-container">
      <CustomSidebar />
      <main style="padding: 8px 0; height: 100%; width: 100%;">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import CustomSidebar from './components/CustomSidebar.vue'
import CustomNavbar from './components/CustomNavbar.vue'

export default {
  name: 'App',
  components: {
    CustomSidebar,
    CustomNavbar
  }
}
</script>

<style>
  .custom-container {
    display: flex;
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
</style>