var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function D(e,t){return E(e.type,t,e.props)}function O(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function k(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ee=/\/+/g;function A(e,t){return typeof e==`object`&&e&&e.key!=null?k(``+e.key):t.toString(36)}function j(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function M(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,M(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+A(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ee,`$&/`)+`/`),M(o,r,i,``,function(e){return e})):o!=null&&(O(o)&&(o=D(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ee,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+A(a,u),c+=M(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+A(a,u++),c+=M(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return M(j(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function te(e,t,n){if(e==null)return e;var r=[],i=0;return M(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ne(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var N=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},P={map:te,forEach:function(e,t,n){te(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return te(e,function(){t++}),t},toArray:function(e){return te(e,function(e){return e})||[]},only:function(e){if(!O(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=P,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=O,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ne}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,N)}catch(e){N(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.8`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&A(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&A(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,ee=k.port2;k.port1.onmessage=D,O=function(){ee.postMessage(null)}}else O=function(){_(D,0)};function A(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,A(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.8`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),E=Symbol.for(`react.suspense_list`),D=Symbol.for(`react.memo`),O=Symbol.for(`react.lazy`),k=Symbol.for(`react.activity`),ee=Symbol.for(`react.memo_cache_sentinel`),A=Symbol.iterator;function j(e){return typeof e!=`object`||!e?null:(e=A&&e[A]||e[`@@iterator`],typeof e==`function`?e:null)}var M=Symbol.for(`react.client.reference`);function te(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===M?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case E:return`SuspenseList`;case k:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case D:return t=e.displayName||null,t===null?te(e.type)||`Memo`:t;case O:t=e._payload,e=e._init;try{return te(e(t))}catch{}}return null}var ne=Array.isArray,N=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,re={pending:!1,data:null,method:null,action:null},ie=[],ae=-1;function oe(e){return{current:e}}function se(e){0>ae||(e.current=ie[ae],ie[ae]=null,ae--)}function ce(e,t){ae++,ie[ae]=e.current,e.current=t}var le=oe(null),ue=oe(null),de=oe(null),fe=oe(null);function pe(e,t){switch(ce(de,t),ce(ue,e),ce(le,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}se(le),ce(le,e)}function me(){se(le),se(ue),se(de)}function he(e){e.memoizedState!==null&&ce(fe,e);var t=le.current,n=Hd(t,e.type);t!==n&&(ce(ue,e),ce(le,n))}function ge(e){ue.current===e&&(se(le),se(ue)),fe.current===e&&(se(fe),Qf._currentValue=re)}var _e,ve;function ye(e){if(_e===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);_e=t&&t[1]||``,ve=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+_e+e+ve}var be=!1;function xe(e,t){if(!e||be)return``;be=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{be=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?ye(n):``}function Se(e,t){switch(e.tag){case 26:case 27:case 5:return ye(e.type);case 16:return ye(`Lazy`);case 13:return e.child!==t&&t!==null?ye(`Suspense Fallback`):ye(`Suspense`);case 19:return ye(`SuspenseList`);case 0:case 15:return xe(e.type,!1);case 11:return xe(e.type.render,!1);case 1:return xe(e.type,!0);case 31:return ye(`Activity`);default:return``}}function Ce(e){try{var t=``,n=null;do t+=Se(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var we=Object.prototype.hasOwnProperty,Te=t.unstable_scheduleCallback,Ee=t.unstable_cancelCallback,De=t.unstable_shouldYield,Oe=t.unstable_requestPaint,ke=t.unstable_now,Ae=t.unstable_getCurrentPriorityLevel,je=t.unstable_ImmediatePriority,Me=t.unstable_UserBlockingPriority,Ne=t.unstable_NormalPriority,Pe=t.unstable_LowPriority,Fe=t.unstable_IdlePriority,Ie=t.log,Le=t.unstable_setDisableYieldValue,Re=null,ze=null;function Be(e){if(typeof Ie==`function`&&Le(e),ze&&typeof ze.setStrictMode==`function`)try{ze.setStrictMode(Re,e)}catch{}}var Ve=Math.clz32?Math.clz32:We,He=Math.log,Ue=Math.LN2;function We(e){return e>>>=0,e===0?32:31-(He(e)/Ue|0)|0}var Ge=256,Ke=262144,qe=4194304;function Je(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ye(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Je(n))):i=Je(o):i=Je(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Je(n))):i=Je(o)):i=Je(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Xe(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Ze(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Qe(){var e=qe;return qe<<=1,!(qe&62914560)&&(qe=4194304),e}function $e(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function et(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function tt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ve(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&nt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function nt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ve(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function rt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ve(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function it(e,t){var n=t&-t;return n=n&42?1:at(n),(n&(e.suspendedLanes|t))===0?n:0}function at(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ot(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function st(){var e=P.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function ct(e,t){var n=P.p;try{return P.p=e,t()}finally{P.p=n}}var lt=Math.random().toString(36).slice(2),ut=`__reactFiber$`+lt,dt=`__reactProps$`+lt,ft=`__reactContainer$`+lt,pt=`__reactEvents$`+lt,mt=`__reactListeners$`+lt,ht=`__reactHandles$`+lt,gt=`__reactResources$`+lt,_t=`__reactMarker$`+lt;function vt(e){delete e[ut],delete e[dt],delete e[pt],delete e[mt],delete e[ht]}function yt(e){var t=e[ut];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ft]||n[ut]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[ut])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function bt(e){if(e=e[ut]||e[ft]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function xt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function St(e){var t=e[gt];return t||=e[gt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Ct(e){e[_t]=!0}var wt=new Set,Tt={};function Et(e,t){Dt(e,t),Dt(e+`Capture`,t)}function Dt(e,t){for(Tt[e]=t,e=0;e<t.length;e++)wt.add(t[e])}var Ot=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),kt={},At={};function jt(e){return we.call(At,e)?!0:we.call(kt,e)?!1:Ot.test(e)?At[e]=!0:(kt[e]=!0,!1)}function Mt(e,t,n){if(jt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function Nt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Pt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Ft(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function It(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Lt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Rt(e){if(!e._valueTracker){var t=It(e)?`checked`:`value`;e._valueTracker=Lt(e,t,``+e[t])}}function F(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=It(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function zt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Bt=/[\n"\\]/g;function Vt(e){return e.replace(Bt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Ht(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Ft(t)):e.value!==``+Ft(t)&&(e.value=``+Ft(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Wt(e,o,Ft(n)):Wt(e,o,Ft(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Ft(s):e.removeAttribute(`name`)}function Ut(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Rt(e);return}n=n==null?``:``+Ft(n),t=t==null?n:``+Ft(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Rt(e)}function Wt(e,t,n){t===`number`&&zt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Gt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Ft(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Kt(e,t,n){if(t!=null&&(t=``+Ft(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Ft(n)}function qt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ne(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Ft(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Rt(e)}function Jt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Yt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Xt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Yt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Zt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Xt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Xt(e,o,t[o])}function Qt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var $t=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),en=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function tn(e){return en.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function nn(){}var rn=null;function an(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var on=null,sn=null;function cn(e){var t=bt(e);if(t&&(e=t.stateNode)){var n=e[dt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Ht(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Vt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[dt]||null;if(!a)throw Error(i(90));Ht(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&F(r)}break a;case`textarea`:Kt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Gt(e,!!n.multiple,t,!1)}}}var ln=!1;function un(e,t,n){if(ln)return e(t,n);ln=!0;try{return e(t)}finally{if(ln=!1,(on!==null||sn!==null)&&(vu(),on&&(t=on,e=sn,sn=on=null,cn(t),e)))for(t=0;t<e.length;t++)cn(e[t])}}function dn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[dt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var fn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),pn=!1;if(fn)try{var mn={};Object.defineProperty(mn,"passive",{get:function(){pn=!0}}),window.addEventListener(`test`,mn,mn),window.removeEventListener(`test`,mn,mn)}catch{pn=!1}var hn=null,gn=null,_n=null;function vn(){if(_n)return _n;var e,t=gn,n=t.length,r,i=`value`in hn?hn.value:hn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return _n=i.slice(e,1<r?1-r:void 0)}function yn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function bn(){return!0}function xn(){return!1}function Sn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?bn:xn,this.isPropagationStopped=xn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=bn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=bn)},persist:function(){},isPersistent:bn}),t}var Cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},wn=Sn(Cn),Tn=h({},Cn,{view:0,detail:0}),En=Sn(Tn),Dn,I,On,kn=h({},Tn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Bn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==On&&(On&&e.type===`mousemove`?(Dn=e.screenX-On.screenX,I=e.screenY-On.screenY):I=Dn=0,On=e),Dn)},movementY:function(e){return`movementY`in e?e.movementY:I}}),An=Sn(kn),jn=Sn(h({},kn,{dataTransfer:0})),Mn=Sn(h({},Tn,{relatedTarget:0})),Nn=Sn(h({},Cn,{animationName:0,elapsedTime:0,pseudoElement:0})),Pn=Sn(h({},Cn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Fn=Sn(h({},Cn,{data:0})),In={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Ln={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Rn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function zn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Rn[e])?!!t[e]:!1}function Bn(){return zn}var Vn=Sn(h({},Tn,{key:function(e){if(e.key){var t=In[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=yn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Ln[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Bn,charCode:function(e){return e.type===`keypress`?yn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?yn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Hn=Sn(h({},kn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Un=Sn(h({},Tn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Bn})),Wn=Sn(h({},Cn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Gn=Sn(h({},kn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Kn=Sn(h({},Cn,{newState:0,oldState:0})),qn=[9,13,27,32],Jn=fn&&`CompositionEvent`in window,Yn=null;fn&&`documentMode`in document&&(Yn=document.documentMode);var Xn=fn&&`TextEvent`in window&&!Yn,Zn=fn&&(!Jn||Yn&&8<Yn&&11>=Yn),Qn=` `,$n=!1;function er(e,t){switch(e){case`keyup`:return qn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function L(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var tr=!1;function nr(e,t){switch(e){case`compositionend`:return L(t);case`keypress`:return t.which===32?($n=!0,Qn):null;case`textInput`:return e=t.data,e===Qn&&$n?null:e;default:return null}}function rr(e,t){if(tr)return e===`compositionend`||!Jn&&er(e,t)?(e=vn(),_n=gn=hn=null,tr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Zn&&t.locale!==`ko`?null:t.data;default:return null}}var ir={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ar(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!ir[e.type]:t===`textarea`}function or(e,t,n,r){on?sn?sn.push(r):sn=[r]:on=r,t=Td(t,`onChange`),0<t.length&&(n=new wn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var sr=null,R=null;function cr(e){vd(e,0)}function z(e){if(F(xt(e)))return e}function lr(e,t){if(e===`change`)return t}var ur=!1;if(fn){var dr;if(fn){var B=`oninput`in document;if(!B){var fr=document.createElement(`div`);fr.setAttribute(`oninput`,`return;`),B=typeof fr.oninput==`function`}dr=B}else dr=!1;ur=dr&&(!document.documentMode||9<document.documentMode)}function pr(){sr&&(sr.detachEvent(`onpropertychange`,mr),R=sr=null)}function mr(e){if(e.propertyName===`value`&&z(R)){var t=[];or(t,R,e,an(e)),un(cr,t)}}function hr(e,t,n){e===`focusin`?(pr(),sr=t,R=n,sr.attachEvent(`onpropertychange`,mr)):e===`focusout`&&pr()}function gr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return z(R)}function _r(e,t){if(e===`click`)return z(t)}function vr(e,t){if(e===`input`||e===`change`)return z(t)}function yr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var br=typeof Object.is==`function`?Object.is:yr;function xr(e,t){if(br(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!we.call(t,i)||!br(e[i],t[i]))return!1}return!0}function Sr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Cr(e,t){var n=Sr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Sr(n)}}function wr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?wr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Tr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=zt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=zt(e.document)}return t}function Er(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Dr=fn&&`documentMode`in document&&11>=document.documentMode,Or=null,kr=null,Ar=null,jr=!1;function Mr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;jr||Or==null||Or!==zt(r)||(r=Or,`selectionStart`in r&&Er(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ar&&xr(Ar,r)||(Ar=r,r=Td(kr,`onSelect`),0<r.length&&(t=new wn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Or)))}function Nr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Pr={animationend:Nr(`Animation`,`AnimationEnd`),animationiteration:Nr(`Animation`,`AnimationIteration`),animationstart:Nr(`Animation`,`AnimationStart`),transitionrun:Nr(`Transition`,`TransitionRun`),transitionstart:Nr(`Transition`,`TransitionStart`),transitioncancel:Nr(`Transition`,`TransitionCancel`),transitionend:Nr(`Transition`,`TransitionEnd`)},Fr={},Ir={};fn&&(Ir=document.createElement(`div`).style,`AnimationEvent`in window||(delete Pr.animationend.animation,delete Pr.animationiteration.animation,delete Pr.animationstart.animation),`TransitionEvent`in window||delete Pr.transitionend.transition);function Lr(e){if(Fr[e])return Fr[e];if(!Pr[e])return e;var t=Pr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ir)return Fr[e]=t[n];return e}var Rr=Lr(`animationend`),zr=Lr(`animationiteration`),Br=Lr(`animationstart`),Vr=Lr(`transitionrun`),Hr=Lr(`transitionstart`),Ur=Lr(`transitioncancel`),Wr=Lr(`transitionend`),Gr=new Map,Kr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Kr.push(`scrollEnd`);function qr(e,t){Gr.set(e,t),Et(t,[e])}var Jr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Yr=[],Xr=0,Zr=0;function Qr(){for(var e=Xr,t=Zr=Xr=0;t<e;){var n=Yr[t];Yr[t++]=null;var r=Yr[t];Yr[t++]=null;var i=Yr[t];Yr[t++]=null;var a=Yr[t];if(Yr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ni(n,i,a)}}function $r(e,t,n,r){Yr[Xr++]=e,Yr[Xr++]=t,Yr[Xr++]=n,Yr[Xr++]=r,Zr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ei(e,t,n,r){return $r(e,t,n,r),ri(e)}function ti(e,t){return $r(e,null,null,t),ri(e)}function ni(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ve(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ri(e){if(50<lu)throw lu=0,uu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ii={};function ai(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function oi(e,t,n,r){return new ai(e,t,n,r)}function si(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ci(e,t){var n=e.alternate;return n===null?(n=oi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function li(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ui(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)si(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,le.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case k:return e=oi(31,n,t,a),e.elementType=k,e.lanes=o,e;case y:return di(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=oi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=oi(13,n,t,a),e.elementType=T,e.lanes=o,e;case E:return e=oi(19,n,t,a),e.elementType=E,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case D:s=14;break a;case O:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=oi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function di(e,t,n,r){return e=oi(7,e,r,t),e.lanes=n,e}function fi(e,t,n){return e=oi(6,e,null,t),e.lanes=n,e}function pi(e){var t=oi(18,null,null,0);return t.stateNode=e,t}function mi(e,t,n){return t=oi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var hi=new WeakMap;function gi(e,t){if(typeof e==`object`&&e){var n=hi.get(e);return n===void 0?(t={value:e,source:t,stack:Ce(t)},hi.set(e,t),t):n}return{value:e,source:t,stack:Ce(t)}}var _i=[],vi=0,yi=null,bi=0,xi=[],Si=0,Ci=null,wi=1,Ti=``;function Ei(e,t){_i[vi++]=bi,_i[vi++]=yi,yi=e,bi=t}function Di(e,t,n){xi[Si++]=wi,xi[Si++]=Ti,xi[Si++]=Ci,Ci=e;var r=wi;e=Ti;var i=32-Ve(r)-1;r&=~(1<<i),n+=1;var a=32-Ve(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,wi=1<<32-Ve(t)+i|n<<i|r,Ti=a+e}else wi=1<<a|n<<i|r,Ti=e}function Oi(e){e.return!==null&&(Ei(e,1),Di(e,1,0))}function ki(e){for(;e===yi;)yi=_i[--vi],_i[vi]=null,bi=_i[--vi],_i[vi]=null;for(;e===Ci;)Ci=xi[--Si],xi[Si]=null,Ti=xi[--Si],xi[Si]=null,wi=xi[--Si],xi[Si]=null}function Ai(e,t){xi[Si++]=wi,xi[Si++]=Ti,xi[Si++]=Ci,wi=t.id,Ti=t.overflow,Ci=e}var ji=null,Mi=null,V=!1,Ni=null,Pi=!1,Fi=Error(i(519));function Ii(e){throw Hi(gi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Fi}function Li(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ut]=e,t[dt]=r,n){case`dialog`:$(`cancel`,t),$(`close`,t);break;case`iframe`:case`object`:case`embed`:$(`load`,t);break;case`video`:case`audio`:for(n=0;n<gd.length;n++)$(gd[n],t);break;case`source`:$(`error`,t);break;case`img`:case`image`:case`link`:$(`error`,t),$(`load`,t);break;case`details`:$(`toggle`,t);break;case`input`:$(`invalid`,t),Ut(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:$(`invalid`,t);break;case`textarea`:$(`invalid`,t),qt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||jd(t.textContent,n)?(r.popover!=null&&($(`beforetoggle`,t),$(`toggle`,t)),r.onScroll!=null&&$(`scroll`,t),r.onScrollEnd!=null&&$(`scrollend`,t),r.onClick!=null&&(t.onclick=nn),t=!0):t=!1,t||Ii(e,!0)}function Ri(e){for(ji=e.return;ji;)switch(ji.tag){case 5:case 31:case 13:Pi=!1;return;case 27:case 3:Pi=!0;return;default:ji=ji.return}}function zi(e){if(e!==ji)return!1;if(!V)return Ri(e),V=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&Mi&&Ii(e),Ri(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Mi=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Mi=uf(e)}else t===27?(t=Mi,Zd(e.type)?(e=lf,lf=null,Mi=e):Mi=t):Mi=ji?cf(e.stateNode.nextSibling):null;return!0}function Bi(){Mi=ji=null,V=!1}function Vi(){var e=Ni;return e!==null&&(Yl===null?Yl=e:Yl.push.apply(Yl,e),Ni=null),e}function Hi(e){Ni===null?Ni=[e]:Ni.push(e)}var Ui=oe(null),Wi=null,Gi=null;function Ki(e,t,n){ce(Ui,t._currentValue),t._currentValue=n}function qi(e){e._currentValue=Ui.current,se(Ui)}function Ji(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Yi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Ji(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Ji(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Xi(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;br(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===fe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Yi(t,e,n,r),t.flags|=262144}function Zi(e){for(e=e.firstContext;e!==null;){if(!br(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Qi(e){Wi=e,Gi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function $i(e){return ta(Wi,e)}function ea(e,t){return Wi===null&&Qi(e),ta(e,t)}function ta(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Gi===null){if(e===null)throw Error(i(308));Gi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Gi=Gi.next=t;return n}var na=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ra=t.unstable_scheduleCallback,ia=t.unstable_NormalPriority,aa={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function oa(){return{controller:new na,data:new Map,refCount:0}}function sa(e){e.refCount--,e.refCount===0&&ra(ia,function(){e.controller.abort()})}var ca=null,la=0,ua=0,da=null;function fa(e,t){if(ca===null){var n=ca=[];la=0,ua=ud(),da={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return la++,t.then(pa,pa),t}function pa(){if(--la===0&&ca!==null){da!==null&&(da.status=`fulfilled`);var e=ca;ca=null,ua=0,da=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ma(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ha=N.S;N.S=function(e,t){Ql=ke(),typeof t==`object`&&t&&typeof t.then==`function`&&fa(e,t),ha!==null&&ha(e,t)};var ga=oe(null);function _a(){var e=ga.current;return e===null?Il.pooledCache:e}function va(e,t){t===null?ce(ga,ga.current):ce(ga,t.pool)}function ya(){var e=_a();return e===null?null:{parent:aa._currentValue,pool:e}}var ba=Error(i(460)),xa=Error(i(474)),Sa=Error(i(542)),Ca={then:function(){}};function wa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Ta(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(nn,nn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ka(e),e;default:if(typeof t.status==`string`)t.then(nn,nn);else{if(e=Il,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ka(e),e}throw Da=t,ba}}function Ea(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Da=e,ba):e}}var Da=null;function Oa(){if(Da===null)throw Error(i(459));var e=Da;return Da=null,e}function ka(e){if(e===ba||e===Sa)throw Error(i(483))}var Aa=null,ja=0;function Ma(e){var t=ja;return ja+=1,Aa===null&&(Aa=[]),Ta(Aa,e,t)}function Na(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Pa(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Fa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=ci(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=fi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===O&&Ea(i)===t.type)?(t=a(t,n.props),Na(t,n),t.return=e,t):(t=ui(n.type,n.key,n.props,null,e.mode,r),Na(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=mi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=di(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=fi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=ui(t.type,t.key,t.props,null,e.mode,n),Na(n,t),n.return=e,n;case v:return t=mi(t,e.mode,n),t.return=e,t;case O:return t=Ea(t),f(e,t,n)}if(ne(t)||j(t))return t=di(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ma(t),n);if(t.$$typeof===C)return f(e,ea(e,t),n);Pa(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case O:return n=Ea(n),p(e,t,n,r)}if(ne(n)||j(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ma(n),r);if(n.$$typeof===C)return p(e,t,ea(e,n),r);Pa(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case O:return r=Ea(r),m(e,t,n,r,i)}if(ne(r)||j(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ma(r),i);if(r.$$typeof===C)return m(e,t,n,ea(t,r),i);Pa(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),V&&Ei(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return V&&Ei(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),V&&Ei(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),V&&Ei(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return V&&Ei(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),V&&Ei(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===O&&Ea(l)===r.type){n(e,r.sibling),c=a(r,o.props),Na(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===y?(c=di(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=ui(o.type,o.key,o.props,null,e.mode,c),Na(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=mi(o,e.mode,c),c.return=e,e=c}return s(e);case O:return o=Ea(o),b(e,r,o,c)}if(ne(o))return h(e,r,o,c);if(j(o)){if(l=j(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ma(o),c);if(o.$$typeof===C)return b(e,r,ea(e,o),c);Pa(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=fi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ja=0;var i=b(e,t,n,r);return Aa=null,i}catch(t){if(t===ba||t===Sa)throw t;var a=oi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ia=Fa(!0),La=Fa(!1),Ra=!1;function za(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ba(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Va(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function H(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Y&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ri(e),ni(e,null,n),t}return $r(e,r,t,n),ri(e)}function Ha(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,rt(e,n)}}function Ua(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Wa=!1;function Ga(){if(Wa){var e=da;if(e!==null)throw e}}function Ka(e,t,n,r){Wa=!1;var i=e.updateQueue;Ra=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Z&f)===f:(r&f)===f){f!==0&&f===ua&&(Wa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ra=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Ul|=o,e.lanes=o,e.memoizedState=d}}function qa(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ja(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)qa(n[e],t)}var Ya=oe(null),Xa=oe(0);function Za(e,t){e=Vl,ce(Xa,e),ce(Ya,t),Vl=e|t.baseLanes}function Qa(){ce(Xa,Vl),ce(Ya,Ya.current)}function U(){Vl=Xa.current,se(Ya),se(Xa)}var $a=oe(null),eo=null;function to(e){var t=e.alternate;ce(oo,oo.current&1),ce($a,e),eo===null&&(t===null||Ya.current!==null||t.memoizedState!==null)&&(eo=e)}function no(e){ce(oo,oo.current),ce($a,e),eo===null&&(eo=e)}function ro(e){e.tag===22?(ce(oo,oo.current),ce($a,e),eo===null&&(eo=e)):io(e)}function io(){ce(oo,oo.current),ce($a,$a.current)}function ao(e){se($a),eo===e&&(eo=null),se(oo)}var oo=oe(0);function so(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var co=0,W=null,G=null,lo=null,uo=!1,fo=!1,po=!1,mo=0,ho=0,go=null,_o=0;function vo(){throw Error(i(321))}function yo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!br(e[n],t[n]))return!1;return!0}function bo(e,t,n,r,i,a){return co=a,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,N.H=e===null||e.memoizedState===null?Ls:Rs,po=!1,a=n(r,i),po=!1,fo&&(a=So(t,n,r,i)),xo(e),a}function xo(e){N.H=Is;var t=G!==null&&G.next!==null;if(co=0,lo=G=W=null,uo=!1,ho=0,go=null,t)throw Error(i(300));e===null||tc||(e=e.dependencies,e!==null&&Zi(e)&&(tc=!0))}function So(e,t,n,r){W=e;var a=0;do{if(fo&&(go=null),ho=0,fo=!1,25<=a)throw Error(i(301));if(a+=1,lo=G=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}N.H=zs,o=t(n,r)}while(fo);return o}function Co(){var e=N.H,t=e.useState()[0];return t=typeof t.then==`function`?Ao(t):t,e=e.useState()[0],(G===null?null:G.memoizedState)!==e&&(W.flags|=1024),t}function wo(){var e=mo!==0;return mo=0,e}function To(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Eo(e){if(uo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}uo=!1}co=0,lo=G=W=null,fo=!1,ho=mo=0,go=null}function Do(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return lo===null?W.memoizedState=lo=e:lo=lo.next=e,lo}function Oo(){if(G===null){var e=W.alternate;e=e===null?null:e.memoizedState}else e=G.next;var t=lo===null?W.memoizedState:lo.next;if(t!==null)lo=t,G=e;else{if(e===null)throw W.alternate===null?Error(i(467)):Error(i(310));G=e,e={memoizedState:G.memoizedState,baseState:G.baseState,baseQueue:G.baseQueue,queue:G.queue,next:null},lo===null?W.memoizedState=lo=e:lo=lo.next=e}return lo}function ko(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ao(e){var t=ho;return ho+=1,go===null&&(go=[]),e=Ta(go,e,t),t=W,(lo===null?t.memoizedState:lo.next)===null&&(t=t.alternate,N.H=t===null||t.memoizedState===null?Ls:Rs),e}function jo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Ao(e);if(e.$$typeof===C)return $i(e)}throw Error(i(438,String(e)))}function Mo(e){var t=null,n=W.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=W.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=ko(),W.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ee;return t.index++,n}function No(e,t){return typeof t==`function`?t(e):t}function Po(e){return Fo(Oo(),G,e)}function Fo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(co&f)===f:(Z&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ua&&(d=!0);else if((co&p)===p){u=u.next,p===ua&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,W.lanes|=p,Ul|=p;f=u.action,po&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,W.lanes|=f,Ul|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!br(o,e.memoizedState)&&(tc=!0,d&&(n=da,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Io(e){var t=Oo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);br(o,t.memoizedState)||(tc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Lo(e,t,n){var r=W,a=Oo(),o=V;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!br((G||a).memoizedState,n);if(s&&(a.memoizedState=n,tc=!0),a=a.queue,cs(Bo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||lo!==null&&lo.memoizedState.tag&1){if(r.flags|=2048,rs(9,{destroy:void 0},zo.bind(null,r,a,n,t),null),Il===null)throw Error(i(349));o||co&127||Ro(r,t,n)}return n}function Ro(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=W.updateQueue,t===null?(t=ko(),W.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function zo(e,t,n,r){t.value=n,t.getSnapshot=r,Vo(t)&&Ho(e)}function Bo(e,t,n){return n(function(){Vo(t)&&Ho(e)})}function Vo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!br(e,n)}catch{return!0}}function Ho(e){var t=ti(e,2);t!==null&&pu(t,e,2)}function Uo(e){var t=Do();if(typeof e==`function`){var n=e;if(e=n(),po){Be(!0);try{n()}finally{Be(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:e},t}function Wo(e,t,n,r){return e.baseState=n,Fo(e,G,typeof r==`function`?r:No)}function Go(e,t,n,r,a){if(Ns(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};N.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ko(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ko(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=N.T,o={};N.T=o;try{var s=n(i,r),c=N.S;c!==null&&c(o,s),qo(e,t,s)}catch(n){Yo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),N.T=a}}else try{a=n(i,r),qo(e,t,a)}catch(n){Yo(e,t,n)}}function qo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Jo(e,t,n)},function(n){return Yo(e,t,n)}):Jo(e,t,n)}function Jo(e,t,n){t.status=`fulfilled`,t.value=n,Xo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ko(e,n)))}function Yo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Xo(t),t=t.next;while(t!==r)}e.action=null}function Xo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Zo(e,t){return t}function Qo(e,t){if(V){var n=Il.formState;if(n!==null){a:{var r=W;if(V){if(Mi){b:{for(var i=Mi,a=Pi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Mi=cf(i.nextSibling),r=i.data===`F!`;break a}}Ii(r)}r=!1}r&&(t=n[0])}}return n=Do(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zo,lastRenderedState:t},n.queue=r,n=As.bind(null,W,r),r.dispatch=n,r=Uo(!1),a=Ms.bind(null,W,!1,r.queue),r=Do(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Go.bind(null,W,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function $o(e){return es(Oo(),G,e)}function es(e,t,n){if(t=Fo(e,t,Zo)[0],e=Po(No)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Ao(t)}catch(e){throw e===ba?Sa:e}else r=t;t=Oo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(W.flags|=2048,rs(9,{destroy:void 0},ts.bind(null,i,n),null)),[r,a,e]}function ts(e,t){e.action=t}function ns(e){var t=Oo(),n=G;if(n!==null)return es(t,n,e);Oo(),t=t.memoizedState,n=Oo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function rs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=W.updateQueue,t===null&&(t=ko(),W.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function is(){return Oo().memoizedState}function as(e,t,n,r){var i=Do();W.flags|=e,i.memoizedState=rs(1|t,{destroy:void 0},n,r===void 0?null:r)}function os(e,t,n,r){var i=Oo();r=r===void 0?null:r;var a=i.memoizedState.inst;G!==null&&r!==null&&yo(r,G.memoizedState.deps)?i.memoizedState=rs(t,a,n,r):(W.flags|=e,i.memoizedState=rs(1|t,a,n,r))}function ss(e,t){as(8390656,8,e,t)}function cs(e,t){os(2048,8,e,t)}function ls(e){W.flags|=4;var t=W.updateQueue;if(t===null)t=ko(),W.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function us(e){var t=Oo().memoizedState;return ls({ref:t,nextImpl:e}),function(){if(Y&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ds(e,t){return os(4,2,e,t)}function fs(e,t){return os(4,4,e,t)}function ps(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ms(e,t,n){n=n==null?null:n.concat([e]),os(4,4,ps.bind(null,t,e),n)}function hs(){}function gs(e,t){var n=Oo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&yo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function _s(e,t){var n=Oo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&yo(t,r[1]))return r[0];if(r=e(),po){Be(!0);try{e()}finally{Be(!1)}}return n.memoizedState=[r,t],r}function vs(e,t,n){return n===void 0||co&1073741824&&!(Z&261930)?e.memoizedState=t:(e.memoizedState=n,e=fu(),W.lanes|=e,Ul|=e,n)}function ys(e,t,n,r){return br(n,t)?n:Ya.current===null?!(co&42)||co&1073741824&&!(Z&261930)?(tc=!0,e.memoizedState=n):(e=fu(),W.lanes|=e,Ul|=e,t):(e=vs(e,n,r),br(e,t)||(tc=!0),e)}function bs(e,t,n,r,i){var a=P.p;P.p=a!==0&&8>a?a:8;var o=N.T,s={};N.T=s,Ms(e,!1,t,n);try{var c=i(),l=N.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?js(e,t,ma(c,r),du(e)):js(e,t,r,du(e))}catch(n){js(e,t,{then:function(){},status:`rejected`,reason:n},du())}finally{P.p=a,o!==null&&s.types!==null&&(o.types=s.types),N.T=o}}function xs(){}function Ss(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Cs(e).queue;bs(e,a,t,re,n===null?xs:function(){return ws(e),n(r)})}function Cs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:re,baseState:re,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:re},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ws(e){var t=Cs(e);t.next===null&&(t=e.alternate.memoizedState),js(e,t.next.queue,{},du())}function Ts(){return $i(Qf)}function Es(){return Oo().memoizedState}function Ds(){return Oo().memoizedState}function Os(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=du();e=Va(n);var r=H(t,e,n);r!==null&&(pu(r,t,n),Ha(r,t,n)),t={cache:oa()},e.payload=t;return}t=t.return}}function ks(e,t,n){var r=du();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ns(e)?Ps(t,n):(n=ei(e,t,n,r),n!==null&&(pu(n,e,r),Fs(n,t,r)))}function As(e,t,n){js(e,t,n,du())}function js(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ns(e))Ps(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,br(s,o))return $r(e,t,i,0),Il===null&&Qr(),!1}catch{}if(n=ei(e,t,i,r),n!==null)return pu(n,e,r),Fs(n,t,r),!0}return!1}function Ms(e,t,n,r){if(r={lane:2,revertLane:ud(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ns(e)){if(t)throw Error(i(479))}else t=ei(e,n,r,2),t!==null&&pu(t,e,2)}function Ns(e){var t=e.alternate;return e===W||t!==null&&t===W}function Ps(e,t){fo=uo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Fs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,rt(e,n)}}var Is={readContext:$i,use:jo,useCallback:vo,useContext:vo,useEffect:vo,useImperativeHandle:vo,useLayoutEffect:vo,useInsertionEffect:vo,useMemo:vo,useReducer:vo,useRef:vo,useState:vo,useDebugValue:vo,useDeferredValue:vo,useTransition:vo,useSyncExternalStore:vo,useId:vo,useHostTransitionStatus:vo,useFormState:vo,useActionState:vo,useOptimistic:vo,useMemoCache:vo,useCacheRefresh:vo};Is.useEffectEvent=vo;var Ls={readContext:$i,use:jo,useCallback:function(e,t){return Do().memoizedState=[e,t===void 0?null:t],e},useContext:$i,useEffect:ss,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),as(4194308,4,ps.bind(null,t,e),n)},useLayoutEffect:function(e,t){return as(4194308,4,e,t)},useInsertionEffect:function(e,t){as(4,2,e,t)},useMemo:function(e,t){var n=Do();t=t===void 0?null:t;var r=e();if(po){Be(!0);try{e()}finally{Be(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Do();if(n!==void 0){var i=n(t);if(po){Be(!0);try{n(t)}finally{Be(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ks.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var t=Do();return e={current:e},t.memoizedState=e},useState:function(e){e=Uo(e);var t=e.queue,n=As.bind(null,W,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:hs,useDeferredValue:function(e,t){return vs(Do(),e,t)},useTransition:function(){var e=Uo(!1);return e=bs.bind(null,W,e.queue,!0,!1),Do().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=W,a=Do();if(V){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Il===null)throw Error(i(349));Z&127||Ro(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ss(Bo.bind(null,r,o,e),[e]),r.flags|=2048,rs(9,{destroy:void 0},zo.bind(null,r,o,n,t),null),n},useId:function(){var e=Do(),t=Il.identifierPrefix;if(V){var n=Ti,r=wi;n=(r&~(1<<32-Ve(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=mo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=_o++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ts,useFormState:Qo,useActionState:Qo,useOptimistic:function(e){var t=Do();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ms.bind(null,W,!0,n),n.dispatch=t,[e,t]},useMemoCache:Mo,useCacheRefresh:function(){return Do().memoizedState=Os.bind(null,W)},useEffectEvent:function(e){var t=Do(),n={impl:e};return t.memoizedState=n,function(){if(Y&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Rs={readContext:$i,use:jo,useCallback:gs,useContext:$i,useEffect:cs,useImperativeHandle:ms,useInsertionEffect:ds,useLayoutEffect:fs,useMemo:_s,useReducer:Po,useRef:is,useState:function(){return Po(No)},useDebugValue:hs,useDeferredValue:function(e,t){return ys(Oo(),G.memoizedState,e,t)},useTransition:function(){var e=Po(No)[0],t=Oo().memoizedState;return[typeof e==`boolean`?e:Ao(e),t]},useSyncExternalStore:Lo,useId:Es,useHostTransitionStatus:Ts,useFormState:$o,useActionState:$o,useOptimistic:function(e,t){return Wo(Oo(),G,e,t)},useMemoCache:Mo,useCacheRefresh:Ds};Rs.useEffectEvent=us;var zs={readContext:$i,use:jo,useCallback:gs,useContext:$i,useEffect:cs,useImperativeHandle:ms,useInsertionEffect:ds,useLayoutEffect:fs,useMemo:_s,useReducer:Io,useRef:is,useState:function(){return Io(No)},useDebugValue:hs,useDeferredValue:function(e,t){var n=Oo();return G===null?vs(n,e,t):ys(n,G.memoizedState,e,t)},useTransition:function(){var e=Io(No)[0],t=Oo().memoizedState;return[typeof e==`boolean`?e:Ao(e),t]},useSyncExternalStore:Lo,useId:Es,useHostTransitionStatus:Ts,useFormState:ns,useActionState:ns,useOptimistic:function(e,t){var n=Oo();return G===null?(n.baseState=e,[e,n.queue.dispatch]):Wo(n,G,e,t)},useMemoCache:Mo,useCacheRefresh:Ds};zs.useEffectEvent=us;function Bs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Vs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=du(),i=Va(r);i.payload=t,n!=null&&(i.callback=n),t=H(e,i,r),t!==null&&(pu(t,e,r),Ha(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=du(),i=Va(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=H(e,i,r),t!==null&&(pu(t,e,r),Ha(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=du(),r=Va(n);r.tag=2,t!=null&&(r.callback=t),t=H(e,r,n),t!==null&&(pu(t,e,n),Ha(t,e,n))}};function Hs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!xr(n,r)||!xr(i,a):!0}function Us(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Vs.enqueueReplaceState(t,t.state,null)}function Ws(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Gs(e){Jr(e)}function Ks(e){console.error(e)}function qs(e){Jr(e)}function Js(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ys(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Xs(e,t,n){return n=Va(n),n.tag=3,n.payload={element:null},n.callback=function(){Js(e,t)},n}function Zs(e){return e=Va(e),e.tag=3,e}function Qs(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ys(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ys(t,n,r),typeof i!=`function`&&(tu===null?tu=new Set([this]):tu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function $s(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Xi(t,n,a,!0),n=$a.current,n!==null){switch(n.tag){case 31:case 13:return eo===null?Tu():n.alternate===null&&Hl===0&&(Hl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ca?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Wu(e,r,a)),!1;case 22:return n.flags|=65536,r===Ca?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Wu(e,r,a)),!1}throw Error(i(435,n.tag))}return Wu(e,r,a),Tu(),!1}if(V)return t=$a.current,t===null?(r!==Fi&&(t=Error(i(423),{cause:r}),Hi(gi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=gi(r,n),a=Xs(e.stateNode,r,a),Ua(e,a),Hl!==4&&(Hl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Fi&&(e=Error(i(422),{cause:r}),Hi(gi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=gi(o,n),Jl===null?Jl=[o]:Jl.push(o),Hl!==4&&(Hl=2),t===null)return!0;r=gi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Xs(n.stateNode,r,e),Ua(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(tu===null||!tu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Zs(a),Qs(a,e,n,r),Ua(n,a),!1}n=n.return}while(n!==null);return!1}var ec=Error(i(461)),tc=!1;function nc(e,t,n,r){t.child=e===null?La(t,null,n,r):Ia(t,e.child,n,r)}function rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Qi(t),r=bo(e,t,n,o,a,i),s=wo(),e!==null&&!tc?(To(e,t,i),Dc(e,t,i)):(V&&s&&Oi(t),t.flags|=1,nc(e,t,r,i),t.child)}function ic(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!si(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,ac(e,t,a,r,i)):(e=ui(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Oc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?xr:n,n(o,r)&&e.ref===t.ref)return Dc(e,t,i)}return t.flags|=1,e=ci(a,r),e.ref=t.ref,e.return=t,t.child=e}function ac(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(xr(a,r)&&e.ref===t.ref){if(tc=!1,t.pendingProps=r=a,Oc(e,i))e.flags&131072&&(tc=!0);else return t.lanes=e.lanes,Dc(e,t,i)}}return pc(e,t,n,r,i)}function oc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return cc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&va(t,a===null?null:a.cachePool),a===null?Qa():Za(t,a),ro(t);else return r=t.lanes=536870912,cc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&va(t,null),Qa(),io(t)):(va(t,a.cachePool),Za(t,a),io(t),t.memoizedState=null);return nc(e,t,i,n),t.child}function sc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function cc(e,t,n,r,i){var a=_a();return a=a===null?null:{parent:aa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&va(t,null),Qa(),ro(t),e!==null&&Xi(e,t,r,!0),t.childLanes=i,null}function lc(e,t){return t=Sc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function uc(e,t,n){return Ia(t,e.child,null,n),e=lc(t,t.pendingProps),e.flags|=2,ao(t),t.memoizedState=null,e}function dc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(V){if(r.mode===`hidden`)return e=lc(t,r),t.lanes=536870912,sc(null,e);if(no(t),(e=Mi)?(e=rf(e,Pi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ci===null?null:{id:wi,overflow:Ti},retryLane:536870912,hydrationErrors:null},n=pi(e),n.return=t,t.child=n,ji=t,Mi=null)):e=null,e===null)throw Ii(t);return t.lanes=536870912,null}return lc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(no(t),a){if(t.flags&256)t.flags&=-257,t=uc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(tc||Xi(e,t,n,!1),a=(n&e.childLanes)!==0,tc||a){if(r=Il,r!==null&&(s=it(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ti(e,s),pu(r,e,s),ec;Tu(),t=uc(e,t,n)}else e=o.treeContext,Mi=cf(s.nextSibling),ji=t,V=!0,Ni=null,Pi=!1,e!==null&&Ai(t,e),t=lc(t,r),t.flags|=4096;return t}return e=ci(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function fc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function pc(e,t,n,r,i){return Qi(t),n=bo(e,t,n,r,void 0,i),r=wo(),e!==null&&!tc?(To(e,t,i),Dc(e,t,i)):(V&&r&&Oi(t),t.flags|=1,nc(e,t,n,i),t.child)}function mc(e,t,n,r,i,a){return Qi(t),t.updateQueue=null,n=So(t,r,n,i),xo(e),r=wo(),e!==null&&!tc?(To(e,t,a),Dc(e,t,a)):(V&&r&&Oi(t),t.flags|=1,nc(e,t,n,a),t.child)}function hc(e,t,n,r,i){if(Qi(t),t.stateNode===null){var a=ii,o=n.contextType;typeof o==`object`&&o&&(a=$i(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Vs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},za(t),o=n.contextType,a.context=typeof o==`object`&&o?$i(o):ii,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Bs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Vs.enqueueReplaceState(a,a.state,null),Ka(t,r,a,i),Ga(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ws(n,s);a.props=c;var l=a.context,u=n.contextType;o=ii,typeof u==`object`&&u&&(o=$i(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Us(t,a,r,o),Ra=!1;var f=t.memoizedState;a.state=f,Ka(t,r,a,i),Ga(),l=t.memoizedState,s||f!==l||Ra?(typeof d==`function`&&(Bs(t,n,d,r),l=t.memoizedState),(c=Ra||Hs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ba(e,t),o=t.memoizedProps,u=Ws(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ii,typeof l==`object`&&l&&(c=$i(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Us(t,a,r,c),Ra=!1,f=t.memoizedState,a.state=f,Ka(t,r,a,i),Ga();var p=t.memoizedState;o!==d||f!==p||Ra||e!==null&&e.dependencies!==null&&Zi(e.dependencies)?(typeof s==`function`&&(Bs(t,n,s,r),p=t.memoizedState),(u=Ra||Hs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Zi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,fc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ia(t,e.child,null,i),t.child=Ia(t,null,n,i)):nc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Dc(e,t,i),e}function gc(e,t,n,r){return Bi(),t.flags|=256,nc(e,t,n,r),t.child}var _c={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vc(e){return{baseLanes:e,cachePool:ya()}}function yc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Kl),e}function bc(e,t,n){var r=t.pendingProps,a=!1,o=!!(t.flags&128),s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:!!(oo.current&2)),s&&(a=!0,t.flags&=-129),s=!!(t.flags&32),t.flags&=-33,e===null){if(V){if(a?to(t):io(t),(e=Mi)?(e=rf(e,Pi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ci===null?null:{id:wi,overflow:Ti},retryLane:536870912,hydrationErrors:null},n=pi(e),n.return=t,t.child=n,ji=t,Mi=null)):e=null,e===null)throw Ii(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(io(t),a=t.mode,c=Sc({mode:`hidden`,children:c},a),r=di(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=vc(n),r.childLanes=yc(e,s,n),t.memoizedState=_c,sc(null,r)):(to(t),xc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(to(t),t.flags&=-257,t=Cc(e,t,n)):t.memoizedState===null?(io(t),c=r.fallback,a=t.mode,r=Sc({mode:`visible`,children:r.children},a),c=di(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ia(t,e.child,null,n),r=t.child,r.memoizedState=vc(n),r.childLanes=yc(e,s,n),t.memoizedState=_c,t=sc(null,r)):(io(t),t.child=e.child,t.flags|=128,t=null);else if(to(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Hi({value:r,source:null,stack:null}),t=Cc(e,t,n)}else if(tc||Xi(e,t,n,!1),s=(n&e.childLanes)!==0,tc||s){if(s=Il,s!==null&&(r=it(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ti(e,r),pu(s,e,r),ec;af(c)||Tu(),t=Cc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Mi=cf(c.nextSibling),ji=t,V=!0,Ni=null,Pi=!1,e!==null&&Ai(t,e),t=xc(t,r.children),t.flags|=4096);return t}return a?(io(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=ci(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=di(c,a,n,null),c.flags|=2):c=ci(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,sc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=vc(n):(a=c.cachePool,a===null?a=ya():(l=aa._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=yc(e,s,n),t.memoizedState=_c,sc(e.child,r)):(to(t),n=e.child,e=n.sibling,n=ci(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function xc(e,t){return t=Sc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Sc(e,t){return e=oi(22,e,null,t),e.lanes=0,e}function Cc(e,t,n){return Ia(t,e.child,null,n),e=xc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ji(e.return,t,n)}function Tc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Ec(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=oo.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,ce(oo,o),nc(e,t,r,n),r=V?bi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&wc(e,n,t);else if(e.tag===19)wc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&so(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Tc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&so(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Tc(t,!0,n,null,a,r);break;case`together`:Tc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Dc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ul|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Xi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=ci(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ci(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Oc(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&Zi(e)))}function kc(e,t,n){switch(t.tag){case 3:pe(t,t.stateNode.containerInfo),Ki(t,aa,e.memoizedState.cache),Bi();break;case 27:case 5:he(t);break;case 4:pe(t,t.stateNode.containerInfo);break;case 10:Ki(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,no(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(to(t),e=Dc(e,t,n),e===null?null:e.sibling):bc(e,t,n):(to(t),t.flags|=128,null);to(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=(Xi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Ec(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ce(oo,oo.current),r)break;return null;case 22:return t.lanes=0,oc(e,t,n,t.pendingProps);case 24:Ki(t,aa,e.memoizedState.cache)}return Dc(e,t,n)}function Ac(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)tc=!0;else{if(!Oc(e,n)&&!(t.flags&128))return tc=!1,kc(e,t,n);tc=!!(e.flags&131072)}}else tc=!1,V&&t.flags&1048576&&Di(t,bi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Ea(t.elementType),t.type=e,typeof e==`function`)si(e)?(r=Ws(e,r),t.tag=1,t=hc(null,t,e,r,n)):(t.tag=0,t=pc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=rc(null,t,e,r,n);break a}if(a===D){t.tag=14,t=ic(null,t,e,r,n);break a}}throw t=te(e)||e,Error(i(306,t,``))}}return t;case 0:return pc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ws(r,t.pendingProps),hc(e,t,r,a,n);case 3:a:{if(pe(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ba(e,t),Ka(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Ki(t,aa,r),r!==o.cache&&Yi(t,[aa],n,!0),Ga(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=gc(e,t,r,n);break a}if(r!==a){a=gi(Error(i(424)),t),Hi(a),t=gc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Mi=cf(e.firstChild),ji=t,V=!0,Ni=null,Pi=!0,n=La(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Bi(),r===a){t=Dc(e,t,n);break a}nc(e,t,r,n)}t=t.child}return t;case 26:return fc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:V||(n=t.type,e=t.pendingProps,r=Bd(de.current).createElement(n),r[ut]=t,r[dt]=e,Pd(r,n,e),Ct(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return he(t),e===null&&V&&(r=t.stateNode=ff(t.type,t.pendingProps,de.current),ji=t,Pi=!0,a=Mi,Zd(t.type)?(lf=a,Mi=cf(r.firstChild)):Mi=a),nc(e,t,t.pendingProps.children,n),fc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&V&&((a=r=Mi)&&(r=tf(r,t.type,t.pendingProps,Pi),r===null?a=!1:(t.stateNode=r,ji=t,Mi=cf(r.firstChild),Pi=!1,a=!0)),a||Ii(t)),he(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=bo(e,t,Co,null,null,n),Qf._currentValue=a),fc(e,t),nc(e,t,r,n),t.child;case 6:return e===null&&V&&((e=n=Mi)&&(n=nf(n,t.pendingProps,Pi),n===null?e=!1:(t.stateNode=n,ji=t,Mi=null,e=!0)),e||Ii(t)),null;case 13:return bc(e,t,n);case 4:return pe(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ia(t,null,r,n):nc(e,t,r,n),t.child;case 11:return rc(e,t,t.type,t.pendingProps,n);case 7:return nc(e,t,t.pendingProps,n),t.child;case 8:return nc(e,t,t.pendingProps.children,n),t.child;case 12:return nc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Ki(t,t.type,r.value),nc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Qi(t),a=$i(a),r=r(a),t.flags|=1,nc(e,t,r,n),t.child;case 14:return ic(e,t,t.type,t.pendingProps,n);case 15:return ac(e,t,t.type,t.pendingProps,n);case 19:return Ec(e,t,n);case 31:return dc(e,t,n);case 22:return oc(e,t,n,t.pendingProps);case 24:return Qi(t),r=$i(aa),e===null?(a=_a(),a===null&&(a=Il,o=oa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},za(t),Ki(t,aa,a)):((e.lanes&n)!==0&&(Ba(e,t),Ka(t,null,null,n),Ga()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Ki(t,aa,r),r!==a.cache&&Yi(t,[aa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ki(t,aa,r))),nc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function jc(e){e.flags|=4}function Mc(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Su())e.flags|=8192;else throw Da=Ca,xa}}else e.flags&=-16777217}function Nc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(Su())e.flags|=8192;else throw Da=Ca,xa}}function Pc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Qe(),e.lanes|=t,ql|=t)}function Fc(e,t){if(!V)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function K(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ic(e,t,n){var r=t.pendingProps;switch(ki(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return K(t),null;case 1:return K(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),qi(aa),me(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(zi(t)?jc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Vi())),K(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(jc(t),o===null?(K(t),Mc(t,a,null,r,n)):(K(t),Nc(t,o))):o?o===e.memoizedState?(K(t),t.flags&=-16777217):(jc(t),K(t),Nc(t,o)):(e=e.memoizedProps,e!==r&&jc(t),K(t),Mc(t,a,e,r,n)),null;case 27:if(ge(t),n=de.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return K(t),null}e=le.current,zi(t)?Li(t,e):(e=ff(a,r,n),t.stateNode=e,jc(t))}return K(t),null;case 5:if(ge(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return K(t),null}if(o=le.current,zi(t))Li(t,o);else{var s=Bd(de.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[ut]=t,o[dt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&jc(t)}}return K(t),Mc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=de.current,zi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ji,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[ut]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||jd(e.nodeValue,n)),e||Ii(t,!0)}else e=Bd(e).createTextNode(r),e[ut]=t,t.stateNode=e}return K(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=zi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[ut]=t}else Bi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;K(t),e=!1}else n=Vi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(ao(t),t):(ao(t),null);if(t.flags&128)throw Error(i(558))}return K(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=zi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[ut]=t}else Bi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;K(t),a=!1}else a=Vi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(ao(t),t):(ao(t),null)}return ao(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Pc(t,t.updateQueue),K(t),null);case 4:return me(),e===null&&xd(t.stateNode.containerInfo),K(t),null;case 10:return qi(t.type),K(t),null;case 19:if(se(oo),r=t.memoizedState,r===null)return K(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)Fc(r,!1);else{if(Hl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=so(e),o!==null){for(t.flags|=128,Fc(r,!1),e=o.updateQueue,t.updateQueue=e,Pc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)li(n,e),n=n.sibling;return ce(oo,oo.current&1|2),V&&Ei(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&ke()>$l&&(t.flags|=128,a=!0,Fc(r,!1),t.lanes=4194304)}}else{if(!a){if(e=so(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Pc(t,e),Fc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!V)return K(t),null}else 2*ke()-r.renderingStartTime>$l&&n!==536870912&&(t.flags|=128,a=!0,Fc(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(K(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=ke(),e.sibling=null,n=oo.current,ce(oo,a?n&1|2:n&1),V&&Ei(t,r.treeForkCount),e);case 22:case 23:return ao(t),U(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(K(t),t.subtreeFlags&6&&(t.flags|=8192)):K(t),n=t.updateQueue,n!==null&&Pc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&se(ga),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),qi(aa),K(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Lc(e,t){switch(ki(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return qi(aa),me(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ge(t),null;case 31:if(t.memoizedState!==null){if(ao(t),t.alternate===null)throw Error(i(340));Bi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ao(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Bi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return se(oo),null;case 4:return me(),null;case 10:return qi(t.type),null;case 22:case 23:return ao(t),U(),e!==null&&se(ga),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return qi(aa),null;case 25:return null;default:return null}}function Rc(e,t){switch(ki(t),t.tag){case 3:qi(aa),me();break;case 26:case 27:case 5:ge(t);break;case 4:me();break;case 31:t.memoizedState!==null&&ao(t);break;case 13:ao(t);break;case 19:se(oo);break;case 10:qi(t.type);break;case 22:case 23:ao(t),U(),e!==null&&se(ga);break;case 24:qi(aa)}}function zc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Uu(t,t.return,e)}}function Bc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Uu(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Uu(t,t.return,e)}}function Vc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ja(t,n)}catch(t){Uu(e,e.return,t)}}}function Hc(e,t,n){n.props=Ws(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Uu(e,t,n)}}function Uc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Uu(e,t,n)}}function Wc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Uu(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Uu(e,t,n)}else n.current=null}}function Gc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Uu(e,e.return,t)}}function Kc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[dt]=t}catch(t){Uu(e,e.return,t)}}function qc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Jc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||qc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Yc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=nn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Yc(e,t,n),e=e.sibling;e!==null;)Yc(e,t,n),e=e.sibling}function Xc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Xc(e,t,n),e=e.sibling;e!==null;)Xc(e,t,n),e=e.sibling}function Zc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[ut]=e,t[dt]=n}catch(t){Uu(e,e.return,t)}}var Qc=!1,$c=!1,el=!1,tl=typeof WeakSet==`function`?WeakSet:Set,nl=null;function rl(e,t){if(e=e.containerInfo,Rd=sp,e=Tr(e),Er(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,nl=t;nl!==null;)if(t=nl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,nl=e;else for(;nl!==null;){switch(t=nl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Ws(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Uu(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,nl=e;break}nl=t.return}}function il(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:_l(e,n),r&4&&zc(5,n);break;case 1:if(_l(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Uu(n,n.return,e)}else{var i=Ws(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Uu(n,n.return,e)}}}r&64&&Vc(n),r&512&&Uc(n,n.return);break;case 3:if(_l(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ja(e,t)}catch(e){Uu(n,n.return,e)}}break;case 27:t===null&&r&4&&Zc(n);case 26:case 5:_l(e,n),t===null&&r&4&&Gc(n),r&512&&Uc(n,n.return);break;case 12:_l(e,n);break;case 31:_l(e,n),r&4&&ll(e,n);break;case 13:_l(e,n),r&4&&ul(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=qu.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||Qc,!r){t=t!==null&&t.memoizedState!==null||$c,i=Qc;var a=$c;Qc=r,($c=t)&&!a?yl(e,n,!!(n.subtreeFlags&8772)):_l(e,n),Qc=i,$c=a}break;case 30:break;default:_l(e,n)}}function al(e){var t=e.alternate;t!==null&&(e.alternate=null,al(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&vt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var q=null,ol=!1;function sl(e,t,n){for(n=n.child;n!==null;)cl(e,t,n),n=n.sibling}function cl(e,t,n){if(ze&&typeof ze.onCommitFiberUnmount==`function`)try{ze.onCommitFiberUnmount(Re,n)}catch{}switch(n.tag){case 26:$c||Wc(n,t),sl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:$c||Wc(n,t);var r=q,i=ol;Zd(n.type)&&(q=n.stateNode,ol=!1),sl(e,t,n),pf(n.stateNode),q=r,ol=i;break;case 5:$c||Wc(n,t);case 6:if(r=q,i=ol,q=null,sl(e,t,n),q=r,ol=i,q!==null){if(ol)try{(q.nodeType===9?q.body:q.nodeName===`HTML`?q.ownerDocument.body:q).removeChild(n.stateNode)}catch(e){Uu(n,t,e)}else try{q.removeChild(n.stateNode)}catch(e){Uu(n,t,e)}}break;case 18:q!==null&&(ol?(e=q,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(q,n.stateNode));break;case 4:r=q,i=ol,q=n.stateNode.containerInfo,ol=!0,sl(e,t,n),q=r,ol=i;break;case 0:case 11:case 14:case 15:Bc(2,n,t),$c||Bc(4,n,t),sl(e,t,n);break;case 1:$c||(Wc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Hc(n,t,r)),sl(e,t,n);break;case 21:sl(e,t,n);break;case 22:$c=(r=$c)||n.memoizedState!==null,sl(e,t,n),$c=r;break;default:sl(e,t,n)}}function ll(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Uu(t,t.return,e)}}}function ul(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Uu(t,t.return,e)}}function dl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new tl),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new tl),t;default:throw Error(i(435,e.tag))}}function fl(e,t){var n=dl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Ju.bind(null,e,t);t.then(r,r)}})}function J(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){q=c.stateNode,ol=!1;break a}break;case 5:q=c.stateNode,ol=!1;break a;case 3:case 4:q=c.stateNode.containerInfo,ol=!0;break a}c=c.return}if(q===null)throw Error(i(160));cl(o,s,a),q=null,ol=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ml(t,e),t=t.sibling}var pl=null;function ml(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:J(t,e),hl(e),r&4&&(Bc(3,e,e.return),zc(3,e),Bc(5,e,e.return));break;case 1:J(t,e),hl(e),r&512&&($c||n===null||Wc(n,n.return)),r&64&&Qc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=pl;if(J(t,e),hl(e),r&512&&($c||n===null||Wc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[_t]||o[ut]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[ut]=e,Ct(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[ut]=e,Ct(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode)}else e.stateNode=If(a,r,e.memoizedProps)}else o===r?r===null&&e.stateNode!==null&&Kc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:J(t,e),hl(e),r&512&&($c||n===null||Wc(n,n.return)),n!==null&&r&4&&Kc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(J(t,e),hl(e),r&512&&($c||n===null||Wc(n,n.return)),e.flags&32){a=e.stateNode;try{Jt(a,``)}catch(t){Uu(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Kc(e,a,n===null?a:n.memoizedProps)),r&1024&&(el=!0);break;case 6:if(J(t,e),hl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Uu(e,e.return,t)}}break;case 3:if(Bf=null,a=pl,pl=gf(t.containerInfo),J(t,e),pl=a,hl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Uu(e,e.return,t)}el&&(el=!1,gl(e));break;case 4:r=pl,pl=gf(e.stateNode.containerInfo),J(t,e),hl(e),pl=r;break;case 12:J(t,e),hl(e);break;case 31:J(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,fl(e,r)));break;case 13:J(t,e),hl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Zl=ke()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,fl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Qc,d=$c;if(Qc=u||a,$c=d||l,J(t,e),$c=d,Qc=u,hl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Qc||$c||vl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Uu(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Uu(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Uu(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,fl(e,n))));break;case 19:J(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,fl(e,r)));break;case 30:break;case 21:break;default:J(t,e),hl(e)}}function hl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(qc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Xc(e,Jc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Jt(o,``),n.flags&=-33),Xc(e,Jc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Yc(e,Jc(e),s);break;default:throw Error(i(161))}}catch(t){Uu(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;gl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function _l(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)il(e,t.alternate,t),t=t.sibling}function vl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Bc(4,t,t.return),vl(t);break;case 1:Wc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Hc(t,t.return,n),vl(t);break;case 27:pf(t.stateNode);case 26:case 5:Wc(t,t.return),vl(t);break;case 22:t.memoizedState===null&&vl(t);break;case 30:vl(t);break;default:vl(t)}e=e.sibling}}function yl(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:yl(i,a,n),zc(4,a);break;case 1:if(yl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Uu(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)qa(c[i],s)}catch(e){Uu(r,r.return,e)}}n&&o&64&&Vc(a),Uc(a,a.return);break;case 27:Zc(a);case 26:case 5:yl(i,a,n),n&&r===null&&o&4&&Gc(a),Uc(a,a.return);break;case 12:yl(i,a,n);break;case 31:yl(i,a,n),n&&o&4&&ll(i,a);break;case 13:yl(i,a,n),n&&o&4&&ul(i,a);break;case 22:a.memoizedState===null&&yl(i,a,n),Uc(a,a.return);break;case 30:break;default:yl(i,a,n)}t=t.sibling}}function bl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&sa(n))}function xl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&sa(e))}function Sl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Cl(e,t,n,r),t=t.sibling}function Cl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Sl(e,t,n,r),i&2048&&zc(9,t);break;case 1:Sl(e,t,n,r);break;case 3:Sl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&sa(e)));break;case 12:if(i&2048){Sl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Uu(t,t.return,e)}}else Sl(e,t,n,r);break;case 31:Sl(e,t,n,r);break;case 13:Sl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Sl(e,t,n,r):(a._visibility|=2,wl(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?Sl(e,t,n,r):Tl(e,t),i&2048&&bl(o,t);break;case 24:Sl(e,t,n,r),i&2048&&xl(t.alternate,t);break;default:Sl(e,t,n,r)}}function wl(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:wl(a,o,s,c,i),zc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,wl(a,o,s,c,i)):u._visibility&2?wl(a,o,s,c,i):Tl(a,o),i&&l&2048&&bl(o.alternate,o);break;case 24:wl(a,o,s,c,i),i&&l&2048&&xl(o.alternate,o);break;default:wl(a,o,s,c,i)}t=t.sibling}}function Tl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Tl(n,r),i&2048&&bl(r.alternate,r);break;case 24:Tl(n,r),i&2048&&xl(r.alternate,r);break;default:Tl(n,r)}t=t.sibling}}var El=8192;function Dl(e,t,n){if(e.subtreeFlags&El)for(e=e.child;e!==null;)Ol(e,t,n),e=e.sibling}function Ol(e,t,n){switch(e.tag){case 26:Dl(e,t,n),e.flags&El&&e.memoizedState!==null&&Gf(n,pl,e.memoizedState,e.memoizedProps);break;case 5:Dl(e,t,n);break;case 3:case 4:var r=pl;pl=gf(e.stateNode.containerInfo),Dl(e,t,n),pl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=El,El=16777216,Dl(e,t,n),El=r):Dl(e,t,n));break;default:Dl(e,t,n)}}function kl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Al(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];nl=r,Nl(r,e)}kl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)jl(e),e=e.sibling}function jl(e){switch(e.tag){case 0:case 11:case 15:Al(e),e.flags&2048&&Bc(9,e,e.return);break;case 3:Al(e);break;case 12:Al(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ml(e)):Al(e);break;default:Al(e)}}function Ml(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];nl=r,Nl(r,e)}kl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Bc(8,t,t.return),Ml(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ml(t));break;default:Ml(t)}e=e.sibling}}function Nl(e,t){for(;nl!==null;){var n=nl;switch(n.tag){case 0:case 11:case 15:Bc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:sa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,nl=r;else a:for(n=e;nl!==null;){r=nl;var i=r.sibling,a=r.return;if(al(r),r===n){nl=null;break a}if(i!==null){i.return=a,nl=i;break a}nl=a}}}var Pl={getCacheForType:function(e){var t=$i(aa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return $i(aa).controller.signal}},Fl=typeof WeakMap==`function`?WeakMap:Map,Y=0,Il=null,X=null,Z=0,Q=0,Ll=null,Rl=!1,zl=!1,Bl=!1,Vl=0,Hl=0,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=null,Yl=null,Xl=!1,Zl=0,Ql=0,$l=1/0,eu=null,tu=null,nu=0,ru=null,iu=null,au=0,ou=0,su=null,cu=null,lu=0,uu=null;function du(){return Y&2&&Z!==0?Z&-Z:N.T===null?st():ud()}function fu(){if(Kl===0){if(!(Z&536870912)||V){var e=Ke;Ke<<=1,!(Ke&3932160)&&(Ke=262144),Kl=e}else Kl=536870912}return e=$a.current,e!==null&&(e.flags|=32),Kl}function pu(e,t,n){(e===Il&&(Q===2||Q===9)||e.cancelPendingCommit!==null)&&(bu(e,0),_u(e,Z,Kl,!1)),et(e,n),(!(Y&2)||e!==Il)&&(e===Il&&(!(Y&2)&&(Wl|=n),Hl===4&&_u(e,Z,Kl,!1)),nd(e))}function mu(e,t,n){if(Y&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||Xe(e,t),a=r?Ou(e,t):Eu(e,t,!0),o=r;do{if(a===0){zl&&!r&&_u(e,t,0,!1);break}if(n=e.current.alternate,o&&!gu(n)){a=Eu(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Jl;var l=c.current.memoizedState.isDehydrated;if(l&&(bu(c,s).flags|=256),s=Eu(c,s,!1),s!==2){if(Bl&&!l){c.errorRecoveryDisabledLanes|=o,Wl|=o,a=4;break a}o=Yl,Yl=a,o!==null&&(Yl===null?Yl=o:Yl.push.apply(Yl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){bu(e,0),_u(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:_u(r,t,Kl,!Rl);break a;case 2:Yl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Zl+300-ke(),10<a)){if(_u(r,t,Kl,!Rl),Ye(r,0,!0)!==0)break a;au=t,r.timeoutHandle=Kd(hu.bind(null,r,n,Yl,eu,Xl,t,Kl,Wl,ql,Rl,o,`Throttled`,-0,0),a);break a}hu(r,n,Yl,eu,Xl,t,Kl,Wl,ql,Rl,o,null,-0,0)}break}while(1);nd(e)}function hu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:nn},Ol(t,a,d);var m=(a&62914560)===a?Zl-ke():(a&4194048)===a?Ql-ke():0;if(m=qf(d,m),m!==null){au=a,e.cancelPendingCommit=m(Fu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),_u(e,a,o,!l);return}}Fu(e,t,a,n,r,i,o,s,c)}function gu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!br(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function _u(e,t,n,r){t&=~Gl,t&=~Wl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ve(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&nt(e,n,t)}function vu(){return Y&6?!0:(rd(0,!1),!1)}function yu(){if(X!==null){if(Q===0)var e=X.return;else e=X,Gi=Wi=null,Eo(e),Aa=null,ja=0,e=X;for(;e!==null;)Rc(e.alternate,e),e=e.return;X=null}}function bu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),au=0,yu(),Il=e,X=n=ci(e.current,null),Z=t,Q=0,Ll=null,Rl=!1,zl=Xe(e,t),Bl=!1,ql=Kl=Gl=Wl=Ul=Hl=0,Yl=Jl=null,Xl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ve(r),a=1<<i;t|=e[i],r&=~a}return Vl=t,Qr(),n}function xu(e,t){W=null,N.H=Is,t===ba||t===Sa?(t=Oa(),Q=3):t===xa?(t=Oa(),Q=4):Q=t===ec?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Ll=t,X===null&&(Hl=1,Js(e,gi(t,e.current)))}function Su(){var e=$a.current;return e===null?!0:(Z&4194048)===Z?eo===null:(Z&62914560)===Z||Z&536870912?e===eo:!1}function Cu(){var e=N.H;return N.H=Is,e===null?Is:e}function wu(){var e=N.A;return N.A=Pl,e}function Tu(){Hl=4,Rl||(Z&4194048)!==Z&&$a.current!==null||(zl=!0),!(Ul&134217727)&&!(Wl&134217727)||Il===null||_u(Il,Z,Kl,!1)}function Eu(e,t,n){var r=Y;Y|=2;var i=Cu(),a=wu();(Il!==e||Z!==t)&&(eu=null,bu(e,t)),t=!1;var o=Hl;a:do try{if(Q!==0&&X!==null){var s=X,c=Ll;switch(Q){case 8:yu(),o=6;break a;case 3:case 2:case 9:case 6:$a.current===null&&(t=!0);var l=Q;if(Q=0,Ll=null,Mu(e,s,c,l),n&&zl){o=0;break a}break;default:l=Q,Q=0,Ll=null,Mu(e,s,c,l)}}Du(),o=Hl;break}catch(t){xu(e,t)}while(1);return t&&e.shellSuspendCounter++,Gi=Wi=null,Y=r,N.H=i,N.A=a,X===null&&(Il=null,Z=0,Qr()),o}function Du(){for(;X!==null;)Au(X)}function Ou(e,t){var n=Y;Y|=2;var r=Cu(),a=wu();Il!==e||Z!==t?(eu=null,$l=ke()+500,bu(e,t)):zl=Xe(e,t);a:do try{if(Q!==0&&X!==null){t=X;var o=Ll;b:switch(Q){case 1:Q=0,Ll=null,Mu(e,t,o,1);break;case 2:case 9:if(wa(o)){Q=0,Ll=null,ju(t);break}t=function(){Q!==2&&Q!==9||Il!==e||(Q=7),nd(e)},o.then(t,t);break a;case 3:Q=7;break a;case 4:Q=5;break a;case 7:wa(o)?(Q=0,Ll=null,ju(t)):(Q=0,Ll=null,Mu(e,t,o,7));break;case 5:var s=null;switch(X.tag){case 26:s=X.memoizedState;case 5:case 27:var c=X;if(s?Wf(s):c.stateNode.complete){Q=0,Ll=null;var l=c.sibling;if(l!==null)X=l;else{var u=c.return;u===null?X=null:(X=u,Nu(u))}break b}}Q=0,Ll=null,Mu(e,t,o,5);break;case 6:Q=0,Ll=null,Mu(e,t,o,6);break;case 8:yu(),Hl=6;break a;default:throw Error(i(462))}}ku();break}catch(t){xu(e,t)}while(1);return Gi=Wi=null,N.H=r,N.A=a,Y=n,X===null?(Il=null,Z=0,Qr(),Hl):0}function ku(){for(;X!==null&&!De();)Au(X)}function Au(e){var t=Ac(e.alternate,e,Vl);e.memoizedProps=e.pendingProps,t===null?Nu(e):X=t}function ju(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=mc(n,t,t.pendingProps,t.type,void 0,Z);break;case 11:t=mc(n,t,t.pendingProps,t.type.render,t.ref,Z);break;case 5:Eo(t);default:Rc(n,t),t=X=li(t,Vl),t=Ac(n,t,Vl)}e.memoizedProps=e.pendingProps,t===null?Nu(e):X=t}function Mu(e,t,n,r){Gi=Wi=null,Eo(t),Aa=null,ja=0;var i=t.return;try{if($s(e,i,t,n,Z)){Hl=1,Js(e,gi(n,e.current)),X=null;return}}catch(t){if(i!==null)throw X=i,t;Hl=1,Js(e,gi(n,e.current)),X=null;return}t.flags&32768?(V||r===1?e=!0:zl||Z&536870912?e=!1:(Rl=e=!0,(r===2||r===9||r===3||r===6)&&(r=$a.current,r!==null&&r.tag===13&&(r.flags|=16384))),Pu(t,e)):Nu(t)}function Nu(e){var t=e;do{if(t.flags&32768){Pu(t,Rl);return}e=t.return;var n=Ic(t.alternate,t,Vl);if(n!==null){X=n;return}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);Hl===0&&(Hl=5)}function Pu(e,t){do{var n=Lc(e.alternate,e);if(n!==null){n.flags&=32767,X=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){X=e;return}X=e=n}while(e!==null);Hl=6,X=null}function Fu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Bu();while(nu!==0);if(Y&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Zr,tt(e,n,o,s,c,l),e===Il&&(X=Il=null,Z=0),iu=t,ru=e,au=n,ou=o,su=a,cu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Yu(Ne,function(){return Vu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=N.T,N.T=null,a=P.p,P.p=2,s=Y,Y|=4;try{rl(e,t,n)}finally{Y=s,P.p=a,N.T=r}}nu=1,Iu(),Lu(),Ru()}}function Iu(){if(nu===1){nu=0;var e=ru,t=iu,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=N.T,N.T=null;var r=P.p;P.p=2;var i=Y;Y|=4;try{ml(t,e);var a=zd,o=Tr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&wr(s.ownerDocument.documentElement,s)){if(c!==null&&Er(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Cr(s,h),v=Cr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{Y=i,P.p=r,N.T=n}}e.current=t,nu=2}}function Lu(){if(nu===2){nu=0;var e=ru,t=iu,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=N.T,N.T=null;var r=P.p;P.p=2;var i=Y;Y|=4;try{il(e,t.alternate,t)}finally{Y=i,P.p=r,N.T=n}}nu=3}}function Ru(){if(nu===4||nu===3){nu=0,Oe();var e=ru,t=iu,n=au,r=cu;t.subtreeFlags&10256||t.flags&10256?nu=5:(nu=0,iu=ru=null,zu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(tu=null),ot(n),t=t.stateNode,ze&&typeof ze.onCommitFiberRoot==`function`)try{ze.onCommitFiberRoot(Re,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=N.T,i=P.p,P.p=2,N.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{N.T=t,P.p=i}}au&3&&Bu(),nd(e),i=e.pendingLanes,n&261930&&i&42?e===uu?lu++:(lu=0,uu=e):lu=0,rd(0,!1)}}function zu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,sa(t)))}function Bu(){return Iu(),Lu(),Ru(),Vu()}function Vu(){if(nu!==5)return!1;var e=ru,t=ou;ou=0;var n=ot(au),r=N.T,a=P.p;try{P.p=32>n?32:n,N.T=null,n=su,su=null;var o=ru,s=au;if(nu=0,iu=ru=null,au=0,Y&6)throw Error(i(331));var c=Y;if(Y|=4,jl(o.current),Cl(o,o.current,s,n),Y=c,rd(0,!1),ze&&typeof ze.onPostCommitFiberRoot==`function`)try{ze.onPostCommitFiberRoot(Re,o)}catch{}return!0}finally{P.p=a,N.T=r,zu(e,t)}}function Hu(e,t,n){t=gi(n,t),t=Xs(e.stateNode,t,2),e=H(e,t,2),e!==null&&(et(e,2),nd(e))}function Uu(e,t,n){if(e.tag===3)Hu(e,e,n);else for(;t!==null;){if(t.tag===3){Hu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(tu===null||!tu.has(r))){e=gi(n,e),n=Zs(2),r=H(t,n,2),r!==null&&(Qs(n,r,t,e),et(r,2),nd(r));break}}t=t.return}}function Wu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Fl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Bl=!0,i.add(n),e=Gu.bind(null,e,t,n),t.then(e,e))}function Gu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Il===e&&(Z&n)===n&&(Hl===4||Hl===3&&(Z&62914560)===Z&&300>ke()-Zl?!(Y&2)&&bu(e,0):Gl|=n,ql===Z&&(ql=0)),nd(e)}function Ku(e,t){t===0&&(t=Qe()),e=ti(e,t),e!==null&&(et(e,t),nd(e))}function qu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ku(e,n)}function Ju(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ku(e,n)}function Yu(e,t){return Te(e,t)}var Xu=null,Zu=null,Qu=!1,$u=!1,ed=!1,td=0;function nd(e){e!==Zu&&e.next===null&&(Zu===null?Xu=Zu=e:Zu=Zu.next=e),$u=!0,Qu||(Qu=!0,ld())}function rd(e,t){if(!ed&&$u){ed=!0;do for(var n=!1,r=Xu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ve(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,cd(r,a))}else a=Z,a=Ye(r,r===Il?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Xe(r,a)||(n=!0,cd(r,a))}r=r.next}while(n);ed=!1}}function id(){ad()}function ad(){$u=Qu=!1;var e=0;td!==0&&Gd()&&(e=td);for(var t=ke(),n=null,r=Xu;r!==null;){var i=r.next,a=od(r,t);a===0?(r.next=null,n===null?Xu=i:n.next=i,i===null&&(Zu=n)):(n=r,(e!==0||a&3)&&($u=!0)),r=i}nu!==0&&nu!==5||rd(e,!1),td!==0&&(td=0)}function od(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ve(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Ze(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Il,n=Z,n=Ye(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Q===2||Q===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ee(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Xe(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ee(r),ot(n)){case 2:case 8:n=Me;break;case 32:n=Ne;break;case 268435456:n=Fe;break;default:n=Ne}return r=sd.bind(null,e),n=Te(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ee(r),e.callbackPriority=2,e.callbackNode=null,2}function sd(e,t){if(nu!==0&&nu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Bu()&&e.callbackNode!==n)return null;var r=Z;return r=Ye(e,e===Il?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(mu(e,r,t),od(e,ke()),e.callbackNode!=null&&e.callbackNode===n?sd.bind(null,e):null)}function cd(e,t){if(Bu())return null;mu(e,t,!0)}function ld(){Yd(function(){Y&6?Te(je,id):ad()})}function ud(){if(td===0){var e=ua;e===0&&(e=Ge,Ge<<=1,!(Ge&261888)&&(Ge=256)),td=e}return td}function dd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:tn(``+e)}function fd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function pd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=dd((i[dt]||null).action),o=r.submitter;o&&(t=(t=o[dt]||null)?dd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new wn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(td!==0){var e=o?fd(i,o):new FormData(i);Ss(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?fd(i,o):new FormData(i),Ss(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var md=0;md<Kr.length;md++){var hd=Kr[md];qr(hd.toLowerCase(),`on`+(hd[0].toUpperCase()+hd.slice(1)))}qr(Rr,`onAnimationEnd`),qr(zr,`onAnimationIteration`),qr(Br,`onAnimationStart`),qr(`dblclick`,`onDoubleClick`),qr(`focusin`,`onFocus`),qr(`focusout`,`onBlur`),qr(Vr,`onTransitionRun`),qr(Hr,`onTransitionStart`),qr(Ur,`onTransitionCancel`),qr(Wr,`onTransitionEnd`),Dt(`onMouseEnter`,[`mouseout`,`mouseover`]),Dt(`onMouseLeave`,[`mouseout`,`mouseover`]),Dt(`onPointerEnter`,[`pointerout`,`pointerover`]),Dt(`onPointerLeave`,[`pointerout`,`pointerover`]),Et(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Et(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Et(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Et(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Et(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Et(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var gd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),_d=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(gd));function vd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Jr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Jr(e)}i.currentTarget=null,a=c}}}}function $(e,t){var n=t[pt];n===void 0&&(n=t[pt]=new Set);var r=e+`__bubble`;n.has(r)||(Sd(t,e,2,!1),n.add(r))}function yd(e,t,n){var r=0;t&&(r|=4),Sd(n,e,r,t)}var bd=`_reactListening`+Math.random().toString(36).slice(2);function xd(e){if(!e[bd]){e[bd]=!0,wt.forEach(function(t){t!==`selectionchange`&&(_d.has(t)||yd(t,!1,e),yd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[bd]||(t[bd]=!0,yd(`selectionchange`,!1,t))}}function Sd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!pn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Cd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=yt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}un(function(){var r=a,i=an(n),s=[];a:{var c=Gr.get(e);if(c!==void 0){var l=wn,u=e;switch(e){case`keypress`:if(yn(n)===0)break a;case`keydown`:case`keyup`:l=Vn;break;case`focusin`:u=`focus`,l=Mn;break;case`focusout`:u=`blur`,l=Mn;break;case`beforeblur`:case`afterblur`:l=Mn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=An;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=jn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Un;break;case Rr:case zr:case Br:l=Nn;break;case Wr:l=Wn;break;case`scroll`:case`scrollend`:l=En;break;case`wheel`:l=Gn;break;case`copy`:case`cut`:case`paste`:l=Pn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Hn;break;case`toggle`:case`beforetoggle`:l=Kn}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=dn(m,p),g!=null&&d.push(wd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==rn&&(u=n.relatedTarget||n.fromElement)&&(yt(u)||u[ft]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?yt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=An,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Hn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:xt(l),h=u==null?c:xt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,yt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Ed,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Dd(s,c,l,d,!1),u!==null&&f!==null&&Dd(s,f,u,d,!0)}}a:{if(c=r?xt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=lr;else if(ar(c)){if(ur)v=vr;else{v=gr;var y=hr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Qt(r.elementType)&&(v=lr):v=_r;if(v&&=v(e,r)){or(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Wt(c,`number`,c.value)}switch(y=r?xt(r):window,e){case`focusin`:(ar(y)||y.contentEditable===`true`)&&(Or=y,kr=r,Ar=null);break;case`focusout`:Ar=kr=Or=null;break;case`mousedown`:jr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:jr=!1,Mr(s,n,i);break;case`selectionchange`:if(Dr)break;case`keydown`:case`keyup`:Mr(s,n,i)}var b;if(Jn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else tr?er(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Zn&&n.locale!==`ko`&&(tr||x!==`onCompositionStart`?x===`onCompositionEnd`&&tr&&(b=vn()):(hn=i,gn=`value`in hn?hn.value:hn.textContent,tr=!0)),y=Td(r,x),0<y.length&&(x=new Fn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=L(n),b!==null&&(x.data=b)))),(b=Xn?nr(e,n):rr(e,n))&&(x=Td(r,`onBeforeInput`),0<x.length&&(y=new Fn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),pd(s,e,r,n,i)}vd(s,t)})}function wd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Td(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=dn(e,n),i!=null&&r.unshift(wd(e,i,a)),i=dn(e,t),i!=null&&r.push(wd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Ed(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Dd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=dn(n,a),l!=null&&o.unshift(wd(n,l,c))):i||(l=dn(n,a),l!=null&&o.push(wd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Od=/\r\n?/g,kd=/\u0000|\uFFFD/g;function Ad(e){return(typeof e==`string`?e:``+e).replace(Od,`
`).replace(kd,``)}function jd(e,t){return t=Ad(t),Ad(e)===t}function Md(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Jt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Jt(e,``+r);break;case`className`:Nt(e,`class`,r);break;case`tabIndex`:Nt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Nt(e,n,r);break;case`style`:Zt(e,r,o);break;case`data`:if(t!==`object`){Nt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=tn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&Md(e,t,`name`,a.name,a,null),Md(e,t,`formEncType`,a.formEncType,a,null),Md(e,t,`formMethod`,a.formMethod,a,null),Md(e,t,`formTarget`,a.formTarget,a,null)):(Md(e,t,`encType`,a.encType,a,null),Md(e,t,`method`,a.method,a,null),Md(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=tn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=nn);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=tn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:$(`beforetoggle`,e),$(`toggle`,e),Mt(e,`popover`,r);break;case`xlinkActuate`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Pt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Pt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Pt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Pt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Mt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=$t.get(n)||n,Mt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Zt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Jt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Jt(e,``+r);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=nn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Tt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[dt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Mt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:$(`error`,e),$(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,o,s,n,null)}}a&&Md(e,t,`srcSet`,n.srcSet,n,null),r&&Md(e,t,`src`,n.src,n,null);return;case`input`:$(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Md(e,t,r,d,n,null)}}Ut(e,o,c,l,u,s,a,!1);return;case`select`:for(a in $(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Md(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Gt(e,!!r,n,!0):Gt(e,!!r,t,!1);return;case`textarea`:for(s in $(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Md(e,t,s,c,n,null)}qt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Md(e,t,l,r,n,null)}return;case`dialog`:$(`beforetoggle`,e),$(`toggle`,e),$(`cancel`,e),$(`close`,e);break;case`iframe`:case`object`:$(`load`,e);break;case`video`:case`audio`:for(r=0;r<gd.length;r++)$(gd[r],e);break;case`image`:$(`error`,e),$(`load`,e);break;case`details`:$(`toggle`,e);break;case`embed`:case`source`:case`link`:$(`error`,e),$(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,u,r,n,null)}return;default:if(Qt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Md(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Md(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Md(e,t,p,m,r,f)}}Ht(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Md(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&Md(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Gt(e,!!n,n?[]:``,!1):Gt(e,!!n,t,!0)):Gt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Md(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Md(e,t,s,a,r,o)}Kt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Md(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Md(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Md(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Md(e,t,u,p,r,m)}return;default:if(Qt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Md(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Md(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[_t]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),vt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[_t])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);vt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=P.d;P.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=vu();return e||t}function yf(e){var t=bt(e);t!==null&&t.tag===5&&t.type===`form`?ws(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Vt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),Ct(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Vt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Vt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Vt(n.imageSizes)+`"]`)):i+=`[href="`+Vt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),Ct(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Vt(r)+`"][href="`+Vt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),Ct(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=St(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);Ct(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=St(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Ct(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=St(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),Ct(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=de.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=St(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=St(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=St(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Vt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),Ct(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Vt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Vt(n.href)+`"]`);if(r)return t.instance=r,Ct(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Ct(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,Ct(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),Ct(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,Ct(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Ct(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[_t]||a[ut]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Ct(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),Ct(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:re,_currentValue2:re,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=$e(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=$e(0),this.hiddenUpdates=$e(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=oi(3,null,null,t),e.current=a,a.stateNode=e,t=oa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},za(a),e}function tp(e){return e?(e=ii,e):ii}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Va(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=H(e,r,t),n!==null&&(pu(n,e,t),Ha(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ti(e,67108864);t!==null&&pu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=du();t=at(t);var n=ti(e,t);n!==null&&pu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=N.T;N.T=null;var a=P.p;try{P.p=2,up(e,t,n,r)}finally{P.p=a,N.T=i}}function lp(e,t,n,r){var i=N.T;N.T=null;var a=P.p;try{P.p=8,up(e,t,n,r)}finally{P.p=a,N.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)Cd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=bt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Je(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ve(o);s.entanglements[1]|=c,o&=~c}nd(a),!(Y&6)&&($l=ke()+500,rd(0,!1))}}break;case 31:case 13:s=ti(a,2),s!==null&&pu(s,a,2),vu(),ip(a,2)}if(a=dp(r),a===null&&Cd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Cd(e,t,r,null,n)}}function dp(e){return e=an(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=yt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ae()){case je:return 2;case Me:return 8;case Ne:case Pe:return 32;case Fe:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=bt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=yt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,ct(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,ct(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);rn=r,n.target.dispatchEvent(r),rn=null}else return t=bt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=bt(n);a!==null&&(e.splice(t,3),t-=3,Ss(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[dt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[dt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,du(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),vu(),t[ft]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=st();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.8`)throw Error(i(527,Lp,`19.2.8`));P.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:N,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Re=zp.inject(Rp),ze=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Gs,s=Ks,c=qs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ft]=t.current,xd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=`modulepreload`,v=function(e){return`/`+e},y={},b=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=v(t,n),t=s(t),t in y)return;y[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:_,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},x=c(u(),1),S=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,C=/^[\\/]{2}/;function w(e,t){return t+e.replace(/\\/g,`/`)}var T=`popstate`;function E(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function D(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return j(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:M(t)}return ne(t,n,null,e)}function O(e,t){if(e===!1||e==null)throw Error(t)}function k(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function ee(){return Math.random().toString(36).substring(2,10)}function A(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function j(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?te(t):t,state:n,key:t&&t.key||r||ee(),mask:i}}function M({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function te(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ne(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=E(e)?e:j(h.location,e,t);n&&n(r,e),l=u()+1;let d=A(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=E(e)?e:j(h.location,e,t);n&&n(r,e),l=u();let i=A(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return N(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(T,d),c=e,()=>{i.removeEventListener(T,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function N(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),O(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:M(t);return i=i.replace(/ $/,`%20`),!n&&C.test(i)&&(i=r+i),new URL(i,r)}function P(e,t,n=`/`){return re(e,t,n,!1)}function re(e,t,n,r,i){let a=Se((typeof t==`string`?te(t):t).pathname||`/`,n);if(a==null)return null;let o=i??ie(e),s=null,c=xe(a);for(let e=0;s==null&&e<o.length;++e)s=_e(o[e],c,r);return s}function ie(e){let t=ae(e);return se(t),t}function ae(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;O(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Ae([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(O(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),ae(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:he(l,e.index),routesMeta:u.map((e,t)=>{let[n,r]=be(e.relativePath,e.caseSensitive,t===u.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of oe(e.path))a(e,t,!0,n)}),t}function oe(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=oe(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function se(e){e.sort((e,t)=>e.score===t.score?ge(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var ce=/^:[\w-]+$/,le=3,ue=2,de=1,fe=10,pe=-2,me=e=>e===`*`;function he(e,t){let n=e.split(`/`),r=n.length;return n.some(me)&&(r+=pe),t&&(r+=ue),n.filter(e=>!me(e)).reduce((e,t)=>e+(ce.test(t)?le:t===``?de:fe),r)}function ge(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function _e(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?ye(u,l,s.matcher,s.compiledParams):ve(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=ve({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:Ae([a,d.pathname]),pathnameBase:Me(Ae([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=Ae([a,d.pathnameBase]))}return o}function ve(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=be(e.path,e.caseSensitive,e.end);return ye(e,t,n,r)}function ye(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return e[t]=n&&!i?void 0:(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function be(e,t=!1,n=!0){k(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function xe(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return k(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function Se(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function Ce(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?te(e):e,a;return n?(n=ke(n),a=n.startsWith(`/`)?we(n.substring(1),`/`):we(n,t)):a=t,{pathname:a,search:Ne(r),hash:Pe(i)}}function we(e,t){let n=je(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Te(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ee(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function De(e){let t=Ee(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Oe(e,t,n,r=!1){let i;typeof e==`string`?i=te(e):(i={...e},O(!i.pathname||!i.pathname.includes(`?`),Te(`?`,`pathname`,`search`,i)),O(!i.pathname||!i.pathname.includes(`#`),Te(`#`,`pathname`,`hash`,i)),O(!i.search||!i.search.includes(`#`),Te(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Ce(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var ke=e=>e.replace(/[\\/]{2,}/g,`/`),Ae=e=>ke(e.join(`/`)),je=e=>e.replace(/\/+$/,``),Me=e=>je(e).replace(/^\/*/,`/`),Ne=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Pe=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Fe=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Ie(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Le(e){return Ae(e.map(e=>e.route.path).filter(Boolean))||`/`}var Re=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function ze(e,t){let n=e;if(typeof n!=`string`||!S.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Re)try{let e=new URL(window.location.href),r=C.test(n)?new URL(w(n,e.protocol)):new URL(n),a=Se(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{k(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Be=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Be);var Ve=[`GET`,...Be];new Set(Ve);var He=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function Ue(e){try{return He.includes(new URL(e).protocol)}catch{return!1}}var We=x.createContext(null);We.displayName=`DataRouter`;var Ge=x.createContext(null);Ge.displayName=`DataRouterState`;var Ke=x.createContext(!1);function qe(){return x.useContext(Ke)}var Je=x.createContext({isTransitioning:!1});Je.displayName=`ViewTransition`;var Ye=x.createContext(new Map);Ye.displayName=`Fetchers`;var Xe=x.createContext(null);Xe.displayName=`Await`;var Ze=x.createContext(null);Ze.displayName=`Navigation`;var Qe=x.createContext(null);Qe.displayName=`Location`;var $e=x.createContext({outlet:null,matches:[],isDataRoute:!1});$e.displayName=`Route`;var et=x.createContext(null);et.displayName=`RouteError`;var tt=`REACT_ROUTER_ERROR`,nt=`REDIRECT`,rt=`ROUTE_ERROR_RESPONSE`;function it(e){if(e.startsWith(`${tt}:${nt}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function at(e){if(e.startsWith(`${tt}:${rt}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Fe(t.status,t.statusText,t.data)}catch{}}function ot(e,{relative:t}={}){O(st(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=x.useContext(Ze),{hash:i,pathname:a,search:o}=gt(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Ae([n,a])),r.createHref({pathname:s,search:o,hash:i})}function st(){return x.useContext(Qe)!=null}function ct(){return O(st(),`useLocation() may be used only in the context of a <Router> component.`),x.useContext(Qe).location}var lt=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function ut(e){x.useContext(Ze).static||x.useLayoutEffect(e)}function dt(){let{isDataRoute:e}=x.useContext($e);return e?Nt():ft()}function ft(){O(st(),`useNavigate() may be used only in the context of a <Router> component.`);let e=x.useContext(We),{basename:t,navigator:n}=x.useContext(Ze),{matches:r}=x.useContext($e),{pathname:i}=ct(),a=JSON.stringify(De(r)),o=x.useRef(!1);return ut(()=>{o.current=!0}),x.useCallback((r,s={})=>{if(k(o.current,lt),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Oe(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Ae([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}var pt=x.createContext(null);function mt(e){let t=x.useContext($e).outlet;return x.useMemo(()=>t&&x.createElement(pt.Provider,{value:e},t),[t,e])}function ht(){let{matches:e}=x.useContext($e);return e[e.length-1]?.params??{}}function gt(e,{relative:t}={}){let{matches:n}=x.useContext($e),{pathname:r}=ct(),i=JSON.stringify(De(n));return x.useMemo(()=>Oe(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function _t(e,t){return vt(e,t)}function vt(e,t,n){O(st(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=x.useContext(Ze),{matches:i}=x.useContext($e),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Ft(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=ct(),d;if(t){let e=typeof t==`string`?te(t):t;O(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):P(e,{pathname:p});k(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),k(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Tt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Ae([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Ae([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?x.createElement(Qe.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function yt(){let e=Mt(),t=Ie(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=x.createElement(x.Fragment,null,x.createElement(`p`,null,`💿 Hey developer 👋`),x.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,x.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,x.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),x.createElement(x.Fragment,null,x.createElement(`h2`,null,`Unexpected Application Error!`),x.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?x.createElement(`pre`,{style:i},n):null,o)}var bt=x.createElement(yt,null),xt=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=at(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:x.createElement($e.Provider,{value:this.props.routeContext},x.createElement(et.Provider,{value:e,children:this.props.component}));return this.context?x.createElement(Ct,{error:e},t):t}};xt.contextType=Ke;var St=new WeakMap;function Ct({children:e,error:t}){let{basename:n}=x.useContext(Ze);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=it(t.digest);if(e){let r=St.get(t);if(r)throw r;let i=ze(e.location,n),a=i.absoluteURL||i.to;if(Ue(a))throw Error(`Invalid redirect location`);if(Re&&!St.get(t)){if(i.isExternal||e.reloadDocument)window.location.href=a;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw St.set(t,n),n}}return x.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${a}`})}}return e}function wt({routeContext:e,match:t,children:n}){let r=x.useContext(We);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement($e.Provider,{value:e},n)}function Tt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);O(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:Le(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||bt,o&&(s<0&&c===0?(Ft(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?x.createElement(n.route.Component,null):n.route.element?n.route.element:e,x.createElement(wt,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?x.createElement(xt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function Et(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Dt(e){let t=x.useContext(We);return O(t,Et(e)),t}function Ot(e){let t=x.useContext(Ge);return O(t,Et(e)),t}function kt(e){let t=x.useContext($e);return O(t,Et(e)),t}function At(e){let t=kt(e),n=t.matches[t.matches.length-1];return O(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function jt(){return At(`useRouteId`)}function Mt(){let e=x.useContext(et),t=Ot(`useRouteError`),n=At(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Nt(){let{router:e}=Dt(`useNavigate`),t=At(`useNavigate`),n=x.useRef(!1);return ut(()=>{n.current=!0}),x.useCallback(async(r,i={})=>{k(n.current,lt),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Pt={};function Ft(e,t,n){!t&&!Pt[e]&&(Pt[e]=!0,k(!1,n))}x.memo(It);function It({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return vt(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function Lt({to:e,replace:t,state:n,relative:r}){O(st(),`<Navigate> may be used only in the context of a <Router> component.`);let{static:i}=x.useContext(Ze);k(!i,`<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`);let{matches:a}=x.useContext($e),{pathname:o}=ct(),s=dt(),c=Oe(e,De(a),o,r===`path`),l=JSON.stringify(c);return x.useEffect(()=>{s(JSON.parse(l),{replace:t,state:n,relative:r})},[s,l,r,t,n]),null}function Rt(e){return mt(e.context)}function F(e){O(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function zt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){O(!st(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=x.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=te(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=x.useMemo(()=>{let e=Se(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return k(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:x.createElement(Ze.Provider,{value:c},x.createElement(Qe.Provider,{children:t,value:h}))}function Bt({children:e,location:t}){return _t(Vt(e),t)}x.Component;function Vt(e,t=[]){let n=[];return x.Children.forEach(e,(e,r)=>{if(!x.isValidElement(e))return;let i=[...t,r];if(e.type===x.Fragment){n.push.apply(n,Vt(e.props.children,i));return}O(e.type===F,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),O(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Vt(e.props.children,i)),n.push(a)}),n}var Ht=`get`,Ut=`application/x-www-form-urlencoded`;function Wt(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Gt(e){return Wt(e)&&e.tagName.toLowerCase()===`button`}function Kt(e){return Wt(e)&&e.tagName.toLowerCase()===`form`}function qt(e){return Wt(e)&&e.tagName.toLowerCase()===`input`}function Jt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Yt(e,t){return e.button===0&&(!t||t===`_self`)&&!Jt(e)}function Xt(e=``){return new URLSearchParams(typeof e==`string`||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}function Zt(e,t){let n=Xt(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}var Qt=null;function $t(){if(Qt===null)try{new FormData(document.createElement(`form`),0),Qt=!1}catch{Qt=!0}return Qt}var en=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function tn(e){return e!=null&&!en.has(e)?(k(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ut}"`),null):e}function nn(e,t){let n,r,i,a,o;if(Kt(e)){let o=e.getAttribute(`action`);r=o?Se(o,t):null,n=e.getAttribute(`method`)||Ht,i=tn(e.getAttribute(`enctype`))||Ut,a=new FormData(e)}else if(Gt(e)||qt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?Se(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Ht,i=tn(e.getAttribute(`formenctype`))||tn(o.getAttribute(`enctype`))||Ut,a=new FormData(o,e),!$t()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Wt(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Ht,r=null,i=Ut,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);function rn(e,t){if(e===!1||e==null)throw Error(t)}function an(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return i.pathname=n?i.pathname.endsWith(`/`)?`${i.pathname}_.${r}`:`${i.pathname}.${r}`:i.pathname===`/`?`_root.${r}`:t&&Se(i.pathname,t)===`/`?`${je(t)}/_root.${r}`:`${je(i.pathname)}.${r}`,i}async function on(e,t){if(e.id in t)return t[e.id];try{let n=await b(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function sn(e){return e!=null&&typeof e.page==`string`}function cn(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function ln(e,t,n){return mn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await on(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(cn).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function un(e,t,n,r,i,a){let o=(e,t)=>!n[t]||e.route.id!==n[t].route.id,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function dn(e,t,{includeHydrateFallback:n}={}){return fn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function fn(e){return[...new Set(e)]}function pn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function mn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!sn(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(pn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function hn(){let e=x.useContext(We);return rn(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function gn(){let e=x.useContext(Ge);return rn(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var _n=x.createContext(void 0);_n.displayName=`FrameworkContext`;function vn(){let e=x.useContext(_n);return rn(e,`You must render this element inside a <HydratedRouter> element`),e}function yn(e,t){let n=x.useContext(_n),[r,i]=x.useState(!1),[a,o]=x.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=x.useRef(null);x.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),x.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:bn(s,p),onBlur:bn(c,m),onMouseEnter:bn(l,p),onMouseLeave:bn(u,m),onTouchStart:bn(d,p)}]:[a,f,{}]:[!1,f,{}]}function bn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function xn({page:e,...t}){let n=qe(),{nonce:r}=vn(),{router:i}=hn(),a=x.useMemo(()=>P(i.routes,e,i.basename),[i.routes,e,i.basename]);return a?(t.nonce==null&&r&&(t={...t,nonce:r}),n?x.createElement(Cn,{page:e,matches:a,...t}):x.createElement(wn,{page:e,matches:a,...t})):null}function Sn(e){let{manifest:t,routeModules:n}=vn(),[r,i]=x.useState([]);return x.useEffect(()=>{let r=!1;return ln(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Cn({page:e,matches:t,...n}){let r=ct(),{future:i}=vn(),{basename:a}=hn(),o=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=an(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return x.createElement(x.Fragment,null,o.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function wn({page:e,matches:t,...n}){let r=ct(),{future:i,manifest:a,routeModules:o}=vn(),{basename:s}=hn(),{loaderData:c,matches:l}=gn(),u=x.useMemo(()=>un(e,t,l,a,r,`data`),[e,t,l,a,r]),d=x.useMemo(()=>un(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=an(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=x.useMemo(()=>dn(d,a),[d,a]),m=Sn(d);return x.createElement(x.Fragment,null,f.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>x.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>x.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Tn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}x.Component;var En=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{En&&(window.__reactRouterVersion=`7.18.2`)}catch{}function Dn({basename:e,children:t,useTransitions:n,window:r}){let i=x.useRef();i.current??=D({window:r,v5Compat:!0});let a=i.current,[o,s]=x.useState({action:a.action,location:a.location}),c=x.useCallback(e=>{n===!1?s(e):x.startTransition(()=>s(e))},[n]);return x.useLayoutEffect(()=>a.listen(c),[a,c]),x.createElement(zt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}var I=x.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:_}=x.useContext(Ze),v=typeof l==`string`&&S.test(l),y=ze(l,h);l=y.to;let b=ot(l,{relative:r}),C=ct(),w=null;if(o){let e=Oe(o,[],C.mask?C.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Ae([h,e.pathname])),w=g.createHref(e)}let[T,E,D]=yn(n,p),O=Mn(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:_});function k(t){e&&e(t),t.defaultPrevented||O(t)}let ee=!(y.isExternal||i),A=x.createElement(`a`,{...p,...D,href:(ee?w:void 0)||y.absoluteURL||b,onClick:ee?k:e,ref:Tn(m,E),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return T&&!v?x.createElement(x.Fragment,null,A,x.createElement(xn,{page:b})):A});I.displayName=`Link`;var On=x.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=gt(a,{relative:c.relative}),d=ct(),f=x.useContext(Ge),{navigator:p,basename:m}=x.useContext(Ze),h=f!=null&&Rn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=Se(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,S=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),C={isActive:b,isPending:S,isTransitioning:h},w=b?e:void 0,T;T=typeof n==`function`?n(C):[n,b?`active`:null,S?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let E=typeof i==`function`?i(C):i;return x.createElement(I,{...c,"aria-current":w,className:T,ref:l,style:E,to:a,viewTransition:o},typeof s==`function`?s(C):s)});On.displayName=`NavLink`;var kn=x.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Ht,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=x.useContext(Ze),g=In(),_=Ln(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&S.test(s);return x.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?x.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});kn.displayName=`Form`;function An(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function jn(e){let t=x.useContext(We);return O(t,An(e)),t}function Mn(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=dt(),d=ct(),f=gt(e,{relative:o});return x.useCallback(p=>{if(Yt(p,t)){p.preventDefault();let t=n===void 0?M(d)===M(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?x.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}function Nn(e){k(typeof URLSearchParams<`u`,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=x.useRef(Xt(e)),n=x.useRef(!1),r=ct(),i=x.useMemo(()=>Zt(r.search,n.current?null:t.current),[r.search]),a=dt();return[i,x.useCallback((e,t)=>{let r=Xt(typeof e==`function`?e(new URLSearchParams(i)):e);n.current=!0,a(`?`+r,t)},[a,i])]}var Pn=0,Fn=()=>`__${String(++Pn)}__`;function In(){let{router:e}=jn(`useSubmit`),{basename:t}=x.useContext(Ze),n=jt(),r=e.fetch,i=e.navigate;return x.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=nn(e,t);if(a.navigate===!1){let e=a.fetcherKey||Fn();await r(e,n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync})}else await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Ln(e,{relative:t}={}){let{basename:n}=x.useContext(Ze),r=x.useContext($e);O(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...gt(e||`.`,{relative:t})},o=ct();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Ae([n,a.pathname])),M(a)}function Rn(e,{relative:t}={}){let n=x.useContext(Je);O(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=jn(`useViewTransitionState`),i=gt(e,{relative:t});if(!n.isTransitioning)return!1;let a=Se(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Se(n.nextLocation.pathname,r)||n.nextLocation.pathname;return ve(i.pathname,o)!=null||ve(i.pathname,a)!=null}var zn=c(m(),1),Bn=g(),Vn=`srikala_categories`,Hn=`srikala_products`,Un=e=>`https://images.unsplash.com/${e}?auto=format&fit=crop&w=800&q=80`,Wn=[{id:`kanjivaram`,name:`Kanchivaram`,image:`/images/styles/kanchivaram.jpg`,tagline:`Temple-woven silk, heirloom weight`},{id:`banarasi`,name:`Banarasi`,image:`/images/styles/banarasi.jpg`,tagline:`Brocade zari from the ghats`},{id:`tussar`,name:`Tussar & Cotton`,image:Un(`photo-1676696706907-0e04665b80bd`),tagline:`Everyday drape, breathable weave`},{id:`bridal`,name:`Bridal Edit`,image:Un(`photo-1692992193981-d3d92fabd9cb`),tagline:`Curated for the big day`},{id:`organza`,name:`Organza`,image:Un(`photo-1610189012906-4c0aa9b9781e`),tagline:`Sheer, modern, festive`},{id:`linen`,name:`Linen`,image:Un(`photo-1609748340041-f5d61e061ebc`),tagline:`Light weaves for warm days`}],Gn=[{id:`p1`,name:`Purple Kanjivaram with Gold Zari`,category:`kanjivaram`,price:18500,mrp:24e3,image:Un(`photo-1641699862936-be9f49b1c38d`),stock:4,description:`Handwoven Kanjivaram silk saree in deep purple with a temple-border gold zari pallu.`},{id:`p2`,name:`Maroon Banarasi Silk`,category:`banarasi`,price:15200,mrp:19e3,image:Un(`photo-1610030469983-98e550d6193c`),stock:0,description:`Classic Banarasi weave in maroon with fine brocade work through the body and pallu.`},{id:`p3`,name:`Emerald Tussar Cotton`,category:`tussar`,price:4200,mrp:5200,image:Un(`photo-1717585679395-bbe39b5fb6bc`),stock:12,description:`Breathable tussar-cotton blend, ideal for daily wear and office festivities.`},{id:`p4`,name:`Ivory Bridal Kanjivaram`,category:`bridal`,price:32500,mrp:39e3,image:Un(`photo-1619516388835-2b60acc4049e`),stock:2,description:`Statement bridal Kanjivaram in ivory and gold, paired with a heavy contrast pallu.`},{id:`p5`,name:`Sage Linen Saree`,category:`linen`,price:3600,mrp:4400,image:Un(`photo-1609748340041-f5d61e061ebc`),stock:9,description:`Handloom linen in sage green with a woven self-border, styled for warm afternoons.`},{id:`p6`,name:`Blush Organza Festive`,category:`organza`,price:6800,mrp:8500,image:Un(`photo-1610189013429-a703f4b245cf`),stock:6,description:`Sheer organza with sequin scatter work, light enough for festive evenings.`},{id:`p7`,name:`Teal Kanjivaram Temple Border`,category:`kanjivaram`,price:21e3,mrp:26500,image:Un(`photo-1676696706907-0e04665b80bd`),stock:3,description:`Rich teal Kanjivaram with a wide temple-border pallu and contrast blouse piece.`},{id:`p8`,name:`Gold Banarasi Tissue`,category:`banarasi`,price:17800,mrp:22e3,image:Un(`photo-1727430228383-aa1fb59db8bf`),stock:5,description:`Tissue-finish Banarasi in gold with all-over floral butis.`},{id:`p9`,name:`Rust Cotton Handloom`,category:`tussar`,price:3800,mrp:4600,image:Un(`photo-1588140686379-1b76a52103dc`),stock:15,description:`Rust handloom cotton with a simple striped border, easy for daily wear.`},{id:`p10`,name:`Wine Bridal Silk`,category:`bridal`,price:28900,mrp:35e3,image:Un(`photo-1618901185975-d59f7091bcfe`),stock:0,description:`Deep wine bridal silk with heavy gold zari work through the pallu and border.`},{id:`p11`,name:`Mustard Linen Weave`,category:`linen`,price:3900,mrp:4700,image:Un(`photo-1617627143750-d86bc21e42bb`),stock:7,description:`Mustard handloom linen with a fine self-check pattern.`},{id:`p12`,name:`Peacock Blue Organza`,category:`organza`,price:7200,mrp:8900,image:Un(`photo-1610189012906-4c0aa9b9781e`),stock:8,description:`Peacock-blue organza with delicate thread embroidery along the border.`}];function Kn(e,t){try{let n=localStorage.getItem(e);if(!n&&e.startsWith(`srikala_`)){let t=e.replace(`srikala_`,`miladys_`);n=localStorage.getItem(t)}if(n){let r=JSON.parse(n);if(e===Vn&&Array.isArray(r)){let n=!1,i=r.map(e=>{let r=t.find(t=>t.id===e.id);return r&&(e.image?.includes(`photo-1618901185975`)||e.image?.includes(`photo-1727430228383`)||e.name===`Kanjivaram Silk`)?(n=!0,{...e,name:r.name,image:r.image}):e});if(n)return localStorage.setItem(e,JSON.stringify(i)),i}return r}return localStorage.setItem(e,JSON.stringify(t)),t}catch{return t}}function qn(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Jn(){return Kn(Vn,Wn)}function Yn(){return Kn(Hn,Gn)}function Xn(e){return`₹`+Number(e).toLocaleString(`en-IN`)}var Zn=`srikala_cart`;function Qn(){return Kn(Zn,[])}function $n(e){qn(Zn,e)}var er=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),L=o(((e,t)=>{t.exports=er()}))(),tr=(0,x.createContext)(null);function nr({children:e}){let[t,n]=(0,x.useState)([]);(0,x.useEffect)(()=>{n(Qn())},[]);function r(e,t=1){n(n=>{let r=n.find(t=>t.id===e.id)?n.map(n=>n.id===e.id?{...n,qty:n.qty+t}:n):[...n,{id:e.id,name:e.name,price:e.price,image:e.image,qty:t}];return $n(r),r})}function i(e,t){n(n=>{let r=t<=0?n.filter(t=>t.id!==e):n.map(n=>n.id===e?{...n,qty:t}:n);return $n(r),r})}function a(e){n(t=>{let n=t.filter(t=>t.id!==e);return $n(n),n})}function o(){n([]),$n([])}let s=(0,x.useMemo)(()=>t.reduce((e,t)=>e+t.qty,0),[t]),c=(0,x.useMemo)(()=>t.reduce((e,t)=>e+t.qty*t.price,0),[t]);return(0,L.jsx)(tr.Provider,{value:{items:t,addItem:r,updateQty:i,removeItem:a,clearCart:o,count:s,subtotal:c},children:e})}function rr(){let e=(0,x.useContext)(tr);if(!e)throw Error(`useCart must be used within a CartProvider`);return e}var ir=`http://localhost:4000`,ar=`srikala_token`;function or(){return localStorage.getItem(ar)||localStorage.getItem(`miladys_token`)}function sr(e){e?(localStorage.setItem(ar,e),localStorage.removeItem(`miladys_token`)):(localStorage.removeItem(ar),localStorage.removeItem(`miladys_token`))}async function R(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=or();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(`${ir}${e}`,{method:t,headers:i,body:n===void 0?void 0:JSON.stringify(n)})}catch{throw Error(`Could not reach the server. Is the backend running?`)}let s=await o.json().catch(()=>({}));if(!o.ok)throw Error(s.error||`Something went wrong.`);return s}async function cr(e,t){let n=or(),r={};n&&(r.Authorization=`Bearer ${n}`);let i;try{i=await fetch(`${ir}${e}`,{headers:r})}catch{throw Error(`Could not reach the server. Is the backend running?`)}if(!i.ok){let e=await i.json().catch(()=>({}));throw Error(e.error||`Could not download the file.`)}let a=await i.blob(),o=URL.createObjectURL(a),s=document.createElement(`a`);s.href=o,s.download=t,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(o)}var z={signup:e=>R(`/api/auth/signup`,{method:`POST`,body:e,auth:!1}),login:e=>R(`/api/auth/login`,{method:`POST`,body:e,auth:!1}),googleLogin:e=>R(`/api/auth/google`,{method:`POST`,body:e,auth:!1}),forgotPassword:e=>R(`/api/auth/forgot-password`,{method:`POST`,body:e,auth:!1}),resetPassword:e=>R(`/api/auth/reset-password`,{method:`POST`,body:e,auth:!1}),me:()=>R(`/api/auth/me`),updateMe:e=>R(`/api/auth/me`,{method:`PUT`,body:e}),changePassword:e=>R(`/api/auth/change-password`,{method:`POST`,body:e}),getAddresses:()=>R(`/api/auth/addresses`),addAddress:e=>R(`/api/auth/addresses`,{method:`POST`,body:e}),deleteAddress:e=>R(`/api/auth/addresses/${e}`,{method:`DELETE`}),getCategories:()=>R(`/api/categories`,{auth:!1}),getAllCategoriesAdmin:()=>R(`/api/categories/admin/all`),createCategory:e=>R(`/api/categories`,{method:`POST`,body:e}),updateCategory:(e,t)=>R(`/api/categories/${e}`,{method:`PUT`,body:t}),deleteCategory:e=>R(`/api/categories/${e}`,{method:`DELETE`}),getProducts:e=>R(`/api/products${e?`?category=${e}`:``}`,{auth:!1}),getAllProductsAdmin:()=>R(`/api/products/admin/all`),getProduct:e=>R(`/api/products/${e}`,{auth:!1}),createProduct:e=>R(`/api/products`,{method:`POST`,body:e}),updateProduct:(e,t)=>R(`/api/products/${e}`,{method:`PUT`,body:t}),deleteProduct:e=>R(`/api/products/${e}`,{method:`DELETE`}),getHomeSections:()=>R(`/api/home-sections`,{auth:!1}),getHomeSection:e=>R(`/api/home-sections/${e}`,{auth:!1}),getAllHomeSections:()=>R(`/api/home-sections/all`),updateHomeSection:(e,t)=>R(`/api/home-sections/${e}`,{method:`PUT`,body:t}),getReviews:e=>R(`/api/products/${e}/reviews`,{auth:!1}),addReview:(e,t)=>R(`/api/products/${e}/reviews`,{method:`POST`,body:t}),getAdminReviews:()=>R(`/api/admin/reviews`),approveReview:(e,t)=>R(`/api/admin/reviews/${e}/approve`,{method:`PUT`,body:{approved:t}}),deleteReview:e=>R(`/api/admin/reviews/${e}`,{method:`DELETE`}),createOrder:e=>R(`/api/orders/create`,{method:`POST`,body:e}),verifyOrder:e=>R(`/api/orders/verify`,{method:`POST`,body:e}),getMyOrders:()=>R(`/api/orders`),getAllOrders:()=>R(`/api/orders/admin/all`),downloadInvoice:e=>cr(`/api/orders/${e}/invoice`,`SriKala-Invoice-${e}.pdf`),validateCoupon:e=>R(`/api/coupons/validate`,{method:`POST`,body:e}),getCoupons:()=>R(`/api/coupons`),createCoupon:e=>R(`/api/coupons`,{method:`POST`,body:e}),updateCoupon:(e,t)=>R(`/api/coupons/${e}`,{method:`PUT`,body:t}),deleteCoupon:e=>R(`/api/coupons/${e}`,{method:`DELETE`}),getTestimonials:e=>R(`/api/testimonials${e?`?productId=${e}`:``}`,{auth:!1}),getAllTestimonials:()=>R(`/api/testimonials/admin/all`),createTestimonial:e=>R(`/api/testimonials`,{method:`POST`,body:e}),updateTestimonial:(e,t)=>R(`/api/testimonials/${e}`,{method:`PUT`,body:t}),deleteTestimonial:e=>R(`/api/testimonials/${e}`,{method:`DELETE`}),getCancellationPolicy:()=>R(`/api/cancellation-policy`,{auth:!1}),createPolicyTier:e=>R(`/api/cancellation-policy`,{method:`POST`,body:e}),updatePolicyTier:(e,t)=>R(`/api/cancellation-policy/${e}`,{method:`PUT`,body:t}),deletePolicyTier:e=>R(`/api/cancellation-policy/${e}`,{method:`DELETE`}),cancelOrder:e=>R(`/api/orders/${e}/cancel`,{method:`POST`})},lr=(0,x.createContext)(null);function ur({children:e}){let[t,n]=(0,x.useState)(null),[r,i]=(0,x.useState)(!0);(0,x.useEffect)(()=>{if(!or()){i(!1);return}z.me().then(({user:e})=>n(e)).catch(()=>sr(null)).finally(()=>i(!1))},[]);async function a(e,t){let{token:r,user:i}=await z.login({email:e,password:t});return sr(r),n(i),i}async function o(e){let{token:t,user:r}=await z.signup(e);return sr(t),n(r),r}async function s(e){let{token:t,user:r,needsMobile:i}=await z.googleLogin({credential:e});return sr(t),n(r),{user:r,needsMobile:i}}async function c(e){return z.forgotPassword({email:e})}async function l(e,t){let{token:r,user:i}=await z.resetPassword({token:e,newPassword:t});return sr(r),n(i),i}function u(){sr(null),n(null)}return(0,L.jsx)(lr.Provider,{value:{user:t,loading:r,login:a,signup:o,googleLogin:s,logout:u,forgotPassword:c,resetPassword:l,isAdmin:!!t?.isAdmin},children:e})}function dr(){return(0,x.useContext)(lr)}var B={name:`Sri Kala`,legalName:`Sri Kala Silk Emporium`,tagline:`Silk Emporium`,shortTitle:`Sri Kala`,fullTitle:`Sri Kala — Silk Emporium | Timeless Indian Sarees`,slogan:`Timeless Elegance, Woven in Tradition`,subheading:`Discover thoughtfully curated Indian sarees crafted to celebrate timeless beauty, artistry and tradition.`,story:{eyebrow:`Our Story`,heading:`Where Tradition Meets Grace`,lead:`Sri Kala celebrates the timeless beauty of Indian craftsmanship. We bring together thoughtfully selected sarees that honour traditional artistry while fitting effortlessly into the modern wardrobe.`,body:`Sri Kala celebrates the timeless beauty of Indian craftsmanship. We bring together thoughtfully selected sarees that honour traditional artistry while fitting effortlessly into the modern wardrobe. Every weave is selected with reverent care for authenticity, drape, and enduring elegance.`,paragraphs:[`Sri Kala celebrates the timeless beauty of Indian craftsmanship. We bring together thoughtfully selected sarees that honour traditional artistry while fitting effortlessly into the modern wardrobe.`,`From pure temple-woven silks and intricate brocades to breathable everyday handlooms, each piece is chosen for its character, richness of weave, and fine craftsmanship.`,`Every saree is hand-inspected for weave integrity, zari luster, and finish before it arrives at your doorstep.`],values:[{title:`Authentic Weaves`,description:`Honoring genuine Indian textile traditions and time-honored weaving artistry.`},{title:`Curated Elegance`,description:`Every design is hand-selected to balance timeless heritage with effortless contemporary wear.`},{title:`Hand-Inspected Quality`,description:`Each piece undergoes meticulous inspection for weave density, zari brilliance, and impeccable finish.`}]},contact:{phone:`+91 98765 43210`,whatsapp:`+919876543210`,email:`contact@srikala.com`,address:`Sri Kala Silk Emporium, MG Road, Hyderabad, Telangana 500001`,hoursWeekday:`Mon – Sat: 10:00 AM – 9:00 PM`,hoursSunday:`Sunday: 10:00 AM – 7:00 PM`,instagram:`https://www.instagram.com/srikalasilks`,facebook:`https://www.facebook.com/srikalasilks`,twitter:`https://twitter.com/srikalasilks`,mapQuery:`Sri+Kala+Silk+Emporium+Hyderabad`},seo:{siteName:`Sri Kala`,siteUrl:`https://www.srikala.com`,defaultTitle:`Sri Kala — Silk Emporium | Timeless Indian Sarees`,defaultDescription:`Discover thoughtfully curated Indian sarees crafted to celebrate timeless beauty, artistry and tradition. Shop Kanjivaram, Banarasi, pure silk, and festive sarees at Sri Kala.`,defaultKeywords:`Sri Kala, Sri Kala Silk Emporium, pure silk sarees online, Kanjivaram silk saree, Banarasi silk saree, pattu sarees online, Indian bridal sarees, wedding sarees online India, handloom sarees, festive sarees`},assets:{logoLight:`/images/logo.png`,logoWhite:`/images/logo-white.png`,logoIntro:`/images/given-logo-transparent.png`,logoDark:`/images/srikala-logo-dark.png`,monogram:`/images/monogram.png`,monogramWhite:`/images/monogram-white.png`,favicon:`/favicon.png`,faviconSvg:`/favicon.svg`,appleTouchIcon:`/apple-touch-icon.png`},colors:{primary:`#581e15`,primaryHover:`#6c241a`,primaryDark:`#260a0e`,secondary:`#b0732e`,accent:`#c58b38`,goldLight:`#fbdfa2`,background:`#FAF6F0`,surface:`#FFFFFF`,surfaceWarm:`#F8F3ED`,text:`#220D0A`,muted:`#735E59`,border:`#E6DCCE`}},fr=[{to:`/`,label:`Home`,end:!0},{to:`/#collections`,label:`Collections`},{to:`/products`,label:`Sarees`},{to:`/products?sort=newest`,label:`New Arrivals`},{to:`/about`,label:`About`},{to:`/contact`,label:`Contact`}];function pr(){let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(!1),[i,a]=(0,x.useState)(!1),[o,s]=(0,x.useState)(!1),[c,l]=(0,x.useState)(!1),[u,d]=(0,x.useState)(``),[f,p]=(0,x.useState)(null),{count:m}=rr(),{user:h,logout:g}=dr(),_=dt(),v=ct();(0,x.useEffect)(()=>{a(!1),t(!1)},[v.pathname]),(0,x.useEffect)(()=>{let e=document.getElementById(`page-hero`);if(!e||!(`IntersectionObserver`in window)){l(!1);return}l(!0);let t=window.innerWidth<=860?62:72,n=new IntersectionObserver(([e])=>s(e.isIntersecting),{rootMargin:`-${t}px 0px 0px 0px`,threshold:0});return n.observe(e),()=>n.disconnect()},[v.pathname]);let y=c&&o?`is-transparent`:`is-scrolled`;function b(e){e.preventDefault(),S(u)}function S(e){_(e.trim()?`/products?search=${encodeURIComponent(e.trim())}`:`/products`),r(!1)}(0,x.useEffect)(()=>{n&&f===null&&z.getProducts().then(({products:e})=>p(e)).catch(()=>p([]))},[n,f]);let C=(0,x.useMemo)(()=>{let e=u.trim().toLowerCase();return!e||!f?[]:f.filter(t=>t.name.toLowerCase().includes(e)).slice(0,5)},[u,f]);function w(e,n){if(n.to===`/#collections`&&v.pathname===`/`){e.preventDefault();let t=document.getElementById(`collections`);t&&t.scrollIntoView({behavior:`smooth`})}t(!1)}return(0,L.jsxs)(`header`,{className:`navbar ${y}`,children:[(0,L.jsxs)(`div`,{className:`container navbar-inner`,children:[(0,L.jsxs)(`div`,{className:`nav-left`,children:[(0,L.jsxs)(`button`,{className:`nav-toggle`,"aria-label":`Open menu`,"aria-expanded":e,onClick:()=>{t(e=>!e),r(!1)},children:[(0,L.jsx)(`span`,{}),(0,L.jsx)(`span`,{})]}),(0,L.jsx)(I,{to:`/`,className:`brand-link`,onClick:()=>t(!1),children:(0,L.jsx)(`img`,{id:`navBrandLogo`,src:B.assets.logoWhite,alt:B.name,className:`brand-logo`,width:`130`,height:`38`})})]}),(0,L.jsx)(`nav`,{className:`desktop-nav`,"aria-label":`Main Navigation`,children:fr.map(e=>(0,L.jsx)(On,{to:e.to,end:e.end,className:({isActive:t})=>`desktop-nav-link`+(t&&!e.to.includes(`#`)?` active`:``),onClick:t=>w(t,e),children:e.label},e.to))}),(0,L.jsxs)(`div`,{className:`nav-actions`,children:[(0,L.jsx)(`button`,{className:`icon-btn`,"aria-label":`Search`,"aria-expanded":n,onClick:()=>{r(e=>!e),t(!1),a(!1)},children:(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`circle`,{cx:`11`,cy:`11`,r:`7`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,L.jsx)(`line`,{x1:`16.2`,y1:`16.2`,x2:`21`,y2:`21`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})}),(0,L.jsxs)(`div`,{className:`account-menu-wrap`,children:[(0,L.jsx)(`button`,{className:`icon-btn`,"aria-label":`Account`,"aria-expanded":i,onClick:()=>{a(e=>!e),r(!1),t(!1)},children:(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`circle`,{cx:`12`,cy:`8`,r:`3.4`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,L.jsx)(`path`,{d:`M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})}),i&&(0,L.jsxs)(L.Fragment,{children:[(0,zn.createPortal)((0,L.jsx)(`div`,{className:`account-menu-overlay`,onClick:()=>a(!1),"aria-hidden":`true`}),document.body),(0,L.jsx)(`div`,{className:`account-menu`,children:h?(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(`p`,{className:`account-menu-greeting`,children:[`Namaste, `,h.name?.split(` `)[0]||`Guest`]}),(0,L.jsxs)(I,{to:`/orders`,className:`account-menu-link`,onClick:()=>a(!1),children:[(0,L.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,L.jsx)(`path`,{d:`M4 7h16M4 12h16M4 17h10`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})}),`My Orders`]}),(0,L.jsxs)(I,{to:`/profile`,className:`account-menu-link`,onClick:()=>a(!1),children:[(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`circle`,{cx:`12`,cy:`8`,r:`3.4`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,L.jsx)(`path`,{d:`M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]}),`My Profile`]}),(0,L.jsxs)(`button`,{type:`button`,className:`account-menu-link account-menu-logout`,onClick:()=>{g(),a(!1)},children:[(0,L.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,L.jsx)(`path`,{d:`M15 17l5-5-5-5M20 12H9M12 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`})}),`Log Out`]})]}):(0,L.jsx)(L.Fragment,{children:(0,L.jsxs)(I,{to:`/login`,className:`account-menu-link`,onClick:()=>a(!1),children:[(0,L.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,L.jsx)(`path`,{d:`M15 17l5-5-5-5M20 12H9M12 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`,transform:`rotate(180 12 12)`})}),`Log In / Sign Up`]})})})]})]}),(0,L.jsxs)(I,{to:`/cart`,className:`icon-btn cart-link`,"aria-label":`Cart`,children:[(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`path`,{d:`M4 6h2l1.6 10.2a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L20 8H6.5`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,L.jsx)(`circle`,{cx:`10`,cy:`21`,r:`1.3`,fill:`currentColor`}),(0,L.jsx)(`circle`,{cx:`17`,cy:`21`,r:`1.3`,fill:`currentColor`})]}),m>0&&(0,L.jsx)(`span`,{className:`cart-badge`,children:m})]})]})]}),n&&(0,L.jsxs)(L.Fragment,{children:[(0,zn.createPortal)((0,L.jsx)(`button`,{className:`search-backdrop`,"aria-label":`Close search`,onClick:()=>r(!1)}),document.body),(0,L.jsxs)(`div`,{className:`search-bar`,children:[(0,L.jsxs)(`form`,{className:`container search-form`,onSubmit:b,children:[(0,L.jsxs)(`svg`,{viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`circle`,{cx:`9`,cy:`9`,r:`6.5`,stroke:`currentColor`,strokeWidth:`1.4`}),(0,L.jsx)(`line`,{x1:`14`,y1:`14`,x2:`18.5`,y2:`18.5`,stroke:`currentColor`,strokeWidth:`1.4`,strokeLinecap:`round`})]}),(0,L.jsx)(`input`,{type:`search`,autoFocus:!0,placeholder:`Search sarees...`,value:u,onChange:e=>d(e.target.value),"aria-label":`Search products`})]}),u.trim()&&(0,L.jsx)(`div`,{className:`search-suggestions container`,children:C.length>0?(0,L.jsxs)(L.Fragment,{children:[C.map(e=>(0,L.jsxs)(I,{to:`/products/${e.id}`,className:`search-suggestion-item`,onClick:()=>r(!1),children:[(0,L.jsx)(`img`,{src:e.image,alt:``}),(0,L.jsx)(`span`,{className:`search-suggestion-name`,children:e.name}),(0,L.jsx)(`span`,{className:`search-suggestion-price`,children:Xn(e.price)})]},e.id)),(0,L.jsxs)(`button`,{type:`button`,className:`search-see-all`,onClick:()=>S(u),children:[`See all results for “`,u.trim(),`”`]})]}):(0,L.jsxs)(`p`,{className:`search-no-results`,children:[`No matches for “`,u.trim(),`” — press Enter to search anyway.`]})})]})]}),e&&(0,zn.createPortal)((0,L.jsx)(`button`,{className:`nav-backdrop`,"aria-label":`Close menu`,onClick:()=>t(!1)}),document.body),(0,L.jsx)(`div`,{className:`nav-popover ${e?`open`:``}`,children:(0,L.jsx)(`nav`,{className:`popover-links`,children:fr.map(e=>(0,L.jsx)(On,{to:e.to,end:e.to===`/`,className:({isActive:e})=>`popover-link`+(e?` active`:``),onClick:()=>t(!1),children:e.label},e.to))})}),(0,L.jsx)(`style`,{children:`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 160;
          margin: 0 16px 0;
          background: rgba(32, 8, 11, 0.65);
          backdrop-filter: blur(20px) saturate(170%);
          -webkit-backdrop-filter: blur(20px) saturate(170%);
          border: 1px solid rgba(197, 139, 56, 0.22);
          border-radius: 999px;
          box-shadow:
            0 18px 36px rgba(18, 4, 6, 0.28),
            inset 0 1px 0 rgba(251, 223, 162, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.15);
          transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .navbar.is-scrolled {
          background: rgba(32, 8, 11, 0.92);
          border-color: rgba(197, 139, 56, 0.35);
          box-shadow:
            0 20px 40px rgba(18, 4, 6, 0.38),
            inset 0 1px 0 rgba(251, 223, 162, 0.25),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2);
        }
        .navbar.is-transparent {
          background: rgba(26, 6, 9, 0.35);
          border-color: rgba(251, 223, 162, 0.28);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(251, 223, 162, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
        }
        .navbar-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          padding: 0 12px 0 18px;
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-link {
          display: flex;
          align-items: center;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .brand-link:hover {
          opacity: 0.95;
          transform: scale(1.02);
        }
        .brand-logo {
          height: 38px;
          width: auto;
          display: block;
        }

        /* Desktop Navigation Links */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .desktop-nav-link {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--blush-300);
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
          height: 1.5px;
          background: var(--brand-accent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
        }
        .desktop-nav-link:hover {
          color: var(--brand-gold-light);
        }
        .desktop-nav-link:hover::after,
        .desktop-nav-link.active::after {
          transform: scaleX(1);
        }
        .desktop-nav-link.active {
          color: var(--brand-gold-light);
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
          height: 1.5px;
          background: var(--brand-gold-light);
          display: block;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 2;
        }
        .icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          color: var(--blush-300);
          background: none;
          border: none;
          transition: color 0.2s ease;
        }
        .icon-btn svg { width: 21px; height: 21px; }
        .icon-btn:hover { color: var(--ivory); }

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
          background: var(--gold-500);
          color: var(--maroon-950);
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
          border-radius: 22px;
          background: var(--maroon-950);
          box-shadow: 0 12px 26px rgba(20,4,7,0.24);
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
        .search-form svg { width: 17px; height: 17px; color: var(--blush-300); flex: 0 0 auto; }
        .search-form input {
          background: none;
          border: none;
          outline: none;
          color: var(--ivory);
          font-family: var(--font-body);
          font-size: 14px;
          width: 100%;
        }
        .search-form input::placeholder { color: var(--blush-300); opacity: 0.7; }

        .search-suggestions {
          background: var(--ivory);
          border-radius: 0 0 22px 22px;
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
          color: var(--ink-700);
        }
        .search-suggestion-item:hover { background: var(--blush-400); }
        .search-suggestion-item img { width: 34px; height: 34px; border-radius: 8px; object-fit: cover; flex: 0 0 auto; }
        .search-suggestion-name { flex: 1; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .search-suggestion-price { font-size: 12px; color: var(--ink-400); flex: 0 0 auto; }
        .search-see-all {
          background: none;
          border: none;
          text-align: left;
          padding: 10px;
          font-size: 12.5px;
          color: var(--maroon-900);
          font-weight: 600;
        }
        .search-no-results { padding: 10px; font-size: 12.5px; color: var(--ink-400); margin: 0; }

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
          background: var(--ivory);
          border-radius: 18px;
          box-shadow: 0 18px 40px rgba(36,26,23,0.22);
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
          color: var(--ink-900);
          transition: background 0.15s ease, color 0.15s ease;
        }
        .popover-link:hover { background: var(--blush-400); }
        .popover-link.active { color: var(--maroon-900); font-weight: 600; background: var(--stone-200); }

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
          .navbar { margin: 0 12px 0; }
          .navbar-inner { height: 62px; }
          .brand-logo { height: 28px; }
          .desktop-nav { display: none; }
          .nav-toggle { display: flex; }
          .icon-btn { width: 34px; height: 34px; }
          .icon-btn svg { width: 19px; height: 19px; }
          .nav-popover { left: 6px; min-width: 220px; }
          .search-bar { margin: 8px 12px 0; border-radius: 18px; }
        }
      `})]})}var mr=[{to:`/products`,label:`Shop`,icon:(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`path`,{d:`M4 6h2l1.6 10.2a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L20 8H6.5`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,L.jsx)(`path`,{d:`M9 6a3 3 0 0 1 6 0`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})},{to:`/orders`,label:`Orders`,icon:(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`rect`,{x:`4.5`,y:`4`,width:`15`,height:`17`,rx:`2`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,L.jsx)(`path`,{d:`M8 9h8M8 13h8M8 17h5`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})},{to:`/cart`,label:`Cart`,icon:(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`path`,{d:`M4 6h2l1.6 10.2a2 2 0 0 0 2 1.7h7.4a2 2 0 0 0 2-1.6L20 8H6.5`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,L.jsx)(`circle`,{cx:`10`,cy:`21`,r:`1.3`,fill:`currentColor`}),(0,L.jsx)(`circle`,{cx:`17`,cy:`21`,r:`1.3`,fill:`currentColor`})]})},{to:`/profile`,label:`Profile`,icon:(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`circle`,{cx:`12`,cy:`8`,r:`3.4`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,L.jsx)(`path`,{d:`M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})]})}];function hr(){let{count:e}=rr();return(0,L.jsxs)(`nav`,{className:`bottom-nav`,"aria-label":`Mobile navigation`,children:[(0,L.jsx)(`div`,{className:`bottom-nav-glass`,children:mr.map(t=>(0,L.jsxs)(On,{to:t.to,className:({isActive:e})=>`bottom-nav-link`+(e?` active`:``),children:[(0,L.jsxs)(`span`,{className:`bottom-nav-icon`,children:[t.icon,t.to===`/cart`&&e>0&&(0,L.jsx)(`span`,{className:`bottom-nav-badge`,children:e})]}),(0,L.jsx)(`span`,{className:`bottom-nav-label`,children:t.label})]},t.to))}),(0,L.jsx)(`style`,{children:`
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
      `})]})}var gr={whatsapp:B.contact.whatsapp,facebook:B.contact.facebook,twitter:B.contact.twitter,instagram:B.contact.instagram};function _r(e){let t=(e||``).replace(/[^\d]/g,``);return t?`https://wa.me/${t}`:``}function vr(){let[e,t]=(0,x.useState)(gr),[n,r]=(0,x.useState)(``),[i,a]=(0,x.useState)(!1);(0,x.useEffect)(()=>{z.getHomeSection(`social_links`).then(({section:e})=>{e?.content&&t({...gr,...e.content})}).catch(()=>{})},[]);let o=_r(e.whatsapp||B.contact.whatsapp);function s(e){e.preventDefault(),n.trim()&&(a(!0),r(``))}return(0,L.jsxs)(`footer`,{className:`site-footer`,children:[(0,L.jsxs)(`div`,{className:`container footer-grid`,children:[(0,L.jsxs)(`div`,{className:`footer-brand`,children:[(0,L.jsx)(I,{to:`/`,className:`footer-logo-link`,children:(0,L.jsx)(`img`,{src:B.assets.logoWhite,alt:B.name,className:`footer-logo`,width:`140`,height:`42`})}),(0,L.jsx)(`p`,{className:`footer-desc`,children:B.description}),(0,L.jsxs)(`div`,{className:`social-links`,children:[e.instagram&&(0,L.jsx)(`a`,{href:e.instagram,target:`_blank`,rel:`noreferrer`,"aria-label":`${B.name} on Instagram`,className:`social-link`,children:(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`5`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,L.jsx)(`circle`,{cx:`12`,cy:`12`,r:`4.2`,stroke:`currentColor`,strokeWidth:`1.6`}),(0,L.jsx)(`circle`,{cx:`17.3`,cy:`6.7`,r:`1.1`,fill:`currentColor`})]})}),o&&(0,L.jsx)(`a`,{href:o,target:`_blank`,rel:`noreferrer`,"aria-label":`Chat with ${B.name} on WhatsApp`,className:`social-link`,children:(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`path`,{d:`M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z`,stroke:`currentColor`,strokeWidth:`1.5`}),(0,L.jsx)(`path`,{d:`M8.5 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.5-.1 1.4-.6 1.8-.6.5-1.6.8-2.6.5-1.8-.5-3.7-1.6-5.1-3.1-1.3-1.3-2.1-2.7-2.4-3.4-.3-.7-.4-1.7.2-2.4z`,fill:`currentColor`})]})}),e.facebook&&(0,L.jsx)(`a`,{href:e.facebook,target:`_blank`,rel:`noreferrer`,"aria-label":`${B.name} on Facebook`,className:`social-link`,children:(0,L.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,L.jsx)(`path`,{d:`M15.5 8.5h-2a1 1 0 0 0-1 1V12h3l-.4 3h-2.6v7h-3v-7H8v-3h2.5V9.2c0-2.3 1.4-3.7 3.6-3.7h1.9v3z`,fill:`currentColor`})})}),e.twitter&&(0,L.jsx)(`a`,{href:e.twitter,target:`_blank`,rel:`noreferrer`,"aria-label":`${B.name} on Twitter / X`,className:`social-link`,children:(0,L.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:(0,L.jsx)(`path`,{d:`M4 4l7.2 9.4L4.4 20H6l6-6.4 4.5 6.4H20l-7.5-9.9L19 4h-1.6l-5.5 5.9L8 4H4z`,fill:`currentColor`})})})]})]}),(0,L.jsxs)(`div`,{className:`footer-col`,children:[(0,L.jsx)(`h4`,{children:`Shop`}),(0,L.jsx)(I,{to:`/products`,children:`Sarees`}),(0,L.jsx)(I,{to:`/products?sort=newest`,children:`New Arrivals`}),(0,L.jsx)(I,{to:`/#collections`,children:`Collections`}),(0,L.jsx)(I,{to:`/products`,children:`Best Sellers`})]}),(0,L.jsxs)(`div`,{className:`footer-col`,children:[(0,L.jsx)(`h4`,{children:`Information`}),(0,L.jsx)(I,{to:`/about`,children:`About Us`}),(0,L.jsx)(I,{to:`/contact`,children:`Contact Us`}),(0,L.jsx)(I,{to:`/orders`,children:`Orders & Tracking`}),(0,L.jsx)(I,{to:`/about`,children:`Heritage & Craft`})]}),(0,L.jsxs)(`div`,{className:`footer-col footer-col-wide`,children:[(0,L.jsx)(`h4`,{children:`Customer Care`}),(0,L.jsxs)(`p`,{className:`contact-item`,children:[(0,L.jsx)(`span`,{className:`contact-label`,children:`Phone:`}),(0,L.jsx)(`a`,{href:`tel:${B.contact.phone.replace(/\s+/g,``)}`,children:B.contact.phone})]}),(0,L.jsxs)(`p`,{className:`contact-item`,children:[(0,L.jsx)(`span`,{className:`contact-label`,children:`Email:`}),(0,L.jsx)(`a`,{href:`mailto:${B.contact.email}`,children:B.contact.email})]}),(0,L.jsx)(`p`,{className:`contact-item addr`,children:B.contact.address}),(0,L.jsxs)(`div`,{className:`newsletter-box`,children:[(0,L.jsx)(`h5`,{children:`Join Our Inner Circle`}),(0,L.jsx)(`p`,{className:`newsletter-sub`,children:`Receive exclusive previews of new handloom drops and festive collections.`}),i?(0,L.jsx)(`p`,{className:`newsletter-success`,children:`Thank you for subscribing to Sri Kala updates.`}):(0,L.jsxs)(`form`,{className:`newsletter-form`,onSubmit:s,children:[(0,L.jsx)(`input`,{type:`email`,required:!0,placeholder:`Enter your email`,value:n,onChange:e=>r(e.target.value),"aria-label":`Email for newsletter`}),(0,L.jsx)(`button`,{type:`submit`,className:`newsletter-btn`,children:`Subscribe`})]})]})]})]}),(0,L.jsxs)(`div`,{className:`container footer-bottom`,children:[(0,L.jsxs)(`span`,{children:[`© `,new Date().getFullYear(),` `,B.legalName,`. All rights reserved.`]}),(0,L.jsx)(`div`,{className:`footer-bottom-links`,children:(0,L.jsx)(`span`,{children:`Handcrafted with devotion`})})]}),(0,L.jsx)(`style`,{children:`
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
          height: 38px;
          width: auto;
          display: block;
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

        .newsletter-box {
          margin-top: 22px;
          padding: 16px 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(197, 139, 56, 0.2);
          border-radius: var(--radius-md);
        }
        .newsletter-box h5 {
          margin: 0 0 6px;
          font-family: var(--font-display);
          font-size: 15px;
          color: var(--brand-gold-light);
          font-weight: 400;
        }
        .newsletter-sub {
          font-size: 12px;
          line-height: 1.5;
          color: var(--blush-300);
          opacity: 0.75;
          margin: 0 0 12px;
        }
        .newsletter-form {
          display: flex;
          gap: 8px;
        }
        .newsletter-form input {
          flex: 1;
          padding: 9px 12px;
          font-size: 13px;
          font-family: var(--font-body);
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(197, 139, 56, 0.3);
          border-radius: var(--radius-sm);
          color: #ffffff;
          outline: none;
        }
        .newsletter-form input:focus {
          border-color: var(--brand-gold-light);
        }
        .newsletter-btn {
          padding: 9px 16px;
          font-size: 12.5px;
          font-weight: 600;
          background: var(--brand-secondary);
          color: #ffffff;
          border: none;
          border-radius: var(--radius-sm);
          transition: background 0.2s ease;
        }
        .newsletter-btn:hover {
          background: var(--brand-accent);
        }
        .newsletter-success {
          font-size: 12.5px;
          color: var(--brand-gold-light);
          margin: 0;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 32px;
          font-size: 12.5px;
          opacity: 0.7;
        }
        @media (max-width: 980px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
        }
      `})]})}function yr(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function br(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var xr={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},Sr={duration:.5,overwrite:!1,delay:0},Cr,wr,Tr,Er=1e8,Dr=1/Er,Or=Math.PI*2,kr=Or/4,Ar=0,jr=Math.sqrt,Mr=Math.cos,Nr=Math.sin,Pr=function(e){return typeof e==`string`},Fr=function(e){return typeof e==`function`},Ir=function(e){return typeof e==`number`},Lr=function(e){return e===void 0},Rr=function(e){return typeof e==`object`},zr=function(e){return e!==!1},Br=function(){return typeof window<`u`},Vr=function(e){return Fr(e)||Pr(e)},Hr=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},Ur=Array.isArray,Wr=/random\([^)]+\)/g,Gr=/,\s*/g,Kr=/(?:-?\.?\d|\.)+/gi,qr=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Jr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Yr=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Xr=/[+-]=-?[.\d]+/,Zr=/[^,'"\[\]\s]+/gi,Qr=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,$r,ei,ti,ni,ri={},ii={},ai,oi=function(e){return(ii=Li(e,ri))&&$o},si=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},ci=function(e,t){return!t&&console.warn(e)},li=function(e,t){return e&&(ri[e]=t)&&ii&&(ii[e]=t)||ri},ui=function(){return 0},di={suppressEvents:!0,isStart:!0,kill:!1},fi={suppressEvents:!0,kill:!1},pi={suppressEvents:!0},mi={},hi=[],gi={},_i,vi={},yi={},bi=30,xi=[],Si=``,Ci=function(e){var t=e[0],n,r;if(Rr(t)||Fr(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=xi.length;r--&&!xi[r].targetTest(t););n=xi[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new G(e[r],n)))||e.splice(r,1);return e},wi=function(e){return e._gsap||Ci(ba(e))[0]._gsap},Ti=function(e,t,n){return(n=e[t])&&Fr(n)?e[t]():Lr(n)&&e.getAttribute&&e.getAttribute(t)||n},Ei=function(e,t){return(e=e.split(`,`)).forEach(t)||e},Di=function(e){return Math.round(e*1e5)/1e5||0},Oi=function(e){return Math.round(e*1e7)/1e7||0},ki=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},Ai=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},ji=function(){var e=hi.length,t=hi.slice(0),n,r;for(gi={},hi.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Mi=function(e){return!!(e._initted||e._startAt||e.add)},V=function(e,t,n,r){hi.length&&!wr&&ji(),e.render(t,n,r||!!(wr&&t<0&&Mi(e))),hi.length&&!wr&&ji()},Ni=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(Zr).length<2?t:Pr(e)?e.trim():e},Pi=function(e){return e},Fi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ii=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},Li=function(e,t){for(var n in t)e[n]=t[n];return e},Ri=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=Rr(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},zi=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Bi=function(e){var t=e.parent||$r,n=e.keyframes?Ii(Ur(e.keyframes)):Fi;if(zr(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Vi=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Hi=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Ui=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},Wi=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Gi=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Ki=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},qi=function(e,t,n,r){return e._startAt&&(wr?e._startAt.revert(fi):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Ji=function e(t){return!t||t._ts&&e(t.parent)},Yi=function(e){return e._repeat?Xi(e._tTime,e=e.duration()+e._rDelay)*e:0},Xi=function(e,t){var n=Math.floor(e=Oi(e/t));return e&&n===e?n-1:n},Zi=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Qi=function(e){return e._end=Oi(e._start+(e._tDur/Math.abs(e._ts||e._rts||Dr)||0))},$i=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Oi(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Qi(e),n._dirty||Gi(n,e)),e},ea=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Zi(e.rawTime(),t),(!t._dur||ma(0,t.totalDuration(),n)-t._tTime>Dr)&&t.render(n,!0)),Gi(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Dr}},ta=function(e,t,n,r){return t.parent&&Wi(t),t._start=Oi((Ir(n)?n:n||e!==$r?da(e,n,t):e._time)+t._delay),t._end=Oi(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Hi(e,t,`_first`,`_last`,e._sort?`_start`:0),aa(t)||(e._recent=t),r||ea(e,t),e._ts<0&&$i(e,e._tTime),e},na=function(e,t){return(ri.ScrollTrigger||si(`scrollTrigger`,t))&&ri.ScrollTrigger.create(t,e)},ra=function(e,t,n,r,i){if(vo(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!wr&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&_i!==Za.frame)return hi.push(e),e._lazy=[i,r],1},ia=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},aa=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},oa=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&ia(e)&&!(!e._initted&&aa(e))||(e._ts<0||e._dp._ts<0)&&!aa(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=ma(0,e._tDur,t),l=Xi(s,o),e._yoyo&&l&1&&(a=1-a),l!==Xi(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||wr||r||e._zTime===Dr||!t&&e._zTime){if(!e._initted&&ra(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?Dr:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&qi(e,t,n,!0),e._onUpdate&&!n&&La(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&La(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Wi(e,1),!n&&!wr&&(La(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},sa=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},ca=function(e,t,n,r){var i=e._repeat,a=Oi(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:Oi(a*(i+1)+e._rDelay*i):a,o>0&&!r&&$i(e,e._tTime=e._tDur*o),e.parent&&Qi(e),n||Gi(e.parent,e),e},la=function(e){return e instanceof uo?Gi(e):ca(e,e._dur)},ua={_start:0,endTime:ui,totalDuration:ui},da=function e(t,n,r){var i=t.labels,a=t._recent||ua,o=t.duration()>=Er?a.endTime(!1):t._dur,s,c,l;return Pr(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(Ur(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},fa=function(e,t,n){var r=Ir(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=zr(s.vars.inherit)&&s.parent;a.immediateRender=zr(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new To(t[0],a,t[i+1])},pa=function(e,t){return e||e===0?t(e):t},ma=function(e,t,n){return n<e?e:n>t?t:n},ha=function(e,t){return!Pr(e)||!(t=Qr.exec(e))?``:t[1]},ga=function(e,t,n){return pa(n,function(n){return ma(e,t,n)})},_a=[].slice,va=function(e,t){return e&&Rr(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&Rr(e[0]))&&!e.nodeType&&e!==ei},ya=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return Pr(e)&&!t||va(e,1)?(r=n).push.apply(r,ba(e)):n.push(e)})||n},ba=function(e,t,n){return Tr&&!t&&Tr.selector?Tr.selector(e):Pr(e)&&!n&&(ti||!Qa())?_a.call((t||ni).querySelectorAll(e),0):Ur(e)?ya(e,n):va(e)?_a.call(e,0):e?[e]:[]},xa=function(e){return e=ba(e)[0]||ci(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return ba(t,n.querySelectorAll?n:n===e?ci(`Invalid scope`)||ni.createElement(`div`):e)}},Sa=function(e){return e.sort(function(){return .5-Math.random()})},Ca=function(e){if(Fr(e))return e;var t=Rr(e)?e:{each:e},n=ao(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return Pr(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,Er])[1],!S){for(b=-Er;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===Er?0:s?f*u/S-.5:r/S|0,b=0,x=Er,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):jr(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&Sa(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=ha(t.amount||t.each)||0,n=n&&f<0?io(n):n}return f=(p[e]-p.min)/p.max||0,Oi(p.b+(n?n(f):f)*p.v)+p.u}},wa=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=Oi(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Ir(n)?0:ha(n))}},Ta=function(e,t){var n=Ur(e),r,i;return!n&&Rr(e)&&(r=n=e.radius||Er,e.values?(e=ba(e.values),(i=!Ir(e[0]))&&(r*=r)):e=wa(e.increment)),pa(t,n?Fr(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=Er,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||Ir(t)?s:s+ha(t)}:wa(e))},Ea=function(e,t,n,r){return pa(Ur(e)?!t:n===!0?!!(n=0):!r,function(){return Ur(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},Da=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},Oa=function(e,t){return function(n){return e(parseFloat(n))+(t||ha(n))}},ka=function(e,t,n){return Pa(e,t,0,1,n)},Aa=function(e,t,n){return pa(n,function(n){return e[~~t(n)]})},ja=function e(t,n,r){var i=n-t;return Ur(t)?Aa(t,e(0,t.length),n):pa(r,function(e){return(i+(e-t)%i)%i+t})},Ma=function e(t,n,r){var i=n-t,a=i*2;return Ur(t)?Aa(t,e(0,t.length-1),n):pa(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},Na=function(e){return e.replace(Wr,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(Gr);return Ea(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},Pa=function(e,t,n,r,i){var a=t-e,o=r-n;return pa(i,function(t){return n+((t-e)/a*o||0)})},Fa=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=Pr(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(Ur(t)&&!Ur(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=Li(Ur(t)?[]:{},t));if(!u){for(c in n)po.call(s,t,c,`get`,n[c]);a=function(e){return Po(e,s)||(o?t.p:t)}}}return pa(r,a)},Ia=function(e,t,n){var r=e.labels,i=Er,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},La=function(e,t,n){var r=e.vars,i=r[t],a=Tr,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&hi.length&&ji(),o&&(Tr=o),l=s?i.apply(c,s):i.call(c),Tr=a,l},Ra=function(e){return Wi(e),e.scrollTrigger&&e.scrollTrigger.kill(!!wr),e.progress()<1&&La(e,`onInterrupt`),e},za,Ba=[],Va=function(e){if(e){if(e=!e.name&&e.default||e,Br()||e.headless){var t=e.name,n=Fr(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:ui,render:Po,add:po,kill:Io,modifier:Fo,rawVars:0},a={targetTest:0,get:0,getSetter:Ao,aliases:{},register:0};if(Qa(),e!==r){if(vi[t])return;Fi(r,Fi(zi(e,i),a)),Li(r.prototype,Li(i,zi(e,a))),vi[r.prop=t]=r,e.targetTest&&(xi.push(r),mi[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}li(t,r),e.register&&e.register($o,r,zo)}else Ba.push(e)}},H=255,Ha={aqua:[0,H,H],lime:[0,H,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,H],navy:[0,0,128],white:[H,H,H],olive:[128,128,0],yellow:[H,H,0],orange:[H,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[H,0,0],pink:[H,192,203],cyan:[0,H,H],transparent:[H,H,H,0]},Ua=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*H+.5|0},Wa=function(e,t,n){var r=e?Ir(e)?[e>>16,e>>8&H,e&H]:0:Ha.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Ha[e])r=Ha[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&H,r&H,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&H,e&H]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(Kr),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=Ua(s+1/3,i,a),r[1]=Ua(s,i,a),r[2]=Ua(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(qr),n&&r.length<4&&(r[3]=1),r}else r=e.match(Kr)||Ha.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/H,a=r[1]/H,o=r[2]/H,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},Ga=function(e){var t=[],n=[],r=-1;return e.split(qa).forEach(function(e){var i=e.match(Jr)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},Ka=function(e,t,n){var r=``,i=(e+r).match(qa),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=Wa(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=Ga(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(qa,`1`).split(Jr),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(qa),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},qa=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Ha)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),Ja=/hsl[a]?\(/,Ya=function(e){var t=e.join(` `),n;if(qa.lastIndex=0,qa.test(t))return n=Ja.test(t),e[1]=Ka(e[1],n),e[0]=Ka(e[0],n,Ga(e[1])),!0},Xa,Za=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){ai&&(!ti&&Br()&&(ei=ti=window,ni=ei.document||{},ri.gsap=$o,(ei.gsapVersions||(ei.gsapVersions=[])).push($o.version),oi(ii||ei.GreenSockGlobals||!ei.gsap&&ei||{}),Ba.forEach(Va)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},Xa=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Xa=0,l=ui},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),Qa(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),Qa=function(){return!Xa&&Za.wake()},U={},$a=/^[\d.\-M][\d.\-,\s]/,eo=/["']/g,to=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(eo,``).trim():+c,r=s.substr(o+1).trim();return t},no=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},ro=function(e){var t=(e+``).split(`(`),n=U[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[to(t[1])]:no(e).split(`,`).map(Ni)):U._CE&&$a.test(e)?U._CE(``,e):n},io=function(e){return function(t){return 1-e(1-t)}},ao=function(e,t){return e&&(Fr(e)?e:U[e]||ro(e))||t},oo=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return Ei(e,function(e){for(var t in U[e]=ri[e]=i,U[a=e.toLowerCase()]=n,i)U[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=U[e+`.`+t]=i[t]}),i},so=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},co=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/Or*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*Nr((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:so(s);return a=Or/a,c.config=function(n,r){return e(t,n,r)},c},W=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:so(r);return i.config=function(n){return e(t,n)},i};Ei(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;oo(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),U.Linear.easeNone=U.none=U.Linear.easeIn,oo(`Elastic`,co(`in`),co(`out`),co()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};oo(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),oo(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),oo(`Circ`,function(e){return-(jr(1-e*e)-1)}),oo(`Sine`,function(e){return e===1?1:-Mr(e*kr)+1}),oo(`Back`,W(`in`),W(`out`),W()),U.SteppedEase=U.steps=ri.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-Dr;return function(e){return((r*ma(0,a,e)|0)+i)*n}}},Sr.ease=U[`quad.out`],Ei(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return Si+=e+`,`+e+`Params,`});var G=function(e,t){this.id=Ar++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Ti,this.set=t?t.getSetter:Ao},lo=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,ca(this,+e.duration,1,1),this.data=e.data,Tr&&(this._ctx=Tr,Tr.data.push(this)),Xa||Za.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,ca(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Qa(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for($i(this,e),!n._dp||n.parent||ea(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&ta(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===Dr||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),V(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Yi(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Yi(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Xi(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-Dr?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?Zi(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-Dr?0:this._rts,this.totalTime(ma(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),Qi(this),Ki(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Qa(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Dr&&(this._tTime-=Dr)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=Oi(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&ta(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(zr(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Zi(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=pi);var t=wr;return wr=e,Mi(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),wr=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,la(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,la(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(da(this,e),zr(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,zr(t)),this._dur||(this._zTime=-Dr),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-Dr:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Dr,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-Dr)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=Fr(e)?e:Pi,a=function(){var e=t.then;t.then=null,n&&n(),Fr(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){Ra(this)},e}();Fi(lo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Dr,_prom:0,_ps:!1,_rts:1});var uo=function(e){br(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=zr(t.sortChildren),$r&&ta(t.parent||$r,yr(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&na(yr(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return fa(0,arguments,this),this},n.from=function(e,t,n){return fa(1,arguments,this),this},n.fromTo=function(e,t,n,r){return fa(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,Bi(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new To(e,t,da(this,n),1),this},n.call=function(e,t,n){return ta(this,To.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new To(e,n,da(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,Bi(n).immediateRender=zr(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,Bi(r).immediateRender=zr(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:Oi(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==$r&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=Oi(o%f),o===i?(d=this._repeat,c=a):(_=Oi(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=Xi(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:Oi(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&La(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=sa(this,Oi(r),Oi(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(La(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-Dr);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||wr&&Mi(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-Dr:Dr);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-Dr)._zTime=c>=r?1:-1,this._ts))return this._start=g,Qi(this),this.render(e,t,n);this._onUpdate&&!t&&La(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&Wi(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(La(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(Ir(t)||(t=da(this,t,e)),!(e instanceof lo)){if(Ur(e))return e.forEach(function(e){return n.add(e,t)}),this;if(Pr(e))return this.addLabel(e,t);if(Fr(e))e=To.delayedCall(0,e);else return this}return this===e?this:ta(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-Er);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof To?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return Pr(e)?this.removeLabel(e):Fr(e)?this.killTweensOf(e):(e.parent===this&&Ui(this,e),e===this._recent&&(this._recent=this._last),Gi(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Oi(Za.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=da(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=To.delayedCall(0,t||ui,n);return r.data=`isPause`,this._hasPause=1,ta(this,r,da(this,e))},n.removePause=function(e){var t=this._first;for(e=da(this,e);t;)t._start===e&&t.data===`isPause`&&Wi(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)go!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=ba(e),i=this._first,a=Ir(t),o;i;)i instanceof To?Ai(i._targets,r)&&(a?(!go||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=da(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=To.to(n,Fi({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||Dr,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&ca(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,Fi({startAt:{time:da(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),Ia(this,da(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),Ia(this,da(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+Dr)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=Oi(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return Gi(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),Gi(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=Er,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,ta(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=Oi(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;ca(n,n===$r&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if($r._ts&&(V($r,Zi(e,$r)),_i=Za.frame),Za.frame>=bi){bi+=xr.autoSleep||120;var t=$r._first;if((!t||!t._ts)&&xr.autoSleep&&Za._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||Za.sleep()}}},t}(lo);Fi(uo.prototype,{_lock:0,_hasPause:0,_forcing:0});var fo=function(e,t,n,r,i,a,o){var s=new zo(this._pt,e,t,0,1,No,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=Na(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(Yr)||[];u=Yr.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?ki(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=Yr.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(Xr.test(r)||g)&&(s.e=0),this._pt=s,s},po=function(e,t,n,r,i,a,o,s,c,l){Fr(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?Fr(u)?c?e[t.indexOf(`set`)||!Fr(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=Fr(u)?c?Oo:Do:Eo,p;if(Pr(r)&&(~r.indexOf(`random(`)&&(r=Na(r)),r.charAt(1)===`=`&&(p=ki(d,r)+(ha(d)||0),(p||p===0)&&(r=p))),!l||d!==r||_o)return!isNaN(d*r)&&r!==``?(p=new zo(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?Mo:jo,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&si(t,r),fo.call(this,e,t,d,r,f,s||xr.stringFilter,c))},mo=function(e,t,n,r,i){if(Fr(e)&&(e=So(e,i,t,n,r)),!Rr(e)||e.style&&e.nodeType||Ur(e)||Hr(e))return Pr(e)?So(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=So(e[o],i,t,n,r);return a},ho=function(e,t,n,r,i,a){var o,s,c,l;if(vi[e]&&(o=new vi[e]).init(i,o.rawVars?t[e]:mo(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new zo(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==za))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},go,_o,vo=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!Cr,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,O,k,ee,A,j,M,te;if(b&&(!f||!a)&&(a=`none`),t._ease=ao(a,Sr.ease),t._rEase=x&&(ao(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(k=g[0]?wi(g[0]).harness:0,M=k&&i[k.prop],S=zi(i,mi),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?fi:di),h._lazy=0),o){if(Wi(t._startAt=To.set(g,Fi({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&zr(c),startAt:null,delay:0,onUpdate:l&&function(){return La(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(wr||!s&&!p)&&t._startAt.revert(fi),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=Fi({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&zr(c),immediateRender:s,stagger:0,parent:_},S),M&&(w[k.prop]=M),Wi(t._startAt=To.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(wr?t._startAt.revert(fi):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,Dr,Dr);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&zr(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],O=E._gsap||Ci(g)[C]._gsap,t._ptLookup[C]=A={},gi[O.id]&&hi.length&&ji(),j=v===g?C:v.indexOf(E),k&&(ee=new k).init(E,M||S,t,j,v)!==!1&&(t._pt=T=new zo(t._pt,E,ee.name,0,1,ee.render,ee,0,ee.priority),ee._props.forEach(function(e){A[e]=T}),ee.priority&&(D=1)),!k||M)for(w in S)vi[w]&&(ee=ho(w,S,t,j,E,v))?ee.priority&&(D=1):A[w]=T=po.call(t,E,w,`get`,S[w],j,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(go=t,$r.killTweensOf(E,A,t.globalTime(n)),te=!t.parent,go=0),t._pt&&c&&(gi[O.id]=1)}D&&Ro(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!te,f&&n<=0&&b.render(Er,!0,!0)},yo=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return _o=1,e.vars[t]=`+=0`,vo(e,o),_o=0,s?ci(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=Di(n)+ha(u.e)),u.b&&(u.b=l.s+ha(u.b))},bo=function(e,t){var n=e[0]?wi(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=Li({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},xo=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(Ur(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},So=function(e,t,n,r,i){return Fr(e)?e.call(t,n,r,i):Pr(e)&&~e.indexOf(`random(`)?Na(e):e},Co=Si+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,wo={};Ei(Co+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return wo[e]=1});var To=function(e){br(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:Bi(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||$r,g=(Ur(t)||Hr(t)?Ir(t[0]):`length`in n)?[t]:ba(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?Ci(g):ci(`GSAP target `+t+` not found. https://gsap.com`,!xr.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||Vr(s)||Vr(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new uo({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=yr(a),_._start=0,u||Vr(s)||Vr(c)){if(b=g.length,C=u&&Ca(u),Rr(u))for(x in u)~Co.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=zi(n,wo),y.stagger=0,T&&(y.easeReverse=T),w&&Li(y,w),S=g[v],y.duration=+So(s,yr(a),v,S,g),y.delay=(+So(c,yr(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=U.none;_.duration()?s=c=0:a.timeline=0}else if(f){Bi(Fi(_.vars.defaults,{ease:`none`})),_._ease=ao(f.ease||n.ease||`none`);var E=0,D,O,k;if(Ur(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||xo(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)O=D[v],k={ease:O.e,duration:(O.t-(v?D[v-1].t:0))/100*s},k[x]=O.v,_.to(g,k,E),E+=k.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!Cr&&(go=yr(a),$r.killTweensOf(g),go=0),ta(h,yr(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===Oi(h._time)&&zr(l)&&Ji(yr(a))&&h.data!==`nested`)&&(a._tTime=-Dr,a.render(Math.max(0,-c)||0)),m&&na(yr(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-Dr&&!o?i:e<Dr?0:e,c,l,u,d,f,p,m,h;if(!a)oa(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=Oi(s%d),s===i?(u=this._repeat,c=a):(f=Oi(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=Xi(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(Oi(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(ra(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(La(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&qi(this,e,t,n),La(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&La(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&qi(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&Wi(this,1),!t&&!(o&&!r)&&(s||r||p)&&(La(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){Xa||Za.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||vo(this,a),o=this._ease(a/this._dur),yo(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):($i(this,0),this.parent||Hi(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?Ra(this):this.scrollTrigger&&this.scrollTrigger.kill(!!wr),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,go&&go.vars.overwrite!==!0)._first||Ra(this),this.parent&&n!==this.timeline.totalDuration()&&ca(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?ba(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&Vi(r,i))return t===`all`&&(this._pt=0),Ra(this);for(s=this._op=this._op||[],t!==`all`&&(Pr(t)&&(d={},Ei(t,function(e){return d[e]=1}),t=d),t=bo(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&Ui(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&Ra(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return fa(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return fa(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return $r.killTweensOf(e,t,n)},t}(lo);Fi(To.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),Ei(`staggerTo,staggerFrom,staggerFromTo`,function(e){To[e]=function(){var t=new uo,n=_a.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var Eo=function(e,t,n){return e[t]=n},Do=function(e,t,n){return e[t](n)},Oo=function(e,t,n,r){return e[t](r.fp,n)},ko=function(e,t,n){return e.setAttribute(t,n)},Ao=function(e,t){return Fr(e[t])?Do:Lr(e[t])&&e.setAttribute?ko:Eo},jo=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Mo=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},No=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Po=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Fo=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},Io=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Ui(this,t,`_pt`):t.dep||(n=1),t=r;return!n},Lo=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Ro=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},zo=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||jo,this.d=o||this,this.set=s||Eo,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=Lo,this.m=e,this.mt=n,this.tween=t},e}();Ei(Si+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return mi[e]=1}),ri.TweenMax=ri.TweenLite=To,ri.TimelineLite=ri.TimelineMax=uo,$r=new uo({sortChildren:!1,defaults:Sr,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),xr.stringFilter=Ya;var Bo=[],Vo={},Ho=[],Uo=0,Wo=0,Go=function(e){return(Vo[e]||Ho).map(function(e){return e()})},Ko=function(){var e=Date.now(),t=[];e-Uo>2&&(Go(`matchMediaInit`),Bo.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=ei.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),Go(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Uo=e,Go(`matchMedia`))},qo=function(){function e(e,t){this.selector=t&&xa(t),this.data=[],this._r=[],this.isReverted=!1,this.id=Wo++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){Fr(e)&&(n=t,t=e,e=Fr);var r=this,i=function(){var e=Tr,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=xa(n)),Tr=r,a=t.apply(r,arguments),Fr(a)&&r._r.push(a),Tr=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===Fr?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=Tr;Tr=null,e(this),Tr=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof To&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof uo?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof To)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=Bo.length;r--;)Bo[r].id===this.id&&Bo.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),Jo=function(){function e(e){this.contexts=[],this.scope=e,Tr&&Tr.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){Rr(e)||(e={matches:e});var r=new qo(0,n||this.scope),i=r.conditions={},a,o,s;for(o in Tr&&!r.selector&&(r.selector=Tr.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=ei.matchMedia(e[o]),a&&(Bo.indexOf(r)<0&&Bo.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(Ko):a.addEventListener(`change`,Ko)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),Yo={registerPlugin:function(){[...arguments].forEach(function(e){return Va(e)})},timeline:function(e){return new uo(e)},getTweensOf:function(e,t){return $r.getTweensOf(e,t)},getProperty:function(e,t,n,r){Pr(e)&&(e=ba(e)[0]);var i=wi(e||{}).get,a=n?Pi:Ni;return n===`native`&&(n=``),e&&(t?a((vi[t]&&vi[t].get||i)(e,t,n,r)):function(t,n,r){return a((vi[t]&&vi[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=ba(e),e.length>1){var r=e.map(function(e){return $o.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=vi[t],o=wi(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;za._pt=0,r.init(e,n?t+n:t,za,0,[e]),r.render(1,r),za._pt&&Po(1,za)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=$o.to(e,Fi((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return $r.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ao(e.ease,Sr.ease)),Ri(Sr,e||{})},config:function(e){return Ri(xr,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!vi[e]&&!ri[e]&&ci(t+` effect requires `+e+` plugin.`)}),yi[t]=function(e,t,r){return n(ba(e),Fi(t||{},i),r)},a&&(uo.prototype[t]=function(e,n,r){return this.add(yi[t](e,Rr(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){U[e]=ao(t)},parseEase:function(e,t){return arguments.length?ao(e,t):U},getById:function(e){return $r.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new uo(e),r,i;for(n.smoothChildTiming=zr(e.smoothChildTiming),$r.remove(n),n._dp=0,n._time=n._tTime=$r._time,r=$r._first;r;)i=r._next,(t||!(!r._dur&&r instanceof To&&r.vars.onComplete===r._targets[0]))&&ta(n,r,r._start-r._delay),r=i;return ta($r,n,0),n},context:function(e,t){return e?new qo(e,t):Tr},matchMedia:function(e){return new Jo(e)},matchMediaRefresh:function(){return Bo.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Ko()},addEventListener:function(e,t){var n=Vo[e]||(Vo[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Vo[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:ja,wrapYoyo:Ma,distribute:Ca,random:Ea,snap:Ta,normalize:ka,getUnit:ha,clamp:ga,splitColor:Wa,toArray:ba,selector:xa,mapRange:Pa,pipe:Da,unitize:Oa,interpolate:Fa,shuffle:Sa},install:oi,effects:yi,ticker:Za,updateRoot:uo.updateRoot,plugins:vi,globalTimeline:$r,core:{PropTween:zo,globals:li,Tween:To,Timeline:uo,Animation:lo,getCache:wi,_removeLinkedListItem:Ui,reverting:function(){return wr},context:function(e){return e&&Tr&&(Tr.data.push(e),e._ctx=Tr),Tr},suppressOverwrites:function(e){return Cr=e}}};Ei(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return Yo[e]=To[e]}),Za.add(uo.updateRoot),za=Yo.to({},{duration:0});var Xo=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Zo=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=Xo(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},Qo=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(Pr(n)&&(r={},Ei(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}Zo(e,n)}}}},$o=Yo.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)wr?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Qo(`roundProps`,wa),Qo(`modifiers`),Qo(`snap`,Ta))||Yo;To.version=uo.version=$o.version=`3.15.0`,ai=1,Br()&&Qa(),U.Power0,U.Power1,U.Power2,U.Power3,U.Power4,U.Linear,U.Quad,U.Cubic,U.Quart,U.Quint,U.Strong,U.Elastic,U.Back,U.SteppedEase,U.Bounce,U.Sine,U.Expo,U.Circ;var es,ts,ns,rs,is,as,os,ss=function(){return typeof window<`u`},cs={},ls=180/Math.PI,us=Math.PI/180,ds=Math.atan2,fs=1e8,ps=/([A-Z])/g,ms=/(left|right|width|margin|padding|x)/i,hs=/[\s,\(]\S/,gs={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},_s=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},vs=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ys=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},bs=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},xs=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Ss=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Cs=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},ws=function(e,t,n){return e.style[t]=n},Ts=function(e,t,n){return e.style.setProperty(t,n)},Es=function(e,t,n){return e._gsap[t]=n},Ds=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Os=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},ks=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},As=`transform`,js=As+`Origin`,Ms=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in cs&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=gs[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=Zs(i,e)}):this.tfm[t]=o.x?o[t]:Zs(i,t),t===js&&(this.tfm.zOrigin=o.zOrigin);else return gs.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(As)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(js,n,``)),t=As}(a||n)&&this.props.push(t,n,a[t])},Ns=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},Ps=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,i,a;for(i=0;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(ps,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=os(),(!i||!i.isStart)&&!n[As]&&(Ns(n),r.zOrigin&&n[js]&&(n[js]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Fs=function(e,t){var n={target:e,props:[],revert:Ps,save:Ms};return e._gsap||$o.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},Is,Ls=function(e,t){var n=ts.createElementNS?ts.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):ts.createElement(e);return n&&n.style?n:ts.createElement(e)},Rs=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(ps,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,Bs(n)||n,1)||``},zs=`O,Moz,ms,Ms,Webkit`.split(`,`),Bs=function(e,t,n){var r=(t||is).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(zs[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?zs[i]:``)+e},Vs=function(){ss()&&window.document&&(es=window,ts=es.document,ns=ts.documentElement,is=Ls(`div`)||{style:{}},Ls(`div`),As=Bs(As),js=As+`Origin`,is.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,Is=!!Bs(`perspective`),os=$o.core.reverting,rs=1)},Hs=function(e){var t=e.ownerSVGElement,n=Ls(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),ns.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),ns.removeChild(n),i},Us=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Ws=function(e){var t,n;try{t=e.getBBox()}catch{t=Hs(e),n=1}return t&&(t.width||t.height)||n||(t=Hs(e)),t&&!t.width&&!t.x&&!t.y?{x:+Us(e,[`x`,`cx`,`x1`])||0,y:+Us(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},Gs=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Ws(e))},Ks=function(e,t){if(t){var n=e.style,r;t in cs&&t!==js&&(t=As),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(ps,`-$1`).toLowerCase())):n.removeAttribute(t)}},qs=function(e,t,n,r,i,a){var o=new zo(e._pt,t,n,0,1,a?Cs:Ss);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},Js={deg:1,rad:1,turn:1},Ys={grid:1,flex:1},Xs=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=is.style,c=ms.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||Js[i]||Js[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&Gs(t),(p||o===`%`)&&(cs[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],Di(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===ts||!h.appendChild)&&(h=ts.body),g=h._gsap,g&&p&&g.width&&c&&g.time===Za.time&&!g.uncache)return Di(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:Ks(t,n)}else(p||o===`%`)&&!Ys[Rs(h,`display`)]&&(s.position=Rs(t,`position`)),h===t&&(s.position=`static`),h.appendChild(is),m=is[u],h.removeChild(is),s.position=`absolute`;return c&&p&&(g=wi(h),g.time=Za.time,g.width=h[u]),Di(f?m*a/d:m&&a?d/m*a:0)},Zs=function(e,t,n,r){var i;return rs||Vs(),t in gs&&t!==`transform`&&(t=gs[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),cs[t]&&t!==`transform`?(i=lc(e,r),i=t===`transformOrigin`?i.svg?i.origin:uc(Rs(e,js))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=nc[t]&&nc[t](e,t,n)||Rs(e,t)||Ti(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?Xs(e,t,i,n)+n:i},Qs=function(e,t,n,r){if(!n||n===`none`){var i=Bs(t,e,1),a=i&&Rs(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=Rs(e,`borderTopColor`))}var o=new zo(this._pt,e.style,t,0,1,No),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=Rs(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=Rs(e,t)||r,m?e.style[t]=m:Ks(e,t)),l=[n,r],Ya(l),n=l[0],r=l[1],d=n.match(Jr)||[],b=r.match(Jr)||[],b.length){for(;u=Jr.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=ki(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=Jr.lastIndex-v.length,v||(v=v||xr.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=Xs(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?Cs:Ss;return Xr.test(r)&&(o.e=0),this._pt=o,o},$s={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},ec=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=$s[n]||n,t[1]=$s[r]||r,t.join(` `)},tc=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],cs[o]&&(s=1,o=o===`transformOrigin`?js:As),Ks(n,o);s&&(Ks(n,As),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,lc(n,1),a.uncache=1,Ns(r)))}},nc={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new zo(e._pt,t,n,0,0,tc);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},rc=[1,0,0,1,0,0],ic={},ac=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},oc=function(e){var t=Rs(e,As);return ac(t)?rc:t.substr(7).match(qr).map(Di)},sc=function(e,t){var n=e._gsap||wi(e),r=e.style,i=oc(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?rc:i):(i===rc&&!e.offsetParent&&e!==ns&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,ns.appendChild(e)),i=oc(e),s?r.display=s:Ks(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):ns.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},cc=function(e,t,n,r,i,a){var o=e._gsap,s=i||sc(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==rc&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=Ws(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[js]=`0px 0px`,a&&(qs(a,o,`xOrigin`,c,y),qs(a,o,`yOrigin`,l,b),qs(a,o,`xOffset`,u,o.xOffset),qs(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},lc=function(e,t){var n=e._gsap||new G(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=Rs(e,js)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,ee,A,j,M,te,ne,N,P,re,ie,ae;return n.svg=!!(e.getCTM&&Gs(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[As]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[As]===`none`?``:s[As])),r.scale=r.rotate=r.translate=`none`),S=sc(e,n.svg),n.svg&&(n.uncache?(M=e.getBBox(),c=n.xOrigin-M.x+`px `+(n.yOrigin-M.y)+`px`,j=``):j=!t&&e.getAttribute(`data-svg-origin`),cc(e,j||c,!!j||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==rc&&(E=S[0],D=S[1],O=S[2],k=S[3],l=ee=S[4],u=A=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(k*k+O*O),m=E||D?ds(D,E)*ls:0,_=O||k?ds(O,k)*ls+m:0,_&&(p*=Math.abs(Math.cos(_*us))),n.svg&&(l-=b-(b*E+x*O),u-=x-(b*D+x*k))):(ae=S[6],re=S[7],ne=S[8],N=S[9],P=S[10],ie=S[11],l=S[12],u=S[13],d=S[14],C=ds(ae,P),h=C*ls,C&&(w=Math.cos(-C),T=Math.sin(-C),j=ee*w+ne*T,M=A*w+N*T,te=ae*w+P*T,ne=ee*-T+ne*w,N=A*-T+N*w,P=ae*-T+P*w,ie=re*-T+ie*w,ee=j,A=M,ae=te),C=ds(-O,P),g=C*ls,C&&(w=Math.cos(-C),T=Math.sin(-C),j=E*w-ne*T,M=D*w-N*T,te=O*w-P*T,ie=k*T+ie*w,E=j,D=M,O=te),C=ds(D,E),m=C*ls,C&&(w=Math.cos(C),T=Math.sin(C),j=E*w+D*T,M=ee*w+A*T,D=D*w-E*T,A=A*w-ee*T,E=j,ee=M),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=Di(Math.sqrt(E*E+D*D+O*O)),p=Di(Math.sqrt(A*A+ae*ae)),C=ds(ee,A),_=Math.abs(C)>2e-4?C*ls:0,y=ie?1/(ie<0?-ie:ie):0),n.svg&&(j=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!ac(Rs(e,As)),j&&e.setAttribute(`transform`,j))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=Di(f),n.scaleY=Di(p),n.rotation=Di(m)+o,n.rotationX=Di(h)+o,n.rotationY=Di(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[js]=uc(c)),n.xOffset=n.yOffset=0,n.force3D=xr.force3D,n.renderTransform=n.svg?_c:Is?gc:fc,n.uncache=0,n},uc=function(e){return(e=e.split(` `))[0]+` `+e[1]},dc=function(e,t,n){var r=ha(t);return Di(parseFloat(t)+parseFloat(Xs(e,`x`,n+`px`,r)))+r},fc=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,gc(e,t)},pc=`0deg`,mc=`0px`,hc=`) `,gc=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==pc||l!==pc)){var x=parseFloat(l)*us,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*us,w=Math.cos(x),a=dc(_,a,S*w*-v),o=dc(_,o,-Math.sin(x)*-v),s=dc(_,s,C*w*-v+v)}h!==mc&&(y+=`perspective(`+h+hc),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==mc||o!==mc||s!==mc)&&(y+=s!==mc||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+hc),c!==pc&&(y+=`rotate(`+c+hc),l!==pc&&(y+=`rotateY(`+l+hc),u!==pc&&(y+=`rotateX(`+u+hc),(d!==pc||f!==pc)&&(y+=`skew(`+d+`, `+f+hc),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+hc),_.style[As]=y||`translate(0, 0)`},_c=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=us,c*=us,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=us,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=Di(b),x=Di(x),S=Di(S),C=Di(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=Xs(f,`x`,a,`px`),y=Xs(f,`y`,o,`px`)),(p||m||h||g)&&(v=Di(v+p-(p*b+m*S)+h),y=Di(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=Di(v+r/100*w.width),y=Di(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[As]=w)},vc=function(e,t,n,r,i){var a=360,o=Pr(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?ls:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*fs)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*fs)%a-~~(s/a)*a)),e._pt=u=new zo(e._pt,t,n,r,s,vs),u.e=c,u.u=`deg`,e._props.push(n),u},yc=function(e,t){for(var n in t)e[n]=t[n];return e},bc=function(e,t,n){var r=yc({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[As]=t,o=lc(n,1),Ks(n,As),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[As],a[As]=t,o=lc(n,1),a[As]=c),cs)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=ha(c),p=ha(l),u=f===p?parseFloat(c):Xs(n,s,c,p),d=parseFloat(l),e._pt=new zo(e._pt,o,s,u,d-u,_s),e._pt.u=p||0,e._props.push(s));yc(o,r)};Ei(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});nc[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return Zs(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var xc={name:`css`,register:Vs,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in rs||Vs(),this.styles=this.styles||Fs(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(vi[m]&&ho(m,t,n,r,e,i)))){if(f=typeof l,p=nc[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=Na(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,qa.lastIndex=0,qa.test(c)||(h=ha(c),g=ha(l),g?h!==g&&(c=Xs(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],Pr(c)&&~c.indexOf(`random(`)&&(c=Na(c)),ha(c+``)||c===`auto`||(c+=xr.units[m]||ha(Zs(e,m))||``),(c+``).charAt(1)===`=`&&(c=Zs(e,m))):c=Zs(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in gs&&(m===`autoAlpha`&&(d===1&&Zs(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),qs(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=gs[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in cs,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=Rs(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=Rs(e,`perspective`),T?e.style.perspective=T:Ks(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||lc(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new zo(this._pt,o,As,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new zo(this._pt,b,`scaleY`,b.scaleY,(_?ki(b.scaleY,_+u):u)-b.scaleY||0,_s),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(js,0,o[js]),l=ec(l),b.svg?cc(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&qs(this,b,`zOrigin`,b.zOrigin,g),qs(this,o,m,uc(c),uc(l)));continue}else if(m===`svgOrigin`){cc(e,l,1,x,0,this);continue}else if(m in ic){vc(this,b,m,d,_?ki(d,_+l):l);continue}else if(m===`smoothOrigin`){qs(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){bc(this,l,e);continue}}else m in o||(m=Bs(m)||m);if(v||(u||u===0)&&(d||d===0)&&!hs.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=ha(l)||(m in xr.units?xr.units[m]:h),h!==g&&(d=Xs(e,m,c,g)),this._pt=new zo(this._pt,v?b:o,m,d,(_?ki(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?xs:_s),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=bs):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=ys);else if(m in o)Qs.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){si(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&Ro(this)},render:function(e,t){if(t.tween._time||!os())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Zs,aliases:gs,getSetter:function(e,t,n){var r=gs[t];return r&&r.indexOf(`,`)<0&&(t=r),t in cs&&t!==js&&(e._gsap.x||Zs(e,`x`))?n&&as===n?t===`scale`?Ds:Es:(as=n||{})&&(t===`scale`?Os:ks):e.style&&!Lr(e.style[t])?ws:~t.indexOf(`-`)?Ts:Ao(e,t)},core:{_removeProperty:Ks,_getMatrix:sc}};$o.utils.checkPrefix=Bs,$o.core.getStyleSaver=Fs,(function(e,t,n,r){var i=Ei(e+`,`+t+`,`+n,function(e){cs[e]=1});Ei(t,function(e){xr.units[e]=`deg`,ic[e]=1}),gs[i[13]]=e+`,`+t,Ei(r,function(e){var t=e.split(`:`);gs[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),Ei(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){xr.units[e]=`px`}),$o.registerPlugin(xc);var Sc=$o.registerPlugin(xc)||$o;Sc.core.Tween;function Cc(){let e=(0,x.useRef)(null),t=(0,x.useRef)(null),n=(0,x.useRef)(null),r=(0,x.useRef)(null),i=(0,x.useRef)(null),a=(0,x.useRef)(null),o=(0,x.useRef)(null),s=(0,x.useRef)(null),c=(0,x.useRef)(null),l=(0,x.useRef)(null),u=(0,x.useRef)(null),[d,f]=(0,x.useState)(()=>{if(typeof window>`u`)return!0;let e=new URLSearchParams(window.location.search);if(e.has(`intro`)||e.has(`replay`))return!1;try{return sessionStorage.removeItem(`miladysIntroPlayed`),sessionStorage.getItem(`srikalaIntroPlayed`)===`1`}catch{return!1}}),p=(0,x.useCallback)(()=>{u.current&&u.current.kill(),document.body.style.overflow=``;try{sessionStorage.setItem(`srikalaIntroPlayed`,`1`)}catch{}f(!0)},[]);return(0,x.useEffect)(()=>{if(typeof window>`u`||d)return;let n=document.body.style.overflow;if(document.body.style.overflow=`hidden`,window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){let e=setTimeout(()=>{document.body.style.overflow=n,p()},900);return()=>{clearTimeout(e),document.body.style.overflow=n}}let m=e.current,h=t.current,g=r.current,_=i.current,v=a.current,y=o.current,b=s.current,x=c.current,S=l.current;if(!m||!h){f(!0),document.body.style.overflow=n;return}Sc.set(m,{opacity:1}),Sc.set(h,{opacity:0,scale:.9,y:16,filter:`blur(8px)`}),_&&Sc.set(_,{opacity:0,scale:.65}),v&&Sc.set(v,{scaleX:0,transformOrigin:`right center`}),y&&Sc.set(y,{scaleX:0,transformOrigin:`left center`}),b&&Sc.set(b,{scale:0,opacity:0,rotation:-45}),x&&Sc.set(x,{opacity:0,y:8,letterSpacing:`0.12em`}),g&&Sc.set(g,{xPercent:-130,opacity:0}),S&&Sc.set(S,{opacity:0});let C=Sc.timeline({onComplete:()=>{document.body.style.overflow=n,p()}});return u.current=C,C.to(_,{opacity:1,scale:1.15,duration:1.1,ease:`power2.out`},.05),C.to(h,{opacity:1,scale:1,y:0,filter:`blur(0px)`,duration:.95,ease:`power3.out`},.1),C.to(S,{opacity:.7,duration:.6,ease:`power1.out`},.4),C.to(g,{opacity:1,duration:.15,ease:`power1.in`},.75),C.to(g,{xPercent:140,duration:.85,ease:`power2.inOut`},.8),C.to(g,{opacity:0,duration:.2,ease:`power2.out`},1.45),C.to(b,{scale:1,opacity:1,rotation:0,duration:.4,ease:`back.out(2)`},.85),C.to([v,y],{scaleX:1,duration:.55,ease:`power2.out`},.95),C.to(x,{opacity:1,y:0,letterSpacing:`0.22em`,duration:.75,ease:`power2.out`},1.05),C.to(_,{scale:1.25,opacity:.85,duration:.7,ease:`sine.inOut`},1.3),C.to({},{duration:.4}),C.to(h,{scale:1.04,opacity:.9,duration:.6,ease:`power2.inOut`},`reveal`),C.to(_,{scale:1.4,opacity:0,duration:.55,ease:`power2.in`},`reveal`),C.to(m,{opacity:0,duration:.65,ease:`power3.inOut`},`reveal+=0.1`),()=>{C.kill(),document.body.style.overflow=n}},[p,d]),d?null:(0,L.jsxs)(`aside`,{className:`logo-intro`,ref:e,"aria-label":`Welcome to Sri Kala Silk Emporium`,"aria-live":`polite`,children:[(0,L.jsx)(`div`,{className:`corner-ornament top-left`,"aria-hidden":`true`,children:(0,L.jsxs)(`svg`,{viewBox:`0 0 60 60`,fill:`none`,children:[(0,L.jsx)(`path`,{d:`M4 56V16C4 9.37 9.37 4 16 4H56`,stroke:`currentColor`,strokeWidth:`1.2`,strokeLinecap:`round`}),(0,L.jsx)(`path`,{d:`M12 48V20C12 15.58 15.58 12 20 12H48`,stroke:`currentColor`,strokeWidth:`0.8`,opacity:`0.6`,strokeLinecap:`round`}),(0,L.jsx)(`circle`,{cx:`16`,cy:`16`,r:`2.5`,fill:`currentColor`,opacity:`0.8`})]})}),(0,L.jsx)(`div`,{className:`corner-ornament top-right`,"aria-hidden":`true`,children:(0,L.jsxs)(`svg`,{viewBox:`0 0 60 60`,fill:`none`,children:[(0,L.jsx)(`path`,{d:`M4 56V16C4 9.37 9.37 4 16 4H56`,stroke:`currentColor`,strokeWidth:`1.2`,strokeLinecap:`round`}),(0,L.jsx)(`path`,{d:`M12 48V20C12 15.58 15.58 12 20 12H48`,stroke:`currentColor`,strokeWidth:`0.8`,opacity:`0.6`,strokeLinecap:`round`}),(0,L.jsx)(`circle`,{cx:`16`,cy:`16`,r:`2.5`,fill:`currentColor`,opacity:`0.8`})]})}),(0,L.jsx)(`div`,{className:`corner-ornament bottom-left`,"aria-hidden":`true`,children:(0,L.jsxs)(`svg`,{viewBox:`0 0 60 60`,fill:`none`,children:[(0,L.jsx)(`path`,{d:`M4 56V16C4 9.37 9.37 4 16 4H56`,stroke:`currentColor`,strokeWidth:`1.2`,strokeLinecap:`round`}),(0,L.jsx)(`path`,{d:`M12 48V20C12 15.58 15.58 12 20 12H48`,stroke:`currentColor`,strokeWidth:`0.8`,opacity:`0.6`,strokeLinecap:`round`}),(0,L.jsx)(`circle`,{cx:`16`,cy:`16`,r:`2.5`,fill:`currentColor`,opacity:`0.8`})]})}),(0,L.jsx)(`div`,{className:`corner-ornament bottom-right`,"aria-hidden":`true`,children:(0,L.jsxs)(`svg`,{viewBox:`0 0 60 60`,fill:`none`,children:[(0,L.jsx)(`path`,{d:`M4 56V16C4 9.37 9.37 4 16 4H56`,stroke:`currentColor`,strokeWidth:`1.2`,strokeLinecap:`round`}),(0,L.jsx)(`path`,{d:`M12 48V20C12 15.58 15.58 12 20 12H48`,stroke:`currentColor`,strokeWidth:`0.8`,opacity:`0.6`,strokeLinecap:`round`}),(0,L.jsx)(`circle`,{cx:`16`,cy:`16`,r:`2.5`,fill:`currentColor`,opacity:`0.8`})]})}),(0,L.jsxs)(`div`,{className:`gold-dust-container`,"aria-hidden":`true`,children:[(0,L.jsx)(`span`,{className:`dust-particle p1`}),(0,L.jsx)(`span`,{className:`dust-particle p2`}),(0,L.jsx)(`span`,{className:`dust-particle p3`}),(0,L.jsx)(`span`,{className:`dust-particle p4`}),(0,L.jsx)(`span`,{className:`dust-particle p5`}),(0,L.jsx)(`span`,{className:`dust-particle p6`})]}),(0,L.jsxs)(`div`,{className:`logo-intro-stage`,children:[(0,L.jsx)(`div`,{className:`logo-intro-aura`,ref:i,"aria-hidden":`true`}),(0,L.jsxs)(`div`,{className:`logo-intro-box`,ref:t,children:[(0,L.jsxs)(`div`,{className:`logo-img-wrapper`,children:[(0,L.jsx)(`img`,{ref:n,src:B.assets.logoIntro||`/images/given-logo-transparent.png`,alt:B.fullTitle||`Sri Kala — Silk Emporium`,className:`logo-intro-img`,width:`640`,height:`340`,loading:`eager`,decoding:`sync`}),(0,L.jsx)(`div`,{className:`logo-shimmer`,ref:r,"aria-hidden":`true`})]}),(0,L.jsxs)(`div`,{className:`logo-divider`,"aria-hidden":`true`,children:[(0,L.jsx)(`span`,{className:`divider-line left`,ref:a}),(0,L.jsx)(`span`,{className:`divider-pip`,ref:s,children:(0,L.jsx)(`svg`,{viewBox:`0 0 16 16`,fill:`currentColor`,width:`10`,height:`10`,children:(0,L.jsx)(`path`,{d:`M8 0L10.5 5.5L16 8L10.5 10.5L8 16L5.5 10.5L0 8L5.5 5.5L8 0Z`})})}),(0,L.jsx)(`span`,{className:`divider-line right`,ref:o})]}),(0,L.jsx)(`p`,{className:`logo-intro-tagline`,ref:c,children:`TIMELESS ELEGANCE, WOVEN IN TRADITION`})]})]}),(0,L.jsxs)(`button`,{ref:l,type:`button`,className:`logo-intro-skip`,onClick:p,"aria-label":`Skip introduction`,children:[(0,L.jsx)(`span`,{children:`Skip`}),(0,L.jsx)(`svg`,{viewBox:`0 0 16 16`,fill:`none`,width:`12`,height:`12`,"aria-hidden":`true`,children:(0,L.jsx)(`path`,{d:`M6 3L11 8L6 13`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`})})]}),(0,L.jsx)(`style`,{children:`
        .logo-intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 48%, #280a0e 0%, #150306 65%, #0a0103 100%);
          pointer-events: auto;
          overflow: hidden;
          user-select: none;
        }

        /* Subtle Corner Gold Ornaments */
        .corner-ornament {
          position: absolute;
          width: 50px;
          height: 50px;
          color: rgba(212, 160, 80, 0.35);
          pointer-events: none;
          z-index: 1;
        }
        .corner-ornament svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .corner-ornament.top-left { top: 20px; left: 20px; }
        .corner-ornament.top-right { top: 20px; right: 20px; transform: scaleX(-1); }
        .corner-ornament.bottom-left { bottom: 20px; left: 20px; transform: scaleY(-1); }
        .corner-ornament.bottom-right { bottom: 20px; right: 20px; transform: scale(-1); }

        @media (max-width: 600px) {
          .corner-ornament { width: 36px; height: 36px; }
          .corner-ornament.top-left { top: 12px; left: 12px; }
          .corner-ornament.top-right { top: 12px; right: 12px; }
          .corner-ornament.bottom-left { bottom: 12px; left: 12px; }
          .corner-ornament.bottom-right { bottom: 12px; right: 12px; }
        }

        /* Ambient Radiant Golden Halo */
        .logo-intro-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .logo-intro-aura {
          position: absolute;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(224, 168, 76, 0.22) 0%,
            rgba(197, 139, 56, 0.08) 45%,
            transparent 70%
          );
          filter: blur(24px);
          pointer-events: none;
          will-change: transform, opacity;
        }

        @media (max-width: 600px) {
          .logo-intro-aura {
            width: 320px;
            height: 320px;
          }
        }

        /* Central Box */
        .logo-intro-box {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          will-change: transform, opacity, filter;
          padding: 20px;
        }

        .logo-img-wrapper {
          position: relative;
          display: inline-block;
          overflow: hidden;
          border-radius: 6px;
        }

        .logo-intro-img {
          width: min(76vw, 360px);
          height: auto;
          aspect-ratio: 640 / 340;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 20px rgba(212, 160, 80, 0.18));
        }

        @media (max-width: 600px) {
          .logo-intro-img {
            width: min(84vw, 290px);
          }
        }

        /* Gold Zari Shimmer */
        .logo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 15%,
            rgba(255, 240, 195, 0.12) 35%,
            rgba(255, 235, 175, 0.65) 50%,
            rgba(255, 240, 195, 0.12) 65%,
            transparent 85%
          );
          mix-blend-mode: screen;
          pointer-events: none;
          will-change: transform, opacity;
        }

        /* Divider */
        .logo-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          margin-top: 14px;
        }

        .divider-line {
          height: 1px;
          width: 68px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(224, 168, 76, 0.75),
            rgba(251, 223, 162, 0.95)
          );
          will-change: transform;
        }
        .divider-line.right {
          background: linear-gradient(
            to left,
            transparent,
            rgba(224, 168, 76, 0.75),
            rgba(251, 223, 162, 0.95)
          );
        }

        .divider-pip {
          color: #fbdfa2;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 6px rgba(251, 223, 162, 0.8));
          will-change: transform, opacity;
        }

        /* Tagline */
        .logo-intro-tagline {
          margin: 12px 0 0;
          font-family: var(--font-display, 'Marcellus', serif);
          font-size: 11.5px;
          font-weight: 500;
          color: #eed59b;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
          will-change: transform, opacity, letter-spacing;
        }

        @media (max-width: 600px) {
          .divider-line { width: 44px; }
          .logo-intro-tagline {
            font-size: 10px;
            letter-spacing: 0.16em !important;
          }
        }

        /* Golden Zari Floating Dust */
        .gold-dust-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .dust-particle {
          position: absolute;
          border-radius: 50%;
          background: #fbdfa2;
          box-shadow: 0 0 6px rgba(251, 223, 162, 0.9);
          opacity: 0;
          animation: floatDust 4.5s ease-in-out infinite;
        }

        .dust-particle.p1 { width: 3px; height: 3px; left: 24%; top: 68%; animation-delay: 0.2s; }
        .dust-particle.p2 { width: 2px; height: 2px; left: 42%; top: 76%; animation-delay: 1.1s; }
        .dust-particle.p3 { width: 3.5px; height: 3.5px; left: 62%; top: 62%; animation-delay: 0.6s; }
        .dust-particle.p4 { width: 2px; height: 2px; left: 78%; top: 70%; animation-delay: 1.8s; }
        .dust-particle.p5 { width: 2.5px; height: 2.5px; left: 35%; top: 38%; animation-delay: 1.4s; }
        .dust-particle.p6 { width: 3px; height: 3px; left: 70%; top: 40%; animation-delay: 0.9s; }

        @keyframes floatDust {
          0% { transform: translateY(10px) scale(0.6); opacity: 0; }
          30% { opacity: 0.65; }
          70% { opacity: 0.45; }
          100% { transform: translateY(-38px) scale(1.1); opacity: 0; }
        }

        /* Skip Button */
        .logo-intro-skip {
          position: absolute;
          bottom: 24px;
          right: 28px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(32, 8, 11, 0.5);
          border: 1px solid rgba(197, 139, 56, 0.3);
          border-radius: 999px;
          padding: 6px 14px;
          color: #fbdfa2;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }

        .logo-intro-skip:hover {
          background: rgba(88, 30, 21, 0.8);
          border-color: rgba(251, 223, 162, 0.6);
          color: #ffffff;
          transform: translateY(-1px);
        }

        @media (max-width: 600px) {
          .logo-intro-skip {
            bottom: 16px;
            right: 16px;
            padding: 5px 12px;
            font-size: 10px;
          }
        }
      `})]})}function wc({children:e}){let{user:t,loading:n}=dr(),r=ct();return n?null:t?e:(0,L.jsx)(Lt,{to:`/login`,state:{from:r.pathname},replace:!0})}function Tc(){let{pathname:e}=ct();return(0,x.useEffect)(()=>{window.scrollTo(0,0)},[e]),null}var Ec=`1.3.26`;function Dc(e,t,n){return Math.max(e,Math.min(t,n))}function Oc(e,t,n){return(1-n)*e+n*t}function kc(e,t,n,r){return Oc(e,t,1-Math.exp(-n*r))}function Ac(e,t){return(e%t+t)%t}var jc=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=e;let n=Dc(0,this.currentTime/this.duration,1);t=n>=1;let r=t?1:this.easing(n);this.value=this.from+(this.to-this.from)*r}else this.lerp?(this.value=kc(this.value,this.to,this.lerp*60,e),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n,duration:r,easing:i,onStart:a,onUpdate:o}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=i,this.currentTime=0,this.isRunning=!0,a?.(),this.onUpdate=o}};function Mc(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{n=void 0,e.apply(this,r)},t)}}var Nc=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(e,t,{autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=Mc(this.resize,r),this.wrapper instanceof Window?window.addEventListener(`resize`,this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener(`resize`,this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Pc=class{events={};emit(e,...t){let n=this.events[e]||[];for(let e=0,r=n.length;e<r;e++)n[e]?.(...t)}on(e,t){return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{this.events[e]=this.events[e]?.filter(e=>t!==e)}}off(e,t){this.events[e]=this.events[e]?.filter(e=>t!==e)}destroy(){this.events={}}},Fc=100/6,K={passive:!1};function Ic(e,t){return e===1?Fc:e===2?t:1}var Lc=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new Pc;constructor(e,t={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=t,window.addEventListener(`resize`,this.onWindowResize),this.onWindowResize(),this.element.addEventListener(`wheel`,this.onWheel,K),this.element.addEventListener(`touchstart`,this.onTouchStart,K),this.element.addEventListener(`touchmove`,this.onTouchMove,K),this.element.addEventListener(`touchend`,this.onTouchEnd,K)}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener(`resize`,this.onWindowResize),this.element.removeEventListener(`wheel`,this.onWheel,K),this.element.removeEventListener(`touchstart`,this.onTouchStart,K),this.element.removeEventListener(`touchmove`,this.onTouchMove,K),this.element.removeEventListener(`touchend`,this.onTouchEnd,K)}onTouchStart=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit(`scroll`,{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(n-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:i},this.emitter.emit(`scroll`,{deltaX:r,deltaY:i,event:e})};onTouchEnd=e=>{this.emitter.emit(`scroll`,{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e,i=Ic(r,this.window.width),a=Ic(r,this.window.height);t*=i,n*=a,t*=this.options.wheelMultiplier,n*=this.options.wheelMultiplier,this.emitter.emit(`scroll`,{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}},Rc=e=>Math.min(1,1.001-2**(-10*e)),zc=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia(`(prefers-reduced-motion: reduce)`);isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new jc;emitter=new Pc;dimensions;virtualScroll;constructor({wrapper:e=window,content:t=document.documentElement,eventsTarget:n=e,smoothWheel:r=!0,syncTouch:i=!1,syncTouchLerp:a=.075,touchInertiaExponent:o=1.7,duration:s,easing:c,lerp:l=.1,infinite:u=!1,orientation:d=`vertical`,gestureOrientation:f=d===`horizontal`?`both`:`vertical`,touchMultiplier:p=1,wheelMultiplier:m=1,autoResize:h=!0,prevent:g,virtualScroll:_,overscroll:v=!0,autoRaf:y=!1,anchors:b=!1,autoToggle:x=!1,allowNestedScroll:S=!1,__experimental__naiveDimensions:C=!1,naiveDimensions:w=C,stopInertiaOnNavigate:T=!1,respectReducedMotion:E=!0}={}){window.lenisVersion=Ec,window.lenis||(window.lenis={}),window.lenis.version=Ec,d===`horizontal`&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!e||e===document.documentElement)&&(e=window),typeof s==`number`&&typeof c!=`function`?c=Rc:typeof c==`function`&&typeof s!=`number`&&(s=1),this.options={wrapper:e,content:t,eventsTarget:n,smoothWheel:r,syncTouch:i,syncTouchLerp:a,touchInertiaExponent:o,duration:s,easing:c,lerp:l,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:p,wheelMultiplier:m,autoResize:h,prevent:g,virtualScroll:_,overscroll:v,autoRaf:y,anchors:b,autoToggle:x,allowNestedScroll:S,naiveDimensions:w,stopInertiaOnNavigate:T,respectReducedMotion:E},this.dimensions=new Nc(e,t,{autoResize:h}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.addEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener(`click`,this.onClick),this.options.wrapper.addEventListener(`pointerdown`,this.onPointerDown),this.virtualScroll=new Lc(n,{touchMultiplier:p,wheelMultiplier:m}),this.virtualScroll.on(`scroll`,this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener(`transitionend`,this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.removeEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener(`pointerdown`,this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener(`click`,this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}onScrollEnd=e=>{e instanceof CustomEvent||(this.isScrolling===`smooth`||this.isScrolling===!1)&&e.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent(`scrollend`,{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let e=this.isHorizontal?`overflow-x`:`overflow-y`;return getComputedStyle(this.rootElement)[e]}checkOverflow(){[`hidden`,`clip`].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=e=>{e.propertyName?.includes(`overflow`)&&e.target===this.rootElement&&this.checkOverflow()};setScroll(e){this.isHorizontal?this.options.wrapper.scrollTo({left:e,behavior:`instant`}):this.options.wrapper.scrollTo({top:e,behavior:`instant`})}onClick=e=>{let t=e.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),n=new URL(window.location.href);if(this.options.anchors){let e=t.find(e=>n.host===e.host&&n.pathname===e.pathname&&e.hash);if(e){let t=typeof this.options.anchors==`object`&&this.options.anchors?this.options.anchors:void 0,n=decodeURIComponent(e.hash);this.scrollTo(n,t);return}}if(this.options.stopInertiaOnNavigate&&t.some(e=>n.host===e.host&&n.pathname!==e.pathname)){this.reset();return}};onPointerDown=e=>{e.button===1&&this.reset()};isTouchOnSelectionHandle(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let n=e.targetTouches[0]??e.changedTouches[0];if(!n)return!1;let r=t.getRangeAt(0).getClientRects();if(r.length===0)return!1;let i=r[0],a=r[r.length-1],o=Math.hypot(n.clientX-i.left,n.clientY-i.top)<=40,s=Math.hypot(n.clientX-a.right,n.clientY-a.bottom)<=40;return o||s}onVirtualScroll=e=>{if(typeof this.options.virtualScroll==`function`&&this.options.virtualScroll(e)===!1)return;let{deltaX:t,deltaY:n,event:r}=e;if(this.emitter.emit(`virtual-scroll`,{deltaX:t,deltaY:n,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let i=r.type.includes(`touch`),a=r.type.includes(`wheel`);if(i&&this.isIos&&(r.type===`touchstart`&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type===`touchend`&&(this._isDraggingSelection=!1);return}this.isTouching=r.type===`touchstart`||r.type===`touchmove`;let o=t===0&&n===0;if(this.options.syncTouch&&i&&r.type===`touchstart`&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let s=this.options.gestureOrientation===`vertical`&&n===0||this.options.gestureOrientation===`horizontal`&&t===0;if(o||s)return;let c=r.composedPath();c=c.slice(0,c.indexOf(this.rootElement));let l=this.options.prevent,u=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`;if(c.find(e=>e instanceof HTMLElement&&(typeof l==`function`&&l?.(e)||e.hasAttribute?.(`data-lenis-prevent`)||u===`vertical`&&e.hasAttribute?.(`data-lenis-prevent-vertical`)||u===`horizontal`&&e.hasAttribute?.(`data-lenis-prevent-horizontal`)||i&&e.hasAttribute?.(`data-lenis-prevent-touch`)||a&&e.hasAttribute?.(`data-lenis-prevent-wheel`)||this.options.allowNestedScroll&&this.hasNestedScroll(e,{deltaX:t,deltaY:n}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&a)){this.isScrolling=`native`,this.animate.stop(),r.lenisStopPropagation=!0;return}let d=n;this.options.gestureOrientation===`both`?d=Math.abs(n)>Math.abs(t)?n:t:this.options.gestureOrientation===`horizontal`&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&n>0||this.animatedScroll===this.limit&&n<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let f=i&&this.options.syncTouch,p=i&&r.type===`touchend`;p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit(`scroll`,this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling===`native`){let e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling=`native`),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty(`overflow`);return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty(`overflow`,`clip`);return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=e=>{let t=e-(this.time||e);this.time=e,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(e,{offset:t=0,immediate:n=!1,lock:r=!1,programmatic:i=!0,lerp:a=i?this.options.lerp:void 0,duration:o=i?this.options.duration:void 0,easing:s=i?this.options.easing:void 0,onStart:c,onComplete:l,force:u=!1,userData:d}={}){if(this.prefersReducedMotion&&(i?n=!0:(a=1,o=void 0,s=void 0)),(this.isStopped||this.isLocked)&&!u)return;let f=e,p=t;if(typeof f==`string`&&[`top`,`left`,`start`,`#`].includes(f))f=0;else if(typeof f==`string`&&[`bottom`,`right`,`end`].includes(f))f=this.limit;else{let e=null;if(typeof f==`string`?(e=f.startsWith(`#`)?document.getElementById(f.slice(1)):document.querySelector(f),e||(f===`#top`?f=0:console.warn(`Lenis: Target not found`,f))):f instanceof HTMLElement&&f?.nodeType&&(e=f),e){if(this.options.wrapper!==window){let e=this.rootElement.getBoundingClientRect();p-=this.isHorizontal?e.left:e.top}let t=e.getBoundingClientRect(),n=getComputedStyle(e),r=this.isHorizontal?Number.parseFloat(n.scrollMarginLeft):Number.parseFloat(n.scrollMarginTop),i=getComputedStyle(this.rootElement),a=this.isHorizontal?Number.parseFloat(i.scrollPaddingLeft):Number.parseFloat(i.scrollPaddingTop);f=(this.isHorizontal?t.left:t.top)+this.animatedScroll-(Number.isNaN(r)?0:r)-(Number.isNaN(a)?0:a)}}if(typeof f==`number`){if(f+=p,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;let e=f-this.animatedScroll;e>this.limit/2?f-=this.limit:e<-this.limit/2&&(f+=this.limit)}}else f=Dc(0,f,this.limit);if(f===this.targetScroll){c?.(this),l?.(this);return}if(this.userData=d??{},n){this.animatedScroll=this.targetScroll=f,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=f),typeof o==`number`&&typeof s!=`function`?s=Rc:typeof s==`function`&&typeof o!=`number`&&(o=1),this.animate.fromTo(this.animatedScroll,f,{duration:o,easing:s,lerp:a,onStart:()=>{r&&(this.isLocked=!0),this.isScrolling=`smooth`,c?.(this)},onUpdate:(e,t)=>{this.isScrolling=`smooth`,this.lastVelocity=this.velocity,this.velocity=e-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=e,this.setScroll(this.scroll),i&&(this.targetScroll=e),t||this.emit(),t&&(this.reset(),this.emit(),l?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(e,{deltaX:t,deltaY:n}){let r=Date.now();e._lenis||={};let i=e._lenis,a,o,s,c,l,u,d,f,p,m;if(r-(i.time??0)>2e3){i.time=Date.now();let t=window.getComputedStyle(e);if(i.computedStyle=t,a=[`auto`,`overlay`,`scroll`].includes(t.overflowX),o=[`auto`,`overlay`,`scroll`].includes(t.overflowY),l=[`auto`].includes(t.overscrollBehaviorX),u=[`auto`].includes(t.overscrollBehaviorY),i.hasOverflowX=a,i.hasOverflowY=o,!(a||o))return!1;d=e.scrollWidth,f=e.scrollHeight,p=e.clientWidth,m=e.clientHeight,s=d>p,c=f>m,i.isScrollableX=s,i.isScrollableY=c,i.scrollWidth=d,i.scrollHeight=f,i.clientWidth=p,i.clientHeight=m,i.hasOverscrollBehaviorX=l,i.hasOverscrollBehaviorY=u}else s=i.isScrollableX,c=i.isScrollableY,a=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,f=i.scrollHeight,p=i.clientWidth,m=i.clientHeight,l=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(a&&s||o&&c))return!1;let h=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`,g,_,v,y,b,x;if(h===`horizontal`)g=Math.round(e.scrollLeft),_=d-p,v=t,y=a,b=s,x=l;else if(h===`vertical`)g=Math.round(e.scrollTop),_=f-m,v=n,y=o,b=c,x=u;else return!1;return!x&&(g>=_||g<=0)||(v>0?g<_:g>0)&&y&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?`x`:`y`]}get isHorizontal(){return this.options.orientation===`horizontal`}get actualScroll(){let e=this.options.wrapper;return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop}get scroll(){return this.options.infinite?Ac(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(e){this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(e){this._isStopped!==e&&(this._isStopped=e,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(e){this._isLocked!==e&&(this._isLocked=e,this.updateClassName())}get isSmooth(){return this.isScrolling===`smooth`}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let e=`lenis`;return this.options.autoToggle&&(e+=` lenis-autoToggle`),this.isStopped&&(e+=` lenis-stopped`),this.isLocked&&(e+=` lenis-locked`),this.isScrolling&&(e+=` lenis-scrolling`),this.isScrolling===`smooth`&&(e+=` lenis-smooth`),e}updateClassName(){this.cleanUpClassName(),this.className.split(` `).forEach(e=>{this.rootElement.classList.add(e)})}cleanUpClassName(){for(let e of Array.from(this.rootElement.classList))(e===`lenis`||e.startsWith(`lenis-`))&&this.rootElement.classList.remove(e)}};function Bc(){let e=(0,x.useRef)(null),{pathname:t}=ct();return(0,x.useEffect)(()=>{`scrollRestoration`in window.history&&(window.history.scrollRestoration=`manual`)},[]),(0,x.useEffect)(()=>{if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let t=new zc({duration:1.7,easing:e=>1-(1-e)**4,smoothWheel:!0,wheelMultiplier:.85,syncTouch:!1,touchMultiplier:1});e.current=t;let n;function r(e){t.raf(e),n=requestAnimationFrame(r)}return n=requestAnimationFrame(r),()=>{cancelAnimationFrame(n),t.destroy(),e.current=null}},[]),(0,x.useLayoutEffect)(()=>{document.documentElement.scrollTop=0,document.body.scrollTop=0,e.current?e.current.scrollTo(0,{immediate:!0}):window.scrollTo(0,0)},[t]),null}function Vc({children:e,as:t=`div`,direction:n=`up`,distance:r=26,duration:i=1.6,delay:a=0,trigger:o=`scroll`,threshold:s=.15,rootMargin:c=`0px 0px -18% 0px`,className:l=``}){let u=(0,x.useRef)(null),[d,f]=(0,x.useState)(!1);(0,x.useEffect)(()=>{let e=u.current;if(!e)return;if(o===`load`){let e,t=requestAnimationFrame(()=>{e=requestAnimationFrame(()=>f(!0))});return()=>{cancelAnimationFrame(t),e&&cancelAnimationFrame(e)}}if(!(`IntersectionObserver`in window)){f(!0);return}let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(f(!0),t.unobserve(e.target))})},{threshold:s,rootMargin:c});t.observe(e);let n=setTimeout(()=>f(!0),2e3);return()=>{t.disconnect(),clearTimeout(n)}},[]);let p=`none`;return n===`up`?p=`translateY(${r}px)`:n===`left`?p=`translateX(-${r}px)`:n===`right`&&(p=`translateX(${r}px)`),(0,L.jsx)(t,{ref:u,className:l,style:{opacity:+!!d,transform:d?`translate(0, 0)`:p,transition:d?`opacity ${i}s ease-out ${a}s, transform ${i}s cubic-bezier(0.19,1,0.22,1) ${a}s`:`none`,willChange:`transform, opacity`},children:e})}var Hc=.06,Uc=.022,Wc=768;function Gc({categories:e,note:t,heading:n}){let r=(0,x.useRef)(null),i=(0,x.useRef)(null),a=(0,x.useRef)([]),o=(0,x.useRef)(0),s=(0,x.useRef)(0),c=(0,x.useRef)(0),l=(0,x.useRef)(!1),u=(0,x.useRef)(null),d=(0,x.useRef)(null),f=(0,x.useRef)(null),p=(0,x.useRef)(0);function m(){if(typeof window>`u`)return!1;let e=window.innerWidth<=Wc,t=typeof window.matchMedia==`function`&&window.matchMedia(`(hover: none), (pointer: coarse)`).matches;return e||t}let[h,g]=(0,x.useState)(0),[_,v]=(0,x.useState)(0),[y,b]=(0,x.useState)(m()),S=e.length,C=S?[...e,...e,...e]:[];if((0,x.useEffect)(()=>{function e(){b(m())}return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),(0,x.useEffect)(()=>{if(y)return;function e(){l.current&&(s.current+=c.current*Uc,o.current+=(s.current-o.current)*Hc,g(o.current)),u.current=requestAnimationFrame(e)}return u.current=requestAnimationFrame(e),()=>cancelAnimationFrame(u.current)},[y]),(0,x.useEffect)(()=>{if(!y||!S)return;let e=i.current;if(!e)return;function t(){let e=a.current[0],t=a.current[S];e&&t&&(p.current=t.offsetLeft-e.offsetLeft)}function n(t){let n=a.current[t];n&&(e.scrollLeft=n.offsetLeft-(e.clientWidth-n.clientWidth)/2)}function r(){let t=e.getBoundingClientRect(),n=t.left+t.width/2,r=S,i=1/0;return a.current.forEach((e,t)=>{if(!e)return;let a=e.getBoundingClientRect(),o=a.left+a.width/2,s=Math.abs(o-n);s<i&&(i=s,r=t)}),r}function o(){let t=r();t<S?(e.scrollLeft+=p.current,v(t+S)):t>=S*2?(e.scrollLeft-=p.current,v(t-S)):v(t)}function s(){d.current||(d.current=requestAnimationFrame(()=>{d.current=null,v(r())}),clearTimeout(f.current),f.current=setTimeout(o,120))}let c=setTimeout(()=>{t(),n(S),v(S)},350);return e.addEventListener(`scroll`,s,{passive:!0}),()=>{clearTimeout(c),clearTimeout(f.current),e.removeEventListener(`scroll`,s),d.current&&cancelAnimationFrame(d.current)}},[y,S]),!S)return null;function w(e){let t=r.current.getBoundingClientRect(),n=t.left+t.width/2,i=(e.clientX-n)/(t.width/2);c.current=Math.max(-1,Math.min(1,i))}function T(){l.current=!0}function E(){l.current=!1,c.current=0}function D(e){let t=((e-h)%S+S)%S;return t>S/2&&(t-=S),t}let O=y?1.8:1.4;return(0,L.jsxs)(`div`,{className:`showcase`,children:[(0,L.jsxs)(`div`,{className:`showcase-head`,children:[(0,L.jsx)(Vc,{as:`p`,direction:`left`,distance:28,duration:O,className:`showcase-note`,children:t||`Sri Kala celebrates the timeless art of Indian weaving, curating each saree to bring grace and authentic craftsmanship to every occasion.`}),(0,L.jsx)(Vc,{as:`h2`,delay:y?.15:.1,direction:`right`,distance:38,duration:O,className:`showcase-title`,children:n||`Our Collections`})]}),y?(0,L.jsx)(`div`,{className:`showcase-scroll`,ref:i,children:C.map((e,t)=>{let n=Math.min(Math.abs(t-_),3);return(0,L.jsx)(I,{ref:e=>{a.current[t]=e},to:`/products?category=${e.id}`,className:`showcase-scroll-card ${t===_?`is-focus`:``}`,"data-dist":n,style:{animationDelay:`${Math.min(t%S,6)*70}ms`},children:(0,L.jsxs)(`div`,{className:`showcase-card-lift`,children:[(0,L.jsx)(`img`,{src:e.image,alt:``}),(0,L.jsx)(`span`,{className:`showcase-card-overlay`}),(0,L.jsx)(`span`,{className:`showcase-card-name`,children:e.name})]})},`${e.id}-${Math.floor(t/S)}`)})}):(0,L.jsx)(`div`,{className:`showcase-rail`,ref:r,onMouseMove:w,onMouseEnter:T,onMouseLeave:E,children:(0,L.jsx)(`div`,{className:`showcase-rail-inner`,children:e.map((e,t)=>{let n=D(t),r=Math.abs(n);if(r>2.6)return null;let i=r<.5,a=1-Math.min(r,2)*.09,o=n*205,s=Math.round(100-r*10),c=Math.max(0,1-Math.max(0,r-2)*1.4);return(0,L.jsx)(I,{to:`/products?category=${e.id}`,className:`showcase-card ${i?`is-focus`:``}`,style:{transform:`translate(-50%, -50%) translate(${o}px, 0) scale(${a})`,zIndex:s,opacity:c},children:(0,L.jsxs)(`div`,{className:`showcase-card-lift`,children:[(0,L.jsx)(`img`,{src:e.image,alt:``}),(0,L.jsx)(`span`,{className:`showcase-card-overlay`}),(0,L.jsx)(`span`,{className:`showcase-card-name`,children:e.name})]})},e.id)})})}),(0,L.jsxs)(I,{to:`/products`,state:{openFilters:!0},className:`showcase-explore`,children:[`Explore`,(0,L.jsx)(`svg`,{viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:(0,L.jsx)(`path`,{d:`M8 4l6 6-6 6`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`})})]}),(0,L.jsx)(`style`,{children:`
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
      `})]})}var Kc=[{id:`kanjivaram-purple`,title:`Kanjivaram Pattu`,tagline:`Deep Purple Silk • Pure Gold Zari Pallu`,badge:`Temple Border Heritage`,src:`https://images.unsplash.com/photo-1641699862936-be9f49b1c38d?auto=format&fit=crop&w=2000&q=85`,alt:`Handwoven purple Kanjivaram pattu saree with gold zari pallu`},{id:`banarasi-crimson`,title:`Banarasi Brocade`,tagline:`Royal Crimson Silk • Intricate Floral Jaal`,badge:`Artisan Zari Weave`,src:`https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85`,alt:`Royal crimson Banarasi pattu silk saree with fine gold brocade`},{id:`bridal-ivory`,title:`Bridal Kanjivaram`,tagline:`Ivory & Gold • Heirloom Wedding Drape`,badge:`Sacred Bridal Edit`,src:`https://images.unsplash.com/photo-1619516388835-2b60acc4049e?auto=format&fit=crop&w=2000&q=85`,alt:`Ivory and gold bridal Kanjivaram pattu saree with heavy contrast border`},{id:`kanjivaram-teal`,title:`Teal Temple Silk`,tagline:`Peacock Teal • Korvai Handwoven Border`,badge:`Master Weaver Craft`,src:`https://images.unsplash.com/photo-1676696706907-0e04665b80bd?auto=format&fit=crop&w=2000&q=85`,alt:`Teal Kanjivaram pattu saree with traditional temple border and gold motifs`}],qc=4200;function Jc({isSlideActive:e=!0,onCycleComplete:t}){let[n,r]=(0,x.useState)(0),i=(0,x.useRef)(null);(0,x.useEffect)(()=>{if(e)return i.current=setInterval(()=>{r(e=>{let n=(e+1)%Kc.length;return n===0&&t&&t(),n})},qc),()=>clearInterval(i.current)},[e,t]);let a=Kc[n];return(0,L.jsxs)(`div`,{className:`saree-transition-stage`,"aria-label":`Traditional Pattu Saree Showcase`,children:[Kc.map((e,t)=>{let r=t===n;return(0,L.jsx)(`div`,{className:`saree-frame ${r?`active`:``} zoom-${t%2==0?`in`:`out`}`,"aria-hidden":!r,children:(0,L.jsx)(`img`,{src:e.src,alt:e.alt,loading:t===0?`eager`:`lazy`,decoding:`async`})},e.id)}),(0,L.jsx)(`div`,{className:`saree-shimmer-layer`,"aria-hidden":`true`},`shimmer-${n}`),(0,L.jsx)(`div`,{className:`saree-vignette-overlay`,"aria-hidden":`true`}),(0,L.jsxs)(`div`,{className:`saree-artisan-badge`,children:[(0,L.jsx)(`span`,{className:`saree-badge-sparkle`,children:`✦`}),(0,L.jsx)(`span`,{className:`saree-badge-type`,children:a.badge}),(0,L.jsx)(`span`,{className:`saree-badge-sep`,children:`•`}),(0,L.jsx)(`span`,{className:`saree-badge-title`,children:a.title})]},`badge-${a.id}`),(0,L.jsx)(`style`,{children:`
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
      `})]})}var Yc=[{id:`hero-video-1`,type:`video`,src:`/videos/hero1.mp4`,alt:`Sri Kala Traditional Saree Showcase - Slide 1`},{id:`hero-video-2`,type:`video`,src:`/videos/hero2.mp4`,alt:`Sri Kala Traditional Saree Showcase - Slide 2`},{id:`hero-video-3`,type:`video`,src:`/videos/hero3.mp4`,alt:`Sri Kala Traditional Saree Showcase - Slide 3`}],Xc=[{id:`loading`,type:`image`,src:`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`,alt:``}];function Zc({slides:e,mobileSlides:t}){let[n,r]=(0,x.useState)(typeof window<`u`&&window.innerWidth<=640);(0,x.useEffect)(()=>{function e(){r(window.innerWidth<=640)}return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let i=e===null&&t===null,a=n&&Array.isArray(t)&&t.length?t:e,o=i?Xc:Array.isArray(a)&&a.length?a.map((e,t)=>({id:`${t}-${e.url}`,type:e.type,src:e.url,alt:`Sri Kala`})):Yc;return n?(0,L.jsx)(el,{slides:o}):(0,L.jsx)($c,{slides:o})}function Qc({src:e,alt:t,isActive:n,onEnded:r,isSingle:i}){let a=(0,x.useRef)(null);return(0,x.useEffect)(()=>{let e=a.current;e&&(n?(e.currentTime=0,e.play().catch(()=>{})):e.pause())},[n]),(0,L.jsx)(`video`,{ref:a,src:e,muted:!0,playsInline:!0,autoPlay:n,loop:i,onEnded:r,"aria-label":t})}function $c({slides:e}){let[t,n]=(0,x.useState)(0),r=(0,x.useRef)(null),i=e.map(e=>e.src||e.id).join(`|`);(0,x.useEffect)(()=>{n(0)},[i]),(0,x.useEffect)(()=>(clearInterval(r.current),e[t]?.type===`image`&&(r.current=setInterval(()=>{n(t=>(t+1)%e.length)},5e3)),()=>clearInterval(r.current)),[t,i,e]);function a(){n(t=>(t+1)%e.length)}function o(t){n((t+e.length)%e.length)}return(0,L.jsxs)(`div`,{className:`hero-slider`,"aria-hidden":`true`,children:[e.map((n,r)=>(0,L.jsx)(`div`,{className:`hero-slide`+(r===t?` active`:``),children:n.type===`video`?(0,L.jsx)(Qc,{src:n.src,alt:n.alt,isActive:r===t,onEnded:a,isSingle:e.length===1}):n.type===`transition`?(0,L.jsx)(Jc,{isSlideActive:r===t,onCycleComplete:e.length>1?a:void 0}):(0,L.jsx)(`img`,{src:n.src,alt:n.alt})},n.id)),e.length>1&&(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(`button`,{type:`button`,className:`hero-arrow hero-arrow-prev`,onClick:()=>o(t-1),"aria-label":`Previous banner`,children:(0,L.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,children:(0,L.jsx)(`path`,{d:`M15 5l-7 7 7 7`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})})}),(0,L.jsx)(`button`,{type:`button`,className:`hero-arrow hero-arrow-next`,onClick:()=>o(t+1),"aria-label":`Next banner`,children:(0,L.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,children:(0,L.jsx)(`path`,{d:`M9 5l7 7-7 7`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})})})]}),(0,L.jsx)(`div`,{className:`hero-slider-dots`,children:e.map((e,n)=>(0,L.jsx)(`button`,{className:`hero-dot`+(n===t?` active`:``),onClick:()=>o(n),"aria-label":`Show banner ${n+1}`},e.id))}),(0,L.jsx)(tl,{})]})}function el({slides:e}){let[t,n]=(0,x.useState)(0),r=(0,x.useRef)(null),i=(0,x.useRef)(null);(0,x.useEffect)(()=>{let e=r.current;if(!e)return;function t(){i.current||=requestAnimationFrame(()=>{i.current=null,n(Math.round(e.scrollLeft/e.offsetWidth))})}return e.addEventListener(`scroll`,t,{passive:!0}),()=>{e.removeEventListener(`scroll`,t),i.current&&cancelAnimationFrame(i.current)}},[]);function a(e){let t=r.current;t&&t.scrollTo({left:e*t.offsetWidth,behavior:`smooth`})}function o(){e.length>1&&a((t+1)%e.length)}return(0,L.jsxs)(`div`,{className:`hero-slider hero-slider-mobile`,"aria-hidden":`true`,children:[(0,L.jsx)(`div`,{className:`hero-track`,ref:r,children:e.map((n,r)=>(0,L.jsx)(`div`,{className:`hero-slide-mobile`,children:n.type===`video`?(0,L.jsx)(Qc,{src:n.src,alt:n.alt,isActive:r===t,onEnded:o,isSingle:e.length===1}):n.type===`transition`?(0,L.jsx)(Jc,{isSlideActive:r===t}):(0,L.jsx)(`img`,{src:n.src,alt:n.alt})},n.id))}),e.length>1&&(0,L.jsx)(`div`,{className:`hero-slider-dots`,children:e.map((e,n)=>(0,L.jsx)(`button`,{className:`hero-dot`+(n===t?` active`:``),onClick:()=>a(n),"aria-label":`Show banner ${n+1}`},e.id))}),(0,L.jsx)(tl,{})]})}function tl(){return(0,L.jsx)(`style`,{children:`
      .hero-slider {
        position: relative;
        width: 100%;
        /* Using the small (fixed) viewport height instead of the dynamic
           one is what actually fixes the "zoom" jump when scrolling on
           mobile — 100dvh recalculates as the browser's address bar
           shows/hides mid-scroll, which visibly resizes the hero right
           as you scroll past it. 100svh stays fixed regardless. */
        height: 100vh;
        height: 100svh;
        min-height: 100vh;
        min-height: 100svh;
        overflow: hidden;
        background: var(--maroon-950);
      }
      .hero-slide {
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.9s ease;
      }
      .hero-slide.active { opacity: 1; }
      .hero-slide img,
      .hero-slide video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      .hero-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 3;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.28);
        border: 1px solid rgba(255,255,255,0.35);
        color: #fff;
        backdrop-filter: blur(6px);
        transition: background 0.2s ease, transform 0.2s ease;
      }
      .hero-arrow:hover { background: rgba(0,0,0,0.46); }
      .hero-arrow svg { width: 18px; height: 18px; }
      .hero-arrow-prev { left: 20px; }
      .hero-arrow-next { right: 20px; }

      .hero-slider-dots {
        position: absolute;
        bottom: 14px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 3;
      }
      .hero-dot {
        width: 7px;
        height: 7px;
        border-radius: 999px;
        background: rgba(255,255,255,0.5);
        border: none;
        padding: 0;
        transition: background 0.2s ease, width 0.2s ease;
      }
      .hero-dot.active { background: var(--ivory); width: 20px; border-radius: 999px; }

      .hero-track {
        display: flex;
        width: 100%;
        height: 100%;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .hero-track::-webkit-scrollbar { display: none; }
      .hero-slide-mobile {
        position: relative;
        flex: 0 0 100%;
        width: 100%;
        height: 100%;
        scroll-snap-align: start;
        scroll-snap-stop: always;
        overflow: hidden;
      }
      .hero-slide-mobile img,
      .hero-slide-mobile video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      @media (max-width: 600px) {
        .hero-slider { height: 100vh; height: 100svh; min-height: 100vh; min-height: 100svh; }
        .hero-slider-dots { bottom: 10px; }
        .hero-arrow { width: 34px; height: 34px; }
      }
    `})}function nl({product:e,hidePrice:t=!1,isNew:n=!1}){let[r,i]=(0,x.useState)(!1),{addItem:a}=rr(),o=e.stock===0,s=(n||e.isNew)&&!o,c=e.mrp>e.price?Math.round((e.mrp-e.price)/e.mrp*100):0;function l(t){t.preventDefault(),t.stopPropagation(),!o&&(a(e,1),i(!0),setTimeout(()=>i(!1),1800))}return(0,L.jsxs)(I,{to:`/products/${e.id}`,className:`product-card ${o?`is-out`:``}`,children:[(0,L.jsx)(`div`,{className:`product-image-wrap`,children:(0,L.jsxs)(`div`,{className:`product-image`,children:[(0,L.jsx)(`img`,{src:e.image,alt:e.name,loading:`lazy`}),o&&(0,L.jsx)(`span`,{className:`badge badge-out`,children:`Sold Out`}),!t&&!o&&c>0&&(0,L.jsxs)(`span`,{className:`badge badge-sale`,children:[c,`% OFF`]}),s&&(0,L.jsx)(`span`,{className:`badge badge-new`,children:`New`}),!o&&(0,L.jsx)(`button`,{type:`button`,className:`quick-add-btn ${r?`added`:``}`,onClick:l,"aria-label":`Add ${e.name} to cart`,children:r?`Added to Bag ✓`:`+ Add to Bag`})]})}),(0,L.jsxs)(`div`,{className:`product-info`,children:[e.category&&(0,L.jsx)(`span`,{className:`product-category`,children:e.category.replace(/-/g,` `)}),(0,L.jsx)(`h3`,{className:`product-name`,children:e.name}),!t&&(0,L.jsxs)(`div`,{className:`product-price`,children:[(0,L.jsx)(`span`,{className:`price`,children:Xn(e.price)}),e.mrp>e.price&&(0,L.jsx)(`span`,{className:`mrp`,children:Xn(e.mrp)})]})]}),(0,L.jsx)(`style`,{children:`
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
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .product-card:hover .product-image img {
          transform: scale(1.05);
        }
        .is-out .product-image img {
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
          z-index: 2;
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
      `})]})}function rl({children:e,as:t=`div`,y:n=12,duration:r=1.3,delay:i=0,threshold:a=.15,rootMargin:o=`0px 0px -16% 0px`,className:s=``}){let c=(0,x.useRef)(null),[l,u]=(0,x.useState)(!1);return(0,x.useEffect)(()=>{let e=c.current;if(!e)return;if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){u(!0);return}if(!(`IntersectionObserver`in window)){u(!0);return}let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(u(!0),t.unobserve(e.target))})},{threshold:a,rootMargin:o});t.observe(e);let n=setTimeout(()=>u(!0),2e3);return()=>{t.disconnect(),clearTimeout(n)}},[]),(0,L.jsx)(t,{ref:c,className:s,style:{opacity:+!!l,transform:l?`translateY(0)`:`translateY(${n}px)`,transition:l?`opacity ${r}s ease-out ${i}s, transform ${r}s cubic-bezier(0.19,1,0.22,1) ${i}s`:`none`,willChange:`transform, opacity`},children:e})}function il({products:e=[],curatedIds:t=[],eyebrow:n=`Fresh Off The Loom`,heading:r=`New Arrivals`,subheading:i=`Discover our latest handpicked weaves, newly arrived from master artisan looms.`,ctaLabel:a=`View All New Arrivals`,ctaLink:o=`/products?sort=newest`}){let s=t.length>0?t.map(t=>e.find(e=>e.id===t)).filter(Boolean):e.slice(0,4);return!s||s.length===0?null:(0,L.jsxs)(`section`,{className:`new-arrivals`,id:`new-arrivals`,children:[(0,L.jsx)(`div`,{className:`sparkle-bg sparkle-bg-new`,"aria-hidden":`true`,children:(0,L.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsxs)(`div`,{className:`new-arrivals-head`,children:[(0,L.jsxs)(`div`,{className:`new-arrivals-title-group`,children:[(0,L.jsx)(Vc,{as:`p`,direction:`fade`,className:`eyebrow new-arrivals-eyebrow`,children:n}),(0,L.jsx)(Vc,{as:`h2`,delay:.06,direction:`left`,distance:30,className:`new-arrivals-heading`,children:r}),i&&(0,L.jsx)(Vc,{as:`p`,delay:.12,direction:`fade`,className:`new-arrivals-sub`,children:i})]}),a&&(0,L.jsx)(rl,{delay:.15,className:`new-arrivals-cta-wrap`,children:(0,L.jsxs)(I,{to:o||`/products?sort=newest`,className:`new-arrivals-link`,children:[(0,L.jsx)(`span`,{children:a}),(0,L.jsx)(`span`,{className:`arrow-icon`,"aria-hidden":`true`,children:`→`})]})})]}),(0,L.jsx)(`div`,{className:`new-arrivals-grid`,children:s.map((e,t)=>(0,L.jsx)(rl,{delay:.08*(t+1),y:24,duration:.8,children:(0,L.jsx)(nl,{product:e,isNew:!0})},e.id))})]}),(0,L.jsx)(`style`,{children:`
        .new-arrivals {
          position: relative;
          overflow: hidden;
          background: var(--paper);
          padding: 80px 0 90px;
          border-top: 1px solid rgba(197, 139, 56, 0.14);
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
          opacity: 0.24;
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
          margin-bottom: 40px;
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
            padding: 60px 0 70px;
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
            padding: 48px 0 56px;
          }
          .new-arrivals-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 28px;
          }
          .new-arrivals-heading {
            font-size: 25px;
          }
          .new-arrivals-sub {
            font-size: 13.5px;
          }
          .new-arrivals-grid {
            gap: 16px;
          }
        }
      `})]})}function al(e,t,n){return[...e.filter(e=>e.id!==n)].sort(()=>.5-Math.random()).slice(0,t)}function q({products:e=[],curatedIds:t=[],excludeId:n,title:r=`Recommended For You`}){let i=t.length>0?t.map(t=>e.find(e=>e.id===t)).filter(e=>e&&e.id!==n):al(e,4,n);return i.length===0?null:(0,L.jsxs)(`section`,{className:`recommended`,children:[(0,L.jsx)(`div`,{className:`sparkle-bg sparkle-bg-rec`,"aria-hidden":`true`,children:(0,L.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsx)(Vc,{as:`p`,direction:`fade`,className:`eyebrow`,children:`You might also like`}),(0,L.jsx)(Vc,{as:`h2`,delay:.08,direction:`left`,distance:32,children:r}),(0,L.jsx)(rl,{delay:.15,className:`recommended-grid`,children:i.map(e=>(0,L.jsx)(nl,{product:e},e.id))})]}),(0,L.jsx)(`style`,{children:`
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
      `})]})}var ol=B.name,sl=B.seo.siteUrl,cl=`${sl}/images/model-saree.png`,ll=B.seo.defaultDescription,ul=B.seo.defaultKeywords,dl=`seo-jsonld`;function fl(e,t,n){let r=document.querySelector(e);r&&r.setAttribute(t,n)}function J({title:e,description:t=ll,keywords:n=ul,path:r=``,image:i=cl,type:a=`website`,jsonLd:o,noindex:s=!1}){let c=e?`${e} | ${ol}`:B.seo.defaultTitle,l=`${sl}${r}`;return(0,x.useEffect)(()=>{document.title=c,fl(`meta[name="description"]`,`content`,t),fl(`meta[name="keywords"]`,`content`,n),fl(`link[rel="canonical"]`,`href`,l),fl(`meta[property="og:type"]`,`content`,a),fl(`meta[property="og:title"]`,`content`,c),fl(`meta[property="og:description"]`,`content`,t),fl(`meta[property="og:image"]`,`content`,i),fl(`meta[property="og:url"]`,`content`,l),fl(`meta[name="twitter:title"]`,`content`,c),fl(`meta[name="twitter:description"]`,`content`,t),fl(`meta[name="twitter:image"]`,`content`,i);let e=document.querySelector(`meta[name="robots"]`);s?(e||(e=document.createElement(`meta`),e.setAttribute(`name`,`robots`),document.head.appendChild(e)),e.setAttribute(`content`,`noindex, nofollow`)):e&&e.remove();let r=document.getElementById(dl);return o?(r||(r=document.createElement(`script`),r.id=dl,r.type=`application/ld+json`,document.head.appendChild(r)),r.textContent=JSON.stringify(o)):r&&r.remove(),()=>{if(o){let e=document.getElementById(dl);e&&e.remove()}}},[c,t,n,l,i,a,s,o]),null}function pl({categories:e=[],categoryIds:t=[],heading:n=`Shop by Style`,eyebrow:r=``}){let i=(t&&t.length>0?t:[`kanjivaram`,`banarasi`,`tussar`,`bridal`,`organza`]).map(t=>e.find(e=>e.id===t)).filter(Boolean),a=i.length>0?i:e.slice(0,5);return a.length===0?null:(0,L.jsxs)(`section`,{className:`shop-by-style`,id:`shop-by-style`,children:[(0,L.jsx)(`div`,{className:`sparkle-bg sparkle-bg-style`,"aria-hidden":`true`,children:(0,L.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsxs)(`div`,{className:`shop-by-style-head`,children:[r&&(0,L.jsx)(Vc,{as:`p`,direction:`fade`,className:`eyebrow`,children:r}),(0,L.jsx)(Vc,{as:`h2`,delay:.06,direction:`fade`,className:`shop-by-style-title`,children:n||`Shop by Style`})]}),(0,L.jsx)(rl,{delay:.12,className:`style-grid`,children:a.map((e,t)=>(0,L.jsxs)(I,{to:`/products?category=${e.id}`,className:`style-card style-card-${t+1}`,"aria-label":`Shop ${e.name} Sarees`,children:[(0,L.jsx)(`img`,{src:e.image,alt:e.name,className:`style-card-img`,loading:`lazy`}),(0,L.jsx)(`div`,{className:`style-card-overlay`,"aria-hidden":`true`}),(0,L.jsx)(`span`,{className:`style-card-label`,children:e.name})]},e.id))})]}),(0,L.jsx)(`style`,{children:`
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
        .style-card-label {
          position: absolute;
          bottom: 22px;
          left: 24px;
          color: #ffffff;
          font-family: var(--font-heading, 'Marcellus', serif);
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
          z-index: 2;
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
            height: 320px;
          }
          .style-card-2,
          .style-card-3,
          .style-card-4 {
            grid-column: span 1;
            height: 280px;
          }
          .style-card-5 {
            grid-column: span 2;
            height: 280px;
          }
        }
        @media (max-width: 600px) {
          .shop-by-style {
            padding: 48px 0 54px;
          }
          .shop-by-style-head {
            margin-bottom: 22px;
          }
          .shop-by-style-title {
            font-size: 26px;
          }
          .style-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .style-card-1,
          .style-card-2,
          .style-card-3,
          .style-card-4,
          .style-card-5,
          .style-card-6 {
            grid-column: span 1;
            height: 230px;
          }
          .style-card-label {
            bottom: 14px;
            left: 16px;
            font-size: 16px;
          }
        }
      `})]})}var ml=40;function hl(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(0),[i,a]=(0,x.useState)(!1),o=(0,x.useRef)(null),s=(0,x.useRef)(null),c=(0,x.useRef)({startX:0,dx:0,dragging:!1});(0,x.useEffect)(()=>{z.getTestimonials().then(({testimonials:e})=>t(e)).catch(()=>{})},[]),(0,x.useEffect)(()=>{if(!(e.length<2))return o.current=setInterval(()=>{l(t=>(t+1)%e.length)},6500),()=>clearInterval(o.current)},[e.length]);function l(e){a(!0),setTimeout(()=>{r(e),a(!1)},260)}function u(t){clearInterval(o.current),l((t%e.length+e.length)%e.length)}function d(e){u(n+e)}function f(t){e.length<2||(c.current={startX:t.clientX,dx:0,dragging:!0},s.current?.setPointerCapture?.(t.pointerId))}function p(e){c.current.dragging&&(c.current.dx=e.clientX-c.current.startX)}function m(){if(!c.current.dragging)return;let{dx:e}=c.current;c.current.dragging=!1,e>ml?d(-1):e<-40&&d(1)}if(!e.length)return null;let h=e[n];return(0,L.jsxs)(`section`,{className:`testimonial-band`,children:[(0,L.jsx)(`div`,{className:`container`,children:(0,L.jsxs)(`div`,{className:`band-box`,ref:s,onPointerDown:f,onPointerMove:p,onPointerUp:m,onPointerCancel:m,children:[e.length>1&&(0,L.jsx)(`button`,{type:`button`,className:`band-arrow band-arrow-prev`,onClick:()=>d(-1),"aria-label":`Previous testimonial`,children:(0,L.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,children:(0,L.jsx)(`path`,{d:`M15 5l-7 7 7 7`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})})}),(0,L.jsxs)(`div`,{className:`band-copy ${i?`is-fading`:``}`,children:[(0,L.jsx)(`div`,{className:`band-stars`,"aria-label":`${h.rating} out of 5 stars`,children:Array.from({length:5}).map((e,t)=>(0,L.jsx)(`span`,{className:t<h.rating?`filled`:``,children:`★`},t))}),(0,L.jsxs)(`p`,{className:`band-text`,children:[`“`,h.text,`”`]}),(0,L.jsxs)(`p`,{className:`band-name`,children:[`— `,h.name]})]}),(0,L.jsx)(`div`,{className:`band-photo-wrap ${i?`is-fading`:``}`,children:h.photo?(0,L.jsx)(`img`,{src:h.photo,alt:``,className:`band-photo`}):(0,L.jsx)(`div`,{className:`band-photo band-photo-fallback`,children:h.name.charAt(0)})}),e.length>1&&(0,L.jsx)(`button`,{type:`button`,className:`band-arrow band-arrow-next`,onClick:()=>d(1),"aria-label":`Next testimonial`,children:(0,L.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,children:(0,L.jsx)(`path`,{d:`M9 5l7 7-7 7`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})})}),e.length>1&&(0,L.jsx)(`div`,{className:`band-dots`,children:e.map((e,t)=>(0,L.jsx)(`button`,{className:t===n?`active`:``,onClick:()=>u(t),"aria-label":`Show testimonial ${t+1}`},e.id))})]})}),(0,L.jsx)(`style`,{children:`
        .testimonial-band { padding: 64px 0; background: var(--stone-100); }
        .band-box {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          background: var(--paper);
          border-radius: var(--radius-lg);
          box-shadow: 0 16px 40px rgba(36,26,23,0.1);
          padding: 44px 76px 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 36px;
          min-height: 168px;
          overflow: hidden;
          touch-action: pan-y;
          cursor: grab;
          user-select: none;
        }
        .band-copy {
          flex: 1;
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.19,1,0.22,1);
        }
        .band-copy.is-fading { opacity: 0; transform: translateY(8px); }
        .band-stars { display: flex; gap: 4px; color: var(--gold-500); margin-bottom: 14px; font-size: 17px; }
        .band-stars span { color: var(--stone-200); }
        .band-stars span.filled { color: var(--gold-500); }
        .band-text {
          font-size: 18px;
          line-height: 1.75;
          color: var(--ink-900);
          font-style: italic;
          margin: 0 0 14px;
        }
        .band-name { font-size: 13.5px; color: var(--ink-600); margin: 0; }

        .band-photo-wrap {
          flex: 0 0 auto;
          width: 92px;
          height: 92px;
          opacity: 1;
          transform: translateX(0) scale(1);
          transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.19,1,0.22,1);
        }
        .band-photo-wrap.is-fading {
          opacity: 0;
          transform: translateX(20px) scale(0.9);
        }
        .band-photo {
          width: 92px;
          height: 92px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--blush-300);
        }
        .band-photo-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--blush-300);
          color: var(--maroon-900);
          font-weight: 600;
          font-size: 32px;
        }

        .band-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--stone-100);
          border: 1px solid var(--stone-200);
          color: var(--maroon-900);
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .band-arrow:hover { background: var(--blush-300); border-color: var(--blush-300); }
        .band-arrow svg { width: 15px; height: 15px; }
        .band-arrow-prev { left: 18px; }
        .band-arrow-next { right: 18px; }

        .band-dots {
          position: absolute;
          bottom: 18px;
          left: 56px;
          display: flex;
          gap: 6px;
        }
        .band-dots button {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--stone-200);
          border: none;
          padding: 0;
          transition: background 0.2s ease, width 0.2s ease;
        }
        .band-dots button.active { background: var(--maroon-900); width: 18px; }

        @media (max-width: 640px) {
          .band-box {
            flex-direction: column-reverse;
            text-align: center;
            padding: 32px 20px 44px;
            gap: 18px;
          }
          .band-text { font-size: 16px; }
          .band-dots { left: 50%; transform: translateX(-50%); }
          .band-arrow { display: none; }
        }
      `})]})}var gl={hero:{eyebrow:`SRI KALA`,heading:`Timeless Elegance, Woven in`,heading2:`Tradition`,subheading:`Discover thoughtfully curated Indian sarees crafted to celebrate timeless beauty, artistry and tradition.`,ctaLabel:`Explore Collection`,ctaLink:`/products`,secondaryCtaLabel:`Discover Sri Kala`,secondaryCtaLink:`/about`,slides:[]},showcase:{note:`Sri Kala celebrates the timeless art of Indian weaving, curating each saree to bring grace and authentic craftsmanship to every occasion.`,heading:`Our Collections`},new_arrivals:{eyebrow:`Fresh Off The Loom`,heading:`New Arrivals`,subheading:`Discover our latest handpicked weaves, newly arrived from master artisan looms.`,ctaLabel:`View All New Arrivals`,ctaLink:`/products?sort=newest`,productIds:[]},shop_by_style:{eyebrow:``,heading:`Shop by Style`,categoryIds:[`kanjivaram`,`banarasi`,`tussar`,`bridal`,`organza`]},recommended:{heading:`Recommended For You`,productIds:[]},story:{eyebrow:`Our Heritage`,heading:`Woven with Grace, Cherished for Generations`,body:`Sri Kala celebrates the timeless beauty of Indian craftsmanship. We bring together thoughtfully selected sarees that honour traditional artistry while fitting effortlessly into the modern wardrobe.`,ctaLabel:`Discover Sri Kala`,ctaLink:`/about`,image:`https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80`}};function _l(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)(gl.hero),[o,s]=(0,x.useState)(!1),[c,l]=(0,x.useState)(gl.showcase),[u,d]=(0,x.useState)(gl.new_arrivals),[f,p]=(0,x.useState)(!0),[m,h]=(0,x.useState)(gl.shop_by_style),[g,_]=(0,x.useState)(!0),[v,y]=(0,x.useState)(gl.recommended),[b,S]=(0,x.useState)(gl.story),[C,w]=(0,x.useState)(null);return(0,x.useEffect)(()=>{z.getCategories().then(({categories:e})=>t(e)).catch(()=>t(Jn())),z.getProducts().then(({products:e})=>r(e)).catch(()=>r(Yn())),z.getHomeSections().then(({sections:e})=>{let t=Object.fromEntries(e.map(e=>[e.section_key,e.content]));t.hero&&a({...gl.hero,...t.hero}),t.showcase&&l({...gl.showcase,...t.showcase}),t.recommended&&y({...gl.recommended,...t.recommended}),t.story&&S({...gl.story,...t.story}),t.promo_banner&&w(t.promo_banner);let n=e.find(e=>e.section_key===`new_arrivals`||e.section_key===`featured`);n?(d({...gl.new_arrivals,...n.content}),p(n.enabled!==!1)):e.length>0&&(t.new_arrivals||t.featured)&&d({...gl.new_arrivals,...t.new_arrivals||t.featured});let r=e.find(e=>e.section_key===`shop_by_style`||e.section_key===`featured_styles`);r?(h({...gl.shop_by_style,...r.content}),_(r.enabled!==!1)):e.length>0&&t.shop_by_style&&h({...gl.shop_by_style,...t.shop_by_style})}).catch(()=>{}).finally(()=>s(!0))},[]),(0,L.jsxs)(`div`,{className:`home`,children:[(0,L.jsx)(J,{path:`/`,description:B.seo.defaultDescription,jsonLd:{"@context":`https://schema.org`,"@type":`Organization`,name:B.name,url:B.seo.siteUrl,logo:`${B.seo.siteUrl}${B.assets.logoWhite}`,sameAs:[]}}),(0,L.jsxs)(`section`,{className:`hero`,children:[(0,L.jsx)(`div`,{className:`hero-visual`,id:`page-hero`,children:(0,L.jsx)(Zc,{slides:o?i.slides:null,mobileSlides:o?i.mobileSlides:null})}),(0,L.jsx)(`div`,{className:`hero-card-wrap`,children:(0,L.jsxs)(`div`,{className:`container hero-card`,children:[(0,L.jsx)(Vc,{as:`p`,direction:`fade`,className:`eyebrow hero-eyebrow`,children:i.eyebrow||`SRI KALA`}),(0,L.jsxs)(Vc,{as:`h1`,delay:.1,direction:`left`,distance:40,className:`hero-title`,children:[i.heading||`Timeless Elegance, Woven in`,(0,L.jsx)(`span`,{className:`hero-title-script`,children:i.heading2||`Tradition`})]}),(0,L.jsx)(Vc,{as:`p`,delay:.2,direction:`right`,distance:30,className:`hero-sub`,children:i.subheading||B.subheading}),(0,L.jsxs)(Vc,{as:`div`,delay:.3,direction:`fade`,className:`hero-cta-group`,children:[(0,L.jsx)(I,{to:i.ctaLink||`/products`,className:`btn btn-primary`,children:i.ctaLabel||`Explore Collection`}),(0,L.jsx)(I,{to:i.secondaryCtaLink||`/about`,className:`btn btn-outline hero-sec-cta`,children:i.secondaryCtaLabel||`Discover Sri Kala`})]})]})})]}),(0,L.jsxs)(`section`,{className:`collections`,id:`collections`,children:[(0,L.jsx)(`div`,{className:`sparkle-bg sparkle-bg-a`,"aria-hidden":`true`,children:(0,L.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,L.jsx)(`div`,{className:`sparkle-bg sparkle-bg-b`,"aria-hidden":`true`,children:(0,L.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,L.jsx)(`div`,{className:`container`,children:(0,L.jsx)(rl,{children:(0,L.jsx)(Gc,{categories:e,note:c.note,heading:c.heading})})})]}),f&&(0,L.jsx)(il,{products:n,curatedIds:u.productIds,eyebrow:u.eyebrow,heading:u.heading,subheading:u.subheading,ctaLabel:u.ctaLabel,ctaLink:u.ctaLink}),g&&(0,L.jsx)(pl,{categories:e,categoryIds:m.categoryIds,heading:m.heading,eyebrow:m.eyebrow}),C&&(0,L.jsx)(`section`,{className:`promo-banner`,children:(0,L.jsxs)(`div`,{className:`container promo-inner`,children:[(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`h2`,{children:C.heading}),C.subheading&&(0,L.jsx)(`p`,{children:C.subheading})]}),C.ctaLabel&&(0,L.jsx)(I,{to:C.ctaLink||`/products`,className:`btn btn-outline`,children:C.ctaLabel})]})}),(0,L.jsxs)(`section`,{className:`story`,children:[(0,L.jsx)(`div`,{className:`sparkle-bg sparkle-bg-story`,"aria-hidden":`true`,children:(0,L.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,L.jsxs)(`div`,{className:`container story-grid`,children:[(0,L.jsx)(rl,{as:`div`,className:`story-image`,y:0,duration:1.3,children:(0,L.jsx)(`img`,{src:b.image,alt:b.heading})}),(0,L.jsxs)(`div`,{className:`story-copy`,children:[(0,L.jsx)(Vc,{as:`p`,direction:`fade`,className:`eyebrow`,children:b.eyebrow}),(0,L.jsx)(Vc,{as:`h2`,delay:.08,direction:`right`,distance:36,children:b.heading}),(0,L.jsx)(Vc,{as:`p`,delay:.16,direction:`left`,distance:26,className:`story-text`,children:b.body}),(0,L.jsx)(rl,{delay:.24,children:(0,L.jsx)(I,{to:b.ctaLink||`/about`,className:`btn btn-outline`,children:b.ctaLabel||`Read our story`})})]})]})]}),(0,L.jsx)(q,{products:n,curatedIds:v.productIds,title:v.heading}),(0,L.jsx)(hl,{}),(0,L.jsx)(`style`,{children:`
        .hero {
          position: relative;
          background: var(--paper);
          padding: 0 0 90px;
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
          background: var(--paper);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(197, 139, 56, 0.25);
          box-shadow:
            0 28px 64px rgba(32, 8, 11, 0.16),
            0 2px 0 rgba(255, 255, 255, 0.8) inset;
          padding: 48px 60px;
          max-width: 740px;
          text-align: center;
        }
        .hero-eyebrow {
          color: var(--brand-secondary);
          letter-spacing: 0.25em;
          font-weight: 600;
        }
        .hero-title {
          margin-top: 14px;
          font-size: 46px;
          line-height: 1.05;
          color: var(--brand-primary);
          font-weight: 400;
        }
        .hero-title-script {
          display: block;
          font-family: var(--font-script);
          font-style: italic;
          font-size: 96px;
          line-height: 1;
          color: var(--brand-secondary);
          margin-top: 6px;
        }
        .hero-sub {
          margin: 22px auto 28px;
          max-width: 480px;
          font-size: 15px;
          line-height: 1.75;
          color: var(--ink-600);
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .hero-sec-cta {
          border-color: var(--brand-secondary);
          color: var(--brand-primary);
        }
        .hero-sec-cta:hover {
          background: var(--brand-secondary);
          border-color: var(--brand-secondary);
          color: #ffffff;
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
      `})]})}var vl={hero:{eyebrow:`About Sri Kala`,heading:`Curating Indian Heritage, Honoring Timeless Artistry`},story:{heading:`Our Story`,paragraphs:B.story.paragraphs,image:`https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80`,gallery:[]}};function yl(){let[e,t]=(0,x.useState)(vl.hero),[n,r]=(0,x.useState)(vl.story);(0,x.useEffect)(()=>{Promise.all([z.getHomeSection(`about_hero`).catch(()=>null),z.getHomeSection(`about_story`).catch(()=>null)]).then(([e,n])=>{e?.section?.content&&t({...vl.hero,...e.section.content}),n?.section?.content&&r({...vl.story,...n.section.content})})},[]);let i=n.paragraphs?.length?n.paragraphs:vl.story.paragraphs;return(0,L.jsxs)(`div`,{className:`about-page`,children:[(0,L.jsx)(J,{title:`About Us`,path:`/about`,description:`Sri Kala celebrates the timeless beauty of Indian craftsmanship, bringing together thoughtfully selected sarees that honour traditional artistry.`}),(0,L.jsx)(`section`,{className:`about-hero`,children:(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,style:{color:`var(--brand-gold-light)`,letterSpacing:`0.22em`},children:e.eyebrow}),(0,L.jsx)(`h1`,{children:e.heading})]})}),(0,L.jsxs)(`section`,{className:`about-body`,children:[(0,L.jsxs)(`div`,{className:`container about-grid`,children:[(0,L.jsx)(rl,{as:`div`,className:`about-image`,y:0,duration:1,children:(0,L.jsx)(`img`,{src:n.image,alt:n.heading})}),(0,L.jsxs)(rl,{className:`about-copy`,delay:.1,children:[(0,L.jsx)(`h2`,{children:n.heading}),i.map((e,t)=>(0,L.jsx)(`p`,{children:e},t))]})]}),n.gallery?.length>0&&(0,L.jsx)(`div`,{className:`container`,children:(0,L.jsx)(rl,{delay:.15,className:`about-gallery`,children:n.gallery.map((e,t)=>(0,L.jsx)(`div`,{className:`gallery-thumb`,children:(0,L.jsx)(`img`,{src:e,alt:`${n.heading} ${t+1}`})},t))})})]}),(0,L.jsx)(`section`,{className:`about-values`,children:(0,L.jsx)(`div`,{className:`container values-grid`,children:B.story.values.map((e,t)=>(0,L.jsxs)(rl,{as:`div`,className:`value-card`,delay:t*.1,children:[(0,L.jsx)(`h3`,{children:e.title}),(0,L.jsx)(`p`,{children:e.description})]},e.title))})}),(0,L.jsx)(q,{}),(0,L.jsx)(`style`,{children:`
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
      `})]})}var bl=[{id:`popular`,label:`Popularity`},{id:`newest`,label:`Newest Arrivals`},{id:`price-asc`,label:`Price: Low to High`},{id:`price-desc`,label:`Price: High to Low`},{id:`name`,label:`Name: A to Z`}];function xl(){let e=ct(),[t,n]=(0,x.useState)([]),[r,i]=(0,x.useState)([]),[a,o]=Nn(),s=a.get(`category`)||`all`,c=a.get(`search`)||``,l=a.get(`sort`),[u,d]=(0,x.useState)(l||`popular`),[f,p]=(0,x.useState)(!!e.state?.openFilters);(0,x.useEffect)(()=>{l&&d(l)},[l]),(0,x.useEffect)(()=>{z.getCategories().then(({categories:e})=>n(e)).catch(()=>n(Jn())),z.getProducts().then(({products:e})=>i(e)).catch(()=>i(Yn()))},[]);let m=(0,x.useMemo)(()=>{let e=r;if(s!==`all`&&(e=e.filter(e=>e.category===s)),c.trim()){let t=c.trim().toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t))}let t=[...e];return u===`newest`?t.sort((e,t)=>new Date(t.created_at||0)-new Date(e.created_at||0)):u===`price-asc`?t.sort((e,t)=>e.price-t.price):u===`price-desc`?t.sort((e,t)=>t.price-e.price):u===`name`&&t.sort((e,t)=>e.name.localeCompare(t.name)),t},[r,s,c,u]);function h(e){let t=new URLSearchParams(a);e===`all`?t.delete(`category`):t.set(`category`,e),o(t)}function g(){let e=new URLSearchParams(a);e.delete(`search`),o(e)}function _(e){h(e),p(!1)}let v=s===`all`?null:t.find(e=>e.id===s)?.name,y=v?`${v} Sarees`:`Shop All Sarees`;return(0,L.jsxs)(`div`,{className:`products-page`,children:[(0,L.jsx)(J,{title:y,path:s===`all`?`/products`:`/products?category=${s}`,description:v?`Shop handwoven ${v} sarees at Sri Kala — curated directly from master weaving clusters.`:`Browse Sri Kala's full collection of pure silk and handwoven sarees — Kanjivaram, Banarasi, bridal, organza and more.`}),(0,L.jsx)(`div`,{className:`sparkle-bg`,"aria-hidden":`true`,children:(0,L.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,L.jsxs)(`div`,{className:`container products-layout`,children:[f&&(0,L.jsx)(`div`,{className:`sidebar-overlay`,onClick:()=>p(!1),"aria-hidden":`true`}),(0,L.jsxs)(`aside`,{className:`sidebar ${f?`open`:``}`,children:[(0,L.jsxs)(`div`,{className:`sidebar-head mobile-only-flex`,children:[(0,L.jsx)(`h4`,{children:`Filter Sarees`}),(0,L.jsx)(`button`,{className:`sidebar-close`,"aria-label":`Close filters`,onClick:()=>p(!1),children:`×`})]}),(0,L.jsxs)(`div`,{className:`sidebar-block`,children:[(0,L.jsx)(`h4`,{children:`Categories`}),(0,L.jsxs)(`ul`,{className:`category-list`,children:[(0,L.jsx)(`li`,{children:(0,L.jsx)(`button`,{className:s===`all`?`active`:``,onClick:()=>_(`all`),children:`All Sarees`})}),t.map(e=>(0,L.jsx)(`li`,{children:(0,L.jsx)(`button`,{className:s===e.id?`active`:``,onClick:()=>_(e.id),children:e.name})},e.id))]})]}),(0,L.jsxs)(`div`,{className:`sidebar-block`,children:[(0,L.jsx)(`h4`,{children:`Sort By`}),(0,L.jsx)(`div`,{className:`sort-options`,children:bl.map(e=>(0,L.jsxs)(`label`,{className:`sort-option`,children:[(0,L.jsx)(`input`,{type:`radio`,name:`sort`,checked:u===e.id,onChange:()=>d(e.id)}),e.label]},e.id))})]})]}),(0,L.jsxs)(`div`,{className:`products-main`,children:[(0,L.jsxs)(`div`,{className:`page-head`,children:[(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`The Collection`}),(0,L.jsx)(`h1`,{children:`Products`})]}),(0,L.jsxs)(`button`,{className:`filter-toggle`,onClick:()=>p(!0),children:[(0,L.jsx)(`svg`,{viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:(0,L.jsx)(`path`,{d:`M3 5h14M6 10h8M8.5 15h3`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`})}),`Categories`]}),c&&(0,L.jsxs)(`div`,{className:`search-chip`,children:[`Results for “`,c,`”`,(0,L.jsx)(`button`,{onClick:g,"aria-label":`Clear search`,children:`×`})]})]}),m.length===0?(0,L.jsx)(`p`,{className:`empty`,children:`No sarees match this search — try another category or keyword.`}):(0,L.jsx)(`div`,{className:`product-grid`,children:m.map(e=>(0,L.jsx)(nl,{product:e},e.id))})]})]}),(0,L.jsx)(q,{}),(0,L.jsx)(`style`,{children:`
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
      `})]})}function Sl({value:e,onChange:t,size:n=18,readOnly:r=!1}){let[i,a]=(0,x.useState)(0);return(0,L.jsxs)(`div`,{className:`stars ${r?`readonly`:``}`,children:[[1,2,3,4,5].map(o=>(0,L.jsx)(`span`,{className:o<=(i||e)?`star filled`:`star`,style:{fontSize:n},onMouseEnter:()=>!r&&a(o),onMouseLeave:()=>!r&&a(0),onClick:()=>!r&&t?.(o),children:`★`},o)),(0,L.jsx)(`style`,{children:`
        .stars { display: inline-flex; gap: 2px; }
        .star { color: var(--stone-200); line-height: 1; }
        .star.filled { color: var(--gold-500); }
        .stars:not(.readonly) .star { cursor: pointer; }
      `})]})}function Cl(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=n,r.readAsDataURL(e)})}function wl({productId:e}){let{user:t}=dr(),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)({count:0,average:0}),[o,s]=(0,x.useState)(0),[c,l]=(0,x.useState)(``),[u,d]=(0,x.useState)([]),[f,p]=(0,x.useState)(!1),[m,h]=(0,x.useState)(``),[g,_]=(0,x.useState)(!1),[v,y]=(0,x.useState)(!1),[b,S]=(0,x.useState)(null),C=(0,x.useRef)(null);(0,x.useEffect)(()=>{let t=!0;return z.getReviews(e).then(({reviews:e,summary:n})=>{t&&(r(e),a(n))}).catch(()=>{}).finally(()=>t&&y(!0)),()=>{t=!1}},[e]),(0,x.useEffect)(()=>{if(!b)return;function e(e){e.key===`Escape`&&S(null)}return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[b]);async function w(e){let t=Array.from(e.target.files||[]).slice(0,3-u.length);if(t.length){p(!0);try{let e=await Promise.all(t.map(e=>Cl(e)));d(t=>[...t,...e].slice(0,3))}finally{p(!1),e.target.value=``}}}function T(e){d(t=>t.filter((t,n)=>n!==e))}async function E(t){if(t.preventDefault(),h(``),!o){h(`Please select a star rating.`);return}_(!0);try{let{review:t}=await z.addReview(e,{rating:o,comment:c,photos:u});r(e=>[t,...e]),a(e=>({count:e.count+1,average:Math.round((e.average*e.count+o)/(e.count+1)*10)/10})),s(0),l(``),d([])}catch(e){h(e.message)}finally{_(!1)}}return v?(0,L.jsxs)(`section`,{className:`reviews-block`,children:[(0,L.jsx)(`div`,{className:`reviews-head`,children:(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`h3`,{children:`Customer Reviews`}),i.count>0?(0,L.jsxs)(`div`,{className:`summary-line`,children:[(0,L.jsx)(Sl,{value:Math.round(i.average),readOnly:!0,size:15}),(0,L.jsxs)(`span`,{children:[i.average,` out of 5 · `,i.count,` review`,i.count===1?``:`s`]})]}):(0,L.jsx)(`p`,{className:`no-reviews`,children:`Be the first to review this saree.`})]})}),n.length>0&&(0,L.jsx)(`div`,{className:`reviews-grid`,children:n.map(e=>(0,L.jsxs)(`div`,{className:`review-card`,children:[(0,L.jsx)(Sl,{value:e.rating,readOnly:!0,size:13}),e.comment&&(0,L.jsx)(`p`,{className:`review-comment`,children:e.comment}),e.photos?.length>0&&(0,L.jsx)(`div`,{className:`review-photos`,children:e.photos.map((e,t)=>(0,L.jsx)(`button`,{type:`button`,className:`review-photo-thumb`,onClick:()=>S(e),children:(0,L.jsx)(`img`,{src:e,alt:`Customer photo`})},t))}),(0,L.jsxs)(`div`,{className:`review-meta`,children:[(0,L.jsx)(`span`,{className:`review-name`,children:e.user_name}),(0,L.jsx)(`span`,{className:`review-date`,children:new Date(e.created_at).toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`,year:`numeric`})})]})]},e.id))}),(0,L.jsx)(`div`,{className:`review-form-wrap`,children:t?(0,L.jsxs)(`form`,{className:`review-form`,onSubmit:E,children:[(0,L.jsx)(`p`,{className:`form-label`,children:`Rate this product`}),(0,L.jsx)(Sl,{value:o,onChange:s,size:22}),(0,L.jsx)(`textarea`,{placeholder:`Share your experience with this saree (optional)`,value:c,onChange:e=>l(e.target.value),rows:3,maxLength:1e3}),(0,L.jsxs)(`div`,{className:`photo-upload-row`,children:[u.map((e,t)=>(0,L.jsxs)(`div`,{className:`photo-upload-thumb`,children:[(0,L.jsx)(`img`,{src:e,alt:``}),(0,L.jsx)(`button`,{type:`button`,onClick:()=>T(t),"aria-label":`Remove photo`,children:`×`})]},t)),u.length<3&&(0,L.jsx)(`button`,{type:`button`,className:`photo-add-btn`,disabled:f,onClick:()=>C.current?.click(),children:f?`…`:`+ Photo`}),(0,L.jsx)(`input`,{ref:C,type:`file`,accept:`image/*`,multiple:!0,hidden:!0,onChange:w})]}),(0,L.jsx)(`p`,{className:`photo-hint`,children:`Add up to 3 photos of the saree you received.`}),m&&(0,L.jsx)(`p`,{className:`review-error`,children:m}),(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-outline`,disabled:g,children:g?`Posting…`:`Post Review`})]}):(0,L.jsxs)(`p`,{className:`login-prompt`,children:[(0,L.jsx)(`a`,{href:`/login`,children:`Log in`}),` to write a review.`]})}),b&&(0,L.jsxs)(`div`,{className:`photo-lightbox`,onClick:()=>S(null),children:[(0,L.jsx)(`button`,{type:`button`,className:`lightbox-close`,"aria-label":`Close`,children:`×`}),(0,L.jsx)(`img`,{src:b,alt:`Customer photo, zoomed`,onClick:e=>e.stopPropagation()})]}),(0,L.jsx)(`style`,{children:`
        .reviews-block { margin-top: 44px; padding-top: 36px; border-top: 1px solid var(--stone-200); }
        .reviews-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
        .reviews-head h3 { font-family: var(--font-display); font-size: 20px; color: var(--maroon-900); margin: 0 0 8px; }
        .summary-line { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--ink-600); }
        .no-reviews { font-size: 13px; color: var(--ink-400); margin: 0; }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 14px;
          max-height: 560px;
          overflow-y: auto;
          padding: 4px 6px 4px 2px;
          margin: 0 0 24px;
          scrollbar-width: thin;
          scrollbar-color: var(--stone-300) transparent;
        }
        .reviews-grid::-webkit-scrollbar { width: 6px; }
        .reviews-grid::-webkit-scrollbar-thumb { background: var(--stone-300); border-radius: 999px; }
        .review-card {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          box-shadow: 0 4px 14px rgba(36,26,23,0.05);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .review-comment { font-size: 13px; line-height: 1.6; color: var(--ink-700); margin: 0; flex: 1; }
        .review-photos { display: flex; gap: 6px; }
        .review-photo-thumb {
          width: 54px; height: 54px; border-radius: var(--radius-sm); overflow: hidden;
          border: 1px solid var(--stone-200); padding: 0; background: none; cursor: zoom-in;
        }
        .review-photo-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .review-meta { display: flex; justify-content: space-between; font-size: 11.5px; color: var(--ink-400); }
        .review-name { font-weight: 600; color: var(--ink-900); }

        .review-form-wrap { max-width: 440px; }
        .review-form { display: flex; flex-direction: column; gap: 12px; }
        .form-label { font-size: 12.5px; color: var(--ink-600); margin: 0; }
        .review-form textarea {
          padding: 11px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--stone-200);
          font-family: var(--font-body);
          font-size: 13.5px;
          resize: vertical;
        }
        .photo-upload-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .photo-upload-thumb {
          position: relative; width: 56px; height: 56px;
          border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--stone-200);
        }
        .photo-upload-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .photo-upload-thumb button {
          position: absolute; top: 2px; right: 2px; width: 16px; height: 16px;
          border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; border: none;
          font-size: 11px; line-height: 1; display: flex; align-items: center; justify-content: center;
        }
        .photo-add-btn {
          width: 56px; height: 56px; border-radius: var(--radius-sm);
          border: 1px dashed var(--stone-300); background: none; font-size: 11px; color: var(--ink-400);
        }
        .photo-hint { font-size: 11px; color: var(--ink-400); margin: -6px 0 0; }
        .review-error { font-size: 12.5px; color: #a13a3a; margin: 0; }
        .review-form .btn { align-self: flex-start; }
        .login-prompt { font-size: 13px; color: var(--ink-600); }
        .login-prompt a { color: var(--gold-600); border-bottom: 1px solid var(--gold-500); }

        .photo-lightbox {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(20,10,10,0.88);
          display: flex; align-items: center; justify-content: center;
          padding: 32px;
          cursor: zoom-out;
        }
        .photo-lightbox img {
          max-width: min(90vw, 640px);
          max-height: 85vh;
          border-radius: var(--radius-md);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          cursor: default;
        }
        .lightbox-close {
          position: absolute; top: 20px; right: 24px;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.12); color: #fff; border: none; font-size: 22px;
        }

        @media (max-width: 600px) {
          .reviews-grid { grid-template-columns: 1fr; max-height: 460px; }
        }
      `})]}):null}function Tl({testimonials:e}){let[t,n]=(0,x.useState)(0),r=(0,x.useRef)(null);return(0,x.useEffect)(()=>{if(!(e.length<2))return r.current=setInterval(()=>{n(t=>(t+1)%e.length)},5e3),()=>clearInterval(r.current)},[e.length]),e.length?(0,L.jsxs)(`div`,{className:`testimonials`,children:[(0,L.jsx)(Vc,{as:`p`,direction:`fade`,className:`eyebrow`,children:`Customer Love`}),(0,L.jsx)(Vc,{as:`h2`,delay:.08,direction:`right`,distance:32,children:`What she said`}),(0,L.jsx)(`div`,{className:`testimonial-stage`,children:e.map((e,n)=>(0,L.jsxs)(`div`,{className:`testimonial-slide`+(n===t?` active`:``),children:[(0,L.jsx)(`div`,{className:`stars`,"aria-label":`${e.rating} out of 5 stars`,children:Array.from({length:5}).map((r,i)=>(0,L.jsx)(`svg`,{viewBox:`0 0 20 20`,fill:i<e.rating?`currentColor`:`none`,"aria-hidden":`true`,className:n===t?`star-pop`:``,style:{"--star-delay":`${i*.06}s`},children:(0,L.jsx)(`path`,{d:`M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8L10 1.5z`,stroke:`currentColor`,strokeWidth:`1.2`,strokeLinejoin:`round`})},i))}),(0,L.jsxs)(`p`,{className:`testimonial-text`,children:[`“`,e.text,`”`]}),(0,L.jsxs)(`p`,{className:`testimonial-name`,children:[`— `,e.name]})]},e.id))}),e.length>1&&(0,L.jsx)(`div`,{className:`testimonial-dots`,children:e.map((e,r)=>(0,L.jsx)(`button`,{className:`testimonial-dot`+(r===t?` active`:``),onClick:()=>n(r),"aria-label":`Show review ${r+1}`},e.id))}),(0,L.jsx)(`style`,{children:`
        .testimonials {
          padding: 48px 0 8px;
          text-align: center;
        }
        .testimonials h2 { margin-top: 8px; }
        .testimonial-stage {
          position: relative;
          max-width: 560px;
          margin: 32px auto 0;
          min-height: 150px;
        }
        .testimonial-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }
        .testimonial-slide.active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          position: relative;
        }
        .stars {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          color: var(--gold-500);
          margin: 0 auto 18px;
        }
        .stars svg { width: 26px; height: 26px; }
        .stars svg.star-pop {
          animation: starPop 0.5s cubic-bezier(.2,1.4,.4,1) both;
          animation-delay: var(--star-delay, 0s);
        }
        @keyframes starPop {
          0% { opacity: 0; transform: scale(0.3) rotate(-12deg); }
          70% { opacity: 1; transform: scale(1.15) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .testimonial-text {
          font-size: 16px;
          line-height: 1.7;
          color: var(--ink-900);
          font-style: italic;
        }
        .testimonial-name {
          margin-top: 14px;
          font-size: 13px;
          color: var(--ink-600);
        }
        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin-top: 24px;
        }
        .testimonial-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--stone-200);
          border: none;
          padding: 0;
          transition: background 0.2s ease, width 0.2s ease;
        }
        .testimonial-dot.active { background: var(--maroon-900); width: 18px; }
      `})]}):null}function El(){let[e,t]=(0,x.useState)([]);return(0,x.useEffect)(()=>{z.getCancellationPolicy().then(({policy:e})=>t(e)).catch(()=>{})},[]),e.length?(0,L.jsxs)(`div`,{className:`cancel-policy-card`,children:[(0,L.jsxs)(`div`,{className:`cancel-policy-head`,children:[(0,L.jsxs)(`svg`,{viewBox:`0 0 20 20`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`path`,{d:`M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z`,stroke:`currentColor`,strokeWidth:`1.3`}),(0,L.jsx)(`path`,{d:`M10 6v4l2.6 2.6`,stroke:`currentColor`,strokeWidth:`1.3`,strokeLinecap:`round`,strokeLinejoin:`round`})]}),(0,L.jsx)(`p`,{children:`Easy Cancellation`})]}),(0,L.jsx)(`ul`,{children:e.map(e=>(0,L.jsxs)(`li`,{children:[(0,L.jsx)(`span`,{className:`tier-label`,children:e.label}),(0,L.jsxs)(`span`,{className:`tier-refund`,children:[e.refund_percent,`% refund`]})]},e.id))}),(0,L.jsx)(`p`,{className:`cancel-policy-note`,children:`Cancel anytime from My Orders — refund amount depends on how soon after payment you cancel.`}),(0,L.jsx)(`style`,{children:`
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
      `})]}):null}function Dl(){let{id:e}=ht(),[t,n]=(0,x.useState)(null),[r,i]=(0,x.useState)(!1),[a,o]=(0,x.useState)(1),[s,c]=(0,x.useState)(!1),[l,u]=(0,x.useState)([]),[d,f]=(0,x.useState)(null),[p,m]=(0,x.useState)(null),[h,g]=(0,x.useState)({heading:`Recommended For You`,productIds:[]}),{addItem:_}=rr(),v=dt();if((0,x.useEffect)(()=>{let e=!0;return z.getProducts().then(({products:t})=>e&&m(t)).catch(()=>e&&m([])),z.getHomeSection(`recommended`).then(({section:t})=>{e&&t?.content&&g(e=>({...e,...t.content}))}).catch(()=>{}),()=>{e=!1}},[]),(0,x.useEffect)(()=>{let t=!0;return c(!1),o(1),n(null),i(!1),f(null),z.getProduct(e).then(({product:e})=>t&&n(e)).catch(()=>{let r=Yn().find(t=>t.id===e);t&&(r?n(r):i(!0))}),z.getTestimonials(e).then(({testimonials:e})=>t&&u(e)).catch(()=>{}),()=>{t=!1}},[e]),r)return(0,L.jsxs)(`div`,{className:`container`,style:{padding:`80px 32px`},children:[(0,L.jsx)(`p`,{children:`We couldn't find that saree.`}),(0,L.jsx)(I,{to:`/products`,className:`btn btn-outline`,style:{marginTop:16},children:`Back to products`})]});if(!t||p===null)return(0,L.jsx)(`div`,{className:`detail-page`,style:{minHeight:`100vh`}});let y=t.stock===0,b=[t.image,...t.images||[]].filter((e,t,n)=>e&&n.indexOf(e)===t),S=d||b[0],C=S?.startsWith(`http`)?S:void 0;function w(){_(t,a),c(!0)}return(0,L.jsxs)(`div`,{className:`detail-page`,children:[(0,L.jsx)(J,{title:t.name,path:`/products/${t.id}`,description:(t.description||`${t.name} — handcrafted Indian saree from Sri Kala Silk Emporium.`).slice(0,160),image:C,type:`product`,jsonLd:{"@context":`https://schema.org`,"@type":`Product`,name:t.name,description:t.description||void 0,image:b.filter(e=>e?.startsWith(`http`)),sku:t.id,offers:{"@type":`Offer`,url:`${sl}/products/${t.id}`,priceCurrency:`INR`,price:t.price,availability:y?`https://schema.org/OutOfStock`:`https://schema.org/InStock`}}}),(0,L.jsx)(`div`,{className:`sparkle-bg sparkle-bg-detail`,"aria-hidden":`true`,children:(0,L.jsx)(`img`,{src:`/images/sparkle-bg.svg`,alt:``})}),(0,L.jsxs)(`div`,{className:`container detail-grid`,children:[(0,L.jsxs)(`div`,{className:`detail-gallery`,children:[(0,L.jsx)(`div`,{className:`detail-image`,children:(0,L.jsx)(`img`,{src:S,alt:t.name})}),b.length>1&&(0,L.jsx)(`div`,{className:`detail-thumbs`,children:b.map((e,t)=>(0,L.jsx)(`button`,{type:`button`,className:`detail-thumb ${e===S?`active`:``}`,onClick:()=>f(e),"aria-label":`View photo ${t+1}`,children:(0,L.jsx)(`img`,{src:e,alt:``})},t))})]}),(0,L.jsxs)(`div`,{className:`detail-info`,children:[(0,L.jsx)(I,{to:`/products`,className:`back-link`,children:`← All products`}),(0,L.jsx)(`h1`,{children:t.name}),(0,L.jsxs)(`div`,{className:`detail-price`,children:[(0,L.jsx)(`span`,{className:`price`,children:Xn(t.price)}),t.mrp>t.price&&(0,L.jsx)(`span`,{className:`mrp`,children:Xn(t.mrp)})]}),(0,L.jsx)(`p`,{className:`desc`,children:t.description}),(0,L.jsx)(`p`,{className:`stock ${y?`out`:``}`,children:y?`Currently out of stock`:`${t.stock} in stock`}),!y&&(0,L.jsxs)(`div`,{className:`qty-row`,children:[(0,L.jsx)(`span`,{children:`Quantity`}),(0,L.jsxs)(`div`,{className:`qty-control`,children:[(0,L.jsx)(`button`,{type:`button`,onClick:()=>o(e=>Math.max(1,e-1)),"aria-label":`Decrease quantity`,children:`−`}),(0,L.jsx)(`span`,{children:a}),(0,L.jsx)(`button`,{type:`button`,onClick:()=>o(e=>Math.min(t.stock,e+1)),"aria-label":`Increase quantity`,children:`+`})]})]}),(0,L.jsxs)(`div`,{className:`detail-actions`,children:[(0,L.jsx)(`button`,{className:`btn btn-primary`,disabled:y,onClick:w,children:y?`Notify Me`:s?`Added ✓`:`Add to Cart`}),!y&&(0,L.jsx)(`button`,{className:`btn btn-outline`,onClick:()=>{_(t,a),v(`/checkout`)},children:`Buy Now`})]}),s&&(0,L.jsx)(I,{to:`/cart`,className:`view-cart-link`,children:`View cart →`}),(0,L.jsx)(El,{})]})]}),(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsx)(Tl,{testimonials:l}),(0,L.jsx)(wl,{productId:t.id})]}),(0,L.jsx)(q,{products:p,curatedIds:h.productIds,title:h.heading,excludeId:t.id}),(0,L.jsx)(`style`,{children:`
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
        .detail-price { display: flex; align-items: baseline; gap: 12px; margin-bottom: 22px; }
        .detail-price .price { font-size: 24px; font-weight: 600; color: var(--maroon-900); }
        .detail-price .mrp { font-size: 15px; color: var(--ink-400); text-decoration: line-through; }
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
        @media (max-width: 860px) {
          .detail-grid { grid-template-columns: 1fr; gap: 28px; margin-bottom: 40px; }
        }
      `})]})}var Ol={paid:`tone-delivered`,paid_oversold:`tone-delivered`,created:`tone-processing`,failed:`tone-failed`,cancelled:`tone-cancelled`},kl={paid:`Paid`,paid_oversold:`Paid`,created:`Payment pending`,failed:`Payment failed`,cancelled:`Cancelled`};function Al(e){return e?Math.floor((Date.now()-new Date(e).getTime())/864e5):0}function jl(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)(!0),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(null),[u,d]=(0,x.useState)(``),[f,p]=(0,x.useState)([]),[m,h]=(0,x.useState)(null),[g,_]=(0,x.useState)(null);(0,x.useEffect)(()=>{z.getMyOrders().then(({orders:e})=>t(e)).catch(e=>s(e.message)).finally(()=>a(!1)),z.getCancellationPolicy().then(({policy:e})=>r(e)).catch(()=>{}),z.getProducts().then(({products:e})=>p(e)).catch(()=>{})},[]);async function v(e){_(null),h(e.id);try{await z.downloadInvoice(e.id)}catch(t){_({id:e.id,message:t.message})}finally{h(null)}}function y(e){let t=Al(e.paid_at);return n.find(e=>t<=e.max_days)||null}async function b(e){let n=y(e),r=n?`You'll receive a ${n.refund_percent}% refund (${Xn(Math.round((e.subtotal-(e.discount||0))*n.refund_percent/100))}) based on the cancellation policy.`:`This order is outside the cancellation window.`;if(window.confirm(`Cancel order #SK${e.id}?\n\n${r}`)){d(``),l(e.id);try{let n=await z.cancelOrder(e.id);t(t=>t.map(t=>t.id===e.id?{...t,status:`cancelled`,refund_percent:n.refundPercent,refund_amount:n.refundAmount}:t))}catch(e){d(e.message)}finally{l(null)}}}return(0,L.jsxs)(`div`,{className:`orders-page`,children:[(0,L.jsx)(J,{title:`My Orders`,path:`/orders`,noindex:!0}),(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsxs)(`div`,{className:`page-head`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`Your Account`}),(0,L.jsx)(`h1`,{children:`Orders`}),(0,L.jsx)(`p`,{className:`page-sub`,children:`Every order you've placed, with live payment status and item details.`})]}),i&&(0,L.jsx)(`p`,{className:`empty-msg`,children:`Loading your orders…`}),!i&&o&&(0,L.jsx)(`p`,{className:`empty-msg error`,children:o}),!i&&!o&&e.length===0&&(0,L.jsx)(`p`,{className:`empty-msg`,children:`You haven't placed any orders yet.`}),u&&(0,L.jsx)(`p`,{className:`empty-msg error`,children:u}),!i&&e.length>0&&(0,L.jsx)(`div`,{className:`orders-list`,children:e.map(e=>{let t=(e.status===`paid`||e.status===`paid_oversold`)&&y(e);return(0,L.jsxs)(`div`,{className:`order-card`,children:[(0,L.jsxs)(`div`,{className:`order-card-head`,children:[(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`span`,{className:`order-id`,children:[`#SK`,e.id]}),(0,L.jsx)(`span`,{className:`order-date`,children:new Date(e.created_at).toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`,year:`numeric`})})]}),(0,L.jsx)(`span`,{className:`status ${Ol[e.status]||``}`,children:kl[e.status]||e.status})]}),(0,L.jsx)(`div`,{className:`order-items`,children:(e.items||[]).map(e=>(0,L.jsxs)(`div`,{className:`order-item`,children:[e.product_image&&(0,L.jsx)(`img`,{src:e.product_image,alt:e.product_name}),(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`p`,{children:e.product_name}),(0,L.jsxs)(`span`,{children:[`Qty `,e.qty,` · `,Xn(e.price)]})]})]},e.id))}),(0,L.jsxs)(`div`,{className:`order-card-foot`,children:[(0,L.jsxs)(`div`,{className:`order-address`,children:[`Shipping to `,e.address_line1,`, `,e.address_city,` — `,e.address_pincode]}),(0,L.jsxs)(`div`,{className:`order-total`,children:[`Total `,(0,L.jsx)(`strong`,{children:Xn(e.subtotal-(e.discount||0)+(e.shipping_fee||0))}),e.razorpay_payment_id&&(0,L.jsxs)(`span`,{className:`payment-id`,children:[`Payment ID: `,e.razorpay_payment_id]})]})]}),e.status===`cancelled`&&e.refund_percent!=null&&(0,L.jsxs)(`p`,{className:`refund-note`,children:[`Cancelled — `,e.refund_percent,`% refund (`,Xn(e.refund_amount||0),`) will be credited to your original payment method.`]}),(0,L.jsxs)(`div`,{className:`order-card-actions`,children:[e.paid_at&&(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline invoice-btn`,disabled:m===e.id,onClick:()=>v(e),children:m===e.id?`Preparing…`:`Download Invoice`}),t&&(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline cancel-btn`,disabled:c===e.id,onClick:()=>b(e),children:c===e.id?`Cancelling…`:`Cancel Order`})]}),g&&g.id===e.id&&(0,L.jsx)(`p`,{className:`empty-msg error invoice-error`,children:g.message})]},e.id)})})]}),(0,L.jsx)(q,{products:f,title:`Shop Again`}),(0,L.jsx)(`style`,{children:`
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

        .order-items { display: flex; flex-direction: column; gap: 10px; }
        .order-item { display: flex; align-items: center; gap: 12px; font-size: 13.5px; }
        .order-item img { width: 44px; height: 56px; object-fit: cover; border-radius: 4px; }
        .order-item p { margin: 0 0 2px; }
        .order-item span { font-size: 12px; color: var(--ink-400); }

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
        .invoice-btn, .cancel-btn { font-size: 12.5px; padding: 9px 18px; margin-top: 0; }
        .invoice-error { padding: 8px 0 0; font-size: 12px; }

        @media (max-width: 600px) {
          .order-card-foot { flex-direction: column; align-items: flex-start; }
          .order-total { text-align: left; }
        }
      `})]})}function Ml(){let[e,t]=(0,x.useState)(!1);function n(e){e.preventDefault(),t(!0)}let r=B.contact.phone.replace(/[^\d+]/g,``),i=B.contact.whatsapp.replace(/[^\d]/g,``);return(0,L.jsxs)(`div`,{className:`contact-page`,children:[(0,L.jsx)(J,{title:`Contact Us`,path:`/contact`,description:`Get in touch with ${B.name} Silk Emporium for order queries, bridal consultation, or custom saree requests.`}),(0,L.jsxs)(`div`,{className:`container contact-grid`,children:[(0,L.jsxs)(`div`,{className:`contact-info`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,style:{color:`var(--brand-secondary)`},children:`Get in touch`}),(0,L.jsx)(`h1`,{children:`Contact Us`}),(0,L.jsx)(`p`,{className:`contact-lead`,children:`Questions about a saree, a bridal consultation, or a custom order — reach out directly or drop a note and our curation team will assist you shortly.`}),(0,L.jsxs)(`dl`,{className:`info-list`,children:[(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`dt`,{children:`Phone`}),(0,L.jsx)(`dd`,{children:(0,L.jsx)(`a`,{href:`tel:${r}`,children:B.contact.phone})})]}),(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`dt`,{children:`WhatsApp`}),(0,L.jsx)(`dd`,{children:(0,L.jsxs)(`a`,{href:`https://wa.me/${i}`,target:`_blank`,rel:`noreferrer`,className:`whatsapp-link`,children:[(0,L.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,"aria-hidden":`true`,children:[(0,L.jsx)(`path`,{d:`M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z`,stroke:`currentColor`,strokeWidth:`1.5`}),(0,L.jsx)(`path`,{d:`M8.5 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.7 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.5-.1 1.4-.6 1.8-.6.5-1.6.8-2.6.5-1.8-.5-3.7-1.6-5.1-3.1-1.3-1.3-2.1-2.7-2.4-3.4-.3-.7-.4-1.7.2-2.4z`,fill:`currentColor`})]}),B.contact.phone]})})]}),(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`dt`,{children:`Email`}),(0,L.jsx)(`dd`,{children:(0,L.jsx)(`a`,{href:`mailto:${B.contact.email}`,children:B.contact.email})})]}),(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`dt`,{children:`Store Location`}),(0,L.jsxs)(`dd`,{children:[B.contact.address,(0,L.jsx)(`br`,{}),(0,L.jsx)(`a`,{href:`https://maps.google.com/?q=${encodeURIComponent(B.contact.address)}`,target:`_blank`,rel:`noreferrer`,className:`directions-link`,children:`Get Directions →`})]})]}),(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`dt`,{children:`Store Hours`}),(0,L.jsxs)(`dd`,{children:[B.contact.hoursWeekday,` · `,B.contact.hoursSunday]})]}),B.contact.instagram&&(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`dt`,{children:`Instagram`}),(0,L.jsx)(`dd`,{children:(0,L.jsx)(`a`,{href:B.contact.instagram,target:`_blank`,rel:`noreferrer`,children:`@srikalasilks`})})]})]}),(0,L.jsx)(`div`,{className:`map-embed`,children:(0,L.jsx)(`iframe`,{title:`Sri Kala store location`,src:`https://maps.google.com/maps?q=${encodeURIComponent(B.contact.address)}&output=embed`,loading:`lazy`,referrerPolicy:`no-referrer-when-downgrade`})})]}),(0,L.jsx)(`form`,{className:`contact-form`,onSubmit:n,children:e?(0,L.jsxs)(`div`,{className:`form-sent`,children:[(0,L.jsx)(`h3`,{children:`Message received`}),(0,L.jsx)(`p`,{children:`Thank you — someone from Sri Kala will get back to you shortly.`})]}):(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(`label`,{children:[`Name`,(0,L.jsx)(`input`,{type:`text`,name:`name`,required:!0,placeholder:`Your name`})]}),(0,L.jsxs)(`label`,{children:[`Phone or Email`,(0,L.jsx)(`input`,{type:`text`,name:`contact`,required:!0,placeholder:`How should we reach you?`})]}),(0,L.jsxs)(`label`,{children:[`Message`,(0,L.jsx)(`textarea`,{name:`message`,rows:`5`,required:!0,placeholder:`Tell us about the sarees or consultation you need`})]}),(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Send Message`})]})})]}),(0,L.jsx)(q,{}),(0,L.jsx)(`style`,{children:`
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
      `})]})}function Nl(){let{items:e,updateQty:t,removeItem:n,subtotal:r}=rr();return(0,L.jsxs)(`div`,{className:`cart-page`,children:[(0,L.jsx)(J,{title:`Your Cart`,path:`/cart`,noindex:!0}),(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsxs)(`div`,{className:`page-head`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`Your Bag`}),(0,L.jsx)(`h1`,{children:`Cart`})]}),e.length===0?(0,L.jsxs)(`div`,{className:`empty-cart`,children:[(0,L.jsx)(`p`,{children:`Your cart is empty.`}),(0,L.jsx)(I,{to:`/products`,className:`btn btn-primary`,children:`Browse Sarees`})]}):(0,L.jsxs)(`div`,{className:`cart-grid`,children:[(0,L.jsx)(`div`,{className:`cart-items`,children:e.map(e=>(0,L.jsxs)(`div`,{className:`cart-row`,children:[(0,L.jsx)(I,{to:`/products/${e.id}`,className:`cart-thumb`,children:(0,L.jsx)(`img`,{src:e.image,alt:e.name})}),(0,L.jsxs)(`div`,{className:`cart-item-info`,children:[(0,L.jsx)(I,{to:`/products/${e.id}`,className:`cart-item-name`,children:e.name}),(0,L.jsx)(`span`,{className:`cart-item-price`,children:Xn(e.price)})]}),(0,L.jsxs)(`div`,{className:`qty-control`,children:[(0,L.jsx)(`button`,{type:`button`,onClick:()=>t(e.id,e.qty-1),"aria-label":`Decrease quantity`,children:`−`}),(0,L.jsx)(`span`,{children:e.qty}),(0,L.jsx)(`button`,{type:`button`,onClick:()=>t(e.id,e.qty+1),"aria-label":`Increase quantity`,children:`+`})]}),(0,L.jsx)(`span`,{className:`line-total`,children:Xn(e.price*e.qty)}),(0,L.jsx)(`button`,{className:`remove-btn`,onClick:()=>n(e.id),"aria-label":`Remove ${e.name}`,children:`Remove`})]},e.id))}),(0,L.jsxs)(`div`,{className:`cart-summary`,children:[(0,L.jsx)(`h3`,{children:`Order Summary`}),(0,L.jsxs)(`div`,{className:`summary-row`,children:[(0,L.jsx)(`span`,{children:`Subtotal`}),(0,L.jsx)(`span`,{children:Xn(r)})]}),(0,L.jsxs)(`div`,{className:`summary-row`,children:[(0,L.jsx)(`span`,{children:`Shipping`}),(0,L.jsx)(`span`,{children:`Calculated at checkout`})]}),(0,L.jsxs)(`div`,{className:`summary-row total`,children:[(0,L.jsx)(`span`,{children:`Total`}),(0,L.jsx)(`span`,{children:Xn(r)})]}),(0,L.jsx)(I,{to:`/checkout`,className:`btn btn-primary checkout-btn`,children:`Proceed to Checkout`})]})]})]}),(0,L.jsx)(q,{title:`Complete The Look`}),(0,L.jsx)(`style`,{children:`
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
        .cart-item-info { display: flex; flex-direction: column; gap: 6px; }
        .cart-item-name { font-size: 13.5px; color: var(--ink-900); line-height: 1.4; }
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
      `})]})}var Pl={name:``,mobile:``,line1:``,city:``,state:``,pincode:``},Fl={fee:100,freeThreshold:0};function Y(){return new Promise((e,t)=>{if(window.Razorpay)return e();let n=document.createElement(`script`);n.src=`https://checkout.razorpay.com/v1/checkout.js`,n.onload=e,n.onerror=()=>t(Error(`Could not load Razorpay checkout.`)),document.body.appendChild(n)})}function Il(){let{items:e,subtotal:t,clearCart:n}=rr(),{user:r}=dr(),[i,a]=(0,x.useState)([]),[o,s]=(0,x.useState)(null),[c,l]=(0,x.useState)(!1),[u,d]=(0,x.useState)(Pl),[f,p]=(0,x.useState)(!1),[m,h]=(0,x.useState)(``),[g,_]=(0,x.useState)(!1),[v,y]=(0,x.useState)(``),[b,S]=(0,x.useState)(``),[C,w]=(0,x.useState)(null),[T,E]=(0,x.useState)(Fl),[D,O]=(0,x.useState)(``),[k,ee]=(0,x.useState)(!1);dt();let A=C?.discount||0,j=T.freeThreshold>0&&t>=T.freeThreshold?0:T.fee,M=T.freeThreshold>0?Math.max(T.freeThreshold-t,0):0,te=Math.max(t-A,0)+j;async function ne(){if(b.trim()){ee(!0),O(``);try{let e=await z.validateCoupon({code:b.trim(),subtotal:t});w({code:e.code,discount:e.discount})}catch(e){w(null),O(e.message)}finally{ee(!1)}}}function N(){w(null),S(``),O(``)}(0,x.useEffect)(()=>{z.getHomeSection(`shipping_settings`).then(({section:e})=>{if(e?.content){let{fee:t,freeThreshold:n}=e.content;E({fee:Number.isFinite(t)?t:Fl.fee,freeThreshold:Number.isFinite(n)?n:Fl.freeThreshold})}}).catch(()=>{}),z.getAddresses().then(({addresses:e})=>{a(e),e.length?s(e[0].id):(d(e=>({...e,name:r?.name||``,mobile:r?.mobile||``})),l(!0))}).catch(()=>l(!0))},[r]);async function P(e){if(e.preventDefault(),!(!u.line1.trim()||!u.city.trim()||!u.pincode.trim()))try{let{address:e}=await z.addAddress(u);a(t=>[e,...t]),s(e.id),l(!1),d(Pl)}catch(e){y(e.message)}}async function re(){let t=i.find(e=>e.id===o);if(!(!t||e.length===0)){y(``),_(!0);try{await Y();let i={items:e.map(e=>({productId:e.id,qty:e.qty})),address:{name:t.name,mobile:t.mobile,line1:t.line1,city:t.city,state:t.state,pincode:t.pincode},couponCode:C?.code||void 0},{orderId:a,razorpayOrderId:o,amount:s,currency:c,keyId:l}=await z.createOrder(i),u=new window.Razorpay({key:l,amount:s,currency:c,order_id:o,name:`Sri Kala`,description:`Order #SK${a}`,prefill:{name:t.name,contact:t.mobile,email:r?.email},theme:{color:`#581e15`},handler:async e=>{try{await z.verifyOrder(e),h(`SK${a}`),p(!0),n()}catch(e){y(e.message||`Payment verification failed. Please contact support.`)}finally{_(!1)}},modal:{ondismiss:()=>_(!1)}});u.on(`payment.failed`,()=>{y(`Payment failed. Please try again.`),_(!1)}),u.open()}catch(e){y(e.message),_(!1)}}}return f?(0,L.jsx)(`div`,{className:`container checkout-page`,children:(0,L.jsxs)(`div`,{className:`order-confirmed`,children:[(0,L.jsx)(`h1`,{children:`Order placed`}),(0,L.jsxs)(`p`,{children:[`Your order `,(0,L.jsx)(`strong`,{children:m}),` has been confirmed and paid. A confirmation email is on its way.`]}),(0,L.jsxs)(`div`,{className:`confirm-actions`,children:[(0,L.jsx)(I,{to:`/orders`,className:`btn btn-primary`,children:`View Orders`}),(0,L.jsx)(I,{to:`/products`,className:`btn btn-outline`,children:`Continue Shopping`})]})]})}):e.length===0?(0,L.jsxs)(`div`,{className:`container checkout-page`,children:[(0,L.jsx)(`p`,{children:`Your cart is empty.`}),(0,L.jsx)(I,{to:`/products`,className:`btn btn-primary`,style:{marginTop:16},children:`Browse Sarees`})]}):(0,L.jsxs)(`div`,{className:`checkout-page`,children:[(0,L.jsx)(J,{title:`Checkout`,path:`/checkout`,noindex:!0}),(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsxs)(`div`,{className:`page-head`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`Almost there`}),(0,L.jsx)(`h1`,{children:`Checkout`})]}),(0,L.jsxs)(`div`,{className:`checkout-grid`,children:[(0,L.jsxs)(`div`,{className:`checkout-main`,children:[(0,L.jsx)(`h3`,{children:`Delivery Address`}),i.map(e=>(0,L.jsxs)(`label`,{className:`address-card ${o===e.id?`selected`:``}`,children:[(0,L.jsx)(`input`,{type:`radio`,name:`address`,checked:o===e.id,onChange:()=>s(e.id)}),(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`strong`,{children:e.name}),` · `,e.mobile,(0,L.jsxs)(`p`,{children:[e.line1,`, `,e.city,`, `,e.state,` — `,e.pincode]})]})]},e.id)),!c&&(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline add-address-btn`,onClick:()=>l(!0),children:`+ Add a new address`}),c&&(0,L.jsxs)(`form`,{className:`address-form`,onSubmit:P,children:[(0,L.jsxs)(`div`,{className:`form-row`,children:[(0,L.jsxs)(`label`,{children:[`Full name`,(0,L.jsx)(`input`,{type:`text`,value:u.name,onChange:e=>d(t=>({...t,name:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`Mobile number`,(0,L.jsx)(`input`,{type:`tel`,value:u.mobile,onChange:e=>d(t=>({...t,mobile:e.target.value})),required:!0})]})]}),(0,L.jsxs)(`label`,{children:[`Address`,(0,L.jsx)(`input`,{type:`text`,placeholder:`House no, street, area`,value:u.line1,onChange:e=>d(t=>({...t,line1:e.target.value})),required:!0})]}),(0,L.jsxs)(`div`,{className:`form-row three`,children:[(0,L.jsxs)(`label`,{children:[`City`,(0,L.jsx)(`input`,{type:`text`,value:u.city,onChange:e=>d(t=>({...t,city:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`State`,(0,L.jsx)(`input`,{type:`text`,value:u.state,onChange:e=>d(t=>({...t,state:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`Pincode`,(0,L.jsx)(`input`,{type:`text`,value:u.pincode,onChange:e=>d(t=>({...t,pincode:e.target.value})),required:!0})]})]}),(0,L.jsxs)(`div`,{className:`form-actions`,children:[(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Save Address`}),i.length>0&&(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:()=>l(!1),children:`Cancel`})]})]}),(0,L.jsx)(`h3`,{className:`items-heading`,children:`Items`}),(0,L.jsx)(`div`,{className:`checkout-items`,children:e.map(e=>(0,L.jsxs)(`div`,{className:`checkout-item`,children:[(0,L.jsx)(`img`,{src:e.image,alt:e.name}),(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`p`,{children:e.name}),(0,L.jsxs)(`span`,{children:[`Qty `,e.qty]})]}),(0,L.jsx)(`span`,{className:`item-total`,children:Xn(e.price*e.qty)})]},e.id))})]}),(0,L.jsxs)(`div`,{className:`checkout-summary`,children:[(0,L.jsx)(`h3`,{children:`Order Summary`}),(0,L.jsx)(`div`,{className:`coupon-box`,children:C?(0,L.jsxs)(`div`,{className:`coupon-applied`,children:[(0,L.jsxs)(`span`,{children:[(0,L.jsx)(`strong`,{children:C.code}),` applied — you saved `,Xn(C.discount)]}),(0,L.jsx)(`button`,{type:`button`,onClick:N,children:`Remove`})]}):(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(`div`,{className:`coupon-input-row`,children:[(0,L.jsx)(`input`,{type:`text`,placeholder:`Coupon code`,value:b,onChange:e=>{S(e.target.value.toUpperCase()),O(``)},onKeyDown:e=>{e.key===`Enter`&&(e.preventDefault(),ne())}}),(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline`,disabled:k||!b.trim(),onClick:ne,children:k?`Checking…`:`Apply`})]}),D&&(0,L.jsx)(`p`,{className:`coupon-error`,children:D})]})}),(0,L.jsxs)(`div`,{className:`summary-row`,children:[(0,L.jsx)(`span`,{children:`Subtotal`}),(0,L.jsx)(`span`,{children:Xn(t)})]}),A>0&&(0,L.jsxs)(`div`,{className:`summary-row discount-row`,children:[(0,L.jsx)(`span`,{children:`Coupon discount`}),(0,L.jsxs)(`span`,{children:[`−`,Xn(A)]})]}),(0,L.jsxs)(`div`,{className:`summary-row`,children:[(0,L.jsx)(`span`,{children:`Shipping`}),(0,L.jsx)(`span`,{children:j===0?`Free`:Xn(j)})]}),M>0&&(0,L.jsxs)(`p`,{className:`free-shipping-nudge`,children:[`Add `,Xn(M),` more to get free shipping.`]}),(0,L.jsxs)(`div`,{className:`summary-row total`,children:[(0,L.jsx)(`span`,{children:`Total`}),(0,L.jsx)(`span`,{children:Xn(te)})]}),v&&(0,L.jsx)(`p`,{className:`checkout-error`,children:v}),(0,L.jsx)(`button`,{className:`btn btn-primary place-order-btn`,disabled:!o||g,onClick:re,children:g?`Processing…`:`Pay ${Xn(te)} with Razorpay`}),(0,L.jsx)(`p`,{className:`payment-note`,children:`Secure checkout via Razorpay — UPI, cards, net banking & wallets.`})]})]})]}),(0,L.jsx)(q,{title:`Add To Your Order`}),(0,L.jsx)(`style`,{children:`
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
      `})]})}var X={name:``,mobile:``,line1:``,city:``,state:``,pincode:``},Z={currentPassword:``,newPassword:``,confirmPassword:``};function Q(){let{user:e,logout:t}=dr(),[n,r]=(0,x.useState)({name:``,mobile:``}),[i,a]=(0,x.useState)(!1),[o,s]=(0,x.useState)([]),[c,l]=(0,x.useState)(!1),[u,d]=(0,x.useState)(X),[f,p]=(0,x.useState)(Z),[m,h]=(0,x.useState)(``),[g,_]=(0,x.useState)(!1),[v,y]=(0,x.useState)(!1);(0,x.useEffect)(()=>{e&&r({name:e.name,mobile:e.mobile||``}),z.getAddresses().then(({addresses:e})=>s(e)).catch(()=>{})},[e]);async function b(e){e.preventDefault(),await z.updateMe(n),a(!0),setTimeout(()=>a(!1),2500)}async function S(e){if(e.preventDefault(),!u.line1.trim()||!u.city.trim()||!u.pincode.trim())return;let{address:t}=await z.addAddress(u);s(e=>[t,...e]),d(X),l(!1)}async function C(e){await z.deleteAddress(e),s(t=>t.filter(t=>t.id!==e))}async function w(e){if(e.preventDefault(),h(``),f.newPassword!==f.confirmPassword){h(`New passwords do not match.`);return}if(f.newPassword.length<6){h(`New password must be at least 6 characters.`);return}y(!0);try{await z.changePassword({currentPassword:f.currentPassword,newPassword:f.newPassword}),p(Z),_(!0),setTimeout(()=>_(!1),2500)}catch(e){h(e.message)}finally{y(!1)}}return(0,L.jsxs)(`div`,{className:`profile-page`,children:[(0,L.jsx)(J,{title:`My Profile`,path:`/profile`,noindex:!0}),(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsxs)(`div`,{className:`page-head`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`Your Account`}),(0,L.jsx)(`h1`,{children:`Profile`})]}),(0,L.jsxs)(`div`,{className:`profile-grid`,children:[(0,L.jsxs)(`div`,{className:`profile-col`,children:[(0,L.jsxs)(`form`,{className:`profile-card`,onSubmit:b,children:[(0,L.jsx)(`h3`,{children:`Personal Details`}),(0,L.jsxs)(`label`,{children:[`Name`,(0,L.jsx)(`input`,{type:`text`,value:n.name,onChange:e=>r(t=>({...t,name:e.target.value})),placeholder:`Your full name`})]}),(0,L.jsxs)(`label`,{children:[`Mobile`,(0,L.jsx)(`input`,{type:`tel`,value:n.mobile,onChange:e=>r(t=>({...t,mobile:e.target.value})),placeholder:`10-digit mobile number`})]}),(0,L.jsxs)(`label`,{children:[`Email`,(0,L.jsx)(`input`,{type:`email`,value:e?.email||``,disabled:!0})]}),(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Save Details`}),i&&(0,L.jsx)(`span`,{className:`saved-msg`,children:`Saved ✓`}),(0,L.jsxs)(`div`,{className:`profile-links`,children:[(0,L.jsx)(I,{to:`/orders`,children:`View your orders →`}),(0,L.jsx)(`button`,{type:`button`,className:`logout-btn`,onClick:t,children:`Log out`})]})]}),(0,L.jsxs)(`form`,{className:`profile-card`,onSubmit:w,children:[(0,L.jsx)(`h3`,{children:`Change Password`}),(0,L.jsxs)(`label`,{children:[`Current password`,(0,L.jsx)(`input`,{type:`password`,value:f.currentPassword,onChange:e=>p(t=>({...t,currentPassword:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`New password`,(0,L.jsx)(`input`,{type:`password`,value:f.newPassword,onChange:e=>p(t=>({...t,newPassword:e.target.value})),minLength:6,required:!0})]}),(0,L.jsxs)(`label`,{children:[`Confirm new password`,(0,L.jsx)(`input`,{type:`password`,value:f.confirmPassword,onChange:e=>p(t=>({...t,confirmPassword:e.target.value})),minLength:6,required:!0})]}),m&&(0,L.jsx)(`p`,{className:`password-error`,children:m}),(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-outline`,disabled:v,children:v?`Updating…`:`Update Password`}),g&&(0,L.jsx)(`span`,{className:`saved-msg`,children:`Password updated ✓`})]})]}),(0,L.jsxs)(`div`,{className:`address-card-panel`,children:[(0,L.jsxs)(`div`,{className:`panel-head`,children:[(0,L.jsx)(`h3`,{children:`Saved Addresses`}),!c&&(0,L.jsx)(`button`,{type:`button`,className:`add-link`,onClick:()=>l(!0),children:`+ Add address`})]}),o.length===0&&!c&&(0,L.jsx)(`p`,{className:`empty`,children:`No addresses saved yet.`}),o.map(e=>(0,L.jsxs)(`div`,{className:`saved-address`,children:[(0,L.jsxs)(`div`,{children:[(0,L.jsx)(`strong`,{children:e.name}),` · `,e.mobile,(0,L.jsxs)(`p`,{children:[e.line1,`, `,e.city,`, `,e.state,` — `,e.pincode]})]}),(0,L.jsx)(`button`,{onClick:()=>C(e.id),className:`danger`,children:`Remove`})]},e.id)),c&&(0,L.jsxs)(`form`,{className:`address-form`,onSubmit:S,children:[(0,L.jsxs)(`div`,{className:`form-row`,children:[(0,L.jsxs)(`label`,{children:[`Full name`,(0,L.jsx)(`input`,{type:`text`,value:u.name,onChange:e=>d(t=>({...t,name:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`Mobile number`,(0,L.jsx)(`input`,{type:`tel`,value:u.mobile,onChange:e=>d(t=>({...t,mobile:e.target.value})),required:!0})]})]}),(0,L.jsxs)(`label`,{children:[`Address`,(0,L.jsx)(`input`,{type:`text`,placeholder:`House no, street, area`,value:u.line1,onChange:e=>d(t=>({...t,line1:e.target.value})),required:!0})]}),(0,L.jsxs)(`div`,{className:`form-row three`,children:[(0,L.jsxs)(`label`,{children:[`City`,(0,L.jsx)(`input`,{type:`text`,value:u.city,onChange:e=>d(t=>({...t,city:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`State`,(0,L.jsx)(`input`,{type:`text`,value:u.state,onChange:e=>d(t=>({...t,state:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`Pincode`,(0,L.jsx)(`input`,{type:`text`,value:u.pincode,onChange:e=>d(t=>({...t,pincode:e.target.value})),required:!0})]})]}),(0,L.jsxs)(`div`,{className:`form-actions`,children:[(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Save Address`}),(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:()=>l(!1),children:`Cancel`})]})]})]})]})]}),(0,L.jsx)(q,{}),(0,L.jsx)(`style`,{children:`
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
          padding: 14px 16px;
          margin-bottom: 12px;
          font-size: 13.5px;
        }
        .saved-address p { margin: 4px 0 0; color: var(--ink-600); }
        .saved-address .danger { background: none; border: none; font-size: 12px; color: #a13a3a; white-space: nowrap; }

        .address-form {
          background: var(--stone-100);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 8px;
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

        @media (max-width: 860px) {
          .profile-grid { grid-template-columns: 1fr; }
          .form-row, .form-row.three { grid-template-columns: 1fr; }
        }
      `})]})}function Ll({onCredential:e,onError:t}){(0,x.useRef)(null);let[n,r]=(0,x.useState)(!1);return(0,x.useEffect)(()=>{},[]),null}function Rl(){let[e,t]=(0,x.useState)(`login`),[n,r]=(0,x.useState)({name:``,email:``,password:``,mobile:``}),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(!1),{login:c,signup:l,googleLogin:u}=dr(),d=dt(),f=ct().state?.from||`/`;async function p(t){t.preventDefault(),a(``),s(!0);try{e===`login`?await c(n.email,n.password):await l(n),d(f,{replace:!0})}catch(e){a(e.message)}finally{s(!1)}}async function m(e){a(``),s(!0);try{let{needsMobile:t}=await u(e);t?d(`/complete-profile`,{replace:!0,state:{from:f}}):d(f,{replace:!0})}catch(e){a(e.message)}finally{s(!1)}}return(0,L.jsxs)(`div`,{className:`auth-page`,children:[(0,L.jsx)(J,{title:`Log In`,path:`/login`,noindex:!0}),(0,L.jsx)(`div`,{className:`container auth-wrap`,children:(0,L.jsxs)(`div`,{className:`auth-card`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`Welcome`}),(0,L.jsx)(`h1`,{children:e===`login`?`Log in`:`Create your account`}),(0,L.jsxs)(`p`,{className:`auth-sub`,children:[e===`login`?`New to Sri Kala? `:`Already have an account? `,(0,L.jsx)(`button`,{type:`button`,className:`link-btn`,onClick:()=>{t(e===`login`?`signup`:`login`),a(``)},children:e===`login`?`Sign up`:`Log in`})]}),(0,L.jsxs)(`form`,{onSubmit:p,className:`auth-form`,children:[e===`signup`&&(0,L.jsxs)(`label`,{children:[`Full name`,(0,L.jsx)(`input`,{type:`text`,required:!0,value:n.name,onChange:e=>r(t=>({...t,name:e.target.value}))})]}),(0,L.jsxs)(`label`,{children:[`Email`,(0,L.jsx)(`input`,{type:`email`,required:!0,value:n.email,onChange:e=>r(t=>({...t,email:e.target.value}))})]}),e===`signup`&&(0,L.jsxs)(`label`,{children:[`Mobile`,(0,L.jsx)(`input`,{type:`tel`,value:n.mobile,onChange:e=>r(t=>({...t,mobile:e.target.value}))})]}),(0,L.jsxs)(`label`,{children:[`Password`,(0,L.jsx)(`input`,{type:`password`,required:!0,minLength:6,value:n.password,onChange:e=>r(t=>({...t,password:e.target.value}))})]}),e===`login`&&(0,L.jsx)(I,{to:`/forgot-password`,className:`forgot-link`,children:`Forgot password?`}),i&&(0,L.jsx)(`p`,{className:`auth-error`,children:i}),(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:o,children:o?`Please wait…`:e===`login`?`Log in`:`Create account`})]}),(0,L.jsx)(`div`,{className:`auth-divider`,children:(0,L.jsx)(`span`,{children:`or`})}),(0,L.jsx)(Ll,{onCredential:m,onError:a}),(0,L.jsx)(I,{to:`/`,className:`back-link`,children:`← Back to home`})]})}),(0,L.jsx)(`style`,{children:`
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
        .auth-sub { font-size: 13px; color: var(--ink-600); margin-bottom: 22px; }
        .link-btn { background: none; border: none; color: var(--gold-600); border-bottom: 1px solid var(--gold-500); font-size: 13px; padding: 0; }
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
        .forgot-link { align-self: flex-start; font-size: 12.5px; color: var(--gold-600); margin-top: -6px; }
        .auth-form .btn { margin-top: 6px; }
        .auth-divider { display: flex; align-items: center; gap: 12px; margin: 22px 0 16px; font-size: 11.5px; color: var(--ink-400); text-transform: uppercase; letter-spacing: 0.06em; }
        .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: var(--stone-200); }
        .google-signin-wrap { display: flex; justify-content: center; min-height: 40px; }
        .google-signin-placeholder { width: 320px; max-width: 100%; height: 40px; border-radius: var(--radius-sm); background: var(--stone-100); }
        .back-link { display: inline-block; margin-top: 20px; font-size: 12.5px; color: var(--ink-400); }
      `})]})}function zl(){let[e,t]=(0,x.useState)(``),[n,r]=(0,x.useState)(``),[i,a]=(0,x.useState)(!1),[o,s]=(0,x.useState)(!1),{forgotPassword:c}=dr();async function l(t){t.preventDefault(),r(``),a(!0);try{await c(e),s(!0)}catch(e){r(e.message)}finally{a(!1)}}return(0,L.jsxs)(`div`,{className:`auth-page`,children:[(0,L.jsx)(J,{title:`Forgot Password`,path:`/forgot-password`,noindex:!0}),(0,L.jsx)(`div`,{className:`container auth-wrap`,children:(0,L.jsxs)(`div`,{className:`auth-card`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`Reset password`}),(0,L.jsx)(`h1`,{children:`Forgot your password?`}),o?(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(`p`,{className:`auth-sub`,style:{marginBottom:0},children:[`If an account exists for `,(0,L.jsx)(`strong`,{children:e}),`, we’ve sent a link to reset your password. It expires in 30 minutes.`]}),(0,L.jsx)(I,{to:`/login`,className:`back-link`,children:`← Back to log in`})]}):(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(`p`,{className:`auth-sub`,children:`Enter the email on your account and we’ll send you a link to reset your password.`}),(0,L.jsxs)(`form`,{onSubmit:l,className:`auth-form`,children:[(0,L.jsxs)(`label`,{children:[`Email`,(0,L.jsx)(`input`,{type:`email`,required:!0,autoFocus:!0,value:e,onChange:e=>t(e.target.value)})]}),n&&(0,L.jsx)(`p`,{className:`auth-error`,children:n}),(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:i,children:i?`Sending…`:`Send reset link`})]}),(0,L.jsx)(I,{to:`/login`,className:`back-link`,children:`← Back to log in`})]})]})}),(0,L.jsx)(`style`,{children:`
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
      `})]})}function Bl(){let[e]=Nn(),t=e.get(`token`)||``,[n,r]=(0,x.useState)(``),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(!1),{resetPassword:u}=dr(),d=dt();async function f(e){if(e.preventDefault(),s(``),n!==i){s(`Passwords don't match.`);return}l(!0);try{await u(t,n),d(`/profile`,{replace:!0})}catch(e){s(e.message)}finally{l(!1)}}return(0,L.jsxs)(`div`,{className:`auth-page`,children:[(0,L.jsx)(J,{title:`Reset Password`,path:`/reset-password`,noindex:!0}),(0,L.jsx)(`div`,{className:`container auth-wrap`,children:(0,L.jsxs)(`div`,{className:`auth-card`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`Reset password`}),(0,L.jsx)(`h1`,{children:`Choose a new password`}),t?(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(`p`,{className:`auth-sub`,children:`Enter a new password for your account.`}),(0,L.jsxs)(`form`,{onSubmit:f,className:`auth-form`,children:[(0,L.jsxs)(`label`,{children:[`New password`,(0,L.jsx)(`input`,{type:`password`,required:!0,minLength:6,autoFocus:!0,value:n,onChange:e=>r(e.target.value)})]}),(0,L.jsxs)(`label`,{children:[`Confirm new password`,(0,L.jsx)(`input`,{type:`password`,required:!0,minLength:6,value:i,onChange:e=>a(e.target.value)})]}),o&&(0,L.jsx)(`p`,{className:`auth-error`,children:o}),(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:c,children:c?`Saving…`:`Reset password`})]}),(0,L.jsx)(I,{to:`/login`,className:`back-link`,children:`← Back to log in`})]}):(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(`p`,{className:`auth-sub`,style:{marginBottom:0},children:`This reset link is missing or invalid. Please request a new one.`}),(0,L.jsx)(I,{to:`/forgot-password`,className:`back-link`,children:`← Request a new link`})]})]})}),(0,L.jsx)(`style`,{children:`
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
      `})]})}function Vl(){let{user:e}=dr(),[t,n]=(0,x.useState)(``),[r,i]=(0,x.useState)(``),[a,o]=(0,x.useState)(!1),s=dt(),c=ct().state?.from||`/`;async function l(e){e.preventDefault(),i(``),o(!0);try{await z.updateMe({mobile:t}),s(c,{replace:!0})}catch(e){i(e.message)}finally{o(!1)}}return(0,L.jsxs)(`div`,{className:`auth-page`,children:[(0,L.jsx)(J,{title:`Complete Your Profile`,path:`/complete-profile`,noindex:!0}),(0,L.jsx)(`div`,{className:`container auth-wrap`,children:(0,L.jsxs)(`div`,{className:`auth-card`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`Almost there`}),(0,L.jsxs)(`h1`,{children:[`Welcome`,e?.name?`, ${e.name.split(` `)[0]}`:``,`!`]}),(0,L.jsx)(`p`,{className:`auth-sub`,children:`One last thing — we need a mobile number on file for order updates and delivery.`}),(0,L.jsxs)(`form`,{onSubmit:l,className:`auth-form`,children:[(0,L.jsxs)(`label`,{children:[`Mobile number`,(0,L.jsx)(`input`,{type:`tel`,required:!0,autoFocus:!0,placeholder:`e.g. 98765 43210`,value:t,onChange:e=>n(e.target.value)})]}),r&&(0,L.jsx)(`p`,{className:`auth-error`,children:r}),(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:a,children:a?`Saving…`:`Continue`})]})]})}),(0,L.jsx)(`style`,{children:`
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
      `})]})}function Hl(){return(0,L.jsxs)(`div`,{className:`not-found-page`,children:[(0,L.jsx)(J,{title:`Page Not Found`,path:`/404`,noindex:!0}),(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`Error 404`}),(0,L.jsx)(`h1`,{children:`This page doesn't exist`}),(0,L.jsx)(`p`,{className:`not-found-sub`,children:`The link you followed might be broken, or the page may have moved. Let's get you back to somewhere useful.`}),(0,L.jsxs)(`div`,{className:`not-found-actions`,children:[(0,L.jsx)(I,{to:`/`,className:`btn btn-primary`,children:`Back to Home`}),(0,L.jsx)(I,{to:`/products`,className:`btn btn-outline`,children:`Shop Sarees`})]})]}),(0,L.jsx)(`style`,{children:`
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
      `})]})}var Ul=[{to:`/admin`,label:`Dashboard`,end:!0},{to:`/admin/home`,label:`Home Page`},{to:`/admin/about`,label:`About Page`},{to:`/admin/categories`,label:`Categories`},{to:`/admin/products`,label:`Products`},{to:`/admin/orders`,label:`Orders`},{to:`/admin/coupons`,label:`Coupons`},{to:`/admin/cancellation-policy`,label:`Cancellation Policy`},{to:`/admin/reviews`,label:`Reviews`},{to:`/admin/testimonials`,label:`Testimonials`}];function Wl(){let{login:e}=dr(),[t,n]=(0,x.useState)({email:``,password:``}),[r,i]=(0,x.useState)(``),[a,o]=(0,x.useState)(!1);async function s(n){n.preventDefault(),i(``),o(!0);try{(await e(t.email,t.password)).isAdmin||i(`This account does not have admin access.`)}catch(e){i(e.message)}finally{o(!1)}}return(0,L.jsxs)(`div`,{className:`admin-gate`,children:[(0,L.jsx)(J,{title:`Admin Login`,path:`/admin`,noindex:!0}),(0,L.jsxs)(`form`,{className:`admin-gate-card`,onSubmit:s,children:[(0,L.jsxs)(`div`,{className:`admin-brand`,children:[(0,L.jsx)(`img`,{src:`/images/monogram.png`,alt:``,className:`brand-mark`}),` Sri Kala `,(0,L.jsx)(`span`,{className:`cms-tag`,children:`CMS`})]}),(0,L.jsx)(`h1`,{children:`Admin Login`}),(0,L.jsxs)(`label`,{children:[`Email`,(0,L.jsx)(`input`,{type:`email`,required:!0,value:t.email,onChange:e=>n(t=>({...t,email:e.target.value}))})]}),(0,L.jsxs)(`label`,{children:[`Password`,(0,L.jsx)(`input`,{type:`password`,required:!0,value:t.password,onChange:e=>n(t=>({...t,password:e.target.value}))})]}),r&&(0,L.jsx)(`p`,{className:`gate-error`,children:r}),(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:a,children:a?`Please wait…`:`Log in`})]}),(0,L.jsx)(`style`,{children:`
        .admin-gate { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--stone-100); }
        .admin-gate-card { width: 100%; max-width: 340px; background: var(--paper); border-radius: var(--radius-md); padding: 32px; display: flex; flex-direction: column; gap: 14px; }
        .admin-gate-card h1 { font-size: 20px; margin: 0 0 6px; color: var(--maroon-900); }
        .admin-gate-card .admin-brand { color: var(--maroon-900); }
        .admin-gate-card label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--ink-600); }
        .admin-gate-card input { padding: 11px 12px; border-radius: var(--radius-sm); border: 1px solid var(--stone-200); font-size: 13.5px; }
        .gate-error { font-size: 12.5px; color: #a13a3a; margin: 0; }
      `})]})}function Gl(){let{user:e,loading:t,isAdmin:n,logout:r}=dr();return t?null:!e||!n?(0,L.jsx)(Wl,{}):(0,L.jsxs)(`div`,{className:`admin-shell`,children:[(0,L.jsx)(J,{title:`Admin`,path:`/admin`,noindex:!0}),(0,L.jsxs)(`aside`,{className:`admin-sidebar`,children:[(0,L.jsxs)(`div`,{className:`admin-brand`,children:[(0,L.jsx)(`img`,{src:`/images/monogram-white.png`,alt:``,className:`brand-mark`}),` Sri Kala `,(0,L.jsx)(`span`,{className:`cms-tag`,children:`CMS`})]}),(0,L.jsx)(`nav`,{children:Ul.map(e=>(0,L.jsx)(On,{to:e.to,end:e.end,className:({isActive:e})=>`admin-link`+(e?` active`:``),children:e.label},e.to))}),(0,L.jsx)(`button`,{type:`button`,className:`back-to-site logout-btn`,onClick:r,children:`Log out`}),(0,L.jsx)(On,{to:`/`,className:`back-to-site`,children:`← Back to site`})]}),(0,L.jsx)(`main`,{className:`admin-main`,children:(0,L.jsx)(Rt,{})}),(0,L.jsx)(`style`,{children:`
        .admin-shell {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: 100vh;
          background: var(--stone-100);
        }
        .admin-sidebar {
          background: var(--maroon-950);
          color: var(--blush-300);
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
        }
        .admin-brand {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--ivory);
          margin-bottom: 34px;
          display: flex;
          align-items: center;
          gap: 8px;
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
        .admin-sidebar nav { display: flex; flex-direction: column; gap: 4px; }
        .admin-link {
          padding: 11px 14px;
          border-radius: var(--radius-sm);
          font-size: 13.5px;
          color: var(--blush-300);
        }
        .admin-link:hover { background: rgba(255,255,255,0.06); }
        .admin-link.active { background: var(--maroon-800); color: var(--ivory); }
        .back-to-site {
          margin-top: auto;
          font-size: 12.5px;
          color: var(--blush-300);
          opacity: 0.7;
          background: none;
          border: none;
          text-align: left;
        }
        .logout-btn { margin-top: 20px; }
        .back-to-site:hover { opacity: 1; }
        .admin-main { padding: 40px 44px; }
        @media (max-width: 860px) {
          .admin-shell { grid-template-columns: 1fr; }
          .admin-sidebar { flex-direction: row; align-items: center; padding: 16px 20px; gap: 20px; flex-wrap: wrap; }
          .admin-sidebar nav { flex-direction: row; flex-wrap: wrap; }
          .back-to-site { margin-top: 0; margin-left: auto; }
          .admin-main { padding: 24px 20px; }
        }
      `})]})}function Kl(){let[e,t]=(0,x.useState)({categories:0,products:0,outOfStock:0});return(0,x.useEffect)(()=>{let e=Jn(),n=Yn();t({categories:e.length,products:n.length,outOfStock:n.filter(e=>e.stock===0).length})},[]),(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{className:`admin-page-head`,children:[(0,L.jsx)(`h1`,{children:`Dashboard`}),(0,L.jsx)(`p`,{children:`Frontend preview — this data is stored in your browser until the backend is connected.`})]}),(0,L.jsxs)(`div`,{className:`stat-grid`,children:[(0,L.jsxs)(`div`,{className:`stat-card`,children:[(0,L.jsx)(`span`,{className:`stat-num`,children:e.categories}),(0,L.jsx)(`span`,{className:`stat-label`,children:`Categories`})]}),(0,L.jsxs)(`div`,{className:`stat-card`,children:[(0,L.jsx)(`span`,{className:`stat-num`,children:e.products}),(0,L.jsx)(`span`,{className:`stat-label`,children:`Products`})]}),(0,L.jsxs)(`div`,{className:`stat-card`,children:[(0,L.jsx)(`span`,{className:`stat-num`,children:e.outOfStock}),(0,L.jsx)(`span`,{className:`stat-label`,children:`Out of Stock`})]})]}),(0,L.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 460px; line-height: 1.6; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 640px; }
        .stat-card {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stat-num { font-family: var(--font-display); font-size: 32px; color: var(--maroon-900); }
        .stat-label { font-size: 12.5px; color: var(--ink-400); }
        @media (max-width: 640px) { .stat-grid { grid-template-columns: 1fr; } }
      `})]})}function ql(e,{maxDimension:t=1600,quality:n=.82}={}){return new Promise((r,i)=>{let a=new FileReader;a.onerror=i,a.onload=()=>{let e=new Image;e.onerror=i,e.onload=()=>{let{width:i,height:a}=e;(i>t||a>t)&&(i>=a?(a=Math.round(a*t/i),i=t):(i=Math.round(i*t/a),a=t));let o=document.createElement(`canvas`);o.width=i,o.height=a,o.getContext(`2d`).drawImage(e,0,0,i,a),r(o.toDataURL(`image/jpeg`,n))},e.src=a.result},a.readAsDataURL(e)})}var Jl={hero:`Hero Banner`,showcase:`Our Collections (rail)`,featured_categories:`Shop by Category`,promo_banner:`Promo Banner`,new_arrivals:`New Arrivals`,featured:`New Arrivals`,shop_by_style:`Shop by Style (Home Grid)`,recommended:`Recommended Sarees`,shipping_settings:`Shipping`,story:`Our Craft`,testimonials:`Testimonials Heading`,social_links:`Footer — Social & Contact Links`},Yl={hero:[{key:`eyebrow`,label:`Small label above heading`,type:`text`},{key:`heading`,label:`Heading (line 1)`,type:`text`},{key:`heading2`,label:`Heading (script line 2)`,type:`text`},{key:`subheading`,label:`Subheading`,type:`textarea`},{key:`ctaLabel`,label:`Button text`,type:`text`},{key:`ctaLink`,label:`Button link`,type:`text`}],showcase:[{key:`note`,label:`Italic note (left)`,type:`textarea`},{key:`heading`,label:`Heading (right)`,type:`text`}],promo_banner:[{key:`heading`,label:`Heading`,type:`text`},{key:`subheading`,label:`Subheading`,type:`text`},{key:`ctaLabel`,label:`Button text`,type:`text`},{key:`ctaLink`,label:`Button link`,type:`text`}],featured_categories:[{key:`heading`,label:`Heading`,type:`text`}],new_arrivals:[{key:`eyebrow`,label:`Eyebrow text above heading (e.g. Fresh Off The Loom)`,type:`text`},{key:`heading`,label:`Heading`,type:`text`},{key:`subheading`,label:`Subheading description`,type:`textarea`},{key:`ctaLabel`,label:`Button text`,type:`text`},{key:`ctaLink`,label:`Button link`,type:`text`}],featured:[{key:`eyebrow`,label:`Eyebrow text above heading (e.g. Fresh Off The Loom)`,type:`text`},{key:`heading`,label:`Heading`,type:`text`},{key:`subheading`,label:`Subheading description`,type:`textarea`},{key:`ctaLabel`,label:`Button text`,type:`text`},{key:`ctaLink`,label:`Button link`,type:`text`}],shop_by_style:[{key:`eyebrow`,label:`Small label above heading`,type:`text`},{key:`heading`,label:`Section Heading (e.g. Shop by Style)`,type:`text`}],recommended:[{key:`heading`,label:`Heading`,type:`text`}],shipping_settings:[{key:`fee`,label:`Standard shipping fee (₹)`,type:`number`},{key:`freeThreshold`,label:`Free shipping when order total is at least (₹) — set to 0 to turn off free shipping`,type:`number`}],story:[{key:`eyebrow`,label:`Small label above heading`,type:`text`},{key:`heading`,label:`Heading`,type:`text`},{key:`body`,label:`Paragraph`,type:`textarea`},{key:`ctaLabel`,label:`Button text`,type:`text`},{key:`ctaLink`,label:`Button link`,type:`text`}],testimonials:[{key:`heading`,label:`Heading`,type:`text`}],social_links:[{key:`whatsapp`,label:`WhatsApp number (with country code, digits only — e.g. 917842225444)`,type:`text`},{key:`facebook`,label:`Facebook page URL`,type:`text`},{key:`twitter`,label:`Twitter / X profile URL`,type:`text`},{key:`instagram`,label:`Instagram profile URL`,type:`text`}]};function Xl(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=n,r.readAsDataURL(e)})}function Zl({slides:e=[],onChange:t,sizeHint:n}){let r=(0,x.useRef)(null),i=(0,x.useRef)(null),[a,o]=(0,x.useState)(!1);async function s(n,r){let i=Array.from(n.target.files||[]);if(i.length){o(!0);try{let n=await Promise.all(i.map(async e=>({type:r,url:r===`video`?await Xl(e):await ql(e,{maxDimension:2e3})})));t([...e,...n])}finally{o(!1),n.target.value=``}}}function c(n){t(e.filter((e,t)=>t!==n))}return(0,L.jsxs)(`div`,{className:`slides-editor`,children:[n&&(0,L.jsxs)(`p`,{className:`field-hint size-hint`,children:[`📐 Recommended size: `,(0,L.jsx)(`strong`,{children:n})]}),(0,L.jsx)(`p`,{className:`field-hint`,children:`These play in order on the home page banner. Mix photos and short video clips (a few seconds, no sound needed — it plays muted). Large videos make the page slow to load, so keep clips short and compressed.`}),e.length>1&&(0,L.jsxs)(`p`,{className:`field-hint slides-order-note`,children:[`There are `,(0,L.jsxs)(`strong`,{children:[e.length,` slides`]}),` below — they play one after another in this order. Uploading `,(0,L.jsx)(`em`,{children:`adds`}),` a new slide rather than replacing an existing one, so remove any you no longer want with the `,(0,L.jsx)(`strong`,{children:`×`}),` button.`]}),e.length>0&&(0,L.jsx)(`div`,{className:`slides-grid`,children:e.map((e,t)=>(0,L.jsxs)(`div`,{className:`slide-thumb`,children:[e.type===`video`?(0,L.jsx)(`video`,{src:e.url,muted:!0,playsInline:!0}):(0,L.jsx)(`img`,{src:e.url,alt:``}),(0,L.jsx)(`span`,{className:`slide-order-badge`,children:t+1}),(0,L.jsx)(`span`,{className:`slide-type-badge`,children:e.type}),(0,L.jsx)(`button`,{type:`button`,className:`slide-remove`,onClick:()=>c(t),"aria-label":`Remove slide ${t+1}`,children:`×`})]},`${t}-${e.url?.slice(-32)}`))}),(0,L.jsxs)(`div`,{className:`slide-upload-actions`,children:[(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline`,disabled:a,onClick:()=>r.current?.click(),children:a?`Uploading…`:`+ Add Photo`}),(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline`,disabled:a,onClick:()=>i.current?.click(),children:a?`Uploading…`:`+ Add Video`}),(0,L.jsx)(`input`,{ref:r,type:`file`,accept:`image/*`,multiple:!0,hidden:!0,onChange:e=>s(e,`image`)}),(0,L.jsx)(`input`,{ref:i,type:`file`,accept:`video/*`,multiple:!0,hidden:!0,onChange:e=>s(e,`video`)})]}),e.length===0&&(0,L.jsxs)(`p`,{className:`field-hint`,style:{marginTop:8},children:[`No banners uploaded yet`,n?` for this view`:``,` — the home page will show the default built-in banner until you add at least one.`]})]})}function Ql({products:e,selectedIds:t=[],onChange:n,max:r=12}){let[i,a]=(0,x.useState)(``),o=t.map(t=>e.find(e=>e.id===t)).filter(Boolean),s=i.trim().toLowerCase(),c=s?e.filter(e=>!t.includes(e.id)&&e.name.toLowerCase().includes(s)).slice(0,8):[];function l(e){t.includes(e)||t.length>=r||(n([...t,e]),a(``))}function u(e){n(t.filter(t=>t!==e))}function d(e,r){let i=e+r;if(i<0||i>=t.length)return;let a=[...t];[a[e],a[i]]=[a[i],a[e]],n(a)}return(0,L.jsxs)(`div`,{className:`product-picker`,children:[o.length>0&&(0,L.jsx)(`div`,{className:`picker-selected`,children:o.map((e,t)=>(0,L.jsxs)(`div`,{className:`picker-chip`,children:[(0,L.jsx)(`img`,{src:e.image,alt:``}),(0,L.jsx)(`span`,{className:`picker-chip-name`,children:e.name}),(0,L.jsxs)(`div`,{className:`picker-chip-actions`,children:[(0,L.jsx)(`button`,{type:`button`,onClick:()=>d(t,-1),disabled:t===0,"aria-label":`Move ${e.name} up`,children:`↑`}),(0,L.jsx)(`button`,{type:`button`,onClick:()=>d(t,1),disabled:t===o.length-1,"aria-label":`Move ${e.name} down`,children:`↓`}),(0,L.jsx)(`button`,{type:`button`,onClick:()=>u(e.id),"aria-label":`Remove ${e.name}`,className:`picker-chip-remove`,children:`×`})]})]},e.id))}),(0,L.jsx)(`input`,{type:`text`,placeholder:t.length>=r?`Up to ${r} selected`:`Search products to add...`,value:i,disabled:t.length>=r,onChange:e=>a(e.target.value)}),c.length>0&&(0,L.jsx)(`div`,{className:`picker-results`,children:c.map(e=>(0,L.jsxs)(`button`,{type:`button`,className:`picker-result-item`,onClick:()=>l(e.id),children:[(0,L.jsx)(`img`,{src:e.image,alt:``}),(0,L.jsx)(`span`,{children:e.name})]},e.id))}),t.length===0&&(0,L.jsx)(`p`,{className:`field-hint`,children:`Nothing picked yet — falls back to the automatic default until you add at least one.`})]})}function $l({categories:e=[],selectedIds:t=[],onChange:n,max:r=6}){let i=t.map(t=>e.find(e=>e.id===t)).filter(Boolean),a=e.filter(e=>!t.includes(e.id));function o(e){t.includes(e)||t.length>=r||n([...t,e])}function s(e){n(t.filter(t=>t!==e))}function c(e,r){let i=e+r;if(i<0||i>=t.length)return;let a=[...t],[o]=a.splice(e,1);a.splice(i,0,o),n(a)}return(0,L.jsxs)(`div`,{className:`product-picker`,children:[(0,L.jsx)(`div`,{className:`picker-chips`,children:i.map((e,t)=>(0,L.jsxs)(`div`,{className:`picker-chip`,children:[(0,L.jsx)(`img`,{src:e.image,alt:``}),(0,L.jsx)(`span`,{className:`picker-chip-name`,children:e.name}),(0,L.jsxs)(`div`,{className:`picker-chip-actions`,children:[(0,L.jsx)(`button`,{type:`button`,disabled:t===0,onClick:()=>c(t,-1),"aria-label":`Move left`,children:`‹`}),(0,L.jsx)(`button`,{type:`button`,disabled:t===i.length-1,onClick:()=>c(t,1),"aria-label":`Move right`,children:`›`}),(0,L.jsx)(`button`,{type:`button`,onClick:()=>s(e.id),"aria-label":`Remove`,children:`×`})]})]},e.id))}),a.length>0&&t.length<r&&(0,L.jsx)(`div`,{style:{marginTop:10,display:`flex`,gap:8,flexWrap:`wrap`},children:a.map(e=>(0,L.jsxs)(`button`,{type:`button`,className:`btn btn-outline`,style:{fontSize:`12px`,padding:`5px 12px`},onClick:()=>o(e.id),children:[`+ `,e.name]},e.id))}),t.length===0&&(0,L.jsx)(`p`,{className:`field-hint`,children:`Nothing picked yet — defaults to the top 5 styles from the catalog.`})]})}function eu(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)([]),[o,s]=(0,x.useState)({}),[c,l]=(0,x.useState)(``),[u,d]=(0,x.useState)(``),f=(0,x.useRef)(null);(0,x.useEffect)(()=>{z.getAllHomeSections().then(({sections:e})=>{t(e);let n={};e.forEach(e=>{n[e.section_key]={...e.content,enabled:e.enabled}}),s(n)}).catch(e=>l(e.message)),z.getProducts().then(({products:e})=>r(e)).catch(()=>{}),z.getCategories().then(({categories:e})=>a(e)).catch(()=>{})},[]);function p(e,t,n){s(r=>({...r,[e]:{...r[e],[t]:n}}))}async function m(e){let t=e.target.files?.[0];t&&p(`story`,`image`,await ql(t))}async function h(e){l(``);let{enabled:n,...r}=o[e]||{};try{let{section:i}=await z.updateHomeSection(e,{content:r,enabled:n});t(t=>t.map(t=>t.section_key===e?i:t)),d(e),setTimeout(()=>d(``),2e3)}catch(e){l(e.message)}}async function g(e,n){p(e,`enabled`,!n);try{await z.updateHomeSection(e,{enabled:!n}),t(t=>t.map(t=>t.section_key===e?{...t,enabled:!n}:t))}catch(e){l(e.message)}}return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{className:`admin-page-head`,children:[(0,L.jsx)(`h1`,{children:`Home Page`}),(0,L.jsx)(`p`,{children:`Every section on the home screen — edit the text, upload banner media, and toggle sections on or off.`})]}),c&&(0,L.jsx)(`p`,{className:`admin-error`,children:c}),(0,L.jsx)(`div`,{className:`section-list`,children:e.map(e=>{let t=Yl[e.section_key]||[],r=o[e.section_key]||{};return(0,L.jsxs)(`div`,{className:`section-card`,children:[(0,L.jsxs)(`div`,{className:`section-card-head`,children:[(0,L.jsx)(`h3`,{children:Jl[e.section_key]||e.title||e.section_key}),e.section_key!==`hero`&&(0,L.jsxs)(`label`,{className:`toggle`,children:[(0,L.jsx)(`input`,{type:`checkbox`,checked:r.enabled!==!1,onChange:()=>g(e.section_key,r.enabled!==!1)}),`Visible on home page`]})]}),t.map(t=>(0,L.jsxs)(`label`,{className:`field-label`,children:[t.label,t.type===`textarea`?(0,L.jsx)(`textarea`,{rows:3,value:r[t.key]||``,onChange:n=>p(e.section_key,t.key,n.target.value)}):t.type===`number`?(0,L.jsx)(`input`,{type:`number`,min:`0`,value:r[t.key]??``,onChange:n=>p(e.section_key,t.key,n.target.value===``?``:Number(n.target.value))}):(0,L.jsx)(`input`,{type:`text`,value:r[t.key]||``,onChange:n=>p(e.section_key,t.key,n.target.value)})]},t.key)),e.section_key===`hero`&&(0,L.jsxs)(L.Fragment,{children:[(0,L.jsxs)(`label`,{className:`field-label`,children:[`Banner photos & videos — Desktop / PC view`,(0,L.jsx)(Zl,{slides:r.slides||[],onChange:e=>p(`hero`,`slides`,e),sizeHint:`1920 × 1080px (landscape, 16:9) or similar wide crop`})]}),(0,L.jsxs)(`label`,{className:`field-label`,children:[`Banner photos & videos — Mobile view`,(0,L.jsx)(Zl,{slides:r.mobileSlides||[],onChange:e=>p(`hero`,`mobileSlides`,e),sizeHint:`1080 × 1350px (portrait, 4:5) — a tall crop reads better on phones`})]})]}),e.section_key===`story`&&(0,L.jsxs)(`label`,{className:`field-label`,children:[`Photo`,(0,L.jsx)(`input`,{type:`file`,accept:`image/*`,ref:f,onChange:m}),r.image&&(0,L.jsx)(`div`,{className:`story-preview`,children:(0,L.jsx)(`img`,{src:r.image,alt:`Preview`})})]}),(e.section_key===`new_arrivals`||e.section_key===`featured`)&&(0,L.jsxs)(`label`,{className:`field-label`,children:[`Products shown as New Arrivals`,(0,L.jsx)(Ql,{products:n,selectedIds:r.productIds||[],onChange:t=>p(e.section_key,`productIds`,t),max:8}),(0,L.jsx)(`span`,{className:`field-hint`,children:`Leave empty to automatically showcase the newest active sarees from your catalog. Or pick specific sarees above to curate this section manually.`})]}),e.section_key===`shop_by_style`&&(0,L.jsxs)(`label`,{className:`field-label`,children:[`Styles shown in this section (Card 1 [wide], Card 2 [portrait], Cards 3–5)`,(0,L.jsx)($l,{categories:i,selectedIds:r.categoryIds||[],onChange:t=>p(e.section_key,`categoryIds`,t),max:6}),(0,L.jsx)(`span`,{className:`field-hint`,children:`Selection order determines placement: 1st style spans 2 columns (e.g. Kanchivaram), 2nd style is portrait (e.g. Banarasi), and 3rd–5th styles appear in the lower row.`})]}),e.section_key===`featured_categories`&&(0,L.jsxs)(`label`,{className:`field-label`,children:[`Categories displayed in this section`,(0,L.jsx)($l,{categories:i,selectedIds:r.categoryIds||[],onChange:t=>p(e.section_key,`categoryIds`,t),max:6})]}),e.section_key===`recommended`&&(0,L.jsxs)(`label`,{className:`field-label`,children:[`Products shown as recommendations`,(0,L.jsx)(Ql,{products:n,selectedIds:r.productIds||[],onChange:t=>p(e.section_key,`productIds`,t),max:12}),(0,L.jsx)(`span`,{className:`field-hint`,children:`Shown at the bottom of the home page and on every product page (the product being viewed is skipped automatically). Leave empty for a random pick from the catalog each time.`})]}),(0,L.jsxs)(`div`,{className:`section-card-foot`,children:[(0,L.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>h(e.section_key),children:`Save`}),u===e.section_key&&(0,L.jsx)(`span`,{className:`saved-msg`,children:`Saved ✓`})]})]},e.section_key)})}),(0,L.jsx)(`style`,{children:`
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
      `})]})}function tu({images:e=[],onChange:t}){let n=(0,x.useRef)(null),[r,i]=(0,x.useState)(!1);async function a(n){let r=Array.from(n.target.files||[]);if(r.length){i(!0);try{let n=await Promise.all(r.map(e=>ql(e)));t([...e,...n])}finally{i(!1),n.target.value=``}}}function o(n){t(e.filter((e,t)=>t!==n))}return(0,L.jsxs)(`div`,{className:`slides-editor`,children:[(0,L.jsx)(`p`,{className:`field-hint`,children:`Optional extra photos shown in a strip below the story text. Add as many as you like — each one is cropped to a square so mismatched photo sizes still line up neatly.`}),e.length>0&&(0,L.jsx)(`div`,{className:`slides-grid`,children:e.map((e,t)=>(0,L.jsxs)(`div`,{className:`slide-thumb`,children:[(0,L.jsx)(`img`,{src:e,alt:``}),(0,L.jsx)(`button`,{type:`button`,className:`slide-remove`,onClick:()=>o(t),"aria-label":`Remove image`,children:`×`})]},t))}),(0,L.jsxs)(`div`,{className:`slide-upload-actions`,children:[(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline`,disabled:r,onClick:()=>n.current?.click(),children:r?`Uploading…`:`+ Add Photo`}),(0,L.jsx)(`input`,{ref:n,type:`file`,accept:`image/*`,multiple:!0,hidden:!0,onChange:a})]})]})}function nu(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)({}),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(``),c=(0,x.useRef)(null);(0,x.useEffect)(()=>{z.getAllHomeSections().then(({sections:e})=>{let n=e.filter(e=>e.section_key===`about_hero`||e.section_key===`about_story`);t(n);let i={};n.forEach(e=>{i[e.section_key]={...e.content,enabled:e.enabled}}),r(i)}).catch(e=>a(e.message))},[]);function l(e,t,n){r(r=>({...r,[e]:{...r[e],[t]:n}}))}async function u(e){let t=e.target.files?.[0];t&&l(`about_story`,`image`,await ql(t))}function d(e){return(e||[]).join(`

`)}function f(e){return e.split(/\n\s*\n/).map(e=>e.trim()).filter(Boolean)}async function p(e){a(``);let{enabled:r,...i}=n[e]||{};try{let{section:n}=await z.updateHomeSection(e,{content:i,enabled:!0,title:e===`about_hero`?`About Page — Header`:`About Page — Our Story`,sortOrder:e===`about_hero`?8:9});t(t=>t.some(t=>t.section_key===e)?t.map(t=>t.section_key===e?n:t):[...t,n]),s(e),setTimeout(()=>s(``),2e3)}catch(e){a(e.message)}}let m=n.about_hero||{},h=n.about_story||{};return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{className:`admin-page-head`,children:[(0,L.jsx)(`h1`,{children:`About Page`}),(0,L.jsx)(`p`,{children:`Everything on the "Read our story" page — header text, the story copy, the main photo, and any extra gallery photos.`})]}),i&&(0,L.jsx)(`p`,{className:`admin-error`,children:i}),(0,L.jsxs)(`div`,{className:`section-list`,children:[(0,L.jsxs)(`div`,{className:`section-card`,children:[(0,L.jsx)(`div`,{className:`section-card-head`,children:(0,L.jsx)(`h3`,{children:`Header`})}),(0,L.jsxs)(`label`,{className:`field-label`,children:[`Small label above heading`,(0,L.jsx)(`input`,{type:`text`,value:m.eyebrow||``,onChange:e=>l(`about_hero`,`eyebrow`,e.target.value)})]}),(0,L.jsxs)(`label`,{className:`field-label`,children:[`Heading`,(0,L.jsx)(`textarea`,{rows:2,value:m.heading||``,onChange:e=>l(`about_hero`,`heading`,e.target.value)})]}),(0,L.jsxs)(`div`,{className:`section-card-foot`,children:[(0,L.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>p(`about_hero`),children:`Save`}),o===`about_hero`&&(0,L.jsx)(`span`,{className:`saved-msg`,children:`Saved ✓`})]})]}),(0,L.jsxs)(`div`,{className:`section-card`,children:[(0,L.jsx)(`div`,{className:`section-card-head`,children:(0,L.jsx)(`h3`,{children:`Our Story`})}),(0,L.jsxs)(`label`,{className:`field-label`,children:[`Heading`,(0,L.jsx)(`input`,{type:`text`,value:h.heading||``,onChange:e=>l(`about_story`,`heading`,e.target.value)})]}),(0,L.jsxs)(`label`,{className:`field-label`,children:[`Paragraphs`,(0,L.jsx)(`textarea`,{rows:7,value:d(h.paragraphs),onChange:e=>l(`about_story`,`paragraphs`,f(e.target.value))}),(0,L.jsx)(`span`,{className:`field-hint`,children:`Leave a blank line between paragraphs to split them — each one renders as its own paragraph.`})]}),(0,L.jsxs)(`label`,{className:`field-label`,children:[`Main photo`,(0,L.jsx)(`input`,{type:`file`,accept:`image/*`,ref:c,onChange:u}),h.image&&(0,L.jsx)(`div`,{className:`story-preview`,children:(0,L.jsx)(`img`,{src:h.image,alt:`Preview`})})]}),(0,L.jsxs)(`label`,{className:`field-label`,children:[`Gallery photos`,(0,L.jsx)(tu,{images:h.gallery||[],onChange:e=>l(`about_story`,`gallery`,e)})]}),(0,L.jsxs)(`div`,{className:`section-card-foot`,children:[(0,L.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>p(`about_story`),children:`Save`}),o===`about_story`&&(0,L.jsx)(`span`,{className:`saved-msg`,children:`Saved ✓`})]})]})]}),(0,L.jsx)(`style`,{children:`
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
      `})]})}var ru={code:``,type:`percent`,value:``,minOrder:``,expiresAt:``,active:!0};function iu(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(ru),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(!0);(0,x.useEffect)(()=>{c()},[]);function c(){z.getCoupons().then(({coupons:e})=>t(e)).catch(e=>a(e.message)).finally(()=>s(!1))}async function l(e){if(e.preventDefault(),!(!n.code.trim()||!n.value)){a(``);try{await z.createCoupon({code:n.code.trim(),type:n.type,value:Number(n.value),minOrder:Number(n.minOrder)||0,expiresAt:n.expiresAt?new Date(n.expiresAt).toISOString():null,active:n.active}),r(ru),c()}catch(e){a(e.message)}}}async function u(e){try{await z.updateCoupon(e.id,{active:!e.active}),c()}catch(e){a(e.message)}}async function d(e){if(window.confirm(`Delete this coupon? Customers will no longer be able to use it.`))try{await z.deleteCoupon(e),c()}catch(e){a(e.message)}}function f(e){return(e.type===`percent`?`${e.value}% off`:`₹${e.value} off`)+(e.min_order>0?` on orders above ₹${e.min_order}`:``)}return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{className:`admin-page-head`,children:[(0,L.jsx)(`h1`,{children:`Coupons`}),(0,L.jsx)(`p`,{children:`Create discount codes for checkout. Each coupon can be used once per customer account — enforced automatically once a customer's payment for that order goes through.`})]}),i&&(0,L.jsx)(`p`,{className:`admin-error`,children:i}),(0,L.jsxs)(`div`,{className:`cms-layout`,children:[(0,L.jsxs)(`form`,{className:`cms-form`,onSubmit:l,children:[(0,L.jsx)(`h3`,{children:`New coupon`}),(0,L.jsxs)(`label`,{children:[`Coupon code`,(0,L.jsx)(`input`,{type:`text`,value:n.code,placeholder:`e.g. WELCOME10`,onChange:e=>r(t=>({...t,code:e.target.value.toUpperCase()})),required:!0})]}),(0,L.jsxs)(`div`,{className:`form-row`,children:[(0,L.jsxs)(`label`,{children:[`Type`,(0,L.jsxs)(`select`,{value:n.type,onChange:e=>r(t=>({...t,type:e.target.value})),children:[(0,L.jsx)(`option`,{value:`percent`,children:`Percent off`}),(0,L.jsx)(`option`,{value:`flat`,children:`Flat amount off`})]})]}),(0,L.jsxs)(`label`,{children:[n.type===`percent`?`Percent (%)`:`Amount (₹)`,(0,L.jsx)(`input`,{type:`number`,min:`1`,max:n.type===`percent`?100:void 0,value:n.value,onChange:e=>r(t=>({...t,value:e.target.value})),required:!0})]})]}),(0,L.jsxs)(`div`,{className:`form-row`,children:[(0,L.jsxs)(`label`,{children:[`Minimum order (₹)`,(0,L.jsx)(`input`,{type:`number`,min:`0`,value:n.minOrder,placeholder:`0`,onChange:e=>r(t=>({...t,minOrder:e.target.value}))})]}),(0,L.jsxs)(`label`,{children:[`Expires on`,(0,L.jsx)(`input`,{type:`date`,value:n.expiresAt,onChange:e=>r(t=>({...t,expiresAt:e.target.value}))})]})]}),(0,L.jsxs)(`label`,{className:`checkbox-row`,children:[(0,L.jsx)(`input`,{type:`checkbox`,checked:n.active,onChange:e=>r(t=>({...t,active:e.target.checked}))}),`Active immediately`]}),(0,L.jsx)(`div`,{className:`form-actions`,children:(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Create Coupon`})})]}),(0,L.jsxs)(`div`,{className:`cms-list`,children:[o&&(0,L.jsx)(`p`,{className:`empty`,children:`Loading coupons…`}),!o&&e.length===0&&(0,L.jsx)(`p`,{className:`empty`,children:`No coupons yet.`}),e.map(e=>(0,L.jsxs)(`div`,{className:`cms-row`,children:[(0,L.jsxs)(`div`,{className:`row-info`,children:[(0,L.jsx)(`strong`,{children:e.code}),(0,L.jsxs)(`span`,{children:[f(e),e.expires_at&&` · expires ${new Date(e.expires_at).toLocaleDateString(`en-IN`)}`,!e.active&&` · inactive`]})]}),(0,L.jsxs)(`div`,{className:`row-actions`,children:[(0,L.jsx)(`button`,{onClick:()=>u(e),children:e.active?`Deactivate`:`Activate`}),(0,L.jsx)(`button`,{onClick:()=>d(e.id),className:`danger`,children:`Delete`})]})]},e.id))]})]}),(0,L.jsx)(`style`,{children:`
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
          .cms-layout { grid-template-columns: 1fr; }
        }
      `})]})}var au={label:``,maxDays:``,refundPercent:``};function ou(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(au),[i,a]=(0,x.useState)(``),[o,s]=(0,x.useState)(!0);(0,x.useEffect)(()=>{c()},[]);function c(){z.getCancellationPolicy().then(({policy:e})=>t(e)).catch(e=>a(e.message)).finally(()=>s(!1))}async function l(t){if(t.preventDefault(),!(!n.label.trim()||n.maxDays===``||n.refundPercent===``)){a(``);try{await z.createPolicyTier({label:n.label.trim(),maxDays:Number(n.maxDays),refundPercent:Number(n.refundPercent),sortOrder:e.length}),r(au),c()}catch(e){a(e.message)}}}async function u(e){if(window.confirm(`Delete this cancellation tier?`))try{await z.deletePolicyTier(e),c()}catch(e){a(e.message)}}return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{className:`admin-page-head`,children:[(0,L.jsx)(`h1`,{children:`Cancellation Policy`}),(0,L.jsx)(`p`,{children:`Define refund tiers by how many days have passed since payment. The customer's "Cancel Order" button uses the first tier their order still qualifies for — set these in ascending day order. This same list is shown to customers as a card on every product page.`})]}),i&&(0,L.jsx)(`p`,{className:`admin-error`,children:i}),(0,L.jsxs)(`div`,{className:`cms-layout`,children:[(0,L.jsxs)(`form`,{className:`cms-form`,onSubmit:l,children:[(0,L.jsx)(`h3`,{children:`Add a tier`}),(0,L.jsxs)(`label`,{children:[`Label (shown to customers)`,(0,L.jsx)(`input`,{type:`text`,value:n.label,placeholder:`e.g. Within 24 hours of payment`,onChange:e=>r(t=>({...t,label:e.target.value})),required:!0})]}),(0,L.jsxs)(`div`,{className:`form-row`,children:[(0,L.jsxs)(`label`,{children:[`Up to how many days`,(0,L.jsx)(`input`,{type:`number`,min:`0`,value:n.maxDays,placeholder:`e.g. 1`,onChange:e=>r(t=>({...t,maxDays:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`Refund (%)`,(0,L.jsx)(`input`,{type:`number`,min:`0`,max:`100`,value:n.refundPercent,placeholder:`e.g. 100`,onChange:e=>r(t=>({...t,refundPercent:e.target.value})),required:!0})]})]}),(0,L.jsx)(`div`,{className:`form-actions`,children:(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:`Add Tier`})})]}),(0,L.jsxs)(`div`,{className:`cms-list`,children:[o&&(0,L.jsx)(`p`,{className:`empty`,children:`Loading…`}),!o&&e.length===0&&(0,L.jsx)(`p`,{className:`empty`,children:`No tiers yet — orders can't be cancelled until you add at least one.`}),e.map(e=>(0,L.jsxs)(`div`,{className:`cms-row`,children:[(0,L.jsxs)(`div`,{className:`row-info`,children:[(0,L.jsx)(`strong`,{children:e.label}),(0,L.jsxs)(`span`,{children:[`Up to `,e.max_days,` day`,e.max_days===1?``:`s`,` after payment · `,e.refund_percent,`% refund`]})]}),(0,L.jsx)(`div`,{className:`row-actions`,children:(0,L.jsx)(`button`,{onClick:()=>u(e.id),className:`danger`,children:`Delete`})})]},e.id))]})]}),(0,L.jsx)(`style`,{children:`
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
          .cms-layout { grid-template-columns: 1fr; }
        }
      `})]})}var su={id:null,name:``,tagline:``,image:``};function cu(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(su),[i,a]=(0,x.useState)(null),[o,s]=(0,x.useState)(``),c=(0,x.useRef)(null);(0,x.useEffect)(()=>{l()},[]);function l(){z.getAllCategoriesAdmin().then(({categories:e})=>t(e)).catch(e=>s(e.message))}function u(e){let t=e.target.files?.[0];t&&ql(t).then(e=>r(t=>({...t,image:e})))}function d(){r(su),a(null),c.current&&(c.current.value=``)}async function f(e){if(e.preventDefault(),n.name.trim()){s(``);try{if(i)await z.updateCategory(i,{name:n.name,tagline:n.tagline,image:n.image||void 0});else{let e=n.name.trim().toLowerCase().replace(/\s+/g,`-`);await z.createCategory({id:e,name:n.name,tagline:n.tagline,image:n.image||`https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc?auto=format&fit=crop&w=800&q=80`})}d(),l()}catch(e){s(e.message)}}}function p(e){r({id:e.id,name:e.name,tagline:e.tagline,image:e.image}),a(e.id)}async function m(e){if(window.confirm(`Remove this category?`))try{await z.deleteCategory(e),i===e&&d(),l()}catch(e){s(e.message)}}let[h,g]=(0,x.useState)(null);async function _(e){g(e.id);try{await z.updateCategory(e.id,{active:!e.active}),l()}catch(e){s(e.message)}finally{g(null)}}return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{className:`admin-page-head`,children:[(0,L.jsx)(`h1`,{children:`Categories`}),(0,L.jsx)(`p`,{children:`Add the saree types shown on the homepage and products page. Each needs a small photo.`})]}),o&&(0,L.jsx)(`p`,{className:`admin-error`,children:o}),(0,L.jsxs)(`div`,{className:`cms-layout`,children:[(0,L.jsxs)(`form`,{className:`cms-form`,onSubmit:f,children:[(0,L.jsx)(`h3`,{children:i?`Edit category`:`Add a category`}),(0,L.jsxs)(`label`,{children:[`Category name`,(0,L.jsx)(`input`,{type:`text`,value:n.name,placeholder:`e.g. Kanjivaram Silk`,onChange:e=>r(t=>({...t,name:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`Short tagline`,(0,L.jsx)(`input`,{type:`text`,value:n.tagline,placeholder:`e.g. Temple-woven silk, heirloom weight`,onChange:e=>r(t=>({...t,tagline:e.target.value}))})]}),(0,L.jsxs)(`label`,{children:[`Photo`,(0,L.jsx)(`input`,{type:`file`,accept:`image/*`,ref:c,onChange:u})]}),n.image&&(0,L.jsx)(`div`,{className:`preview-thumb`,children:(0,L.jsx)(`img`,{src:n.image,alt:`Preview`})}),(0,L.jsxs)(`div`,{className:`form-actions`,children:[(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:i?`Save Changes`:`Add Category`}),i&&(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:d,children:`Cancel`})]})]}),(0,L.jsxs)(`div`,{className:`cms-list`,children:[e.length===0&&(0,L.jsx)(`p`,{className:`empty`,children:`No categories yet.`}),e.map(e=>(0,L.jsxs)(`div`,{className:`cms-row ${e.active===!1?`is-hidden`:``}`,children:[(0,L.jsx)(`img`,{src:e.image,alt:``,className:`row-thumb`}),(0,L.jsxs)(`div`,{className:`row-info`,children:[(0,L.jsx)(`strong`,{children:e.name}),(0,L.jsx)(`span`,{children:e.tagline})]}),e.active===!1&&(0,L.jsx)(`span`,{className:`hidden-badge`,children:`Hidden`}),(0,L.jsxs)(`div`,{className:`row-actions`,children:[(0,L.jsx)(`button`,{onClick:()=>p(e),children:`Edit`}),(0,L.jsx)(`button`,{onClick:()=>_(e),disabled:h===e.id,children:e.active===!1?`Show`:`Hide`}),(0,L.jsx)(`button`,{onClick:()=>m(e.id),className:`danger`,children:`Delete`})]})]},e.id))]})]}),(0,L.jsx)(`style`,{children:`
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
          .cms-layout { grid-template-columns: 1fr; }
        }
      `})]})}var lu={name:``,category:``,price:``,mrp:``,discountPercent:``,stock:``,description:``,image:``,images:[],active:!0};function uu(e,t){let n=Number(e),r=Number(t);return!n||!r||r>=n?``:Math.round((n-r)/n*100)}function du(e,t){let n=Number(e);if(!n||t===``||t==null)return``;let r=Number(t);return Number.isNaN(r)?``:Math.max(0,Math.round(n*(1-r/100)))}function fu(e,t){let n=Number(e);if(!n||t===``||t==null)return``;let r=Number(t);return Number.isNaN(r)||r>=100?``:Math.round(n/(1-r/100))}function pu(e){return e===0?`stock-out`:e<=5?`stock-low`:`stock-ok`}function mu(e){return e===0?`Out of stock`:e<=5?`Low stock · ${e} left`:`${e} in stock`}function hu(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)(lu),[o,s]=(0,x.useState)(null),[c,l]=(0,x.useState)(``),u=(0,x.useRef)(null),d=(0,x.useRef)(null),[f,p]=(0,x.useState)(!1),[m,h]=(0,x.useState)(null);(0,x.useEffect)(()=>{g(),z.getCategories().then(({categories:e})=>r(e)).catch(e=>l(e.message))},[]);function g(){z.getAllProductsAdmin().then(({products:e})=>t(e)).catch(e=>l(e.message))}function _(e){let t=e.target.files?.[0];t&&ql(t).then(e=>a(t=>({...t,image:e})))}async function v(e){let t=Array.from(e.target.files||[]);if(t.length){p(!0);try{let e=await Promise.all(t.map(e=>ql(e)));a(t=>({...t,images:[...t.images||[],...e]}))}finally{p(!1),e.target.value=``}}}function y(e){a(t=>({...t,images:(t.images||[]).filter((t,n)=>n!==e)}))}function b(){a(lu),s(null),S.current=null,u.current&&(u.current.value=``)}let S=(0,x.useRef)(null);function C(e,t){return e===`price`?du(t.mrp,t.discountPercent):e===`mrp`?fu(t.price,t.discountPercent):e===`discountPercent`?uu(t.mrp,t.price):``}function w(e,t){a(n=>{let r={...n,[e]:t},i;if(S.current?.editing===e?i=S.current.target:(i=e===`mrp`?r.discountPercent===``?r.price===``?null:`discountPercent`:`price`:e===`discountPercent`?r.mrp===``?r.price===``?null:`mrp`:`price`:r.mrp===``?r.discountPercent===``?null:`mrp`:`discountPercent`,S.current={editing:e,target:i}),i){let e=C(i,r);e!==``&&(r[i]=e)}return r})}function T(e){w(`mrp`,e)}function E(e){w(`discountPercent`,e)}function D(e){w(`price`,e)}async function O(e){if(e.preventDefault(),!i.name.trim()||!i.category)return;l(``);let t={name:i.name,category:i.category,price:Number(i.price)||0,mrp:Number(i.mrp)||Number(i.price)||0,stock:Number(i.stock)||0,description:i.description,image:i.image||`https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc?auto=format&fit=crop&w=800&q=80`,images:i.images||[],active:i.active!==!1};try{o?await z.updateProduct(o,t):await z.createProduct(t),b(),g()}catch(e){l(e.message)}}async function k(e){S.current=null,a({name:e.name,category:e.category,price:e.price,mrp:e.mrp,discountPercent:uu(e.mrp,e.price),stock:e.stock,description:e.description,image:e.image,images:[],active:e.active}),s(e.id),window.scrollTo({top:0,behavior:`smooth`});try{let{product:t}=await z.getProduct(e.id);a(e=>e.images.length?e:{...e,images:t.images||[]})}catch{}}async function ee(e){if(window.confirm(`Remove this product?`))try{await z.deleteProduct(e),o===e&&b(),g()}catch(e){l(e.message)}}async function A(e,t){if(!(!t||t===e.category)){h(e.id);try{await z.updateProduct(e.id,{category:t}),g()}catch(e){l(e.message)}finally{h(null)}}}async function j(e){h(e.id);try{await z.updateProduct(e.id,{active:!e.active}),g()}catch(e){l(e.message)}finally{h(null)}}function M(e){return n.find(t=>t.id===e)?.name||e}let te=i.stock===``?null:Number(i.stock)||0,ne=i.category?e.filter(e=>e.category===i.category&&e.id!==o):[];return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{className:`admin-page-head`,children:[(0,L.jsx)(`h1`,{children:`Products`}),(0,L.jsx)(`p`,{children:`Add sarees to a category, set price, MRP and stock. Set stock to 0 to intentionally mark a product out of stock.`})]}),c&&(0,L.jsx)(`p`,{className:`admin-error`,children:c}),(0,L.jsxs)(`div`,{className:`cms-layout`,children:[(0,L.jsxs)(`form`,{className:`cms-form`,onSubmit:O,children:[(0,L.jsx)(`h3`,{children:o?`Edit product`:`Add a product`}),(0,L.jsxs)(`div`,{className:`form-section`,children:[(0,L.jsx)(`p`,{className:`section-label`,children:`Basic details`}),(0,L.jsxs)(`label`,{children:[`Product name`,(0,L.jsx)(`input`,{type:`text`,value:i.name,placeholder:`e.g. Purple Kanjivaram with Gold Zari`,onChange:e=>a(t=>({...t,name:e.target.value})),required:!0})]}),(0,L.jsxs)(`div`,{className:`category-picker`,children:[(0,L.jsxs)(`label`,{children:[`Category`,(0,L.jsxs)(`select`,{value:i.category,onChange:e=>a(t=>({...t,category:e.target.value})),required:!0,children:[(0,L.jsx)(`option`,{value:``,disabled:!0,children:`Choose a category`}),n.map(e=>(0,L.jsx)(`option`,{value:e.id,children:e.name},e.id))]})]}),i.category&&(0,L.jsxs)(`div`,{className:`category-preview`,children:[(0,L.jsxs)(`p`,{className:`category-preview-title`,children:[`Already in `,M(i.category),` (`,ne.length,`)`]}),ne.length===0?(0,L.jsx)(`p`,{className:`category-preview-empty`,children:`Nothing here yet — this'll be the first.`}):(0,L.jsx)(`div`,{className:`category-preview-list`,children:ne.map(e=>(0,L.jsxs)(`div`,{className:`category-preview-item`,children:[(0,L.jsx)(`img`,{src:e.image,alt:``}),(0,L.jsx)(`span`,{children:e.name})]},e.id))})]})]}),(0,L.jsxs)(`label`,{children:[`Description`,(0,L.jsx)(`textarea`,{rows:`3`,value:i.description,onChange:e=>a(t=>({...t,description:e.target.value})),placeholder:`Weave, colour, occasion...`})]})]}),(0,L.jsxs)(`div`,{className:`form-section`,children:[(0,L.jsx)(`p`,{className:`section-label`,children:`Pricing & inventory`}),(0,L.jsx)(`p`,{className:`field-hint pricing-hint`,children:`Fill in any two of MRP, Discount %, and Price — the third fills itself in.`}),(0,L.jsxs)(`div`,{className:`form-row`,children:[(0,L.jsxs)(`label`,{children:[`MRP (₹)`,(0,L.jsx)(`input`,{type:`number`,min:`0`,value:i.mrp,placeholder:`Original price`,onChange:e=>T(e.target.value)})]}),(0,L.jsxs)(`label`,{children:[`Discount %`,(0,L.jsx)(`input`,{type:`number`,min:`0`,max:`99`,value:i.discountPercent,placeholder:`e.g. 20`,onChange:e=>E(e.target.value)})]})]}),(0,L.jsxs)(`label`,{children:[`Price (₹) `,(0,L.jsx)(`span`,{className:`required-mark`,children:`*`}),(0,L.jsx)(`input`,{type:`number`,min:`0`,value:i.price,onChange:e=>D(e.target.value),required:!0})]}),(0,L.jsxs)(`label`,{children:[`Stock `,(0,L.jsx)(`span`,{className:`required-mark`,children:`*`}),(0,L.jsx)(`input`,{type:`number`,min:`0`,value:i.stock,placeholder:`e.g. 25`,onChange:e=>a(t=>({...t,stock:e.target.value})),required:!0})]}),te===0&&(0,L.jsxs)(`p`,{className:`stock-warning`,children:[`Stock is set to 0 — this product will show as `,(0,L.jsx)(`strong`,{children:`Out of Stock`}),` on the site the moment you save it. Enter the actual quantity available if that's not intended.`]})]}),(0,L.jsxs)(`div`,{className:`form-section`,children:[(0,L.jsx)(`p`,{className:`section-label`,children:`Photos`}),(0,L.jsxs)(`label`,{children:[`Main photo`,(0,L.jsx)(`input`,{type:`file`,accept:`image/*`,ref:u,onChange:_})]}),i.image&&(0,L.jsx)(`div`,{className:`preview-thumb`,children:(0,L.jsx)(`img`,{src:i.image,alt:`Preview`})}),(0,L.jsxs)(`label`,{children:[`Gallery photos`,(0,L.jsx)(`span`,{className:`field-hint`,children:`Extra angles or close-ups shown as thumbnails on the product page. Any size works — they're cropped to fit.`})]}),i.images?.length>0&&(0,L.jsx)(`div`,{className:`gallery-grid`,children:i.images.map((e,t)=>(0,L.jsxs)(`div`,{className:`gallery-thumb`,children:[(0,L.jsx)(`img`,{src:e,alt:``}),(0,L.jsx)(`button`,{type:`button`,className:`gallery-remove`,onClick:()=>y(t),"aria-label":`Remove image`,children:`×`})]},t))}),(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline`,disabled:f,onClick:()=>d.current?.click(),children:f?`Uploading…`:`+ Add gallery photo`}),(0,L.jsx)(`input`,{ref:d,type:`file`,accept:`image/*`,multiple:!0,hidden:!0,onChange:v})]}),(0,L.jsxs)(`div`,{className:`form-actions`,children:[(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:o?`Save Changes`:`Add Product`}),o&&(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:b,children:`Cancel`})]})]}),(0,L.jsxs)(`div`,{className:`cms-list`,children:[e.length===0&&(0,L.jsx)(`p`,{className:`empty`,children:`No products yet.`}),e.map(e=>{let t=e.mrp>e.price,r=t?Math.round((e.mrp-e.price)/e.mrp*100):0;return(0,L.jsxs)(`div`,{className:`cms-row ${e.active===!1?`is-hidden`:``}`,children:[(0,L.jsx)(`img`,{src:e.image,alt:``,className:`row-thumb-sq`}),(0,L.jsxs)(`div`,{className:`row-info`,children:[(0,L.jsx)(`strong`,{children:e.name}),(0,L.jsx)(`span`,{className:`row-category`,children:M(e.category)}),(0,L.jsxs)(`span`,{className:`row-price-line`,children:[(0,L.jsx)(`span`,{className:`row-price`,children:Xn(e.price)}),t&&(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(`span`,{className:`row-mrp`,children:Xn(e.mrp)}),(0,L.jsxs)(`span`,{className:`row-discount`,children:[r,`% off`]})]})]})]}),e.active===!1&&(0,L.jsx)(`span`,{className:`hidden-badge`,children:`Hidden`}),(0,L.jsx)(`span`,{className:`stock-badge ${pu(e.stock)}`,children:mu(e.stock)}),(0,L.jsxs)(`div`,{className:`row-actions`,children:[(0,L.jsx)(`select`,{className:`row-move-select`,value:e.category,disabled:m===e.id,onChange:t=>A(e,t.target.value),"aria-label":`Move ${e.name} to a different category`,title:`Move to a different category`,children:n.map(e=>(0,L.jsx)(`option`,{value:e.id,children:e.name},e.id))}),(0,L.jsx)(`button`,{onClick:()=>k(e),children:`Edit`}),(0,L.jsx)(`button`,{onClick:()=>j(e),disabled:m===e.id,children:e.active===!1?`Show`:`Hide`}),(0,L.jsx)(`button`,{onClick:()=>ee(e.id),className:`danger`,children:`Delete`})]})]},e.id)})]})]}),(0,L.jsx)(`style`,{children:`
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
          .cms-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr; }
          .category-picker { flex-direction: column; }
          .category-preview { flex-basis: auto; width: 100%; }
          .cms-row { flex-wrap: wrap; }
          .row-info { flex-basis: 100%; order: 1; }
          .row-thumb-sq { order: 0; }
          .stock-badge { order: 2; }
          .row-actions { order: 3; margin-left: auto; flex-wrap: wrap; justify-content: flex-end; }
        }
      `})]})}var gu={paid:`Paid`,paid_oversold:`Needs attention`,created:`Payment pending`,failed:`Failed`,cancelled:`Cancelled`};function _u(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(``),[i,a]=(0,x.useState)(!0),[o,s]=(0,x.useState)(null),[c,l]=(0,x.useState)(null);(0,x.useEffect)(()=>{z.getAllOrders().then(({orders:e})=>t(e)).catch(e=>r(e.message)).finally(()=>a(!1))},[]);async function u(e){l(null),s(e.id);try{await z.downloadInvoice(e.id)}catch(t){l({id:e.id,message:t.message})}finally{s(null)}}return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{className:`admin-page-head`,children:[(0,L.jsx)(`h1`,{children:`Orders`}),(0,L.jsx)(`p`,{children:`Every order placed on the store, with full shipping details, payment IDs, and links to each ordered product.`})]}),n&&(0,L.jsx)(`p`,{className:`admin-error`,children:n}),i&&(0,L.jsx)(`p`,{className:`empty`,children:`Loading orders…`}),!i&&(0,L.jsxs)(`div`,{className:`orders-list`,children:[e.length===0&&(0,L.jsx)(`p`,{className:`empty`,children:`No orders yet.`}),e.map(e=>(0,L.jsxs)(`div`,{className:`order-row`,children:[e.status===`paid_oversold`&&(0,L.jsx)(`div`,{className:`oversold-banner`,children:`⚠ Paid after stock ran out for one or more items — check inventory and contact the customer if needed.`}),e.status===`cancelled`&&(0,L.jsxs)(`div`,{className:`cancelled-banner`,children:[`Cancelled by customer — `,e.refund_percent,`% refund (`,Xn(e.refund_amount||0),`) `,e.razorpay_payment_id?`was attempted automatically via Razorpay. Verify it went through in the Razorpay dashboard.`:`is owed — no payment ID on file, so this needs a manual refund.`]}),(0,L.jsxs)(`div`,{className:`order-row-head`,children:[(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`strong`,{children:[`#SK`,e.id]}),(0,L.jsxs)(`span`,{className:`order-customer`,children:[e.customer_name,` · `,e.customer_email]})]}),(0,L.jsx)(`span`,{className:`status-pill status-${e.status}`,children:gu[e.status]||e.status})]}),(0,L.jsxs)(`div`,{className:`order-detail-grid`,children:[(0,L.jsxs)(`div`,{className:`detail-block`,children:[(0,L.jsx)(`p`,{className:`detail-label`,children:`Shipping address`}),(0,L.jsx)(`p`,{className:`detail-value`,children:e.address_name}),(0,L.jsx)(`p`,{className:`detail-value`,children:e.address_mobile}),(0,L.jsxs)(`p`,{className:`detail-value`,children:[e.address_line1,e.address_city?`, ${e.address_city}`:``,e.address_state?`, ${e.address_state}`:``,e.address_pincode?` – ${e.address_pincode}`:``]})]}),(0,L.jsxs)(`div`,{className:`detail-block`,children:[(0,L.jsx)(`p`,{className:`detail-label`,children:`Payment`}),(0,L.jsxs)(`p`,{className:`detail-value mono`,children:[`Order: `,e.razorpay_order_id||`—`]}),(0,L.jsxs)(`p`,{className:`detail-value mono`,children:[`Payment: `,e.razorpay_payment_id||`—`]}),e.coupon_code&&(0,L.jsxs)(`p`,{className:`detail-value coupon-tag`,children:[e.coupon_code,` applied · −`,Xn(e.discount)]})]})]}),(0,L.jsx)(`div`,{className:`order-row-items`,children:e.items.map(e=>(0,L.jsxs)(I,{to:`/products/${e.product_id}`,target:`_blank`,rel:`noopener noreferrer`,className:`item-link`,children:[e.product_image&&(0,L.jsx)(`img`,{src:e.product_image,alt:``}),(0,L.jsxs)(`span`,{children:[e.product_name,` × `,e.qty]})]},e.id))}),(0,L.jsxs)(`div`,{className:`order-row-foot`,children:[(0,L.jsx)(`span`,{children:new Date(e.created_at).toLocaleString(`en-IN`)}),e.discount>0&&(0,L.jsxs)(`span`,{children:[`Subtotal `,Xn(e.subtotal)]}),(0,L.jsx)(`strong`,{children:Xn(e.subtotal-(e.discount||0)+(e.shipping_fee||0))})]}),e.paid_at&&(0,L.jsxs)(`div`,{className:`order-row-invoice`,children:[(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline invoice-btn`,disabled:o===e.id,onClick:()=>u(e),children:o===e.id?`Preparing…`:`Download Invoice`}),c&&c.id===e.id&&(0,L.jsx)(`span`,{className:`invoice-error`,children:c.message})]})]},e.id))]}),(0,L.jsx)(`style`,{children:`
        .admin-page-head { margin-bottom: 30px; }
        .admin-page-head h1 { font-size: 26px; margin-bottom: 8px; }
        .admin-page-head p { font-size: 13px; color: var(--ink-400); max-width: 560px; line-height: 1.6; }
        .admin-error { font-size: 12.5px; color: #a13a3a; margin-bottom: 16px; }
        .empty { color: var(--ink-400); font-size: 13.5px; }

        .orders-list { display: flex; flex-direction: column; gap: 14px; }
        .order-row {
          background: var(--paper);
          border-radius: var(--radius-md);
          padding: 18px 20px;
        }
        .order-row-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .order-row-head strong { color: var(--maroon-900); margin-right: 10px; }
        .order-customer { font-size: 12.5px; color: var(--ink-400); }
        .status-pill { font-size: 11px; text-transform: capitalize; padding: 4px 10px; border-radius: 999px; flex: 0 0 auto; }
        .status-paid { background: #e8f2e6; color: #3c7a3c; }
        .status-created { background: var(--blush-300); color: var(--maroon-900); }
        .status-failed { background: #f6e3e3; color: #a13a3a; }
        .status-paid_oversold { background: #fbeacb; color: #8a5a10; }
        .status-cancelled { background: var(--stone-200); color: var(--ink-600); }
        .oversold-banner {
          background: #fbeacb;
          color: #8a5a10;
          font-size: 12px;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          margin-bottom: 12px;
        }
        .cancelled-banner {
          background: var(--stone-100);
          color: var(--ink-600);
          font-size: 12px;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          margin-bottom: 12px;
        }

        .order-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 14px 0;
          border-top: 1px solid var(--stone-100);
          border-bottom: 1px solid var(--stone-100);
          margin-bottom: 12px;
        }
        .detail-block { display: flex; flex-direction: column; gap: 3px; }
        .detail-label {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ink-400);
          margin: 0 0 3px;
        }
        .detail-value { font-size: 12.5px; color: var(--ink-600); margin: 0; line-height: 1.5; }
        .detail-value.mono { font-family: monospace; font-size: 11.5px; word-break: break-all; }
        .coupon-tag { color: #3c7a3c; font-weight: 600; }

        .order-row-items { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; }
        .item-link {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--stone-100);
          border-radius: var(--radius-sm);
          padding: 6px 10px 6px 6px;
          font-size: 12px;
          color: var(--ink-600);
          text-decoration: none;
        }
        .item-link:hover { background: var(--blush-300); color: var(--maroon-900); }
        .item-link img { width: 28px; height: 28px; border-radius: 4px; object-fit: cover; flex: 0 0 auto; }

        .order-row-foot { display: flex; flex-wrap: wrap; gap: 16px; font-size: 12px; color: var(--ink-400); align-items: center; }
        .order-row-foot strong { margin-left: auto; color: var(--maroon-900); font-size: 14px; }
        .order-row-invoice { display: flex; align-items: center; gap: 10px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--stone-100); }
        .invoice-btn { font-size: 12px; padding: 8px 16px; }
        .invoice-error { font-size: 11.5px; color: #a13a3a; }
      `})]})}function vu(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(``);(0,x.useEffect)(()=>{i()},[]);function i(){z.getAdminReviews().then(({reviews:e})=>t(e)).catch(e=>r(e.message))}async function a(e){try{await z.approveReview(e.id,!e.approved),i()}catch(e){r(e.message)}}async function o(e){if(window.confirm(`Delete this review?`))try{await z.deleteReview(e),i()}catch(e){r(e.message)}}return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{className:`admin-page-head`,children:[(0,L.jsx)(`h1`,{children:`Reviews`}),(0,L.jsx)(`p`,{children:`Star ratings and comments customers left on product pages. Hide a review to remove it from the storefront without deleting it.`})]}),n&&(0,L.jsx)(`p`,{className:`admin-error`,children:n}),(0,L.jsxs)(`div`,{className:`cms-list`,children:[e.length===0&&(0,L.jsx)(`p`,{className:`empty`,children:`No reviews yet.`}),e.map(e=>(0,L.jsxs)(`div`,{className:`review-row`,children:[(0,L.jsxs)(`div`,{className:`review-row-main`,children:[(0,L.jsxs)(`div`,{className:`review-row-head`,children:[(0,L.jsx)(`strong`,{children:e.product_name}),(0,L.jsxs)(`span`,{className:`stars`,children:[`★`.repeat(e.rating),`☆`.repeat(5-e.rating)]})]}),e.comment&&(0,L.jsx)(`p`,{children:e.comment}),(0,L.jsxs)(`span`,{className:`review-by`,children:[e.user_name,` · `,e.user_email,` · `,new Date(e.created_at).toLocaleDateString(`en-IN`)]})]}),(0,L.jsxs)(`div`,{className:`row-actions`,children:[(0,L.jsx)(`button`,{onClick:()=>a(e),children:e.approved?`Hide`:`Show`}),(0,L.jsx)(`button`,{onClick:()=>o(e.id),className:`danger`,children:`Delete`})]})]},e.id))]}),(0,L.jsx)(`style`,{children:`
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
      `})]})}var yu={productId:``,name:``,rating:5,text:``,photo:``,active:!0};function bu(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([]),[i,a]=(0,x.useState)(yu),[o,s]=(0,x.useState)(null),[c,l]=(0,x.useState)(`all`),[u,d]=(0,x.useState)(``),f=(0,x.useRef)(null);(0,x.useEffect)(()=>{p(),z.getProducts().then(({products:e})=>t(e)).catch(()=>{})},[]);function p(){z.getAllTestimonials().then(({testimonials:e})=>r(e)).catch(e=>d(e.message))}function m(){a(yu),s(null),f.current&&(f.current.value=``)}async function h(e){let t=e.target.files?.[0];if(!t)return;let n=await ql(t,{maxDimension:600});a(e=>({...e,photo:n}))}async function g(e){if(e.preventDefault(),!i.name.trim()||!i.text.trim())return;d(``);let t={productId:i.productId||null,name:i.name.trim(),rating:Number(i.rating),text:i.text.trim(),photo:i.photo||null,active:i.active};try{o?await z.updateTestimonial(o,t):await z.createTestimonial(t),m(),p()}catch(e){d(e.message)}}function _(e){a({productId:e.product_id||``,name:e.name,rating:e.rating,text:e.text,photo:e.photo||``,active:e.active}),s(e.id),window.scrollTo({top:0,behavior:`smooth`})}async function v(e){if(window.confirm(`Remove this testimonial?`))try{await z.deleteTestimonial(e),o===e&&m(),p()}catch(e){d(e.message)}}function y(t){return t?e.find(e=>e.id===t)?.name||`Unknown product`:`General (homepage band)`}let b=c===`all`?n:c===`general`?n.filter(e=>!e.product_id):n.filter(e=>e.product_id===c);return(0,L.jsxs)(`div`,{children:[(0,L.jsxs)(`div`,{className:`admin-page-head`,children:[(0,L.jsx)(`h1`,{children:`Testimonials`}),(0,L.jsx)(`p`,{children:`Add customer quotes, optionally with a small photo. Leave "Product" unset to show it in the general rotating band near the footer; pick a product to show it only on that product's page.`})]}),u&&(0,L.jsx)(`p`,{className:`admin-error`,children:u}),(0,L.jsxs)(`div`,{className:`cms-layout`,children:[(0,L.jsxs)(`form`,{className:`cms-form`,onSubmit:g,children:[(0,L.jsx)(`h3`,{children:o?`Edit testimonial`:`Add a testimonial`}),(0,L.jsxs)(`label`,{children:[`Product (optional)`,(0,L.jsxs)(`select`,{value:i.productId,onChange:e=>a(t=>({...t,productId:e.target.value})),children:[(0,L.jsx)(`option`,{value:``,children:`General (homepage band)`}),e.map(e=>(0,L.jsx)(`option`,{value:e.id,children:e.name},e.id))]})]}),(0,L.jsxs)(`label`,{children:[`Customer name`,(0,L.jsx)(`input`,{type:`text`,value:i.name,placeholder:`e.g. Ananya R.`,onChange:e=>a(t=>({...t,name:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`Rating`,(0,L.jsx)(`select`,{value:i.rating,onChange:e=>a(t=>({...t,rating:e.target.value})),children:[5,4,3,2,1].map(e=>(0,L.jsxs)(`option`,{value:e,children:[e,` star`,e>1?`s`:``]},e))})]}),(0,L.jsxs)(`label`,{children:[`Review text`,(0,L.jsx)(`textarea`,{value:i.text,placeholder:`What did they say?`,rows:4,onChange:e=>a(t=>({...t,text:e.target.value})),required:!0})]}),(0,L.jsxs)(`label`,{children:[`Photo (optional)`,(0,L.jsx)(`input`,{type:`file`,accept:`image/*`,ref:f,onChange:h}),(0,L.jsx)(`span`,{className:`field-hint`,children:`Shown as a small circular photo next to the quote. Leave blank to show initials instead.`})]}),i.photo&&(0,L.jsxs)(`div`,{className:`photo-preview`,children:[(0,L.jsx)(`img`,{src:i.photo,alt:`Preview`}),(0,L.jsx)(`button`,{type:`button`,onClick:()=>a(e=>({...e,photo:``})),children:`Remove photo`})]}),(0,L.jsxs)(`label`,{className:`checkbox-row`,children:[(0,L.jsx)(`input`,{type:`checkbox`,checked:i.active,onChange:e=>a(t=>({...t,active:e.target.checked}))}),`Active (visible on the site)`]}),(0,L.jsxs)(`div`,{className:`form-actions`,children:[(0,L.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:o?`Save Changes`:`Add Testimonial`}),o&&(0,L.jsx)(`button`,{type:`button`,className:`btn btn-outline`,onClick:m,children:`Cancel`})]})]}),(0,L.jsxs)(`div`,{className:`cms-list-wrap`,children:[(0,L.jsxs)(`label`,{className:`filter-row`,children:[`Filter`,(0,L.jsxs)(`select`,{value:c,onChange:e=>l(e.target.value),children:[(0,L.jsx)(`option`,{value:`all`,children:`All`}),(0,L.jsx)(`option`,{value:`general`,children:`General (homepage band)`}),e.map(e=>(0,L.jsx)(`option`,{value:e.id,children:e.name},e.id))]})]}),(0,L.jsxs)(`div`,{className:`cms-list`,children:[b.length===0&&(0,L.jsx)(`p`,{className:`empty`,children:`No testimonials yet.`}),b.map(e=>(0,L.jsxs)(`div`,{className:`cms-row testimonial-row`,children:[e.photo?(0,L.jsx)(`img`,{src:e.photo,alt:``,className:`row-photo`}):(0,L.jsx)(`div`,{className:`row-photo row-photo-fallback`,children:e.name.charAt(0)}),(0,L.jsxs)(`div`,{className:`row-info`,children:[(0,L.jsxs)(`strong`,{children:[e.name,` · `,`★`.repeat(e.rating),`☆`.repeat(5-e.rating),!e.active&&` · inactive`]}),(0,L.jsx)(`span`,{className:`row-product`,children:y(e.product_id)}),(0,L.jsx)(`span`,{className:`row-text`,children:e.text})]}),(0,L.jsxs)(`div`,{className:`row-actions`,children:[(0,L.jsx)(`button`,{onClick:()=>_(e),children:`Edit`}),(0,L.jsx)(`button`,{onClick:()=>v(e.id),className:`danger`,children:`Delete`})]})]},e.id))]})]})]}),(0,L.jsx)(`style`,{children:`
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
          .cms-layout { grid-template-columns: 1fr; }
        }
      `})]})}function xu(){return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(Bc,{}),(0,L.jsx)(Cc,{}),(0,L.jsx)(pr,{}),(0,L.jsx)(`main`,{children:(0,L.jsxs)(Bt,{children:[(0,L.jsx)(F,{path:`/`,element:(0,L.jsx)(_l,{})}),(0,L.jsx)(F,{path:`/about`,element:(0,L.jsx)(yl,{})}),(0,L.jsx)(F,{path:`/products`,element:(0,L.jsx)(xl,{})}),(0,L.jsx)(F,{path:`/products/:id`,element:(0,L.jsx)(Dl,{})}),(0,L.jsx)(F,{path:`/orders`,element:(0,L.jsx)(wc,{children:(0,L.jsx)(jl,{})})}),(0,L.jsx)(F,{path:`/contact`,element:(0,L.jsx)(Ml,{})}),(0,L.jsx)(F,{path:`/cart`,element:(0,L.jsx)(Nl,{})}),(0,L.jsx)(F,{path:`/checkout`,element:(0,L.jsx)(wc,{children:(0,L.jsx)(Il,{})})}),(0,L.jsx)(F,{path:`/profile`,element:(0,L.jsx)(wc,{children:(0,L.jsx)(Q,{})})}),(0,L.jsx)(F,{path:`/login`,element:(0,L.jsx)(Rl,{})}),(0,L.jsx)(F,{path:`/forgot-password`,element:(0,L.jsx)(zl,{})}),(0,L.jsx)(F,{path:`/reset-password`,element:(0,L.jsx)(Bl,{})}),(0,L.jsx)(F,{path:`/complete-profile`,element:(0,L.jsx)(wc,{children:(0,L.jsx)(Vl,{})})}),(0,L.jsx)(F,{path:`*`,element:(0,L.jsx)(Hl,{})})]})}),(0,L.jsx)(vr,{}),(0,L.jsx)(hr,{})]})}function Su(){return ct().pathname.startsWith(`/admin`)?(0,L.jsxs)(ur,{children:[(0,L.jsx)(Tc,{}),(0,L.jsx)(Bt,{children:(0,L.jsxs)(F,{path:`/admin`,element:(0,L.jsx)(Gl,{}),children:[(0,L.jsx)(F,{index:!0,element:(0,L.jsx)(Kl,{})}),(0,L.jsx)(F,{path:`home`,element:(0,L.jsx)(eu,{})}),(0,L.jsx)(F,{path:`about`,element:(0,L.jsx)(nu,{})}),(0,L.jsx)(F,{path:`categories`,element:(0,L.jsx)(cu,{})}),(0,L.jsx)(F,{path:`products`,element:(0,L.jsx)(hu,{})}),(0,L.jsx)(F,{path:`orders`,element:(0,L.jsx)(_u,{})}),(0,L.jsx)(F,{path:`coupons`,element:(0,L.jsx)(iu,{})}),(0,L.jsx)(F,{path:`cancellation-policy`,element:(0,L.jsx)(ou,{})}),(0,L.jsx)(F,{path:`reviews`,element:(0,L.jsx)(vu,{})}),(0,L.jsx)(F,{path:`testimonials`,element:(0,L.jsx)(bu,{})}),(0,L.jsx)(F,{path:`*`,element:(0,L.jsx)(Kl,{})})]})})]}):(0,L.jsx)(ur,{children:(0,L.jsx)(nr,{children:(0,L.jsx)(xu,{})})})}var Cu=class extends x.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.error(`[ErrorBoundary] caught a render error:`,e,t?.componentStack)}handleReload=()=>{window.location.href=`/`};render(){return this.state.hasError?(0,L.jsxs)(`div`,{className:`error-boundary-page`,children:[(0,L.jsxs)(`div`,{className:`container`,children:[(0,L.jsx)(`p`,{className:`eyebrow`,children:`Something went wrong`}),(0,L.jsx)(`h1`,{children:`This page hit a snag`}),(0,L.jsx)(`p`,{className:`error-boundary-sub`,children:`Sorry about that — something unexpected happened while loading this page. Try going back to the homepage, or refresh and try again.`}),(0,L.jsx)(`button`,{type:`button`,className:`btn btn-primary`,onClick:this.handleReload,children:`Back to Home`})]}),(0,L.jsx)(`style`,{children:`
            .error-boundary-page {
              min-height: 60vh;
              display: flex;
              align-items: center;
              padding: 100px 0 80px;
            }
            .error-boundary-page .container { text-align: center; max-width: 480px; margin: 0 auto; }
            .error-boundary-page h1 { font-size: 28px; margin: 10px 0 16px; }
            .error-boundary-sub { font-size: 14px; color: var(--ink-400); line-height: 1.7; margin-bottom: 28px; }
          `})]}):this.props.children}};(0,Bn.createRoot)(document.getElementById(`root`)).render((0,L.jsx)(x.StrictMode,{children:(0,L.jsx)(Cu,{children:(0,L.jsx)(Dn,{children:(0,L.jsx)(Su,{})})})}));