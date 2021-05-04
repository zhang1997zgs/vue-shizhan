<template>
  <div id='home'>
    <nav-bar class='home-nav'><template #center>购物街</template></nav-bar>
    <swiper-like/>
    <router-view/>
    
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import SwiperLike from "@/components/content/swiper/Swiper"
export default {
  name: 'Home', 
  components: { 
    NavBar, 
    SwiperLike
  }, 
  data() { 
    return { 
      banners: []
    }
  }
}
</script>

<style scoped>
  #home { 
    height: 100vh; 
    position: relative; 
  } 

  .home-nav { 
    background-color: #ff8198; 
    color: #fff; 
    position: relative; 
    z-index: 9; 
    margin-top: 0px; 
    margin-left: 0px;
  } 
</style> 
