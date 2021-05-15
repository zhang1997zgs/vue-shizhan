<template>
  <div id="detail">
    <detail-nav-bar class='detail-nav' @titleClick='titleClick' ref='nav'/>
    <scroll 
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info='detailInfo' @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click="backTop" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart='addToCart'/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/child/DetailNavBar"
import Scroll from "@/components/common/scroll/Scroll";
import DetailSwiper from "@/views/detail/child/DetailSwiper"
import DetailBaseInfo from "@/views/detail/child/DetailBaseInfo"
import DetailShopInfo from "@/views/detail/child/DetailShopInfo"
import DetailGoodsInfo from "@/views/detail/child/DetailGoodsInfo"
import DetailParamInfo from "@/views/detail/child/DetailParamInfo"
import DetailCommentInfo from "@/views/detail/child/DetailCommentInfo"
import DetailBottomBar from "@/views/detail/child/DetailBottomBar"

import {debounce} from "@/common/utils";
import {itemListenerMixin, backTopMixin} from "@/common/mixin";

import GoodsList from '@/components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@/network/detail" 
export default {
  name: 'Detail', 
  components: { 
    DetailNavBar, 
    Scroll, 
    DetailSwiper, 
    DetailBaseInfo, 
    DetailShopInfo, 
    DetailGoodsInfo, 
    DetailParamInfo, 
    DetailCommentInfo, 
    GoodsList, 
    DetailBottomBar
  }, 
  mixins:[itemListenerMixin, backTopMixin], 
  data() { 
    return { 
      iid: null, 
      topImages: [1], 
      goods: {}, 
      shop: {}, 
      detailInfo: {}, 
      paramInfo: {}, 
      commentInfo: {}, 
      recommends: [], 
      themeTopYs: null, 
      currentIndex: 0
    }
  }, 
  created() {
    // 1.取出iid
    this.iid = this.$route.params.iid 
    // console.log(this.iid)
    // 2.发送商品请求
    this._getDetail(this.iid)

    // 3.请求推荐请求
    this._getRecommend()
  }, 
  methods: {
    imageLoad() {
      if(this.$refs.scroll){
        this.$refs.scroll.refresh()
      }
      // 图片加载完后计算各个模块的高度
      this.getthemeTopYs()
    },
    _getDetail(iid) { 
      getDetail(iid).then(res => { 
      // 1.获取顶部的图片轮播数据
      const data = res.result
      // console.log(data);
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services) 
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo) 
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule) 

      if(data.rate.cRate !== 0) { 
        this.commentInfo = data.rate.list[0]
      } 
       
      //因为数据可能返回不过来，DOM可能没渲染，函数执行太多次（加了节流）
      // 放到图片加载完的响应事件函数中去执行
      this.getthemeTopYs = debounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        }, 100)
      })
    }, 
    _getRecommend() { 
      getRecommend().then(res => { 
        this.recommends = res.data.list
      })
    }, 
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      //获取Y值
      const positionY = -position.y

      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {

        if (this.currentIndex !== i && ((positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]))) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
    },
    addToCart() {
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice

      this.$store.dispatch('addCart', product).then( res => {
          this.$toast.show(res, {
            position: 'top',
            duration: 500
          })
        }
      )
    }
  },
  // 组件消失，取消监听事件总线
  unmounted() {
    this.emitter.off('itemImageLoad', this.itemImageListener)
  },
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  background-color: #fff;
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>