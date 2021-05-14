<template>
  <div id='home' class='wrapper'>
    <nav-bar class='home-nav'>
      <template #center>购物街</template>
    </nav-bar>
    <tab-control 
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners='banners'/>
      <home-recommend :recommends='recommends'/>
      <home-feature/>
      <tab-control 
        class="tab-control" 
        @tabClick="tabClick" 
        ref='tabControl2' 
        :titles="['流行', '新款', '精选']"/>
      <goods-list :goods='showGoodsList'/>
    </scroll>
    <back-top @click='backClick' v-show='isShowBackTop'/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import Scroll from "@/components/common/scroll/Scroll"
import HomeSwiper from "@/views/home/child/HomeSwiper"
import HomeRecommend from "@/views/home/child/Recommend"
import HomeFeature from "@/views/home/child/Feature"
import TabControl from "@/components/content/tabcontrol/TabControl"
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/backtop/BackTop'

import { getMultiData, getProductData } from "@/network/home"

export default {
  name: 'Home', 
  components: { 
    NavBar, 
    Scroll, 
    HomeSwiper, 
    HomeRecommend, 
    HomeFeature, 
    TabControl, 
    GoodsList, 
    BackTop
  }, 
  data() { 
    return { 
      banners: [1], 
      recommends: [], 
      goods: { 
        'pop': {page: 1, list: []}, 
        'new': {page: 1, list: []}, 
        'sell': {page: 1, list: []}
      },
      currentType: 'pop', 
      isTabFixed: false,
      tabOffsetTop: 560,
      isShowBackTop: false,
      saveY: 0
    }
  }, 
  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list
    }
  }, 
  created() {
      // 1.请求轮播等数据
      this._getMultiData()

      // 2.请求商品数据
      this._getProductData('pop')
      this._getProductData('new')
      this._getProductData('sell')
    }, 
  methods: { 
    /**
     * 网络请求
     */
    _getMultiData() {
      getMultiData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    _getProductData(type) {
      // 获取页码
      const page = this.goods[type].page
      getProductData(type, page).then(res => { 
        const newList = res.data.list
        this.goods[type].list.push(...newList)
        this.goods[type].page += 1
      })
    },
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    }, 
    loadMore() { 
      this._getProductData(this.currentType)
      this.$refs.scroll.finishPullUp()
    }, 
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    }, 
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }, 
  activated() {
    // 这里 传1 是因为better-scroll的bug
    this.$refs.scroll.scrollTo(0, this.saveY, 1)
    this.$refs.scroll.refresh();
  }, 
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y ? this.$refs.scroll.scroll.y : 0
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
    /* position: relative; 
    z-index: 9; 
    margin-top: 0px; 
    margin-left: 0px; */
  } 

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style> 
