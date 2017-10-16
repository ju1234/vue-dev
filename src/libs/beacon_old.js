!function (e, n, t, o) {
    function r() {
        return a._LXALogNTObject ? "hybrid" : o ? o : /(mobile|iphone|htc)/gi.test(b) ? "mobile" : "web"
    }

    var a = window, i = document, c = "_MeiTuanALogObject";
    if (a[c] = t, !a[t]) {
        var s = function () {
            return s.q.push(arguments), s
        };
        s.q = s.q || [], s.v = n, s.l = +new Date, s.C = o, a[t] = a[t] || s;
        var u = i.getElementsByTagName("head")[0], l = i.createElement("script"), b = navigator.userAgent.toLocaleLowerCase(), g = r(), d = "";
        d = e.length - 3 === e.indexOf(".js") ? e : ["//", e, "/source/", n, "/", g, ".", "js"].join(""), l.defer = l.async = !0, l.charset = "utf-8", l.src = d, l.onload = l.onerror = function () {
        }, u.appendChild(l)
    }
}("analytics.meituan.net", "stable", "Analytics", "");
// Analytics('config', 'appnm', 'dianping_nova')
Analytics('config', 'appnm', 'dp_m'); // appnm 用于native SDK 与 web SDK串联因此非常重要，必须设置
Analytics('use', '', {});
Analytics('config', 'cid', 'poi_ugc_33003');
