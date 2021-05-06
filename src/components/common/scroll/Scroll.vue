<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core' 
  import MouseWheel from '@better-scroll/mouse-wheel' 
  import PullDown from '@better-scroll/pull-down'
  import Pullup from '@better-scroll/pull-up'

  BScroll.use(MouseWheel)
  BScroll.use(PullDown)
  BScroll.use(Pullup)

  export default {
    name : 'Scroll', 
    data() { 
      return { 
        scroll: null
      }
    }, 
    mounted() {
      // 1.创建BScroll对象 
      this.$nextTick(() => { 
        this.scroll = new BScroll('.bs-wrapper', {
          mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300
          }, 
          pullDownRefresh: true, 
          pullUpLoad: true, 
          click: true, 
          bounce: true, 
          probeType: 3, 
          scrollY: true
        })
      })
      
      /* // 2.监听滚动的位置
      if(this.probeType == 2 || this.probeType == 3) { 
        this.scroll.on('scroll', (position) => { 
          // console.log(position)
          this.$emit('scroll', position)
        })
      }
      // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      } */
    }/* , 
    methods: { 
      scrollTo(x, y, time = 300) { 
        this.scroll && this.scroll.scrollTo(x, y, time)
      }, 
      refresh() { 
        this.scroll && this.scroll.refresh()
      }, 
      finishPullUp() { 
        this.scroll && this.scroll.finishPullUp()
      }, 
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    } */
  }
</script>

<style scoped>

</style>