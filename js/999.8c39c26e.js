"use strict";(self["webpackChunksongs"]=self["webpackChunksongs"]||[]).push([[999],{7999:function(e,l,t){t.r(l),t.d(l,{default:function(){return k}});var a=t(2603),r=(t(3450),t(4350),t(440)),n=t(4367),s=t(9644);const i=e=>((0,r.dD)("data-v-119036c0"),e=e(),(0,r.Cn)(),e),c={class:"back"},o=i((()=>(0,r._)("span",{style:{color:"rgb(48, 49, 51)"}},"浅色",-1))),u=[o],p=i((()=>(0,r._)("span",{style:{color:"rgb(186, 186, 186)"}},"深色",-1))),d=[p],f=i((()=>(0,r._)("span",{style:{color:"rgb(186, 186, 186)"}},"深色图片",-1))),y=[f],v=i((()=>(0,r._)("span",{style:{color:"rgb(48, 49, 51)"}},"浅色图片",-1))),h=[v];var m=(0,r.aZ)({__name:"theme",setup(e){const l=(0,s.a2)();return(e,t)=>{const s=a.Q2;return(0,r.wg)(),(0,r.iD)("div",c,[(0,r.Wm)(s,{wrap:"",size:"large",alignment:"flex-start"},{default:(0,r.w5)((()=>[(0,r._)("div",{class:"pre",style:{"background-color":"#fff"},onClick:t[0]||(t[0]=e=>(0,n.SU)(l).update_theme("light"))},u),(0,r._)("div",{class:"pre",style:{"background-color":"#1b1b1b"},onClick:t[1]||(t[1]=e=>(0,n.SU)(l).update_theme("dark"))},d),(0,r._)("div",{class:"pre dark2",onClick:t[2]||(t[2]=e=>(0,n.SU)(l).update_theme("dark2"))},y),(0,r._)("div",{class:"pre light2",onClick:t[3]||(t[3]=e=>(0,n.SU)(l).update_theme("light2"))},h)])),_:1})])}}}),g=t(465);const S=(0,g.Z)(m,[["__scopeId","data-v-119036c0"]]);var k=S},2603:function(e,l,t){t.d(l,{Q2:function(){return g}});t(7658);var a=t(440),r=t(8643),n=t(1879),s=t(6086);const i=(0,n.o8)({prefixCls:{type:String}}),c=(0,a.aZ)({name:"ElSpaceItem",props:i,setup(e,{slots:l}){const t=(0,s.s3)("space"),r=(0,a.Fl)((()=>`${e.prefixCls||t.b()}__item`));return()=>(0,a.h)("div",{class:r.value},(0,a.WI)(l,"default"))}});var o=t(4367),u=t(6250);const p={small:8,default:12,large:16};function d(e){const l=(0,s.s3)("space"),t=(0,a.Fl)((()=>[l.b(),l.m(e.direction),e.class])),n=(0,o.iH)(0),i=(0,o.iH)(0),c=(0,a.Fl)((()=>{const l=e.wrap||e.fill?{flexWrap:"wrap",marginBottom:`-${i.value}px`}:{},t={alignItems:e.alignment};return[l,t,e.style]})),d=(0,a.Fl)((()=>{const l={paddingBottom:`${i.value}px`,marginRight:`${n.value}px`},t=e.fill?{flexGrow:1,minWidth:`${e.fillRatio}%`}:{};return[l,t]}));return(0,a.m0)((()=>{const{size:l="small",wrap:t,direction:a,fill:s}=e;if((0,r.kJ)(l)){const[e=0,t=0]=l;n.value=e,i.value=t}else{let e;e=(0,u.hj)(l)?l:p[l||"small"]||p.small,(t||s)&&"horizontal"===a?n.value=i.value=e:"horizontal"===a?(n.value=e,i.value=0):(i.value=e,n.value=0)}})),{classes:t,containerStyle:c,itemStyle:d}}var f=t(4324),y=t(9682);const v=(0,n.o8)({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},class:{type:(0,n.Cq)([String,Object,Array]),default:""},style:{type:(0,n.Cq)([String,Array,Object]),default:""},alignment:{type:(0,n.Cq)(String),default:"center"},prefixCls:{type:String},spacer:{type:(0,n.Cq)([Object,String,Number,Array]),default:null,validator:e=>(0,a.lA)(e)||(0,u.hj)(e)||(0,r.HD)(e)},wrap:Boolean,fill:Boolean,fillRatio:{type:Number,default:100},size:{type:[String,Array,Number],values:f.k,validator:e=>(0,u.hj)(e)||(0,r.kJ)(e)&&2===e.length&&e.every(u.hj)}}),h=(0,a.aZ)({name:"ElSpace",props:v,setup(e,{slots:l}){const{classes:t,containerStyle:n,itemStyle:s}=d(e);function i(l,t="",n=[]){const{prefixCls:o}=e;return l.forEach(((e,l)=>{(0,y.M2)(e)?(0,r.kJ)(e.children)&&e.children.forEach(((e,l)=>{(0,y.M2)(e)&&(0,r.kJ)(e.children)?i(e.children,`${t+l}-`,n):n.push((0,a.Wm)(c,{style:s.value,prefixCls:o,key:`nested-${t+l}`},{default:()=>[e]},y.y.PROPS|y.y.STYLE,["style","prefixCls"]))})):(0,y.Lg)(e)&&n.push((0,a.Wm)(c,{style:s.value,prefixCls:o,key:`LoopKey${t+l}`},{default:()=>[e]},y.y.PROPS|y.y.STYLE,["style","prefixCls"]))})),n}return()=>{var c;const{spacer:o,direction:u}=e,p=(0,a.WI)(l,"default",{key:0},(()=>[]));if(0===(null!=(c=p.children)?c:[]).length)return null;if((0,r.kJ)(p.children)){let e=i(p.children);if(o){const l=e.length-1;e=e.reduce(((e,t,r)=>{const n=[...e,t];return r!==l&&n.push((0,a.Wm)("span",{style:[s.value,"vertical"===u?"width: 100%":null],key:r},[(0,a.lA)(o)?o:(0,a.Uk)(o,y.y.TEXT)],y.y.STYLE)),n}),[])}return(0,a.Wm)("div",{class:t.value,style:n.value},e,y.y.STYLE|y.y.CLASS)}return p.children}}});var m=t(5482);const g=(0,m.nz)(h)},4350:function(e,l,t){t(3450)}}]);