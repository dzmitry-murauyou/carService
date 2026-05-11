function tf(e,t){for(var r=0;r<t.length;r++){const n=t[r];if(typeof n!="string"&&!Array.isArray(n)){for(const a in n)if(a!=="default"&&!(a in e)){const l=Object.getOwnPropertyDescriptor(n,a);l&&Object.defineProperty(e,a,l.get?l:{enumerable:!0,get:()=>n[a]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(a){if(a.ep)return;a.ep=!0;const l=r(a);fetch(a.href,l)}})();function rf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var bc={exports:{}},tl={},wc={exports:{}},J={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kn=Symbol.for("react.element"),nf=Symbol.for("react.portal"),af=Symbol.for("react.fragment"),lf=Symbol.for("react.strict_mode"),of=Symbol.for("react.profiler"),sf=Symbol.for("react.provider"),cf=Symbol.for("react.context"),uf=Symbol.for("react.forward_ref"),df=Symbol.for("react.suspense"),ff=Symbol.for("react.memo"),pf=Symbol.for("react.lazy"),rs=Symbol.iterator;function mf(e){return e===null||typeof e!="object"?null:(e=rs&&e[rs]||e["@@iterator"],typeof e=="function"?e:null)}var kc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Nc=Object.assign,jc={};function Gr(e,t,r){this.props=e,this.context=t,this.refs=jc,this.updater=r||kc}Gr.prototype.isReactComponent={};Gr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Gr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Sc(){}Sc.prototype=Gr.prototype;function Yi(e,t,r){this.props=e,this.context=t,this.refs=jc,this.updater=r||kc}var qi=Yi.prototype=new Sc;qi.constructor=Yi;Nc(qi,Gr.prototype);qi.isPureReactComponent=!0;var ns=Array.isArray,Cc=Object.prototype.hasOwnProperty,Ji={current:null},Ec={key:!0,ref:!0,__self:!0,__source:!0};function Pc(e,t,r){var n,a={},l=null,o=null;if(t!=null)for(n in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(l=""+t.key),t)Cc.call(t,n)&&!Ec.hasOwnProperty(n)&&(a[n]=t[n]);var c=arguments.length-2;if(c===1)a.children=r;else if(1<c){for(var s=Array(c),d=0;d<c;d++)s[d]=arguments[d+2];a.children=s}if(e&&e.defaultProps)for(n in c=e.defaultProps,c)a[n]===void 0&&(a[n]=c[n]);return{$$typeof:Kn,type:e,key:l,ref:o,props:a,_owner:Ji.current}}function hf(e,t){return{$$typeof:Kn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Zi(e){return typeof e=="object"&&e!==null&&e.$$typeof===Kn}function gf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var as=/\/+/g;function wl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?gf(""+e.key):t.toString(36)}function va(e,t,r,n,a){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Kn:case nf:o=!0}}if(o)return o=e,a=a(o),e=n===""?"."+wl(o,0):n,ns(a)?(r="",e!=null&&(r=e.replace(as,"$&/")+"/"),va(a,t,r,"",function(d){return d})):a!=null&&(Zi(a)&&(a=hf(a,r+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(as,"$&/")+"/")+e)),t.push(a)),1;if(o=0,n=n===""?".":n+":",ns(e))for(var c=0;c<e.length;c++){l=e[c];var s=n+wl(l,c);o+=va(l,t,r,s,a)}else if(s=mf(e),typeof s=="function")for(e=s.call(e),c=0;!(l=e.next()).done;)l=l.value,s=n+wl(l,c++),o+=va(l,t,r,s,a);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Zn(e,t,r){if(e==null)return e;var n=[],a=0;return va(e,n,"","",function(l){return t.call(r,l,a++)}),n}function vf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Fe={current:null},xa={transition:null},xf={ReactCurrentDispatcher:Fe,ReactCurrentBatchConfig:xa,ReactCurrentOwner:Ji};function zc(){throw Error("act(...) is not supported in production builds of React.")}J.Children={map:Zn,forEach:function(e,t,r){Zn(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return Zn(e,function(){t++}),t},toArray:function(e){return Zn(e,function(t){return t})||[]},only:function(e){if(!Zi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};J.Component=Gr;J.Fragment=af;J.Profiler=of;J.PureComponent=Yi;J.StrictMode=lf;J.Suspense=df;J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xf;J.act=zc;J.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=Nc({},e.props),a=e.key,l=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,o=Ji.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(s in t)Cc.call(t,s)&&!Ec.hasOwnProperty(s)&&(n[s]=t[s]===void 0&&c!==void 0?c[s]:t[s])}var s=arguments.length-2;if(s===1)n.children=r;else if(1<s){c=Array(s);for(var d=0;d<s;d++)c[d]=arguments[d+2];n.children=c}return{$$typeof:Kn,type:e.type,key:a,ref:l,props:n,_owner:o}};J.createContext=function(e){return e={$$typeof:cf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:sf,_context:e},e.Consumer=e};J.createElement=Pc;J.createFactory=function(e){var t=Pc.bind(null,e);return t.type=e,t};J.createRef=function(){return{current:null}};J.forwardRef=function(e){return{$$typeof:uf,render:e}};J.isValidElement=Zi;J.lazy=function(e){return{$$typeof:pf,_payload:{_status:-1,_result:e},_init:vf}};J.memo=function(e,t){return{$$typeof:ff,type:e,compare:t===void 0?null:t}};J.startTransition=function(e){var t=xa.transition;xa.transition={};try{e()}finally{xa.transition=t}};J.unstable_act=zc;J.useCallback=function(e,t){return Fe.current.useCallback(e,t)};J.useContext=function(e){return Fe.current.useContext(e)};J.useDebugValue=function(){};J.useDeferredValue=function(e){return Fe.current.useDeferredValue(e)};J.useEffect=function(e,t){return Fe.current.useEffect(e,t)};J.useId=function(){return Fe.current.useId()};J.useImperativeHandle=function(e,t,r){return Fe.current.useImperativeHandle(e,t,r)};J.useInsertionEffect=function(e,t){return Fe.current.useInsertionEffect(e,t)};J.useLayoutEffect=function(e,t){return Fe.current.useLayoutEffect(e,t)};J.useMemo=function(e,t){return Fe.current.useMemo(e,t)};J.useReducer=function(e,t,r){return Fe.current.useReducer(e,t,r)};J.useRef=function(e){return Fe.current.useRef(e)};J.useState=function(e){return Fe.current.useState(e)};J.useSyncExternalStore=function(e,t,r){return Fe.current.useSyncExternalStore(e,t,r)};J.useTransition=function(){return Fe.current.useTransition()};J.version="18.3.1";wc.exports=J;var x=wc.exports;const _c=rf(x),yf=tf({__proto__:null,default:_c},[x]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bf=x,wf=Symbol.for("react.element"),kf=Symbol.for("react.fragment"),Nf=Object.prototype.hasOwnProperty,jf=bf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Sf={key:!0,ref:!0,__self:!0,__source:!0};function Lc(e,t,r){var n,a={},l=null,o=null;r!==void 0&&(l=""+r),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(o=t.ref);for(n in t)Nf.call(t,n)&&!Sf.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)a[n]===void 0&&(a[n]=t[n]);return{$$typeof:wf,type:e,key:l,ref:o,props:a,_owner:jf.current}}tl.Fragment=kf;tl.jsx=Lc;tl.jsxs=Lc;bc.exports=tl;var i=bc.exports,Ic={exports:{}},Ye={},Tc={exports:{}},Rc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(M,$){var U=M.length;M.push($);e:for(;0<U;){var Q=U-1>>>1,Z=M[Q];if(0<a(Z,$))M[Q]=$,M[U]=Z,U=Q;else break e}}function r(M){return M.length===0?null:M[0]}function n(M){if(M.length===0)return null;var $=M[0],U=M.pop();if(U!==$){M[0]=U;e:for(var Q=0,Z=M.length,me=Z>>>1;Q<me;){var xe=2*(Q+1)-1,w=M[xe],z=xe+1,V=M[z];if(0>a(w,U))z<Z&&0>a(V,w)?(M[Q]=V,M[z]=U,Q=z):(M[Q]=w,M[xe]=U,Q=xe);else if(z<Z&&0>a(V,U))M[Q]=V,M[z]=U,Q=z;else break e}}return $}function a(M,$){var U=M.sortIndex-$.sortIndex;return U!==0?U:M.id-$.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var o=Date,c=o.now();e.unstable_now=function(){return o.now()-c}}var s=[],d=[],v=1,p=null,m=3,j=!1,y=!1,S=!1,N=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(M){for(var $=r(d);$!==null;){if($.callback===null)n(d);else if($.startTime<=M)n(d),$.sortIndex=$.expirationTime,t(s,$);else break;$=r(d)}}function b(M){if(S=!1,h(M),!y)if(r(s)!==null)y=!0,ke(P);else{var $=r(d);$!==null&&ve(b,$.startTime-M)}}function P(M,$){y=!1,S&&(S=!1,f(R),R=-1),j=!0;var U=m;try{for(h($),p=r(s);p!==null&&(!(p.expirationTime>$)||M&&!G());){var Q=p.callback;if(typeof Q=="function"){p.callback=null,m=p.priorityLevel;var Z=Q(p.expirationTime<=$);$=e.unstable_now(),typeof Z=="function"?p.callback=Z:p===r(s)&&n(s),h($)}else n(s);p=r(s)}if(p!==null)var me=!0;else{var xe=r(d);xe!==null&&ve(b,xe.startTime-$),me=!1}return me}finally{p=null,m=U,j=!1}}var _=!1,D=null,R=-1,B=5,I=-1;function G(){return!(e.unstable_now()-I<B)}function Y(){if(D!==null){var M=e.unstable_now();I=M;var $=!0;try{$=D(!0,M)}finally{$?ge():(_=!1,D=null)}}else _=!1}var ge;if(typeof u=="function")ge=function(){u(Y)};else if(typeof MessageChannel<"u"){var ae=new MessageChannel,we=ae.port2;ae.port1.onmessage=Y,ge=function(){we.postMessage(null)}}else ge=function(){N(Y,0)};function ke(M){D=M,_||(_=!0,ge())}function ve(M,$){R=N(function(){M(e.unstable_now())},$)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(M){M.callback=null},e.unstable_continueExecution=function(){y||j||(y=!0,ke(P))},e.unstable_forceFrameRate=function(M){0>M||125<M?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<M?Math.floor(1e3/M):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return r(s)},e.unstable_next=function(M){switch(m){case 1:case 2:case 3:var $=3;break;default:$=m}var U=m;m=$;try{return M()}finally{m=U}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(M,$){switch(M){case 1:case 2:case 3:case 4:case 5:break;default:M=3}var U=m;m=M;try{return $()}finally{m=U}},e.unstable_scheduleCallback=function(M,$,U){var Q=e.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?Q+U:Q):U=Q,M){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=U+Z,M={id:v++,callback:$,priorityLevel:M,startTime:U,expirationTime:Z,sortIndex:-1},U>Q?(M.sortIndex=U,t(d,M),r(s)===null&&M===r(d)&&(S?(f(R),R=-1):S=!0,ve(b,U-Q))):(M.sortIndex=Z,t(s,M),y||j||(y=!0,ke(P))),M},e.unstable_shouldYield=G,e.unstable_wrapCallback=function(M){var $=m;return function(){var U=m;m=$;try{return M.apply(this,arguments)}finally{m=U}}}})(Rc);Tc.exports=Rc;var Cf=Tc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ef=x,Ge=Cf;function T(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Dc=new Set,Pn={};function mr(e,t){Ur(e,t),Ur(e+"Capture",t)}function Ur(e,t){for(Pn[e]=t,e=0;e<t.length;e++)Dc.add(t[e])}var St=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ei=Object.prototype.hasOwnProperty,Pf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ls={},is={};function zf(e){return ei.call(is,e)?!0:ei.call(ls,e)?!1:Pf.test(e)?is[e]=!0:(ls[e]=!0,!1)}function _f(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Lf(e,t,r,n){if(t===null||typeof t>"u"||_f(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function $e(e,t,r,n,a,l,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=a,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=o}var _e={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){_e[e]=new $e(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];_e[t]=new $e(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){_e[e]=new $e(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){_e[e]=new $e(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){_e[e]=new $e(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){_e[e]=new $e(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){_e[e]=new $e(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){_e[e]=new $e(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){_e[e]=new $e(e,5,!1,e.toLowerCase(),null,!1,!1)});var eo=/[\-:]([a-z])/g;function to(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(eo,to);_e[t]=new $e(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(eo,to);_e[t]=new $e(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(eo,to);_e[t]=new $e(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){_e[e]=new $e(e,1,!1,e.toLowerCase(),null,!1,!1)});_e.xlinkHref=new $e("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){_e[e]=new $e(e,1,!1,e.toLowerCase(),null,!0,!0)});function ro(e,t,r,n){var a=_e.hasOwnProperty(t)?_e[t]:null;(a!==null?a.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Lf(t,r,a,n)&&(r=null),n||a===null?zf(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):a.mustUseProperty?e[a.propertyName]=r===null?a.type===3?!1:"":r:(t=a.attributeName,n=a.attributeNamespace,r===null?e.removeAttribute(t):(a=a.type,r=a===3||a===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var zt=Ef.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ea=Symbol.for("react.element"),Nr=Symbol.for("react.portal"),jr=Symbol.for("react.fragment"),no=Symbol.for("react.strict_mode"),ti=Symbol.for("react.profiler"),Mc=Symbol.for("react.provider"),Oc=Symbol.for("react.context"),ao=Symbol.for("react.forward_ref"),ri=Symbol.for("react.suspense"),ni=Symbol.for("react.suspense_list"),lo=Symbol.for("react.memo"),It=Symbol.for("react.lazy"),Fc=Symbol.for("react.offscreen"),os=Symbol.iterator;function rn(e){return e===null||typeof e!="object"?null:(e=os&&e[os]||e["@@iterator"],typeof e=="function"?e:null)}var pe=Object.assign,kl;function hn(e){if(kl===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);kl=t&&t[1]||""}return`
`+kl+e}var Nl=!1;function jl(e,t){if(!e||Nl)return"";Nl=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var n=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){n=d}e.call(t.prototype)}else{try{throw Error()}catch(d){n=d}e()}}catch(d){if(d&&n&&typeof d.stack=="string"){for(var a=d.stack.split(`
`),l=n.stack.split(`
`),o=a.length-1,c=l.length-1;1<=o&&0<=c&&a[o]!==l[c];)c--;for(;1<=o&&0<=c;o--,c--)if(a[o]!==l[c]){if(o!==1||c!==1)do if(o--,c--,0>c||a[o]!==l[c]){var s=`
`+a[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=c);break}}}finally{Nl=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?hn(e):""}function If(e){switch(e.tag){case 5:return hn(e.type);case 16:return hn("Lazy");case 13:return hn("Suspense");case 19:return hn("SuspenseList");case 0:case 2:case 15:return e=jl(e.type,!1),e;case 11:return e=jl(e.type.render,!1),e;case 1:return e=jl(e.type,!0),e;default:return""}}function ai(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case jr:return"Fragment";case Nr:return"Portal";case ti:return"Profiler";case no:return"StrictMode";case ri:return"Suspense";case ni:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Oc:return(e.displayName||"Context")+".Consumer";case Mc:return(e._context.displayName||"Context")+".Provider";case ao:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case lo:return t=e.displayName||null,t!==null?t:ai(e.type)||"Memo";case It:t=e._payload,e=e._init;try{return ai(e(t))}catch{}}return null}function Tf(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ai(t);case 8:return t===no?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Xt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function $c(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Rf(e){var t=$c(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var a=r.get,l=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(o){n=""+o,l.call(this,o)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ta(e){e._valueTracker||(e._valueTracker=Rf(e))}function Ac(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=$c(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function za(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function li(e,t){var r=t.checked;return pe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function ss(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=Xt(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Uc(e,t){t=t.checked,t!=null&&ro(e,"checked",t,!1)}function ii(e,t){Uc(e,t);var r=Xt(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?oi(e,t.type,r):t.hasOwnProperty("defaultValue")&&oi(e,t.type,Xt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function cs(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function oi(e,t,r){(t!=="number"||za(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var gn=Array.isArray;function Dr(e,t,r,n){if(e=e.options,t){t={};for(var a=0;a<r.length;a++)t["$"+r[a]]=!0;for(r=0;r<e.length;r++)a=t.hasOwnProperty("$"+e[r].value),e[r].selected!==a&&(e[r].selected=a),a&&n&&(e[r].defaultSelected=!0)}else{for(r=""+Xt(r),t=null,a=0;a<e.length;a++){if(e[a].value===r){e[a].selected=!0,n&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function si(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(T(91));return pe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function us(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(T(92));if(gn(r)){if(1<r.length)throw Error(T(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:Xt(r)}}function Bc(e,t){var r=Xt(t.value),n=Xt(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function ds(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Vc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ci(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Vc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ra,Wc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,n,a){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ra=ra||document.createElement("div"),ra.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ra.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function zn(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var yn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Df=["Webkit","ms","Moz","O"];Object.keys(yn).forEach(function(e){Df.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),yn[t]=yn[e]})});function Qc(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||yn.hasOwnProperty(e)&&yn[e]?(""+t).trim():t+"px"}function Hc(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,a=Qc(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,a):e[r]=a}}var Mf=pe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ui(e,t){if(t){if(Mf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(T(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(T(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(T(61))}if(t.style!=null&&typeof t.style!="object")throw Error(T(62))}}function di(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var fi=null;function io(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var pi=null,Mr=null,Or=null;function fs(e){if(e=Yn(e)){if(typeof pi!="function")throw Error(T(280));var t=e.stateNode;t&&(t=il(t),pi(e.stateNode,e.type,t))}}function Kc(e){Mr?Or?Or.push(e):Or=[e]:Mr=e}function Xc(){if(Mr){var e=Mr,t=Or;if(Or=Mr=null,fs(e),t)for(e=0;e<t.length;e++)fs(t[e])}}function Gc(e,t){return e(t)}function Yc(){}var Sl=!1;function qc(e,t,r){if(Sl)return e(t,r);Sl=!0;try{return Gc(e,t,r)}finally{Sl=!1,(Mr!==null||Or!==null)&&(Yc(),Xc())}}function _n(e,t){var r=e.stateNode;if(r===null)return null;var n=il(r);if(n===null)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(T(231,t,typeof r));return r}var mi=!1;if(St)try{var nn={};Object.defineProperty(nn,"passive",{get:function(){mi=!0}}),window.addEventListener("test",nn,nn),window.removeEventListener("test",nn,nn)}catch{mi=!1}function Of(e,t,r,n,a,l,o,c,s){var d=Array.prototype.slice.call(arguments,3);try{t.apply(r,d)}catch(v){this.onError(v)}}var bn=!1,_a=null,La=!1,hi=null,Ff={onError:function(e){bn=!0,_a=e}};function $f(e,t,r,n,a,l,o,c,s){bn=!1,_a=null,Of.apply(Ff,arguments)}function Af(e,t,r,n,a,l,o,c,s){if($f.apply(this,arguments),bn){if(bn){var d=_a;bn=!1,_a=null}else throw Error(T(198));La||(La=!0,hi=d)}}function hr(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function Jc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ps(e){if(hr(e)!==e)throw Error(T(188))}function Uf(e){var t=e.alternate;if(!t){if(t=hr(e),t===null)throw Error(T(188));return t!==e?null:e}for(var r=e,n=t;;){var a=r.return;if(a===null)break;var l=a.alternate;if(l===null){if(n=a.return,n!==null){r=n;continue}break}if(a.child===l.child){for(l=a.child;l;){if(l===r)return ps(a),e;if(l===n)return ps(a),t;l=l.sibling}throw Error(T(188))}if(r.return!==n.return)r=a,n=l;else{for(var o=!1,c=a.child;c;){if(c===r){o=!0,r=a,n=l;break}if(c===n){o=!0,n=a,r=l;break}c=c.sibling}if(!o){for(c=l.child;c;){if(c===r){o=!0,r=l,n=a;break}if(c===n){o=!0,n=l,r=a;break}c=c.sibling}if(!o)throw Error(T(189))}}if(r.alternate!==n)throw Error(T(190))}if(r.tag!==3)throw Error(T(188));return r.stateNode.current===r?e:t}function Zc(e){return e=Uf(e),e!==null?eu(e):null}function eu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=eu(e);if(t!==null)return t;e=e.sibling}return null}var tu=Ge.unstable_scheduleCallback,ms=Ge.unstable_cancelCallback,Bf=Ge.unstable_shouldYield,Vf=Ge.unstable_requestPaint,ye=Ge.unstable_now,Wf=Ge.unstable_getCurrentPriorityLevel,oo=Ge.unstable_ImmediatePriority,ru=Ge.unstable_UserBlockingPriority,Ia=Ge.unstable_NormalPriority,Qf=Ge.unstable_LowPriority,nu=Ge.unstable_IdlePriority,rl=null,vt=null;function Hf(e){if(vt&&typeof vt.onCommitFiberRoot=="function")try{vt.onCommitFiberRoot(rl,e,void 0,(e.current.flags&128)===128)}catch{}}var ut=Math.clz32?Math.clz32:Gf,Kf=Math.log,Xf=Math.LN2;function Gf(e){return e>>>=0,e===0?32:31-(Kf(e)/Xf|0)|0}var na=64,aa=4194304;function vn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ta(e,t){var r=e.pendingLanes;if(r===0)return 0;var n=0,a=e.suspendedLanes,l=e.pingedLanes,o=r&268435455;if(o!==0){var c=o&~a;c!==0?n=vn(c):(l&=o,l!==0&&(n=vn(l)))}else o=r&~a,o!==0?n=vn(o):l!==0&&(n=vn(l));if(n===0)return 0;if(t!==0&&t!==n&&!(t&a)&&(a=n&-n,l=t&-t,a>=l||a===16&&(l&4194240)!==0))return t;if(n&4&&(n|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)r=31-ut(t),a=1<<r,n|=e[r],t&=~a;return n}function Yf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function qf(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,a=e.expirationTimes,l=e.pendingLanes;0<l;){var o=31-ut(l),c=1<<o,s=a[o];s===-1?(!(c&r)||c&n)&&(a[o]=Yf(c,t)):s<=t&&(e.expiredLanes|=c),l&=~c}}function gi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function au(){var e=na;return na<<=1,!(na&4194240)&&(na=64),e}function Cl(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Xn(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ut(t),e[t]=r}function Jf(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<r;){var a=31-ut(r),l=1<<a;t[a]=0,n[a]=-1,e[a]=-1,r&=~l}}function so(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-ut(r),a=1<<n;a&t|e[n]&t&&(e[n]|=t),r&=~a}}var ne=0;function lu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var iu,co,ou,su,cu,vi=!1,la=[],$t=null,At=null,Ut=null,Ln=new Map,In=new Map,Rt=[],Zf="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function hs(e,t){switch(e){case"focusin":case"focusout":$t=null;break;case"dragenter":case"dragleave":At=null;break;case"mouseover":case"mouseout":Ut=null;break;case"pointerover":case"pointerout":Ln.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":In.delete(t.pointerId)}}function an(e,t,r,n,a,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:l,targetContainers:[a]},t!==null&&(t=Yn(t),t!==null&&co(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function ep(e,t,r,n,a){switch(t){case"focusin":return $t=an($t,e,t,r,n,a),!0;case"dragenter":return At=an(At,e,t,r,n,a),!0;case"mouseover":return Ut=an(Ut,e,t,r,n,a),!0;case"pointerover":var l=a.pointerId;return Ln.set(l,an(Ln.get(l)||null,e,t,r,n,a)),!0;case"gotpointercapture":return l=a.pointerId,In.set(l,an(In.get(l)||null,e,t,r,n,a)),!0}return!1}function uu(e){var t=ar(e.target);if(t!==null){var r=hr(t);if(r!==null){if(t=r.tag,t===13){if(t=Jc(r),t!==null){e.blockedOn=t,cu(e.priority,function(){ou(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ya(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=xi(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var n=new r.constructor(r.type,r);fi=n,r.target.dispatchEvent(n),fi=null}else return t=Yn(r),t!==null&&co(t),e.blockedOn=r,!1;t.shift()}return!0}function gs(e,t,r){ya(e)&&r.delete(t)}function tp(){vi=!1,$t!==null&&ya($t)&&($t=null),At!==null&&ya(At)&&(At=null),Ut!==null&&ya(Ut)&&(Ut=null),Ln.forEach(gs),In.forEach(gs)}function ln(e,t){e.blockedOn===t&&(e.blockedOn=null,vi||(vi=!0,Ge.unstable_scheduleCallback(Ge.unstable_NormalPriority,tp)))}function Tn(e){function t(a){return ln(a,e)}if(0<la.length){ln(la[0],e);for(var r=1;r<la.length;r++){var n=la[r];n.blockedOn===e&&(n.blockedOn=null)}}for($t!==null&&ln($t,e),At!==null&&ln(At,e),Ut!==null&&ln(Ut,e),Ln.forEach(t),In.forEach(t),r=0;r<Rt.length;r++)n=Rt[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<Rt.length&&(r=Rt[0],r.blockedOn===null);)uu(r),r.blockedOn===null&&Rt.shift()}var Fr=zt.ReactCurrentBatchConfig,Ra=!0;function rp(e,t,r,n){var a=ne,l=Fr.transition;Fr.transition=null;try{ne=1,uo(e,t,r,n)}finally{ne=a,Fr.transition=l}}function np(e,t,r,n){var a=ne,l=Fr.transition;Fr.transition=null;try{ne=4,uo(e,t,r,n)}finally{ne=a,Fr.transition=l}}function uo(e,t,r,n){if(Ra){var a=xi(e,t,r,n);if(a===null)Ml(e,t,n,Da,r),hs(e,n);else if(ep(a,e,t,r,n))n.stopPropagation();else if(hs(e,n),t&4&&-1<Zf.indexOf(e)){for(;a!==null;){var l=Yn(a);if(l!==null&&iu(l),l=xi(e,t,r,n),l===null&&Ml(e,t,n,Da,r),l===a)break;a=l}a!==null&&n.stopPropagation()}else Ml(e,t,n,null,r)}}var Da=null;function xi(e,t,r,n){if(Da=null,e=io(n),e=ar(e),e!==null)if(t=hr(e),t===null)e=null;else if(r=t.tag,r===13){if(e=Jc(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Da=e,null}function du(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Wf()){case oo:return 1;case ru:return 4;case Ia:case Qf:return 16;case nu:return 536870912;default:return 16}default:return 16}}var Mt=null,fo=null,ba=null;function fu(){if(ba)return ba;var e,t=fo,r=t.length,n,a="value"in Mt?Mt.value:Mt.textContent,l=a.length;for(e=0;e<r&&t[e]===a[e];e++);var o=r-e;for(n=1;n<=o&&t[r-n]===a[l-n];n++);return ba=a.slice(e,1<n?1-n:void 0)}function wa(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ia(){return!0}function vs(){return!1}function qe(e){function t(r,n,a,l,o){this._reactName=r,this._targetInst=a,this.type=n,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(r=e[c],this[c]=r?r(l):l[c]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?ia:vs,this.isPropagationStopped=vs,this}return pe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=ia)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=ia)},persist:function(){},isPersistent:ia}),t}var Yr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},po=qe(Yr),Gn=pe({},Yr,{view:0,detail:0}),ap=qe(Gn),El,Pl,on,nl=pe({},Gn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==on&&(on&&e.type==="mousemove"?(El=e.screenX-on.screenX,Pl=e.screenY-on.screenY):Pl=El=0,on=e),El)},movementY:function(e){return"movementY"in e?e.movementY:Pl}}),xs=qe(nl),lp=pe({},nl,{dataTransfer:0}),ip=qe(lp),op=pe({},Gn,{relatedTarget:0}),zl=qe(op),sp=pe({},Yr,{animationName:0,elapsedTime:0,pseudoElement:0}),cp=qe(sp),up=pe({},Yr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),dp=qe(up),fp=pe({},Yr,{data:0}),ys=qe(fp),pp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},mp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=hp[e])?!!t[e]:!1}function mo(){return gp}var vp=pe({},Gn,{key:function(e){if(e.key){var t=pp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=wa(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?mp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mo,charCode:function(e){return e.type==="keypress"?wa(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?wa(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),xp=qe(vp),yp=pe({},nl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bs=qe(yp),bp=pe({},Gn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mo}),wp=qe(bp),kp=pe({},Yr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Np=qe(kp),jp=pe({},nl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Sp=qe(jp),Cp=[9,13,27,32],ho=St&&"CompositionEvent"in window,wn=null;St&&"documentMode"in document&&(wn=document.documentMode);var Ep=St&&"TextEvent"in window&&!wn,pu=St&&(!ho||wn&&8<wn&&11>=wn),ws=" ",ks=!1;function mu(e,t){switch(e){case"keyup":return Cp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Sr=!1;function Pp(e,t){switch(e){case"compositionend":return hu(t);case"keypress":return t.which!==32?null:(ks=!0,ws);case"textInput":return e=t.data,e===ws&&ks?null:e;default:return null}}function zp(e,t){if(Sr)return e==="compositionend"||!ho&&mu(e,t)?(e=fu(),ba=fo=Mt=null,Sr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return pu&&t.locale!=="ko"?null:t.data;default:return null}}var _p={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ns(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!_p[e.type]:t==="textarea"}function gu(e,t,r,n){Kc(n),t=Ma(t,"onChange"),0<t.length&&(r=new po("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var kn=null,Rn=null;function Lp(e){Eu(e,0)}function al(e){var t=Pr(e);if(Ac(t))return e}function Ip(e,t){if(e==="change")return t}var vu=!1;if(St){var _l;if(St){var Ll="oninput"in document;if(!Ll){var js=document.createElement("div");js.setAttribute("oninput","return;"),Ll=typeof js.oninput=="function"}_l=Ll}else _l=!1;vu=_l&&(!document.documentMode||9<document.documentMode)}function Ss(){kn&&(kn.detachEvent("onpropertychange",xu),Rn=kn=null)}function xu(e){if(e.propertyName==="value"&&al(Rn)){var t=[];gu(t,Rn,e,io(e)),qc(Lp,t)}}function Tp(e,t,r){e==="focusin"?(Ss(),kn=t,Rn=r,kn.attachEvent("onpropertychange",xu)):e==="focusout"&&Ss()}function Rp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return al(Rn)}function Dp(e,t){if(e==="click")return al(t)}function Mp(e,t){if(e==="input"||e==="change")return al(t)}function Op(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ft=typeof Object.is=="function"?Object.is:Op;function Dn(e,t){if(ft(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var a=r[n];if(!ei.call(t,a)||!ft(e[a],t[a]))return!1}return!0}function Cs(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Es(e,t){var r=Cs(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Cs(r)}}function yu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?yu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function bu(){for(var e=window,t=za();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=za(e.document)}return t}function go(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Fp(e){var t=bu(),r=e.focusedElem,n=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&yu(r.ownerDocument.documentElement,r)){if(n!==null&&go(r)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=r.textContent.length,l=Math.min(n.start,a);n=n.end===void 0?l:Math.min(n.end,a),!e.extend&&l>n&&(a=n,n=l,l=a),a=Es(r,l);var o=Es(r,n);a&&o&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),l>n?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var $p=St&&"documentMode"in document&&11>=document.documentMode,Cr=null,yi=null,Nn=null,bi=!1;function Ps(e,t,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;bi||Cr==null||Cr!==za(n)||(n=Cr,"selectionStart"in n&&go(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Nn&&Dn(Nn,n)||(Nn=n,n=Ma(yi,"onSelect"),0<n.length&&(t=new po("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=Cr)))}function oa(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Er={animationend:oa("Animation","AnimationEnd"),animationiteration:oa("Animation","AnimationIteration"),animationstart:oa("Animation","AnimationStart"),transitionend:oa("Transition","TransitionEnd")},Il={},wu={};St&&(wu=document.createElement("div").style,"AnimationEvent"in window||(delete Er.animationend.animation,delete Er.animationiteration.animation,delete Er.animationstart.animation),"TransitionEvent"in window||delete Er.transitionend.transition);function ll(e){if(Il[e])return Il[e];if(!Er[e])return e;var t=Er[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in wu)return Il[e]=t[r];return e}var ku=ll("animationend"),Nu=ll("animationiteration"),ju=ll("animationstart"),Su=ll("transitionend"),Cu=new Map,zs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function qt(e,t){Cu.set(e,t),mr(t,[e])}for(var Tl=0;Tl<zs.length;Tl++){var Rl=zs[Tl],Ap=Rl.toLowerCase(),Up=Rl[0].toUpperCase()+Rl.slice(1);qt(Ap,"on"+Up)}qt(ku,"onAnimationEnd");qt(Nu,"onAnimationIteration");qt(ju,"onAnimationStart");qt("dblclick","onDoubleClick");qt("focusin","onFocus");qt("focusout","onBlur");qt(Su,"onTransitionEnd");Ur("onMouseEnter",["mouseout","mouseover"]);Ur("onMouseLeave",["mouseout","mouseover"]);Ur("onPointerEnter",["pointerout","pointerover"]);Ur("onPointerLeave",["pointerout","pointerover"]);mr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));mr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));mr("onBeforeInput",["compositionend","keypress","textInput","paste"]);mr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));mr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var xn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Bp=new Set("cancel close invalid load scroll toggle".split(" ").concat(xn));function _s(e,t,r){var n=e.type||"unknown-event";e.currentTarget=r,Af(n,t,void 0,e),e.currentTarget=null}function Eu(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var n=e[r],a=n.event;n=n.listeners;e:{var l=void 0;if(t)for(var o=n.length-1;0<=o;o--){var c=n[o],s=c.instance,d=c.currentTarget;if(c=c.listener,s!==l&&a.isPropagationStopped())break e;_s(a,c,d),l=s}else for(o=0;o<n.length;o++){if(c=n[o],s=c.instance,d=c.currentTarget,c=c.listener,s!==l&&a.isPropagationStopped())break e;_s(a,c,d),l=s}}}if(La)throw e=hi,La=!1,hi=null,e}function ie(e,t){var r=t[Si];r===void 0&&(r=t[Si]=new Set);var n=e+"__bubble";r.has(n)||(Pu(t,e,2,!1),r.add(n))}function Dl(e,t,r){var n=0;t&&(n|=4),Pu(r,e,n,t)}var sa="_reactListening"+Math.random().toString(36).slice(2);function Mn(e){if(!e[sa]){e[sa]=!0,Dc.forEach(function(r){r!=="selectionchange"&&(Bp.has(r)||Dl(r,!1,e),Dl(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[sa]||(t[sa]=!0,Dl("selectionchange",!1,t))}}function Pu(e,t,r,n){switch(du(t)){case 1:var a=rp;break;case 4:a=np;break;default:a=uo}r=a.bind(null,t,r,e),a=void 0,!mi||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),n?a!==void 0?e.addEventListener(t,r,{capture:!0,passive:a}):e.addEventListener(t,r,!0):a!==void 0?e.addEventListener(t,r,{passive:a}):e.addEventListener(t,r,!1)}function Ml(e,t,r,n,a){var l=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var o=n.tag;if(o===3||o===4){var c=n.stateNode.containerInfo;if(c===a||c.nodeType===8&&c.parentNode===a)break;if(o===4)for(o=n.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===a||s.nodeType===8&&s.parentNode===a))return;o=o.return}for(;c!==null;){if(o=ar(c),o===null)return;if(s=o.tag,s===5||s===6){n=l=o;continue e}c=c.parentNode}}n=n.return}qc(function(){var d=l,v=io(r),p=[];e:{var m=Cu.get(e);if(m!==void 0){var j=po,y=e;switch(e){case"keypress":if(wa(r)===0)break e;case"keydown":case"keyup":j=xp;break;case"focusin":y="focus",j=zl;break;case"focusout":y="blur",j=zl;break;case"beforeblur":case"afterblur":j=zl;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":j=xs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":j=ip;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":j=wp;break;case ku:case Nu:case ju:j=cp;break;case Su:j=Np;break;case"scroll":j=ap;break;case"wheel":j=Sp;break;case"copy":case"cut":case"paste":j=dp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":j=bs}var S=(t&4)!==0,N=!S&&e==="scroll",f=S?m!==null?m+"Capture":null:m;S=[];for(var u=d,h;u!==null;){h=u;var b=h.stateNode;if(h.tag===5&&b!==null&&(h=b,f!==null&&(b=_n(u,f),b!=null&&S.push(On(u,b,h)))),N)break;u=u.return}0<S.length&&(m=new j(m,y,null,r,v),p.push({event:m,listeners:S}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",j=e==="mouseout"||e==="pointerout",m&&r!==fi&&(y=r.relatedTarget||r.fromElement)&&(ar(y)||y[Ct]))break e;if((j||m)&&(m=v.window===v?v:(m=v.ownerDocument)?m.defaultView||m.parentWindow:window,j?(y=r.relatedTarget||r.toElement,j=d,y=y?ar(y):null,y!==null&&(N=hr(y),y!==N||y.tag!==5&&y.tag!==6)&&(y=null)):(j=null,y=d),j!==y)){if(S=xs,b="onMouseLeave",f="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(S=bs,b="onPointerLeave",f="onPointerEnter",u="pointer"),N=j==null?m:Pr(j),h=y==null?m:Pr(y),m=new S(b,u+"leave",j,r,v),m.target=N,m.relatedTarget=h,b=null,ar(v)===d&&(S=new S(f,u+"enter",y,r,v),S.target=h,S.relatedTarget=N,b=S),N=b,j&&y)t:{for(S=j,f=y,u=0,h=S;h;h=yr(h))u++;for(h=0,b=f;b;b=yr(b))h++;for(;0<u-h;)S=yr(S),u--;for(;0<h-u;)f=yr(f),h--;for(;u--;){if(S===f||f!==null&&S===f.alternate)break t;S=yr(S),f=yr(f)}S=null}else S=null;j!==null&&Ls(p,m,j,S,!1),y!==null&&N!==null&&Ls(p,N,y,S,!0)}}e:{if(m=d?Pr(d):window,j=m.nodeName&&m.nodeName.toLowerCase(),j==="select"||j==="input"&&m.type==="file")var P=Ip;else if(Ns(m))if(vu)P=Mp;else{P=Rp;var _=Tp}else(j=m.nodeName)&&j.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(P=Dp);if(P&&(P=P(e,d))){gu(p,P,r,v);break e}_&&_(e,m,d),e==="focusout"&&(_=m._wrapperState)&&_.controlled&&m.type==="number"&&oi(m,"number",m.value)}switch(_=d?Pr(d):window,e){case"focusin":(Ns(_)||_.contentEditable==="true")&&(Cr=_,yi=d,Nn=null);break;case"focusout":Nn=yi=Cr=null;break;case"mousedown":bi=!0;break;case"contextmenu":case"mouseup":case"dragend":bi=!1,Ps(p,r,v);break;case"selectionchange":if($p)break;case"keydown":case"keyup":Ps(p,r,v)}var D;if(ho)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else Sr?mu(e,r)&&(R="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(R="onCompositionStart");R&&(pu&&r.locale!=="ko"&&(Sr||R!=="onCompositionStart"?R==="onCompositionEnd"&&Sr&&(D=fu()):(Mt=v,fo="value"in Mt?Mt.value:Mt.textContent,Sr=!0)),_=Ma(d,R),0<_.length&&(R=new ys(R,e,null,r,v),p.push({event:R,listeners:_}),D?R.data=D:(D=hu(r),D!==null&&(R.data=D)))),(D=Ep?Pp(e,r):zp(e,r))&&(d=Ma(d,"onBeforeInput"),0<d.length&&(v=new ys("onBeforeInput","beforeinput",null,r,v),p.push({event:v,listeners:d}),v.data=D))}Eu(p,t)})}function On(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Ma(e,t){for(var r=t+"Capture",n=[];e!==null;){var a=e,l=a.stateNode;a.tag===5&&l!==null&&(a=l,l=_n(e,r),l!=null&&n.unshift(On(e,l,a)),l=_n(e,t),l!=null&&n.push(On(e,l,a))),e=e.return}return n}function yr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ls(e,t,r,n,a){for(var l=t._reactName,o=[];r!==null&&r!==n;){var c=r,s=c.alternate,d=c.stateNode;if(s!==null&&s===n)break;c.tag===5&&d!==null&&(c=d,a?(s=_n(r,l),s!=null&&o.unshift(On(r,s,c))):a||(s=_n(r,l),s!=null&&o.push(On(r,s,c)))),r=r.return}o.length!==0&&e.push({event:t,listeners:o})}var Vp=/\r\n?/g,Wp=/\u0000|\uFFFD/g;function Is(e){return(typeof e=="string"?e:""+e).replace(Vp,`
`).replace(Wp,"")}function ca(e,t,r){if(t=Is(t),Is(e)!==t&&r)throw Error(T(425))}function Oa(){}var wi=null,ki=null;function Ni(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ji=typeof setTimeout=="function"?setTimeout:void 0,Qp=typeof clearTimeout=="function"?clearTimeout:void 0,Ts=typeof Promise=="function"?Promise:void 0,Hp=typeof queueMicrotask=="function"?queueMicrotask:typeof Ts<"u"?function(e){return Ts.resolve(null).then(e).catch(Kp)}:ji;function Kp(e){setTimeout(function(){throw e})}function Ol(e,t){var r=t,n=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&a.nodeType===8)if(r=a.data,r==="/$"){if(n===0){e.removeChild(a),Tn(t);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=a}while(r);Tn(t)}function Bt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Rs(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var qr=Math.random().toString(36).slice(2),gt="__reactFiber$"+qr,Fn="__reactProps$"+qr,Ct="__reactContainer$"+qr,Si="__reactEvents$"+qr,Xp="__reactListeners$"+qr,Gp="__reactHandles$"+qr;function ar(e){var t=e[gt];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Ct]||r[gt]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Rs(e);e!==null;){if(r=e[gt])return r;e=Rs(e)}return t}e=r,r=e.parentNode}return null}function Yn(e){return e=e[gt]||e[Ct],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Pr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(T(33))}function il(e){return e[Fn]||null}var Ci=[],zr=-1;function Jt(e){return{current:e}}function oe(e){0>zr||(e.current=Ci[zr],Ci[zr]=null,zr--)}function le(e,t){zr++,Ci[zr]=e.current,e.current=t}var Gt={},De=Jt(Gt),Ve=Jt(!1),cr=Gt;function Br(e,t){var r=e.type.contextTypes;if(!r)return Gt;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var a={},l;for(l in r)a[l]=t[l];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function We(e){return e=e.childContextTypes,e!=null}function Fa(){oe(Ve),oe(De)}function Ds(e,t,r){if(De.current!==Gt)throw Error(T(168));le(De,t),le(Ve,r)}function zu(e,t,r){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var a in n)if(!(a in t))throw Error(T(108,Tf(e)||"Unknown",a));return pe({},r,n)}function $a(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Gt,cr=De.current,le(De,e),le(Ve,Ve.current),!0}function Ms(e,t,r){var n=e.stateNode;if(!n)throw Error(T(169));r?(e=zu(e,t,cr),n.__reactInternalMemoizedMergedChildContext=e,oe(Ve),oe(De),le(De,e)):oe(Ve),le(Ve,r)}var wt=null,ol=!1,Fl=!1;function _u(e){wt===null?wt=[e]:wt.push(e)}function Yp(e){ol=!0,_u(e)}function Zt(){if(!Fl&&wt!==null){Fl=!0;var e=0,t=ne;try{var r=wt;for(ne=1;e<r.length;e++){var n=r[e];do n=n(!0);while(n!==null)}wt=null,ol=!1}catch(a){throw wt!==null&&(wt=wt.slice(e+1)),tu(oo,Zt),a}finally{ne=t,Fl=!1}}return null}var _r=[],Lr=0,Aa=null,Ua=0,Ze=[],et=0,ur=null,kt=1,Nt="";function rr(e,t){_r[Lr++]=Ua,_r[Lr++]=Aa,Aa=e,Ua=t}function Lu(e,t,r){Ze[et++]=kt,Ze[et++]=Nt,Ze[et++]=ur,ur=e;var n=kt;e=Nt;var a=32-ut(n)-1;n&=~(1<<a),r+=1;var l=32-ut(t)+a;if(30<l){var o=a-a%5;l=(n&(1<<o)-1).toString(32),n>>=o,a-=o,kt=1<<32-ut(t)+a|r<<a|n,Nt=l+e}else kt=1<<l|r<<a|n,Nt=e}function vo(e){e.return!==null&&(rr(e,1),Lu(e,1,0))}function xo(e){for(;e===Aa;)Aa=_r[--Lr],_r[Lr]=null,Ua=_r[--Lr],_r[Lr]=null;for(;e===ur;)ur=Ze[--et],Ze[et]=null,Nt=Ze[--et],Ze[et]=null,kt=Ze[--et],Ze[et]=null}var Xe=null,Ke=null,se=!1,ct=null;function Iu(e,t){var r=tt(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Os(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Xe=e,Ke=Bt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Xe=e,Ke=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=ur!==null?{id:kt,overflow:Nt}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=tt(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Xe=e,Ke=null,!0):!1;default:return!1}}function Ei(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Pi(e){if(se){var t=Ke;if(t){var r=t;if(!Os(e,t)){if(Ei(e))throw Error(T(418));t=Bt(r.nextSibling);var n=Xe;t&&Os(e,t)?Iu(n,r):(e.flags=e.flags&-4097|2,se=!1,Xe=e)}}else{if(Ei(e))throw Error(T(418));e.flags=e.flags&-4097|2,se=!1,Xe=e}}}function Fs(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Xe=e}function ua(e){if(e!==Xe)return!1;if(!se)return Fs(e),se=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ni(e.type,e.memoizedProps)),t&&(t=Ke)){if(Ei(e))throw Tu(),Error(T(418));for(;t;)Iu(e,t),t=Bt(t.nextSibling)}if(Fs(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(T(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Ke=Bt(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Ke=null}}else Ke=Xe?Bt(e.stateNode.nextSibling):null;return!0}function Tu(){for(var e=Ke;e;)e=Bt(e.nextSibling)}function Vr(){Ke=Xe=null,se=!1}function yo(e){ct===null?ct=[e]:ct.push(e)}var qp=zt.ReactCurrentBatchConfig;function sn(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(T(309));var n=r.stateNode}if(!n)throw Error(T(147,e));var a=n,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(o){var c=a.refs;o===null?delete c[l]:c[l]=o},t._stringRef=l,t)}if(typeof e!="string")throw Error(T(284));if(!r._owner)throw Error(T(290,e))}return e}function da(e,t){throw e=Object.prototype.toString.call(t),Error(T(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function $s(e){var t=e._init;return t(e._payload)}function Ru(e){function t(f,u){if(e){var h=f.deletions;h===null?(f.deletions=[u],f.flags|=16):h.push(u)}}function r(f,u){if(!e)return null;for(;u!==null;)t(f,u),u=u.sibling;return null}function n(f,u){for(f=new Map;u!==null;)u.key!==null?f.set(u.key,u):f.set(u.index,u),u=u.sibling;return f}function a(f,u){return f=Ht(f,u),f.index=0,f.sibling=null,f}function l(f,u,h){return f.index=h,e?(h=f.alternate,h!==null?(h=h.index,h<u?(f.flags|=2,u):h):(f.flags|=2,u)):(f.flags|=1048576,u)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function c(f,u,h,b){return u===null||u.tag!==6?(u=Ql(h,f.mode,b),u.return=f,u):(u=a(u,h),u.return=f,u)}function s(f,u,h,b){var P=h.type;return P===jr?v(f,u,h.props.children,b,h.key):u!==null&&(u.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===It&&$s(P)===u.type)?(b=a(u,h.props),b.ref=sn(f,u,h),b.return=f,b):(b=Pa(h.type,h.key,h.props,null,f.mode,b),b.ref=sn(f,u,h),b.return=f,b)}function d(f,u,h,b){return u===null||u.tag!==4||u.stateNode.containerInfo!==h.containerInfo||u.stateNode.implementation!==h.implementation?(u=Hl(h,f.mode,b),u.return=f,u):(u=a(u,h.children||[]),u.return=f,u)}function v(f,u,h,b,P){return u===null||u.tag!==7?(u=sr(h,f.mode,b,P),u.return=f,u):(u=a(u,h),u.return=f,u)}function p(f,u,h){if(typeof u=="string"&&u!==""||typeof u=="number")return u=Ql(""+u,f.mode,h),u.return=f,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case ea:return h=Pa(u.type,u.key,u.props,null,f.mode,h),h.ref=sn(f,null,u),h.return=f,h;case Nr:return u=Hl(u,f.mode,h),u.return=f,u;case It:var b=u._init;return p(f,b(u._payload),h)}if(gn(u)||rn(u))return u=sr(u,f.mode,h,null),u.return=f,u;da(f,u)}return null}function m(f,u,h,b){var P=u!==null?u.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return P!==null?null:c(f,u,""+h,b);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case ea:return h.key===P?s(f,u,h,b):null;case Nr:return h.key===P?d(f,u,h,b):null;case It:return P=h._init,m(f,u,P(h._payload),b)}if(gn(h)||rn(h))return P!==null?null:v(f,u,h,b,null);da(f,h)}return null}function j(f,u,h,b,P){if(typeof b=="string"&&b!==""||typeof b=="number")return f=f.get(h)||null,c(u,f,""+b,P);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case ea:return f=f.get(b.key===null?h:b.key)||null,s(u,f,b,P);case Nr:return f=f.get(b.key===null?h:b.key)||null,d(u,f,b,P);case It:var _=b._init;return j(f,u,h,_(b._payload),P)}if(gn(b)||rn(b))return f=f.get(h)||null,v(u,f,b,P,null);da(u,b)}return null}function y(f,u,h,b){for(var P=null,_=null,D=u,R=u=0,B=null;D!==null&&R<h.length;R++){D.index>R?(B=D,D=null):B=D.sibling;var I=m(f,D,h[R],b);if(I===null){D===null&&(D=B);break}e&&D&&I.alternate===null&&t(f,D),u=l(I,u,R),_===null?P=I:_.sibling=I,_=I,D=B}if(R===h.length)return r(f,D),se&&rr(f,R),P;if(D===null){for(;R<h.length;R++)D=p(f,h[R],b),D!==null&&(u=l(D,u,R),_===null?P=D:_.sibling=D,_=D);return se&&rr(f,R),P}for(D=n(f,D);R<h.length;R++)B=j(D,f,R,h[R],b),B!==null&&(e&&B.alternate!==null&&D.delete(B.key===null?R:B.key),u=l(B,u,R),_===null?P=B:_.sibling=B,_=B);return e&&D.forEach(function(G){return t(f,G)}),se&&rr(f,R),P}function S(f,u,h,b){var P=rn(h);if(typeof P!="function")throw Error(T(150));if(h=P.call(h),h==null)throw Error(T(151));for(var _=P=null,D=u,R=u=0,B=null,I=h.next();D!==null&&!I.done;R++,I=h.next()){D.index>R?(B=D,D=null):B=D.sibling;var G=m(f,D,I.value,b);if(G===null){D===null&&(D=B);break}e&&D&&G.alternate===null&&t(f,D),u=l(G,u,R),_===null?P=G:_.sibling=G,_=G,D=B}if(I.done)return r(f,D),se&&rr(f,R),P;if(D===null){for(;!I.done;R++,I=h.next())I=p(f,I.value,b),I!==null&&(u=l(I,u,R),_===null?P=I:_.sibling=I,_=I);return se&&rr(f,R),P}for(D=n(f,D);!I.done;R++,I=h.next())I=j(D,f,R,I.value,b),I!==null&&(e&&I.alternate!==null&&D.delete(I.key===null?R:I.key),u=l(I,u,R),_===null?P=I:_.sibling=I,_=I);return e&&D.forEach(function(Y){return t(f,Y)}),se&&rr(f,R),P}function N(f,u,h,b){if(typeof h=="object"&&h!==null&&h.type===jr&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case ea:e:{for(var P=h.key,_=u;_!==null;){if(_.key===P){if(P=h.type,P===jr){if(_.tag===7){r(f,_.sibling),u=a(_,h.props.children),u.return=f,f=u;break e}}else if(_.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===It&&$s(P)===_.type){r(f,_.sibling),u=a(_,h.props),u.ref=sn(f,_,h),u.return=f,f=u;break e}r(f,_);break}else t(f,_);_=_.sibling}h.type===jr?(u=sr(h.props.children,f.mode,b,h.key),u.return=f,f=u):(b=Pa(h.type,h.key,h.props,null,f.mode,b),b.ref=sn(f,u,h),b.return=f,f=b)}return o(f);case Nr:e:{for(_=h.key;u!==null;){if(u.key===_)if(u.tag===4&&u.stateNode.containerInfo===h.containerInfo&&u.stateNode.implementation===h.implementation){r(f,u.sibling),u=a(u,h.children||[]),u.return=f,f=u;break e}else{r(f,u);break}else t(f,u);u=u.sibling}u=Hl(h,f.mode,b),u.return=f,f=u}return o(f);case It:return _=h._init,N(f,u,_(h._payload),b)}if(gn(h))return y(f,u,h,b);if(rn(h))return S(f,u,h,b);da(f,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,u!==null&&u.tag===6?(r(f,u.sibling),u=a(u,h),u.return=f,f=u):(r(f,u),u=Ql(h,f.mode,b),u.return=f,f=u),o(f)):r(f,u)}return N}var Wr=Ru(!0),Du=Ru(!1),Ba=Jt(null),Va=null,Ir=null,bo=null;function wo(){bo=Ir=Va=null}function ko(e){var t=Ba.current;oe(Ba),e._currentValue=t}function zi(e,t,r){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function $r(e,t){Va=e,bo=Ir=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Be=!0),e.firstContext=null)}function nt(e){var t=e._currentValue;if(bo!==e)if(e={context:e,memoizedValue:t,next:null},Ir===null){if(Va===null)throw Error(T(308));Ir=e,Va.dependencies={lanes:0,firstContext:e}}else Ir=Ir.next=e;return t}var lr=null;function No(e){lr===null?lr=[e]:lr.push(e)}function Mu(e,t,r,n){var a=t.interleaved;return a===null?(r.next=r,No(t)):(r.next=a.next,a.next=r),t.interleaved=r,Et(e,n)}function Et(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Tt=!1;function jo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ou(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function jt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Vt(e,t,r){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,ee&2){var a=n.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),n.pending=t,Et(e,r)}return a=n.interleaved,a===null?(t.next=t,No(n)):(t.next=a.next,a.next=t),n.interleaved=t,Et(e,r)}function ka(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,so(e,r)}}function As(e,t){var r=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var a=null,l=null;if(r=r.firstBaseUpdate,r!==null){do{var o={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};l===null?a=l=o:l=l.next=o,r=r.next}while(r!==null);l===null?a=l=t:l=l.next=t}else a=l=t;r={baseState:n.baseState,firstBaseUpdate:a,lastBaseUpdate:l,shared:n.shared,effects:n.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function Wa(e,t,r,n){var a=e.updateQueue;Tt=!1;var l=a.firstBaseUpdate,o=a.lastBaseUpdate,c=a.shared.pending;if(c!==null){a.shared.pending=null;var s=c,d=s.next;s.next=null,o===null?l=d:o.next=d,o=s;var v=e.alternate;v!==null&&(v=v.updateQueue,c=v.lastBaseUpdate,c!==o&&(c===null?v.firstBaseUpdate=d:c.next=d,v.lastBaseUpdate=s))}if(l!==null){var p=a.baseState;o=0,v=d=s=null,c=l;do{var m=c.lane,j=c.eventTime;if((n&m)===m){v!==null&&(v=v.next={eventTime:j,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var y=e,S=c;switch(m=t,j=r,S.tag){case 1:if(y=S.payload,typeof y=="function"){p=y.call(j,p,m);break e}p=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=S.payload,m=typeof y=="function"?y.call(j,p,m):y,m==null)break e;p=pe({},p,m);break e;case 2:Tt=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,m=a.effects,m===null?a.effects=[c]:m.push(c))}else j={eventTime:j,lane:m,tag:c.tag,payload:c.payload,callback:c.callback,next:null},v===null?(d=v=j,s=p):v=v.next=j,o|=m;if(c=c.next,c===null){if(c=a.shared.pending,c===null)break;m=c,c=m.next,m.next=null,a.lastBaseUpdate=m,a.shared.pending=null}}while(!0);if(v===null&&(s=p),a.baseState=s,a.firstBaseUpdate=d,a.lastBaseUpdate=v,t=a.shared.interleaved,t!==null){a=t;do o|=a.lane,a=a.next;while(a!==t)}else l===null&&(a.shared.lanes=0);fr|=o,e.lanes=o,e.memoizedState=p}}function Us(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],a=n.callback;if(a!==null){if(n.callback=null,n=r,typeof a!="function")throw Error(T(191,a));a.call(n)}}}var qn={},xt=Jt(qn),$n=Jt(qn),An=Jt(qn);function ir(e){if(e===qn)throw Error(T(174));return e}function So(e,t){switch(le(An,t),le($n,e),le(xt,qn),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ci(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ci(t,e)}oe(xt),le(xt,t)}function Qr(){oe(xt),oe($n),oe(An)}function Fu(e){ir(An.current);var t=ir(xt.current),r=ci(t,e.type);t!==r&&(le($n,e),le(xt,r))}function Co(e){$n.current===e&&(oe(xt),oe($n))}var ue=Jt(0);function Qa(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var $l=[];function Eo(){for(var e=0;e<$l.length;e++)$l[e]._workInProgressVersionPrimary=null;$l.length=0}var Na=zt.ReactCurrentDispatcher,Al=zt.ReactCurrentBatchConfig,dr=0,de=null,je=null,Ce=null,Ha=!1,jn=!1,Un=0,Jp=0;function Ie(){throw Error(T(321))}function Po(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!ft(e[r],t[r]))return!1;return!0}function zo(e,t,r,n,a,l){if(dr=l,de=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Na.current=e===null||e.memoizedState===null?rm:nm,e=r(n,a),jn){l=0;do{if(jn=!1,Un=0,25<=l)throw Error(T(301));l+=1,Ce=je=null,t.updateQueue=null,Na.current=am,e=r(n,a)}while(jn)}if(Na.current=Ka,t=je!==null&&je.next!==null,dr=0,Ce=je=de=null,Ha=!1,t)throw Error(T(300));return e}function _o(){var e=Un!==0;return Un=0,e}function ht(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ce===null?de.memoizedState=Ce=e:Ce=Ce.next=e,Ce}function at(){if(je===null){var e=de.alternate;e=e!==null?e.memoizedState:null}else e=je.next;var t=Ce===null?de.memoizedState:Ce.next;if(t!==null)Ce=t,je=e;else{if(e===null)throw Error(T(310));je=e,e={memoizedState:je.memoizedState,baseState:je.baseState,baseQueue:je.baseQueue,queue:je.queue,next:null},Ce===null?de.memoizedState=Ce=e:Ce=Ce.next=e}return Ce}function Bn(e,t){return typeof t=="function"?t(e):t}function Ul(e){var t=at(),r=t.queue;if(r===null)throw Error(T(311));r.lastRenderedReducer=e;var n=je,a=n.baseQueue,l=r.pending;if(l!==null){if(a!==null){var o=a.next;a.next=l.next,l.next=o}n.baseQueue=a=l,r.pending=null}if(a!==null){l=a.next,n=n.baseState;var c=o=null,s=null,d=l;do{var v=d.lane;if((dr&v)===v)s!==null&&(s=s.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),n=d.hasEagerState?d.eagerState:e(n,d.action);else{var p={lane:v,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};s===null?(c=s=p,o=n):s=s.next=p,de.lanes|=v,fr|=v}d=d.next}while(d!==null&&d!==l);s===null?o=n:s.next=c,ft(n,t.memoizedState)||(Be=!0),t.memoizedState=n,t.baseState=o,t.baseQueue=s,r.lastRenderedState=n}if(e=r.interleaved,e!==null){a=e;do l=a.lane,de.lanes|=l,fr|=l,a=a.next;while(a!==e)}else a===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function Bl(e){var t=at(),r=t.queue;if(r===null)throw Error(T(311));r.lastRenderedReducer=e;var n=r.dispatch,a=r.pending,l=t.memoizedState;if(a!==null){r.pending=null;var o=a=a.next;do l=e(l,o.action),o=o.next;while(o!==a);ft(l,t.memoizedState)||(Be=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),r.lastRenderedState=l}return[l,n]}function $u(){}function Au(e,t){var r=de,n=at(),a=t(),l=!ft(n.memoizedState,a);if(l&&(n.memoizedState=a,Be=!0),n=n.queue,Lo(Vu.bind(null,r,n,e),[e]),n.getSnapshot!==t||l||Ce!==null&&Ce.memoizedState.tag&1){if(r.flags|=2048,Vn(9,Bu.bind(null,r,n,a,t),void 0,null),Ee===null)throw Error(T(349));dr&30||Uu(r,t,a)}return a}function Uu(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=de.updateQueue,t===null?(t={lastEffect:null,stores:null},de.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Bu(e,t,r,n){t.value=r,t.getSnapshot=n,Wu(t)&&Qu(e)}function Vu(e,t,r){return r(function(){Wu(t)&&Qu(e)})}function Wu(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!ft(e,r)}catch{return!0}}function Qu(e){var t=Et(e,1);t!==null&&dt(t,e,1,-1)}function Bs(e){var t=ht();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bn,lastRenderedState:e},t.queue=e,e=e.dispatch=tm.bind(null,de,e),[t.memoizedState,e]}function Vn(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=de.updateQueue,t===null?(t={lastEffect:null,stores:null},de.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function Hu(){return at().memoizedState}function ja(e,t,r,n){var a=ht();de.flags|=e,a.memoizedState=Vn(1|t,r,void 0,n===void 0?null:n)}function sl(e,t,r,n){var a=at();n=n===void 0?null:n;var l=void 0;if(je!==null){var o=je.memoizedState;if(l=o.destroy,n!==null&&Po(n,o.deps)){a.memoizedState=Vn(t,r,l,n);return}}de.flags|=e,a.memoizedState=Vn(1|t,r,l,n)}function Vs(e,t){return ja(8390656,8,e,t)}function Lo(e,t){return sl(2048,8,e,t)}function Ku(e,t){return sl(4,2,e,t)}function Xu(e,t){return sl(4,4,e,t)}function Gu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Yu(e,t,r){return r=r!=null?r.concat([e]):null,sl(4,4,Gu.bind(null,t,e),r)}function Io(){}function qu(e,t){var r=at();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Po(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function Ju(e,t){var r=at();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Po(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function Zu(e,t,r){return dr&21?(ft(r,t)||(r=au(),de.lanes|=r,fr|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Be=!0),e.memoizedState=r)}function Zp(e,t){var r=ne;ne=r!==0&&4>r?r:4,e(!0);var n=Al.transition;Al.transition={};try{e(!1),t()}finally{ne=r,Al.transition=n}}function ed(){return at().memoizedState}function em(e,t,r){var n=Qt(e);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},td(e))rd(t,r);else if(r=Mu(e,t,r,n),r!==null){var a=Oe();dt(r,e,n,a),nd(r,t,n)}}function tm(e,t,r){var n=Qt(e),a={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(td(e))rd(t,a);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var o=t.lastRenderedState,c=l(o,r);if(a.hasEagerState=!0,a.eagerState=c,ft(c,o)){var s=t.interleaved;s===null?(a.next=a,No(t)):(a.next=s.next,s.next=a),t.interleaved=a;return}}catch{}finally{}r=Mu(e,t,a,n),r!==null&&(a=Oe(),dt(r,e,n,a),nd(r,t,n))}}function td(e){var t=e.alternate;return e===de||t!==null&&t===de}function rd(e,t){jn=Ha=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function nd(e,t,r){if(r&4194240){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,so(e,r)}}var Ka={readContext:nt,useCallback:Ie,useContext:Ie,useEffect:Ie,useImperativeHandle:Ie,useInsertionEffect:Ie,useLayoutEffect:Ie,useMemo:Ie,useReducer:Ie,useRef:Ie,useState:Ie,useDebugValue:Ie,useDeferredValue:Ie,useTransition:Ie,useMutableSource:Ie,useSyncExternalStore:Ie,useId:Ie,unstable_isNewReconciler:!1},rm={readContext:nt,useCallback:function(e,t){return ht().memoizedState=[e,t===void 0?null:t],e},useContext:nt,useEffect:Vs,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,ja(4194308,4,Gu.bind(null,t,e),r)},useLayoutEffect:function(e,t){return ja(4194308,4,e,t)},useInsertionEffect:function(e,t){return ja(4,2,e,t)},useMemo:function(e,t){var r=ht();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=ht();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=em.bind(null,de,e),[n.memoizedState,e]},useRef:function(e){var t=ht();return e={current:e},t.memoizedState=e},useState:Bs,useDebugValue:Io,useDeferredValue:function(e){return ht().memoizedState=e},useTransition:function(){var e=Bs(!1),t=e[0];return e=Zp.bind(null,e[1]),ht().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var n=de,a=ht();if(se){if(r===void 0)throw Error(T(407));r=r()}else{if(r=t(),Ee===null)throw Error(T(349));dr&30||Uu(n,t,r)}a.memoizedState=r;var l={value:r,getSnapshot:t};return a.queue=l,Vs(Vu.bind(null,n,l,e),[e]),n.flags|=2048,Vn(9,Bu.bind(null,n,l,r,t),void 0,null),r},useId:function(){var e=ht(),t=Ee.identifierPrefix;if(se){var r=Nt,n=kt;r=(n&~(1<<32-ut(n)-1)).toString(32)+r,t=":"+t+"R"+r,r=Un++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=Jp++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},nm={readContext:nt,useCallback:qu,useContext:nt,useEffect:Lo,useImperativeHandle:Yu,useInsertionEffect:Ku,useLayoutEffect:Xu,useMemo:Ju,useReducer:Ul,useRef:Hu,useState:function(){return Ul(Bn)},useDebugValue:Io,useDeferredValue:function(e){var t=at();return Zu(t,je.memoizedState,e)},useTransition:function(){var e=Ul(Bn)[0],t=at().memoizedState;return[e,t]},useMutableSource:$u,useSyncExternalStore:Au,useId:ed,unstable_isNewReconciler:!1},am={readContext:nt,useCallback:qu,useContext:nt,useEffect:Lo,useImperativeHandle:Yu,useInsertionEffect:Ku,useLayoutEffect:Xu,useMemo:Ju,useReducer:Bl,useRef:Hu,useState:function(){return Bl(Bn)},useDebugValue:Io,useDeferredValue:function(e){var t=at();return je===null?t.memoizedState=e:Zu(t,je.memoizedState,e)},useTransition:function(){var e=Bl(Bn)[0],t=at().memoizedState;return[e,t]},useMutableSource:$u,useSyncExternalStore:Au,useId:ed,unstable_isNewReconciler:!1};function ot(e,t){if(e&&e.defaultProps){t=pe({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function _i(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:pe({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var cl={isMounted:function(e){return(e=e._reactInternals)?hr(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var n=Oe(),a=Qt(e),l=jt(n,a);l.payload=t,r!=null&&(l.callback=r),t=Vt(e,l,a),t!==null&&(dt(t,e,a,n),ka(t,e,a))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=Oe(),a=Qt(e),l=jt(n,a);l.tag=1,l.payload=t,r!=null&&(l.callback=r),t=Vt(e,l,a),t!==null&&(dt(t,e,a,n),ka(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=Oe(),n=Qt(e),a=jt(r,n);a.tag=2,t!=null&&(a.callback=t),t=Vt(e,a,n),t!==null&&(dt(t,e,n,r),ka(t,e,n))}};function Ws(e,t,r,n,a,l,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,l,o):t.prototype&&t.prototype.isPureReactComponent?!Dn(r,n)||!Dn(a,l):!0}function ad(e,t,r){var n=!1,a=Gt,l=t.contextType;return typeof l=="object"&&l!==null?l=nt(l):(a=We(t)?cr:De.current,n=t.contextTypes,l=(n=n!=null)?Br(e,a):Gt),t=new t(r,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=cl,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=l),t}function Qs(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&cl.enqueueReplaceState(t,t.state,null)}function Li(e,t,r,n){var a=e.stateNode;a.props=r,a.state=e.memoizedState,a.refs={},jo(e);var l=t.contextType;typeof l=="object"&&l!==null?a.context=nt(l):(l=We(t)?cr:De.current,a.context=Br(e,l)),a.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(_i(e,t,l,r),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&cl.enqueueReplaceState(a,a.state,null),Wa(e,r,a,n),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function Hr(e,t){try{var r="",n=t;do r+=If(n),n=n.return;while(n);var a=r}catch(l){a=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:a,digest:null}}function Vl(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Ii(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var lm=typeof WeakMap=="function"?WeakMap:Map;function ld(e,t,r){r=jt(-1,r),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){Ga||(Ga=!0,Bi=n),Ii(e,t)},r}function id(e,t,r){r=jt(-1,r),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var a=t.value;r.payload=function(){return n(a)},r.callback=function(){Ii(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(r.callback=function(){Ii(e,t),typeof n!="function"&&(Wt===null?Wt=new Set([this]):Wt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),r}function Hs(e,t,r){var n=e.pingCache;if(n===null){n=e.pingCache=new lm;var a=new Set;n.set(t,a)}else a=n.get(t),a===void 0&&(a=new Set,n.set(t,a));a.has(r)||(a.add(r),e=ym.bind(null,e,t,r),t.then(e,e))}function Ks(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Xs(e,t,r,n,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=jt(-1,1),t.tag=2,Vt(r,t,1))),r.lanes|=1),e)}var im=zt.ReactCurrentOwner,Be=!1;function Me(e,t,r,n){t.child=e===null?Du(t,null,r,n):Wr(t,e.child,r,n)}function Gs(e,t,r,n,a){r=r.render;var l=t.ref;return $r(t,a),n=zo(e,t,r,n,l,a),r=_o(),e!==null&&!Be?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Pt(e,t,a)):(se&&r&&vo(t),t.flags|=1,Me(e,t,n,a),t.child)}function Ys(e,t,r,n,a){if(e===null){var l=r.type;return typeof l=="function"&&!Ao(l)&&l.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=l,od(e,t,l,n,a)):(e=Pa(r.type,null,n,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!(e.lanes&a)){var o=l.memoizedProps;if(r=r.compare,r=r!==null?r:Dn,r(o,n)&&e.ref===t.ref)return Pt(e,t,a)}return t.flags|=1,e=Ht(l,n),e.ref=t.ref,e.return=t,t.child=e}function od(e,t,r,n,a){if(e!==null){var l=e.memoizedProps;if(Dn(l,n)&&e.ref===t.ref)if(Be=!1,t.pendingProps=n=l,(e.lanes&a)!==0)e.flags&131072&&(Be=!0);else return t.lanes=e.lanes,Pt(e,t,a)}return Ti(e,t,r,n,a)}function sd(e,t,r){var n=t.pendingProps,a=n.children,l=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},le(Rr,He),He|=r;else{if(!(r&1073741824))return e=l!==null?l.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,le(Rr,He),He|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=l!==null?l.baseLanes:r,le(Rr,He),He|=n}else l!==null?(n=l.baseLanes|r,t.memoizedState=null):n=r,le(Rr,He),He|=n;return Me(e,t,a,r),t.child}function cd(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Ti(e,t,r,n,a){var l=We(r)?cr:De.current;return l=Br(t,l),$r(t,a),r=zo(e,t,r,n,l,a),n=_o(),e!==null&&!Be?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Pt(e,t,a)):(se&&n&&vo(t),t.flags|=1,Me(e,t,r,a),t.child)}function qs(e,t,r,n,a){if(We(r)){var l=!0;$a(t)}else l=!1;if($r(t,a),t.stateNode===null)Sa(e,t),ad(t,r,n),Li(t,r,n,a),n=!0;else if(e===null){var o=t.stateNode,c=t.memoizedProps;o.props=c;var s=o.context,d=r.contextType;typeof d=="object"&&d!==null?d=nt(d):(d=We(r)?cr:De.current,d=Br(t,d));var v=r.getDerivedStateFromProps,p=typeof v=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==n||s!==d)&&Qs(t,o,n,d),Tt=!1;var m=t.memoizedState;o.state=m,Wa(t,n,o,a),s=t.memoizedState,c!==n||m!==s||Ve.current||Tt?(typeof v=="function"&&(_i(t,r,v,n),s=t.memoizedState),(c=Tt||Ws(t,r,c,n,m,s,d))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=s),o.props=n,o.state=s,o.context=d,n=c):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{o=t.stateNode,Ou(e,t),c=t.memoizedProps,d=t.type===t.elementType?c:ot(t.type,c),o.props=d,p=t.pendingProps,m=o.context,s=r.contextType,typeof s=="object"&&s!==null?s=nt(s):(s=We(r)?cr:De.current,s=Br(t,s));var j=r.getDerivedStateFromProps;(v=typeof j=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==p||m!==s)&&Qs(t,o,n,s),Tt=!1,m=t.memoizedState,o.state=m,Wa(t,n,o,a);var y=t.memoizedState;c!==p||m!==y||Ve.current||Tt?(typeof j=="function"&&(_i(t,r,j,n),y=t.memoizedState),(d=Tt||Ws(t,r,d,n,m,y,s)||!1)?(v||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(n,y,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(n,y,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=y),o.props=n,o.state=y,o.context=s,n=d):(typeof o.componentDidUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),n=!1)}return Ri(e,t,r,n,l,a)}function Ri(e,t,r,n,a,l){cd(e,t);var o=(t.flags&128)!==0;if(!n&&!o)return a&&Ms(t,r,!1),Pt(e,t,l);n=t.stateNode,im.current=t;var c=o&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&o?(t.child=Wr(t,e.child,null,l),t.child=Wr(t,null,c,l)):Me(e,t,c,l),t.memoizedState=n.state,a&&Ms(t,r,!0),t.child}function ud(e){var t=e.stateNode;t.pendingContext?Ds(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ds(e,t.context,!1),So(e,t.containerInfo)}function Js(e,t,r,n,a){return Vr(),yo(a),t.flags|=256,Me(e,t,r,n),t.child}var Di={dehydrated:null,treeContext:null,retryLane:0};function Mi(e){return{baseLanes:e,cachePool:null,transitions:null}}function dd(e,t,r){var n=t.pendingProps,a=ue.current,l=!1,o=(t.flags&128)!==0,c;if((c=o)||(c=e!==null&&e.memoizedState===null?!1:(a&2)!==0),c?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),le(ue,a&1),e===null)return Pi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=n.children,e=n.fallback,l?(n=t.mode,l=t.child,o={mode:"hidden",children:o},!(n&1)&&l!==null?(l.childLanes=0,l.pendingProps=o):l=fl(o,n,0,null),e=sr(e,n,r,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=Mi(r),t.memoizedState=Di,e):To(t,o));if(a=e.memoizedState,a!==null&&(c=a.dehydrated,c!==null))return om(e,t,o,n,c,a,r);if(l){l=n.fallback,o=t.mode,a=e.child,c=a.sibling;var s={mode:"hidden",children:n.children};return!(o&1)&&t.child!==a?(n=t.child,n.childLanes=0,n.pendingProps=s,t.deletions=null):(n=Ht(a,s),n.subtreeFlags=a.subtreeFlags&14680064),c!==null?l=Ht(c,l):(l=sr(l,o,r,null),l.flags|=2),l.return=t,n.return=t,n.sibling=l,t.child=n,n=l,l=t.child,o=e.child.memoizedState,o=o===null?Mi(r):{baseLanes:o.baseLanes|r,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=e.childLanes&~r,t.memoizedState=Di,n}return l=e.child,e=l.sibling,n=Ht(l,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=r),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n}function To(e,t){return t=fl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function fa(e,t,r,n){return n!==null&&yo(n),Wr(t,e.child,null,r),e=To(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function om(e,t,r,n,a,l,o){if(r)return t.flags&256?(t.flags&=-257,n=Vl(Error(T(422))),fa(e,t,o,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=n.fallback,a=t.mode,n=fl({mode:"visible",children:n.children},a,0,null),l=sr(l,a,o,null),l.flags|=2,n.return=t,l.return=t,n.sibling=l,t.child=n,t.mode&1&&Wr(t,e.child,null,o),t.child.memoizedState=Mi(o),t.memoizedState=Di,l);if(!(t.mode&1))return fa(e,t,o,null);if(a.data==="$!"){if(n=a.nextSibling&&a.nextSibling.dataset,n)var c=n.dgst;return n=c,l=Error(T(419)),n=Vl(l,n,void 0),fa(e,t,o,n)}if(c=(o&e.childLanes)!==0,Be||c){if(n=Ee,n!==null){switch(o&-o){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(n.suspendedLanes|o)?0:a,a!==0&&a!==l.retryLane&&(l.retryLane=a,Et(e,a),dt(n,e,a,-1))}return $o(),n=Vl(Error(T(421))),fa(e,t,o,n)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=bm.bind(null,e),a._reactRetry=t,null):(e=l.treeContext,Ke=Bt(a.nextSibling),Xe=t,se=!0,ct=null,e!==null&&(Ze[et++]=kt,Ze[et++]=Nt,Ze[et++]=ur,kt=e.id,Nt=e.overflow,ur=t),t=To(t,n.children),t.flags|=4096,t)}function Zs(e,t,r){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),zi(e.return,t,r)}function Wl(e,t,r,n,a){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:a}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=n,l.tail=r,l.tailMode=a)}function fd(e,t,r){var n=t.pendingProps,a=n.revealOrder,l=n.tail;if(Me(e,t,n.children,r),n=ue.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Zs(e,r,t);else if(e.tag===19)Zs(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(le(ue,n),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(r=t.child,a=null;r!==null;)e=r.alternate,e!==null&&Qa(e)===null&&(a=r),r=r.sibling;r=a,r===null?(a=t.child,t.child=null):(a=r.sibling,r.sibling=null),Wl(t,!1,a,r,l);break;case"backwards":for(r=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&Qa(e)===null){t.child=a;break}e=a.sibling,a.sibling=r,r=a,a=e}Wl(t,!0,r,null,l);break;case"together":Wl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Sa(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Pt(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),fr|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(T(153));if(t.child!==null){for(e=t.child,r=Ht(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Ht(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function sm(e,t,r){switch(t.tag){case 3:ud(t),Vr();break;case 5:Fu(t);break;case 1:We(t.type)&&$a(t);break;case 4:So(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,a=t.memoizedProps.value;le(Ba,n._currentValue),n._currentValue=a;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(le(ue,ue.current&1),t.flags|=128,null):r&t.child.childLanes?dd(e,t,r):(le(ue,ue.current&1),e=Pt(e,t,r),e!==null?e.sibling:null);le(ue,ue.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return fd(e,t,r);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),le(ue,ue.current),n)break;return null;case 22:case 23:return t.lanes=0,sd(e,t,r)}return Pt(e,t,r)}var pd,Oi,md,hd;pd=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};Oi=function(){};md=function(e,t,r,n){var a=e.memoizedProps;if(a!==n){e=t.stateNode,ir(xt.current);var l=null;switch(r){case"input":a=li(e,a),n=li(e,n),l=[];break;case"select":a=pe({},a,{value:void 0}),n=pe({},n,{value:void 0}),l=[];break;case"textarea":a=si(e,a),n=si(e,n),l=[];break;default:typeof a.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=Oa)}ui(r,n);var o;r=null;for(d in a)if(!n.hasOwnProperty(d)&&a.hasOwnProperty(d)&&a[d]!=null)if(d==="style"){var c=a[d];for(o in c)c.hasOwnProperty(o)&&(r||(r={}),r[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Pn.hasOwnProperty(d)?l||(l=[]):(l=l||[]).push(d,null));for(d in n){var s=n[d];if(c=a!=null?a[d]:void 0,n.hasOwnProperty(d)&&s!==c&&(s!=null||c!=null))if(d==="style")if(c){for(o in c)!c.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(r||(r={}),r[o]="");for(o in s)s.hasOwnProperty(o)&&c[o]!==s[o]&&(r||(r={}),r[o]=s[o])}else r||(l||(l=[]),l.push(d,r)),r=s;else d==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,c=c?c.__html:void 0,s!=null&&c!==s&&(l=l||[]).push(d,s)):d==="children"?typeof s!="string"&&typeof s!="number"||(l=l||[]).push(d,""+s):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Pn.hasOwnProperty(d)?(s!=null&&d==="onScroll"&&ie("scroll",e),l||c===s||(l=[])):(l=l||[]).push(d,s))}r&&(l=l||[]).push("style",r);var d=l;(t.updateQueue=d)&&(t.flags|=4)}};hd=function(e,t,r,n){r!==n&&(t.flags|=4)};function cn(e,t){if(!se)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function Te(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,n=0;if(t)for(var a=e.child;a!==null;)r|=a.lanes|a.childLanes,n|=a.subtreeFlags&14680064,n|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)r|=a.lanes|a.childLanes,n|=a.subtreeFlags,n|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function cm(e,t,r){var n=t.pendingProps;switch(xo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Te(t),null;case 1:return We(t.type)&&Fa(),Te(t),null;case 3:return n=t.stateNode,Qr(),oe(Ve),oe(De),Eo(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(ua(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ct!==null&&(Qi(ct),ct=null))),Oi(e,t),Te(t),null;case 5:Co(t);var a=ir(An.current);if(r=t.type,e!==null&&t.stateNode!=null)md(e,t,r,n,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(T(166));return Te(t),null}if(e=ir(xt.current),ua(t)){n=t.stateNode,r=t.type;var l=t.memoizedProps;switch(n[gt]=t,n[Fn]=l,e=(t.mode&1)!==0,r){case"dialog":ie("cancel",n),ie("close",n);break;case"iframe":case"object":case"embed":ie("load",n);break;case"video":case"audio":for(a=0;a<xn.length;a++)ie(xn[a],n);break;case"source":ie("error",n);break;case"img":case"image":case"link":ie("error",n),ie("load",n);break;case"details":ie("toggle",n);break;case"input":ss(n,l),ie("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!l.multiple},ie("invalid",n);break;case"textarea":us(n,l),ie("invalid",n)}ui(r,l),a=null;for(var o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="children"?typeof c=="string"?n.textContent!==c&&(l.suppressHydrationWarning!==!0&&ca(n.textContent,c,e),a=["children",c]):typeof c=="number"&&n.textContent!==""+c&&(l.suppressHydrationWarning!==!0&&ca(n.textContent,c,e),a=["children",""+c]):Pn.hasOwnProperty(o)&&c!=null&&o==="onScroll"&&ie("scroll",n)}switch(r){case"input":ta(n),cs(n,l,!0);break;case"textarea":ta(n),ds(n);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(n.onclick=Oa)}n=a,t.updateQueue=n,n!==null&&(t.flags|=4)}else{o=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Vc(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=o.createElement(r,{is:n.is}):(e=o.createElement(r),r==="select"&&(o=e,n.multiple?o.multiple=!0:n.size&&(o.size=n.size))):e=o.createElementNS(e,r),e[gt]=t,e[Fn]=n,pd(e,t,!1,!1),t.stateNode=e;e:{switch(o=di(r,n),r){case"dialog":ie("cancel",e),ie("close",e),a=n;break;case"iframe":case"object":case"embed":ie("load",e),a=n;break;case"video":case"audio":for(a=0;a<xn.length;a++)ie(xn[a],e);a=n;break;case"source":ie("error",e),a=n;break;case"img":case"image":case"link":ie("error",e),ie("load",e),a=n;break;case"details":ie("toggle",e),a=n;break;case"input":ss(e,n),a=li(e,n),ie("invalid",e);break;case"option":a=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},a=pe({},n,{value:void 0}),ie("invalid",e);break;case"textarea":us(e,n),a=si(e,n),ie("invalid",e);break;default:a=n}ui(r,a),c=a;for(l in c)if(c.hasOwnProperty(l)){var s=c[l];l==="style"?Hc(e,s):l==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Wc(e,s)):l==="children"?typeof s=="string"?(r!=="textarea"||s!=="")&&zn(e,s):typeof s=="number"&&zn(e,""+s):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Pn.hasOwnProperty(l)?s!=null&&l==="onScroll"&&ie("scroll",e):s!=null&&ro(e,l,s,o))}switch(r){case"input":ta(e),cs(e,n,!1);break;case"textarea":ta(e),ds(e);break;case"option":n.value!=null&&e.setAttribute("value",""+Xt(n.value));break;case"select":e.multiple=!!n.multiple,l=n.value,l!=null?Dr(e,!!n.multiple,l,!1):n.defaultValue!=null&&Dr(e,!!n.multiple,n.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Oa)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Te(t),null;case 6:if(e&&t.stateNode!=null)hd(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(T(166));if(r=ir(An.current),ir(xt.current),ua(t)){if(n=t.stateNode,r=t.memoizedProps,n[gt]=t,(l=n.nodeValue!==r)&&(e=Xe,e!==null))switch(e.tag){case 3:ca(n.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ca(n.nodeValue,r,(e.mode&1)!==0)}l&&(t.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[gt]=t,t.stateNode=n}return Te(t),null;case 13:if(oe(ue),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(se&&Ke!==null&&t.mode&1&&!(t.flags&128))Tu(),Vr(),t.flags|=98560,l=!1;else if(l=ua(t),n!==null&&n.dehydrated!==null){if(e===null){if(!l)throw Error(T(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(T(317));l[gt]=t}else Vr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Te(t),l=!1}else ct!==null&&(Qi(ct),ct=null),l=!0;if(!l)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||ue.current&1?Se===0&&(Se=3):$o())),t.updateQueue!==null&&(t.flags|=4),Te(t),null);case 4:return Qr(),Oi(e,t),e===null&&Mn(t.stateNode.containerInfo),Te(t),null;case 10:return ko(t.type._context),Te(t),null;case 17:return We(t.type)&&Fa(),Te(t),null;case 19:if(oe(ue),l=t.memoizedState,l===null)return Te(t),null;if(n=(t.flags&128)!==0,o=l.rendering,o===null)if(n)cn(l,!1);else{if(Se!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Qa(e),o!==null){for(t.flags|=128,cn(l,!1),n=o.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=r,r=t.child;r!==null;)l=r,e=n,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,e=o.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return le(ue,ue.current&1|2),t.child}e=e.sibling}l.tail!==null&&ye()>Kr&&(t.flags|=128,n=!0,cn(l,!1),t.lanes=4194304)}else{if(!n)if(e=Qa(o),e!==null){if(t.flags|=128,n=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),cn(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!se)return Te(t),null}else 2*ye()-l.renderingStartTime>Kr&&r!==1073741824&&(t.flags|=128,n=!0,cn(l,!1),t.lanes=4194304);l.isBackwards?(o.sibling=t.child,t.child=o):(r=l.last,r!==null?r.sibling=o:t.child=o,l.last=o)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ye(),t.sibling=null,r=ue.current,le(ue,n?r&1|2:r&1),t):(Te(t),null);case 22:case 23:return Fo(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?He&1073741824&&(Te(t),t.subtreeFlags&6&&(t.flags|=8192)):Te(t),null;case 24:return null;case 25:return null}throw Error(T(156,t.tag))}function um(e,t){switch(xo(t),t.tag){case 1:return We(t.type)&&Fa(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Qr(),oe(Ve),oe(De),Eo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Co(t),null;case 13:if(oe(ue),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(T(340));Vr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return oe(ue),null;case 4:return Qr(),null;case 10:return ko(t.type._context),null;case 22:case 23:return Fo(),null;case 24:return null;default:return null}}var pa=!1,Re=!1,dm=typeof WeakSet=="function"?WeakSet:Set,F=null;function Tr(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){he(e,t,n)}else r.current=null}function Fi(e,t,r){try{r()}catch(n){he(e,t,n)}}var ec=!1;function fm(e,t){if(wi=Ra,e=bu(),go(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var a=n.anchorOffset,l=n.focusNode;n=n.focusOffset;try{r.nodeType,l.nodeType}catch{r=null;break e}var o=0,c=-1,s=-1,d=0,v=0,p=e,m=null;t:for(;;){for(var j;p!==r||a!==0&&p.nodeType!==3||(c=o+a),p!==l||n!==0&&p.nodeType!==3||(s=o+n),p.nodeType===3&&(o+=p.nodeValue.length),(j=p.firstChild)!==null;)m=p,p=j;for(;;){if(p===e)break t;if(m===r&&++d===a&&(c=o),m===l&&++v===n&&(s=o),(j=p.nextSibling)!==null)break;p=m,m=p.parentNode}p=j}r=c===-1||s===-1?null:{start:c,end:s}}else r=null}r=r||{start:0,end:0}}else r=null;for(ki={focusedElem:e,selectionRange:r},Ra=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var S=y.memoizedProps,N=y.memoizedState,f=t.stateNode,u=f.getSnapshotBeforeUpdate(t.elementType===t.type?S:ot(t.type,S),N);f.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(T(163))}}catch(b){he(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return y=ec,ec=!1,y}function Sn(e,t,r){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var a=n=n.next;do{if((a.tag&e)===e){var l=a.destroy;a.destroy=void 0,l!==void 0&&Fi(t,r,l)}a=a.next}while(a!==n)}}function ul(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function $i(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function gd(e){var t=e.alternate;t!==null&&(e.alternate=null,gd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[gt],delete t[Fn],delete t[Si],delete t[Xp],delete t[Gp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function vd(e){return e.tag===5||e.tag===3||e.tag===4}function tc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||vd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ai(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Oa));else if(n!==4&&(e=e.child,e!==null))for(Ai(e,t,r),e=e.sibling;e!==null;)Ai(e,t,r),e=e.sibling}function Ui(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(Ui(e,t,r),e=e.sibling;e!==null;)Ui(e,t,r),e=e.sibling}var Pe=null,st=!1;function Lt(e,t,r){for(r=r.child;r!==null;)xd(e,t,r),r=r.sibling}function xd(e,t,r){if(vt&&typeof vt.onCommitFiberUnmount=="function")try{vt.onCommitFiberUnmount(rl,r)}catch{}switch(r.tag){case 5:Re||Tr(r,t);case 6:var n=Pe,a=st;Pe=null,Lt(e,t,r),Pe=n,st=a,Pe!==null&&(st?(e=Pe,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):Pe.removeChild(r.stateNode));break;case 18:Pe!==null&&(st?(e=Pe,r=r.stateNode,e.nodeType===8?Ol(e.parentNode,r):e.nodeType===1&&Ol(e,r),Tn(e)):Ol(Pe,r.stateNode));break;case 4:n=Pe,a=st,Pe=r.stateNode.containerInfo,st=!0,Lt(e,t,r),Pe=n,st=a;break;case 0:case 11:case 14:case 15:if(!Re&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){a=n=n.next;do{var l=a,o=l.destroy;l=l.tag,o!==void 0&&(l&2||l&4)&&Fi(r,t,o),a=a.next}while(a!==n)}Lt(e,t,r);break;case 1:if(!Re&&(Tr(r,t),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(c){he(r,t,c)}Lt(e,t,r);break;case 21:Lt(e,t,r);break;case 22:r.mode&1?(Re=(n=Re)||r.memoizedState!==null,Lt(e,t,r),Re=n):Lt(e,t,r);break;default:Lt(e,t,r)}}function rc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new dm),t.forEach(function(n){var a=wm.bind(null,e,n);r.has(n)||(r.add(n),n.then(a,a))})}}function lt(e,t){var r=t.deletions;if(r!==null)for(var n=0;n<r.length;n++){var a=r[n];try{var l=e,o=t,c=o;e:for(;c!==null;){switch(c.tag){case 5:Pe=c.stateNode,st=!1;break e;case 3:Pe=c.stateNode.containerInfo,st=!0;break e;case 4:Pe=c.stateNode.containerInfo,st=!0;break e}c=c.return}if(Pe===null)throw Error(T(160));xd(l,o,a),Pe=null,st=!1;var s=a.alternate;s!==null&&(s.return=null),a.return=null}catch(d){he(a,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)yd(t,e),t=t.sibling}function yd(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(lt(t,e),mt(e),n&4){try{Sn(3,e,e.return),ul(3,e)}catch(S){he(e,e.return,S)}try{Sn(5,e,e.return)}catch(S){he(e,e.return,S)}}break;case 1:lt(t,e),mt(e),n&512&&r!==null&&Tr(r,r.return);break;case 5:if(lt(t,e),mt(e),n&512&&r!==null&&Tr(r,r.return),e.flags&32){var a=e.stateNode;try{zn(a,"")}catch(S){he(e,e.return,S)}}if(n&4&&(a=e.stateNode,a!=null)){var l=e.memoizedProps,o=r!==null?r.memoizedProps:l,c=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{c==="input"&&l.type==="radio"&&l.name!=null&&Uc(a,l),di(c,o);var d=di(c,l);for(o=0;o<s.length;o+=2){var v=s[o],p=s[o+1];v==="style"?Hc(a,p):v==="dangerouslySetInnerHTML"?Wc(a,p):v==="children"?zn(a,p):ro(a,v,p,d)}switch(c){case"input":ii(a,l);break;case"textarea":Bc(a,l);break;case"select":var m=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!l.multiple;var j=l.value;j!=null?Dr(a,!!l.multiple,j,!1):m!==!!l.multiple&&(l.defaultValue!=null?Dr(a,!!l.multiple,l.defaultValue,!0):Dr(a,!!l.multiple,l.multiple?[]:"",!1))}a[Fn]=l}catch(S){he(e,e.return,S)}}break;case 6:if(lt(t,e),mt(e),n&4){if(e.stateNode===null)throw Error(T(162));a=e.stateNode,l=e.memoizedProps;try{a.nodeValue=l}catch(S){he(e,e.return,S)}}break;case 3:if(lt(t,e),mt(e),n&4&&r!==null&&r.memoizedState.isDehydrated)try{Tn(t.containerInfo)}catch(S){he(e,e.return,S)}break;case 4:lt(t,e),mt(e);break;case 13:lt(t,e),mt(e),a=e.child,a.flags&8192&&(l=a.memoizedState!==null,a.stateNode.isHidden=l,!l||a.alternate!==null&&a.alternate.memoizedState!==null||(Mo=ye())),n&4&&rc(e);break;case 22:if(v=r!==null&&r.memoizedState!==null,e.mode&1?(Re=(d=Re)||v,lt(t,e),Re=d):lt(t,e),mt(e),n&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!v&&e.mode&1)for(F=e,v=e.child;v!==null;){for(p=F=v;F!==null;){switch(m=F,j=m.child,m.tag){case 0:case 11:case 14:case 15:Sn(4,m,m.return);break;case 1:Tr(m,m.return);var y=m.stateNode;if(typeof y.componentWillUnmount=="function"){n=m,r=m.return;try{t=n,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(S){he(n,r,S)}}break;case 5:Tr(m,m.return);break;case 22:if(m.memoizedState!==null){ac(p);continue}}j!==null?(j.return=m,F=j):ac(p)}v=v.sibling}e:for(v=null,p=e;;){if(p.tag===5){if(v===null){v=p;try{a=p.stateNode,d?(l=a.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(c=p.stateNode,s=p.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,c.style.display=Qc("display",o))}catch(S){he(e,e.return,S)}}}else if(p.tag===6){if(v===null)try{p.stateNode.nodeValue=d?"":p.memoizedProps}catch(S){he(e,e.return,S)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;v===p&&(v=null),p=p.return}v===p&&(v=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:lt(t,e),mt(e),n&4&&rc(e);break;case 21:break;default:lt(t,e),mt(e)}}function mt(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(vd(r)){var n=r;break e}r=r.return}throw Error(T(160))}switch(n.tag){case 5:var a=n.stateNode;n.flags&32&&(zn(a,""),n.flags&=-33);var l=tc(e);Ui(e,l,a);break;case 3:case 4:var o=n.stateNode.containerInfo,c=tc(e);Ai(e,c,o);break;default:throw Error(T(161))}}catch(s){he(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function pm(e,t,r){F=e,bd(e)}function bd(e,t,r){for(var n=(e.mode&1)!==0;F!==null;){var a=F,l=a.child;if(a.tag===22&&n){var o=a.memoizedState!==null||pa;if(!o){var c=a.alternate,s=c!==null&&c.memoizedState!==null||Re;c=pa;var d=Re;if(pa=o,(Re=s)&&!d)for(F=a;F!==null;)o=F,s=o.child,o.tag===22&&o.memoizedState!==null?lc(a):s!==null?(s.return=o,F=s):lc(a);for(;l!==null;)F=l,bd(l),l=l.sibling;F=a,pa=c,Re=d}nc(e)}else a.subtreeFlags&8772&&l!==null?(l.return=a,F=l):nc(e)}}function nc(e){for(;F!==null;){var t=F;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Re||ul(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!Re)if(r===null)n.componentDidMount();else{var a=t.elementType===t.type?r.memoizedProps:ot(t.type,r.memoizedProps);n.componentDidUpdate(a,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&Us(t,l,n);break;case 3:var o=t.updateQueue;if(o!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}Us(t,o,r)}break;case 5:var c=t.stateNode;if(r===null&&t.flags&4){r=c;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&r.focus();break;case"img":s.src&&(r.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var v=d.memoizedState;if(v!==null){var p=v.dehydrated;p!==null&&Tn(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(T(163))}Re||t.flags&512&&$i(t)}catch(m){he(t,t.return,m)}}if(t===e){F=null;break}if(r=t.sibling,r!==null){r.return=t.return,F=r;break}F=t.return}}function ac(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var r=t.sibling;if(r!==null){r.return=t.return,F=r;break}F=t.return}}function lc(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{ul(4,t)}catch(s){he(t,r,s)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var a=t.return;try{n.componentDidMount()}catch(s){he(t,a,s)}}var l=t.return;try{$i(t)}catch(s){he(t,l,s)}break;case 5:var o=t.return;try{$i(t)}catch(s){he(t,o,s)}}}catch(s){he(t,t.return,s)}if(t===e){F=null;break}var c=t.sibling;if(c!==null){c.return=t.return,F=c;break}F=t.return}}var mm=Math.ceil,Xa=zt.ReactCurrentDispatcher,Ro=zt.ReactCurrentOwner,rt=zt.ReactCurrentBatchConfig,ee=0,Ee=null,be=null,ze=0,He=0,Rr=Jt(0),Se=0,Wn=null,fr=0,dl=0,Do=0,Cn=null,Ue=null,Mo=0,Kr=1/0,bt=null,Ga=!1,Bi=null,Wt=null,ma=!1,Ot=null,Ya=0,En=0,Vi=null,Ca=-1,Ea=0;function Oe(){return ee&6?ye():Ca!==-1?Ca:Ca=ye()}function Qt(e){return e.mode&1?ee&2&&ze!==0?ze&-ze:qp.transition!==null?(Ea===0&&(Ea=au()),Ea):(e=ne,e!==0||(e=window.event,e=e===void 0?16:du(e.type)),e):1}function dt(e,t,r,n){if(50<En)throw En=0,Vi=null,Error(T(185));Xn(e,r,n),(!(ee&2)||e!==Ee)&&(e===Ee&&(!(ee&2)&&(dl|=r),Se===4&&Dt(e,ze)),Qe(e,n),r===1&&ee===0&&!(t.mode&1)&&(Kr=ye()+500,ol&&Zt()))}function Qe(e,t){var r=e.callbackNode;qf(e,t);var n=Ta(e,e===Ee?ze:0);if(n===0)r!==null&&ms(r),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(r!=null&&ms(r),t===1)e.tag===0?Yp(ic.bind(null,e)):_u(ic.bind(null,e)),Hp(function(){!(ee&6)&&Zt()}),r=null;else{switch(lu(n)){case 1:r=oo;break;case 4:r=ru;break;case 16:r=Ia;break;case 536870912:r=nu;break;default:r=Ia}r=Pd(r,wd.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function wd(e,t){if(Ca=-1,Ea=0,ee&6)throw Error(T(327));var r=e.callbackNode;if(Ar()&&e.callbackNode!==r)return null;var n=Ta(e,e===Ee?ze:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=qa(e,n);else{t=n;var a=ee;ee|=2;var l=Nd();(Ee!==e||ze!==t)&&(bt=null,Kr=ye()+500,or(e,t));do try{vm();break}catch(c){kd(e,c)}while(!0);wo(),Xa.current=l,ee=a,be!==null?t=0:(Ee=null,ze=0,t=Se)}if(t!==0){if(t===2&&(a=gi(e),a!==0&&(n=a,t=Wi(e,a))),t===1)throw r=Wn,or(e,0),Dt(e,n),Qe(e,ye()),r;if(t===6)Dt(e,n);else{if(a=e.current.alternate,!(n&30)&&!hm(a)&&(t=qa(e,n),t===2&&(l=gi(e),l!==0&&(n=l,t=Wi(e,l))),t===1))throw r=Wn,or(e,0),Dt(e,n),Qe(e,ye()),r;switch(e.finishedWork=a,e.finishedLanes=n,t){case 0:case 1:throw Error(T(345));case 2:nr(e,Ue,bt);break;case 3:if(Dt(e,n),(n&130023424)===n&&(t=Mo+500-ye(),10<t)){if(Ta(e,0)!==0)break;if(a=e.suspendedLanes,(a&n)!==n){Oe(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=ji(nr.bind(null,e,Ue,bt),t);break}nr(e,Ue,bt);break;case 4:if(Dt(e,n),(n&4194240)===n)break;for(t=e.eventTimes,a=-1;0<n;){var o=31-ut(n);l=1<<o,o=t[o],o>a&&(a=o),n&=~l}if(n=a,n=ye()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*mm(n/1960))-n,10<n){e.timeoutHandle=ji(nr.bind(null,e,Ue,bt),n);break}nr(e,Ue,bt);break;case 5:nr(e,Ue,bt);break;default:throw Error(T(329))}}}return Qe(e,ye()),e.callbackNode===r?wd.bind(null,e):null}function Wi(e,t){var r=Cn;return e.current.memoizedState.isDehydrated&&(or(e,t).flags|=256),e=qa(e,t),e!==2&&(t=Ue,Ue=r,t!==null&&Qi(t)),e}function Qi(e){Ue===null?Ue=e:Ue.push.apply(Ue,e)}function hm(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var a=r[n],l=a.getSnapshot;a=a.value;try{if(!ft(l(),a))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Dt(e,t){for(t&=~Do,t&=~dl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-ut(t),n=1<<r;e[r]=-1,t&=~n}}function ic(e){if(ee&6)throw Error(T(327));Ar();var t=Ta(e,0);if(!(t&1))return Qe(e,ye()),null;var r=qa(e,t);if(e.tag!==0&&r===2){var n=gi(e);n!==0&&(t=n,r=Wi(e,n))}if(r===1)throw r=Wn,or(e,0),Dt(e,t),Qe(e,ye()),r;if(r===6)throw Error(T(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,nr(e,Ue,bt),Qe(e,ye()),null}function Oo(e,t){var r=ee;ee|=1;try{return e(t)}finally{ee=r,ee===0&&(Kr=ye()+500,ol&&Zt())}}function pr(e){Ot!==null&&Ot.tag===0&&!(ee&6)&&Ar();var t=ee;ee|=1;var r=rt.transition,n=ne;try{if(rt.transition=null,ne=1,e)return e()}finally{ne=n,rt.transition=r,ee=t,!(ee&6)&&Zt()}}function Fo(){He=Rr.current,oe(Rr)}function or(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,Qp(r)),be!==null)for(r=be.return;r!==null;){var n=r;switch(xo(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&Fa();break;case 3:Qr(),oe(Ve),oe(De),Eo();break;case 5:Co(n);break;case 4:Qr();break;case 13:oe(ue);break;case 19:oe(ue);break;case 10:ko(n.type._context);break;case 22:case 23:Fo()}r=r.return}if(Ee=e,be=e=Ht(e.current,null),ze=He=t,Se=0,Wn=null,Do=dl=fr=0,Ue=Cn=null,lr!==null){for(t=0;t<lr.length;t++)if(r=lr[t],n=r.interleaved,n!==null){r.interleaved=null;var a=n.next,l=r.pending;if(l!==null){var o=l.next;l.next=a,n.next=o}r.pending=n}lr=null}return e}function kd(e,t){do{var r=be;try{if(wo(),Na.current=Ka,Ha){for(var n=de.memoizedState;n!==null;){var a=n.queue;a!==null&&(a.pending=null),n=n.next}Ha=!1}if(dr=0,Ce=je=de=null,jn=!1,Un=0,Ro.current=null,r===null||r.return===null){Se=1,Wn=t,be=null;break}e:{var l=e,o=r.return,c=r,s=t;if(t=ze,c.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var d=s,v=c,p=v.tag;if(!(v.mode&1)&&(p===0||p===11||p===15)){var m=v.alternate;m?(v.updateQueue=m.updateQueue,v.memoizedState=m.memoizedState,v.lanes=m.lanes):(v.updateQueue=null,v.memoizedState=null)}var j=Ks(o);if(j!==null){j.flags&=-257,Xs(j,o,c,l,t),j.mode&1&&Hs(l,d,t),t=j,s=d;var y=t.updateQueue;if(y===null){var S=new Set;S.add(s),t.updateQueue=S}else y.add(s);break e}else{if(!(t&1)){Hs(l,d,t),$o();break e}s=Error(T(426))}}else if(se&&c.mode&1){var N=Ks(o);if(N!==null){!(N.flags&65536)&&(N.flags|=256),Xs(N,o,c,l,t),yo(Hr(s,c));break e}}l=s=Hr(s,c),Se!==4&&(Se=2),Cn===null?Cn=[l]:Cn.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var f=ld(l,s,t);As(l,f);break e;case 1:c=s;var u=l.type,h=l.stateNode;if(!(l.flags&128)&&(typeof u.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Wt===null||!Wt.has(h)))){l.flags|=65536,t&=-t,l.lanes|=t;var b=id(l,c,t);As(l,b);break e}}l=l.return}while(l!==null)}Sd(r)}catch(P){t=P,be===r&&r!==null&&(be=r=r.return);continue}break}while(!0)}function Nd(){var e=Xa.current;return Xa.current=Ka,e===null?Ka:e}function $o(){(Se===0||Se===3||Se===2)&&(Se=4),Ee===null||!(fr&268435455)&&!(dl&268435455)||Dt(Ee,ze)}function qa(e,t){var r=ee;ee|=2;var n=Nd();(Ee!==e||ze!==t)&&(bt=null,or(e,t));do try{gm();break}catch(a){kd(e,a)}while(!0);if(wo(),ee=r,Xa.current=n,be!==null)throw Error(T(261));return Ee=null,ze=0,Se}function gm(){for(;be!==null;)jd(be)}function vm(){for(;be!==null&&!Bf();)jd(be)}function jd(e){var t=Ed(e.alternate,e,He);e.memoizedProps=e.pendingProps,t===null?Sd(e):be=t,Ro.current=null}function Sd(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=um(r,t),r!==null){r.flags&=32767,be=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Se=6,be=null;return}}else if(r=cm(r,t,He),r!==null){be=r;return}if(t=t.sibling,t!==null){be=t;return}be=t=e}while(t!==null);Se===0&&(Se=5)}function nr(e,t,r){var n=ne,a=rt.transition;try{rt.transition=null,ne=1,xm(e,t,r,n)}finally{rt.transition=a,ne=n}return null}function xm(e,t,r,n){do Ar();while(Ot!==null);if(ee&6)throw Error(T(327));r=e.finishedWork;var a=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(T(177));e.callbackNode=null,e.callbackPriority=0;var l=r.lanes|r.childLanes;if(Jf(e,l),e===Ee&&(be=Ee=null,ze=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||ma||(ma=!0,Pd(Ia,function(){return Ar(),null})),l=(r.flags&15990)!==0,r.subtreeFlags&15990||l){l=rt.transition,rt.transition=null;var o=ne;ne=1;var c=ee;ee|=4,Ro.current=null,fm(e,r),yd(r,e),Fp(ki),Ra=!!wi,ki=wi=null,e.current=r,pm(r),Vf(),ee=c,ne=o,rt.transition=l}else e.current=r;if(ma&&(ma=!1,Ot=e,Ya=a),l=e.pendingLanes,l===0&&(Wt=null),Hf(r.stateNode),Qe(e,ye()),t!==null)for(n=e.onRecoverableError,r=0;r<t.length;r++)a=t[r],n(a.value,{componentStack:a.stack,digest:a.digest});if(Ga)throw Ga=!1,e=Bi,Bi=null,e;return Ya&1&&e.tag!==0&&Ar(),l=e.pendingLanes,l&1?e===Vi?En++:(En=0,Vi=e):En=0,Zt(),null}function Ar(){if(Ot!==null){var e=lu(Ya),t=rt.transition,r=ne;try{if(rt.transition=null,ne=16>e?16:e,Ot===null)var n=!1;else{if(e=Ot,Ot=null,Ya=0,ee&6)throw Error(T(331));var a=ee;for(ee|=4,F=e.current;F!==null;){var l=F,o=l.child;if(F.flags&16){var c=l.deletions;if(c!==null){for(var s=0;s<c.length;s++){var d=c[s];for(F=d;F!==null;){var v=F;switch(v.tag){case 0:case 11:case 15:Sn(8,v,l)}var p=v.child;if(p!==null)p.return=v,F=p;else for(;F!==null;){v=F;var m=v.sibling,j=v.return;if(gd(v),v===d){F=null;break}if(m!==null){m.return=j,F=m;break}F=j}}}var y=l.alternate;if(y!==null){var S=y.child;if(S!==null){y.child=null;do{var N=S.sibling;S.sibling=null,S=N}while(S!==null)}}F=l}}if(l.subtreeFlags&2064&&o!==null)o.return=l,F=o;else e:for(;F!==null;){if(l=F,l.flags&2048)switch(l.tag){case 0:case 11:case 15:Sn(9,l,l.return)}var f=l.sibling;if(f!==null){f.return=l.return,F=f;break e}F=l.return}}var u=e.current;for(F=u;F!==null;){o=F;var h=o.child;if(o.subtreeFlags&2064&&h!==null)h.return=o,F=h;else e:for(o=u;F!==null;){if(c=F,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:ul(9,c)}}catch(P){he(c,c.return,P)}if(c===o){F=null;break e}var b=c.sibling;if(b!==null){b.return=c.return,F=b;break e}F=c.return}}if(ee=a,Zt(),vt&&typeof vt.onPostCommitFiberRoot=="function")try{vt.onPostCommitFiberRoot(rl,e)}catch{}n=!0}return n}finally{ne=r,rt.transition=t}}return!1}function oc(e,t,r){t=Hr(r,t),t=ld(e,t,1),e=Vt(e,t,1),t=Oe(),e!==null&&(Xn(e,1,t),Qe(e,t))}function he(e,t,r){if(e.tag===3)oc(e,e,r);else for(;t!==null;){if(t.tag===3){oc(t,e,r);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(Wt===null||!Wt.has(n))){e=Hr(r,e),e=id(t,e,1),t=Vt(t,e,1),e=Oe(),t!==null&&(Xn(t,1,e),Qe(t,e));break}}t=t.return}}function ym(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),t=Oe(),e.pingedLanes|=e.suspendedLanes&r,Ee===e&&(ze&r)===r&&(Se===4||Se===3&&(ze&130023424)===ze&&500>ye()-Mo?or(e,0):Do|=r),Qe(e,t)}function Cd(e,t){t===0&&(e.mode&1?(t=aa,aa<<=1,!(aa&130023424)&&(aa=4194304)):t=1);var r=Oe();e=Et(e,t),e!==null&&(Xn(e,t,r),Qe(e,r))}function bm(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Cd(e,r)}function wm(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,a=e.memoizedState;a!==null&&(r=a.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(T(314))}n!==null&&n.delete(t),Cd(e,r)}var Ed;Ed=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ve.current)Be=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return Be=!1,sm(e,t,r);Be=!!(e.flags&131072)}else Be=!1,se&&t.flags&1048576&&Lu(t,Ua,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;Sa(e,t),e=t.pendingProps;var a=Br(t,De.current);$r(t,r),a=zo(null,t,n,e,a,r);var l=_o();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,We(n)?(l=!0,$a(t)):l=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,jo(t),a.updater=cl,t.stateNode=a,a._reactInternals=t,Li(t,n,e,r),t=Ri(null,t,n,!0,l,r)):(t.tag=0,se&&l&&vo(t),Me(null,t,a,r),t=t.child),t;case 16:n=t.elementType;e:{switch(Sa(e,t),e=t.pendingProps,a=n._init,n=a(n._payload),t.type=n,a=t.tag=Nm(n),e=ot(n,e),a){case 0:t=Ti(null,t,n,e,r);break e;case 1:t=qs(null,t,n,e,r);break e;case 11:t=Gs(null,t,n,e,r);break e;case 14:t=Ys(null,t,n,ot(n.type,e),r);break e}throw Error(T(306,n,""))}return t;case 0:return n=t.type,a=t.pendingProps,a=t.elementType===n?a:ot(n,a),Ti(e,t,n,a,r);case 1:return n=t.type,a=t.pendingProps,a=t.elementType===n?a:ot(n,a),qs(e,t,n,a,r);case 3:e:{if(ud(t),e===null)throw Error(T(387));n=t.pendingProps,l=t.memoizedState,a=l.element,Ou(e,t),Wa(t,n,null,r);var o=t.memoizedState;if(n=o.element,l.isDehydrated)if(l={element:n,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){a=Hr(Error(T(423)),t),t=Js(e,t,n,r,a);break e}else if(n!==a){a=Hr(Error(T(424)),t),t=Js(e,t,n,r,a);break e}else for(Ke=Bt(t.stateNode.containerInfo.firstChild),Xe=t,se=!0,ct=null,r=Du(t,null,n,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(Vr(),n===a){t=Pt(e,t,r);break e}Me(e,t,n,r)}t=t.child}return t;case 5:return Fu(t),e===null&&Pi(t),n=t.type,a=t.pendingProps,l=e!==null?e.memoizedProps:null,o=a.children,Ni(n,a)?o=null:l!==null&&Ni(n,l)&&(t.flags|=32),cd(e,t),Me(e,t,o,r),t.child;case 6:return e===null&&Pi(t),null;case 13:return dd(e,t,r);case 4:return So(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Wr(t,null,n,r):Me(e,t,n,r),t.child;case 11:return n=t.type,a=t.pendingProps,a=t.elementType===n?a:ot(n,a),Gs(e,t,n,a,r);case 7:return Me(e,t,t.pendingProps,r),t.child;case 8:return Me(e,t,t.pendingProps.children,r),t.child;case 12:return Me(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(n=t.type._context,a=t.pendingProps,l=t.memoizedProps,o=a.value,le(Ba,n._currentValue),n._currentValue=o,l!==null)if(ft(l.value,o)){if(l.children===a.children&&!Ve.current){t=Pt(e,t,r);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var c=l.dependencies;if(c!==null){o=l.child;for(var s=c.firstContext;s!==null;){if(s.context===n){if(l.tag===1){s=jt(-1,r&-r),s.tag=2;var d=l.updateQueue;if(d!==null){d=d.shared;var v=d.pending;v===null?s.next=s:(s.next=v.next,v.next=s),d.pending=s}}l.lanes|=r,s=l.alternate,s!==null&&(s.lanes|=r),zi(l.return,r,t),c.lanes|=r;break}s=s.next}}else if(l.tag===10)o=l.type===t.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(T(341));o.lanes|=r,c=o.alternate,c!==null&&(c.lanes|=r),zi(o,r,t),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===t){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}Me(e,t,a.children,r),t=t.child}return t;case 9:return a=t.type,n=t.pendingProps.children,$r(t,r),a=nt(a),n=n(a),t.flags|=1,Me(e,t,n,r),t.child;case 14:return n=t.type,a=ot(n,t.pendingProps),a=ot(n.type,a),Ys(e,t,n,a,r);case 15:return od(e,t,t.type,t.pendingProps,r);case 17:return n=t.type,a=t.pendingProps,a=t.elementType===n?a:ot(n,a),Sa(e,t),t.tag=1,We(n)?(e=!0,$a(t)):e=!1,$r(t,r),ad(t,n,a),Li(t,n,a,r),Ri(null,t,n,!0,e,r);case 19:return fd(e,t,r);case 22:return sd(e,t,r)}throw Error(T(156,t.tag))};function Pd(e,t){return tu(e,t)}function km(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function tt(e,t,r,n){return new km(e,t,r,n)}function Ao(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Nm(e){if(typeof e=="function")return Ao(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ao)return 11;if(e===lo)return 14}return 2}function Ht(e,t){var r=e.alternate;return r===null?(r=tt(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Pa(e,t,r,n,a,l){var o=2;if(n=e,typeof e=="function")Ao(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case jr:return sr(r.children,a,l,t);case no:o=8,a|=8;break;case ti:return e=tt(12,r,t,a|2),e.elementType=ti,e.lanes=l,e;case ri:return e=tt(13,r,t,a),e.elementType=ri,e.lanes=l,e;case ni:return e=tt(19,r,t,a),e.elementType=ni,e.lanes=l,e;case Fc:return fl(r,a,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Mc:o=10;break e;case Oc:o=9;break e;case ao:o=11;break e;case lo:o=14;break e;case It:o=16,n=null;break e}throw Error(T(130,e==null?e:typeof e,""))}return t=tt(o,r,t,a),t.elementType=e,t.type=n,t.lanes=l,t}function sr(e,t,r,n){return e=tt(7,e,n,t),e.lanes=r,e}function fl(e,t,r,n){return e=tt(22,e,n,t),e.elementType=Fc,e.lanes=r,e.stateNode={isHidden:!1},e}function Ql(e,t,r){return e=tt(6,e,null,t),e.lanes=r,e}function Hl(e,t,r){return t=tt(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function jm(e,t,r,n,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Cl(0),this.expirationTimes=Cl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Cl(0),this.identifierPrefix=n,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Uo(e,t,r,n,a,l,o,c,s){return e=new jm(e,t,r,c,s),t===1?(t=1,l===!0&&(t|=8)):t=0,l=tt(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},jo(l),e}function Sm(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Nr,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}function zd(e){if(!e)return Gt;e=e._reactInternals;e:{if(hr(e)!==e||e.tag!==1)throw Error(T(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(We(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(T(171))}if(e.tag===1){var r=e.type;if(We(r))return zu(e,r,t)}return t}function _d(e,t,r,n,a,l,o,c,s){return e=Uo(r,n,!0,e,a,l,o,c,s),e.context=zd(null),r=e.current,n=Oe(),a=Qt(r),l=jt(n,a),l.callback=t??null,Vt(r,l,a),e.current.lanes=a,Xn(e,a,n),Qe(e,n),e}function pl(e,t,r,n){var a=t.current,l=Oe(),o=Qt(a);return r=zd(r),t.context===null?t.context=r:t.pendingContext=r,t=jt(l,o),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=Vt(a,t,o),e!==null&&(dt(e,a,o,l),ka(e,a,o)),o}function Ja(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function sc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Bo(e,t){sc(e,t),(e=e.alternate)&&sc(e,t)}function Cm(){return null}var Ld=typeof reportError=="function"?reportError:function(e){console.error(e)};function Vo(e){this._internalRoot=e}ml.prototype.render=Vo.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(T(409));pl(e,t,null,null)};ml.prototype.unmount=Vo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;pr(function(){pl(null,e,null,null)}),t[Ct]=null}};function ml(e){this._internalRoot=e}ml.prototype.unstable_scheduleHydration=function(e){if(e){var t=su();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Rt.length&&t!==0&&t<Rt[r].priority;r++);Rt.splice(r,0,e),r===0&&uu(e)}};function Wo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function hl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function cc(){}function Em(e,t,r,n,a){if(a){if(typeof n=="function"){var l=n;n=function(){var d=Ja(o);l.call(d)}}var o=_d(t,n,e,0,null,!1,!1,"",cc);return e._reactRootContainer=o,e[Ct]=o.current,Mn(e.nodeType===8?e.parentNode:e),pr(),o}for(;a=e.lastChild;)e.removeChild(a);if(typeof n=="function"){var c=n;n=function(){var d=Ja(s);c.call(d)}}var s=Uo(e,0,!1,null,null,!1,!1,"",cc);return e._reactRootContainer=s,e[Ct]=s.current,Mn(e.nodeType===8?e.parentNode:e),pr(function(){pl(t,s,r,n)}),s}function gl(e,t,r,n,a){var l=r._reactRootContainer;if(l){var o=l;if(typeof a=="function"){var c=a;a=function(){var s=Ja(o);c.call(s)}}pl(t,o,e,a)}else o=Em(r,t,e,a,n);return Ja(o)}iu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=vn(t.pendingLanes);r!==0&&(so(t,r|1),Qe(t,ye()),!(ee&6)&&(Kr=ye()+500,Zt()))}break;case 13:pr(function(){var n=Et(e,1);if(n!==null){var a=Oe();dt(n,e,1,a)}}),Bo(e,1)}};co=function(e){if(e.tag===13){var t=Et(e,134217728);if(t!==null){var r=Oe();dt(t,e,134217728,r)}Bo(e,134217728)}};ou=function(e){if(e.tag===13){var t=Qt(e),r=Et(e,t);if(r!==null){var n=Oe();dt(r,e,t,n)}Bo(e,t)}};su=function(){return ne};cu=function(e,t){var r=ne;try{return ne=e,t()}finally{ne=r}};pi=function(e,t,r){switch(t){case"input":if(ii(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var a=il(n);if(!a)throw Error(T(90));Ac(n),ii(n,a)}}}break;case"textarea":Bc(e,r);break;case"select":t=r.value,t!=null&&Dr(e,!!r.multiple,t,!1)}};Gc=Oo;Yc=pr;var Pm={usingClientEntryPoint:!1,Events:[Yn,Pr,il,Kc,Xc,Oo]},un={findFiberByHostInstance:ar,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},zm={bundleType:un.bundleType,version:un.version,rendererPackageName:un.rendererPackageName,rendererConfig:un.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:zt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Zc(e),e===null?null:e.stateNode},findFiberByHostInstance:un.findFiberByHostInstance||Cm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ha=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ha.isDisabled&&ha.supportsFiber)try{rl=ha.inject(zm),vt=ha}catch{}}Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Pm;Ye.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Wo(t))throw Error(T(200));return Sm(e,t,null,r)};Ye.createRoot=function(e,t){if(!Wo(e))throw Error(T(299));var r=!1,n="",a=Ld;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Uo(e,1,!1,null,null,r,!1,n,a),e[Ct]=t.current,Mn(e.nodeType===8?e.parentNode:e),new Vo(t)};Ye.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(T(188)):(e=Object.keys(e).join(","),Error(T(268,e)));return e=Zc(t),e=e===null?null:e.stateNode,e};Ye.flushSync=function(e){return pr(e)};Ye.hydrate=function(e,t,r){if(!hl(t))throw Error(T(200));return gl(null,e,t,!0,r)};Ye.hydrateRoot=function(e,t,r){if(!Wo(e))throw Error(T(405));var n=r!=null&&r.hydratedSources||null,a=!1,l="",o=Ld;if(r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(l=r.identifierPrefix),r.onRecoverableError!==void 0&&(o=r.onRecoverableError)),t=_d(t,null,e,1,r??null,a,!1,l,o),e[Ct]=t.current,Mn(e),n)for(e=0;e<n.length;e++)r=n[e],a=r._getVersion,a=a(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,a]:t.mutableSourceEagerHydrationData.push(r,a);return new ml(t)};Ye.render=function(e,t,r){if(!hl(t))throw Error(T(200));return gl(null,e,t,!1,r)};Ye.unmountComponentAtNode=function(e){if(!hl(e))throw Error(T(40));return e._reactRootContainer?(pr(function(){gl(null,null,e,!1,function(){e._reactRootContainer=null,e[Ct]=null})}),!0):!1};Ye.unstable_batchedUpdates=Oo;Ye.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!hl(r))throw Error(T(200));if(e==null||e._reactInternals===void 0)throw Error(T(38));return gl(e,t,r,!1,n)};Ye.version="18.3.1-next-f1338f8080-20240426";function Id(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Id)}catch(e){console.error(e)}}Id(),Ic.exports=Ye;var _m=Ic.exports,Td,uc=_m;Td=uc.createRoot,uc.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Qn(){return Qn=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Qn.apply(this,arguments)}var Ft;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Ft||(Ft={}));const dc="popstate";function Lm(e){e===void 0&&(e={});function t(n,a){let{pathname:l,search:o,hash:c}=n.location;return Hi("",{pathname:l,search:o,hash:c},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function r(n,a){return typeof a=="string"?a:Za(a)}return Tm(t,r,null,e)}function fe(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Qo(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Im(){return Math.random().toString(36).substr(2,8)}function fc(e,t){return{usr:e.state,key:e.key,idx:t}}function Hi(e,t,r,n){return r===void 0&&(r=null),Qn({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Jr(t):t,{state:r,key:t&&t.key||n||Im()})}function Za(e){let{pathname:t="/",search:r="",hash:n=""}=e;return r&&r!=="?"&&(t+=r.charAt(0)==="?"?r:"?"+r),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Jr(e){let t={};if(e){let r=e.indexOf("#");r>=0&&(t.hash=e.substr(r),e=e.substr(0,r));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}function Tm(e,t,r,n){n===void 0&&(n={});let{window:a=document.defaultView,v5Compat:l=!1}=n,o=a.history,c=Ft.Pop,s=null,d=v();d==null&&(d=0,o.replaceState(Qn({},o.state,{idx:d}),""));function v(){return(o.state||{idx:null}).idx}function p(){c=Ft.Pop;let N=v(),f=N==null?null:N-d;d=N,s&&s({action:c,location:S.location,delta:f})}function m(N,f){c=Ft.Push;let u=Hi(S.location,N,f);d=v()+1;let h=fc(u,d),b=S.createHref(u);try{o.pushState(h,"",b)}catch(P){if(P instanceof DOMException&&P.name==="DataCloneError")throw P;a.location.assign(b)}l&&s&&s({action:c,location:S.location,delta:1})}function j(N,f){c=Ft.Replace;let u=Hi(S.location,N,f);d=v();let h=fc(u,d),b=S.createHref(u);o.replaceState(h,"",b),l&&s&&s({action:c,location:S.location,delta:0})}function y(N){let f=a.location.origin!=="null"?a.location.origin:a.location.href,u=typeof N=="string"?N:Za(N);return u=u.replace(/ $/,"%20"),fe(f,"No window.location.(origin|href) available to create URL for href: "+u),new URL(u,f)}let S={get action(){return c},get location(){return e(a,o)},listen(N){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(dc,p),s=N,()=>{a.removeEventListener(dc,p),s=null}},createHref(N){return t(a,N)},createURL:y,encodeLocation(N){let f=y(N);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:m,replace:j,go(N){return o.go(N)}};return S}var pc;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(pc||(pc={}));function Rm(e,t,r){return r===void 0&&(r="/"),Dm(e,t,r)}function Dm(e,t,r,n){let a=typeof t=="string"?Jr(t):t,l=Xr(a.pathname||"/",r);if(l==null)return null;let o=Rd(e);Mm(o);let c=null;for(let s=0;c==null&&s<o.length;++s){let d=Km(l);c=Qm(o[s],d)}return c}function Rd(e,t,r,n){t===void 0&&(t=[]),r===void 0&&(r=[]),n===void 0&&(n="");let a=(l,o,c)=>{let s={relativePath:c===void 0?l.path||"":c,caseSensitive:l.caseSensitive===!0,childrenIndex:o,route:l};s.relativePath.startsWith("/")&&(fe(s.relativePath.startsWith(n),'Absolute route path "'+s.relativePath+'" nested under path '+('"'+n+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),s.relativePath=s.relativePath.slice(n.length));let d=Kt([n,s.relativePath]),v=r.concat(s);l.children&&l.children.length>0&&(fe(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),Rd(l.children,t,v,d)),!(l.path==null&&!l.index)&&t.push({path:d,score:Vm(d,l.index),routesMeta:v})};return e.forEach((l,o)=>{var c;if(l.path===""||!((c=l.path)!=null&&c.includes("?")))a(l,o);else for(let s of Dd(l.path))a(l,o,s)}),t}function Dd(e){let t=e.split("/");if(t.length===0)return[];let[r,...n]=t,a=r.endsWith("?"),l=r.replace(/\?$/,"");if(n.length===0)return a?[l,""]:[l];let o=Dd(n.join("/")),c=[];return c.push(...o.map(s=>s===""?l:[l,s].join("/"))),a&&c.push(...o),c.map(s=>e.startsWith("/")&&s===""?"/":s)}function Mm(e){e.sort((t,r)=>t.score!==r.score?r.score-t.score:Wm(t.routesMeta.map(n=>n.childrenIndex),r.routesMeta.map(n=>n.childrenIndex)))}const Om=/^:[\w-]+$/,Fm=3,$m=2,Am=1,Um=10,Bm=-2,mc=e=>e==="*";function Vm(e,t){let r=e.split("/"),n=r.length;return r.some(mc)&&(n+=Bm),t&&(n+=$m),r.filter(a=>!mc(a)).reduce((a,l)=>a+(Om.test(l)?Fm:l===""?Am:Um),n)}function Wm(e,t){return e.length===t.length&&e.slice(0,-1).every((n,a)=>n===t[a])?e[e.length-1]-t[t.length-1]:0}function Qm(e,t,r){let{routesMeta:n}=e,a={},l="/",o=[];for(let c=0;c<n.length;++c){let s=n[c],d=c===n.length-1,v=l==="/"?t:t.slice(l.length)||"/",p=Ki({path:s.relativePath,caseSensitive:s.caseSensitive,end:d},v),m=s.route;if(!p)return null;Object.assign(a,p.params),o.push({params:a,pathname:Kt([l,p.pathname]),pathnameBase:Jm(Kt([l,p.pathnameBase])),route:m}),p.pathnameBase!=="/"&&(l=Kt([l,p.pathnameBase]))}return o}function Ki(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,n]=Hm(e.path,e.caseSensitive,e.end),a=t.match(r);if(!a)return null;let l=a[0],o=l.replace(/(.)\/+$/,"$1"),c=a.slice(1);return{params:n.reduce((d,v,p)=>{let{paramName:m,isOptional:j}=v;if(m==="*"){let S=c[p]||"";o=l.slice(0,l.length-S.length).replace(/(.)\/+$/,"$1")}const y=c[p];return j&&!y?d[m]=void 0:d[m]=(y||"").replace(/%2F/g,"/"),d},{}),pathname:l,pathnameBase:o,pattern:e}}function Hm(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!0),Qo(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let n=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,c,s)=>(n.push({paramName:c,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(n.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),n]}function Km(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Qo(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Xr(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let r=t.endsWith("/")?t.length-1:t.length,n=e.charAt(r);return n&&n!=="/"?null:e.slice(r)||"/"}const Xm=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Gm=e=>Xm.test(e);function Ym(e,t){t===void 0&&(t="/");let{pathname:r,search:n="",hash:a=""}=typeof e=="string"?Jr(e):e,l;if(r)if(Gm(r))l=r;else{if(r.includes("//")){let o=r;r=r.replace(/\/\/+/g,"/"),Qo(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+r))}r.startsWith("/")?l=hc(r.substring(1),"/"):l=hc(r,t)}else l=t;return{pathname:l,search:Zm(n),hash:eh(a)}}function hc(e,t){let r=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?r.length>1&&r.pop():a!=="."&&r.push(a)}),r.length>1?r.join("/"):"/"}function Kl(e,t,r,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function qm(e){return e.filter((t,r)=>r===0||t.route.path&&t.route.path.length>0)}function Ho(e,t){let r=qm(e);return t?r.map((n,a)=>a===r.length-1?n.pathname:n.pathnameBase):r.map(n=>n.pathnameBase)}function Ko(e,t,r,n){n===void 0&&(n=!1);let a;typeof e=="string"?a=Jr(e):(a=Qn({},e),fe(!a.pathname||!a.pathname.includes("?"),Kl("?","pathname","search",a)),fe(!a.pathname||!a.pathname.includes("#"),Kl("#","pathname","hash",a)),fe(!a.search||!a.search.includes("#"),Kl("#","search","hash",a)));let l=e===""||a.pathname==="",o=l?"/":a.pathname,c;if(o==null)c=r;else{let p=t.length-1;if(!n&&o.startsWith("..")){let m=o.split("/");for(;m[0]==="..";)m.shift(),p-=1;a.pathname=m.join("/")}c=p>=0?t[p]:"/"}let s=Ym(a,c),d=o&&o!=="/"&&o.endsWith("/"),v=(l||o===".")&&r.endsWith("/");return!s.pathname.endsWith("/")&&(d||v)&&(s.pathname+="/"),s}const Kt=e=>e.join("/").replace(/\/\/+/g,"/"),Jm=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Zm=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,eh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function th(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Md=["post","put","patch","delete"];new Set(Md);const rh=["get",...Md];new Set(rh);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Hn(){return Hn=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Hn.apply(this,arguments)}const vl=x.createContext(null),Od=x.createContext(null),_t=x.createContext(null),xl=x.createContext(null),er=x.createContext({outlet:null,matches:[],isDataRoute:!1}),Fd=x.createContext(null);function nh(e,t){let{relative:r}=t===void 0?{}:t;Zr()||fe(!1);let{basename:n,navigator:a}=x.useContext(_t),{hash:l,pathname:o,search:c}=yl(e,{relative:r}),s=o;return n!=="/"&&(s=o==="/"?n:Kt([n,o])),a.createHref({pathname:s,search:c,hash:l})}function Zr(){return x.useContext(xl)!=null}function en(){return Zr()||fe(!1),x.useContext(xl).location}function $d(e){x.useContext(_t).static||x.useLayoutEffect(e)}function Ad(){let{isDataRoute:e}=x.useContext(er);return e?gh():ah()}function ah(){Zr()||fe(!1);let e=x.useContext(vl),{basename:t,future:r,navigator:n}=x.useContext(_t),{matches:a}=x.useContext(er),{pathname:l}=en(),o=JSON.stringify(Ho(a,r.v7_relativeSplatPath)),c=x.useRef(!1);return $d(()=>{c.current=!0}),x.useCallback(function(d,v){if(v===void 0&&(v={}),!c.current)return;if(typeof d=="number"){n.go(d);return}let p=Ko(d,JSON.parse(o),l,v.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:Kt([t,p.pathname])),(v.replace?n.replace:n.push)(p,v.state,v)},[t,n,o,l,e])}function yl(e,t){let{relative:r}=t===void 0?{}:t,{future:n}=x.useContext(_t),{matches:a}=x.useContext(er),{pathname:l}=en(),o=JSON.stringify(Ho(a,n.v7_relativeSplatPath));return x.useMemo(()=>Ko(e,JSON.parse(o),l,r==="path"),[e,o,l,r])}function lh(e,t){return ih(e,t)}function ih(e,t,r,n){Zr()||fe(!1);let{navigator:a}=x.useContext(_t),{matches:l}=x.useContext(er),o=l[l.length-1],c=o?o.params:{};o&&o.pathname;let s=o?o.pathnameBase:"/";o&&o.route;let d=en(),v;if(t){var p;let N=typeof t=="string"?Jr(t):t;s==="/"||(p=N.pathname)!=null&&p.startsWith(s)||fe(!1),v=N}else v=d;let m=v.pathname||"/",j=m;if(s!=="/"){let N=s.replace(/^\//,"").split("/");j="/"+m.replace(/^\//,"").split("/").slice(N.length).join("/")}let y=Rm(e,{pathname:j}),S=dh(y&&y.map(N=>Object.assign({},N,{params:Object.assign({},c,N.params),pathname:Kt([s,a.encodeLocation?a.encodeLocation(N.pathname).pathname:N.pathname]),pathnameBase:N.pathnameBase==="/"?s:Kt([s,a.encodeLocation?a.encodeLocation(N.pathnameBase).pathname:N.pathnameBase])})),l,r,n);return t&&S?x.createElement(xl.Provider,{value:{location:Hn({pathname:"/",search:"",hash:"",state:null,key:"default"},v),navigationType:Ft.Pop}},S):S}function oh(){let e=hh(),t=th(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return x.createElement(x.Fragment,null,x.createElement("h2",null,"Unexpected Application Error!"),x.createElement("h3",{style:{fontStyle:"italic"}},t),r?x.createElement("pre",{style:a},r):null,null)}const sh=x.createElement(oh,null);class ch extends x.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error!==void 0?x.createElement(er.Provider,{value:this.props.routeContext},x.createElement(Fd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function uh(e){let{routeContext:t,match:r,children:n}=e,a=x.useContext(vl);return a&&a.static&&a.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=r.route.id),x.createElement(er.Provider,{value:t},n)}function dh(e,t,r,n){var a;if(t===void 0&&(t=[]),r===void 0&&(r=null),n===void 0&&(n=null),e==null){var l;if(!r)return null;if(r.errors)e=r.matches;else if((l=n)!=null&&l.v7_partialHydration&&t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let o=e,c=(a=r)==null?void 0:a.errors;if(c!=null){let v=o.findIndex(p=>p.route.id&&(c==null?void 0:c[p.route.id])!==void 0);v>=0||fe(!1),o=o.slice(0,Math.min(o.length,v+1))}let s=!1,d=-1;if(r&&n&&n.v7_partialHydration)for(let v=0;v<o.length;v++){let p=o[v];if((p.route.HydrateFallback||p.route.hydrateFallbackElement)&&(d=v),p.route.id){let{loaderData:m,errors:j}=r,y=p.route.loader&&m[p.route.id]===void 0&&(!j||j[p.route.id]===void 0);if(p.route.lazy||y){s=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((v,p,m)=>{let j,y=!1,S=null,N=null;r&&(j=c&&p.route.id?c[p.route.id]:void 0,S=p.route.errorElement||sh,s&&(d<0&&m===0?(vh("route-fallback"),y=!0,N=null):d===m&&(y=!0,N=p.route.hydrateFallbackElement||null)));let f=t.concat(o.slice(0,m+1)),u=()=>{let h;return j?h=S:y?h=N:p.route.Component?h=x.createElement(p.route.Component,null):p.route.element?h=p.route.element:h=v,x.createElement(uh,{match:p,routeContext:{outlet:v,matches:f,isDataRoute:r!=null},children:h})};return r&&(p.route.ErrorBoundary||p.route.errorElement||m===0)?x.createElement(ch,{location:r.location,revalidation:r.revalidation,component:S,error:j,children:u(),routeContext:{outlet:null,matches:f,isDataRoute:!0}}):u()},null)}var Ud=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Ud||{}),Bd=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Bd||{});function fh(e){let t=x.useContext(vl);return t||fe(!1),t}function ph(e){let t=x.useContext(Od);return t||fe(!1),t}function mh(e){let t=x.useContext(er);return t||fe(!1),t}function Vd(e){let t=mh(),r=t.matches[t.matches.length-1];return r.route.id||fe(!1),r.route.id}function hh(){var e;let t=x.useContext(Fd),r=ph(),n=Vd();return t!==void 0?t:(e=r.errors)==null?void 0:e[n]}function gh(){let{router:e}=fh(Ud.UseNavigateStable),t=Vd(Bd.UseNavigateStable),r=x.useRef(!1);return $d(()=>{r.current=!0}),x.useCallback(function(a,l){l===void 0&&(l={}),r.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,Hn({fromRouteId:t},l)))},[e,t])}const gc={};function vh(e,t,r){gc[e]||(gc[e]=!0)}function xh(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function yh(e){let{to:t,replace:r,state:n,relative:a}=e;Zr()||fe(!1);let{future:l,static:o}=x.useContext(_t),{matches:c}=x.useContext(er),{pathname:s}=en(),d=Ad(),v=Ko(t,Ho(c,l.v7_relativeSplatPath),s,a==="path"),p=JSON.stringify(v);return x.useEffect(()=>d(JSON.parse(p),{replace:r,state:n,relative:a}),[d,p,a,r,n]),null}function yt(e){fe(!1)}function bh(e){let{basename:t="/",children:r=null,location:n,navigationType:a=Ft.Pop,navigator:l,static:o=!1,future:c}=e;Zr()&&fe(!1);let s=t.replace(/^\/*/,"/"),d=x.useMemo(()=>({basename:s,navigator:l,static:o,future:Hn({v7_relativeSplatPath:!1},c)}),[s,c,l,o]);typeof n=="string"&&(n=Jr(n));let{pathname:v="/",search:p="",hash:m="",state:j=null,key:y="default"}=n,S=x.useMemo(()=>{let N=Xr(v,s);return N==null?null:{location:{pathname:N,search:p,hash:m,state:j,key:y},navigationType:a}},[s,v,p,m,j,y,a]);return S==null?null:x.createElement(_t.Provider,{value:d},x.createElement(xl.Provider,{children:r,value:S}))}function wh(e){let{children:t,location:r}=e;return lh(Xi(t),r)}new Promise(()=>{});function Xi(e,t){t===void 0&&(t=[]);let r=[];return x.Children.forEach(e,(n,a)=>{if(!x.isValidElement(n))return;let l=[...t,a];if(n.type===x.Fragment){r.push.apply(r,Xi(n.props.children,l));return}n.type!==yt&&fe(!1),!n.props.index||!n.props.children||fe(!1);let o={id:n.props.id||l.join("-"),caseSensitive:n.props.caseSensitive,element:n.props.element,Component:n.props.Component,index:n.props.index,path:n.props.path,loader:n.props.loader,action:n.props.action,errorElement:n.props.errorElement,ErrorBoundary:n.props.ErrorBoundary,hasErrorBoundary:n.props.ErrorBoundary!=null||n.props.errorElement!=null,shouldRevalidate:n.props.shouldRevalidate,handle:n.props.handle,lazy:n.props.lazy};n.props.children&&(o.children=Xi(n.props.children,l)),r.push(o)}),r}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function el(){return el=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},el.apply(this,arguments)}function Wd(e,t){if(e==null)return{};var r={},n=Object.keys(e),a,l;for(l=0;l<n.length;l++)a=n[l],!(t.indexOf(a)>=0)&&(r[a]=e[a]);return r}function kh(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Nh(e,t){return e.button===0&&(!t||t==="_self")&&!kh(e)}const jh=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Sh=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],Ch="6";try{window.__reactRouterVersion=Ch}catch{}const Eh=x.createContext({isTransitioning:!1}),Ph="startTransition",vc=yf[Ph];function zh(e){let{basename:t,children:r,future:n,window:a}=e,l=x.useRef();l.current==null&&(l.current=Lm({window:a,v5Compat:!0}));let o=l.current,[c,s]=x.useState({action:o.action,location:o.location}),{v7_startTransition:d}=n||{},v=x.useCallback(p=>{d&&vc?vc(()=>s(p)):s(p)},[s,d]);return x.useLayoutEffect(()=>o.listen(v),[o,v]),x.useEffect(()=>xh(n),[n]),x.createElement(bh,{basename:t,children:r,location:c.location,navigationType:c.action,navigator:o,future:n})}const _h=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Lh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Qd=x.forwardRef(function(t,r){let{onClick:n,relative:a,reloadDocument:l,replace:o,state:c,target:s,to:d,preventScrollReset:v,viewTransition:p}=t,m=Wd(t,jh),{basename:j}=x.useContext(_t),y,S=!1;if(typeof d=="string"&&Lh.test(d)&&(y=d,_h))try{let h=new URL(window.location.href),b=d.startsWith("//")?new URL(h.protocol+d):new URL(d),P=Xr(b.pathname,j);b.origin===h.origin&&P!=null?d=P+b.search+b.hash:S=!0}catch{}let N=nh(d,{relative:a}),f=Rh(d,{replace:o,state:c,target:s,preventScrollReset:v,relative:a,viewTransition:p});function u(h){n&&n(h),h.defaultPrevented||f(h)}return x.createElement("a",el({},m,{href:y||N,onClick:S||l?n:u,ref:r,target:s}))}),Ih=x.forwardRef(function(t,r){let{"aria-current":n="page",caseSensitive:a=!1,className:l="",end:o=!1,style:c,to:s,viewTransition:d,children:v}=t,p=Wd(t,Sh),m=yl(s,{relative:p.relative}),j=en(),y=x.useContext(Od),{navigator:S,basename:N}=x.useContext(_t),f=y!=null&&Dh(m)&&d===!0,u=S.encodeLocation?S.encodeLocation(m).pathname:m.pathname,h=j.pathname,b=y&&y.navigation&&y.navigation.location?y.navigation.location.pathname:null;a||(h=h.toLowerCase(),b=b?b.toLowerCase():null,u=u.toLowerCase()),b&&N&&(b=Xr(b,N)||b);const P=u!=="/"&&u.endsWith("/")?u.length-1:u.length;let _=h===u||!o&&h.startsWith(u)&&h.charAt(P)==="/",D=b!=null&&(b===u||!o&&b.startsWith(u)&&b.charAt(u.length)==="/"),R={isActive:_,isPending:D,isTransitioning:f},B=_?n:void 0,I;typeof l=="function"?I=l(R):I=[l,_?"active":null,D?"pending":null,f?"transitioning":null].filter(Boolean).join(" ");let G=typeof c=="function"?c(R):c;return x.createElement(Qd,el({},p,{"aria-current":B,className:I,ref:r,style:G,to:s,viewTransition:d}),typeof v=="function"?v(R):v)});var Gi;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Gi||(Gi={}));var xc;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(xc||(xc={}));function Th(e){let t=x.useContext(vl);return t||fe(!1),t}function Rh(e,t){let{target:r,replace:n,state:a,preventScrollReset:l,relative:o,viewTransition:c}=t===void 0?{}:t,s=Ad(),d=en(),v=yl(e,{relative:o});return x.useCallback(p=>{if(Nh(p,r)){p.preventDefault();let m=n!==void 0?n:Za(d)===Za(v);s(e,{replace:m,state:a,preventScrollReset:l,relative:o,viewTransition:c})}},[d,s,v,n,a,r,e,l,o,c])}function Dh(e,t){t===void 0&&(t={});let r=x.useContext(Eh);r==null&&fe(!1);let{basename:n}=Th(Gi.useViewTransitionState),a=yl(e,{relative:t.relative});if(!r.isTransitioning)return!1;let l=Xr(r.currentLocation.pathname,n)||r.currentLocation.pathname,o=Xr(r.nextLocation.pathname,n)||r.nextLocation.pathname;return Ki(a.pathname,o)!=null||Ki(a.pathname,l)!=null}const Hd=x.createContext(),yc="carservice-theme";function Mh({children:e}){const[t,r]=x.useState(()=>localStorage.getItem(yc)||"light");x.useEffect(()=>{document.documentElement.setAttribute("data-theme",t),localStorage.setItem(yc,t)},[t]);const n=x.useMemo(()=>({theme:t,toggleTheme:()=>r(a=>a==="light"?"dark":"light")}),[t]);return i.jsx(Hd.Provider,{value:n,children:e})}function Oh(){return x.useContext(Hd)}function Fh(){const{theme:e,toggleTheme:t}=Oh();return i.jsx("button",{className:"btn btn-ghost",onClick:t,type:"button",children:e==="light"?"Тёмная тема":"Светлая тема"})}const $h=[{to:"/clients",label:"Клиенты"},{to:"/cars",label:"Автомобили"},{to:"/orders",label:"Заказы"},{to:"/services",label:"Услуги"},{to:"/mechanics",label:"Механики"},{to:"/spares",label:"Запчасти"},{to:"/",label:"Статистика"}];function Ah({children:e}){return i.jsxs("div",{className:"app-shell",children:[i.jsxs("header",{className:"topbar",children:[i.jsxs("div",{className:"brand",children:[i.jsx("span",{className:"brand-mark",children:"TorqueLine"}),i.jsx("span",{className:"brand-sub",children:"Панель автосервиса"})]}),i.jsx(Fh,{})]}),i.jsx("nav",{className:"nav-pills",children:$h.map(t=>i.jsx(Ih,{to:t.to,end:t.to==="/",className:({isActive:r})=>`nav-pill ${r?"active":""}`,children:t.label},t.to))}),i.jsx("main",{className:"page",children:e})]})}const Xo={"Content-Type":"application/json"};async function Jn(e){const t=e.headers.get("content-type"),n=t&&t.includes("application/json")?await e.json():await e.text();if(!e.ok){const a=typeof n=="string"?n:(n==null?void 0:n.message)||"Request failed";throw new Error(a)}return n}async function ce(e){const t=await fetch(e);return Jn(t)}async function it(e,t){const r=await fetch(e,{method:"POST",headers:Xo,body:JSON.stringify(t)});return Jn(r)}async function br(e,t){const r=await fetch(e,{method:"PUT",headers:Xo,body:JSON.stringify(t)});return Jn(r)}async function dn(e,t=null){const r=await fetch(e,{method:"PATCH",headers:t?Xo:void 0,body:t?JSON.stringify(t):void 0});return Jn(r)}async function wr(e){const t=await fetch(e,{method:"DELETE"});return t.status===204?null:Jn(t)}const q={clients:{list:(e={})=>{const t=new URLSearchParams(e).toString();return ce(`/api/clients${t?`?${t}`:""}`)},byId:e=>ce(`/api/clients/${e}`),create:e=>it("/api/clients",e),update:(e,t)=>br(`/api/clients/${e}`,t),patch:(e,t)=>dn(`/api/clients/${e}`,t),remove:e=>wr(`/api/clients/${e}`),testWithoutTx:e=>it("/api/clients/test-without-transaction",e),testWithTx:e=>it("/api/clients/test-with-transaction",e)},cars:{list:()=>ce("/api/cars"),byId:e=>ce(`/api/cars/${e}`),byClient:e=>ce(`/api/cars/client/${e}`),searchJpql:e=>{const t=new URLSearchParams(e).toString();return ce(`/api/cars/search/jpql?${t}`)},create:e=>it("/api/cars",e),update:(e,t)=>br(`/api/cars/${e}`,t),remove:e=>wr(`/api/cars/${e}`),bulkSafe:e=>it("/api/cars/bulk/safe",e),bulkUnsafe:e=>it("/api/cars/bulk/unsafe",e)},mechanics:{list:()=>ce("/api/mechanics"),byId:e=>ce(`/api/mechanics/${e}`),create:e=>it("/api/mechanics",e),update:(e,t)=>br(`/api/mechanics/${e}`,t),remove:e=>wr(`/api/mechanics/${e}`)},services:{list:e=>ce(e?`/api/services?category=${encodeURIComponent(e)}`:"/api/services"),all:()=>ce("/api/services/all"),byId:e=>ce(`/api/services/${e}`),create:e=>it("/api/services",e),update:(e,t)=>br(`/api/services/${e}`,t),remove:e=>wr(`/api/services/${e}`),updateStatus:(e,t)=>dn(`/api/services/${e}/status`,t)},spares:{list:()=>ce("/api/spares"),byId:e=>ce(`/api/spares/${e}`),byPart:e=>ce(`/api/spares/part/${e}`),byManufacturer:e=>ce(`/api/spares/manufacturer/${e}`),lowStock:(e=5)=>ce(`/api/spares/low-stock?minQuantity=${e}`),create:e=>it("/api/spares",e),update:(e,t)=>br(`/api/spares/${e}`,t),remove:e=>wr(`/api/spares/${e}`)},orders:{list:()=>ce("/api/orders"),byId:e=>ce(`/api/orders/${e}`),byCar:e=>ce(`/api/orders/car/${e}`),byClient:e=>ce(`/api/orders/client/${e}`),byStatus:e=>ce(`/api/orders/status/${encodeURIComponent(e)}`),byDateRange:(e,t)=>ce(`/api/orders/date-range?start=${encodeURIComponent(e)}&end=${encodeURIComponent(t)}`),create:e=>it("/api/orders",e),update:(e,t)=>br(`/api/orders/${e}`,t),cancel:e=>dn(`/api/orders/${e}/cancel`),complete:e=>dn(`/api/orders/${e}/complete`),updateStatus:(e,t)=>dn(`/api/orders/${e}/status`,t),remove:e=>wr(`/api/orders/${e}`)},carBrandModels:{list:()=>ce("/api/car-brand-models"),create:e=>it("/api/car-brand-models",e)}};function gr(e=!1){const[t,r]=x.useState(e),[n,a]=x.useState(""),l=x.useCallback(async o=>{r(!0),a("");try{return await o()}catch(c){const s=c instanceof Error?c.message:"Unexpected error";throw a(s),c}finally{r(!1)}},[]);return{loading:t,error:n,setError:a,run:l}}function vr({type:e="info",children:t}){return i.jsx("div",{className:`message ${e}`,children:t})}function Yt({children:e="Записи не найдены."}){return i.jsx("div",{className:"empty-state",children:e})}const Uh={clients:{label:"Клиенты",path:"/clients",icon:"👥"},cars:{label:"Автомобили",path:"/cars",icon:"🚗"},orders:{label:"Заказы",path:"/orders",icon:"📋"},mechanics:{label:"Механики",path:"/mechanics",icon:"🔧"},services:{label:"Услуги",path:"/services",icon:"⚙️"},spares:{label:"Запчасти",path:"/spares",icon:"📦"}};function Bh(){const{loading:e,error:t}=gr(),[r,n]=x.useState(!0),[a,l]=x.useState({});async function o(){try{const p=await Promise.all([q.clients.list(),q.cars.list(),q.orders.list(),q.mechanics.list(),q.services.all(),q.spares.list()]),[m,j,y,S,N,f]=p;l({clients:(m==null?void 0:m.length)||0,cars:(j==null?void 0:j.length)||0,orders:(y==null?void 0:y.length)||0,mechanics:(S==null?void 0:S.length)||0,services:(N==null?void 0:N.length)||0,spares:(f==null?void 0:f.length)||0})}catch(p){console.error("loadStats error:",p),l({})}finally{n(!1)}}x.useEffect(()=>{o()},[]);const c=x.useMemo(()=>Object.entries(a),[a]),s=x.useMemo(()=>Object.values(a).reduce((p,m)=>p+m,0),[a]);function d(p){return p===1?"запись":p>=2&&p<=4?"записи":"записей"}const v=e||r;return i.jsxs("div",{className:"dashboard-page",children:[i.jsx("div",{className:"controls-container",children:i.jsxs("div",{className:"stats-row",children:[i.jsxs("div",{className:"stat-badge",children:[i.jsx("span",{className:"stat-value",children:c.length}),i.jsx("span",{className:"stat-label",children:"разделов"})]}),i.jsxs("div",{className:"stat-badge",children:[i.jsx("span",{className:"stat-value",children:s}),i.jsx("span",{className:"stat-label",children:d(s)})]})]})}),t&&i.jsx(vr,{type:"error",children:t}),v?i.jsx("div",{className:"stats-grid",children:[...Array(6)].map((p,m)=>i.jsxs("div",{className:"stat-card skeleton",children:[i.jsx("div",{className:"stat-icon skeleton-icon"}),i.jsxs("div",{className:"stat-info",children:[i.jsx("div",{className:"stat-label skeleton-text"}),i.jsx("div",{className:"stat-value skeleton-text"})]})]},m))}):c.length===0?i.jsx(Yt,{children:"Нет данных для отображения"}):i.jsx("div",{className:"stats-grid",children:c.map(([p,m])=>{const j=Uh[p]||{label:p,path:"/",icon:"📊"};return i.jsx(Qd,{to:j.path,className:"stat-card-link",children:i.jsxs("div",{className:"stat-card",children:[i.jsx("div",{className:"stat-icon",children:i.jsx("span",{className:"stat-emoji",children:j.icon})}),i.jsxs("div",{className:"stat-info",children:[i.jsx("div",{className:"stat-label",children:j.label}),i.jsx("div",{className:"stat-value",children:m}),i.jsx("div",{className:"stat-subtitle",children:d(m)})]}),i.jsx("div",{className:"stat-arrow",children:i.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:i.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})})]})},p)})}),i.jsx("style",{children:`
        :root {
          --bg-primary: #f9fafb;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f3f4f6;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-muted: #9ca3af;
          --border-color: #e5e7eb;
          --border-color-hover: #d1d5db;
          --accent-primary: #2563eb;
          --accent-hover: #1d4ed8;
          --accent-light: #eff6ff;
          --danger-primary: #dc2626;
          --danger-light: #fef2f2;
          --danger-hover: #fee2e2;
          --success-primary: #16a34a;
          --success-light: #f0fdf4;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --modal-backdrop: rgba(0, 0, 0, 0.5);
        }

        [data-theme="dark"], .dark-theme {
          --bg-primary: #111827;
          --bg-secondary: #1f2937;
          --bg-tertiary: #374151;
          --text-primary: #f9fafb;
          --text-secondary: #d1d5db;
          --text-muted: #6b7280;
          --border-color: #374151;
          --border-color-hover: #4b5563;
          --accent-primary: #3b82f6;
          --accent-hover: #2563eb;
          --accent-light: rgba(59, 130, 246, 0.15);
          --danger-primary: #ef4444;
          --danger-light: rgba(239, 68, 68, 0.15);
          --danger-hover: rgba(239, 68, 68, 0.25);
          --success-primary: #22c55e;
          --success-light: rgba(34, 197, 94, 0.15);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
          --modal-backdrop: rgba(0, 0, 0, 0.7);
        }

        .dashboard-page {
          padding: 1rem;
          min-height: 100%;
          background-color: var(--bg-primary);
          margin-top: 0;
        }

        .controls-container {
          margin-bottom: 1.5rem;
          margin-top: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .stats-row {
          display: flex;
          gap: 1rem;
        }

        .stat-badge {
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          min-width: 140px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .stat-badge .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--accent-primary);
          line-height: 1;
          letter-spacing: -0.5px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .stat-badge .stat-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 0.35rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .stat-card-link {
          text-decoration: none;
          color: inherit;
        }

        .stat-card {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 1.25rem;
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.2s ease;
          border: 1px solid var(--border-color);
          height: 100%;
        }

        .stat-card-link:hover .stat-card {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
          transform: translateY(-2px);
        }

        .stat-card.skeleton {
          animation: none;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          border-radius: 8px;
          flex-shrink: 0;
          color: var(--text-secondary);
        }

        .stat-emoji {
          font-size: 2rem;
          line-height: 1;
        }

        .skeleton-icon {
          background: var(--border-color);
          animation: pulse 1.5s infinite;
        }

        .stat-info {
          flex: 1;
          min-width: 0;
        }

        .stat-info .stat-label {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stat-info .stat-value {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1;
        }

        .stat-info .stat-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
          font-weight: 500;
        }

        .stat-arrow {
          opacity: 0;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .stat-arrow svg {
          width: 24px;
          height: 24px;
          color: var(--text-muted);
        }

        .stat-card-link:hover .stat-arrow {
          opacity: 1;
        }

        .stat-card-link:hover .stat-arrow svg {
          color: var(--accent-primary);
        }

        .skeleton-text {
          height: 1rem;
          background: var(--border-color);
          border-radius: 4px;
          animation: pulse 1.5s infinite;
        }

        .skeleton-text:last-child {
          width: 60%;
          height: 1.5rem;
          margin-top: 0.5rem;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            grid-template-columns: 60px 1fr;
          }

          .stat-arrow {
            grid-column: 2;
            opacity: 1;
          }

          .stats-row {
            flex-wrap: wrap;
          }

          .stat-badge {
            min-width: 120px;
          }

          .stat-badge .stat-value {
            font-size: 1.75rem;
          }
        }
      `})]})}const fn={firstName:"",lastName:"",phone:"",email:"",address:"",registrationDate:""},Xl=18;function Vh(){const{loading:e,error:t,run:r,setError:n}=gr(),[a,l]=x.useState(!0),[o,c]=x.useState([]),[s,d]=x.useState({}),[v,p]=x.useState(null),[m,j]=x.useState(!1),[y,S]=x.useState(""),[N,f]=x.useState(""),[u,h]=x.useState(fn),[b,P]=x.useState("name"),[_,D]=x.useState("asc"),[R,B]=x.useState(1),I=x.useMemo(()=>!!(v!=null&&v.id),[v]);function G(g){b===g?D(E=>E==="asc"?"desc":"asc"):(P(g),D("asc"))}const Y=g=>g?g.replace(/^\+375/,"").replace(/\D/g,""):"",ge=(g,E)=>{const A=(g==null?void 0:g.charAt(0))||"",X=(E==null?void 0:E.charAt(0))||"";return(A+X).toUpperCase()},ae=x.useMemo(()=>{let g=[...o];if(y&&y.length>=3){const E=y.toLowerCase();g=g.filter(A=>A.firstName.toLowerCase().includes(E)||A.lastName.toLowerCase().includes(E)||`${A.firstName} ${A.lastName}`.toLowerCase().includes(E))}if(N&&N.trim()){const E=N.trim().replace(/\D/g,"");E.length>=3&&(g=g.filter(A=>A.phone?Y(A.phone).includes(E):!1))}return g},[o,y,N]),we=x.useMemo(()=>{const g=[...ae];return g.sort((E,A)=>{let X,re;return b==="name"?(X=`${E.firstName} ${E.lastName}`,re=`${A.firstName} ${A.lastName}`):(X=E[b]||"",re=A[b]||""),_==="asc"?String(X).localeCompare(String(re)):String(re).localeCompare(String(X))}),g},[ae,b,_]),ke=x.useMemo(()=>{const g=(R-1)*Xl,E=g+Xl;return we.slice(g,E)},[we,R]),ve=x.useMemo(()=>Math.ceil(we.length/Xl),[we.length]);async function M(){try{const g=await q.clients.list({});c(g||[])}catch(g){console.error("loadAllClients error:",g),n(g.message||"Ошибка загрузки данных"),c([])}finally{l(!1)}}x.useEffect(()=>{M()},[]),x.useEffect(()=>{B(1)},[y,N]);async function $(g){try{if(p(g),j(!1),h({firstName:g.firstName||"",lastName:g.lastName||"",phone:g.phone||"",email:g.email||"",address:g.address||"",registrationDate:g.registrationDate||""}),!s[g.id]){const E=await q.cars.byClient(g.id);d(A=>({...A,[g.id]:E||[]}))}}catch(E){console.error("showDetails error:",E)}}function U(){p(null),h(fn),j(!0),n("")}function Q(){S(""),f(""),B(1)}function Z(){return u.firstName.trim()?u.lastName.trim()?u.phone.trim()?!0:(alert("Введите номер телефона"),!1):(alert("Введите фамилию клиента"),!1):(alert("Введите имя клиента"),!1)}async function me(g){if(g.preventDefault(),n(""),!!Z())try{const E={...u,registrationDate:u.registrationDate||null};I?(await r(()=>q.clients.update(v.id,E)),alert("Клиент успешно обновлён")):(await r(()=>q.clients.create(E)),alert("Клиент успешно добавлен"),j(!1)),p(null),h(fn),await M()}catch(E){alert(E.message||"Ошибка при сохранении")}}async function xe(g){if(window.confirm("Удалить клиента?"))try{await r(()=>q.clients.remove(g)),(v==null?void 0:v.id)===g&&(p(null),h(fn)),alert("Клиент успешно удалён"),await M()}catch(E){alert(E.message||"Ошибка при удалении")}}const w=I||m,z=()=>{p(null),j(!1),h(fn)},V=y&&y.length>=3||N&&N.replace(/\D/g,"").length>=3,W=e||a;return i.jsxs("div",{className:"clients-page",children:[i.jsxs("div",{className:"controls-container",children:[i.jsx("div",{className:"filter-bar",children:i.jsxs("div",{className:"filter-row",children:[i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Поиск по имени"}),i.jsx("input",{type:"text",placeholder:"Минимум 3 символа",value:y,onChange:g=>S(g.target.value),className:"filter-input"})]}),i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Поиск по телефону"}),i.jsx("input",{type:"text",placeholder:"3+ цифры, без +375",value:N,onChange:g=>f(g.target.value),className:"filter-input"})]})]})}),i.jsxs("div",{className:"actions-row",children:[i.jsxs("div",{className:"sort-controls",children:[i.jsx("span",{className:"sort-label",children:"Сортировать:"}),i.jsxs("button",{className:`btn btn-sort ${b==="name"?"active":""}`,onClick:()=>G("name"),children:["По имени ",b==="name"&&(_==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${b==="phone"?"active":""}`,onClick:()=>G("phone"),children:["По телефону ",b==="phone"&&(_==="asc"?"↑":"↓")]})]}),i.jsxs("div",{className:"actions-group",children:[V&&i.jsx("button",{className:"btn btn-ghost",type:"button",onClick:Q,children:"Сбросить фильтры"}),i.jsx("button",{className:"btn btn-primary btn-xl",type:"button",onClick:U,children:"+ Добавить клиента"})]})]})]}),t&&i.jsx(vr,{type:"error",children:t}),W?i.jsx("div",{className:"clients-grid",children:[...Array(8)].map((g,E)=>i.jsxs("div",{className:"client-card skeleton",children:[i.jsx("div",{className:"client-avatar skeleton-avatar"}),i.jsxs("div",{className:"client-info",children:[i.jsx("div",{className:"client-name skeleton-text"}),i.jsx("div",{className:"client-phone skeleton-text"}),i.jsx("div",{className:"client-email skeleton-text"})]}),i.jsx("div",{className:"client-actions skeleton-actions"})]},E))}):we.length===0?i.jsx(Yt,{children:V?"По вашему запросу ничего не найдено":"Нет клиентов"}):i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"clients-grid",children:ke.map(g=>i.jsxs("div",{className:"client-card",children:[i.jsx("div",{className:"client-avatar",children:ge(g.firstName,g.lastName)}),i.jsxs("div",{className:"client-info",children:[i.jsxs("div",{className:"client-name",title:`${g.firstName} ${g.lastName}`,children:[g.firstName," ",g.lastName]}),i.jsxs("div",{className:"client-details",children:[i.jsx("span",{className:"detail-item phone",title:g.phone,children:g.phone}),g.email&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"detail-separator",children:"•"}),i.jsx("span",{className:"detail-item email",title:g.email,children:g.email})]})]}),g.address&&i.jsx("div",{className:"client-address",title:g.address,children:g.address})]}),i.jsxs("div",{className:"client-actions",children:[i.jsx("button",{className:"btn btn-edit",type:"button",onClick:()=>$(g),title:"Редактировать",children:"✏️"}),i.jsx("button",{className:"btn btn-delete",type:"button",onClick:()=>xe(g.id),title:"Удалить",children:"🗑️"})]})]},g.id))}),ve>1&&i.jsxs("div",{className:"pagination",children:[i.jsx("button",{className:"btn btn-page",onClick:()=>B(g=>Math.max(1,g-1)),disabled:R===1,children:"← Назад"}),i.jsx("div",{className:"page-numbers",children:[...Array(ve)].map((g,E)=>i.jsx("button",{className:`page-number ${R===E+1?"active":""}`,onClick:()=>B(E+1),children:E+1},E))}),i.jsx("button",{className:"btn btn-page",onClick:()=>B(g=>Math.min(ve,g+1)),disabled:R===ve,children:"Вперед →"})]}),(v==null?void 0:v.id)&&i.jsxs("div",{className:"cars-section",children:[i.jsxs("h3",{className:"section-title",children:["Автомобили клиента: ",v.firstName," ",v.lastName]}),(s[v.id]||[]).length===0?i.jsx(Yt,{children:"У клиента пока нет автомобилей"}):i.jsx("div",{className:"cars-grid",children:s[v.id].map(g=>i.jsx("div",{className:"car-card",children:i.jsxs("div",{className:"car-info",children:[i.jsxs("div",{className:"car-name",children:[g.brand," ",g.model]}),i.jsxs("div",{className:"car-details",children:[i.jsx("span",{className:"car-plate",children:g.licensePlate}),i.jsx("span",{className:"car-year",children:g.year||"—"})]})]})},g.id))})]})]}),w&&i.jsx("div",{className:"modal-backdrop",onClick:z,children:i.jsxs("div",{className:"modal",onClick:g=>g.stopPropagation(),children:[i.jsxs("div",{className:"modal-head",children:[i.jsx("div",{className:"modal-title",children:i.jsx("h3",{children:I?"Редактирование клиента":"Добавление клиента"})}),i.jsx("button",{className:"btn btn-close",type:"button",onClick:z,children:"✕"})]}),i.jsxs("form",{className:"form-grid",onSubmit:me,children:[i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Имя *"}),i.jsx("input",{required:!0,placeholder:"Иван",value:u.firstName,onChange:g=>h(E=>({...E,firstName:g.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Фамилия *"}),i.jsx("input",{required:!0,placeholder:"Иванов",value:u.lastName,onChange:g=>h(E=>({...E,lastName:g.target.value}))})]})]}),i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Телефон *"}),i.jsx("input",{required:!0,placeholder:"+375 XX XXX XX XX",value:u.phone,onChange:g=>h(E=>({...E,phone:g.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Email"}),i.jsx("input",{type:"email",placeholder:"email@example.com",value:u.email,onChange:g=>h(E=>({...E,email:g.target.value}))})]})]}),i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Адрес"}),i.jsx("input",{placeholder:"г. Минск, ул. Примерная 1",value:u.address,onChange:g=>h(E=>({...E,address:g.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Дата регистрации"}),i.jsx("input",{type:"date",value:u.registrationDate,onChange:g=>h(E=>({...E,registrationDate:g.target.value}))})]})]}),i.jsxs("div",{className:"form-actions",children:[i.jsx("button",{type:"button",className:"btn btn-cancel",onClick:z,children:"Отмена"}),i.jsx("button",{className:"btn btn-submit",disabled:e,type:"submit",children:I?"Сохранить":"Создать"})]})]})]})}),i.jsx("style",{children:`
        :root {
          --bg-primary: #f9fafb;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f3f4f6;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-muted: #9ca3af;
          --border-color: #e5e7eb;
          --border-color-hover: #d1d5db;
          --accent-primary: #2563eb;
          --accent-hover: #1d4ed8;
          --accent-light: #eff6ff;
          --danger-primary: #dc2626;
          --danger-light: #fef2f2;
          --danger-hover: #fee2e2;
          --success-primary: #16a34a;
          --success-light: #f0fdf4;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --modal-backdrop: rgba(0, 0, 0, 0.5);
        }

        [data-theme="dark"], .dark-theme {
          --bg-primary: #111827;
          --bg-secondary: #1f2937;
          --bg-tertiary: #374151;
          --text-primary: #f9fafb;
          --text-secondary: #d1d5db;
          --text-muted: #6b7280;
          --border-color: #374151;
          --border-color-hover: #4b5563;
          --accent-primary: #3b82f6;
          --accent-hover: #2563eb;
          --accent-light: rgba(59, 130, 246, 0.15);
          --danger-primary: #ef4444;
          --danger-light: rgba(239, 68, 68, 0.15);
          --danger-hover: rgba(239, 68, 68, 0.25);
          --success-primary: #22c55e;
          --success-light: rgba(34, 197, 94, 0.15);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
          --modal-backdrop: rgba(0, 0, 0, 0.7);
        }

        .clients-page {
          padding: 1rem;
          min-height: 100%;
          background-color: var(--bg-primary);
          margin-top: 0;
        }

        .controls-container {
          margin-bottom: 1.5rem;
          margin-top: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .filter-bar {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          min-width: 150px;
        }

        .filter-field label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .filter-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-primary);
          background: var(--bg-secondary);
        }

        .filter-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .sort-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .sort-label {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .btn-sort {
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .btn-sort:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }

        .btn-sort.active {
          background: var(--accent-light);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .actions-group {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-xl {
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--accent-hover);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid transparent;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .clients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .client-card {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .client-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .client-card.skeleton {
          animation: none;
        }

        .client-avatar {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.5rem;
          flex-shrink: 0;
          background: var(--bg-tertiary);
        }

        .skeleton-avatar {
          background: var(--border-color);
          animation: pulse 1.5s infinite;
        }

        .client-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .client-name {
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .client-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .detail-item {
          font-size: 0.85rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .detail-item.phone {
          max-width: 130px;
        }

        .detail-item.email {
          max-width: 180px;
        }

        .detail-separator {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .client-address {
          font-size: 0.8rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .client-actions {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex-shrink: 0;
        }

        .skeleton-actions {
          width: 36px;
          height: 72px;
          background: var(--border-color);
          border-radius: 6px;
          animation: pulse 1.5s infinite;
        }

        .btn-edit,
        .btn-delete {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .btn-edit {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .btn-edit:hover {
          filter: brightness(0.95);
        }

        .btn-delete {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .btn-delete:hover {
          filter: brightness(0.95);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-page {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .btn-page:hover:not(:disabled) {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }
        .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }

        .page-numbers { display: flex; gap: 0.25rem; }

        .page-number {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }
        .page-number:hover { background: var(--bg-tertiary); }
        .page-number.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .cars-section {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .section-title {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .car-card {
          padding: 1rem;
          background: var(--bg-tertiary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .car-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .car-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .car-details {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .car-plate {
          font-size: 0.875rem;
          color: var(--text-primary);
          background: var(--bg-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
        }

        .car-year {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--modal-backdrop);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 1.5rem;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
        }

        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }
        .modal-title h3 { margin: 0; font-size: 1.25rem; color: var(--text-primary); }

        .btn-close {
          width: 32px; height: 32px;
          border: none; background: transparent;
          font-size: 1.25rem; color: var(--text-secondary);
          cursor: pointer;
        }
        .btn-close:hover { color: var(--text-primary); }

        .form-grid { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .form-field { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; min-width: 200px; }
        .form-field label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }

        .form-field input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .form-field input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-cancel {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .btn-cancel:hover { background: var(--bg-tertiary); }

        .btn-address {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }
        .btn-address:hover { background: var(--border-color); }

        .btn-submit {
          background: var(--accent-primary);
          color: white;
        }
        .btn-submit:hover:not(:disabled) { background: var(--accent-hover); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .skeleton { animation: pulse 1.5s infinite; background: var(--bg-terтиary); }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        .skeleton-text { height: 1rem; background: var(--border-color); border-radius: 4px; }

        @media (max-width: 768px) {
          .actions-row { flex-direction: column; align-items: stretch; }
          .sort-controls { justify-content: center; margin-bottom: 0.5rem; }
          .actions-group { justify-content: center; }
          .clients-grid { grid-template-columns: 1fr; }
          .client-card { grid-template-columns: 60px 1fr; }
          .client-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
          .filter-row { flex-direction: column; }
          .modal { min-width: 90%; margin: 1rem; }
          .form-row { flex-direction: column; }
          .pagination { flex-wrap: wrap; }
          .detail-item { max-width: 100%; }
        }
      `})]})}const pn={brand:"",model:"",licensePlate:"",vin:"",year:"",clientId:""},Gl=18;function Wh(){const{loading:e,error:t,run:r,setError:n}=gr(),[a,l]=x.useState(!0),[o,c]=x.useState([]),[s,d]=x.useState([]),[v,p]=x.useState([]),[m,j]=x.useState(null),[y,S]=x.useState(!1),[N,f]=x.useState(pn),[u,h]=x.useState("brand"),[b,P]=x.useState("asc"),[_,D]=x.useState(1),[R,B]=x.useState(""),[I,G]=x.useState({brand:"",model:"",licensePlate:"",clientFullName:"",yearFrom:"",yearTo:""}),Y=x.useMemo(()=>{const C=new Date().getFullYear(),O=[];for(let te=C;te>=1980;te--)O.push(te);return O},[]),ge=x.useMemo(()=>!!(m!=null&&m.id),[m]),ae=x.useMemo(()=>{const C=s.map(O=>O.brand).filter(Boolean);return[...new Set(C)]},[s]),we=C=>{if(!C)return[];const O=s.filter(te=>te.brand===C&&te.model).map(te=>te.model);return[...new Set(O)]},ke=x.useMemo(()=>we(N.brand),[N.brand,s]),ve=x.useMemo(()=>we(I.brand),[I.brand,s]),M=x.useMemo(()=>{let C=[...s];if(I.brand&&(C=C.filter(O=>O.brand===I.brand)),I.model&&(C=C.filter(O=>O.model===I.model)),I.licensePlate){const O=I.licensePlate.toLowerCase();C=C.filter(te=>te.licensePlate&&te.licensePlate.toLowerCase().includes(O))}if(I.clientFullName){const O=I.clientFullName.toLowerCase();C=C.filter(te=>te.clientName&&te.clientName.toLowerCase().includes(O))}return I.yearFrom&&(C=C.filter(O=>O.year>=parseInt(I.yearFrom))),I.yearTo&&(C=C.filter(O=>O.year<=parseInt(I.yearTo))),C},[s,I]),$=x.useMemo(()=>{const C=[...M];return C.sort((O,te)=>{let Ne,Ae;if(u==="brand")Ne=`${O.brand} ${O.model}`,Ae=`${te.brand} ${te.model}`;else if(u==="licensePlate")Ne=O.licensePlate||"",Ae=te.licensePlate||"";else{if(u==="year")return Ne=O.year||0,Ae=te.year||0,b==="asc"?Ne-Ae:Ae-Ne;u==="clientName"?(Ne=O.clientName||"",Ae=te.clientName||""):(Ne=O[u]||"",Ae=te[u]||"")}return typeof Ne=="string"?b==="asc"?Ne.localeCompare(Ae):Ae.localeCompare(Ne):b==="asc"?Ne-Ae:Ae-Ne}),C},[M,u,b]),U=x.useMemo(()=>{const C=(_-1)*Gl,O=C+Gl;return $.slice(C,O)},[$,_]),Q=x.useMemo(()=>Math.ceil($.length/Gl),[$.length]);function Z(C){u===C?P(O=>O==="asc"?"desc":"asc"):(h(C),P("asc"))}async function me(){try{const[C,O]=await Promise.all([q.cars.list(),q.clients.list()]);d(C),c(C),p(O)}catch(C){console.error("loadInitial error:",C),n(C.message||"Ошибка загрузки данных")}finally{l(!1)}}x.useEffect(()=>{me()},[]),x.useEffect(()=>{D(1)},[I]);function xe(C){j(C),S(!1),f({brand:C.brand||"",model:C.model||"",licensePlate:C.licensePlate||"",vin:C.vin||"",year:C.year||"",clientId:C.clientId||""});const O=v.find(te=>te.id===C.clientId);B(O?`${O.firstName} ${O.lastName}`.trim():"")}function w(){j(null),S(!0),n(""),f(pn),B("")}function z(){return N.brand.trim()?N.model.trim()?N.licensePlate.trim()?N.vin.trim()?N.year?!0:(alert("Выберите год выпуска"),!1):(alert("Введите VIN номер"),!1):(alert("Введите госномер"),!1):(alert("Введите модель автомобиля"),!1):(alert("Введите марку автомобиля"),!1)}async function V(C){if(C.preventDefault(),n(""),!z())return;const O={...N,year:Number(N.year),clientId:N.clientId?Number(N.clientId):null};try{ge?(await r(()=>q.cars.update(m.id,O)),alert("Автомобиль успешно обновлён")):(await r(()=>q.cars.create(O)),alert("Автомобиль успешно добавлен"),S(!1)),j(null),f(pn),B(""),await me()}catch(te){alert(te.message||"Ошибка при сохранении")}}async function W(C){if(window.confirm("Удалить автомобиль?"))try{await r(()=>q.cars.remove(C)),alert("Автомобиль успешно удалён"),(m==null?void 0:m.id)===C&&(j(null),f(pn)),await me()}catch(O){alert(O.message||"Ошибка при удалении")}}async function g(){D(1),G({brand:"",model:"",licensePlate:"",clientFullName:"",yearFrom:"",yearTo:""})}const E=ge||y,A=()=>{j(null),S(!1),f(pn),B("")},X=I.brand||I.model||I.licensePlate||I.clientFullName||I.yearFrom||I.yearTo,re=e||a,xr=["🚗","🚙","🚘","🚕","🚐","🚓","🏎️","🚔","🚑","🚒","🚚","🚛","🚜","🏍️","🛵"],pt=C=>{const O=(C||0)%xr.length;return xr[O]},tn=C=>{const O=C.target.value;B(O);const te=v.find(Ne=>`${Ne.firstName} ${Ne.lastName}`.trim().toLowerCase()===O.toLowerCase());f(Ne=>({...Ne,clientId:te?te.id:""}))};return i.jsxs("div",{className:"cars-page",children:[i.jsxs("div",{className:"controls-container",children:[i.jsx("div",{className:"filter-bar",children:i.jsxs("div",{className:"filter-row",children:[i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Марка"}),i.jsxs("select",{value:I.brand,onChange:C=>G(O=>({...O,brand:C.target.value})),className:"filter-input",children:[i.jsx("option",{value:"",children:"Все марки"}),ae.map(C=>i.jsx("option",{value:C,children:C},C))]})]}),i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Модель"}),i.jsxs("select",{value:I.model,onChange:C=>G(O=>({...O,model:C.target.value})),disabled:!I.brand,className:"filter-input",children:[i.jsx("option",{value:"",children:"Все модели"}),I.brand&&ve.map(C=>i.jsx("option",{value:C,children:C},C))]})]}),i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Госномер"}),i.jsx("input",{type:"text",placeholder:"Поиск по номеру",value:I.licensePlate,onChange:C=>G(O=>({...O,licensePlate:C.target.value})),className:"filter-input"})]}),i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Владелец"}),i.jsx("input",{type:"text",placeholder:"Имя или фамилия",value:I.clientFullName,onChange:C=>G(O=>({...O,clientFullName:C.target.value})),className:"filter-input"})]}),i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Год от"}),i.jsxs("select",{value:I.yearFrom,onChange:C=>G(O=>({...O,yearFrom:C.target.value})),className:"filter-input",children:[i.jsx("option",{value:"",children:"Любой"}),Y.map(C=>i.jsx("option",{value:C,children:C},C))]})]}),i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Год до"}),i.jsxs("select",{value:I.yearTo,onChange:C=>G(O=>({...O,yearTo:C.target.value})),className:"filter-input",children:[i.jsx("option",{value:"",children:"Любой"}),Y.map(C=>i.jsx("option",{value:C,children:C},C))]})]})]})}),i.jsxs("div",{className:"actions-row",children:[i.jsxs("div",{className:"sort-controls",children:[i.jsx("span",{className:"sort-label",children:"Сортировать:"}),i.jsxs("button",{className:`btn btn-sort ${u==="brand"?"active":""}`,onClick:()=>Z("brand"),children:["По марке ",u==="brand"&&(b==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${u==="year"?"active":""}`,onClick:()=>Z("year"),children:["По году ",u==="year"&&(b==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${u==="clientName"?"active":""}`,onClick:()=>Z("clientName"),children:["По владельцу ",u==="clientName"&&(b==="asc"?"↑":"↓")]})]}),i.jsxs("div",{className:"actions-group",children:[X&&i.jsx("button",{className:"btn btn-ghost",type:"button",onClick:g,children:"Сбросить фильтры"}),i.jsx("button",{className:"btn btn-primary btn-xl",type:"button",onClick:w,children:"+ Добавить автомобиль"})]})]})]}),t&&i.jsx(vr,{type:"error",children:t}),re?i.jsx("div",{className:"cars-grid",children:[...Array(8)].map((C,O)=>i.jsxs("div",{className:"car-card skeleton",children:[i.jsx("div",{className:"car-icon skeleton-icon"}),i.jsxs("div",{className:"car-info",children:[i.jsx("div",{className:"car-name skeleton-text"}),i.jsx("div",{className:"car-plate skeleton-text"}),i.jsx("div",{className:"car-owner skeleton-text"})]}),i.jsx("div",{className:"car-actions skeleton-actions"})]},O))}):U.length===0?i.jsx(Yt,{children:X?"По вашему запросу ничего не найдено":"Нет автомобилей"}):i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"cars-grid",children:U.map(C=>i.jsxs("div",{className:"car-card",children:[i.jsx("div",{className:"car-icon",children:pt(C.id)}),i.jsxs("div",{className:"car-info",children:[i.jsxs("div",{className:"car-name",title:`${C.brand} ${C.model}`,children:[C.brand," ",C.model]}),i.jsxs("div",{className:"car-details",children:[i.jsx("span",{className:"car-plate",title:C.licensePlate,children:C.licensePlate}),i.jsx("span",{className:"car-year",children:C.year||"—"})]}),C.clientName&&i.jsx("div",{className:"car-owner",title:C.clientName,children:C.clientName})]}),i.jsxs("div",{className:"car-actions",children:[i.jsx("button",{className:"btn btn-edit",type:"button",onClick:()=>xe(C),title:"Редактировать",children:"✏️"}),i.jsx("button",{className:"btn btn-delete",type:"button",onClick:()=>W(C.id),title:"Удалить",children:"🗑️"})]})]},C.id))}),Q>1&&i.jsxs("div",{className:"pagination",children:[i.jsx("button",{className:"btn btn-page",onClick:()=>D(C=>Math.max(1,C-1)),disabled:_===1,children:"← Назад"}),i.jsx("div",{className:"page-numbers",children:[...Array(Q)].map((C,O)=>i.jsx("button",{className:`page-number ${_===O+1?"active":""}`,onClick:()=>D(O+1),children:O+1},O))}),i.jsx("button",{className:"btn btn-page",onClick:()=>D(C=>Math.min(Q,C+1)),disabled:_===Q,children:"Вперед →"})]})]}),E&&i.jsx("div",{className:"modal-backdrop",onClick:A,children:i.jsxs("div",{className:"modal",onClick:C=>C.stopPropagation(),children:[i.jsxs("div",{className:"modal-head",children:[i.jsx("div",{className:"modal-title",children:i.jsx("h3",{children:ge?"Редактирование автомобиля":"Добавление автомобиля"})}),i.jsx("button",{className:"btn btn-close",type:"button",onClick:A,children:"✕"})]}),i.jsxs("form",{className:"form-grid",onSubmit:V,children:[i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Марка *"}),i.jsx("input",{type:"text",required:!0,placeholder:"Toyota",list:"brands-list",value:N.brand,onChange:C=>f(O=>({...O,brand:C.target.value,model:""}))}),i.jsx("datalist",{id:"brands-list",children:ae.map(C=>i.jsx("option",{value:C},C))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Модель *"}),i.jsx("input",{type:"text",required:!0,placeholder:"Camry",list:"models-list",value:N.model,onChange:C=>f(O=>({...O,model:C.target.value})),disabled:!N.brand}),i.jsx("datalist",{id:"models-list",children:N.brand&&ke.map(C=>i.jsx("option",{value:C},C))})]})]}),i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Госномер *"}),i.jsx("input",{required:!0,placeholder:"1234AB-5",value:N.licensePlate,onChange:C=>f(O=>({...O,licensePlate:C.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"VIN *"}),i.jsx("input",{required:!0,placeholder:"17 символов",value:N.vin,onChange:C=>f(O=>({...O,vin:C.target.value}))})]})]}),i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Год выпуска *"}),i.jsxs("select",{required:!0,value:N.year,onChange:C=>f(O=>({...O,year:C.target.value})),children:[i.jsx("option",{value:"",children:"Выберите год"}),Y.map(C=>i.jsx("option",{value:C,children:C},C))]})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Владелец"}),i.jsx("input",{type:"text",placeholder:"Начните вводить имя...",list:"clients-list",value:R,onChange:tn}),i.jsx("datalist",{id:"clients-list",children:v.map(C=>i.jsx("option",{value:`${C.firstName} ${C.lastName}`.trim()},C.id))}),N.clientId&&i.jsx("span",{className:"client-selected",children:"✓ Выбран клиент"})]})]}),i.jsxs("div",{className:"form-actions",children:[i.jsx("button",{type:"button",className:"btn btn-cancel",onClick:A,children:"Отмена"}),i.jsx("button",{className:"btn btn-submit",disabled:e,type:"submit",children:ge?"Сохранить":"Создать"})]})]})]})}),i.jsx("style",{children:`
        :root {
          --bg-primary: #f9fafb;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f3f4f6;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-muted: #9ca3af;
          --border-color: #e5e7eb;
          --border-color-hover: #d1d5db;
          --accent-primary: #2563eb;
          --accent-hover: #1d4ed8;
          --accent-light: #eff6ff;
          --danger-primary: #dc2626;
          --danger-light: #fef2f2;
          --danger-hover: #fee2e2;
          --success-primary: #16a34a;
          --success-light: #f0fdf4;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --modal-backdrop: rgba(0, 0, 0, 0.5);
        }

        [data-theme="dark"], .dark-theme {
          --bg-primary: #111827;
          --bg-secondary: #1f2937;
          --bg-tertiary: #374151;
          --text-primary: #f9fafb;
          --text-secondary: #d1d5db;
          --text-muted: #6b7280;
          --border-color: #374151;
          --border-color-hover: #4b5563;
          --accent-primary: #3b82f6;
          --accent-hover: #2563eb;
          --accent-light: rgba(59, 130, 246, 0.15);
          --danger-primary: #ef4444;
          --danger-light: rgba(239, 68, 68, 0.15);
          --danger-hover: rgba(239, 68, 68, 0.25);
          --success-primary: #22c55e;
          --success-light: rgba(34, 197, 94, 0.15);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
          --modal-backdrop: rgba(0, 0, 0, 0.7);
        }

        .cars-page {
          padding: 1rem;
          min-height: 100%;
          background-color: var(--bg-primary);
          margin-top: 0;
        }

        .controls-container {
          margin-bottom: 1.5rem;
          margin-top: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .filter-bar {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          min-width: 150px;
        }

        .filter-field label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .filter-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-primary);
          background: var(--bg-secondary);
        }

        .filter-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .sort-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .sort-label {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .btn-sort {
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .btn-sort:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }

        .btn-sort.active {
          background: var(--accent-light);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .actions-group {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-xl {
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--accent-hover);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid transparent;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .car-card {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .car-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .car-icon {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          flex-shrink: 0;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .car-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .car-name {
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .car-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .car-plate {
          font-size: 1rem;
          color: var(--text-primary);
          background: var(--bg-tertiary);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          font-family: monospace;
          font-weight: 500;
        }

        .car-year {
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .car-owner {
          font-size: 0.95rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .car-actions {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex-shrink: 0;
        }

        .btn-edit, .btn-delete {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .btn-edit {
          background: var(--accent-light);
          color: var(--accent-primary);
        }
        .btn-edit:hover {
          filter: brightness(0.95);
        }

        .btn-delete {
          background: var(--danger-light);
          color: var(--danger-primary);
        }
        .btn-delete:hover {
          filter: brightness(0.95);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-page {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .btn-page:hover:not(:disabled) {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }
        .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }

        .page-numbers { display: flex; gap: 0.25rem; }

        .page-number {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }
        .page-number:hover { background: var(--bg-tertiary); }
        .page-number.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--modal-backdrop);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 1.5rem;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
        }

        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }
        .modal-title h3 { margin: 0; font-size: 1.25rem; color: var(--text-primary); }

        .btn-close {
          width: 32px; height: 32px;
          border: none; background: transparent;
          font-size: 1.25rem; color: var(--text-secondary);
          cursor: pointer;
        }
        .btn-close:hover { color: var(--text-primary); }

        .form-grid { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .form-field { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; min-width: 200px; }
        .form-field label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }

        .form-field input, .form-field select {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .form-field input:focus, .form-field select:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        /* Client selected indicator */
        .client-selected {
          font-size: 0.75rem;
          color: var(--success-primary);
          font-weight: 500;
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-cancel {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .btn-cancel:hover { background: var(--bg-tertiary); }

        .btn-submit {
          background: var(--accent-primary);
          color: white;
        }
        .btn-submit:hover:not(:disabled) { background: var(--accent-hover); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .skeleton { animation: pulse 1.5s infinite; background: var(--bg-tertiary); }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        .skeleton-text { height: 1rem; background: var(--border-color); border-radius: 4px; }
        .skeleton-actions { width: 36px; height: 72px; background: var(--border-color); border-radius: 6px; }
        .skeleton-icon { background: var(--border-color); border-radius: 8px; }

        @media (max-width: 768px) {
          .actions-row { flex-direction: column; align-items: stretch; }
          .sort-controls { justify-content: center; margin-bottom: 0.5rem; }
          .actions-group { justify-content: center; }
          .cars-grid { grid-template-columns: 1fr; }
          .car-card { grid-template-columns: 60px 1fr; }
          .car-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
        }
      `})]})}const Qh={description:"",carId:"",services:[],spares:[]},Yl=18,kr=[{value:"NEW",label:"Новый",color:"var(--accent-light)",textColor:"var(--accent-primary)"},{value:"IN_PROGRESS",label:"В работе",color:"var(--warning-light)",textColor:"var(--warning-primary)"},{value:"COMPLETED",label:"Выполнен",color:"var(--success-light)",textColor:"var(--success-primary)"},{value:"CANCELLED",label:"Отменён",color:"var(--danger-light)",textColor:"var(--danger-primary)"}],Kd={NEW:["IN_PROGRESS","CANCELLED"],IN_PROGRESS:["COMPLETED","CANCELLED"],COMPLETED:[],CANCELLED:[]};function tr(e,t){if(e===t)return!1;const r=Kd[e];return r?r.includes(t):!1}function Hh(){var Jo,Zo,es,ts;const{loading:e,error:t,run:r,setError:n}=gr(),[a,l]=x.useState(!0),[o,c]=x.useState([]),[s,d]=x.useState([]),[v,p]=x.useState([]),[m,j]=x.useState([]),[y,S]=x.useState(null),[N,f]=x.useState(!1),[u,h]=x.useState(!1),[b,P]=x.useState(Qh),[_,D]=x.useState("orderDate"),[R,B]=x.useState("desc"),[I,G]=x.useState(1),[Y,ge]=x.useState(""),[ae,we]=x.useState(""),[ke,ve]=x.useState(""),M=!!(y!=null&&y.id)&&N;function $(k){_===k?B(L=>L==="asc"?"desc":"asc"):(D(k),B("asc"))}const U=x.useMemo(()=>{let k=[...o];if(Y&&Y.length>=3){const L=Y.toLowerCase();k=k.filter(H=>{if(String(H.id).includes(L)||(H.clientName||"").toLowerCase().includes(L)||(H.description||"").toLowerCase().includes(L))return!0;const K=s.find(Le=>Le.id===H.carId);return!!(K&&(K.licensePlate||"").toLowerCase().includes(L))})}return ae&&(k=k.filter(L=>L.status===ae)),k},[o,Y,ae,s]),Q=x.useMemo(()=>{const k=[...U];return k.sort((L,H)=>{let K,Le;return _==="orderDate"?(K=new Date(L.orderDate),Le=new Date(H.orderDate),R==="asc"?K-Le:Le-K):_==="clientName"?(K=L.clientName||"",Le=H.clientName||"",R==="asc"?K.localeCompare(Le):Le.localeCompare(K)):_==="totalPrice"?(K=L.totalPrice||0,Le=H.totalPrice||0,R==="asc"?K-Le:Le-K):0}),k},[U,_,R]),Z=x.useMemo(()=>{const k=(I-1)*Yl,L=k+Yl;return Q.slice(k,L)},[Q,I]),me=x.useMemo(()=>Math.ceil(Q.length/Yl),[Q.length]),xe=x.useMemo(()=>{if(!ke)return s;const k=ke.toLowerCase();return s.filter(L=>(L.licensePlate||"").toLowerCase().includes(k)||(L.brand||"").toLowerCase().includes(k)||(L.model||"").toLowerCase().includes(k))},[s,ke]);async function w(){try{const[k,L,H,K]=await Promise.all([q.orders.list(),q.cars.list(),q.services.list(),q.spares.list()]);c(k||[]),d(L||[]),p(H||[]),j(K||[])}catch(k){console.error("loadInitial error:",k),n(k.message||"Ошибка загрузки данных")}finally{l(!1)}}x.useEffect(()=>{w()},[]),x.useEffect(()=>{G(1)},[Y,ae]);function z(k){S(k),h(!0),f(!1)}function V(){S(null),f(!0),h(!1),ve(""),P({description:"",carId:"",services:[],spares:[]}),n("")}function W(k){S(k),f(!0),h(!1),ve("");const L=()=>k.serviceIds&&Array.isArray(k.serviceIds)?k.serviceIds.map(K=>String(K)):k.services&&Array.isArray(k.services)?k.services.map(K=>String(K.id)):[],H=()=>k.spareIds&&Array.isArray(k.spareIds)?k.spareIds.map(K=>String(K)):k.spares&&Array.isArray(k.spares)?k.spares.map(K=>String(K.id)):[];P({description:k.description||"",carId:k.carId?String(k.carId):"",services:L(),spares:H()})}function g(){return b.carId?!0:(alert("Выберите автомобиль"),!1)}async function E(k){if(k.preventDefault(),n(""),!g())return;const L={description:b.description,status:M?y.status:"NEW",carId:Number(b.carId),serviceIds:b.services.map(H=>Number(H)),spareIds:b.spares.map(H=>Number(H))};console.log("Submitting order:",L);try{M?(await r(()=>q.orders.update(y.id,L)),alert("Заказ успешно обновлён")):(await r(()=>q.orders.create(L)),alert("Заказ успешно добавлен"),f(!1)),S(null),P({description:"",carId:"",services:[],spares:[]}),await w()}catch(H){console.error("Submit error:",H),alert(H.message||"Ошибка при сохранении")}}async function A(k,L,H){if(!tr(L,H)){alert("Невозможно изменить статус");return}if(window.confirm(`Изменить статус заказа на "${Gd(H)}"?`))try{const K=o.find(Je=>Je.id===k);if(!K)throw new Error("Заказ не найден в локальном списке");const Le={description:K.description||"",status:H,carId:Number(K.carId),serviceIds:Array.isArray(K.serviceIds)?K.serviceIds.map(Je=>Number(Je)):[],spareIds:Array.isArray(K.spareIds)?K.spareIds.map(Je=>Number(Je)):[]};console.log(`Updating status for order ${k}:`,Le),await r(()=>q.orders.update(k,Le)),(y==null?void 0:y.id)===k&&S(Je=>Je?{...Je,status:H}:null),await w(),console.log(`✅ Статус изменён: ${L} → ${H}`)}catch(K){console.error("Status update error:",K),alert("Не удалось изменить статус: "+(K.message||"Ошибка"))}}async function X(k){if(window.confirm("Удалить заказ?"))try{await r(()=>q.orders.remove(k)),(y==null?void 0:y.id)===k&&S(null),await w()}catch(L){alert(L.message||"Ошибка при удалении")}}function re(k){return k?new Date(k).toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}):"-"}function xr(k){return k?new Date(k).toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}):"-"}const pt=()=>{h(!1),S(null)},tn=()=>{f(!1),S(null),ve(""),P({description:"",carId:"",services:[],spares:[]})};function C(k){if(k.clientName)return k.clientName;const L=s.find(H=>H.id===k.carId);return L&&L.clientName?L.clientName:"-"}function O(k){const L=s.find(H=>H.id===k.carId);return L?`${L.brand} ${L.model} (${L.licensePlate})`:"-"}function te(k){return k.serviceNames&&k.serviceNames.length>0?k.serviceNames.join(", "):"-"}function Ne(k){return k.spareNames&&k.spareNames.length>0?k.spareNames.join(", "):"-"}const Ae=Y&&Y.length>=3||ae,Xd=e||a,Go=k=>({NEW:"📋",IN_PROGRESS:"🔧",COMPLETED:"✅",CANCELLED:"❌"})[k]||"📋",Gd=k=>{const L=kr.find(H=>H.value===k);return(L==null?void 0:L.label)||k},Yd=()=>{ge(""),we(""),G(1)},qd=k=>{const L=String(k);P(H=>{const K=H.services||[],Je=K.includes(L)?K.filter(bl=>bl!==L):[...K,L];return{...H,services:Je}})},Jd=k=>{const L=String(k);P(H=>{const K=H.spares||[],Je=K.includes(L)?K.filter(bl=>bl!==L):[...K,L];return{...H,spares:Je}})},Zd=k=>(b.services||[]).includes(String(k)),ef=k=>(b.spares||[]).includes(String(k)),Yo=x.useMemo(()=>(b.services||[]).map(k=>{var L;return(L=v.find(H=>String(H.id)===k))==null?void 0:L.name}).filter(Boolean),[b.services,v]),qo=x.useMemo(()=>(b.spares||[]).map(k=>{var L;return(L=m.find(H=>String(H.id)===k))==null?void 0:L.name}).filter(Boolean),[b.spares,m]);return i.jsxs("div",{className:"orders-page",children:[i.jsxs("div",{className:"controls-container",children:[i.jsx("div",{className:"filter-bar",children:i.jsxs("div",{className:"filter-row",children:[i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Поиск"}),i.jsx("input",{type:"text",placeholder:"По номеру, клиенту, описанию или гос. номеру (3+ символа)",value:Y,onChange:k=>ge(k.target.value),className:"filter-input"})]}),i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Статус"}),i.jsxs("select",{value:ae,onChange:k=>we(k.target.value),className:"filter-input",children:[i.jsx("option",{value:"",children:"Все статусы"}),kr.map(k=>i.jsx("option",{value:k.value,children:k.label},k.value))]})]})]})}),i.jsxs("div",{className:"actions-row",children:[i.jsxs("div",{className:"sort-controls",children:[i.jsx("span",{className:"sort-label",children:"Сортировать:"}),i.jsxs("button",{className:`btn btn-sort ${_==="orderDate"?"active":""}`,onClick:()=>$("orderDate"),children:["По дате ",_==="orderDate"&&(R==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${_==="clientName"?"active":""}`,onClick:()=>$("clientName"),children:["По клиенту ",_==="clientName"&&(R==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${_==="totalPrice"?"active":""}`,onClick:()=>$("totalPrice"),children:["По сумме ",_==="totalPrice"&&(R==="asc"?"↑":"↓")]})]}),i.jsxs("div",{className:"actions-group",children:[Ae&&i.jsx("button",{className:"btn btn-ghost",type:"button",onClick:Yd,children:"Сбросить фильтры"}),i.jsx("button",{className:"btn btn-primary btn-xl",type:"button",onClick:V,children:"+ Добавить заказ"})]})]})]}),t&&i.jsx(vr,{type:"error",children:t}),Xd?i.jsx("div",{className:"orders-grid",children:[...Array(8)].map((k,L)=>i.jsxs("div",{className:"order-card skeleton",children:[i.jsx("div",{className:"order-icon skeleton-icon"}),i.jsxs("div",{className:"order-info",children:[i.jsx("div",{className:"order-client skeleton-text"}),i.jsx("div",{className:"order-date skeleton-text"}),i.jsx("div",{className:"order-status skeleton-text"})]}),i.jsx("div",{className:"order-card-actions skeleton-actions"})]},L))}):Q.length===0?i.jsx(Yt,{children:Ae?"По вашему запросу ничего не найдено":"Нет заказов"}):i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"orders-grid",children:Z.map(k=>{const L=kr.find(H=>H.value===k.status);return i.jsxs("div",{className:"order-card",children:[i.jsx("div",{className:"order-icon",children:Go(k.status)}),i.jsxs("div",{className:"order-info",children:[i.jsxs("div",{className:"order-number",children:["Заказ #",k.id]}),i.jsx("div",{className:"order-client",title:C(k),children:C(k)}),i.jsxs("div",{className:"order-details",children:[i.jsx("span",{className:"order-date",children:xr(k.orderDate)}),i.jsx("span",{className:"detail-separator",children:"•"}),i.jsxs("span",{className:"order-price",children:[k.totalPrice||0," Br"]})]}),i.jsx("div",{className:"order-status",style:{backgroundColor:L==null?void 0:L.color,color:L==null?void 0:L.textColor},children:L==null?void 0:L.label}),i.jsxs("div",{className:"order-status-actions",children:[tr(k.status,"IN_PROGRESS")&&i.jsx("button",{className:"status-btn status-in-progress",onClick:()=>A(k.id,k.status,"IN_PROGRESS"),title:"В работу",children:"🔧"}),tr(k.status,"COMPLETED")&&i.jsx("button",{className:"status-btn status-completed",onClick:()=>A(k.id,k.status,"COMPLETED"),title:"Выполнить",children:"✅"}),tr(k.status,"CANCELLED")&&i.jsx("button",{className:"status-btn status-cancelled",onClick:()=>A(k.id,k.status,"CANCELLED"),title:"Отменить",children:"❌"})]})]}),i.jsxs("div",{className:"order-card-actions",children:[i.jsx("button",{className:"btn btn-view",type:"button",onClick:()=>z(k),title:"Просмотр деталей",children:"👁️"}),i.jsx("button",{className:"btn btn-edit",type:"button",onClick:()=>W(k),title:"Редактировать",children:"✏️"}),i.jsx("button",{className:"btn btn-delete",type:"button",onClick:()=>X(k.id),title:"Удалить",children:"🗑️"})]})]},k.id)})}),me>1&&i.jsxs("div",{className:"pagination",children:[i.jsx("button",{className:"btn btn-page",onClick:()=>G(k=>Math.max(1,k-1)),disabled:I===1,children:"← Назад"}),i.jsx("div",{className:"page-numbers",children:[...Array(me)].map((k,L)=>i.jsx("button",{className:`page-number ${I===L+1?"active":""}`,onClick:()=>G(L+1),children:L+1},L))}),i.jsx("button",{className:"btn btn-page",onClick:()=>G(k=>Math.min(me,k+1)),disabled:I===me,children:"Вперед →"})]})]}),u&&y&&i.jsx("div",{className:"modal-backdrop",onClick:pt,children:i.jsxs("div",{className:"modal modal-view",onClick:k=>k.stopPropagation(),children:[i.jsxs("div",{className:"modal-head",children:[i.jsxs("div",{className:"modal-title",children:[i.jsx("span",{className:"modal-icon",children:"📋"}),i.jsxs("h3",{children:["Заказ #",y.id]})]}),i.jsx("button",{className:"btn btn-close",type:"button",onClick:pt,children:"✕"})]}),i.jsxs("div",{className:"view-content",children:[i.jsx("div",{className:"view-header",children:i.jsxs("div",{className:"view-status",style:{backgroundColor:(Jo=kr.find(k=>k.value===y.status))==null?void 0:Jo.color,color:(Zo=kr.find(k=>k.value===y.status))==null?void 0:Zo.textColor},children:[Go(y.status)," ",(es=kr.find(k=>k.value===y.status))==null?void 0:es.label]})}),i.jsxs("div",{className:"details-grid",children:[i.jsxs("div",{className:"detail-item",children:[i.jsx("label",{children:"📅 Дата создания"}),i.jsx("p",{children:re(y.orderDate)})]}),i.jsxs("div",{className:"detail-item",children:[i.jsx("label",{children:"💰 Сумма"}),i.jsxs("p",{className:"detail-value",children:[y.totalPrice||0," Br"]})]}),i.jsxs("div",{className:"detail-item",children:[i.jsx("label",{children:"🚗 Автомобиль"}),i.jsx("p",{children:O(y)})]}),i.jsxs("div",{className:"detail-item",children:[i.jsx("label",{children:"👤 Клиент"}),i.jsx("p",{children:C(y)})]}),i.jsxs("div",{className:"detail-item",children:[i.jsx("label",{children:"🔧 Услуги"}),i.jsx("p",{children:te(y)})]}),i.jsxs("div",{className:"detail-item",children:[i.jsx("label",{children:"📦 Запчасти"}),i.jsx("p",{children:Ne(y)})]}),i.jsxs("div",{className:"detail-item full-width",children:[i.jsx("label",{children:"📝 Описание"}),i.jsx("p",{className:"detail-description",children:y.description||"—"})]})]}),((ts=Kd[y.status])==null?void 0:ts.length)>0&&i.jsxs("div",{className:"status-actions-section",children:[i.jsx("h4",{children:"Изменить статус:"}),i.jsxs("div",{className:"status-buttons",children:[tr(y.status,"IN_PROGRESS")&&i.jsx("button",{className:"btn btn-status btn-in-progress",onClick:()=>{A(y.id,y.status,"IN_PROGRESS"),pt()},children:"🔧 В работу"}),tr(y.status,"COMPLETED")&&i.jsx("button",{className:"btn btn-status btn-completed",onClick:()=>{A(y.id,y.status,"COMPLETED"),pt()},children:"✅ Выполнить"}),tr(y.status,"CANCELLED")&&i.jsx("button",{className:"btn btn-status btn-cancelled",onClick:()=>{A(y.id,y.status,"CANCELLED"),pt()},children:"❌ Отменить"})]})]}),i.jsx("div",{className:"view-actions",children:i.jsx("button",{className:"btn btn-delete-action",onClick:()=>{X(y.id),pt()},children:"🗑️ Удалить заказ"})})]})]})}),N&&i.jsx("div",{className:"modal-backdrop",onClick:tn,children:i.jsxs("div",{className:"modal modal-form",onClick:k=>k.stopPropagation(),children:[i.jsxs("div",{className:"modal-head",children:[i.jsxs("div",{className:"modal-title",children:[i.jsx("span",{className:"modal-icon",children:M?"✏️":"➕"}),i.jsx("h3",{children:M?"Редактирование заказа":"Добавление заказа"})]}),i.jsx("button",{className:"btn btn-close",type:"button",onClick:tn,children:"✕"})]}),i.jsxs("form",{onSubmit:E,className:"form-grid",children:[i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Автомобиль *"}),i.jsx("input",{type:"text",placeholder:"Поиск по номеру или марке...",value:ke,onChange:k=>ve(k.target.value),className:"car-search-input"}),i.jsxs("select",{required:!0,value:b.carId,onChange:k=>P(L=>({...L,carId:k.target.value})),className:"car-select",children:[i.jsx("option",{value:"",children:"Выберите автомобиль"}),xe.map(k=>i.jsxs("option",{value:k.id,children:[k.brand," ",k.model," (",k.licensePlate,")"]},k.id))]}),ke&&xe.length===0&&i.jsx("div",{className:"no-results-hint",children:"Автомобили не найдены"})]}),!M&&i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Статус"}),i.jsx("div",{className:"status-new-only",children:i.jsx("span",{className:"status-badge status-new",children:"📋 Новый"})})]})]}),i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsxs("label",{className:"services-label",children:["Услуги",b.services.length>0&&i.jsxs("span",{className:"services-count",children:["(",b.services.length," выбрано)"]})]}),i.jsx("div",{className:"services-checkbox-list",children:v.length===0?i.jsx("div",{className:"no-services-message",children:"Нет доступных услуг"}):v.map(k=>{const L=Zd(k.id);return i.jsxs("div",{className:`service-checkbox ${L?"checked":""}`,onClick:()=>qd(k.id),children:[i.jsx("span",{className:`checkbox-custom ${L?"checked":""}`,children:L&&i.jsx("span",{className:"check-mark",children:"✓"})}),i.jsx("span",{className:"service-name",children:k.name}),i.jsxs("span",{className:"service-price",children:[k.price," Br"]})]},`service-${k.id}`)})}),Yo.length>0&&i.jsx("div",{className:"selected-services-list",children:i.jsx("div",{className:"selected-tags",children:Yo.map((k,L)=>i.jsx("span",{className:"service-tag",children:k},L))})})]}),i.jsxs("div",{className:"form-field",children:[i.jsxs("label",{className:"services-label",children:["Запчасти",b.spares.length>0&&i.jsxs("span",{className:"services-count",children:["(",b.spares.length," выбрано)"]})]}),i.jsx("div",{className:"services-checkbox-list",children:m.length===0?i.jsx("div",{className:"no-services-message",children:"Нет доступных запчастей"}):m.map(k=>{const L=ef(k.id);return i.jsxs("div",{className:`service-checkbox ${L?"checked":""}`,onClick:()=>Jd(k.id),children:[i.jsx("span",{className:`checkbox-custom ${L?"checked":""}`,children:L&&i.jsx("span",{className:"check-mark",children:"✓"})}),i.jsx("span",{className:"service-name",children:k.name}),i.jsxs("span",{className:"service-price",children:[k.price," Br"]})]},`spare-${k.id}`)})}),qo.length>0&&i.jsx("div",{className:"selected-services-list",children:i.jsx("div",{className:"selected-tags",children:qo.map((k,L)=>i.jsx("span",{className:"service-tag",children:k},L))})})]})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Описание"}),i.jsx("textarea",{placeholder:"Описание заказа",rows:3,value:b.description,onChange:k=>P(L=>({...L,description:k.target.value}))})]}),i.jsxs("div",{className:"form-actions",children:[i.jsx("button",{type:"button",className:"btn btn-cancel",onClick:tn,children:"Отмена"}),i.jsx("button",{className:"btn btn-submit",disabled:e,type:"submit",children:M?"Сохранить":"Создать"})]})]})]})}),i.jsx("style",{children:`
        :root {
          --bg-primary: #f9fafb;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f3f4f6;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-muted: #9ca3af;
          --border-color: #e5e7eb;
          --border-color-hover: #d1d5db;
          --accent-primary: #2563eb;
          --accent-hover: #1d4ed8;
          --accent-light: #eff6ff;
          --danger-primary: #dc2626;
          --danger-hover: #b91c1c;
          --danger-light: #fef2f2;
          --success-primary: #16a34a;
          --success-light: #f0fdf4;
          --warning-primary: #d97706;
          --warning-light: #fffbeb;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --modal-backdrop: rgba(0, 0, 0, 0.5);
        }

        [data-theme="dark"], .dark-theme {
          --bg-primary: #111827;
          --bg-secondary: #1f2937;
          --bg-tertiary: #374151;
          --text-primary: #f9fafb;
          --text-secondary: #d1d5db;
          --text-muted: #6b7280;
          --border-color: #374151;
          --border-color-hover: #4b5563;
          --accent-primary: #3b82f6;
          --accent-hover: #2563eb;
          --accent-light: rgba(59, 130, 246, 0.15);
          --danger-primary: #ef4444;
          --danger-hover: #dc2626;
          --danger-light: rgba(239, 68, 68, 0.15);
          --success-primary: #22c55e;
          --success-light: rgba(34, 197, 94, 0.15);
          --warning-primary: #f59e0b;
          --warning-light: rgba(245, 158, 11, 0.15);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
          --modal-backdrop: rgba(0, 0, 0, 0.7);
        }

        .orders-page {
          padding: 1rem;
          min-height: 100%;
          background-color: var(--bg-primary);
          margin-top: 0;
        }

        .controls-container {
          margin-bottom: 1.5rem;
          margin-top: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .filter-bar {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          min-width: 150px;
        }

        .filter-field label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .filter-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-primary);
          background: var(--bg-secondary);
        }

        .filter-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .sort-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .sort-label {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .btn-sort {
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .btn-sort:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }

        .btn-sort.active {
          background: var(--accent-light);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .actions-group {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-xl {
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--accent-hover);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid transparent;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .order-card {
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: stretch;
          gap: 1.25rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .order-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .order-card.skeleton {
          animation: none;
        }

        .order-icon {
          width: 70px;
          height: 70px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          flex-shrink: 0;
          background: var(--bg-tertiary);
        }

        .skeleton-icon {
          background: var(--border-color);
          animation: pulse 1.5s infinite;
        }

        .order-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .order-number {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .order-client {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .order-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .order-date,
        .order-price {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .detail-separator {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .order-status {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.35rem 0.65rem;
          border-radius: 4px;
          display: inline-block;
          width: fit-content;
        }

        .order-status-actions {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
          margin-top: 0.35rem;
        }

        .status-btn {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .status-btn:hover {
          transform: scale(1.1);
        }

        .status-in-progress {
          background: var(--warning-light);
          color: var(--warning-primary);
        }

        .status-in-progress:hover {
          background: var(--warning-primary);
          color: white;
        }

        .status-completed {
          background: var(--success-light);
          color: var(--success-primary);
        }

        .status-completed:hover {
          background: var(--success-primary);
          color: white;
        }

        .status-cancelled {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .status-cancelled:hover {
          background: var(--danger-primary);
          color: white;
        }

        .order-card-actions {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
        }

        .skeleton-actions {
          width: 40px;
          height: 120px;
          background: var(--border-color);
          border-radius: 6px;
          animation: pulse 1.5s infinite;
        }

        .btn-view,
        .btn-edit,
        .btn-delete {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .btn-view {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .btn-view:hover {
          filter: brightness(0.95);
        }

        .btn-edit {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .btn-edit:hover {
          filter: brightness(0.95);
        }

        .btn-delete {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .btn-delete:hover {
          filter: brightness(0.95);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-page {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .btn-page:hover:not(:disabled) {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }
        .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }

        .page-numbers { display: flex; gap: 0.25rem; }

        .page-number {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }
        .page-number:hover { background: var(--bg-tertiary); }
        .page-number.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--modal-backdrop);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 1.5rem;
          width: 100%;
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
        }

        .modal-view {
          max-width: 750px;
        }

        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .modal-icon {
          font-size: 1.5rem;
        }

        .modal-title h3 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .btn-close {
          width: 32px; height: 32px;
          border: none; background: transparent;
          font-size: 1.25rem; color: var(--text-secondary);
          cursor: pointer;
        }
        .btn-close:hover { color: var(--text-primary); }

        .view-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .view-header {
          display: flex;
          justify-content: center;
          padding: 1rem;
          background: var(--bg-tertiary);
          border-radius: 8px;
        }

        .view-status {
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.6rem 1.75rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .detail-item {
          padding: 1.25rem;
          background: var(--bg-tertiary);
          border-radius: 8px;
        }

        .detail-item label {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 0.6rem;
        }

        .detail-item p {
          margin: 0;
          font-size: 1.05rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .detail-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .detail-description {
          white-space: pre-wrap;
          word-break: break-word;
        }

        .full-width {
          grid-column: span 2;
        }

        .status-actions-section {
          padding: 1.25rem;
          background: var(--bg-tertiary);
          border-radius: 8px;
        }

        .status-actions-section h4 {
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .status-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .btn-status {
          padding: 0.65rem 1.25rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .btn-status:hover {
          transform: translateY(-2px);
        }

        .btn-in-progress {
          background: var(--warning-light);
          color: var(--warning-primary);
        }

        .btn-in-progress:hover {
          background: var(--warning-primary);
          color: white;
        }

        .btn-completed {
          background: var(--success-light);
          color: var(--success-primary);
        }

        .btn-completed:hover {
          background: var(--success-primary);
          color: white;
        }

        .btn-cancelled {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .btn-cancelled:hover {
          background: var(--danger-primary);
          color: white;
        }

        .view-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-delete-action {
          background: var(--danger-light);
          color: var(--danger-primary);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-delete-action:hover {
          background: var(--danger-primary);
          color: white;
        }

        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
          min-width: 200px;
        }

        .form-field label {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .services-label {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .services-count {
          font-weight: 600;
          color: var(--accent-primary);
          font-size: 0.85rem;
        }

        .car-search-input {
          padding: 0.6rem 0.85rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.95rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .car-search-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .car-select {
          padding: 0.6rem 0.85rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.95rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
          max-height: 200px;
        }

        .car-select:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .no-results-hint {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
          padding: 0.5rem;
          background: var(--bg-tertiary);
          border-radius: 4px;
          text-align: center;
        }

        .status-new-only {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 0.85rem;
          background: var(--accent-light);
          border-radius: 6px;
        }

        .status-badge {
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.35rem 0.6rem;
          border-radius: 4px;
        }

        .status-new {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .form-field input,
        .form-field textarea,
        .form-field select {
          padding: 0.6rem 0.85rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.95rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .form-field textarea {
          resize: vertical;
          font-family: inherit;
        }

        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .services-checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          max-height: 180px;
          overflow-y: auto;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
        }

        .service-checkbox {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.65rem 0.85rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }

        .service-checkbox:hover {
          background: var(--bg-tertiary);
        }

        .service-checkbox.checked {
          background: var(--accent-light);
        }

        .checkbox-custom {
          width: 22px;
          height: 22px;
          border: 2px solid var(--border-color);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
          background: var(--bg-secondary);
        }

        .checkbox-custom.checked {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .check-mark {
          color: white;
          font-size: 15px;
          font-weight: bold;
          line-height: 1;
        }

        .service-name {
          flex: 1;
          font-size: 0.95rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .service-price {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .no-services-message {
          padding: 1.25rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .selected-services-list {
          margin-top: 0.6rem;
          padding: 0.75rem;
          background: var(--bg-tertiary);
          border-radius: 6px;
        }

        .selected-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .service-tag {
          display: inline-block;
          padding: 0.35rem 0.65rem;
          background: var(--accent-light);
          color: var(--accent-primary);
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-cancel {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .btn-cancel:hover { background: var(--bg-tertiary); }

        .btn-submit {
          background: var(--accent-primary);
          color: white;
        }
        .btn-submit:hover:not(:disabled) { background: var(--accent-hover); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .skeleton { animation: pulse 1.5s infinite; background: var(--bg-tertiary); }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        .skeleton-text { height: 1rem; background: var(--border-color); border-radius: 4px; }

        @media (max-width: 768px) {
          .actions-row { flex-direction: column; align-items: stretch; }
          .sort-controls { justify-content: center; margin-bottom: 0.5rem; }
          .actions-group { justify-content: center; }
          .orders-grid { grid-template-columns: 1fr; }
          .order-card { grid-template-columns: 60px 1fr; }
          .order-card-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
          .filter-row { flex-direction: column; }
          .modal { min-width: 90%; margin: 1rem; }
          .form-row { flex-direction: column; }
          .pagination { flex-wrap: wrap; }
          .details-grid { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          .view-actions { flex-direction: column; }
          .view-actions .btn { width: 100%; }
        }
      `})]})}const Kh={firstName:"",lastName:"",phone:"",hireDate:"",serviceIds:[]},ql=18;function Xh(){const{loading:e,error:t,run:r,setError:n}=gr(),[a,l]=x.useState(!0),[o,c]=x.useState([]),[s,d]=x.useState([]),[v,p]=x.useState(""),[m,j]=x.useState(null),[y,S]=x.useState(!1),[N,f]=x.useState({...Kh,serviceIds:[]}),[u,h]=x.useState("name"),[b,P]=x.useState("asc"),[_,D]=x.useState(1),R=x.useMemo(()=>!!(m!=null&&m.id),[m]);function B(g){u===g?P(E=>E==="asc"?"desc":"asc"):(h(g),P("asc"))}async function I(){try{const[g,E]=await Promise.all([q.mechanics.list(),q.services.list()]);c(g||[]),d(E||[])}catch(g){console.error("loadAll error:",g),n(g.message||"Ошибка загрузки данных"),c([])}finally{l(!1)}}x.useEffect(()=>{I()},[]),x.useEffect(()=>{D(1)},[v]);const G=x.useMemo(()=>{let g=[...o];if(v&&v.length>=2){const E=v.toLowerCase();g=g.filter(A=>(A.firstName||"").toLowerCase().includes(E)||(A.lastName||"").toLowerCase().includes(E)||(A.phone||"").toLowerCase().includes(E))}return g},[o,v]),Y=x.useMemo(()=>{const g=[...G];return g.sort((E,A)=>{let X,re;return u==="name"?(X=`${E.firstName} ${E.lastName}`,re=`${A.firstName} ${A.lastName}`,b==="asc"?X.localeCompare(re):re.localeCompare(X)):u==="phone"?(X=E.phone||"",re=A.phone||"",b==="asc"?X.localeCompare(re):re.localeCompare(X)):u==="hireDate"?(X=E.hireDate||"",re=A.hireDate||"",b==="asc"?X.localeCompare(re):re.localeCompare(X)):u==="services"?(X=(E.serviceNames||[]).length,re=(A.serviceNames||[]).length,b==="asc"?X-re:re-X):0}),g},[G,u,b]),ge=x.useMemo(()=>{const g=(_-1)*ql,E=g+ql;return Y.slice(g,E)},[Y,_]),ae=x.useMemo(()=>Math.ceil(Y.length/ql),[Y.length]);function we(g){j(g),S(!1);const E=(g.serviceIds||[]).filter(A=>A!=null&&A!==""&&A!=="null"&&A!=="undefined").map(A=>String(A));f({firstName:g.firstName||"",lastName:g.lastName||"",phone:g.phone||"",hireDate:g.hireDate||"",serviceIds:E})}function ke(){j(null),f({firstName:"",lastName:"",phone:"",hireDate:"",serviceIds:[]}),S(!0),n("")}function ve(){p(""),D(1)}function M(){return N.firstName.trim()?N.lastName.trim()?!0:(alert("Введите фамилию механика"),!1):(alert("Введите имя механика"),!1)}async function $(g){if(g.preventDefault(),n(""),!!M())try{const E={...N},A=(E.serviceIds||[]).filter(re=>re!=null&&re!==""&&re!=="null"&&re!=="undefined").map(re=>Number(re)),X={firstName:E.firstName,lastName:E.lastName,phone:E.phone||null,hireDate:E.hireDate||null,serviceIds:A};R?(await r(()=>q.mechanics.update(m.id,X)),alert("Механик успешно обновлён")):(await r(()=>q.mechanics.create(X)),alert("Механик успешно добавлен"),S(!1)),j(null),f({firstName:"",lastName:"",phone:"",hireDate:"",serviceIds:[]}),await I()}catch(E){console.error("❌ Ошибка сохранения:",E),alert(E.message||"Ошибка при сохранении")}}async function U(g){if(window.confirm("Удалить механика?"))try{await r(()=>q.mechanics.remove(g)),(m==null?void 0:m.id)===g&&(j(null),f({firstName:"",lastName:"",phone:"",hireDate:"",serviceIds:[]})),alert("Механик успешно удалён"),await I()}catch(E){console.error("❌ Ошибка удаления:",E),alert(E.message||"Ошибка при удалении")}}const Q=R||y,Z=()=>{j(null),S(!1),f({firstName:"",lastName:"",phone:"",hireDate:"",serviceIds:[]})},me=v&&v.length>=2,xe=e||a,w=(g,E)=>{const A=(g==null?void 0:g.charAt(0))||"",X=(E==null?void 0:E.charAt(0))||"";return(A+X).toUpperCase()},z=g=>{if(g==null)return;const E=String(g);f(A=>{const X=Array.isArray(A.serviceIds)?A.serviceIds:[],xr=X.includes(E)?X.filter(pt=>pt!==E):[...X,E];return{...A,serviceIds:xr}})},V=g=>g==null?!1:(Array.isArray(N.serviceIds)?N.serviceIds:[]).includes(String(g)),W=x.useMemo(()=>Array.isArray(N.serviceIds)?N.serviceIds.map(g=>{var E;return(E=s.find(A=>String(A.id)===g))==null?void 0:E.name}).filter(Boolean):[],[N.serviceIds,s]);return i.jsxs("div",{className:"mechanics-page",children:[i.jsxs("div",{className:"controls-container",children:[i.jsx("div",{className:"filter-bar",children:i.jsx("div",{className:"filter-row",children:i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Поиск"}),i.jsx("input",{type:"text",placeholder:"По имени, фамилии или телефону (2+ символа)",value:v,onChange:g=>p(g.target.value),className:"filter-input"})]})})}),i.jsxs("div",{className:"actions-row",children:[i.jsxs("div",{className:"sort-controls",children:[i.jsx("span",{className:"sort-label",children:"Сортировать:"}),i.jsxs("button",{className:`btn btn-sort ${u==="name"?"active":""}`,onClick:()=>B("name"),children:["По имени ",u==="name"&&(b==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${u==="phone"?"active":""}`,onClick:()=>B("phone"),children:["По телефону ",u==="phone"&&(b==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${u==="hireDate"?"active":""}`,onClick:()=>B("hireDate"),children:["По дате найма ",u==="hireDate"&&(b==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${u==="services"?"active":""}`,onClick:()=>B("services"),children:["По услугам ",u==="services"&&(b==="asc"?"↑":"↓")]})]}),i.jsxs("div",{className:"actions-group",children:[me&&i.jsx("button",{className:"btn btn-ghost",type:"button",onClick:ve,children:"Сбросить фильтры"}),i.jsx("button",{className:"btn btn-primary btn-xl",type:"button",onClick:ke,children:"+ Добавить механика"})]})]})]}),t&&i.jsx(vr,{type:"error",children:t}),xe?i.jsx("div",{className:"mechanics-grid",children:[...Array(8)].map((g,E)=>i.jsxs("div",{className:"mechanic-card skeleton",children:[i.jsx("div",{className:"mechanic-avatar skeleton-avatar"}),i.jsxs("div",{className:"mechanic-info",children:[i.jsx("div",{className:"mechanic-name skeleton-text"}),i.jsx("div",{className:"mechanic-phone skeleton-text"}),i.jsx("div",{className:"mechanic-services skeleton-text"})]}),i.jsx("div",{className:"mechanic-actions skeleton-actions"})]},E))}):Y.length===0?i.jsx(Yt,{children:me?"По вашему запросу ничего не найдено":"Нет механиков"}):i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"mechanics-grid",children:ge.map(g=>i.jsxs("div",{className:"mechanic-card",children:[i.jsx("div",{className:"mechanic-avatar",children:w(g.firstName,g.lastName)}),i.jsxs("div",{className:"mechanic-info",children:[i.jsxs("div",{className:"mechanic-name",title:`${g.firstName} ${g.lastName}`,children:[g.firstName," ",g.lastName]}),i.jsxs("div",{className:"mechanic-details",children:[i.jsx("span",{className:"detail-item",title:g.phone,children:g.phone||"—"}),g.hireDate&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"detail-separator",children:"•"}),i.jsx("span",{className:"detail-item",children:g.hireDate})]})]}),i.jsx("div",{className:"mechanic-services",title:(g.serviceNames||[]).join(", "),children:(g.serviceNames||[]).length>0?`${(g.serviceNames||[]).length} усл.`:"Нет услуг"})]}),i.jsxs("div",{className:"mechanic-actions",children:[i.jsx("button",{className:"btn btn-edit",type:"button",onClick:()=>we(g),title:"Редактировать",children:"✏️"}),i.jsx("button",{className:"btn btn-delete",type:"button",onClick:()=>U(g.id),title:"Удалить",children:"🗑️"})]})]},g.id))}),ae>1&&i.jsxs("div",{className:"pagination",children:[i.jsx("button",{className:"btn btn-page",onClick:()=>D(g=>Math.max(1,g-1)),disabled:_===1,children:"← Назад"}),i.jsx("div",{className:"page-numbers",children:[...Array(ae)].map((g,E)=>i.jsx("button",{className:`page-number ${_===E+1?"active":""}`,onClick:()=>D(E+1),children:E+1},E))}),i.jsx("button",{className:"btn btn-page",onClick:()=>D(g=>Math.min(ae,g+1)),disabled:_===ae,children:"Вперед →"})]})]}),Q&&i.jsx("div",{className:"modal-backdrop",onClick:Z,children:i.jsxs("div",{className:"modal",onClick:g=>g.stopPropagation(),children:[i.jsxs("div",{className:"modal-head",children:[i.jsx("div",{className:"modal-title",children:i.jsx("h3",{children:R?"Редактирование механика":"Добавление механика"})}),i.jsx("button",{className:"btn btn-close",type:"button",onClick:Z,children:"✕"})]}),i.jsxs("form",{className:"form-grid",onSubmit:$,children:[i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Имя *"}),i.jsx("input",{required:!0,placeholder:"Имя",value:N.firstName,onChange:g=>f(E=>({...E,firstName:g.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Фамилия *"}),i.jsx("input",{required:!0,placeholder:"Фамилия",value:N.lastName,onChange:g=>f(E=>({...E,lastName:g.target.value}))})]})]}),i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Телефон"}),i.jsx("input",{placeholder:"+375 XX XXX XX XX",value:N.phone,onChange:g=>f(E=>({...E,phone:g.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Дата найма"}),i.jsx("input",{type:"date",value:N.hireDate,onChange:g=>f(E=>({...E,hireDate:g.target.value}))})]})]}),i.jsxs("div",{className:"form-field",children:[i.jsxs("label",{className:"services-label",children:["Услуги",N.serviceIds&&N.serviceIds.length>0&&i.jsxs("span",{className:"services-count",children:["(",N.serviceIds.length," выбрано)"]})]}),i.jsx("div",{className:"services-checkbox-list",children:s.length===0?i.jsx("div",{className:"no-services-message",children:"Нет доступных услуг"}):s.map((g,E)=>{const A=g.id!=null?g.id:`temp-${E}`,X=V(A);return i.jsxs("div",{className:`service-checkbox ${X?"checked":""}`,onClick:()=>z(A),children:[i.jsx("span",{className:`checkbox-custom ${X?"checked":""}`,children:X&&i.jsx("span",{className:"check-mark",children:"✓"})}),i.jsx("span",{className:"service-name",children:g.name}),i.jsxs("span",{className:"service-price",children:[g.price," Br"]})]},g.id!=null?`service-${g.id}`:`service-${E}`)})}),W.length>0&&i.jsx("div",{className:"selected-services-list",children:i.jsx("div",{className:"selected-tags",children:W.map((g,E)=>i.jsx("span",{className:"service-tag",children:g},E))})})]}),i.jsxs("div",{className:"form-actions",children:[i.jsx("button",{type:"button",className:"btn btn-cancel",onClick:Z,children:"Отмена"}),i.jsx("button",{className:"btn btn-submit",disabled:e,type:"submit",children:R?"Сохранить":"Создать"})]})]})]},`form-${(m==null?void 0:m.id)||"new"}`)}),i.jsx("style",{children:`
        :root {
          --bg-primary: #f9fafb;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f3f4f6;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-muted: #9ca3af;
          --border-color: #e5e7eb;
          --border-color-hover: #d1d5db;
          --accent-primary: #2563eb;
          --accent-hover: #1d4ed8;
          --accent-light: #eff6ff;
          --danger-primary: #dc2626;
          --danger-light: #fef2f2;
          --danger-hover: #fee2e2;
          --success-primary: #16a34a;
          --success-light: #f0fdf4;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --modal-backdrop: rgba(0, 0, 0, 0.5);
        }

        [data-theme="dark"], .dark-theme {
          --bg-primary: #111827;
          --bg-secondary: #1f2937;
          --bg-tertiary: #374151;
          --text-primary: #f9fafb;
          --text-secondary: #d1d5db;
          --text-muted: #6b7280;
          --border-color: #374151;
          --border-color-hover: #4b5563;
          --accent-primary: #3b82f6;
          --accent-hover: #2563eb;
          --accent-light: rgba(59, 130, 246, 0.15);
          --danger-primary: #ef4444;
          --danger-light: rgba(239, 68, 68, 0.15);
          --danger-hover: rgba(239, 68, 68, 0.25);
          --success-primary: #22c55e;
          --success-light: rgba(34, 197, 94, 0.15);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
          --modal-backdrop: rgba(0, 0, 0, 0.7);
        }

        .mechanics-page {
          padding: 1rem;
          min-height: 100%;
          background-color: var(--bg-primary);
          margin-top: 0;
        }

        .controls-container {
          margin-bottom: 1.5rem;
          margin-top: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .filter-bar {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          min-width: 150px;
        }

        .filter-field label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .filter-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-primary);
          background: var(--bg-secondary);
        }

        .filter-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .sort-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .sort-label {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .btn-sort {
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .btn-sort:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }

        .btn-sort.active {
          background: var(--accent-light);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .actions-group {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-xl {
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--accent-hover);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid transparent;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .mechanics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .mechanic-card {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .mechanic-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .mechanic-card.skeleton {
          animation: none;
        }

        .mechanic-avatar {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.5rem;
          flex-shrink: 0;
          background: var(--bg-tertiary);
        }

        .skeleton-avatar {
          background: var(--border-color);
          animation: pulse 1.5s infinite;
        }

        .mechanic-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .mechanic-name {
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mechanic-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .detail-item {
          font-size: 0.85rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 130px;
        }

        .detail-separator {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .mechanic-services {
          font-size: 0.8rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mechanic-actions {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex-shrink: 0;
        }

        .skeleton-actions {
          width: 36px;
          height: 72px;
          background: var(--border-color);
          border-radius: 6px;
          animation: pulse 1.5s infinite;
        }

        .btn-edit,
        .btn-delete {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .btn-edit {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .btn-edit:hover {
          filter: brightness(0.95);
        }

        .btn-delete {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .btn-delete:hover {
          filter: brightness(0.95);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-page {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .btn-page:hover:not(:disabled) {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }
        .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }

        .page-numbers { display: flex; gap: 0.25rem; }

        .page-number {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }
        .page-number:hover { background: var(--bg-tertiary); }
        .page-number.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .services-label {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .services-count {
          font-weight: 600;
          color: var(--accent-primary);
          font-size: 0.8rem;
        }

        .services-checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 200px;
          overflow-y: auto;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
        }

        .service-checkbox {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }

        .service-checkbox:hover {
          background: var(--bg-tertiary);
        }

        .service-checkbox.checked {
          background: var(--accent-light);
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-color);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
          background: var(--bg-secondary);
        }

        .checkbox-custom.checked {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .check-mark {
          color: white;
          font-size: 14px;
          font-weight: bold;
          line-height: 1;
        }

        .service-name {
          flex: 1;
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .service-price {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .no-services-message {
          padding: 1rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .selected-services-list {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: var(--bg-tertiary);
          border-radius: 6px;
        }

        .selected-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .service-tag {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          background: var(--accent-light);
          color: var(--accent-primary);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--modal-backdrop);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 1.5rem;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
        }

        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }
        .modal-title h3 { margin: 0; font-size: 1.25rem; color: var(--text-primary); }

        .btn-close {
          width: 32px; height: 32px;
          border: none; background: transparent;
          font-size: 1.25rem; color: var(--text-secondary);
          cursor: pointer;
        }
        .btn-close:hover { color: var(--text-primary); }

        .form-grid { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .form-field { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; min-width: 200px; }
        .form-field label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }

        .form-field input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .form-field input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-cancel {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .btn-cancel:hover { background: var(--bg-tertiary); }

        .btn-submit {
          background: var(--accent-primary);
          color: white;
        }
        .btn-submit:hover:not(:disabled) { background: var(--accent-hover); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .skeleton { animation: pulse 1.5s infinite; background: var(--bg-tertiary); }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        .skeleton-text { height: 1rem; background: var(--border-color); border-radius: 4px; }

        @media (max-width: 768px) {
          .actions-row { flex-direction: column; align-items: stretch; }
          .sort-controls { justify-content: center; margin-bottom: 0.5rem; }
          .actions-group { justify-content: center; }
          .mechanics-grid { grid-template-columns: 1fr; }
          .mechanic-card { grid-template-columns: 60px 1fr; }
          .mechanic-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
          .filter-row { flex-direction: column; }
          .modal { min-width: 90%; margin: 1rem; }
          .form-row { flex-direction: column; }
          .pagination { flex-wrap: wrap; }
          .detail-item { max-width: 100%; }
        }
      `})]})}const ga={name:"",description:"",price:"",duration:"",status:"active"},Jl=18;function Gh(){const{loading:e,error:t,run:r,setError:n}=gr(),[a,l]=x.useState(!0),[o,c]=x.useState([]),[s,d]=x.useState(""),[v,p]=x.useState(null),[m,j]=x.useState(!1),[y,S]=x.useState(ga),[N,f]=x.useState("name"),[u,h]=x.useState("asc"),[b,P]=x.useState(1),[_,D]=x.useState(0),R=!!(v!=null&&v.id)&&m;function B(w){N===w?h(z=>z==="asc"?"desc":"asc"):(f(w),h("asc"))}async function I(){try{console.log("🔄 [ServicesPage] Загрузка списка услуг...");const w=await q.services.list();console.log("✅ [ServicesPage] Загружено услуг:",(w==null?void 0:w.length)||0),Array.isArray(w)?c(w):c([])}catch(w){console.error("❌ [ServicesPage] loadAll error:",w),n(w.message||"Ошибка загрузки данных"),c([])}finally{l(!1)}}x.useEffect(()=>{I()},[_]),x.useEffect(()=>{P(1)},[s]);const G=x.useMemo(()=>{let w=[...o];if(s&&s.length>=3){const z=s.toLowerCase();w=w.filter(V=>V.name.toLowerCase().includes(z)||V.description&&V.description.toLowerCase().includes(z))}return w},[o,s]),Y=x.useMemo(()=>{const w=[...G];return w.sort((z,V)=>{let W,g;return N==="name"?(W=z.name||"",g=V.name||"",u==="asc"?W.localeCompare(g):g.localeCompare(W)):N==="price"?(W=Number(z.price)||0,g=Number(V.price)||0,u==="asc"?W-g:g-W):N==="duration"?(W=z.duration||"",g=V.duration||"",u==="asc"?W.localeCompare(g):g.localeCompare(W)):0}),w},[G,N,u]),ge=x.useMemo(()=>{const w=(b-1)*Jl,z=w+Jl;return Y.slice(w,z)},[Y,b]),ae=x.useMemo(()=>Math.ceil(Y.length/Jl),[Y.length]);function we(){console.log("📝 [ServicesPage] Открытие формы создания"),p(null),S({...ga}),j(!0),n("")}function ke(w){console.log("✏️ [ServicesPage] Открытие формы редактирования:",w),p(w),S({name:w.name||"",description:w.description||"",price:w.price!==null&&w.price!==void 0?String(w.price):"",duration:w.duration||"",status:w.status||"active"}),j(!0)}function ve(){if(!y.name.trim())return alert("Введите название услуги"),!1;const w=Number(y.price);return!y.price||isNaN(w)||w<=0?(alert("Введите корректную цену (больше 0)"),!1):!0}async function M(w){var z,V;if(w.preventDefault(),n(""),!!ve())try{const W={name:y.name.trim(),description:((z=y.description)==null?void 0:z.trim())||null,price:Number(y.price),duration:((V=y.duration)==null?void 0:V.trim())||null,status:y.status||"active"};if(console.log("📤 [ServicesPage] Отправка данных:",W),R&&(v!=null&&v.id))console.log("🔄 [ServicesPage] Обновление услуги ID:",v.id),await r(()=>q.services.update(v.id,W)),console.log("✅ [ServicesPage] Услуга обновлена"),alert("Услуга успешно обновлена");else{console.log("➕ [ServicesPage] Создание новой услуги");const g=await r(()=>q.services.create(W));console.log("✅ [ServicesPage] Услуга создана, ID:",g==null?void 0:g.id),alert("Услуга успешно добавлена")}j(!1),p(null),S({...ga}),D(g=>g+1)}catch(W){console.error("❌ [ServicesPage] onSubmit error:",W),alert(W.message||"Ошибка при сохранении")}}async function $(w){if(console.log("🗑️ [ServicesPage] onDelete вызван с ID:",w,"Тип:",typeof w),!w){console.error("❌ [ServicesPage] serviceId is null/undefined"),alert("Ошибка: ID услуги не определен");return}const z=Number(w);if(isNaN(z)){console.error("❌ [ServicesPage] serviceId is not a valid number:",w),alert("Ошибка: Неверный формат ID");return}if(window.confirm("Удалить услугу?"))try{console.log("📤 [ServicesPage] Отправка DELETE запроса для ID:",z),await r(()=>q.services.remove(z)),console.log("✅ [ServicesPage] DELETE запрос выполнен успешно"),(v==null?void 0:v.id)===w&&p(null),alert("Услуга успешно удалена"),D(V=>V+1)}catch(V){console.error("❌ [ServicesPage] onDelete error:",V),alert(V.message||"Ошибка при удалении")}}function U(){d(""),P(1)}function Q(){j(!1),p(null),S({...ga})}const Z=s&&s.length>=3,me=e||a,xe=w=>{const z={Диагностика:"🔍",Ремонт:"🔧",Замена:"🔄",Проверка:"✅",Настройка:"⚙️",Чистка:"🧹",Масло:"🛢️",Фильтр:"🔬"};for(const[V,W]of Object.entries(z))if(w&&w.includes(V))return W;return"🔧"};return i.jsxs("div",{className:"services-page",children:[i.jsxs("div",{className:"controls-container",children:[i.jsx("div",{className:"filter-bar",children:i.jsx("div",{className:"filter-row",children:i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Поиск"}),i.jsx("input",{type:"text",placeholder:"По названию или описанию (3+ символа)",value:s,onChange:w=>d(w.target.value),className:"filter-input"})]})})}),i.jsxs("div",{className:"actions-row",children:[i.jsxs("div",{className:"sort-controls",children:[i.jsx("span",{className:"sort-label",children:"Сортировать:"}),i.jsxs("button",{className:`btn btn-sort ${N==="name"?"active":""}`,onClick:()=>B("name"),children:["По названию ",N==="name"&&(u==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${N==="price"?"active":""}`,onClick:()=>B("price"),children:["По цене ",N==="price"&&(u==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${N==="duration"?"active":""}`,onClick:()=>B("duration"),children:["По длительности ",N==="duration"&&(u==="asc"?"↑":"↓")]})]}),i.jsxs("div",{className:"actions-group",children:[Z&&i.jsx("button",{className:"btn btn-ghost",type:"button",onClick:U,children:"Сбросить фильтры"}),i.jsx("button",{className:"btn btn-primary btn-xl",type:"button",onClick:we,children:"+ Добавить услугу"})]})]})]}),t&&i.jsx(vr,{type:"error",children:t}),me?i.jsx("div",{className:"services-grid",children:[...Array(8)].map((w,z)=>i.jsxs("div",{className:"service-card skeleton",children:[i.jsx("div",{className:"service-icon skeleton-icon"}),i.jsxs("div",{className:"service-info",children:[i.jsx("div",{className:"service-name skeleton-text"}),i.jsx("div",{className:"service-duration skeleton-text"}),i.jsx("div",{className:"service-price skeleton-text"})]}),i.jsx("div",{className:"service-actions skeleton-actions"})]},z))}):Y.length===0?i.jsx(Yt,{children:Z?"По вашему запросу ничего не найдено":"Нет услуг"}):i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"services-grid",children:ge.map(w=>i.jsxs("div",{className:"service-card",children:[i.jsx("div",{className:"service-icon",children:xe(w.name)}),i.jsxs("div",{className:"service-info",children:[i.jsx("div",{className:"service-name",title:w.name,children:w.name}),i.jsxs("div",{className:"service-details",children:[w.duration&&i.jsxs("span",{className:"service-duration",children:["⏱️ ",w.duration]}),i.jsx("span",{className:"detail-separator",children:"•"}),i.jsxs("span",{className:"service-price",children:[w.price," Br"]})]})]}),i.jsxs("div",{className:"service-actions",children:[i.jsx("button",{className:"btn btn-edit",type:"button",onClick:()=>ke(w),title:"Редактировать",children:"✏️"}),i.jsx("button",{className:"btn btn-delete",type:"button",onClick:()=>$(w.id),title:"Удалить",children:"🗑️"})]})]},w.id))}),ae>1&&i.jsxs("div",{className:"pagination",children:[i.jsx("button",{className:"btn btn-page",onClick:()=>P(w=>Math.max(1,w-1)),disabled:b===1,children:"← Назад"}),i.jsx("div",{className:"page-numbers",children:[...Array(ae)].map((w,z)=>i.jsx("button",{className:`page-number ${b===z+1?"active":""}`,onClick:()=>P(z+1),children:z+1},z))}),i.jsx("button",{className:"btn btn-page",onClick:()=>P(w=>Math.min(ae,w+1)),disabled:b===ae,children:"Вперед →"})]})]}),m&&i.jsx("div",{className:"modal-backdrop",onClick:Q,children:i.jsxs("div",{className:"modal",onClick:w=>w.stopPropagation(),children:[i.jsxs("div",{className:"modal-head",children:[i.jsx("div",{className:"modal-title",children:i.jsx("h3",{children:R?"✏️ Редактирование услуги":"➕ Добавление услуги"})}),i.jsx("button",{className:"btn btn-close",type:"button",onClick:Q,children:"✕"})]}),i.jsxs("form",{className:"form-grid",onSubmit:M,children:[i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Название *"}),i.jsx("input",{required:!0,placeholder:"Название услуги",value:y.name,onChange:w=>S(z=>({...z,name:w.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Длительность"}),i.jsx("input",{placeholder:"Например: 60 мин",value:y.duration,onChange:w=>S(z=>({...z,duration:w.target.value}))})]})]}),i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Цена *"}),i.jsx("input",{required:!0,type:"number",step:"0.01",min:"0",placeholder:"0.00",value:y.price,onChange:w=>S(z=>({...z,price:w.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Статус"}),i.jsxs("select",{value:y.status,onChange:w=>S(z=>({...z,status:w.target.value})),children:[i.jsx("option",{value:"active",children:"Активна"}),i.jsx("option",{value:"inactive",children:"Неактивна"})]})]})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Описание"}),i.jsx("textarea",{placeholder:"Описание услуги",rows:4,value:y.description,onChange:w=>S(z=>({...z,description:w.target.value}))})]}),i.jsxs("div",{className:"form-actions",children:[i.jsx("button",{type:"button",className:"btn btn-cancel",onClick:Q,children:"Отмена"}),i.jsx("button",{className:"btn btn-submit",disabled:e,type:"submit",children:R?"Сохранить изменения":"Создать услугу"})]})]})]})}),i.jsx("style",{children:`
        :root {
          --bg-primary: #f9fafb;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f3f4f6;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-muted: #9ca3af;
          --border-color: #e5e7eb;
          --border-color-hover: #d1d5db;
          --accent-primary: #2563eb;
          --accent-hover: #1d4ed8;
          --accent-light: #eff6ff;
          --danger-primary: #dc2626;
          --danger-light: #fef2f2;
          --danger-hover: #fee2e2;
          --success-primary: #16a34a;
          --success-light: #f0fdf4;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --modal-backdrop: rgba(0, 0, 0, 0.5);
        }

        [data-theme="dark"], .dark-theme {
          --bg-primary: #111827;
          --bg-secondary: #1f2937;
          --bg-tertiary: #374151;
          --text-primary: #f9fafb;
          --text-secondary: #d1d5db;
          --text-muted: #6b7280;
          --border-color: #374151;
          --border-color-hover: #4b5563;
          --accent-primary: #3b82f6;
          --accent-hover: #2563eb;
          --accent-light: rgba(59, 130, 246, 0.15);
          --danger-primary: #ef4444;
          --danger-light: rgba(239, 68, 68, 0.15);
          --danger-hover: rgba(239, 68, 68, 0.25);
          --success-primary: #22c55e;
          --success-light: rgba(34, 197, 94, 0.15);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
          --modal-backdrop: rgba(0, 0, 0, 0.7);
        }

        .services-page {
          padding: 1rem;
          min-height: 100%;
          background-color: var(--bg-primary);
          margin-top: 0;
        }

        .controls-container {
          margin-bottom: 1.5rem;
          margin-top: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .filter-bar {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          min-width: 150px;
        }

        .filter-field label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .filter-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-primary);
          background: var(--bg-secondary);
        }

        .filter-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .sort-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .sort-label {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .btn-sort {
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .btn-sort:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }

        .btn-sort.active {
          background: var(--accent-light);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .actions-group {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-xl {
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--accent-hover);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid transparent;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .service-card {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .service-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .service-card.skeleton {
          animation: none;
        }

        .service-icon {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          flex-shrink: 0;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .skeleton-icon {
          background: var(--border-color);
          animation: pulse 1.5s infinite;
        }

        .service-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .service-name {
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .service-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .service-duration,
        .service-price {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .service-price {
          color: var(--text-primary);
        }

        .detail-separator {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .service-actions {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex-shrink: 0;
        }

        .skeleton-actions {
          width: 36px;
          height: 72px;
          background: var(--border-color);
          border-radius: 6px;
          animation: pulse 1.5s infinite;
        }

        .btn-edit,
        .btn-delete {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .btn-edit {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .btn-edit:hover {
          filter: brightness(0.95);
        }

        .btn-delete {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .btn-delete:hover {
          filter: brightness(0.95);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-page {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .btn-page:hover:not(:disabled) {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }
        .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }

        .page-numbers { display: flex; gap: 0.25rem; }

        .page-number {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }
        .page-number:hover { background: var(--bg-tertiary); }
        .page-number.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--modal-backdrop);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 1.5rem;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
        }

        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }
        .modal-title h3 { margin: 0; font-size: 1.25rem; color: var(--text-primary); }

        .btn-close {
          width: 32px; height: 32px;
          border: none; background: transparent;
          font-size: 1.25rem; color: var(--text-secondary);
          cursor: pointer;
        }
        .btn-close:hover { color: var(--text-primary); }

        .form-grid { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .form-field { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; min-width: 200px; }
        .form-field label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }

        .form-field input,
        .form-field textarea,
        .form-field select {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .form-field textarea {
          resize: vertical;
          font-family: inherit;
        }
        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-cancel {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .btn-cancel:hover { background: var(--bg-tertiary); }

        .btn-submit {
          background: var(--accent-primary);
          color: white;
        }
        .btn-submit:hover:not(:disabled) { background: var(--accent-hover); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .skeleton { animation: pulse 1.5s infinite; background: var(--bg-tertiary); }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        .skeleton-text { height: 1rem; background: var(--border-color); border-radius: 4px; }

        @media (max-width: 768px) {
          .actions-row { flex-direction: column; align-items: stretch; }
          .sort-controls { justify-content: center; margin-bottom: 0.5rem; }
          .actions-group { justify-content: center; }
          .services-grid { grid-template-columns: 1fr; }
          .service-card { grid-template-columns: 60px 1fr; }
          .service-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
          .filter-row { flex-direction: column; }
          .modal { min-width: 90%; margin: 1rem; }
          .form-row { flex-direction: column; }
          .pagination { flex-wrap: wrap; }
        }
      `})]})}const mn={name:"",partNumber:"",price:"",quantityInStock:"",manufacturer:""},Zl=18;function Yh(){const{loading:e,error:t,run:r,setError:n}=gr(),[a,l]=x.useState(!0),[o,c]=x.useState([]),[s,d]=x.useState(null),[v,p]=x.useState(!1),[m,j]=x.useState(mn),[y,S]=x.useState({manufacturer:"",partNumber:"",lowStock:""}),[N,f]=x.useState("name"),[u,h]=x.useState("asc"),[b,P]=x.useState(1),_=!!(s!=null&&s.id)&&v;function D(w){N===w?h(z=>z==="asc"?"desc":"asc"):(f(w),h("asc"))}async function R(){try{const w=await q.spares.list();c(w||[])}catch(w){console.error("loadAll error:",w),n(w.message||"Ошибка загрузки данных"),c([])}finally{l(!1)}}x.useEffect(()=>{R()},[]),x.useEffect(()=>{P(1)},[y]);const B=x.useMemo(()=>{let w=[...o];if(y.manufacturer.trim()){const z=y.manufacturer.toLowerCase();w=w.filter(V=>(V.manufacturer||"").toLowerCase().includes(z))}if(y.partNumber.trim()){const z=y.partNumber.toLowerCase();w=w.filter(V=>(V.partNumber||"").toLowerCase().includes(z))}if(y.lowStock!==""){const z=Number(y.lowStock);w=w.filter(V=>Number(V.quantityInStock)<=z)}return w},[o,y]),I=x.useMemo(()=>{const w=[...B];return w.sort((z,V)=>{let W,g;return N==="name"?(W=z.name||"",g=V.name||"",u==="asc"?W.localeCompare(g):g.localeCompare(W)):N==="partNumber"?(W=z.partNumber||"",g=V.partNumber||"",u==="asc"?W.localeCompare(g):g.localeCompare(W)):N==="manufacturer"?(W=z.manufacturer||"",g=V.manufacturer||"",u==="asc"?W.localeCompare(g):g.localeCompare(W)):N==="price"?(W=Number(z.price)||0,g=Number(V.price)||0,u==="asc"?W-g:g-W):N==="stock"?(W=Number(z.quantityInStock)||0,g=Number(V.quantityInStock)||0,u==="asc"?W-g:g-W):0}),w},[B,N,u]),G=x.useMemo(()=>{const w=(b-1)*Zl,z=w+Zl;return I.slice(w,z)},[I,b]),Y=x.useMemo(()=>Math.ceil(I.length/Zl),[I.length]);function ge(w){d(w),p(!0),j({name:w.name||"",partNumber:w.partNumber||"",price:w.price??"",quantityInStock:w.quantityInStock??"",manufacturer:w.manufacturer||""})}function ae(){d(null),p(!0),n(""),j(mn)}function we(){S({manufacturer:"",partNumber:"",lowStock:""}),P(1)}function ke(){return m.name.trim()?m.partNumber.trim()?!m.price||Number(m.price)<=0?(alert("Введите корректную цену"),!1):!m.quantityInStock||Number(m.quantityInStock)<0?(alert("Введите корректное количество"),!1):!0:(alert("Введите артикул"),!1):(alert("Введите название запчасти"),!1)}async function ve(w){if(w.preventDefault(),n(""),!!ke())try{const z={name:m.name,partNumber:m.partNumber,price:Number(m.price),quantityInStock:Number(m.quantityInStock),manufacturer:m.manufacturer||null};_?(await r(()=>q.spares.update(s.id,z)),alert("Запчасть успешно обновлена")):(await r(()=>q.spares.create(z)),alert("Запчасть успешно добавлена"),p(!1)),d(null),j(mn),await R()}catch(z){alert(z.message||"Ошибка при сохранении")}}async function M(w){if(window.confirm("Удалить запчасть?"))try{await r(()=>q.spares.remove(w)),(s==null?void 0:s.id)===w&&(d(null),j(mn)),alert("Запчасть успешно удалена"),await R()}catch(z){alert(z.message||"Ошибка при удалении")}}const $=_||v,U=()=>{d(null),p(!1),j(mn)},Q=y.manufacturer||y.partNumber||y.lowStock,Z=e||a,me=w=>{const z={Фильтр:"🔍",Масло:"🛢️",Тормоз:"🛑",Свеча:"⚡",Ремень:"🔗",Подшипник:"⚙️",Амортизатор:"🔧",Фара:"💡"};for(const[V,W]of Object.entries(z))if(w&&w.includes(V))return W;return"📦"},xe=w=>Number(w)<=5;return i.jsxs("div",{className:"spares-page",children:[i.jsxs("div",{className:"controls-container",children:[i.jsx("div",{className:"filter-bar",children:i.jsxs("div",{className:"filter-row",children:[i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Производитель"}),i.jsx("input",{placeholder:"Производитель",value:y.manufacturer,onChange:w=>S(z=>({...z,manufacturer:w.target.value})),className:"filter-input"})]}),i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Артикул"}),i.jsx("input",{placeholder:"Артикул",value:y.partNumber,onChange:w=>S(z=>({...z,partNumber:w.target.value})),className:"filter-input"})]}),i.jsxs("div",{className:"filter-field",children:[i.jsx("label",{children:"Остаток ≤"}),i.jsx("input",{type:"number",placeholder:"Остаток ≤ N",value:y.lowStock,onChange:w=>S(z=>({...z,lowStock:w.target.value})),className:"filter-input"})]})]})}),i.jsxs("div",{className:"actions-row",children:[i.jsxs("div",{className:"sort-controls",children:[i.jsx("span",{className:"sort-label",children:"Сортировать:"}),i.jsxs("button",{className:`btn btn-sort ${N==="name"?"active":""}`,onClick:()=>D("name"),children:["По названию ",N==="name"&&(u==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${N==="partNumber"?"active":""}`,onClick:()=>D("partNumber"),children:["По артикулу ",N==="partNumber"&&(u==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${N==="price"?"active":""}`,onClick:()=>D("price"),children:["По цене ",N==="price"&&(u==="asc"?"↑":"↓")]}),i.jsxs("button",{className:`btn btn-sort ${N==="stock"?"active":""}`,onClick:()=>D("stock"),children:["По остатку ",N==="stock"&&(u==="asc"?"↑":"↓")]})]}),i.jsxs("div",{className:"actions-group",children:[Q&&i.jsx("button",{className:"btn btn-ghost",type:"button",onClick:we,children:"Сбросить фильтры"}),i.jsx("button",{className:"btn btn-primary btn-xl",type:"button",onClick:ae,children:"+ Добавить запчасть"})]})]})]}),t&&i.jsx(vr,{type:"error",children:t}),Z?i.jsx("div",{className:"spares-grid",children:[...Array(8)].map((w,z)=>i.jsxs("div",{className:"spare-card skeleton",children:[i.jsx("div",{className:"spare-icon skeleton-icon"}),i.jsxs("div",{className:"spare-info",children:[i.jsx("div",{className:"spare-name skeleton-text"}),i.jsx("div",{className:"spare-part skeleton-text"}),i.jsx("div",{className:"spare-price skeleton-text"})]}),i.jsx("div",{className:"spare-card-actions skeleton-actions"})]},z))}):I.length===0?i.jsx(Yt,{children:Q?"По вашему запросу ничего не найдено":"Нет запчастей"}):i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"spares-grid",children:G.map(w=>i.jsxs("div",{className:`spare-card ${xe(w.quantityInStock)?"low-stock":""}`,children:[i.jsx("div",{className:"spare-icon",children:me(w.name)}),i.jsxs("div",{className:"spare-info",children:[i.jsxs("div",{className:"spare-number",children:["Арт. ",w.partNumber]}),i.jsx("div",{className:"spare-name",title:w.name,children:w.name}),i.jsxs("div",{className:"spare-details",children:[w.manufacturer&&i.jsx("span",{className:"spare-manufacturer",children:w.manufacturer}),i.jsx("span",{className:"detail-separator",children:"•"}),i.jsxs("span",{className:"spare-price",children:[w.price," Br"]})]}),i.jsxs("div",{className:`spare-stock-badge ${xe(w.quantityInStock)?"low":""}`,children:[w.quantityInStock," шт"]})]}),i.jsxs("div",{className:"spare-card-actions",children:[i.jsx("button",{className:"btn btn-edit",type:"button",onClick:()=>ge(w),title:"Редактировать",children:"✏️"}),i.jsx("button",{className:"btn btn-delete",type:"button",onClick:()=>M(w.id),title:"Удалить",children:"🗑️"})]})]},w.id))}),Y>1&&i.jsxs("div",{className:"pagination",children:[i.jsx("button",{className:"btn btn-page",onClick:()=>P(w=>Math.max(1,w-1)),disabled:b===1,children:"← Назад"}),i.jsx("div",{className:"page-numbers",children:[...Array(Y)].map((w,z)=>i.jsx("button",{className:`page-number ${b===z+1?"active":""}`,onClick:()=>P(z+1),children:z+1},z))}),i.jsx("button",{className:"btn btn-page",onClick:()=>P(w=>Math.min(Y,w+1)),disabled:b===Y,children:"Вперед →"})]})]}),$&&i.jsx("div",{className:"modal-backdrop",onClick:U,children:i.jsxs("div",{className:"modal",onClick:w=>w.stopPropagation(),children:[i.jsxs("div",{className:"modal-head",children:[i.jsx("div",{className:"modal-title",children:i.jsx("h3",{children:_?"Редактирование запчасти":"Добавление запчасти"})}),i.jsx("button",{className:"btn btn-close",type:"button",onClick:U,children:"✕"})]}),i.jsxs("form",{className:"form-grid",onSubmit:ve,children:[i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Название *"}),i.jsx("input",{required:!0,placeholder:"Название запчасти",value:m.name,onChange:w=>j(z=>({...z,name:w.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Артикул *"}),i.jsx("input",{required:!0,placeholder:"Артикул",value:m.partNumber,onChange:w=>j(z=>({...z,partNumber:w.target.value}))})]})]}),i.jsxs("div",{className:"form-row",children:[i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Производитель"}),i.jsx("input",{placeholder:"Производитель",value:m.manufacturer,onChange:w=>j(z=>({...z,manufacturer:w.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Цена *"}),i.jsx("input",{required:!0,type:"number",placeholder:"0.00",value:m.price,onChange:w=>j(z=>({...z,price:w.target.value}))})]}),i.jsxs("div",{className:"form-field",children:[i.jsx("label",{children:"Количество на складе *"}),i.jsx("input",{required:!0,type:"number",placeholder:"0",value:m.quantityInStock,onChange:w=>j(z=>({...z,quantityInStock:w.target.value}))})]})]}),i.jsxs("div",{className:"form-actions",children:[i.jsx("button",{type:"button",className:"btn btn-cancel",onClick:U,children:"Отмена"}),i.jsx("button",{className:"btn btn-submit",disabled:e,type:"submit",children:_?"Сохранить":"Создать"})]})]})]})}),i.jsx("style",{children:`
        :root {
          --bg-primary: #f9fafb;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f3f4f6;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-muted: #9ca3af;
          --border-color: #e5e7eb;
          --border-color-hover: #d1d5db;
          --accent-primary: #2563eb;
          --accent-hover: #1d4ed8;
          --accent-light: #eff6ff;
          --danger-primary: #dc2626;
          --danger-light: #fef2f2;
          --danger-hover: #fee2e2;
          --success-primary: #16a34a;
          --success-light: #f0fdf4;
          --warning-primary: #d97706;
          --warning-light: #fffbeb;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --modal-backdrop: rgba(0, 0, 0, 0.5);
        }

        [data-theme="dark"], .dark-theme {
          --bg-primary: #111827;
          --bg-secondary: #1f2937;
          --bg-tertiary: #374151;
          --text-primary: #f9fafb;
          --text-secondary: #d1d5db;
          --text-muted: #6b7280;
          --border-color: #374151;
          --border-color-hover: #4b5563;
          --accent-primary: #3b82f6;
          --accent-hover: #2563eb;
          --accent-light: rgba(59, 130, 246, 0.15);
          --danger-primary: #ef4444;
          --danger-light: rgba(239, 68, 68, 0.15);
          --danger-hover: rgba(239, 68, 68, 0.25);
          --success-primary: #22c55e;
          --success-light: rgba(34, 197, 94, 0.15);
          --warning-primary: #f59e0b;
          --warning-light: rgba(245, 158, 11, 0.15);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
          --modal-backdrop: rgba(0, 0, 0, 0.7);
        }

        .spares-page {
          padding: 1rem;
          min-height: 100%;
          background-color: var(--bg-primary);
          margin-top: 0;
        }

        .controls-container {
          margin-bottom: 1.5rem;
          margin-top: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .filter-bar {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          min-width: 150px;
        }

        .filter-field label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .filter-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-primary);
          background: var(--bg-secondary);
        }

        .filter-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .sort-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .sort-label {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .btn-sort {
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .btn-sort:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }

        .btn-sort.active {
          background: var(--accent-light);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .actions-group {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-xl {
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--accent-hover);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid transparent;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .spares-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .spare-card {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .spare-card.low-stock {
          border-color: var(--warning-primary);
          background: var(--warning-light);
        }

        .spare-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .spare-card.skeleton {
          animation: none;
        }

        .spare-icon {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          flex-shrink: 0;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .skeleton-icon {
          background: var(--border-color);
          animation: pulse 1.5s infinite;
        }

        .spare-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .spare-number {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .spare-name {
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .spare-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .spare-manufacturer,
        .spare-price {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .spare-price {
          color: var(--text-primary);
        }

        .detail-separator {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .spare-stock-badge {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          display: inline-block;
          width: fit-content;
          background: var(--success-light);
          color: var(--success-primary);
        }

        .spare-stock-badge.low {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .spare-card-actions {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex-shrink: 0;
        }

        .skeleton-actions {
          width: 36px;
          height: 72px;
          background: var(--border-color);
          border-radius: 6px;
          animation: pulse 1.5s infinite;
        }

        .btn-edit,
        .btn-delete {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .btn-edit {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .btn-edit:hover {
          filter: brightness(0.95);
        }

        .btn-delete {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .btn-delete:hover {
          filter: brightness(0.95);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-page {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .btn-page:hover:not(:disabled) {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }
        .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }

        .page-numbers { display: flex; gap: 0.25rem; }

        .page-number {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }
        .page-number:hover { background: var(--bg-tertiary); }
        .page-number.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--modal-backdrop);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 1.5rem;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
        }

        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }
        .modal-title h3 { margin: 0; font-size: 1.25rem; color: var(--text-primary); }

        .btn-close {
          width: 32px; height: 32px;
          border: none; background: transparent;
          font-size: 1.25rem; color: var(--text-secondary);
          cursor: pointer;
        }
        .btn-close:hover { color: var(--text-primary); }

        .form-grid { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .form-field { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; min-width: 200px; }
        .form-field label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }

        .form-field input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .form-field input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-cancel {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .btn-cancel:hover { background: var(--bg-tertiary); }

        .btn-submit {
          background: var(--accent-primary);
          color: white;
        }
        .btn-submit:hover:not(:disabled) { background: var(--accent-hover); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .skeleton { animation: pulse 1.5s infinite; background: var(--bg-tertiary); }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        .skeleton-text { height: 1rem; background: var(--border-color); border-radius: 4px; }

        @media (max-width: 768px) {
          .actions-row { flex-direction: column; align-items: stretch; }
          .sort-controls { justify-content: center; margin-bottom: 0.5rem; }
          .actions-group { justify-content: center; }
          .spares-grid { grid-template-columns: 1fr; }
          .spare-card { grid-template-columns: 60px 1fr; }
          .spare-card-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
          .filter-row { flex-direction: column; }
          .modal { min-width: 90%; margin: 1rem; }
          .form-row { flex-direction: column; }
          .pagination { flex-wrap: wrap; }
        }
      `})]})}function qh(){return i.jsx(Ah,{children:i.jsxs(wh,{children:[i.jsx(yt,{path:"/",element:i.jsx(Bh,{})}),i.jsx(yt,{path:"/clients",element:i.jsx(Vh,{})}),i.jsx(yt,{path:"/cars",element:i.jsx(Wh,{})}),i.jsx(yt,{path:"/orders",element:i.jsx(Hh,{})}),i.jsx(yt,{path:"/mechanics",element:i.jsx(Xh,{})}),i.jsx(yt,{path:"/services",element:i.jsx(Gh,{})}),i.jsx(yt,{path:"/spares",element:i.jsx(Yh,{})}),i.jsx(yt,{path:"*",element:i.jsx(yh,{to:"/",replace:!0})})]})})}Td(document.getElementById("root")).render(i.jsx(_c.StrictMode,{children:i.jsx(zh,{children:i.jsx(Mh,{children:i.jsx(qh,{})})})}));
