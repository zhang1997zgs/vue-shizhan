<template>
  <div id='category'>
    <nav-bar class='category-nav'>
      <template #center>分类</template>
    </nav-bar>
    <div class='content1'>
      <tab-menu 
        :categories='categories' 
        @selectItem='selectItem'
      />
      <scroll 
        class='content'
        ref="scroll"
        :probe-type="3"
        :pull-up-load="true"
        id='tab-menu' 
        :data='[categoryData]' 
      >
        <div> 
          <tab-content-category :subcategories="showSubcategory"/>
          <tab-control 
            class="tab-control" 
            @tabClick="tabClick" 
            ref='scroll' 
            :titles="['综合', '新品', '销量']"
          />
          <goods-list :goods="showCategoryDetail"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import TabMenu from "./child/TabMenu" 
import Scroll from "@/components/common/scroll/Scroll"
import TabContentCategory from "./child/TabContentCategory" 
import TabControl from "@/components/content/tabcontrol/TabControl"
import GoodsList from '@/components/content/goods/GoodsList'

import {debounce} from "@/common/utils"
import {getCategory, getSubcategory, getCategoryDetail} from "@/network/category"
export default {
  name: 'Category', 
  components: { 
    NavBar, 
    TabMenu, 
    Scroll, 
    TabContentCategory, 
    TabControl, 
    GoodsList
  }, 
  data() { 
    return { 
      categories: [], 
      categoryData: {}, 
      currentIndex: -1, 
      currentType: 'pop'
    }
  }, 
  created() { 
    // 1.请求分类数据
    this._getCategory()
  }, 
  mounted() {
    // 2.监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.emitter.on("itemImgLoad", () => {
      refresh()
    });
  },
  computed: { 
    showSubcategory() { 
      if(this.currentIndex === -1) { 
        return {}
      } else { 
        return this.categoryData[this.currentIndex].subcategories
      }
    }, 
    showCategoryDetail() {
      if (this.currentIndex === -1) { 
        return []
      } else {
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    }
  }, 
  methods: { 
    _getCategory() { 
      getCategory().then(res => { 
        // 1.获取分类数据
        console.log('getCategory')
        console.log(res)
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
        for(let i= 0; i < this.categories.length; i++) { 
          this.categoryData[i] = {
            subcategories: {}, 
            categoryDetail: { 
              'pop': [], 
              'new': [], 
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据 
        this._getSubcategories(0)
      })
    }, 
    _getSubcategories(index) { 
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res => { 
        console.log('getSubcategory')
        console.log(res.data)
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('new')
        this._getCategoryDetail('sell')
      })
    }, 
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        // console.log('getCategoryDetail')
        // console.log(res)
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    /**
     * 事件响应相关的方法
     */
    tabClick(index) {
      this._getSubcategories(index)
    }, 
    selectItem(index) {
      this._getSubcategories(index)
    }
  }
}
</script>

<style scoped>
  #category { 
    height: 100vh; 
    position: relative; 
  } 

  .category-nav { 
    background-color: #ff8198; 
    color: #fff; 
    position: relative;
    z-index: 9;
  }

  .content1 {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 100px;
    right: 0;
  }
</style>
