<template>
  <div>
    <tab-bar>
      <router-link class="tab-bar-item" to='/home'>
        <img src='@/assets/img/tabbar/home.svg' alt='' v-if='false'>
        <img src='@/assets/img/tabbar/home_active.svg' alt='' v-else>
        <div :style="activeStyle">首页</div>
      </router-link>
      <router-link class="tab-bar-item" to='/category'>
        <img src='@/assets/img/tabbar/category.svg' alt='' v-if='true'>
        <img src='@/assets/img/tabbar/category_active.svg' alt='' v-else>
        <div>分类</div>
      </router-link>
      <router-link class="tab-bar-item" to='/cart'>
        <img src='@/assets/img/tabbar/shopcart.svg' alt='' v-if='true'>
        <img src='@/assets/img/tabbar/shopcart_active.svg' alt='' v-else>
        <div>购物车</div>
      </router-link>
      <router-link class="tab-bar-item" to='/profile'>
        <img src='@/assets/img/tabbar/profile.svg' alt='' v-if='true'>
        <img src='@/assets/img/tabbar/profile_active.svg' alt='' v-else>
        <div>我的</div>
      </router-link>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar"
export default {
  name: 'TabBarItem', 
  components: {
    TabBar
  }, 
  props: {
    path: String, 
    activeColor: {
      type: String, 
      default: '#ff5777'
    }
  }, 
  data() {
    return {
      
    }
  }, 
  computed: { 
    Click() { 
      return this.$route.path.indexOf(this.path) == -1 
    }, 
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  }
}
</script>

<style scoped>
  .tab-bar-item { 
    flex: 1; 
    text-align: center; 
    height: 49px; 
    font-size: 14px;
  }

  .tab-bar-item img { 
    width: 24px; 
    height: 24px; 
    margin-top: 3px; 
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
