<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
//frontjs
(function (w) {w.frontjsConfig={token:"5fcb264abe1fe10538b46365b4fe8f80",behaviour:15,FPSThreshold:10};w.frontjsTmpData = {r:[],e:[],l:[]};w.frontjsTmpCollector = function (ev) {(ev.message ? window.frontjsTmpData.e : window.frontjsTmpData.r).push([new Date().getTime(), ev])};w.FrontJS = {addEventListener: function (t, f) {w.frontjsTmpData.l.push([t, f]);return f;},removeEventListener: function (t, f) {for (var i = 0; i < w.frontjsTmpData.l.length; i++) {t === w.frontjsTmpData.l[i][0] && f === w.frontjsTmpData.l[i][1] && w.frontjsTmpData.l.splice(i, 1);}return f;}};w.document.addEventListener("error", w.frontjsTmpCollector, true);w.addEventListener("error", w.frontjsTmpCollector, true);w.addEventListener("load", function () {var n = w.document.createElement("script");n.src = "https://frontjs-static.pgyer.com/dist/current/frontjs.web.min.js"; w.document.body.appendChild(n);}, true);})(window);
// matomo
  var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="https://prepantop.matomo.cloud/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '1']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src='//cdn.matomo.cloud/prepantop.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
    })();
// 百度统计
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5be7597fdb8f7699d04848d6ff995f85";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
</script>

<style scoped>

</style>
