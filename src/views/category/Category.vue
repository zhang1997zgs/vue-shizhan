<template>
  <div id='category'>
    <nav-bar class='category-nav'><template #center>分类</template></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
export default {
  name: 'Category', 
  components: { 
    NavBar
  }, 
  data() { 
    return { 
      
    }
  }
}
</script>

<style scoped>
  #category { 
    height: 100vh; 
    position: relative; 
  } 

  .category-nav { 
    background-color: #ff8198; 
    color: #fff; 
    position: relative; 
    z-index: 9; 
  }
</style>
