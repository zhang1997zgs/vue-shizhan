<template>
  <div class="recommend">
    <div class="recommend-item" v-for='index in recommends' :key='index'>
      <a :href="index.link">
        <img :src="index.image" alt=""><br>
        <span>{{index.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommend', 
  props: { 
    recommends: {
      type: Array, 
      default() { 
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    margin-top: 10px;
    font-size: 14px;
    padding: 10px 0 20px;
    padding-bottom: 20px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
