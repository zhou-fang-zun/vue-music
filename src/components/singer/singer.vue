<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import ListView from 'base/listview/listview'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singers: [],
        param: {
          "area": -100,
          "sex": -100,
          "genre": -100,
          "index":-100,
          "sin": 0,
          "cur_page": 1
        }
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '40px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList(this.param).then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res.singerList.data)
            this.singers = this._normalizeSinger(res.singerList.data.singerlist)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            // title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          // map.hot.items.push(new Singer({
          //   name: item.singer_name,
          //   id: item.singer_mid,
          // }))
          const key = item.country
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.singer_name,
            id: item.singer_mid,
          }))
        })
        // 为了得到有序列表，我们需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title){
            ret.push(val)
          } /*else if (val.title === HOT_NAME) {
            hot.push(val)
          }*/
        }
        /*ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })*/
        return hot.concat(ret)

      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
