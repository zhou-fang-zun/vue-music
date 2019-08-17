<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {getSingerDetail} from 'api/singer'
  import {getSongVkey} from 'api/song'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    data() {
      return {
        songs: [],
        // SongVkey: []
      }
    },
    created() {
      this._getDetail()
      // this._formatSongs()
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res)
            this.songs = this._formatSongs(res.singer.data.songlist)

          }
        })
      },
      _formatSongs(list) {
        let result = []
        list.forEach((item) => {
          getSongVkey(item.mid).then((res) => {
            if (res.code===ERR_OK) {
              // console.log(res)
              const vkey = res.req_0.data.midurlinfo[0].vkey;
              if (item.name && item.album.name) {
                result.push(createSong(item, vkey))
                // console.log(result)
              }
            }
          })
        })
        return result
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
