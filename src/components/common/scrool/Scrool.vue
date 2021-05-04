<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scrool";
export default {
  name: 'BScroll'
}
</script> 

<style scoped>
  .wrapper{ 
    overflow: hidden; 
  }
</style>