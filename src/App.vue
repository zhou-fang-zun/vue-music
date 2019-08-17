<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header'
  import Player from 'components/player/player'
  import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components:{
      MHeader,
      Tab,
      Player
  }
}
</script >

<style scoped lang="stylus" rel="stylesheet/stylus">
#app {

}
</style>
