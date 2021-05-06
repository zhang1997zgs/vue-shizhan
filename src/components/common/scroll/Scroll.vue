<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core' 
new BScroll('.wrapper',{
    scrollY: true,
    click: true, 
    probeType: 3, 
    pullUpLoad: true,
    wheel: true,
    scrollbar: true, 
    bounce: true, 
    bounceTime: 800,  
    momentum: true, 
    momentumLimitTime: 300, 
    momentumLimitDistance: 15, 
    swipeTime: 2500, 
    swipeBounceTime: 500, 
    preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/}
})
export default {
  name : 'Scroll'
}
</script>

<style scoped>
  .wrapper{ 
    height: 100%;
    overflow: hidden; 
  }
</style>