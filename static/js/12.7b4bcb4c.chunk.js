(this["webpackJsonphello-client"]=this["webpackJsonphello-client"]||[]).push([[12],{298:function(t,e,n){"use strict";n.r(e),n.d(e,"Account",(function(){return O}));var r=n(5),a=n.n(r),i=n(9),c=n(78),s=n(544),o=(n(0),n(502)),l=n(79),d=n(110),u=n(17),j=n(6),b=function(){var t=Object(i.a)(a.a.mark((function t(){var e,n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=Object(j.b)(!0),t.next=3,e.get(Object(j.a)(u.a.url.version));case 3:return n=t.sent,t.abrupt("return",n.data);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),h=n(308),p=n(335),x=n(3),O=function(){var t=Object(o.a)(),e=Object(c.a)(t,1)[0],n=function(){var t=Object(i.a)(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,t.next=4,b();case 4:n=t.sent,l.b.success(JSON.stringify(n)),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),Object(h.a)(t.t0);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}(),r=function(){var t=Object(i.a)(a.a.mark((function t(e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,t.next=4,Object(d.a)(u.a.url.resource.user);case 4:n=t.sent,l.b.success(JSON.stringify(n)),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),Object(h.a)(t.t0);case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}();return Object(x.jsxs)(p.a,{title:e("title.home"),children:[Object(x.jsx)(s.a,{color:"primary",onClick:n,"data-testid":"api-version-button",children:"API \u30d0\u30fc\u30b8\u30e7\u30f3\u60c5\u5831"}),Object(x.jsx)(s.a,{color:"secondary",onClick:r,"data-testid":"user-record-button",children:"\u30e6\u30fc\u30b6\u60c5\u5831"})]})};e.default=O},308:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(79),a=function(t){var e,n,a,i;r.b.error(null!==(e=null!==(n=null===t||void 0===t||null===(a=t.response)||void 0===a||null===(i=a.data)||void 0===i?void 0:i.message)&&void 0!==n?n:null===t||void 0===t?void 0:t.message)&&void 0!==e?e:"exception occurred.")}},311:function(t,e,n){"use strict";var r=n(546),a=n(547),i=n(0),c=n.n(i),s=n(17),o=n(3),l=function(){return Object(o.jsxs)(r.a,{variant:"body2",color:"textSecondary",align:"center","data-testid":"copyright",children:["\xa9 ",Object(o.jsx)(a.a,{href:s.a.app.creatorPage,target:"_blank",underline:"hover",color:"inherit","data-testid":"crator-page-url",children:s.a.app.creator})," All Rights Reserved."]})};e.a=c.a.memo(l)},335:function(t,e,n){"use strict";var r=n(78),a=n(13),i=n(56),c=n(526),s=n(284),o=n(529),l=n(530),d=n(531),u=n(39),j=n(548),b=n(550),h=n(546),p=n(551),x=n(523),O=n(552),v=n(553),f=n(554),m=n(542),g=n(540),w=n(555),y=n(543),k=n(557),S=n(558),C=n(559),W=n(503),z=n(549),D=n(0),F=n(502),I=n(35),P=n(65),A=n(311),J=n(17),R=n(48),G=n(3),N=Object(u.a)(j.a,{shouldForwardProp:function(t){return"open"!==t}})((function(t){var e=t.theme,n=t.open;return Object(i.a)({zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},n&&{marginLeft:J.a.value.drawerWidth,width:"calc(100% - ".concat(J.a.value.drawerWidth,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})})})),E=Object(u.a)(b.a,{shouldForwardProp:function(t){return"open"!==t}})((function(t){var e=t.theme,n=t.open;return{"& .MuiDrawer-paper":Object(i.a)({position:"relative",whiteSpace:"nowrap",width:J.a.value.drawerWidth,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen}),boxSizing:"border-box"},!n&&Object(a.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:0},e.breakpoints.up("sm"),{width:e.spacing(9)}))}})),L=Object(u.a)(h.a)((function(t){var e=t.theme;return Object(a.a)({flexGrow:1,display:"none"},e.breakpoints.up("sm"),{display:"block"})})),M=Object(u.a)(P.b)((function(t){return{textDecoration:"none",color:t.theme.palette.text.secondary}}));e.a=function(t){var e=t.children,n=t.title,a=Object(F.a)(),u=Object(r.a)(a,1)[0],j=Object(I.c)((function(t){return t.auth})).user,b=Object(D.useRef)(null),P=Object(D.useState)(!1),U=Object(r.a)(P,2),X=U[0],_=U[1],q=function(){return _(!1)},B=Object(D.useState)(!1),H=Object(r.a)(B,2),K=H[0],Q=H[1],T=[Object(R.e)("home"),Object(R.e)("account")],V=[Object(R.e)("account"),Object(R.e)("signout")];return Object(G.jsxs)(p.a,{sx:{display:"flex"},children:[Object(G.jsx)(x.a,{}),Object(G.jsx)(N,{position:"absolute",open:X,children:Object(G.jsxs)(O.a,{sx:{pr:"24px"},children:[Object(G.jsx)(v.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){return _(!0)},sx:Object(i.a)({marginRight:"36px"},X&&{display:"none"}),"data-testid":"hamburger-button",children:Object(G.jsx)(c.a,{})}),Object(G.jsx)(L,{variant:"h6",color:"inherit",noWrap:!0,"data-testid":"title",children:J.a.app.name}),Object(G.jsx)("div",{style:{flex:"1 0 0"}}),Object(G.jsx)(v.a,{onClick:function(){return Q(!0)},ref:b,sx:{color:"white"},"data-testid":"account-button",children:Object(G.jsx)(s.a,{})}),Object(G.jsxs)(f.a,{anchorEl:b.current,open:K,onClose:function(){return Q(!1)},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},"data-testid":"account-popup",children:[Object(G.jsxs)(m.a,{container:!0,sx:{p:2},children:[Object(G.jsx)(m.a,{item:!0,xs:3,children:(null===j||void 0===j?void 0:j.verified)?Object(G.jsx)(g.a,{title:Object(G.jsx)(G.Fragment,{children:u("label.verifiedAccount")}),children:Object(G.jsx)(o.a,{color:"primary",sx:{m:1},"data-testid":"user-verified-icon"})}):Object(G.jsx)(g.a,{title:Object(G.jsx)(G.Fragment,{children:u("message.error.accountUnverified")}),children:Object(G.jsx)(l.a,{color:"error",sx:{m:1},"data-testid":"user-unverified-icon"})})}),Object(G.jsx)(m.a,{item:!0,xs:9,children:Object(G.jsxs)(p.a,{sx:{alignItems:"center",display:"flex",flexDirection:"column"},children:[Object(G.jsx)(h.a,{variant:"subtitle1",color:"textPrimary",noWrap:!0,"data-testid":"user-name",children:null===j||void 0===j?void 0:j.name}),Object(G.jsx)(h.a,{variant:"body2",color:"textSecondary",noWrap:!0,"data-testid":"user-email",children:null===j||void 0===j?void 0:j.email})]})})]}),Object(G.jsx)(w.a,{}),Object(G.jsx)(p.a,{children:V.map((function(t){return t?Object(G.jsx)(M,{to:t.path,children:Object(G.jsxs)(y.a,{button:!0,children:[Object(G.jsx)(k.a,{children:t.icon}),Object(G.jsx)(S.a,{primary:u("title.".concat(t.id))})]})}):Object(G.jsx)(w.a,{})}))})]})]})}),Object(G.jsxs)(E,{variant:"permanent",open:X,"data-testid":"drawer",children:[Object(G.jsx)(O.a,{sx:{display:"flex",alignItems:"center",justifyContent:"flex-start",px:[1]},children:Object(G.jsx)(v.a,{onClick:q,"data-testid":"close-drawer-button",children:Object(G.jsx)(d.a,{})})}),Object(G.jsx)(C.a,{"data-testid":"menu-item",children:T.map((function(t){return t?Object(G.jsx)(M,{to:t.path,children:Object(G.jsx)(g.a,{title:Object(G.jsx)(G.Fragment,{children:u("title.".concat(t.id))}),children:Object(G.jsxs)(y.a,{button:!0,children:[Object(G.jsx)(k.a,{children:t.icon}),Object(G.jsx)(S.a,{primary:u("title.".concat(t.id))})]})})}):Object(G.jsx)(w.a,{})}))})]}),Object(G.jsxs)(m.a,{component:"main",onClick:q,sx:{backgroundColor:function(t){return"light"===t.palette.mode?t.palette.grey[100]:t.palette.grey[900]},flexGrow:1,height:"100vh",overflow:"auto"},children:[Object(G.jsx)(O.a,{}),Object(G.jsxs)(W.a,{maxWidth:"lg",sx:{mt:4,mb:4},children:[Object(G.jsx)(h.a,{component:"h2",variant:"h5",color:"inherit",noWrap:!0,sx:{mb:1},"data-testid":"page-title",children:n}),Object(G.jsx)(z.a,{sx:{p:2,my:3},children:e}),Object(G.jsx)(p.a,{pt:4,children:Object(G.jsx)(A.a,{})})]})]})]})}}}]);