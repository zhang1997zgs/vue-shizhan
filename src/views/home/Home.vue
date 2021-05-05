<template>
  <div id='home'>
    <nav-bar class='home-nav'><template #center>购物街</template></nav-bar>
    <scroll>
      <home-swiper :banners='banners'/>
      <home-recommend :recommends='recommends'/>
      <home-feature/>
      <tab-control ref="contentTab" class="tab-control" @tabClick="tabClick"/>
      <goods-list :goods='showGoodsList'/>
      <router-view/>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </scroll>
    
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import Scroll from "@/components/common/scroll/Scroll"
import HomeSwiper from "@/views/home/child/Swiper"
import HomeRecommend from "@/views/home/child/Recommend"
import HomeFeature from "@/views/home/child/Feature"
import TabControl from "@/components/content/tabcontrol/TabControl"
import GoodsList from '@/components/content/goods/GoodsList'

import { getMultiData, getProductData } from "@/network/home"
import { POP, NEW, SELL } from "@/common/const"

export default {
  name: 'Home', 
  components: { 
    NavBar, 
    Scroll, 
    HomeSwiper, 
    HomeRecommend, 
    HomeFeature, 
    TabControl, 
    GoodsList
  }, 
  data() { 
    return { 
      banners: [], 
      recommends: [], 
      goods: { 
        'pop': {page: 1, list: []}, 
        'new': {page: 1, list: []}, 
        'sell': {page: 1, list: []}
      },
      currentType: POP
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
      this._getProductData(POP)
      this._getProductData(NEW)
      this._getProductData(SELL)

      // 3.监听一些事件
      /* this.$bus.$on('imgLoad', () => {
      	this.$refs.scroll.refresh()
      }) */
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

        // 完成加载更多数据
        // this.$refs.scroll.finishedPullUp()
      })
    },
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }

      this.$refs.contentTab.currentIndex = index
    },
  }, 
  mounted() { 
    
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

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style> 
