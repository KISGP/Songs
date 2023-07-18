"use strict";(self["webpackChunksongs"]=self["webpackChunksongs"]||[]).push([[994],{8994:function(e,l,t){t.r(l),t.d(l,{default:function(){return ge}});t(7658);var o=t(440),n=t(4367),a=t(8643),s=t(4592),i=t(768),r=t(1247),u=t(1222),c=t(2357),p=t(2653),d=t(2516),v=t(4704),h=t(6037),f=t(1181);const m=Symbol("ElSelectGroup"),g=Symbol("ElSelect");var b=t(6326);function y(e,l){const t=(0,o.f3)(g),a=(0,o.f3)(m,{disabled:!1}),s=(0,o.Fl)((()=>"[object object]"===Object.prototype.toString.call(e.value).toLowerCase())),i=(0,o.Fl)((()=>t.props.multiple?v(t.props.modelValue,e.value):h(e.value,t.props.modelValue))),r=(0,o.Fl)((()=>{if(t.props.multiple){const e=t.props.modelValue||[];return!i.value&&e.length>=t.props.multipleLimit&&t.props.multipleLimit>0}return!1})),u=(0,o.Fl)((()=>e.label||(s.value?"":e.value))),c=(0,o.Fl)((()=>e.value||e.label||"")),p=(0,o.Fl)((()=>e.disabled||l.groupDisabled||r.value)),d=(0,o.FN)(),v=(e=[],l)=>{if(s.value){const o=t.props.valueKey;return e&&e.some((e=>(0,n.IU)((0,f.Z)(e,o))===(0,f.Z)(l,o)))}return e&&e.includes(l)},h=(e,l)=>{if(s.value){const{valueKey:o}=t.props;return(0,f.Z)(e,o)===(0,f.Z)(l,o)}return e===l},y=()=>{e.disabled||a.disabled||(t.hoverIndex=t.optionsArray.indexOf(d.proxy))};(0,o.YP)((()=>u.value),(()=>{e.created||t.props.remote||t.setSelected()})),(0,o.YP)((()=>e.value),((l,o)=>{const{remote:n,valueKey:a}=t.props;if(Object.is(l,o)||(t.onOptionDestroy(o,d.proxy),t.onOptionCreate(d.proxy)),!e.created&&!n){if(a&&"object"===typeof l&&"object"===typeof o&&l[a]===o[a])return;t.setSelected()}})),(0,o.YP)((()=>a.disabled),(()=>{l.groupDisabled=a.disabled}),{immediate:!0});const{queryChange:C}=(0,n.IU)(t);return(0,o.YP)(C,(o=>{const{query:a}=(0,n.SU)(o),s=new RegExp((0,b.fA)(a),"i");l.visible=s.test(u.value)||e.created,l.visible||t.filteredOptionsCount--}),{immediate:!0}),{select:t,currentLabel:u,currentValue:c,itemSelected:i,isDisabled:p,hoverItem:y}}var C=t(7922),S=t(6086);const w=(0,o.aZ)({name:"ElOption",componentName:"ElOption",props:{value:{required:!0,type:[String,Number,Boolean,Object]},label:[String,Number],created:Boolean,disabled:{type:Boolean,default:!1}},setup(e){const l=(0,S.s3)("select"),t=(0,n.qj)({index:-1,groupDisabled:!1,visible:!0,hitState:!1,hover:!1}),{currentLabel:a,itemSelected:s,isDisabled:i,select:r,hoverItem:u}=y(e,t),{visible:c,hover:p}=(0,n.BK)(t),d=(0,o.FN)().proxy;function v(){!0!==e.disabled&&!0!==t.groupDisabled&&r.handleOptionSelect(d,!0)}return r.onOptionCreate(d),(0,o.Jd)((()=>{const e=d.value,{selected:l}=r,t=r.props.multiple?l:[l],n=t.some((e=>e.value===d.value));(0,o.Y3)((()=>{r.cachedOptions.get(e)!==d||n||r.cachedOptions.delete(e)})),r.onOptionDestroy(e,d)})),{ns:l,currentLabel:a,itemSelected:s,isDisabled:i,select:r,hoverItem:u,visible:c,hover:p,selectOptionClick:v,states:t}}});function O(e,l,t,n,i,r){return(0,o.wy)(((0,o.wg)(),(0,o.iD)("li",{class:(0,a.C_)([e.ns.be("dropdown","item"),e.ns.is("disabled",e.isDisabled),{selected:e.itemSelected,hover:e.hover}]),onMouseenter:l[0]||(l[0]=(...l)=>e.hoverItem&&e.hoverItem(...l)),onClick:l[1]||(l[1]=(0,s.iM)(((...l)=>e.selectOptionClick&&e.selectOptionClick(...l)),["stop"]))},[(0,o.WI)(e.$slots,"default",{},(()=>[(0,o._)("span",null,(0,a.zw)(e.currentLabel),1)]))],34)),[[s.F8,e.visible]])}var x=(0,C.Z)(w,[["render",O],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue"]]);const _=(0,o.aZ)({name:"ElSelectDropdown",componentName:"ElSelectDropdown",setup(){const e=(0,o.f3)(g),l=(0,S.s3)("select"),t=(0,o.Fl)((()=>e.props.popperClass)),a=(0,o.Fl)((()=>e.props.multiple)),s=(0,o.Fl)((()=>e.props.fitInputWidth)),r=(0,n.iH)("");function u(){var l;r.value=`${null==(l=e.selectWrapper)?void 0:l.offsetWidth}px`}return(0,o.bv)((()=>{u(),(0,i.yU7)(e.selectWrapper,u)})),{ns:l,minWidth:r,popperClass:t,isMultiple:a,isFitInputWidth:s}}});function I(e,l,t,n,s,i){return(0,o.wg)(),(0,o.iD)("div",{class:(0,a.C_)([e.ns.b("dropdown"),e.ns.is("multiple",e.isMultiple),e.popperClass]),style:(0,a.j5)({[e.isFitInputWidth?"width":"minWidth"]:e.minWidth})},[(0,o.WI)(e.$slots,"default")],6)}var k=(0,C.Z)(_,[["render",I],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue"]]),L=t(3178),M=t(6584),F=t(6250),D=t(2797),T=t(5415),P=t(3968),W=t(8415),q=t(3515),z=t(4324);const V=e=>z.V[e||"default"];var E=t(2344),B=t(5868),H=t(1092),K=t(3314);function j(e){const{t:l}=(0,D.bU)();return(0,n.qj)({options:new Map,cachedOptions:new Map,createdLabel:null,createdSelected:!1,selected:e.multiple?[]:{},inputLength:20,inputWidth:0,optionsCount:0,filteredOptionsCount:0,visible:!1,softFocus:!1,selectedLabel:"",hoverIndex:-1,query:"",previousQuery:null,inputHovering:!1,cachedPlaceHolder:"",currentPlaceholder:l("el.select.placeholder"),menuVisibleOnFocus:!1,isOnComposition:!1,isSilentBlur:!1,prefixWidth:11,tagInMultiLine:!1,mouseEnter:!1})}const A=(e,l,t)=>{const{t:s}=(0,D.bU)(),i=(0,S.s3)("select");(0,T.A)({from:"suffixTransition",replacement:"override style scheme",version:"2.3.0",scope:"props",ref:"https://element-plus.org/en-US/component/select.html#select-attributes"},(0,o.Fl)((()=>!1===e.suffixTransition)));const r=(0,n.iH)(null),u=(0,n.iH)(null),c=(0,n.iH)(null),p=(0,n.iH)(null),d=(0,n.iH)(null),v=(0,n.iH)(null),h=(0,n.iH)(-1),m=(0,n.XI)({query:""}),g=(0,n.XI)(""),b=(0,o.FN)(),y=(0,n.iH)([]);let C=0;(0,o.ic)((()=>{var e,l;const t=null==(l=null==b?void 0:(e=b.slots).default)?void 0:l.call(e)[0].children;if(t&&t.length){const e=t.filter((e=>"ElOption"===e.type.name)).map((e=>e.props.label));y.value=e}}));const{form:w,formItem:O}=(0,P.A)(),x=(0,o.Fl)((()=>!e.filterable||e.multiple||!l.visible)),_=(0,o.Fl)((()=>e.disabled||(null==w?void 0:w.disabled))),I=(0,o.Fl)((()=>{const t=e.multiple?Array.isArray(e.modelValue)&&e.modelValue.length>0:void 0!==e.modelValue&&null!==e.modelValue&&""!==e.modelValue,o=e.clearable&&!_.value&&l.inputHovering&&t;return o})),k=(0,o.Fl)((()=>e.remote&&e.filterable&&!e.remoteShowSuffix?"":e.suffixIcon)),z=(0,o.Fl)((()=>i.is("reverse",k.value&&l.visible&&e.suffixTransition))),j=(0,o.Fl)((()=>e.remote?300:0)),A=(0,o.Fl)((()=>e.loading?e.loadingText||s("el.select.loading"):(!e.remote||""!==l.query||0!==l.options.size)&&(e.filterable&&l.query&&l.options.size>0&&0===l.filteredOptionsCount?e.noMatchText||s("el.select.noMatch"):0===l.options.size?e.noDataText||s("el.select.noData"):null))),Z=(0,o.Fl)((()=>{const e=Array.from(l.options.values()),t=[];return y.value.forEach((l=>{const o=e.findIndex((e=>e.currentLabel===l));o>-1&&t.push(e[o])})),t.length?t:e})),U=(0,o.Fl)((()=>Array.from(l.cachedOptions.values()))),Y=(0,o.Fl)((()=>{const t=Z.value.filter((e=>!e.created)).some((e=>e.currentLabel===l.query));return e.filterable&&e.allowCreate&&""!==l.query&&!t})),R=(0,W.Cd)(),$=(0,o.Fl)((()=>["small"].includes(R.value)?"small":"default")),N=(0,o.Fl)({get(){return l.visible&&!1!==A.value},set(e){l.visible=e}});(0,o.YP)([()=>_.value,()=>R.value,()=>null==w?void 0:w.size],(()=>{(0,o.Y3)((()=>{Q()}))})),(0,o.YP)((()=>e.placeholder),(e=>{l.cachedPlaceHolder=l.currentPlaceholder=e})),(0,o.YP)((()=>e.modelValue),((t,o)=>{e.multiple&&(Q(),t&&t.length>0||u.value&&""!==l.query?l.currentPlaceholder="":l.currentPlaceholder=l.cachedPlaceHolder,e.filterable&&!e.reserveKeyword&&(l.query="",G(l.query))),ee(),e.filterable&&!e.multiple&&(l.inputLength=20),!(0,L.Z)(t,o)&&e.validateEvent&&(null==O||O.validate("change").catch((e=>(0,q.N)(e))))}),{flush:"post",deep:!0}),(0,o.YP)((()=>l.visible),(s=>{var i,r,p;s?(null==(r=null==(i=c.value)?void 0:i.updatePopper)||r.call(i),e.filterable&&(l.filteredOptionsCount=l.optionsCount,l.query=e.remote?"":l.selectedLabel,e.multiple?null==(p=u.value)||p.focus():l.selectedLabel&&(l.currentPlaceholder=`${l.selectedLabel}`,l.selectedLabel=""),G(l.query),e.multiple||e.remote||(m.value.query="",(0,n.oR)(m),(0,n.oR)(g)))):(e.filterable&&((0,a.mf)(e.filterMethod)&&e.filterMethod(""),(0,a.mf)(e.remoteMethod)&&e.remoteMethod("")),u.value&&u.value.blur(),l.query="",l.previousQuery=null,l.selectedLabel="",l.inputLength=20,l.menuVisibleOnFocus=!1,te(),(0,o.Y3)((()=>{u.value&&""===u.value.value&&0===l.selected.length&&(l.currentPlaceholder=l.cachedPlaceHolder)})),e.multiple||(l.selected&&(e.filterable&&e.allowCreate&&l.createdSelected&&l.createdLabel?l.selectedLabel=l.createdLabel:l.selectedLabel=l.selected.currentLabel,e.filterable&&(l.query=l.selectedLabel)),e.filterable&&(l.currentPlaceholder=l.cachedPlaceHolder))),t.emit("visible-change",s)})),(0,o.YP)((()=>l.options.entries()),(()=>{var t,o,n;if(!F.C5)return;null==(o=null==(t=c.value)?void 0:t.updatePopper)||o.call(t),e.multiple&&Q();const a=(null==(n=d.value)?void 0:n.querySelectorAll("input"))||[];Array.from(a).includes(document.activeElement)||ee(),e.defaultFirstOption&&(e.filterable||e.remote)&&l.filteredOptionsCount&&X()}),{flush:"post"}),(0,o.YP)((()=>l.hoverIndex),(e=>{(0,F.hj)(e)&&e>-1?h.value=Z.value[e]||{}:h.value={},Z.value.forEach((e=>{e.hover=h.value===e}))}));const Q=()=>{e.collapseTags&&!e.filterable||(0,o.Y3)((()=>{var e,t;if(!r.value)return;const o=r.value.$el.querySelector("input");C=C||(o.clientHeight>0?o.clientHeight+2:0);const n=p.value,a=V(R.value||(null==w?void 0:w.size)),s=a===C||C<=0?a:C,i=null===o.offsetParent;!i&&(o.style.height=(0===l.selected.length?s:Math.max(n?n.clientHeight+(n.clientHeight>s?6:0):0,s))-2+"px"),l.tagInMultiLine=Number.parseFloat(o.style.height)>=s,l.visible&&!1!==A.value&&(null==(t=null==(e=c.value)?void 0:e.updatePopper)||t.call(e))}))},G=async t=>{l.previousQuery===t||l.isOnComposition||(null!==l.previousQuery||!(0,a.mf)(e.filterMethod)&&!(0,a.mf)(e.remoteMethod)?(l.previousQuery=t,(0,o.Y3)((()=>{var e,t;l.visible&&(null==(t=null==(e=c.value)?void 0:e.updatePopper)||t.call(e))})),l.hoverIndex=-1,e.multiple&&e.filterable&&(0,o.Y3)((()=>{const t=15*u.value.value.length+20;l.inputLength=e.collapseTags?Math.min(50,t):t,J(),Q()})),e.remote&&(0,a.mf)(e.remoteMethod)?(l.hoverIndex=-1,e.remoteMethod(t)):(0,a.mf)(e.filterMethod)?(e.filterMethod(t),(0,n.oR)(g)):(l.filteredOptionsCount=l.optionsCount,m.value.query=t,(0,n.oR)(m),(0,n.oR)(g)),e.defaultFirstOption&&(e.filterable||e.remote)&&l.filteredOptionsCount&&(await(0,o.Y3)(),X())):l.previousQuery=t)},J=()=>{""!==l.currentPlaceholder&&(l.currentPlaceholder=u.value.value?"":l.cachedPlaceHolder)},X=()=>{const e=Z.value.filter((e=>e.visible&&!e.disabled&&!e.states.groupDisabled)),t=e.find((e=>e.created)),o=e[0];l.hoverIndex=ve(Z.value,t||o)},ee=()=>{var t;if(!e.multiple){const o=le(e.modelValue);return(null==(t=o.props)?void 0:t.created)?(l.createdLabel=o.props.value,l.createdSelected=!0):l.createdSelected=!1,l.selectedLabel=o.currentLabel,l.selected=o,void(e.filterable&&(l.query=l.selectedLabel))}l.selectedLabel="";const n=[];Array.isArray(e.modelValue)&&e.modelValue.forEach((e=>{n.push(le(e))})),l.selected=n,(0,o.Y3)((()=>{Q()}))},le=t=>{let o;const n="object"===(0,a.W7)(t).toLowerCase(),s="null"===(0,a.W7)(t).toLowerCase(),i="undefined"===(0,a.W7)(t).toLowerCase();for(let a=l.cachedOptions.size-1;a>=0;a--){const l=U.value[a],s=n?(0,f.Z)(l.value,e.valueKey)===(0,f.Z)(t,e.valueKey):l.value===t;if(s){o={value:t,currentLabel:l.currentLabel,isDisabled:l.isDisabled};break}}if(o)return o;const r=n?t.label:s||i?"":t,u={value:t,currentLabel:r};return e.multiple&&(u.hitState=!1),u},te=()=>{setTimeout((()=>{const t=e.valueKey;e.multiple?l.selected.length>0?l.hoverIndex=Math.min.apply(null,l.selected.map((e=>Z.value.findIndex((l=>(0,f.Z)(l,t)===(0,f.Z)(e,t)))))):l.hoverIndex=-1:l.hoverIndex=Z.value.findIndex((e=>Fe(e)===Fe(l.selected)))}),300)},oe=()=>{var l,t;ne(),null==(t=null==(l=c.value)?void 0:l.updatePopper)||t.call(l),e.multiple&&Q()},ne=()=>{var e;l.inputWidth=null==(e=r.value)?void 0:e.$el.offsetWidth},ae=()=>{e.filterable&&l.query!==l.selectedLabel&&(l.query=l.selectedLabel,G(l.query))},se=(0,M.Z)((()=>{ae()}),j.value),ie=(0,M.Z)((e=>{G(e.target.value)}),j.value),re=l=>{(0,L.Z)(e.modelValue,l)||t.emit(E.O7,l)},ue=o=>{if(o.target.value.length<=0&&!ye()){const l=e.modelValue.slice();l.pop(),t.emit(E.f_,l),re(l)}1===o.target.value.length&&0===e.modelValue.length&&(l.currentPlaceholder=l.cachedPlaceHolder)},ce=(o,n)=>{const a=l.selected.indexOf(n);if(a>-1&&!_.value){const l=e.modelValue.slice();l.splice(a,1),t.emit(E.f_,l),re(l),t.emit("remove-tag",n.value)}o.stopPropagation()},pe=o=>{o.stopPropagation();const n=e.multiple?[]:"";if(!(0,a.HD)(n))for(const e of l.selected)e.isDisabled&&n.push(e.value);t.emit(E.f_,n),re(n),l.hoverIndex=-1,l.visible=!1,t.emit("clear")},de=(n,a)=>{var s;if(e.multiple){const o=(e.modelValue||[]).slice(),a=ve(o,n.value);a>-1?o.splice(a,1):(e.multipleLimit<=0||o.length<e.multipleLimit)&&o.push(n.value),t.emit(E.f_,o),re(o),n.created&&(l.query="",G(""),l.inputLength=20),e.filterable&&(null==(s=u.value)||s.focus())}else t.emit(E.f_,n.value),re(n.value),l.visible=!1;l.isSilentBlur=a,he(),l.visible||(0,o.Y3)((()=>{fe(n)}))},ve=(l=[],t)=>{if(!(0,a.Kn)(t))return l.indexOf(t);const o=e.valueKey;let s=-1;return l.some(((e,l)=>(0,n.IU)((0,f.Z)(e,o))===(0,f.Z)(t,o)&&(s=l,!0))),s},he=()=>{l.softFocus=!0;const e=u.value||r.value;e&&(null==e||e.focus())},fe=e=>{var l,t,o,n,a;const s=Array.isArray(e)?e[0]:e;let r=null;if(null==s?void 0:s.value){const e=Z.value.filter((e=>e.value===s.value));e.length>0&&(r=e[0].$el)}if(c.value&&r){const e=null==(n=null==(o=null==(t=null==(l=c.value)?void 0:l.popperRef)?void 0:t.contentRef)?void 0:o.querySelector)?void 0:n.call(o,`.${i.be("dropdown","wrap")}`);e&&(0,B.zT)(e,r)}null==(a=v.value)||a.handleScroll()},me=e=>{l.optionsCount++,l.filteredOptionsCount++,l.options.set(e.value,e),l.cachedOptions.set(e.value,e)},ge=(e,t)=>{l.options.get(e)===t&&(l.optionsCount--,l.filteredOptionsCount--,l.options.delete(e))},be=e=>{e.code!==H.n.backspace&&ye(!1),l.inputLength=15*u.value.value.length+20,Q()},ye=e=>{if(!Array.isArray(l.selected))return;const t=l.selected[l.selected.length-1];return t?!0===e||!1===e?(t.hitState=e,e):(t.hitState=!t.hitState,t.hitState):void 0},Ce=e=>{const t=e.target.value;if("compositionend"===e.type)l.isOnComposition=!1,(0,o.Y3)((()=>G(t)));else{const e=t[t.length-1]||"";l.isOnComposition=!(0,K.w)(e)}},Se=()=>{(0,o.Y3)((()=>fe(l.selected)))},we=o=>{l.softFocus?l.softFocus=!1:((e.automaticDropdown||e.filterable)&&(e.filterable&&!l.visible&&(l.menuVisibleOnFocus=!0),l.visible=!0),t.emit("focus",o))},Oe=()=>{var e;l.visible=!1,null==(e=r.value)||e.blur()},xe=e=>{(0,o.Y3)((()=>{l.isSilentBlur?l.isSilentBlur=!1:t.emit("blur",e)})),l.softFocus=!1},_e=e=>{pe(e)},Ie=()=>{l.visible=!1},ke=e=>{l.visible&&(e.preventDefault(),e.stopPropagation(),l.visible=!1)},Le=e=>{var t;e&&!l.mouseEnter||_.value||(l.menuVisibleOnFocus?l.menuVisibleOnFocus=!1:c.value&&c.value.isFocusInsideContent()||(l.visible=!l.visible),l.visible&&(null==(t=u.value||r.value)||t.focus()))},Me=()=>{l.visible?Z.value[l.hoverIndex]&&de(Z.value[l.hoverIndex],void 0):Le()},Fe=l=>(0,a.Kn)(l.value)?(0,f.Z)(l.value,e.valueKey):l.value,De=(0,o.Fl)((()=>Z.value.filter((e=>e.visible)).every((e=>e.disabled)))),Te=e=>{if(l.visible){if(0!==l.options.size&&0!==l.filteredOptionsCount&&!l.isOnComposition&&!De.value){"next"===e?(l.hoverIndex++,l.hoverIndex===l.options.size&&(l.hoverIndex=0)):"prev"===e&&(l.hoverIndex--,l.hoverIndex<0&&(l.hoverIndex=l.options.size-1));const t=Z.value[l.hoverIndex];!0!==t.disabled&&!0!==t.states.groupDisabled&&t.visible||Te(e),(0,o.Y3)((()=>fe(h.value)))}}else l.visible=!0},Pe=()=>{l.mouseEnter=!0},We=()=>{l.mouseEnter=!1};return{optionsArray:Z,selectSize:R,handleResize:oe,debouncedOnInputChange:se,debouncedQueryChange:ie,deletePrevTag:ue,deleteTag:ce,deleteSelected:pe,handleOptionSelect:de,scrollToOption:fe,readonly:x,resetInputHeight:Q,showClose:I,iconComponent:k,iconReverse:z,showNewOption:Y,collapseTagSize:$,setSelected:ee,managePlaceholder:J,selectDisabled:_,emptyText:A,toggleLastOptionHitState:ye,resetInputState:be,handleComposition:Ce,onOptionCreate:me,onOptionDestroy:ge,handleMenuEnter:Se,handleFocus:we,blur:Oe,handleBlur:xe,handleClearClick:_e,handleClose:Ie,handleKeydownEscape:ke,toggleMenu:Le,selectOption:Me,getValueKey:Fe,navigateOptions:Te,dropMenuVisible:N,queryChange:m,groupQueryChange:g,reference:r,input:u,tooltipRef:c,tags:p,selectWrapper:d,scrollbar:v,handleMouseEnter:Pe,handleMouseLeave:We}};var Z=t(452);const U=e=>["",...z.k].includes(e);var Y=t(8969),R=t(9002),$=t(7240);const N=e=>({focus:()=>{var l,t;null==(t=null==(l=e.value)?void 0:l.focus)||t.call(l)}}),Q="ElSelect",G=(0,o.aZ)({name:Q,componentName:Q,components:{ElInput:u.EZ,ElSelectMenu:k,ElOption:x,ElTag:d.Ks,ElScrollbar:p.Mr,ElTooltip:c.Q0,ElIcon:v.gn},directives:{ClickOutside:Z.Z},props:{name:String,id:String,modelValue:{type:[Array,String,Number,Boolean,Object],default:void 0},autocomplete:{type:String,default:"off"},automaticDropdown:Boolean,size:{type:String,validator:U},effect:{type:String,default:"light"},disabled:Boolean,clearable:Boolean,filterable:Boolean,allowCreate:Boolean,loading:Boolean,popperClass:{type:String,default:""},popperOptions:{type:Object,default:()=>({})},remote:Boolean,loadingText:String,noMatchText:String,noDataText:String,remoteMethod:Function,filterMethod:Function,multiple:Boolean,multipleLimit:{type:Number,default:0},placeholder:{type:String},defaultFirstOption:Boolean,reserveKeyword:{type:Boolean,default:!0},valueKey:{type:String,default:"value"},collapseTags:Boolean,collapseTagsTooltip:{type:Boolean,default:!1},teleported:Y.s.teleported,persistent:{type:Boolean,default:!0},clearIcon:{type:R.AA,default:h.CircleClose},fitInputWidth:{type:Boolean,default:!1},suffixIcon:{type:R.AA,default:h.ArrowDown},tagType:{...$.F.type,default:"info"},validateEvent:{type:Boolean,default:!0},remoteShowSuffix:{type:Boolean,default:!1},suffixTransition:{type:Boolean,default:!0},placement:{type:String,values:r.Ct,default:"bottom-start"}},emits:[E.f_,E.O7,"remove-tag","clear","visible-change","focus","blur"],setup(e,l){const t=(0,S.s3)("select"),a=(0,S.s3)("input"),{t:s}=(0,D.bU)(),r=j(e),{optionsArray:u,selectSize:c,readonly:p,handleResize:d,collapseTagSize:v,debouncedOnInputChange:h,debouncedQueryChange:f,deletePrevTag:m,deleteTag:b,deleteSelected:y,handleOptionSelect:C,scrollToOption:w,setSelected:O,resetInputHeight:x,managePlaceholder:_,showClose:I,selectDisabled:k,iconComponent:L,iconReverse:M,showNewOption:F,emptyText:T,toggleLastOptionHitState:P,resetInputState:W,handleComposition:q,onOptionCreate:z,onOptionDestroy:V,handleMenuEnter:B,handleFocus:H,blur:K,handleBlur:Z,handleClearClick:U,handleClose:Y,handleKeydownEscape:R,toggleMenu:$,selectOption:Q,getValueKey:G,navigateOptions:J,dropMenuVisible:X,reference:ee,input:le,tooltipRef:te,tags:oe,selectWrapper:ne,scrollbar:ae,queryChange:se,groupQueryChange:ie,handleMouseEnter:re,handleMouseLeave:ue}=A(e,r,l),{focus:ce}=N(ee),{inputWidth:pe,selected:de,inputLength:ve,filteredOptionsCount:he,visible:fe,softFocus:me,selectedLabel:ge,hoverIndex:be,query:ye,inputHovering:Ce,currentPlaceholder:Se,menuVisibleOnFocus:we,isOnComposition:Oe,isSilentBlur:xe,options:_e,cachedOptions:Ie,optionsCount:ke,prefixWidth:Le,tagInMultiLine:Me}=(0,n.BK)(r),Fe=(0,o.Fl)((()=>{const l=[t.b()],o=(0,n.SU)(c);return o&&l.push(t.m(o)),e.disabled&&l.push(t.m("disabled")),l})),De=(0,o.Fl)((()=>({maxWidth:(0,n.SU)(pe)-32+"px",width:"100%"}))),Te=(0,o.Fl)((()=>{const e=(0,n.SU)(pe)>123?(0,n.SU)(pe)-123:(0,n.SU)(pe)-75;return{maxWidth:`${e}px`}}));(0,o.JJ)(g,(0,n.qj)({props:e,options:_e,optionsArray:u,cachedOptions:Ie,optionsCount:ke,filteredOptionsCount:he,hoverIndex:be,handleOptionSelect:C,onOptionCreate:z,onOptionDestroy:V,selectWrapper:ne,selected:de,setSelected:O,queryChange:se,groupQueryChange:ie})),(0,o.bv)((()=>{r.cachedPlaceHolder=Se.value=e.placeholder||(()=>s("el.select.placeholder")),e.multiple&&Array.isArray(e.modelValue)&&e.modelValue.length>0&&(Se.value=""),(0,i.yU7)(ne,d),e.remote&&e.multiple&&x(),(0,o.Y3)((()=>{const e=ee.value&&ee.value.$el;if(e&&(pe.value=e.getBoundingClientRect().width,l.slots.prefix)){const l=e.querySelector(`.${a.e("prefix")}`);Le.value=Math.max(l.getBoundingClientRect().width+5,30)}})),O()})),e.multiple&&!Array.isArray(e.modelValue)&&l.emit(E.f_,[]),!e.multiple&&Array.isArray(e.modelValue)&&l.emit(E.f_,"");const Pe=(0,o.Fl)((()=>{var e,l;return null==(l=null==(e=te.value)?void 0:e.popperRef)?void 0:l.contentRef}));return{tagInMultiLine:Me,prefixWidth:Le,selectSize:c,readonly:p,handleResize:d,collapseTagSize:v,debouncedOnInputChange:h,debouncedQueryChange:f,deletePrevTag:m,deleteTag:b,deleteSelected:y,handleOptionSelect:C,scrollToOption:w,inputWidth:pe,selected:de,inputLength:ve,filteredOptionsCount:he,visible:fe,softFocus:me,selectedLabel:ge,hoverIndex:be,query:ye,inputHovering:Ce,currentPlaceholder:Se,menuVisibleOnFocus:we,isOnComposition:Oe,isSilentBlur:xe,options:_e,resetInputHeight:x,managePlaceholder:_,showClose:I,selectDisabled:k,iconComponent:L,iconReverse:M,showNewOption:F,emptyText:T,toggleLastOptionHitState:P,resetInputState:W,handleComposition:q,handleMenuEnter:B,handleFocus:H,blur:K,handleBlur:Z,handleClearClick:U,handleClose:Y,handleKeydownEscape:R,toggleMenu:$,selectOption:Q,getValueKey:G,navigateOptions:J,dropMenuVisible:X,focus:ce,reference:ee,input:le,tooltipRef:te,popperPaneRef:Pe,tags:oe,selectWrapper:ne,scrollbar:ae,wrapperKls:Fe,selectTagsStyle:De,nsSelect:t,tagTextStyle:Te,handleMouseEnter:re,handleMouseLeave:ue}}}),J=["disabled","autocomplete"],X={style:{height:"100%",display:"flex","justify-content":"center","align-items":"center"}};function ee(e,l,t,n,i,r){const u=(0,o.up)("el-tag"),c=(0,o.up)("el-tooltip"),p=(0,o.up)("el-icon"),d=(0,o.up)("el-input"),v=(0,o.up)("el-option"),h=(0,o.up)("el-scrollbar"),f=(0,o.up)("el-select-menu"),m=(0,o.Q2)("click-outside");return(0,o.wy)(((0,o.wg)(),(0,o.iD)("div",{ref:"selectWrapper",class:(0,a.C_)(e.wrapperKls),onMouseenter:l[22]||(l[22]=(...l)=>e.handleMouseEnter&&e.handleMouseEnter(...l)),onMouseleave:l[23]||(l[23]=(...l)=>e.handleMouseLeave&&e.handleMouseLeave(...l)),onClick:l[24]||(l[24]=(0,s.iM)(((...l)=>e.toggleMenu&&e.toggleMenu(...l)),["stop"]))},[(0,o.Wm)(c,{ref:"tooltipRef",visible:e.dropMenuVisible,placement:e.placement,teleported:e.teleported,"popper-class":[e.nsSelect.e("popper"),e.popperClass],"popper-options":e.popperOptions,"fallback-placements":["bottom-start","top-start","right","left"],effect:e.effect,pure:"",trigger:"click",transition:`${e.nsSelect.namespace.value}-zoom-in-top`,"stop-popper-mouse-event":!1,"gpu-acceleration":!1,persistent:e.persistent,onShow:e.handleMenuEnter},{default:(0,o.w5)((()=>[(0,o._)("div",{class:"select-trigger",onMouseenter:l[20]||(l[20]=l=>e.inputHovering=!0),onMouseleave:l[21]||(l[21]=l=>e.inputHovering=!1)},[e.multiple?((0,o.wg)(),(0,o.iD)("div",{key:0,ref:"tags",class:(0,a.C_)(e.nsSelect.e("tags")),style:(0,a.j5)(e.selectTagsStyle)},[e.collapseTags&&e.selected.length?((0,o.wg)(),(0,o.iD)("span",{key:0,class:(0,a.C_)([e.nsSelect.b("tags-wrapper"),{"has-prefix":e.prefixWidth&&e.selected.length}])},[(0,o.Wm)(u,{closable:!e.selectDisabled&&!e.selected[0].isDisabled,size:e.collapseTagSize,hit:e.selected[0].hitState,type:e.tagType,"disable-transitions":"",onClose:l[0]||(l[0]=l=>e.deleteTag(l,e.selected[0]))},{default:(0,o.w5)((()=>[(0,o._)("span",{class:(0,a.C_)(e.nsSelect.e("tags-text")),style:(0,a.j5)(e.tagTextStyle)},(0,a.zw)(e.selected[0].currentLabel),7)])),_:1},8,["closable","size","hit","type"]),e.selected.length>1?((0,o.wg)(),(0,o.j4)(u,{key:0,closable:!1,size:e.collapseTagSize,type:e.tagType,"disable-transitions":""},{default:(0,o.w5)((()=>[e.collapseTagsTooltip?((0,o.wg)(),(0,o.j4)(c,{key:0,disabled:e.dropMenuVisible,"fallback-placements":["bottom","top","right","left"],effect:e.effect,placement:"bottom",teleported:e.teleported},{default:(0,o.w5)((()=>[(0,o._)("span",{class:(0,a.C_)(e.nsSelect.e("tags-text"))},"+ "+(0,a.zw)(e.selected.length-1),3)])),content:(0,o.w5)((()=>[(0,o._)("div",{class:(0,a.C_)(e.nsSelect.e("collapse-tags"))},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.selected.slice(1),((l,t)=>((0,o.wg)(),(0,o.iD)("div",{key:t,class:(0,a.C_)(e.nsSelect.e("collapse-tag"))},[((0,o.wg)(),(0,o.j4)(u,{key:e.getValueKey(l),class:"in-tooltip",closable:!e.selectDisabled&&!l.isDisabled,size:e.collapseTagSize,hit:l.hitState,type:e.tagType,"disable-transitions":"",style:{margin:"2px"},onClose:t=>e.deleteTag(t,l)},{default:(0,o.w5)((()=>[(0,o._)("span",{class:(0,a.C_)(e.nsSelect.e("tags-text")),style:(0,a.j5)({maxWidth:e.inputWidth-75+"px"})},(0,a.zw)(l.currentLabel),7)])),_:2},1032,["closable","size","hit","type","onClose"]))],2)))),128))],2)])),_:1},8,["disabled","effect","teleported"])):((0,o.wg)(),(0,o.iD)("span",{key:1,class:(0,a.C_)(e.nsSelect.e("tags-text"))},"+ "+(0,a.zw)(e.selected.length-1),3))])),_:1},8,["size","type"])):(0,o.kq)("v-if",!0)],2)):(0,o.kq)("v-if",!0),(0,o.kq)(" <div> "),e.collapseTags?(0,o.kq)("v-if",!0):((0,o.wg)(),(0,o.j4)(s.uT,{key:1,onAfterLeave:e.resetInputHeight},{default:(0,o.w5)((()=>[(0,o._)("span",{class:(0,a.C_)([e.nsSelect.b("tags-wrapper"),{"has-prefix":e.prefixWidth&&e.selected.length}])},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.selected,(l=>((0,o.wg)(),(0,o.j4)(u,{key:e.getValueKey(l),closable:!e.selectDisabled&&!l.isDisabled,size:e.collapseTagSize,hit:l.hitState,type:e.tagType,"disable-transitions":"",onClose:t=>e.deleteTag(t,l)},{default:(0,o.w5)((()=>[(0,o._)("span",{class:(0,a.C_)(e.nsSelect.e("tags-text")),style:(0,a.j5)({maxWidth:e.inputWidth-75+"px"})},(0,a.zw)(l.currentLabel),7)])),_:2},1032,["closable","size","hit","type","onClose"])))),128))],2)])),_:1},8,["onAfterLeave"])),(0,o.kq)(" </div> "),e.filterable?(0,o.wy)(((0,o.wg)(),(0,o.iD)("input",{key:2,ref:"input","onUpdate:modelValue":l[1]||(l[1]=l=>e.query=l),type:"text",class:(0,a.C_)([e.nsSelect.e("input"),e.nsSelect.is(e.selectSize)]),disabled:e.selectDisabled,autocomplete:e.autocomplete,style:(0,a.j5)({marginLeft:e.prefixWidth&&!e.selected.length||e.tagInMultiLine?`${e.prefixWidth}px`:"",flexGrow:1,width:e.inputLength/(e.inputWidth-32)+"%",maxWidth:e.inputWidth-42+"px"}),onFocus:l[2]||(l[2]=(...l)=>e.handleFocus&&e.handleFocus(...l)),onBlur:l[3]||(l[3]=(...l)=>e.handleBlur&&e.handleBlur(...l)),onKeyup:l[4]||(l[4]=(...l)=>e.managePlaceholder&&e.managePlaceholder(...l)),onKeydown:[l[5]||(l[5]=(...l)=>e.resetInputState&&e.resetInputState(...l)),l[6]||(l[6]=(0,s.D2)((0,s.iM)((l=>e.navigateOptions("next")),["prevent"]),["down"])),l[7]||(l[7]=(0,s.D2)((0,s.iM)((l=>e.navigateOptions("prev")),["prevent"]),["up"])),l[8]||(l[8]=(0,s.D2)(((...l)=>e.handleKeydownEscape&&e.handleKeydownEscape(...l)),["esc"])),l[9]||(l[9]=(0,s.D2)((0,s.iM)(((...l)=>e.selectOption&&e.selectOption(...l)),["stop","prevent"]),["enter"])),l[10]||(l[10]=(0,s.D2)(((...l)=>e.deletePrevTag&&e.deletePrevTag(...l)),["delete"])),l[11]||(l[11]=(0,s.D2)((l=>e.visible=!1),["tab"]))],onCompositionstart:l[12]||(l[12]=(...l)=>e.handleComposition&&e.handleComposition(...l)),onCompositionupdate:l[13]||(l[13]=(...l)=>e.handleComposition&&e.handleComposition(...l)),onCompositionend:l[14]||(l[14]=(...l)=>e.handleComposition&&e.handleComposition(...l)),onInput:l[15]||(l[15]=(...l)=>e.debouncedQueryChange&&e.debouncedQueryChange(...l))},null,46,J)),[[s.nr,e.query]]):(0,o.kq)("v-if",!0)],6)):(0,o.kq)("v-if",!0),(0,o.Wm)(d,{id:e.id,ref:"reference",modelValue:e.selectedLabel,"onUpdate:modelValue":l[16]||(l[16]=l=>e.selectedLabel=l),type:"text",placeholder:"function"===typeof e.currentPlaceholder?e.currentPlaceholder():e.currentPlaceholder,name:e.name,autocomplete:e.autocomplete,size:e.selectSize,disabled:e.selectDisabled,readonly:e.readonly,"validate-event":!1,class:(0,a.C_)([e.nsSelect.is("focus",e.visible)]),tabindex:e.multiple&&e.filterable?-1:void 0,onFocus:e.handleFocus,onBlur:e.handleBlur,onInput:e.debouncedOnInputChange,onPaste:e.debouncedOnInputChange,onCompositionstart:e.handleComposition,onCompositionupdate:e.handleComposition,onCompositionend:e.handleComposition,onKeydown:[l[17]||(l[17]=(0,s.D2)((0,s.iM)((l=>e.navigateOptions("next")),["stop","prevent"]),["down"])),l[18]||(l[18]=(0,s.D2)((0,s.iM)((l=>e.navigateOptions("prev")),["stop","prevent"]),["up"])),(0,s.D2)((0,s.iM)(e.selectOption,["stop","prevent"]),["enter"]),(0,s.D2)(e.handleKeydownEscape,["esc"]),l[19]||(l[19]=(0,s.D2)((l=>e.visible=!1),["tab"]))]},(0,o.Nv)({suffix:(0,o.w5)((()=>[e.iconComponent&&!e.showClose?((0,o.wg)(),(0,o.j4)(p,{key:0,class:(0,a.C_)([e.nsSelect.e("caret"),e.nsSelect.e("icon"),e.iconReverse])},{default:(0,o.w5)((()=>[((0,o.wg)(),(0,o.j4)((0,o.LL)(e.iconComponent)))])),_:1},8,["class"])):(0,o.kq)("v-if",!0),e.showClose&&e.clearIcon?((0,o.wg)(),(0,o.j4)(p,{key:1,class:(0,a.C_)([e.nsSelect.e("caret"),e.nsSelect.e("icon")]),onClick:e.handleClearClick},{default:(0,o.w5)((()=>[((0,o.wg)(),(0,o.j4)((0,o.LL)(e.clearIcon)))])),_:1},8,["class","onClick"])):(0,o.kq)("v-if",!0)])),_:2},[e.$slots.prefix?{name:"prefix",fn:(0,o.w5)((()=>[(0,o._)("div",X,[(0,o.WI)(e.$slots,"prefix")])]))}:void 0]),1032,["id","modelValue","placeholder","name","autocomplete","size","disabled","readonly","class","tabindex","onFocus","onBlur","onInput","onPaste","onCompositionstart","onCompositionupdate","onCompositionend","onKeydown"])],32)])),content:(0,o.w5)((()=>[(0,o.Wm)(f,null,{default:(0,o.w5)((()=>[(0,o.wy)((0,o.Wm)(h,{ref:"scrollbar",tag:"ul","wrap-class":e.nsSelect.be("dropdown","wrap"),"view-class":e.nsSelect.be("dropdown","list"),class:(0,a.C_)([e.nsSelect.is("empty",!e.allowCreate&&Boolean(e.query)&&0===e.filteredOptionsCount)])},{default:(0,o.w5)((()=>[e.showNewOption?((0,o.wg)(),(0,o.j4)(v,{key:0,value:e.query,created:!0},null,8,["value"])):(0,o.kq)("v-if",!0),(0,o.WI)(e.$slots,"default")])),_:3},8,["wrap-class","view-class","class"]),[[s.F8,e.options.size>0&&!e.loading]]),e.emptyText&&(!e.allowCreate||e.loading||e.allowCreate&&0===e.options.size)?((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[e.$slots.empty?(0,o.WI)(e.$slots,"empty",{key:0}):((0,o.wg)(),(0,o.iD)("p",{key:1,class:(0,a.C_)(e.nsSelect.be("dropdown","empty"))},(0,a.zw)(e.emptyText),3))],64)):(0,o.kq)("v-if",!0)])),_:3})])),_:3},8,["visible","placement","teleported","popper-class","popper-options","effect","transition","persistent","onShow"])],34)),[[m,e.handleClose,e.popperPaneRef]])}var le=(0,C.Z)(G,[["render",ee],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue"]]);const te=(0,o.aZ)({name:"ElOptionGroup",componentName:"ElOptionGroup",props:{label:String,disabled:{type:Boolean,default:!1}},setup(e){const l=(0,S.s3)("select"),t=(0,n.iH)(!0),a=(0,o.FN)(),s=(0,n.iH)([]);(0,o.JJ)(m,(0,n.qj)({...(0,n.BK)(e)}));const i=(0,o.f3)(g);(0,o.bv)((()=>{s.value=r(a.subTree)}));const r=e=>{const l=[];return Array.isArray(e.children)&&e.children.forEach((e=>{var t;e.type&&"ElOption"===e.type.name&&e.component&&e.component.proxy?l.push(e.component.proxy):(null==(t=e.children)?void 0:t.length)&&l.push(...r(e))})),l},{groupQueryChange:u}=(0,n.IU)(i);return(0,o.YP)(u,(()=>{t.value=s.value.some((e=>!0===e.visible))}),{flush:"post"}),{visible:t,ns:l}}});function oe(e,l,t,n,i,r){return(0,o.wy)(((0,o.wg)(),(0,o.iD)("ul",{class:(0,a.C_)(e.ns.be("group","wrap"))},[(0,o._)("li",{class:(0,a.C_)(e.ns.be("group","title"))},(0,a.zw)(e.label),3),(0,o._)("li",null,[(0,o._)("ul",{class:(0,a.C_)(e.ns.b("group"))},[(0,o.WI)(e.$slots,"default")],2)])],2)),[[s.F8,e.visible]])}var ne=(0,C.Z)(te,[["render",oe],["__file","/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue"]]),ae=t(5482);const se=(0,ae.nz)(le,{Option:x,OptionGroup:ne}),ie=(0,ae.dp)(x);(0,ae.dp)(ne);t(3450),t(8548),t(8843),t(5277),t(9491);var re=t(1214);const ue=e=>((0,o.dD)("data-v-10a8e556"),e=e(),(0,o.Cn)(),e),ce={class:"back"},pe=ue((()=>(0,o._)("h2",null,"基本设置",-1))),de={class:"firstSearch"},ve=ue((()=>(0,o._)("span",null,"搜索首选设置",-1)));var he=(0,o.aZ)({__name:"basic",setup(e){const l=(0,n.iH)(""),t=[{value:"单曲",label:"单曲"},{value:"专辑",label:"专辑"},{value:"歌单",label:"歌单"},{value:"用户",label:"用户"},{value:"MV",label:"MV"},{value:"歌词",label:"歌词"},{value:"电台",label:"电台"},{value:"视频",label:"视频"},{value:"综合",label:"综合"},{value:"声音",label:"声音"}],a=()=>{re.Z.setItem("firstSearch",l.value)};return(e,s)=>{const i=ie,r=se;return(0,o.wg)(),(0,o.iD)("div",ce,[pe,(0,o._)("div",de,[ve,(0,o.Wm)(r,{modelValue:l.value,"onUpdate:modelValue":s[0]||(s[0]=e=>l.value=e),placeholder:(0,n.SU)(re.Z).getItem("firstSearch"),onChange:a},{default:(0,o.w5)((()=>[((0,o.wg)(),(0,o.iD)(o.HY,null,(0,o.Ko)(t,(e=>(0,o.Wm)(i,{key:e.value,label:e.label,value:e.value,disabled:(0,n.SU)(re.Z).getItem("firstSearch")===e.value},null,8,["label","value","disabled"]))),64))])),_:1},8,["modelValue","placeholder"])])])}}}),fe=t(465);const me=(0,fe.Z)(he,[["__scopeId","data-v-10a8e556"]]);var ge=me},2516:function(e,l,t){t.d(l,{Ks:function(){return g}});var o=t(440),n=t(8643),a=t(4367),s=t(4592),i=t(4704),r=t(6037),u=t(7240),c=t(7922),p=t(8415),d=t(6086);const v=(0,o.aZ)({name:"ElTag"}),h=(0,o.aZ)({...v,props:u.F,emits:u.g,setup(e,{emit:l}){const t=e,u=(0,p.Cd)(),c=(0,d.s3)("tag"),v=(0,o.Fl)((()=>{const{type:e,hit:l,effect:o,closable:n,round:a}=t;return[c.b(),c.is("closable",n),c.m(e),c.m(u.value),c.m(o),c.is("hit",l),c.is("round",a)]})),h=e=>{l("close",e)},f=e=>{l("click",e)};return(e,l)=>e.disableTransitions?((0,o.wg)(),(0,o.iD)("span",{key:0,class:(0,n.C_)((0,a.SU)(v)),style:(0,n.j5)({backgroundColor:e.color}),onClick:f},[(0,o._)("span",{class:(0,n.C_)((0,a.SU)(c).e("content"))},[(0,o.WI)(e.$slots,"default")],2),e.closable?((0,o.wg)(),(0,o.j4)((0,a.SU)(i.gn),{key:0,class:(0,n.C_)((0,a.SU)(c).e("close")),onClick:(0,s.iM)(h,["stop"])},{default:(0,o.w5)((()=>[(0,o.Wm)((0,a.SU)(r.Close))])),_:1},8,["class","onClick"])):(0,o.kq)("v-if",!0)],6)):((0,o.wg)(),(0,o.j4)(s.uT,{key:1,name:`${(0,a.SU)(c).namespace.value}-zoom-in-center`,appear:""},{default:(0,o.w5)((()=>[(0,o._)("span",{class:(0,n.C_)((0,a.SU)(v)),style:(0,n.j5)({backgroundColor:e.color}),onClick:f},[(0,o._)("span",{class:(0,n.C_)((0,a.SU)(c).e("content"))},[(0,o.WI)(e.$slots,"default")],2),e.closable?((0,o.wg)(),(0,o.j4)((0,a.SU)(i.gn),{key:0,class:(0,n.C_)((0,a.SU)(c).e("close")),onClick:(0,s.iM)(h,["stop"])},{default:(0,o.w5)((()=>[(0,o.Wm)((0,a.SU)(r.Close))])),_:1},8,["class","onClick"])):(0,o.kq)("v-if",!0)],6)])),_:3},8,["name"]))}});var f=(0,c.Z)(h,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]),m=t(5482);const g=(0,m.nz)(f)},7240:function(e,l,t){t.d(l,{F:function(){return a},g:function(){return s}});var o=t(1879),n=t(4324);const a=(0,o.o8)({closable:Boolean,type:{type:String,values:["success","info","warning","danger",""],default:""},hit:Boolean,disableTransitions:Boolean,color:{type:String,default:""},size:{type:String,values:n.k,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),s={close:e=>e instanceof MouseEvent,click:e=>e instanceof MouseEvent}}}]);