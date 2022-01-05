<template>
  <div class="simAr">
    <!--<a-list :grid="{ gutter: 0, column: 2 }" :data-source="artistData">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :title="item.name" style="width: 100px;">
          Card content
        </a-card>
      </a-list-item>
    </a-list>-->

    <!--<el-collapse>
      <el-collapse-item title="相似歌手">
        <ul>
          <li v-for="(item, index) in artistData" :key="index">
            {{item.name}}
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>-->

    <div>
      <a-card title="相似歌手" size="small" style="width: 203px;">
        <a-card-grid
            style="width:101px;height: 101px;text-align:center"
            v-for="(item, index) in artistData"
            :key="index"
        >
          {{item.name}}
          <!--<img
              :src="item.img1v1Url"
              alt="暂无"
              style="width: 100px;height: 100px;margin:-23px 0 0 -23px"
          >-->
        </a-card-grid>
      </a-card>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SimArtist",
  data(){
    return{
      artistsId: '',
      artistData: []
    }
  },
  methods: {
    getSimilarArtist(){
      axios({
        methods: 'GET',
        url: 'https://cloud-music-api-lyart.vercel.app/simi/artist',
        params: {
          id: this.artistsId
        }
      }).then((res) => {
        if(res.data.artists.length > 4 ){
          for(let i = 0;i < 4;i++){
            this.artistData[i] = res.data.artists[i]
          }
        }
        else{
          this.artistData = res.data.artists
        }
      })
    }
  },
  mounted() {
    this.$bus.$on('sendArtistId',(data) => {
      this.artistsId = data
      this.getSimilarArtist()
    })
  },
  /*watch: {
    artistData(newValue){
      if(newValue.length === 0){

      }
    }
  }*/
}
</script>

<style scoped>

</style>
