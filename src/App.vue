<template>
  <div id="app">
    <tab-bar-item/>
    <router-view/>
  </div>
</template>

<script>
  import TabBarItem from "@/components/common/tabbaritem/TabBarItem"
  export default {
    name: 'app', 
    components: {
      TabBarItem
    }
  }
</script>

<style>

</style>
