(window.webpackJsonpUV=window.webpackJsonpUV||[]).push([[7],{126:function(t,e,n){"use strict";n.r(e);var i,o=n(3),s=n(41),r=n(34),a=n(7),l=n(1),h=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),c=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function r(t){try{l(i.next(t))}catch(t){s(t)}}function a(t){try{l(i.throw(t))}catch(t){s(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}l((i=i.apply(t,e||[])).next())}))},p=function(t,e){var n,i,o,s,r={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;r;)try{if(n=1,i&&(o=2&s[0]?i.return:s[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,s[1])).done)return o;switch(i=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return r.label++,{value:s[1],done:!1};case 5:r.label++,i=s[1],s=[0];continue;case 7:s=r.ops.pop(),r.trys.pop();continue;default:if(!(o=(o=r.trys).length>0&&o[o.length-1])&&(6===s[0]||2===s[0])){r=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){r.label=s[1];break}if(6===s[0]&&r.label<o[1]){r.label=o[1],o=s;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(s);break}o[2]&&r.ops.pop(),r.trys.pop();continue}s=e.call(t,r)}catch(t){s=[6,t],i=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}},u=function(t){function e(e){return t.call(this,e)||this}return h(e,t),e.prototype.create=function(){var e=this;this.setConfig("fileLinkCenterPanel"),t.prototype.create.call(this),this.component.subscribe(o.a.OPEN_EXTERNAL_RESOURCE,(function(t){e.openMedia(t)})),this.$scroll=$('<div class="scroll"></div>'),this.$content.append(this.$scroll),this.$downloadItems=$("<ol></ol>"),this.$scroll.append(this.$downloadItems),this.$downloadItemTemplate=$('<li><img/><div class="col2"><a class="filename" target="_blank" download=""></a><span class="label"></span><a class="description" target="_blank" download=""></a></div></li>'),this.title=this.extension.helper.getLabel()},e.prototype.openMedia=function(t){return c(this,void 0,void 0,(function(){var e,n,i,s,r,h,c,u,f,d,y,b,g,_;return p(this,(function(p){switch(p.label){case 0:return[4,this.extension.getExternalResources(t)];case 1:for(p.sent(),e=this.extension.helper.getCurrentCanvas(),n=e.getContent(),s=0;s<n.length;s++)(r=n[s]).getBody().length&&(i=this.$downloadItemTemplate.clone(),h=i.find(".filename"),c=i.find(".label"),u=i.find("img"),f=i.find(".description"),d=r.getBody()[0],(y=d.getProperty("id"))&&(h.prop("href",y),h.text(y.substr(y.lastIndexOf("/")+1))),(b=l.LanguageMap.getValue(d.getLabel()))&&c.text(Object(a.c)(b)),(g=r.getProperty("thumbnail"))?u.prop("src",g):u.hide(),(_=d.getProperty("description"))&&(f.text(Object(a.c)(_)),y&&f.prop("href",y)),this.$downloadItems.append(i));return this.component.publish(o.a.OPENED_MEDIA),[2]}}))}))},e.prototype.resize=function(){t.prototype.resize.call(this),this.title&&this.$title.text(Object(a.c)(this.title)),this.$scroll.height(this.$content.height()-this.$scroll.verticalMargins())},e}(r.a),f=n(30),d=n(42),y=n(44),b=n(43),g=n(47),_=n(38),v=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),w=function(t){function e(e){return t.call(this,e)||this}return v(e,t),e.prototype.create=function(){this.setConfig("settingsDialogue"),t.prototype.create.call(this)},e}(_.a),m=n(39),P=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),E=function(t){function e(e){return t.call(this,e)||this}return P(e,t),e.prototype.create=function(){this.setConfig("shareDialogue"),t.prototype.create.call(this)},e.prototype.update=function(){t.prototype.update.call(this),this.code=this.extension.getEmbedScript(this.options.embedTemplate,this.currentWidth,this.currentHeight),this.$code.val(this.code)},e.prototype.resize=function(){t.prototype.resize.call(this)},e}(m.a),L=n(4),O=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),C=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return O(e,t),e.prototype.create=function(){var e=this;t.prototype.create.call(this),$(window).bind("enterfullscreen",(function(){e.component.publish(o.a.TOGGLE_FULLSCREEN)})),$(window).bind("exitfullscreen",(function(){e.component.publish(o.a.TOGGLE_FULLSCREEN)})),this.component.subscribe(o.a.CANVAS_INDEX_CHANGED,(function(t){e.viewCanvas(t)})),this.component.subscribe(o.a.THUMB_SELECTED,(function(t){e.component.publish(o.a.CANVAS_INDEX_CHANGED,t)}))},e.prototype.createModules=function(){t.prototype.createModules.call(this),this.isHeaderPanelEnabled()?this.headerPanel=new d.a(this.shell.$headerPanel):this.shell.$headerPanel.hide(),this.isLeftPanelEnabled()&&(this.leftPanel=new g.a(this.shell.$leftPanel)),this.centerPanel=new u(this.shell.$centerPanel),this.isRightPanelEnabled()&&(this.rightPanel=new b.a(this.shell.$rightPanel)),this.isFooterPanelEnabled()?this.footerPanel=new f.a(this.shell.$footerPanel):this.shell.$footerPanel.hide(),this.$helpDialogue=$('<div class="overlay help" aria-hidden="true"></div>'),this.shell.$overlays.append(this.$helpDialogue),this.helpDialogue=new y.a(this.$helpDialogue),this.$shareDialogue=$('<div class="overlay share" aria-hidden="true"></div>'),this.shell.$overlays.append(this.$shareDialogue),this.shareDialogue=new E(this.$shareDialogue),this.$settingsDialogue=$('<div class="overlay settings" aria-hidden="true"></div>'),this.shell.$overlays.append(this.$settingsDialogue),this.settingsDialogue=new w(this.$settingsDialogue),this.isLeftPanelEnabled()&&this.leftPanel.init(),this.isRightPanelEnabled()&&this.rightPanel.init()},e.prototype.render=function(){t.prototype.render.call(this)},e.prototype.isLeftPanelEnabled=function(){return L.b.getBool(this.data.config.options.leftPanelEnabled,!0)&&(this.helper.isMultiCanvas()||this.helper.isMultiSequence()||this.helper.hasResources())},e.prototype.getEmbedScript=function(t,e,n){var i=this.getAppUri()+"#?manifest="+this.helper.manifestUri+"&c="+this.helper.collectionIndex+"&m="+this.helper.manifestIndex+"&s="+this.helper.sequenceIndex+"&cv="+this.helper.canvasIndex;return L.n.format(t,i,e.toString(),n.toString())},e}(s.a);e.default=C},44:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var i,o=n(3),s=n(22),r=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=function(t){function e(e){return t.call(this,e)||this}return r(e,t),e.prototype.create=function(){var e=this;this.setConfig("helpDialogue"),t.prototype.create.call(this),this.openCommand=o.a.SHOW_HELP_DIALOGUE,this.closeCommand=o.a.HIDE_HELP_DIALOGUE,this.component.subscribe(this.openCommand,(function(){e.open()})),this.component.subscribe(this.closeCommand,(function(){e.close()})),this.$title=$("<h1></h1>"),this.$content.append(this.$title),this.$scroll=$('<div class="scroll"></div>'),this.$content.append(this.$scroll),this.$message=$("<p></p>"),this.$scroll.append(this.$message),this.$title.text(this.content.title),this.$message.html(this.content.text),this.$message.targetBlank(),this.$element.hide()},e.prototype.resize=function(){t.prototype.resize.call(this)},e}(s.a)},47:function(t,e,n){"use strict";var i,o=n(3),s=n(36),r=n(37),a=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return a(e,t),e.prototype.create=function(){this.setConfig("resourcesLeftPanel"),t.prototype.create.call(this)},e}(r.a),h=n(0),c=n(4),p=n(1);n.d(e,"a",(function(){return f}));var u=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),f=function(t){function e(e){return t.call(this,e)||this}return u(e,t),e.prototype.create=function(){this.setConfig("resourcesLeftPanel"),t.prototype.create.call(this),this.setTitle(this.content.title),this.$tabsContent=$('<div class="tabsContent"></div>'),this.$main.append(this.$tabsContent),this.$views=$('<div class="views"></div>'),this.$tabsContent.append(this.$views),this.$thumbsView=$('<div class="thumbsView"></div>'),this.$views.append(this.$thumbsView),this.$resourcesView=$('<div class="resourcesView"></div>'),this.$resources=$("<ul></ul>"),this.$resourcesView.append(this.$resources),this.$views.append(this.$resourcesView),this.thumbsView=new l(this.$thumbsView),this.dataBind()},e.prototype.dataBind=function(){this.dataBindThumbsView();var t=this.extension.helper.getCurrentCanvas().getResources();0===t.length&&this.$resourcesView.hide();for(var e=0;e<t.length;e++){var n=t[e].getResource();if(n){var i=p.LanguageMap.getValue(n.getLabel());if(i){var o=c.f.simplifyMimeType(n.getFormat().toString()),s=$('<li><a href="'+n.id+'" target="_blank">'+i+" ("+o+")</li>");this.$resources.append(s)}}}},e.prototype.dataBindThumbsView=function(){if(this.thumbsView){var t,e,n=this.extension.helper.getViewingDirection();!n||n!==h.f.LEFT_TO_RIGHT&&n!==h.f.RIGHT_TO_LEFT?(t=this.config.options.oneColThumbWidth,e=this.config.options.oneColThumbHeight):(t=this.config.options.twoColThumbWidth,e=this.config.options.twoColThumbHeight),void 0===t&&(t=100),void 0===e&&(e=100),this.thumbsView.thumbs=this.extension.helper.getThumbs(t,e),this.thumbsView.thumbs.length<2&&this.$thumbsView.hide(),this.thumbsView.databind()}},e.prototype.expandFullStart=function(){t.prototype.expandFullStart.call(this),this.component.publish(o.a.LEFTPANEL_EXPAND_FULL_START)},e.prototype.expandFullFinish=function(){t.prototype.expandFullFinish.call(this),this.component.publish(o.a.LEFTPANEL_EXPAND_FULL_FINISH)},e.prototype.collapseFullStart=function(){t.prototype.collapseFullStart.call(this),this.component.publish(o.a.LEFTPANEL_COLLAPSE_FULL_START)},e.prototype.collapseFullFinish=function(){t.prototype.collapseFullFinish.call(this),this.component.publish(o.a.LEFTPANEL_COLLAPSE_FULL_FINISH)},e.prototype.resize=function(){t.prototype.resize.call(this),this.$views.height(this.$main.height()),this.$resources.height(this.$main.height())},e}(s.a)}}]);