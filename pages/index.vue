<template>
  <!-- Main Content -->
  <div class="container-fluid">
    <!-- 동영상 -->
    <div class="row video-row">
      <div class="col-12 video-col">
          <video autoplay muted loop>
              <source src="/video/mv_blockchain.mp4" type="video/mp4">
          </video>
      </div>
    </div>
    <!-- 가로 광고 Start -->
    <!--
    <div class="row">
      <div class="col-lg-6 col-12 ad-col">
          <ins class="kakao_ad_area" style="display:none;"
               data-ad-unit    = "DAN-rl2caecyi6w3"
               data-ad-width   = "728"
               data-ad-height  = "90"></ins>
      </div>
      <div class="col-lg-6 col-12 ad-col">
          <ins class="kakao_ad_area" style="display:none;"
               data-ad-unit    = "DAN-1iykhjnjexs2s"
               data-ad-width   = "728"
               data-ad-height  = "90"></ins>
      </div>
    </div>
    -->
    <!-- 가로 광고 End -->

    <div class="row m-b-10 article-row">
      <!-- 1열 -->
      <div class="col-lg-3 col-12 p-2">
        <h5>블록체인 뉴스</h5>
        <table class="table table-hover m-b-0 articles">
          <tbody v-if="news1.length">
            <tr v-for="item in news1" :key="item.id">
              <td v-bind:class="['media_logo', item.cate]">
                <a
                  v-bind:href="item.link"
                  class="img-line2-text"
                  target="_blank"
                >
                  <div class="thumb_article"
                       v-bind:style="'background-image:url(' + item.img + ');'">
                  </div>{{ item.title }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- news 2열 -->
      <div class="col-lg-3 col-12 p-2">
          <table class="table table-hover m-b-0 articles">
              <tbody v-if="news2.length">
              <tr v-for="item in news2" :key="item.id">
                  <td v-bind:class="['media_logo', item.cate]">
                      <a v-bind:href="item.link"
                              class="img-line2-text"
                              target="_blank"
                      >
                      <div class="thumb_article" v-bind:style="'background-image:url(' + item.img + ');'"></div>
                      <span>{{ item.title }}</span></a>
                  </td>
              </tr>
              </tbody>
          </table>
        </div>
        <!-- news 3열 -->
        <div class="col-lg-3 col-12 p-2">
            <table class="table table-hover m-b-0 articles">
            <tbody v-if="news3.length">
            <tr v-for="item in news3" :key="item.id">
                <td v-bind:class="['media_logo', item.cate]">
                    <a
                        v-bind:href="item.link"
                        class="img-line2-text"
                        target="_blank"
                    >
                    <div class="thumb_article"
                         v-bind:style="'background-image:url(' + item.img + ');'">
                    </div>
                    <span>{{ item.title }}</span>
                    </a>
                </td>
            </tr>
            </tbody>
            </table>
        </div>
        <!-- news 4열 -->
        <div class="col-lg-3 col-12 p-2">
          <table class="table table-hover m-b-0 articles">
              <tbody v-if="news4.length">
              <tr v-for="item in news4" :key="item.id">
                  <td v-bind:class="['media_logo', item.cate]">
                    <a
                      v-bind:href="item.link"
                      class="img-line2-text"
                      target="_blank"
                      >
                    <div class="thumb_article"
                         v-bind:style="'background-image:url(' + item.img + ');'">
                    </div>
                    <span>{{ item.title }}</span>
                    </a>
                  </td>
              </tr>
              </tbody>
          </table>
      </div>
    </div>
    <!-- Row end -->

    <!-- 가로 광고 Start -->
    <!--
    <div class="row">
      <div class="col-12">
        <Adsense
          data-ad-client="ca-pub-7663265873201714"
          data-ad-slot="3941948313"
        />
      </div>
    </div>
    -->
    <!-- 가로 광고 End -->

    <div class="row media-wrapper second clearfix">
      <div class="col">
        <a href="https://tokenpost.kr">
          <div style="background-image: url('/images/media_logo/ic_tkp.svg');" />
        </a>
      </div>
      <div class="col">
        <a href="https://dstreet.io">
            <div style="background-image: url('/images/media_logo/ic_dst.png');" />
        </a>
      </div>
      <div class="col">
        <a href="https://blockinpress.com">
          <div style="background-image: url('/images/media_logo/ic_bip.png');" />
        </a>
      </div>
      <div class="col">
        <a href="https://www.blockmedia.co.kr">
            <div style="background-image: url('/images/media_logo/ic_blm.png');" />
        </a>
      </div>

      <div class="col">
        <a href="https://blockpost.com">
          <div style="background-image: url('/images/media_logo/ic_blp.png');" />
        </a>
      </div>
      <div class="col">
        <a href="https://www.decenter.kr">
            <div style="background-image: url('/images/media_logo/ic_dct.png');" />
        </a>
      </div>
        <div class="col">
            <a href="http://www.coinreaders.com">
                <div style="background-image: url('/images/media_logo/ic_cnr.png');" />
            </a>
        </div>
        <div class="col">
            <a href="http://cointoday.co.kr">
                <div style="background-image: url('/images/media_logo/ic_ctd.png');" />
            </a>
        </div>
      <div class="col">
        <a href="https://www.coindeskkorea.com" class="ellipse">
          <div style="background-image: url('/images/media_logo/ic_coindeskkorea.png');" />
        </a>
      </div>
      <div class="col">
        <a href="http://paxnetnews.com/hotTag1">
          <div style="background-image: url('/images/media_logo/ic_paxnetnews.png');" />
        </a>
      </div>
        <div class="col">
            <a href="https://trendw.kr/category/blockchain">
                <div style="background-image: url('/images/media_logo/ic_trendwatching.jpg');" />
            </a>
        </div>
      <div class="col">
        <a href="http://blocktimestv.com">
          <div style="background-image: url('/images/media_logo/ic_blocktimestvdotcom.png');" />
        </a>
      </div>
        <div class="col">
            <a href="https://blockdaily.com">
                <div style="background-image: url('/images/media_logo/ic_blockdaily.png');" />
            </a>
        </div>
        <div class="col dark">
            <a href="https://chainnews.kr">
                <div style="background-image: url('/images/media_logo/ic_chainnews.png');"/>
            </a>
        </div>
        <div class="col">
            <a href="http://www.thebchain.co.kr">
                <div style="background-image: url('/images/media_logo/ic_tbc.png');" />
            </a>
        </div>
        <div class="col">
            <a href="http://www.4th.kr/news/articleList.html?sc_section_code=S1N10&view_type=sm">
                <div style="background-image: url('/images/media_logo/ic_4th.png');" />
            </a>
        </div>
      <!-- 허브들 Starts -->

      <div class="col dark">
        <a href="https://cointelegraph.com">
          <div style="background-image: url('/images/media_logo/ic_cointelegraph.png');" />
        </a>
      </div>

      <div class="col">
        <a href="https://cryptobriefing.com">
            <div style="background-image: url('/images/media_logo/ic_cryptobriefing.png');" />
        </a>
      </div>

      <div class="col dark">
        <a href="http://cryptograph.co.kr">
            <div style="background-image: url('/images/media_logo/ic_cryptograph.png');" />
        </a>
      </div>

      <div class="col">
        <a href="https://www.bloter.net/archives/tag/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8">
            <div style="background-image: url('/images/media_logo/ic_bloter.png');" />
        </a>
      </div>
      <div class="col dark">
        <a href="http://www.zdnet.co.kr/newskey/?lstcode=%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8">
            <div style="background-image: url('/images/media_logo/ic_zdnet.png');" />
        </a>
      </div>
      <div class="col">
        <a href="http://www.etnews.com/news/series_list.html?id=2620">
            <div style="background-image: url('/images/media_logo/ic_etnews.png');" />
        </a>
      </div>
      <div class="col">
        <a href="http://www.dt.co.kr">
            <div style="background-image: url('/images/media_logo/ic_dt.jpg');" />
        </a>
      </div>
      <div class="col">
        <a href="http://www.fnnews.com/section/002010000">
            <div style="background-image: url('/images/media_logo/ic_financialnews.png');" />
        </a>
      </div>

      <div class="col dark">
        <a href="https://kr.investing.com/news/cryptocurrency-news">
            <div style="background-image: url('/images/media_logo/ic_investingcom.png');" />
        </a>
      </div>

      <div class="col">
        <a href="https://www.blockchainhub.kr">
            <div style="background-image: url('/images/media_logo/ic_blockchainhub.svg');" />
        </a>
      </div>
      <div class="col">
        <a href="https://www.dailycoinews.com">
            <div style="background-image: url('/images/media_logo/ic_dailycoinnews.png');" />
        </a>
      </div>

      <div class="col dark">
        <a href="https://kr.coinness.com">
            <div style="background-image: url('/images/media_logo/ic_coinness.png');"></div>
        </a>
      </div>
      <div class="col">
        <a href="https://www.coinpress.co.kr">
            <div style="background-image: url('/images/media_logo/ic_coinpress.jpg');" />
        </a>
      </div>
      <div class="col">
        <a href="https://www.moneynet.co.kr/info_board">
            <div style="background-image: url('/images/media_logo/ic_moneynet.png');" />
        </a>
      </div>
      <div class="col">
        <a href="https://coincode.kr">
            <div style="background-image: url('/images/media_logo/ic_coincode.png');" />
        </a>
      </div>
      <div class="col">
        <a href="http://www.hash.kr">
            <div style="background-image: url('/images/media_logo/ic_hashnet.png');" />
        </a>
      </div>

      <div class="col">
        <a href="https://coinbus.co.kr">
          <div style="background-image: url('/images/media_logo/ic_coinbus.png');" />
        </a>
      </div>
      <div class="col">
        <a href="http://www.fintechpost.co.kr">
          <div style="background-image: url('/images/media_logo/ic_blockchainvalley.png');" />
        </a>
      </div>

      <div class="col">
        <a href="http://bitweb.co.kr">
            <div style="background-image: url('/images/media_logo/ic_bitweb.png');" />
        </a>
      </div>
    </div>
    <!-- Row End -->

    <!-- 가로 광고 Start -->
    <!--
    <div class="row">
      <div class="col-12">
        <Adsense
          data-ad-client="ca-pub-7663265873201714"
          data-ad-slot="3941948313"
        />
      </div>
    </div>
    -->
    <!-- 가로 광고 End -->
  </div>
</template>

<style scoped>
.table td, .table th { border-bottom: 1px solid #aaa;border-top: 0; }
.ad-col { overflow: hidden;height: 60px;padding: 0;}
.media_logo { background-size: 80px; background-repeat: no-repeat;
    background-position: 100% 96%; }
.media_logo a { color: rgba(0,0,0,0.7);width: 100%; }
.tkp { background-image: url('/images/media_logo/ic_tkp.svg'); }
.dst { background-image: url('/images/media_logo/ic_dst.png'); }
.bip { background-image: url('/images/media_logo/ic_bip.png'); }
.blp { background-image: url('/images/media_logo/ic_blp.png'); }
.blm { background-image: url('/images/media_logo/ic_blm.png'); }
.dct { background-image: url('/images/media_logo/ic_dct.png'); }
.cnr { background-image: url('/images/media_logo/ic_cnr.png'); }
.ctd { background-image: url('/images/media_logo/ic_ctd.png'); }
</style>

<script>
import axios from '../plugins/axios'

export default {
  async asyncData ({ params }) {
    return axios.get('/api/news').then((res) => {
      return { news1: res.data.news1, news2: res.data.news2, news3: res.data.news3,
        news4: res.data.news4 }
    })
  },
  data: function () {
    return {
      news1: [],
      news2: [],
      news3: [],
      news4: []
    }
  }
}
</script>
