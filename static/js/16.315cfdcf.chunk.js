(this["webpackJsonpsekai-viewer"]=this["webpackJsonpsekai-viewer"]||[]).push([[16],{6042:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(50),r=a(6046),c=a(0),i=a(5990),o=new Map([["zh-CN","zh_CN"],["zh-TW","zh_TW"]]),s=Object(r.humanizer)({languages:{short_en:{y:function(){return"y"},mo:function(){return"mo"},w:function(){return"w"},d:function(){return"d"},h:function(){return"h"},m:function(){return"m"},s:function(){return"s"},ms:function(){return"ms"}}}});function l(){var e=Object(i.a)().i18n,t=o.get(e.language)||e.language;return[Object(c.useCallback)((function(e,a){return s(e,Object(n.a)({language:t,fallbacks:["en"]},a))}),[t]),Object(c.useCallback)((function(e,a){return s(e,Object(n.a)({language:"short_".concat(t),fallbacks:[t,"short_".concat("en"),"en"]},a))}),[t])]}},6179:function(e,t,a){"use strict";a.r(t);var n=a(12),r=a(172),c=a(40),i=a(5995),o=a(87),s=a(6183),l=a(6172),m=a(71),u=a(6180),d=a(6009),g=a(6048),f=a(90),b=a(6177),p=a(6178),w=a(6135),E=a(0),v=a.n(E),h=a(5990),k=a(13),y=a(6038),j=a.n(y),I=a(36),x=a(91),O=a(41),_=a(6042),A=Object(r.a)((function(e){return{bannerImg:{maxWidth:"100%"},eventImg:{maxWidth:"100%",cursor:"pointer"},tabpanel:{padding:e.spacing("1%",0,0,0)},"grid-out":{padding:e.spacing("1%","0")}}}));t.default=function(e){var t=e.contentTransMode,a=Object(h.a)(),r=a.t,y=a.i18n,N=Object(k.g)().eventId,R=A(),W=Object(f.a)(),C=Object(O.a)(),S=Object(_.a)(),B=Object(n.a)(S,1)[0],D=Object(I.c)("events"),T=Object(n.a)(D,1)[0],L=Object(I.c)("eventDeckBonuses"),z=Object(n.a)(L,1)[0],P=Object(I.c)("gameCharacterUnits"),U=Object(n.a)(P,1)[0],F=Object(I.c)("resourceBoxes"),H=Object(n.a)(F,1)[0],J=Object(I.c)("honors"),M=Object(n.a)(J,1)[0],q=Object(I.d)(Number(N)),G=Object(n.a)(q,2),K=G[0],Q=G[1],V=Object(E.useState)(),X=Object(n.a)(V,2),Y=X[0],Z=X[1],$=Object(E.useState)([]),ee=Object(n.a)($,2),te=ee[0],ae=ee[1],ne=Object(E.useState)("0"),re=Object(n.a)(ne,2),ce=re[0],ie=re[1],oe=Object(E.useState)(),se=Object(n.a)(oe,2),le=se[0],me=se[1],ue=Object(E.useState)(""),de=Object(n.a)(ue,2),ge=de[0],fe=de[1],be=Object(E.useState)(0),pe=Object(n.a)(be,2),we=pe[0],Ee=pe[1],ve=Object(E.useState)(!1),he=Object(n.a)(ve,2),ke=he[0],ye=he[1],je=Object(E.useState)(0),Ie=Object(n.a)(je,2),xe=Ie[0],Oe=Ie[1];function _e(e){var t=M.find((function(t){return t.id===H.find((function(t){return"event_ranking_reward"===t.resourceBoxPurpose&&t.id===e.eventRankingRewards[0].resourceBoxId})).details.find((function(e){return"honor"===e.resourceType})).resourceId}));return"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/honor/").concat(t.assetbundleName,"_rip/degree_main.webp")}function Ae(e){return M.find((function(t){return t.id===H.find((function(t){return"event_ranking_reward"===t.resourceBoxPurpose&&t.id===e.eventRankingRewards[0].resourceBoxId})).details.find((function(e){return"honor"===e.resourceType})).resourceId})).name}function Ne(e){var t=M.find((function(t){return t.id===H.find((function(t){return"event_ranking_reward"===t.resourceBoxPurpose&&t.id===e.eventRankingRewards[0].resourceBoxId})).details.find((function(e){return"honor"===e.resourceType})).resourceId}));return x.c[t.honorRarity]}function Re(e){var t=M.find((function(t){return t.id===H.find((function(t){return"event_ranking_reward"===t.resourceBoxPurpose&&t.id===e.eventRankingRewards[0].resourceBoxId})).details.find((function(e){return"honor"===e.resourceType})).resourceId}));return"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/honor/").concat(t.assetbundleName,"_rip/rank_main.webp")}function We(e){return M.find((function(t){return t.id===H.find((function(t){return"event_ranking_reward"===t.resourceBoxPurpose&&t.id===e.eventRankingRewards[0].resourceBoxId})).details.find((function(e){return"honor"===e.resourceType})).resourceId})).levels[0].description}Object(E.useEffect)((function(){T.length&&z.length&&(Z(T.find((function(e){return e.id===Number(N)}))),ae(z.filter((function(e){return e.eventId===Number(N)}))))}),[T,N,z]),Object(E.useEffect)((function(){var e=Date.now();if(Y&&e>=Y.startAt&&e<=Y.rankingAnnounceAt+3e5){var t=new w.CronJob("5 * * * * *",(function(){Date.now()>Y.rankingAnnounceAt+3e5?t.stop():(K(),me(t.nextDate()))}));t.start(),K(),me(t.nextDate());var a=window.setInterval((function(){me((function(e){return e}))}),60);return function(){t.stop(),window.clearInterval(a)}}K()}),[K,Y]),Object(E.useEffect)((function(){if(Y){var e,t=function(){if(Date.now()>Y.aggregateAt)return null!=e&&(window.clearInterval(e),e=void 0),fe(r("event:alreadyEnded")),Ee(100),!1;var t=(Date.now()-Y.startAt)/(Y.aggregateAt-Y.startAt)*100;return fe("".concat(B(Y.aggregateAt-Date.now(),{units:["d","h","m"],round:!0})," (").concat(t.toFixed(1),"%)")),Ee(t),!0};if(t())return e=window.setInterval(t,6e4),function(){null!=e&&(window.clearInterval(e),e=void 0)}}}),[Y,r,B]);var Ce=Object(E.useCallback)((function(){return Y?[{src:"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/event/").concat(Y.assetbundleName,"/screen_rip/bg.webp"),alt:"event background",downloadUrl:"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/event/").concat(Y.assetbundleName,"/screen_rip/bg.webp")},{src:"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/event/").concat(Y.assetbundleName,"/screen_rip/character.webp"),alt:"event character",downloadUrl:"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/event/").concat(Y.assetbundleName,"/screen_rip/character.webp")}]:[]}),[Y]);return Y&&te.length&&U.length?v.a.createElement(E.Fragment,null,v.a.createElement(c.a,{variant:"h6",className:W.header},"original"===t?Y.name:"translated"===t?C.t("event_name:".concat(N)):Y.name),v.a.createElement(i.a,{className:W.content,maxWidth:"sm"},v.a.createElement(b.a,{value:ce},v.a.createElement(o.a,null,v.a.createElement(s.a,{value:ce,onChange:function(e,t){return ie(t)},variant:"scrollable",scrollButtons:"desktop"},v.a.createElement(l.a,{value:"0",label:r("event:tab.title[0]")}),v.a.createElement(l.a,{value:"1",label:r("event:tab.title[1]")}),v.a.createElement(l.a,{value:"2",label:r("event:tab.title[2]")})),v.a.createElement(p.a,{value:"0",classes:{root:R.tabpanel}},v.a.createElement(m.a,{container:!0,direction:"row"},v.a.createElement(m.a,{item:!0,xs:12,md:6},v.a.createElement("img",{className:R.bannerImg,src:"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/event/").concat(Y.assetbundleName,"/logo_rip/logo.webp"),alt:"logo"})),v.a.createElement(m.a,{item:!0,xs:12,md:6},v.a.createElement("img",{className:R.bannerImg,src:"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/home/banner/").concat(Y.assetbundleName,"_rip/").concat(Y.assetbundleName,".webp"),alt:"logo"})))),v.a.createElement(p.a,{value:"1",classes:{root:R.tabpanel}},v.a.createElement("img",{onClick:function(){Oe(0),ye(!0)},className:R.eventImg,src:"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/event/").concat(Y.assetbundleName,"/screen_rip/bg.webp"),alt:"background"})),v.a.createElement(p.a,{value:"2",classes:{root:R.tabpanel}},v.a.createElement("img",{onClick:function(){Oe(1),ye(!0)},className:R.eventImg,src:"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/event/").concat(Y.assetbundleName,"/screen_rip/character.webp"),alt:"character"})))),v.a.createElement("audio",{style:{width:"100%",margin:"1% 0"},controls:!0,src:"".concat("https://sekai-res.dnaroma.eu","/file/sekai-assets/").concat(Y.bgmAssetbundleName.replace("bgm","bgm_rip"),".mp3")}),v.a.createElement(m.a,{className:R["grid-out"],container:!0,direction:"column"},v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("event:remainingTime")," (",r("event:progress"),")"),v.a.createElement(c.a,null,ge)),v.a.createElement(u.a,{variant:"determinate",value:we}),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("common:id")),v.a.createElement(c.a,null,Y.id)),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("common:title")),v.a.createElement(c.a,null,"original"===t?Y.name:"translated"===t?C.t("event_name:".concat(N)):Y.name)),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("common:type")),v.a.createElement(c.a,null,r("event:type.".concat(Y.eventType)))),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(m.a,{item:!0},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("event:boostAttribute"))),v.a.createElement(m.a,{item:!0,container:!0,xs:6,spacing:1,alignItems:"center",justify:"space-between"},v.a.createElement(m.a,{item:!0,xs:6,sm:10,container:!0,spacing:1,justify:"flex-end"},v.a.createElement(m.a,{item:!0},v.a.createElement("img",{style:{maxHeight:"36px"},src:x.a[te[0].cardAttr],alt:te[0].cardAttr}))),v.a.createElement(m.a,{item:!0,xs:4,sm:2},v.a.createElement(c.a,null,"+",te[6].bonusRate,"%")))),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(m.a,{item:!0,xs:4},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("event:boostCharacters"))),v.a.createElement(m.a,{item:!0,container:!0,spacing:1,xs:5,sm:6,alignItems:"center",justify:"space-between"},v.a.createElement(m.a,{item:!0,container:!0,spacing:1,xs:6,sm:10},te.slice(0,5).map((function(e,t){return v.a.createElement(m.a,{key:"chara-".concat(t),item:!0},v.a.createElement("img",{style:{maxHeight:"36px"},src:x.b["CharaIcon".concat(U.find((function(t){return t.id===e.gameCharacterUnitId})).gameCharacterId)],alt:"character ".concat(U.find((function(t){return t.id===e.gameCharacterUnitId})).gameCharacterId)}))}))),v.a.createElement(m.a,{item:!0,xs:5,sm:2},v.a.createElement(c.a,null,"+",te[6].bonusRate,"%")))),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("event:maxBoost")),v.a.createElement(c.a,null,"+50%")),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("common:startAt")),v.a.createElement(c.a,null,new Date(Y.startAt).toLocaleString())),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("common:endAt")),v.a.createElement(c.a,null,new Date(Y.closedAt).toLocaleString())),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("event:aggregateAt")),v.a.createElement(c.a,null,new Date(Y.aggregateAt).toLocaleString())),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("event:rankingAnnounceAt")),v.a.createElement(c.a,null,new Date(Y.rankingAnnounceAt).toLocaleString())),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("event:distributionStartAt")),v.a.createElement(c.a,null,new Date(Y.distributionStartAt).toLocaleString())),v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{item:!0,container:!0,direction:"row",wrap:"nowrap",justify:"space-between",alignItems:"center"},v.a.createElement(c.a,{variant:"subtitle1",style:{fontWeight:600}},r("event:distributionEndAt")),v.a.createElement(c.a,null,new Date(Y.distributionEndAt).toLocaleString())),v.a.createElement(d.a,{style:{margin:"1% 0"}}))),Q.time?v.a.createElement(E.Fragment,null,v.a.createElement(c.a,{variant:"h6",className:W.header},r("event:ranking")),v.a.createElement(i.a,{className:W.content,maxWidth:"sm"},v.a.createElement(o.a,{style:{padding:"2%"}},v.a.createElement(c.a,{variant:"h6"},r("event:realtime")," ",new Date(Q.time).toLocaleString(y.language)),le?v.a.createElement(c.a,{variant:"body2",color:"textSecondary"},r("event:nextfetch"),": ",le.fromNow()):null,v.a.createElement(d.a,{style:{margin:"1% 0"}}),v.a.createElement(m.a,{container:!0,direction:"column"},H.length&&M.length?Y.eventRankingRewardRanges.map((function(e){return e.fromRank>=100001?null:v.a.createElement(E.Fragment,{key:e.toRank},v.a.createElement(m.a,{item:!0,container:!0,justify:"space-between",alignItems:"center"},v.a.createElement(m.a,{item:!0,xs:6,md:4},v.a.createElement(g.a,{position:"relative"},v.a.createElement("img",{style:{position:"absolute",top:0,left:e.fromRank>=10001?"2%":0,maxWidth:e.fromRank>=10001?"96%":"100%"},src:Ne(e),alt:(t=e,M.find((function(e){return e.id===H.find((function(e){return"event_ranking_reward"===e.resourceBoxPurpose&&e.id===t.eventRankingRewards[0].resourceBoxId})).details.find((function(e){return"honor"===e.resourceType})).resourceId})).honorRarity)}),v.a.createElement("img",{style:{maxWidth:"100%"},src:_e(e),alt:Ae(e)}),v.a.createElement("img",{style:{position:"absolute",right:"10.5%",maxHeight:"80%",top:"6%"},src:Re(e),alt:We(e)}))),v.a.createElement(m.a,{item:!0,xs:6,container:!0,alignItems:"center"},v.a.createElement(m.a,{item:!0,xs:12,md:6},v.a.createElement(c.a,{align:"right"},(e.toRank<=10?Q.first10.find((function(t){return t.rank===e.toRank})):Q["rank".concat(e.toRank)][0]||{name:""}).name)),v.a.createElement(m.a,{item:!0,xs:12,md:6},v.a.createElement(c.a,{variant:"h6",align:"right"},(e.toRank<=10?Q.first10.find((function(t){return t.rank===e.toRank})):Q["rank".concat(e.toRank)][0]||{score:"N/A"}).score)))),v.a.createElement(d.a,{style:{margin:"1% 0"}}));var t})):null))),v.a.createElement(j.a,{visible:ke,onClose:function(){return ye(!1)},images:Ce(),zIndex:2e3,activeIndex:xe,downloadable:!0,downloadInNewWindow:!0,onMaskClick:function(){return ye(!1)},zoomSpeed:.25,onChange:function(e,t){return Oe(t)}})):null):v.a.createElement("div",null,"Loading... If you saw this for a while, event ",N," does not exist.")}}}]);
//# sourceMappingURL=16.315cfdcf.chunk.js.map