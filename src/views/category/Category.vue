<template>
  <div id='category'>
    <nav-bar class='category-nav'><template #center>分类</template></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import axios from "axios"
export default {
  name: 'Category', 
  components: { 
    NavBar
  }, 
  data() { 
    return { 
      info: []
    }
  }, 
  mounted () {
    axios
      .get('http://152.136.185.210:7878/api/m5/home/multidata')
      .then(response => {
        this.info = response.data.data.banner.list
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
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
</style>
