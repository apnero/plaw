/* videoBP.js v2.0.0 � 2012 FindLaw */$(function(){({lt:$("#videobp-lt"),gt:$("#videobp-gt"),fp:$(".findlawPlayer"),vbp:480,gtltVid:!1,ltVid:!1,gtVid:!1,bcvCSS:'<link media="screen, projection" href="http://video-transcripts.findlaw.com/html5/css/findlaw-players.css" rel="stylesheet" type="text/css" />',load:function(a,b){jQuery.ajax({async:!1,type:"GET",url:a,data:null,success:b,dataType:"script"})},ld:function(){var a=this;this.load("http://admin.brightcove.com/js/BrightcoveExperiences.js",function(){a.load("http://video-transcripts.findlaw.com/html5/js/findlaw-players.js",
null)});this.load("http://admin.brightcove.com/js/APIModules_all.js",null);this.load("http://video-transcripts.findlaw.com/html5/js/jquery.tools.min-Video.js",null);$("head").append(this.bcvCSS)},init:function(){0<this.fp.length&&this.setup(function(a){if(a.ltVid||a.gtVid){var b=$(document).width();a.run(b)}else a.ld()})},setup:function(a){this.ltVid=0<this.lt.length?!0:!1;this.gtVid=0<this.gt.length?!0:!1;this.gtltVid=this.ltVid&&this.gtVid?!0:!1;var b=this.gt.data("bp")?this.gt.data("bp"):
"",c=this.lt.data("bp")?this.lt.data("bp"):"";""!==b?this.vbp=b:""!==c&&(this.vbp=c);a(this)},run:function(a){this.gtltVid?(this.ld(),a>=this.vbp?(this.vShow(this.gt),this.vHide(this.lt),this.vEmpty(this.lt)):(this.vShow(this.lt),this.vHide(this.gt),this.vEmpty(this.gt))):this.ltVid&&!this.gtltVid?a<this.vbp?(this.ld(),this.vShow(this.lt)):(1<this.fp.length&&this.ld(),this.vHide(this.lt),this.vEmpty(this.lt)):this.gtVid&&!this.gtltVid&&(a>=this.vbp?(this.ld(),this.vShow(this.gt)):(1<this.fp.length&&
this.ld(),this.vHide(this.gt),this.vEmpty(this.gt)))},vShow:function(a){a.css("display","")},vHide:function(a){a.css("display","none")},vEmpty:function(a){a.empty()}}).init()});