var findlawAssets = {};
findlawAssets['preloader'] = { path:'http://video-transcripts.findlaw.com/html5/swf/dots.swf', dir:false };
var findlawOverlayPlayers = {};

var findlawExperience;
var findlawVideoPlayer;

function onTemplateLoaded(experienceID) {
    findlawExperience = brightcove.getExperience(experienceID);
    findlawVideoPlayer = findlawExperience.getModule(APIModules.VIDEO_PLAYER);
}

function parseQuery(str) {
  var paramSplit = str.split("&");
  var map = new Object();

  for (var i = 0; i < paramSplit.length; i++) {
    var pair = paramSplit[i].split("=");

    map[pair[0]] = pair[1];
  }
  return map;
}

function resizePlayer(playerID, height) {
  try {
    var target = $('object#' + playerID);
    if (target.length == 0) {
      target = $('object#myExperience');
    }
    
    target.height(height);    
  } catch (e) { }
}

function findlawPlayerReady() {
  $('div.findlawPreloader').hide();
  $('div.findlawPlayer .BrightcoveExperience').show();

}

function findlawInitializePlayer() {

  $("div.findlawPlayer").each(function(e){
    var player = $(this);

    if (brightcove.checkHtmlSupport()) {

      if (player.find("param[name$='videoList']").length ||
          player.find("param[name$='playlistCombo']").length ||
              player.find("param[name$='playlistTabs']").length) {

        var vidlistids = player.find("param[name$='videoList']")

        var plids = vidlistids.attr("value");
        var first_id = plids.split(",")[0]

        player.find("param[name$='videoList']").attr('value', first_id)
        player.find("param[name$='playlistCombo']").attr('value', first_id)
        player.find("param[name$='playlistTabs']").attr('value', first_id)
        //player.find("param[name='playerID']").attr('value', '731020537001');
        //player.find("param[name='playerKey']").attr('value', 'AQ~~,AAAAADqBmOk~,Bp73JJAqj96hHVp5-Yg0a6GLezzKgbBK');

        //player.removeClass("large");
        //player.removeClass("medium");
        //player.removeClass("small");
        //player.removeClass("tiny");

      } else {
        //player.find("param[name='playerID']").attr('value', '731020536001');
        //player.find("param[name='playerKey']").attr('value', 'AQ~~,AAAAADqBmOk~,Bp73JJAqj95bI-YSPcmrrcK3AMmFNnUM');
      }

      brightcove.createExperiences();
      return;
    }

    var obj = player.find("object");
    if (obj.length == 0) {
      return;
    }

    var flash = $(obj[0]);

    var playerWidth = flash.attr('width');
    var playerHeight = flash.attr('height');

    flash.children("param").each(function(){
      var name = $(this).attr('name');
      if (name == 'width')
        playerWidth = $(this).attr('value');
      if (name == 'height')
        playerHeight = $(this).attr('value');
    });

    var preEl = $(this).prepend(
      '<div class="findlawPreloader" style="z-index:80;position:absolute;background-color:#000000;width:' + 
        playerWidth + 'px;height:' + playerHeight + 'px"></div>');

    var embedParams = {
      src: findlawAssets['preloader'].path,
      width: playerWidth,
      height: playerHeight,
      bgcolor: '#000000'
    }
    
    embedParams.wmode = getBrowserWmode();
    
    preEl.children('.findlawPreloader').flashembed(embedParams);

    brightcove.createExperiences();
  });
}

function getBrowserWmode() {
  if (jQuery.browser.safari || jQuery.browser.webkit) {
    return 'opaque';
  } else if (jQuery.browser.mozilla) {
    if (jQuery.browser.version.indexOf("1.9.2") == 0) {
      // this is really strange but FF 3.6 wants 'window' as a value
      return 'window';
    } else {
      return 'opaque';
    }
    
  } else {
    return 'transparent';
  }
}

function shouldUpdateWmode() {
  
  if (jQuery.browser.safari || jQuery.browser.webkit || jQuery.browser.mozilla) {
    return true;
  } else {
    return false;
  }
}

function shouldUseOpaque() {
  return false;
  if (jQuery.browser.safari || jQuery.browser.webkit) {
    return true;
  } else if (jQuery.browser.mozilla && jQuery.browser.version.indexOf("1.9.1") == 0) {
    return true;
  } else {
    return false;
  }
}

function initializeMobileOverlays() {
  $('div.findlawPlayer.overlay object.BrightcoveExperience').each(function(index,el){
    var player = $(this);
    var key = player.parent().attr('id');

    findlawOverlayPlayers[key] = $(this).remove();
  });
}

$(document).ready(function(){

  brightcove.defaultFlashParam.wmode = getBrowserWmode();

  if (brightcove.checkHtmlSupport()) {
    initializeMobileOverlays();
  }

  findlawInitializePlayer();

  $.extend($.tools.overlay.conf, {
    start: {
      absolute: true,
      top: null,
      left: null
    },

    fadeInSpeed: 'fast',
    zIndex: 9999
  });   

  $.tools.overlay.addEffect("myEffect",
                            
    function(onLoad) {
      if (brightcove.checkHtmlSupport()) {
        $('div.findlawPreloader').show();
      }

      var overlay = this.getOverlay(),
      opts = this.getConf(),
      trigger = this.getTrigger(),
      self = this,
      oWidth = overlay.outerWidth({margin:true}),
      img = overlay.data("img");

      var contentWidth = overlay.width() + 70;
      var contentHeight = overlay.height() + 70;


      // growing image is required.
      if (!img) {
        var bg = overlay.css("backgroundImage");

        if (!bg) {
          throw "background-image CSS property not set for overlay"; 
        }

        // url("bg.jpg") --> bg.jpg
        bg = bg.substring(bg.indexOf("(") + 1, bg.indexOf(")")).replace(/\"/g, "");
        overlay.css("backgroundImage", "none");

        img = $('<img src="' + bg + '"/>');
        img.css({border:0,position:'absolute',display:'none'}).width(contentWidth).height(contentHeight);     
        $('body').append(img);
        overlay.data("img", img);
      }

      // initial top & left
      var w = $(window),
      itop = Math.round(w.height() / 2),
      ileft = Math.round(w.width() / 2);

      if (trigger) {
        itop = trigger.position().top;
        ileft = trigger.position().left;
      } 

      // adjust positioning relative toverlay scrolling position
      if (!opts.start.absolute) {
        itop += w.scrollTop();
        ileft += w.scrollLeft();
      }

      // initialize background image and make it visible
      img.css({
        top: itop,
        left: ileft,
        width: 0,
        zIndex: opts.zIndex
      }).show();

      // begin growing
      img.animate({
        top: overlay.css("top"),
        left: overlay.css("left"),
        width: contentWidth,
        height: contentHeight}, opts.speed, function() {
          // set close button and content over the image
          overlay.css("zIndex", opts.zIndex + 1).fadeIn(opts.fadeInSpeed, function()  {
            if (self.isOpened() && !$(this).index(overlay)) {   
              onLoad.call();
            } else {
              overlay.hide(); 
            }
          });
          
        });

    },

    function(onClose) {
        // variables
        var overlay = this.getOverlay(),
        opts = this.getConf(),
        trigger = this.getTrigger(),
        top,left;

        // Stop video
        if (findlawVideoPlayer != null) {
          findlawVideoPlayer.stop();
        }

        if (brightcove.checkHtmlSupport()) {
            
        }

        // hide overlay & closers
        overlay.hide();

        // trigger position
        if (trigger) {
          top = trigger.position().top;
          left = trigger.position().left;
        }

        // shrink image   
        overlay.data("img").animate({top: top, left: left, width:0, height:0 }, opts.closeSpeed, onClose);  
      }
   );
   // create custom animation algorithm for jQuery called "drop" 
$.easing.drop = function (x, t, b, c, d) {
  return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
};

// loading animation
$.tools.overlay.addEffect("drop", function(css, done) { 
   
   // use Overlay API to gain access to crucial elements
   var conf = this.getConf(),
       overlay = this.getOverlay();           
   
   // determine initial position for the overlay
   if (conf.fixed)  {
      css.position = 'fixed';
   } else {
      css.top += $(window).scrollTop();
      css.left += $(window).scrollLeft();
      css.position = 'absolute';
      
   } 
   
   // position the overlay and show it
   overlay.css(css).show();
   
   // begin animating with our custom easing
   overlay.animate({ top: '+=55',  opacity: 1,  width: '+=10'}, 400, 'drop', done);
   
   /* closing animation */
   }, function(done) {
      this.getOverlay().animate({top:'-=55', opacity:0, width:'-=10'}, 200, 'drop', function() {
         $(this).hide();


        if (findlawVideoPlayer != null) {
          findlawVideoPlayer.stop();
        }

         if (brightcove.checkHtmlSupport()) {
          $('div.findlawPlayer.overlay .BrightcoveExperience').remove();
          }
         done.call();      
      });
   }
);

   $("img[rel^='#'],a[rel^='#']").overlay({
      expose: { color: '#000', opacity: 0.5 },
      effect: 'drop',
      mask: '#555',
      onBeforeLoad: function(event) {
        if (brightcove.checkHtmlSupport()) {
          
          //var rel = $(event.srcElement).attr('rel');
	            
	  var rel = $(event.srcElement).attr('rel') || $(event.target).attr('rel');
	  if (!rel) {
	  	rel = $(event.srcElement).parent().attr('rel') || $(event.target).parent().attr('rel');
          }
          
          if (!rel) {
           rel = $(event.srcElement).parent().attr('rel');
          }
          var id = rel.substring(1);
		  if ($(rel).find("object").length == 0)
			$(rel).append(findlawOverlayPlayers[id]);
          findlawInitializePlayer();
        }
     }
  });
});