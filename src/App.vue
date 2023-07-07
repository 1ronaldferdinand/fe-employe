<template>
  <div>
    <CustomNavbar />
    <div class="custom-container">
      <CustomSidebar />
      <main>
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
    padding: 0 !important;
    margin: 0 !important;
  }

  main{
    padding: 1rem 0 4rem 0; 
    height: 100vh; 
    width: 100%;
    margin-left: 14rem;
    overflow-y: scroll;
  }
</style>