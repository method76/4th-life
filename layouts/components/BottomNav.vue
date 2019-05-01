<template>
  <div class="container-fluid footer">
    <div class="row justify-content-center align-items-center m-0">
      <div class="col-lg-6 col-12 footer-copy d-flex">
        <img src="/images/layout/ic_ci_kittychain.png" class="float-left mr-3 corp-img" />
        <div>© 2019 Kittychain. All rights reserved.</div>
      </div>
      <div class="col-lg-6 col-12">
        <div class="float-right footer-right">
          <a href="https://www.facebook.com/cryptosticker"><i class="fab fa-facebook-square"></i></a>&nbsp;
          <a href="https://www.instagram.com/kittychain_shop"><i class="fab fa-instagram"></i></a>&nbsp;
          <a href="https://twitter.com/KittychainI"><i class="fab fa-twitter-square"></i></a>&nbsp;
          <a href="https://github.com/method76"><i class="fab fa-github"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
          <div class="ssl-cert"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--
<script language="JavaScript" type="text/javascript" async defer>
TrustLogo("/certs/positivessl_trust_seal_md_167x42.png", "CL1", "none");
</script>
-->

<style>
.ssl-cert { background-image: url(/images/layout/ssl_gray.png);
  height: 33px;width: 130px;background-size: contain;background-repeat: no-repeat;
  float: right;margin-left: 10px;opacity: .7; }
.corp-img { height: 50px;opacity: .5; }
.footer-copy > div { margin-top: 4px;font-size: 14px;color: #888; }
.footer-right { height: 33px; }
.container-fluid.footer .col-12 { padding: 0; }
</style>
