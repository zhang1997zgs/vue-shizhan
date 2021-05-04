<template>
  <div id='cart'>
    <nav-bar class='cart-nav'><template #center>购物车</template></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
export default {
  name: 'Cart', 
  components: { 
    NavBar
  }
}
</script>

<style scoped>
  #cart { 
    height: 100vh; 
    position: relative; 
  } 

  .cart-nav { 
    background-color: #ff8198; 
    color: #fff; 
    position: relative; 
    z-index: 9; 
  } 
</style> 
