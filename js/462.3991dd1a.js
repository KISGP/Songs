"use strict";(self["webpackChunksongs"]=self["webpackChunksongs"]||[]).push([[462],{7944:function(u,l,n){n.r(l),n.d(l,{default:function(){return g}});var a=n(6269),t=(n(3450),n(5658),n(440)),e=n(8643),s=n(4367),o=n(1809),c=n(9244),i=function(u,l,n,a){function t(u){return u instanceof n?u:new n((function(l){l(u)}))}return new(n||(n=Promise))((function(n,e){function s(u){try{c(a.next(u))}catch(l){e(l)}}function o(u){try{c(a["throw"](u))}catch(l){e(l)}}function c(u){u.done?n(u.value):t(u.value).then(s,o)}c((a=a.apply(u,l||[])).next())}))};const v=u=>((0,t.dD)("data-v-7fc4b286"),u=u(),(0,t.Cn)(),u),b={class:"back","infinite-scroll-immediate":!1,"infinite-scroll-delay":1e3},m={class:"head"},d=v((()=>(0,t._)("h2",null,"我的专辑",-1)));var f=(0,t.aZ)({__name:"my",setup(u){const l=(0,s.iH)({albumCount:0,albums:[]});(0,t.bv)((()=>i(this,void 0,void 0,(function*(){l.value=yield(0,o.pt)(21,0)}))));const n=10,v=()=>i(this,void 0,void 0,(function*(){if(l.value.albums.length<l.value.albumCount)if(l.value.albums.length+n<=l.value.albumCount){const{albums:u}=yield(0,o.pt)(n,l.value.albums.length);l.value.albums=l.value.albums.concat(u),l.value.albums.length+=n}else{const{albums:u}=yield(0,o.pt)(l.value.albumCount-l.value.albums.length,l.value.albums.length);l.value.albums=l.value.albums.concat(u),l.value.albums.length+=l.value.albumCount-l.value.albums.length}}));return(u,n)=>{const s=a.n;return(0,t.wy)(((0,t.wg)(),(0,t.iD)("div",b,[(0,t._)("div",m,[d,(0,t._)("span",null,[(0,t._)("i",null,"含收藏及购买专辑共 "+(0,e.zw)(l.value.albumCount)+" 张",1)])]),(0,t.Wm)(c.Z,{data:l.value.albums},null,8,["data"])])),[[s,v]])}}}),r=n(465);const h=(0,r.Z)(f,[["__scopeId","data-v-7fc4b286"]]);var g=h}}]);