<template>
  <!-- Main Content -->
  <div class="container-fluid">
    <div style="position:absolute; top:188px;left:50%; margin-left:-880px; width:160px;height: 600px;background-color: #fafafa;" />
    <!-- 가로 광고 Start -->
    <div class="row">
      <div class="col-12">
        <Adsense
          data-ad-client="ca-pub-7663265873201714"
          data-ad-slot="3941948313"
        />
      </div>
    </div>
    <!-- 가로 광고 End -->

    <div class="row m-b-10">
      <!-- 1열 -->
      <div class="col-lg-4 col-12 p-0">
        <h3><i class="zmdi zmdi-tv-alt-play" /> 블록체인 <strong>뉴스</strong></h3>
        <table class="table table-bordered table-hover m-b-0 articles">
          <tbody v-if="articles.length">
            <tr v-for="item in articles" :key="item.id">
              <td>
                <a
                  v-bind:href="item.link"
                  class="text-muted ellipsis"
                  target="_blank"
                >
                  <span v-if="item.cate=='tkp'">[TKP]</span> {{ item.title }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <Adsense
          data-ad-client="ca-pub-7663265873201714"
          data-ad-slot="9604552118"
        />
      </div>
      <!-- 2열: big image articles? -->
      <div class="col-lg-8 col-12 p-0">
        <div class="row m-b-10">
          <div class="col-12">
            <p>IMAGES</p>
          </div>
        </div>
        <div class="row m-b-10">
          <!-- 1열: SNS #1 -->
          <div class="col-6">
            <!-- 소셜 글 목록 #1 Start -->
            <h3><i class="zmdi zmdi-face" /> 암호화폐 <strong>소셜네트워크</strong></h3>
            <table class="table table-bordered table-hover m-b-0 socials">
              <tbody>
              <tr>
                <td>
                  <a
                          href="https://tokenpost.kr/article-6013"
                          class="text-muted ellipsis"
                          target="_blank"
                  >
                    日 작년 암호화폐 관련 자금 세탁 ‘10배’ 증가
                  </a>
                </td>
              </tr>
              </tbody>
            </table>
            <!-- 소셜 글 목록 #1 End -->
          </div>
          <!-- 2열: SNS #1 -->
          <div class="col-6">
            <p>SNS#2</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Row end -->

    <div class="row clearfix media-wrapper">
      <div class="col-lg-4 col-12">
        <h3 class="title-latest">
          <i class="zmdi zmdi-trending-up" /> 암호화폐 <strong>시세</strong> <a
            href="https://www.coingecko.com/ko"
            target="_blank"
          >
            <span class="badge badge-info">
              더보기
            </span>
          </a>
        </h3>
        <coingecko-coin-list-widget
          coin-ids="bitcoin,eos,ethereum,ripple,mossland,mediblocx"
          currency="krw"
          locale="ko"
          class="clearfix"
        />
      </div>

      <div class="col-lg-4 col-12 right-content">
        <div class="row clearfix media-first-row">

        </div>
      </div>
    </div>

    <!-- 가로 광고 Start -->
    <div class="row">
      <div class="col-12">
        <Adsense
          data-ad-client="ca-pub-7663265873201714"
          data-ad-slot="3941948313"
        />
      </div>
    </div>
    <!-- 가로 광고 End -->

    <div class="row media-wrapper second clearfix">

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_tokenpost.svg');" />
            <!--<h6 class="mt-2 mb-0">토큰포스트</h6>-->
            <a
                    href="https://tokenpost.kr"
                    class="ellipse"
            >
              tokenpost.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_dstreet.png');" />
            <!--<h6 class="mt-2 mb-0">디스트리트</h6>-->
            <a href="https://dstreet.io">
              dstreet.io
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_blockinpress.png');" />
            <!--<h6 class="mt-2 mb-0">블록인프레스</h6>-->
            <a href="https://blockinpress.com">
              blockinpress.com
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_trendwatching.jpg');" />
            <!--<h6 class="mt-2 mb-0">트렌드와칭</h6>-->
            <a href="https://trendw.kr/category/blockchain">
              trendw.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_blockmedia.png');" />
            <!--<h6 class="mt-2 mb-0">블록미디어</h6>-->
            <a href="https://www.blockmedia.co.kr">
              blockmedia.co.kr
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_theblockpost.png');" />
            <!--<h6 class="mt-2 mb-0">더블록포스트</h6>-->
            <a href="https://blockpost.com">
              blockpost.com
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_decenter.png');" />
            <!--<h6 class="mt-2 mb-0">디센터</h6>-->
            <a href="https://www.decenter.kr">
              decenter.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_blockdaily.png');" />
            <!--<h6 class="mt-2 mb-0">블록데일리</h6>-->
            <a href="https://blockdaily.com">
              blockdaily.com
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_coindeskkorea.png');" />
            <!--<h6 class="mt-2 mb-0">코인데스크코리아</h6>-->
            <a
                    href="https://www.coindeskkorea.com"
                    class="ellipse"
            >
              coindeskkorea.com
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_paxnetnews.png');" />
            <!--<h6 class="mt-2 mb-0">팍스넷뉴스</h6>-->
            <a href="http://paxnetnews.com/hotTag1">
              paxnetnews.com
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_coinreaders.jpg');" />
            <!--<h6 class="mt-2 mb-0">코인리더스</h6>-->
            <a href="http://www.coinreaders.com">
              coinreaders.com
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_4th.png');" />
            <!--<h6 class="mt-2 mb-0">포쓰저널</h6>-->
            <a href="http://www.4th.kr/news/articleList.html?sc_section_code=S1N10&view_type=sm">
              4th.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div
                    class="dark"
                    style="background-image: url('/images/media_logo/ic_chainnews.png');"
            />
            <!--<h6 class="mt-2 mb-0">체인뉴스</h6>-->
            <a href="https://chainnews.kr">
              chainnews.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_thebchain.png');" />
            <!--<h6 class="mt-2 mb-0">더비체인</h6>-->
            <a href="http://www.thebchain.co.kr">
              thebchain.co.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_blocktimestvdotcom.png');" />
            <!--<h6 class="mt-2 mb-0">블록타임스TV닷컴</h6>-->
            <a href="http://blocktimestv.com">
              blocktimestv.com
            </a>
          </div>
        </div>
      </div>

      <!-- 허브들 Starts -->

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_cointelegraph.png');" />
            <!--<h6 class="mt-2 mb-0">코인텔레그래프</h6>-->
            <a href="https://cointelegraph.com">
              cointelegraph.com
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_cryptobriefing.png');" />
            <!--<h6 class="mt-2 mb-0">크립토브리핑</h6>-->
            <a href="https://cryptobriefing.com">
              cryptobriefing.com
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div
              class="dark"
              style="background-image: url('/images/media_logo/ic_cryptograph.png');"
            />
            <!--<h6 class="mt-2 mb-0">크립토그래프</h6>-->
            <a href="http://cryptograph.co.kr">
              cryptograph.co.kr
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_bloter.png');" />
            <!--<h6 class="mt-2 mb-0">블로터</h6>-->
            <a href="https://www.bloter.net/archives/tag/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8">
              bloter.net
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div
              class="dark"
              style="background-image: url('/images/media_logo/ic_zdnet.png');"
            />
            <!--<h6 class="mt-2 mb-0">지디넷코리아</h6>-->
            <a href="http://www.zdnet.co.kr/newskey/?lstcode=%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8">
              zdnet.co.kr
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_etnews.png');" />
            <!--<h6 class="mt-2 mb-0">전자신문</h6>-->
            <a href="http://www.etnews.com/news/series_list.html?id=2620">
              etnews.com
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_dt.jpg');" />
            <!--<h6 class="mt-2 mb-0">디지털타임스</h6>-->
            <a href="http://www.dt.co.kr">
              dt.co.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_financialnews.png');" />
            <!--<h6 class="mt-2 mb-0">파이낸셜뉴스</h6>-->
            <a href="http://www.fnnews.com/section/002010000">
              fnnews.com
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div
              class="dark"
              style="background-image: url('/images/media_logo/ic_investingcom.png');"
            />
            <!--<h6 class="mt-2 mb-0">인베스팅닷컴</h6>-->
            <a href="https://kr.investing.com/news/cryptocurrency-news">
              kr.investing.com
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_blockchainhub.svg');" />
            <!--<h6 class="mt-2 mb-0">블록체인허브</h6>-->
            <a href="https://www.blockchainhub.kr">
              blockchainhub.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_dailycoinnews.png');" />
            <!--<h6 class="mt-2 mb-0">데일리코인뉴스</h6>-->
            <a href="https://www.dailycoinews.com">
              dailycoinews.com
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div
              class="dark"
              style="background-image: url('/images/media_logo/ic_coinness.png');"
            />
            <!--<h6 class="mt-2 mb-0">코인니스</h6>-->
            <a href="https://kr.coinness.com">
              kr.coinness.com
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_coinpress.jpg');" />
            <!--<h6 class="mt-2 mb-0">코인프레스</h6>-->
            <a href="https://www.coinpress.co.kr">
              coinpress.co.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_moneynet.png');" />
            <!--<h6 class="mt-2 mb-0">머니넷</h6>-->
            <a href="https://www.moneynet.co.kr/info_board">
              moneynet.co.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_cointoday.png');" />
            <!--<h6 class="mt-2 mb-0">코인투데이</h6>-->
            <a href="http://cointoday.co.kr">
              cointoday.co.kr
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_coincode.png');" />
            <!--<h6 class="mt-2 mb-0">코인코드</h6>-->
            <a href="https://coincode.kr">
              coincode.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_hashnet.png');" />
            <!--<h6 class="mt-2 mb-0">해시넷</h6>-->
            <a href="http://www.hash.kr">
              hash.kr
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_coinbus.png');" />
            <!--<h6 class="mt-2 mb-0">코인버스</h6>-->
            <a href="https://coinbus.co.kr">
              coinbus.co.kr
            </a>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_blockchainvalley.png');" />
            <!--<h6 class="mt-2 mb-0">블록체인밸리</h6>-->
            <a href="http://www.fintechpost.co.kr">
              fintechpost.co.kr
            </a>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w_data_1">
          <div class="body">
            <div style="background-image: url('/images/media_logo/ic_bitweb.png');" />
            <!--<h6 class="mt-2 mb-0">비트웹</h6>-->
            <a href="http://bitweb.co.kr">
              bitweb.co.kr
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Row End -->

    <!-- 가로 광고 Start -->
    <div class="row">
      <div class="col-12">
        <Adsense
          data-ad-client="ca-pub-7663265873201714"
          data-ad-slot="3941948313"
        />
      </div>
    </div>
    <!-- 가로 광고 End -->
  </div>
</template>

<style>
.row h3 { margin: 10px 10px 0 10px; }
.card .body { padding: 10px 10px; }
.media-latest { margin-left: -15px;padding-right: 2px; }
.carousel-inner, .carousel-item { height: 100%; }
.carousel-item { background-size: cover;background-repeat: no-repeat; }
.badge-info { background: white;color: rgb(96, 125, 139);border: 1px solid rgb(96, 125, 139); }
</style>

<script>
import axios from 'axios'

const config = require('../configs/config.js')

export default {
  async asyncData ({ params }) {
    return axios.get(config.BASE_URL + '/api/news').then((res) => {
      return { articles: res.data.result }
    })
  },
  data: function () {
    return {
      articles: []
    }
  }
}
</script>
