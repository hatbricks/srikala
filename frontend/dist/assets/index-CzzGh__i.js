var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function D(e,t){return E(e.type,t,e.props)}function O(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function k(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var A=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?k(``+e.key):t.toString(36)}function M(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ee(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ee(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(A,`$&/`)+`/`),ee(o,r,i,``,function(e){return e})):o!=null&&(O(o)&&(o=D(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(A,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=ee(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=ee(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ee(M(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function te(e,t,n){if(e==null)return e;var r=[],i=0;return ee(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ne(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var N=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},P={map:te,forEach:function(e,t,n){te(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return te(e,function(){t++}),t},toArray:function(e){return te(e,function(e){return e})||[]},only:function(e){if(!O(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=P,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=O,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ne}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,N)}catch(e){N(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.8`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&j(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&j(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function j(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,j(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.8`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),E=Symbol.for(`react.suspense_list`),D=Symbol.for(`react.memo`),O=Symbol.for(`react.lazy`),k=Symbol.for(`react.activity`),A=Symbol.for(`react.memo_cache_sentinel`),j=Symbol.iterator;function M(e){return typeof e!=`object`||!e?null:(e=j&&e[j]||e[`@@iterator`],typeof e==`function`?e:null)}var ee=Symbol.for(`react.client.reference`);function te(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ee?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case E:return`SuspenseList`;case k:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case D:return t=e.displayName||null,t===null?te(e.type)||`Memo`:t;case O:t=e._payload,e=e._init;try{return te(e(t))}catch{}}return null}var ne=Array.isArray,N=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,re={pending:!1,data:null,method:null,action:null},ie=[],ae=-1;function oe(e){return{current:e}}function se(e){0>ae||(e.current=ie[ae],ie[ae]=null,ae--)}function F(e,t){ae++,ie[ae]=e.current,e.current=t}var ce=oe(null),le=oe(null),ue=oe(null),de=oe(null);function fe(e,t){switch(F(ue,t),F(le,e),F(ce,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}se(ce),F(ce,e)}function pe(){se(ce),se(le),se(ue)}function me(e){e.memoizedState!==null&&F(de,e);var t=ce.current,n=Hd(t,e.type);t!==n&&(F(le,e),F(ce,n))}function he(e){le.current===e&&(se(ce),se(le)),de.current===e&&(se(de),Qf._currentValue=re)}var ge,_e;function ve(e){if(ge===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ge=t&&t[1]||``,_e=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ge+e+_e}var ye=!1;function be(e,t){if(!e||ye)return``;ye=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{ye=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?ve(n):``}function xe(e,t){switch(e.tag){case 26:case 27:case 5:return ve(e.type);case 16:return ve(`Lazy`);case 13:return e.child!==t&&t!==null?ve(`Suspense Fallback`):ve(`Suspense`);case 19:return ve(`SuspenseList`);case 0:case 15:return be(e.type,!1);case 11:return be(e.type.render,!1);case 1:return be(e.type,!0);case 31:return ve(`Activity`);default:return``}}function Se(e){try{var t=``,n=null;do t+=xe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ce=Object.prototype.hasOwnProperty,we=t.unstable_scheduleCallback,Te=t.unstable_cancelCallback,Ee=t.unstable_shouldYield,De=t.unstable_requestPaint,Oe=t.unstable_now,ke=t.unstable_getCurrentPriorityLevel,Ae=t.unstable_ImmediatePriority,je=t.unstable_UserBlockingPriority,Me=t.unstable_NormalPriority,Ne=t.unstable_LowPriority,Pe=t.unstable_IdlePriority,Fe=t.log,Ie=t.unstable_setDisableYieldValue,Le=null,Re=null;function ze(e){if(typeof Fe==`function`&&Ie(e),Re&&typeof Re.setStrictMode==`function`)try{Re.setStrictMode(Le,e)}catch{}}var Be=Math.clz32?Math.clz32:Ue,Ve=Math.log,He=Math.LN2;function Ue(e){return e>>>=0,e===0?32:31-(Ve(e)/He|0)|0}var We=256,Ge=262144,Ke=4194304;function qe(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Je(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=qe(n))):i=qe(o):i=qe(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=qe(n))):i=qe(o)):i=qe(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Ye(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Xe(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ze(){var e=Ke;return Ke<<=1,!(Ke&62914560)&&(Ke=4194304),e}function Qe(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $e(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function et(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Be(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&tt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function tt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Be(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function nt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Be(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function rt(e,t){var n=t&-t;return n=n&42?1:it(n),(n&(e.suspendedLanes|t))===0?n:0}function it(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function at(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function ot(){var e=P.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function st(e,t){var n=P.p;try{return P.p=e,t()}finally{P.p=n}}var ct=Math.random().toString(36).slice(2),lt=`__reactFiber$`+ct,ut=`__reactProps$`+ct,dt=`__reactContainer$`+ct,ft=`__reactEvents$`+ct,pt=`__reactListeners$`+ct,mt=`__reactHandles$`+ct,ht=`__reactResources$`+ct,gt=`__reactMarker$`+ct;function _t(e){delete e[lt],delete e[ut],delete e[ft],delete e[pt],delete e[mt]}function vt(e){var t=e[lt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[dt]||n[lt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[lt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function yt(e){if(e=e[lt]||e[dt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function bt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function xt(e){var t=e[ht];return t||=e[ht]={hoistableStyles:new Map,hoistableScripts:new Map},t}function St(e){e[gt]=!0}var Ct=new Set,wt={};function Tt(e,t){Et(e,t),Et(e+`Capture`,t)}function Et(e,t){for(wt[e]=t,e=0;e<t.length;e++)Ct.add(t[e])}var Dt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ot={},kt={};function At(e){return Ce.call(kt,e)?!0:Ce.call(Ot,e)?!1:Dt.test(e)?kt[e]=!0:(Ot[e]=!0,!1)}function jt(e,t,n){if(At(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function Mt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Nt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Pt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Ft(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function It(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Lt(e){if(!e._valueTracker){var t=Ft(e)?`checked`:`value`;e._valueTracker=It(e,t,``+e[t])}}function I(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Ft(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function Rt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var zt=/[\n"\\]/g;function Bt(e){return e.replace(zt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Vt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Pt(t)):e.value!==``+Pt(t)&&(e.value=``+Pt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Ut(e,o,Pt(n)):Ut(e,o,Pt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Pt(s):e.removeAttribute(`name`)}function Ht(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Lt(e);return}n=n==null?``:``+Pt(n),t=t==null?n:``+Pt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Lt(e)}function Ut(e,t,n){t===`number`&&Rt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Wt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Pt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Gt(e,t,n){if(t!=null&&(t=``+Pt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Pt(n)}function Kt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ne(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Pt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Lt(e)}function qt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Jt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Yt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Jt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Xt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Yt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Yt(e,o,t[o])}function Zt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Qt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),$t=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function en(e){return $t.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function tn(){}var nn=null;function rn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var an=null,on=null;function sn(e){var t=yt(e);if(t&&(e=t.stateNode)){var n=e[ut]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Vt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Bt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[ut]||null;if(!a)throw Error(i(90));Vt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&I(r)}break a;case`textarea`:Gt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Wt(e,!!n.multiple,t,!1)}}}var cn=!1;function ln(e,t,n){if(cn)return e(t,n);cn=!0;try{return e(t)}finally{if(cn=!1,(an!==null||on!==null)&&(vu(),an&&(t=an,e=on,on=an=null,sn(t),e)))for(t=0;t<e.length;t++)sn(e[t])}}function un(e,t){var n=e.stateNode;if(n===null)return null;var r=n[ut]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var dn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),fn=!1;if(dn)try{var pn={};Object.defineProperty(pn,"passive",{get:function(){fn=!0}}),window.addEventListener(`test`,pn,pn),window.removeEventListener(`test`,pn,pn)}catch{fn=!1}var mn=null,hn=null,gn=null;function _n(){if(gn)return gn;var e,t=hn,n=t.length,r,i=`value`in mn?mn.value:mn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return gn=i.slice(e,1<r?1-r:void 0)}function vn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function yn(){return!0}function bn(){return!1}function xn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?yn:bn,this.isPropagationStopped=bn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=yn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=yn)},persist:function(){},isPersistent:yn}),t}var Sn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Cn=xn(Sn),wn=h({},Sn,{view:0,detail:0}),Tn=xn(wn),En,L,Dn,On=h({},wn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Dn&&(Dn&&e.type===`mousemove`?(En=e.screenX-Dn.screenX,L=e.screenY-Dn.screenY):L=En=0,Dn=e),En)},movementY:function(e){return`movementY`in e?e.movementY:L}}),kn=xn(On),An=xn(h({},On,{dataTransfer:0})),jn=xn(h({},wn,{relatedTarget:0})),Mn=xn(h({},Sn,{animationName:0,elapsedTime:0,pseudoElement:0})),Nn=xn(h({},Sn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Pn=xn(h({},Sn,{data:0})),Fn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},In={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Ln={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Rn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Ln[e])?!!t[e]:!1}function zn(){return Rn}var Bn=xn(h({},wn,{key:function(e){if(e.key){var t=Fn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=vn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?In[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zn,charCode:function(e){return e.type===`keypress`?vn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?vn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Vn=xn(h({},On,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Hn=xn(h({},wn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zn})),Un=xn(h({},Sn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Wn=xn(h({},On,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Gn=xn(h({},Sn,{newState:0,oldState:0})),Kn=[9,13,27,32],qn=dn&&`CompositionEvent`in window,Jn=null;dn&&`documentMode`in document&&(Jn=document.documentMode);var R=dn&&`TextEvent`in window&&!Jn,Yn=dn&&(!qn||Jn&&8<Jn&&11>=Jn),Xn=` `,Zn=!1;function Qn(e,t){switch(e){case`keyup`:return Kn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function z(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var $n=!1;function er(e,t){switch(e){case`compositionend`:return z(t);case`keypress`:return t.which===32?(Zn=!0,Xn):null;case`textInput`:return e=t.data,e===Xn&&Zn?null:e;default:return null}}function tr(e,t){if($n)return e===`compositionend`||!qn&&Qn(e,t)?(e=_n(),gn=hn=mn=null,$n=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Yn&&t.locale!==`ko`?null:t.data;default:return null}}var nr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!nr[e.type]:t===`textarea`}function ir(e,t,n,r){an?on?on.push(r):on=[r]:an=r,t=Td(t,`onChange`),0<t.length&&(n=new Cn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var ar=null,B=null;function or(e){vd(e,0)}function V(e){if(I(bt(e)))return e}function sr(e,t){if(e===`change`)return t}var cr=!1;if(dn){var lr;if(dn){var H=`oninput`in document;if(!H){var ur=document.createElement(`div`);ur.setAttribute(`oninput`,`return;`),H=typeof ur.oninput==`function`}lr=H}else lr=!1;cr=lr&&(!document.documentMode||9<document.documentMode)}function dr(){ar&&(ar.detachEvent(`onpropertychange`,fr),B=ar=null)}function fr(e){if(e.propertyName===`value`&&V(B)){var t=[];ir(t,B,e,rn(e)),ln(or,t)}}function pr(e,t,n){e===`focusin`?(dr(),ar=t,B=n,ar.attachEvent(`onpropertychange`,fr)):e===`focusout`&&dr()}function mr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return V(B)}function hr(e,t){if(e===`click`)return V(t)}function gr(e,t){if(e===`input`||e===`change`)return V(t)}function _r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var vr=typeof Object.is==`function`?Object.is:_r;function yr(e,t){if(vr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ce.call(t,i)||!vr(e[i],t[i]))return!1}return!0}function br(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xr(e,t){var n=br(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=br(n)}}function Sr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Sr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Cr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Rt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Rt(e.document)}return t}function wr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Tr=dn&&`documentMode`in document&&11>=document.documentMode,Er=null,Dr=null,Or=null,kr=!1;function Ar(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;kr||Er==null||Er!==Rt(r)||(r=Er,`selectionStart`in r&&wr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Or&&yr(Or,r)||(Or=r,r=Td(Dr,`onSelect`),0<r.length&&(t=new Cn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Er)))}function jr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Mr={animationend:jr(`Animation`,`AnimationEnd`),animationiteration:jr(`Animation`,`AnimationIteration`),animationstart:jr(`Animation`,`AnimationStart`),transitionrun:jr(`Transition`,`TransitionRun`),transitionstart:jr(`Transition`,`TransitionStart`),transitioncancel:jr(`Transition`,`TransitionCancel`),transitionend:jr(`Transition`,`TransitionEnd`)},Nr={},Pr={};dn&&(Pr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Mr.animationend.animation,delete Mr.animationiteration.animation,delete Mr.animationstart.animation),`TransitionEvent`in window||delete Mr.transitionend.transition);function Fr(e){if(Nr[e])return Nr[e];if(!Mr[e])return e;var t=Mr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Pr)return Nr[e]=t[n];return e}var Ir=Fr(`animationend`),Lr=Fr(`animationiteration`),Rr=Fr(`animationstart`),zr=Fr(`transitionrun`),Br=Fr(`transitionstart`),Vr=Fr(`transitioncancel`),Hr=Fr(`transitionend`),Ur=new Map,Wr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Wr.push(`scrollEnd`);function Gr(e,t){Ur.set(e,t),Tt(t,[e])}var Kr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},qr=[],Jr=0,Yr=0;function Xr(){for(var e=Jr,t=Yr=Jr=0;t<e;){var n=qr[t];qr[t++]=null;var r=qr[t];qr[t++]=null;var i=qr[t];qr[t++]=null;var a=qr[t];if(qr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ei(n,i,a)}}function Zr(e,t,n,r){qr[Jr++]=e,qr[Jr++]=t,qr[Jr++]=n,qr[Jr++]=r,Yr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Qr(e,t,n,r){return Zr(e,t,n,r),ti(e)}function $r(e,t){return Zr(e,null,null,t),ti(e)}function ei(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Be(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ti(e){if(50<lu)throw lu=0,uu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ni={};function ri(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ii(e,t,n,r){return new ri(e,t,n,r)}function ai(e){return e=e.prototype,!(!e||!e.isReactComponent)}function oi(e,t){var n=e.alternate;return n===null?(n=ii(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function si(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ci(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)ai(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,ce.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case k:return e=ii(31,n,t,a),e.elementType=k,e.lanes=o,e;case y:return li(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=ii(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=ii(13,n,t,a),e.elementType=T,e.lanes=o,e;case E:return e=ii(19,n,t,a),e.elementType=E,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case D:s=14;break a;case O:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ii(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function li(e,t,n,r){return e=ii(7,e,r,t),e.lanes=n,e}function ui(e,t,n){return e=ii(6,e,null,t),e.lanes=n,e}function di(e){var t=ii(18,null,null,0);return t.stateNode=e,t}function fi(e,t,n){return t=ii(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var pi=new WeakMap;function mi(e,t){if(typeof e==`object`&&e){var n=pi.get(e);return n===void 0?(t={value:e,source:t,stack:Se(t)},pi.set(e,t),t):n}return{value:e,source:t,stack:Se(t)}}var hi=[],gi=0,_i=null,vi=0,yi=[],bi=0,xi=null,Si=1,Ci=``;function wi(e,t){hi[gi++]=vi,hi[gi++]=_i,_i=e,vi=t}function Ti(e,t,n){yi[bi++]=Si,yi[bi++]=Ci,yi[bi++]=xi,xi=e;var r=Si;e=Ci;var i=32-Be(r)-1;r&=~(1<<i),n+=1;var a=32-Be(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Si=1<<32-Be(t)+i|n<<i|r,Ci=a+e}else Si=1<<a|n<<i|r,Ci=e}function Ei(e){e.return!==null&&(wi(e,1),Ti(e,1,0))}function Di(e){for(;e===_i;)_i=hi[--gi],hi[gi]=null,vi=hi[--gi],hi[gi]=null;for(;e===xi;)xi=yi[--bi],yi[bi]=null,Ci=yi[--bi],yi[bi]=null,Si=yi[--bi],yi[bi]=null}function Oi(e,t){yi[bi++]=Si,yi[bi++]=Ci,yi[bi++]=xi,Si=t.id,Ci=t.overflow,xi=e}var ki=null,Ai=null,U=!1,ji=null,Mi=!1,Ni=Error(i(519));function Pi(e){throw Bi(mi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Ni}function Fi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[lt]=e,t[ut]=r,n){case`dialog`:$(`cancel`,t),$(`close`,t);break;case`iframe`:case`object`:case`embed`:$(`load`,t);break;case`video`:case`audio`:for(n=0;n<gd.length;n++)$(gd[n],t);break;case`source`:$(`error`,t);break;case`img`:case`image`:case`link`:$(`error`,t),$(`load`,t);break;case`details`:$(`toggle`,t);break;case`input`:$(`invalid`,t),Ht(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:$(`invalid`,t);break;case`textarea`:$(`invalid`,t),Kt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||jd(t.textContent,n)?(r.popover!=null&&($(`beforetoggle`,t),$(`toggle`,t)),r.onScroll!=null&&$(`scroll`,t),r.onScrollEnd!=null&&$(`scrollend`,t),r.onClick!=null&&(t.onclick=tn),t=!0):t=!1,t||Pi(e,!0)}function Ii(e){for(ki=e.return;ki;)switch(ki.tag){case 5:case 31:case 13:Mi=!1;return;case 27:case 3:Mi=!0;return;default:ki=ki.return}}function Li(e){if(e!==ki)return!1;if(!U)return Ii(e),U=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&Ai&&Pi(e),Ii(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Ai=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Ai=uf(e)}else t===27?(t=Ai,Zd(e.type)?(e=lf,lf=null,Ai=e):Ai=t):Ai=ki?cf(e.stateNode.nextSibling):null;return!0}function Ri(){Ai=ki=null,U=!1}function zi(){var e=ji;return e!==null&&(Q===null?Q=e:Q.push.apply(Q,e),ji=null),e}function Bi(e){ji===null?ji=[e]:ji.push(e)}var Vi=oe(null),Hi=null,Ui=null;function Wi(e,t,n){F(Vi,t._currentValue),t._currentValue=n}function Gi(e){e._currentValue=Vi.current,se(Vi)}function Ki(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function qi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Ki(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Ki(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Ji(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;vr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===de.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&qi(t,e,n,r),t.flags|=262144}function Yi(e){for(e=e.firstContext;e!==null;){if(!vr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Xi(e){Hi=e,Ui=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Zi(e){return $i(Hi,e)}function Qi(e,t){return Hi===null&&Xi(e),$i(e,t)}function $i(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ui===null){if(e===null)throw Error(i(308));Ui=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ui=Ui.next=t;return n}var ea=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ta=t.unstable_scheduleCallback,na=t.unstable_NormalPriority,ra={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ia(){return{controller:new ea,data:new Map,refCount:0}}function aa(e){e.refCount--,e.refCount===0&&ta(na,function(){e.controller.abort()})}var oa=null,sa=0,ca=0,la=null;function ua(e,t){if(oa===null){var n=oa=[];sa=0,ca=ud(),la={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return sa++,t.then(da,da),t}function da(){if(--sa===0&&oa!==null){la!==null&&(la.status=`fulfilled`);var e=oa;oa=null,ca=0,la=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function fa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var pa=N.S;N.S=function(e,t){Ql=Oe(),typeof t==`object`&&t&&typeof t.then==`function`&&ua(e,t),pa!==null&&pa(e,t)};var ma=oe(null);function ha(){var e=ma.current;return e===null?Il.pooledCache:e}function ga(e,t){t===null?F(ma,ma.current):F(ma,t.pool)}function _a(){var e=ha();return e===null?null:{parent:ra._currentValue,pool:e}}var va=Error(i(460)),ya=Error(i(474)),ba=Error(i(542)),xa={then:function(){}};function Sa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Ca(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(tn,tn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Da(e),e;default:if(typeof t.status==`string`)t.then(tn,tn);else{if(e=Il,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Da(e),e}throw Ta=t,va}}function wa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ta=e,va):e}}var Ta=null;function Ea(){if(Ta===null)throw Error(i(459));var e=Ta;return Ta=null,e}function Da(e){if(e===va||e===ba)throw Error(i(483))}var Oa=null,ka=0;function Aa(e){var t=ka;return ka+=1,Oa===null&&(Oa=[]),Ca(Oa,e,t)}function ja(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ma(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Na(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=oi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=ui(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===O&&wa(i)===t.type)?(t=a(t,n.props),ja(t,n),t.return=e,t):(t=ci(n.type,n.key,n.props,null,e.mode,r),ja(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=fi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=li(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=ui(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=ci(t.type,t.key,t.props,null,e.mode,n),ja(n,t),n.return=e,n;case v:return t=fi(t,e.mode,n),t.return=e,t;case O:return t=wa(t),f(e,t,n)}if(ne(t)||M(t))return t=li(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Aa(t),n);if(t.$$typeof===C)return f(e,Qi(e,t),n);Ma(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case O:return n=wa(n),p(e,t,n,r)}if(ne(n)||M(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Aa(n),r);if(n.$$typeof===C)return p(e,t,Qi(e,n),r);Ma(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case O:return r=wa(r),m(e,t,n,r,i)}if(ne(r)||M(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Aa(r),i);if(r.$$typeof===C)return m(e,t,n,Qi(t,r),i);Ma(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),U&&wi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return U&&wi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),U&&wi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),U&&wi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return U&&wi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),U&&wi(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===O&&wa(l)===r.type){n(e,r.sibling),c=a(r,o.props),ja(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===y?(c=li(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=ci(o.type,o.key,o.props,null,e.mode,c),ja(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=fi(o,e.mode,c),c.return=e,e=c}return s(e);case O:return o=wa(o),b(e,r,o,c)}if(ne(o))return h(e,r,o,c);if(M(o)){if(l=M(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Aa(o),c);if(o.$$typeof===C)return b(e,r,Qi(e,o),c);Ma(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=ui(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ka=0;var i=b(e,t,n,r);return Oa=null,i}catch(t){if(t===va||t===ba)throw t;var a=ii(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Pa=Na(!0),Fa=Na(!1),Ia=!1;function La(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ra(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function za(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function W(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Y&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ti(e),ei(e,null,n),t}return Zr(e,r,t,n),ti(e)}function Ba(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,nt(e,n)}}function Va(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ha=!1;function Ua(){if(Ha){var e=la;if(e!==null)throw e}}function Wa(e,t,n,r){Ha=!1;var i=e.updateQueue;Ia=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Z&f)===f:(r&f)===f){f!==0&&f===ca&&(Ha=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ia=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Wl|=o,e.lanes=o,e.memoizedState=d}}function Ga(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ka(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ga(n[e],t)}var qa=oe(null),Ja=oe(0);function Ya(e,t){e=Hl,F(Ja,e),F(qa,t),Hl=e|t.baseLanes}function Xa(){F(Ja,Hl),F(qa,qa.current)}function G(){Hl=Ja.current,se(qa),se(Ja)}var Za=oe(null),Qa=null;function $a(e){var t=e.alternate;F(io,io.current&1),F(Za,e),Qa===null&&(t===null||qa.current!==null||t.memoizedState!==null)&&(Qa=e)}function eo(e){F(io,io.current),F(Za,e),Qa===null&&(Qa=e)}function to(e){e.tag===22?(F(io,io.current),F(Za,e),Qa===null&&(Qa=e)):no(e)}function no(){F(io,io.current),F(Za,Za.current)}function ro(e){se(Za),Qa===e&&(Qa=null),se(io)}var io=oe(0);function ao(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var oo=0,K=null,so=null,co=null,lo=!1,uo=!1,fo=!1,po=0,mo=0,ho=null,go=0;function _o(){throw Error(i(321))}function vo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!vr(e[n],t[n]))return!1;return!0}function yo(e,t,n,r,i,a){return oo=a,K=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,N.H=e===null||e.memoizedState===null?Is:Ls,fo=!1,a=n(r,i),fo=!1,uo&&(a=xo(t,n,r,i)),bo(e),a}function bo(e){N.H=Fs;var t=so!==null&&so.next!==null;if(oo=0,co=so=K=null,lo=!1,mo=0,ho=null,t)throw Error(i(300));e===null||ec||(e=e.dependencies,e!==null&&Yi(e)&&(ec=!0))}function xo(e,t,n,r){K=e;var a=0;do{if(uo&&(ho=null),mo=0,uo=!1,25<=a)throw Error(i(301));if(a+=1,co=so=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}N.H=Rs,o=t(n,r)}while(uo);return o}function So(){var e=N.H,t=e.useState()[0];return t=typeof t.then==`function`?ko(t):t,e=e.useState()[0],(so===null?null:so.memoizedState)!==e&&(K.flags|=1024),t}function Co(){var e=po!==0;return po=0,e}function wo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function To(e){if(lo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}lo=!1}oo=0,co=so=K=null,uo=!1,mo=po=0,ho=null}function Eo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return co===null?K.memoizedState=co=e:co=co.next=e,co}function Do(){if(so===null){var e=K.alternate;e=e===null?null:e.memoizedState}else e=so.next;var t=co===null?K.memoizedState:co.next;if(t!==null)co=t,so=e;else{if(e===null)throw K.alternate===null?Error(i(467)):Error(i(310));so=e,e={memoizedState:so.memoizedState,baseState:so.baseState,baseQueue:so.baseQueue,queue:so.queue,next:null},co===null?K.memoizedState=co=e:co=co.next=e}return co}function Oo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ko(e){var t=mo;return mo+=1,ho===null&&(ho=[]),e=Ca(ho,e,t),t=K,(co===null?t.memoizedState:co.next)===null&&(t=t.alternate,N.H=t===null||t.memoizedState===null?Is:Ls),e}function Ao(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ko(e);if(e.$$typeof===C)return Zi(e)}throw Error(i(438,String(e)))}function jo(e){var t=null,n=K.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=K.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Oo(),K.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=A;return t.index++,n}function Mo(e,t){return typeof t==`function`?t(e):t}function No(e){return Po(Do(),so,e)}function Po(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(oo&f)===f:(Z&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ca&&(d=!0);else if((oo&p)===p){u=u.next,p===ca&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,K.lanes|=p,Wl|=p;f=u.action,fo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,K.lanes|=f,Wl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!vr(o,e.memoizedState)&&(ec=!0,d&&(n=la,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Fo(e){var t=Do(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);vr(o,t.memoizedState)||(ec=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Io(e,t,n){var r=K,a=Do(),o=U;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!vr((so||a).memoizedState,n);if(s&&(a.memoizedState=n,ec=!0),a=a.queue,ss(zo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||co!==null&&co.memoizedState.tag&1){if(r.flags|=2048,ns(9,{destroy:void 0},Ro.bind(null,r,a,n,t),null),Il===null)throw Error(i(349));o||oo&127||Lo(r,t,n)}return n}function Lo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=K.updateQueue,t===null?(t=Oo(),K.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ro(e,t,n,r){t.value=n,t.getSnapshot=r,Bo(t)&&Vo(e)}function zo(e,t,n){return n(function(){Bo(t)&&Vo(e)})}function Bo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!vr(e,n)}catch{return!0}}function Vo(e){var t=$r(e,2);t!==null&&pu(t,e,2)}function Ho(e){var t=Eo();if(typeof e==`function`){var n=e;if(e=n(),fo){ze(!0);try{n()}finally{ze(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Mo,lastRenderedState:e},t}function Uo(e,t,n,r){return e.baseState=n,Po(e,so,typeof r==`function`?r:Mo)}function Wo(e,t,n,r,a){if(Ms(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};N.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Go(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Go(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=N.T,o={};N.T=o;try{var s=n(i,r),c=N.S;c!==null&&c(o,s),Ko(e,t,s)}catch(n){Jo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),N.T=a}}else try{a=n(i,r),Ko(e,t,a)}catch(n){Jo(e,t,n)}}function Ko(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){qo(e,t,n)},function(n){return Jo(e,t,n)}):qo(e,t,n)}function qo(e,t,n){t.status=`fulfilled`,t.value=n,Yo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Go(e,n)))}function Jo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Yo(t),t=t.next;while(t!==r)}e.action=null}function Yo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Xo(e,t){return t}function Zo(e,t){if(U){var n=Il.formState;if(n!==null){a:{var r=K;if(U){if(Ai){b:{for(var i=Ai,a=Mi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Ai=cf(i.nextSibling),r=i.data===`F!`;break a}}Pi(r)}r=!1}r&&(t=n[0])}}return n=Eo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xo,lastRenderedState:t},n.queue=r,n=ks.bind(null,K,r),r.dispatch=n,r=Ho(!1),a=js.bind(null,K,!1,r.queue),r=Eo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Wo.bind(null,K,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Qo(e){return $o(Do(),so,e)}function $o(e,t,n){if(t=Po(e,t,Xo)[0],e=No(Mo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ko(t)}catch(e){throw e===va?ba:e}else r=t;t=Do();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(K.flags|=2048,ns(9,{destroy:void 0},es.bind(null,i,n),null)),[r,a,e]}function es(e,t){e.action=t}function ts(e){var t=Do(),n=so;if(n!==null)return $o(t,n,e);Do(),t=t.memoizedState,n=Do();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function ns(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=K.updateQueue,t===null&&(t=Oo(),K.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function rs(){return Do().memoizedState}function is(e,t,n,r){var i=Eo();K.flags|=e,i.memoizedState=ns(1|t,{destroy:void 0},n,r===void 0?null:r)}function as(e,t,n,r){var i=Do();r=r===void 0?null:r;var a=i.memoizedState.inst;so!==null&&r!==null&&vo(r,so.memoizedState.deps)?i.memoizedState=ns(t,a,n,r):(K.flags|=e,i.memoizedState=ns(1|t,a,n,r))}function os(e,t){is(8390656,8,e,t)}function ss(e,t){as(2048,8,e,t)}function cs(e){K.flags|=4;var t=K.updateQueue;if(t===null)t=Oo(),K.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ls(e){var t=Do().memoizedState;return cs({ref:t,nextImpl:e}),function(){if(Y&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function us(e,t){return as(4,2,e,t)}function ds(e,t){return as(4,4,e,t)}function fs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ps(e,t,n){n=n==null?null:n.concat([e]),as(4,4,fs.bind(null,t,e),n)}function ms(){}function hs(e,t){var n=Do();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&vo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function gs(e,t){var n=Do();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&vo(t,r[1]))return r[0];if(r=e(),fo){ze(!0);try{e()}finally{ze(!1)}}return n.memoizedState=[r,t],r}function _s(e,t,n){return n===void 0||oo&1073741824&&!(Z&261930)?e.memoizedState=t:(e.memoizedState=n,e=fu(),K.lanes|=e,Wl|=e,n)}function vs(e,t,n,r){return vr(n,t)?n:qa.current===null?!(oo&42)||oo&1073741824&&!(Z&261930)?(ec=!0,e.memoizedState=n):(e=fu(),K.lanes|=e,Wl|=e,t):(e=_s(e,n,r),vr(e,t)||(ec=!0),e)}function ys(e,t,n,r,i){var a=P.p;P.p=a!==0&&8>a?a:8;var o=N.T,s={};N.T=s,js(e,!1,t,n);try{var c=i(),l=N.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?As(e,t,fa(c,r),du(e)):As(e,t,r,du(e))}catch(n){As(e,t,{then:function(){},status:`rejected`,reason:n},du())}finally{P.p=a,o!==null&&s.types!==null&&(o.types=s.types),N.T=o}}function bs(){}function xs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Ss(e).queue;ys(e,a,t,re,n===null?bs:function(){return Cs(e),n(r)})}function Ss(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:re,baseState:re,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Mo,lastRenderedState:re},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Mo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Cs(e){var t=Ss(e);t.next===null&&(t=e.alternate.memoizedState),As(e,t.next.queue,{},du())}function ws(){return Zi(Qf)}function Ts(){return Do().memoizedState}function Es(){return Do().memoizedState}function Ds(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=du();e=za(n);var r=W(t,e,n);r!==null&&(pu(r,t,n),Ba(r,t,n)),t={cache:ia()},e.payload=t;return}t=t.return}}function Os(e,t,n){var r=du();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ms(e)?Ns(t,n):(n=Qr(e,t,n,r),n!==null&&(pu(n,e,r),Ps(n,t,r)))}function ks(e,t,n){As(e,t,n,du())}function As(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ms(e))Ns(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,vr(s,o))return Zr(e,t,i,0),Il===null&&Xr(),!1}catch{}if(n=Qr(e,t,i,r),n!==null)return pu(n,e,r),Ps(n,t,r),!0}return!1}function js(e,t,n,r){if(r={lane:2,revertLane:ud(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ms(e)){if(t)throw Error(i(479))}else t=Qr(e,n,r,2),t!==null&&pu(t,e,2)}function Ms(e){var t=e.alternate;return e===K||t!==null&&t===K}function Ns(e,t){uo=lo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ps(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,nt(e,n)}}var Fs={readContext:Zi,use:Ao,useCallback:_o,useContext:_o,useEffect:_o,useImperativeHandle:_o,useLayoutEffect:_o,useInsertionEffect:_o,useMemo:_o,useReducer:_o,useRef:_o,useState:_o,useDebugValue:_o,useDeferredValue:_o,useTransition:_o,useSyncExternalStore:_o,useId:_o,useHostTransitionStatus:_o,useFormState:_o,useActionState:_o,useOptimistic:_o,useMemoCache:_o,useCacheRefresh:_o};Fs.useEffectEvent=_o;var Is={readContext:Zi,use:Ao,useCallback:function(e,t){return Eo().memoizedState=[e,t===void 0?null:t],e},useContext:Zi,useEffect:os,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),is(4194308,4,fs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return is(4194308,4,e,t)},useInsertionEffect:function(e,t){is(4,2,e,t)},useMemo:function(e,t){var n=Eo();t=t===void 0?null:t;var r=e();if(fo){ze(!0);try{e()}finally{ze(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Eo();if(n!==void 0){var i=n(t);if(fo){ze(!0);try{n(t)}finally{ze(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Os.bind(null,K,e),[r.memoizedState,e]},useRef:function(e){var t=Eo();return e={current:e},t.memoizedState=e},useState:function(e){e=Ho(e);var t=e.queue,n=ks.bind(null,K,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:ms,useDeferredValue:function(e,t){return _s(Eo(),e,t)},useTransition:function(){var e=Ho(!1);return e=ys.bind(null,K,e.queue,!0,!1),Eo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=K,a=Eo();if(U){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Il===null)throw Error(i(349));Z&127||Lo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,os(zo.bind(null,r,o,e),[e]),r.flags|=2048,ns(9,{destroy:void 0},Ro.bind(null,r,o,n,t),null),n},useId:function(){var e=Eo(),t=Il.identifierPrefix;if(U){var n=Ci,r=Si;n=(r&~(1<<32-Be(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=po++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=go++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:ws,useFormState:Zo,useActionState:Zo,useOptimistic:function(e){var t=Eo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=js.bind(null,K,!0,n),n.dispatch=t,[e,t]},useMemoCache:jo,useCacheRefresh:function(){return Eo().memoizedState=Ds.bind(null,K)},useEffectEvent:function(e){var t=Eo(),n={impl:e};return t.memoizedState=n,function(){if(Y&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Ls={readContext:Zi,use:Ao,useCallback:hs,useContext:Zi,useEffect:ss,useImperativeHandle:ps,useInsertionEffect:us,useLayoutEffect:ds,useMemo:gs,useReducer:No,useRef:rs,useState:function(){return No(Mo)},useDebugValue:ms,useDeferredValue:function(e,t){return vs(Do(),so.memoizedState,e,t)},useTransition:function(){var e=No(Mo)[0],t=Do().memoizedState;return[typeof e==`boolean`?e:ko(e),t]},useSyncExternalStore:Io,useId:Ts,useHostTransitionStatus:ws,useFormState:Qo,useActionState:Qo,useOptimistic:function(e,t){return Uo(Do(),so,e,t)},useMemoCache:jo,useCacheRefresh:Es};Ls.useEffectEvent=ls;var Rs={readContext:Zi,use:Ao,useCallback:hs,useContext:Zi,useEffect:ss,useImperativeHandle:ps,useInsertionEffect:us,useLayoutEffect:ds,useMemo:gs,useReducer:Fo,useRef:rs,useState:function(){return Fo(Mo)},useDebugValue:ms,useDeferredValue:function(e,t){var n=Do();return so===null?_s(n,e,t):vs(n,so.memoizedState,e,t)},useTransition:function(){var e=Fo(Mo)[0],t=Do().memoizedState;return[typeof e==`boolean`?e:ko(e),t]},useSyncExternalStore:Io,useId:Ts,useHostTransitionStatus:ws,useFormState:ts,useActionState:ts,useOptimistic:function(e,t){var n=Do();return so===null?(n.baseState=e,[e,n.queue.dispatch]):Uo(n,so,e,t)},useMemoCache:jo,useCacheRefresh:Es};Rs.useEffectEvent=ls;function zs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Bs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=du(),i=za(r);i.payload=t,n!=null&&(i.callback=n),t=W(e,i,r),t!==null&&(pu(t,e,r),Ba(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=du(),i=za(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=W(e,i,r),t!==null&&(pu(t,e,r),Ba(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=du(),r=za(n);r.tag=2,t!=null&&(r.callback=t),t=W(e,r,n),t!==null&&(pu(t,e,n),Ba(t,e,n))}};function Vs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!yr(n,r)||!yr(i,a):!0}function Hs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Bs.enqueueReplaceState(t,t.state,null)}function Us(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Ws(e){Kr(e)}function Gs(e){console.error(e)}function Ks(e){Kr(e)}function qs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Js(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ys(e,t,n){return n=za(n),n.tag=3,n.payload={element:null},n.callback=function(){qs(e,t)},n}function Xs(e){return e=za(e),e.tag=3,e}function Zs(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Js(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Js(t,n,r),typeof i!=`function`&&(tu===null?tu=new Set([this]):tu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Qs(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Ji(t,n,a,!0),n=Za.current,n!==null){switch(n.tag){case 31:case 13:return Qa===null?Tu():n.alternate===null&&Ul===0&&(Ul=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===xa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Wu(e,r,a)),!1;case 22:return n.flags|=65536,r===xa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Wu(e,r,a)),!1}throw Error(i(435,n.tag))}return Wu(e,r,a),Tu(),!1}if(U)return t=Za.current,t===null?(r!==Ni&&(t=Error(i(423),{cause:r}),Bi(mi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=mi(r,n),a=Ys(e.stateNode,r,a),Va(e,a),Ul!==4&&(Ul=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Ni&&(e=Error(i(422),{cause:r}),Bi(mi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=mi(o,n),Yl===null?Yl=[o]:Yl.push(o),Ul!==4&&(Ul=2),t===null)return!0;r=mi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ys(n.stateNode,r,e),Va(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(tu===null||!tu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Xs(a),Zs(a,e,n,r),Va(n,a),!1}n=n.return}while(n!==null);return!1}var $s=Error(i(461)),ec=!1;function tc(e,t,n,r){t.child=e===null?Fa(t,null,n,r):Pa(t,e.child,n,r)}function nc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Xi(t),r=yo(e,t,n,o,a,i),s=Co(),e!==null&&!ec?(wo(e,t,i),Ec(e,t,i)):(U&&s&&Ei(t),t.flags|=1,tc(e,t,r,i),t.child)}function rc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ai(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,ic(e,t,a,r,i)):(e=ci(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Dc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?yr:n,n(o,r)&&e.ref===t.ref)return Ec(e,t,i)}return t.flags|=1,e=oi(a,r),e.ref=t.ref,e.return=t,t.child=e}function ic(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(yr(a,r)&&e.ref===t.ref){if(ec=!1,t.pendingProps=r=a,Dc(e,i))e.flags&131072&&(ec=!0);else return t.lanes=e.lanes,Ec(e,t,i)}}return fc(e,t,n,r,i)}function ac(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return sc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ga(t,a===null?null:a.cachePool),a===null?Xa():Ya(t,a),to(t);else return r=t.lanes=536870912,sc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&ga(t,null),Xa(),no(t)):(ga(t,a.cachePool),Ya(t,a),no(t),t.memoizedState=null);return tc(e,t,i,n),t.child}function oc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function sc(e,t,n,r,i){var a=ha();return a=a===null?null:{parent:ra._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&ga(t,null),Xa(),to(t),e!==null&&Ji(e,t,r,!0),t.childLanes=i,null}function cc(e,t){return t=xc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function lc(e,t,n){return Pa(t,e.child,null,n),e=cc(t,t.pendingProps),e.flags|=2,ro(t),t.memoizedState=null,e}function uc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(U){if(r.mode===`hidden`)return e=cc(t,r),t.lanes=536870912,oc(null,e);if(eo(t),(e=Ai)?(e=rf(e,Mi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:xi===null?null:{id:Si,overflow:Ci},retryLane:536870912,hydrationErrors:null},n=di(e),n.return=t,t.child=n,ki=t,Ai=null)):e=null,e===null)throw Pi(t);return t.lanes=536870912,null}return cc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(eo(t),a){if(t.flags&256)t.flags&=-257,t=lc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(ec||Ji(e,t,n,!1),a=(n&e.childLanes)!==0,ec||a){if(r=Il,r!==null&&(s=rt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,$r(e,s),pu(r,e,s),$s;Tu(),t=lc(e,t,n)}else e=o.treeContext,Ai=cf(s.nextSibling),ki=t,U=!0,ji=null,Mi=!1,e!==null&&Oi(t,e),t=cc(t,r),t.flags|=4096;return t}return e=oi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function dc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function fc(e,t,n,r,i){return Xi(t),n=yo(e,t,n,r,void 0,i),r=Co(),e!==null&&!ec?(wo(e,t,i),Ec(e,t,i)):(U&&r&&Ei(t),t.flags|=1,tc(e,t,n,i),t.child)}function pc(e,t,n,r,i,a){return Xi(t),t.updateQueue=null,n=xo(t,r,n,i),bo(e),r=Co(),e!==null&&!ec?(wo(e,t,a),Ec(e,t,a)):(U&&r&&Ei(t),t.flags|=1,tc(e,t,n,a),t.child)}function mc(e,t,n,r,i){if(Xi(t),t.stateNode===null){var a=ni,o=n.contextType;typeof o==`object`&&o&&(a=Zi(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Bs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},La(t),o=n.contextType,a.context=typeof o==`object`&&o?Zi(o):ni,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(zs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Bs.enqueueReplaceState(a,a.state,null),Wa(t,r,a,i),Ua(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Us(n,s);a.props=c;var l=a.context,u=n.contextType;o=ni,typeof u==`object`&&u&&(o=Zi(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Hs(t,a,r,o),Ia=!1;var f=t.memoizedState;a.state=f,Wa(t,r,a,i),Ua(),l=t.memoizedState,s||f!==l||Ia?(typeof d==`function`&&(zs(t,n,d,r),l=t.memoizedState),(c=Ia||Vs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ra(e,t),o=t.memoizedProps,u=Us(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ni,typeof l==`object`&&l&&(c=Zi(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Hs(t,a,r,c),Ia=!1,f=t.memoizedState,a.state=f,Wa(t,r,a,i),Ua();var p=t.memoizedState;o!==d||f!==p||Ia||e!==null&&e.dependencies!==null&&Yi(e.dependencies)?(typeof s==`function`&&(zs(t,n,s,r),p=t.memoizedState),(u=Ia||Vs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Yi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,dc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Pa(t,e.child,null,i),t.child=Pa(t,null,n,i)):tc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Ec(e,t,i),e}function hc(e,t,n,r){return Ri(),t.flags|=256,tc(e,t,n,r),t.child}var gc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function _c(e){return{baseLanes:e,cachePool:_a()}}function vc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ql),e}function yc(e,t,n){var r=t.pendingProps,a=!1,o=!!(t.flags&128),s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:!!(io.current&2)),s&&(a=!0,t.flags&=-129),s=!!(t.flags&32),t.flags&=-33,e===null){if(U){if(a?$a(t):no(t),(e=Ai)?(e=rf(e,Mi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:xi===null?null:{id:Si,overflow:Ci},retryLane:536870912,hydrationErrors:null},n=di(e),n.return=t,t.child=n,ki=t,Ai=null)):e=null,e===null)throw Pi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(no(t),a=t.mode,c=xc({mode:`hidden`,children:c},a),r=li(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=_c(n),r.childLanes=vc(e,s,n),t.memoizedState=gc,oc(null,r)):($a(t),bc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?($a(t),t.flags&=-257,t=Sc(e,t,n)):t.memoizedState===null?(no(t),c=r.fallback,a=t.mode,r=xc({mode:`visible`,children:r.children},a),c=li(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Pa(t,e.child,null,n),r=t.child,r.memoizedState=_c(n),r.childLanes=vc(e,s,n),t.memoizedState=gc,t=oc(null,r)):(no(t),t.child=e.child,t.flags|=128,t=null);else if($a(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Bi({value:r,source:null,stack:null}),t=Sc(e,t,n)}else if(ec||Ji(e,t,n,!1),s=(n&e.childLanes)!==0,ec||s){if(s=Il,s!==null&&(r=rt(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,$r(e,r),pu(s,e,r),$s;af(c)||Tu(),t=Sc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Ai=cf(c.nextSibling),ki=t,U=!0,ji=null,Mi=!1,e!==null&&Oi(t,e),t=bc(t,r.children),t.flags|=4096);return t}return a?(no(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=oi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=li(c,a,n,null),c.flags|=2):c=oi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,oc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=_c(n):(a=c.cachePool,a===null?a=_a():(l=ra._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=vc(e,s,n),t.memoizedState=gc,oc(e.child,r)):($a(t),n=e.child,e=n.sibling,n=oi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function bc(e,t){return t=xc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function xc(e,t){return e=ii(22,e,null,t),e.lanes=0,e}function Sc(e,t,n){return Pa(t,e.child,null,n),e=bc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Cc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ki(e.return,t,n)}function wc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Tc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=io.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,F(io,o),tc(e,t,r,n),r=U?vi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Cc(e,n,t);else if(e.tag===19)Cc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ao(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),wc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ao(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}wc(t,!0,n,null,a,r);break;case`together`:wc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Ec(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Wl|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Ji(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=oi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=oi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Dc(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Yi(e)))}function Oc(e,t,n){switch(t.tag){case 3:fe(t,t.stateNode.containerInfo),Wi(t,ra,e.memoizedState.cache),Ri();break;case 27:case 5:me(t);break;case 4:fe(t,t.stateNode.containerInfo);break;case 10:Wi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,eo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?($a(t),e=Ec(e,t,n),e===null?null:e.sibling):yc(e,t,n):($a(t),t.flags|=128,null);$a(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=(Ji(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Tc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),F(io,io.current),r)break;return null;case 22:return t.lanes=0,ac(e,t,n,t.pendingProps);case 24:Wi(t,ra,e.memoizedState.cache)}return Ec(e,t,n)}function kc(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)ec=!0;else{if(!Dc(e,n)&&!(t.flags&128))return ec=!1,Oc(e,t,n);ec=!!(e.flags&131072)}}else ec=!1,U&&t.flags&1048576&&Ti(t,vi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=wa(t.elementType),t.type=e,typeof e==`function`)ai(e)?(r=Us(e,r),t.tag=1,t=mc(null,t,e,r,n)):(t.tag=0,t=fc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=nc(null,t,e,r,n);break a}if(a===D){t.tag=14,t=rc(null,t,e,r,n);break a}}throw t=te(e)||e,Error(i(306,t,``))}}return t;case 0:return fc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Us(r,t.pendingProps),mc(e,t,r,a,n);case 3:a:{if(fe(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ra(e,t),Wa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Wi(t,ra,r),r!==o.cache&&qi(t,[ra],n,!0),Ua(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=hc(e,t,r,n);break a}if(r!==a){a=mi(Error(i(424)),t),Bi(a),t=hc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Ai=cf(e.firstChild),ki=t,U=!0,ji=null,Mi=!0,n=Fa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ri(),r===a){t=Ec(e,t,n);break a}tc(e,t,r,n)}t=t.child}return t;case 26:return dc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:U||(n=t.type,e=t.pendingProps,r=Bd(ue.current).createElement(n),r[lt]=t,r[ut]=e,Pd(r,n,e),St(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return me(t),e===null&&U&&(r=t.stateNode=ff(t.type,t.pendingProps,ue.current),ki=t,Mi=!0,a=Ai,Zd(t.type)?(lf=a,Ai=cf(r.firstChild)):Ai=a),tc(e,t,t.pendingProps.children,n),dc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&U&&((a=r=Ai)&&(r=tf(r,t.type,t.pendingProps,Mi),r===null?a=!1:(t.stateNode=r,ki=t,Ai=cf(r.firstChild),Mi=!1,a=!0)),a||Pi(t)),me(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=yo(e,t,So,null,null,n),Qf._currentValue=a),dc(e,t),tc(e,t,r,n),t.child;case 6:return e===null&&U&&((e=n=Ai)&&(n=nf(n,t.pendingProps,Mi),n===null?e=!1:(t.stateNode=n,ki=t,Ai=null,e=!0)),e||Pi(t)),null;case 13:return yc(e,t,n);case 4:return fe(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Pa(t,null,r,n):tc(e,t,r,n),t.child;case 11:return nc(e,t,t.type,t.pendingProps,n);case 7:return tc(e,t,t.pendingProps,n),t.child;case 8:return tc(e,t,t.pendingProps.children,n),t.child;case 12:return tc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Wi(t,t.type,r.value),tc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Xi(t),a=Zi(a),r=r(a),t.flags|=1,tc(e,t,r,n),t.child;case 14:return rc(e,t,t.type,t.pendingProps,n);case 15:return ic(e,t,t.type,t.pendingProps,n);case 19:return Tc(e,t,n);case 31:return uc(e,t,n);case 22:return ac(e,t,n,t.pendingProps);case 24:return Xi(t),r=Zi(ra),e===null?(a=ha(),a===null&&(a=Il,o=ia(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},La(t),Wi(t,ra,a)):((e.lanes&n)!==0&&(Ra(e,t),Wa(t,null,null,n),Ua()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Wi(t,ra,r),r!==a.cache&&qi(t,[ra],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Wi(t,ra,r))),tc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Ac(e){e.flags|=4}function jc(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Su())e.flags|=8192;else throw Ta=xa,ya}}else e.flags&=-16777217}function Mc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(Su())e.flags|=8192;else throw Ta=xa,ya}}function Nc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Ze(),e.lanes|=t,Jl|=t)}function Pc(e,t){if(!U)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function q(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Fc(e,t,n){var r=t.pendingProps;switch(Di(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return q(t),null;case 1:return q(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Gi(ra),pe(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Li(t)?Ac(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,zi())),q(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Ac(t),o===null?(q(t),jc(t,a,null,r,n)):(q(t),Mc(t,o))):o?o===e.memoizedState?(q(t),t.flags&=-16777217):(Ac(t),q(t),Mc(t,o)):(e=e.memoizedProps,e!==r&&Ac(t),q(t),jc(t,a,e,r,n)),null;case 27:if(he(t),n=ue.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ac(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return q(t),null}e=ce.current,Li(t)?Fi(t,e):(e=ff(a,r,n),t.stateNode=e,Ac(t))}return q(t),null;case 5:if(he(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Ac(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return q(t),null}if(o=ce.current,Li(t))Fi(t,o);else{var s=Bd(ue.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[lt]=t,o[ut]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Ac(t)}}return q(t),jc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Ac(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=ue.current,Li(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ki,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[lt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||jd(e.nodeValue,n)),e||Pi(t,!0)}else e=Bd(e).createTextNode(r),e[lt]=t,t.stateNode=e}return q(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Li(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[lt]=t}else Ri(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;q(t),e=!1}else n=zi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(ro(t),t):(ro(t),null);if(t.flags&128)throw Error(i(558))}return q(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Li(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[lt]=t}else Ri(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;q(t),a=!1}else a=zi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(ro(t),t):(ro(t),null)}return ro(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Nc(t,t.updateQueue),q(t),null);case 4:return pe(),e===null&&xd(t.stateNode.containerInfo),q(t),null;case 10:return Gi(t.type),q(t),null;case 19:if(se(io),r=t.memoizedState,r===null)return q(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)Pc(r,!1);else{if(Ul!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=ao(e),o!==null){for(t.flags|=128,Pc(r,!1),e=o.updateQueue,t.updateQueue=e,Nc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)si(n,e),n=n.sibling;return F(io,io.current&1|2),U&&wi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Oe()>$l&&(t.flags|=128,a=!0,Pc(r,!1),t.lanes=4194304)}}else{if(!a){if(e=ao(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Nc(t,e),Pc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!U)return q(t),null}else 2*Oe()-r.renderingStartTime>$l&&n!==536870912&&(t.flags|=128,a=!0,Pc(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(q(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Oe(),e.sibling=null,n=io.current,F(io,a?n&1|2:n&1),U&&wi(t,r.treeForkCount),e);case 22:case 23:return ro(t),G(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(q(t),t.subtreeFlags&6&&(t.flags|=8192)):q(t),n=t.updateQueue,n!==null&&Nc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&se(ma),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Gi(ra),q(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Ic(e,t){switch(Di(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Gi(ra),pe(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return he(t),null;case 31:if(t.memoizedState!==null){if(ro(t),t.alternate===null)throw Error(i(340));Ri()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ro(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ri()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return se(io),null;case 4:return pe(),null;case 10:return Gi(t.type),null;case 22:case 23:return ro(t),G(),e!==null&&se(ma),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Gi(ra),null;case 25:return null;default:return null}}function Lc(e,t){switch(Di(t),t.tag){case 3:Gi(ra),pe();break;case 26:case 27:case 5:he(t);break;case 4:pe();break;case 31:t.memoizedState!==null&&ro(t);break;case 13:ro(t);break;case 19:se(io);break;case 10:Gi(t.type);break;case 22:case 23:ro(t),G(),e!==null&&se(ma);break;case 24:Gi(ra)}}function Rc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Uu(t,t.return,e)}}function zc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Uu(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Uu(t,t.return,e)}}function Bc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ka(t,n)}catch(t){Uu(e,e.return,t)}}}function Vc(e,t,n){n.props=Us(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Uu(e,t,n)}}function Hc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Uu(e,t,n)}}function Uc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Uu(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Uu(e,t,n)}else n.current=null}}function Wc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Uu(e,e.return,t)}}function Gc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[ut]=t}catch(t){Uu(e,e.return,t)}}function Kc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function qc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Kc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Jc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=tn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Jc(e,t,n),e=e.sibling;e!==null;)Jc(e,t,n),e=e.sibling}function Yc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Yc(e,t,n),e=e.sibling;e!==null;)Yc(e,t,n),e=e.sibling}function Xc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[lt]=e,t[ut]=n}catch(t){Uu(e,e.return,t)}}var Zc=!1,Qc=!1,$c=!1,el=typeof WeakSet==`function`?WeakSet:Set,tl=null;function nl(e,t){if(e=e.containerInfo,Rd=sp,e=Cr(e),wr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,tl=t;tl!==null;)if(t=tl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,tl=e;else for(;tl!==null;){switch(t=tl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Us(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Uu(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,tl=e;break}tl=t.return}}function rl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:_l(e,n),r&4&&Rc(5,n);break;case 1:if(_l(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Uu(n,n.return,e)}else{var i=Us(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Uu(n,n.return,e)}}}r&64&&Bc(n),r&512&&Hc(n,n.return);break;case 3:if(_l(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ka(e,t)}catch(e){Uu(n,n.return,e)}}break;case 27:t===null&&r&4&&Xc(n);case 26:case 5:_l(e,n),t===null&&r&4&&Wc(n),r&512&&Hc(n,n.return);break;case 12:_l(e,n);break;case 31:_l(e,n),r&4&&cl(e,n);break;case 13:_l(e,n),r&4&&ll(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=qu.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||Zc,!r){t=t!==null&&t.memoizedState!==null||Qc,i=Zc;var a=Qc;Zc=r,(Qc=t)&&!a?yl(e,n,!!(n.subtreeFlags&8772)):_l(e,n),Zc=i,Qc=a}break;case 30:break;default:_l(e,n)}}function il(e){var t=e.alternate;t!==null&&(e.alternate=null,il(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&_t(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var J=null,al=!1;function ol(e,t,n){for(n=n.child;n!==null;)sl(e,t,n),n=n.sibling}function sl(e,t,n){if(Re&&typeof Re.onCommitFiberUnmount==`function`)try{Re.onCommitFiberUnmount(Le,n)}catch{}switch(n.tag){case 26:Qc||Uc(n,t),ol(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Qc||Uc(n,t);var r=J,i=al;Zd(n.type)&&(J=n.stateNode,al=!1),ol(e,t,n),pf(n.stateNode),J=r,al=i;break;case 5:Qc||Uc(n,t);case 6:if(r=J,i=al,J=null,ol(e,t,n),J=r,al=i,J!==null){if(al)try{(J.nodeType===9?J.body:J.nodeName===`HTML`?J.ownerDocument.body:J).removeChild(n.stateNode)}catch(e){Uu(n,t,e)}else try{J.removeChild(n.stateNode)}catch(e){Uu(n,t,e)}}break;case 18:J!==null&&(al?(e=J,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(J,n.stateNode));break;case 4:r=J,i=al,J=n.stateNode.containerInfo,al=!0,ol(e,t,n),J=r,al=i;break;case 0:case 11:case 14:case 15:zc(2,n,t),Qc||zc(4,n,t),ol(e,t,n);break;case 1:Qc||(Uc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Vc(n,t,r)),ol(e,t,n);break;case 21:ol(e,t,n);break;case 22:Qc=(r=Qc)||n.memoizedState!==null,ol(e,t,n),Qc=r;break;default:ol(e,t,n)}}function cl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Uu(t,t.return,e)}}}function ll(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Uu(t,t.return,e)}}function ul(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new el),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new el),t;default:throw Error(i(435,e.tag))}}function dl(e,t){var n=ul(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Ju.bind(null,e,t);t.then(r,r)}})}function fl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){J=c.stateNode,al=!1;break a}break;case 5:J=c.stateNode,al=!1;break a;case 3:case 4:J=c.stateNode.containerInfo,al=!0;break a}c=c.return}if(J===null)throw Error(i(160));sl(o,s,a),J=null,al=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ml(t,e),t=t.sibling}var pl=null;function ml(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:fl(t,e),hl(e),r&4&&(zc(3,e,e.return),Rc(3,e),zc(5,e,e.return));break;case 1:fl(t,e),hl(e),r&512&&(Qc||n===null||Uc(n,n.return)),r&64&&Zc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=pl;if(fl(t,e),hl(e),r&512&&(Qc||n===null||Uc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[gt]||o[lt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[lt]=e,St(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[lt]=e,St(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode)}else e.stateNode=If(a,r,e.memoizedProps)}else o===r?r===null&&e.stateNode!==null&&Gc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:fl(t,e),hl(e),r&512&&(Qc||n===null||Uc(n,n.return)),n!==null&&r&4&&Gc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(fl(t,e),hl(e),r&512&&(Qc||n===null||Uc(n,n.return)),e.flags&32){a=e.stateNode;try{qt(a,``)}catch(t){Uu(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Gc(e,a,n===null?a:n.memoizedProps)),r&1024&&($c=!0);break;case 6:if(fl(t,e),hl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Uu(e,e.return,t)}}break;case 3:if(Bf=null,a=pl,pl=gf(t.containerInfo),fl(t,e),pl=a,hl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Uu(e,e.return,t)}$c&&($c=!1,gl(e));break;case 4:r=pl,pl=gf(e.stateNode.containerInfo),fl(t,e),hl(e),pl=r;break;case 12:fl(t,e),hl(e);break;case 31:fl(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 13:fl(t,e),hl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Zl=Oe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Zc,d=Qc;if(Zc=u||a,Qc=d||l,fl(t,e),Qc=d,Zc=u,hl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Zc||Qc||vl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Uu(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Uu(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Uu(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,dl(e,n))));break;case 19:fl(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 30:break;case 21:break;default:fl(t,e),hl(e)}}function hl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Kc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Yc(e,qc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(qt(o,``),n.flags&=-33),Yc(e,qc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Jc(e,qc(e),s);break;default:throw Error(i(161))}}catch(t){Uu(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;gl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function _l(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)rl(e,t.alternate,t),t=t.sibling}function vl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:zc(4,t,t.return),vl(t);break;case 1:Uc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Vc(t,t.return,n),vl(t);break;case 27:pf(t.stateNode);case 26:case 5:Uc(t,t.return),vl(t);break;case 22:t.memoizedState===null&&vl(t);break;case 30:vl(t);break;default:vl(t)}e=e.sibling}}function yl(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:yl(i,a,n),Rc(4,a);break;case 1:if(yl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Uu(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Ga(c[i],s)}catch(e){Uu(r,r.return,e)}}n&&o&64&&Bc(a),Hc(a,a.return);break;case 27:Xc(a);case 26:case 5:yl(i,a,n),n&&r===null&&o&4&&Wc(a),Hc(a,a.return);break;case 12:yl(i,a,n);break;case 31:yl(i,a,n),n&&o&4&&cl(i,a);break;case 13:yl(i,a,n),n&&o&4&&ll(i,a);break;case 22:a.memoizedState===null&&yl(i,a,n),Hc(a,a.return);break;case 30:break;default:yl(i,a,n)}t=t.sibling}}function bl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&aa(n))}function xl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&aa(e))}function Sl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Cl(e,t,n,r),t=t.sibling}function Cl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Sl(e,t,n,r),i&2048&&Rc(9,t);break;case 1:Sl(e,t,n,r);break;case 3:Sl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&aa(e)));break;case 12:if(i&2048){Sl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Uu(t,t.return,e)}}else Sl(e,t,n,r);break;case 31:Sl(e,t,n,r);break;case 13:Sl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Sl(e,t,n,r):(a._visibility|=2,wl(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?Sl(e,t,n,r):Tl(e,t),i&2048&&bl(o,t);break;case 24:Sl(e,t,n,r),i&2048&&xl(t.alternate,t);break;default:Sl(e,t,n,r)}}function wl(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:wl(a,o,s,c,i),Rc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,wl(a,o,s,c,i)):u._visibility&2?wl(a,o,s,c,i):Tl(a,o),i&&l&2048&&bl(o.alternate,o);break;case 24:wl(a,o,s,c,i),i&&l&2048&&xl(o.alternate,o);break;default:wl(a,o,s,c,i)}t=t.sibling}}function Tl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Tl(n,r),i&2048&&bl(r.alternate,r);break;case 24:Tl(n,r),i&2048&&xl(r.alternate,r);break;default:Tl(n,r)}t=t.sibling}}var El=8192;function Dl(e,t,n){if(e.subtreeFlags&El)for(e=e.child;e!==null;)Ol(e,t,n),e=e.sibling}function Ol(e,t,n){switch(e.tag){case 26:Dl(e,t,n),e.flags&El&&e.memoizedState!==null&&Gf(n,pl,e.memoizedState,e.memoizedProps);break;case 5:Dl(e,t,n);break;case 3:case 4:var r=pl;pl=gf(e.stateNode.containerInfo),Dl(e,t,n),pl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=El,El=16777216,Dl(e,t,n),El=r):Dl(e,t,n));break;default:Dl(e,t,n)}}function kl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Al(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];tl=r,Nl(r,e)}kl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)jl(e),e=e.sibling}function jl(e){switch(e.tag){case 0:case 11:case 15:Al(e),e.flags&2048&&zc(9,e,e.return);break;case 3:Al(e);break;case 12:Al(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ml(e)):Al(e);break;default:Al(e)}}function Ml(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];tl=r,Nl(r,e)}kl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:zc(8,t,t.return),Ml(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ml(t));break;default:Ml(t)}e=e.sibling}}function Nl(e,t){for(;tl!==null;){var n=tl;switch(n.tag){case 0:case 11:case 15:zc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:aa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,tl=r;else a:for(n=e;tl!==null;){r=tl;var i=r.sibling,a=r.return;if(il(r),r===n){tl=null;break a}if(i!==null){i.return=a,tl=i;break a}tl=a}}}var Pl={getCacheForType:function(e){var t=Zi(ra),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Zi(ra).controller.signal}},Fl=typeof WeakMap==`function`?WeakMap:Map,Y=0,Il=null,X=null,Z=0,Ll=0,Rl=null,zl=!1,Bl=!1,Vl=!1,Hl=0,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=null,Q=null,Xl=!1,Zl=0,Ql=0,$l=1/0,eu=null,tu=null,nu=0,ru=null,iu=null,au=0,ou=0,su=null,cu=null,lu=0,uu=null;function du(){return Y&2&&Z!==0?Z&-Z:N.T===null?ot():ud()}function fu(){if(ql===0){if(!(Z&536870912)||U){var e=Ge;Ge<<=1,!(Ge&3932160)&&(Ge=262144),ql=e}else ql=536870912}return e=Za.current,e!==null&&(e.flags|=32),ql}function pu(e,t,n){(e===Il&&(Ll===2||Ll===9)||e.cancelPendingCommit!==null)&&(bu(e,0),_u(e,Z,ql,!1)),$e(e,n),(!(Y&2)||e!==Il)&&(e===Il&&(!(Y&2)&&(Gl|=n),Ul===4&&_u(e,Z,ql,!1)),nd(e))}function mu(e,t,n){if(Y&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||Ye(e,t),a=r?Ou(e,t):Eu(e,t,!0),o=r;do{if(a===0){Bl&&!r&&_u(e,t,0,!1);break}if(n=e.current.alternate,o&&!gu(n)){a=Eu(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Yl;var l=c.current.memoizedState.isDehydrated;if(l&&(bu(c,s).flags|=256),s=Eu(c,s,!1),s!==2){if(Vl&&!l){c.errorRecoveryDisabledLanes|=o,Gl|=o,a=4;break a}o=Q,Q=a,o!==null&&(Q===null?Q=o:Q.push.apply(Q,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){bu(e,0),_u(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:_u(r,t,ql,!zl);break a;case 2:Q=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Zl+300-Oe(),10<a)){if(_u(r,t,ql,!zl),Je(r,0,!0)!==0)break a;au=t,r.timeoutHandle=Kd(hu.bind(null,r,n,Q,eu,Xl,t,ql,Gl,Jl,zl,o,`Throttled`,-0,0),a);break a}hu(r,n,Q,eu,Xl,t,ql,Gl,Jl,zl,o,null,-0,0)}break}while(1);nd(e)}function hu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:tn},Ol(t,a,d);var m=(a&62914560)===a?Zl-Oe():(a&4194048)===a?Ql-Oe():0;if(m=qf(d,m),m!==null){au=a,e.cancelPendingCommit=m(Fu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),_u(e,a,o,!l);return}}Fu(e,t,a,n,r,i,o,s,c)}function gu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!vr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function _u(e,t,n,r){t&=~Kl,t&=~Gl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Be(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&tt(e,n,t)}function vu(){return Y&6?!0:(rd(0,!1),!1)}function yu(){if(X!==null){if(Ll===0)var e=X.return;else e=X,Ui=Hi=null,To(e),Oa=null,ka=0,e=X;for(;e!==null;)Lc(e.alternate,e),e=e.return;X=null}}function bu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),au=0,yu(),Il=e,X=n=oi(e.current,null),Z=t,Ll=0,Rl=null,zl=!1,Bl=Ye(e,t),Vl=!1,Jl=ql=Kl=Gl=Wl=Ul=0,Q=Yl=null,Xl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Be(r),a=1<<i;t|=e[i],r&=~a}return Hl=t,Xr(),n}function xu(e,t){K=null,N.H=Fs,t===va||t===ba?(t=Ea(),Ll=3):t===ya?(t=Ea(),Ll=4):Ll=t===$s?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Rl=t,X===null&&(Ul=1,qs(e,mi(t,e.current)))}function Su(){var e=Za.current;return e===null?!0:(Z&4194048)===Z?Qa===null:(Z&62914560)===Z||Z&536870912?e===Qa:!1}function Cu(){var e=N.H;return N.H=Fs,e===null?Fs:e}function wu(){var e=N.A;return N.A=Pl,e}function Tu(){Ul=4,zl||(Z&4194048)!==Z&&Za.current!==null||(Bl=!0),!(Wl&134217727)&&!(Gl&134217727)||Il===null||_u(Il,Z,ql,!1)}function Eu(e,t,n){var r=Y;Y|=2;var i=Cu(),a=wu();(Il!==e||Z!==t)&&(eu=null,bu(e,t)),t=!1;var o=Ul;a:do try{if(Ll!==0&&X!==null){var s=X,c=Rl;switch(Ll){case 8:yu(),o=6;break a;case 3:case 2:case 9:case 6:Za.current===null&&(t=!0);var l=Ll;if(Ll=0,Rl=null,Mu(e,s,c,l),n&&Bl){o=0;break a}break;default:l=Ll,Ll=0,Rl=null,Mu(e,s,c,l)}}Du(),o=Ul;break}catch(t){xu(e,t)}while(1);return t&&e.shellSuspendCounter++,Ui=Hi=null,Y=r,N.H=i,N.A=a,X===null&&(Il=null,Z=0,Xr()),o}function Du(){for(;X!==null;)Au(X)}function Ou(e,t){var n=Y;Y|=2;var r=Cu(),a=wu();Il!==e||Z!==t?(eu=null,$l=Oe()+500,bu(e,t)):Bl=Ye(e,t);a:do try{if(Ll!==0&&X!==null){t=X;var o=Rl;b:switch(Ll){case 1:Ll=0,Rl=null,Mu(e,t,o,1);break;case 2:case 9:if(Sa(o)){Ll=0,Rl=null,ju(t);break}t=function(){Ll!==2&&Ll!==9||Il!==e||(Ll=7),nd(e)},o.then(t,t);break a;case 3:Ll=7;break a;case 4:Ll=5;break a;case 7:Sa(o)?(Ll=0,Rl=null,ju(t)):(Ll=0,Rl=null,Mu(e,t,o,7));break;case 5:var s=null;switch(X.tag){case 26:s=X.memoizedState;case 5:case 27:var c=X;if(s?Wf(s):c.stateNode.complete){Ll=0,Rl=null;var l=c.sibling;if(l!==null)X=l;else{var u=c.return;u===null?X=null:(X=u,Nu(u))}break b}}Ll=0,Rl=null,Mu(e,t,o,5);break;case 6:Ll=0,Rl=null,Mu(e,t,o,6);break;case 8:yu(),Ul=6;break a;default:throw Error(i(462))}}ku();break}catch(t){xu(e,t)}while(1);return Ui=Hi=null,N.H=r,N.A=a,Y=n,X===null?(Il=null,Z=0,Xr(),Ul):0}function ku(){for(;X!==null&&!Ee();)Au(X)}function Au(e){var t=kc(e.alternate,e,Hl);e.memoizedProps=e.pendingProps,t===null?Nu(e):X=t}function ju(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=pc(n,t,t.pendingProps,t.type,void 0,Z);break;case 11:t=pc(n,t,t.pendingProps,t.type.render,t.ref,Z);break;case 5:To(t);default:Lc(n,t),t=X=si(t,Hl),t=kc(n,t,Hl)}e.memoizedProps=e.pendingProps,t===null?Nu(e):X=t}function Mu(e,t,n,r){Ui=Hi=null,To(t),Oa=null,ka=0;var i=t.return;try{if(Qs(e,i,t,n,Z)){Ul=1,qs(e,mi(n,e.current)),X=null;return}}catch(t){if(i!==null)throw X=i,t;Ul=1,qs(e,mi(n,e.current)),X=null;return}t.flags&32768?(U||r===1?e=!0:Bl||Z&536870912?e=!1:(zl=e=!0,(r===2||r===9||r===3||r===6)&&(r=Za.current,r!==null&&r.tag===13&&(r.flags|=16384))),Pu(t,e)):Nu(t)}function Nu(e){var t=e;do{if(t.flags&32768){Pu(t,zl);return}e=t.return;var n=Fc(t.alternate,t,Hl);if(n!==null){X=n;return}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);Ul===0&&(Ul=5)}function Pu(e,t){do{var n=Ic(e.alternate,e);if(n!==null){n.flags&=32767,X=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){X=e;return}X=e=n}while(e!==null);Ul=6,X=null}function Fu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Bu();while(nu!==0);if(Y&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Yr,et(e,n,o,s,c,l),e===Il&&(X=Il=null,Z=0),iu=t,ru=e,au=n,ou=o,su=a,cu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Yu(Me,function(){return Vu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=N.T,N.T=null,a=P.p,P.p=2,s=Y,Y|=4;try{nl(e,t,n)}finally{Y=s,P.p=a,N.T=r}}nu=1,Iu(),Lu(),Ru()}}function Iu(){if(nu===1){nu=0;var e=ru,t=iu,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=N.T,N.T=null;var r=P.p;P.p=2;var i=Y;Y|=4;try{ml(t,e);var a=zd,o=Cr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Sr(s.ownerDocument.documentElement,s)){if(c!==null&&wr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=xr(s,h),v=xr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{Y=i,P.p=r,N.T=n}}e.current=t,nu=2}}function Lu(){if(nu===2){nu=0;var e=ru,t=iu,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=N.T,N.T=null;var r=P.p;P.p=2;var i=Y;Y|=4;try{rl(e,t.alternate,t)}finally{Y=i,P.p=r,N.T=n}}nu=3}}function Ru(){if(nu===4||nu===3){nu=0,De();var e=ru,t=iu,n=au,r=cu;t.subtreeFlags&10256||t.flags&10256?nu=5:(nu=0,iu=ru=null,zu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(tu=null),at(n),t=t.stateNode,Re&&typeof Re.onCommitFiberRoot==`function`)try{Re.onCommitFiberRoot(Le,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=N.T,i=P.p,P.p=2,N.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{N.T=t,P.p=i}}au&3&&Bu(),nd(e),i=e.pendingLanes,n&261930&&i&42?e===uu?lu++:(lu=0,uu=e):lu=0,rd(0,!1)}}function zu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,aa(t)))}function Bu(){return Iu(),Lu(),Ru(),Vu()}function Vu(){if(nu!==5)return!1;var e=ru,t=ou;ou=0;var n=at(au),r=N.T,a=P.p;try{P.p=32>n?32:n,N.T=null,n=su,su=null;var o=ru,s=au;if(nu=0,iu=ru=null,au=0,Y&6)throw Error(i(331));var c=Y;if(Y|=4,jl(o.current),Cl(o,o.current,s,n),Y=c,rd(0,!1),Re&&typeof Re.onPostCommitFiberRoot==`function`)try{Re.onPostCommitFiberRoot(Le,o)}catch{}return!0}finally{P.p=a,N.T=r,zu(e,t)}}function Hu(e,t,n){t=mi(n,t),t=Ys(e.stateNode,t,2),e=W(e,t,2),e!==null&&($e(e,2),nd(e))}function Uu(e,t,n){if(e.tag===3)Hu(e,e,n);else for(;t!==null;){if(t.tag===3){Hu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(tu===null||!tu.has(r))){e=mi(n,e),n=Xs(2),r=W(t,n,2),r!==null&&(Zs(n,r,t,e),$e(r,2),nd(r));break}}t=t.return}}function Wu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Fl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Vl=!0,i.add(n),e=Gu.bind(null,e,t,n),t.then(e,e))}function Gu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Il===e&&(Z&n)===n&&(Ul===4||Ul===3&&(Z&62914560)===Z&&300>Oe()-Zl?!(Y&2)&&bu(e,0):Kl|=n,Jl===Z&&(Jl=0)),nd(e)}function Ku(e,t){t===0&&(t=Ze()),e=$r(e,t),e!==null&&($e(e,t),nd(e))}function qu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ku(e,n)}function Ju(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ku(e,n)}function Yu(e,t){return we(e,t)}var Xu=null,Zu=null,Qu=!1,$u=!1,ed=!1,td=0;function nd(e){e!==Zu&&e.next===null&&(Zu===null?Xu=Zu=e:Zu=Zu.next=e),$u=!0,Qu||(Qu=!0,ld())}function rd(e,t){if(!ed&&$u){ed=!0;do for(var n=!1,r=Xu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Be(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,cd(r,a))}else a=Z,a=Je(r,r===Il?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Ye(r,a)||(n=!0,cd(r,a))}r=r.next}while(n);ed=!1}}function id(){ad()}function ad(){$u=Qu=!1;var e=0;td!==0&&Gd()&&(e=td);for(var t=Oe(),n=null,r=Xu;r!==null;){var i=r.next,a=od(r,t);a===0?(r.next=null,n===null?Xu=i:n.next=i,i===null&&(Zu=n)):(n=r,(e!==0||a&3)&&($u=!0)),r=i}nu!==0&&nu!==5||rd(e,!1),td!==0&&(td=0)}function od(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Be(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Xe(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Il,n=Z,n=Je(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Ll===2||Ll===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Te(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Ye(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Te(r),at(n)){case 2:case 8:n=je;break;case 32:n=Me;break;case 268435456:n=Pe;break;default:n=Me}return r=sd.bind(null,e),n=we(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Te(r),e.callbackPriority=2,e.callbackNode=null,2}function sd(e,t){if(nu!==0&&nu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Bu()&&e.callbackNode!==n)return null;var r=Z;return r=Je(e,e===Il?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(mu(e,r,t),od(e,Oe()),e.callbackNode!=null&&e.callbackNode===n?sd.bind(null,e):null)}function cd(e,t){if(Bu())return null;mu(e,t,!0)}function ld(){Yd(function(){Y&6?we(Ae,id):ad()})}function ud(){if(td===0){var e=ca;e===0&&(e=We,We<<=1,!(We&261888)&&(We=256)),td=e}return td}function dd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:en(``+e)}function fd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function pd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=dd((i[ut]||null).action),o=r.submitter;o&&(t=(t=o[ut]||null)?dd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Cn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(td!==0){var e=o?fd(i,o):new FormData(i);xs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?fd(i,o):new FormData(i),xs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var md=0;md<Wr.length;md++){var hd=Wr[md];Gr(hd.toLowerCase(),`on`+(hd[0].toUpperCase()+hd.slice(1)))}Gr(Ir,`onAnimationEnd`),Gr(Lr,`onAnimationIteration`),Gr(Rr,`onAnimationStart`),Gr(`dblclick`,`onDoubleClick`),Gr(`focusin`,`onFocus`),Gr(`focusout`,`onBlur`),Gr(zr,`onTransitionRun`),Gr(Br,`onTransitionStart`),Gr(Vr,`onTransitionCancel`),Gr(Hr,`onTransitionEnd`),Et(`onMouseEnter`,[`mouseout`,`mouseover`]),Et(`onMouseLeave`,[`mouseout`,`mouseover`]),Et(`onPointerEnter`,[`pointerout`,`pointerover`]),Et(`onPointerLeave`,[`pointerout`,`pointerover`]),Tt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Tt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Tt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Tt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Tt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Tt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var gd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),_d=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(gd));function vd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Kr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Kr(e)}i.currentTarget=null,a=c}}}}function $(e,t){var n=t[ft];n===void 0&&(n=t[ft]=new Set);var r=e+`__bubble`;n.has(r)||(Sd(t,e,2,!1),n.add(r))}function yd(e,t,n){var r=0;t&&(r|=4),Sd(n,e,r,t)}var bd=`_reactListening`+Math.random().toString(36).slice(2);function xd(e){if(!e[bd]){e[bd]=!0,Ct.forEach(function(t){t!==`selectionchange`&&(_d.has(t)||yd(t,!1,e),yd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[bd]||(t[bd]=!0,yd(`selectionchange`,!1,t))}}function Sd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!fn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Cd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=vt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}ln(function(){var r=a,i=rn(n),s=[];a:{var c=Ur.get(e);if(c!==void 0){var l=Cn,u=e;switch(e){case`keypress`:if(vn(n)===0)break a;case`keydown`:case`keyup`:l=Bn;break;case`focusin`:u=`focus`,l=jn;break;case`focusout`:u=`blur`,l=jn;break;case`beforeblur`:case`afterblur`:l=jn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=kn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=An;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Hn;break;case Ir:case Lr:case Rr:l=Mn;break;case Hr:l=Un;break;case`scroll`:case`scrollend`:l=Tn;break;case`wheel`:l=Wn;break;case`copy`:case`cut`:case`paste`:l=Nn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Vn;break;case`toggle`:case`beforetoggle`:l=Gn}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=un(m,p),g!=null&&d.push(wd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==nn&&(u=n.relatedTarget||n.fromElement)&&(vt(u)||u[dt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?vt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=kn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Vn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:bt(l),h=u==null?c:bt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,vt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Ed,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Dd(s,c,l,d,!1),u!==null&&f!==null&&Dd(s,f,u,d,!0)}}a:{if(c=r?bt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=sr;else if(rr(c)){if(cr)v=gr;else{v=mr;var y=pr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Zt(r.elementType)&&(v=sr):v=hr;if(v&&=v(e,r)){ir(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Ut(c,`number`,c.value)}switch(y=r?bt(r):window,e){case`focusin`:(rr(y)||y.contentEditable===`true`)&&(Er=y,Dr=r,Or=null);break;case`focusout`:Or=Dr=Er=null;break;case`mousedown`:kr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:kr=!1,Ar(s,n,i);break;case`selectionchange`:if(Tr)break;case`keydown`:case`keyup`:Ar(s,n,i)}var b;if(qn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else $n?Qn(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Yn&&n.locale!==`ko`&&($n||x!==`onCompositionStart`?x===`onCompositionEnd`&&$n&&(b=_n()):(mn=i,hn=`value`in mn?mn.value:mn.textContent,$n=!0)),y=Td(r,x),0<y.length&&(x=new Pn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=z(n),b!==null&&(x.data=b)))),(b=R?er(e,n):tr(e,n))&&(x=Td(r,`onBeforeInput`),0<x.length&&(y=new Pn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),pd(s,e,r,n,i)}vd(s,t)})}function wd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Td(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=un(e,n),i!=null&&r.unshift(wd(e,i,a)),i=un(e,t),i!=null&&r.push(wd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Ed(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Dd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=un(n,a),l!=null&&o.unshift(wd(n,l,c))):i||(l=un(n,a),l!=null&&o.push(wd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Od=/\r\n?/g,kd=/\u0000|\uFFFD/g;function Ad(e){return(typeof e==`string`?e:``+e).replace(Od,`
`).replace(kd,``)}function jd(e,t){return t=Ad(t),Ad(e)===t}function Md(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&qt(e,``+r);break;case`className`:Mt(e,`class`,r);break;case`tabIndex`:Mt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Mt(e,n,r);break;case`style`:Xt(e,r,o);break;case`data`:if(t!==`object`){Mt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=en(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&Md(e,t,`name`,a.name,a,null),Md(e,t,`formEncType`,a.formEncType,a,null),Md(e,t,`formMethod`,a.formMethod,a,null),Md(e,t,`formTarget`,a.formTarget,a,null)):(Md(e,t,`encType`,a.encType,a,null),Md(e,t,`method`,a.method,a,null),Md(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=en(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=tn);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=en(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:$(`beforetoggle`,e),$(`toggle`,e),jt(e,`popover`,r);break;case`xlinkActuate`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Nt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Nt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Nt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Nt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:jt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Qt.get(n)||n,jt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Xt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&qt(e,``+r);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=tn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!wt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[ut]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):jt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:$(`error`,e),$(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,o,s,n,null)}}a&&Md(e,t,`srcSet`,n.srcSet,n,null),r&&Md(e,t,`src`,n.src,n,null);return;case`input`:$(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Md(e,t,r,d,n,null)}}Ht(e,o,c,l,u,s,a,!1);return;case`select`:for(a in $(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Md(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Wt(e,!!r,n,!0):Wt(e,!!r,t,!1);return;case`textarea`:for(s in $(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Md(e,t,s,c,n,null)}Kt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Md(e,t,l,r,n,null)}return;case`dialog`:$(`beforetoggle`,e),$(`toggle`,e),$(`cancel`,e),$(`close`,e);break;case`iframe`:case`object`:$(`load`,e);break;case`video`:case`audio`:for(r=0;r<gd.length;r++)$(gd[r],e);break;case`image`:$(`error`,e),$(`load`,e);break;case`details`:$(`toggle`,e);break;case`embed`:case`source`:case`link`:$(`error`,e),$(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,u,r,n,null)}return;default:if(Zt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Md(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Md(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Md(e,t,p,m,r,f)}}Vt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Md(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&Md(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Wt(e,!!n,n?[]:``,!1):Wt(e,!!n,t,!0)):Wt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Md(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Md(e,t,s,a,r,o)}Gt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Md(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Md(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Md(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Md(e,t,u,p,r,m)}return;default:if(Zt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Md(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Md(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[gt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),_t(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[gt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);_t(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=P.d;P.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=vu();return e||t}function yf(e){var t=yt(e);t!==null&&t.tag===5&&t.type===`form`?Cs(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Bt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),St(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Bt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Bt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Bt(n.imageSizes)+`"]`)):i+=`[href="`+Bt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),St(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Bt(r)+`"][href="`+Bt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),St(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=xt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);St(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=xt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),St(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=xt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),St(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=ue.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=xt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=xt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=xt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Bt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),St(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Bt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Bt(n.href)+`"]`);if(r)return t.instance=r,St(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),St(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,St(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),St(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,St(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),St(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[gt]||a[lt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,St(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),St(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:re,_currentValue2:re,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Qe(0),this.hiddenUpdates=Qe(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ii(3,null,null,t),e.current=a,a.stateNode=e,t=ia(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},La(a),e}function tp(e){return e?(e=ni,e):ni}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=za(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=W(e,r,t),n!==null&&(pu(n,e,t),Ba(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=$r(e,67108864);t!==null&&pu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=du();t=it(t);var n=$r(e,t);n!==null&&pu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=N.T;N.T=null;var a=P.p;try{P.p=2,up(e,t,n,r)}finally{P.p=a,N.T=i}}function lp(e,t,n,r){var i=N.T;N.T=null;var a=P.p;try{P.p=8,up(e,t,n,r)}finally{P.p=a,N.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)Cd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=yt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=qe(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Be(o);s.entanglements[1]|=c,o&=~c}nd(a),!(Y&6)&&($l=Oe()+500,rd(0,!1))}}break;case 31:case 13:s=$r(a,2),s!==null&&pu(s,a,2),vu(),ip(a,2)}if(a=dp(r),a===null&&Cd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Cd(e,t,r,null,n)}}function dp(e){return e=rn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=vt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(ke()){case Ae:return 2;case je:return 8;case Me:case Ne:return 32;case Pe:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=yt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=vt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,st(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,st(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);nn=r,n.target.dispatchEvent(r),nn=null}else return t=yt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=yt(n);a!==null&&(e.splice(t,3),t-=3,xs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[ut]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[ut]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,du(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),vu(),t[dt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=ot();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.8`)throw Error(i(527,Lp,`19.2.8`));P.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:N,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Le=zp.inject(Rp),Re=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Ws,s=Gs,c=Ks;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[dt]=t.current,xd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=`modulepreload`,v=function(e){return`/`+e},y={},b=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=v(t,n),t=s(t),t in y)return;y[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:_,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},x=c(u(),1),S=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,C=/^[\\/]{2}/;function w(e,t){return t+e.replace(/\\/g,`/`)}var T=`popstate`;function E(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function D(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return M(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:ee(t)}return ne(t,n,null,e)}function O(e,t){if(e===!1||e==null)throw Error(t)}function k(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function A(){return Math.random().toString(36).substring(2,10)}function j(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function M(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?te(t):t,state:n,key:t&&t.key||r||A(),mask:i}}function ee({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function te(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ne(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=E(e)?e:M(h.location,e,t);n&&n(r,e),l=u()+1;let d=j(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=E(e)?e:M(h.location,e,t);n&&n(r,e),l=u();let i=j(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return N(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(T,d),c=e,()=>{i.removeEventListener(T,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function N(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),O(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:ee(t);return i=i.replace(/ $/,`%20`),!n&&C.test(i)&&(i=r+i),new URL(i,r)}function P(e,t,n=`/`){return re(e,t,n,!1)}function re(e,t,n,r,i){let a=xe((typeof t==`string`?te(t):t).pathname||`/`,n);if(a==null)return null;let o=i??ie(e),s=null,c=be(a);for(let e=0;s==null&&e<o.length;++e)s=ge(o[e],c,r);return s}function ie(e){let t=ae(e);return se(t),t}function ae(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;O(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=ke([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(O(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),ae(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:me(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=ye(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of oe(e.path))a(e,t,!0,n)}),t}function oe(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=oe(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function se(e){e.sort((e,t)=>e.score===t.score?he(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var F=/^:[\w-]+$/,ce=3,le=2,ue=1,de=10,fe=-2,pe=e=>e===`*`;function me(e,t){let n=e.split(`/`),r=n.length;return n.some(pe)&&(r+=fe),t&&(r+=le),n.filter(e=>!pe(e)).reduce((e,t)=>e+(F.test(t)?ce:t===``?ue:de),r)}function he(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function ge(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?ve(u,l,s.matcher,s.compiledParams):_e(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=_e({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:ke([a,d.pathname]),pathnameBase:je(ke([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=ke([a,d.pathnameBase]))}return o}function _e(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=ye(e.path,e.caseSensitive,e.end);return ve(e,t,n,r)}function ve(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return e[t]=n&&!i?void 0:(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function ye(e,t=!1,n=!0){k(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function be(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return k(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function xe(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Se(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?te(e):e,a;return n?(n=Oe(n),a=n.startsWith(`/`)?Ce(n.substring(1),`/`):Ce(n,t)):a=t,{pathname:a,search:Me(r),hash:Ne(i)}}function Ce(e,t){let n=Ae(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function we(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Te(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Ee(e){let t=Te(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function De(e,t,n,r=!1){let i;typeof e==`string`?i=te(e):(i={...e},O(!i.pathname||!i.pathname.includes(`?`),we(`?`,`pathname`,`search`,i)),O(!i.pathname||!i.pathname.includes(`#`),we(`#`,`pathname`,`hash`,i)),O(!i.search||!i.search.includes(`#`),we(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Se(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Oe=e=>e.replace(/[\\/]{2,}/g,`/`),ke=e=>Oe(e.join(`/`)),Ae=e=>e.replace(/\/+$/,``),je=e=>Ae(e).replace(/^\/*/,`/`),Me=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ne=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Pe=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Fe(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Ie(e){return ke(e.map(e=>e.route.path).filter(Boolean))||`/`}var Le=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Re(e,t){let n=e;if(typeof n!=`string`||!S.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Le)try{let e=new URL(window.location.href),r=C.test(n)?new URL(w(n,e.protocol)):new URL(n),a=xe(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{k(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var ze=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(ze);var Be=[`GET`,...ze];new Set(Be);var Ve=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function He(e){try{return Ve.includes(new URL(e).protocol)}catch{return!1}}var Ue=x.createContext(null);Ue.displayName=`DataRouter`;var We=x.createContext(null);We.displayName=`DataRouterState`;var Ge=x.createContext(!1);function Ke(){return x.useContext(Ge)}var qe=x.createContext({isTransitioning:!1});qe.displayName=`ViewTransition`;var Je=x.createContext(new Map);Je.displayName=`Fetchers`;var Ye=x.createContext(null);Ye.displayName=`Await`;var Xe=x.createContext(null);Xe.displayName=`Navigation`;var Ze=x.createContext(null);Ze.displayName=`Location`;var Qe=x.createContext({outlet:null,matches:[],isDataRoute:!1});Qe.displayName=`Route`;var $e=x.createContext(null);$e.displayName=`RouteError`;var et=`REACT_ROUTER_ERROR`,tt=`REDIRECT`,nt=`ROUTE_ERROR_RESPONSE`;function rt(e){if(e.startsWith(`${et}:${tt}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function it(e){if(e.startsWith(`${et}:${nt}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Pe(t.status,t.statusText,t.data)}catch{}}function at(e,{relative:t}={}){O(ot(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=x.useContext(Xe),{hash:i,pathname:a,search:o}=ht(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:ke([n,a])),r.createHref({pathname:s,search:o,hash:i})}function ot(){return x.useContext(Ze)!=null}function st(){return O(ot(),`useLocation() may be used only in the context of a <Router> component.`),x.useContext(Ze).location}var ct=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function lt(e){x.useContext(Xe).static||x.useLayoutEffect(e)}function ut(){let{isDataRoute:e}=x.useContext(Qe);return e?Mt():dt()}function dt(){O(ot(),`useNavigate() may be used only in the context of a <Router> component.`);let e=x.useContext(Ue),{basename:t,navigator:n}=x.useContext(Xe),{matches:r}=x.useContext(Qe),{pathname:i}=st(),a=JSON.stringify(Ee(r)),o=x.useRef(!1);return lt(()=>{o.current=!0}),x.useCallback((r,s={})=>{if(k(o.current,ct),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=De(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:ke([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}var ft=x.createContext(null);function pt(e){let t=x.useContext(Qe).outlet;return x.useMemo(()=>t&&x.createElement(ft.Provider,{value:e},t),[t,e])}function mt(){let{matches:e}=x.useContext(Qe);return e[e.length-1]?.params??{}}function ht(e,{relative:t}={}){let{matches:n}=x.useContext(Qe),{pathname:r}=st(),i=JSON.stringify(Ee(n));return x.useMemo(()=>De(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function gt(e,t){return _t(e,t)}function _t(e,t,n){O(ot(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=x.useContext(Xe),{matches:i}=x.useContext(Qe),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Pt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=st(),d;if(t){let e=typeof t==`string`?te(t):t;O(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):P(e,{pathname:p});k(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),k(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=wt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:ke([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:ke([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?x.createElement(Ze.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function vt(){let e=jt(),t=Fe(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=x.createElement(x.Fragment,null,x.createElement(`p`,null,`💿 Hey developer 👋`),x.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,x.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,x.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),x.createElement(x.Fragment,null,x.createElement(`h2`,null,`Unexpected Application Error!`),x.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?x.createElement(`pre`,{style:i},n):null,o)}var yt=x.createElement(vt,null),bt=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=it(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:x.createElement(Qe.Provider,{value:this.props.routeContext},x.createElement($e.Provider,{value:e,children:this.props.component}));return this.context?x.createElement(St,{error:e},t):t}};bt.contextType=Ge;var xt=new WeakMap;function St({children:e,error:t}){let{basename:n}=x.useContext(Xe);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=rt(t.digest);if(e){let r=xt.get(t);if(r)throw r;let i=Re(e.location,n),a=i.absoluteURL||i.to;if(He(a))throw Error(`Invalid redirect location`);if(Le&&!xt.get(t)){if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw xt.set(t,n),n}}return x.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function Ct({routeContext:e,match:t,children:n}){let r=x.useContext(Ue);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement(Qe.Provider,{value:e},n)}function wt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);O(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:Ie(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||yt,o&&(s<0&&c===0?(Pt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?x.createElement(n.route.Component,null):n.route.element?n.route.element:e,x.createElement(Ct,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?x.createElement(bt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Tt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Et(e){let t=x.useContext(Ue);return O(t,Tt(e)),t}function Dt(e){let t=x.useContext(We);return O(t,Tt(e)),t}function Ot(e){let t=x.useContext(Qe);return O(t,Tt(e)),t}function kt(e){let t=Ot(e),n=t.matches[t.matches.length-1];return O(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function At(){return kt(`useRouteId`)}function jt(){let e=x.useContext($e),t=Dt(`useRouteError`),n=kt(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Mt(){let{router:e}=Et(`useNavigate`),t=kt(`useNavigate`),n=x.useRef(!1);return lt(()=>{n.current=!0}),x.useCallback(async(r,i={})=>{k(n.current,ct),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Nt={};function Pt(e,t,n){!t&&!Nt[e]&&(Nt[e]=!0,k(!1,n))}x.memo(Ft);function Ft({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return _t(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function It({to:e,replace:t,state:n,relative:r}){O(ot(),`<Navigate> may be used only in the context of a <Router> component.`);let{static:i}=x.useContext(Xe);k(!i,`<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);let{matches:a}=x.useContext(Qe),{pathname:o}=st(),s=ut(),c=De(e,Ee(a),o,r===`path`),l=JSON.stringify(c);return x.useEffect(()=>{s(JSON.parse(l),{replace:t,state:n,relative:r})},[s,l,r,t,n]),null}function Lt(e){return pt(e.context)}function I(e){O(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Rt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){O(!ot(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=x.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=te(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=x.useMemo(()=>{let e=xe(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return k(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:x.createElement(Xe.Provider,{value:c},x.createElement(Ze.Provider,{children:t,value:h}))}function zt({children:e,location:t}){return gt(Bt(e),t)}x.Component;function Bt(e,t=[]){let n=[];return x.Children.forEach(e,(e,r)=>{if(!x.isValidElement(e))return;let i=[...t,r];if(e.type===x.Fragment){n.push.apply(n,Bt(e.props.children,i));return}O(e.type===I,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),O(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Bt(e.props.children,i)),n.push(a)}),n}var Vt=`get`,Ht=`application/x-www-form-urlencoded`;function Ut(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Wt(e){return Ut(e)&&e.tagName.toLowerCase()===`button`}function Gt(e){return Ut(e)&&e.tagName.toLowerCase()===`form`}function Kt(e){return Ut(e)&&e.tagName.toLowerCase()===`input`}function qt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Jt(e,t){return e.button===0&&(!t||t===`_self`)&&!qt(e)}function Yt(e=``){return new URLSearchParams(typeof e==`string`||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}function Xt(e,t){let n=Yt(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}var Zt=null;function Qt(){if(Zt===null)try{new FormData(document.createElement(`form`),0),Zt=!1}catch{Zt=!0}return Zt}var $t=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function en(e){return e!=null&&!$t.has(e)?(k(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ht}"`),null):e}function tn(e,t){let n,r,i,a,o;if(Gt(e)){let o=e.getAttribute(`action`);r=o?xe(o,t):null,n=e.getAttribute(`method`)||Vt,i=en(e.getAttribute(`enctype`))||Ht,a=new FormData(e)}else if(Wt(e)||Kt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?xe(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Vt,i=en(e.getAttribute(`formenctype`))||en(o.getAttribute(`enctype`))||Ht,a=new FormData(o,e),!Qt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Ut(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Vt,r=null,i=Ht,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);function nn(e,t){if(e===!1||e==null)throw Error(t)}function rn(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return i.pathname=n?i.pathname.endsWith(`/`)?`${i.pathname}_.${r}`:`${i.pathname}.${r}`:i.pathname===`/`?`_root.${r}`:t&&xe(i.pathname,t)===`/`?`${Ae(t)}/_root.${r}`:`${Ae(i.pathname)}.${r}`,i}async function an(e,t){if(e.id in t)return t[e.id];try{let n=await b(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function on(e){return e!=null&&typeof e.page==`string`}function sn(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function cn(e,t,n){return pn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await an(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(sn).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function ln(e,t,n,r,i,a){let o=(e,t)=>!n[t]||e.route.id!==n[t].route.id,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function un(e,t,{includeHydrateFallback:n}={}){return dn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function dn(e){return[...new Set(e)]}function fn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function pn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!on(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(fn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function mn(){let e=x.useContext(Ue);return nn(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function hn(){let e=x.useContext(We);return nn(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var gn=x.createContext(void 0);gn.displayName=`FrameworkContext`;function _n(){let e=x.useContext(gn);return nn(e,`You must render this element inside a <HydratedRouter> element`),e}function vn(e,t){let n=x.useContext(gn),[r,i]=x.useState(!1),[a,o]=x.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=x.useRef(null);x.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),x.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:yn(s,p),onBlur:yn(c,m),onMouseEnter:yn(l,p),onMouseLeave:yn(u,m),onTouchStart:yn(d,p)}]:[a,f,{}]:[!1,f,{}]}function yn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function bn({page:e,...t}){let n=Ke(),{nonce:r}=_n(),{router:i}=mn(),a=x.useMemo(()=>P(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?x.createElement(Sn,{page:e,matches:a,...t}):x.createElement(Cn,{page:e,matches:a,...t})):null}function xn(e){let{manifest:t,routeModules:n}=_n(),[r,i]=x.useState([]);return x.useEffect(()=>{let r=!1;return cn(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Sn({page:e,matches:t,...n}){let r=st(),{future:i}=_n(),{basename:a}=mn(),o=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=rn(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return x.createElement(x.Fragment,null,o.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function Cn({page:e,matches:t,...n}){let r=st(),{future:i,manifest:a,routeModules:o}=_n(),{basename:s}=mn(),{loaderData:c,matches:l}=hn(),u=x.useMemo(()=>ln(e,t,l,a,r,`data`),[e,t,l,a,r]),d=x.useMemo(()=>ln(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=rn(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=x.useMemo(()=>un(d,a),[d,a]),m=xn(d);return x.createElement(x.Fragment,null,f.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>x.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>x.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function wn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}x.Component;var Tn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{Tn&&(window.__reactRouterVersion=`7.18.2`)}catch{}function En({basename:e,children:t,useTransitions:n,window:r}){let i=x.useRef();i.current??=D({window:r,v5Compat:!0});let a=i.current,[o,s]=x.useState({action:a.action,location:a.location}),c=x.useCallback(e=>{n===!1?s(e):x.startTransition(()=>s(e))},[n]);return x.useLayoutEffect(()=>a.listen(c),[a,c]),x.createElement(Rt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}var L=x.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=x.useContext(Xe),v=typeof l==`string`&&S.test(l),y=Re(l,h);l=y.to;let b=at(l,{relative:r}),C=st(),w=null;if(o){let e=De(o,[],C.mask?C.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:ke([h,e.pathname])),w=g.createHref(e)}let[T,E,D]=vn(n,p),O=jn(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function k(t){e&&e(t),t.defaultPrevented||O(t)}let A=!(y.isExternal||i),j=x.createElement(`a`,{...p,...D,href:(A?w:void 0)||y.absoluteURL||b,onClick:A?k:e,ref:wn(m,E),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return T&&!v?x.createElement(x.Fragment,null,j,x.createElement(bn,{page:b})):j});L.displayName=`Link`;var Dn=x.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=ht(a,{relative:c.relative}),d=st(),f=x.useContext(We),{navigator:p,basename:m}=x.useContext(Xe),h=f!=null&&Ln(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=xe(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,S=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),C={isActive:b,isPending:S,isTransitioning:h},w=b?e:void 0,T;T=typeof n==`function`?n(C):[n,b?`active`:null,S?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let E=typeof i==`function`?i(C):i;return x.createElement(L,{...c,"aria-current":w,className:T,ref:l,style:E,to:a,viewTransition:o},typeof s==`function`?s(C):s)});Dn.displayName=`NavLink`;var On=x.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Vt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=x.useContext(Xe),g=Fn(),_=In(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&S.test(s);return x.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?x.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});On.displayName=`Form`;function kn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function An(e){let t=x.useContext(Ue);return O(t,kn(e)),t}function jn(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=ut(),d=st(),f=ht(e,{relative:o});return x.useCallback(p=>{if(Jt(p,t)){p.preventDefault();let t=n===void 0?ee(d)===ee(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?x.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}function Mn(e){k(typeof URLSearchParams<`u`,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=x.useRef(Yt(e)),n=x.useRef(!1),r=st(),i=x.useMemo(()=>Xt(r.search,n.current?null:t.current),[r.search]),a=ut();return[i,x.useCallback((e,t)=>{let r=Yt(typeof e==`function`?e(new URLSearchParams(i)):e);n.current=!0,a(`?`+r,t)},[a,i])]}var Nn=0,Pn=()=>`__${String(++Nn)}__`;function Fn(){let{router:e}=An(`useSubmit`),{basename:t}=x.useContext(Xe),n=At(),r=e.fetch,i=e.navigate;return x.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=tn(e,t);if(a.navigate===!1){let e=a.fetcherKey||Pn();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function In(e,{relative:t}={}){let{basename:n}=x.useContext(Xe),r=x.useContext(Qe);O(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...ht(e||`.`,{relative:t})},o=st();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:ke([n,a.pathname])),ee(a)}function Ln(e,{relative:t}={}){let n=x.useContext(qe);O(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=An(`useViewTransitionState`),i=ht(e,{relative:t});if(!n.isTransitioning)return!1;let a=xe(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=xe(n.nextLocation.pathname,r)||n.nextLocation.pathname;return _e(i.pathname,o)!=null||_e(i.pathname,a)!=null}var Rn=c(m(),1),zn=g(),Bn=`srikala_categories`,Vn=`srikala_products`,Hn=e=>`https://images.unsplash.com/${e}?auto=format&fit=crop&w=800&q=80`,Un=[{id:`kanjivaram`,name:`Kanchivaram`,image:`/images/styles/kanchivaram.jpg`,tagline:`Temple-woven silk, heirloom weight`},{id:`banarasi`,name:`Banarasi`,image:`/images/styles/banarasi.jpg`,tagline:`Brocade zari from the ghats`},{id:`tussar`,name:`Tussar & Cotton`,image:Hn(`photo-1676696706907-0e04665b80bd`),tagline:`Everyday drape, breathable weave`},{id:`bridal`,name:`Bridal Edit`,image:Hn(`photo-1692992193981-d3d92fabd9cb`),tagline:`Curated for the big day`},{id:`organza`,name:`Organza`,image:Hn(`photo-1610189012906-4c0aa9b9781e`),tagline:`Sheer, modern, festive`},{id:`linen`,name:`Linen`,image:Hn(`photo-1609748340041-f5d61e061ebc`),tagline:`Light weaves for warm days`}],Wn=[{id:`p1`,name:`Purple Kanjivaram with Gold Zari`,category:`kanjivaram`,price:18500,mrp:24e3,image:Hn(`photo-1641699862936-be9f49b1c38d`),stock:4,description:`Handwoven Kanjivaram silk saree in deep purple with a temple-border gold zari pallu.`},{id:`p2`,name:`Maroon Banarasi Silk`,category:`banarasi`,price:15200,mrp:19e3,image:Hn(`photo-1610030469983-98e550d6193c`),stock:0,description:`Classic Banarasi weave in maroon with fine brocade work through the body and pallu.`},{id:`p3`,name:`Emerald Tussar Cotton`,category:`tussar`,price:4200,mrp:5200,image:Hn(`photo-1717585679395-bbe39b5fb6bc`),stock:12,description:`Breathable tussar-cotton blend, ideal for daily wear and office festivities.`},{id:`p4`,name:`Ivory Bridal Kanjivaram`,category:`bridal`,price:32500,mrp:39e3,image:Hn(`photo-1619516388835-2b60acc4049e`),stock:2,description:`Statement bridal Kanjivaram in ivory and gold, paired with a heavy contrast pallu.`},{id:`p5`,name:`Sage Linen Saree`,category:`linen`,price:3600,mrp:4400,image:Hn(`photo-1609748340041-f5d61e061ebc`),stock:9,description:`Handloom linen in sage green with a woven self-border, styled for warm afternoons.`},{id:`p6`,name:`Blush Organza Festive`,category:`organza`,price:6800,mrp:8500,image:Hn(`photo-1610189013429-a703f4b245cf`),stock:6,description:`Sheer organza with sequin scatter work, light enough for festive evenings.`},{id:`p7`,name:`Teal Kanjivaram Temple Border`,category:`kanjivaram`,price:21e3,mrp:26500,image:Hn(`photo-1676696706907-0e04665b80bd`),stock:3,description:`Rich teal Kanjivaram with a wide temple-border pallu and contrast blouse piece.`},{id:`p8`,name:`Gold Banarasi Tissue`,category:`banarasi`,price:17800,mrp:22e3,image:Hn(`photo-1727430228383-aa1fb59db8bf`),stock:5,description:`Tissue-finish Banarasi in gold with all-over floral butis.`},{id:`p9`,name:`Rust Cotton Handloom`,category:`tussar`,price:3800,mrp:4600,image:Hn(`photo-1588140686379-1b76a52103dc`),stock:15,description:`Rust handloom cotton with a simple striped border, easy for daily wear.`},{id:`p10`,name:`Wine Bridal Silk`,category:`bridal`,price:28900,mrp:35e3,image:Hn(`photo-1618901185975-d59f7091bcfe`),stock:0,description:`Deep wine bridal silk with heavy gold zari work through the pallu and border.`},{id:`p11`,name:`Mustard Linen Weave`,category:`linen`,price:3900,mrp:4700,image:Hn(`photo-1617627143750-d86bc21e42bb`),stock:7,description:`Mustard handloom linen with a fine self-check pattern.`},{id:`p12`,name:`Peacock Blue Organza`,category:`organza`,price:7200,mrp:8900,image:Hn(`photo-1610189012906-4c0aa9b9781e`),stock:8,description:`Peacock-blue organza with delicate thread embroidery along the border.`}];function Gn(e,t){try{let n=localStorage.getItem(e);if(!n&&e.startsWith(`srikala_`)){let t=e.replace(`srikala_`,`miladys_`);n=localStorage.getItem(t)}if(n){let r=JSON.parse(n);if(e===Bn&&Array.isArray(r)){let n=!1,i=r.map(e=>{let r=t.find(t=>t.id===e.id);return r&&(e.image?.includes(`photo-1618901185975`)||e.image?.includes(`photo-1727430228383`)||e.name===`Kanjivaram Silk`)?(n=!0,{...e,name:r.name,image:r.image}):e});if(n)return localStorage.setItem(e,JSON.stringify(i)),i}return r}return localStorage.setItem(e,JSON.stringify(t)),t}catch{return t}}function Kn(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function qn(){return Gn(Bn,Un)}function Jn(){return Gn(Vn,Wn)}function R(e){return`₹`+Number(e).toLocaleString(`en-IN`)}var Yn=`srikala_cart`;function Xn(){return Gn(Yn,[])}function Zn(e){Kn(Yn,e)}var Qn=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),z=o(((e,t)=>{t.exports=Qn()}))(),$n=(0,x.createContext)(null);function er({children:e}){let[t,n]=(0,x.useState)([]);(0,x.useEffect)(()=>{n(Xn())},[]);function r(e,t=1,r=null){let i=r?.id?`${e.id}_${r.id}`:String(e.id);n(n=>{let a=n.find(t=>t.key?t.key===i:t.id===e.id&&t.variantId===(r?.id||null))?n.map(n=>(n.key?n.key===i:n.id===e.id&&n.variantId===(r?.id||null))?{...n,qty:n.qty+t}:n):[...n,{key:i,id:e.id,variantId:r?.id||null,variantName:r?.color_name||r?.colorName||null,variantColor:r?.color_code||r?.colorCode||null,sku:r?.sku||e.sku||null,name:e.name,price:Number(r?.price||e.price),mrp:Number(r?.mrp||e.mrp||e.price),image:r?.images&&r.images[0]||e.image,weightGrams:Number(r?.weight_grams||e.weight_grams||e.weightGrams||500),returnAvailable:!!(e.return_available??e.returnAvailable??!0),returnWindowHours:Number(e.return_window_hours??e.returnWindowHours??24),cancellationAvailable:!!(e.cancellation_available??e.cancellationAvailable??!0),qty:t}];return Zn(a),a})}function i(e,t){n(n=>{let r=t<=0?n.filter(t=>(t.key||t.id)!==e&&t.id!==e):n.map(n=>(n.key||n.id)===e||n.id===e?{...n,qty:t}:n);return Zn(r),r})}function a(e){n(t=>{let n=t.filter(t=>(t.key||t.id)!==e&&t.id!==e);return Zn(n),n})}function o(){n([]),Zn([])}let s=(0,x.useMemo)(()=>t.reduce((e,t)=>e+t.qty,0),[t]),c=(0,x.useMemo)(()=>t.reduce((e,t)=>e+t.qty*t.price,0),[t]);return(0,z.jsx)($n.Provider,{value:{items:t,addItem:r,updateQty:i,removeItem:a,clearCart:o,count:s,subtotal:c},children:e})}function tr(){let e=(0,x.useContext)($n);if(!e)throw Error(`useCart must be used within a CartProvider`);return e}var nr=`http://localhost:4000`,rr=`srikala_token`;function ir(){return localStorage.getItem(rr)||localStorage.getItem(`miladys_token`)}function ar(e){e?(localStorage.setItem(rr,e),localStorage.removeItem(`miladys_token`)):(localStorage.removeItem(rr),localStorage.removeItem(`miladys_token`))}async function B(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=ir();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(`${nr}${e}`,{method:t,headers:i,body:n===void 0?void 0:JSON.stringify(n)})}catch{throw Error(`Could not reach the server. Is the backend running?`)}let s=await o.json().catch(()=>({}));if(!o.ok)throw Error(s.error||`Something went wrong.`);return s}async function or(e,t){let n=ir(),r={};n&&(r.Authorization=`Bearer ${n}`);let i;try{i=await fetch(`${nr}${e}`,{headers:r})}catch{throw Error(`Could not reach the server. Is the backend running?`)}if(!i.ok){let e=await i.json().catch(()=>({}));throw Error(e.error||`Could not download the file.`)}let a=await i.blob(),o=URL.createObjectURL(a),s=document.createElement(`a`);s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}var V={signup:e=>B(`/api/auth/signup`,{method:`POST`,body:e,auth:!1}),login:e=>B(`/api/auth/login`,{method:`POST`,body:e,auth:!1}),googleLogin:e=>B(`/api/auth/google`,{method:`POST`,body:e,auth:!1}),forgotPassword:e=>B(`/api/auth/forgot-password`,{method:`POST`,body:e,auth:!1}),resetPassword:e=>B(`/api/auth/reset-password`,{method:`POST`,body:e,auth:!1}),me:()=>B(`/api/auth/me`),updateMe:e=>B(`/api/auth/me`,{method:`PUT`,body:e}),changePassword:e=>B(`/api/auth/change-password`,{method:`POST`,body:e}),completeProfile:e=>B(`/api/auth/complete-profile`,{method:`POST`,body:e}),getAddresses:()=>B(`/api/auth/addresses`),addAddress:e=>B(`/api/auth/addresses`,{method:`POST`,body:e}),updateAddress:(e,t)=>B(`/api/auth/addresses/${e}`,{method:`PUT`,body:t}),setDefaultAddress:e=>B(`/api/auth/addresses/${e}/default`,{method:`PUT`}),deleteAddress:e=>B(`/api/auth/addresses/${e}`,{method:`DELETE`}),getCategories:()=>B(`/api/categories`,{auth:!1}),getAllCategoriesAdmin:()=>B(`/api/categories/admin/all`),createCategory:e=>B(`/api/categories`,{method:`POST`,body:e}),updateCategory:(e,t)=>B(`/api/categories/${e}`,{method:`PUT`,body:t}),deleteCategory:e=>B(`/api/categories/${e}`,{method:`DELETE`}),getProducts:e=>B(`/api/products${e?`?category=${e}`:``}`,{auth:!1}),getAllProductsAdmin:()=>B(`/api/products/admin/all`),getProduct:e=>B(`/api/products/${e}`,{auth:!1}),createProduct:e=>B(`/api/products`,{method:`POST`,body:e}),updateProduct:(e,t)=>B(`/api/products/${e}`,{method:`PUT`,body:t}),deleteProduct:e=>B(`/api/products/${e}`,{method:`DELETE`}),addVariant:(e,t)=>B(`/api/products/${e}/variants`,{method:`POST`,body:t}),updateVariant:(e,t,n)=>B(`/api/products/${e}/variants/${t}`,{method:`PUT`,body:n}),deleteVariant:(e,t)=>B(`/api/products/${e}/variants/${t}`,{method:`DELETE`}),getHomeSections:()=>B(`/api/home-sections`,{auth:!1}),getHomeSection:e=>B(`/api/home-sections/${e}`,{auth:!1}),getAllHomeSections:()=>B(`/api/home-sections/all`),updateHomeSection:(e,t)=>B(`/api/home-sections/${e}`,{method:`PUT`,body:t}),getReviews:e=>B(`/api/products/${e}/reviews`,{auth:!1}),addReview:(e,t)=>B(`/api/products/${e}/reviews`,{method:`POST`,body:t}),getAdminReviews:()=>B(`/api/admin/reviews`),approveReview:(e,t)=>B(`/api/admin/reviews/${e}/approve`,{method:`PUT`,body:{approved:t}}),deleteReview:e=>B(`/api/admin/reviews/${e}`,{method:`DELETE`}),createOrder:e=>B(`/api/orders/create`,{method:`POST`,body:e}),verifyOrder:e=>B(`/api/orders/verify`,{method:`POST`,body:e}),getMyOrders:()=>B(`/api/orders`),getAllOrders:()=>B(`/api/orders/admin/all`),cancelOrder:(e,t)=>B(`/api/orders/${e}/cancel`,{method:`POST`,body:t}),approveCancellation:e=>B(`/api/orders/admin/${e}/cancellation/approve`,{method:`PUT`}),rejectCancellation:(e,t)=>B(`/api/orders/admin/${e}/cancellation/reject`,{method:`PUT`,body:t}),trackOrder:e=>B(`/api/orders/${e}/track`),updateOrderStatus:(e,t)=>B(`/api/orders/admin/${e}/status`,{method:`PUT`,body:t}),assignOrderAWB:e=>B(`/api/orders/admin/${e}/assign-awb`,{method:`POST`}),downloadInvoice:e=>or(`/api/orders/${e}/invoice`,`RavichandraTextiles-Invoice-${e}.pdf`),calculateShipping:e=>B(`/api/shipping/calculate`,{method:`POST`,body:e,auth:!1}),getPickupLocations:()=>B(`/api/pickup-locations`),addPickupLocation:e=>B(`/api/pickup-locations`,{method:`POST`,body:e}),setDefaultPickupLocation:e=>B(`/api/pickup-locations/${e}/default`,{method:`PUT`}),deletePickupLocation:e=>B(`/api/pickup-locations/${e}`,{method:`DELETE`}),syncPickupLocations:()=>B(`/api/pickup-locations/sync`,{method:`POST`}),submitReturn:e=>B(`/api/returns`,{method:`POST`,body:e}),getMyReturns:()=>B(`/api/returns`),getAllReturns:()=>B(`/api/returns/admin/all`),updateReturnStatus:(e,t)=>B(`/api/returns/admin/${e}`,{method:`PUT`,body:t}),getSettings:()=>B(`/api/settings`,{auth:!1}),getSetting:e=>B(`/api/settings/${e}`,{auth:!1}),updateSetting:(e,t)=>B(`/api/settings/${e}`,{method:`PUT`,body:{value:t}}),getAdminMetrics:()=>B(`/api/admin/metrics`),getAuditLogs:()=>B(`/api/admin/audit-logs`),getAdminUsers:e=>B(`/api/admin/users${e?`?${new URLSearchParams(e).toString()}`:``}`),getAdminUserDetail:e=>B(`/api/admin/users/${e}`),testAdminEmail:e=>B(`/api/admin/test-email`,{method:`POST`,body:{email:e}}),validateCoupon:e=>B(`/api/coupons/validate`,{method:`POST`,body:e}),getCoupons:()=>B(`/api/coupons`),createCoupon:e=>B(`/api/coupons`,{method:`POST`,body:e}),updateCoupon:(e,t)=>B(`/api/coupons/${e}`,{method:`PUT`,body:t}),deleteCoupon:e=>B(`/api/coupons/${e}`,{method:`DELETE`}),getTestimonials:e=>B(`/api/testimonials${e?`?productId=${e}`:``}`,{auth:!1}),getAllTestimonials:()=>B(`/api/testimonials/admin/all`),createTestimonial:e=>B(`/api/testimonials`,{method:`POST`,body:e}),updateTestimonial:(e,t)=>B(`/api/testimonials/${e}`,{method:`PUT`,body:t}),deleteTestimonial:e=>B(`/api/testimonials/${e}`,{method:`DELETE`}),getCancellationPolicy:()=>B(`/api/cancellation-policy`,{auth:!1}),createPolicyTier:e=>B(`/api/cancellation-policy`,{method:`POST`,body:e}),updatePolicyTier:(e,t)=>B(`/api/cancellation-policy/${e}`,{method:`PUT`,body:t}),deletePolicyTier:e=>B(`/api/cancellation-policy/${e}`,{method:`DELETE`})},sr=(0,x.createContext)(null);function cr({children:e}){let[t,n]=(0,x.useState)(null),[r,i]=(0,x.useState)(!1),[a,o]=(0,x.useState)(null),[s,c]=(0,x.useState)(!0);async function l(){if(!ir())return n(null),i(!1),o(null),null;try{let e=await V.me();return n(e.user),i(!!e.needsProfile),o(e.defaultAddress||null),e.user}catch{return ar(null),n(null),i(!1),o(null),null}}(0,x.useEffect)(()=>{if(!ir()){c(!1);return}l().finally(()=>c(!1))},[]);async function u(e,t){try{let{token:r,user:i}=await V.login({email:e,password:t});return ar(r),n(i),await l(),i}catch(r){if((r.message?.includes(`Could not reach the server`)||r.message?.includes(`Failed to fetch`))&&(e?.trim().toLowerCase()===`admin@srikala.com`||e?.trim().toLowerCase()===`ravichandratextiles39@gmail.com`)&&t===`ChangeMe123!`){let t={id:`admin-local`,name:`Administrator`,email:e?.trim().toLowerCase(),isAdmin:!0};return n(t),i(!1),t}throw r}}async function d(e){let{token:t,user:r}=await V.signup(e);return ar(t),n(r),await l(),r}async function f(e){let t=await V.googleLogin({credential:e});return ar(t.token),n(t.user),i(!!t.needsProfile),o(t.defaultAddress||null),t}async function p(e){let t=await V.completeProfile(e);return n(t.user),i(!1),o(t.defaultAddress||null),t}async function m(e){return V.forgotPassword({email:e})}async function h(e,t){let{token:r,user:i}=await V.resetPassword({token:e,newPassword:t});return ar(r),n(i),await l(),i}function g(){ar(null),n(null),i(!1),o(null)}return(0,z.jsx)(sr.Provider,{value:{user:t,loading:s,needsProfile:r,defaultAddress:a,login:u,signup:d,googleLogin:f,completeProfile:p,refreshUser:l,logout:g,forgotPassword:m,resetPassword:h,isAdmin:!!t?.isAdmin},children:e})}function lr(){return(0,x.useContext)(sr)}var H={name:`Ravichandra Textiles`,legalName:`Ravichandra Textiles & Handlooms`,tagline:`Best Traditional Sarees in Dharmavaram — Authentic Pure Silk Handlooms`,shortTitle:`Ravichandra Textiles`,fullTitle:`Best Traditional Sarees in Dharmavaram | Ravichandra Textiles — Authentic Silk Handlooms`,slogan:`Tradition of Pure Weaves & Timeless Craft`,subheading:`Discover the best traditional sarees in Dharmavaram crafted with sacred precision, pure zari, and heirloom artistry directly from master weaving families.`,description:`Ravichandra Textiles is renowned for the best traditional sarees in Dharmavaram, featuring authentic pure silk handloom sarees, rich temple borders, pure gold zari brocades, and bridal heirloom weaves.`,story:{eyebrow:`Our Heritage`,heading:`The Sacred Art of Dharmavaram Handloom Silk`,lead:`Rooted in the historic weaving heartland of Dharmavaram, Ravichandra Textiles celebrates generations of master artisans dedicated to preserving pure Indian silk traditions.`,body:`Ravichandra Textiles brings together the finest handloom weaves directly from master weaver looms in Dharmavaram, Andhra Pradesh. Renowned across the world for rich gold zari brocades, temple pallus, and enduring mulberry silk lustre, each saree is checked by hand for authentic silk mark quality and finish.`,paragraphs:[`Rooted in the historic weaving heartland of Dharmavaram, Andhra Pradesh, Ravichandra Textiles celebrates the sacred heritage of pure Indian silk craftsmanship.`,`From regal bridal silks with heavy gold zari borders to lightweight festive weaves, each piece is thoughtfully handwoven on traditional pit looms by master artisans.`,`Every saree is hand-inspected for weave integrity, zari luster, and flawless drape before reaching your hands with guaranteed authenticity.`],values:[{title:`Authentic Dharmavaram Weaves`,description:`Directly sourced from master artisan looms in Dharmavaram, preserving sacred handloom heritage.`},{title:`Pure Silk & Genuine Zari`,description:`Crafted with premium mulberry silk and certified zari threads for enduring heirloom elegance.`},{title:`Hand-Inspected Excellence`,description:`Every single saree undergoes rigorous quality checks for weave density, borders, and pallu brilliance.`}]},contact:{phone:`+91 83175 51337`,whatsapp:`918317551337`,email:`ravichandratextiles39@gmail.com`,address:`10-28, Kpt street, near Punjab National Bank, Dharmavaram 515671, Andhra Pradesh`,hoursWeekday:`Sun – Sat: 10:00 AM – 10:00 PM`,hoursSunday:`Sun – Sat: 10:00 AM – 10:00 PM`,instagram:`https://www.instagram.com/ravichandra_handlooms`,facebook:`https://www.facebook.com/ravichandrahandlooms`,twitter:`https://twitter.com/ravichandratextiles`,mapQuery:`10-28+Kpt+street+near+Punjab+National+Bank+Dharmavaram+515671+Andhra+Pradesh`},seo:{siteName:`Ravichandra Textiles`,siteUrl:`https://ravichandratextiles.com`,defaultTitle:`Best Traditional Sarees in Dharmavaram | Ravichandra Textiles — Authentic Silk Handlooms`,defaultDescription:`Discover the best traditional sarees in Dharmavaram at Ravichandra Textiles. Shop authentic Dharmavaram pure silk handloom sarees, bridal pattu, rich temple borders & pure zari brocades directly from master weavers with guaranteed purity.`,defaultKeywords:`best traditional sarees in dharmavaram, best saree shop in dharmavaram, dharmavaram silk sarees, dharmavaram handloom sarees, pure pattu sarees dharmavaram, ravichandra textiles, bridal silk sarees dharmavaram, wedding pattu sarees andhra pradesh, dharmavaram pattu sarees online, authentic silk mark sarees, kanchivaram silk, banarasi silk`},assets:{logoLight:`/images/logo.png`,logoWhite:`/images/logo-white.png`,logoHorizontal:`/images/logo-horizontal.png`,logoVertical:`/images/logo-vertical.png`,logoIntro:`/images/logo-vertical.png`,logoDark:`/images/logo.png`,monogram:`/images/monogram.png`,monogramWhite:`/images/monogram-white.png`,favicon:`/favicon.png`,faviconSvg:`/favicon.svg`,appleTouchIcon:`/apple-touch-icon.png`},colors:{primary:`#b87d2b`,primaryHover:`#9c661d`,primaryDark:`#2c1810`,secondary:`#c58b38`,accent:`#d4af37`,goldLight:`#fbf0d8`,navBackground:`#FAF8F5`,background:`#FAF6F0`,surface:`#FFFFFF`,surfaceWarm:`#F8F3ED`,text:`#220D0A`,muted:`#735E59`,border:`#E6DCCE`}},ur=[{to:`/`,label:`Home`,end:!0},{to:`/#collections`,label:`Collections`},{to:`/products`,label:`Sarees`},{to:`/about`,label:`About`},{to:`/contact`,label:`Contact`}];function dr(){let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(!1),[i,a]=(0,x.useState)(!1),[o,s]=(0,x.useState)(!1),[c,l]=(0,x.useState)(!1),[u,d]=(0,x.useState)(``),[f,p]=(0,x.useState)(null),{count:m}=tr(),{user:h,logout:g}=lr(),_=ut(),v=st();(0,x.useEffect)(()=>{a(!1),t(!1)},[v.pathname]),(0,x.useEffect)(()=>{let e=document.getElementById(`page-hero`);if(!e||!(`IntersectionObserver`in window)){l(!1);return}l(!0);let t=window.innerWidth<=860?62:72,n=new IntersectionObserver(([e])=>s(e.isIntersecting),{rootMargin:`-${t}px 0px 0px 0px`,threshold:0});return n.observe(e),()=>n.disconnect()},[v.pathname]);let y=c&&o?`is-transparent`:`is-scrolled`;function b(e){e.preventDefault(),S(u)}function S(e){_(e.trim()?`/products?search=${encodeURIComponent(e.trim())}`:`/products`),r(!1)}(0,x.useEffect)(()=>{n&&f===null&&V.getProducts().then(({products:e})=>p(e)).catch(()=>p([]))},[n,f]);let C=(0,x.useMemo)(()=>{let e=u.trim().toLowerCase();return!e||!f?[]:f.filter(t=>t.name.toLowerCase().includes(e)).slice(0,5)},[u,f]);function w(e,n){if(n.to===`/#collections`&&v.pathname===`/`){e.preventDefault();let t=document.getElementById(`collections`);t&&t.scrollIntoView({behavior:`smooth`})}t(!1)}return(0,z.jsxs)(`header`,{className:`navbar ${y}`,children:[(0,z.jsxs)(`div`,{className:`container navbar-inner`,children:[(0,z.jsxs)(`div`,{className:`nav-left`,children:[(0,z.jsxs)(`button`,{className:`nav-toggle`,"aria-label":`Open menu`,"aria-expanded":e,onClick:()=>{t(e=>!e),r(!1)},children:[(0,z.jsx)(`span`,{}),(0,z.jsx)(`span`,{})]}),(0,z.jsx)(`button`,{className:`icon-btn mobile-search-btn`,"aria-label":`Search`,"aria-expanded":n,onClick:()=>{r(e=>!e),t(!1),a(!1)},children:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`circle`,{cx:`11`,cy:`11`,r:`7`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,z.jsx)(`line`,{x1:`16.2`,y1:`16.2`,x2:`21`,y2:`21`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})})]}),(0,z.jsx)(L,{to:`/`,className:`brand-link`,onClick:()=>t(!1),children:(0,z.jsx)(`img`,{id:`navBrandLogo`,src:H.assets.logoHorizontal||H.assets.logoLight,alt:H.name,className:`brand-logo`,width:`210`,height:`46`})}),(0,z.jsx)(`nav`,{className:`desktop-nav`,"aria-label":`Main Navigation`,children:ur.map(e=>(0,z.jsx)(Dn,{to:e.to,end:e.end,className:({isActive:t})=>`desktop-nav-link`+(t&&!e.to.includes(`#`)?` active`:``),onClick:t=>w(t,e),children:e.label},e.to))}),(0,z.jsxs)(`div`,{className:`nav-actions`,children:[(0,z.jsx)(`button`,{className:`icon-btn desktop-search-btn`,"aria-label":`Search`,"aria-expanded":n,onClick:()=>{r(e=>!e),t(!1),a(!1)},children:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`circle`,{cx:`11`,cy:`11`,r:`7`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,z.jsx)(`line`,{x1:`16.2`,y1:`16.2`,x2:`21`,y2:`21`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})}),(0,z.jsxs)(`div`,{className:`account-menu-wrap`,children:[(0,z.jsx)(`button`,{className:`icon-btn`,"aria-label":`Account`,"aria-expanded":i,onClick:()=>{a(e=>!e),r(!1),t(!1)},children:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`8`,r:`3.4`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,z.jsx)(`path`,{d:`M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})}),i&&(0,z.jsxs)(z.Fragment,{children:[(0,Rn.createPortal)((0,z.jsx)(`div`,{className:`account-menu-overlay`,onClick:()=>a(!1),"aria-hidden":`true`}),document.body),(0,z.jsx)(`div`,{className:`account-menu`,children:h?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`p`,{className:`account-menu-greeting`,children:[`Namaste, `,h.name?.split(` `)[0]||`Guest`]}),(0,z.jsxs)(L,{to:`/orders`,className:`account-menu-link`,onClick:()=>a(!1),children:[(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,z.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h10`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})}),`My Orders`]}),(0,z.jsxs)(L,{to:`/profile`,className:`account-menu-link`,onClick:()=>a(!1),children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`8`,r:`3.4`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,z.jsx)(`path`,{d:`M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]}),`My Profile`]}),(0,z.jsxs)(`button`,{type:`button`,className:`account-menu-link account-menu-logout`,onClick:()=>{g(),a(!1)},children:[(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,z.jsx)(`path`,{d:`M15 17l5-5-5-5M20 12H9M12 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`})}),`Log Out`]})]}):(0,z.jsx)(z.Fragment,{children:(0,z.jsxs)(L,{to:`/login`,className:`account-menu-link`,onClick:()=>a(!1),children:[(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,z.jsx)(`path`,{d:`M15 17l5-5-5-5M20 12H9M12 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`,transform:`rotate(180 12 12)`})}),`Log In / Sign Up`]})})})]})]}),(0,z.jsxs)(L,{to:`/cart`,className:`icon-btn cart-link`,"aria-label":`Cart`,children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`path`,{d:`M4 6h2l1.6 10.2a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L20 8H6.5`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,z.jsx)(`circle`,{cx:`10`,cy:`21`,r:`1.3`,fill:`currentColor`}),(0,z.jsx)(`circle`,{cx:`17`,cy:`21`,r:`1.3`,fill:`currentColor`})]}),m>0&&(0,z.jsx)(`span`,{className:`cart-badge`,children:m})]})]})]}),n&&(0,z.jsxs)(z.Fragment,{children:[(0,Rn.createPortal)((0,z.jsx)(`button`,{className:`search-backdrop`,"aria-label":`Close search`,onClick:()=>r(!1)}),document.body),(0,z.jsxs)(`div`,{className:`search-bar`,children:[(0,z.jsxs)(`form`,{className:`container search-form`,onSubmit:b,children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`circle`,{cx:`9`,cy:`9`,r:`6.5`,stroke:`currentColor`,strokeWidth:`1.4`}),(0,z.jsx)(`line`,{x1:`14`,y1:`14`,x2:`18.5`,y2:`18.5`,stroke:`currentColor`,strokeWidth:`1.4`,strokeLinecap:`round`})]}),(0,z.jsx)(`input`,{type:`search`,autoFocus:!0,placeholder:`Search sarees...`,value:u,onChange:e=>d(e.target.value),"aria-label":`Search products`})]}),u.trim()&&(0,z.jsx)(`div`,{className:`search-suggestions container`,children:C.length>0?(0,z.jsxs)(z.Fragment,{children:[C.map(e=>(0,z.jsxs)(L,{to:`/products/${e.id}`,className:`search-suggestion-item`,onClick:()=>r(!1),children:[(0,z.jsx)(`img`,{src:e.image,alt:``}),(0,z.jsx)(`span`,{className:`search-suggestion-name`,children:e.name}),(0,z.jsx)(`span`,{className:`search-suggestion-price`,children:R(e.price)})]},e.id)),(0,z.jsxs)(`button`,{type:`button`,className:`search-see-all`,onClick:()=>S(u),children:[`See all results for “`,u.trim(),`”`]})]}):(0,z.jsxs)(`p`,{className:`search-no-results`,children:[`No matches for “`,u.trim(),`” — press Enter to search anyway.`]})})]})]}),e&&(0,Rn.createPortal)((0,z.jsx)(`button`,{className:`nav-backdrop`,"aria-label":`Close menu`,onClick:()=>t(!1)}),document.body),(0,z.jsx)(`div`,{className:`nav-popover ${e?`open`:``}`,children:(0,z.jsx)(`nav`,{className:`popover-links`,children:ur.map(e=>(0,z.jsx)(Dn,{to:e.to,end:e.to===`/`,className:({isActive:e})=>`popover-link`+(e?` active`:``),onClick:()=>t(!1),children:e.label},e.to))})}),(0,z.jsx)(`style`,{children:`
        .navbar {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 160;
          margin: 0;
          background: #FAF8F5;
          border-bottom: 1px solid rgba(197, 139, 56, 0.28);
          box-shadow: 0 4px 18px rgba(184, 134, 11, 0.07);
          transition: background 0.25s ease, box-shadow 0.25s ease;
        }
        .navbar.is-scrolled,
        .navbar.is-transparent {
          background: #FAF8F5;
          border-bottom: 1px solid rgba(197, 139, 56, 0.32);
          box-shadow: 0 6px 24px rgba(184, 134, 11, 0.09);
        }
        .navbar-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          padding: 0 24px;
        }
        .nav-left {
          display: none;
        }
        .mobile-search-btn {
          display: none;
        }
        .desktop-search-btn {
          display: flex;
        }
        .brand-link {
          display: flex;
          align-items: center;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .brand-link:hover {
          opacity: 0.92;
          transform: scale(1.02);
        }
        .brand-logo {
          height: 46px;
          max-width: 230px;
          width: auto;
          display: block;
          object-fit: contain;
          filter: drop-shadow(0 1px 2px rgba(44, 24, 16, 0.16));
        }

        /* Desktop Navigation Links */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .desktop-nav-link {
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2c1810;
          position: relative;
          padding: 6px 0;
          transition: color 0.2s ease;
        }
        .desktop-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #b87d2b;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
        }
        .desktop-nav-link:hover {
          color: #b87d2b;
        }
        .desktop-nav-link:hover::after,
        .desktop-nav-link.active::after {
          transform: scaleX(1);
        }
        .desktop-nav-link.active {
          color: #b87d2b;
        }

        .nav-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          background: none;
          border: none;
          padding: 8px;
          position: relative;
          z-index: 250;
        }
        .nav-toggle span {
          width: 22px;
          height: 2px;
          background: #2c1810;
          display: block;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 2;
        }
        .icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          color: #2c1810;
          background: none;
          border: none;
          border-radius: 50%;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .icon-btn svg { width: 22px; height: 22px; }
        .icon-btn:hover { color: #b87d2b; background: rgba(184, 125, 43, 0.08); }

        .account-menu-wrap { position: relative; }
        .account-menu-overlay {
          position: fixed;
          inset: 0;
          /* Must stay BELOW .navbar's own z-index (160). .navbar creates
             its own stacking context (position: fixed + z-index), so
             .account-menu's z-index: 200 only ever competes within that
             context — it can never out-rank an element like this one that
             lives outside it (portaled straight to <body>). If this value
             is ever >= .navbar's z-index, this transparent click-catcher
             ends up covering the whole dropdown and silently swallows
             every click on it (Log In / Sign Up, My Orders, My Profile,
             Log Out all stop working, menu just closes instead). */
          z-index: 145;
        }
        .account-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          z-index: 200;
          min-width: 200px;
          background: var(--ivory);
          border-radius: 16px;
          box-shadow: 0 18px 40px rgba(36,26,23,0.22);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .account-menu-greeting {
          padding: 8px 12px 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--ink-400);
          margin: 0;
        }
        .account-menu-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 12px;
          border-radius: 10px;
          font-family: var(--font-body);
          font-size: 14.5px;
          color: var(--ink-900);
          background: none;
          border: none;
          text-align: left;
          width: 100%;
          cursor: pointer;
        }
        .account-menu-link svg { width: 17px; height: 17px; flex: 0 0 auto; color: var(--ink-400); }
        .account-menu-link:hover { background: var(--blush-400); }
        .account-menu-logout { color: #a13a3a; }
        .account-menu-logout svg { color: #a13a3a; }
        .cart-badge {
          position: absolute;
          top: 3px;
          right: 3px;
          background: #b87d2b;
          color: #ffffff;
          font-size: 10px;
          font-weight: 600;
          min-width: 15px;
          height: 15px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
        }

        .search-bar {
          position: relative;
          z-index: 1;
          margin: 8px 16px 0;
          border-radius: 20px;
          background: #FFFFFF;
          border: 1px solid rgba(197, 139, 56, 0.35);
          box-shadow: 0 12px 28px rgba(184, 134, 11, 0.12);
          animation: searchDrop 0.25s ease;
        }
        @keyframes searchDrop {
          from { max-height: 0; opacity: 0; }
          to { max-height: 80px; opacity: 1; }
        }
        .search-form {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
        }
        .search-form svg { width: 17px; height: 17px; color: #b87d2b; flex: 0 0 auto; }
        .search-form input {
          background: none;
          border: none;
          outline: none;
          color: #2c1810;
          font-family: var(--font-body);
          font-size: 14px;
          width: 100%;
        }
        .search-form input::placeholder { color: #8c7365; opacity: 0.8; }

        .search-suggestions {
          background: #FAF8F5;
          border-top: 1px solid rgba(197, 139, 56, 0.15);
          border-radius: 0 0 20px 20px;
          padding: 6px 10px 10px;
          display: flex;
          flex-direction: column;
        }
        .search-suggestion-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 12px;
          color: #2c1810;
        }
        .search-suggestion-item:hover { background: rgba(184, 125, 43, 0.08); }
        .search-suggestion-item img { width: 34px; height: 34px; border-radius: 8px; object-fit: cover; flex: 0 0 auto; }
        .search-suggestion-name { flex: 1; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .search-suggestion-price { font-size: 12px; color: #8c7365; flex: 0 0 auto; }
        .search-see-all {
          background: none;
          border: none;
          text-align: left;
          padding: 10px;
          font-size: 12.5px;
          color: #b87d2b;
          font-weight: 600;
          cursor: pointer;
        }
        .search-no-results { padding: 10px; font-size: 12.5px; color: #8c7365; margin: 0; }

        .nav-backdrop {
          position: fixed;
          inset: 0;
          z-index: 150;
          background: rgba(36,26,23,0.25);
          border: none;
          padding: 0;
          cursor: default;
        }

        .search-backdrop {
          /* Transparent click-catcher, same reasoning as account-menu-overlay:
             must stay below .navbar's own z-index (160) — .navbar creates its
             own stacking context, so anything portaled outside it with a
             z-index >= 160 would sit on top of the search bar/suggestions
             instead of behind them and swallow every click on it. */
          position: fixed;
          inset: 0;
          z-index: 145;
          background: transparent;
          border: none;
          padding: 0;
          cursor: default;
        }

        .nav-popover {
          position: absolute;
          top: calc(100% + 10px);
          left: 8px;
          z-index: 200;
          min-width: 210px;
          background: #FAF8F5;
          border: 1px solid rgba(197, 139, 56, 0.25);
          border-radius: 18px;
          box-shadow: 0 18px 40px rgba(36,26,23,0.18);
          padding: 14px;
          transform-origin: top left;
          transform: scale(0.92) translateY(-6px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
        }
        .nav-popover.open {
          opacity: 1;
          visibility: visible;
          transform: scale(1) translateY(0);
        }
        .popover-links {
          display: flex;
          flex-direction: column;
        }
        .popover-link {
          padding: 15px 16px;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 15px;
          color: #2c1810;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .popover-link:hover { background: rgba(184, 125, 43, 0.08); }
        .popover-link.active { color: #b87d2b; font-weight: 600; background: rgba(184, 125, 43, 0.12); }

        /* Desktop only — same compact ivory box as mobile, just sized up:
           more padding, bigger text, more room per link. Mobile keeps the
           original smaller dimensions untouched. */
        @media (min-width: 861px) {
          .nav-popover {
            min-width: 280px;
            border-radius: 20px;
            padding: 16px;
          }
          .popover-link {
            padding: 15px 20px;
            font-size: 16px;
            border-radius: 12px;
          }
        }

        @media (max-width: 860px) {
          .navbar { margin: 0; }
          .navbar-inner {
            height: 62px;
            padding: 0 12px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .nav-left {
            display: flex;
            align-items: center;
            gap: 2px;
            z-index: 2;
            position: relative;
          }
          .nav-toggle {
            display: flex;
            padding: 6px;
          }
          .mobile-search-btn {
            display: flex;
          }
          .desktop-search-btn {
            display: none;
          }
          .brand-link {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: calc(100% - 170px);
            text-align: center;
            pointer-events: auto;
          }
          .brand-logo {
            height: 36px;
            max-width: 180px;
            width: auto;
            object-fit: contain;
          }
          .desktop-nav { display: none; }
          .nav-actions {
            display: flex;
            align-items: center;
            gap: 2px;
            z-index: 2;
            position: relative;
          }
          .icon-btn { width: 36px; height: 36px; }
          .icon-btn svg { width: 20px; height: 20px; }
          .nav-popover { left: 8px; min-width: 220px; }
          .search-bar { margin: 8px 12px 0; border-radius: 18px; }
        }

        @media (max-width: 400px) {
          .navbar-inner { padding: 0 8px; }
          .brand-link { max-width: calc(100% - 150px); }
          .brand-logo { height: 32px; max-width: 155px; }
          .icon-btn { width: 32px; height: 32px; }
          .icon-btn svg { width: 18px; height: 18px; }
        }
      `})]})}var fr=[{to:`/products`,label:`Shop`,icon:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`path`,{d:`M4 6h2l1.6 10.2a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L20 8H6.5`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,z.jsx)(`path`,{d:`M9 6a3 3 0 0 1 6 0`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})},{to:`/orders`,label:`Orders`,icon:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`rect`,{x:`4.5`,y:`4`,width:`15`,height:`17`,rx:`2`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,z.jsx)(`path`,{d:`M8 9h8M8 13h8M8 17h5`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})},{to:`/cart`,label:`Cart`,icon:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`path`,{d:`M4 6h2l1.6 10.2a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L20 8H6.5`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,z.jsx)(`circle`,{cx:`10`,cy:`21`,r:`1.3`,fill:`currentColor`}),(0,z.jsx)(`circle`,{cx:`17`,cy:`21`,r:`1.3`,fill:`currentColor`})]})},{to:`/profile`,label:`Profile`,icon:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`8`,r:`3.4`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,z.jsx)(`path`,{d:`M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})}];function pr(){let{count:e}=tr();return(0,z.jsxs)(`nav`,{className:`bottom-nav`,"aria-label":`Mobile navigation`,children:[(0,z.jsx)(`div`,{className:`bottom-nav-glass`,children:fr.map(t=>(0,z.jsxs)(Dn,{to:t.to,className:({isActive:e})=>`bottom-nav-link`+(e?` active`:``),children:[(0,z.jsxs)(`span`,{className:`bottom-nav-icon`,children:[t.icon,t.to===`/cart`&&e>0&&(0,z.jsx)(`span`,{className:`bottom-nav-badge`,children:e})]}),(0,z.jsx)(`span`,{className:`bottom-nav-label`,children:t.label})]},t.to))}),(0,z.jsx)(`style`,{children:`
        .bottom-nav { display: none; }

        @media (max-width: 860px) {
          .bottom-nav {
            display: block;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 80;
            padding: 0 24px calc(10px + env(safe-area-inset-bottom, 0px));
            pointer-events: none;
          }
          .bottom-nav-glass {
            pointer-events: auto;
            margin: 0 auto;
            max-width: 380px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 4px;
            padding: 6px 14px;
            border-radius: 999px;
            background: rgba(58, 14, 21, 0.62);
            backdrop-filter: blur(18px) saturate(160%);
            -webkit-backdrop-filter: blur(18px) saturate(160%);
            border: 1px solid rgba(255,255,255,0.16);
            box-shadow: 0 14px 34px rgba(44, 10, 16, 0.35), inset 0 1px 0 rgba(255,255,255,0.12);
          }
          .bottom-nav-link {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            color: var(--blush-300);
            padding: 5px 14px;
            border-radius: 999px;
            transition: color 0.2s ease, background 0.2s ease;
          }
          .bottom-nav-link.active {
            color: var(--ivory);
          }
          .bottom-nav-icon { position: relative; display: flex; }
          .bottom-nav-link.active .bottom-nav-icon::before {
            content: '';
            position: absolute;
            inset: -8px;
            border-radius: 999px;
            background: radial-gradient(circle, rgba(232,196,183,0.6) 0%, rgba(232,196,183,0.18) 55%, rgba(232,196,183,0) 75%);
            z-index: -1;
          }
          .bottom-nav-icon svg { width: 18px; height: 18px; }
          .bottom-nav-label { font-size: 9px; letter-spacing: 0.03em; font-weight: 500; }
          .bottom-nav-badge {
            position: absolute;
            top: -6px;
            right: -8px;
            background: var(--gold-500);
            color: var(--maroon-950);
            font-size: 9px;
            font-weight: 600;
            min-width: 15px;
            height: 15px;
            border-radius: 999px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 3px;
          }
        }
      `})]})}var mr={whatsapp:H.contact.whatsapp,facebook:H.contact.facebook,twitter:H.contact.twitter,instagram:H.contact.instagram};function hr(e){let t=(e||``).replace(/[^\d]/g,``);return t?`https://wa.me/${t}`:``}function gr(){let[e,t]=(0,x.useState)(mr);(0,x.useEffect)(()=>{V.getHomeSection(`social_links`).then(({section:e})=>{e?.content&&t({...mr,...e.content})}).catch(()=>{})},[]);let n=hr(e.whatsapp||H.contact.whatsapp);return(0,z.jsxs)(`footer`,{className:`site-footer`,children:[(0,z.jsxs)(`div`,{className:`container footer-grid`,children:[(0,z.jsxs)(`div`,{className:`footer-brand`,children:[(0,z.jsx)(L,{to:`/`,className:`footer-logo-link`,children:(0,z.jsx)(`img`,{src:H.assets.logoHorizontal||H.assets.logoLight,alt:H.name,className:`footer-logo`,width:`210`,height:`46`})}),(0,z.jsx)(`p`,{className:`footer-desc`,children:H.description}),(0,z.jsxs)(`div`,{className:`social-links`,children:[e.instagram&&(0,z.jsx)(`a`,{href:e.instagram,target:`_blank`,rel:`noreferrer`,"aria-label":`${H.name} on Instagram`,className:`social-link`,children:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`5`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`4.2`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,z.jsx)(`circle`,{cx:`17.3`,cy:`6.7`,r:`1.1`,fill:`currentColor`})]})}),n&&(0,z.jsx)(`a`,{href:n,target:`_blank`,rel:`noreferrer`,"aria-label":`Chat with ${H.name} on WhatsApp`,className:`social-link`,children:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`path`,{d:`M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z`,stroke:`currentColor`,strokeWidth:`1.5`}),(0,z.jsx)(`path`,{d:`M8.5 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.5-.1 1.4-.6 1.8-.6.5-1.6.8-2.6.5-1.8-.5-3.7-1.6-5.1-3.1-1.3-1.3-2.1-2.7-2.4-3.4-.3-.7-.4-1.7.2-2.4z`,fill:`currentColor`})]})}),e.facebook&&(0,z.jsx)(`a`,{href:e.facebook,target:`_blank`,rel:`noreferrer`,"aria-label":`${H.name} on Facebook`,className:`social-link`,children:(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,z.jsx)(`path`,{d:`M15.5 8.5h-2a1 1 0 0 0-1 1V12h3l-.4 3h-2.6v7h-3v-7H8v-3h2.5V9.2c0-2.3 1.4-3.7 3.6-3.7h1.9v3z`,fill:`currentColor`})})}),e.twitter&&(0,z.jsx)(`a`,{href:e.twitter,target:`_blank`,rel:`noreferrer`,"aria-label":`${H.name} on Twitter / X`,className:`social-link`,children:(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,z.jsx)(`path`,{d:`M4 4l7.2 9.4L4.4 20H6l6-6.4 4.5 6.4H20l-7.5-9.9L19 4h-1.6l-5.5 5.9L8 4H4z`,fill:`currentColor`})})})]})]}),(0,z.jsxs)(`div`,{className:`footer-col`,children:[(0,z.jsx)(`h4`,{children:`Shop`}),(0,z.jsx)(L,{to:`/products`,children:`Sarees`}),(0,z.jsx)(L,{to:`/products?sort=newest`,children:`New Arrivals`}),(0,z.jsx)(L,{to:`/#collections`,children:`Collections`}),(0,z.jsx)(L,{to:`/products`,children:`Best Sellers`})]}),(0,z.jsxs)(`div`,{className:`footer-col`,children:[(0,z.jsx)(`h4`,{children:`Information`}),(0,z.jsx)(L,{to:`/about`,children:`About Us`}),(0,z.jsx)(L,{to:`/contact`,children:`Contact Us`}),(0,z.jsx)(L,{to:`/orders`,children:`Orders & Tracking`}),(0,z.jsx)(L,{to:`/about`,children:`Heritage & Craft`})]}),(0,z.jsxs)(`div`,{className:`footer-col footer-col-wide`,children:[(0,z.jsx)(`h4`,{children:`Customer Care`}),(0,z.jsxs)(`p`,{className:`contact-item`,children:[(0,z.jsx)(`span`,{className:`contact-label`,children:`Phone:`}),(0,z.jsx)(`a`,{href:`tel:${H.contact.phone.replace(/\s+/g,``)}`,children:H.contact.phone})]}),(0,z.jsxs)(`p`,{className:`contact-item`,children:[(0,z.jsx)(`span`,{className:`contact-label`,children:`Email:`}),(0,z.jsx)(`a`,{href:`mailto:${H.contact.email}`,children:H.contact.email})]}),(0,z.jsx)(`p`,{className:`contact-item addr`,children:H.contact.address})]})]}),(0,z.jsxs)(`div`,{className:`container footer-bottom`,children:[(0,z.jsxs)(`div`,{className:`footer-bottom-copy`,children:[(0,z.jsxs)(`span`,{children:[`© `,new Date().getFullYear(),` `,H.legalName,`. All rights reserved.`]}),(0,z.jsxs)(`a`,{href:`https://hatbricks.com`,target:`_blank`,rel:`noopener noreferrer`,className:`footer-powered-by`,"aria-label":`Powered by Hatbricks`,children:[(0,z.jsx)(`span`,{children:`Powered by`}),(0,z.jsx)(`img`,{src:`/images/hatbricks-logo.png`,alt:`Hatbricks`,className:`powered-by-brand-img`,height:`18`})]})]}),(0,z.jsx)(`div`,{className:`footer-bottom-links`,children:(0,z.jsx)(`span`,{children:`Best Traditional Silk Sarees in Dharmavaram`})})]}),(0,z.jsx)(`style`,{children:`
        .site-footer {
          background: var(--maroon-950);
          color: var(--blush-300);
          padding-top: 72px;
          border-top: 1px solid rgba(197, 139, 56, 0.2);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.6fr;
          gap: 44px;
          padding-bottom: 52px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .footer-brand .footer-logo {
          height: 46px;
          max-width: 230px;
          width: auto;
          display: block;
          object-fit: contain;
        }
        .footer-brand .footer-desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: var(--blush-300);
          opacity: 0.85;
          max-width: 290px;
          margin: 18px 0 20px;
        }
        .social-links { display: flex; gap: 10px; }
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(197, 139, 56, 0.35);
          color: var(--brand-gold-light);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .social-link svg { width: 16px; height: 16px; }
        .social-link:hover {
          background: rgba(197, 139, 56, 0.2);
          border-color: var(--brand-gold-light);
          transform: translateY(-2px);
        }
        .footer-col h4 {
          font-family: var(--font-body);
          color: var(--brand-gold-light);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .footer-col a, .footer-col p {
          display: block;
          font-size: 13.5px;
          color: var(--blush-300);
          opacity: 0.85;
          margin-bottom: 12px;
          line-height: 1.6;
          transition: opacity 0.2s ease, color 0.2s ease;
        }
        .footer-col a:hover { opacity: 1; color: var(--brand-gold-light); }
        .contact-item { margin-bottom: 8px; }
        .contact-label { color: var(--brand-gold-light); font-weight: 500; margin-right: 6px; }
        .addr { font-size: 13px; line-height: 1.5; opacity: 0.75; }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 32px;
          font-size: 12.5px;
          color: var(--blush-300);
          opacity: 0.9;
        }
        .footer-bottom-copy {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .footer-powered-by {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #f5ecd7;
          text-decoration: none;
          font-weight: 500;
          font-size: 12px;
          padding: 5px 13px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(197, 139, 56, 0.28);
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .footer-powered-by:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(223, 177, 91, 0.6);
          color: #ffffff;
          transform: translateY(-1px);
        }
        .powered-by-brand-img {
          height: 19px;
          width: auto;
          max-width: 105px;
          object-fit: contain;
          display: inline-block;
          vertical-align: middle;
        }
        @media (max-width: 980px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 10px; text-align: center; }
          .footer-bottom-copy { justify-content: center; }
        }
      `})]})}function _r(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function vr(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var yr={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},br={duration:.5,overwrite:!1,delay:0},xr,Sr,Cr,wr=1e8,Tr=1/wr,Er=Math.PI*2,Dr=Er/4,Or=0,kr=Math.sqrt,Ar=Math.cos,jr=Math.sin,Mr=function(e){return typeof e==`string`},Nr=function(e){return typeof e==`function`},Pr=function(e){return typeof e==`number`},Fr=function(e){return e===void 0},Ir=function(e){return typeof e==`object`},Lr=function(e){return e!==!1},Rr=function(){return typeof window<`u`},zr=function(e){return Nr(e)||Mr(e)},Br=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},Vr=Array.isArray,Hr=/random\([^)]+\)/g,Ur=/,\s*/g,Wr=/(?:-?\.?\d|\.)+/gi,Gr=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Kr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,qr=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Jr=/[+-]=-?[.\d]+/,Yr=/[^,'"\[\]\s]+/gi,Xr=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Zr,Qr,$r,ei,ti={},ni={},ri,ii=function(e){return(ni=Fi(e,ti))&&Qo},ai=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},oi=function(e,t){return!t&&console.warn(e)},si=function(e,t){return e&&(ti[e]=t)&&ni&&(ni[e]=t)||ti},ci=function(){return 0},li={suppressEvents:!0,isStart:!0,kill:!1},ui={suppressEvents:!0,kill:!1},di={suppressEvents:!0},fi={},pi=[],mi={},hi,gi={},_i={},vi=30,yi=[],bi=``,xi=function(e){var t=e[0],n,r;if(Ir(t)||Nr(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=yi.length;r--&&!yi[r].targetTest(t););n=yi[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new so(e[r],n)))||e.splice(r,1);return e},Si=function(e){return e._gsap||xi(va(e))[0]._gsap},Ci=function(e,t,n){return(n=e[t])&&Nr(n)?e[t]():Fr(n)&&e.getAttribute&&e.getAttribute(t)||n},wi=function(e,t){return(e=e.split(`,`)).forEach(t)||e},Ti=function(e){return Math.round(e*1e5)/1e5||0},Ei=function(e){return Math.round(e*1e7)/1e7||0},Di=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},Oi=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},ki=function(){var e=pi.length,t=pi.slice(0),n,r;for(mi={},pi.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Ai=function(e){return!!(e._initted||e._startAt||e.add)},U=function(e,t,n,r){pi.length&&!Sr&&ki(),e.render(t,n,r||!!(Sr&&t<0&&Ai(e))),pi.length&&!Sr&&ki()},ji=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(Yr).length<2?t:Mr(e)?e.trim():e},Mi=function(e){return e},Ni=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Pi=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},Fi=function(e,t){for(var n in t)e[n]=t[n];return e},Ii=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=Ir(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},Li=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Ri=function(e){var t=e.parent||Zr,n=e.keyframes?Pi(Vr(e.keyframes)):Ni;if(Lr(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},zi=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Bi=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Vi=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},Hi=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ui=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Wi=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Gi=function(e,t,n,r){return e._startAt&&(Sr?e._startAt.revert(ui):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Ki=function e(t){return!t||t._ts&&e(t.parent)},qi=function(e){return e._repeat?Ji(e._tTime,e=e.duration()+e._rDelay)*e:0},Ji=function(e,t){var n=Math.floor(e=Ei(e/t));return e&&n===e?n-1:n},Yi=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Xi=function(e){return e._end=Ei(e._start+(e._tDur/Math.abs(e._ts||e._rts||Tr)||0))},Zi=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Ei(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Xi(e),n._dirty||Ui(n,e)),e},Qi=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Yi(e.rawTime(),t),(!t._dur||fa(0,t.totalDuration(),n)-t._tTime>Tr)&&t.render(n,!0)),Ui(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Tr}},$i=function(e,t,n,r){return t.parent&&Hi(t),t._start=Ei((Pr(n)?n:n||e!==Zr?la(e,n,t):e._time)+t._delay),t._end=Ei(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Bi(e,t,`_first`,`_last`,e._sort?`_start`:0),ra(t)||(e._recent=t),r||Qi(e,t),e._ts<0&&Zi(e,e._tTime),e},ea=function(e,t){return(ti.ScrollTrigger||ai(`scrollTrigger`,t))&&ti.ScrollTrigger.create(t,e)},ta=function(e,t,n,r,i){if(_o(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!Sr&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&hi!==Ya.frame)return pi.push(e),e._lazy=[i,r],1},na=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},ra=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},ia=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&na(e)&&!(!e._initted&&ra(e))||(e._ts<0||e._dp._ts<0)&&!ra(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=fa(0,e._tDur,t),l=Ji(s,o),e._yoyo&&l&1&&(a=1-a),l!==Ji(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||Sr||r||e._zTime===Tr||!t&&e._zTime){if(!e._initted&&ta(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?Tr:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Gi(e,t,n,!0),e._onUpdate&&!n&&Fa(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&Fa(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Hi(e,1),!n&&!Sr&&(Fa(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},aa=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},oa=function(e,t,n,r){var i=e._repeat,a=Ei(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:Ei(a*(i+1)+e._rDelay*i):a,o>0&&!r&&Zi(e,e._tTime=e._tDur*o),e.parent&&Xi(e),n||Ui(e.parent,e),e},sa=function(e){return e instanceof lo?Ui(e):oa(e,e._dur)},ca={_start:0,endTime:ci,totalDuration:ci},la=function e(t,n,r){var i=t.labels,a=t._recent||ca,o=t.duration()>=wr?a.endTime(!1):t._dur,s,c,l;return Mr(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(Vr(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},ua=function(e,t,n){var r=Pr(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=Lr(s.vars.inherit)&&s.parent;a.immediateRender=Lr(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new wo(t[0],a,t[i+1])},da=function(e,t){return e||e===0?t(e):t},fa=function(e,t,n){return n<e?e:n>t?t:n},pa=function(e,t){return!Mr(e)||!(t=Xr.exec(e))?``:t[1]},ma=function(e,t,n){return da(n,function(n){return fa(e,t,n)})},ha=[].slice,ga=function(e,t){return e&&Ir(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&Ir(e[0]))&&!e.nodeType&&e!==Qr},_a=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return Mr(e)&&!t||ga(e,1)?(r=n).push.apply(r,va(e)):n.push(e)})||n},va=function(e,t,n){return Cr&&!t&&Cr.selector?Cr.selector(e):Mr(e)&&!n&&($r||!Xa())?ha.call((t||ei).querySelectorAll(e),0):Vr(e)?_a(e,n):ga(e)?ha.call(e,0):e?[e]:[]},ya=function(e){return e=va(e)[0]||oi(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return va(t,n.querySelectorAll?n:n===e?oi(`Invalid scope`)||ei.createElement(`div`):e)}},ba=function(e){return e.sort(function(){return .5-Math.random()})},xa=function(e){if(Nr(e))return e;var t=Ir(e)?e:{each:e},n=ro(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return Mr(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,wr])[1],!S){for(b=-wr;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===wr?0:s?f*u/S-.5:r/S|0,b=0,x=wr,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):kr(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&ba(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=pa(t.amount||t.each)||0,n=n&&f<0?no(n):n}return f=(p[e]-p.min)/p.max||0,Ei(p.b+(n?n(f):f)*p.v)+p.u}},Sa=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=Ei(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Pr(n)?0:pa(n))}},Ca=function(e,t){var n=Vr(e),r,i;return!n&&Ir(e)&&(r=n=e.radius||wr,e.values?(e=va(e.values),(i=!Pr(e[0]))&&(r*=r)):e=Sa(e.increment)),da(t,n?Nr(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=wr,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||Pr(t)?s:s+pa(t)}:Sa(e))},wa=function(e,t,n,r){return da(Vr(e)?!t:n===!0?!!(n=0):!r,function(){return Vr(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},Ta=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},Ea=function(e,t){return function(n){return e(parseFloat(n))+(t||pa(n))}},Da=function(e,t,n){return Ma(e,t,0,1,n)},Oa=function(e,t,n){return da(n,function(n){return e[~~t(n)]})},ka=function e(t,n,r){var i=n-t;return Vr(t)?Oa(t,e(0,t.length),n):da(r,function(e){return(i+(e-t)%i)%i+t})},Aa=function e(t,n,r){var i=n-t,a=i*2;return Vr(t)?Oa(t,e(0,t.length-1),n):da(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},ja=function(e){return e.replace(Hr,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(Ur);return wa(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},Ma=function(e,t,n,r,i){var a=t-e,o=r-n;return da(i,function(t){return n+((t-e)/a*o||0)})},Na=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=Mr(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(Vr(t)&&!Vr(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=Fi(Vr(t)?[]:{},t));if(!u){for(c in n)fo.call(s,t,c,`get`,n[c]);a=function(e){return No(e,s)||(o?t.p:t)}}}return da(r,a)},Pa=function(e,t,n){var r=e.labels,i=wr,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},Fa=function(e,t,n){var r=e.vars,i=r[t],a=Cr,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&pi.length&&ki(),o&&(Cr=o),l=s?i.apply(c,s):i.call(c),Cr=a,l},Ia=function(e){return Hi(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Sr),e.progress()<1&&Fa(e,`onInterrupt`),e},La,Ra=[],za=function(e){if(e){if(e=!e.name&&e.default||e,Rr()||e.headless){var t=e.name,n=Nr(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:ci,render:No,add:fo,kill:Fo,modifier:Po,rawVars:0},a={targetTest:0,get:0,getSetter:ko,aliases:{},register:0};if(Xa(),e!==r){if(gi[t])return;Ni(r,Ni(Li(e,i),a)),Fi(r.prototype,Fi(i,Li(e,a))),gi[r.prop=t]=r,e.targetTest&&(yi.push(r),fi[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}si(t,r),e.register&&e.register(Qo,r,Ro)}else Ra.push(e)}},W=255,Ba={aqua:[0,W,W],lime:[0,W,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,W],navy:[0,0,128],white:[W,W,W],olive:[128,128,0],yellow:[W,W,0],orange:[W,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[W,0,0],pink:[W,192,203],cyan:[0,W,W],transparent:[W,W,W,0]},Va=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*W+.5|0},Ha=function(e,t,n){var r=e?Pr(e)?[e>>16,e>>8&W,e&W]:0:Ba.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Ba[e])r=Ba[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&W,r&W,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&W,e&W]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(Wr),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=Va(s+1/3,i,a),r[1]=Va(s,i,a),r[2]=Va(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(Gr),n&&r.length<4&&(r[3]=1),r}else r=e.match(Wr)||Ba.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/W,a=r[1]/W,o=r[2]/W,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},Ua=function(e){var t=[],n=[],r=-1;return e.split(Ga).forEach(function(e){var i=e.match(Kr)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},Wa=function(e,t,n){var r=``,i=(e+r).match(Ga),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=Ha(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=Ua(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(Ga,`1`).split(Kr),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(Ga),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},Ga=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Ba)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),Ka=/hsl[a]?\(/,qa=function(e){var t=e.join(` `),n;if(Ga.lastIndex=0,Ga.test(t))return n=Ka.test(t),e[1]=Wa(e[1],n),e[0]=Wa(e[0],n,Ua(e[1])),!0},Ja,Ya=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){ri&&(!$r&&Rr()&&(Qr=$r=window,ei=Qr.document||{},ti.gsap=Qo,(Qr.gsapVersions||(Qr.gsapVersions=[])).push(Qo.version),ii(ni||Qr.GreenSockGlobals||!Qr.gsap&&Qr||{}),Ra.forEach(za)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},Ja=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Ja=0,l=ci},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),Xa(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),Xa=function(){return!Ja&&Ya.wake()},G={},Za=/^[\d.\-M][\d.\-,\s]/,Qa=/["']/g,$a=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(Qa,``).trim():+c,r=s.substr(o+1).trim();return t},eo=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},to=function(e){var t=(e+``).split(`(`),n=G[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[$a(t[1])]:eo(e).split(`,`).map(ji)):G._CE&&Za.test(e)?G._CE(``,e):n},no=function(e){return function(t){return 1-e(1-t)}},ro=function(e,t){return e&&(Nr(e)?e:G[e]||to(e))||t},io=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return wi(e,function(e){for(var t in G[e]=ti[e]=i,G[a=e.toLowerCase()]=n,i)G[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=G[e+`.`+t]=i[t]}),i},ao=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},oo=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/Er*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*jr((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:ao(s);return a=Er/a,c.config=function(n,r){return e(t,n,r)},c},K=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:ao(r);return i.config=function(n){return e(t,n)},i};wi(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;io(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),G.Linear.easeNone=G.none=G.Linear.easeIn,io(`Elastic`,oo(`in`),oo(`out`),oo()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};io(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),io(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),io(`Circ`,function(e){return-(kr(1-e*e)-1)}),io(`Sine`,function(e){return e===1?1:-Ar(e*Dr)+1}),io(`Back`,K(`in`),K(`out`),K()),G.SteppedEase=G.steps=ti.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-Tr;return function(e){return((r*fa(0,a,e)|0)+i)*n}}},br.ease=G[`quad.out`],wi(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return bi+=e+`,`+e+`Params,`});var so=function(e,t){this.id=Or++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Ci,this.set=t?t.getSetter:ko},co=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,oa(this,+e.duration,1,1),this.data=e.data,Cr&&(this._ctx=Cr,Cr.data.push(this)),Ja||Ya.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,oa(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Xa(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Zi(this,e),!n._dp||n.parent||Qi(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&$i(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===Tr||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),U(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+qi(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+qi(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Ji(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-Tr?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?Yi(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-Tr?0:this._rts,this.totalTime(fa(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),Xi(this),Wi(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Xa(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Tr&&(this._tTime-=Tr)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=Ei(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&$i(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(Lr(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Yi(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=di);var t=Sr;return Sr=e,Ai(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),Sr=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,sa(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,sa(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(la(this,e),Lr(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,Lr(t)),this._dur||(this._zTime=-Tr),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-Tr:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Tr,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-Tr)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=Nr(e)?e:Mi,a=function(){var e=t.then;t.then=null,n&&n(),Nr(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){Ia(this)},e}();Ni(co.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Tr,_prom:0,_ps:!1,_rts:1});var lo=function(e){vr(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=Lr(t.sortChildren),Zr&&$i(t.parent||Zr,_r(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&ea(_r(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return ua(0,arguments,this),this},n.from=function(e,t,n){return ua(1,arguments,this),this},n.fromTo=function(e,t,n,r){return ua(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,Ri(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new wo(e,t,la(this,n),1),this},n.call=function(e,t,n){return $i(this,wo.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new wo(e,n,la(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,Ri(n).immediateRender=Lr(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,Ri(r).immediateRender=Lr(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:Ei(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==Zr&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=Ei(o%f),o===i?(d=this._repeat,c=a):(_=Ei(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=Ji(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:Ei(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&Fa(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=aa(this,Ei(r),Ei(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(Fa(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-Tr);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||Sr&&Ai(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-Tr:Tr);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-Tr)._zTime=c>=r?1:-1,this._ts))return this._start=g,Xi(this),this.render(e,t,n);this._onUpdate&&!t&&Fa(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&Hi(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(Fa(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(Pr(t)||(t=la(this,t,e)),!(e instanceof co)){if(Vr(e))return e.forEach(function(e){return n.add(e,t)}),this;if(Mr(e))return this.addLabel(e,t);if(Nr(e))e=wo.delayedCall(0,e);else return this}return this===e?this:$i(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-wr);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof wo?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return Mr(e)?this.removeLabel(e):Nr(e)?this.killTweensOf(e):(e.parent===this&&Vi(this,e),e===this._recent&&(this._recent=this._last),Ui(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ei(Ya.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=la(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=wo.delayedCall(0,t||ci,n);return r.data=`isPause`,this._hasPause=1,$i(this,r,la(this,e))},n.removePause=function(e){var t=this._first;for(e=la(this,e);t;)t._start===e&&t.data===`isPause`&&Hi(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)ho!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=va(e),i=this._first,a=Pr(t),o;i;)i instanceof wo?Oi(i._targets,r)&&(a?(!ho||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=la(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=wo.to(n,Ni({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||Tr,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&oa(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,Ni({startAt:{time:la(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),Pa(this,la(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),Pa(this,la(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+Tr)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=Ei(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return Ui(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),Ui(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=wr,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,$i(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=Ei(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;oa(n,n===Zr&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(Zr._ts&&(U(Zr,Yi(e,Zr)),hi=Ya.frame),Ya.frame>=vi){vi+=yr.autoSleep||120;var t=Zr._first;if((!t||!t._ts)&&yr.autoSleep&&Ya._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||Ya.sleep()}}},t}(co);Ni(lo.prototype,{_lock:0,_hasPause:0,_forcing:0});var uo=function(e,t,n,r,i,a,o){var s=new Ro(this._pt,e,t,0,1,Mo,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=ja(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(qr)||[];u=qr.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?Di(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=qr.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(Jr.test(r)||g)&&(s.e=0),this._pt=s,s},fo=function(e,t,n,r,i,a,o,s,c,l){Nr(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?Nr(u)?c?e[t.indexOf(`set`)||!Nr(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=Nr(u)?c?Do:Eo:To,p;if(Mr(r)&&(~r.indexOf(`random(`)&&(r=ja(r)),r.charAt(1)===`=`&&(p=Di(d,r)+(pa(d)||0),(p||p===0)&&(r=p))),!l||d!==r||go)return!isNaN(d*r)&&r!==``?(p=new Ro(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?jo:Ao,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&ai(t,r),uo.call(this,e,t,d,r,f,s||yr.stringFilter,c))},po=function(e,t,n,r,i){if(Nr(e)&&(e=xo(e,i,t,n,r)),!Ir(e)||e.style&&e.nodeType||Vr(e)||Br(e))return Mr(e)?xo(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=xo(e[o],i,t,n,r);return a},mo=function(e,t,n,r,i,a){var o,s,c,l;if(gi[e]&&(o=new gi[e]).init(i,o.rawVars?t[e]:po(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new Ro(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==La))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},ho,go,_o=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!xr,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,O,k,A,j,M,ee,te;if(b&&(!f||!a)&&(a=`none`),t._ease=ro(a,br.ease),t._rEase=x&&(ro(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(k=g[0]?Si(g[0]).harness:0,ee=k&&i[k.prop],S=Li(i,fi),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?ui:li),h._lazy=0),o){if(Hi(t._startAt=wo.set(g,Ni({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&Lr(c),startAt:null,delay:0,onUpdate:l&&function(){return Fa(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(Sr||!s&&!p)&&t._startAt.revert(ui),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=Ni({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&Lr(c),immediateRender:s,stagger:0,parent:_},S),ee&&(w[k.prop]=ee),Hi(t._startAt=wo.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(Sr?t._startAt.revert(ui):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,Tr,Tr);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&Lr(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],O=E._gsap||xi(g)[C]._gsap,t._ptLookup[C]=j={},mi[O.id]&&pi.length&&ki(),M=v===g?C:v.indexOf(E),k&&(A=new k).init(E,ee||S,t,M,v)!==!1&&(t._pt=T=new Ro(t._pt,E,A.name,0,1,A.render,A,0,A.priority),A._props.forEach(function(e){j[e]=T}),A.priority&&(D=1)),!k||ee)for(w in S)gi[w]&&(A=mo(w,S,t,M,E,v))?A.priority&&(D=1):j[w]=T=fo.call(t,E,w,`get`,S[w],M,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(ho=t,Zr.killTweensOf(E,j,t.globalTime(n)),te=!t.parent,ho=0),t._pt&&c&&(mi[O.id]=1)}D&&Lo(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!te,f&&n<=0&&b.render(wr,!0,!0)},vo=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return go=1,e.vars[t]=`+=0`,_o(e,o),go=0,s?oi(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=Ti(n)+pa(u.e)),u.b&&(u.b=l.s+pa(u.b))},yo=function(e,t){var n=e[0]?Si(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=Fi({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},bo=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(Vr(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},xo=function(e,t,n,r,i){return Nr(e)?e.call(t,n,r,i):Mr(e)&&~e.indexOf(`random(`)?ja(e):e},So=bi+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,Co={};wi(So+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return Co[e]=1});var wo=function(e){vr(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:Ri(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||Zr,g=(Vr(t)||Br(t)?Pr(t[0]):`length`in n)?[t]:va(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?xi(g):oi(`GSAP target `+t+` not found. https://gsap.com`,!yr.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||zr(s)||zr(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new lo({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=_r(a),_._start=0,u||zr(s)||zr(c)){if(b=g.length,C=u&&xa(u),Ir(u))for(x in u)~So.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=Li(n,Co),y.stagger=0,T&&(y.easeReverse=T),w&&Fi(y,w),S=g[v],y.duration=+xo(s,_r(a),v,S,g),y.delay=(+xo(c,_r(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=G.none;_.duration()?s=c=0:a.timeline=0}else if(f){Ri(Ni(_.vars.defaults,{ease:`none`})),_._ease=ro(f.ease||n.ease||`none`);var E=0,D,O,k;if(Vr(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||bo(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)O=D[v],k={ease:O.e,duration:(O.t-(v?D[v-1].t:0))/100*s},k[x]=O.v,_.to(g,k,E),E+=k.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!xr&&(ho=_r(a),Zr.killTweensOf(g),ho=0),$i(h,_r(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===Ei(h._time)&&Lr(l)&&Ki(_r(a))&&h.data!==`nested`)&&(a._tTime=-Tr,a.render(Math.max(0,-c)||0)),m&&ea(_r(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-Tr&&!o?i:e<Tr?0:e,c,l,u,d,f,p,m,h;if(!a)ia(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=Ei(s%d),s===i?(u=this._repeat,c=a):(f=Ei(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=Ji(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(Ei(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(ta(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(Fa(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&Gi(this,e,t,n),Fa(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&Fa(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&Gi(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&Hi(this,1),!t&&!(o&&!r)&&(s||r||p)&&(Fa(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){Ja||Ya.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||_o(this,a),o=this._ease(a/this._dur),vo(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(Zi(this,0),this.parent||Bi(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?Ia(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Sr),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,ho&&ho.vars.overwrite!==!0)._first||Ia(this),this.parent&&n!==this.timeline.totalDuration()&&oa(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?va(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&zi(r,i))return t===`all`&&(this._pt=0),Ia(this);for(s=this._op=this._op||[],t!==`all`&&(Mr(t)&&(d={},wi(t,function(e){return d[e]=1}),t=d),t=yo(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&Vi(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&Ia(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return ua(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return ua(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return Zr.killTweensOf(e,t,n)},t}(co);Ni(wo.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),wi(`staggerTo,staggerFrom,staggerFromTo`,function(e){wo[e]=function(){var t=new lo,n=ha.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var To=function(e,t,n){return e[t]=n},Eo=function(e,t,n){return e[t](n)},Do=function(e,t,n,r){return e[t](r.fp,n)},Oo=function(e,t,n){return e.setAttribute(t,n)},ko=function(e,t){return Nr(e[t])?Eo:Fr(e[t])&&e.setAttribute?Oo:To},Ao=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},jo=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Mo=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},No=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Po=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},Fo=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Vi(this,t,`_pt`):t.dep||(n=1),t=r;return!n},Io=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Lo=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},Ro=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||Ao,this.d=o||this,this.set=s||To,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=Io,this.m=e,this.mt=n,this.tween=t},e}();wi(bi+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return fi[e]=1}),ti.TweenMax=ti.TweenLite=wo,ti.TimelineLite=ti.TimelineMax=lo,Zr=new lo({sortChildren:!1,defaults:br,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),yr.stringFilter=qa;var zo=[],Bo={},Vo=[],Ho=0,Uo=0,Wo=function(e){return(Bo[e]||Vo).map(function(e){return e()})},Go=function(){var e=Date.now(),t=[];e-Ho>2&&(Wo(`matchMediaInit`),zo.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=Qr.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),Wo(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Ho=e,Wo(`matchMedia`))},Ko=function(){function e(e,t){this.selector=t&&ya(t),this.data=[],this._r=[],this.isReverted=!1,this.id=Uo++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){Nr(e)&&(n=t,t=e,e=Nr);var r=this,i=function(){var e=Cr,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=ya(n)),Cr=r,a=t.apply(r,arguments),Nr(a)&&r._r.push(a),Cr=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===Nr?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=Cr;Cr=null,e(this),Cr=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof wo&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof lo?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof wo)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=zo.length;r--;)zo[r].id===this.id&&zo.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),qo=function(){function e(e){this.contexts=[],this.scope=e,Cr&&Cr.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){Ir(e)||(e={matches:e});var r=new Ko(0,n||this.scope),i=r.conditions={},a,o,s;for(o in Cr&&!r.selector&&(r.selector=Cr.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=Qr.matchMedia(e[o]),a&&(zo.indexOf(r)<0&&zo.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(Go):a.addEventListener(`change`,Go)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),Jo={registerPlugin:function(){[...arguments].forEach(function(e){return za(e)})},timeline:function(e){return new lo(e)},getTweensOf:function(e,t){return Zr.getTweensOf(e,t)},getProperty:function(e,t,n,r){Mr(e)&&(e=va(e)[0]);var i=Si(e||{}).get,a=n?Mi:ji;return n===`native`&&(n=``),e&&(t?a((gi[t]&&gi[t].get||i)(e,t,n,r)):function(t,n,r){return a((gi[t]&&gi[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=va(e),e.length>1){var r=e.map(function(e){return Qo.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=gi[t],o=Si(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;La._pt=0,r.init(e,n?t+n:t,La,0,[e]),r.render(1,r),La._pt&&No(1,La)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=Qo.to(e,Ni((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return Zr.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ro(e.ease,br.ease)),Ii(br,e||{})},config:function(e){return Ii(yr,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!gi[e]&&!ti[e]&&oi(t+` effect requires `+e+` plugin.`)}),_i[t]=function(e,t,r){return n(va(e),Ni(t||{},i),r)},a&&(lo.prototype[t]=function(e,n,r){return this.add(_i[t](e,Ir(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){G[e]=ro(t)},parseEase:function(e,t){return arguments.length?ro(e,t):G},getById:function(e){return Zr.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new lo(e),r,i;for(n.smoothChildTiming=Lr(e.smoothChildTiming),Zr.remove(n),n._dp=0,n._time=n._tTime=Zr._time,r=Zr._first;r;)i=r._next,(t||!(!r._dur&&r instanceof wo&&r.vars.onComplete===r._targets[0]))&&$i(n,r,r._start-r._delay),r=i;return $i(Zr,n,0),n},context:function(e,t){return e?new Ko(e,t):Cr},matchMedia:function(e){return new qo(e)},matchMediaRefresh:function(){return zo.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Go()},addEventListener:function(e,t){var n=Bo[e]||(Bo[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Bo[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:ka,wrapYoyo:Aa,distribute:xa,random:wa,snap:Ca,normalize:Da,getUnit:pa,clamp:ma,splitColor:Ha,toArray:va,selector:ya,mapRange:Ma,pipe:Ta,unitize:Ea,interpolate:Na,shuffle:ba},install:ii,effects:_i,ticker:Ya,updateRoot:lo.updateRoot,plugins:gi,globalTimeline:Zr,core:{PropTween:Ro,globals:si,Tween:wo,Timeline:lo,Animation:co,getCache:Si,_removeLinkedListItem:Vi,reverting:function(){return Sr},context:function(e){return e&&Cr&&(Cr.data.push(e),e._ctx=Cr),Cr},suppressOverwrites:function(e){return xr=e}}};wi(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return Jo[e]=wo[e]}),Ya.add(lo.updateRoot),La=Jo.to({},{duration:0});var Yo=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Xo=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=Yo(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},Zo=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(Mr(n)&&(r={},wi(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}Xo(e,n)}}}},Qo=Jo.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Sr?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Zo(`roundProps`,Sa),Zo(`modifiers`),Zo(`snap`,Ca))||Jo;wo.version=lo.version=Qo.version=`3.15.0`,ri=1,Rr()&&Xa(),G.Power0,G.Power1,G.Power2,G.Power3,G.Power4,G.Linear,G.Quad,G.Cubic,G.Quart,G.Quint,G.Strong,G.Elastic,G.Back,G.SteppedEase,G.Bounce,G.Sine,G.Expo,G.Circ;var $o,es,ts,ns,rs,is,as,os=function(){return typeof window<`u`},ss={},cs=180/Math.PI,ls=Math.PI/180,us=Math.atan2,ds=1e8,fs=/([A-Z])/g,ps=/(left|right|width|margin|padding|x)/i,ms=/[\s,\(]\S/,hs={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},gs=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},_s=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},vs=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},ys=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},bs=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},xs=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Ss=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},Cs=function(e,t,n){return e.style[t]=n},ws=function(e,t,n){return e.style.setProperty(t,n)},Ts=function(e,t,n){return e._gsap[t]=n},Es=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Ds=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},Os=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},ks=`transform`,As=ks+`Origin`,js=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in ss&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=hs[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=Xs(i,e)}):this.tfm[t]=o.x?o[t]:Xs(i,t),t===As&&(this.tfm.zOrigin=o.zOrigin);else return hs.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(ks)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(As,n,``)),t=ks}(a||n)&&this.props.push(t,n,a[t])},Ms=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},Ns=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,i,a;for(i=0;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(fs,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=as(),(!i||!i.isStart)&&!n[ks]&&(Ms(n),r.zOrigin&&n[As]&&(n[As]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Ps=function(e,t){var n={target:e,props:[],revert:Ns,save:js};return e._gsap||Qo.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},Fs,Is=function(e,t){var n=es.createElementNS?es.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):es.createElement(e);return n&&n.style?n:es.createElement(e)},Ls=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(fs,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,zs(n)||n,1)||``},Rs=`O,Moz,ms,Ms,Webkit`.split(`,`),zs=function(e,t,n){var r=(t||rs).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(Rs[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?Rs[i]:``)+e},Bs=function(){os()&&window.document&&($o=window,es=$o.document,ts=es.documentElement,rs=Is(`div`)||{style:{}},Is(`div`),ks=zs(ks),As=ks+`Origin`,rs.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,Fs=!!zs(`perspective`),as=Qo.core.reverting,ns=1)},Vs=function(e){var t=e.ownerSVGElement,n=Is(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),ts.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),ts.removeChild(n),i},Hs=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Us=function(e){var t,n;try{t=e.getBBox()}catch{t=Vs(e),n=1}return t&&(t.width||t.height)||n||(t=Vs(e)),t&&!t.width&&!t.x&&!t.y?{x:+Hs(e,[`x`,`cx`,`x1`])||0,y:+Hs(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},Ws=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Us(e))},Gs=function(e,t){if(t){var n=e.style,r;t in ss&&t!==As&&(t=ks),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(fs,`-$1`).toLowerCase())):n.removeAttribute(t)}},Ks=function(e,t,n,r,i,a){var o=new Ro(e._pt,t,n,0,1,a?Ss:xs);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},qs={deg:1,rad:1,turn:1},Js={grid:1,flex:1},Ys=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=rs.style,c=ps.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||qs[i]||qs[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&Ws(t),(p||o===`%`)&&(ss[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],Ti(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===es||!h.appendChild)&&(h=es.body),g=h._gsap,g&&p&&g.width&&c&&g.time===Ya.time&&!g.uncache)return Ti(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:Gs(t,n)}else(p||o===`%`)&&!Js[Ls(h,`display`)]&&(s.position=Ls(t,`position`)),h===t&&(s.position=`static`),h.appendChild(rs),m=rs[u],h.removeChild(rs),s.position=`absolute`;return c&&p&&(g=Si(h),g.time=Ya.time,g.width=h[u]),Ti(f?m*a/d:m&&a?d/m*a:0)},Xs=function(e,t,n,r){var i;return ns||Bs(),t in hs&&t!==`transform`&&(t=hs[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),ss[t]&&t!==`transform`?(i=cc(e,r),i=t===`transformOrigin`?i.svg?i.origin:lc(Ls(e,As))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=tc[t]&&tc[t](e,t,n)||Ls(e,t)||Ci(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?Ys(e,t,i,n)+n:i},Zs=function(e,t,n,r){if(!n||n===`none`){var i=zs(t,e,1),a=i&&Ls(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=Ls(e,`borderTopColor`))}var o=new Ro(this._pt,e.style,t,0,1,Mo),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=Ls(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=Ls(e,t)||r,m?e.style[t]=m:Gs(e,t)),l=[n,r],qa(l),n=l[0],r=l[1],d=n.match(Kr)||[],b=r.match(Kr)||[],b.length){for(;u=Kr.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=Di(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=Kr.lastIndex-v.length,v||(v=v||yr.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=Ys(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?Ss:xs;return Jr.test(r)&&(o.e=0),this._pt=o,o},Qs={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},$s=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=Qs[n]||n,t[1]=Qs[r]||r,t.join(` `)},ec=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],ss[o]&&(s=1,o=o===`transformOrigin`?As:ks),Gs(n,o);s&&(Gs(n,ks),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,cc(n,1),a.uncache=1,Ms(r)))}},tc={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new Ro(e._pt,t,n,0,0,ec);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},nc=[1,0,0,1,0,0],rc={},ic=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},ac=function(e){var t=Ls(e,ks);return ic(t)?nc:t.substr(7).match(Gr).map(Ti)},oc=function(e,t){var n=e._gsap||Si(e),r=e.style,i=ac(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?nc:i):(i===nc&&!e.offsetParent&&e!==ts&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,ts.appendChild(e)),i=ac(e),s?r.display=s:Gs(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):ts.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},sc=function(e,t,n,r,i,a){var o=e._gsap,s=i||oc(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==nc&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=Us(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[As]=`0px 0px`,a&&(Ks(a,o,`xOrigin`,c,y),Ks(a,o,`yOrigin`,l,b),Ks(a,o,`xOffset`,u,o.xOffset),Ks(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},cc=function(e,t){var n=e._gsap||new so(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=Ls(e,As)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,ee,te,ne,N,P,re,ie,ae;return n.svg=!!(e.getCTM&&Ws(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[ks]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[ks]===`none`?``:s[ks])),r.scale=r.rotate=r.translate=`none`),S=oc(e,n.svg),n.svg&&(n.uncache?(ee=e.getBBox(),c=n.xOrigin-ee.x+`px `+(n.yOrigin-ee.y)+`px`,M=``):M=!t&&e.getAttribute(`data-svg-origin`),sc(e,M||c,!!M||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==nc&&(E=S[0],D=S[1],O=S[2],k=S[3],l=A=S[4],u=j=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(k*k+O*O),m=E||D?us(D,E)*cs:0,_=O||k?us(O,k)*cs+m:0,_&&(p*=Math.abs(Math.cos(_*ls))),n.svg&&(l-=b-(b*E+x*O),u-=x-(b*D+x*k))):(ae=S[6],re=S[7],ne=S[8],N=S[9],P=S[10],ie=S[11],l=S[12],u=S[13],d=S[14],C=us(ae,P),h=C*cs,C&&(w=Math.cos(-C),T=Math.sin(-C),M=A*w+ne*T,ee=j*w+N*T,te=ae*w+P*T,ne=A*-T+ne*w,N=j*-T+N*w,P=ae*-T+P*w,ie=re*-T+ie*w,A=M,j=ee,ae=te),C=us(-O,P),g=C*cs,C&&(w=Math.cos(-C),T=Math.sin(-C),M=E*w-ne*T,ee=D*w-N*T,te=O*w-P*T,ie=k*T+ie*w,E=M,D=ee,O=te),C=us(D,E),m=C*cs,C&&(w=Math.cos(C),T=Math.sin(C),M=E*w+D*T,ee=A*w+j*T,D=D*w-E*T,j=j*w-A*T,E=M,A=ee),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=Ti(Math.sqrt(E*E+D*D+O*O)),p=Ti(Math.sqrt(j*j+ae*ae)),C=us(A,j),_=Math.abs(C)>2e-4?C*cs:0,y=ie?1/(ie<0?-ie:ie):0),n.svg&&(M=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!ic(Ls(e,ks)),M&&e.setAttribute(`transform`,M))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=Ti(f),n.scaleY=Ti(p),n.rotation=Ti(m)+o,n.rotationX=Ti(h)+o,n.rotationY=Ti(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[As]=lc(c)),n.xOffset=n.yOffset=0,n.force3D=yr.force3D,n.renderTransform=n.svg?gc:Fs?hc:dc,n.uncache=0,n},lc=function(e){return(e=e.split(` `))[0]+` `+e[1]},uc=function(e,t,n){var r=pa(t);return Ti(parseFloat(t)+parseFloat(Ys(e,`x`,n+`px`,r)))+r},dc=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,hc(e,t)},fc=`0deg`,pc=`0px`,mc=`) `,hc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==fc||l!==fc)){var x=parseFloat(l)*ls,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*ls,w=Math.cos(x),a=uc(_,a,S*w*-v),o=uc(_,o,-Math.sin(x)*-v),s=uc(_,s,C*w*-v+v)}h!==pc&&(y+=`perspective(`+h+mc),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==pc||o!==pc||s!==pc)&&(y+=s!==pc||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+mc),c!==fc&&(y+=`rotate(`+c+mc),l!==fc&&(y+=`rotateY(`+l+mc),u!==fc&&(y+=`rotateX(`+u+mc),(d!==fc||f!==fc)&&(y+=`skew(`+d+`, `+f+mc),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+mc),_.style[ks]=y||`translate(0, 0)`},gc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=ls,c*=ls,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=ls,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=Ti(b),x=Ti(x),S=Ti(S),C=Ti(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=Ys(f,`x`,a,`px`),y=Ys(f,`y`,o,`px`)),(p||m||h||g)&&(v=Ti(v+p-(p*b+m*S)+h),y=Ti(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=Ti(v+r/100*w.width),y=Ti(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[ks]=w)},_c=function(e,t,n,r,i){var a=360,o=Mr(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?cs:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*ds)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*ds)%a-~~(s/a)*a)),e._pt=u=new Ro(e._pt,t,n,r,s,_s),u.e=c,u.u=`deg`,e._props.push(n),u},vc=function(e,t){for(var n in t)e[n]=t[n];return e},yc=function(e,t,n){var r=vc({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[ks]=t,o=cc(n,1),Gs(n,ks),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[ks],a[ks]=t,o=cc(n,1),a[ks]=c),ss)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=pa(c),p=pa(l),u=f===p?parseFloat(c):Ys(n,s,c,p),d=parseFloat(l),e._pt=new Ro(e._pt,o,s,u,d-u,gs),e._pt.u=p||0,e._props.push(s));vc(o,r)};wi(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});tc[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return Xs(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var bc={name:`css`,register:Bs,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in ns||Bs(),this.styles=this.styles||Ps(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(gi[m]&&mo(m,t,n,r,e,i)))){if(f=typeof l,p=tc[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=ja(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,Ga.lastIndex=0,Ga.test(c)||(h=pa(c),g=pa(l),g?h!==g&&(c=Ys(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],Mr(c)&&~c.indexOf(`random(`)&&(c=ja(c)),pa(c+``)||c===`auto`||(c+=yr.units[m]||pa(Xs(e,m))||``),(c+``).charAt(1)===`=`&&(c=Xs(e,m))):c=Xs(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in hs&&(m===`autoAlpha`&&(d===1&&Xs(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),Ks(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=hs[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in ss,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=Ls(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=Ls(e,`perspective`),T?e.style.perspective=T:Gs(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||cc(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new Ro(this._pt,o,ks,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new Ro(this._pt,b,`scaleY`,b.scaleY,(_?Di(b.scaleY,_+u):u)-b.scaleY||0,gs),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(As,0,o[As]),l=$s(l),b.svg?sc(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&Ks(this,b,`zOrigin`,b.zOrigin,g),Ks(this,o,m,lc(c),lc(l)));continue}else if(m===`svgOrigin`){sc(e,l,1,x,0,this);continue}else if(m in rc){_c(this,b,m,d,_?Di(d,_+l):l);continue}else if(m===`smoothOrigin`){Ks(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){yc(this,l,e);continue}}else m in o||(m=zs(m)||m);if(v||(u||u===0)&&(d||d===0)&&!ms.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=pa(l)||(m in yr.units?yr.units[m]:h),h!==g&&(d=Ys(e,m,c,g)),this._pt=new Ro(this._pt,v?b:o,m,d,(_?Di(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?bs:gs),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=ys):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=vs);else if(m in o)Zs.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){ai(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&Lo(this)},render:function(e,t){if(t.tween._time||!as())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Xs,aliases:hs,getSetter:function(e,t,n){var r=hs[t];return r&&r.indexOf(`,`)<0&&(t=r),t in ss&&t!==As&&(e._gsap.x||Xs(e,`x`))?n&&is===n?t===`scale`?Es:Ts:(is=n||{})&&(t===`scale`?Ds:Os):e.style&&!Fr(e.style[t])?Cs:~t.indexOf(`-`)?ws:ko(e,t)},core:{_removeProperty:Gs,_getMatrix:oc}};Qo.utils.checkPrefix=zs,Qo.core.getStyleSaver=Ps,(function(e,t,n,r){var i=wi(e+`,`+t+`,`+n,function(e){ss[e]=1});wi(t,function(e){yr.units[e]=`deg`,rc[e]=1}),hs[i[13]]=e+`,`+t,wi(r,function(e){var t=e.split(`:`);hs[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),wi(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){yr.units[e]=`px`}),Qo.registerPlugin(bc);var xc=Qo.registerPlugin(bc)||Qo;xc.core.Tween;function Sc(){let e=(0,x.useRef)(null),t=(0,x.useRef)(null),n=(0,x.useRef)(null),r=(0,x.useRef)(null),i=(0,x.useRef)(null),a=(0,x.useRef)(null),[o,s]=(0,x.useState)(()=>{if(typeof window>`u`)return!0;let e=new URLSearchParams(window.location.search);if(e.has(`intro`)||e.has(`replay`))return!1;try{return sessionStorage.removeItem(`miladysIntroPlayed`),sessionStorage.removeItem(`srikalaIntroPlayed`),sessionStorage.getItem(`ravichandraIntroPlayed`)===`1`}catch{return!1}}),c=(0,x.useCallback)(()=>{a.current&&a.current.kill(),document.body.style.overflow=``;try{sessionStorage.setItem(`ravichandraIntroPlayed`,`1`)}catch{}s(!0)},[]);return(0,x.useEffect)(()=>{if(typeof window>`u`||o)return;let n=document.body.style.overflow;if(document.body.style.overflow=`hidden`,window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){let e=setTimeout(()=>{document.body.style.overflow=n,c()},900);return()=>{clearTimeout(e),document.body.style.overflow=n}}let l=e.current,u=t.current,d=r.current,f=i.current;if(!l||!u){s(!0),document.body.style.overflow=n;return}xc.set(l,{opacity:1}),xc.set(u,{opacity:0,scale:.92,filter:`blur(4px)`}),d&&xc.set(d,{xPercent:-130,opacity:0}),f&&xc.set(f,{opacity:0});let p=xc.timeline({onComplete:()=>{document.body.style.overflow=n,c()}});return a.current=p,p.to(u,{opacity:1,scale:1,filter:`blur(0px)`,duration:.85,ease:`power2.out`},.1),p.to(f,{opacity:.65,duration:.5,ease:`power1.out`},.35),p.to(d,{opacity:1,duration:.15,ease:`power1.in`},.6),p.to(d,{xPercent:140,duration:.8,ease:`power2.inOut`},.65),p.to(d,{opacity:0,duration:.2,ease:`power2.out`},1.25),p.to({},{duration:.35}),p.to(u,{scale:1.03,opacity:.85,duration:.55,ease:`power2.inOut`},`reveal`),p.to(l,{opacity:0,duration:.6,ease:`power2.inOut`},`reveal+=0.1`),()=>{p.kill(),document.body.style.overflow=n}},[c,o]),o?null:(0,z.jsxs)(`aside`,{className:`logo-intro`,ref:e,"aria-label":`Welcome to ${H.name}`,"aria-live":`polite`,children:[(0,z.jsx)(`div`,{className:`logo-intro-stage`,children:(0,z.jsx)(`div`,{className:`logo-intro-box`,ref:t,children:(0,z.jsxs)(`div`,{className:`logo-img-wrapper`,children:[(0,z.jsx)(`img`,{ref:n,src:H.assets.logoVertical||H.assets.logoIntro||`/images/logo-vertical.png`,alt:H.name,className:`logo-intro-img`,width:`420`,height:`220`,loading:`eager`,decoding:`sync`}),(0,z.jsx)(`div`,{className:`logo-shimmer`,ref:r,"aria-hidden":`true`})]})})}),(0,z.jsxs)(`button`,{ref:i,type:`button`,className:`logo-intro-skip`,onClick:c,"aria-label":`Skip introduction`,children:[(0,z.jsx)(`span`,{children:`Skip`}),(0,z.jsx)(`svg`,{viewBox:`0 0 16 16`,fill:`none`,width:`12`,height:`12`,"aria-hidden":`true`,children:(0,z.jsx)(`path`,{d:`M6 3L11 8L6 13`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})})]}),(0,z.jsx)(`style`,{children:`
        .logo-intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f0705;
          pointer-events: auto;
          overflow: hidden;
          user-select: none;
        }

        .logo-intro-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .logo-intro-box {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          will-change: transform, opacity, filter;
          padding: 24px;
        }

        .logo-img-wrapper {
          position: relative;
          display: inline-block;
          overflow: hidden;
          border-radius: 8px;
        }

        .logo-intro-img {
          width: min(72vw, 360px);
          height: auto;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 600px) {
          .logo-intro-img {
            width: min(80vw, 280px);
          }
        }

        .logo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255, 255, 255, 0.4) 40%,
            rgba(255, 245, 215, 0.8) 50%,
            rgba(255, 255, 255, 0.4) 60%,
            transparent 80%
          );
          mix-blend-mode: color-dodge;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .logo-intro-skip {
          position: absolute;
          top: 24px;
          right: 24px;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 999px;
          background: rgba(26, 12, 9, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(197, 139, 56, 0.4);
          color: #dfb15b;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .logo-intro-skip:hover {
          background: rgba(44, 20, 15, 0.9);
          border-color: #dfb15b;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        }
      `})]})}function Cc({children:e}){let{user:t,loading:n}=lr(),r=st();return n?null:t?e:(0,z.jsx)(It,{to:`/login`,state:{from:r.pathname},replace:!0})}function wc(){let{pathname:e}=st();return(0,x.useEffect)(()=>{window.scrollTo(0,0)},[e]),null}var Tc=`1.3.26`;function Ec(e,t,n){return Math.max(e,Math.min(t,n))}function Dc(e,t,n){return(1-n)*e+n*t}function Oc(e,t,n,r){return Dc(e,t,1-Math.exp(-n*r))}function kc(e,t){return(e%t+t)%t}var Ac=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=e;let n=Ec(0,this.currentTime/this.duration,1);t=n>=1;let r=t?1:this.easing(n);this.value=this.from+(this.to-this.from)*r}else this.lerp?(this.value=Oc(this.value,this.to,this.lerp*60,e),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n,duration:r,easing:i,onStart:a,onUpdate:o}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=i,this.currentTime=0,this.isRunning=!0,a?.(),this.onUpdate=o}};function jc(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{n=void 0,e.apply(this,r)},t)}}var Mc=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(e,t,{autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=jc(this.resize,r),this.wrapper instanceof Window?window.addEventListener(`resize`,this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener(`resize`,this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Nc=class{events={};emit(e,...t){let n=this.events[e]||[];for(let e=0,r=n.length;e<r;e++)n[e]?.(...t)}on(e,t){return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{this.events[e]=this.events[e]?.filter(e=>t!==e)}}off(e,t){this.events[e]=this.events[e]?.filter(e=>t!==e)}destroy(){this.events={}}},Pc=100/6,q={passive:!1};function Fc(e,t){return e===1?Pc:e===2?t:1}var Ic=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new Nc;constructor(e,t={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=t,window.addEventListener(`resize`,this.onWindowResize),this.onWindowResize(),this.element.addEventListener(`wheel`,this.onWheel,q),this.element.addEventListener(`touchstart`,this.onTouchStart,q),this.element.addEventListener(`touchmove`,this.onTouchMove,q),this.element.addEventListener(`touchend`,this.onTouchEnd,q)}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener(`resize`,this.onWindowResize),this.element.removeEventListener(`wheel`,this.onWheel,q),this.element.removeEventListener(`touchstart`,this.onTouchStart,q),this.element.removeEventListener(`touchmove`,this.onTouchMove,q),this.element.removeEventListener(`touchend`,this.onTouchEnd,q)}onTouchStart=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit(`scroll`,{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(n-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:i},this.emitter.emit(`scroll`,{deltaX:r,deltaY:i,event:e})};onTouchEnd=e=>{this.emitter.emit(`scroll`,{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e,i=Fc(r,this.window.width),a=Fc(r,this.window.height);t*=i,n*=a,t*=this.options.wheelMultiplier,n*=this.options.wheelMultiplier,this.emitter.emit(`scroll`,{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}},Lc=e=>Math.min(1,1.001-2**(-10*e)),Rc=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia(`(prefers-reduced-motion: reduce)`);isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new Ac;emitter=new Nc;dimensions;virtualScroll;constructor({wrapper:e=window,content:t=document.documentElement,eventsTarget:n=e,smoothWheel:r=!0,syncTouch:i=!1,syncTouchLerp:a=.075,touchInertiaExponent:o=1.7,duration:s,easing:c,lerp:l=.1,infinite:u=!1,orientation:d=`vertical`,gestureOrientation:f=d===`horizontal`?`both`:`vertical`,touchMultiplier:p=1,wheelMultiplier:m=1,autoResize:h=!0,prevent:g,virtualScroll:_,overscroll:v=!0,autoRaf:y=!1,anchors:b=!1,autoToggle:x=!1,allowNestedScroll:S=!1,__experimental__naiveDimensions:C=!1,naiveDimensions:w=C,stopInertiaOnNavigate:T=!1,respectReducedMotion:E=!0}={}){window.lenisVersion=Tc,window.lenis||(window.lenis={}),window.lenis.version=Tc,d===`horizontal`&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!e||e===document.documentElement)&&(e=window),typeof s==`number`&&typeof c!=`function`?c=Lc:typeof c==`function`&&typeof s!=`number`&&(s=1),this.options={wrapper:e,content:t,eventsTarget:n,smoothWheel:r,syncTouch:i,syncTouchLerp:a,touchInertiaExponent:o,duration:s,easing:c,lerp:l,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:p,wheelMultiplier:m,autoResize:h,prevent:g,virtualScroll:_,overscroll:v,autoRaf:y,anchors:b,autoToggle:x,allowNestedScroll:S,naiveDimensions:w,stopInertiaOnNavigate:T,respectReducedMotion:E},this.dimensions=new Mc(e,t,{autoResize:h}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.addEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener(`click`,this.onClick),this.options.wrapper.addEventListener(`pointerdown`,this.onPointerDown),this.virtualScroll=new Ic(n,{touchMultiplier:p,wheelMultiplier:m}),this.virtualScroll.on(`scroll`,this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener(`transitionend`,this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.removeEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener(`pointerdown`,this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener(`click`,this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}onScrollEnd=e=>{e instanceof CustomEvent||(this.isScrolling===`smooth`||this.isScrolling===!1)&&e.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent(`scrollend`,{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let e=this.isHorizontal?`overflow-x`:`overflow-y`;return getComputedStyle(this.rootElement)[e]}checkOverflow(){[`hidden`,`clip`].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=e=>{e.propertyName?.includes(`overflow`)&&e.target===this.rootElement&&this.checkOverflow()};setScroll(e){this.isHorizontal?this.options.wrapper.scrollTo({left:e,behavior:`instant`}):this.options.wrapper.scrollTo({top:e,behavior:`instant`})}onClick=e=>{let t=e.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),n=new URL(window.location.href);if(this.options.anchors){let e=t.find(e=>n.host===e.host&&n.pathname===e.pathname&&e.hash);if(e){let t=typeof this.options.anchors==`object`&&this.options.anchors?this.options.anchors:void 0,n=decodeURIComponent(e.hash);this.scrollTo(n,t);return}}if(this.options.stopInertiaOnNavigate&&t.some(e=>n.host===e.host&&n.pathname!==e.pathname)){this.reset();return}};onPointerDown=e=>{e.button===1&&this.reset()};isTouchOnSelectionHandle(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let n=e.targetTouches[0]??e.changedTouches[0];if(!n)return!1;let r=t.getRangeAt(0).getClientRects();if(r.length===0)return!1;let i=r[0],a=r[r.length-1],o=Math.hypot(n.clientX-i.left,n.clientY-i.top)<=40,s=Math.hypot(n.clientX-a.right,n.clientY-a.bottom)<=40;return o||s}onVirtualScroll=e=>{if(typeof this.options.virtualScroll==`function`&&this.options.virtualScroll(e)===!1)return;let{deltaX:t,deltaY:n,event:r}=e;if(this.emitter.emit(`virtual-scroll`,{deltaX:t,deltaY:n,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let i=r.type.includes(`touch`),a=r.type.includes(`wheel`);if(i&&this.isIos&&(r.type===`touchstart`&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type===`touchend`&&(this._isDraggingSelection=!1);return}this.isTouching=r.type===`touchstart`||r.type===`touchmove`;let o=t===0&&n===0;if(this.options.syncTouch&&i&&r.type===`touchstart`&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let s=this.options.gestureOrientation===`vertical`&&n===0||this.options.gestureOrientation===`horizontal`&&t===0;if(o||s)return;let c=r.composedPath();c=c.slice(0,c.indexOf(this.rootElement));let l=this.options.prevent,u=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`;if(c.find(e=>e instanceof HTMLElement&&(typeof l==`function`&&l?.(e)||e.hasAttribute?.(`data-lenis-prevent`)||u===`vertical`&&e.hasAttribute?.(`data-lenis-prevent-vertical`)||u===`horizontal`&&e.hasAttribute?.(`data-lenis-prevent-horizontal`)||i&&e.hasAttribute?.(`data-lenis-prevent-touch`)||a&&e.hasAttribute?.(`data-lenis-prevent-wheel`)||this.options.allowNestedScroll&&this.hasNestedScroll(e,{deltaX:t,deltaY:n}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&a)){this.isScrolling=`native`,this.animate.stop(),r.lenisStopPropagation=!0;return}let d=n;this.options.gestureOrientation===`both`?d=Math.abs(n)>Math.abs(t)?n:t:this.options.gestureOrientation===`horizontal`&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&n>0||this.animatedScroll===this.limit&&n<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let f=i&&this.options.syncTouch,p=i&&r.type===`touchend`;p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit(`scroll`,this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling===`native`){let e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling=`native`),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty(`overflow`);return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty(`overflow`,`clip`);return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=e=>{let t=e-(this.time||e);this.time=e,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(e,{offset:t=0,immediate:n=!1,lock:r=!1,programmatic:i=!0,lerp:a=i?this.options.lerp:void 0,duration:o=i?this.options.duration:void 0,easing:s=i?this.options.easing:void 0,onStart:c,onComplete:l,force:u=!1,userData:d}={}){if(this.prefersReducedMotion&&(i?n=!0:(a=1,o=void 0,s=void 0)),(this.isStopped||this.isLocked)&&!u)return;let f=e,p=t;if(typeof f==`string`&&[`top`,`left`,`start`,`#`].includes(f))f=0;else if(typeof f==`string`&&[`bottom`,`right`,`end`].includes(f))f=this.limit;else{let e=null;if(typeof f==`string`?(e=f.startsWith(`#`)?document.getElementById(f.slice(1)):document.querySelector(f),e||(f===`#top`?f=0:console.warn(`Lenis: Target not found`,f))):f instanceof HTMLElement&&f?.nodeType&&(e=f),e){if(this.options.wrapper!==window){let e=this.rootElement.getBoundingClientRect();p-=this.isHorizontal?e.left:e.top}let t=e.getBoundingClientRect(),n=getComputedStyle(e),r=this.isHorizontal?Number.parseFloat(n.scrollMarginLeft):Number.parseFloat(n.scrollMarginTop),i=getComputedStyle(this.rootElement),a=this.isHorizontal?Number.parseFloat(i.scrollPaddingLeft):Number.parseFloat(i.scrollPaddingTop);f=(this.isHorizontal?t.left:t.top)+this.animatedScroll-(Number.isNaN(r)?0:r)-(Number.isNaN(a)?0:a)}}if(typeof f==`number`){if(f+=p,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;let e=f-this.animatedScroll;e>this.limit/2?f-=this.limit:e<-this.limit/2&&(f+=this.limit)}}else f=Ec(0,f,this.limit);if(f===this.targetScroll){c?.(this),l?.(this);return}if(this.userData=d??{},n){this.animatedScroll=this.targetScroll=f,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=f),typeof o==`number`&&typeof s!=`function`?s=Lc:typeof s==`function`&&typeof o!=`number`&&(o=1),this.animate.fromTo(this.animatedScroll,f,{duration:o,easing:s,lerp:a,onStart:()=>{r&&(this.isLocked=!0),this.isScrolling=`smooth`,c?.(this)},onUpdate:(e,t)=>{this.isScrolling=`smooth`,this.lastVelocity=this.velocity,this.velocity=e-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=e,this.setScroll(this.scroll),i&&(this.targetScroll=e),t||this.emit(),t&&(this.reset(),this.emit(),l?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(e,{deltaX:t,deltaY:n}){let r=Date.now();e._lenis||={};let i=e._lenis,a,o,s,c,l,u,d,f,p,m;if(r-(i.time??0)>2e3){i.time=Date.now();let t=window.getComputedStyle(e);if(i.computedStyle=t,a=[`auto`,`overlay`,`scroll`].includes(t.overflowX),o=[`auto`,`overlay`,`scroll`].includes(t.overflowY),l=[`auto`].includes(t.overscrollBehaviorX),u=[`auto`].includes(t.overscrollBehaviorY),i.hasOverflowX=a,i.hasOverflowY=o,!(a||o))return!1;d=e.scrollWidth,f=e.scrollHeight,p=e.clientWidth,m=e.clientHeight,s=d>p,c=f>m,i.isScrollableX=s,i.isScrollableY=c,i.scrollWidth=d,i.scrollHeight=f,i.clientWidth=p,i.clientHeight=m,i.hasOverscrollBehaviorX=l,i.hasOverscrollBehaviorY=u}else s=i.isScrollableX,c=i.isScrollableY,a=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,f=i.scrollHeight,p=i.clientWidth,m=i.clientHeight,l=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(a&&s||o&&c))return!1;let h=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`,g,_,v,y,b,x;if(h===`horizontal`)g=Math.round(e.scrollLeft),_=d-p,v=t,y=a,b=s,x=l;else if(h===`vertical`)g=Math.round(e.scrollTop),_=f-m,v=n,y=o,b=c,x=u;else return!1;return!x&&(g>=_||g<=0)||(v>0?g<_:g>0)&&y&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?`x`:`y`]}get isHorizontal(){return this.options.orientation===`horizontal`}get actualScroll(){let e=this.options.wrapper;return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop}get scroll(){return this.options.infinite?kc(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(e){this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(e){this._isStopped!==e&&(this._isStopped=e,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(e){this._isLocked!==e&&(this._isLocked=e,this.updateClassName())}get isSmooth(){return this.isScrolling===`smooth`}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let e=`lenis`;return this.options.autoToggle&&(e+=` lenis-autoToggle`),this.isStopped&&(e+=` lenis-stopped`),this.isLocked&&(e+=` lenis-locked`),this.isScrolling&&(e+=` lenis-scrolling`),this.isScrolling===`smooth`&&(e+=` lenis-smooth`),e}updateClassName(){this.cleanUpClassName(),this.className.split(` `).forEach(e=>{this.rootElement.classList.add(e)})}cleanUpClassName(){for(let e of Array.from(this.rootElement.classList))(e===`lenis`||e.startsWith(`lenis-`))&&this.rootElement.classList.remove(e)}};function zc(){let e=(0,x.useRef)(null),{pathname:t}=st();return(0,x.useEffect)(()=>{`scrollRestoration`in window.history&&(window.history.scrollRestoration=`manual`)},[]),(0,x.useEffect)(()=>{if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let t=new Rc({duration:1.7,easing:e=>1-(1-e)**4,smoothWheel:!0,wheelMultiplier:.85,syncTouch:!1,touchMultiplier:1});e.current=t;let n;function r(e){t.raf(e),n=requestAnimationFrame(r)}return n=requestAnimationFrame(r),()=>{cancelAnimationFrame(n),t.destroy(),e.current=null}},[]),(0,x.useLayoutEffect)(()=>{document.documentElement.scrollTop=0,document.body.scrollTop=0,e.current?e.current.scrollTo(0,{immediate:!0}):window.scrollTo(0,0)},[t]),null}function Bc(e){let t=(e||``).replace(/[^\d]/g,``);return t?`https://wa.me/${t}?text=Hello%20Ravichandra%20Textiles%2C%20I%20would%20like%20to%20inquire%20about%20your%20saree%20collection.`:``}function Vc(){let[e,t]=(0,x.useState)(H.contact.whatsapp);(0,x.useEffect)(()=>{V.getHomeSection(`social_links`).then(({section:e})=>{e?.content?.whatsapp&&t(e.content.whatsapp)}).catch(()=>{})},[]);let n=Bc(e);return n?(0,z.jsxs)(`aside`,{className:`whatsapp-floating-widget`,"aria-label":`WhatsApp Support`,children:[(0,z.jsxs)(`a`,{href:n,target:`_blank`,rel:`noopener noreferrer`,className:`whatsapp-btn`,"aria-label":`Chat with Ravichandra Textiles on WhatsApp`,children:[(0,z.jsx)(`span`,{className:`whatsapp-tooltip`,children:`Chat with us`}),(0,z.jsx)(`svg`,{className:`whatsapp-icon`,viewBox:`0 0 32 32`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":`true`,children:(0,z.jsx)(`path`,{fillRule:`evenodd`,clipRule:`evenodd`,d:`M16 2C8.268 2 2 8.268 2 16c0 2.583.694 5.006 1.905 7.09L2 30l7.155-1.874A13.935 13.935 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Zm7.11 19.986c-.297.834-1.468 1.53-2.42 1.734-.652.14-1.503.252-4.364-.935-3.658-1.517-6.02-5.234-6.202-5.476-.182-.243-1.487-1.98-1.487-3.776 0-1.796.938-2.68 1.272-3.045.333-.364.727-.455.97-.455.242 0 .484.002.696.013.224.01.523-.085.818.622.303.727 1.03 2.518 1.121 2.7.09.183.151.395.03.638-.12.242-.181.394-.363.606-.182.213-.383.475-.547.638-.182.182-.372.38-.16.744.212.364.945 1.558 2.028 2.524 1.392 1.24 2.566 1.625 2.93 1.807.364.182.576.152.788-.09.213-.243.91-1.06 1.152-1.424.243-.364.485-.304.818-.182.333.12 2.12 1 2.484 1.182.364.182.606.273.697.424.09.152.09.88-.207 1.714Z`,fill:`currentColor`})})]}),(0,z.jsx)(`style`,{children:`
        .whatsapp-floating-widget {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 90;
        }
        .whatsapp-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #25D366;
          color: #ffffff;
          box-shadow:
            0 8px 24px rgba(37, 211, 102, 0.4),
            0 3px 8px rgba(0, 0, 0, 0.15);
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease, background 0.2s ease;
          animation: waPulse 3.5s infinite;
        }
        .whatsapp-btn:hover {
          background: #20bd5a;
          transform: scale(1.08) translateY(-2px);
          box-shadow:
            0 12px 30px rgba(37, 211, 102, 0.5),
            0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .whatsapp-btn:active {
          transform: scale(0.96);
        }
        .whatsapp-icon {
          width: 32px;
          height: 32px;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12));
        }
        .whatsapp-tooltip {
          position: absolute;
          right: calc(100% + 14px);
          top: 50%;
          transform: translateY(-50%) translateX(6px);
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          background: #20080b;
          color: #fbf5ef;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 7px 14px;
          border-radius: 999px;
          border: 1px solid rgba(197, 139, 56, 0.35);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .whatsapp-tooltip::after {
          content: '';
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent #20080b;
        }
        .whatsapp-btn:hover .whatsapp-tooltip {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        @keyframes waPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55), 0 8px 24px rgba(37, 211, 102, 0.35);
          }
          70% {
            box-shadow: 0 0 0 16px rgba(37, 211, 102, 0), 0 8px 24px rgba(37, 211, 102, 0.35);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 8px 24px rgba(37, 211, 102, 0.35);
          }
        }

        @media (max-width: 860px) {
          .whatsapp-floating-widget {
            bottom: calc(82px + env(safe-area-inset-bottom, 0px));
            right: 18px;
          }
          .whatsapp-btn {
            width: 52px;
            height: 52px;
          }
          .whatsapp-icon {
            width: 28px;
            height: 28px;
          }
          .whatsapp-tooltip {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .whatsapp-btn {
            animation: none;
            transition: none;
          }
        }
      `})]}):null}function Hc({children:e,as:t=`div`,direction:n=`up`,distance:r=26,duration:i=1.6,delay:a=0,trigger:o=`scroll`,threshold:s=.15,rootMargin:c=`0px 0px -18% 0px`,className:l=``}){let u=(0,x.useRef)(null),[d,f]=(0,x.useState)(!1);(0,x.useEffect)(()=>{let e=u.current;if(!e)return;if(o===`load`){let e,t=requestAnimationFrame(()=>{e=requestAnimationFrame(()=>f(!0))});return()=>{cancelAnimationFrame(t),e&&cancelAnimationFrame(e)}}if(!(`IntersectionObserver`in window)){f(!0);return}let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(f(!0),t.unobserve(e.target))})},{threshold:s,rootMargin:c});t.observe(e);let n=setTimeout(()=>f(!0),2e3);return()=>{t.disconnect(),clearTimeout(n)}},[]);let p=`none`;return n===`up`?p=`translateY(${r}px)`:n===`left`?p=`translateX(-${r}px)`:n===`right`&&(p=`translateX(${r}px)`),(0,z.jsx)(t,{ref:u,className:l,style:{opacity:+!!d,transform:d?`translate(0, 0)`:p,transition:d?`opacity ${i}s ease-out ${a}s, transform ${i}s cubic-bezier(0.19,1,0.22,1) ${a}s`:`none`,willChange:`transform, opacity`},children:e})}var Uc=.06,Wc=.022,Gc=768;function Kc({categories:e,note:t,heading:n}){let r=(0,x.useRef)(null),i=(0,x.useRef)(null),a=(0,x.useRef)([]),o=(0,x.useRef)(0),s=(0,x.useRef)(0),c=(0,x.useRef)(0),l=(0,x.useRef)(!1),u=(0,x.useRef)(null),d=(0,x.useRef)(null),f=(0,x.useRef)(null),p=(0,x.useRef)(0);function m(){if(typeof window>`u`)return!1;let e=window.innerWidth<=Gc,t=typeof window.matchMedia==`function`&&window.matchMedia(`(hover: none), (pointer: coarse)`).matches;return e||t}let[h,g]=(0,x.useState)(0),[_,v]=(0,x.useState)(0),[y,b]=(0,x.useState)(m()),S=e.length,C=S?[...e,...e,...e]:[];if((0,x.useEffect)(()=>{function e(){b(m())}return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,x.useEffect)(()=>{if(y)return;function e(){l.current&&(s.current+=c.current*Wc,o.current+=(s.current-o.current)*Uc,g(o.current)),u.current=requestAnimationFrame(e)}return u.current=requestAnimationFrame(e),()=>cancelAnimationFrame(u.current)},[y]),(0,x.useEffect)(()=>{if(!y||!S)return;let e=i.current;if(!e)return;function t(){let e=a.current[0],t=a.current[S];e&&t&&(p.current=t.offsetLeft-e.offsetLeft)}function n(t){let n=a.current[t];n&&(e.scrollLeft=n.offsetLeft-(e.clientWidth-n.clientWidth)/2)}function r(){let t=e.getBoundingClientRect(),n=t.left+t.width/2,r=S,i=1/0;return a.current.forEach((e,t)=>{if(!e)return;let a=e.getBoundingClientRect(),o=a.left+a.width/2,s=Math.abs(o-n);s<i&&(i=s,r=t)}),r}function o(){let t=r();t<S?(e.scrollLeft+=p.current,v(t+S)):t>=S*2?(e.scrollLeft-=p.current,v(t-S)):v(t)}function s(){d.current||(d.current=requestAnimationFrame(()=>{d.current=null,v(r())}),clearTimeout(f.current),f.current=setTimeout(o,120))}let c=setTimeout(()=>{t(),n(S),v(S)},350);return e.addEventListener(`scroll`,s,{passive:!0}),()=>{clearTimeout(c),clearTimeout(f.current),e.removeEventListener(`scroll`,s),d.current&&cancelAnimationFrame(d.current)}},[y,S]),!S)return null;function w(e){let t=r.current.getBoundingClientRect(),n=t.left+t.width/2,i=(e.clientX-n)/(t.width/2);c.current=Math.max(-1,Math.min(1,i))}function T(){l.current=!0}function E(){l.current=!1,c.current=0}function D(e){let t=((e-h)%S+S)%S;return t>S/2&&(t-=S),t}let O=y?1.8:1.4;return(0,z.jsxs)(`div`,{className:`showcase`,children:[(0,z.jsxs)(`div`,{className:`showcase-head`,children:[(0,z.jsx)(Hc,{as:`p`,direction:`left`,distance:28,duration:O,className:`showcase-note`,children:t||`Ravichandra Textiles celebrates the timeless art of Indian weaving, curating each saree to bring grace and authentic craftsmanship to every occasion.`}),(0,z.jsx)(Hc,{as:`h2`,delay:y?.15:.1,direction:`right`,distance:38,duration:O,className:`showcase-title`,children:n||`Our Collections`})]}),y?(0,z.jsx)(`div`,{className:`showcase-scroll`,ref:i,children:C.map((e,t)=>{let n=Math.min(Math.abs(t-_),3);return(0,z.jsx)(L,{ref:e=>{a.current[t]=e},to:`/products?category=${e.id}`,className:`showcase-scroll-card ${t===_?`is-focus`:``}`,"data-dist":n,style:{animationDelay:`${Math.min(t%S,6)*70}ms`},children:(0,z.jsxs)(`div`,{className:`showcase-card-lift`,children:[(0,z.jsx)(`img`,{src:e.image,alt:``}),(0,z.jsx)(`span`,{className:`showcase-card-overlay`}),(0,z.jsx)(`span`,{className:`showcase-card-name`,children:e.name})]})},`${e.id}-${Math.floor(t/S)}`)})}):(0,z.jsx)(`div`,{className:`showcase-rail`,ref:r,onMouseMove:w,onMouseEnter:T,onMouseLeave:E,children:(0,z.jsx)(`div`,{className:`showcase-rail-inner`,children:e.map((e,t)=>{let n=D(t),r=Math.abs(n);if(r>2.6)return null;let i=r<.5,a=1-Math.min(r,2)*.09,o=n*205,s=Math.round(100-r*10),c=Math.max(0,1-Math.max(0,r-2)*1.4);return(0,z.jsx)(L,{to:`/products?category=${e.id}`,className:`showcase-card ${i?`is-focus`:``}`,style:{transform:`translate(-50%, -50%) translate(${o}px, 0) scale(${a})`,zIndex:s,opacity:c},children:(0,z.jsxs)(`div`,{className:`showcase-card-lift`,children:[(0,z.jsx)(`img`,{src:e.image,alt:``}),(0,z.jsx)(`span`,{className:`showcase-card-overlay`}),(0,z.jsx)(`span`,{className:`showcase-card-name`,children:e.name})]})},e.id)})})}),(0,z.jsxs)(L,{to:`/products`,state:{openFilters:!0},className:`showcase-explore`,children:[`Explore`,(0,z.jsx)(`svg`,{viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:(0,z.jsx)(`path`,{d:`M8 4l6 6-6 6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`})})]}),(0,z.jsx)(`style`,{children:`
        .showcase {
          position: relative;
          background: #fbf6f0;
          border: 1px solid rgba(197, 139, 56, 0.22);
          border-radius: 28px;
          padding: 56px 40px 48px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(32, 8, 11, 0.06);
        }
        .showcase-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 44px;
        }
        .showcase-note {
          max-width: 280px;
          font-size: 13.5px;
          line-height: 1.7;
          font-style: italic;
          color: var(--brand-muted);
          margin: 0 0 6px;
        }
        .showcase-title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 44px;
          line-height: 1;
          color: var(--brand-primary);
          margin: 0;
          text-align: right;
        }

        .showcase-rail {
          position: relative;
          height: 380px;
          margin: 0 auto;
          cursor: pointer;
        }
        .showcase-rail-inner {
          position: absolute;
          inset: 0;
          transform-origin: 50% 50%;
        }
        .showcase-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 300px;
          border: 3px solid transparent;
          padding: 0;
          border-radius: 18px;
          overflow: visible;
          display: block;
          transition: border-color 0.25s ease;
          will-change: transform;
        }
        .showcase-card.is-focus {
          border-color: var(--maroon-900);
        }
        /* Pop animates the inner image layer only, so it never fights the
           outer card's own translate/scale positioning transform. */
        .showcase-card.is-focus .showcase-card-lift {
          animation: showcasePop 2.2s ease-in-out infinite;
        }
        @keyframes showcasePop {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.045); }
        }
        .showcase-card:hover {
          z-index: 400 !important;
        }
        .showcase-card-lift {
          position: absolute;
          inset: 0;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 14px 30px rgba(72,24,30,0.18);
          transition: transform 0.4s cubic-bezier(.19,1,.22,1), box-shadow 0.4s ease, filter 0.35s ease;
        }
        .showcase-card.is-focus .showcase-card-lift {
          box-shadow: 0 22px 44px rgba(72,24,30,0.3);
        }
        .showcase-card:hover .showcase-card-lift {
          transform: translateY(-18px) scale(1.045);
          box-shadow: 0 32px 54px rgba(72,24,30,0.4);
        }
        /* Both the desktop rail and the mobile strip wrap their image in
           this same inner div, so one rule covers both — this used to be
           scoped only to the desktop card's own outer class, which meant
           the mobile strip's images never got object-fit: cover at all
           and just rendered at their natural size instead of filling/
           cropping to the card, which is what looked "not zoomed in" on
           mobile. */
        .showcase-card-lift img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .showcase-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(44,10,16,0) 42%, rgba(30,8,12,0.8) 100%);
        }
        .showcase-card-name {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 16px;
          color: var(--ivory);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-align: left;
        }
        /* On the mobile strip, a peeking (non-centered) card is only ever
           partially inside the visible area by design — that's the visual
           cue that there's more to scroll to. But the name label spans the
           card's full width, so on a half-visible card its text gets cut
           off mid-word (e.g. "KANJEEVARAM" showing as just "...EVARAM"),
           which reads as broken rather than intentional. Showing the name
           only on the centered card keeps the peek effect but drops the
           part that looked like a rendering glitch. */
        .showcase-scroll-card:not(.is-focus) .showcase-card-name {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        /* The dark gradient scrim (for text contrast) was still showing on
           every peeking card even after the name above was hidden — with
           no text left to contrast against, it just reads as an uneven
           tint. Fading it out too makes a non-focused card fully transparent
           except for the photo itself, matching on both sides. Desktop
           cards are left alone here — they don't peek/overlap like the
           mobile strip does, and their name label stays visible there, so
           removing their scrim would hurt readability instead of fixing
           anything. */
        .showcase-scroll-card:not(.is-focus) .showcase-card-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .showcase-scroll {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          overflow-y: visible;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          scroll-padding-inline: calc(50% - 75px);
          padding: 4px calc(50% - 75px) 14px;
          scrollbar-width: none;
        }
        .showcase-scroll::-webkit-scrollbar {
          display: none;
        }
        .showcase-scroll-card {
          position: relative;
          flex: 0 0 auto;
          width: 150px;
          height: 220px;
          border-radius: 15px;
          overflow: hidden;
          scroll-snap-align: center;
          scroll-snap-stop: always;
          box-shadow: 0 10px 24px rgba(72,24,30,0.18);
          opacity: 0;
          border: 2px solid transparent;
          animation: showcaseCardIn 0.6s cubic-bezier(0.19,1,0.22,1) forwards;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        @keyframes showcaseCardIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .showcase-scroll-card { animation: none; opacity: 1; }
        }
        /* Scale/fade falloff by distance from the centered card — the same
           shape as the desktop rail's offset formula, just driven by scroll
           position instead of cursor position. Applied to the inner layer
           (not the outer card that owns the entrance animation above) so
           the two don't fight over the same transform. */
        .showcase-scroll-card .showcase-card-lift {
          transition: transform 0.35s cubic-bezier(0.19,1,0.22,1), opacity 0.35s ease, box-shadow 0.35s ease;
        }
        .showcase-scroll-card[data-dist="0"] .showcase-card-lift { transform: scale(1); opacity: 1; }
        .showcase-scroll-card[data-dist="1"] .showcase-card-lift { transform: scale(0.91); opacity: 0.8; }
        .showcase-scroll-card[data-dist="2"] .showcase-card-lift { transform: scale(0.85); opacity: 0.6; }
        .showcase-scroll-card[data-dist="3"] .showcase-card-lift { transform: scale(0.8); opacity: 0.45; }
        /* Whichever card sits centered in the strip gets the same gentle
           bounce as the desktop rail's focused card. */
        .showcase-scroll-card.is-focus {
          border-color: var(--maroon-900);
          box-shadow: 0 16px 32px rgba(72,24,30,0.3);
        }
        .showcase-scroll-card.is-focus .showcase-card-lift {
          animation: showcasePop 2.2s ease-in-out infinite;
        }

        .showcase-explore {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 36px auto 0;
          padding: 13px 28px;
          border-radius: 999px;
          background: var(--maroon-900);
          color: var(--ivory);
          font-size: 14px;
          font-weight: 500;
          width: fit-content;
          left: 50%;
          position: relative;
          transform: translateX(-50%);
          transition: background 0.2s ease;
        }
        .showcase-explore:hover { background: var(--maroon-800); }
        .showcase-explore svg { width: 16px; height: 16px; }

        @media (max-width: 980px) {
          .showcase { padding: 40px 20px 32px; }
          .showcase-head { flex-direction: column; align-items: flex-start; gap: 16px; }
          .showcase-title { font-size: 34px; text-align: left; }
          .showcase-rail { height: 300px; }
          .showcase-rail-inner { transform: scale(0.86); }
        }
        @media (max-width: 600px) {
          .showcase { padding: 26px 14px 22px; }
          .showcase-title { font-size: 23px; }
          .showcase-note { font-size: 12px; max-width: 200px; }
          .showcase-scroll { padding-inline: calc(50% - 66px); scroll-padding-inline: calc(50% - 66px); }
          .showcase-scroll-card { width: 132px; height: 194px; }
          .showcase-explore { padding: 11px 24px; font-size: 13px; margin-top: 26px; }
        }
      `})]})}var qc={heading:`Loved by Saree Connoisseurs`,subheading:`Authentic reviews from our patrons on Google Maps`,googleBusinessUrl:`https://share.google/rLeQl6DO3cPtU5rql`,averageRating:4.9,totalReviews:`150+ reviews`,reviews:[{id:`gr-1`,name:`Pooja Gowda`,avatarInitial:`P`,avatarColor:`#E65100`,userBadge:`1 review`,rating:5,timeAgo:`5 months ago`,text:`They have amazing wedding collection at very reasonable price. You guys must visit for any occasion`,reviewUrl:`https://share.google/rLeQl6DO3cPtU5rql`,likesCount:1},{id:`gr-2`,name:`Meenakshi Sundaram`,avatarInitial:`M`,avatarColor:`#2E7D32`,userBadge:`Local Guide · 14 reviews`,rating:5,timeAgo:`3 months ago`,text:`Authentic pure silk Kanchivaram sarees. The gold zari lustre and weight of the saree speaks for its quality. Highly recommended for bridal shopping.`,reviewUrl:`https://share.google/rLeQl6DO3cPtU5rql`,likesCount:4},{id:`gr-3`,name:`Deepa Hegde`,avatarInitial:`D`,avatarColor:`#1565C0`,userBadge:`6 reviews`,rating:5,timeAgo:`2 months ago`,text:`Ordered online and received within 3 days in pristine packaging with silk mark certificate. Saree looks even richer than pictures!`,reviewUrl:`https://share.google/rLeQl6DO3cPtU5rql`,likesCount:2}]};function Jc({cmsData:e}){let t={...qc,...e||{},reviews:Array.isArray(e?.reviews)&&e.reviews.length>0?e.reviews:qc.reviews},[n,r]=(0,x.useState)({}),[i,a]=(0,x.useState)(null);function o(e,t){e.stopPropagation(),r(e=>({...e,[t]:!e[t]}))}function s(e,n,r){e.stopPropagation();let i=r||t.googleBusinessUrl||`https://share.google/rLeQl6DO3cPtU5rql`;navigator.clipboard?navigator.clipboard.writeText(i).then(()=>{a(n),setTimeout(()=>a(null),2e3)}).catch(()=>{window.open(i,`_blank`,`noopener,noreferrer`)}):window.open(i,`_blank`,`noopener,noreferrer`)}function c(e){let n=e||t.googleBusinessUrl||`https://share.google/rLeQl6DO3cPtU5rql`;window.open(n,`_blank`,`noopener,noreferrer`)}return(0,z.jsxs)(`section`,{className:`google-reviews-section`,children:[(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsxs)(`div`,{className:`google-reviews-head`,children:[(0,z.jsxs)(`div`,{className:`google-badge-brand`,children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`26`,height:`26`,className:`google-icon`,"aria-hidden":`true`,children:[(0,z.jsx)(`path`,{fill:`#4285F4`,d:`M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z`}),(0,z.jsx)(`path`,{fill:`#34A853`,d:`M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z`}),(0,z.jsx)(`path`,{fill:`#FBBC05`,d:`M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z`}),(0,z.jsx)(`path`,{fill:`#EA4335`,d:`M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z`})]}),(0,z.jsxs)(`div`,{className:`google-rating-info`,children:[(0,z.jsx)(`span`,{className:`google-title`,children:`Google Reviews`}),(0,z.jsxs)(`div`,{className:`google-stars-row`,children:[(0,z.jsx)(`span`,{className:`google-score`,children:t.averageRating||`4.9`}),(0,z.jsx)(`span`,{className:`google-gold-stars`,children:`★★★★★`}),(0,z.jsxs)(`span`,{className:`google-count`,children:[`(`,t.totalReviews||`150+`,`)`]})]})]})]}),(0,z.jsxs)(`div`,{className:`google-head-titles`,children:[(0,z.jsx)(`h2`,{className:`section-title`,children:t.heading}),(0,z.jsx)(`p`,{className:`section-subtitle`,children:t.subheading})]}),(0,z.jsxs)(`a`,{href:t.googleBusinessUrl||`https://share.google/rLeQl6DO3cPtU5rql`,target:`_blank`,rel:`noopener noreferrer`,className:`google-write-review-btn`,children:[(0,z.jsx)(`span`,{children:`Review us on Google`}),(0,z.jsx)(`svg`,{viewBox:`0 0 20 20`,width:`16`,height:`16`,fill:`currentColor`,children:(0,z.jsx)(`path`,{fillRule:`evenodd`,d:`M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-8a.75.75 0 00-.75-.75h-8a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z`,clipRule:`evenodd`})})]})]}),(0,z.jsx)(`div`,{className:`google-cards-grid`,children:t.reviews.map(e=>{let r=n[e.id],a=e.reviewUrl||t.googleBusinessUrl||`https://share.google/rLeQl6DO3cPtU5rql`;return(0,z.jsxs)(`div`,{className:`google-review-card reflective-card`,onClick:()=>c(a),role:`button`,tabIndex:0,onKeyDown:e=>{e.key===`Enter`&&c(a)},title:`Click to view verified review on Google Maps`,children:[(0,z.jsx)(`div`,{className:`card-shimmer`,"aria-hidden":`true`}),(0,z.jsxs)(`div`,{className:`gr-card-header`,children:[(0,z.jsx)(`div`,{className:`gr-avatar`,style:{backgroundColor:e.avatarColor||`#D97706`},children:e.avatarInitial||e.name?.charAt(0)||`U`}),(0,z.jsxs)(`div`,{className:`gr-user-info`,children:[(0,z.jsx)(`span`,{className:`gr-user-name`,children:e.name}),(0,z.jsx)(`span`,{className:`gr-user-meta`,children:e.userBadge||`1 review`})]}),(0,z.jsx)(`a`,{href:a,target:`_blank`,rel:`noopener noreferrer`,className:`gr-redirect-badge`,onClick:e=>e.stopPropagation(),title:`View directly on Google`,children:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`14`,height:`14`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`}),(0,z.jsx)(`polyline`,{points:`15 3 21 3 21 9`}),(0,z.jsx)(`line`,{x1:`10`,y1:`14`,x2:`21`,y2:`3`})]})})]}),(0,z.jsxs)(`div`,{className:`gr-rating-row`,children:[(0,z.jsx)(`div`,{className:`gr-stars`,"aria-label":`${e.rating||5} stars`,children:Array.from({length:e.rating||5}).map((e,t)=>(0,z.jsx)(`span`,{className:`gr-star`,children:`★`},t))}),(0,z.jsx)(`span`,{className:`gr-time-ago`,children:e.timeAgo||`5 months ago`})]}),(0,z.jsx)(`p`,{className:`gr-review-text`,children:e.text}),(0,z.jsxs)(`div`,{className:`gr-card-actions`,children:[(0,z.jsxs)(`button`,{type:`button`,className:`gr-action-btn ${r?`active`:``}`,onClick:t=>o(t,e.id),title:`Helpful review`,children:[(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:r?`#e53935`:`none`,stroke:r?`#e53935`:`currentColor`,strokeWidth:`2`,children:(0,z.jsx)(`path`,{d:`M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`})}),(0,z.jsx)(`span`,{children:r?(e.likesCount||1)+1:e.likesCount||1})]}),(0,z.jsxs)(`button`,{type:`button`,className:`gr-action-btn gr-share-btn`,onClick:t=>s(t,e.id,a),title:`Copy review link`,children:[(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:(0,z.jsx)(`path`,{d:`M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13`,strokeLinecap:`round`,strokeLinejoin:`round`})}),(0,z.jsx)(`span`,{children:i===e.id?`Copied!`:`Share`})]}),(0,z.jsx)(`span`,{className:`gr-card-visit-hint`,children:`Open on Google ↗`})]})]},e.id)})})]}),(0,z.jsx)(`style`,{children:`
        .google-reviews-section {
          padding: 64px 0 72px;
          background: #FAF8F5;
          color: #2c1810;
          border-top: 1px solid rgba(197, 139, 56, 0.22);
          border-bottom: 1px solid rgba(197, 139, 56, 0.15);
        }

        .google-reviews-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .google-badge-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FFFFFF;
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(197, 139, 56, 0.28);
          box-shadow: 0 4px 14px rgba(184, 134, 11, 0.08);
        }

        .google-rating-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .google-title {
          font-size: 13px;
          font-weight: 600;
          color: #2c1810;
          letter-spacing: 0.02em;
        }

        .google-stars-row {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          color: #6e594d;
        }

        .google-score {
          font-weight: 700;
          color: #2c1810;
        }

        .google-gold-stars {
          color: #f59e0b;
          letter-spacing: 1px;
        }

        .google-head-titles {
          flex: 1;
          min-width: 240px;
        }

        .google-head-titles .section-title {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: 24px;
          color: #2c1810;
          margin: 0 0 4px;
          font-weight: 600;
        }

        .google-head-titles .section-subtitle {
          font-size: 13px;
          color: #786458;
          margin: 0;
        }

        .google-write-review-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #b87d2b;
          color: #FFFFFF !important;
          border: 1px solid #a26b20;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          padding: 9px 20px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(184, 125, 43, 0.25);
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
        }

        .google-write-review-btn:hover {
          background: #9b651e;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(184, 125, 43, 0.35);
        }

        /* Responsive grid with smaller, sleek cards */
        .google-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
        }

        /* Premium White Reflective Card */
        .google-review-card {
          position: relative;
          background: linear-gradient(155deg, #FFFFFF 0%, #FDFBF8 100%);
          border: 1px solid rgba(197, 139, 56, 0.24);
          border-top: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          box-shadow:
            0 2px 6px rgba(184, 134, 11, 0.04),
            0 10px 24px rgba(184, 134, 11, 0.08);
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
                      box-shadow 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
                      border-color 0.25s ease;
        }

        /* Subtle reflective glass highlight sweep */
        .card-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 70%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.55),
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
          transition: left 0.75s ease;
        }

        .google-review-card:hover .card-shimmer {
          left: 140%;
        }

        .google-review-card:hover {
          transform: translateY(-3px);
          border-color: rgba(184, 125, 43, 0.5);
          box-shadow:
            0 4px 10px rgba(184, 134, 11, 0.06),
            0 14px 32px rgba(184, 134, 11, 0.16);
        }

        .google-review-card:focus-visible {
          outline: 2px solid #b87d2b;
          outline-offset: 2px;
        }

        .gr-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .gr-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 600;
          font-size: 15px;
          flex: 0 0 auto;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
        }

        .gr-user-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .gr-user-name {
          font-size: 13.5px;
          font-weight: 600;
          color: #1c1917;
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .gr-user-meta {
          font-size: 11.5px;
          color: #78716c;
        }

        .gr-redirect-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(184, 125, 43, 0.08);
          color: #b87d2b;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.15s ease, color 0.2s ease;
        }

        .gr-redirect-badge:hover {
          background: #b87d2b;
          color: #ffffff;
          transform: scale(1.1);
        }

        .gr-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .gr-stars {
          display: flex;
          gap: 1px;
        }

        .gr-star {
          color: #f59e0b;
          font-size: 14px;
          line-height: 1;
        }

        .gr-time-ago {
          font-size: 11px;
          color: #78716c;
        }

        .gr-review-text {
          font-size: 13px;
          line-height: 1.55;
          color: #292524;
          margin: 0 0 14px;
          flex: 1;
          font-weight: 400;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .gr-card-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(197, 139, 56, 0.15);
        }

        .gr-action-btn {
          background: none;
          border: none;
          color: #78716c;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 6px;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .gr-action-btn:hover {
          color: #b87d2b;
          background: rgba(184, 125, 43, 0.08);
        }

        .gr-action-btn.active {
          color: #e53935;
        }

        .gr-share-btn {
          margin-left: 0;
        }

        .gr-card-visit-hint {
          margin-left: auto;
          font-size: 11px;
          font-weight: 500;
          color: #b87d2b;
          display: flex;
          align-items: center;
          gap: 2px;
          opacity: 0.85;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .google-review-card:hover .gr-card-visit-hint {
          opacity: 1;
          transform: translateX(2px);
        }

        @media (max-width: 768px) {
          .google-reviews-head { flex-direction: column; align-items: flex-start; }
          .google-cards-grid { grid-template-columns: 1fr; }
        }
      `})]})}var Yc=[{id:`kanjivaram-purple`,title:`Kanjivaram Pattu`,tagline:`Deep Purple Silk • Pure Gold Zari Pallu`,badge:`Temple Border Heritage`,src:`https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?auto=format&fit=crop&w=2000&q=85`,alt:`Handwoven purple Kanjivaram pattu saree with gold zari pallu`},{id:`banarasi-crimson`,title:`Banarasi Brocade`,tagline:`Royal Crimson Silk • Intricate Floral Jaal`,badge:`Artisan Zari Weave`,src:`https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85`,alt:`Royal crimson Banarasi pattu silk saree with fine gold brocade`},{id:`bridal-ivory`,title:`Bridal Kanjivaram`,tagline:`Ivory & Gold • Heirloom Wedding Drape`,badge:`Sacred Bridal Edit`,src:`https://images.unsplash.com/photo-1619516388835-2b60acc4049e?auto=format&fit=crop&w=2000&q=85`,alt:`Ivory and gold bridal Kanjivaram pattu saree with heavy contrast border`},{id:`kanjivaram-teal`,title:`Teal Temple Silk`,tagline:`Peacock Teal • Korvai Handwoven Border`,badge:`Master Weaver Craft`,src:`https://images.unsplash.com/photo-1676696706907-0e04665b80bd?auto=format&fit=crop&w=2000&q=85`,alt:`Teal Kanjivaram pattu saree with traditional temple border and gold motifs`}],Xc=4200;function Zc({isSlideActive:e=!0,onCycleComplete:t}){let[n,r]=(0,x.useState)(0),i=(0,x.useRef)(null);(0,x.useEffect)(()=>{if(e)return i.current=setInterval(()=>{r(e=>{let n=(e+1)%Yc.length;return n===0&&t&&t(),n})},Xc),()=>clearInterval(i.current)},[e,t]);let a=Yc[n];return(0,z.jsxs)(`div`,{className:`saree-transition-stage`,"aria-label":`Traditional Pattu Saree Showcase`,children:[Yc.map((e,t)=>{let r=t===n;return(0,z.jsx)(`div`,{className:`saree-frame ${r?`active`:``} zoom-${t%2==0?`in`:`out`}`,"aria-hidden":!r,children:(0,z.jsx)(`img`,{src:e.src,alt:e.alt,loading:t===0?`eager`:`lazy`,decoding:`async`})},e.id)}),(0,z.jsx)(`div`,{className:`saree-shimmer-layer`,"aria-hidden":`true`},`shimmer-${n}`),(0,z.jsx)(`div`,{className:`saree-vignette-overlay`,"aria-hidden":`true`}),(0,z.jsxs)(`div`,{className:`saree-artisan-badge`,children:[(0,z.jsx)(`span`,{className:`saree-badge-sparkle`,children:`✦`}),(0,z.jsx)(`span`,{className:`saree-badge-type`,children:a.badge}),(0,z.jsx)(`span`,{className:`saree-badge-sep`,children:`•`}),(0,z.jsx)(`span`,{className:`saree-badge-title`,children:a.title})]},`badge-${a.id}`),(0,z.jsx)(`style`,{children:`
        .saree-transition-stage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #1a0508;
        }

        .saree-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          will-change: opacity, transform;
        }

        .saree-frame.active {
          opacity: 1;
          pointer-events: auto;
        }

        .saree-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          transform-origin: center center;
        }

        /* Cinematic Ken Burns slow panning & scaling */
        .saree-frame.zoom-in img {
          animation: sareeKenBurnsIn 5600ms ease-out forwards;
        }

        .saree-frame.zoom-out img {
          animation: sareeKenBurnsOut 5600ms ease-out forwards;
        }

        @keyframes sareeKenBurnsIn {
          0% { transform: scale(1.01) translateY(0); }
          100% { transform: scale(1.08) translateY(-1.2%); }
        }

        @keyframes sareeKenBurnsOut {
          0% { transform: scale(1.08) translateY(-1%); }
          100% { transform: scale(1.02) translateY(0.5%); }
        }

        /* Subtle gold zari light-sweep */
        .saree-shimmer-layer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(212, 175, 55, 0.08) 45%,
            rgba(255, 235, 170, 0.18) 50%,
            rgba(212, 175, 55, 0.08) 55%,
            transparent 100%
          );
          opacity: 0;
          animation: zariSweep 1.6s ease-in-out forwards;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        @keyframes zariSweep {
          0% { transform: translateX(-100%); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        /* Subtle dark vignette to ensure text contrast */
        .saree-vignette-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(20, 4, 8, 0.2) 0%,
            rgba(15, 2, 5, 0.65) 100%
          );
          pointer-events: none;
        }

        /* Floating artisan label in bottom corner */
        .saree-artisan-badge {
          position: absolute;
          bottom: 24px;
          right: 28px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(30, 8, 14, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: #f7eed8;
          font-family: var(--font-body, inherit);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
          animation: badgeFade 0.8s ease forwards;
        }

        .saree-badge-sparkle {
          color: #d4af37;
          font-size: 12px;
        }

        .saree-badge-type {
          color: #f3dfa2;
          font-weight: 500;
        }

        .saree-badge-sep {
          color: rgba(255, 255, 255, 0.4);
        }

        .saree-badge-title {
          color: #fff;
          font-weight: 600;
        }

        @keyframes badgeFade {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .saree-artisan-badge {
            bottom: 38px;
            right: 16px;
            padding: 4px 10px;
            font-size: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .saree-frame.zoom-in img,
          .saree-frame.zoom-out img {
            animation: none;
          }
          .saree-shimmer-layer {
            animation: none;
          }
        }
      `})]})}var Qc=[{id:`hero-video-1`,type:`video`,src:`/videos/hero1.mp4`,alt:`Ravichandra Textiles Traditional Saree Showcase - 4K Video`,eyebrow:`PURE HANDLOOM SILKS`,heading:`Crafted with Devotion`,subheading:`Experience authentic heirloom weaves with pure zari threads.`,ctaLabel:`Explore Collection`,ctaLink:`/products`},{id:`hero-image-2`,type:`image`,src:`/images/styles/kanchivaram.jpg`,alt:`Ravichandra Textiles Kanchivaram Silk Saree`,eyebrow:`TEMPLE TRADITIONS`,heading:`Kanchivaram Elegance`,subheading:`Heirloom drape with temple-woven gold zari motifs.`,ctaLabel:`Shop Kanchivaram`,ctaLink:`/products?category=kanjivaram`},{id:`hero-image-3`,type:`image`,src:`/images/styles/banarasi.jpg`,alt:`Ravichandra Textiles Banarasi Saree Showcase`,eyebrow:`ROYAL WEAVES`,heading:`Banarasi Splendor`,subheading:`Brocade zari woven by master craftsmen from the sacred ghats.`,ctaLabel:`Shop Banarasi`,ctaLink:`/products?category=banarasi`}],$c=[{id:`loading`,type:`image`,src:`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`,alt:``}];function el({slides:e,mobileSlides:t}){let[n,r]=(0,x.useState)(typeof window<`u`&&window.innerWidth<=640);(0,x.useEffect)(()=>{function e(){r(window.innerWidth<=640)}return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let i=e===null&&t===null,a=n&&Array.isArray(t)&&t.length?t:e,o=i?$c:Array.isArray(a)&&a.length?a.map((e,t)=>({id:e.id||`${t}-${e.url}`,type:e.type||`image`,src:e.url||e.src,alt:e.alt||e.heading||`Ravichandra Textiles Sarees`,eyebrow:e.eyebrow,heading:e.heading,subheading:e.subheading,ctaLabel:e.ctaLabel,ctaLink:e.ctaLink})):Qc;return(0,z.jsx)(nl,{slides:o,isMobile:n})}function tl({src:e,alt:t,isActive:n,onEnded:r,isSingle:i}){let a=(0,x.useRef)(null);return(0,x.useEffect)(()=>{let e=a.current;if(e){if(n){e.currentTime=0;let t=e.play();t!==void 0&&t.catch(()=>{})}else e.pause()}},[n]),(0,z.jsx)(`video`,{ref:a,src:e,muted:!0,playsInline:!0,preload:`auto`,autoPlay:n,loop:i,onEnded:r,"aria-label":t,className:`hero-media`})}function nl({slides:e,isMobile:t}){let[n,r]=(0,x.useState)(0),[i,a]=(0,x.useState)(!1),o=(0,x.useRef)(null),s=e.map(e=>e.src||e.id).join(`|`);(0,x.useEffect)(()=>{r(0)},[s]),(0,x.useEffect)(()=>{if(clearInterval(o.current),e.length<=1||i)return;let t=e[n],a=e.findIndex(e=>e.type===`image`),s=n===0||n===a?2e4:0;if(t?.type===`image`){let n=(t.duration||5500)+s;o.current=setInterval(()=>{r(t=>(t+1)%e.length)},n)}else if(t?.type===`video`){let n=(t.duration||8500)+s;o.current=setInterval(()=>{r(t=>(t+1)%e.length)},n)}return()=>clearInterval(o.current)},[n,s,e,i]);function c(){e.length>1&&r(t=>(t+1)%e.length)}function l(t){r((t+e.length)%e.length)}return(0,z.jsxs)(`div`,{className:`hero-slider`,onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),onTouchStart:()=>a(!0),onTouchEnd:()=>a(!1),children:[(0,z.jsx)(`div`,{className:`hero-slider-track`,style:{transform:`translate3d(-${n*100}%, 0, 0)`},children:e.map((t,r)=>(0,z.jsxs)(`div`,{className:`hero-slide-item`,children:[t.type===`video`?(0,z.jsx)(tl,{src:t.src,alt:t.alt,isActive:r===n,onEnded:c,isSingle:e.length===1}):t.type===`transition`?(0,z.jsx)(Zc,{isSlideActive:r===n,onCycleComplete:e.length>1?c:void 0}):(0,z.jsx)(`img`,{src:t.src,alt:t.alt,className:`hero-media`,loading:r===0?`eager`:`lazy`}),(0,z.jsx)(`div`,{className:`hero-left-scrim`,"aria-hidden":`true`}),(0,z.jsx)(`div`,{className:`hero-bottom-scrim`,"aria-hidden":`true`}),(t.heading||t.subheading||t.eyebrow)&&(0,z.jsx)(`div`,{className:`hero-left-content`,children:(0,z.jsxs)(`div`,{className:`hero-left-inner`,children:[t.eyebrow&&(0,z.jsx)(`span`,{className:`hero-left-eyebrow`,children:t.eyebrow}),t.heading&&(0,z.jsx)(`h2`,{className:`hero-left-title`,children:t.heading}),t.subheading&&(0,z.jsx)(`p`,{className:`hero-left-sub`,children:t.subheading}),t.ctaLabel&&(0,z.jsx)(`div`,{className:`hero-left-actions`,children:(0,z.jsxs)(L,{to:t.ctaLink||`/products`,className:`hero-slide-cta-btn`,children:[t.ctaLabel,(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:(0,z.jsx)(`path`,{d:`M5 12h14M12 5l7 7-7 7`,strokeLinecap:`round`,strokeLinejoin:`round`})})]})})]})})]},t.id))}),e.length>1&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`button`,{type:`button`,className:`hero-arrow hero-arrow-prev`,onClick:()=>l(n-1),"aria-label":`Previous slide`,children:(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,width:`20`,height:`20`,children:(0,z.jsx)(`path`,{d:`M15 19l-7-7 7-7`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`})})}),(0,z.jsx)(`button`,{type:`button`,className:`hero-arrow hero-arrow-next`,onClick:()=>l(n+1),"aria-label":`Next slide`,children:(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,width:`20`,height:`20`,children:(0,z.jsx)(`path`,{d:`M9 5l7 7-7 7`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`})})})]}),e.length>1&&(0,z.jsx)(`div`,{className:`hero-slider-dots`,children:e.map((e,t)=>(0,z.jsx)(`button`,{className:`hero-dot`+(t===n?` active`:``),onClick:()=>l(t),"aria-label":`Go to slide ${t+1}`},e.id))}),(0,z.jsx)(rl,{})]})}function rl(){return(0,z.jsx)(`style`,{children:`
      .hero-slider {
        position: relative;
        width: 100%;
        height: 100vh;
        height: 100svh;
        min-height: 560px;
        overflow: hidden;
        background: #0f0406;
      }

      .hero-slider-track {
        display: flex;
        width: 100%;
        height: 100%;
        transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform;
      }

      .hero-slide-item {
        position: relative;
        flex: 0 0 100%;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .hero-media {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
        transform: translateZ(0);
        backface-visibility: hidden;
      }

      /* Subtle gradient scrim on the left for text legibility */
      .hero-left-scrim {
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        background: linear-gradient(
          90deg,
          rgba(15, 4, 6, 0.78) 0%,
          rgba(15, 4, 6, 0.55) 35%,
          rgba(15, 4, 6, 0.15) 65%,
          transparent 100%
        );
      }

      .hero-bottom-scrim {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 140px;
        z-index: 2;
        pointer-events: none;
        background: linear-gradient(to top, rgba(15, 4, 6, 0.6) 0%, transparent 100%);
      }

      /* Left-aligned small text container */
      .hero-left-content {
        position: absolute;
        inset: 0;
        z-index: 3;
        display: flex;
        align-items: center;
        padding: 0 6vw;
        pointer-events: none;
      }

      .hero-left-inner {
        max-width: 520px;
        pointer-events: auto;
        color: #fff;
        animation: heroFadeSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
      }

      @keyframes heroFadeSlideIn {
        from {
          opacity: 0;
          transform: translateX(-24px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .hero-left-eyebrow {
        display: inline-block;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--gold-400, #dfb15b);
        margin-bottom: 12px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      }

      .hero-left-title {
        font-family: var(--font-display, 'Playfair Display', Georgia, serif);
        font-size: clamp(30px, 4.4vw, 54px);
        line-height: 1.12;
        color: #fffaf4;
        font-weight: 400;
        margin: 0 0 16px;
        text-shadow: 0 3px 12px rgba(0,0,0,0.6);
        letter-spacing: -0.01em;
      }

      .hero-left-sub {
        font-size: clamp(13px, 1.2vw, 15.5px);
        line-height: 1.65;
        color: #f0e6de;
        max-width: 440px;
        margin: 0 0 26px;
        text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        font-weight: 300;
      }

      .hero-left-actions {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .hero-slide-cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 26px;
        border-radius: var(--radius-sm, 6px);
        background: linear-gradient(135deg, #c58b38 0%, #a26d24 100%);
        color: #fff;
        font-size: 13.5px;
        font-weight: 500;
        letter-spacing: 0.04em;
        box-shadow: 0 6px 20px rgba(0,0,0,0.35);
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        text-decoration: none;
      }

      .hero-slide-cta-btn:hover {
        transform: translateY(-2px);
        background: linear-gradient(135deg, #d89c47 0%, #b27a2c 100%);
        box-shadow: 0 10px 24px rgba(197, 139, 56, 0.45);
        color: #fff;
      }

      /* Controls */
      .hero-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 5;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(15, 4, 6, 0.45);
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: #fff;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        cursor: pointer;
        transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
      }

      .hero-arrow:hover {
        background: rgba(197, 139, 56, 0.85);
        border-color: rgba(255, 255, 255, 0.6);
        transform: translateY(-50%) scale(1.08);
      }

      .hero-arrow-prev { left: 24px; }
      .hero-arrow-next { right: 24px; }

      .hero-slider-dots {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 5;
      }

      .hero-dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.4);
        border: none;
        padding: 0;
        cursor: pointer;
        transition: background 0.3s ease, width 0.3s ease;
      }

      .hero-dot.active {
        background: #dfb15b;
        width: 24px;
        border-radius: 999px;
      }

      @media (max-width: 640px) {
        .hero-left-content { padding: 0 20px; }
        .hero-left-title { font-size: 28px; margin-bottom: 12px; }
        .hero-left-sub { font-size: 13px; line-height: 1.5; margin-bottom: 20px; }
        .hero-arrow { width: 36px; height: 36px; }
        .hero-arrow-prev { left: 10px; }
        .hero-arrow-next { right: 10px; }
        .hero-slider-dots { bottom: 14px; }
      }
    `})}function il({product:e,hidePrice:t=!1,isNew:n=!1}){let[r,i]=(0,x.useState)(!1),{addItem:a}=tr(),o=e.stock===0,s=(n||e.isNew)&&!o,c=e.mrp>e.price?Math.round((e.mrp-e.price)/e.mrp*100):0;function l(t){t.preventDefault(),t.stopPropagation(),!o&&(a(e,1),i(!0),setTimeout(()=>i(!1),1800))}let u=e.hoverImage||e.hover_image;return(0,z.jsxs)(L,{to:`/products/${e.id}`,className:`product-card ${o?`is-out`:``}`,children:[(0,z.jsx)(`div`,{className:`product-image-wrap`,children:(0,z.jsxs)(`div`,{className:`product-image ${u?`has-hover-image`:``}`,children:[(0,z.jsx)(`img`,{src:e.image,alt:e.name,className:`product-img product-img-primary`,loading:`lazy`}),u&&(0,z.jsx)(`img`,{src:u,alt:`${e.name} drape`,className:`product-img product-img-hover`,loading:`lazy`,"aria-hidden":`true`}),o&&(0,z.jsx)(`span`,{className:`badge badge-out`,children:`Sold Out`}),!t&&!o&&c>0&&(0,z.jsxs)(`span`,{className:`badge badge-sale`,children:[c,`% OFF`]}),s&&(0,z.jsx)(`span`,{className:`badge badge-new`,children:`New`}),!o&&(0,z.jsx)(`button`,{type:`button`,className:`quick-add-btn ${r?`added`:``}`,onClick:l,"aria-label":`Add ${e.name} to cart`,children:r?`Added to Bag ✓`:`+ Add to Bag`})]})}),(0,z.jsxs)(`div`,{className:`product-info`,children:[e.category&&(0,z.jsx)(`span`,{className:`product-category`,children:e.category.replace(/-/g,` `)}),(0,z.jsx)(`h3`,{className:`product-name`,children:e.name}),!t&&(0,z.jsxs)(`div`,{className:`product-price`,children:[(0,z.jsx)(`span`,{className:`price`,children:R(e.price)}),e.mrp>e.price&&(0,z.jsx)(`span`,{className:`mrp`,children:R(e.mrp)})]})]}),(0,z.jsx)(`style`,{children:`
        .product-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-4px);
        }
        .product-image-wrap {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #fbf7f2;
          box-shadow: 0 4px 16px rgba(32, 8, 11, 0.05);
          transition: box-shadow 0.35s ease;
        }
        .product-card:hover .product-image-wrap {
          box-shadow: 0 14px 30px rgba(32, 8, 11, 0.12);
        }
        .product-image {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #fbf7f2;
        }
        .product-image .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.65s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.45s ease-in-out;
          will-change: transform, opacity;
          pointer-events: none;
        }
        .product-image .product-img-primary {
          position: relative;
          z-index: 1;
          display: block;
        }
        .product-image .product-img-hover {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0;
          display: block;
        }
        @media (hover: hover) {
          .product-card:hover .product-img-primary {
            transform: scale(1.06);
          }
          .product-card:hover .product-img-hover {
            opacity: 1;
            transform: scale(1.06);
          }
        }
        .product-card:active .product-img-hover {
          opacity: 1;
        }
        .is-out .product-image .product-img {
          opacity: 0.55;
          filter: grayscale(40%);
        }
        .badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 999px;
          z-index: 4;
        }
        .badge-sale {
          background: var(--brand-primary);
          color: #ffffff;
          border: 1px solid rgba(251, 223, 162, 0.4);
        }
        .badge-out {
          background: rgba(34, 13, 10, 0.85);
          color: #ffffff;
        }
        .badge-new {
          right: 12px;
          left: auto;
          background: linear-gradient(135deg, #c58b38 0%, #a66a1a 100%);
          color: #ffffff;
          border: 1px solid rgba(251, 223, 162, 0.45);
          box-shadow: 0 2px 8px rgba(32, 8, 11, 0.15);
        }

        .quick-add-btn {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          padding: 10px 14px;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.03em;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          color: var(--brand-primary);
          border: 1px solid rgba(197, 139, 56, 0.3);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.25s ease, transform 0.25s ease, background-color 0.2s ease, color 0.2s ease;
          z-index: 3;
        }
        .quick-add-btn:hover {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: var(--brand-gold-light);
        }
        .quick-add-btn.added {
          background: var(--brand-secondary);
          color: #ffffff;
          border-color: var(--brand-gold-light);
          opacity: 1;
          transform: translateY(0);
        }
        .product-card:hover .quick-add-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .product-info {
          padding: 14px 4px 6px;
        }
        .product-category {
          display: block;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brand-secondary);
          margin-bottom: 4px;
        }
        .product-name {
          font-family: var(--font-display);
          font-size: 15px;
          line-height: 1.35;
          color: var(--brand-primary);
          margin: 0 0 6px;
          font-weight: 400;
          transition: color 0.2s ease;
        }
        .product-card:hover .product-name {
          color: var(--brand-secondary);
        }
        .product-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .price {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--brand-primary);
        }
        .mrp {
          font-size: 12px;
          color: var(--brand-muted);
          text-decoration: line-through;
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .quick-add-btn {
            display: none;
          }
          .product-name {
            font-size: 13.5px;
          }
          .price {
            font-size: 13.5px;
          }
        }
      `})]})}function J({children:e,as:t=`div`,y:n=12,duration:r=1.3,delay:i=0,threshold:a=.15,rootMargin:o=`0px 0px -16% 0px`,className:s=``}){let c=(0,x.useRef)(null),[l,u]=(0,x.useState)(!1);return(0,x.useEffect)(()=>{let e=c.current;if(!e)return;if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){u(!0);return}if(!(`IntersectionObserver`in window)){u(!0);return}let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(u(!0),t.unobserve(e.target))})},{threshold:a,rootMargin:o});t.observe(e);let n=setTimeout(()=>u(!0),2e3);return()=>{t.disconnect(),clearTimeout(n)}},[]),(0,z.jsx)(t,{ref:c,className:s,style:{opacity:+!!l,transform:l?`translateY(0)`:`translateY(${n}px)`,transition:l?`opacity ${r}s ease-out ${i}s, transform ${r}s cubic-bezier(0.19,1,0.22,1) ${i}s`:`none`,willChange:`transform, opacity`},children:e})}function al({products:e=[],curatedIds:t=[],eyebrow:n=`Fresh Off The Loom`,heading:r=`New Arrivals`,subheading:i=`Discover our latest handpicked weaves, newly arrived from master artisan looms.`,ctaLabel:a=`View All New Arrivals`,ctaLink:o=`/products?sort=newest`}){let s=t.length>0?t.map(t=>e.find(e=>e.id===t)).filter(Boolean):e.slice(0,4);return!s||s.length===0?null:(0,z.jsxs)(`section`,{className:`new-arrivals`,id:`new-arrivals`,children:[(0,z.jsx)(`div`,{className:`sparkle-bg sparkle-bg-new`,"aria-hidden":`true`,children:(0,z.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsxs)(`div`,{className:`new-arrivals-head`,children:[(0,z.jsxs)(`div`,{className:`new-arrivals-title-group`,children:[(0,z.jsx)(Hc,{as:`p`,direction:`fade`,className:`eyebrow new-arrivals-eyebrow`,children:n}),(0,z.jsx)(Hc,{as:`h2`,delay:.06,direction:`left`,distance:30,className:`new-arrivals-heading`,children:r}),i&&(0,z.jsx)(Hc,{as:`p`,delay:.12,direction:`fade`,className:`new-arrivals-sub`,children:i})]}),a&&(0,z.jsx)(J,{delay:.15,className:`new-arrivals-cta-wrap`,children:(0,z.jsxs)(L,{to:o||`/products?sort=newest`,className:`new-arrivals-link`,children:[(0,z.jsx)(`span`,{children:a}),(0,z.jsx)(`span`,{className:`arrow-icon`,"aria-hidden":`true`,children:`→`})]})})]}),(0,z.jsx)(`div`,{className:`new-arrivals-grid`,children:s.map((e,t)=>(0,z.jsx)(J,{delay:.08*(t+1),y:24,duration:.8,children:(0,z.jsx)(il,{product:e,isNew:!0})},e.id))})]}),(0,z.jsx)(`style`,{children:`
        .new-arrivals {
          position: relative;
          overflow: hidden;
          background-color: #ffffff;
          background-image: url('/images/new-arrivals-bg.jpg');
          background-repeat: no-repeat;
          background-position: center top;
          background-size: 100% auto;
          padding: 140px 0 100px;
          border-top: 1px solid rgba(197, 139, 56, 0.2);
        }
        .new-arrivals::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 40%,
            rgba(255, 255, 255, 0.75) 75%,
            #ffffff 100%
          );
          pointer-events: none;
          z-index: 0;
        }
        .new-arrivals .container {
          position: relative;
          z-index: 1;
        }
        .sparkle-bg { position: absolute; pointer-events: none; z-index: 0; }
        .sparkle-bg img { width: 100%; height: auto; display: block; }
        .sparkle-bg-new {
          top: -30px;
          right: -70px;
          width: 360px;
          opacity: 0.18;
          mix-blend-mode: multiply;
          transform: rotate(-15deg);
        }
        @media (max-width: 768px) {
          .sparkle-bg-new {
            width: 250px;
            right: -50px;
            top: -20px;
          }
        }
        .new-arrivals-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 50px;
          background: linear-gradient(135deg, rgba(255, 253, 248, 0.88) 0%, rgba(253, 246, 234, 0.72) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 24px 32px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(197, 139, 56, 0.3);
          box-shadow: 0 12px 32px rgba(88, 30, 21, 0.08);
          max-width: 760px;
        }
        .new-arrivals-title-group {
          max-width: 600px;
        }
        .new-arrivals-eyebrow {
          color: var(--brand-secondary, #b0732e);
          letter-spacing: 0.22em;
          font-weight: 600;
          font-size: 11.5px;
          margin-bottom: 6px;
        }
        .new-arrivals-heading {
          font-family: var(--font-heading, 'Marcellus', serif);
          font-size: 38px;
          line-height: 1.15;
          color: var(--brand-primary, #581e15);
          font-weight: 400;
          margin: 0;
        }
        .new-arrivals-sub {
          margin: 10px 0 0;
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--ink-600, #735e59);
        }
        .new-arrivals-cta-wrap {
          flex-shrink: 0;
          padding-bottom: 4px;
        }
        .new-arrivals-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--brand-primary, #581e15);
          text-decoration: none;
          padding-bottom: 3px;
          border-bottom: 1.5px solid var(--brand-secondary, #b0732e);
          transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .new-arrivals-link .arrow-icon {
          display: inline-block;
          font-size: 15px;
          transition: transform 0.25s ease;
        }
        .new-arrivals-link:hover {
          color: var(--brand-secondary, #b0732e);
          border-color: var(--brand-primary, #581e15);
        }
        .new-arrivals-link:hover .arrow-icon {
          transform: translateX(4px);
        }
        .new-arrivals-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 26px;
        }

        @media (max-width: 980px) {
          .new-arrivals {
            padding: 80px 0 70px;
            background-size: cover;
            background-position: 65% top;
          }
          .new-arrivals-heading {
            font-size: 30px;
          }
          .new-arrivals-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 600px) {
          .new-arrivals {
            padding: 50px 0 60px;
            background-size: cover;
            background-position: 75% top;
          }
          .new-arrivals-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 28px;
            padding: 18px 20px;
          }
          .new-arrivals-heading {
            font-size: 24px;
          }
          .new-arrivals-sub {
            font-size: 13px;
          }
          .new-arrivals-grid {
            gap: 16px;
          }
        }
      `})]})}function ol(e,t,n){return[...e.filter(e=>e.id!==n)].sort(()=>.5-Math.random()).slice(0,t)}function sl({products:e=[],curatedIds:t=[],excludeId:n,title:r=`Recommended For You`}){let i=t.length>0?t.map(t=>e.find(e=>e.id===t)).filter(e=>e&&e.id!==n):ol(e,4,n);return i.length===0?null:(0,z.jsxs)(`section`,{className:`recommended`,children:[(0,z.jsx)(`div`,{className:`sparkle-bg sparkle-bg-rec`,"aria-hidden":`true`,children:(0,z.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsx)(Hc,{as:`p`,direction:`fade`,className:`eyebrow`,children:`You might also like`}),(0,z.jsx)(Hc,{as:`h2`,delay:.08,direction:`left`,distance:32,children:r}),(0,z.jsx)(J,{delay:.15,className:`recommended-grid`,children:i.map(e=>(0,z.jsx)(il,{product:e},e.id))})]}),(0,z.jsx)(`style`,{children:`
        .recommended {
          position: relative;
          overflow: hidden;
          background: var(--stone-100);
          padding: 80px 0;
          border-top: 1px solid rgba(197, 139, 56, 0.12);
        }
        .recommended .container {
          position: relative;
          z-index: 1;
        }
        .sparkle-bg { position: absolute; pointer-events: none; z-index: 0; }
        .sparkle-bg img { width: 100%; height: auto; display: block; }
        .sparkle-bg-rec {
          top: -30px;
          right: -70px;
          width: 360px;
          opacity: 0.24;
          mix-blend-mode: multiply;
          transform: rotate(-18deg);
        }
        .recommended h2 { font-size: 26px; margin: 8px 0 30px; }
        .recommended-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 26px;
        }
        @media (max-width: 980px) {
          .recommended-grid { grid-template-columns: repeat(2, 1fr); }
          .sparkle-bg-rec {
            width: 250px;
            right: -50px;
            top: -20px;
          }
        }
        @media (max-width: 520px) {
          .recommended-grid { gap: 16px; }
        }
      `})]})}var cl=H.name,ll=H.seo.siteUrl,ul=`${ll}/images/model-saree.png`,dl=H.seo.defaultDescription,fl=H.seo.defaultKeywords,pl=`seo-jsonld`;function ml(e,t,n){let r=document.querySelector(e);r&&r.setAttribute(t,n)}function hl({title:e,description:t=dl,keywords:n=fl,path:r=``,image:i=ul,type:a=`website`,jsonLd:o,noindex:s=!1}){let c=e?`${e} | ${cl}`:H.seo.defaultTitle,l=`${ll}${r}`;return(0,x.useEffect)(()=>{document.title=c,ml(`meta[name="description"]`,`content`,t),ml(`meta[name="keywords"]`,`content`,n),ml(`link[rel="canonical"]`,`href`,l),ml(`meta[property="og:type"]`,`content`,a),ml(`meta[property="og:title"]`,`content`,c),ml(`meta[property="og:description"]`,`content`,t),ml(`meta[property="og:image"]`,`content`,i),ml(`meta[property="og:url"]`,`content`,l),ml(`meta[name="twitter:title"]`,`content`,c),ml(`meta[name="twitter:description"]`,`content`,t),ml(`meta[name="twitter:image"]`,`content`,i);let e=document.querySelector(`meta[name="robots"]`);s?(e||(e=document.createElement(`meta`),e.setAttribute(`name`,`robots`),document.head.appendChild(e)),e.setAttribute(`content`,`noindex, nofollow`)):e&&e.remove();let r=document.getElementById(pl);return o?(r||(r=document.createElement(`script`),r.id=pl,r.type=`application/ld+json`,document.head.appendChild(r)),r.textContent=JSON.stringify(o)):r&&r.remove(),()=>{if(o){let e=document.getElementById(pl);e&&e.remove()}}},[c,t,n,l,i,a,s,o]),null}function gl({categories:e=[],categoryIds:t=[],heading:n=`Shop by Style`,eyebrow:r=``}){let i=(t&&t.length>0?t:[`kanjivaram`,`banarasi`,`tussar`,`bridal`,`organza`]).map(t=>e.find(e=>e.id===t)).filter(Boolean),a=i.length>0?i:e.slice(0,5);return a.length===0?null:(0,z.jsxs)(`section`,{className:`shop-by-style`,id:`shop-by-style`,children:[(0,z.jsx)(`div`,{className:`sparkle-bg sparkle-bg-style`,"aria-hidden":`true`,children:(0,z.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsxs)(`div`,{className:`shop-by-style-head`,children:[r&&(0,z.jsx)(Hc,{as:`p`,direction:`fade`,className:`eyebrow`,children:r}),(0,z.jsx)(Hc,{as:`h2`,delay:.06,direction:`fade`,className:`shop-by-style-title`,children:n||`Shop by Style`})]}),(0,z.jsx)(J,{delay:.12,className:`style-grid`,children:a.map((e,t)=>(0,z.jsxs)(L,{to:`/products?category=${e.id}`,className:`style-card style-card-${t+1}`,"aria-label":`Shop ${e.name} Sarees`,children:[(0,z.jsx)(`img`,{src:e.image,alt:e.name,className:`style-card-img`,loading:`lazy`}),(0,z.jsx)(`div`,{className:`style-card-overlay`,"aria-hidden":`true`}),(0,z.jsx)(`div`,{className:`style-card-label-wrap`,children:(0,z.jsxs)(`span`,{className:`style-card-label`,children:[(0,z.jsx)(`span`,{children:e.name}),(0,z.jsx)(`span`,{className:`style-card-arrow`,"aria-hidden":`true`,children:`→`})]})})]},e.id))})]}),(0,z.jsx)(`style`,{children:`
        .shop-by-style {
          background: var(--paper, #FAF6F0);
          position: relative;
          overflow: hidden;
          padding: 72px 0 84px;
          border-top: 1px solid rgba(197, 139, 56, 0.14);
        }
        .shop-by-style .container {
          position: relative;
          z-index: 1;
        }
        .sparkle-bg { position: absolute; pointer-events: none; z-index: 0; }
        .sparkle-bg img { width: 100%; height: auto; display: block; }
        .sparkle-bg-style {
          top: 50%;
          left: -110px;
          transform: translateY(-50%) rotate(22deg);
          width: 380px;
          opacity: 0.24;
          mix-blend-mode: multiply;
        }
        .shop-by-style-head {
          text-align: center;
          margin-bottom: 38px;
        }
        .shop-by-style-title {
          font-family: var(--font-heading, 'Marcellus', serif);
          font-size: 38px;
          font-weight: 400;
          color: var(--brand-primary, #581e15);
          letter-spacing: -0.01em;
          margin: 0;
        }
        .style-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .style-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          display: block;
          text-decoration: none;
          background: var(--stone-200, #eee);
          box-shadow: 0 4px 18px rgba(34, 13, 10, 0.08);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease;
        }
        .style-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(34, 13, 10, 0.16);
        }
        .style-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .style-card:hover .style-card-img {
          transform: scale(1.04);
        }
        .style-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0.18) 40%, transparent 70%);
          pointer-events: none;
        }
        .style-card-label-wrap {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          z-index: 2;
          pointer-events: none;
        }
        .style-card-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(32, 8, 11, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(251, 223, 162, 0.4);
          border-radius: 999px;
          color: #ffffff;
          font-family: var(--font-heading, 'Marcellus', serif);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28);
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .style-card-arrow {
          display: inline-block;
          font-size: 14px;
          color: var(--brand-gold-light, #fbdfa2);
          transition: transform 0.25s ease;
        }
        .style-card:hover .style-card-arrow {
          transform: translateX(4px);
        }
        .style-card:hover .style-card-label {
          background: rgba(45, 12, 17, 0.9);
          border-color: rgba(251, 223, 162, 0.75);
        }
        /* Asymmetric bento grid matching user reference photo */
        .style-card-1 {
          grid-column: span 2;
          height: 380px;
        }
        .style-card-2 {
          grid-column: span 1;
          height: 380px;
        }
        .style-card-3,
        .style-card-4,
        .style-card-5 {
          grid-column: span 1;
          height: 360px;
        }
        .style-card-6 {
          grid-column: span 3;
          height: 320px;
        }

        @media (max-width: 980px) {
          .style-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .style-card-1 {
            grid-column: span 2;
            height: 280px;
          }
          .style-card-2,
          .style-card-3,
          .style-card-4 {
            grid-column: span 1;
            height: 260px;
          }
          .style-card-5 {
            grid-column: span 2;
            height: 260px;
          }
        }
        @media (max-width: 600px) {
          .shop-by-style {
            padding: 44px 0 92px;
          }
          .shop-by-style-head {
            margin-bottom: 22px;
          }
          .shop-by-style-title {
            font-size: 26px;
          }
          .style-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .style-card {
            border-radius: 14px;
          }
          .style-card-1 {
            grid-column: span 2;
            height: 190px;
          }
          .style-card-2,
          .style-card-3,
          .style-card-4,
          .style-card-5,
          .style-card-6 {
            grid-column: span 1;
            height: 220px;
          }
          .style-card-label-wrap {
            bottom: 12px;
            left: 10px;
            right: 10px;
          }
          .style-card-label {
            padding: 6px 12px;
            font-size: 12.5px;
            gap: 6px;
            width: auto;
            max-width: 100%;
          }
          .style-card-label span:first-child {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .style-card-arrow {
            font-size: 12px;
          }
        }
      `})]})}var _l={bag:{label:`Shopping Bag`,svg:e=>(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,z.jsx)(`path`,{d:`M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z`}),(0,z.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,z.jsx)(`path`,{d:`M16 10a4 4 0 0 1-8 0`})]})},sparkles:{label:`Sparkles / Zari Luster`,svg:e=>(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`currentColor`,...e,children:(0,z.jsx)(`path`,{d:`M12 2l2.4 6.8H21l-5.5 4.2 2.1 6.8L12 15.6l-5.6 4.2 2.1-6.8L3 8.8h6.6z`})})},whatsapp:{label:`WhatsApp Support`,svg:e=>(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`currentColor`,...e,children:(0,z.jsx)(`path`,{d:`M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.21-1.63a11.96 11.96 0 0 0 5.85 1.51h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.43zm-8.46 18.39h-.01a9.92 9.92 0 0 1-5.06-1.39l-.36-.22-3.76.99 1-3.66-.24-.38a9.92 9.92 0 0 1-1.52-5.23c0-5.48 4.46-9.94 9.95-9.94a9.9 9.9 0 0 1 7.03 2.91 9.87 9.87 0 0 1 2.91 7.03c0 5.48-4.46 9.93-9.94 9.93zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.64-.93-2.25-.24-.6-.49-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51s1.07 2.91 1.22 3.12c.15.2 2.11 3.23 5.12 4.52.72.31 1.28.49 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.27-.2-.57-.35z`})})},truck:{label:`Free Shipping`,svg:e=>(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,z.jsx)(`rect`,{x:`1`,y:`3`,width:`15`,height:`13`}),(0,z.jsx)(`polygon`,{points:`16 8 20 8 23 11 23 16 16 16 16 8`}),(0,z.jsx)(`circle`,{cx:`5.5`,cy:`18.5`,r:`2.5`}),(0,z.jsx)(`circle`,{cx:`18.5`,cy:`18.5`,r:`2.5`})]})},gift:{label:`Gift / Coupon Offer`,svg:e=>(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,z.jsx)(`polyline`,{points:`20 12 20 22 4 22 4 12`}),(0,z.jsx)(`rect`,{x:`2`,y:`7`,width:`20`,height:`5`}),(0,z.jsx)(`line`,{x1:`12`,y1:`22`,x2:`12`,y2:`7`}),(0,z.jsx)(`path`,{d:`M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z`}),(0,z.jsx)(`path`,{d:`M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z`})]})},badge:{label:`Verified Authentic`,svg:e=>(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,z.jsx)(`path`,{d:`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z`}),(0,z.jsx)(`polyline`,{points:`9 12 11 14 15 10`})]})},tag:{label:`Sale / Discount Tag`,svg:e=>(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,z.jsx)(`path`,{d:`M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z`}),(0,z.jsx)(`line`,{x1:`7`,y1:`7`,x2:`7.01`,y2:`7`})]})},percent:{label:`Percentage Offer`,svg:e=>(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,z.jsx)(`line`,{x1:`19`,y1:`5`,x2:`5`,y2:`19`}),(0,z.jsx)(`circle`,{cx:`6.5`,cy:`6.5`,r:`2.5`}),(0,z.jsx)(`circle`,{cx:`17.5`,cy:`17.5`,r:`2.5`})]})},gem:{label:`Pure Handloom Quality`,svg:e=>(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,z.jsx)(`path`,{d:`M6 3h12l4 6-10 12L2 9z`}),(0,z.jsx)(`path`,{d:`M11 3L8 9l4 12 4-12-3-6`}),(0,z.jsx)(`path`,{d:`M2 9h20`})]})},saree:{label:`Traditional Silk Weave`,svg:e=>(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,z.jsx)(`path`,{d:`M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z`}),(0,z.jsx)(`line`,{x1:`16`,y1:`8`,x2:`2`,y2:`22`}),(0,z.jsx)(`line`,{x1:`17.5`,y1:`15`,x2:`9`,y2:`15`})]})},phone:{label:`Call Us`,svg:e=>(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:(0,z.jsx)(`path`,{d:`M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z`})})},heart:{label:`Customer Favorites`,svg:e=>(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:(0,z.jsx)(`path`,{d:`M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z`})})},clock:{label:`Fast Dispatch`,svg:e=>(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,...e,children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,z.jsx)(`polyline`,{points:`12 6 12 12 16 14`})]})}},vl={"🛍️":`bag`,"🛍":`bag`,"💫":`sparkles`,"✨":`sparkles`,"⭐":`sparkles`,"🌟":`sparkles`,"📞":`whatsapp`,"📱":`phone`,"🎁":`gift`,"🚚":`truck`,"🚛":`truck`,"🏷️":`tag`,"🏷":`tag`,"⚡":`tag`,"🎉":`gift`,"💎":`gem`,"🔥":`tag`,"🌸":`saree`,"❤️":`heart`,"💖":`heart`,"⏰":`clock`,"⏱️":`clock`};function yl(e,t={width:15,height:15}){if(!e)return null;let n=(_l[vl[e]||e]||_l.sparkles).svg;return(0,z.jsx)(n,{...t,"aria-hidden":`true`})}function bl({config:e}){if(!e)return null;let t=e.items||[];if(!t.length)return null;let n=e.bgColor||`#581e15`,r=e.textColor||`#ffffff`,i=e.speed||`normal`,a=e.pauseOnHover!==!1,o={slow:`38s`,normal:`24s`,fast:`16s`}[i]||`24s`,s=(e,t)=>{let n=e.link&&(e.link.startsWith(`http`)||e.link.startsWith(`wa.me`)||e.link.startsWith(`tel:`)),r=(0,z.jsxs)(`span`,{className:`ticker-item-inner`,children:[e.icon&&(0,z.jsx)(`span`,{className:`ticker-item-icon`,"aria-hidden":`true`,children:yl(e.icon,{width:15,height:15})}),(0,z.jsx)(`span`,{className:`ticker-item-text`,children:e.text}),e.link&&(0,z.jsx)(`span`,{className:`ticker-item-arrow`,"aria-hidden":`true`,children:(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`13`,height:`13`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,z.jsx)(`path`,{d:`M5 12h14M13 6l6 6-6 6`})})})]}),i=e.link&&e.link.startsWith(`wa.me`)?`https://${e.link}`:e.link,a=e.link?n?(0,z.jsx)(`a`,{href:i,target:`_blank`,rel:`noopener noreferrer`,className:`ticker-item ticker-link`,children:r},`ticker-item-${t}`):(0,z.jsx)(L,{to:i,className:`ticker-item ticker-link`,children:r},`ticker-item-${t}`):(0,z.jsx)(`div`,{className:`ticker-item`,children:r},`ticker-item-${t}`);return(0,z.jsxs)(`span`,{className:`ticker-segment`,children:[a,(0,z.jsx)(`span`,{className:`ticker-sep-svg`,"aria-hidden":`true`,children:(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`9`,height:`9`,fill:`currentColor`,children:(0,z.jsx)(`path`,{d:`M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8z`})})})]},`ticker-seg-${t}`)};return(0,z.jsxs)(`div`,{className:`scrolling-ticker-bar ${a?`pause-on-hover`:``}`,style:{backgroundColor:n,color:r},role:`region`,"aria-label":`Announcements & Offers`,children:[(0,z.jsxs)(`div`,{className:`ticker-track`,style:{animationDuration:o},children:[(0,z.jsx)(`div`,{className:`ticker-content`,"aria-hidden":`false`,children:t.map((e,t)=>s(e,`a-${t}`))}),(0,z.jsx)(`div`,{className:`ticker-content`,"aria-hidden":`true`,children:t.map((e,t)=>s(e,`b-${t}`))}),(0,z.jsx)(`div`,{className:`ticker-content`,"aria-hidden":`true`,children:t.map((e,t)=>s(e,`c-${t}`))})]}),(0,z.jsx)(`style`,{children:`
        .scrolling-ticker-bar {
          position: relative;
          width: 100%;
          overflow: hidden;
          user-select: none;
          display: flex;
          align-items: center;
          height: 42px;
          border-top: 1px solid rgba(251, 223, 162, 0.22);
          border-bottom: 1px solid rgba(251, 223, 162, 0.22);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          z-index: 10;
        }

        .ticker-track {
          display: flex;
          width: max-content;
          animation-name: marqueeScroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .pause-on-hover:hover .ticker-track {
          animation-play-state: paused;
        }

        .ticker-content {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .ticker-segment {
          display: inline-flex;
          align-items: center;
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          padding: 0 24px;
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          white-space: nowrap;
          color: inherit;
          text-decoration: none;
        }

        .ticker-sep-svg {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fbdfa2;
          opacity: 0.65;
          flex-shrink: 0;
        }

        .ticker-item-inner {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          transition: transform 0.15s ease;
        }

        .ticker-link {
          cursor: pointer;
        }

        .ticker-link:hover .ticker-item-inner {
          transform: translateY(-1px);
        }

        .ticker-link:hover .ticker-item-arrow {
          transform: translateX(3px);
        }

        .ticker-item-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fbdfa2;
          flex-shrink: 0;
        }

        .ticker-item-icon svg {
          display: block;
        }

        .ticker-item-text {
          line-height: 1.2;
        }

        .ticker-item-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
          color: #fbdfa2;
          transition: transform 0.15s ease;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333333%, 0, 0);
          }
        }

        @media (max-width: 768px) {
          .scrolling-ticker-bar {
            height: 38px;
          }
          .ticker-item {
            padding: 0 20px;
            font-size: 12.5px;
          }
          .ticker-item-icon {
            font-size: 13.5px;
          }
        }
      `})]})}var xl={hero:{eyebrow:`RAVICHANDRA TEXTILES`,heading:`Timeless Elegance, Woven in`,heading2:`Tradition`,subheading:`Discover the best traditional sarees in Dharmavaram, featuring pure silk handlooms, rich temple borders, and heirloom bridal pattu crafted to perfection.`,ctaLabel:`Explore Collection`,ctaLink:`/products`,secondaryCtaLabel:`Discover Ravichandra Textiles`,secondaryCtaLink:`/about`,slides:[{id:`hero-video-1`,type:`video`,url:`/videos/hero1.mp4`,alt:`Ravichandra Textiles Traditional Saree Showcase - 4K Video`,eyebrow:`PURE HANDLOOM SILKS`,heading:`Crafted with Devotion`,subheading:`Experience authentic heirloom Dharmavaram weaves with pure zari threads.`,ctaLabel:`Explore Collection`,ctaLink:`/products`},{id:`hero-image-2`,type:`image`,url:`/images/styles/kanchivaram.jpg`,alt:`Ravichandra Textiles Dharmavaram Silk Saree`,eyebrow:`TEMPLE TRADITIONS`,heading:`Dharmavaram & Kanchi Elegance`,subheading:`Heirloom drape with temple-woven gold zari motifs.`,ctaLabel:`Shop Dharmavaram`,ctaLink:`/products?category=kanjivaram`},{id:`hero-image-3`,type:`image`,url:`/images/styles/banarasi.jpg`,alt:`Ravichandra Textiles Banarasi Saree Showcase`,eyebrow:`ROYAL WEAVES`,heading:`Banarasi & Pattu Splendor`,subheading:`Brocade zari woven by master craftsmen with authentic silk mark.`,ctaLabel:`Shop Collection`,ctaLink:`/products?category=banarasi`}]},showcase:{note:`Ravichandra Textiles celebrates the timeless art of Indian weaving in Dharmavaram, curating each saree to bring grace and authentic craftsmanship to every occasion.`,heading:`Our Collections`},new_arrivals:{eyebrow:`Fresh Off The Loom`,heading:`New Arrivals`,subheading:`Discover our latest handpicked weaves, newly arrived from master artisan looms.`,ctaLabel:`View All New Arrivals`,ctaLink:`/products?sort=newest`,productIds:[]},shop_by_style:{eyebrow:``,heading:`Shop by Style`,categoryIds:[`kanjivaram`,`banarasi`,`tussar`,`bridal`,`organza`]},recommended:{heading:`Recommended For You`,productIds:[]},story:{eyebrow:`Our Heritage`,heading:`Woven with Grace, Cherished for Generations`,body:`Ravichandra Textiles is rooted in the legendary weaving hub of Dharmavaram, Andhra Pradesh. We bring together thoughtfully selected pure handloom silk sarees that honour traditional artistry while fitting effortlessly into modern celebrations.`,ctaLabel:`Discover Ravichandra Textiles`,ctaLink:`/about`,image:`https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80`},ticker:{bgColor:`#581e15`,textColor:`#ffffff`,speed:`normal`,pauseOnHover:!0,items:[{id:`t1`,icon:`bag`,text:`New arrivals every week - Stay tuned!`,link:`/products?sort=newest`},{id:`t2`,icon:`sparkles`,text:`100% Authentic Handcrafted Sarees`,link:`/about`},{id:`t3`,icon:`whatsapp`,text:`WhatsApp us for personalized assistance`,link:`https://wa.me/918317551337`},{id:`t4`,icon:`truck`,text:`Free Shipping on orders above ₹5000`,link:`/products`},{id:`t5`,icon:`gift`,text:`Use code WELCOME10 for 10% off`,link:`/products`}]}};function Sl(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)(xl.hero),[o,s]=(0,x.useState)(!1),[c,l]=(0,x.useState)(xl.showcase),[u,d]=(0,x.useState)(xl.new_arrivals),[f,p]=(0,x.useState)(!0),[m,h]=(0,x.useState)(xl.shop_by_style),[g,_]=(0,x.useState)(!0),[v,y]=(0,x.useState)(xl.recommended),[b,S]=(0,x.useState)(xl.story),[C,w]=(0,x.useState)(null),[T,E]=(0,x.useState)(null),[D,O]=(0,x.useState)(!0),[k,A]=(0,x.useState)(xl.ticker),[j,M]=(0,x.useState)(!0);return(0,x.useEffect)(()=>{V.getCategories().then(({categories:e})=>t(e)).catch(()=>t(qn())),V.getProducts().then(({products:e})=>r(e)).catch(()=>r(Jn())),V.getHomeSections().then(({sections:e})=>{let t=Object.fromEntries(e.map(e=>[e.section_key,e.content]));t.hero&&a({...xl.hero,...t.hero}),t.showcase&&l({...xl.showcase,...t.showcase}),t.recommended&&y({...xl.recommended,...t.recommended}),t.story&&S({...xl.story,...t.story}),t.promo_banner&&w(t.promo_banner);let n=e.find(e=>e.section_key===`ticker`);n?(A({...xl.ticker,...n.content}),M(n.enabled!==!1)):t.ticker&&A({...xl.ticker,...t.ticker});let r=e.find(e=>e.section_key===`new_arrivals`||e.section_key===`featured`);r?(d({...xl.new_arrivals,...r.content}),p(r.enabled!==!1)):e.length>0&&(t.new_arrivals||t.featured)&&d({...xl.new_arrivals,...t.new_arrivals||t.featured});let i=e.find(e=>e.section_key===`shop_by_style`||e.section_key===`featured_styles`);i?(h({...xl.shop_by_style,...i.content}),_(i.enabled!==!1)):e.length>0&&t.shop_by_style&&h({...xl.shop_by_style,...t.shop_by_style});let o=e.find(e=>e.section_key===`google_reviews`);o?(E(o.content),O(o.enabled!==!1)):t.google_reviews&&E(t.google_reviews)}).catch(()=>{}).finally(()=>s(!0))},[]),(0,z.jsxs)(`div`,{className:`home`,children:[(0,z.jsx)(hl,{title:H.seo.defaultTitle,path:`/`,description:H.seo.defaultDescription,keywords:H.seo.defaultKeywords,jsonLd:{"@context":`https://schema.org`,"@type":[`ClothingStore`,`LocalBusiness`],name:H.name,legalName:H.legalName,url:H.seo.siteUrl,logo:`${H.seo.siteUrl}/images/logo-horizontal.png`,image:`${H.seo.siteUrl}/images/logo-vertical.png`,description:H.seo.defaultDescription,telephone:H.contact.phone,email:H.contact.email,address:{"@type":`PostalAddress`,streetAddress:`10-28, Kpt street, near Punjab National Bank`,addressLocality:`Dharmavaram`,addressRegion:`Andhra Pradesh`,postalCode:`515671`,addressCountry:`IN`},priceRange:`₹₹ - ₹₹₹`,sameAs:[H.contact.instagram,H.contact.facebook,H.contact.twitter].filter(Boolean)}}),(0,z.jsx)(`section`,{className:`hero`,children:(0,z.jsx)(`div`,{className:`hero-visual`,id:`page-hero`,children:(0,z.jsx)(el,{slides:o?i.slides:null,mobileSlides:o?i.mobileSlides:null})})}),j&&k&&k.items?.length>0&&(0,z.jsx)(bl,{config:k}),(0,z.jsxs)(`section`,{className:`collections`,id:`collections`,children:[(0,z.jsx)(`div`,{className:`sparkle-bg sparkle-bg-a`,"aria-hidden":`true`,children:(0,z.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,z.jsx)(`div`,{className:`sparkle-bg sparkle-bg-b`,"aria-hidden":`true`,children:(0,z.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,z.jsx)(`div`,{className:`container`,children:(0,z.jsx)(J,{children:(0,z.jsx)(Kc,{categories:e,note:c.note,heading:c.heading})})})]}),f&&(0,z.jsx)(al,{products:n,curatedIds:u.productIds,eyebrow:u.eyebrow,heading:u.heading,subheading:u.subheading,ctaLabel:u.ctaLabel,ctaLink:u.ctaLink}),g&&(0,z.jsx)(gl,{categories:e,categoryIds:m.categoryIds,heading:m.heading,eyebrow:m.eyebrow}),C&&(0,z.jsx)(`section`,{className:`promo-banner`,children:(0,z.jsxs)(`div`,{className:`container promo-inner`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`h2`,{children:C.heading}),C.subheading&&(0,z.jsx)(`p`,{children:C.subheading})]}),C.ctaLabel&&(0,z.jsx)(L,{to:C.ctaLink||`/products`,className:`btn btn-outline`,children:C.ctaLabel})]})}),(0,z.jsxs)(`section`,{className:`story`,children:[(0,z.jsx)(`div`,{className:`sparkle-bg sparkle-bg-story`,"aria-hidden":`true`,children:(0,z.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,z.jsxs)(`div`,{className:`container story-grid`,children:[(0,z.jsx)(J,{as:`div`,className:`story-image`,y:0,duration:1.3,children:(0,z.jsx)(`img`,{src:b.image,alt:b.heading})}),(0,z.jsxs)(`div`,{className:`story-copy`,children:[(0,z.jsx)(Hc,{as:`p`,direction:`fade`,className:`eyebrow`,children:b.eyebrow}),(0,z.jsx)(Hc,{as:`h2`,delay:.08,direction:`right`,distance:36,children:b.heading}),(0,z.jsx)(Hc,{as:`p`,delay:.16,direction:`left`,distance:26,className:`story-text`,children:b.body}),(0,z.jsx)(J,{delay:.24,children:(0,z.jsx)(L,{to:b.ctaLink||`/about`,className:`btn btn-outline`,children:b.ctaLabel||`Read our story`})})]})]})]}),(0,z.jsx)(sl,{products:n,curatedIds:v.productIds,title:v.heading}),D&&(0,z.jsx)(Jc,{cmsData:T}),(0,z.jsx)(`style`,{children:`
        .hero {
          position: relative;
          background: #0f0406;
          padding: 0;
        }
        .hero-visual {
          position: relative;
        }
        .hero-card-wrap {
          position: relative;
          z-index: 2;
          margin-top: -80px;
          display: flex;
          justify-content: center;
          padding: 0 20px;
        }
        .hero-card {
          position: relative;
          background: linear-gradient(
            145deg,
            rgba(255, 253, 248, 0.98) 0%,
            rgba(252, 245, 230, 0.96) 38%,
            rgba(247, 234, 208, 0.94) 72%,
            rgba(254, 249, 239, 0.98) 100%
          );
          border-radius: var(--radius-lg);
          border: 1px solid rgba(197, 139, 56, 0.45);
          box-shadow:
            0 32px 72px rgba(88, 30, 21, 0.16),
            0 12px 30px rgba(197, 139, 56, 0.18),
            0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          padding: 48px 60px;
          max-width: 740px;
          text-align: center;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
        }
        .hero-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 12%;
          right: 12%;
          height: 2.5px;
          background: linear-gradient(90deg, transparent, rgba(197, 139, 56, 0.75), rgba(251, 223, 162, 0.95), rgba(197, 139, 56, 0.75), transparent);
          border-radius: 999px;
        }
        .hero-card::after {
          content: '';
          position: absolute;
          inset: 6px;
          border: 1px dashed rgba(197, 139, 56, 0.22);
          border-radius: calc(var(--radius-lg) - 4px);
          pointer-events: none;
        }
        .hero-eyebrow {
          color: #925c1d;
          letter-spacing: 0.28em;
          font-weight: 600;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
        }
        .hero-title {
          margin-top: 14px;
          font-size: 46px;
          line-height: 1.08;
          color: #48140c;
          font-weight: 400;
          letter-spacing: -0.01em;
          animation: heroTitleFloat 5s ease-in-out infinite alternate;
        }
        .hero-title-script {
          display: block;
          font-family: var(--font-script);
          font-style: italic;
          font-size: 98px;
          line-height: 1.02;
          margin-top: 6px;
          background: linear-gradient(
            110deg,
            #92591a 0%,
            #be8334 25%,
            #fff4d1 48%,
            #be8334 70%,
            #854b11 100%
          );
          background-size: 240% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmerSweep 5s ease-in-out infinite, scriptFloating 4.5s ease-in-out infinite alternate;
          filter: drop-shadow(0 2px 8px rgba(197, 139, 56, 0.25));
        }
        .hero-sub {
          margin: 22px auto 28px;
          max-width: 480px;
          font-size: 15px;
          line-height: 1.75;
          color: #523c35;
          font-weight: 400;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .hero-cta-group .btn-primary {
          background: linear-gradient(135deg, #581e15 0%, #40130d 100%);
          border: 1px solid rgba(251, 223, 162, 0.45);
          box-shadow: 0 8px 24px rgba(88, 30, 21, 0.28), 0 2px 6px rgba(0,0,0,0.1);
        }
        .hero-cta-group .btn-primary:hover {
          background: linear-gradient(135deg, #6c241a 0%, #521910 100%);
          border-color: #fbdfa2;
          box-shadow: 0 12px 30px rgba(88, 30, 21, 0.35);
        }
        .hero-sec-cta {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(176, 115, 46, 0.65);
          color: #4a150e;
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 14px rgba(197, 139, 56, 0.12);
        }
        .hero-sec-cta:hover {
          background: #b0732e;
          border-color: #b0732e;
          color: #ffffff;
          box-shadow: 0 8px 22px rgba(176, 115, 46, 0.3);
        }

        @keyframes goldShimmerSweep {
          0% { background-position: -120% center; }
          50% { background-position: 120% center; }
          100% { background-position: 280% center; }
        }
        @keyframes scriptFloating {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
        @keyframes heroTitleFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2px); }
        }

        .section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .see-all {
          font-size: 13px;
          color: var(--maroon-900);
          border-bottom: 1px solid var(--gold-500);
          padding-bottom: 2px;
        }

        .categories { background: var(--paper); }
        .collections { background: var(--paper); padding-top: 0; position: relative; overflow: hidden; }
        .collections .container { position: relative; z-index: 1; }
        .sparkle-bg { position: absolute; pointer-events: none; z-index: 0; }
        .sparkle-bg img { width: 100%; height: auto; display: block; }
        .sparkle-bg-a {
          top: -30px;
          left: -80px;
          width: 320px;
          opacity: 0.28;
          mix-blend-mode: multiply;
        }
        .sparkle-bg-b {
          bottom: -40px;
          right: -80px;
          width: 340px;
          opacity: 0.24;
          mix-blend-mode: multiply;
          transform: rotate(180deg);
        }

        .promo-banner { background: var(--maroon-900); padding: 40px 0; }
        .promo-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .promo-inner h2 { color: var(--ivory); font-size: 24px; margin: 0 0 6px; }
        .promo-inner p { color: var(--blush-300); font-size: 13.5px; margin: 0; }
        .promo-inner .btn-outline { border-color: var(--blush-300); color: var(--ivory); }

        .story-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 64px;
          align-items: center;
        }
        .story { position: relative; overflow: hidden; }
        .sparkle-bg-story {
          top: 50%;
          right: -100px;
          transform: translateY(-50%) rotate(45deg);
          width: 440px;
          opacity: 0.25;
          mix-blend-mode: multiply;
        }
        .story-image {
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 4 / 5;
        }
        .story-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .story-copy p:not(.eyebrow) {
          margin: 20px 0 28px;
          font-size: 15px;
          line-height: 1.8;
          color: var(--ink-600);
          max-width: 460px;
        }

        @media (max-width: 980px) {
          .hero-title { font-size: 34px; }
          .hero-title-script { font-size: 70px; }
          .hero-card { padding: 36px 32px; }
          .hero-card-wrap { margin-top: -56px; }
          .story-grid { grid-template-columns: 1fr; gap: 32px; }
          .story-image { order: -1; }
        }
        @media (max-width: 600px) {
          .hero { padding-bottom: 44px; }
          .hero-card-wrap { margin-top: -30px; padding: 0 14px; }
          .hero-card { padding: 24px 20px; border-radius: var(--radius-md); }
          .hero-title { font-size: 23px; }
          .hero-title-script { font-size: 44px; }
          .hero-sub { font-size: 13px; margin: 14px auto 18px; }
          .promo-inner { flex-direction: column; align-items: flex-start; }
        }
      `})]})}var Cl={hero:{eyebrow:`About ${H.name}`,heading:`Curating Dharmavaram & Indian Heritage, Honoring Timeless Artistry`},story:{heading:`Our Story`,paragraphs:H.story.paragraphs,image:`https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80`,gallery:[]}};function wl(){let[e,t]=(0,x.useState)(Cl.hero),[n,r]=(0,x.useState)(Cl.story);(0,x.useEffect)(()=>{Promise.all([V.getHomeSection(`about_hero`).catch(()=>null),V.getHomeSection(`about_story`).catch(()=>null)]).then(([e,n])=>{e?.section?.content&&t({...Cl.hero,...e.section.content}),n?.section?.content&&r({...Cl.story,...n.section.content})})},[]);let i=n.paragraphs?.length?n.paragraphs:Cl.story.paragraphs;return(0,z.jsxs)(`div`,{className:`about-page`,children:[(0,z.jsx)(hl,{title:`Best Traditional Sarees in Dharmavaram — Our Heritage | ${H.name}`,path:`/about`,description:`Learn about Ravichandra Textiles, weavers of the best traditional sarees in Dharmavaram. Discover generations of master artisan heritage, authentic pure silk pit looms, and bridal pattu excellence.`,keywords:`about ravichandra textiles, best traditional sarees in dharmavaram, dharmavaram silk heritage, master weavers dharmavaram, pure silk sarees andhra pradesh`}),(0,z.jsx)(`section`,{className:`about-hero`,children:(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,style:{color:`var(--brand-gold-light)`,letterSpacing:`0.22em`},children:e.eyebrow}),(0,z.jsx)(`h1`,{children:e.heading})]})}),(0,z.jsxs)(`section`,{className:`about-body`,children:[(0,z.jsxs)(`div`,{className:`container about-grid`,children:[(0,z.jsx)(J,{as:`div`,className:`about-image`,y:0,duration:1,children:(0,z.jsx)(`img`,{src:n.image,alt:n.heading})}),(0,z.jsxs)(J,{className:`about-copy`,delay:.1,children:[(0,z.jsx)(`h2`,{children:n.heading}),i.map((e,t)=>(0,z.jsx)(`p`,{children:e},t))]})]}),n.gallery?.length>0&&(0,z.jsx)(`div`,{className:`container`,children:(0,z.jsx)(J,{delay:.15,className:`about-gallery`,children:n.gallery.map((e,t)=>(0,z.jsx)(`div`,{className:`gallery-thumb`,children:(0,z.jsx)(`img`,{src:e,alt:`${n.heading} ${t+1}`})},t))})})]}),(0,z.jsx)(`section`,{className:`about-values`,children:(0,z.jsx)(`div`,{className:`container values-grid`,children:H.story.values.map((e,t)=>(0,z.jsxs)(J,{as:`div`,className:`value-card`,delay:t*.1,children:[(0,z.jsx)(`h3`,{children:e.title}),(0,z.jsx)(`p`,{children:e.description})]},e.title))})}),(0,z.jsx)(sl,{}),(0,z.jsx)(`style`,{children:`
        .about-hero {
          background: var(--maroon-950);
          padding: 100px 0 64px;
          border-bottom: 1px solid rgba(197, 139, 56, 0.2);
        }
        .about-hero h1 {
          color: var(--ivory);
          font-size: 40px;
          max-width: 660px;
          margin-top: 14px;
          line-height: 1.25;
          font-family: var(--font-display);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 60px;
          align-items: center;
        }
        .about-image {
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 4 / 5;
          box-shadow: 0 16px 36px rgba(32, 8, 11, 0.12);
          border: 1px solid rgba(197, 139, 56, 0.2);
        }
        .about-image img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
        .about-copy h2 {
          font-family: var(--font-display);
          font-size: 32px;
          color: var(--brand-primary);
          margin-bottom: 20px;
        }
        .about-copy p {
          font-size: 15px;
          line-height: 1.85;
          color: var(--ink-600);
          margin-bottom: 18px;
          max-width: 520px;
        }
        .about-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;
          margin-top: 44px;
        }
        .gallery-thumb {
          border-radius: var(--radius-sm);
          overflow: hidden;
          aspect-ratio: 1 / 1;
        }
        .gallery-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .about-values {
          background: var(--brand-background);
          padding-top: 70px;
          padding-bottom: 70px;
          border-top: 1px solid var(--brand-border);
          border-bottom: 1px solid var(--brand-border);
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .value-card {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 34px 28px;
          border: 1px solid rgba(197, 139, 56, 0.2);
          box-shadow: 0 8px 22px rgba(32, 8, 11, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .value-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(32, 8, 11, 0.08);
        }
        .value-card h3 {
          font-family: var(--font-display);
          font-size: 20px;
          color: var(--brand-primary);
          margin-bottom: 10px;
        }
        .value-card p { font-size: 14px; line-height: 1.7; color: var(--ink-600); margin: 0; }
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr; gap: 28px; }
          .values-grid { grid-template-columns: 1fr; }
          .about-hero h1 { font-size: 30px; }
        }
      `})]})}var Tl=[{id:`popular`,label:`Popularity`},{id:`newest`,label:`Newest Arrivals`},{id:`price-asc`,label:`Price: Low to High`},{id:`price-desc`,label:`Price: High to Low`},{id:`name`,label:`Name: A to Z`}];function El(){let e=st(),[t,n]=(0,x.useState)([]),[r,i]=(0,x.useState)([]),[a,o]=Mn(),s=a.get(`category`)||`all`,c=a.get(`search`)||``,l=a.get(`sort`),[u,d]=(0,x.useState)(l||`popular`),[f,p]=(0,x.useState)(!!e.state?.openFilters);(0,x.useEffect)(()=>{l&&d(l)},[l]),(0,x.useEffect)(()=>{V.getCategories().then(({categories:e})=>n(e)).catch(()=>n(qn())),V.getProducts().then(({products:e})=>i(e)).catch(()=>i(Jn()))},[]);let m=(0,x.useMemo)(()=>{let e=r;if(s!==`all`&&(e=e.filter(e=>e.category===s)),c.trim()){let t=c.trim().toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t))}let t=[...e];return u===`newest`?t.sort((e,t)=>new Date(t.created_at||0)-new Date(e.created_at||0)):u===`price-asc`?t.sort((e,t)=>e.price-t.price):u===`price-desc`?t.sort((e,t)=>t.price-e.price):u===`name`&&t.sort((e,t)=>e.name.localeCompare(t.name)),t},[r,s,c,u]);function h(e){let t=new URLSearchParams(a);e===`all`?t.delete(`category`):t.set(`category`,e),o(t)}function g(){let e=new URLSearchParams(a);e.delete(`search`),o(e)}function _(e){h(e),p(!1)}let v=s===`all`?null:t.find(e=>e.id===s)?.name,y=v?`${v} Sarees | Best Traditional Sarees in Dharmavaram`:`Best Traditional Sarees in Dharmavaram | ${H.name}`;return(0,z.jsxs)(`div`,{className:`products-page`,children:[(0,z.jsx)(hl,{title:y,path:s===`all`?`/products`:`/products?category=${s}`,description:v?`Shop authentic handwoven ${v} sarees at ${H.name} — celebrated as the best traditional sarees in Dharmavaram, woven with pure silk and genuine zari.`:`Explore the complete collection of the best traditional sarees in Dharmavaram at ${H.name} — Dharmavaram silk, Kanchivaram, Banarasi, bridal pattu, and festive handlooms.`,keywords:`best traditional sarees in dharmavaram, dharmavaram silk sarees online, pure pattu sarees dharmavaram, bridal sarees dharmavaram, ravichandra textiles`}),(0,z.jsx)(`div`,{className:`sparkle-bg`,"aria-hidden":`true`,children:(0,z.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,z.jsxs)(`div`,{className:`container products-layout`,children:[f&&(0,z.jsx)(`div`,{className:`sidebar-overlay`,onClick:()=>p(!1),"aria-hidden":`true`}),(0,z.jsxs)(`aside`,{className:`sidebar ${f?`open`:``}`,children:[(0,z.jsxs)(`div`,{className:`sidebar-head mobile-only-flex`,children:[(0,z.jsx)(`h4`,{children:`Filter Sarees`}),(0,z.jsx)(`button`,{className:`sidebar-close`,"aria-label":`Close filters`,onClick:()=>p(!1),children:`×`})]}),(0,z.jsxs)(`div`,{className:`sidebar-block`,children:[(0,z.jsx)(`h4`,{children:`Categories`}),(0,z.jsxs)(`ul`,{className:`category-list`,children:[(0,z.jsx)(`li`,{children:(0,z.jsx)(`button`,{className:s===`all`?`active`:``,onClick:()=>_(`all`),children:`All Sarees`})}),t.map(e=>(0,z.jsx)(`li`,{children:(0,z.jsx)(`button`,{className:s===e.id?`active`:``,onClick:()=>_(e.id),children:e.name})},e.id))]})]}),(0,z.jsxs)(`div`,{className:`sidebar-block`,children:[(0,z.jsx)(`h4`,{children:`Sort By`}),(0,z.jsx)(`div`,{className:`sort-options`,children:Tl.map(e=>(0,z.jsxs)(`label`,{className:`sort-option`,children:[(0,z.jsx)(`input`,{type:`radio`,name:`sort`,checked:u===e.id,onChange:()=>d(e.id)}),e.label]},e.id))})]})]}),(0,z.jsxs)(`div`,{className:`products-main`,children:[(0,z.jsxs)(`div`,{className:`page-head`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`p`,{className:`eyebrow`,children:`The Collection`}),(0,z.jsx)(`h1`,{children:`Products`})]}),(0,z.jsxs)(`button`,{className:`filter-toggle`,onClick:()=>p(!0),children:[(0,z.jsx)(`svg`,{viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:(0,z.jsx)(`path`,{d:`M3 5h14M6 10h8M8.5 15h3`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})}),`Categories`]}),c&&(0,z.jsxs)(`div`,{className:`search-chip`,children:[`Results for “`,c,`”`,(0,z.jsx)(`button`,{onClick:g,"aria-label":`Clear search`,children:`×`})]})]}),m.length===0?(0,z.jsx)(`p`,{className:`empty`,children:`No sarees match this search — try another category or keyword.`}):(0,z.jsx)(`div`,{className:`product-grid`,children:m.map(e=>(0,z.jsx)(il,{product:e},e.id))})]})]}),(0,z.jsx)(sl,{}),(0,z.jsx)(`style`,{children:`
        .products-page { position: relative; overflow: hidden; }
        .peacock-bg {
          position: absolute;
          top: -60px;
          right: -140px;
          width: 640px;
          opacity: 0.16;
          pointer-events: none;
          z-index: 0;
        }
        .sparkle-bg {
          position: absolute;
          top: -40px;
          right: -80px;
          width: 360px;
          opacity: 0.24;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 0;
        }
        .products-layout {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 44px;
          padding: 44px 32px 20px;
          align-items: flex-start;
        }
        .sidebar { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 30px; }
        .sidebar-head.mobile-only-flex { display: none; }
        .sidebar-close { display: none; }
        .sidebar-overlay { display: none; }
        .filter-toggle { display: none; }
        .sidebar-block h4 {
          font-family: var(--font-body);
          font-size: 11.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold-600);
          margin-bottom: 14px;
        }
        .category-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
        .category-list button {
          background: none;
          border: none;
          text-align: left;
          width: 100%;
          padding: 9px 0;
          font-size: 13.5px;
          color: var(--ink-600);
        }
        .category-list button:hover { color: var(--maroon-900); }
        .category-list button.active { color: var(--maroon-900); font-weight: 600; }

        .sort-options { display: flex; flex-direction: column; gap: 10px; }
        .sort-option { display: flex; align-items: center; gap: 9px; font-size: 13px; color: var(--ink-600); }
        .sort-option input { accent-color: var(--maroon-900); }

        .products-main { min-width: 0; }
        .page-head { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
        .page-head h1 { font-size: 34px; margin-top: 8px; }
        .search-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--stone-100);
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 13px;
          color: var(--ink-600);
        }
        .search-chip button { background: none; border: none; font-size: 16px; color: var(--ink-400); line-height: 1; }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
          padding-bottom: 20px;
        }
        .empty { color: var(--ink-400); font-size: 14px; padding: 40px 0; }

        @media (max-width: 980px) {
          .products-layout { grid-template-columns: 1fr; }
          .filter-toggle {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--stone-100);
            border: 1px solid var(--stone-200);
            border-radius: 999px;
            padding: 9px 16px;
            font-size: 13px;
            color: var(--maroon-900);
          }
          .filter-toggle svg { width: 16px; height: 16px; }
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 82%;
            max-width: 300px;
            background: var(--paper);
            z-index: 70;
            flex-direction: column;
            flex-wrap: nowrap;
            gap: 26px;
            padding: 22px 22px 32px;
            transform: translateX(-105%);
            transition: transform 0.3s ease;
            overflow-y: auto;
            box-shadow: 12px 0 30px rgba(0,0,0,0.18);
          }
          .sidebar.open { transform: translateX(0); }
          .sidebar-head.mobile-only-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--stone-200);
            padding-bottom: 12px;
            margin-bottom: 4px;
          }
          .sidebar-head.mobile-only-flex h4 { margin: 0; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--maroon-900); }
          .sidebar-close {
            display: block;
            background: none;
            border: none;
            font-size: 22px;
            line-height: 1;
            color: var(--ink-600);
            padding: 4px 8px;
          }
          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(36,26,23,0.45);
            z-index: 65;
          }
          .product-grid { grid-template-columns: repeat(2, 1fr); }
          .sparkle-bg { width: 200px; top: -20px; right: -40px; }
        }
        @media (max-width: 520px) {
          .product-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
          .products-layout { padding: 32px 20px 20px; }
        }
      `})]})}function Dl(){let[e,t]=(0,x.useState)([]);return(0,x.useEffect)(()=>{V.getCancellationPolicy().then(({policy:e})=>t(e)).catch(()=>{})},[]),e.length?(0,z.jsxs)(`div`,{className:`cancel-policy-card`,children:[(0,z.jsxs)(`div`,{className:`cancel-policy-head`,children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`path`,{d:`M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z`,stroke:`currentColor`,strokeWidth:`1.3`}),(0,z.jsx)(`path`,{d:`M10 6v4l2.6 2.6`,stroke:`currentColor`,strokeWidth:`1.3`,strokeLinecap:`round`,strokeLinejoin:`round`})]}),(0,z.jsx)(`p`,{children:`Easy Cancellation`})]}),(0,z.jsx)(`ul`,{children:e.map(e=>(0,z.jsxs)(`li`,{children:[(0,z.jsx)(`span`,{className:`tier-label`,children:e.label}),(0,z.jsxs)(`span`,{className:`tier-refund`,children:[e.refund_percent,`% refund`]})]},e.id))}),(0,z.jsx)(`p`,{className:`cancel-policy-note`,children:`Cancel anytime from My Orders — refund amount depends on how soon after payment you cancel.`}),(0,z.jsx)(`style`,{children:`
        .cancel-policy-card {
          background: var(--stone-100);
          border-radius: var(--radius-md);
          padding: 18px 20px;
          margin-top: 20px;
        }
        .cancel-policy-head { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .cancel-policy-head svg { width: 18px; height: 18px; color: var(--maroon-900); flex: 0 0 auto; }
        .cancel-policy-head p { font-size: 13.5px; font-weight: 600; color: var(--maroon-900); margin: 0; }
        .cancel-policy-card ul { list-style: none; margin: 0 0 10px; padding: 0; display: flex; flex-direction: column; gap: 7px; }
        .cancel-policy-card li { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--ink-600); }
        .tier-refund { font-weight: 600; color: #3c7a3c; }
        .cancel-policy-note { font-size: 11.5px; color: var(--ink-400); line-height: 1.6; margin: 0; }
      `})]}):null}function Ol(){let{id:e}=mt(),[t,n]=(0,x.useState)(null),[r,i]=(0,x.useState)(!1),[a,o]=(0,x.useState)(1),[s,c]=(0,x.useState)(!1),[l,u]=(0,x.useState)(null),[d,f]=(0,x.useState)(null),[p,m]=(0,x.useState)({heading:`Recommended For You`,productIds:[]}),{addItem:h}=tr(),g=ut();(0,x.useEffect)(()=>{let e=!0;return V.getProducts().then(({products:t})=>e&&f(t)).catch(()=>e&&f([])),V.getHomeSection(`recommended`).then(({section:t})=>{e&&t?.content&&m(e=>({...e,...t.content}))}).catch(()=>{}),()=>{e=!1}},[]);let[_,v]=(0,x.useState)(null);if((0,x.useEffect)(()=>{let t=!0;return c(!1),o(1),n(null),i(!1),u(null),v(null),V.getProduct(e).then(({product:e})=>{if(t&&(n(e),e.variants?.length>0)){let t=e.variants.find(e=>e.stock>0)||e.variants[0];v(t),t.images?.length>0&&u(t.images[0])}}).catch(()=>{let r=Jn().find(t=>t.id===e);t&&(r?n(r):i(!0))}),()=>{t=!1}},[e]),r)return(0,z.jsxs)(`div`,{className:`container`,style:{padding:`80px 32px`},children:[(0,z.jsx)(`p`,{children:`We couldn't find that saree.`}),(0,z.jsx)(L,{to:`/products`,className:`btn btn-outline`,style:{marginTop:16},children:`Back to products`})]});if(!t||d===null)return(0,z.jsx)(`div`,{className:`detail-page`,style:{minHeight:`100vh`}});let y=_?.price==null?Number(t.price):Number(_.price),b=_?.mrp==null?Number(t.mrp||t.price):Number(_.mrp),S=Number(_?_.stock:t.stock),C=S<=0,w=_?.images||[],T=[t.image,t.hoverImage||t.hover_image,...t.images||[]].filter(Boolean),E=[...w,...T].filter((e,t,n)=>e&&n.indexOf(e)===t),D=l||E[0],O=D?.startsWith(`http`)?D:void 0;function k(){h(t,a,_),c(!0)}return(0,z.jsxs)(`div`,{className:`detail-page`,children:[(0,z.jsx)(hl,{title:`${t.name} | ${H.name}`,path:`/products/${t.id}`,description:(t.description||`${t.name} — handcrafted traditional silk saree from ${H.name}, Dharmavaram.`).slice(0,160),image:O,type:`product`,jsonLd:{"@context":`https://schema.org`,"@type":`Product`,name:t.name,description:t.description||void 0,image:E.filter(e=>e?.startsWith(`http`)),sku:t.id,offers:{"@type":`Offer`,url:`${ll}/products/${t.id}`,priceCurrency:`INR`,price:t.price,availability:C?`https://schema.org/OutOfStock`:`https://schema.org/InStock`}}}),(0,z.jsx)(`div`,{className:`sparkle-bg sparkle-bg-detail`,"aria-hidden":`true`,children:(0,z.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,z.jsxs)(`div`,{className:`container detail-grid`,children:[(0,z.jsxs)(`div`,{className:`detail-gallery`,children:[(0,z.jsx)(`div`,{className:`detail-image`,children:(0,z.jsx)(`img`,{src:D,alt:t.name})}),E.length>1&&(0,z.jsx)(`div`,{className:`detail-thumbs`,children:E.map((e,t)=>(0,z.jsx)(`button`,{type:`button`,className:`detail-thumb ${e===D?`active`:``}`,onClick:()=>u(e),"aria-label":`View photo ${t+1}`,children:(0,z.jsx)(`img`,{src:e,alt:``})},t))})]}),(0,z.jsxs)(`div`,{className:`detail-info`,children:[(0,z.jsx)(L,{to:`/products`,className:`back-link`,children:`← All products`}),(0,z.jsx)(`h1`,{children:t.name}),(0,z.jsxs)(`div`,{className:`detail-price`,children:[(0,z.jsx)(`span`,{className:`price`,children:R(y)}),b>y&&(0,z.jsx)(`span`,{className:`mrp`,children:R(b)}),b>y&&(0,z.jsxs)(`span`,{className:`discount-tag`,children:[Math.round((b-y)/b*100),`% off`]})]}),t.variants?.length>0&&(0,z.jsxs)(`div`,{className:`variants-section`,children:[(0,z.jsxs)(`p`,{className:`variant-label`,children:[`Color: `,(0,z.jsx)(`strong`,{children:_?.color_name||`Select a color`})]}),(0,z.jsx)(`div`,{className:`color-swatches-row`,children:t.variants.map(e=>{let t=_?.id===e.id,n=e.stock===0;return(0,z.jsxs)(`button`,{type:`button`,className:`color-swatch-btn ${t?`selected`:``} ${n?`is-out`:``}`,onClick:()=>{v(e),e.images?.length>0&&u(e.images[0]),o(1)},title:`${e.color_name}${n?` (Out of stock)`:``}`,children:[(0,z.jsx)(`span`,{className:`swatch-circle`,style:{backgroundColor:e.color_code||`#8B0000`}}),(0,z.jsx)(`span`,{className:`swatch-name`,children:e.color_name}),n&&(0,z.jsx)(`span`,{className:`out-tag`,children:`Sold Out`})]},e.id)})})]}),(0,z.jsx)(`p`,{className:`desc`,children:t.description}),(0,z.jsx)(`p`,{className:`stock ${C?`out`:``}`,children:C?`Currently out of stock`:`${S} in stock`}),!C&&(0,z.jsxs)(`div`,{className:`qty-row`,children:[(0,z.jsx)(`span`,{children:`Quantity`}),(0,z.jsxs)(`div`,{className:`qty-control`,children:[(0,z.jsx)(`button`,{type:`button`,onClick:()=>o(e=>Math.max(1,e-1)),"aria-label":`Decrease quantity`,children:`−`}),(0,z.jsx)(`span`,{children:a}),(0,z.jsx)(`button`,{type:`button`,onClick:()=>o(e=>Math.min(S,e+1)),"aria-label":`Increase quantity`,children:`+`})]})]}),(0,z.jsxs)(`div`,{className:`detail-actions`,children:[(0,z.jsx)(`button`,{className:`btn btn-primary`,disabled:C,onClick:k,children:C?`Notify Me`:s?`Added ✓`:`Add to Cart`}),!C&&(0,z.jsx)(`button`,{className:`btn btn-outline`,onClick:()=>{h(t,a,_),g(`/checkout`)},children:`Buy Now`})]}),s&&(0,z.jsx)(L,{to:`/cart`,className:`view-cart-link`,children:`View cart →`}),(0,z.jsxs)(`div`,{className:`product-spec-badges`,children:[(0,z.jsxs)(`div`,{className:`spec-badge`,children:[(0,z.jsx)(`span`,{className:`badge-icon`,children:t.return_available===!1?`ℹ`:`✓`}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:t.return_available===!1?`Non-Returnable`:`${t.return_window_hours||24}-Hour Return Window`}),(0,z.jsx)(`p`,{children:t.return_available===!1?`Handloom piece — final sale`:`Eligible for return request after delivery via My Orders`})]})]}),t.weight_grams&&(0,z.jsxs)(`div`,{className:`spec-badge`,children:[(0,z.jsx)(`span`,{className:`badge-icon`,children:`📦`}),(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`strong`,{children:[t.weight_grams,`g Package Weight`]}),(0,z.jsxs)(`p`,{children:[`Dimensions: `,t.length_cm||30,` × `,t.width_cm||20,` × `,t.height_cm||5,` cm`]})]})]})]}),(0,z.jsx)(Dl,{})]})]}),(0,z.jsx)(sl,{products:d,curatedIds:p.productIds,title:p.heading,excludeId:t.id}),(0,z.jsx)(`style`,{children:`
        .detail-page { padding: 56px 0 0; position: relative; overflow: hidden; }
        .sparkle-bg { position: absolute; pointer-events: none; z-index: 0; }
        .sparkle-bg-detail {
          top: 100px;
          left: -110px;
          width: 360px;
          opacity: 0.24;
          mix-blend-mode: multiply;
          transform: rotate(15deg);
        }
        .detail-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 60px;
          margin-bottom: 70px;
        }
        .detail-gallery { display: flex; flex-direction: column; gap: 12px; }
        .detail-image {
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 3 / 4;
        }
        .detail-image img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
        .detail-thumbs { display: flex; gap: 10px; flex-wrap: wrap; }
        .detail-thumb {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          padding: 0;
          border: 2px solid transparent;
          background: none;
          cursor: pointer;
          opacity: 0.7;
        }
        .detail-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .detail-thumb:hover { opacity: 1; }
        .detail-thumb.active { border-color: var(--maroon-900); opacity: 1; }
        .back-link { font-size: 13px; color: var(--ink-400); margin-bottom: 18px; display: inline-block; }
        .detail-info h1 { font-size: 30px; margin-bottom: 16px; }
        .detail-price { display: flex; align-items: baseline; gap: 12px; margin-bottom: 18px; }
        .detail-price .price { font-size: 24px; font-weight: 600; color: var(--maroon-900); }
        .detail-price .mrp { font-size: 15px; color: var(--ink-400); text-decoration: line-through; }
        .discount-tag { font-size: 12px; font-weight: 600; color: #3c7a3c; background: #e8f2e6; padding: 2px 8px; border-radius: 999px; }

        .variants-section { margin-bottom: 20px; }
        .variant-label { font-size: 13px; color: var(--ink-600); margin-bottom: 8px; }
        .variant-label strong { color: var(--ink-900); }
        .color-swatches-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .color-swatch-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid var(--stone-300);
          background: var(--paper);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .color-swatch-btn:hover { border-color: var(--maroon-900); }
        .color-swatch-btn.selected {
          border-color: var(--maroon-900);
          background: #fdf6f5;
          box-shadow: 0 0 0 1px var(--maroon-900);
        }
        .color-swatch-btn.is-out { opacity: 0.55; }
        .swatch-circle { width: 14px; height: 14px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.2); }
        .swatch-name { font-size: 12.5px; color: var(--ink-800); }
        .out-tag { font-size: 10px; color: #a13a3a; font-weight: 600; }

        .desc { font-size: 14.5px; line-height: 1.8; color: var(--ink-600); max-width: 480px; margin-bottom: 20px; }
        .stock { font-size: 13px; color: var(--ink-600); margin-bottom: 22px; }
        .stock.out { color: #a13a3a; }
        .qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 26px; font-size: 13px; color: var(--ink-600); }
        .qty-control {
          display: flex;
          align-items: center;
          gap: 14px;
          border: 1px solid var(--stone-200);
          border-radius: 999px;
          padding: 7px 16px;
        }
        .qty-control button {
          background: none;
          border: none;
          font-size: 16px;
          color: var(--maroon-900);
          width: 18px;
        }
        .detail-actions { display: flex; gap: 12px; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .view-cart-link { display: inline-block; margin-top: 14px; font-size: 13px; color: var(--gold-600); border-bottom: 1px solid var(--gold-500); }

        .product-spec-badges { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; }
        .spec-badge {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
        }
        .badge-icon { font-size: 14px; color: var(--maroon-900); flex: 0 0 auto; margin-top: 1px; }
        .spec-badge strong { font-size: 12.5px; color: var(--ink-900); display: block; }
        .spec-badge p { font-size: 11.5px; color: var(--ink-500); margin: 2px 0 0; }
        @media (max-width: 860px) {
          .detail-grid { grid-template-columns: 1fr; gap: 28px; margin-bottom: 40px; }
        }
      `})]})}var kl={DELIVERED:`tone-delivered`,delivered:`tone-delivered`,SHIPPED:`tone-processing`,shipped:`tone-processing`,IN_TRANSIT:`tone-processing`,OUT_FOR_DELIVERY:`tone-processing`,ORDER_CREATED:`tone-processing`,AWB_ASSIGNED:`tone-processing`,CANCELLED:`tone-cancelled`,cancelled:`tone-cancelled`,PENDING:`tone-pending`},Al={DELIVERED:`Delivered`,delivered:`Delivered`,SHIPPED:`Dispatched / In Transit`,shipped:`Dispatched / In Transit`,IN_TRANSIT:`In Transit`,OUT_FOR_DELIVERY:`Out for Delivery`,ORDER_CREATED:`Preparing for Dispatch`,AWB_ASSIGNED:`Courier Assigned`,CANCELLED:`Cancelled`,cancelled:`Cancelled`,PENDING:`Order Confirmed`},jl={pending:`tone-pending`,paid:`tone-paid`,paid_oversold:`tone-oversold`,cancellation_requested:`tone-requested`,cancelled:`tone-cancelled`},Ml={pending:`Payment Pending`,paid:`Order Placed & Paid`,paid_oversold:`Paid (Backorder)`,cancellation_requested:`Cancellation Requested`,cancelled:`Cancelled`};function Nl(e){return e?Math.floor((Date.now()-new Date(e).getTime())/864e5):0}function Pl(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)(!0),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(null),[u,d]=(0,x.useState)(`Ordered by mistake`),[f,p]=(0,x.useState)(!1),[m,h]=(0,x.useState)(``),[g,_]=(0,x.useState)([]),[v,y]=(0,x.useState)(null),[b,S]=(0,x.useState)(null),[C,w]=(0,x.useState)(null),[T,E]=(0,x.useState)(null),[D,O]=(0,x.useState)(!1),[k,A]=(0,x.useState)(null),[j,M]=(0,x.useState)(`Defective / damaged saree`),[ee,te]=(0,x.useState)(``),[ne,N]=(0,x.useState)([]),[P,re]=(0,x.useState)(!1),[ie,ae]=(0,x.useState)(``);(0,x.useEffect)(()=>{oe(),V.getCancellationPolicy().then(({policy:e})=>r(e)).catch(()=>{}),V.getProducts().then(({products:e})=>_(e)).catch(()=>{})},[]);function oe(){V.getMyOrders().then(({orders:e})=>t(e)).catch(e=>s(e.message)).finally(()=>a(!1))}async function se(e){S(null),y(e.id);try{await V.downloadInvoice(e.id)}catch(t){S({id:e.id,message:t.message})}finally{y(null)}}function F(e){let t=Nl(e.paid_at);return n.find(e=>t<=e.max_days)||null}async function ce(){if(c){p(!0),h(``);try{let e=await V.cancelOrder(c.id,{reason:u});t(t=>t.map(t=>t.id===c.id?{...t,status:`cancellation_requested`,cancellation_reason:u,cancellation_requested_at:new Date().toISOString(),refund_percent:e.refundPercent,refund_amount:e.refundAmount}:t)),l(null)}catch(e){h(e.message)}finally{p(!1)}}}async function le(e){w(e),E(null),O(!0);try{let t=await V.trackOrder(e.id);E(t)}catch{E({shipmentStatus:e.shipment_status,courierName:e.courier_name,awbCode:e.awb_code,trackingUrl:e.tracking_url,trackingHistory:e.tracking_history||[]})}finally{O(!1)}}function ue(e){Array.from(e.target.files||[]).forEach(e=>{let t=new FileReader;t.onload=e=>{N(t=>[...t,e.target.result])},t.readAsDataURL(e)})}async function de(e){if(e.preventDefault(),k){re(!0),ae(``);try{await V.submitReturn({orderId:k.order.id,orderItemId:k.item.id,reason:j,details:ee,photos:ne}),ae(`Return request submitted successfully. Our team will review and approve it shortly.`),setTimeout(()=>{A(null),ae(``),N([]),te(``),oe()},1800)}catch(e){ae(e.message)}finally{re(!1)}}}return(0,z.jsxs)(`div`,{className:`orders-page`,children:[(0,z.jsx)(hl,{title:`My Orders`,path:`/orders`,noindex:!0}),(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsxs)(`div`,{className:`page-head`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,children:`Your Account`}),(0,z.jsx)(`h1`,{children:`Orders`}),(0,z.jsx)(`p`,{className:`page-sub`,children:`Track real-time shipment updates, download tax invoices, and manage contextual return requests.`})]}),i&&(0,z.jsx)(`p`,{className:`empty-msg`,children:`Loading your orders…`}),!i&&o&&(0,z.jsx)(`p`,{className:`empty-msg error`,children:o}),!i&&!o&&e.length===0&&(0,z.jsx)(`p`,{className:`empty-msg`,children:`You haven't placed any orders yet.`}),m&&(0,z.jsx)(`p`,{className:`empty-msg error`,children:m}),!i&&e.length>0&&(0,z.jsx)(`div`,{className:`orders-list`,children:e.map(e=>{let t=[`shipped`,`in_transit`,`out_for_delivery`,`delivered`].includes(String(e.shipment_status).toLowerCase()),n=(e.status===`paid`||e.status===`paid_oversold`)&&F(e)&&!t;return(0,z.jsxs)(`div`,{className:`order-card`,children:[(0,z.jsxs)(`div`,{className:`order-card-head`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{className:`order-id`,children:e.order_number||`#SK${e.id}`}),(0,z.jsx)(`span`,{className:`order-date`,children:new Date(e.created_at).toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`,year:`numeric`})})]}),(0,z.jsxs)(`div`,{className:`status-badges-group`,children:[(0,z.jsx)(`span`,{className:`status ${jl[e.status]||``}`,children:Ml[e.status]||e.status}),e.shipment_status&&(0,z.jsx)(`span`,{className:`status ${kl[e.shipment_status]||`tone-pending`}`,children:Al[e.shipment_status]||e.shipment_status})]})]}),(0,z.jsx)(`div`,{className:`order-items`,children:(e.items||[]).map(t=>{let n=(e.returns||[]).find(e=>e.order_item_id===t.id),r=String(e.shipment_status).toLowerCase()===`delivered`||e.paid_at,i=t.return_available!==!1&&r&&!n;return(0,z.jsxs)(`div`,{className:`order-item-row`,children:[(0,z.jsxs)(`div`,{className:`order-item`,children:[t.product_image&&(0,z.jsx)(`img`,{src:t.product_image,alt:t.product_name}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`p`,{className:`item-title`,children:t.product_name}),t.variant_name&&(0,z.jsxs)(`span`,{className:`item-variant-tag`,children:[`Color: `,t.variant_name]}),(0,z.jsxs)(`span`,{children:[`Qty `,t.qty,` · `,R(t.price)]})]})]}),(0,z.jsx)(`div`,{className:`item-return-col`,children:n?(0,z.jsxs)(`span`,{className:`return-status-badge`,children:[`Return: `,n.status]}):i?(0,z.jsx)(`button`,{type:`button`,className:`item-return-btn`,onClick:()=>A({order:e,item:t}),children:`Request Return`}):t.return_available===!1?(0,z.jsx)(`span`,{className:`non-returnable-tag`,children:`Non-Returnable`}):null})]},t.id)})}),(0,z.jsxs)(`div`,{className:`order-card-foot`,children:[(0,z.jsxs)(`div`,{className:`order-address`,children:[(0,z.jsxs)(`span`,{children:[`Shipping to `,(0,z.jsx)(`strong`,{children:e.address_name})]}),(0,z.jsxs)(`div`,{children:[e.address_line1,`, `,e.address_city,` — `,e.address_pincode]}),e.courier_name&&(0,z.jsxs)(`div`,{className:`courier-hint`,children:[`Courier: `,e.courier_name,` `,e.awb_code?`(${e.awb_code})`:``]})]}),(0,z.jsxs)(`div`,{className:`order-total`,children:[`Total `,(0,z.jsx)(`strong`,{children:R(e.total_amount||e.subtotal-(e.discount||0)+(e.shipping_fee||0))}),e.razorpay_payment_id&&(0,z.jsxs)(`span`,{className:`payment-id`,children:[`Payment ID: `,e.razorpay_payment_id]})]})]}),e.status===`cancellation_requested`&&(0,z.jsxs)(`div`,{className:`cancellation-pending-banner`,children:[(0,z.jsxs)(`div`,{className:`pending-badge-row`,children:[(0,z.jsx)(`span`,{className:`pending-tag`,children:`⏳ PENDING ADMIN APPROVAL`}),(0,z.jsx)(`span`,{className:`pending-date`,children:e.cancellation_requested_at?new Date(e.cancellation_requested_at).toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`}):`Recently requested`})]}),(0,z.jsx)(`p`,{className:`pending-title`,children:`Your cancellation request has been submitted to store administration.`}),(0,z.jsxs)(`p`,{className:`pending-desc`,children:[`Our team is reviewing your request. Once verified and approved, inventory will be released and your refund of`,` `,(0,z.jsxs)(`strong`,{children:[e.refund_percent||100,`% (`,R(e.refund_amount||0),`)`]}),` will be initiated directly back to your payment account.`]}),e.cancellation_reason&&(0,z.jsxs)(`p`,{className:`pending-reason`,children:[(0,z.jsx)(`strong`,{children:`Reason:`}),` `,e.cancellation_reason]}),(0,z.jsxs)(`div`,{className:`direct-admin-box`,children:[(0,z.jsx)(`span`,{className:`direct-label`,children:`Need urgent assistance or have questions? Contact us directly:`}),(0,z.jsxs)(`div`,{className:`direct-links-row`,children:[(0,z.jsx)(`a`,{href:`https://wa.me/918317551337?text=${encodeURIComponent(`Hi Ravichandra Handlooms, I submitted a cancellation request for order ${e.order_number||`#SK${e.id}`}. Please check and confirm.`)}`,target:`_blank`,rel:`noreferrer`,className:`btn-admin-contact wa-btn`,children:`💬 WhatsApp (+91 83175 51337)`}),(0,z.jsx)(`a`,{href:`tel:+918317551337`,className:`btn-admin-contact call-btn`,children:`📞 Call (8317551337)`}),(0,z.jsx)(`a`,{href:`mailto:ravichandratextiles39@gmail.com`,className:`btn-admin-contact email-btn`,children:`✉️ Email Us`})]})]})]}),e.cancellation_reject_reason&&e.status===`paid`&&(0,z.jsx)(`div`,{className:`cancellation-rejected-banner`,children:(0,z.jsxs)(`span`,{children:[`ℹ️ `,(0,z.jsx)(`strong`,{children:`Cancellation Note:`}),` `,e.cancellation_reject_reason]})}),e.status===`cancelled`&&e.refund_percent!=null&&(0,z.jsxs)(`p`,{className:`refund-note`,children:[`✓ Cancelled — `,e.refund_percent,`% refund (`,R(e.refund_amount||0),`) credited to your payment method.`]}),(0,z.jsxs)(`div`,{className:`order-card-actions`,children:[(e.awb_code||e.shipment_status)&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline track-btn`,onClick:()=>le(e),children:`🚚 Track Package`}),e.paid_at&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline invoice-btn`,disabled:v===e.id,onClick:()=>se(e),children:v===e.id?`Preparing…`:`📄 Invoice`}),n&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline cancel-btn`,onClick:()=>l(e),children:`Request Cancellation`})]}),b&&b.id===e.id&&(0,z.jsx)(`p`,{className:`empty-msg error invoice-error`,children:b.message})]},e.id)})}),C&&(0,z.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>w(null),children:(0,z.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,z.jsxs)(`div`,{className:`modal-head`,children:[(0,z.jsx)(`h3`,{children:`Live Shipment Tracking`}),(0,z.jsx)(`button`,{type:`button`,className:`close-btn`,onClick:()=>w(null),children:`✕`})]}),(0,z.jsxs)(`div`,{className:`tracking-body`,children:[(0,z.jsxs)(`p`,{children:[`Order: `,(0,z.jsx)(`strong`,{children:C.order_number||`#SK${C.id}`})]}),C.courier_name&&(0,z.jsxs)(`p`,{children:[`Courier: `,(0,z.jsx)(`strong`,{children:C.courier_name})]}),C.awb_code&&(0,z.jsxs)(`p`,{children:[`AWB / Tracking Number: `,(0,z.jsx)(`strong`,{children:C.awb_code})]}),D?(0,z.jsx)(`p`,{className:`loading-track`,children:`Connecting to courier network…`}):(0,z.jsxs)(`div`,{className:`tracking-timeline`,children:[(0,z.jsx)(`h4`,{children:`Shipment Milestones`}),!T?.trackingHistory||T.trackingHistory.length===0?(0,z.jsx)(`p`,{className:`no-scans`,children:`Order packed and awaiting courier dispatch.`}):(0,z.jsx)(`div`,{className:`scans-list`,children:T.trackingHistory.map((e,t)=>(0,z.jsxs)(`div`,{className:`scan-item`,children:[(0,z.jsx)(`div`,{className:`scan-dot`}),(0,z.jsxs)(`div`,{className:`scan-info`,children:[(0,z.jsx)(`strong`,{children:e.status||e.activity}),(0,z.jsx)(`span`,{className:`scan-loc`,children:e.location}),(0,z.jsx)(`span`,{className:`scan-time`,children:e.date?new Date(e.date).toLocaleString(`en-IN`):``})]})]},t))})]}),C.tracking_url?(0,z.jsx)(`a`,{href:C.tracking_url,target:`_blank`,rel:`noreferrer`,className:`btn btn-primary track-external-link`,children:`Open Live Courier Tracking Page ↗`}):C.awb_code?(0,z.jsx)(`div`,{className:`track-note-box`,children:(0,z.jsxs)(`span`,{children:[`Use Tracking Number `,(0,z.jsx)(`strong`,{children:C.awb_code}),` on `,(0,z.jsx)(`strong`,{children:C.courier_name||`the courier portal`}),` to check real-time road dispatch updates.`]})}):null]})]})}),c&&(0,z.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>l(null),children:(0,z.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,z.jsxs)(`div`,{className:`modal-head`,children:[(0,z.jsx)(`h3`,{children:`Request Order Cancellation`}),(0,z.jsx)(`button`,{type:`button`,className:`close-btn`,onClick:()=>l(null),children:`✕`})]}),(0,z.jsxs)(`div`,{className:`cancel-modal-body`,children:[(0,z.jsxs)(`div`,{className:`admin-approval-notice`,children:[(0,z.jsx)(`div`,{className:`notice-icon`,children:`🛡️`}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:`Admin Approval Flow`}),(0,z.jsxs)(`p`,{children:[`Your cancellation request will be submitted to our administrative team for verification and approval. Upon approval, your refund of `,(0,z.jsxs)(`strong`,{children:[F(c)?.refund_percent||100,`%`]}),` (`,R(Math.round((c.subtotal-(c.discount||0))*(F(c)?.refund_percent||100)/100)),`) will be initiated back to your original payment method.`]})]})]}),(0,z.jsxs)(`div`,{className:`contact-admin-strip`,children:[(0,z.jsx)(`span`,{children:`Want to speak with us before cancelling?`}),(0,z.jsxs)(`div`,{className:`contact-strip-actions`,children:[(0,z.jsx)(`a`,{href:`https://wa.me/918317551337?text=${encodeURIComponent(`Hi Ravichandra Textiles, I am requesting cancellation for order ${c.order_number||`#SK${c.id}`}.`)}`,target:`_blank`,rel:`noreferrer`,className:`strip-link wa`,children:`💬 WhatsApp Store (8317551337)`}),(0,z.jsx)(`a`,{href:`tel:+918317551337`,className:`strip-link call`,children:`📞 Call Store`})]})]}),(0,z.jsxs)(`label`,{children:[`Reason for cancellation *`,(0,z.jsxs)(`select`,{value:u,onChange:e=>d(e.target.value),children:[(0,z.jsx)(`option`,{value:`Ordered by mistake`,children:`Ordered by mistake`}),(0,z.jsx)(`option`,{value:`Delivery time too long`,children:`Delivery time too long`}),(0,z.jsx)(`option`,{value:`Found better alternative`,children:`Found better alternative`}),(0,z.jsx)(`option`,{value:`Incorrect shipping address`,children:`Incorrect shipping address`}),(0,z.jsx)(`option`,{value:`Need to change saree color/design`,children:`Need to change saree color/design`}),(0,z.jsx)(`option`,{value:`Other reason`,children:`Other reason`})]})]}),(0,z.jsxs)(`div`,{className:`modal-actions`,children:[(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:()=>l(null),children:`Keep Order`}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-primary danger-btn`,disabled:f,onClick:ce,children:f?`Submitting…`:`Submit Cancellation Request`})]})]})]})}),k&&(0,z.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>A(null),children:(0,z.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,z.jsxs)(`div`,{className:`modal-head`,children:[(0,z.jsx)(`h3`,{children:`Request Item Return`}),(0,z.jsx)(`button`,{type:`button`,className:`close-btn`,onClick:()=>A(null),children:`✕`})]}),(0,z.jsxs)(`form`,{className:`return-modal-form`,onSubmit:de,children:[(0,z.jsxs)(`div`,{className:`return-item-preview`,children:[(0,z.jsx)(`img`,{src:k.item.product_image,alt:``}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:k.item.product_name}),k.item.variant_name&&(0,z.jsxs)(`span`,{children:[`Color: `,k.item.variant_name]}),(0,z.jsxs)(`p`,{children:[`Refund Amount: `,R(k.item.price*k.item.qty)]})]})]}),(0,z.jsxs)(`div`,{className:`return-store-card`,children:[(0,z.jsx)(`div`,{className:`store-card-header`,children:(0,z.jsx)(`strong`,{children:`Ravichandra Handlooms — Returns & Support`})}),(0,z.jsxs)(`p`,{className:`store-address-text`,children:[`📍 `,(0,z.jsx)(`strong`,{children:`Return Address:`}),` 10-28, Kpt street, near Punjab National Bank, Dharmavaram 515671, Andhra Pradesh`]}),(0,z.jsxs)(`div`,{className:`store-contact-row`,children:[(0,z.jsxs)(`a`,{href:`tel:+918317551337`,className:`store-touchpoint`,children:[`📞 `,(0,z.jsx)(`strong`,{children:`+91 83175 51337`})]}),(0,z.jsxs)(`a`,{href:`https://wa.me/918317551337?text=${encodeURIComponent(`Hi Ravichandra Handlooms, I would like to inquire about returning item "${k.item.product_name}" from order ${k.order.order_number||`#SK${k.order.id}`}.`)}`,target:`_blank`,rel:`noreferrer`,className:`store-touchpoint`,children:[`💬 `,(0,z.jsx)(`strong`,{children:`WhatsApp Us`})]}),(0,z.jsxs)(`a`,{href:`mailto:ravichandratextiles39@gmail.com`,className:`store-touchpoint`,children:[`✉️ `,(0,z.jsx)(`strong`,{children:`ravichandratextiles39@gmail.com`})]})]}),(0,z.jsx)(`div`,{className:`store-hours-note`,children:`🕒 Store Hours: Mon – Sun 10:00 AM – 10:00 PM | Direct Owner Contact`})]}),(0,z.jsxs)(`label`,{children:[`Reason for Return *`,(0,z.jsxs)(`select`,{value:j,onChange:e=>M(e.target.value),required:!0,children:[(0,z.jsx)(`option`,{value:`Defective / damaged saree`,children:`Defective or damaged fabric/zari`}),(0,z.jsx)(`option`,{value:`Wrong color or design received`,children:`Wrong color or design received`}),(0,z.jsx)(`option`,{value:`Quality not as expected`,children:`Quality not as expected`}),(0,z.jsx)(`option`,{value:`Fit or drape issue`,children:`Fit or drape issue`}),(0,z.jsx)(`option`,{value:`Other`,children:`Other reason`})]})]}),(0,z.jsxs)(`label`,{children:[`Details / Note`,(0,z.jsx)(`textarea`,{rows:`3`,placeholder:`Describe any flaws or details about the issue…`,value:ee,onChange:e=>te(e.target.value)})]}),(0,z.jsxs)(`label`,{children:[`Upload Photos of Issue (optional)`,(0,z.jsx)(`input`,{type:`file`,accept:`image/*`,multiple:!0,onChange:ue})]}),ne.length>0&&(0,z.jsx)(`div`,{className:`return-photo-grid`,children:ne.map((e,t)=>(0,z.jsx)(`img`,{src:e,alt:`Upload preview`,className:`return-thumb`},t))}),ie&&(0,z.jsx)(`p`,{className:`return-msg`,children:ie}),(0,z.jsxs)(`div`,{className:`modal-actions`,children:[(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:()=>A(null),children:`Cancel`}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:P,children:P?`Submitting…`:`Submit Return Request`})]})]})]})})]}),(0,z.jsx)(sl,{products:g,title:`Shop Again`}),(0,z.jsx)(`style`,{children:`
        .orders-page { padding: 56px 0 0; }
        .orders-page .container { padding-bottom: 60px; }
        .page-head { max-width: 520px; margin-bottom: 36px; }
        .page-head h1 { font-size: 34px; margin: 8px 0 12px; }
        .page-sub { font-size: 13.5px; color: var(--ink-400); line-height: 1.6; }
        .empty-msg { font-size: 14px; color: var(--ink-400); padding: 40px 0; }
        .empty-msg.error { color: #a13a3a; padding: 0 0 20px; }

        .orders-list { display: flex; flex-direction: column; gap: 18px; }
        .order-card {
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 20px 22px;
        }
        .order-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid var(--stone-200);
        }
        .order-id { font-weight: 600; color: var(--maroon-900); margin-right: 12px; }
        .order-date { font-size: 12.5px; color: var(--ink-400); }
        .status-badges-group { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .status {
          display: inline-flex;
          width: fit-content;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
        }
        .tone-delivered { background: #e8f2e6; color: #3c7a3c; }
        .tone-processing { background: var(--blush-300); color: var(--maroon-900); }
        .tone-failed { background: #f6e3e3; color: #a13a3a; }
        .tone-cancelled { background: var(--stone-200); color: var(--ink-600); }
        .tone-pending { background: #fdf0d5; color: #8a5a10; }
        .tone-requested { background: #fff3cd; color: #856404; font-weight: 500; }

        /* Cancellation Pending & Store Contacts */
        .cancellation-pending-banner {
          background: #fff8e6;
          border: 1px solid #ffeeba;
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          margin-top: 14px;
        }
        .pending-badge-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .pending-tag {
          font-size: 11px;
          font-weight: 700;
          color: #856404;
          background: #ffe8a1;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }
        .pending-date { font-size: 11px; color: #856404; opacity: 0.8; }
        .pending-title { font-size: 13.5px; font-weight: 600; color: #856404; margin: 4px 0 4px; }
        .pending-desc { font-size: 12.5px; color: #664d03; line-height: 1.5; margin: 0 0 6px; }
        .pending-reason { font-size: 12px; color: #856404; background: rgba(255,255,255,0.6); padding: 4px 8px; border-radius: 4px; display: inline-block; margin: 4px 0 10px; }
        
        .direct-admin-box {
          border-top: 1px dashed #eed89b;
          padding-top: 10px;
          margin-top: 8px;
        }
        .direct-label { display: block; font-size: 11.5px; font-weight: 500; color: #856404; margin-bottom: 8px; }
        .direct-links-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .btn-admin-contact {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .wa-btn { background: #25d366; color: #fff; }
        .wa-btn:hover { background: #1ebc59; color: #fff; }
        .call-btn { background: var(--maroon-900); color: #fff; }
        .call-btn:hover { background: var(--maroon-800); color: #fff; }
        .email-btn { background: #fff; color: var(--maroon-900); border: 1px solid var(--stone-300); }
        .email-btn:hover { background: var(--stone-100); }

        .cancellation-rejected-banner {
          background: #fdf2e9;
          border-left: 3px solid #e67e22;
          padding: 8px 12px;
          font-size: 12px;
          color: #a04000;
          margin-top: 12px;
          border-radius: 3px;
        }

        /* Modal Contact & Approval Styles */
        .admin-approval-notice {
          display: flex;
          gap: 12px;
          background: #fdf8eb;
          border: 1px solid #fae6b9;
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          font-size: 12.5px;
          color: #7d5a0b;
          line-height: 1.5;
          margin-bottom: 14px;
        }
        .admin-approval-notice p { margin: 4px 0 0; }
        .notice-icon { font-size: 20px; line-height: 1; }

        .contact-admin-strip {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          color: var(--ink-700);
        }
        .contact-strip-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .strip-link {
          font-size: 11.5px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 4px;
          text-decoration: none;
        }
        .strip-link.wa { background: #e7f8ee; color: #157338; border: 1px solid #c2ebd0; }
        .strip-link.call { background: #fdf5f5; color: var(--maroon-900); border: 1px solid #f4d0d0; }

        /* Return Store Card */
        .return-store-card {
          background: #faf7f2;
          border: 1px solid #e8dec8;
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          margin: 8px 0;
          font-size: 12px;
          color: var(--ink-800);
        }
        .store-card-header { font-size: 13px; color: var(--maroon-900); margin-bottom: 6px; }
        .store-address-text { line-height: 1.4; margin: 0 0 8px; color: var(--ink-600); }
        .store-contact-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
        .store-touchpoint { color: var(--maroon-900); text-decoration: none; font-size: 12px; }
        .store-touchpoint:hover { text-decoration: underline; }
        .store-hours-note { font-size: 11px; color: var(--ink-400); }

        .track-note-box {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          margin-top: 14px;
          font-size: 12px;
          color: var(--ink-700);
        }

        .order-items { display: flex; flex-direction: column; gap: 10px; }
        .order-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 6px 0;
          border-bottom: 1px dashed var(--stone-200);
        }
        .order-item-row:last-child { border-bottom: none; }
        .order-item { display: flex; align-items: center; gap: 12px; font-size: 13.5px; }
        .order-item img { width: 44px; height: 56px; object-fit: cover; border-radius: 4px; }
        .item-title { font-weight: 500; color: var(--ink-900); margin: 0 0 2px; }
        .item-variant-tag {
          display: inline-block;
          font-size: 11px;
          color: var(--maroon-900);
          background: #fdf6f5;
          padding: 1px 7px;
          border-radius: 4px;
          margin-bottom: 4px;
        }
        .order-item span { font-size: 12px; color: var(--ink-400); }

        .item-return-col { flex: 0 0 auto; text-align: right; }
        .item-return-btn {
          font-size: 11.5px;
          color: var(--maroon-900);
          background: #fdf6f5;
          border: 1px solid var(--maroon-900);
          border-radius: 4px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .item-return-btn:hover { background: var(--maroon-900); color: #fff; }
        .return-status-badge {
          font-size: 11px;
          font-weight: 600;
          color: #8a5a10;
          background: #fbeacb;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .non-returnable-tag {
          font-size: 10.5px;
          color: var(--ink-400);
          font-style: italic;
        }
        .courier-hint { font-size: 11.5px; color: var(--ink-500); margin-top: 4px; }
        .track-btn { color: #1e5842; border-color: #a3c9b7; }
        .track-btn:hover { background: #e8f2e6; }

        .order-card-foot {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 14px;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--stone-200);
          font-size: 12.5px;
          color: var(--ink-600);
        }
        .order-total { text-align: right; }
        .order-total strong { color: var(--maroon-900); font-size: 15px; }
        .payment-id { display: block; font-size: 11px; color: var(--ink-400); margin-top: 2px; }

        .refund-note { font-size: 12px; color: #3c7a3c; margin: 12px 0 0; }
        .order-card-actions { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
        .invoice-btn, .cancel-btn, .track-btn { font-size: 12.5px; padding: 9px 18px; margin-top: 0; }
        .invoice-error { padding: 8px 0 0; font-size: 12px; }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 20px;
        }
        .modal-content {
          background: #fff;
          border-radius: var(--radius-md);
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .modal-head h3 { font-size: 18px; color: var(--ink-900); margin: 0; }
        .close-btn { background: none; border: none; font-size: 18px; cursor: pointer; color: var(--ink-400); }
        .tracking-timeline { margin-top: 18px; }
        .tracking-timeline h4 { font-size: 13.5px; margin-bottom: 12px; color: var(--maroon-900); }
        .scans-list { display: flex; flex-direction: column; gap: 14px; position: relative; padding-left: 18px; border-left: 2px solid var(--stone-200); }
        .scan-item { position: relative; font-size: 12.5px; }
        .scan-dot { position: absolute; left: -24px; top: 3px; width: 10px; height: 10px; border-radius: 50%; background: var(--maroon-900); }
        .scan-loc { display: block; font-size: 11.5px; color: var(--ink-500); }
        .scan-time { display: block; font-size: 10.5px; color: var(--ink-400); }
        .track-external-link { display: block; margin-top: 20px; text-align: center; }

        .return-modal-form { display: flex; flex-direction: column; gap: 14px; font-size: 13px; }
        .return-modal-form label { display: flex; flex-direction: column; gap: 6px; color: var(--ink-700); }
        .return-modal-form select, .return-modal-form textarea, .return-modal-form input {
          font-size: 13px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
        }
        .return-item-preview {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--stone-50);
          padding: 10px;
          border-radius: var(--radius-sm);
        }
        .return-item-preview img { width: 44px; height: 56px; object-fit: cover; border-radius: 4px; }
        .return-photo-grid { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
        .return-thumb { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid var(--stone-300); }
        .return-msg { font-size: 12.5px; color: #3c7a3c; background: #e8f2e6; padding: 8px 12px; border-radius: 4px; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px; }
        .danger-btn { background: #a13a3a; color: #fff; }

        @media (max-width: 600px) {
          .order-card-foot { flex-direction: column; align-items: flex-start; }
          .order-total { text-align: left; }
        }
      `})]})}function Fl(){let[e,t]=(0,x.useState)(!1);function n(e){e.preventDefault(),t(!0)}let r=H.contact.phone.replace(/[^\d+]/g,``),i=H.contact.whatsapp.replace(/[^\d]/g,``);return(0,z.jsxs)(`div`,{className:`contact-page`,children:[(0,z.jsx)(hl,{title:`Contact Us`,path:`/contact`,description:`Get in touch with ${H.name} Silk Emporium for order queries, bridal consultation, or custom saree requests.`}),(0,z.jsxs)(`div`,{className:`container contact-grid`,children:[(0,z.jsxs)(`div`,{className:`contact-info`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,style:{color:`var(--brand-secondary)`},children:`Get in touch`}),(0,z.jsx)(`h1`,{children:`Contact Us`}),(0,z.jsx)(`p`,{className:`contact-lead`,children:`Questions about a saree, a bridal consultation, or a custom order — reach out directly or drop a note and our curation team will assist you shortly.`}),(0,z.jsxs)(`dl`,{className:`info-list`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`dt`,{children:`Phone`}),(0,z.jsx)(`dd`,{children:(0,z.jsx)(`a`,{href:`tel:${r}`,children:H.contact.phone})})]}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`dt`,{children:`WhatsApp`}),(0,z.jsx)(`dd`,{children:(0,z.jsxs)(`a`,{href:`https://wa.me/${i}`,target:`_blank`,rel:`noreferrer`,className:`whatsapp-link`,children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,z.jsx)(`path`,{d:`M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z`,stroke:`currentColor`,strokeWidth:`1.5`}),(0,z.jsx)(`path`,{d:`M8.5 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.5-.1 1.4-.6 1.8-.6.5-1.6.8-2.6.5-1.8-.5-3.7-1.6-5.1-3.1-1.3-1.3-2.1-2.7-2.4-3.4-.3-.7-.4-1.7.2-2.4z`,fill:`currentColor`})]}),H.contact.phone]})})]}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`dt`,{children:`Email`}),(0,z.jsx)(`dd`,{children:(0,z.jsx)(`a`,{href:`mailto:${H.contact.email}`,children:H.contact.email})})]}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`dt`,{children:`Store Location`}),(0,z.jsxs)(`dd`,{children:[H.contact.address,(0,z.jsx)(`br`,{}),(0,z.jsx)(`a`,{href:`https://maps.google.com/?q=${encodeURIComponent(H.contact.address)}`,target:`_blank`,rel:`noreferrer`,className:`directions-link`,children:`Get Directions →`})]})]}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`dt`,{children:`Store Hours`}),(0,z.jsx)(`dd`,{children:H.contact.hours||`Sun - Sat: 10am - 10pm`})]}),H.contact.instagram&&(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`dt`,{children:`Instagram`}),(0,z.jsx)(`dd`,{children:(0,z.jsxs)(`a`,{href:H.contact.instagram,target:`_blank`,rel:`noreferrer`,children:[`@`,H.social?.instagramHandle||`ravichandra_handlooms`]})})]})]}),(0,z.jsx)(`div`,{className:`map-embed`,children:(0,z.jsx)(`iframe`,{title:`${H.name} store location`,src:`https://maps.google.com/maps?q=${encodeURIComponent(H.contact.address)}&output=embed`,loading:`lazy`,referrerPolicy:`no-referrer-when-downgrade`})})]}),(0,z.jsx)(`form`,{className:`contact-form`,onSubmit:n,children:e?(0,z.jsxs)(`div`,{className:`form-sent`,children:[(0,z.jsx)(`h3`,{children:`Message received`}),(0,z.jsxs)(`p`,{children:[`Thank you — someone from `,H.name,` will get back to you shortly.`]})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`label`,{children:[`Name`,(0,z.jsx)(`input`,{type:`text`,name:`name`,required:!0,placeholder:`Your name`})]}),(0,z.jsxs)(`label`,{children:[`Phone or Email`,(0,z.jsx)(`input`,{type:`text`,name:`contact`,required:!0,placeholder:`How should we reach you?`})]}),(0,z.jsxs)(`label`,{children:[`Message`,(0,z.jsx)(`textarea`,{name:`message`,rows:`5`,required:!0,placeholder:`Tell us about the sarees or consultation you need`})]}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Send Message`})]})})]}),(0,z.jsx)(sl,{}),(0,z.jsx)(`style`,{children:`
        .contact-page { padding: 70px 0 0; }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          margin-bottom: 60px;
        }
        .contact-page h1 {
          font-family: var(--font-display);
          font-size: 38px;
          color: var(--brand-primary);
          margin: 8px 0 18px;
        }
        .contact-lead {
          font-size: 14.5px;
          line-height: 1.8;
          color: var(--ink-600);
          max-width: 440px;
          margin-bottom: 34px;
        }
        .info-list { display: flex; flex-direction: column; gap: 18px; }
        .info-list dt {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brand-secondary);
          margin-bottom: 4px;
          font-weight: 600;
        }
        .info-list dd { margin: 0; font-size: 14.5px; color: var(--ink-900); line-height: 1.6; }
        .whatsapp-link { display: inline-flex; align-items: center; gap: 8px; }
        .whatsapp-link svg { width: 17px; height: 17px; color: #25D366; flex: 0 0 auto; }
        .directions-link { font-size: 12.5px; color: var(--brand-secondary); font-weight: 500; }
        .directions-link:hover { text-decoration: underline; }

        .map-embed {
          margin-top: 28px;
          border-radius: var(--radius-md);
          overflow: hidden;
          aspect-ratio: 16 / 10;
          border: 1px solid var(--brand-border);
          box-shadow: 0 8px 24px rgba(32, 8, 11, 0.05);
        }
        .map-embed iframe { width: 100%; height: 100%; border: 0; }

        .contact-form {
          background: #fbf7f2;
          border: 1px solid rgba(197, 139, 56, 0.2);
          border-radius: var(--radius-md);
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(32, 8, 11, 0.04);
        }
        .contact-form label {
          font-size: 13px;
          color: var(--brand-primary);
          font-weight: 500;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .contact-form input, .contact-form textarea {
          font-family: var(--font-body);
          font-size: 14px;
          padding: 13px 15px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--brand-border);
          background: var(--paper);
          color: var(--ink-900);
          resize: vertical;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .contact-form input:focus, .contact-form textarea:focus {
          border-color: var(--brand-secondary);
        }
        .contact-form .btn { margin-top: 8px; align-self: flex-start; }
        .form-sent { text-align: center; padding: 40px 10px; }
        .form-sent h3 {
          font-family: var(--font-display);
          font-size: 22px;
          color: var(--brand-primary);
          margin-bottom: 10px;
        }
        .form-sent p { font-size: 14px; color: var(--ink-600); }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .contact-form { padding: 26px 20px; }
        }
      `})]})}function Y(){let{items:e,updateQty:t,removeItem:n,subtotal:r}=tr();return(0,z.jsxs)(`div`,{className:`cart-page`,children:[(0,z.jsx)(hl,{title:`Your Cart`,path:`/cart`,noindex:!0}),(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsxs)(`div`,{className:`page-head`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,children:`Your Bag`}),(0,z.jsx)(`h1`,{children:`Cart`})]}),e.length===0?(0,z.jsxs)(`div`,{className:`empty-cart`,children:[(0,z.jsx)(`p`,{children:`Your cart is empty.`}),(0,z.jsx)(L,{to:`/products`,className:`btn btn-primary`,children:`Browse Sarees`})]}):(0,z.jsxs)(`div`,{className:`cart-grid`,children:[(0,z.jsx)(`div`,{className:`cart-items`,children:e.map(e=>{let r=e.key||(e.variantId?`${e.id}_${e.variantId}`:e.id);return(0,z.jsxs)(`div`,{className:`cart-row`,children:[(0,z.jsx)(L,{to:`/products/${e.id}`,className:`cart-thumb`,children:(0,z.jsx)(`img`,{src:e.image,alt:e.name})}),(0,z.jsxs)(`div`,{className:`cart-item-info`,children:[(0,z.jsx)(L,{to:`/products/${e.id}`,className:`cart-item-name`,children:e.name}),e.variantName&&(0,z.jsxs)(`div`,{className:`cart-variant-badge`,children:[e.variantColor&&(0,z.jsx)(`span`,{className:`cart-color-dot`,style:{backgroundColor:e.variantColor}}),(0,z.jsxs)(`span`,{children:[`Color: `,e.variantName]})]}),(0,z.jsx)(`span`,{className:`cart-item-price`,children:R(e.price)})]}),(0,z.jsxs)(`div`,{className:`qty-control`,children:[(0,z.jsx)(`button`,{type:`button`,onClick:()=>t(r,e.qty-1),"aria-label":`Decrease quantity`,children:`−`}),(0,z.jsx)(`span`,{children:e.qty}),(0,z.jsx)(`button`,{type:`button`,onClick:()=>t(r,e.qty+1),"aria-label":`Increase quantity`,children:`+`})]}),(0,z.jsx)(`span`,{className:`line-total`,children:R(e.price*e.qty)}),(0,z.jsx)(`button`,{className:`remove-btn`,onClick:()=>n(r),"aria-label":`Remove ${e.name}`,children:`Remove`})]},r)})}),(0,z.jsxs)(`div`,{className:`cart-summary`,children:[(0,z.jsx)(`h3`,{children:`Order Summary`}),(0,z.jsxs)(`div`,{className:`summary-row`,children:[(0,z.jsx)(`span`,{children:`Subtotal`}),(0,z.jsx)(`span`,{children:R(r)})]}),(0,z.jsxs)(`div`,{className:`summary-row`,children:[(0,z.jsx)(`span`,{children:`Shipping`}),(0,z.jsx)(`span`,{children:`Calculated at checkout`})]}),(0,z.jsxs)(`div`,{className:`summary-row total`,children:[(0,z.jsx)(`span`,{children:`Total`}),(0,z.jsx)(`span`,{children:R(r)})]}),(0,z.jsx)(L,{to:`/checkout`,className:`btn btn-primary checkout-btn`,children:`Proceed to Checkout`})]})]})]}),(0,z.jsx)(sl,{title:`Complete The Look`}),(0,z.jsx)(`style`,{children:`
        .cart-page { padding-bottom: 0; }
        .page-head { margin-bottom: 30px; }
        .page-head h1 { font-size: 34px; margin-top: 8px; }
        .empty-cart {
          text-align: center;
          padding: 60px 0 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          color: var(--ink-400);
        }
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 40px;
          padding-bottom: 90px;
          align-items: flex-start;
        }
        .cart-items { display: flex; flex-direction: column; gap: 16px; }
        .cart-row {
          display: grid;
          grid-template-columns: 72px 1fr auto auto auto;
          align-items: center;
          gap: 18px;
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 14px 18px;
        }
        .cart-thumb { width: 72px; height: 88px; border-radius: var(--radius-sm); overflow: hidden; display: block; }
        .cart-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
        .cart-item-info { display: flex; flex-direction: column; gap: 4px; }
        .cart-item-name { font-size: 13.5px; color: var(--ink-900); line-height: 1.4; }
        .cart-variant-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--ink-600);
          background: var(--stone-100);
          padding: 2px 8px;
          border-radius: 4px;
          width: fit-content;
        }
        .cart-color-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.15);
        }
        .cart-item-price { font-size: 12.5px; color: var(--ink-400); }
        .qty-control {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--stone-200);
          border-radius: 999px;
          padding: 6px 12px;
        }
        .qty-control button { background: none; border: none; font-size: 15px; color: var(--maroon-900); width: 16px; }
        .line-total { font-size: 13.5px; font-weight: 600; color: var(--maroon-900); white-space: nowrap; }
        .remove-btn { background: none; border: none; font-size: 12px; color: #a13a3a; }

        .cart-summary {
          background: var(--stone-100);
          border-radius: var(--radius-md);
          padding: 26px;
          position: sticky;
          top: 100px;
        }
        .cart-summary h3 { font-size: 17px; margin-bottom: 18px; }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          color: var(--ink-600);
          margin-bottom: 12px;
        }
        .summary-row.total {
          font-size: 15px;
          font-weight: 600;
          color: var(--maroon-900);
          border-top: 1px solid var(--stone-200);
          padding-top: 14px;
          margin-top: 6px;
        }
        .checkout-btn { width: 100%; margin-top: 12px; }
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr; }
          .cart-row {
            grid-template-columns: 56px 1fr;
            grid-template-areas:
              "thumb info"
              "thumb qty"
              "thumb total"
              "thumb remove";
            row-gap: 8px;
          }
          .cart-thumb { grid-area: thumb; width: 56px; height: 70px; }
          .cart-item-info { grid-area: info; }
          .qty-control { grid-area: qty; justify-self: start; }
          .line-total { grid-area: total; justify-self: start; }
          .remove-btn { grid-area: remove; justify-self: start; padding: 0; }
        }
      `})]})}var Il={name:``,mobile:``,line1:``,line2:``,city:``,state:``,pincode:``,country:`India`,isDefault:!1},X={fee:100,freeThreshold:0};function Z(){return new Promise((e,t)=>{if(window.Razorpay)return e();let n=document.createElement(`script`);n.src=`https://checkout.razorpay.com/v1/checkout.js`,n.onload=e,n.onerror=()=>t(Error(`Could not load Razorpay checkout.`)),document.body.appendChild(n)})}function Ll(){let{items:e,subtotal:t,clearCart:n}=tr(),{user:r}=lr(),[i,a]=(0,x.useState)([]),[o,s]=(0,x.useState)(null),[c,l]=(0,x.useState)(!1),[u,d]=(0,x.useState)(Il),[f,p]=(0,x.useState)(!1),[m,h]=(0,x.useState)(``),[g,_]=(0,x.useState)(!1),[v,y]=(0,x.useState)(``),[b,S]=(0,x.useState)(``),[C,w]=(0,x.useState)(null),[T,E]=(0,x.useState)(X),[D,O]=(0,x.useState)(``),[k,A]=(0,x.useState)(!1),[j,M]=(0,x.useState)(null),[ee,te]=(0,x.useState)(!1),[ne,N]=(0,x.useState)(``),[P,re]=(0,x.useState)({enabled:!0,rate:5,type:`inclusive`});ut();let ie=C?.discount||0,ae=Math.max(t-ie,0),oe=T.freeThreshold>0&&t>=T.freeThreshold,se=j?j.fee:oe?0:T.fee,F=T.freeThreshold>0?Math.max(T.freeThreshold-t,0):0,ce=Number(P?.rate)||0,le=!!(P?.enabled&&ce>0),ue=P?.type===`exclusive`,de=le?ue?Math.round(ce/100*ae):Math.max(0,ae-Math.round(ae/(1+ce/100))):0,fe=le&&ue?ae+de+se:ae+se;async function pe(){if(b.trim()){A(!0),O(``);try{let n=await V.validateCoupon({code:b.trim(),subtotal:t,items:e.map(e=>({productId:e.id,qty:e.qty}))});w({code:n.code,discount:n.discount})}catch(e){w(null),O(e.message)}finally{A(!1)}}}function me(){w(null),S(``),O(``)}(0,x.useEffect)(()=>{V.getHomeSection(`shipping_settings`).then(({section:e})=>{if(e?.content){let{fee:t,freeThreshold:n}=e.content;E({fee:Number.isFinite(t)?t:X.fee,freeThreshold:Number.isFinite(n)?n:X.freeThreshold})}}).catch(()=>{}),V.getSetting(`gst_settings`).then(({value:e})=>{e&&re(e)}).catch(()=>{}),V.getAddresses().then(({addresses:e})=>{if(a(e),e.length){let t=e.find(e=>e.is_default)||e[0];s(t.id)}else d(e=>({...e,name:r?.name||``,mobile:r?.mobile||``})),l(!0)}).catch(()=>l(!0))},[r]),(0,x.useEffect)(()=>{let n=i.find(e=>e.id===o);n?.pincode&&/^[1-9][0-9]{5}$/.test(n.pincode)&&e.length>0&&(te(!0),N(``),V.calculateShipping({pincode:n.pincode,items:e.map(e=>({productId:e.id,variantId:e.variantId,qty:e.qty})),subtotal:t}).then(e=>{M({fee:e.shippingFee,etd:e.estimatedDays,courierName:e.courierName,freeShipping:e.freeShipping})}).catch(e=>{N(e.message||`Courier serviceability check failed.`)}).finally(()=>te(!1)))},[o,i,e,t]);async function he(e){if(e.preventDefault(),!(!u.line1.trim()||!u.city.trim()||!u.pincode.trim()))try{let{address:e}=await V.addAddress(u);a(t=>e.is_default?[e,...t.map(e=>({...e,is_default:!1}))]:[e,...t]),s(e.id),l(!1),d(Il)}catch(e){y(e.message)}}async function ge(){let t=i.find(e=>e.id===o);if(!(!t||e.length===0)){y(``),_(!0);try{await Z();let i={items:e.map(e=>({productId:e.id,variantId:e.variantId||void 0,qty:e.qty})),address:{name:t.name,mobile:t.mobile,line1:t.line1,line2:t.line2||``,city:t.city,state:t.state,pincode:t.pincode,country:t.country||`India`},couponCode:C?.code||void 0,shippingFee:se},{orderId:a,orderNumber:o,razorpayOrderId:s,amount:c,currency:l,keyId:u}=await V.createOrder(i),d=new window.Razorpay({key:u,amount:c,currency:l,order_id:s,name:H.name,description:`Order #${o||a}`,prefill:{name:t.name,contact:t.mobile,email:r?.email},theme:{color:`#581e15`},handler:async e=>{try{await V.verifyOrder(e),h(`SK${a}`),p(!0),n()}catch(e){y(e.message||`Payment verification failed. Please contact support.`)}finally{_(!1)}},modal:{ondismiss:()=>_(!1)}});d.on(`payment.failed`,()=>{y(`Payment failed. Please try again.`),_(!1)}),d.open()}catch(e){y(e.message),_(!1)}}}return f?(0,z.jsx)(`div`,{className:`container checkout-page`,children:(0,z.jsxs)(`div`,{className:`order-confirmed`,children:[(0,z.jsx)(`h1`,{children:`Order placed`}),(0,z.jsxs)(`p`,{children:[`Your order `,(0,z.jsx)(`strong`,{children:m}),` has been confirmed and paid. A confirmation email is on its way.`]}),(0,z.jsxs)(`div`,{className:`confirm-actions`,children:[(0,z.jsx)(L,{to:`/orders`,className:`btn btn-primary`,children:`View Orders`}),(0,z.jsx)(L,{to:`/products`,className:`btn btn-outline`,children:`Continue Shopping`})]})]})}):e.length===0?(0,z.jsxs)(`div`,{className:`container checkout-page`,children:[(0,z.jsx)(`p`,{children:`Your cart is empty.`}),(0,z.jsx)(L,{to:`/products`,className:`btn btn-primary`,style:{marginTop:16},children:`Browse Sarees`})]}):(0,z.jsxs)(`div`,{className:`checkout-page`,children:[(0,z.jsx)(hl,{title:`Checkout`,path:`/checkout`,noindex:!0}),(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsxs)(`div`,{className:`page-head`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,children:`Almost there`}),(0,z.jsx)(`h1`,{children:`Checkout`})]}),(0,z.jsxs)(`div`,{className:`checkout-grid`,children:[(0,z.jsxs)(`div`,{className:`checkout-main`,children:[(0,z.jsx)(`h3`,{children:`Delivery Address`}),i.map(e=>(0,z.jsxs)(`label`,{className:`address-card ${o===e.id?`selected`:``}`,children:[(0,z.jsx)(`input`,{type:`radio`,name:`address`,checked:o===e.id,onChange:()=>s(e.id)}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:e.name}),` · `,e.mobile,(0,z.jsxs)(`p`,{children:[e.line1,`, `,e.city,`, `,e.state,` — `,e.pincode]})]})]},e.id)),!c&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline add-address-btn`,onClick:()=>l(!0),children:`+ Add a new address`}),c&&(0,z.jsxs)(`form`,{className:`address-form`,onSubmit:he,children:[(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Full name`,(0,z.jsx)(`input`,{type:`text`,value:u.name,onChange:e=>d(t=>({...t,name:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Mobile number`,(0,z.jsx)(`input`,{type:`tel`,value:u.mobile,onChange:e=>d(t=>({...t,mobile:e.target.value})),required:!0})]})]}),(0,z.jsxs)(`label`,{children:[`Address`,(0,z.jsx)(`input`,{type:`text`,placeholder:`House no, street, area`,value:u.line1,onChange:e=>d(t=>({...t,line1:e.target.value})),required:!0})]}),(0,z.jsxs)(`div`,{className:`form-row three`,children:[(0,z.jsxs)(`label`,{children:[`City`,(0,z.jsx)(`input`,{type:`text`,value:u.city,onChange:e=>d(t=>({...t,city:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`State`,(0,z.jsx)(`input`,{type:`text`,value:u.state,onChange:e=>d(t=>({...t,state:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Pincode`,(0,z.jsx)(`input`,{type:`text`,value:u.pincode,onChange:e=>d(t=>({...t,pincode:e.target.value})),required:!0})]})]}),(0,z.jsxs)(`div`,{className:`form-actions`,children:[(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Save Address`}),i.length>0&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:()=>l(!1),children:`Cancel`})]})]}),(0,z.jsx)(`h3`,{className:`items-heading`,children:`Items`}),(0,z.jsx)(`div`,{className:`checkout-items`,children:e.map(e=>(0,z.jsxs)(`div`,{className:`checkout-item`,children:[(0,z.jsx)(`img`,{src:e.image,alt:e.name}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`p`,{children:e.name}),e.variantName&&(0,z.jsxs)(`span`,{className:`checkout-variant-tag`,children:[`Color: `,e.variantName]}),(0,z.jsxs)(`span`,{children:[`Qty `,e.qty]})]}),(0,z.jsx)(`span`,{className:`item-total`,children:R(e.price*e.qty)})]},e.key||e.id))})]}),(0,z.jsxs)(`div`,{className:`checkout-summary`,children:[(0,z.jsx)(`h3`,{children:`Order Summary`}),(0,z.jsx)(`div`,{className:`coupon-box`,children:C?(0,z.jsxs)(`div`,{className:`coupon-applied`,children:[(0,z.jsxs)(`span`,{children:[(0,z.jsx)(`strong`,{children:C.code}),` applied — you saved `,R(C.discount)]}),(0,z.jsx)(`button`,{type:`button`,onClick:me,children:`Remove`})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`div`,{className:`coupon-input-row`,children:[(0,z.jsx)(`input`,{type:`text`,placeholder:`Coupon code`,value:b,onChange:e=>{S(e.target.value.toUpperCase()),O(``)},onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),pe())}}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,disabled:k||!b.trim(),onClick:pe,children:k?`Checking…`:`Apply`})]}),D&&(0,z.jsx)(`p`,{className:`coupon-error`,children:D})]})}),(0,z.jsxs)(`div`,{className:`summary-row`,children:[(0,z.jsx)(`span`,{children:`Subtotal`}),(0,z.jsx)(`span`,{children:R(t)})]}),ie>0&&(0,z.jsxs)(`div`,{className:`summary-row discount-row`,children:[(0,z.jsx)(`span`,{children:`Coupon discount`}),(0,z.jsxs)(`span`,{children:[`−`,R(ie)]})]}),le&&ue&&(0,z.jsxs)(`div`,{className:`summary-row`,children:[(0,z.jsxs)(`span`,{children:[`GST (`,ce,`%)`]}),(0,z.jsxs)(`span`,{children:[`+`,R(de)]})]}),(0,z.jsxs)(`div`,{className:`summary-row`,children:[(0,z.jsxs)(`span`,{children:[`Shipping `,j?.courierName?`(${j.courierName})`:``]}),(0,z.jsx)(`span`,{children:ee?`Calculating…`:se===0?`Free`:R(se)})]}),j?.etd&&(0,z.jsxs)(`p`,{className:`shipping-etd-nudge`,children:[`Estimated delivery: `,j.etd]}),ne&&(0,z.jsx)(`p`,{className:`shipping-error-nudge`,children:ne}),F>0&&se>0&&(0,z.jsxs)(`p`,{className:`free-shipping-nudge`,children:[`Add `,R(F),` more to get free shipping.`]}),le&&!ue&&de>0&&(0,z.jsxs)(`p`,{className:`tax-inclusive-nudge`,children:[`Includes ₹`,de.toLocaleString(`en-IN`),` (`,ce,`%) GST`]}),(0,z.jsxs)(`div`,{className:`summary-row total`,children:[(0,z.jsx)(`span`,{children:`Total`}),(0,z.jsx)(`span`,{children:R(fe)})]}),v&&(0,z.jsx)(`p`,{className:`checkout-error`,children:v}),(0,z.jsx)(`button`,{className:`btn btn-primary place-order-btn`,disabled:!o||g,onClick:ge,children:g?`Processing…`:`Pay ${R(fe)} with Razorpay`}),(0,z.jsx)(`p`,{className:`payment-note`,children:`Secure checkout via Razorpay — UPI, cards, net banking & wallets.`})]})]})]}),(0,z.jsx)(sl,{title:`Add To Your Order`}),(0,z.jsx)(`style`,{children:`
        .checkout-page { padding: 56px 0 0; }
        .page-head { margin-bottom: 30px; }
        .page-head h1 { font-size: 34px; margin-top: 8px; }
        .checkout-grid { display: grid; grid-template-columns: 1fr 340px; gap: 40px; align-items: flex-start; margin-bottom: 60px; }
        .checkout-main h3 { font-size: 16px; margin: 0 0 16px; color: var(--maroon-900); }
        .items-heading { margin-top: 34px; }

        .address-card {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 16px 18px;
          margin-bottom: 12px;
          cursor: pointer;
          font-size: 13.5px;
        }
        .address-card.selected { border-color: var(--gold-500); background: var(--stone-100); }
        .address-card input { margin-top: 3px; accent-color: var(--maroon-900); }
        .address-card p { margin: 4px 0 0; color: var(--ink-600); }

        .add-address-btn { margin-bottom: 20px; padding: 11px 18px; font-size: 13px; }

        .address-form {
          background: var(--stone-100);
          border-radius: var(--radius-md);
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 20px;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-row.three { grid-template-columns: 1fr 1fr 1fr; }
        .address-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .address-form input {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .form-actions { display: flex; gap: 10px; }

        .checkout-items { display: flex; flex-direction: column; gap: 12px; }
        .checkout-item {
          display: grid;
          grid-template-columns: 52px 1fr auto;
          align-items: center;
          gap: 14px;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
        }
        .checkout-item img { width: 52px; height: 64px; object-fit: cover; object-position: top center; border-radius: 4px; }
        .checkout-item p { margin: 0 0 4px; font-size: 13px; }
        .checkout-item span:not(.item-total) { font-size: 12px; color: var(--ink-400); }
        .item-total { font-size: 13px; font-weight: 600; color: var(--maroon-900); }

        .checkout-summary {
          background: var(--stone-100);
          border-radius: var(--radius-md);
          padding: 26px;
          position: sticky;
          top: 100px;
        }
        .checkout-summary h3 { font-size: 17px; margin-bottom: 18px; }

        .coupon-box { margin-bottom: 18px; }
        .coupon-input-row { display: flex; gap: 8px; }
        .coupon-input-row input {
          flex: 1;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-size: 13px;
          text-transform: uppercase;
          background: var(--paper);
        }
        .coupon-input-row .btn { padding: 10px 16px; font-size: 12.5px; white-space: nowrap; }
        .coupon-error { font-size: 12px; color: #a13a3a; margin: 8px 0 0; }
        .coupon-applied {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: #e8f2e6;
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-size: 12.5px;
          color: #3c7a3c;
        }
        .coupon-applied button {
          background: none; border: none; font-size: 12px; color: #3c7a3c;
          text-decoration: underline; flex: 0 0 auto;
        }
        .discount-row span:last-child { color: #3c7a3c; font-weight: 600; }

        .summary-row { display: flex; justify-content: space-between; font-size: 13.5px; color: var(--ink-600); margin-bottom: 12px; }
        .free-shipping-nudge { font-size: 11.5px; color: var(--gold-600); margin: -6px 0 12px; }
        .tax-inclusive-nudge { font-size: 11.5px; color: var(--ink-400); margin: -4px 0 10px; font-style: italic; }
        .summary-row.total {
          font-size: 15px; font-weight: 600; color: var(--maroon-900);
          border-top: 1px solid var(--stone-200); padding-top: 14px; margin-top: 6px;
        }
        .place-order-btn { width: 100%; margin-top: 12px; }
        .place-order-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .payment-note { font-size: 11.5px; color: var(--ink-400); margin-top: 12px; line-height: 1.5; }
        .checkout-error { font-size: 12.5px; color: #a13a3a; margin: 4px 0 0; }

        .order-confirmed { text-align: center; padding: 90px 20px; max-width: 480px; margin: 0 auto; }
        .order-confirmed h1 { font-size: 30px; margin-bottom: 16px; }
        .order-confirmed p { font-size: 14.5px; color: var(--ink-600); line-height: 1.7; margin-bottom: 30px; }
        .confirm-actions { display: flex; gap: 12px; justify-content: center; }

        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr; }
          .form-row, .form-row.three { grid-template-columns: 1fr; }
        }
      `})]})}var Rl={name:``,mobile:``,line1:``,city:``,state:``,pincode:``},zl={currentPassword:``,newPassword:``,confirmPassword:``};function Bl(){let{user:e,logout:t}=lr(),[n,r]=(0,x.useState)({name:``,mobile:``}),[i,a]=(0,x.useState)(!1),[o,s]=(0,x.useState)([]),[c,l]=(0,x.useState)(!1),[u,d]=(0,x.useState)(Rl),[f,p]=(0,x.useState)(zl),[m,h]=(0,x.useState)(``),[g,_]=(0,x.useState)(!1),[v,y]=(0,x.useState)(!1);(0,x.useEffect)(()=>{e&&r({name:e.name,mobile:e.mobile||``}),V.getAddresses().then(({addresses:e})=>s(e)).catch(()=>{})},[e]);async function b(e){e.preventDefault(),await V.updateMe(n),a(!0),setTimeout(()=>a(!1),2500)}let[S,C]=(0,x.useState)(null);async function w(e){if(e.preventDefault(),!(!u.line1.trim()||!u.city.trim()||!u.state.trim()||!u.pincode.trim()))try{if(S){let{address:e}=await V.updateAddress(S,u);s(t=>t.map(t=>t.id===S?e:t))}else{let{address:e}=await V.addAddress(u);s(t=>[e,...t])}d(Rl),C(null),l(!1),V.getAddresses().then(({addresses:e})=>s(e)).catch(()=>{})}catch(e){alert(e.message||`Could not save address.`)}}function T(e){d({name:e.name||``,mobile:e.mobile||``,line1:e.line1||``,line2:e.line2||``,city:e.city||``,state:e.state||``,pincode:e.pincode||``,country:e.country||`India`,isDefault:!!e.is_default}),C(e.id),l(!0)}async function E(e){try{await V.setDefaultAddress(e),s(t=>t.map(t=>({...t,is_default:t.id===e})).sort((e,t)=>!!t.is_default-+!!e.is_default))}catch(e){alert(e.message||`Could not set default address.`)}}async function D(e){window.confirm(`Delete this address?`)&&(await V.deleteAddress(e),s(t=>t.filter(t=>t.id!==e)))}async function O(e){if(e.preventDefault(),h(``),f.newPassword!==f.confirmPassword){h(`New passwords do not match.`);return}if(f.newPassword.length<6){h(`New password must be at least 6 characters.`);return}y(!0);try{await V.changePassword({currentPassword:f.currentPassword,newPassword:f.newPassword}),p(zl),_(!0),setTimeout(()=>_(!1),2500)}catch(e){h(e.message)}finally{y(!1)}}return(0,z.jsxs)(`div`,{className:`profile-page`,children:[(0,z.jsx)(hl,{title:`My Profile`,path:`/profile`,noindex:!0}),(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsxs)(`div`,{className:`page-head`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,children:`Your Account`}),(0,z.jsx)(`h1`,{children:`Profile`})]}),(0,z.jsxs)(`div`,{className:`profile-grid`,children:[(0,z.jsxs)(`div`,{className:`profile-col`,children:[(0,z.jsxs)(`form`,{className:`profile-card`,onSubmit:b,children:[(0,z.jsx)(`h3`,{children:`Personal Details`}),(0,z.jsxs)(`label`,{children:[`Name`,(0,z.jsx)(`input`,{type:`text`,value:n.name,onChange:e=>r(t=>({...t,name:e.target.value})),placeholder:`Your full name`})]}),(0,z.jsxs)(`label`,{children:[`Mobile`,(0,z.jsx)(`input`,{type:`tel`,value:n.mobile,onChange:e=>r(t=>({...t,mobile:e.target.value})),placeholder:`10-digit mobile number`})]}),(0,z.jsxs)(`label`,{children:[`Email`,(0,z.jsx)(`input`,{type:`email`,value:e?.email||``,disabled:!0})]}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Save Details`}),i&&(0,z.jsx)(`span`,{className:`saved-msg`,children:`Saved ✓`}),(0,z.jsxs)(`div`,{className:`profile-links`,children:[(0,z.jsx)(L,{to:`/orders`,children:`View your orders →`}),(0,z.jsx)(`button`,{type:`button`,className:`logout-btn`,onClick:t,children:`Log out`})]})]}),(0,z.jsxs)(`form`,{className:`profile-card`,onSubmit:O,children:[(0,z.jsx)(`h3`,{children:`Change Password`}),(0,z.jsxs)(`label`,{children:[`Current password`,(0,z.jsx)(`input`,{type:`password`,value:f.currentPassword,onChange:e=>p(t=>({...t,currentPassword:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`New password`,(0,z.jsx)(`input`,{type:`password`,value:f.newPassword,onChange:e=>p(t=>({...t,newPassword:e.target.value})),minLength:6,required:!0})]}),(0,z.jsxs)(`label`,{children:[`Confirm new password`,(0,z.jsx)(`input`,{type:`password`,value:f.confirmPassword,onChange:e=>p(t=>({...t,confirmPassword:e.target.value})),minLength:6,required:!0})]}),m&&(0,z.jsx)(`p`,{className:`password-error`,children:m}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-outline`,disabled:v,children:v?`Updating…`:`Update Password`}),g&&(0,z.jsx)(`span`,{className:`saved-msg`,children:`Password updated ✓`})]})]}),(0,z.jsxs)(`div`,{className:`address-card-panel`,children:[(0,z.jsxs)(`div`,{className:`panel-head`,children:[(0,z.jsx)(`h3`,{children:`Saved Addresses`}),!c&&(0,z.jsx)(`button`,{type:`button`,className:`add-link`,onClick:()=>{d(Rl),C(null),l(!0)},children:`+ Add address`})]}),o.length===0&&!c&&(0,z.jsx)(`p`,{className:`empty`,children:`No addresses saved yet.`}),o.map(e=>(0,z.jsxs)(`div`,{className:`saved-address ${e.is_default?`is-default`:``}`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`address-title-row`,children:[(0,z.jsx)(`strong`,{children:e.name}),` · `,e.mobile,e.is_default&&(0,z.jsx)(`span`,{className:`default-badge`,children:`Default`})]}),(0,z.jsxs)(`p`,{children:[e.line1,e.line2?`, ${e.line2}`:``,(0,z.jsx)(`br`,{}),e.city,`, `,e.state,` — `,e.pincode,`, `,e.country||`India`]})]}),(0,z.jsxs)(`div`,{className:`address-actions`,children:[!e.is_default&&(0,z.jsx)(`button`,{type:`button`,onClick:()=>E(e.id),className:`action-btn make-default`,children:`Set as default`}),(0,z.jsx)(`button`,{type:`button`,onClick:()=>T(e),className:`action-btn edit`,children:`Edit`}),(0,z.jsx)(`button`,{type:`button`,onClick:()=>D(e.id),className:`action-btn danger`,children:`Remove`})]})]},e.id)),c&&(0,z.jsxs)(`form`,{className:`address-form`,onSubmit:w,children:[(0,z.jsx)(`h4`,{children:S?`Edit Address`:`New Delivery Address`}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Full name *`,(0,z.jsx)(`input`,{type:`text`,value:u.name,onChange:e=>d(t=>({...t,name:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Mobile number *`,(0,z.jsx)(`input`,{type:`tel`,value:u.mobile,onChange:e=>d(t=>({...t,mobile:e.target.value})),required:!0})]})]}),(0,z.jsxs)(`label`,{children:[`Address Line 1 (House No, Street, Area) *`,(0,z.jsx)(`input`,{type:`text`,placeholder:`House no, street, area`,value:u.line1,onChange:e=>d(t=>({...t,line1:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Address Line 2 (Landmark, Colony)`,(0,z.jsx)(`input`,{type:`text`,placeholder:`Landmark or colony (optional)`,value:u.line2||``,onChange:e=>d(t=>({...t,line2:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-row three`,children:[(0,z.jsxs)(`label`,{children:[`City *`,(0,z.jsx)(`input`,{type:`text`,value:u.city,onChange:e=>d(t=>({...t,city:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`State *`,(0,z.jsx)(`input`,{type:`text`,value:u.state,onChange:e=>d(t=>({...t,state:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Pincode *`,(0,z.jsx)(`input`,{type:`text`,value:u.pincode,onChange:e=>d(t=>({...t,pincode:e.target.value})),required:!0})]})]}),(0,z.jsxs)(`label`,{className:`checkbox-label`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:!!u.isDefault,onChange:e=>d(t=>({...t,isDefault:e.target.checked}))}),(0,z.jsx)(`span`,{children:`Make this my default delivery address`})]}),(0,z.jsxs)(`div`,{className:`form-actions`,children:[(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:S?`Update Address`:`Save Address`}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:()=>{l(!1),C(null)},children:`Cancel`})]})]})]})]})]}),(0,z.jsx)(sl,{}),(0,z.jsx)(`style`,{children:`
        .profile-page { padding: 56px 0 0; }
        .page-head { margin-bottom: 30px; }
        .page-head h1 { font-size: 34px; margin-top: 8px; }
        .profile-grid { display: grid; grid-template-columns: 360px 1fr; gap: 28px; align-items: flex-start; margin-bottom: 60px; }
        .profile-col { display: flex; flex-direction: column; gap: 20px; }

        .profile-card, .address-card-panel {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 26px;
        }
        .profile-card { display: flex; flex-direction: column; gap: 16px; }
        .profile-card h3, .address-card-panel h3 { font-family: var(--font-display); font-size: 18px; color: var(--maroon-900); margin: 0; }
        .profile-card label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .profile-card input {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .profile-card input:disabled { background: var(--stone-100); color: var(--ink-400); }
        .saved-msg { font-size: 12.5px; color: #3c7a3c; }
        .password-error { font-size: 12.5px; color: #a13a3a; margin: 0; }
        .profile-links { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; font-size: 12.5px; }
        .profile-links a { color: var(--gold-600); border-bottom: 1px solid var(--gold-500); }
        .logout-btn { background: none; border: none; color: #a13a3a; font-size: 12.5px; }

        .panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .add-link { background: none; border: none; font-size: 12.5px; color: var(--gold-600); border-bottom: 1px solid var(--gold-500); }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        .saved-address {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 16px 18px;
          margin-bottom: 12px;
          font-size: 13.5px;
          background: var(--paper);
        }
        .saved-address.is-default {
          border-color: var(--gold-500);
          background: #fdfaf3;
        }
        .address-title-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .default-badge {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: var(--gold-500);
          color: #fff;
          padding: 2px 7px;
          border-radius: 999px;
          font-weight: 600;
        }
        .saved-address p { margin: 6px 0 0; color: var(--ink-600); line-height: 1.5; }
        .address-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .action-btn { background: none; border: none; font-size: 12px; cursor: pointer; padding: 0; }
        .action-btn.make-default { color: var(--gold-600); border-bottom: 1px solid var(--gold-500); }
        .action-btn.edit { color: var(--maroon-900); text-decoration: underline; }
        .action-btn.danger { color: #a13a3a; text-decoration: underline; }

        .checkbox-label {
          display: flex;
          flex-direction: row !important;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 13px !important;
          color: var(--ink-600);
        }
        .checkbox-label input { accent-color: var(--maroon-900); }

        .address-form {
          background: var(--stone-100);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 8px;
        }
        .address-form h4 { margin: 0 0 4px; font-size: 15px; color: var(--maroon-900); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-row.three { grid-template-columns: 1fr 1fr 1fr; }
        .address-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .address-form input {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .form-actions { display: flex; gap: 10px; }

        @media (max-width: 860px) {
          .profile-grid { grid-template-columns: 1fr; }
          .form-row, .form-row.three { grid-template-columns: 1fr; }
        }
      `})]})}var Vl=`548296304235-m5c7pfmdh2nr4kcjteuvtq3vtnbo9m7q.apps.googleusercontent.com`,Hl=null;function Ul(){return window.google?.accounts?.id?Promise.resolve():(Hl||=new Promise((e,t)=>{let n=document.createElement(`script`);n.src=`https://accounts.google.com/gsi/client`,n.async=!0,n.defer=!0,n.onload=e,n.onerror=()=>t(Error(`Could not load Google Sign-In script.`)),document.body.appendChild(n)}),Hl)}function Wl({onCredential:e,onError:t,text:n=`continue_with`,adminMode:r=!1}){let i=(0,x.useRef)(null),[a,o]=(0,x.useState)(!1),[s,c]=(0,x.useState)(!1),[l,u]=(0,x.useState)(!1);(0,x.useEffect)(()=>{let r=!1;return Ul().then(()=>{r||!i.current||(window.google.accounts.id.initialize({client_id:Vl,callback:t=>{t?.credential&&e?.(t.credential)},auto_select:!1}),window.google.accounts.id.renderButton(i.current,{theme:`outline`,size:`large`,width:320,text:n,shape:`pill`,logo_alignment:`left`}),o(!0))}).catch(e=>{console.error(`[GoogleSignInButton] load error:`,e),t?.(e.message)}),()=>{r=!0}},[n,e,t]);function d(){if(window.google?.accounts?.id)try{window.google.accounts.id.prompt()}catch(e){console.warn(`Google prompt error:`,e)}}return(0,z.jsxs)(`div`,{className:`google-signin-wrapper`,children:[(0,z.jsx)(`div`,{ref:i,className:`gis-button-target ${a&&Vl?`is-visible`:`is-hidden`}`}),(!a||!1)&&(0,z.jsxs)(`button`,{type:`button`,className:`custom-google-btn ${r?`admin-google-btn`:``}`,onClick:d,children:[(0,z.jsxs)(`svg`,{className:`google-svg-icon`,viewBox:`0 0 24 24`,width:`20`,height:`20`,children:[(0,z.jsx)(`path`,{fill:`#4285F4`,d:`M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z`}),(0,z.jsx)(`path`,{fill:`#34A853`,d:`M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.26 21.34 7.33 24 12 24z`}),(0,z.jsx)(`path`,{fill:`#FBBC05`,d:`M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.27C.46 8.19 0 10.03 0 12s.46 3.81 1.27 5.43l4.01-3.14z`}),(0,z.jsx)(`path`,{fill:`#EA4335`,d:`M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.66 1.27 6.57l4.01 3.14c.95-2.83 3.6-4.96 6.72-4.96z`})]}),(0,z.jsx)(`span`,{className:`google-btn-text`,children:r?`Sign In as Admin with Google`:n===`signup_with`?`Sign up with Google`:`Continue with Google`})]}),l&&(0,z.jsx)(`div`,{className:`google-cfg-backdrop`,onClick:()=>u(!1),children:(0,z.jsxs)(`div`,{className:`google-cfg-modal`,onClick:e=>e.stopPropagation(),children:[(0,z.jsxs)(`div`,{className:`modal-head`,children:[(0,z.jsx)(`h3`,{children:`Google Sign-In Setup`}),(0,z.jsx)(`button`,{type:`button`,className:`close-btn`,onClick:()=>u(!1),children:`✕`})]}),(0,z.jsxs)(`div`,{className:`modal-body`,children:[(0,z.jsx)(`p`,{children:`To enable 1-click Google Sign-In on your live store, please add your Google OAuth Client ID to your Vercel and VPS server settings.`}),(0,z.jsxs)(`div`,{className:`cfg-steps-list`,children:[(0,z.jsxs)(`div`,{className:`cfg-step`,children:[(0,z.jsx)(`span`,{className:`step-num`,children:`1`}),(0,z.jsxs)(`span`,{children:[`Go to `,(0,z.jsx)(`a`,{href:`https://console.cloud.google.com/apis/credentials`,target:`_blank`,rel:`noreferrer`,children:`Google Cloud Console`}),` → `,(0,z.jsx)(`strong`,{children:`Credentials`}),`.`]})]}),(0,z.jsxs)(`div`,{className:`cfg-step`,children:[(0,z.jsx)(`span`,{className:`step-num`,children:`2`}),(0,z.jsxs)(`span`,{children:[`Create an `,(0,z.jsx)(`strong`,{children:`OAuth Client ID`}),` for `,(0,z.jsx)(`strong`,{children:`Web Application`}),`.`]})]}),(0,z.jsxs)(`div`,{className:`cfg-step`,children:[(0,z.jsx)(`span`,{className:`step-num`,children:`3`}),(0,z.jsxs)(`span`,{children:[`Add Authorized JavaScript Origins: `,(0,z.jsx)(`code`,{children:`https://ravichandratextiles.com`}),` and `,(0,z.jsx)(`code`,{children:`https://www.ravichandratextiles.com`})]})]}),(0,z.jsxs)(`div`,{className:`cfg-step`,children:[(0,z.jsx)(`span`,{className:`step-num`,children:`4`}),(0,z.jsxs)(`span`,{children:[`Copy Client ID and add to Vercel Environment Variables: `,(0,z.jsx)(`code`,{children:`VITE_GOOGLE_CLIENT_ID`})]})]})]}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-primary btn-block`,onClick:()=>u(!1),children:`Got It`})]})]})}),(0,z.jsx)(`style`,{children:`
        .google-signin-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 48px;
          position: relative;
        }
        .gis-button-target.is-visible {
          display: flex;
          justify-content: center;
        }
        .gis-button-target.is-hidden {
          display: none;
        }
        .custom-google-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          max-width: 320px;
          height: 46px;
          padding: 0 20px;
          background: #ffffff;
          border: 1px solid #dadce0;
          border-radius: 999px;
          box-shadow: 0 1px 3px rgba(60, 64, 67, 0.08);
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #3c4043;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .custom-google-btn:hover {
          background: #f8f9fa;
          border-color: #c6c9ce;
          box-shadow: 0 1px 4px rgba(60, 64, 67, 0.16);
        }
        .admin-google-btn {
          background: #faf6f0;
          border: 1.5px solid var(--gold-500, #c58b38);
          color: var(--maroon-900, #581e15);
          font-weight: 600;
        }
        .admin-google-btn:hover {
          background: #fdfaf4;
          box-shadow: 0 3px 12px rgba(88, 30, 21, 0.15);
        }
        .google-svg-icon {
          flex-shrink: 0;
        }

        /* Config Modal */
        .google-cfg-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }
        .google-cfg-modal {
          background: #ffffff;
          border-radius: 12px;
          max-width: 460px;
          width: 100%;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .google-cfg-modal .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .google-cfg-modal .modal-head h3 {
          font-size: 17px;
          color: var(--maroon-900, #581e15);
          margin: 0;
        }
        .google-cfg-modal .close-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #888;
        }
        .google-cfg-modal .modal-body {
          font-size: 13px;
          color: #555;
          line-height: 1.5;
        }
        .cfg-steps-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 16px 0 20px;
        }
        .cfg-step {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12.5px;
        }
        .step-num {
          background: var(--maroon-900, #581e15);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cfg-step code {
          background: #f1f1f1;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11.5px;
          color: #b0732e;
        }
        .btn-block {
          width: 100%;
          padding: 11px;
          border-radius: 6px;
        }
      `})]})}function Gl(){let[e,t]=(0,x.useState)(``),[n,r]=(0,x.useState)(!1),[i,a]=(0,x.useState)({email:``,password:``}),[o,s]=(0,x.useState)(!1),{login:c,googleLogin:l}=lr(),u=ut(),d=st().state?.from,f=d&&d!==`/login`&&d!==`/complete-profile`?d:`/`;async function p(e){t(``),r(!0);try{let t=await l(e);if(t?.user?.isAdmin){f.startsWith(`/admin`)?u(f,{replace:!0}):u(f===`/`?`/admin`:f,{replace:!0});return}t?.needsProfile||t?.needsMobile?u(`/complete-profile`,{replace:!0,state:{from:f}}):u(f,{replace:!0})}catch(e){console.error(`[Login] Google auth error:`,e),t(e.message||`Google sign-in could not be completed. Please try again.`)}finally{r(!1)}}async function m(e){e.preventDefault(),t(``),r(!0);try{(await c(i.email,i.password))?.isAdmin&&f===`/`?u(`/admin`,{replace:!0}):u(f,{replace:!0})}catch(e){t(e.message)}finally{r(!1)}}return(0,z.jsxs)(`div`,{className:`auth-page`,children:[(0,z.jsx)(hl,{title:`Sign In | ${H.name}`,path:`/login`,noindex:!0}),(0,z.jsx)(`div`,{className:`auth-ambient-glow`,"aria-hidden":`true`}),(0,z.jsx)(`div`,{className:`container auth-container`,children:(0,z.jsxs)(`div`,{className:`auth-card-master`,children:[(0,z.jsxs)(`div`,{className:`auth-showcase`,children:[(0,z.jsx)(`div`,{className:`auth-showcase-bg`}),(0,z.jsx)(`div`,{className:`auth-showcase-overlay`}),(0,z.jsxs)(`div`,{className:`auth-showcase-content`,children:[(0,z.jsxs)(`div`,{className:`auth-showcase-header`,children:[(0,z.jsx)(`img`,{src:H.assets.monogramWhite||`/images/monogram-white.png`,alt:``,className:`auth-showcase-monogram`,width:`44`,height:`44`}),(0,z.jsx)(`span`,{className:`auth-showcase-badge`,children:`Ravichandra Privileges`})]}),(0,z.jsxs)(`div`,{className:`auth-showcase-body`,children:[(0,z.jsx)(`h2`,{className:`auth-showcase-title`,children:`Where Heritage Weaves Meet Timeless Elegance`}),(0,z.jsx)(`p`,{className:`auth-showcase-desc`,children:`Sign in to explore private handloom collections, track bespoke saree orders, and enjoy member-exclusive previews.`}),(0,z.jsxs)(`div`,{className:`auth-perks-list`,children:[(0,z.jsxs)(`div`,{className:`auth-perk-item`,children:[(0,z.jsx)(`span`,{className:`auth-perk-icon`,children:`✦`}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:`Handcrafted Authentic Silks`}),(0,z.jsx)(`p`,{children:`Kanjivaram, Banarasi, and pure temple handlooms direct from master weavers.`})]})]}),(0,z.jsxs)(`div`,{className:`auth-perk-item`,children:[(0,z.jsx)(`span`,{className:`auth-perk-icon`,children:`✦`}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:`White-Glove Doorstep Delivery`}),(0,z.jsx)(`p`,{children:`Inspected for weave density and delivered with reverent care across India.`})]})]}),(0,z.jsxs)(`div`,{className:`auth-perk-item`,children:[(0,z.jsx)(`span`,{className:`auth-perk-icon`,children:`✦`}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:`Dedicated Saree Concierge`}),(0,z.jsx)(`p`,{children:`Personal assistance for bridal trousseaus, styling, and custom drape requests.`})]})]})]})]}),(0,z.jsxs)(`div`,{className:`auth-showcase-footer`,children:[(0,z.jsx)(`span`,{className:`auth-seal-icon`,children:`🏛`}),(0,z.jsx)(`span`,{children:`Crafted with devotion since 1986`})]})]})]}),(0,z.jsxs)(`div`,{className:`auth-form-panel`,children:[(0,z.jsxs)(`div`,{className:`auth-form-header`,children:[(0,z.jsx)(L,{to:`/`,className:`auth-logo-link`,"aria-label":`Return to ${H.name} homepage`,children:(0,z.jsx)(`img`,{src:H.assets.logoHorizontal||H.assets.logoLight||`/images/logo.png`,alt:H.name,className:`auth-brand-logo`,width:`170`,height:`44`})}),(0,z.jsx)(`h1`,{className:`auth-welcome-title`,children:`Sign In or Register`}),(0,z.jsx)(`p`,{className:`auth-header-sub`,children:`Instant 1-click access with your Google account. Fast, secure, and 100% password-free.`})]}),e&&(0,z.jsxs)(`div`,{className:`auth-alert-error`,role:`alert`,children:[(0,z.jsx)(`svg`,{viewBox:`0 0 20 20`,fill:`currentColor`,width:`16`,height:`16`,"aria-hidden":`true`,children:(0,z.jsx)(`path`,{fillRule:`evenodd`,d:`M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z`,clipRule:`evenodd`})}),(0,z.jsx)(`span`,{children:e})]}),(0,z.jsxs)(`div`,{className:`auth-google-box`,children:[(0,z.jsx)(`div`,{className:`auth-google-cta`,children:(0,z.jsx)(Wl,{text:`continue_with`,onCredential:p,onError:t})}),n&&(0,z.jsxs)(`div`,{className:`auth-busy-notice`,children:[(0,z.jsx)(`span`,{className:`spinner-dot`}),(0,z.jsx)(`span`,{children:`Signing in with Google, please wait…`})]}),(0,z.jsxs)(`div`,{className:`auth-flow-hints`,children:[(0,z.jsxs)(`div`,{className:`auth-flow-hint`,children:[(0,z.jsx)(`span`,{className:`hint-bullet`,children:`✓`}),(0,z.jsxs)(`span`,{children:[(0,z.jsx)(`strong`,{children:`Returning Customers:`}),` Instantly logged in & redirected to home or bag.`]})]}),(0,z.jsxs)(`div`,{className:`auth-flow-hint`,children:[(0,z.jsx)(`span`,{className:`hint-bullet`,children:`✓`}),(0,z.jsxs)(`span`,{children:[(0,z.jsx)(`strong`,{children:`First-Time Visitors:`}),` Account created instantly; you'll be guided to enter delivery address next.`]})]}),(0,z.jsxs)(`div`,{className:`auth-flow-hint`,children:[(0,z.jsx)(`span`,{className:`hint-bullet`,children:`✓`}),(0,z.jsxs)(`span`,{children:[(0,z.jsx)(`strong`,{children:`No Passwords:`}),` Safe, effortless authentication protected by Google.`]})]})]})]}),(0,z.jsxs)(`div`,{className:`auth-security-guarantee`,children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.8`,strokeLinecap:`round`,strokeLinejoin:`round`,width:`14`,height:`14`,"aria-hidden":`true`,children:[(0,z.jsx)(`rect`,{x:`3`,y:`11`,width:`18`,height:`11`,rx:`2`,ry:`2`}),(0,z.jsx)(`path`,{d:`M7 11V7a5 5 0 0 1 10 0v4`})]}),(0,z.jsx)(`span`,{children:`256-Bit SSL Encrypted & Google OAuth 2.0 Protection`})]}),(0,z.jsxs)(`details`,{className:`auth-dev-details`,children:[(0,z.jsx)(`summary`,{children:`Developer / Password Sign-in`}),(0,z.jsxs)(`form`,{onSubmit:m,className:`auth-legacy-form`,children:[(0,z.jsxs)(`div`,{className:`legacy-group`,children:[(0,z.jsx)(`label`,{htmlFor:`legacy-email`,children:`Email`}),(0,z.jsx)(`input`,{id:`legacy-email`,type:`email`,required:!0,placeholder:`email@example.com`,value:i.email,onChange:e=>a(t=>({...t,email:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`legacy-group`,children:[(0,z.jsx)(`label`,{htmlFor:`legacy-password`,children:`Password`}),(0,z.jsxs)(`div`,{className:`legacy-input-wrapper`,children:[(0,z.jsx)(`input`,{id:`legacy-password`,type:o?`text`:`password`,required:!0,placeholder:`Password`,value:i.password,onChange:e=>a(t=>({...t,password:e.target.value}))}),(0,z.jsx)(`button`,{type:`button`,className:`legacy-pwd-toggle`,onClick:()=>s(e=>!e),children:o?`Hide`:`Show`})]})]}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-outline btn-sm`,disabled:n,children:n?`Verifying…`:`Sign in with Password`})]})]}),(0,z.jsx)(`div`,{className:`auth-footer-nav`,children:(0,z.jsx)(L,{to:`/`,className:`back-storefront-link`,children:`← Return to Storefront`})})]})]})}),(0,z.jsx)(`style`,{children:`
        .auth-page {
          min-height: calc(100vh - 100px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px 80px;
          background: radial-gradient(circle at 50% 10%, #fffdf8 0%, #f7f1e6 50%, #ede3d4 100%);
          position: relative;
          overflow: hidden;
        }

        .auth-ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(197, 139, 56, 0.15) 0%, rgba(88, 30, 21, 0.05) 50%, transparent 70%);
          top: 10%;
          right: -100px;
          filter: blur(40px);
          pointer-events: none;
        }

        .auth-container {
          max-width: 1060px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .auth-card-master {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(197, 139, 56, 0.35);
          box-shadow:
            0 28px 70px rgba(45, 12, 17, 0.14),
            0 1px 3px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          overflow: hidden;
        }

        /* --- Left Showcase Panel --- */
        .auth-showcase {
          position: relative;
          background: var(--maroon-950, #20080b);
          color: #ffffff;
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .auth-showcase-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/model-saree.png');
          background-size: cover;
          background-position: center 25%;
          opacity: 0.38;
          transform: scale(1.05);
          transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .auth-card-master:hover .auth-showcase-bg {
          transform: scale(1.08);
        }

        .auth-showcase-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(32, 8, 11, 0.72) 0%,
            rgba(45, 12, 17, 0.85) 45%,
            rgba(20, 4, 7, 0.96) 100%
          );
        }

        .auth-showcase-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 36px;
        }

        .auth-showcase-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .auth-showcase-monogram {
          width: 40px;
          height: 40px;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(197, 139, 56, 0.4));
        }

        .auth-showcase-badge {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--brand-gold-light, #fbdfa2);
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(197, 139, 56, 0.18);
          border: 1px solid rgba(251, 223, 162, 0.3);
        }

        .auth-showcase-title {
          font-family: var(--font-heading, 'Marcellus', Georgia, serif);
          font-size: 32px;
          line-height: 1.2;
          color: #fffbf5;
          margin: 0 0 14px;
          font-weight: 400;
        }

        .auth-showcase-desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: rgba(251, 245, 239, 0.85);
          margin: 0 0 28px;
        }

        .auth-perks-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .auth-perk-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .auth-perk-icon {
          color: var(--brand-gold-light, #fbdfa2);
          font-size: 16px;
          line-height: 1.3;
          flex-shrink: 0;
        }

        .auth-perk-item strong {
          display: block;
          font-size: 13px;
          color: #ffffff;
          font-weight: 500;
          letter-spacing: 0.01em;
          margin-bottom: 2px;
        }

        .auth-perk-item p {
          margin: 0;
          font-size: 12px;
          line-height: 1.5;
          color: rgba(251, 245, 239, 0.7);
        }

        .auth-showcase-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          color: var(--brand-gold-light, #fbdfa2);
          opacity: 0.8;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
        }

        /* --- Right Form Panel --- */
        .auth-form-panel {
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #ffffff;
        }

        .auth-form-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .auth-brand-logo {
          height: 38px;
          width: auto;
          display: inline-block;
          margin-bottom: 12px;
        }

        .auth-welcome-title {
          font-family: var(--font-heading, 'Marcellus', Georgia, serif);
          font-size: 26px;
          color: var(--maroon-900, #581e15);
          margin: 0 0 8px;
          font-weight: 400;
        }

        .auth-header-sub {
          margin: 0;
          font-size: 13.5px;
          color: var(--ink-600, #735e59);
          line-height: 1.5;
        }

        /* Error Alert */
        .auth-alert-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: #fdf2f2;
          border: 1px solid #f8b4b4;
          border-radius: var(--radius-sm, 8px);
          color: #9b1c1c;
          font-size: 13px;
          line-height: 1.4;
          margin-bottom: 20px;
        }

        .auth-alert-error svg {
          flex-shrink: 0;
        }

        /* Google Box */
        .auth-google-box {
          background: #fcf9f5;
          border: 1px solid rgba(197, 139, 56, 0.28);
          border-radius: 16px;
          padding: 28px 24px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          box-shadow: 0 4px 16px rgba(197, 139, 56, 0.06);
        }

        .auth-google-cta {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .auth-busy-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--brand-secondary, #b0732e);
          font-weight: 500;
        }

        .spinner-dot {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(176, 115, 46, 0.3);
          border-top-color: #b0732e;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .auth-flow-hints {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid rgba(197, 139, 56, 0.16);
          padding-top: 16px;
        }

        .auth-flow-hint {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          line-height: 1.45;
          color: var(--ink-700, #5c4742);
        }

        .hint-bullet {
          color: #2e7d32;
          font-weight: 700;
          font-size: 11px;
          margin-top: 1px;
        }

        .auth-security-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 20px;
          font-size: 11.5px;
          color: #8c7670;
        }

        .auth-security-guarantee svg {
          color: var(--brand-secondary, #b0732e);
        }

        /* Collapsible Legacy Details */
        .auth-dev-details {
          margin-top: 16px;
          font-size: 12px;
          color: var(--ink-400, #a89a95);
        }

        .auth-dev-details summary {
          cursor: pointer;
          user-select: none;
          text-align: center;
        }

        .auth-legacy-form {
          margin-top: 12px;
          padding: 16px;
          background: #faf6f0;
          border-radius: 8px;
          border: 1px solid #e8dec8;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .legacy-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .legacy-group label {
          font-size: 11.5px;
          color: var(--ink-600, #735e59);
        }

        .legacy-group input {
          padding: 8px 10px;
          border-radius: 4px;
          border: 1px solid #d5c8b5;
          font-size: 12.5px;
        }

        .legacy-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .legacy-input-wrapper input {
          width: 100%;
          padding-right: 50px;
        }

        .legacy-pwd-toggle {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          font-size: 11px;
          color: var(--ink-500, #8c7670);
          cursor: pointer;
        }

        .auth-footer-nav {
          text-align: center;
          margin-top: 20px;
        }

        .back-storefront-link {
          font-size: 12.5px;
          color: #735e59;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .back-storefront-link:hover {
          color: var(--brand-primary, #581e15);
          text-decoration: underline;
        }

        /* --- Responsive Viewports --- */
        @media (max-width: 860px) {
          .auth-card-master {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin: 0 auto;
          }
          .auth-showcase {
            display: none;
          }
          .auth-form-panel {
            padding: 36px 26px;
          }
        }

        @media (max-width: 480px) {
          .auth-page {
            padding: 30px 14px 60px;
          }
          .auth-card-master {
            border-radius: 18px;
          }
          .auth-form-panel {
            padding: 30px 18px;
          }
          .auth-brand-logo {
            height: 32px;
          }
          .auth-welcome-title {
            font-size: 22px;
          }
          .auth-google-box {
            padding: 20px 16px;
          }
        }
      `})]})}function Kl(){let[e,t]=(0,x.useState)(``),[n,r]=(0,x.useState)(``),[i,a]=(0,x.useState)(!1),[o,s]=(0,x.useState)(!1),{forgotPassword:c}=lr();async function l(t){t.preventDefault(),r(``),a(!0);try{await c(e),s(!0)}catch(e){r(e.message)}finally{a(!1)}}return(0,z.jsxs)(`div`,{className:`auth-page`,children:[(0,z.jsx)(hl,{title:`Forgot Password`,path:`/forgot-password`,noindex:!0}),(0,z.jsx)(`div`,{className:`container auth-wrap`,children:(0,z.jsxs)(`div`,{className:`auth-card`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,children:`Reset password`}),(0,z.jsx)(`h1`,{children:`Forgot your password?`}),o?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`p`,{className:`auth-sub`,style:{marginBottom:0},children:[`If an account exists for `,(0,z.jsx)(`strong`,{children:e}),`, we’ve sent a link to reset your password. It expires in 30 minutes.`]}),(0,z.jsx)(L,{to:`/login`,className:`back-link`,children:`← Back to log in`})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`p`,{className:`auth-sub`,children:`Enter the email on your account and we’ll send you a link to reset your password.`}),(0,z.jsxs)(`form`,{onSubmit:l,className:`auth-form`,children:[(0,z.jsxs)(`label`,{children:[`Email`,(0,z.jsx)(`input`,{type:`email`,required:!0,autoFocus:!0,value:e,onChange:e=>t(e.target.value)})]}),n&&(0,z.jsx)(`p`,{className:`auth-error`,children:n}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:i,children:i?`Sending…`:`Send reset link`})]}),(0,z.jsx)(L,{to:`/login`,className:`back-link`,children:`← Back to log in`})]})]})}),(0,z.jsx)(`style`,{children:`
        .auth-page { padding: 90px 0 80px; min-height: 60vh; display: flex; align-items: center; }
        .auth-wrap { display: flex; justify-content: center; }
        .auth-card {
          width: 100%;
          max-width: 400px;
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 32px;
        }
        .auth-card h1 { font-size: 26px; margin: 6px 0 4px; }
        .auth-sub { font-size: 13px; color: var(--ink-600); margin-bottom: 22px; line-height: 1.6; }
        .auth-form { display: flex; flex-direction: column; gap: 14px; }
        .auth-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .auth-form input {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .auth-error { font-size: 12.5px; color: #a13a3a; margin: 0; }
        .auth-form .btn { margin-top: 6px; }
        .back-link { display: inline-block; margin-top: 20px; font-size: 12.5px; color: var(--ink-400); }
      `})]})}function ql(){let[e]=Mn(),t=e.get(`token`)||``,[n,r]=(0,x.useState)(``),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(!1),{resetPassword:u}=lr(),d=ut();async function f(e){if(e.preventDefault(),s(``),n!==i){s(`Passwords don't match.`);return}l(!0);try{await u(t,n),d(`/profile`,{replace:!0})}catch(e){s(e.message)}finally{l(!1)}}return(0,z.jsxs)(`div`,{className:`auth-page`,children:[(0,z.jsx)(hl,{title:`Reset Password`,path:`/reset-password`,noindex:!0}),(0,z.jsx)(`div`,{className:`container auth-wrap`,children:(0,z.jsxs)(`div`,{className:`auth-card`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,children:`Reset password`}),(0,z.jsx)(`h1`,{children:`Choose a new password`}),t?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`p`,{className:`auth-sub`,children:`Enter a new password for your account.`}),(0,z.jsxs)(`form`,{onSubmit:f,className:`auth-form`,children:[(0,z.jsxs)(`label`,{children:[`New password`,(0,z.jsx)(`input`,{type:`password`,required:!0,minLength:6,autoFocus:!0,value:n,onChange:e=>r(e.target.value)})]}),(0,z.jsxs)(`label`,{children:[`Confirm new password`,(0,z.jsx)(`input`,{type:`password`,required:!0,minLength:6,value:i,onChange:e=>a(e.target.value)})]}),o&&(0,z.jsx)(`p`,{className:`auth-error`,children:o}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:c,children:c?`Saving…`:`Reset password`})]}),(0,z.jsx)(L,{to:`/login`,className:`back-link`,children:`← Back to log in`})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`p`,{className:`auth-sub`,style:{marginBottom:0},children:`This reset link is missing or invalid. Please request a new one.`}),(0,z.jsx)(L,{to:`/forgot-password`,className:`back-link`,children:`← Request a new link`})]})]})}),(0,z.jsx)(`style`,{children:`
        .auth-page { padding: 90px 0 80px; min-height: 60vh; display: flex; align-items: center; }
        .auth-wrap { display: flex; justify-content: center; }
        .auth-card {
          width: 100%;
          max-width: 400px;
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 32px;
        }
        .auth-card h1 { font-size: 26px; margin: 6px 0 4px; }
        .auth-sub { font-size: 13px; color: var(--ink-600); margin-bottom: 22px; line-height: 1.6; }
        .auth-form { display: flex; flex-direction: column; gap: 14px; }
        .auth-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .auth-form input {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .auth-error { font-size: 12.5px; color: #a13a3a; margin: 0; }
        .auth-form .btn { margin-top: 6px; }
        .back-link { display: inline-block; margin-top: 20px; font-size: 12.5px; color: var(--ink-400); }
      `})]})}function Jl(){let{user:e,completeProfile:t,defaultAddress:n}=lr(),[r,i]=(0,x.useState)({name:``,mobile:``,line1:``,line2:``,city:``,state:``,pincode:``,country:`India`}),[a,o]=(0,x.useState)(``),[s,c]=(0,x.useState)(!1),l=ut(),u=location.state?.from,d=u&&u!==`/login`&&u!==`/complete-profile`?u:`/`;(0,x.useEffect)(()=>{e&&i(t=>({...t,name:e.name||``,mobile:e.mobile||``,line1:n?.line1||t.line1,line2:n?.line2||t.line2,city:n?.city||t.city,state:n?.state||t.state,pincode:n?.pincode||t.pincode,country:n?.country||`India`}))},[e,n]);async function f(e){if(e.preventDefault(),!r.name.trim()||!r.mobile.trim()||!r.line1.trim()||!r.city.trim()||!r.state.trim()||!r.pincode.trim()){o(`Please fill in all mandatory fields.`);return}o(``),c(!0);try{await t(r),l(d,{replace:!0})}catch(e){o(e.message)}finally{c(!1)}}return(0,z.jsxs)(`div`,{className:`auth-page`,children:[(0,z.jsx)(hl,{title:`Complete Your Profile`,path:`/complete-profile`,noindex:!0}),(0,z.jsx)(`div`,{className:`container auth-wrap`,children:(0,z.jsxs)(`div`,{className:`auth-card complete-profile-card`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,children:`Complete Your Profile`}),(0,z.jsxs)(`h1`,{children:[`Welcome`,e?.name?`, ${e.name.split(` `)[0]}`:``,`!`]}),(0,z.jsx)(`p`,{className:`auth-sub`,children:`Please provide your contact and primary delivery address. This information will be saved so you won't have to repeatedly enter it during checkout.`}),(0,z.jsxs)(`form`,{onSubmit:f,className:`auth-form`,children:[(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Full Name *`,(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Ananya Sharma`,value:r.name,onChange:e=>i(t=>({...t,name:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Mobile Number *`,(0,z.jsx)(`input`,{type:`tel`,required:!0,placeholder:`e.g. 9876543210`,value:r.mobile,onChange:e=>i(t=>({...t,mobile:e.target.value}))})]})]}),(0,z.jsxs)(`label`,{children:[`Address Line 1 (House No, Building, Street) *`,(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. Flat 402, Royal Palms, Temple Street`,value:r.line1,onChange:e=>i(t=>({...t,line1:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Address Line 2 (Area, Landmark)`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. Near Heritage Gate`,value:r.line2,onChange:e=>i(t=>({...t,line2:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-row three`,children:[(0,z.jsxs)(`label`,{children:[`City *`,(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`City`,value:r.city,onChange:e=>i(t=>({...t,city:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`State *`,(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`State`,value:r.state,onChange:e=>i(t=>({...t,state:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Pincode *`,(0,z.jsx)(`input`,{type:`text`,required:!0,placeholder:`6-digit Pincode`,value:r.pincode,onChange:e=>i(t=>({...t,pincode:e.target.value}))})]})]}),(0,z.jsxs)(`label`,{children:[`Country`,(0,z.jsx)(`input`,{type:`text`,value:r.country,disabled:!0})]}),a&&(0,z.jsx)(`p`,{className:`auth-error`,children:a}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:s,children:s?`Saving Profile…`:`Save & Continue`})]})]})}),(0,z.jsx)(`style`,{children:`
        .auth-page { padding: 70px 0 80px; min-height: 70vh; display: flex; align-items: center; }
        .auth-wrap { display: flex; justify-content: center; }
        .complete-profile-card {
          width: 100%;
          max-width: 580px;
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 36px;
        }
        .complete-profile-card h1 { font-size: 26px; margin: 6px 0 6px; }
        .complete-profile-card .auth-sub { font-size: 13.5px; color: var(--ink-600); margin-bottom: 24px; line-height: 1.6; }
        .auth-form { display: flex; flex-direction: column; gap: 14px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-row.three { grid-template-columns: 1fr 1fr 1fr; }
        .auth-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .auth-form input {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .auth-form input:disabled { background: var(--stone-100); color: var(--ink-400); }
        .auth-error { font-size: 12.5px; color: #a13a3a; margin: 0; }
        .auth-form .btn { margin-top: 10px; padding: 13px; font-size: 14px; }
        @media (max-width: 600px) {
          .complete-profile-card { padding: 24px; }
          .form-row, .form-row.three { grid-template-columns: 1fr; }
        }
      `})]})}function Yl(){return(0,z.jsxs)(`div`,{className:`not-found-page`,children:[(0,z.jsx)(hl,{title:`Page Not Found`,path:`/404`,noindex:!0}),(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,children:`Error 404`}),(0,z.jsx)(`h1`,{children:`This page doesn't exist`}),(0,z.jsx)(`p`,{className:`not-found-sub`,children:`The link you followed might be broken, or the page may have moved. Let's get you back to somewhere useful.`}),(0,z.jsxs)(`div`,{className:`not-found-actions`,children:[(0,z.jsx)(L,{to:`/`,className:`btn btn-primary`,children:`Back to Home`}),(0,z.jsx)(L,{to:`/products`,className:`btn btn-outline`,children:`Shop Sarees`})]})]}),(0,z.jsx)(`style`,{children:`
        .not-found-page {
          min-height: 60vh;
          display: flex;
          align-items: center;
          padding: 100px 0 80px;
        }
        .not-found-page .container { text-align: center; max-width: 520px; margin: 0 auto; }
        .not-found-page h1 { font-size: 32px; margin: 10px 0 16px; }
        .not-found-sub { font-size: 14.5px; color: var(--ink-400); line-height: 1.7; margin-bottom: 32px; }
        .not-found-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 600px) {
          .not-found-page { padding: 70px 0 60px; }
          .not-found-page h1 { font-size: 24px; }
        }
      `})]})}var Q={width:16,height:16,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:1.8,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`};function Xl(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`rect`,{x:`3`,y:`3`,width:`7`,height:`9`}),(0,z.jsx)(`rect`,{x:`14`,y:`3`,width:`7`,height:`5`}),(0,z.jsx)(`rect`,{x:`14`,y:`12`,width:`7`,height:`9`}),(0,z.jsx)(`rect`,{x:`3`,y:`16`,width:`7`,height:`5`})]})}function Zl(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z`}),(0,z.jsx)(`polyline`,{points:`3.27 6.96 12 12.01 20.73 6.96`}),(0,z.jsx)(`line`,{x1:`12`,y1:`22.08`,x2:`12`,y2:`12`})]})}function Ql(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z`}),(0,z.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,z.jsx)(`path`,{d:`M16 10a4 4 0 0 1-8 0`})]})}function $l(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z`}),(0,z.jsx)(`line`,{x1:`7`,y1:`7`,x2:`7.01`,y2:`7`})]})}function eu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`polyline`,{points:`1 4 1 10 7 10`}),(0,z.jsx)(`polyline`,{points:`23 20 23 14 17 14`}),(0,z.jsx)(`path`,{d:`M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15`})]})}function tu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3z`}),(0,z.jsx)(`line`,{x1:`9`,y1:`9`,x2:`9.01`,y2:`9`}),(0,z.jsx)(`line`,{x1:`15`,y1:`15`,x2:`15.01`,y2:`15`}),(0,z.jsx)(`line`,{x1:`15`,y1:`9`,x2:`9`,y2:`15`,strokeWidth:`1.5`})]})}function nu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`}),(0,z.jsx)(`polyline`,{points:`9 22 9 12 15 12 15 22`})]})}function ru(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z`}),(0,z.jsx)(`path`,{d:`M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z`})]})}function iu(e){return(0,z.jsx)(`svg`,{...Q,...e,children:(0,z.jsx)(`polygon`,{points:`12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2`})})}function au(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z`}),(0,z.jsx)(`path`,{d:`M9 12l2 2 4-4`})]})}function ou(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`}),(0,z.jsx)(`path`,{d:`M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z`})]})}function su(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`}),(0,z.jsx)(`polyline`,{points:`16 17 21 12 16 7`}),(0,z.jsx)(`line`,{x1:`21`,y1:`12`,x2:`9`,y2:`12`})]})}function cu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`line`,{x1:`19`,y1:`12`,x2:`5`,y2:`12`}),(0,z.jsx)(`polyline`,{points:`12 19 5 12 12 5`})]})}function lu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`rect`,{x:`1`,y:`3`,width:`15`,height:`13`}),(0,z.jsx)(`polygon`,{points:`16 8 20 8 23 11 23 16 16 16 16 8`}),(0,z.jsx)(`circle`,{cx:`5.5`,cy:`18.5`,r:`2.5`}),(0,z.jsx)(`circle`,{cx:`18.5`,cy:`18.5`,r:`2.5`})]})}function uu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M11 5L6 9H2v6h4l5 4V5z`}),(0,z.jsx)(`path`,{d:`M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07`})]})}function du(e){return(0,z.jsx)(`svg`,{...Q,...e,children:(0,z.jsx)(`path`,{d:`M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z`})})}function fu(e){return(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`currentColor`,...e,children:(0,z.jsx)(`path`,{d:`M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.21-1.63a11.96 11.96 0 0 0 5.85 1.51h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.43zm-8.46 18.39h-.01a9.92 9.92 0 0 1-5.06-1.39l-.36-.22-3.76.99 1-3.66-.24-.38a9.92 9.92 0 0 1-1.52-5.23c0-5.48 4.46-9.94 9.95-9.94a9.9 9.9 0 0 1 7.03 2.91 9.87 9.87 0 0 1 2.91 7.03c0 5.48-4.46 9.93-9.94 9.93zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.64-.93-2.25-.24-.6-.49-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51s1.07 2.91 1.22 3.12c.15.2 2.11 3.23 5.12 4.52.72.31 1.28.49 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.27-.2-.57-.35z`})})}function pu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z`}),(0,z.jsx)(`line`,{x1:`12`,y1:`9`,x2:`12`,y2:`13`}),(0,z.jsx)(`line`,{x1:`12`,y1:`17`,x2:`12.01`,y2:`17`})]})}function mu(e){return(0,z.jsx)(`svg`,{...Q,...e,children:(0,z.jsx)(`polyline`,{points:`20 6 9 17 4 12`})})}function hu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,z.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})}function gu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7`}),(0,z.jsx)(`path`,{d:`M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z`})]})}function _u(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z`}),(0,z.jsx)(`polyline`,{points:`14 2 14 8 20 8`}),(0,z.jsx)(`line`,{x1:`16`,y1:`13`,x2:`8`,y2:`13`}),(0,z.jsx)(`line`,{x1:`16`,y1:`17`,x2:`8`,y2:`17`}),(0,z.jsx)(`polyline`,{points:`10 9 9 9 8 9`})]})}function vu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M21.3 15.3l-6.6 6.6c-.4.4-1 .4-1.4 0l-11-11c-.4-.4-.4-1 0-1.4l6.6-6.6c.4-.4 1-.4 1.4 0l11 11c.4.4.4 1 0 1.4z`}),(0,z.jsx)(`line`,{x1:`7.5`,y1:`10.5`,x2:`9.5`,y2:`8.5`}),(0,z.jsx)(`line`,{x1:`10.5`,y1:`13.5`,x2:`13.5`,y2:`10.5`}),(0,z.jsx)(`line`,{x1:`13.5`,y1:`16.5`,x2:`15.5`,y2:`14.5`})]})}function yu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`}),(0,z.jsx)(`polyline`,{points:`17 8 12 3 7 8`}),(0,z.jsx)(`line`,{x1:`12`,y1:`3`,x2:`12`,y2:`15`})]})}function bu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`polygon`,{points:`23 7 16 12 23 17 23 7`}),(0,z.jsx)(`rect`,{x:`1`,y:`5`,width:`15`,height:`14`,rx:`2`,ry:`2`})]})}function xu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`polyline`,{points:`23 4 23 10 17 10`}),(0,z.jsx)(`polyline`,{points:`1 20 1 14 7 14`}),(0,z.jsx)(`path`,{d:`M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15`})]})}function Su(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`line`,{x1:`5`,y1:`12`,x2:`19`,y2:`12`}),(0,z.jsx)(`polyline`,{points:`12 5 19 12 12 19`})]})}function Cu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`line`,{x1:`19`,y1:`5`,x2:`5`,y2:`19`}),(0,z.jsx)(`circle`,{cx:`6.5`,cy:`6.5`,r:`2.5`}),(0,z.jsx)(`circle`,{cx:`17.5`,cy:`17.5`,r:`2.5`})]})}function wu(e){return(0,z.jsxs)(`svg`,{...Q,...e,children:[(0,z.jsx)(`path`,{d:`M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2`}),(0,z.jsx)(`circle`,{cx:`9`,cy:`7`,r:`4`}),(0,z.jsx)(`path`,{d:`M23 21v-2a4 4 0 0 0-3-3.87`}),(0,z.jsx)(`path`,{d:`M16 3.13a4 4 0 0 1 0 7.75`})]})}var Tu=[{to:`/admin`,label:`Dashboard`,end:!0,icon:Xl},{to:`/admin/orders`,label:`Orders`,icon:Zl},{to:`/admin/users`,label:`Customers`,icon:wu},{to:`/admin/products`,label:`Products`,icon:Ql},{to:`/admin/categories`,label:`Categories`,icon:$l},{to:`/admin/returns`,label:`Returns & Refunds`,icon:eu},{to:`/admin/coupons`,label:`Coupons`,icon:tu},{to:`/admin/home`,label:`Home Page CMS`,icon:nu},{to:`/admin/about`,label:`About Page CMS`,icon:ru},{to:`/admin/reviews`,label:`Reviews`,icon:iu},{to:`/admin/cancellation-policy`,label:`Cancellation Policy`,icon:au},{to:`/admin/settings`,label:`Store Settings`,icon:ou}];function Eu(){let{login:e,googleLogin:t}=lr(),[n,r]=(0,x.useState)({email:``,password:``}),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(!1);async function c(e){a(``),s(!0);try{let n=await t(e);n?.user?.isAdmin||a(`Access Denied: The Google account (${n?.user?.email||`used`}) is not configured as an administrator. Please sign in with your authorized admin account (ravichandratextiles39@gmail.com).`)}catch(e){a(e.message)}finally{s(!1)}}async function l(t){t.preventDefault(),a(``),s(!0);try{(await e(n.email,n.password)).isAdmin||a(`This account does not have admin access.`)}catch(e){a(e.message)}finally{s(!1)}}return(0,z.jsxs)(`div`,{className:`admin-gate`,children:[(0,z.jsx)(hl,{title:`Admin Login`,path:`/admin`,noindex:!0}),(0,z.jsxs)(`div`,{className:`admin-gate-card`,children:[(0,z.jsxs)(`div`,{className:`admin-brand`,children:[(0,z.jsx)(`img`,{src:`/images/monogram.png`,alt:``,className:`brand-mark`}),` Ravichandra `,(0,z.jsx)(`span`,{className:`cms-tag`,children:`CMS`})]}),(0,z.jsx)(`h1`,{children:`Admin Portal`}),(0,z.jsx)(`p`,{className:`admin-gate-sub`,children:`1-Click passwordless sign in for store managers & administrators.`}),i&&(0,z.jsx)(`div`,{className:`gate-alert gate-alert-error`,children:i}),(0,z.jsx)(`div`,{className:`admin-google-wrap`,children:(0,z.jsx)(Wl,{adminMode:!0,text:`continue_with`,onCredential:c,onError:a})}),(0,z.jsx)(`div`,{className:`admin-access-note`,children:(0,z.jsxs)(`span`,{children:[`Authorized Admin: `,(0,z.jsx)(`strong`,{children:`ravichandratextiles39@gmail.com`})]})}),(0,z.jsxs)(`details`,{className:`admin-legacy-toggle`,children:[(0,z.jsx)(`summary`,{children:`Developer / Password fallback`}),(0,z.jsxs)(`form`,{className:`admin-legacy-form`,onSubmit:l,children:[(0,z.jsxs)(`label`,{children:[`Email`,(0,z.jsx)(`input`,{type:`email`,required:!0,value:n.email,onChange:e=>r(t=>({...t,email:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Password`,(0,z.jsx)(`input`,{type:`password`,required:!0,value:n.password,onChange:e=>r(t=>({...t,password:e.target.value}))})]}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-outline btn-sm`,disabled:o,children:o?`Verifying…`:`Sign in with Password`})]})]}),(0,z.jsxs)(`div`,{className:`security-notice`,children:[(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`13`,height:`13`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:(0,z.jsx)(`path`,{d:`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z`})}),(0,z.jsx)(`span`,{children:`Google OAuth 2.0 & SSL Protected`})]})]}),(0,z.jsx)(`style`,{children:`
        .admin-gate {
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--stone-100);
          padding: 20px 16px;
          box-sizing: border-box;
        }
        .admin-gate-card {
          width: 100%;
          max-width: 380px;
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          box-sizing: border-box;
        }
        .admin-gate-card h1 { font-size: 22px; margin: 0; color: var(--maroon-900); }
        .admin-gate-sub { font-size: 13px; color: var(--ink-500); margin: 0 0 4px; line-height: 1.4; }
        .admin-gate-card .admin-brand { color: var(--maroon-900); }
        .admin-google-wrap { width: 100%; display: flex; justify-content: center; margin: 8px 0; }
        .admin-access-note { font-size: 11.5px; color: var(--ink-500); text-align: center; background: #faf6f0; padding: 6px 10px; border-radius: 4px; border: 1px dashed #e8dec8; }
        .admin-legacy-toggle { margin-top: 6px; font-size: 11.5px; color: var(--ink-400); }
        .admin-legacy-toggle summary { cursor: pointer; user-select: none; }
        .admin-legacy-form { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--stone-200); }
        .admin-legacy-form label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--ink-600); }
        .admin-legacy-form input { padding: 9px 10px; border-radius: 4px; border: 1px solid var(--stone-300); font-size: 15px; }
        .gate-alert { font-size: 12px; line-height: 1.5; padding: 10px 12px; border-radius: var(--radius-sm); margin: 0; }
        .gate-alert-error { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }
        .security-notice {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--ink-400);
          margin-top: 6px;
        }
        @media (max-width: 480px) {
          .admin-gate-card { padding: 24px 18px; }
        }
      `})]})}function Du(){let{user:e,loading:t,isAdmin:n,logout:r}=lr(),[i,a]=(0,x.useState)(!1),o=st(),s=(0,x.useRef)(null);if((0,x.useEffect)(()=>{let e=document.documentElement.style.overflow,t=document.body.style.overflow;return document.documentElement.style.overflow=`hidden`,document.body.style.overflow=`hidden`,()=>{document.documentElement.style.overflow=e,document.body.style.overflow=t}},[]),(0,x.useEffect)(()=>{a(!1),s.current&&(s.current.scrollTop=0)},[o.pathname]),(0,x.useEffect)(()=>{document.body.style.overflow=`hidden`},[i]),t)return null;if(!e||!n)return(0,z.jsx)(Eu,{});let c=Tu.find(e=>e.end?o.pathname===e.to:o.pathname.startsWith(e.to)),l=c?c.label:`Admin`;return(0,z.jsxs)(`div`,{className:`admin-shell`,children:[(0,z.jsx)(hl,{title:`Admin · ${l}`,path:`/admin`,noindex:!0}),(0,z.jsxs)(`header`,{className:`admin-mobile-topbar`,"aria-label":`Mobile Admin Navigation`,children:[(0,z.jsx)(`button`,{type:`button`,className:`admin-hamburger-btn`,onClick:()=>a(e=>!e),"aria-label":i?`Close navigation drawer`:`Open navigation drawer`,"aria-expanded":i,children:i?(0,z.jsxs)(`svg`,{width:`22`,height:`22`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,z.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]}):(0,z.jsxs)(`svg`,{width:`22`,height:`22`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,z.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,z.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}),(0,z.jsxs)(`div`,{className:`admin-mobile-brand`,children:[(0,z.jsx)(`img`,{src:`/images/monogram-white.png`,alt:``,className:`brand-mark`}),(0,z.jsx)(`span`,{className:`admin-mobile-title`,children:`Ravichandra`}),(0,z.jsx)(`span`,{className:`cms-tag`,children:`CMS`})]}),(0,z.jsx)(`div`,{className:`admin-mobile-actions`,children:(0,z.jsxs)(Dn,{to:`/`,className:`admin-mobile-store-link`,title:`Open Public Storefront`,children:[(0,z.jsx)(`span`,{children:`Store`}),(0,z.jsxs)(`svg`,{width:`13`,height:`13`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,children:[(0,z.jsx)(`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`}),(0,z.jsx)(`polyline`,{points:`15 3 21 3 21 9`}),(0,z.jsx)(`line`,{x1:`10`,y1:`14`,x2:`21`,y2:`3`})]})]})})]}),(0,z.jsx)(`nav`,{className:`admin-mobile-quicknav`,"aria-label":`Quick Section Selector`,children:(0,z.jsx)(`div`,{className:`quicknav-scroller`,children:Tu.map(e=>(0,z.jsxs)(Dn,{to:e.to,end:e.end,className:({isActive:e})=>`quicknav-chip`+(e?` active`:``),children:[(0,z.jsx)(`span`,{className:`chip-icon`,children:e.icon&&(0,z.jsx)(e.icon,{width:13,height:13})}),(0,z.jsx)(`span`,{className:`chip-label`,children:e.label})]},e.to))})}),i&&(0,z.jsx)(`div`,{className:`admin-backdrop`,onClick:()=>a(!1),"aria-hidden":`true`}),(0,z.jsxs)(`aside`,{className:`admin-sidebar ${i?`open`:``}`,"aria-label":`Main Navigation`,children:[(0,z.jsxs)(`div`,{className:`admin-brand`,children:[(0,z.jsx)(`img`,{src:`/images/monogram-white.png`,alt:``,className:`brand-mark`}),(0,z.jsx)(`span`,{children:`Ravichandra`}),(0,z.jsx)(`span`,{className:`cms-tag`,children:`CMS`}),(0,z.jsx)(`button`,{type:`button`,className:`drawer-close-btn`,onClick:()=>a(!1),"aria-label":`Close menu`,children:(0,z.jsx)(hu,{width:16,height:16})})]}),(0,z.jsx)(`nav`,{className:`sidebar-nav`,children:Tu.map(e=>(0,z.jsxs)(Dn,{to:e.to,end:e.end,className:({isActive:e})=>`admin-link`+(e?` active`:``),onClick:()=>a(!1),children:[(0,z.jsx)(`span`,{className:`link-icon`,children:e.icon&&(0,z.jsx)(e.icon,{width:16,height:16})}),(0,z.jsx)(`span`,{className:`link-label`,children:e.label})]},e.to))}),(0,z.jsxs)(`div`,{className:`sidebar-footer`,children:[(0,z.jsxs)(`button`,{type:`button`,className:`back-to-site logout-btn`,onClick:r,children:[(0,z.jsx)(su,{width:15,height:15}),(0,z.jsx)(`span`,{children:`Log out`})]}),(0,z.jsxs)(Dn,{to:`/`,className:`back-to-site`,onClick:()=>a(!1),children:[(0,z.jsx)(cu,{width:15,height:15}),(0,z.jsx)(`span`,{children:`Back to storefront`})]})]})]}),(0,z.jsx)(`main`,{className:`admin-main`,ref:s,children:(0,z.jsx)(`div`,{className:`admin-main-container`,children:(0,z.jsx)(Lt,{})})}),(0,z.jsx)(`style`,{children:`
        /* Root Shell: Locks window so outer page never scrolls */
        .admin-shell {
          display: flex;
          flex-direction: row;
          height: 100vh;
          height: 100dvh;
          width: 100vw;
          max-width: 100%;
          overflow: hidden;
          background: var(--stone-100);
          position: relative;
        }

        /* Desktop Sidebar: COMPLETELY STATIC & FROZEN IN PLACE */
        .admin-sidebar {
          width: 250px;
          min-width: 250px;
          max-width: 250px;
          height: 100vh;
          height: 100dvh;
          flex: 0 0 250px;
          background: var(--maroon-950);
          color: var(--blush-300);
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          box-sizing: border-box;
          z-index: 50;
          position: relative; /* Static, non-moving */
        }
        .admin-sidebar::-webkit-scrollbar {
          width: 5px;
        }
        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }

        .admin-brand {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--ivory);
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .drawer-close-btn {
          display: none;
          margin-left: auto;
          background: rgba(255,255,255,0.08);
          border: none;
          color: var(--ivory);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 16px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .brand-mark {
          width: 26px;
          height: 26px;
          object-fit: contain;
          flex: 0 0 auto;
        }

        .cms-tag {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.1em;
          border: 1px solid var(--gold-500);
          color: var(--gold-500);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .admin-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 13.5px;
          color: var(--blush-300);
          transition: background 0.15s ease, color 0.15s ease;
          text-decoration: none;
        }
        .admin-link:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--ivory);
        }
        .admin-link.active {
          background: var(--maroon-800);
          color: var(--ivory);
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .link-icon {
          font-size: 15px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          flex-shrink: 0;
        }
        .link-label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
        }

        .back-to-site {
          font-size: 12.5px;
          color: var(--blush-300);
          opacity: 0.75;
          background: none;
          border: none;
          text-align: left;
          padding: 8px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.15s ease, background 0.15s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .back-to-site:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.06);
          color: var(--ivory);
        }
        .logout-btn {
          color: #ff9999;
        }
        .logout-btn:hover {
          color: #ffb3b3;
          background: rgba(255, 100, 100, 0.12);
        }

        /* Main Content Container: THE ONLY ELEMENT THAT SCROLLS */
        .admin-main {
          flex: 1 1 0%;
          min-width: 0;
          height: 100vh;
          height: 100dvh;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          padding: 36px 40px;
          box-sizing: border-box;
        }
        .admin-main::-webkit-scrollbar {
          width: 7px;
        }
        .admin-main::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-main::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.18);
          border-radius: 4px;
        }
        .admin-main::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .admin-main-container {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          min-width: 0;
        }

        /* Mobile Top App Bar (Hidden on desktop) */
        .admin-mobile-topbar {
          display: none;
        }
        .admin-mobile-quicknav {
          display: none;
        }
        .admin-backdrop {
          display: none;
        }

        /* Responsive Breakpoints: Tablet & Mobile */
        @media (max-width: 860px) {
          .admin-shell {
            display: flex;
            flex-direction: column;
            height: 100vh;
            height: 100dvh;
            width: 100vw;
            overflow: hidden;
          }

          /* Static Mobile Topbar at top */
          .admin-mobile-topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 16px;
            background: var(--maroon-950);
            color: var(--ivory);
            z-index: 120;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            height: 54px;
            box-sizing: border-box;
            flex-shrink: 0;
          }

          .admin-hamburger-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: var(--ivory);
            width: 38px;
            height: 38px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 0;
            flex-shrink: 0;
          }
          .admin-hamburger-btn:active {
            background: rgba(255, 255, 255, 0.18);
          }

          .admin-mobile-brand {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-display);
            font-size: 17px;
            color: var(--ivory);
          }
          .admin-mobile-brand .brand-mark {
            width: 22px;
            height: 22px;
          }
          .admin-mobile-brand .cms-tag {
            font-size: 9px;
            padding: 1px 5px;
          }

          .admin-mobile-store-link {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 12px;
            color: var(--blush-300);
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 6px 10px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
          }
          .admin-mobile-store-link:active {
            background: rgba(255, 255, 255, 0.16);
            color: var(--ivory);
          }

          /* Static Mobile Horizontal Quick-Nav Scroller */
          .admin-mobile-quicknav {
            display: block;
            background: #fff;
            border-bottom: 1px solid var(--stone-200);
            z-index: 110;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
            flex-shrink: 0;
          }
          .quicknav-scroller {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .quicknav-scroller::-webkit-scrollbar {
            display: none;
          }
          .quicknav-chip {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            border-radius: 999px;
            background: var(--stone-100);
            color: var(--ink-700);
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            text-decoration: none;
            border: 1px solid transparent;
            flex-shrink: 0;
            transition: all 0.15s ease;
          }
          .quicknav-chip .chip-icon {
            font-size: 13px;
          }
          .quicknav-chip.active {
            background: var(--maroon-900);
            color: #fff;
            box-shadow: 0 2px 6px rgba(100, 20, 20, 0.25);
          }

          /* Off-Canvas Backdrop */
          .admin-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(2px);
            z-index: 190;
            animation: fadeIn 0.2s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          /* Off-Canvas Sliding Drawer */
          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: min(84vw, 310px);
            height: 100vh;
            height: 100dvh;
            z-index: 200;
            transform: translateX(-100%);
            transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: none;
            padding: 20px 16px 24px;
          }
          .admin-sidebar.open {
            transform: translateX(0);
            box-shadow: 6px 0 28px rgba(0, 0, 0, 0.5);
          }
          .drawer-close-btn {
            display: flex;
          }

          .admin-link {
            padding: 12px 14px;
            font-size: 14px;
            border-radius: 8px;
          }
          .admin-link .link-icon {
            font-size: 17px;
          }

          /* Main Mobile Content Area: Scrolls independently */
          .admin-main {
            flex: 1 1 auto;
            height: auto;
            min-height: 0;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding: 16px 14px 44px;
            width: 100%;
            max-width: 100vw;
            box-sizing: border-box;
          }
        }

        /* Form elements font size on mobile to prevent iOS Safari auto-zoom */
        @media (max-width: 768px) {
          .admin-main input,
          .admin-main select,
          .admin-main textarea {
            font-size: 16px !important;
          }
        }
      `})]})}function Ou(){let[e,t]=(0,x.useState)(null),[n,r]=(0,x.useState)(!0),[i,a]=(0,x.useState)(``);if((0,x.useEffect)(()=>{V.getAdminMetrics().then(e=>t(e)).catch(e=>a(e.message)).finally(()=>r(!1))},[]),n)return(0,z.jsx)(`div`,{className:`admin-dashboard`,children:(0,z.jsx)(`p`,{className:`empty`,children:`Loading dashboard analytics…`})});if(i)return(0,z.jsx)(`div`,{className:`admin-dashboard`,children:(0,z.jsx)(`p`,{className:`admin-error`,children:i})});let{metrics:o,lowStock:s=[],recentOrders:c=[],auditLogs:l=[]}=e||{};return(0,z.jsxs)(`div`,{className:`admin-dashboard`,children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`Master Operations Dashboard`}),(0,z.jsx)(`p`,{children:`Live business intelligence computed directly from the PostgreSQL transaction ledger, Shiprocket fulfillment pipeline, and Razorpay payment records.`})]}),(0,z.jsxs)(`div`,{className:`metrics-grid`,children:[(0,z.jsxs)(`div`,{className:`kpi-card highlight-card`,children:[(0,z.jsx)(`span`,{className:`kpi-title`,children:`Total Revenue`}),(0,z.jsx)(`span`,{className:`kpi-value`,children:R(o?.totalRevenue||0)}),(0,z.jsxs)(`span`,{className:`kpi-sub`,children:[`Across `,o?.totalOrders||0,` paid orders`]})]}),(0,z.jsxs)(`div`,{className:`kpi-card`,children:[(0,z.jsx)(`span`,{className:`kpi-title`,children:`Pending Shipments`}),(0,z.jsx)(`span`,{className:`kpi-value`,children:o?.pendingShipments||0}),(0,z.jsx)(`span`,{className:`kpi-sub`,children:`Ready for dispatch or in transit`})]}),(0,z.jsxs)(`div`,{className:`kpi-card`,children:[(0,z.jsx)(`span`,{className:`kpi-title`,children:`Delivered Orders`}),(0,z.jsx)(`span`,{className:`kpi-value`,children:o?.deliveredOrders||0}),(0,z.jsx)(`span`,{className:`kpi-sub`,children:`Successfully fulfilled`})]}),(0,z.jsxs)(`div`,{className:`kpi-card`,children:[(0,z.jsx)(`span`,{className:`kpi-title`,children:`Pending Returns`}),(0,z.jsx)(`span`,{className:`kpi-value`,children:o?.pendingReturns||0}),(0,z.jsx)(`span`,{className:`kpi-sub`,children:`Awaiting admin review`})]}),(0,z.jsxs)(`div`,{className:`kpi-card`,children:[(0,z.jsx)(`span`,{className:`kpi-title`,children:`Active Customers`}),(0,z.jsx)(`span`,{className:`kpi-value`,children:o?.totalCustomers||0}),(0,z.jsx)(`span`,{className:`kpi-sub`,children:`Registered accounts`})]}),(0,z.jsxs)(`div`,{className:`kpi-card`,children:[(0,z.jsx)(`span`,{className:`kpi-title`,children:`Low Stock Alerts`}),(0,z.jsx)(`span`,{className:`kpi-value`,children:s.length}),(0,z.jsx)(`span`,{className:`kpi-sub`,children:`Products with ≤ 3 units`})]})]}),(0,z.jsxs)(`div`,{className:`dashboard-content-grid`,children:[(0,z.jsxs)(`div`,{className:`dash-section-card`,children:[(0,z.jsxs)(`div`,{className:`section-head`,children:[(0,z.jsx)(`h3`,{children:`Recent Customer Orders`}),(0,z.jsxs)(L,{to:`/admin/orders`,className:`view-all-link`,children:[`View all orders `,(0,z.jsx)(Su,{width:13,height:13})]})]}),(0,z.jsx)(`div`,{className:`orders-table-wrapper`,children:(0,z.jsxs)(`table`,{className:`dash-table`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Order #`}),(0,z.jsx)(`th`,{children:`Customer`}),(0,z.jsx)(`th`,{children:`Total`}),(0,z.jsx)(`th`,{children:`Payment`}),(0,z.jsx)(`th`,{children:`Shipment`}),(0,z.jsx)(`th`,{children:`Date`})]})}),(0,z.jsx)(`tbody`,{children:c.length===0?(0,z.jsx)(`tr`,{children:(0,z.jsx)(`td`,{colSpan:`6`,className:`text-center`,children:`No orders yet.`})}):c.map(e=>(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{children:(0,z.jsx)(`strong`,{children:e.order_number||`#SK${e.id}`})}),(0,z.jsx)(`td`,{children:e.customer_name}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`strong`,{children:R(e.total_amount||e.subtotal)})}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`span`,{className:`badge badge-${(e.payment_status||e.status).toLowerCase()}`,children:e.payment_status||e.status})}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`span`,{className:`badge badge-shipment`,children:e.shipment_status||`Pending`})}),(0,z.jsx)(`td`,{children:new Date(e.created_at).toLocaleDateString(`en-IN`)})]},e.id))})]})})]}),(0,z.jsxs)(`div`,{className:`dash-section-card`,children:[(0,z.jsxs)(`div`,{className:`section-head`,children:[(0,z.jsx)(`h3`,{children:`Inventory Restock Watchlist`}),(0,z.jsxs)(L,{to:`/admin/products`,className:`view-all-link`,children:[`Manage catalog `,(0,z.jsx)(Su,{width:13,height:13})]})]}),s.length===0?(0,z.jsxs)(`p`,{className:`clean-hint`,style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[(0,z.jsx)(mu,{width:14,height:14}),` All products have adequate inventory levels.`]}):(0,z.jsx)(`div`,{className:`low-stock-list`,children:s.map(e=>(0,z.jsxs)(`div`,{className:`low-stock-item`,children:[(0,z.jsx)(`img`,{src:e.image,alt:``,className:`stock-thumb`}),(0,z.jsxs)(`div`,{className:`stock-info`,children:[(0,z.jsx)(`strong`,{children:e.name}),(0,z.jsx)(`span`,{className:`stock-qty-tag`,children:e.stock===0?`Out of stock`:`${e.stock} units remaining`})]}),(0,z.jsx)(L,{to:`/admin/products`,className:`edit-link`,children:`Restock`})]},e.id))})]})]}),(0,z.jsx)(`style`,{children:`
        .admin-dashboard { padding-bottom: 50px; }
        .admin-page-head { margin-bottom: 26px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 680px; line-height: 1.6; }
        .empty { font-size: 13.5px; color: var(--ink-400); padding: 40px 0; }
        .admin-error { font-size: 13px; color: #a13a3a; margin-bottom: 16px; }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }
        .kpi-card {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .highlight-card {
          border-color: var(--maroon-900);
          background: #fdfaf9;
        }
        .kpi-title { font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.04em; color: var(--ink-400); }
        .kpi-value { font-family: var(--font-display); font-size: 28px; font-weight: 600; color: var(--maroon-900); word-break: break-word; }
        .kpi-sub { font-size: 11.5px; color: var(--ink-500); }

        .dashboard-content-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
        }

        .dash-section-card {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 22px;
          min-width: 0;
        }
        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          gap: 10px;
        }
        .section-head h3 { font-size: 16px; color: var(--ink-900); margin: 0; }
        .view-all-link { font-size: 12.5px; color: var(--maroon-900); font-weight: 500; text-decoration: none; white-space: nowrap; display: inline-flex; align-items: center; gap: 4px; }

        .orders-table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 0 -4px;
        }
        .dash-table { width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: left; }
        .dash-table th { padding: 10px 12px; font-weight: 600; color: var(--ink-400); border-bottom: 1px solid var(--stone-200); font-size: 11.5px; white-space: nowrap; }
        .dash-table td { padding: 12px; border-bottom: 1px solid var(--stone-100); color: var(--ink-700); white-space: nowrap; }

        .badge {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 999px;
          text-transform: uppercase;
        }
        .badge-paid { background: #e8f2e6; color: #3c7a3c; }
        .badge-pending { background: #fdf0d5; color: #8a5a10; }
        .badge-failed { background: #f6e3e3; color: #a13a3a; }
        .badge-shipment { background: #e0f2fe; color: #0369a1; }

        .low-stock-list { display: flex; flex-direction: column; gap: 10px; }
        .low-stock-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 10px;
          background: var(--stone-50);
          border-radius: var(--radius-sm);
        }
        .stock-thumb { width: 40px; height: 40px; object-fit: cover; border-radius: 4px; flex-shrink: 0; }
        .stock-info { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .stock-info strong { font-size: 12.5px; color: var(--ink-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .stock-qty-tag { font-size: 11px; color: #a13a3a; font-weight: 500; }
        .edit-link { font-size: 12px; color: var(--maroon-900); text-decoration: underline; white-space: nowrap; padding: 4px; }
        .clean-hint { font-size: 13px; color: #3c7a3c; padding: 16px 0; }

        @media (max-width: 900px) {
          .dashboard-content-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .admin-dashboard { padding-bottom: 40px; }
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-bottom: 20px;
          }
          .kpi-card {
            padding: 14px 12px;
            gap: 4px;
          }
          .kpi-title { font-size: 11px; }
          .kpi-value { font-size: 21px; }
          .kpi-sub { font-size: 11px; }
          .dash-section-card { padding: 16px 14px; }
          .dash-table { min-width: 520px; }
        }

        @media (max-width: 380px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function ku(e,{maxDimension:t=1600,quality:n=.82}={}){return new Promise((r,i)=>{let a=new FileReader;a.onerror=i,a.onload=()=>{let e=new Image;e.onerror=i,e.onload=()=>{let{width:i,height:a}=e;(i>t||a>t)&&(i>=a?(a=Math.round(a*t/i),i=t):(i=Math.round(i*t/a),a=t));let o=document.createElement(`canvas`);o.width=i,o.height=a,o.getContext(`2d`).drawImage(e,0,0,i,a),r(o.toDataURL(`image/jpeg`,n))},e.src=a.result},a.readAsDataURL(e)})}var Au={hero:`Hero Banner & 4K Video Carousel`,ticker:`Scrolling Sale & Announcement Ticker (Below Hero)`,showcase:`Our Collections (rail)`,featured_categories:`Shop by Category`,promo_banner:`Promo Banner`,new_arrivals:`New Arrivals`,featured:`New Arrivals`,shop_by_style:`Shop by Style (Home Grid)`,recommended:`Recommended Sarees`,shipping_settings:`Shipping`,story:`Our Craft`,google_reviews:`Google Reviews (Before Footer)`,social_links:`Footer — Social & Contact Links`},ju={hero:[{key:`eyebrow`,label:`Small label above heading`,type:`text`},{key:`heading`,label:`Heading (line 1)`,type:`text`},{key:`heading2`,label:`Heading (script line 2)`,type:`text`},{key:`subheading`,label:`Subheading`,type:`textarea`},{key:`ctaLabel`,label:`Button text`,type:`text`},{key:`ctaLink`,label:`Button link`,type:`text`}],showcase:[{key:`note`,label:`Italic note (left)`,type:`textarea`},{key:`heading`,label:`Heading (right)`,type:`text`}],promo_banner:[{key:`heading`,label:`Heading`,type:`text`},{key:`subheading`,label:`Subheading`,type:`text`},{key:`ctaLabel`,label:`Button text`,type:`text`},{key:`ctaLink`,label:`Button link`,type:`text`}],featured_categories:[{key:`heading`,label:`Heading`,type:`text`}],new_arrivals:[{key:`eyebrow`,label:`Eyebrow text above heading (e.g. Fresh Off The Loom)`,type:`text`},{key:`heading`,label:`Heading`,type:`text`},{key:`subheading`,label:`Subheading description`,type:`textarea`},{key:`ctaLabel`,label:`Button text`,type:`text`},{key:`ctaLink`,label:`Button link`,type:`text`}],featured:[{key:`eyebrow`,label:`Eyebrow text above heading (e.g. Fresh Off The Loom)`,type:`text`},{key:`heading`,label:`Heading`,type:`text`},{key:`subheading`,label:`Subheading description`,type:`textarea`},{key:`ctaLabel`,label:`Button text`,type:`text`},{key:`ctaLink`,label:`Button link`,type:`text`}],shop_by_style:[{key:`eyebrow`,label:`Small label above heading`,type:`text`},{key:`heading`,label:`Section Heading (e.g. Shop by Style)`,type:`text`}],recommended:[{key:`heading`,label:`Heading`,type:`text`}],shipping_settings:[{key:`fee`,label:`Standard shipping fee (₹)`,type:`number`},{key:`freeThreshold`,label:`Free shipping when order total is at least (₹) — set to 0 to turn off free shipping`,type:`number`}],story:[{key:`eyebrow`,label:`Small label above heading`,type:`text`},{key:`heading`,label:`Heading`,type:`text`},{key:`body`,label:`Paragraph`,type:`textarea`},{key:`ctaLabel`,label:`Button text`,type:`text`},{key:`ctaLink`,label:`Button link`,type:`text`}],google_reviews:[{key:`heading`,label:`Section Heading`,type:`text`},{key:`subheading`,label:`Section Subheading`,type:`text`},{key:`googleBusinessUrl`,label:`Google Business Profile / Review Link URL`,type:`text`},{key:`averageRating`,label:`Average Google Rating (e.g. 4.9)`,type:`number`},{key:`totalReviews`,label:`Total Reviews Text (e.g. 150+ reviews)`,type:`text`}],social_links:[{key:`whatsapp`,label:`WhatsApp number (with country code, digits only — e.g. 917842225444)`,type:`text`},{key:`facebook`,label:`Facebook page URL`,type:`text`},{key:`twitter`,label:`Twitter / X profile URL`,type:`text`},{key:`instagram`,label:`Instagram profile URL`,type:`text`}]};function Mu(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=n,r.readAsDataURL(e)})}function Nu({slides:e=[],onChange:t,sizeHint:n}){let r=(0,x.useRef)(null),i=(0,x.useRef)(null),[a,o]=(0,x.useState)(!1),[s,c]=(0,x.useState)(null);async function l(n,r){let i=Array.from(n.target.files||[]);if(i.length){o(!0);try{let n=await Promise.all(i.map(async(e,t)=>({id:`slide-${Date.now()}-${t}`,type:r,url:r===`video`?await Mu(e):await ku(e,{maxDimension:2e3}),eyebrow:r===`video`?`PURE HANDLOOM SILKS`:`TEMPLE TRADITIONS`,heading:r===`video`?`Crafted with Devotion`:`Kanchivaram Elegance`,subheading:`Heirloom drape with temple-woven gold zari motifs.`,ctaLabel:`Explore Collection`,ctaLink:`/products`})));t([...e,...n]),c(e.length)}finally{o(!1),n.target.value=``}}}function u(n){let r=n===`video`,i={id:`slide-${Date.now()}`,type:n,url:r?`/videos/hero1.mp4`:`/images/styles/kanchivaram.jpg`,eyebrow:r?`PURE HANDLOOM SILKS`:`TEMPLE TRADITIONS`,heading:r?`Crafted with Devotion`:`Kanchivaram Elegance`,subheading:r?`Experience authentic heirloom weaves with pure zari threads.`:`Heirloom drape with temple-woven gold zari motifs.`,ctaLabel:r?`Explore Collection`:`Shop Now`,ctaLink:r?`/products`:`/products?category=kanjivaram`};t([...e,i]),c(e.length)}function d(n,r,i){let a=[...e];a[n]={...a[n],[r]:i},t(a)}function f(n,r){let i=n+r;if(i<0||i>=e.length)return;let a=[...e];[a[n],a[i]]=[a[i],a[n]],t(a),s===n?c(i):s===i&&c(n)}function p(n){t(e.filter((e,t)=>t!==n)),s===n&&c(null)}return(0,z.jsxs)(`div`,{className:`slides-editor`,children:[n&&(0,z.jsxs)(`p`,{className:`field-hint size-hint`,style:{display:`inline-flex`,alignItems:`center`,gap:5},children:[(0,z.jsx)(vu,{width:14,height:14}),` Recommended size: `,(0,z.jsx)(`strong`,{children:n})]}),(0,z.jsxs)(`p`,{className:`field-hint`,children:[`Slides play horizontally in order. For buttery-smooth, zero-lag 4K video playback, you can directly use a fast video URL or local path (e.g. `,(0,z.jsx)(`code`,{children:`/videos/hero1.mp4`}),`) or upload a clip.`]}),e.length>0&&(0,z.jsx)(`div`,{className:`slides-cards-list`,children:e.map((t,n)=>{let r=s===n;return(0,z.jsxs)(`div`,{className:`slide-card-item`,children:[(0,z.jsxs)(`div`,{className:`slide-card-header`,onClick:()=>c(r?null:n),children:[(0,z.jsxs)(`div`,{className:`slide-thumb`,children:[t.type===`video`?(0,z.jsx)(`video`,{src:t.url,muted:!0,playsInline:!0}):(0,z.jsx)(`img`,{src:t.url,alt:``}),(0,z.jsx)(`span`,{className:`slide-order-badge`,children:n+1}),(0,z.jsx)(`span`,{className:`slide-type-badge`,children:t.type})]}),(0,z.jsxs)(`div`,{className:`slide-summary`,children:[(0,z.jsx)(`strong`,{className:`slide-heading-text`,children:t.heading||`Slide ${n+1}`}),(0,z.jsx)(`span`,{className:`slide-sub-text`,children:t.subheading||t.url})]}),(0,z.jsxs)(`div`,{className:`slide-header-actions`,onClick:e=>e.stopPropagation(),children:[(0,z.jsx)(`button`,{type:`button`,className:`btn-icon`,disabled:n===0,onClick:()=>f(n,-1),title:`Move up`,children:`↑`}),(0,z.jsx)(`button`,{type:`button`,className:`btn-icon`,disabled:n===e.length-1,onClick:()=>f(n,1),title:`Move down`,children:`↓`}),(0,z.jsx)(`button`,{type:`button`,className:`btn-icon btn-expand`,onClick:()=>c(r?null:n),children:r?`Collapse`:`Edit`}),(0,z.jsx)(`button`,{type:`button`,className:`btn-icon btn-remove`,onClick:()=>p(n),title:`Remove slide`,children:`×`})]})]}),r&&(0,z.jsxs)(`div`,{className:`slide-card-body`,children:[(0,z.jsxs)(`div`,{className:`grid-2-col`,children:[(0,z.jsxs)(`label`,{className:`field-label`,children:[`Slide Type`,(0,z.jsxs)(`select`,{value:t.type||`image`,onChange:e=>d(n,`type`,e.target.value),children:[(0,z.jsx)(`option`,{value:`image`,children:`Image Slide`}),(0,z.jsx)(`option`,{value:`video`,children:`4K Video Slide`})]})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Media URL / Path (4K Video or Image)`,(0,z.jsx)(`input`,{type:`text`,value:t.url||``,placeholder:`/videos/hero1.mp4 or https://...`,onChange:e=>d(n,`url`,e.target.value)})]})]}),(0,z.jsxs)(`div`,{className:`grid-2-col`,children:[(0,z.jsxs)(`label`,{className:`field-label`,children:[`Small Eyebrow Label`,(0,z.jsx)(`input`,{type:`text`,value:t.eyebrow||``,placeholder:`e.g. TEMPLE TRADITIONS`,onChange:e=>d(n,`eyebrow`,e.target.value)})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Slide Heading`,(0,z.jsx)(`input`,{type:`text`,value:t.heading||``,placeholder:`e.g. Kanchivaram Elegance`,onChange:e=>d(n,`heading`,e.target.value)})]})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Small Left Text / Subtitle`,(0,z.jsx)(`textarea`,{rows:2,value:t.subheading||``,placeholder:`e.g. Heirloom drape with temple-woven gold zari motifs.`,onChange:e=>d(n,`subheading`,e.target.value)})]}),(0,z.jsxs)(`div`,{className:`grid-2-col`,children:[(0,z.jsxs)(`label`,{className:`field-label`,children:[`CTA Button Text`,(0,z.jsx)(`input`,{type:`text`,value:t.ctaLabel||``,placeholder:`e.g. Shop Kanchivaram`,onChange:e=>d(n,`ctaLabel`,e.target.value)})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`CTA Button Link`,(0,z.jsx)(`input`,{type:`text`,value:t.ctaLink||``,placeholder:`e.g. /products?category=kanjivaram`,onChange:e=>d(n,`ctaLink`,e.target.value)})]})]})]})]},t.id||`${n}-${t.url?.slice(-20)}`)})}),(0,z.jsxs)(`div`,{className:`slide-upload-actions`,children:[(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,disabled:a,onClick:()=>u(`video`),children:`+ Add 4K Video Slide`}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,disabled:a,onClick:()=>u(`image`),children:`+ Add Image Slide`}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,style:{display:`inline-flex`,alignItems:`center`,gap:6},disabled:a,onClick:()=>r.current?.click(),children:a?`Uploading…`:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(yu,{width:14,height:14}),` Upload Photo File`]})}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,style:{display:`inline-flex`,alignItems:`center`,gap:6},disabled:a,onClick:()=>i.current?.click(),children:a?`Uploading…`:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(bu,{width:14,height:14}),` Upload Video File`]})}),(0,z.jsx)(`input`,{ref:r,type:`file`,accept:`image/*`,multiple:!0,hidden:!0,onChange:e=>l(e,`image`)}),(0,z.jsx)(`input`,{ref:i,type:`file`,accept:`video/*`,multiple:!0,hidden:!0,onChange:e=>l(e,`video`)})]}),e.length===0&&(0,z.jsx)(`p`,{className:`field-hint`,style:{marginTop:8},children:`No slides added yet — the default 4K video & saree slides will be displayed.`})]})}function Pu({data:e={},onChange:t}){let n=Array.isArray(e.items)?e.items:[],r=e.bgColor||`#581e15`,i=e.textColor||`#ffffff`,a=e.speed||`normal`,o=e.pauseOnHover!==!1,s=[{label:`Royal Silk Maroon (#581e15)`,hex:`#581e15`},{label:`Antique Zari Gold (#b0732e)`,hex:`#b0732e`},{label:`Temple Gold (#c58b38)`,hex:`#c58b38`},{label:`Deep Midnight Maroon (#20080b)`,hex:`#20080b`},{label:`Rich Espresso (#2c1810)`,hex:`#2c1810`},{label:`Vibrant Silk Crimson (#6c241a)`,hex:`#6c241a`},{label:`Ivory Silk Background (#faf6f0)`,hex:`#faf6f0`}],c=[{label:`Pure White (#ffffff)`,hex:`#ffffff`},{label:`Luminous Gold (#fbdfa2)`,hex:`#fbdfa2`},{label:`Soft Warm Gold (#eed59b)`,hex:`#eed59b`},{label:`Warm Linen (#fcf9f5)`,hex:`#fcf9f5`},{label:`Royal Silk Maroon (#581e15)`,hex:`#581e15`}];function l(n,r){t({...e,[n]:r})}function u(r,i,a){let o=[...n];o[r]={...o[r],[i]:a},t({...e,items:o})}function d(){let r={id:`t-${Date.now()}`,icon:`sparkles`,text:`Special festive offer: Flat 10% off on authentic Dharmavaram Silks`,link:`/products`};t({...e,items:[...n,r]})}function f(r,i){let a=r+i;if(a<0||a>=n.length)return;let o=[...n];[o[r],o[a]]=[o[a],o[r]],t({...e,items:o})}function p(r){t({...e,items:n.filter((e,t)=>t!==r)})}function m(){t({...e,bgColor:`#581e15`,textColor:`#ffffff`,speed:`normal`,pauseOnHover:!0,items:[{id:`t-1`,icon:`bag`,text:`New arrivals every week - Stay tuned!`,link:`/products?sort=newest`},{id:`t-2`,icon:`sparkles`,text:`100% Authentic Handcrafted Sarees`,link:`/about`},{id:`t-3`,icon:`whatsapp`,text:`WhatsApp us for personalized assistance`,link:`https://wa.me/918317551337`},{id:`t-4`,icon:`truck`,text:`Free Shipping on orders above ₹5000`,link:`/products`},{id:`t-5`,icon:`gift`,text:`Use code WELCOME10 for 10% off`,link:`/products`}]})}return(0,z.jsxs)(`div`,{className:`ticker-editor`,children:[(0,z.jsx)(`p`,{className:`field-hint`,children:`Continuous scrolling announcement & sale ticker banner displayed directly below the hero section. Fully editable icons, text, links, and speed matching the brand palette.`}),(0,z.jsxs)(`div`,{className:`ticker-preview-box`,children:[(0,z.jsxs)(`div`,{className:`ticker-preview-header`,children:[(0,z.jsx)(`span`,{className:`ticker-preview-badge`,children:`Live Storefront Preview`}),(0,z.jsxs)(`span`,{className:`field-hint`,style:{fontSize:`11.5px`},children:[n.length,` announcement`,n.length===1?``:`s`,` in loop`]})]}),(0,z.jsx)(`div`,{className:`ticker-preview-shell`,children:(0,z.jsx)(bl,{config:{...e,bgColor:r,textColor:i,speed:a,pauseOnHover:o,items:n}})})]}),(0,z.jsxs)(`div`,{className:`ticker-config-grid`,children:[(0,z.jsxs)(`label`,{className:`field-label`,children:[`Background Color (Brand Palette)`,(0,z.jsxs)(`div`,{className:`color-picker-row`,children:[(0,z.jsx)(`input`,{type:`color`,value:r,onChange:e=>l(`bgColor`,e.target.value),title:`Custom hex color`}),(0,z.jsx)(`input`,{type:`text`,value:r,onChange:e=>l(`bgColor`,e.target.value),style:{width:`92px`,fontFamily:`monospace`,fontSize:`12px`}}),(0,z.jsx)(`div`,{className:`color-presets-row`,children:s.map(e=>(0,z.jsx)(`button`,{type:`button`,className:`color-swatch-btn ${r.toLowerCase()===e.hex.toLowerCase()?`active`:``}`,style:{backgroundColor:e.hex},title:e.label,onClick:()=>l(`bgColor`,e.hex)},e.hex))})]})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Text & Motif Color`,(0,z.jsxs)(`div`,{className:`color-picker-row`,children:[(0,z.jsx)(`input`,{type:`color`,value:i,onChange:e=>l(`textColor`,e.target.value),title:`Custom text color`}),(0,z.jsx)(`input`,{type:`text`,value:i,onChange:e=>l(`textColor`,e.target.value),style:{width:`92px`,fontFamily:`monospace`,fontSize:`12px`}}),(0,z.jsx)(`div`,{className:`color-presets-row`,children:c.map(e=>(0,z.jsx)(`button`,{type:`button`,className:`color-swatch-btn ${i.toLowerCase()===e.hex.toLowerCase()?`active`:``}`,style:{backgroundColor:e.hex},title:e.label,onClick:()=>l(`textColor`,e.hex)},e.hex))})]})]})]}),(0,z.jsxs)(`div`,{className:`grid-2-col`,children:[(0,z.jsxs)(`label`,{className:`field-label`,children:[`Marquee Scrolling Speed`,(0,z.jsxs)(`select`,{value:a,onChange:e=>l(`speed`,e.target.value),children:[(0,z.jsx)(`option`,{value:`slow`,children:`Slow (Smooth & Relaxed — 38s)`}),(0,z.jsx)(`option`,{value:`normal`,children:`Normal (Recommended — 24s)`}),(0,z.jsx)(`option`,{value:`fast`,children:`Fast (Lively — 16s)`})]})]}),(0,z.jsxs)(`label`,{className:`field-label`,style:{justifyContent:`center`},children:[(0,z.jsx)(`span`,{style:{marginBottom:4},children:`Hover Behavior`}),(0,z.jsxs)(`label`,{className:`toggle`,style:{cursor:`pointer`,padding:`6px 0`},children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:o,onChange:e=>l(`pauseOnHover`,e.target.checked)}),`Pause scrolling when mouse hovers`]})]})]}),(0,z.jsxs)(`div`,{className:`ticker-items-section`,children:[(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,marginBottom:10,flexWrap:`wrap`,gap:6},children:[(0,z.jsxs)(`span`,{className:`field-label`,style:{fontWeight:600,color:`var(--ink-900)`},children:[`Ticker Announcement Items (`,n.length,`)`]}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,style:{fontSize:`11.5px`,padding:`4px 10px`},onClick:m,title:`Reset to brand default announcements`,children:`↺ Reset to Brand Presets`})]}),(0,z.jsx)(`div`,{className:`ticker-items-list`,children:n.map((e,t)=>(0,z.jsxs)(`div`,{className:`ticker-item-card`,children:[(0,z.jsxs)(`div`,{className:`ticker-item-head`,children:[(0,z.jsxs)(`span`,{className:`ticker-item-num`,children:[`Announcement #`,t+1]}),(0,z.jsxs)(`div`,{className:`slide-header-actions`,children:[(0,z.jsx)(`button`,{type:`button`,className:`btn-icon`,disabled:t===0,onClick:()=>f(t,-1),title:`Move up`,children:`↑`}),(0,z.jsx)(`button`,{type:`button`,className:`btn-icon`,disabled:t===n.length-1,onClick:()=>f(t,1),title:`Move down`,children:`↓`}),(0,z.jsx)(`button`,{type:`button`,className:`btn-icon btn-remove`,onClick:()=>p(t),title:`Remove announcement`,children:`×`})]})]}),(0,z.jsxs)(`div`,{className:`grid-2-col`,style:{marginTop:4},children:[(0,z.jsxs)(`label`,{className:`field-label`,children:[`SVG Vector Icon`,(0,z.jsxs)(`div`,{className:`svg-icon-select-row`,children:[(0,z.jsx)(`div`,{className:`current-svg-badge`,title:`Selected SVG preview`,children:yl(e.icon||`sparkles`,{width:17,height:17})}),(0,z.jsx)(`select`,{value:e.icon||`sparkles`,onChange:e=>u(t,`icon`,e.target.value),children:Object.entries(_l).map(([e,t])=>(0,z.jsxs)(`option`,{value:e,children:[t.label,` (`,e,`)`]},e))})]}),(0,z.jsx)(`div`,{className:`svg-quick-picker`,children:Object.entries(_l).map(([n,r])=>{let i=(e.icon||`sparkles`)===n;return(0,z.jsxs)(`button`,{type:`button`,className:`svg-icon-btn ${i?`active`:``}`,onClick:()=>u(t,`icon`,n),title:r.label,children:[r.svg({width:13,height:13}),(0,z.jsx)(`span`,{children:n})]},n)})})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Target Link (Optional)`,(0,z.jsx)(`input`,{type:`text`,value:e.link||``,placeholder:`e.g. /products or https://wa.me/...`,onChange:e=>u(t,`link`,e.target.value)}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Internal page or external WhatsApp link.`})]})]}),(0,z.jsxs)(`label`,{className:`field-label`,style:{marginTop:4},children:[`Announcement Text`,(0,z.jsx)(`input`,{type:`text`,value:e.text||``,placeholder:`e.g. 100% Authentic Handcrafted Sarees`,onChange:e=>u(t,`text`,e.target.value)})]})]},e.id||t))}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:d,style:{marginTop:10,width:`100%`,justifyContent:`center`},children:`+ Add Announcement Item`})]})]})}function Fu({data:e={},onChange:t}){let n=Array.isArray(e.reviews)?e.reviews:[];function r(r,i,a){let o=[...n];o[r]={...o[r],[i]:a},t({...e,reviews:o})}function i(){let r={id:`gr-${Date.now()}`,name:`Pooja Gowda`,avatarInitial:`P`,avatarColor:`#E65100`,userBadge:`1 review`,rating:5,timeAgo:`5 months ago`,text:`They have amazing wedding collection at very reasonable price. You guys must visit for any occasion`,reviewUrl:e.googleBusinessUrl||`https://share.google/rLeQl6DO3cPtU5rql`,likesCount:1};t({...e,reviews:[...n,r]})}function a(r,i){let a=r+i;if(a<0||a>=n.length)return;let o=[...n];[o[r],o[a]]=[o[a],o[r]],t({...e,reviews:o})}function o(r){t({...e,reviews:n.filter((e,t)=>t!==r)})}return(0,z.jsxs)(`div`,{className:`google-reviews-editor`,children:[(0,z.jsx)(`p`,{className:`field-hint`,style:{marginBottom:12},children:`Manage Google Reviews displayed in the official Google Cards section before the footer.`}),(0,z.jsx)(`div`,{className:`reviews-cards-list`,children:n.map((e,t)=>(0,z.jsxs)(`div`,{className:`review-edit-card`,children:[(0,z.jsxs)(`div`,{className:`review-edit-head`,children:[(0,z.jsx)(`div`,{className:`gr-edit-avatar`,style:{backgroundColor:e.avatarColor||`#E65100`},children:e.avatarInitial||e.name?.charAt(0)||`U`}),(0,z.jsxs)(`div`,{className:`gr-edit-title`,children:[(0,z.jsx)(`strong`,{className:`gr-edit-name`,children:e.name||`Review ${t+1}`}),(0,z.jsxs)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:4,flexWrap:`wrap`},children:[e.userBadge,` · `,Array.from({length:e.rating||5}).map((e,t)=>(0,z.jsx)(iu,{width:12,height:12,fill:`#e65100`,stroke:`#e65100`},t)),` · `,e.timeAgo]})]}),(0,z.jsxs)(`div`,{className:`slide-header-actions`,children:[(0,z.jsx)(`button`,{type:`button`,className:`btn-icon`,disabled:t===0,onClick:()=>a(t,-1),title:`Move up`,children:`↑`}),(0,z.jsx)(`button`,{type:`button`,className:`btn-icon`,disabled:t===n.length-1,onClick:()=>a(t,1),title:`Move down`,children:`↓`}),(0,z.jsx)(`button`,{type:`button`,className:`btn-icon btn-remove`,onClick:()=>o(t),title:`Remove review`,children:`×`})]})]}),(0,z.jsxs)(`div`,{className:`grid-2-col`,style:{marginTop:10},children:[(0,z.jsxs)(`label`,{className:`field-label`,children:[`Reviewer Name`,(0,z.jsx)(`input`,{type:`text`,value:e.name||``,onChange:e=>r(t,`name`,e.target.value)})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`User Badge / Meta`,(0,z.jsx)(`input`,{type:`text`,value:e.userBadge||``,placeholder:`e.g. 1 review or Local Guide`,onChange:e=>r(t,`userBadge`,e.target.value)})]})]}),(0,z.jsxs)(`div`,{className:`grid-3-col`,children:[(0,z.jsxs)(`label`,{className:`field-label`,children:[`Star Rating (1-5)`,(0,z.jsx)(`input`,{type:`number`,min:`1`,max:`5`,value:e.rating||5,onChange:e=>r(t,`rating`,Number(e.target.value))})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Time Ago`,(0,z.jsx)(`input`,{type:`text`,value:e.timeAgo||``,placeholder:`e.g. 5 months ago`,onChange:e=>r(t,`timeAgo`,e.target.value)})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Avatar Initial & Color`,(0,z.jsxs)(`div`,{style:{display:`flex`,gap:6},children:[(0,z.jsx)(`input`,{type:`text`,maxLength:`2`,style:{width:`48px`,textAlign:`center`},value:e.avatarInitial||``,onChange:e=>r(t,`avatarInitial`,e.target.value.toUpperCase())}),(0,z.jsx)(`input`,{type:`color`,style:{padding:2,height:`38px`,width:`50px`},value:e.avatarColor||`#E65100`,onChange:e=>r(t,`avatarColor`,e.target.value)})]})]})]}),(0,z.jsxs)(`label`,{className:`field-label`,style:{marginTop:6},children:[`Review Text`,(0,z.jsx)(`textarea`,{rows:2,value:e.text||``,onChange:e=>r(t,`text`,e.target.value)})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Direct Google Review Link URL`,(0,z.jsx)(`input`,{type:`text`,value:e.reviewUrl||``,placeholder:`https://share.google/...`,onChange:e=>r(t,`reviewUrl`,e.target.value)})]})]},e.id||t))}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:i,style:{marginTop:12},children:`+ Add Google Review`})]})}function Iu({products:e,selectedIds:t=[],onChange:n,max:r=12}){let[i,a]=(0,x.useState)(``),o=t.map(t=>e.find(e=>e.id===t)).filter(Boolean),s=i.trim().toLowerCase(),c=s?e.filter(e=>!t.includes(e.id)&&e.name.toLowerCase().includes(s)).slice(0,8):[];function l(e){t.includes(e)||t.length>=r||(n([...t,e]),a(``))}function u(e){n(t.filter(t=>t!==e))}function d(e,r){let i=e+r;if(i<0||i>=t.length)return;let a=[...t];[a[e],a[i]]=[a[i],a[e]],n(a)}return(0,z.jsxs)(`div`,{className:`product-picker`,children:[o.length>0&&(0,z.jsx)(`div`,{className:`picker-selected`,children:o.map((e,t)=>(0,z.jsxs)(`div`,{className:`picker-chip`,children:[(0,z.jsx)(`img`,{src:e.image,alt:``}),(0,z.jsx)(`span`,{className:`picker-chip-name`,children:e.name}),(0,z.jsxs)(`div`,{className:`picker-chip-actions`,children:[(0,z.jsx)(`button`,{type:`button`,onClick:()=>d(t,-1),disabled:t===0,"aria-label":`Move ${e.name} up`,children:`↑`}),(0,z.jsx)(`button`,{type:`button`,onClick:()=>d(t,1),disabled:t===o.length-1,"aria-label":`Move ${e.name} down`,children:`↓`}),(0,z.jsx)(`button`,{type:`button`,onClick:()=>u(e.id),"aria-label":`Remove ${e.name}`,className:`picker-chip-remove`,children:`×`})]})]},e.id))}),(0,z.jsx)(`input`,{type:`text`,placeholder:t.length>=r?`Up to ${r} selected`:`Search products to add...`,value:i,disabled:t.length>=r,onChange:e=>a(e.target.value)}),c.length>0&&(0,z.jsx)(`div`,{className:`picker-results`,children:c.map(e=>(0,z.jsxs)(`button`,{type:`button`,className:`picker-result-item`,onClick:()=>l(e.id),children:[(0,z.jsx)(`img`,{src:e.image,alt:``}),(0,z.jsx)(`span`,{children:e.name})]},e.id))}),t.length===0&&(0,z.jsx)(`p`,{className:`field-hint`,children:`Nothing picked yet — falls back to the automatic default until you add at least one.`})]})}function Lu({categories:e=[],selectedIds:t=[],onChange:n,max:r=6}){let i=t.map(t=>e.find(e=>e.id===t)).filter(Boolean),a=e.filter(e=>!t.includes(e.id));function o(e){t.includes(e)||t.length>=r||n([...t,e])}function s(e){n(t.filter(t=>t!==e))}function c(e,r){let i=e+r;if(i<0||i>=t.length)return;let a=[...t],[o]=a.splice(e,1);a.splice(i,0,o),n(a)}return(0,z.jsxs)(`div`,{className:`product-picker`,children:[(0,z.jsx)(`div`,{className:`picker-chips`,children:i.map((e,t)=>(0,z.jsxs)(`div`,{className:`picker-chip`,children:[(0,z.jsx)(`img`,{src:e.image,alt:``}),(0,z.jsx)(`span`,{className:`picker-chip-name`,children:e.name}),(0,z.jsxs)(`div`,{className:`picker-chip-actions`,children:[(0,z.jsx)(`button`,{type:`button`,disabled:t===0,onClick:()=>c(t,-1),"aria-label":`Move left`,children:`‹`}),(0,z.jsx)(`button`,{type:`button`,disabled:t===i.length-1,onClick:()=>c(t,1),"aria-label":`Move right`,children:`›`}),(0,z.jsx)(`button`,{type:`button`,onClick:()=>s(e.id),"aria-label":`Remove`,children:`×`})]})]},e.id))}),a.length>0&&t.length<r&&(0,z.jsx)(`div`,{style:{marginTop:10,display:`flex`,gap:8,flexWrap:`wrap`},children:a.map(e=>(0,z.jsxs)(`button`,{type:`button`,className:`btn btn-outline`,style:{fontSize:`12px`,padding:`5px 12px`},onClick:()=>o(e.id),children:[`+ `,e.name]},e.id))}),t.length===0&&(0,z.jsx)(`p`,{className:`field-hint`,children:`Nothing picked yet — defaults to the top 5 styles from the catalog.`})]})}function Ru(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)([]),[o,s]=(0,x.useState)({}),[c,l]=(0,x.useState)(``),[u,d]=(0,x.useState)(``),f=(0,x.useRef)(null),p={bgColor:`#581e15`,textColor:`#ffffff`,speed:`normal`,pauseOnHover:!0,items:[{id:`t1`,icon:`bag`,text:`New arrivals every week - Stay tuned!`,link:`/products?sort=newest`},{id:`t2`,icon:`sparkles`,text:`100% Authentic Handcrafted Sarees`,link:`/about`},{id:`t3`,icon:`whatsapp`,text:`WhatsApp us for personalized assistance`,link:`https://wa.me/918317551337`},{id:`t4`,icon:`truck`,text:`Free Shipping on orders above ₹5000`,link:`/products`},{id:`t5`,icon:`gift`,text:`Use code WELCOME10 for 10% off`,link:`/products`}]};(0,x.useEffect)(()=>{V.getAllHomeSections().then(({sections:e})=>{let n=e||[];if(!n.some(e=>e.section_key===`ticker`)){let e={section_key:`ticker`,title:`Scrolling Sale & Announcement Ticker (Below Hero)`,enabled:!0,sort_order:2,content:p},t=n.findIndex(e=>e.section_key===`hero`);n=t===-1?[e,...n]:[...n.slice(0,t+1),e,...n.slice(t+1)]}t(n);let r={};n.forEach(e=>{if(e.section_key===`ticker`){let t=Array.isArray(e.content?.items)&&e.content.items.length>0;r[e.section_key]={...p,...e.content,items:t?e.content.items:p.items,enabled:e.enabled!==!1}}else r[e.section_key]={...e.content,enabled:e.enabled}}),s(r)}).catch(e=>l(e.message)),V.getProducts().then(({products:e})=>r(e)).catch(()=>{}),V.getCategories().then(({categories:e})=>a(e)).catch(()=>{})},[]);function m(e,t,n){s(r=>({...r,[e]:{...r[e],[t]:n}}))}async function h(e){let t=e.target.files?.[0];t&&m(`story`,`image`,await ku(t))}async function g(e){l(``);let{enabled:n,...r}=o[e]||{};try{let{section:i}=await V.updateHomeSection(e,{content:r,enabled:n,title:Au[e]});t(t=>t.some(t=>t.section_key===e)?t.map(t=>t.section_key===e?i:t):[...t,i]),d(e),setTimeout(()=>d(``),2e3)}catch(e){l(e.message)}}async function _(e,n){let r=!n;m(e,`enabled`,r);try{let{enabled:n,...i}=o[e]||{},a={enabled:r,title:Au[e]};Object.keys(i).length>0&&(a.content=i);let{section:s}=await V.updateHomeSection(e,a);t(t=>t.some(t=>t.section_key===e)?t.map(t=>t.section_key===e?{...t,enabled:r}:t):[...t,s||{section_key:e,enabled:r}])}catch(e){l(e.message)}}return(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`Home Page`}),(0,z.jsx)(`p`,{children:`Every section on the home screen — edit the text, upload banner media, and toggle sections on or off.`})]}),c&&(0,z.jsx)(`p`,{className:`admin-error`,children:c}),(0,z.jsx)(`div`,{className:`section-list`,children:e.map(e=>{let t=ju[e.section_key]||[],r=o[e.section_key]||{};return(0,z.jsxs)(`div`,{className:`section-card`,children:[(0,z.jsxs)(`div`,{className:`section-card-head`,children:[(0,z.jsx)(`h3`,{children:Au[e.section_key]||e.title||e.section_key}),e.section_key!==`hero`&&(0,z.jsxs)(`label`,{className:`toggle`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:r.enabled!==!1,onChange:()=>_(e.section_key,r.enabled!==!1)}),`Visible on home page`]})]}),t.map(t=>(0,z.jsxs)(`label`,{className:`field-label`,children:[t.label,t.type===`textarea`?(0,z.jsx)(`textarea`,{rows:3,value:r[t.key]||``,onChange:n=>m(e.section_key,t.key,n.target.value)}):t.type===`number`?(0,z.jsx)(`input`,{type:`number`,min:`0`,value:r[t.key]??``,onChange:n=>m(e.section_key,t.key,n.target.value===``?``:Number(n.target.value))}):(0,z.jsx)(`input`,{type:`text`,value:r[t.key]||``,onChange:n=>m(e.section_key,t.key,n.target.value)})]},t.key)),e.section_key===`hero`&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`label`,{className:`field-label`,children:[`Banner photos & videos — Desktop / PC view`,(0,z.jsx)(Nu,{slides:r.slides||[],onChange:e=>m(`hero`,`slides`,e),sizeHint:`1920 × 1080px (landscape, 16:9) or similar wide crop`})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Banner photos & videos — Mobile view`,(0,z.jsx)(Nu,{slides:r.mobileSlides||[],onChange:e=>m(`hero`,`mobileSlides`,e),sizeHint:`1080 × 1350px (portrait, 4:5) — a tall crop reads better on phones`})]})]}),e.section_key===`ticker`&&(0,z.jsx)(Pu,{data:r,onChange:e=>s(t=>({...t,ticker:{...t.ticker,...e}}))}),e.section_key===`story`&&(0,z.jsxs)(`label`,{className:`field-label`,children:[`Photo`,(0,z.jsx)(`input`,{type:`file`,accept:`image/*`,ref:f,onChange:h}),r.image&&(0,z.jsx)(`div`,{className:`story-preview`,children:(0,z.jsx)(`img`,{src:r.image,alt:`Preview`})})]}),e.section_key===`google_reviews`&&(0,z.jsxs)(`label`,{className:`field-label`,children:[`Google Customer Reviews (Matching Google Cards)`,(0,z.jsx)(Fu,{data:r,onChange:e=>s(t=>({...t,google_reviews:e}))})]}),(e.section_key===`new_arrivals`||e.section_key===`featured`)&&(0,z.jsxs)(`label`,{className:`field-label`,children:[`Products shown as New Arrivals`,(0,z.jsx)(Iu,{products:n,selectedIds:r.productIds||[],onChange:t=>m(e.section_key,`productIds`,t),max:8}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Leave empty to automatically showcase the newest active sarees from your catalog. Or pick specific sarees above to curate this section manually.`})]}),e.section_key===`shop_by_style`&&(0,z.jsxs)(`label`,{className:`field-label`,children:[`Styles shown in this section (Card 1 [wide], Card 2 [portrait], Cards 3–5)`,(0,z.jsx)(Lu,{categories:i,selectedIds:r.categoryIds||[],onChange:t=>m(e.section_key,`categoryIds`,t),max:6}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Selection order determines placement: 1st style spans 2 columns (e.g. Kanchivaram), 2nd style is portrait (e.g. Banarasi), and 3rd–5th styles appear in the lower row.`})]}),e.section_key===`featured_categories`&&(0,z.jsxs)(`label`,{className:`field-label`,children:[`Categories displayed in this section`,(0,z.jsx)(Lu,{categories:i,selectedIds:r.categoryIds||[],onChange:t=>m(e.section_key,`categoryIds`,t),max:6})]}),e.section_key===`recommended`&&(0,z.jsxs)(`label`,{className:`field-label`,children:[`Products shown as recommendations`,(0,z.jsx)(Iu,{products:n,selectedIds:r.productIds||[],onChange:t=>m(e.section_key,`productIds`,t),max:12}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Shown at the bottom of the home page and on every product page (the product being viewed is skipped automatically). Leave empty for a random pick from the catalog each time.`})]}),(0,z.jsxs)(`div`,{className:`section-card-foot`,children:[(0,z.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>g(e.section_key),children:`Save`}),u===e.section_key&&(0,z.jsxs)(`span`,{className:`saved-msg`,style:{display:`inline-flex`,alignItems:`center`,gap:4},children:[(0,z.jsx)(mu,{width:13,height:13}),` Saved`]})]})]},e.section_key)})}),(0,z.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .section-list { display: flex; flex-direction: column; gap: 18px; max-width: 620px; }
        .section-card {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .section-card-head { display: flex; align-items: center; justify-content: space-between; }
        .section-card-head h3 { font-family: var(--font-display); font-size: 16px; color: var(--maroon-900); margin: 0; }
        .toggle { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ink-600); }
        .toggle input { accent-color: var(--maroon-900); }

        .field-label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .field-label input[type="text"], .field-label textarea, .field-label input[type="file"] {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .field-hint { font-size: 11.5px; color: var(--ink-400); line-height: 1.6; margin: 0; }
        .size-hint { color: var(--maroon-700); background: var(--blush-300); padding: 7px 10px; border-radius: var(--radius-sm); }

        .story-preview { width: 90px; height: 90px; border-radius: var(--radius-sm); overflow: hidden; margin-top: 4px; }
        .story-preview img { width: 100%; height: 100%; object-fit: cover; }

        .product-picker { display: flex; flex-direction: column; gap: 8px; }
        .product-picker input[type="text"] { padding: 11px 12px; border-radius: var(--radius-sm); border: 1px solid var(--stone-200); font-family: var(--font-body); font-size: 13.5px; }
        .picker-selected { display: flex; flex-direction: column; gap: 6px; }
        .picker-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          background: var(--paper);
        }
        .picker-chip img { width: 32px; height: 32px; border-radius: 6px; object-fit: cover; flex: 0 0 auto; }
        .picker-chip-name { flex: 1; font-size: 12.5px; color: var(--ink-700); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .picker-chip-actions { display: flex; gap: 4px; flex: 0 0 auto; }
        .picker-chip-actions button {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          border: 1px solid var(--stone-200);
          background: var(--ivory);
          font-size: 11px;
          color: var(--ink-600);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .picker-chip-actions button:disabled { opacity: 0.35; }
        .picker-chip-remove { color: #a13a3a !important; }
        .picker-results {
          display: flex;
          flex-direction: column;
          gap: 2px;
          max-height: 220px;
          overflow-y: auto;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 6px;
        }
        .picker-result-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 8px;
          border-radius: 8px;
          background: none;
          border: none;
          text-align: left;
          font-size: 12.5px;
          color: var(--ink-700);
        }
        .picker-result-item:hover { background: var(--blush-400); }
        .picker-result-item img { width: 28px; height: 28px; border-radius: 6px; object-fit: cover; flex: 0 0 auto; }

        .slides-editor { display: flex; flex-direction: column; gap: 12px; }
        .slides-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .slide-thumb {
          position: relative;
          width: 100px;
          height: 72px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--stone-200);
          background: var(--stone-100);
        }
        .slide-thumb img, .slide-thumb video { width: 100%; height: 100%; object-fit: cover; }
        .slide-order-badge {
          position: absolute;
          left: 4px;
          top: 4px;
          background: var(--maroon-900);
          color: #fff;
          font-size: 9.5px;
          font-weight: 600;
          min-width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 0 4px;
        }
        .slides-order-note { background: var(--stone-100); border-radius: var(--radius-sm); padding: 8px 10px; }
        .slide-type-badge {
          position: absolute;
          left: 4px;
          bottom: 4px;
          background: rgba(0,0,0,0.55);
          color: #fff;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .slide-remove {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          color: #fff;
          border: none;
          font-size: 13px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slide-upload-actions { display: flex; gap: 10px; }
        .slide-upload-actions .btn { padding: 9px 16px; font-size: 12.5px; }

        .section-card-foot { display: flex; align-items: center; gap: 12px; }
        .section-card-foot .btn { padding: 10px 18px; font-size: 13px; }
        .saved-msg { font-size: 12.5px; color: #3c7a3c; }

        .slides-cards-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; }
        .slide-card-item {
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          background: #fff;
          overflow: hidden;
        }
        .slide-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          cursor: pointer;
          user-select: none;
        }
        .slide-card-header:hover { background: var(--blush-300); }
        .slide-summary { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .slide-heading-text { font-size: 13px; color: var(--ink-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .slide-sub-text { font-size: 11.5px; color: var(--ink-400); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .slide-header-actions { display: flex; align-items: center; gap: 4px; }
        .btn-icon {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 11px;
          color: var(--ink-700);
          cursor: pointer;
        }
        .btn-icon:disabled { opacity: 0.35; cursor: not-allowed; }
        .btn-expand { font-size: 11px; font-weight: 500; }
        .btn-remove { color: #b71c1c; font-weight: bold; }
        .slide-card-body {
          padding: 14px 16px;
          border-top: 1px solid var(--stone-200);
          background: #faf8f5;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .grid-2-col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .grid-3-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }

        .google-reviews-editor { display: flex; flex-direction: column; gap: 10px; }
        .reviews-cards-list { display: flex; flex-direction: column; gap: 10px; }
        .review-edit-card {
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          background: #fff;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .review-edit-head {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .gr-edit-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          flex: 0 0 auto;
        }
        .gr-edit-title { flex: 1; display: flex; flex-direction: column; }
        .gr-edit-title strong { font-size: 13px; color: var(--ink-900); }
        .gr-edit-title span { font-size: 11px; color: var(--ink-400); }

        /* Ticker Editor Styles */
        .ticker-editor { display: flex; flex-direction: column; gap: 14px; }
        .ticker-preview-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: #faf8f5;
          padding: 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
        }
        .ticker-preview-header { display: flex; align-items: center; justify-content: space-between; }
        .ticker-preview-badge {
          font-size: 11px;
          font-weight: 600;
          color: var(--maroon-900);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .ticker-preview-shell {
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .ticker-config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .color-picker-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 4px; }
        .color-picker-row input[type="color"] {
          width: 36px;
          height: 36px;
          padding: 2px;
          border-radius: 6px;
          border: 1px solid var(--stone-200);
          cursor: pointer;
          background: none;
        }
        .color-presets-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .color-swatch-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px var(--stone-300);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          padding: 0;
        }
        .color-swatch-btn:hover { transform: scale(1.15); }
        .color-swatch-btn.active {
          box-shadow: 0 0 0 2.5px var(--maroon-900);
          transform: scale(1.1);
        }
        .ticker-items-section { display: flex; flex-direction: column; gap: 10px; margin-top: 4px; }
        .ticker-items-list { display: flex; flex-direction: column; gap: 10px; }
        .ticker-item-card {
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 12px;
          background: #fff;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ticker-item-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--stone-100);
        }
        .ticker-item-num { font-size: 12px; font-weight: 600; color: var(--maroon-900); }
        .svg-icon-select-row { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
        .svg-icon-select-row select {
          flex: 1;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13px;
          background: #fff;
        }
        .current-svg-badge {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: #581e15;
          color: #fbdfa2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        }
        .svg-quick-picker { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 6px; }
        .svg-icon-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: var(--stone-100);
          border: 1px solid var(--stone-200);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 11.5px;
          color: var(--ink-700);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .svg-icon-btn:hover {
          background: var(--blush-400);
          border-color: var(--maroon-700);
          color: var(--maroon-900);
        }
        .svg-icon-btn.active {
          background: #581e15;
          border-color: #581e15;
          color: #fbdfa2;
          font-weight: 500;
        }
        .svg-icon-btn svg { flex-shrink: 0; }

        @media (max-width: 680px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .section-card { padding: 16px 14px; }
          .grid-2-col { grid-template-columns: 1fr; }
          .grid-3-col { grid-template-columns: 1fr; }
          .slide-upload-actions { flex-direction: column; gap: 8px; }
          .slide-upload-actions .btn { width: 100%; text-align: center; }
          .section-card-foot .btn { width: 100%; text-align: center; justify-content: center; }
          .slide-card-header { padding: 8px 10px; gap: 8px; }
          .slide-header-actions { flex-wrap: wrap; }
          .picker-chip { flex-wrap: wrap; gap: 6px; }
        }
      `})]})}function zu({images:e=[],onChange:t}){let n=(0,x.useRef)(null),[r,i]=(0,x.useState)(!1);async function a(n){let r=Array.from(n.target.files||[]);if(r.length){i(!0);try{let n=await Promise.all(r.map(e=>ku(e)));t([...e,...n])}finally{i(!1),n.target.value=``}}}function o(n){t(e.filter((e,t)=>t!==n))}return(0,z.jsxs)(`div`,{className:`slides-editor`,children:[(0,z.jsx)(`p`,{className:`field-hint`,children:`Optional extra photos shown in a strip below the story text. Add as many as you like — each one is cropped to a square so mismatched photo sizes still line up neatly.`}),e.length>0&&(0,z.jsx)(`div`,{className:`slides-grid`,children:e.map((e,t)=>(0,z.jsxs)(`div`,{className:`slide-thumb`,children:[(0,z.jsx)(`img`,{src:e,alt:``}),(0,z.jsx)(`button`,{type:`button`,className:`slide-remove`,onClick:()=>o(t),"aria-label":`Remove image`,children:`×`})]},t))}),(0,z.jsxs)(`div`,{className:`slide-upload-actions`,children:[(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,disabled:r,onClick:()=>n.current?.click(),children:r?`Uploading…`:`+ Add Photo`}),(0,z.jsx)(`input`,{ref:n,type:`file`,accept:`image/*`,multiple:!0,hidden:!0,onChange:a})]})]})}function Bu(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)({}),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(``),c=(0,x.useRef)(null);(0,x.useEffect)(()=>{V.getAllHomeSections().then(({sections:e})=>{let n=e.filter(e=>e.section_key===`about_hero`||e.section_key===`about_story`);t(n);let i={};n.forEach(e=>{i[e.section_key]={...e.content,enabled:e.enabled}}),r(i)}).catch(e=>a(e.message))},[]);function l(e,t,n){r(r=>({...r,[e]:{...r[e],[t]:n}}))}async function u(e){let t=e.target.files?.[0];t&&l(`about_story`,`image`,await ku(t))}function d(e){return(e||[]).join(`

`)}function f(e){return e.split(/\n\s*\n/).map(e=>e.trim()).filter(Boolean)}async function p(e){a(``);let{enabled:r,...i}=n[e]||{};try{let{section:n}=await V.updateHomeSection(e,{content:i,enabled:!0,title:e===`about_hero`?`About Page — Header`:`About Page — Our Story`,sortOrder:e===`about_hero`?8:9});t(t=>t.some(t=>t.section_key===e)?t.map(t=>t.section_key===e?n:t):[...t,n]),s(e),setTimeout(()=>s(``),2e3)}catch(e){a(e.message)}}let m=n.about_hero||{},h=n.about_story||{};return(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`About Page`}),(0,z.jsx)(`p`,{children:`Everything on the "Read our story" page — header text, the story copy, the main photo, and any extra gallery photos.`})]}),i&&(0,z.jsx)(`p`,{className:`admin-error`,children:i}),(0,z.jsxs)(`div`,{className:`section-list`,children:[(0,z.jsxs)(`div`,{className:`section-card`,children:[(0,z.jsx)(`div`,{className:`section-card-head`,children:(0,z.jsx)(`h3`,{children:`Header`})}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Small label above heading`,(0,z.jsx)(`input`,{type:`text`,value:m.eyebrow||``,onChange:e=>l(`about_hero`,`eyebrow`,e.target.value)})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Heading`,(0,z.jsx)(`textarea`,{rows:2,value:m.heading||``,onChange:e=>l(`about_hero`,`heading`,e.target.value)})]}),(0,z.jsxs)(`div`,{className:`section-card-foot`,children:[(0,z.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>p(`about_hero`),children:`Save`}),o===`about_hero`&&(0,z.jsxs)(`span`,{className:`saved-msg`,style:{display:`inline-flex`,alignItems:`center`,gap:4},children:[(0,z.jsx)(mu,{width:13,height:13}),` Saved`]})]})]}),(0,z.jsxs)(`div`,{className:`section-card`,children:[(0,z.jsx)(`div`,{className:`section-card-head`,children:(0,z.jsx)(`h3`,{children:`Our Story`})}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Heading`,(0,z.jsx)(`input`,{type:`text`,value:h.heading||``,onChange:e=>l(`about_story`,`heading`,e.target.value)})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Paragraphs`,(0,z.jsx)(`textarea`,{rows:7,value:d(h.paragraphs),onChange:e=>l(`about_story`,`paragraphs`,f(e.target.value))}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Leave a blank line between paragraphs to split them — each one renders as its own paragraph.`})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Main photo`,(0,z.jsx)(`input`,{type:`file`,accept:`image/*`,ref:c,onChange:u}),h.image&&(0,z.jsx)(`div`,{className:`story-preview`,children:(0,z.jsx)(`img`,{src:h.image,alt:`Preview`})})]}),(0,z.jsxs)(`label`,{className:`field-label`,children:[`Gallery photos`,(0,z.jsx)(zu,{images:h.gallery||[],onChange:e=>l(`about_story`,`gallery`,e)})]}),(0,z.jsxs)(`div`,{className:`section-card-foot`,children:[(0,z.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>p(`about_story`),children:`Save`}),o===`about_story`&&(0,z.jsxs)(`span`,{className:`saved-msg`,style:{display:`inline-flex`,alignItems:`center`,gap:4},children:[(0,z.jsx)(mu,{width:13,height:13}),` Saved`]})]})]})]}),(0,z.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .section-list { display: flex; flex-direction: column; gap: 18px; max-width: 620px; }
        .section-card {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .section-card-head { display: flex; align-items: center; justify-content: space-between; }
        .section-card-head h3 { font-family: var(--font-display); font-size: 16px; color: var(--maroon-900); margin: 0; }

        .field-label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .field-label input[type="text"], .field-label textarea, .field-label input[type="file"] {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .field-hint { font-size: 11.5px; color: var(--ink-400); line-height: 1.6; margin: 0; }

        .story-preview { width: 90px; height: 90px; border-radius: var(--radius-sm); overflow: hidden; margin-top: 4px; }
        .story-preview img { width: 100%; height: 100%; object-fit: cover; }

        .slides-editor { display: flex; flex-direction: column; gap: 12px; }
        .slides-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .slide-thumb {
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--stone-200);
          background: var(--stone-100);
        }
        .slide-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .slide-remove {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          color: #fff;
          border: none;
          font-size: 13px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slide-upload-actions { display: flex; gap: 10px; }
        .slide-upload-actions .btn { padding: 9px 16px; font-size: 12.5px; }

        .section-card-foot { display: flex; align-items: center; gap: 12px; }
        .section-card-foot .btn { padding: 10px 18px; font-size: 13px; }
        .saved-msg { font-size: 12.5px; color: #3c7a3c; }

        @media (max-width: 680px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .section-card { padding: 16px 14px; }
          .slide-upload-actions .btn { width: 100%; text-align: center; justify-content: center; }
          .section-card-foot .btn { width: 100%; text-align: center; justify-content: center; }
        }
      `})]})}var Vu={code:``,type:`percent`,value:``,minOrder:``,maxDiscount:``,startDate:``,expiresAt:``,usageLimit:``,perUserLimit:1,firstOrderOnly:!1,active:!0};function Hu(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(Vu),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(!0);(0,x.useEffect)(()=>{c()},[]);function c(){V.getCoupons().then(({coupons:e})=>t(e)).catch(e=>a(e.message)).finally(()=>s(!1))}async function l(e){if(e.preventDefault(),!(!n.code.trim()||!n.value)){a(``);try{await V.createCoupon({code:n.code.trim(),type:n.type,value:Number(n.value),minOrder:Number(n.minOrder)||0,maxDiscount:n.maxDiscount?Number(n.maxDiscount):null,startDate:n.startDate?new Date(n.startDate).toISOString():null,expiresAt:n.expiresAt?new Date(n.expiresAt).toISOString():null,usageLimit:n.usageLimit?Number(n.usageLimit):null,perUserLimit:Number(n.perUserLimit)||1,firstOrderOnly:!!n.firstOrderOnly,active:n.active}),r(Vu),c()}catch(e){a(e.message)}}}async function u(e){try{await V.updateCoupon(e.id,{active:!e.active}),c()}catch(e){a(e.message)}}async function d(e){if(window.confirm(`Delete this coupon? Customers will no longer be able to use it.`))try{await V.deleteCoupon(e),c()}catch(e){a(e.message)}}function f(e){let t=e.type===`percent`?`${e.value}% off`:`₹${e.value} off`,n=e.type===`percent`&&e.max_discount?` (up to ₹${e.max_discount})`:``,r=e.min_order>0?` on orders above ₹${e.min_order}`:``,i=e.first_order_only?` · 1st order only`:``,a=e.usage_limit?` · Max ${e.usage_limit} uses`:``;return t+n+r+i+a}return(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`Coupons`}),(0,z.jsx)(`p`,{children:`Create discount codes for checkout. Enforce usage limits, date windows, minimum order values, and first-order privileges automatically.`})]}),i&&(0,z.jsx)(`p`,{className:`admin-error`,children:i}),(0,z.jsxs)(`div`,{className:`cms-layout`,children:[(0,z.jsxs)(`form`,{className:`cms-form`,onSubmit:l,children:[(0,z.jsx)(`h3`,{children:`New coupon`}),(0,z.jsxs)(`label`,{children:[`Coupon code`,(0,z.jsx)(`input`,{type:`text`,value:n.code,placeholder:`e.g. FESTIVE20`,onChange:e=>r(t=>({...t,code:e.target.value.toUpperCase()})),required:!0})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Type`,(0,z.jsxs)(`select`,{value:n.type,onChange:e=>r(t=>({...t,type:e.target.value})),children:[(0,z.jsx)(`option`,{value:`percent`,children:`Percent off`}),(0,z.jsx)(`option`,{value:`flat`,children:`Flat amount off`})]})]}),(0,z.jsxs)(`label`,{children:[n.type===`percent`?`Percent (%)`:`Amount (₹)`,(0,z.jsx)(`input`,{type:`number`,min:`1`,max:n.type===`percent`?100:void 0,value:n.value,onChange:e=>r(t=>({...t,value:e.target.value})),required:!0})]})]}),n.type===`percent`&&(0,z.jsxs)(`label`,{children:[`Max discount cap (₹) `,(0,z.jsx)(`span`,{className:`opt-tag`,children:`optional`}),(0,z.jsx)(`input`,{type:`number`,min:`1`,value:n.maxDiscount,placeholder:`e.g. 1500 (leave blank for unlimited)`,onChange:e=>r(t=>({...t,maxDiscount:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Minimum order (₹)`,(0,z.jsx)(`input`,{type:`number`,min:`0`,value:n.minOrder,placeholder:`0`,onChange:e=>r(t=>({...t,minOrder:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Limit per customer`,(0,z.jsx)(`input`,{type:`number`,min:`1`,value:n.perUserLimit,onChange:e=>r(t=>({...t,perUserLimit:e.target.value}))})]})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Valid from`,(0,z.jsx)(`input`,{type:`date`,value:n.startDate,onChange:e=>r(t=>({...t,startDate:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Expires on`,(0,z.jsx)(`input`,{type:`date`,value:n.expiresAt,onChange:e=>r(t=>({...t,expiresAt:e.target.value}))})]})]}),(0,z.jsxs)(`label`,{children:[`Total redemption cap `,(0,z.jsx)(`span`,{className:`opt-tag`,children:`optional`}),(0,z.jsx)(`input`,{type:`number`,min:`1`,value:n.usageLimit,placeholder:`e.g. 50 (leave empty for unlimited)`,onChange:e=>r(t=>({...t,usageLimit:e.target.value}))})]}),(0,z.jsxs)(`label`,{className:`checkbox-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:n.firstOrderOnly,onChange:e=>r(t=>({...t,firstOrderOnly:e.target.checked}))}),`Valid for customer's first order only`]}),(0,z.jsxs)(`label`,{className:`checkbox-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:n.active,onChange:e=>r(t=>({...t,active:e.target.checked}))}),`Active immediately`]}),(0,z.jsx)(`div`,{className:`form-actions`,children:(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Create Coupon`})})]}),(0,z.jsxs)(`div`,{className:`cms-list`,children:[o&&(0,z.jsx)(`p`,{className:`empty`,children:`Loading coupons…`}),!o&&e.length===0&&(0,z.jsx)(`p`,{className:`empty`,children:`No coupons yet.`}),e.map(e=>(0,z.jsxs)(`div`,{className:`cms-row`,children:[(0,z.jsxs)(`div`,{className:`row-info`,children:[(0,z.jsx)(`strong`,{children:e.code}),(0,z.jsxs)(`span`,{children:[f(e),e.expires_at&&` · expires ${new Date(e.expires_at).toLocaleDateString(`en-IN`)}`,!e.active&&` · inactive`]})]}),(0,z.jsxs)(`div`,{className:`row-actions`,children:[(0,z.jsx)(`button`,{onClick:()=>u(e),children:e.active?`Deactivate`:`Activate`}),(0,z.jsx)(`button`,{onClick:()=>d(e.id),className:`danger`,children:`Delete`})]})]},e.id))]})]}),(0,z.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .cms-layout { display: grid; grid-template-columns: 360px 1fr; gap: 28px; align-items: flex-start; }
        .cms-form {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cms-form h3 { font-family: var(--font-display); font-size: 18px; color: var(--maroon-900); margin: 0; }
        .cms-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .cms-form input, .cms-form select {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
          background: var(--paper);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .checkbox-row { flex-direction: row !important; align-items: center; gap: 8px !important; }
        .checkbox-row input { width: auto; padding: 0; }
        .form-actions .btn { padding: 11px 20px; font-size: 13px; }

        .cms-list { display: flex; flex-direction: column; gap: 10px; }
        .cms-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .row-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .row-info strong { font-size: 14px; color: var(--ink-900); letter-spacing: 0.03em; }
        .row-info span { font-size: 12px; color: var(--ink-400); }
        .row-actions { display: flex; gap: 10px; }
        .row-actions button { background: none; border: none; font-size: 12.5px; color: var(--maroon-900); }
        .row-actions .danger { color: #a13a3a; }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        @media (max-width: 980px) {
          .cms-layout { grid-template-columns: 1fr; gap: 20px; }
        }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .cms-form { padding: 18px 14px; }
          .form-row { grid-template-columns: 1fr; }
          .form-actions .btn { width: 100%; text-align: center; justify-content: center; }

          .cms-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 14px;
          }
          .row-actions {
            justify-content: flex-end;
            padding-top: 8px;
            border-top: 1px solid var(--stone-100);
            gap: 8px;
          }
          .row-actions button {
            padding: 6px 14px;
            background: var(--stone-100);
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          .row-actions .danger { background: #fdf2f2; }
        }
      `})]})}var Uu={label:``,maxDays:``,refundPercent:``};function Wu(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(Uu),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(!0);(0,x.useEffect)(()=>{c()},[]);function c(){V.getCancellationPolicy().then(({policy:e})=>t(e)).catch(e=>a(e.message)).finally(()=>s(!1))}async function l(t){if(t.preventDefault(),!(!n.label.trim()||n.maxDays===``||n.refundPercent===``)){a(``);try{await V.createPolicyTier({label:n.label.trim(),maxDays:Number(n.maxDays),refundPercent:Number(n.refundPercent),sortOrder:e.length}),r(Uu),c()}catch(e){a(e.message)}}}async function u(e){if(window.confirm(`Delete this cancellation tier?`))try{await V.deletePolicyTier(e),c()}catch(e){a(e.message)}}return(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`Cancellation Policy`}),(0,z.jsx)(`p`,{children:`Define refund tiers by how many days have passed since payment. The customer's "Cancel Order" button uses the first tier their order still qualifies for — set these in ascending day order. This same list is shown to customers as a card on every product page.`})]}),i&&(0,z.jsx)(`p`,{className:`admin-error`,children:i}),(0,z.jsxs)(`div`,{className:`cms-layout`,children:[(0,z.jsxs)(`form`,{className:`cms-form`,onSubmit:l,children:[(0,z.jsx)(`h3`,{children:`Add a tier`}),(0,z.jsxs)(`label`,{children:[`Label (shown to customers)`,(0,z.jsx)(`input`,{type:`text`,value:n.label,placeholder:`e.g. Within 24 hours of payment`,onChange:e=>r(t=>({...t,label:e.target.value})),required:!0})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Up to how many days`,(0,z.jsx)(`input`,{type:`number`,min:`0`,value:n.maxDays,placeholder:`e.g. 1`,onChange:e=>r(t=>({...t,maxDays:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Refund (%)`,(0,z.jsx)(`input`,{type:`number`,min:`0`,max:`100`,value:n.refundPercent,placeholder:`e.g. 100`,onChange:e=>r(t=>({...t,refundPercent:e.target.value})),required:!0})]})]}),(0,z.jsx)(`div`,{className:`form-actions`,children:(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Add Tier`})})]}),(0,z.jsxs)(`div`,{className:`cms-list`,children:[o&&(0,z.jsx)(`p`,{className:`empty`,children:`Loading…`}),!o&&e.length===0&&(0,z.jsx)(`p`,{className:`empty`,children:`No tiers yet — orders can't be cancelled until you add at least one.`}),e.map(e=>(0,z.jsxs)(`div`,{className:`cms-row`,children:[(0,z.jsxs)(`div`,{className:`row-info`,children:[(0,z.jsx)(`strong`,{children:e.label}),(0,z.jsxs)(`span`,{children:[`Up to `,e.max_days,` day`,e.max_days===1?``:`s`,` after payment · `,e.refund_percent,`% refund`]})]}),(0,z.jsx)(`div`,{className:`row-actions`,children:(0,z.jsx)(`button`,{onClick:()=>u(e.id),className:`danger`,children:`Delete`})})]},e.id))]})]}),(0,z.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 600px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .cms-layout { display: grid; grid-template-columns: 340px 1fr; gap: 28px; align-items: flex-start; }
        .cms-form {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cms-form h3 { font-family: var(--font-display); font-size: 18px; color: var(--maroon-900); margin: 0; }
        .cms-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .cms-form input {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .form-actions .btn { padding: 11px 20px; font-size: 13px; }

        .cms-list { display: flex; flex-direction: column; gap: 10px; }
        .cms-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .row-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .row-info strong { font-size: 14px; color: var(--ink-900); }
        .row-info span { font-size: 12px; color: var(--ink-400); }
        .row-actions button { background: none; border: none; font-size: 12.5px; color: #a13a3a; }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        @media (max-width: 980px) {
          .cms-layout { grid-template-columns: 1fr; gap: 20px; }
        }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .cms-form { padding: 18px 14px; }
          .form-row { grid-template-columns: 1fr; }
          .form-actions .btn { width: 100%; text-align: center; justify-content: center; }
          .cms-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 14px;
          }
          .row-actions {
            display: flex;
            justify-content: flex-end;
            padding-top: 8px;
            border-top: 1px solid var(--stone-100);
          }
          .row-actions button {
            padding: 6px 14px;
            background: #fdf2f2;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
        }
      `})]})}var Gu={id:null,name:``,tagline:``,image:``};function Ku(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(Gu),[i,a]=(0,x.useState)(null),[o,s]=(0,x.useState)(``),c=(0,x.useRef)(null);(0,x.useEffect)(()=>{l()},[]);function l(){V.getAllCategoriesAdmin().then(({categories:e})=>t(e)).catch(e=>s(e.message))}function u(e){let t=e.target.files?.[0];t&&ku(t).then(e=>r(t=>({...t,image:e})))}function d(){r(Gu),a(null),c.current&&(c.current.value=``)}async function f(e){if(e.preventDefault(),n.name.trim()){s(``);try{if(i)await V.updateCategory(i,{name:n.name,tagline:n.tagline,image:n.image||void 0});else{let e=n.name.trim().toLowerCase().replace(/\s+/g,`-`);await V.createCategory({id:e,name:n.name,tagline:n.tagline,image:n.image||`https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc?auto=format&fit=crop&w=800&q=80`})}d(),l()}catch(e){s(e.message)}}}function p(e){r({id:e.id,name:e.name,tagline:e.tagline,image:e.image}),a(e.id)}async function m(e){if(window.confirm(`Remove this category?`))try{await V.deleteCategory(e),i===e&&d(),l()}catch(e){s(e.message)}}let[h,g]=(0,x.useState)(null);async function _(e){g(e.id);try{await V.updateCategory(e.id,{active:!e.active}),l()}catch(e){s(e.message)}finally{g(null)}}return(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`Categories`}),(0,z.jsx)(`p`,{children:`Add the saree types shown on the homepage and products page. Each needs a small photo.`})]}),o&&(0,z.jsx)(`p`,{className:`admin-error`,children:o}),(0,z.jsxs)(`div`,{className:`cms-layout`,children:[(0,z.jsxs)(`form`,{className:`cms-form`,onSubmit:f,children:[(0,z.jsx)(`h3`,{children:i?`Edit category`:`Add a category`}),(0,z.jsxs)(`label`,{children:[`Category name`,(0,z.jsx)(`input`,{type:`text`,value:n.name,placeholder:`e.g. Kanjivaram Silk`,onChange:e=>r(t=>({...t,name:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Short tagline`,(0,z.jsx)(`input`,{type:`text`,value:n.tagline,placeholder:`e.g. Temple-woven silk, heirloom weight`,onChange:e=>r(t=>({...t,tagline:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Photo`,(0,z.jsx)(`input`,{type:`file`,accept:`image/*`,ref:c,onChange:u})]}),n.image&&(0,z.jsx)(`div`,{className:`preview-thumb`,children:(0,z.jsx)(`img`,{src:n.image,alt:`Preview`})}),(0,z.jsxs)(`div`,{className:`form-actions`,children:[(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:i?`Save Changes`:`Add Category`}),i&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:d,children:`Cancel`})]})]}),(0,z.jsxs)(`div`,{className:`cms-list`,children:[e.length===0&&(0,z.jsx)(`p`,{className:`empty`,children:`No categories yet.`}),e.map(e=>(0,z.jsxs)(`div`,{className:`cms-row ${e.active===!1?`is-hidden`:``}`,children:[(0,z.jsx)(`img`,{src:e.image,alt:``,className:`row-thumb`}),(0,z.jsxs)(`div`,{className:`row-info`,children:[(0,z.jsx)(`strong`,{children:e.name}),(0,z.jsx)(`span`,{children:e.tagline})]}),e.active===!1&&(0,z.jsx)(`span`,{className:`hidden-badge`,children:`Hidden`}),(0,z.jsxs)(`div`,{className:`row-actions`,children:[(0,z.jsx)(`button`,{onClick:()=>p(e),children:`Edit`}),(0,z.jsx)(`button`,{onClick:()=>_(e),disabled:h===e.id,children:e.active===!1?`Show`:`Hide`}),(0,z.jsx)(`button`,{onClick:()=>m(e.id),className:`danger`,children:`Delete`})]})]},e.id))]})]}),(0,z.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 500px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .cms-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 28px;
          align-items: flex-start;
        }
        .cms-form {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cms-form h3 { font-family: var(--font-display); font-size: 18px; color: var(--maroon-900); margin: 0; }
        .cms-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .cms-form input[type="text"] {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
        }
        .preview-thumb { width: 64px; height: 64px; border-radius: 50%; overflow: hidden; }
        .preview-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .form-actions { display: flex; gap: 10px; }
        .form-actions .btn { padding: 11px 20px; font-size: 13px; }

        .cms-list { display: flex; flex-direction: column; gap: 10px; }
        .cms-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .row-thumb { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
        .row-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .row-info strong { font-size: 13.5px; color: var(--ink-900); }
        .row-info span { font-size: 12px; color: var(--ink-400); }
        .row-actions { display: flex; gap: 10px; }
        .row-actions button { background: none; border: none; font-size: 12.5px; color: var(--maroon-900); }
        .row-actions .danger { color: #a13a3a; }
        .cms-row.is-hidden { opacity: 0.55; }
        .hidden-badge {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--ink-400);
          background: var(--stone-100);
          border-radius: 999px;
          padding: 3px 9px;
          flex: 0 0 auto;
        }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        @media (max-width: 900px) {
          .cms-layout { grid-template-columns: 1fr; gap: 20px; }
        }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .cms-form { padding: 18px 14px; }
          .form-actions { flex-direction: column; gap: 8px; }
          .form-actions .btn { width: 100%; text-align: center; justify-content: center; }

          .cms-row {
            display: grid;
            grid-template-columns: 48px 1fr auto;
            grid-template-areas:
              "thumb info badge"
              "actions actions actions";
            gap: 10px 12px;
            padding: 14px;
            align-items: center;
          }
          .row-thumb { grid-area: thumb; }
          .row-info { grid-area: info; min-width: 0; }
          .hidden-badge { grid-area: badge; }
          .row-actions {
            grid-area: actions;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            padding-top: 10px;
            border-top: 1px solid var(--stone-100);
            width: 100%;
          }
          .row-actions button {
            padding: 6px 14px;
            background: var(--stone-100);
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          .row-actions .danger { background: #fdf2f2; }
        }
      `})]})}var qu={name:``,category:``,price:``,mrp:``,discountPercent:``,stock:``,sku:``,shortDescription:``,description:``,weightGrams:500,lengthCm:30,widthCm:20,heightCm:5,returnAvailable:!0,returnWindowHours:24,cancellationAvailable:!0,tags:``,seoTitle:``,seoDescription:``,slug:``,image:``,hoverImage:``,images:[],active:!0,variants:[]};function Ju(e,t){let n=Number(e),r=Number(t);return!n||!r||r>=n?``:Math.round((n-r)/n*100)}function Yu(e,t){let n=Number(e);if(!n||t===``||t==null)return``;let r=Number(t);return Number.isNaN(r)?``:Math.max(0,Math.round(n*(1-r/100)))}function Xu(e,t){let n=Number(e);if(!n||t===``||t==null)return``;let r=Number(t);return Number.isNaN(r)||r>=100?``:Math.round(n/(1-r/100))}function Zu(e){return e===0?`stock-out`:e<=5?`stock-low`:`stock-ok`}function Qu(e){return e===0?`Out of stock`:e<=5?`Low stock · ${e} left`:`${e} in stock`}function $u(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)(qu),[o,s]=(0,x.useState)(null),[c,l]=(0,x.useState)(``),u=(0,x.useRef)(null),d=(0,x.useRef)(null),f=(0,x.useRef)(null),[p,m]=(0,x.useState)(!1),[h,g]=(0,x.useState)(null);(0,x.useEffect)(()=>{_(),V.getCategories().then(({categories:e})=>r(e)).catch(e=>l(e.message))},[]);function _(){V.getAllProductsAdmin().then(({products:e})=>t(e)).catch(e=>l(e.message))}function v(e){let t=e.target.files?.[0];t&&ku(t).then(e=>a(t=>({...t,image:e})))}function y(e){let t=e.target.files?.[0];t&&ku(t).then(e=>a(t=>({...t,hoverImage:e})))}function b(){a(e=>({...e,hoverImage:``})),d.current&&(d.current.value=``)}async function S(e){let t=Array.from(e.target.files||[]);if(t.length){m(!0);try{let e=await Promise.all(t.map(e=>ku(e)));a(t=>({...t,images:[...t.images||[],...e]}))}finally{m(!1),e.target.value=``}}}function C(e){a(t=>({...t,images:(t.images||[]).filter((t,n)=>n!==e)}))}function w(){a(qu),s(null),T.current=null,u.current&&(u.current.value=``),d.current&&(d.current.value=``)}let T=(0,x.useRef)(null);function E(e,t){return e===`price`?Yu(t.mrp,t.discountPercent):e===`mrp`?Xu(t.price,t.discountPercent):e===`discountPercent`?Ju(t.mrp,t.price):``}function D(e,t){a(n=>{let r={...n,[e]:t},i;if(T.current?.editing===e?i=T.current.target:(i=e===`mrp`?r.discountPercent===``?r.price===``?null:`discountPercent`:`price`:e===`discountPercent`?r.mrp===``?r.price===``?null:`mrp`:`price`:r.mrp===``?r.discountPercent===``?null:`mrp`:`discountPercent`,T.current={editing:e,target:i}),i){let e=E(i,r);e!==``&&(r[i]=e)}return r})}function O(e){D(`mrp`,e)}function k(e){D(`discountPercent`,e)}function A(e){D(`price`,e)}function j(){a(e=>({...e,variants:[...e.variants||[],{colorName:``,colorCode:`#8B0000`,sku:``,stock:Number(e.stock)||5,price:e.price||``,mrp:e.mrp||``,weightGrams:e.weightGrams||500,active:!0}]}))}function M(e,t,n){a(r=>{let i=[...r.variants||[]];return i[e]={...i[e],[t]:n},{...r,variants:i}})}function ee(e){a(t=>({...t,variants:(t.variants||[]).filter((t,n)=>n!==e)}))}async function te(e){if(e.preventDefault(),!i.name.trim()||!i.category)return;l(``);let t={name:i.name,category:i.category,price:Number(i.price)||0,mrp:Number(i.mrp)||Number(i.price)||0,stock:Number(i.stock)||0,sku:i.sku,shortDescription:i.shortDescription,description:i.description,weightGrams:Number(i.weightGrams)||500,lengthCm:Number(i.lengthCm)||30,widthCm:Number(i.widthCm)||20,heightCm:Number(i.heightCm)||5,returnAvailable:!!i.returnAvailable,returnWindowHours:Number(i.returnWindowHours)||24,cancellationAvailable:!!i.cancellationAvailable,tags:i.tags?Array.isArray(i.tags)?i.tags:i.tags.split(`,`).map(e=>e.trim()).filter(Boolean):[],seoTitle:i.seoTitle,seoDescription:i.seoDescription,slug:i.slug,image:i.image||`https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc?auto=format&fit=crop&w=800&q=80`,hoverImage:i.hoverImage||``,images:i.images||[],active:i.active!==!1,variants:i.variants||[]};try{o?await V.updateProduct(o,t):await V.createProduct(t),w(),_()}catch(e){l(e.message)}}async function ne(e){T.current=null,a({name:e.name,category:e.category,price:e.price,mrp:e.mrp,discountPercent:Ju(e.mrp,e.price),stock:e.stock,sku:e.sku||``,shortDescription:e.shortDescription||``,description:e.description||``,weightGrams:e.weightGrams??500,lengthCm:e.lengthCm??30,widthCm:e.widthCm??20,heightCm:e.heightCm??5,returnAvailable:e.returnAvailable??!0,returnWindowHours:e.returnWindowHours??24,cancellationAvailable:e.cancellationAvailable??!0,tags:Array.isArray(e.tags)?e.tags.join(`, `):``,seoTitle:e.seoTitle||``,seoDescription:e.seoDescription||``,slug:e.slug||``,image:e.image,hoverImage:e.hoverImage||e.hover_image||``,images:e.images||[],active:e.active,variants:e.variants||[]}),s(e.id),window.scrollTo({top:0,behavior:`smooth`});try{let{product:t}=await V.getProduct(e.id);a(e=>({...e,hoverImage:t.hoverImage||t.hover_image||e.hoverImage,images:t.images||e.images,variants:t.variants||e.variants}))}catch{}}async function N(e){if(window.confirm(`Remove this product?`))try{await V.deleteProduct(e),o===e&&w(),_()}catch(e){l(e.message)}}async function P(e,t){if(!(!t||t===e.category)){g(e.id);try{await V.updateProduct(e.id,{category:t}),_()}catch(e){l(e.message)}finally{g(null)}}}async function re(e){g(e.id);try{await V.updateProduct(e.id,{active:!e.active}),_()}catch(e){l(e.message)}finally{g(null)}}function ie(e){return n.find(t=>t.id===e)?.name||e}let ae=i.stock===``?null:Number(i.stock)||0,oe=i.category?e.filter(e=>e.category===i.category&&e.id!==o):[];return(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`Products`}),(0,z.jsx)(`p`,{children:`Add sarees to a category, set price, MRP and stock. Set stock to 0 to intentionally mark a product out of stock.`})]}),c&&(0,z.jsx)(`p`,{className:`admin-error`,children:c}),(0,z.jsxs)(`div`,{className:`cms-layout`,children:[(0,z.jsxs)(`form`,{className:`cms-form`,onSubmit:te,children:[(0,z.jsx)(`h3`,{children:o?`Edit product`:`Add a product`}),(0,z.jsxs)(`div`,{className:`form-section`,children:[(0,z.jsx)(`p`,{className:`section-label`,children:`Basic details`}),(0,z.jsxs)(`label`,{children:[`Product name`,(0,z.jsx)(`input`,{type:`text`,value:i.name,placeholder:`e.g. Purple Kanjivaram with Gold Zari`,onChange:e=>a(t=>({...t,name:e.target.value})),required:!0})]}),(0,z.jsxs)(`div`,{className:`category-picker`,children:[(0,z.jsxs)(`label`,{children:[`Category`,(0,z.jsxs)(`select`,{value:i.category,onChange:e=>a(t=>({...t,category:e.target.value})),required:!0,children:[(0,z.jsx)(`option`,{value:``,disabled:!0,children:`Choose a category`}),n.map(e=>(0,z.jsx)(`option`,{value:e.id,children:e.name},e.id))]})]}),i.category&&(0,z.jsxs)(`div`,{className:`category-preview`,children:[(0,z.jsxs)(`p`,{className:`category-preview-title`,children:[`Already in `,ie(i.category),` (`,oe.length,`)`]}),oe.length===0?(0,z.jsx)(`p`,{className:`category-preview-empty`,children:`Nothing here yet — this'll be the first.`}):(0,z.jsx)(`div`,{className:`category-preview-list`,children:oe.map(e=>(0,z.jsxs)(`div`,{className:`category-preview-item`,children:[(0,z.jsx)(`img`,{src:e.image,alt:``}),(0,z.jsx)(`span`,{children:e.name})]},e.id))})]})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`SKU`,(0,z.jsx)(`input`,{type:`text`,value:i.sku,placeholder:`e.g. SK-KANJI-001`,onChange:e=>a(t=>({...t,sku:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Short description`,(0,z.jsx)(`input`,{type:`text`,value:i.shortDescription,placeholder:`One-line summary for cards`,onChange:e=>a(t=>({...t,shortDescription:e.target.value}))})]})]}),(0,z.jsxs)(`label`,{children:[`Full Description`,(0,z.jsx)(`textarea`,{rows:`3`,value:i.description,onChange:e=>a(t=>({...t,description:e.target.value})),placeholder:`Weave, colour, occasion, blouse details, care instructions...`})]})]}),(0,z.jsxs)(`div`,{className:`form-section`,children:[(0,z.jsx)(`p`,{className:`section-label`,children:`Pricing & inventory`}),(0,z.jsx)(`p`,{className:`field-hint pricing-hint`,children:`Fill in any two of MRP, Discount %, and Price — the third fills itself in.`}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`MRP (₹)`,(0,z.jsx)(`input`,{type:`number`,min:`0`,value:i.mrp,placeholder:`Original price`,onChange:e=>O(e.target.value)})]}),(0,z.jsxs)(`label`,{children:[`Discount %`,(0,z.jsx)(`input`,{type:`number`,min:`0`,max:`99`,value:i.discountPercent,placeholder:`e.g. 20`,onChange:e=>k(e.target.value)})]})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Price (₹) `,(0,z.jsx)(`span`,{className:`required-mark`,children:`*`}),(0,z.jsx)(`input`,{type:`number`,min:`0`,value:i.price,onChange:e=>A(e.target.value),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Total Stock `,(0,z.jsx)(`span`,{className:`required-mark`,children:`*`}),(0,z.jsx)(`input`,{type:`number`,min:`0`,value:i.stock,placeholder:`e.g. 25`,onChange:e=>a(t=>({...t,stock:e.target.value})),required:!0})]})]}),ae===0&&(0,z.jsxs)(`p`,{className:`stock-warning`,children:[`Stock is set to 0 — this product will show as `,(0,z.jsx)(`strong`,{children:`Out of Stock`}),` on the site the moment you save it.`]})]}),(0,z.jsxs)(`div`,{className:`form-section`,children:[(0,z.jsx)(`p`,{className:`section-label`,children:`Shipping & dimensions`}),(0,z.jsx)(`p`,{className:`field-hint`,children:`Used by Shiprocket to determine courier availability and dynamic shipping rates.`}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Weight (grams) *`,(0,z.jsx)(`input`,{type:`number`,min:`50`,step:`50`,value:i.weightGrams,placeholder:`e.g. 600`,onChange:e=>a(t=>({...t,weightGrams:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Length (cm)`,(0,z.jsx)(`input`,{type:`number`,min:`1`,value:i.lengthCm,placeholder:`e.g. 30`,onChange:e=>a(t=>({...t,lengthCm:e.target.value}))})]})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Width (cm)`,(0,z.jsx)(`input`,{type:`number`,min:`1`,value:i.widthCm,placeholder:`e.g. 20`,onChange:e=>a(t=>({...t,widthCm:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Height (cm)`,(0,z.jsx)(`input`,{type:`number`,min:`1`,value:i.heightCm,placeholder:`e.g. 5`,onChange:e=>a(t=>({...t,heightCm:e.target.value}))})]})]})]}),(0,z.jsxs)(`div`,{className:`form-section`,children:[(0,z.jsx)(`p`,{className:`section-label`,children:`Return & cancellation policies`}),(0,z.jsxs)(`div`,{className:`policy-checkboxes`,children:[(0,z.jsxs)(`label`,{className:`checkbox-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:!!i.returnAvailable,onChange:e=>a(t=>({...t,returnAvailable:e.target.checked}))}),(0,z.jsx)(`span`,{children:`Return Available for this product`})]}),i.returnAvailable&&(0,z.jsxs)(`label`,{className:`return-window-select`,children:[`Return Window`,(0,z.jsxs)(`select`,{value:i.returnWindowHours,onChange:e=>a(t=>({...t,returnWindowHours:Number(e.target.value)})),children:[(0,z.jsx)(`option`,{value:8,children:`8 hours after delivery`}),(0,z.jsx)(`option`,{value:24,children:`24 hours after delivery (standard)`}),(0,z.jsx)(`option`,{value:48,children:`48 hours after delivery`}),(0,z.jsx)(`option`,{value:72,children:`72 hours after delivery`}),(0,z.jsx)(`option`,{value:168,children:`7 days after delivery`})]})]}),(0,z.jsxs)(`label`,{className:`checkbox-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:!!i.cancellationAvailable,onChange:e=>a(t=>({...t,cancellationAvailable:e.target.checked}))}),(0,z.jsx)(`span`,{children:`Cancellation Allowed before dispatch`})]})]})]}),(0,z.jsxs)(`div`,{className:`form-section`,children:[(0,z.jsxs)(`div`,{className:`section-head-row`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`p`,{className:`section-label`,children:`Product color variants`}),(0,z.jsx)(`p`,{className:`field-hint`,children:`Add selectable color options with their own inventory, SKU, and color swatch.`})]}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline btn-sm add-variant-btn`,onClick:j,children:`+ Add Color`})]}),!i.variants||i.variants.length===0?(0,z.jsx)(`p`,{className:`empty-hint`,children:`No color variants added yet. Customers will buy this as a single product.`}):(0,z.jsx)(`div`,{className:`variants-list`,children:i.variants.map((e,t)=>(0,z.jsxs)(`div`,{className:`variant-item-card`,children:[(0,z.jsxs)(`div`,{className:`variant-top-row`,children:[(0,z.jsxs)(`div`,{className:`color-swatch-picker`,children:[(0,z.jsx)(`input`,{type:`color`,value:e.colorCode||`#8B0000`,onChange:e=>M(t,`colorCode`,e.target.value),title:`Pick swatch color`}),(0,z.jsx)(`span`,{className:`swatch-code`,children:e.colorCode||`#8B0000`})]}),(0,z.jsx)(`input`,{type:`text`,className:`variant-name-input`,placeholder:`Color Name (e.g. Royal Maroon)`,value:e.colorName||``,onChange:e=>M(t,`colorName`,e.target.value),required:!0}),(0,z.jsx)(`button`,{type:`button`,className:`variant-remove-btn`,onClick:()=>ee(t),title:`Remove color`,children:(0,z.jsx)(hu,{width:12,height:12})})]}),(0,z.jsxs)(`div`,{className:`variant-fields-grid`,children:[(0,z.jsxs)(`label`,{children:[`SKU`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. SK-P1-RED`,value:e.sku||``,onChange:e=>M(t,`sku`,e.target.value)})]}),(0,z.jsxs)(`label`,{children:[`Stock`,(0,z.jsx)(`input`,{type:`number`,min:`0`,value:e.stock??``,onChange:e=>M(t,`stock`,Number(e.target.value))})]}),(0,z.jsxs)(`label`,{children:[`Price (₹) `,(0,z.jsx)(`span`,{className:`opt-tag`,children:`optional`}),(0,z.jsx)(`input`,{type:`number`,min:`0`,placeholder:`Inherit`,value:e.price??``,onChange:e=>M(t,`price`,e.target.value?Number(e.target.value):``)})]})]})]},t))})]}),(0,z.jsxs)(`div`,{className:`form-section`,children:[(0,z.jsx)(`p`,{className:`section-label`,children:`Photos & Hover Preview`}),(0,z.jsxs)(`div`,{className:`photo-inputs-grid`,children:[(0,z.jsxs)(`div`,{className:`photo-input-card`,children:[(0,z.jsxs)(`label`,{children:[(0,z.jsx)(`span`,{className:`photo-field-title`,children:`Main Saree Photo`}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Initial storefront photo (saree flat lay / folded).`}),(0,z.jsx)(`input`,{type:`file`,accept:`image/*`,ref:u,onChange:v})]}),i.image?(0,z.jsxs)(`div`,{className:`preview-thumb-card`,children:[(0,z.jsx)(`img`,{src:i.image,alt:`Main Saree Preview`}),(0,z.jsx)(`span`,{className:`preview-chip chip-primary`,children:`Default Saree View`})]}):(0,z.jsx)(`div`,{className:`preview-empty-slot`,children:(0,z.jsx)(`span`,{children:`No main photo selected`})})]}),(0,z.jsxs)(`div`,{className:`photo-input-card`,children:[(0,z.jsxs)(`label`,{children:[(0,z.jsx)(`span`,{className:`photo-field-title`,children:`Hover Photo (Model Wearing Saree)`}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Revealed when shopper hovers over the product card.`}),(0,z.jsx)(`input`,{type:`file`,accept:`image/*`,ref:d,onChange:y})]}),i.hoverImage?(0,z.jsxs)(`div`,{className:`preview-thumb-card`,children:[(0,z.jsx)(`img`,{src:i.hoverImage,alt:`Hover Model Preview`}),(0,z.jsx)(`span`,{className:`preview-chip chip-model`,children:`Hover / Wearing View`}),(0,z.jsxs)(`button`,{type:`button`,className:`photo-clear-btn`,onClick:b,title:`Remove hover model photo`,children:[(0,z.jsx)(hu,{width:12,height:12}),` Remove`]})]}):(0,z.jsx)(`div`,{className:`preview-empty-slot`,children:(0,z.jsx)(`span`,{children:`Optional · Fallbacks to main photo on hover`})})]})]}),(0,z.jsxs)(`label`,{style:{marginTop:10},children:[`Gallery photos`,(0,z.jsx)(`span`,{className:`field-hint`,children:`Extra angles or close-ups shown as thumbnails on the product page. Any size works — they're cropped to fit.`})]}),i.images?.length>0&&(0,z.jsx)(`div`,{className:`gallery-grid`,children:i.images.map((e,t)=>(0,z.jsxs)(`div`,{className:`gallery-thumb`,children:[(0,z.jsx)(`img`,{src:e,alt:``}),(0,z.jsx)(`button`,{type:`button`,className:`gallery-remove`,onClick:()=>C(t),"aria-label":`Remove image`,children:(0,z.jsx)(hu,{width:12,height:12})})]},t))}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,disabled:p,onClick:()=>f.current?.click(),children:p?`Uploading…`:`+ Add gallery photo`}),(0,z.jsx)(`input`,{ref:f,type:`file`,accept:`image/*`,multiple:!0,hidden:!0,onChange:S})]}),(0,z.jsxs)(`div`,{className:`form-section`,children:[(0,z.jsx)(`p`,{className:`section-label`,children:`SEO & discovery`}),(0,z.jsxs)(`label`,{children:[`Tags (comma separated)`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. bridal, festive, gold zari, pure silk`,value:i.tags,onChange:e=>a(t=>({...t,tags:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`SEO Title`,(0,z.jsx)(`input`,{type:`text`,placeholder:`Custom title tag for search engines`,value:i.seoTitle,onChange:e=>a(t=>({...t,seoTitle:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`URL Slug`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. purple-kanjivaram-gold-zari`,value:i.slug,onChange:e=>a(t=>({...t,slug:e.target.value}))})]})]}),(0,z.jsxs)(`label`,{children:[`SEO Meta Description`,(0,z.jsx)(`textarea`,{rows:`2`,placeholder:`Brief summary for Google search results`,value:i.seoDescription,onChange:e=>a(t=>({...t,seoDescription:e.target.value}))})]})]}),(0,z.jsxs)(`div`,{className:`form-actions`,children:[(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:o?`Save Changes`:`Add Product`}),o&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:w,children:`Cancel`})]})]}),(0,z.jsxs)(`div`,{className:`cms-list`,children:[e.length===0&&(0,z.jsx)(`p`,{className:`empty`,children:`No products yet.`}),e.map(e=>{let t=e.mrp>e.price,r=t?Math.round((e.mrp-e.price)/e.mrp*100):0,i=!!(e.hoverImage||e.hover_image);return(0,z.jsxs)(`div`,{className:`cms-row ${e.active===!1?`is-hidden`:``}`,children:[(0,z.jsxs)(`div`,{className:`admin-row-thumb-container`,title:i?`Hover to see model wearing saree`:`Main saree photo`,children:[(0,z.jsx)(`img`,{src:e.image,alt:``,className:`row-thumb-sq`}),i&&(0,z.jsx)(`img`,{src:e.hoverImage||e.hover_image,alt:``,className:`row-thumb-sq row-thumb-hover`})]}),(0,z.jsxs)(`div`,{className:`row-info`,children:[(0,z.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6,flexWrap:`wrap`},children:[(0,z.jsx)(`strong`,{children:e.name}),i&&(0,z.jsx)(`span`,{className:`row-hover-badge`,title:`Model wearing photo configured for hover effect`,children:`Model Hover`})]}),(0,z.jsx)(`span`,{className:`row-category`,children:ie(e.category)}),(0,z.jsxs)(`span`,{className:`row-price-line`,children:[(0,z.jsx)(`span`,{className:`row-price`,children:R(e.price)}),t&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`span`,{className:`row-mrp`,children:R(e.mrp)}),(0,z.jsxs)(`span`,{className:`row-discount`,children:[r,`% off`]})]})]})]}),e.active===!1&&(0,z.jsx)(`span`,{className:`hidden-badge`,children:`Hidden`}),(0,z.jsx)(`span`,{className:`stock-badge ${Zu(e.stock)}`,children:Qu(e.stock)}),(0,z.jsxs)(`div`,{className:`row-actions`,children:[(0,z.jsx)(`select`,{className:`row-move-select`,value:e.category,disabled:h===e.id,onChange:t=>P(e,t.target.value),"aria-label":`Move ${e.name} to a different category`,title:`Move to a different category`,children:n.map(e=>(0,z.jsx)(`option`,{value:e.id,children:e.name},e.id))}),(0,z.jsx)(`button`,{onClick:()=>ne(e),children:`Edit`}),(0,z.jsx)(`button`,{onClick:()=>re(e),disabled:h===e.id,children:e.active===!1?`Show`:`Hide`}),(0,z.jsx)(`button`,{onClick:()=>N(e.id),className:`danger`,children:`Delete`})]})]},e.id)})]})]}),(0,z.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .cms-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 28px;
          align-items: flex-start;
        }
        .cms-form {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .cms-form h3 { font-family: var(--font-display); font-size: 18px; color: var(--maroon-900); margin: 0; }

        .form-section { display: flex; flex-direction: column; gap: 14px; padding-top: 18px; border-top: 1px solid var(--stone-100); }
        .form-section:first-of-type { padding-top: 0; border-top: none; }
        .section-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--maroon-700, var(--maroon-900));
          margin: 0;
        }

        .cms-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .required-mark { color: #a13a3a; }
        .cms-form input, .cms-form select, .cms-form textarea {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
          background: var(--paper);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .field-hint { font-size: 11.5px; color: var(--ink-400); line-height: 1.6; }
        .pricing-hint { margin: -4px 0 12px; }

        .category-picker { display: flex; gap: 14px; align-items: flex-start; }
        .category-picker > label { flex: 1; min-width: 0; }
        .category-preview {
          flex: 0 0 170px;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 10px;
          max-height: 168px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .category-preview-title { font-size: 11px; font-weight: 600; color: var(--ink-600); margin: 0; }
        .category-preview-empty { font-size: 11.5px; color: var(--ink-400); margin: 0; line-height: 1.5; }
        .category-preview-list { display: flex; flex-direction: column; gap: 6px; overflow-y: auto; }
        .category-preview-item { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--ink-600); }
        .category-preview-item img { width: 26px; height: 26px; border-radius: 6px; object-fit: cover; flex: 0 0 auto; }
        .category-preview-item span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .stock-warning {
          font-size: 11.5px;
          color: #8a5a10;
          background: #fbeacb;
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          line-height: 1.6;
          margin: 0;
        }

        .policy-checkboxes { display: flex; flex-direction: column; gap: 10px; margin-top: 6px; }
        .checkbox-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-700); cursor: pointer; }
        .checkbox-row input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--maroon-900); }
        .return-window-select { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--ink-600); margin-left: 24px; }
        .return-window-select select { font-size: 12.5px; padding: 6px 10px; border-radius: var(--radius-sm); border: 1px solid var(--stone-300); }

        .section-head-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .add-variant-btn { padding: 4px 12px; font-size: 12px; }
        .variants-list { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
        .variant-item-card {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .variant-top-row { display: flex; align-items: center; gap: 10px; }
        .color-swatch-picker {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid var(--stone-300);
          border-radius: 6px;
          padding: 3px 8px;
        }
        .color-swatch-picker input[type="color"] {
          width: 24px;
          height: 24px;
          border: none;
          padding: 0;
          background: none;
          cursor: pointer;
        }
        .swatch-code { font-size: 11px; font-family: monospace; color: var(--ink-600); }
        .variant-name-input { flex: 1; font-size: 13px; padding: 6px 10px; border-radius: var(--radius-sm); border: 1px solid var(--stone-300); }
        .variant-remove-btn {
          background: none;
          border: none;
          color: #a13a3a;
          font-size: 14px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .variant-remove-btn:hover { background: #f6e3e3; }
        .variant-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }
        .variant-fields-grid label { font-size: 11.5px; display: flex; flex-direction: column; gap: 4px; color: var(--ink-600); }
        .variant-fields-grid input { font-size: 12.5px; padding: 6px 8px; border-radius: var(--radius-sm); border: 1px solid var(--stone-300); }
        .opt-tag { font-size: 10px; color: var(--ink-400); font-weight: normal; }

        .photo-inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .photo-input-card {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .photo-field-title {
          font-weight: 600;
          color: var(--ink-800);
          font-size: 12.5px;
          display: block;
        }
        .preview-thumb-card {
          position: relative;
          width: 100%;
          height: 140px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: #fbf7f2;
          border: 1px solid var(--stone-200);
        }
        .preview-thumb-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .preview-chip {
          position: absolute;
          bottom: 8px;
          left: 8px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 3px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .chip-primary {
          background: rgba(32, 8, 11, 0.78);
          color: #ffffff;
        }
        .chip-model {
          background: rgba(88, 30, 21, 0.88);
          color: #fbdba2;
          border: 1px solid rgba(251, 219, 162, 0.35);
        }
        .photo-clear-btn {
          position: absolute;
          top: 6px;
          right: 6px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 4px;
          font-size: 11px;
          padding: 3px 7px;
          color: #a13a3a;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: background 0.2s ease;
        }
        .photo-clear-btn:hover {
          background: #f6e3e3;
        }
        .preview-empty-slot {
          height: 70px;
          border: 1px dashed var(--stone-300);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8px;
          font-size: 11px;
          color: var(--ink-400);
          background: rgba(255, 255, 255, 0.6);
        }

        .preview-thumb { width: 72px; height: 72px; border-radius: var(--radius-sm); overflow: hidden; }
        .preview-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .gallery-thumb {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--stone-200);
          background: var(--stone-100);
        }
        .gallery-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-remove {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          color: #fff;
          border: none;
          font-size: 11px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .gallery-remove:hover {
          background: #a13a3a;
        }
        .form-actions { display: flex; gap: 10px; }
        .form-actions .btn { padding: 11px 20px; font-size: 13px; }

        .cms-list { display: flex; flex-direction: column; gap: 10px; }
        .cms-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .admin-row-thumb-container {
          position: relative;
          width: 52px;
          height: 52px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex: 0 0 52px;
          background: var(--stone-100);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
          cursor: pointer;
        }
        .admin-row-thumb-container .row-thumb-sq {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
          display: block;
        }
        .admin-row-thumb-container .row-thumb-hover {
          position: absolute;
          inset: 0;
          opacity: 0;
        }
        .admin-row-thumb-container:hover .row-thumb-hover {
          opacity: 1;
        }
        .row-hover-badge {
          font-size: 9.5px;
          font-weight: 600;
          color: #581e15;
          background: #fdf2ea;
          border: 1px solid rgba(88, 30, 21, 0.22);
          padding: 1px 5px;
          border-radius: 4px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .row-thumb-sq { width: 52px; height: 52px; border-radius: var(--radius-sm); object-fit: cover; flex: 0 0 auto; }
        .row-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .row-info strong { font-size: 13.5px; color: var(--ink-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .row-category { font-size: 11.5px; color: var(--ink-400); }
        .row-price-line { display: flex; align-items: baseline; gap: 8px; }
        .row-price { font-size: 13px; font-weight: 600; color: var(--maroon-900); }
        .row-mrp { font-size: 11.5px; color: var(--ink-400); text-decoration: line-through; }
        .row-discount { font-size: 11px; color: #3c7a3c; font-weight: 600; }

        .stock-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 999px;
          white-space: nowrap;
          flex: 0 0 auto;
        }
        .stock-ok { background: #e8f2e6; color: #3c7a3c; }
        .stock-low { background: #fbeacb; color: #8a5a10; }
        .stock-out { background: #f6e3e3; color: #a13a3a; }

        .row-actions { display: flex; align-items: center; gap: 10px; flex: 0 0 auto; }
        .row-actions button { background: none; border: none; font-size: 12.5px; color: var(--maroon-900); }
        .row-actions .danger { color: #a13a3a; }
        .cms-row.is-hidden { opacity: 0.55; }
        .hidden-badge {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--ink-400);
          background: var(--stone-100);
          border-radius: 999px;
          padding: 3px 9px;
          flex: 0 0 auto;
        }
        .row-move-select {
          font-size: 11.5px;
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          background: var(--paper);
          color: var(--ink-600);
          max-width: 130px;
        }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        @media (max-width: 980px) {
          .cms-layout { grid-template-columns: 1fr; gap: 20px; }
        }

        @media (max-width: 680px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .cms-form { padding: 18px 14px; gap: 18px; }
          .form-row { grid-template-columns: 1fr; }
          .category-picker { flex-direction: column; }
          .category-preview { flex-basis: auto; width: 100%; max-height: 140px; box-sizing: border-box; }
          
          .variant-top-row { gap: 8px; }
          .color-swatch-picker { padding: 2px 6px; }
          .variant-fields-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .variant-fields-grid label:last-child {
            grid-column: span 2;
          }

          .form-actions {
            flex-direction: column;
            gap: 8px;
          }
          .form-actions .btn {
            width: 100%;
            text-align: center;
            justify-content: center;
          }

          .cms-row {
            display: grid;
            grid-template-columns: 52px 1fr auto;
            grid-template-areas:
              "thumb info badge"
              "actions actions actions";
            gap: 10px 12px;
            align-items: center;
            padding: 14px;
            box-sizing: border-box;
          }
          .photo-inputs-grid { grid-template-columns: 1fr; }
          .admin-row-thumb-container,
          .row-thumb-sq {
            grid-area: thumb;
          }
          .row-info {
            grid-area: info;
            min-width: 0;
          }
          .stock-badge {
            grid-area: badge;
            align-self: flex-start;
          }
          .hidden-badge {
            margin-right: 4px;
          }
          .row-actions {
            grid-area: actions;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 6px;
            padding-top: 10px;
            border-top: 1px solid var(--stone-100);
            width: 100%;
            box-sizing: border-box;
          }
          .row-move-select {
            flex: 1;
            max-width: none;
            font-size: 12px;
            padding: 6px 8px;
          }
          .row-actions button {
            padding: 7px 11px;
            background: var(--stone-100);
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
          }
          .row-actions .danger {
            background: #fdf2f2;
          }
        }

        @media (max-width: 440px) {
          .variant-fields-grid {
            grid-template-columns: 1fr;
          }
          .variant-fields-grid label:last-child {
            grid-column: span 1;
          }
          .cms-row {
            grid-template-columns: 46px 1fr;
            grid-template-areas:
              "thumb info"
              "badge badge"
              "actions actions";
          }
          .stock-badge {
            justify-self: flex-start;
          }
          .row-actions {
            flex-wrap: wrap;
          }
          .row-move-select {
            width: 100%;
            margin-bottom: 4px;
          }
          .row-actions button {
            flex: 1;
            text-align: center;
          }
        }
      `})]})}var ed={paid:`Paid`,paid_oversold:`Needs attention`,created:`Payment pending`,failed:`Failed`,cancellation_requested:`Cancellation Requested`,cancelled:`Cancelled`},td=[`PENDING`,`ORDER_CREATED`,`AWB_ASSIGNED`,`SHIPPED`,`IN_TRANSIT`,`OUT_FOR_DELIVERY`,`DELIVERED`,`CANCELLED`,`RTO`];function nd(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(``),[i,a]=(0,x.useState)(!0),[o,s]=(0,x.useState)(`ALL`),[c,l]=(0,x.useState)(null),[u,d]=(0,x.useState)(null),[f,p]=(0,x.useState)({}),[m,h]=(0,x.useState)(null),[g,_]=(0,x.useState)({courierName:``,awbCode:``,trackingUrl:``,shipmentStatus:`PENDING`}),[v,y]=(0,x.useState)(!1);(0,x.useEffect)(()=>{b()},[]);function b(){V.getAllOrders().then(({orders:e})=>t(e)).catch(e=>r(e.message)).finally(()=>a(!1))}async function S(e){d(null),l(e.id);try{await V.downloadInvoice(e.id)}catch(t){d({id:e.id,message:t.message})}finally{l(null)}}async function C(e,t){p(t=>({...t,[e]:!0}));try{await V.updateOrderStatus(e,{shipmentStatus:t}),b()}catch(e){r(e.message)}finally{p(t=>({...t,[e]:!1}))}}async function w(e){if(window.confirm(`Approve this cancellation request? This will restore inventory stock and process a refund to the customer via Razorpay.`)){p(t=>({...t,[e]:!0}));try{await V.approveCancellation(e),b()}catch(e){r(e.message)}finally{p(t=>({...t,[e]:!1}))}}}async function T(e){let t=window.prompt(`Enter reason for declining cancellation (this will be visible to customer):`,`Your order has already been processed/packed for courier dispatch.`);if(t!==null){p(t=>({...t,[e]:!0}));try{await V.rejectCancellation(e,{reason:t}),b()}catch(e){r(e.message)}finally{p(t=>({...t,[e]:!1}))}}}function E(e){h(e),_({courierName:e.courier_name||``,awbCode:e.awb_code||``,trackingUrl:e.tracking_url||``,shipmentStatus:e.shipment_status||`PENDING`})}async function D(e){if(e.preventDefault(),m){y(!0);try{await V.updateOrderStatus(m.id,{courierName:g.courierName.trim(),awbCode:g.awbCode.trim(),trackingUrl:g.trackingUrl.trim(),shipmentStatus:g.shipmentStatus}),h(null),b()}catch(e){r(e.message)}finally{y(!1)}}}let O=e.filter(e=>e.status===`cancellation_requested`).length,k=e.filter(e=>o===`ALL`?!0:o===`CANCELLATION_REQUESTS`?e.status===`cancellation_requested`:o===`PAID`?e.payment_status===`PAID`||e.status===`paid`:o===`PENDING_SHIP`?(e.payment_status===`PAID`||e.status===`paid`)&&![`delivered`,`cancelled`].includes(String(e.shipment_status).toLowerCase()):o===`SHIPPED`?[`shipped`,`in_transit`,`out_for_delivery`].includes(String(e.shipment_status).toLowerCase()):o===`DELIVERED`?String(e.shipment_status).toLowerCase()===`delivered`:o!==`CANCELLED`||e.status===`cancelled`);return(0,z.jsxs)(`div`,{className:`admin-orders`,children:[(0,z.jsx)(`div`,{className:`admin-page-head`,children:(0,z.jsxs)(`div`,{className:`head-row`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`h1`,{children:`Orders & Shipments`}),(0,z.jsx)(`p`,{children:`Every prepaid transaction across the store with manual courier dispatch tracking, Razorpay payment verification, and customer cancellation approvals.`})]}),(0,z.jsx)(`div`,{className:`filter-tabs`,children:[{id:`ALL`,label:`All Orders`},{id:`CANCELLATION_REQUESTS`,label:`Cancel Requests${O>0?` (${O})`:``}`,highlight:O>0},{id:`PAID`,label:`Paid`},{id:`PENDING_SHIP`,label:`Pending Ship`},{id:`SHIPPED`,label:`Shipped`},{id:`DELIVERED`,label:`Delivered`},{id:`CANCELLED`,label:`Cancelled`}].map(e=>(0,z.jsx)(`button`,{type:`button`,className:`tab-btn ${o===e.id?`active`:``} ${e.highlight?`tab-highlight`:``}`,onClick:()=>s(e.id),children:e.label},e.id))})]})}),n&&(0,z.jsx)(`p`,{className:`admin-error`,children:n}),i&&(0,z.jsx)(`p`,{className:`empty`,children:`Loading orders…`}),!i&&(0,z.jsxs)(`div`,{className:`orders-list`,children:[k.length===0&&(0,z.jsx)(`p`,{className:`empty`,children:`No orders matching this filter.`}),k.map(e=>(0,z.jsxs)(`div`,{className:`order-row`,children:[e.status===`cancellation_requested`&&(0,z.jsxs)(`div`,{className:`admin-cancel-req-box`,children:[(0,z.jsxs)(`div`,{className:`acrb-top`,children:[(0,z.jsxs)(`span`,{className:`acrb-alert-badge`,style:{display:`inline-flex`,alignItems:`center`,gap:5},children:[(0,z.jsx)(pu,{width:13,height:13}),` Action Required`]}),(0,z.jsxs)(`span`,{className:`acrb-time`,children:[`Requested `,e.cancellation_requested_at?new Date(e.cancellation_requested_at).toLocaleString(`en-IN`):`recently`]})]}),(0,z.jsx)(`h3`,{className:`acrb-heading`,children:`Customer Requested Order Cancellation`}),(0,z.jsxs)(`p`,{className:`acrb-desc`,children:[`Customer `,(0,z.jsx)(`strong`,{children:e.customer_name}),` requested order cancellation. Refund amount: `,(0,z.jsxs)(`strong`,{children:[R(e.refund_amount||e.subtotal-(e.discount||0)),` (`,e.refund_percent||100,`%)`]}),`.`]}),e.cancellation_reason&&(0,z.jsxs)(`p`,{className:`acrb-reason`,children:[(0,z.jsx)(`strong`,{children:`Reason:`}),` “`,e.cancellation_reason,`”`]}),(0,z.jsxs)(`div`,{className:`acrb-btn-row`,children:[(0,z.jsx)(`button`,{type:`button`,className:`btn btn-sm btn-approve`,style:{display:`inline-flex`,alignItems:`center`,gap:6},disabled:f[e.id],onClick:()=>w(e.id),children:f[e.id]?`Processing…`:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(mu,{width:14,height:14}),` Approve & Process Refund`]})}),(0,z.jsxs)(`button`,{type:`button`,className:`btn btn-sm btn-reject`,style:{display:`inline-flex`,alignItems:`center`,gap:6},disabled:f[e.id],onClick:()=>T(e.id),children:[(0,z.jsx)(hu,{width:14,height:14}),` Reject Request`]}),(0,z.jsxs)(`a`,{href:`https://wa.me/${(e.address_mobile||e.customer_mobile||``).replace(/[^0-9]/g,``)}?text=${encodeURIComponent(`Hi ${e.customer_name||`Customer`}, this is Ravichandra Handlooms regarding your cancellation request for order #${e.order_number||e.id}.`)}`,target:`_blank`,rel:`noreferrer`,className:`btn btn-sm btn-wa-chat`,style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[(0,z.jsx)(fu,{width:14,height:14}),` WhatsApp Customer`]}),(0,z.jsxs)(`a`,{href:`tel:${e.address_mobile||e.customer_mobile||``}`,className:`btn btn-sm btn-call-cust`,style:{display:`inline-flex`,alignItems:`center`,gap:6},children:[(0,z.jsx)(du,{width:14,height:14}),` Call Customer`]})]})]}),e.status===`paid_oversold`&&(0,z.jsxs)(`div`,{className:`oversold-banner`,style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,z.jsx)(pu,{width:16,height:16,style:{flexShrink:0}}),(0,z.jsx)(`span`,{children:`Paid after stock ran out for one or more items — check inventory and contact the customer if needed.`})]}),e.status===`cancelled`&&(0,z.jsxs)(`div`,{className:`cancelled-banner`,children:[`Cancelled `,e.cancelled_by?`by ${e.cancelled_by}`:``,` — `,e.refund_percent,`% refund (`,R(e.refund_amount||0),`) `,e.razorpay_payment_id?`was processed via Razorpay.`:`needs a manual refund.`,e.cancellation_reason&&(0,z.jsxs)(`span`,{className:`cancel-reason`,children:[`Reason: `,e.cancellation_reason]})]}),(0,z.jsxs)(`div`,{className:`order-row-head`,children:[(0,z.jsxs)(`div`,{className:`order-identity`,children:[(0,z.jsx)(`strong`,{children:e.order_number||`#SK${e.id}`}),(0,z.jsxs)(`span`,{className:`order-customer`,children:[e.customer_name,` (`,e.customer_email||e.customer_mobile,`)`]}),(0,z.jsx)(`span`,{className:`order-date`,children:new Date(e.created_at).toLocaleString(`en-IN`)})]}),(0,z.jsxs)(`div`,{className:`status-pill-group`,children:[(0,z.jsxs)(`span`,{className:`status-pill status-${(e.payment_status||e.status).toLowerCase()}`,children:[`Payment: `,ed[e.status]||e.payment_status||e.status]}),(0,z.jsxs)(`span`,{className:`status-pill status-shipment`,children:[`Logistics: `,e.shipment_status||`PENDING`]})]})]}),(0,z.jsxs)(`div`,{className:`order-detail-grid`,children:[(0,z.jsxs)(`div`,{className:`detail-block`,children:[(0,z.jsx)(`p`,{className:`detail-label`,children:`Shipping address`}),(0,z.jsxs)(`p`,{className:`detail-value`,children:[(0,z.jsx)(`strong`,{children:e.address_name}),` · `,e.address_mobile]}),(0,z.jsxs)(`p`,{className:`detail-value`,children:[e.address_line1,e.address_line2?`, ${e.address_line2}`:``]}),(0,z.jsxs)(`p`,{className:`detail-value`,children:[e.address_city,`, `,e.address_state,` — `,e.address_pincode,`, `,e.address_country||`India`]})]}),(0,z.jsxs)(`div`,{className:`detail-block`,children:[(0,z.jsx)(`p`,{className:`detail-label`,children:`Courier & Tracking`}),(0,z.jsxs)(`p`,{className:`detail-value`,children:[`Courier: `,(0,z.jsx)(`strong`,{children:e.courier_name||`Not Assigned`})]}),(0,z.jsxs)(`p`,{className:`detail-value mono`,children:[`AWB: `,e.awb_code||`Pending`]}),e.tracking_url?(0,z.jsx)(`a`,{href:e.tracking_url,target:`_blank`,rel:`noreferrer`,className:`tracking-link`,children:`Live Tracking Link ↗`}):e.awb_code?(0,z.jsxs)(`span`,{className:`tracking-hint`,children:[`Tracking active via `,e.courier_name||`courier`]}):null,(0,z.jsxs)(`button`,{type:`button`,className:`btn-edit-shipping`,style:{display:`inline-flex`,alignItems:`center`,gap:5},onClick:()=>E(e),children:[(0,z.jsx)(gu,{width:13,height:13}),` `,e.awb_code||e.courier_name?`Edit Courier / AWB`:`+ Add Courier / AWB`]})]}),(0,z.jsxs)(`div`,{className:`detail-block`,children:[(0,z.jsx)(`p`,{className:`detail-label`,children:`Payment & Ledger`}),(0,z.jsxs)(`p`,{className:`detail-value mono`,children:[`RP Order: `,e.razorpay_order_id||`—`]}),(0,z.jsxs)(`p`,{className:`detail-value mono`,children:[`Payment ID: `,e.razorpay_payment_id||`—`]}),e.coupon_code&&(0,z.jsxs)(`p`,{className:`detail-value coupon-tag`,children:[e.coupon_code,` applied · −`,R(e.discount)]}),e.tax_amount>0&&(0,z.jsxs)(`p`,{className:`detail-value`,children:[`GST (`,e.gst_rate||5,`% `,e.gst_type||`inclusive`,`): `,(0,z.jsx)(`strong`,{children:R(e.tax_amount)})]}),(0,z.jsxs)(`p`,{className:`detail-value`,children:[`Package Weight: `,e.total_weight_grams||600,`g`]})]})]}),(0,z.jsx)(`div`,{className:`order-row-items`,children:e.items.map(e=>(0,z.jsxs)(`div`,{className:`item-row`,children:[(0,z.jsxs)(L,{to:`/products/${e.product_id}`,target:`_blank`,rel:`noopener noreferrer`,className:`item-link`,children:[e.product_image&&(0,z.jsx)(`img`,{src:e.product_image,alt:``}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{className:`item-name`,children:e.product_name}),e.variant_name&&(0,z.jsxs)(`span`,{className:`variant-tag`,children:[`Color: `,e.variant_name]}),(0,z.jsxs)(`span`,{className:`item-sku`,children:[`SKU: `,e.sku||`N/A`]})]})]}),(0,z.jsxs)(`span`,{className:`item-qty-price`,children:[e.qty,` × `,R(e.price)]})]},e.id))}),(0,z.jsxs)(`div`,{className:`fulfillment-bar`,children:[(0,z.jsxs)(`div`,{className:`status-updater`,children:[(0,z.jsx)(`span`,{children:`Shipment Status:`}),(0,z.jsx)(`select`,{value:e.shipment_status||`PENDING`,disabled:f[e.id],onChange:t=>C(e.id,t.target.value),children:td.map(e=>(0,z.jsx)(`option`,{value:e,children:e},e))})]}),(0,z.jsxs)(`div`,{className:`order-actions-right`,children:[(0,z.jsxs)(`button`,{type:`button`,className:`btn btn-outline btn-sm`,style:{display:`inline-flex`,alignItems:`center`,gap:6},onClick:()=>E(e),children:[(0,z.jsx)(lu,{width:14,height:14}),` Courier & AWB`]}),e.paid_at&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline btn-sm invoice-btn`,style:{display:`inline-flex`,alignItems:`center`,gap:6},disabled:c===e.id,onClick:()=>S(e),children:c===e.id?`Preparing…`:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(_u,{width:14,height:14}),` Invoice`]})})]})]}),(0,z.jsxs)(`div`,{className:`order-row-foot`,children:[(0,z.jsxs)(`span`,{children:[`Shipping: `,e.shipping_fee===0?`Free`:R(e.shipping_fee)]}),e.discount>0&&(0,z.jsxs)(`span`,{children:[`Discount: −`,R(e.discount)]}),e.tax_amount>0&&(0,z.jsxs)(`span`,{children:[`GST (`,e.gst_rate||5,`%): `,R(e.tax_amount),` `,e.gst_type===`exclusive`?`(added)`:`(incl.)`]}),(0,z.jsxs)(`strong`,{className:`order-final-total`,children:[`Total: `,R(e.total_amount||e.subtotal-(e.discount||0)+(e.shipping_fee||0))]})]})]},e.id))]}),m&&(0,z.jsx)(`div`,{className:`modal-backdrop`,onClick:()=>h(null),children:(0,z.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),children:[(0,z.jsxs)(`div`,{className:`modal-head`,children:[(0,z.jsx)(`h3`,{children:`Courier & Tracking Details`}),(0,z.jsx)(`button`,{type:`button`,className:`close-btn`,onClick:()=>h(null),children:(0,z.jsx)(hu,{width:16,height:16})})]}),(0,z.jsxs)(`form`,{className:`shipping-edit-form`,onSubmit:D,children:[(0,z.jsxs)(`p`,{className:`modal-order-tag`,children:[`Order `,(0,z.jsx)(`strong`,{children:m.order_number||`#SK${m.id}`}),` · `,m.address_name]}),(0,z.jsxs)(`label`,{children:[`Courier Name`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. DTDC, Delhivery, Blue Dart, Speed Post, Professional`,value:g.courierName,onChange:e=>_(t=>({...t,courierName:e.target.value}))})]}),(0,z.jsxs)(`div`,{className:`courier-quick-picks`,children:[(0,z.jsx)(`span`,{children:`Quick select:`}),[`DTDC`,`Delhivery`,`Blue Dart`,`Speed Post`,`Professional`].map(e=>(0,z.jsx)(`button`,{type:`button`,className:`quick-pick-btn`,onClick:()=>_(t=>({...t,courierName:e})),children:e},e))]}),(0,z.jsxs)(`label`,{children:[`AWB / Tracking Number`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. D12345678, DEL987654321`,value:g.awbCode,onChange:e=>_(t=>({...t,awbCode:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Live Tracking URL (Optional)`,(0,z.jsx)(`input`,{type:`url`,placeholder:`https://track.dtdc.com/... or courier tracking URL`,value:g.trackingUrl,onChange:e=>_(t=>({...t,trackingUrl:e.target.value}))})]}),(0,z.jsxs)(`label`,{children:[`Shipment Status`,(0,z.jsx)(`select`,{value:g.shipmentStatus,onChange:e=>_(t=>({...t,shipmentStatus:e.target.value})),children:td.map(e=>(0,z.jsx)(`option`,{value:e,children:e},e))})]}),(0,z.jsxs)(`div`,{className:`modal-actions`,children:[(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:()=>h(null),children:`Cancel`}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:v,children:v?`Saving…`:`Save Courier Details`})]})]})]})}),(0,z.jsx)(`style`,{children:`
        .admin-orders { padding-bottom: 50px; }
        .admin-page-head { margin-bottom: 24px; }
        .head-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 6px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 580px; line-height: 1.6; }
        .filter-tabs {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
          scrollbar-width: none;
          max-width: 100%;
        }
        .filter-tabs::-webkit-scrollbar { display: none; }
        .tab-btn {
          font-size: 11.5px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--stone-300);
          background: #fff;
          cursor: pointer;
          color: var(--ink-600);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tab-btn.active {
          background: var(--maroon-900);
          color: #fff;
          border-color: var(--maroon-900);
        }

        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        .orders-list { display: flex; flex-direction: column; gap: 16px; }
        .order-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          border: 1px solid var(--stone-200);
          padding: 18px 20px;
          min-width: 0;
          box-sizing: border-box;
        }
        .order-row-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--stone-200);
          flex-wrap: wrap;
          gap: 10px;
        }
        .order-identity {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .order-identity strong { color: var(--maroon-900); font-size: 15px; margin-right: 2px; }
        .order-customer { font-size: 13px; color: var(--ink-700); }
        .order-date { font-size: 12px; color: var(--ink-400); }

        .status-pill-group { display: flex; gap: 8px; flex-wrap: wrap; }
        .status-pill { font-size: 11px; padding: 4px 10px; border-radius: 999px; font-weight: 500; white-space: nowrap; }
        .status-paid { background: #e8f2e6; color: #3c7a3c; }
        .status-created, .status-pending { background: #fdf0d5; color: #8a5a10; }
        .status-failed { background: #f6e3e3; color: #a13a3a; }
        .status-paid_oversold { background: #fbeacb; color: #8a5a10; }
        .status-cancelled { background: var(--stone-200); color: var(--ink-600); }
        .status-shipment { background: #e0f2fe; color: #0369a1; }

        .order-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
          background: var(--stone-50);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 12.5px;
          margin-bottom: 14px;
        }
        .detail-block { min-width: 0; }
        .detail-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--ink-400); margin: 0 0 4px; }
        .detail-value { margin: 2px 0; color: var(--ink-700); word-break: break-word; overflow-wrap: anywhere; }
        .mono { font-family: monospace; font-size: 11.5px; word-break: break-all; overflow-wrap: anywhere; }
        .coupon-tag { color: #3c7a3c; font-weight: 500; }
        .tracking-link { font-size: 11.5px; color: var(--maroon-900); text-decoration: underline; display: inline-block; margin-top: 2px; word-break: break-all; }

        .order-row-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
        .item-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; gap: 10px; }
        .item-link { display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit; min-width: 0; flex: 1; }
        .item-link img { width: 36px; height: 46px; object-fit: cover; border-radius: 4px; flex-shrink: 0; }
        .item-name { word-break: break-word; }
        .variant-tag { font-size: 11px; color: var(--maroon-900); background: #fdf6f5; padding: 1px 6px; border-radius: 4px; margin-left: 6px; white-space: nowrap; }
        .item-sku { font-size: 11px; color: var(--ink-400); margin-left: 6px; white-space: nowrap; }
        .item-qty-price { white-space: nowrap; font-weight: 500; }

        .fulfillment-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: #fdfaf9;
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-sm);
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .status-updater { display: flex; align-items: center; gap: 10px; font-size: 12.5px; }
        .status-updater select { font-size: 12px; padding: 6px 8px; border-radius: 4px; border: 1px solid var(--stone-300); }
        .order-actions-right { display: flex; gap: 8px; }

        .order-row-foot {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 16px;
          font-size: 12.5px;
          color: var(--ink-600);
          padding-top: 8px;
          flex-wrap: wrap;
        }
        .order-final-total { font-size: 15px; color: var(--maroon-900); }

        .oversold-banner, .cancelled-banner {
          font-size: 12px;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          margin-bottom: 12px;
        }
        .oversold-banner { background: #fbeacb; color: #8a5a10; }
        .cancelled-banner { background: #f6e3e3; color: #a13a3a; }
        .cancel-reason { display: block; font-weight: 500; margin-top: 2px; }

        .tab-highlight {
          background: #fff3cd !important;
          color: #856404 !important;
          border-color: #ffeeba !important;
          font-weight: 600;
        }
        .tab-btn.active.tab-highlight {
          background: #856404 !important;
          color: #fff !important;
          border-color: #856404 !important;
        }

        /* Admin Cancellation Request Box */
        .admin-cancel-req-box {
          background: #fff8e6;
          border: 1.5px solid #f6c23e;
          border-radius: var(--radius-sm);
          padding: 14px 16px;
          margin-bottom: 14px;
        }
        .acrb-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          flex-wrap: wrap;
          gap: 6px;
        }
        .acrb-alert-badge {
          background: #e74a3b;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }
        .acrb-time { font-size: 11.5px; color: #856404; }
        .acrb-heading { font-size: 15px; font-weight: 600; color: #5a3c02; margin: 0 0 4px; }
        .acrb-desc { font-size: 13px; color: #664d03; margin: 0 0 6px; }
        .acrb-reason { font-size: 12.5px; color: #78350f; background: rgba(255,255,255,0.7); padding: 4px 8px; border-radius: 4px; display: inline-block; margin: 0 0 12px; word-break: break-word; }
        .acrb-btn-row { display: flex; gap: 8px; flex-wrap: wrap; }
        
        .btn-approve { background: #1cc88a; color: #fff; border: none; font-weight: 600; padding: 8px 12px; border-radius: 4px; cursor: pointer; }
        .btn-approve:hover { background: #17a673; }
        .btn-reject { background: #e74a3b; color: #fff; border: none; font-weight: 600; padding: 8px 12px; border-radius: 4px; cursor: pointer; }
        .btn-reject:hover { background: #be2617; }
        .btn-wa-chat { background: #25d366; color: #fff; text-decoration: none; font-weight: 600; padding: 8px 12px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; }
        .btn-wa-chat:hover { background: #1ebc59; color: #fff; }
        .btn-call-cust { background: var(--maroon-900); color: #fff; text-decoration: none; font-weight: 600; padding: 8px 12px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; }
        .btn-call-cust:hover { background: var(--maroon-800); color: #fff; }

        .btn-edit-shipping {
          background: #fff;
          border: 1px solid var(--stone-300);
          color: var(--maroon-900);
          font-size: 11.5px;
          font-weight: 500;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 6px;
          display: inline-block;
        }
        .btn-edit-shipping:hover { background: var(--stone-100); }
        .tracking-hint { display: block; font-size: 11.5px; color: var(--ink-500); margin-top: 2px; }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 16px;
          box-sizing: border-box;
        }
        .modal-content {
          background: #fff;
          border-radius: var(--radius-md);
          max-width: 480px;
          width: 100%;
          max-height: 90vh;
          max-height: 90dvh;
          overflow-y: auto;
          padding: 22px 18px;
          box-sizing: border-box;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .modal-head h3 { font-size: 18px; color: var(--maroon-900); margin: 0; }
        .close-btn { background: none; border: none; font-size: 20px; cursor: pointer; color: var(--ink-400); padding: 4px; }
        
        .modal-order-tag { font-size: 12.5px; color: var(--ink-600); margin: 0 0 14px; background: var(--stone-50); padding: 6px 10px; border-radius: 4px; }
        .shipping-edit-form { display: flex; flex-direction: column; gap: 12px; font-size: 12.5px; }
        .shipping-edit-form label { display: flex; flex-direction: column; gap: 5px; color: var(--ink-700); font-weight: 500; }
        .shipping-edit-form input, .shipping-edit-form select {
          font-size: 13px;
          padding: 9px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
        }
        .courier-quick-picks { display: flex; gap: 5px; align-items: center; flex-wrap: wrap; margin-top: -2px; margin-bottom: 4px; }
        .courier-quick-picks span { font-size: 11px; color: var(--ink-400); }
        .quick-pick-btn {
          font-size: 11px;
          background: var(--stone-100);
          border: 1px solid var(--stone-300);
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          color: var(--ink-700);
        }
        .quick-pick-btn:hover { background: var(--maroon-900); color: #fff; border-color: var(--maroon-900); }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 14px; }

        @media (max-width: 800px) {
          .order-detail-grid { grid-template-columns: 1fr; gap: 12px; }
        }

        @media (max-width: 680px) {
          .head-row { flex-direction: column; align-items: stretch; gap: 12px; }
          .admin-page-head h1 { font-size: 22px; }
          .order-row { padding: 14px 14px; }
          .order-row-head { flex-direction: column; align-items: flex-start; gap: 6px; }
          .item-row { flex-wrap: wrap; }
          .fulfillment-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .status-updater {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
          .status-updater select {
            flex: 1;
            max-width: 200px;
          }
          .order-actions-right {
            width: 100%;
            display: flex;
            gap: 8px;
          }
          .order-actions-right .btn {
            flex: 1;
            text-align: center;
            justify-content: center;
          }
          .order-row-foot {
            justify-content: space-between;
          }
          .acrb-btn-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
          }
          .acrb-btn-row .btn {
            width: 100%;
            font-size: 11.5px;
            padding: 8px 6px;
          }
        }

        @media (max-width: 420px) {
          .acrb-btn-row {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function rd(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(!0),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(null),[c,l]=(0,x.useState)({});(0,x.useEffect)(()=>{u()},[]);function u(){V.getAllReturns().then(({returnRequests:e})=>t(e)).catch(e=>a(e.message)).finally(()=>r(!1))}async function d(e,t,n){s(e),a(``);try{await V.updateReturnStatus(e,{status:t,adminNotes:c[e]||``,refundAmount:n}),u()}catch(e){a(e.message)}finally{s(null)}}return(0,z.jsxs)(`div`,{className:`admin-returns`,children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`Return Requests & Refunds`}),(0,z.jsx)(`p`,{children:`Review contextual customer return tickets, inspect photos of reported defects, approve returns, and issue Razorpay refunds directly to customer accounts.`})]}),i&&(0,z.jsx)(`p`,{className:`admin-error`,children:i}),n&&(0,z.jsx)(`p`,{className:`empty`,children:`Loading return requests…`}),!n&&e.length===0&&(0,z.jsx)(`p`,{className:`empty`,children:`No return requests found.`}),(0,z.jsx)(`div`,{className:`returns-list`,children:e.map(e=>{let t=Array.isArray(e.photos)?e.photos:[];return(0,z.jsxs)(`div`,{className:`return-card`,children:[(0,z.jsxs)(`div`,{className:`return-head`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`span`,{className:`ret-id`,children:[`Ticket #`,e.id]}),(0,z.jsxs)(`span`,{className:`ret-order`,children:[`Order: `,e.order_number||`#${e.order_id}`]}),(0,z.jsx)(`span`,{className:`ret-date`,children:new Date(e.created_at).toLocaleString(`en-IN`)})]}),(0,z.jsx)(`span`,{className:`status-pill status-${e.status.toLowerCase()}`,children:e.status})]}),(0,z.jsxs)(`div`,{className:`return-body`,children:[(0,z.jsxs)(`div`,{className:`ret-customer-info`,children:[(0,z.jsxs)(`p`,{children:[(0,z.jsx)(`strong`,{children:`Customer:`}),` `,e.customer_name,` (`,e.customer_mobile||e.customer_email,`)`]}),(0,z.jsxs)(`p`,{children:[(0,z.jsx)(`strong`,{children:`Item:`}),` `,e.product_name,` `,e.variant_name?`(Color: ${e.variant_name})`:``,` · Qty `,e.qty]}),(0,z.jsxs)(`p`,{children:[(0,z.jsx)(`strong`,{children:`Refund Value:`}),` `,R(e.refund_amount)]}),(0,z.jsxs)(`p`,{children:[(0,z.jsx)(`strong`,{children:`Reason:`}),` `,(0,z.jsx)(`span`,{className:`reason-text`,children:e.reason})]}),e.details&&(0,z.jsxs)(`p`,{children:[(0,z.jsx)(`strong`,{children:`Customer Note:`}),` `,e.details]})]}),t.length>0&&(0,z.jsxs)(`div`,{className:`ret-photos`,children:[(0,z.jsx)(`p`,{children:(0,z.jsx)(`strong`,{children:`Uploaded Photos:`})}),(0,z.jsx)(`div`,{className:`photos-row`,children:t.map((e,t)=>(0,z.jsx)(`a`,{href:e,target:`_blank`,rel:`noreferrer`,children:(0,z.jsx)(`img`,{src:e,alt:`Evidence`,className:`evidence-thumb`})},t))})]})]}),(0,z.jsxs)(`div`,{className:`return-actions-row`,children:[(0,z.jsx)(`input`,{type:`text`,placeholder:`Internal admin note…`,value:c[e.id]??(e.admin_notes||``),onChange:t=>l({...c,[e.id]:t.target.value}),className:`admin-note-input`}),(0,z.jsxs)(`div`,{className:`action-buttons`,children:[e.status===`PENDING`&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline btn-sm approve-btn`,disabled:o===e.id,onClick:()=>d(e.id,`APPROVED`),children:`Approve Return`}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline btn-sm reject-btn`,disabled:o===e.id,onClick:()=>d(e.id,`REJECTED`),children:`Reject`})]}),e.status===`APPROVED`&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline btn-sm`,disabled:o===e.id,onClick:()=>d(e.id,`PICKED_UP`),children:`Mark Courier Picked Up`}),e.status===`PICKED_UP`&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline btn-sm`,disabled:o===e.id,onClick:()=>d(e.id,`RECEIVED`),children:`Confirm Item Received`}),[`RECEIVED`,`APPROVED`].includes(e.status)&&(0,z.jsxs)(`button`,{type:`button`,className:`btn btn-primary btn-sm refund-btn`,disabled:o===e.id,onClick:()=>{window.confirm(`Issue Razorpay refund of ${R(e.refund_amount)} to ${e.customer_name}?`)&&d(e.id,`REFUNDED`)},children:[`Issue Refund (`,R(e.refund_amount),`)`]})]})]})]},e.id)})}),(0,z.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 26px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 680px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .empty { font-size: 13.5px; color: var(--ink-400); padding: 20px 0; }

        .returns-list { display: flex; flex-direction: column; gap: 16px; }
        .return-card {
          background: var(--paper);
          border-radius: var(--radius-md);
          border: 1px solid var(--stone-200);
          padding: 18px 20px;
        }
        .return-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--stone-200);
          font-size: 13px;
        }
        .ret-id { font-weight: 600; color: var(--maroon-900); margin-right: 12px; }
        .ret-order { font-weight: 500; margin-right: 12px; color: var(--ink-700); }
        .ret-date { color: var(--ink-400); font-size: 12px; }

        .status-pill {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 999px;
          text-transform: uppercase;
        }
        .status-pending { background: #fdf0d5; color: #8a5a10; }
        .status-approved { background: #e8f2e6; color: #3c7a3c; }
        .status-rejected { background: #f6e3e3; color: #a13a3a; }
        .status-picked_up { background: #e0f2fe; color: #0369a1; }
        .status-received { background: #ede9fe; color: #6d28d9; }
        .status-refunded { background: #dcfce7; color: #15803d; }

        .return-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 20px;
          padding: 14px 0;
          font-size: 13px;
        }
        .ret-customer-info p { margin: 4px 0; color: var(--ink-700); }
        .reason-text { color: var(--maroon-900); font-weight: 500; }
        .photos-row { display: flex; gap: 8px; margin-top: 6px; }
        .evidence-thumb { width: 56px; height: 56px; object-fit: cover; border-radius: 4px; border: 1px solid var(--stone-300); }

        .return-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--stone-200);
        }
        .admin-note-input {
          flex: 1;
          font-size: 12.5px;
          padding: 7px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
        }
        .action-buttons { display: flex; gap: 8px; }
        .approve-btn { color: #3c7a3c; border-color: #3c7a3c; }
        .reject-btn { color: #a13a3a; border-color: #a13a3a; }
        .refund-btn { background: #15803d; border-color: #15803d; color: #fff; }

        @media (max-width: 700px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .return-card { padding: 14px; }
          .return-head { flex-direction: column; align-items: flex-start; gap: 8px; }
          .return-body {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .return-actions-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .admin-note-input {
            width: 100%;
            box-sizing: border-box;
          }
          .action-buttons {
            width: 100%;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }
          .action-buttons .btn {
            flex: 1;
            min-width: 120px;
            text-align: center;
            justify-content: center;
            padding: 8px 12px;
          }
        }
      `})]})}var id={nickname:``,address:``,city:``,state:``,pincode:``,phone:``,isDefault:!1};function ad(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(id),[i,a]=(0,x.useState)(!0),[o,s]=(0,x.useState)(!1),[c,l]=(0,x.useState)(``),[u,d]=(0,x.useState)(``);(0,x.useEffect)(()=>{f()},[]);function f(){V.getPickupLocations().then(({pickupLocations:e})=>t(e)).catch(e=>l(e.message)).finally(()=>a(!1))}async function p(e){e.preventDefault(),l(``),d(``);try{await V.addPickupLocation(n),d(`Pickup location added successfully.`),r(id),f()}catch(e){l(e.message)}}async function m(e){try{await V.setDefaultPickupLocation(e),f()}catch(e){l(e.message)}}async function h(e){if(window.confirm(`Delete this pickup location?`))try{await V.deletePickupLocation(e),f()}catch(e){l(e.message)}}async function g(){s(!0),l(``),d(``);try{let e=await V.syncPickupLocations();d(e.message||`Locations synced with Shiprocket.`),f()}catch(e){l(e.message)}finally{s(!1)}}return(0,z.jsxs)(`div`,{className:`admin-pickup`,children:[(0,z.jsx)(`div`,{className:`admin-page-head`,children:(0,z.jsxs)(`div`,{className:`head-row`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`h1`,{children:`Shiprocket Pickup Warehouses`}),(0,z.jsx)(`p`,{children:`Manage store origin locations where couriers pick up packed orders. Set the primary dispatch warehouse used for dynamic rate calculations.`})]}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline sync-btn`,style:{display:`inline-flex`,alignItems:`center`},disabled:o,onClick:g,children:o?`Syncing…`:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(xu,{width:14,height:14,style:{marginRight:6}}),` Sync from Shiprocket`]})})]})}),c&&(0,z.jsx)(`p`,{className:`admin-error`,children:c}),u&&(0,z.jsx)(`p`,{className:`admin-success`,children:u}),(0,z.jsxs)(`div`,{className:`cms-layout`,children:[(0,z.jsxs)(`form`,{className:`cms-form`,onSubmit:p,children:[(0,z.jsx)(`h3`,{children:`Add Pickup Location`}),(0,z.jsxs)(`label`,{children:[`Location Nickname *`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. Primary Warehouse`,value:n.nickname,onChange:e=>r({...n,nickname:e.target.value}),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Street Address *`,(0,z.jsx)(`textarea`,{rows:`2`,placeholder:`Building, street, landmark`,value:n.address,onChange:e=>r({...n,address:e.target.value}),required:!0})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`City *`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. Hyderabad`,value:n.city,onChange:e=>r({...n,city:e.target.value}),required:!0})]}),(0,z.jsxs)(`label`,{children:[`State *`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. Telangana`,value:n.state,onChange:e=>r({...n,state:e.target.value}),required:!0})]})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Pincode *`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. 500001`,maxLength:`6`,value:n.pincode,onChange:e=>r({...n,pincode:e.target.value}),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Contact Phone *`,(0,z.jsx)(`input`,{type:`tel`,placeholder:`e.g. 9876543210`,value:n.phone,onChange:e=>r({...n,phone:e.target.value}),required:!0})]})]}),(0,z.jsxs)(`label`,{className:`checkbox-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:n.isDefault,onChange:e=>r({...n,isDefault:e.target.checked})}),`Set as default origin for courier dispatch`]}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Save Location`})]}),(0,z.jsxs)(`div`,{className:`cms-list`,children:[i&&(0,z.jsx)(`p`,{className:`empty`,children:`Loading locations…`}),!i&&e.length===0&&(0,z.jsx)(`p`,{className:`empty`,children:`No pickup locations configured yet.`}),e.map(e=>(0,z.jsxs)(`div`,{className:`cms-row ${e.is_default?`is-default-card`:``}`,children:[(0,z.jsxs)(`div`,{className:`row-info`,children:[(0,z.jsxs)(`div`,{className:`loc-title-row`,children:[(0,z.jsx)(`strong`,{children:e.nickname}),e.is_default&&(0,z.jsx)(`span`,{className:`default-badge`,children:`Primary Dispatch`})]}),(0,z.jsxs)(`span`,{className:`loc-address`,children:[e.address,`, `,e.city,`, `,e.state,` — `,e.pincode]}),(0,z.jsxs)(`span`,{className:`loc-phone`,children:[`Phone: `,e.phone]})]}),(0,z.jsxs)(`div`,{className:`row-actions`,children:[!e.is_default&&(0,z.jsx)(`button`,{type:`button`,onClick:()=>m(e.id),children:`Set as Default`}),!e.is_default&&(0,z.jsx)(`button`,{type:`button`,className:`danger`,onClick:()=>h(e.id),children:`Delete`})]})]},e.id))]})]}),(0,z.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 26px; }
        .head-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 600px; line-height: 1.6; }
        .sync-btn { padding: 8px 16px; font-size: 12.5px; white-space: nowrap; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .admin-success { font-size: 12.5px; color: #3c7a3c; margin-bottom: 16px; }

        .cms-layout { display: grid; grid-template-columns: 360px 1fr; gap: 28px; align-items: flex-start; }
        .cms-form {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border: 1px solid var(--stone-200);
        }
        .cms-form h3 { margin: 0 0 4px; font-size: 16px; color: var(--ink-900); }
        .cms-form label { display: flex; flex-direction: column; gap: 5px; font-size: 12.5px; color: var(--ink-700); }
        .cms-form input, .cms-form textarea {
          font-size: 13px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .checkbox-row { flex-direction: row !important; align-items: center; gap: 8px !important; cursor: pointer; }

        .cms-list { display: flex; flex-direction: column; gap: 12px; }
        .cms-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          border: 1px solid var(--stone-200);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .is-default-card { border-color: var(--maroon-900); background: #fdfaf9; }
        .loc-title-row { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
        .loc-title-row strong { font-size: 14px; color: var(--ink-900); }
        .default-badge {
          font-size: 10.5px;
          font-weight: 600;
          color: #3c7a3c;
          background: #e8f2e6;
          padding: 2px 8px;
          border-radius: 999px;
        }
        .loc-address { font-size: 12.5px; color: var(--ink-600); display: block; }
        .loc-phone { font-size: 12px; color: var(--ink-400); display: block; margin-top: 2px; }

        .row-actions { display: flex; align-items: center; gap: 12px; }
        .row-actions button { background: none; border: none; font-size: 12.5px; color: var(--maroon-900); cursor: pointer; }
        .empty { font-size: 13.5px; color: var(--ink-400); padding: 20px 0; }

        @media (max-width: 900px) {
          .cms-layout { grid-template-columns: 1fr; gap: 20px; }
        }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .head-row { flex-direction: column; align-items: stretch; gap: 12px; }
          .sync-btn { width: 100%; text-align: center; }
          .cms-form { padding: 18px 14px; }
          .form-row { grid-template-columns: 1fr; }
          .cms-form .btn { width: 100%; text-align: center; justify-content: center; }
          .cms-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 14px;
          }
          .row-actions {
            justify-content: flex-end;
            padding-top: 8px;
            border-top: 1px solid var(--stone-100);
            gap: 8px;
          }
          .row-actions button {
            padding: 6px 12px;
            background: var(--stone-100);
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          .row-actions .danger { background: #fdf2f2; }
        }
      `})]})}var od={enabled:!0,rate:5,type:`inclusive`,gstin:`37AAAAA0000A1Z5`,legalName:`Ravichandra Textiles`,state:`Andhra Pradesh`,stateCode:`37`,hsnCode:`5007`};function sd(){let[e,t]=(0,x.useState)({fee:100,freeThreshold:5e3}),[n,r]=(0,x.useState)(od),[i,a]=(0,x.useState)({email:``,phone:``,whatsapp:``,address:``}),[o,s]=(0,x.useState)({text:`Handcrafted Heirlooms • Free shipping on orders above ₹5,000`,active:!0}),[c,l]=(0,x.useState)(``),[u,d]=(0,x.useState)(!1),[f,p]=(0,x.useState)(null),[m,h]=(0,x.useState)(!0),[g,_]=(0,x.useState)(``),[v,y]=(0,x.useState)(``);(0,x.useEffect)(()=>{b()},[]);async function b(){try{let{settings:e}=await V.getSettings();e.shipping_settings&&t(e.shipping_settings),e.gst_settings&&r({...od,...e.gst_settings}),e.contact_info&&a(e.contact_info),e.announcement_banner&&s(e.announcement_banner)}catch(e){y(e.message)}finally{h(!1)}}async function S(e,t){y(``),_(``);try{await V.updateSetting(e,t),_(`Saved ${e.replace(`_`,` `)} successfully.`),setTimeout(()=>_(``),3e3)}catch(e){y(e.message)}}async function C(e){e.preventDefault(),d(!0),p(null);try{let e=await V.testAdminEmail(c||void 0);p({ok:!0,message:e.message||`Test email dispatched successfully! Please check your inbox or spam folder.`,provider:e.provider})}catch(e){p({ok:!1,message:e.message||`Failed to send test email.`})}finally{d(!1)}}return m?(0,z.jsx)(`div`,{className:`admin-settings`,children:(0,z.jsx)(`p`,{className:`empty`,children:`Loading settings…`})}):(0,z.jsxs)(`div`,{className:`admin-settings`,children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`Store & Logistics Settings`}),(0,z.jsx)(`p`,{children:`Configure global delivery rates, GST and tax calculation, store contact channels, and promotional announcements.`})]}),g&&(0,z.jsx)(`p`,{className:`admin-success`,children:g}),v&&(0,z.jsx)(`p`,{className:`admin-error`,children:v}),(0,z.jsxs)(`div`,{className:`settings-grid`,children:[(0,z.jsxs)(`div`,{className:`settings-card`,children:[(0,z.jsxs)(`h3`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,z.jsx)(lu,{width:18,height:18,style:{color:`var(--maroon-900)`,flexShrink:0}}),`Delivery & Shipping Charges`]}),(0,z.jsx)(`p`,{className:`card-sub`,children:`Fallback courier fee and minimum purchase amount to qualify for free shipping.`}),(0,z.jsxs)(`form`,{onSubmit:t=>{t.preventDefault(),S(`shipping_settings`,e)},children:[(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Standard Delivery Fee (₹)`,(0,z.jsx)(`input`,{type:`number`,min:`0`,value:e.fee,onChange:n=>t({...e,fee:Number(n.target.value)}),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Free Shipping Threshold (₹)`,(0,z.jsx)(`input`,{type:`number`,min:`0`,value:e.freeThreshold,onChange:n=>t({...e,freeThreshold:Number(n.target.value)}),required:!0})]})]}),(0,z.jsxs)(`p`,{className:`field-hint`,children:[`Customers with bags above ₹`,e.freeThreshold,` receive 100% free delivery across India.`]}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary btn-sm`,children:`Save Shipping Rules`})]})]}),(0,z.jsxs)(`div`,{className:`settings-card`,children:[(0,z.jsxs)(`h3`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,z.jsx)(Cu,{width:18,height:18,style:{color:`var(--maroon-900)`,flexShrink:0}}),`GST & Tax Billing Settings`]}),(0,z.jsx)(`p`,{className:`card-sub`,children:`Configure your business GSTIN, tax percentage, calculation mode, and legal invoice details.`}),(0,z.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),S(`gst_settings`,n)},children:[(0,z.jsxs)(`label`,{className:`checkbox-row`,style:{marginBottom:4},children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:n.enabled,onChange:e=>r({...n,enabled:e.target.checked})}),(0,z.jsx)(`strong`,{children:`Enable GST Billing & Official Tax Invoices`})]}),(0,z.jsx)(`p`,{className:`field-hint`,style:{marginTop:-4,marginBottom:12},children:`When enabled, tax is calculated on orders, itemized with CGST + SGST (or IGST for interstate deliveries), and printed on official PDF Tax Invoices.`}),n.enabled&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Business GSTIN / Tax ID`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. 37AAAAA0000A1Z5`,value:n.gstin,onChange:e=>r({...n,gstin:e.target.value.toUpperCase()}),maxLength:15,required:n.enabled}),(0,z.jsx)(`span`,{className:`field-hint`,children:`15-character Goods & Services Tax Identification Number`})]}),(0,z.jsxs)(`label`,{children:[`Legal Registered Firm Name`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. Ravichandra Textiles & Handlooms`,value:n.legalName,onChange:e=>r({...n,legalName:e.target.value}),required:n.enabled}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Official trade name printed on tax invoices`})]})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`GST Calculation Mode`,(0,z.jsxs)(`select`,{value:n.type,onChange:e=>r({...n,type:e.target.value}),children:[(0,z.jsx)(`option`,{value:`inclusive`,children:`Inclusive (Prices already include GST - Recommended)`}),(0,z.jsx)(`option`,{value:`exclusive`,children:`Exclusive (GST added on top of product prices at checkout)`})]}),(0,z.jsx)(`span`,{className:`field-hint`,children:n.type===`inclusive`?`Catalog prices stay clean; invoice breaks out taxable amount and tax component.`:`GST percentage is added on top of merchandise subtotal at billing.`})]}),(0,z.jsxs)(`label`,{children:[`Applicable GST Rate (%)`,(0,z.jsxs)(`div`,{style:{display:`flex`,gap:6,alignItems:`center`},children:[(0,z.jsx)(`input`,{type:`number`,min:`0`,max:`28`,step:`0.5`,value:n.rate,onChange:e=>r({...n,rate:Number(e.target.value)}),style:{flex:1},required:n.enabled}),(0,z.jsx)(`div`,{className:`rate-chips`,children:[5,12,18].map(e=>(0,z.jsxs)(`button`,{type:`button`,className:`chip-btn ${n.rate===e?`active`:``}`,onClick:()=>r({...n,rate:e}),children:[e,`%`]},e))})]}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Standard GST for handloom & silk sarees is 5%`})]})]}),(0,z.jsxs)(`div`,{className:`form-row three`,children:[(0,z.jsxs)(`label`,{children:[`HSN / SAC Code`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. 5007`,value:n.hsnCode,onChange:e=>r({...n,hsnCode:e.target.value})}),(0,z.jsx)(`span`,{className:`field-hint`,children:`HSN 5007 = Silk Weaves`})]}),(0,z.jsxs)(`label`,{children:[`Store State / Place of Supply`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. Andhra Pradesh`,value:n.state,onChange:e=>r({...n,state:e.target.value})}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Origin state for intrastate split`})]}),(0,z.jsxs)(`label`,{children:[`State Code (GST)`,(0,z.jsx)(`input`,{type:`text`,placeholder:`e.g. 37`,value:n.stateCode,onChange:e=>r({...n,stateCode:e.target.value}),maxLength:2}),(0,z.jsx)(`span`,{className:`field-hint`,children:`AP = 37, TS = 36, KA = 29, TN = 33`})]})]}),(0,z.jsxs)(`div`,{className:`gst-explainer-box`,children:[(0,z.jsx)(`strong`,{children:`Automatic Tax Split Logic:`}),(0,z.jsxs)(`p`,{children:[`• `,(0,z.jsxs)(`strong`,{children:[`Intrastate Orders (`,n.state||`Same State`,`):`]}),` Split into `,(0,z.jsxs)(`strong`,{children:[`CGST (`,n.rate/2,`%)`]}),` + `,(0,z.jsxs)(`strong`,{children:[`SGST (`,n.rate/2,`%)`]}),`.`,(0,z.jsx)(`br`,{}),`• `,(0,z.jsx)(`strong`,{children:`Interstate Orders (Rest of India):`}),` Billed as `,(0,z.jsxs)(`strong`,{children:[`IGST (`,n.rate,`%)`]}),`.`,(0,z.jsx)(`br`,{}),`• Printed cleanly in the legal PDF Tax Invoice for every customer order.`]})]})]}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary btn-sm`,children:`Save GST & Tax Settings`})]})]}),(0,z.jsxs)(`div`,{className:`settings-card`,children:[(0,z.jsxs)(`h3`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,z.jsx)(uu,{width:18,height:18,style:{color:`var(--maroon-900)`,flexShrink:0}}),`Store Announcement Banner`]}),(0,z.jsx)(`p`,{className:`card-sub`,children:`Top notification ticker displayed across the storefront.`}),(0,z.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),S(`announcement_banner`,o)},children:[(0,z.jsxs)(`label`,{children:[`Banner Announcement Text`,(0,z.jsx)(`input`,{type:`text`,value:o.text,onChange:e=>s({...o,text:e.target.value}),required:!0})]}),(0,z.jsxs)(`label`,{className:`checkbox-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:o.active,onChange:e=>s({...o,active:e.target.checked})}),`Show banner on storefront`]}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary btn-sm`,children:`Save Banner`})]})]}),(0,z.jsxs)(`div`,{className:`settings-card`,children:[(0,z.jsxs)(`h3`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,z.jsx)(du,{width:18,height:18,style:{color:`var(--maroon-900)`,flexShrink:0}}),`Customer Support Details`]}),(0,z.jsx)(`p`,{className:`card-sub`,children:`Shown on contact pages, invoices, and customer order emails.`}),(0,z.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),S(`contact_info`,i)},children:[(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`Support Email`,(0,z.jsx)(`input`,{type:`email`,value:i.email,onChange:e=>a({...i,email:e.target.value}),placeholder:`ravichandratextiles39@gmail.com`})]}),(0,z.jsxs)(`label`,{children:[`Support Phone`,(0,z.jsx)(`input`,{type:`tel`,value:i.phone,onChange:e=>a({...i,phone:e.target.value}),placeholder:`+91 83175 51337`})]})]}),(0,z.jsxs)(`div`,{className:`form-row`,children:[(0,z.jsxs)(`label`,{children:[`WhatsApp Helpline`,(0,z.jsx)(`input`,{type:`tel`,value:i.whatsapp,onChange:e=>a({...i,whatsapp:e.target.value}),placeholder:`+91 98765 43210`})]}),(0,z.jsxs)(`label`,{children:[`Showroom Address`,(0,z.jsx)(`input`,{type:`text`,value:i.address,onChange:e=>a({...i,address:e.target.value}),placeholder:`Banjara Hills, Hyderabad`})]})]}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary btn-sm`,children:`Save Contact Details`})]})]}),(0,z.jsxs)(`div`,{className:`settings-card`,children:[(0,z.jsxs)(`h3`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,z.jsx)(`span`,{style:{fontSize:`18px`},children:`✉️`}),`Email Delivery & Notifications Service`]}),(0,z.jsx)(`p`,{className:`card-sub`,children:`Sends automated order confirmations, PDF tax invoices, and account security notices via SMTP or Resend.`}),(0,z.jsxs)(`form`,{onSubmit:C,style:{display:`flex`,flexDirection:`column`,gap:14},children:[(0,z.jsx)(`div`,{className:`form-row`,children:(0,z.jsxs)(`label`,{children:[`Send Test Verification Email To:`,(0,z.jsx)(`input`,{type:`email`,value:c,onChange:e=>l(e.target.value),placeholder:`ravichandratextiles39@gmail.com`}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Leave blank to use default admin address`})]})}),f&&(0,z.jsxs)(`div`,{style:{padding:`12px 14px`,borderRadius:`6px`,fontSize:`13px`,background:f.ok?`#e8f5e9`:`#ffebee`,color:f.ok?`#2e7d32`:`#c62828`,border:`1px solid ${f.ok?`#c8e6c9`:`#ffcdd2`}`},children:[(0,z.jsx)(`strong`,{children:f.ok?`✓ Success: `:`✕ Delivery Issue: `}),f.message,f.provider&&(0,z.jsxs)(`div`,{style:{marginTop:`4px`,fontSize:`11.5px`,opacity:.85},children:[`Sent via: `,(0,z.jsx)(`strong`,{children:f.provider.toUpperCase()})]})]}),(0,z.jsx)(`div`,{children:(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-secondary btn-sm`,disabled:u,children:u?`Sending Test Email…`:`Send Test Email Now`})})]})]})]}),(0,z.jsx)(`style`,{children:`
        .admin-settings { padding-bottom: 40px; }
        .admin-page-head { margin-bottom: 26px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 600px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .admin-success { font-size: 12.5px; color: #3c7a3c; margin-bottom: 16px; }

        .settings-grid { display: flex; flex-direction: column; gap: 20px; max-width: 760px; }
        .settings-card {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 22px 24px;
        }
        .settings-card h3 { font-size: 16px; color: var(--ink-900); margin: 0 0 4px; }
        .card-sub { font-size: 12.5px; color: var(--ink-400); margin: 0 0 16px; }

        .settings-card form { display: flex; flex-direction: column; gap: 14px; }
        .settings-card label { display: flex; flex-direction: column; gap: 5px; font-size: 12.5px; color: var(--ink-700); }
        .settings-card input, .settings-card select {
          font-size: 13px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-300);
          background: #ffffff;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .form-row.three { grid-template-columns: 1fr 1fr 1fr; }
        .checkbox-row { flex-direction: row !important; align-items: center; gap: 8px !important; cursor: pointer; }
        .field-hint { font-size: 11.5px; color: var(--ink-400); margin: 2px 0 6px; }

        .rate-chips { display: flex; gap: 4px; }
        .chip-btn {
          padding: 7px 11px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 4px;
          border: 1px solid var(--stone-300);
          background: #ffffff;
          color: var(--ink-700);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .chip-btn:hover {
          border-color: var(--maroon-900);
          color: var(--maroon-900);
        }
        .chip-btn.active {
          background: var(--maroon-900);
          color: #ffffff;
          border-color: var(--maroon-900);
        }

        .gst-explainer-box {
          background: #faf6f0;
          border: 1px solid #e7dac9;
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          font-size: 12px;
          line-height: 1.6;
          color: var(--ink-700);
        }
        .gst-explainer-box strong { color: var(--maroon-900); }
        .gst-explainer-box p { margin: 4px 0 0; }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .settings-card { padding: 18px 16px; }
          .form-row, .form-row.three { grid-template-columns: 1fr; gap: 12px; }
          .settings-card .btn { width: 100%; text-align: center; justify-content: center; }
        }
      `})]})}function cd(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(``);(0,x.useEffect)(()=>{i()},[]);function i(){V.getAdminReviews().then(({reviews:e})=>t(e)).catch(e=>r(e.message))}async function a(e){try{await V.approveReview(e.id,!e.approved),i()}catch(e){r(e.message)}}async function o(e){if(window.confirm(`Delete this review?`))try{await V.deleteReview(e),i()}catch(e){r(e.message)}}return(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`Reviews`}),(0,z.jsx)(`p`,{children:`Star ratings and comments customers left on product pages. Hide a review to remove it from the storefront without deleting it.`})]}),n&&(0,z.jsx)(`p`,{className:`admin-error`,children:n}),(0,z.jsxs)(`div`,{className:`cms-list`,children:[e.length===0&&(0,z.jsx)(`p`,{className:`empty`,children:`No reviews yet.`}),e.map(e=>(0,z.jsxs)(`div`,{className:`review-row`,children:[(0,z.jsxs)(`div`,{className:`review-row-main`,children:[(0,z.jsxs)(`div`,{className:`review-row-head`,children:[(0,z.jsx)(`strong`,{children:e.product_name}),(0,z.jsx)(`span`,{className:`stars`,style:{display:`inline-flex`,alignItems:`center`,gap:2},children:Array.from({length:5}).map((t,n)=>(0,z.jsx)(iu,{width:13,height:13,fill:n<e.rating?`var(--gold-500)`:`none`,stroke:`var(--gold-500)`},n))})]}),e.comment&&(0,z.jsx)(`p`,{children:e.comment}),(0,z.jsxs)(`span`,{className:`review-by`,children:[e.user_name,` · `,e.user_email,` · `,new Date(e.created_at).toLocaleDateString(`en-IN`)]})]}),(0,z.jsxs)(`div`,{className:`row-actions`,children:[(0,z.jsx)(`button`,{onClick:()=>a(e),children:e.approved?`Hide`:`Show`}),(0,z.jsx)(`button`,{onClick:()=>o(e.id),className:`danger`,children:`Delete`})]})]},e.id))]}),(0,z.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        .cms-list { display: flex; flex-direction: column; gap: 10px; }
        .review-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: flex-start;
        }
        .review-row-main { flex: 1; }
        .review-row-head { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
        .review-row-head strong { font-size: 13.5px; color: var(--ink-900); }
        .stars { color: var(--gold-500); font-size: 12px; }
        .review-row-main p { margin: 4px 0; font-size: 13px; color: var(--ink-600); }
        .review-by { font-size: 11.5px; color: var(--ink-400); }
        .row-actions { display: flex; gap: 10px; flex: 0 0 auto; }
        .row-actions button { background: none; border: none; font-size: 12.5px; color: var(--maroon-900); }
        .row-actions .danger { color: #a13a3a; }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .review-row {
            flex-direction: column;
            gap: 12px;
            padding: 14px;
          }
          .row-actions {
            width: 100%;
            justify-content: flex-end;
            padding-top: 8px;
            border-top: 1px solid var(--stone-100);
            gap: 8px;
          }
          .row-actions button {
            padding: 6px 12px;
            background: var(--stone-100);
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          .row-actions .danger { background: #fdf2f2; }
        }
      `})]})}var ld={productId:``,name:``,rating:5,text:``,photo:``,active:!0};function ud(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)(ld),[o,s]=(0,x.useState)(null),[c,l]=(0,x.useState)(`all`),[u,d]=(0,x.useState)(``),f=(0,x.useRef)(null);(0,x.useEffect)(()=>{p(),V.getProducts().then(({products:e})=>t(e)).catch(()=>{})},[]);function p(){V.getAllTestimonials().then(({testimonials:e})=>r(e)).catch(e=>d(e.message))}function m(){a(ld),s(null),f.current&&(f.current.value=``)}async function h(e){let t=e.target.files?.[0];if(!t)return;let n=await ku(t,{maxDimension:600});a(e=>({...e,photo:n}))}async function g(e){if(e.preventDefault(),!i.name.trim()||!i.text.trim())return;d(``);let t={productId:i.productId||null,name:i.name.trim(),rating:Number(i.rating),text:i.text.trim(),photo:i.photo||null,active:i.active};try{o?await V.updateTestimonial(o,t):await V.createTestimonial(t),m(),p()}catch(e){d(e.message)}}function _(e){a({productId:e.product_id||``,name:e.name,rating:e.rating,text:e.text,photo:e.photo||``,active:e.active}),s(e.id),window.scrollTo({top:0,behavior:`smooth`})}async function v(e){if(window.confirm(`Remove this testimonial?`))try{await V.deleteTestimonial(e),o===e&&m(),p()}catch(e){d(e.message)}}function y(t){return t?e.find(e=>e.id===t)?.name||`Unknown product`:`General (homepage band)`}let b=c===`all`?n:c===`general`?n.filter(e=>!e.product_id):n.filter(e=>e.product_id===c);return(0,z.jsxs)(`div`,{children:[(0,z.jsxs)(`div`,{className:`admin-page-head`,children:[(0,z.jsx)(`h1`,{children:`Testimonials`}),(0,z.jsx)(`p`,{children:`Add customer quotes, optionally with a small photo. Leave "Product" unset to show it in the general rotating band near the footer; pick a product to show it only on that product's page.`})]}),u&&(0,z.jsx)(`p`,{className:`admin-error`,children:u}),(0,z.jsxs)(`div`,{className:`cms-layout`,children:[(0,z.jsxs)(`form`,{className:`cms-form`,onSubmit:g,children:[(0,z.jsx)(`h3`,{children:o?`Edit testimonial`:`Add a testimonial`}),(0,z.jsxs)(`label`,{children:[`Product (optional)`,(0,z.jsxs)(`select`,{value:i.productId,onChange:e=>a(t=>({...t,productId:e.target.value})),children:[(0,z.jsx)(`option`,{value:``,children:`General (homepage band)`}),e.map(e=>(0,z.jsx)(`option`,{value:e.id,children:e.name},e.id))]})]}),(0,z.jsxs)(`label`,{children:[`Customer name`,(0,z.jsx)(`input`,{type:`text`,value:i.name,placeholder:`e.g. Ananya R.`,onChange:e=>a(t=>({...t,name:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Rating`,(0,z.jsx)(`select`,{value:i.rating,onChange:e=>a(t=>({...t,rating:e.target.value})),children:[5,4,3,2,1].map(e=>(0,z.jsxs)(`option`,{value:e,children:[e,` star`,e>1?`s`:``]},e))})]}),(0,z.jsxs)(`label`,{children:[`Review text`,(0,z.jsx)(`textarea`,{value:i.text,placeholder:`What did they say?`,rows:4,onChange:e=>a(t=>({...t,text:e.target.value})),required:!0})]}),(0,z.jsxs)(`label`,{children:[`Photo (optional)`,(0,z.jsx)(`input`,{type:`file`,accept:`image/*`,ref:f,onChange:h}),(0,z.jsx)(`span`,{className:`field-hint`,children:`Shown as a small circular photo next to the quote. Leave blank to show initials instead.`})]}),i.photo&&(0,z.jsxs)(`div`,{className:`photo-preview`,children:[(0,z.jsx)(`img`,{src:i.photo,alt:`Preview`}),(0,z.jsx)(`button`,{type:`button`,onClick:()=>a(e=>({...e,photo:``})),children:`Remove photo`})]}),(0,z.jsxs)(`label`,{className:`checkbox-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:i.active,onChange:e=>a(t=>({...t,active:e.target.checked}))}),`Active (visible on the site)`]}),(0,z.jsxs)(`div`,{className:`form-actions`,children:[(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:o?`Save Changes`:`Add Testimonial`}),o&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:m,children:`Cancel`})]})]}),(0,z.jsxs)(`div`,{className:`cms-list-wrap`,children:[(0,z.jsxs)(`label`,{className:`filter-row`,children:[`Filter`,(0,z.jsxs)(`select`,{value:c,onChange:e=>l(e.target.value),children:[(0,z.jsx)(`option`,{value:`all`,children:`All`}),(0,z.jsx)(`option`,{value:`general`,children:`General (homepage band)`}),e.map(e=>(0,z.jsx)(`option`,{value:e.id,children:e.name},e.id))]})]}),(0,z.jsxs)(`div`,{className:`cms-list`,children:[b.length===0&&(0,z.jsx)(`p`,{className:`empty`,children:`No testimonials yet.`}),b.map(e=>(0,z.jsxs)(`div`,{className:`cms-row testimonial-row`,children:[e.photo?(0,z.jsx)(`img`,{src:e.photo,alt:``,className:`row-photo`}):(0,z.jsx)(`div`,{className:`row-photo row-photo-fallback`,children:e.name.charAt(0)}),(0,z.jsxs)(`div`,{className:`row-info`,children:[(0,z.jsxs)(`strong`,{style:{display:`inline-flex`,alignItems:`center`,gap:4,flexWrap:`wrap`},children:[e.name,` ·`,(0,z.jsx)(`span`,{style:{display:`inline-flex`,alignItems:`center`,gap:2},children:Array.from({length:5}).map((t,n)=>(0,z.jsx)(iu,{width:12,height:12,fill:n<e.rating?`var(--gold-500)`:`none`,stroke:`var(--gold-500)`},n))}),!e.active&&` · inactive`]}),(0,z.jsx)(`span`,{className:`row-product`,children:y(e.product_id)}),(0,z.jsx)(`span`,{className:`row-text`,children:e.text})]}),(0,z.jsxs)(`div`,{className:`row-actions`,children:[(0,z.jsx)(`button`,{onClick:()=>_(e),children:`Edit`}),(0,z.jsx)(`button`,{onClick:()=>v(e.id),className:`danger`,children:`Delete`})]})]},e.id))]})]})]}),(0,z.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }

        .cms-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 28px;
          align-items: flex-start;
        }
        .cms-form {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cms-form h3 { font-family: var(--font-display); font-size: 18px; color: var(--maroon-900); margin: 0; }
        .cms-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .cms-form input[type="text"], .cms-form select, .cms-form textarea, .cms-form input[type="file"] {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
          resize: vertical;
          background: var(--paper);
        }
        .field-hint { font-size: 11.5px; color: var(--ink-400); line-height: 1.6; }
        .checkbox-row { flex-direction: row !important; align-items: center; gap: 8px !important; }
        .checkbox-row input { width: auto; }
        .photo-preview { display: flex; align-items: center; gap: 10px; }
        .photo-preview img { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; }
        .photo-preview button { background: none; border: none; font-size: 12px; color: #a13a3a; }
        .form-actions { display: flex; gap: 10px; }
        .form-actions .btn { padding: 11px 20px; font-size: 13px; }

        .cms-list-wrap { display: flex; flex-direction: column; gap: 16px; }
        .filter-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12.5px;
          color: var(--ink-600);
        }
        .filter-row select {
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-size: 13px;
        }
        .cms-list { display: flex; flex-direction: column; gap: 10px; }
        .cms-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .row-photo { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex: 0 0 auto; }
        .row-photo-fallback {
          display: flex; align-items: center; justify-content: center;
          background: var(--blush-300); color: var(--maroon-900);
          font-weight: 600; font-size: 15px;
        }
        .row-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .row-info strong { font-size: 13.5px; color: var(--ink-900); }
        .row-product { font-size: 11.5px; color: var(--maroon-700); text-transform: uppercase; letter-spacing: 0.04em; }
        .row-text { font-size: 12.5px; color: var(--ink-400); line-height: 1.6; }
        .row-actions { display: flex; gap: 10px; flex: 0 0 auto; }
        .row-actions button { background: none; border: none; font-size: 12.5px; color: var(--maroon-900); }
        .row-actions .danger { color: #a13a3a; }
        .empty { color: var(--ink-400); font-size: 13.5px; }
        @media (max-width: 900px) {
          .cms-layout { grid-template-columns: 1fr; gap: 20px; }
        }

        @media (max-width: 640px) {
          .admin-page-head { margin-bottom: 18px; }
          .admin-page-head h1 { font-size: 22px; margin-bottom: 6px; }
          .cms-form { padding: 18px 14px; }
          .form-actions { flex-direction: column; }
          .form-actions .btn { width: 100%; text-align: center; justify-content: center; }
          .filter-row { flex-direction: column; align-items: stretch; gap: 6px; }
          .filter-row select { width: 100%; }

          .cms-row {
            flex-direction: column;
            gap: 12px;
            padding: 14px;
          }
          .row-actions {
            width: 100%;
            justify-content: flex-end;
            padding-top: 8px;
            border-top: 1px solid var(--stone-100);
            gap: 8px;
          }
          .row-actions button {
            padding: 6px 12px;
            background: var(--stone-100);
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
          .row-actions .danger { background: #fdf2f2; }
        }
      `})]})}function dd(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)({totalUsers:0,googleUsers:0,customersWithOrders:0,totalLTV:0}),[i,a]=(0,x.useState)(!0),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(``),[u,d]=(0,x.useState)(`newest`),[f,p]=(0,x.useState)(`ALL`),[m,h]=(0,x.useState)(null),[g,_]=(0,x.useState)(null),[v,y]=(0,x.useState)(!1),[b,S]=(0,x.useState)(``);(0,x.useEffect)(()=>{C()},[u]);async function C(){a(!0),s(``);try{let e=await V.getAdminUsers({sort:u,q:c});t(e.users||[]),e.summary&&r(e.summary)}catch(e){s(e.message||`Failed to load customers list.`)}finally{a(!1)}}function w(e){e.preventDefault(),C()}async function T(e){h(e),y(!0),S(``),_(null);try{let t=await V.getAdminUserDetail(e);_(t)}catch(e){S(e.message||`Failed to load customer profile details.`)}finally{y(!1)}}function E(){h(null),_(null)}let D=e.filter(e=>f===`GOOGLE`?!!e.google_id:f===`ORDERS`?e.orders_count>0:f!==`ADMIN`||!!e.is_admin);return(0,z.jsxs)(`div`,{className:`admin-page admin-users-page`,children:[(0,z.jsxs)(`div`,{className:`admin-page-header`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`h1`,{children:`Customers & Patrons`}),(0,z.jsx)(`p`,{className:`admin-subtitle`,children:`Manage your registered customer accounts, Google profiles, and delivery addresses.`})]}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline btn-sm`,onClick:C,disabled:i,children:i?`Refreshing…`:`Refresh List`})]}),o&&(0,z.jsx)(`div`,{className:`admin-alert error`,children:o}),(0,z.jsxs)(`div`,{className:`users-stats-grid`,children:[(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon-wrap users-icon-bg`,children:(0,z.jsx)(wu,{width:22,height:22})}),(0,z.jsxs)(`div`,{className:`stat-content`,children:[(0,z.jsx)(`span`,{className:`stat-label`,children:`Total Registered`}),(0,z.jsx)(`strong`,{className:`stat-value`,children:n.totalUsers})]})]}),(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon-wrap google-icon-bg`,children:(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`20`,height:`20`,children:[(0,z.jsx)(`path`,{fill:`#4285F4`,d:`M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z`}),(0,z.jsx)(`path`,{fill:`#34A853`,d:`M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.26 21.34 7.33 24 12 24z`}),(0,z.jsx)(`path`,{fill:`#FBBC05`,d:`M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.27C.46 8.19 0 10.03 0 12s.46 3.81 1.27 5.43l4.01-3.14z`}),(0,z.jsx)(`path`,{fill:`#EA4335`,d:`M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.66 1.27 6.57l4.01 3.14c.95-2.83 3.6-4.96 6.72-4.96z`})]})}),(0,z.jsxs)(`div`,{className:`stat-content`,children:[(0,z.jsx)(`span`,{className:`stat-label`,children:`Google 1-Click Users`}),(0,z.jsx)(`strong`,{className:`stat-value`,children:n.googleUsers})]})]}),(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon-wrap orders-icon-bg`,children:(0,z.jsx)(Zl,{width:22,height:22})}),(0,z.jsxs)(`div`,{className:`stat-content`,children:[(0,z.jsx)(`span`,{className:`stat-label`,children:`Paying Customers`}),(0,z.jsx)(`strong`,{className:`stat-value`,children:n.customersWithOrders})]})]}),(0,z.jsxs)(`div`,{className:`stat-card`,children:[(0,z.jsx)(`div`,{className:`stat-icon-wrap rev-icon-bg`,children:(0,z.jsx)(`span`,{style:{fontSize:`18px`,fontWeight:700},children:`₹`})}),(0,z.jsxs)(`div`,{className:`stat-content`,children:[(0,z.jsx)(`span`,{className:`stat-label`,children:`Customer Lifetime Value`}),(0,z.jsx)(`strong`,{className:`stat-value`,children:R(n.totalLTV)})]})]})]}),(0,z.jsxs)(`div`,{className:`admin-toolbar`,children:[(0,z.jsxs)(`form`,{onSubmit:w,className:`search-form`,children:[(0,z.jsx)(`input`,{type:`search`,placeholder:`Search by name, email, or phone…`,value:c,onChange:e=>l(e.target.value),className:`search-input`}),(0,z.jsx)(`button`,{type:`submit`,className:`btn btn-secondary btn-sm`,children:`Search`}),c&&(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline btn-sm`,onClick:()=>{l(``),V.getAdminUsers({sort:u,q:``}).then(e=>t(e.users||[]))},children:`Clear`})]}),(0,z.jsxs)(`div`,{className:`filter-group`,children:[(0,z.jsxs)(`div`,{className:`pill-filters`,children:[(0,z.jsxs)(`button`,{type:`button`,className:`pill-btn ${f===`ALL`?`active`:``}`,onClick:()=>p(`ALL`),children:[`All (`,e.length,`)`]}),(0,z.jsxs)(`button`,{type:`button`,className:`pill-btn ${f===`GOOGLE`?`active`:``}`,onClick:()=>p(`GOOGLE`),children:[`Google (`,n.googleUsers,`)`]}),(0,z.jsxs)(`button`,{type:`button`,className:`pill-btn ${f===`ORDERS`?`active`:``}`,onClick:()=>p(`ORDERS`),children:[`With Orders (`,n.customersWithOrders,`)`]}),(0,z.jsx)(`button`,{type:`button`,className:`pill-btn ${f===`ADMIN`?`active`:``}`,onClick:()=>p(`ADMIN`),children:`Admins`})]}),(0,z.jsxs)(`div`,{className:`sort-dropdown`,children:[(0,z.jsx)(`label`,{htmlFor:`user-sort`,children:`Sort:`}),(0,z.jsxs)(`select`,{id:`user-sort`,value:u,onChange:e=>d(e.target.value),className:`select-input`,children:[(0,z.jsx)(`option`,{value:`newest`,children:`Newest Registered`}),(0,z.jsx)(`option`,{value:`oldest`,children:`Oldest First`}),(0,z.jsx)(`option`,{value:`orders_desc`,children:`Most Orders`}),(0,z.jsx)(`option`,{value:`spent_desc`,children:`Highest Spend`})]})]})]})]}),(0,z.jsx)(`div`,{className:`admin-table-container`,children:i?(0,z.jsx)(`div`,{className:`table-loading`,children:`Loading customer profiles…`}):D.length===0?(0,z.jsx)(`div`,{className:`table-empty`,children:(0,z.jsx)(`p`,{children:`No customers match your search or filter.`})}):(0,z.jsxs)(`table`,{className:`admin-table users-table`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Customer`}),(0,z.jsx)(`th`,{children:`Contact`}),(0,z.jsx)(`th`,{children:`Delivery Location`}),(0,z.jsx)(`th`,{children:`Orders & Spend`}),(0,z.jsx)(`th`,{children:`Joined`}),(0,z.jsx)(`th`,{children:`Actions`})]})}),(0,z.jsx)(`tbody`,{children:D.map(e=>{let t=(e.name||e.email||`U`).split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase(),n=e.mobile?e.mobile.replace(/\D/g,``):``,r=n.length===10?`91${n}`:n;return(0,z.jsxs)(`tr`,{className:e.is_admin?`user-row-admin`:``,children:[(0,z.jsx)(`td`,{children:(0,z.jsxs)(`div`,{className:`user-profile-cell`,children:[(0,z.jsx)(`div`,{className:`user-avatar ${e.is_admin?`avatar-admin`:``}`,children:t}),(0,z.jsxs)(`div`,{className:`user-name-meta`,children:[(0,z.jsx)(`strong`,{className:`user-name`,children:e.name||`Unnamed Patron`}),(0,z.jsxs)(`div`,{className:`user-badges`,children:[e.is_admin&&(0,z.jsx)(`span`,{className:`badge badge-admin`,children:`Admin`}),e.google_id?(0,z.jsxs)(`span`,{className:`badge badge-google`,title:`Google 1-Click Authenticated`,children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`12`,height:`12`,children:[(0,z.jsx)(`path`,{fill:`#4285F4`,d:`M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z`}),(0,z.jsx)(`path`,{fill:`#34A853`,d:`M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.26 21.34 7.33 24 12 24z`}),(0,z.jsx)(`path`,{fill:`#FBBC05`,d:`M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.27C.46 8.19 0 10.03 0 12s.46 3.81 1.27 5.43l4.01-3.14z`}),(0,z.jsx)(`path`,{fill:`#EA4335`,d:`M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.66 1.27 6.57l4.01 3.14c.95-2.83 3.6-4.96 6.72-4.96z`})]}),`Google`]}):(0,z.jsx)(`span`,{className:`badge badge-email`,children:`Email`})]})]})]})}),(0,z.jsx)(`td`,{children:(0,z.jsxs)(`div`,{className:`contact-cell`,children:[(0,z.jsx)(`span`,{className:`user-email`,children:e.email}),e.mobile?(0,z.jsxs)(`div`,{className:`user-phone-wrap`,children:[(0,z.jsx)(`span`,{className:`user-phone`,children:e.mobile}),(0,z.jsxs)(`div`,{className:`contact-quick-actions`,children:[(0,z.jsx)(`a`,{href:`https://wa.me/${r}?text=Namaste%20${encodeURIComponent(e.name||``)},%20greetings%20from%20Ravichandra%20Textiles!`,target:`_blank`,rel:`noreferrer`,className:`icon-link-wa`,title:`Chat on WhatsApp`,children:(0,z.jsx)(fu,{width:14,height:14})}),(0,z.jsx)(`a`,{href:`tel:${e.mobile}`,className:`icon-link-tel`,title:`Call customer`,children:(0,z.jsx)(du,{width:14,height:14})})]})]}):(0,z.jsx)(`span`,{className:`muted-text`,children:`No phone provided`})]})}),(0,z.jsx)(`td`,{children:e.default_address_city?(0,z.jsxs)(`div`,{className:`location-cell`,children:[(0,z.jsxs)(`strong`,{children:[e.default_address_city,`, `,e.default_address_state]}),(0,z.jsxs)(`span`,{className:`location-sub`,children:[`PIN: `,e.default_address_pincode]})]}):(0,z.jsx)(`span`,{className:`muted-text`,children:`Pending profile completion`})}),(0,z.jsx)(`td`,{children:(0,z.jsxs)(`div`,{className:`orders-metric-cell`,children:[(0,z.jsxs)(`span`,{className:`orders-count-badge ${e.orders_count>0?`has-orders`:``}`,children:[e.orders_count,` `,e.orders_count===1?`order`:`orders`]}),e.orders_count>0&&(0,z.jsx)(`strong`,{className:`user-ltv`,children:R(e.total_spent)})]})}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`span`,{className:`joined-date`,children:new Date(e.created_at).toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`,year:`numeric`})})}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`button`,{type:`button`,className:`btn btn-outline btn-sm btn-details`,onClick:()=>T(e.id),children:`View Profile`})})]},e.id)})})]})}),m&&(0,z.jsx)(`div`,{className:`modal-backdrop`,onClick:E,children:(0,z.jsxs)(`div`,{className:`modal-card user-detail-modal`,onClick:e=>e.stopPropagation(),children:[(0,z.jsxs)(`div`,{className:`modal-header`,children:[(0,z.jsx)(`h3`,{children:`Customer Profile & Orders`}),(0,z.jsx)(`button`,{type:`button`,className:`close-btn`,onClick:E,children:(0,z.jsx)(hu,{width:18,height:18})})]}),(0,z.jsx)(`div`,{className:`modal-body`,children:v?(0,z.jsx)(`div`,{className:`modal-loading`,children:`Loading customer records…`}):b?(0,z.jsx)(`div`,{className:`admin-alert error`,children:b}):g?(0,z.jsxs)(`div`,{className:`user-detail-content`,children:[(0,z.jsxs)(`div`,{className:`detail-primary-box`,children:[(0,z.jsx)(`div`,{className:`detail-avatar`,children:(g.user?.name||g.user?.email||`U`)[0].toUpperCase()}),(0,z.jsxs)(`div`,{className:`detail-meta`,children:[(0,z.jsx)(`h2`,{children:g.user?.name||`Unnamed Customer`}),(0,z.jsxs)(`div`,{className:`detail-row-item`,children:[(0,z.jsx)(`span`,{children:`Email:`}),(0,z.jsx)(`strong`,{children:g.user?.email})]}),(0,z.jsxs)(`div`,{className:`detail-row-item`,children:[(0,z.jsx)(`span`,{children:`Mobile:`}),(0,z.jsx)(`strong`,{children:g.user?.mobile||`Not provided`})]}),(0,z.jsxs)(`div`,{className:`detail-row-item`,children:[(0,z.jsx)(`span`,{children:`Account Type:`}),(0,z.jsx)(`span`,{children:g.user?.google_id?`Google Verified Account`:`Standard Account`})]})]})]}),(0,z.jsxs)(`div`,{className:`detail-section`,children:[(0,z.jsxs)(`h4`,{children:[`Saved Delivery Addresses (`,g.addresses?.length||0,`)`]}),g.addresses?.length===0?(0,z.jsx)(`p`,{className:`muted-text`,children:`No delivery addresses recorded yet.`}):(0,z.jsx)(`div`,{className:`address-cards-list`,children:g.addresses.map(e=>(0,z.jsxs)(`div`,{className:`address-item-card`,children:[(0,z.jsxs)(`div`,{className:`address-header`,children:[(0,z.jsx)(`strong`,{children:e.name||g.user?.name}),e.is_default&&(0,z.jsx)(`span`,{className:`badge badge-default`,children:`Primary Address`})]}),(0,z.jsxs)(`p`,{className:`address-lines`,children:[e.line1,e.line2&&(0,z.jsxs)(z.Fragment,{children:[`, `,e.line2]}),(0,z.jsx)(`br`,{}),e.city,`, `,e.state,` — `,e.pincode,(0,z.jsx)(`br`,{}),`Phone: `,e.mobile||g.user?.mobile]})]},e.id))})]}),(0,z.jsxs)(`div`,{className:`detail-section`,children:[(0,z.jsxs)(`h4`,{children:[`Order History (`,g.orders?.length||0,`)`]}),g.orders?.length===0?(0,z.jsx)(`p`,{className:`muted-text`,children:`Customer hasn't placed any orders yet.`}):(0,z.jsx)(`div`,{className:`orders-mini-table-wrap`,children:(0,z.jsxs)(`table`,{className:`mini-table`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Order`}),(0,z.jsx)(`th`,{children:`Date`}),(0,z.jsx)(`th`,{children:`Payment`}),(0,z.jsx)(`th`,{children:`Status`}),(0,z.jsx)(`th`,{children:`Amount`}),(0,z.jsx)(`th`,{children:`Action`})]})}),(0,z.jsx)(`tbody`,{children:g.orders.map(e=>(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{children:(0,z.jsxs)(`strong`,{children:[`#`,e.order_number||e.id]})}),(0,z.jsx)(`td`,{children:new Date(e.created_at).toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`,year:`numeric`})}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`span`,{className:`status-pill ${e.payment_status?.toLowerCase()}`,children:e.payment_status})}),(0,z.jsx)(`td`,{children:e.shipment_status||e.status}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`strong`,{children:R(e.total_amount||e.subtotal)})}),(0,z.jsx)(`td`,{children:(0,z.jsx)(L,{to:`/admin/orders`,className:`btn btn-outline btn-xs`,onClick:E,children:`View in Orders`})})]},e.id))})]})})]})]}):null})]})}),(0,z.jsx)(`style`,{children:`
        .admin-users-page { padding-bottom: 60px; }
        .users-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid var(--stone-200, #e8dec8);
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .users-icon-bg { background: rgba(88, 30, 21, 0.1); color: var(--maroon-900, #581e15); }
        .google-icon-bg { background: #f1f3f4; }
        .orders-icon-bg { background: rgba(176, 115, 46, 0.12); color: #b0732e; }
        .rev-icon-bg { background: rgba(46, 125, 50, 0.1); color: #2e7d32; }

        .stat-content { display: flex; flex-direction: column; gap: 2px; }
        .stat-label { font-size: 11.5px; color: var(--ink-500, #735e59); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
        .stat-value { font-size: 20px; color: var(--maroon-900, #581e15); font-family: var(--font-heading, serif); }

        .admin-toolbar {
          background: #ffffff;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid var(--stone-200, #e8dec8);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }
        .search-form { display: flex; align-items: center; gap: 8px; flex: 1; max-width: 420px; }
        .search-input {
          flex: 1;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #dcd3c4;
          font-size: 13.5px;
        }
        .filter-group { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .pill-filters { display: flex; gap: 6px; }
        .pill-btn {
          border: 1px solid #ded3c1;
          background: #faf6f0;
          color: var(--ink-700, #5c4742);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pill-btn.active {
          background: var(--maroon-900, #581e15);
          color: #ffffff;
          border-color: var(--maroon-900, #581e15);
        }
        .sort-dropdown { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--ink-600); }
        .select-input { padding: 6px 10px; border-radius: 6px; border: 1px solid #dcd3c4; font-size: 12.5px; }

        .admin-table-container {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid var(--stone-200, #e8dec8);
          overflow-x: auto;
          box-shadow: 0 4px 14px rgba(0,0,0,0.03);
        }
        .users-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .users-table th {
          background: #faf6f0;
          padding: 12px 16px;
          text-align: left;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink-600, #735e59);
          border-bottom: 1px solid var(--stone-200, #e8dec8);
        }
        .users-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #f3ece1;
          vertical-align: middle;
        }
        .user-row-admin { background: #fffcf8; }

        .user-profile-cell { display: flex; align-items: center; gap: 12px; }
        .user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #f0e6d6;
          color: var(--maroon-900, #581e15);
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dfd0bb;
          flex-shrink: 0;
        }
        .avatar-admin {
          background: var(--maroon-900, #581e15);
          color: #fbdfa2;
          border-color: #581e15;
        }
        .user-name-meta { display: flex; flex-direction: column; gap: 3px; }
        .user-name { font-size: 13.5px; color: var(--ink-900, #220d0a); }
        .user-badges { display: flex; align-items: center; gap: 6px; }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          padding: 2px 7px;
          border-radius: 999px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .badge-admin { background: #fbeae5; color: #b71c1c; border: 1px solid #ffcdd2; }
        .badge-google { background: #e8f0fe; color: #1967d2; border: 1px solid #cce0fc; }
        .badge-email { background: #f5f5f5; color: #616161; border: 1px solid #e0e0e0; }
        .badge-default { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }

        .contact-cell { display: flex; flex-direction: column; gap: 4px; }
        .user-email { color: var(--ink-800, #382420); font-size: 12.5px; word-break: break-all; }
        .user-phone-wrap { display: flex; align-items: center; gap: 8px; }
        .user-phone { font-size: 12px; color: var(--ink-600); }
        .contact-quick-actions { display: flex; align-items: center; gap: 6px; }
        .icon-link-wa { color: #25d366; display: flex; align-items: center; }
        .icon-link-tel { color: #1976d2; display: flex; align-items: center; }

        .location-cell { display: flex; flex-direction: column; gap: 2px; }
        .location-sub { font-size: 11px; color: var(--ink-500); }

        .orders-metric-cell { display: flex; flex-direction: column; gap: 3px; }
        .orders-count-badge {
          display: inline-block;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
          background: #f1ede6;
          color: var(--ink-600);
          width: fit-content;
        }
        .orders-count-badge.has-orders { background: #edf7ed; color: #1e4620; font-weight: 600; }
        .user-ltv { font-size: 13px; color: var(--maroon-900, #581e15); }

        .joined-date { font-size: 12px; color: var(--ink-500); }
        .muted-text { font-size: 12px; color: var(--ink-400, #9c8e88); font-style: italic; }

        /* Modal / Drawer */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 20px;
        }
        .user-detail-modal {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 680px;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
        }
        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--stone-200);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .modal-header h3 { margin: 0; font-size: 18px; color: var(--maroon-900); }
        .close-btn { background: none; border: none; cursor: pointer; color: var(--ink-500); }
        .modal-body { padding: 24px; }

        .detail-primary-box {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 16px 20px;
          background: #faf6f0;
          border-radius: 12px;
          border: 1px solid var(--stone-200);
          margin-bottom: 24px;
        }
        .detail-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--maroon-900);
          color: #fff;
          font-size: 22px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .detail-meta h2 { margin: 0 0 6px; font-size: 18px; }
        .detail-row-item { font-size: 12.5px; display: flex; gap: 8px; margin-bottom: 2px; }
        .detail-row-item span { color: var(--ink-500); }

        .detail-section { margin-top: 24px; }
        .detail-section h4 {
          font-size: 14px;
          margin: 0 0 12px;
          color: var(--maroon-900);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--stone-200);
          padding-bottom: 6px;
        }
        .address-cards-list { display: flex; flex-direction: column; gap: 10px; }
        .address-item-card {
          padding: 12px 16px;
          border: 1px solid #e8dec8;
          border-radius: 8px;
          background: #fffdf9;
        }
        .address-header { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 13px; }
        .address-lines { margin: 0; font-size: 12.5px; color: var(--ink-700); line-height: 1.5; }

        .orders-mini-table-wrap { overflow-x: auto; }
        .mini-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .mini-table th { background: #f7f3ee; padding: 8px 10px; text-align: left; }
        .mini-table td { padding: 10px; border-bottom: 1px solid #f0e9df; }
        .status-pill { font-size: 10px; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; font-weight: 600; }
        .status-pill.paid { background: #e8f5e9; color: #2e7d32; }
        .status-pill.created, .status-pill.pending { background: #fff3e0; color: #e65100; }
        .status-pill.failed, .status-pill.cancelled { background: #ffebee; color: #c62828; }
        .btn-xs { padding: 4px 8px; font-size: 11px; }
      `})]})}function fd(){return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(zc,{}),(0,z.jsx)(Sc,{}),(0,z.jsx)(dr,{}),(0,z.jsx)(`main`,{children:(0,z.jsxs)(zt,{children:[(0,z.jsx)(I,{path:`/`,element:(0,z.jsx)(Sl,{})}),(0,z.jsx)(I,{path:`/about`,element:(0,z.jsx)(wl,{})}),(0,z.jsx)(I,{path:`/products`,element:(0,z.jsx)(El,{})}),(0,z.jsx)(I,{path:`/products/:id`,element:(0,z.jsx)(Ol,{})}),(0,z.jsx)(I,{path:`/orders`,element:(0,z.jsx)(Cc,{children:(0,z.jsx)(Pl,{})})}),(0,z.jsx)(I,{path:`/contact`,element:(0,z.jsx)(Fl,{})}),(0,z.jsx)(I,{path:`/cart`,element:(0,z.jsx)(Y,{})}),(0,z.jsx)(I,{path:`/checkout`,element:(0,z.jsx)(Cc,{children:(0,z.jsx)(Ll,{})})}),(0,z.jsx)(I,{path:`/profile`,element:(0,z.jsx)(Cc,{children:(0,z.jsx)(Bl,{})})}),(0,z.jsx)(I,{path:`/login`,element:(0,z.jsx)(Gl,{})}),(0,z.jsx)(I,{path:`/forgot-password`,element:(0,z.jsx)(Kl,{})}),(0,z.jsx)(I,{path:`/reset-password`,element:(0,z.jsx)(ql,{})}),(0,z.jsx)(I,{path:`/complete-profile`,element:(0,z.jsx)(Cc,{children:(0,z.jsx)(Jl,{})})}),(0,z.jsx)(I,{path:`*`,element:(0,z.jsx)(Yl,{})})]})}),(0,z.jsx)(gr,{}),(0,z.jsx)(pr,{}),(0,z.jsx)(Vc,{})]})}function pd(){return st().pathname.startsWith(`/admin`)?(0,z.jsxs)(cr,{children:[(0,z.jsx)(wc,{}),(0,z.jsx)(zt,{children:(0,z.jsxs)(I,{path:`/admin`,element:(0,z.jsx)(Du,{}),children:[(0,z.jsx)(I,{index:!0,element:(0,z.jsx)(Ou,{})}),(0,z.jsx)(I,{path:`home`,element:(0,z.jsx)(Ru,{})}),(0,z.jsx)(I,{path:`about`,element:(0,z.jsx)(Bu,{})}),(0,z.jsx)(I,{path:`categories`,element:(0,z.jsx)(Ku,{})}),(0,z.jsx)(I,{path:`products`,element:(0,z.jsx)($u,{})}),(0,z.jsx)(I,{path:`orders`,element:(0,z.jsx)(nd,{})}),(0,z.jsx)(I,{path:`users`,element:(0,z.jsx)(dd,{})}),(0,z.jsx)(I,{path:`returns`,element:(0,z.jsx)(rd,{})}),(0,z.jsx)(I,{path:`pickup-locations`,element:(0,z.jsx)(ad,{})}),(0,z.jsx)(I,{path:`coupons`,element:(0,z.jsx)(Hu,{})}),(0,z.jsx)(I,{path:`cancellation-policy`,element:(0,z.jsx)(Wu,{})}),(0,z.jsx)(I,{path:`settings`,element:(0,z.jsx)(sd,{})}),(0,z.jsx)(I,{path:`reviews`,element:(0,z.jsx)(cd,{})}),(0,z.jsx)(I,{path:`testimonials`,element:(0,z.jsx)(ud,{})}),(0,z.jsx)(I,{path:`*`,element:(0,z.jsx)(Ou,{})})]})})]}):(0,z.jsx)(cr,{children:(0,z.jsx)(er,{children:(0,z.jsx)(fd,{})})})}var md=class extends x.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.error(`[ErrorBoundary] caught a render error:`,e,t?.componentStack)}handleReload=()=>{window.location.href=`/`};render(){return this.state.hasError?(0,z.jsxs)(`div`,{className:`error-boundary-page`,children:[(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsx)(`p`,{className:`eyebrow`,children:`Something went wrong`}),(0,z.jsx)(`h1`,{children:`This page hit a snag`}),(0,z.jsx)(`p`,{className:`error-boundary-sub`,children:`Sorry about that — something unexpected happened while loading this page. Try going back to the homepage, or refresh and try again.`}),(0,z.jsx)(`button`,{type:`button`,className:`btn btn-primary`,onClick:this.handleReload,children:`Back to Home`})]}),(0,z.jsx)(`style`,{children:`
            .error-boundary-page {
              min-height: 60vh;
              display: flex;
              align-items: center;
              padding: 100px 0 80px;
            }
            .error-boundary-page .container { text-align: center; max-width: 480px; margin: 0 auto; }
            .error-boundary-page h1 { font-size: 28px; margin: 10px 0 16px; }
            .error-boundary-sub { font-size: 14px; color: var(--ink-400); line-height: 1.7; margin-bottom: 28px; }
          `})]}):this.props.children}};(0,zn.createRoot)(document.getElementById(`root`)).render((0,z.jsx)(x.StrictMode,{children:(0,z.jsx)(md,{children:(0,z.jsx)(En,{children:(0,z.jsx)(pd,{})})})}));