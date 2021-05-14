<template>
  <div class="detail-swiper">
    <div>
    <swiper 
    :slidesPerView="1" 
    :spaceBetween="30"
    :centeredSlides="true" 
    :autoplay="{
      'delay': 2500,
      'disableOnInteraction': false
    }" 
    :loop="true" 
    :pagination="{ 
      'clickable': true, 
      'dynamicBullets': true}" 
    :navigation="true" class="mySwiper">
      <swiper-slide v-for='index in topImages' :key='index' >
        <div class='swiper-item'>
          <img :src="index" alt="">
        </div>
      </swiper-slide>
    </swiper>
  </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue' 
// Import Swiper styles
import 'swiper/swiper.scss' 
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
// import Swiper core and required modules
import SwiperCore, { Autoplay,Pagination,Navigation } from 'swiper/core';
// install Swiper modules
SwiperCore.use([Autoplay,Pagination,Navigation]);
export default {
  name: 'DetailSwiper', 
  props: { 
    topImages: { 
      type: Array, 
      default() { 
        return []
      }
    }
  }, 
  components: {
    Swiper,
    SwiperSlide,
  } 
}
</script>

<style scoped>
#app { height: 100% }
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-container {
  width: 100%;
  height: 300px;
  display: flex;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-container {
  margin-left: auto;
  margin-right: auto;
}

</style>
