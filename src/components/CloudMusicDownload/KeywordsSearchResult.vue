<template>
  <div v-loading="loading">
    <!--关键词搜索结果-->
    <div class="keywordsSearchResults">
      <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }" :data-source="keyWordsResults">

        <a-list-item slot="renderItem" slot-scope="item">
          <a-card style="padding-bottom: 0">
            <!--自定义标题-->
            <template slot="title">
              <span class="toDetailTitle">
                {{ item.name }}
                <br>
                <span style="font-weight: lighter;font-size: 18px;margin-bottom: -10px">{{ item.ar[0].name }}</span>
              </span>
              <span>
              <a-button type="link" block class="toDetailBtn" @click="tokeyWordsResultsItem(item.id)">查看 ></a-button>
              </span>
            </template>

            <div style="margin-top: 10px">
              <div id="keywordsD">
                <img :src="item.al.picUrl" alt="暂无图片" id="keywordsPic">
              </div>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "KeywordsSearchResult",
  data(){
    return{
      keyWords: '', //搜索的关键词
      keyWordsResults: [], //关键词搜索结果
      loading: false, //加载提示
    }
  },
  methods: {
    // 搜索关键词
    searchKeywords(){
      axios({
        methods: 'GET',
        url: 'https://cloud-music-api-lyart.vercel.app/cloudsearch',
        params: {
          keywords: this.keyWords
        }
      }).then((res)=>{
        this.keyWordsResults = res.data.result.songs
        this.loading = false
      })
    },

    //进入关键词搜索条目
    tokeyWordsResultsItem(id){
      this.searchId = id
      this.$bus.$emit('sendSongId', this.searchId)
      this.$bus.$emit('sendIsKeywordsSearchResultActive', false)
      this.$bus.$emit('sendIsUrlSearchResultActive', true)
    },
  },

  mounted() {
    this.$bus.$on('sendKeyWords', (keyWords) => {
      this.loading = true
      this.keyWords = keyWords
      this.searchKeywords()
    })
  },

}
</script>

<style scoped>
  .keywordsSearchResults{
    margin-top: 40px;
  }
  .toDetailTitle{
    display: inline-block;
    font-weight: bold;
    font-size: 20px;
    width: 150px !important;
    /*超出span部分显示省略号*/
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    word-break:keep-all;
  }
  .toDetailBtn{
    float: right;
    right: 20px;
    width: 45px;
  }
  #keywordsD{
    display: flex;
    /*height: 34vh;*/
    overflow: hidden;
    flex-direction: row;
    justify-content: space-around
  }
  #keywordsPic{
    flex-shrink: 1;
    /*width: 85%;*/
    height: 34vh;
    width: 34vh;
    border-radius: 15px;
  }
</style>
