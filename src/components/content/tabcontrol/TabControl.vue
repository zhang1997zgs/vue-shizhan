<template>
  <div class="tab-control">
    <div class="tab-control-item" 
          v-for='(item, index) in titles' 
          :key='item' 
          @cilck='itemClick(index)' 
          :calss='{active: index === currentIndex}'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl', 
  props: {
    titles: {
      type: Array, 
      default() { 
        return ['流行', '新款', '精选']
      }
    }
  }, 
  data() {
    return { 
      currentIndex: 0
    }
  }, 
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
    display: flex;
    text-align: center;
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
