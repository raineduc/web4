(self.webpackChunkweb4=self.webpackChunkweb4||[]).push([[18],{53850:(e,r,t)=>{"use strict";t.d(r,{W:()=>o});var n=t(11180),a=t(55284),l=t(54686),c=t(67294);function i(){return(i=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var o=(0,n.forwardRef)(((e,r)=>{var t=(0,a.Lr)(e),{className:o,centerContent:s}=t,u=function(e,r){if(null==e)return{};var t,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(t,["className","centerContent"]),m=(0,n.useStyleConfig)("Container",e);return c.createElement(n.chakra.div,i({ref:r,className:(0,l.cx)("chakra-container",o)},u,{__css:i({},m,s&&{display:"flex",flexDirection:"column",alignItems:"center"})}))}));l.__DEV__&&(o.displayName="Container")},95533:(e,r,t)=>{"use strict";t.d(r,{h:()=>N});var n=t(67294),a=t(11180),l=t(55284),c=t(54686);function i(){return(i=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var o=(0,a.forwardRef)(((e,r)=>{var t=(0,a.useStyleConfig)("Text",e),o=function(e,r){if(null==e)return{};var t,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}((0,l.Lr)(e),["className","align","decoration","casing"]),s=(0,c.filterUndefined)({textAlign:e.align,textDecoration:e.decoration,textTransform:e.casing});return n.createElement(a.chakra.p,i({ref:r,className:(0,c.cx)("chakra-text",e.className)},s,o,{__css:t}))}));c.__DEV__&&(o.displayName="Text");var s=t(68327);function u(){return(u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function m(e,r){if(null==e)return{};var t,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}var f=n.forwardRef(((e,r)=>{var{htmlWidth:t,htmlHeight:a,alt:l}=e,c=m(e,["htmlWidth","htmlHeight","alt"]);return n.createElement("img",u({width:t,height:a,ref:r,alt:l},c))})),g=(0,a.forwardRef)(((e,r)=>{var{fallbackSrc:t,fallback:l,src:i,align:o,fit:g,loading:d,ignoreFallback:h,crossOrigin:p}=e,E=m(e,["fallbackSrc","fallback","src","align","fit","loading","ignoreFallback","crossOrigin"]),v=null!=d||h,b=function(e){var{src:r,srcSet:t,onLoad:a,onError:l,crossOrigin:c,sizes:i,ignoreFallback:o}=e,[u,m]=(0,n.useState)("pending");(0,n.useEffect)((()=>{m(r?"loading":"pending")}),[r]);var f=(0,n.useRef)(),g=(0,n.useCallback)((()=>{if(r){d();var e=new Image;e.src=r,c&&(e.crossOrigin=c),t&&(e.srcset=t),i&&(e.sizes=i),e.onload=e=>{d(),m("loaded"),null==a||a(e)},e.onerror=e=>{d(),m("failed"),null==l||l(e)},f.current=e}}),[r,c,t,i,a,l]),d=()=>{f.current&&(f.current.onload=null,f.current.onerror=null,f.current=null)};return(0,s.G)((()=>{if(!o)return"loading"===u&&g(),()=>{d()}}),[u,g,o]),o?"loaded":u}(u({},e,{ignoreFallback:v})),k=u({ref:r,objectFit:g,objectPosition:o},v?E:(0,c.omit)(E,["onError","onLoad"]));return"loaded"!==b?l||n.createElement(a.chakra.img,u({as:f,className:"chakra-image__placeholder",src:t},k)):n.createElement(a.chakra.img,u({as:f,src:i,crossOrigin:p,loading:d,className:"chakra-image"},k))}));c.__DEV__&&(g.displayName="Image");var d=c.isBrowser?n.useLayoutEffect:n.useEffect,h=(0,a.chakra)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center"}});c.__DEV__&&(h.displayName="Center");var p=(0,a.chakra)("div",{baseStyle:{flex:1,justifySelf:"stretch",alignSelf:"stretch"}});c.__DEV__&&(p.displayName="Spacer");var E=t(40980),v=t(48017),b=t(94096),k=t(53850),y=t(75408),x=t(18048),_=t(5977),w=t(60397);const O=t.p+"pictures/logo_light.png";var S=function(e){var r=e.children;return n.createElement(o,{as:"span",color:"cyan.100",fontWeight:"bold"},r)},j=function(){return n.createElement(v.xu,{fontSize:"0.75em"},n.createElement(v.xu,null,"Группа:"," ",n.createElement(S,null,"P3212")),n.createElement(v.xu,null,"Сделалъ:"," ",n.createElement(S,null,"Хузин Рамиль")))},C=function(){return n.createElement(v.xu,null,n.createElement(b.k,{alignItems:"center"},n.createElement(g,{src:O,alt:"logo",boxSize:"9.5rem",objectFit:"contain"}),n.createElement(v.xu,{ml:"1"},n.createElement(o,{lineHeight:"short"},"Лабораторная 4"),n.createElement(o,{fontSize:{base:"0.75em",md:"0.65em"},lineHeight:"none",position:"absolute"},"Вариант:"," ",n.createElement(S,null,"31772")))))},N=function(){var e=(0,x.v9)((function(e){return e.auth.isAuthenticated})),r=(0,x.I0)(),t=(0,_.k6)(),a=function(e){var r=Array.isArray(e)?e:[e],t=c.isBrowser&&"matchMedia"in window,[a,l]=n.useState(r.map((e=>!!t&&!!window.matchMedia(e).matches)));return d((()=>{if(t){var e=r.map((e=>window.matchMedia(e))),n=e.map(((e,r)=>{var t=()=>l((t=>t.map(((t,n)=>r===n?!!e.matches:t))));return e.addListener(t),t}));return()=>{e.forEach(((e,r)=>{e.removeListener(n[r])}))}}}),[e]),a}("(min-width: "+(0,E.useTheme)().breakpoints.md+")")[0];return n.createElement(h,{as:"header",bgColor:"green.500",color:"white",fontSize:{base:"1.1rem",md:"1.25rem",lg:"1.5rem"},fontWeight:"500",boxShadow:"lg"},n.createElement(k.W,{maxW:"1228px"},n.createElement(b.k,{height:"5rem",alignItems:"center"},n.createElement(C,null),n.createElement(p,null),e&&n.createElement(y.z,{colorScheme:"green",color:"teal.50",bg:"none",textTransform:"uppercase",fontWeight:"bold",letterSpacing:"wide",marginRight:"20px",onClick:function(){return r((0,w.TX)(t))}},"Выйти"),a&&n.createElement(j,null))))}},28018:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});var n=t(67294),a=t(5977),l=t(53850),c=t(95533),i=t(60397),o=function(){return n.createElement(n.Fragment,null,n.createElement(c.h,null),n.createElement(l.W,{maxW:"1024px",mt:"16"},n.createElement(i.W5,null)))};const s=function(){return n.createElement(i.o9,{fallback:n.createElement(o,null),renderOnLoading:n.createElement("div",null,"Загрузка...")},n.createElement(a.l_,{to:"/game"}))}}}]);