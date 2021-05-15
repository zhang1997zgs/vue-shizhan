<template>
  <div id='cart'>
    <nav-bar class='cart-nav'>
      <template #center>购物车({{length}})</template>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import CartList from "./child/CartList";
import CartBottomBar from "./child/CartBottomBar";
import { mapGetters } from 'vuex';
export default {
  name: 'Cart', 
  components: { 
    NavBar, 
    CartBottomBar, 
    CartList
  }, 
  computed: { 
    ...mapGetters({ 
      length: 'cartLength', 
      list: 'cartList'
    })
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
