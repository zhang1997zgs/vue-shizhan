<template>
  <div id='profile'>
    <nav-bar class='profile-nav'>
      <template #center>我的</template>
    </nav-bar>
    <user-info/>
    <account-info/>
    <normal-list-view :list-data='orderList'/>
    <normal-list-view :list-data='serviceList'/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"

import UserInfo from "./child/UserInfo"
import AccountInfo from "./child/AccountInfo"
import NormalListView from "./child/NormalListView"
export default {
  name: 'Profile', 
  components: { 
    NavBar, 
    UserInfo, 
    AccountInfo, 
    NormalListView
  }, 
  data() { 
    return { 
      orderList: [
        {icon: 'message.svg', info: '我的消息'},
        {icon: 'pointer.svg', info: '积分商城'},
        {icon: 'vip.svg', info: '会员卡'},
      ],
      serviceList: [
        {icon: 'cart.svg', info: '我的购物车'},
        {icon: 'shopping.svg', info: '下载购物APP'},
      ]
    }
  }
}
</script>

<style scoped>
  #profile { 
    height: 100vh; 
    position: relative; 
  } 

  .profile-nav { 
    background-color: #ff8198; 
    color: #fff; 
    position: relative; 
    z-index: 9; 
  } 
</style> 
