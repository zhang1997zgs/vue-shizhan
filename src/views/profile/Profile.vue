<template>
  <div id='profile'>
    <nav-bar class='profile-nav'><template #center>我的</template></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
export default {
  name: 'Profile', 
  components: { 
    NavBar
  }
}
</script>

<style scoped>
  #profile { 
    height: 100vh; 
    position: relative; 
  } 

  .profile-nav { 
    background-color: #ff8198; 
    color: #fff; 
    position: relative; 
    z-index: 9; 
  } 
</style> 
