<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home">
        <template #item-icon>
          <img src="@/assets/img/tabbar/home.svg" alt="">
        </template>
        <template #item-active-icon>
          <img src="@/assets/img/tabbar/home_active.svg" alt="">
        </template>
        <template #item-text>
          <span>首页</span>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template #item-icon>
          <img src="@/assets/img/tabbar/category.svg" alt="">
        </template>
        <template #item-active-icon>
          <img src="@/assets/img/tabbar/category_active.svg" alt="">
        </template>
        <template #item-text>
          <span>分类</span>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <template #item-icon>
          <img src="@/assets/img/tabbar/shopcart.svg" alt="">
        </template>
        <template #item-active-icon>
          <img src="@/assets/img/tabbar/shopcart_active.svg" alt="">
        </template>
        <template #item-text>
          <span>购物车</span>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <template #item-icon>
          <img src="@/assets/img/tabbar/profile.svg" alt="">
        </template>
        <template #item-active-icon>
          <img src="@/assets/img/tabbar/profile_active.svg" alt="">
        </template>
        <template #item-text>
          <span>我的</span>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from '@/components/common/tabbar/TabBar'
  import TabBarItem from '@/components/common/tabbaritem/TabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
