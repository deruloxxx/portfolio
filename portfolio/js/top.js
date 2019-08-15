let param = location.search;
if(param !== "?count=2"){
  //初めて訪れた時の処理を書く
  //ローディング
$(function() {
  var h = $(window).height();
  
  $('#wrap').css('display','none');
  $('#loader-bg ,#loader').height(h).css('display','block');
});
  
 var loading = $(window).load(function () {
    $('#loader-bg,#loader,#loader').fadeOut(5000);
  // setTimeout(function(){
  //   $('#loader-bg,#loader').animate({
  //     top:"-100vh"   
  //   },1000)
  //   $('#loader-bg').delay(900).fadeOut(800);
  //   $('#loader').delay(600).fadeOut(300);
  //   $('#wrap').css('display', 'block');
  // },2000)

});

//5秒たったら強制的にロード画面を非表示
$(function(){
  setTimeout('stopload()',5000);
});
  
function stopload(){
  $('#wrap').css('display','block');
  $('#loader-bg').delay(900).fadeOut(800);
  $('#loader').delay(600).fadeOut(300);
}
}

// h1動く
(function ($) {
  "use strict";

  function isInEffect (effect) {
    return /In/.test(effect) || $.inArray(effect, $.fn.textillate.defaults.inEffects) >= 0;
  };

  function isOutEffect (effect) {
    return /Out/.test(effect) || $.inArray(effect, $.fn.textillate.defaults.outEffects) >= 0;
  };


  function stringToBoolean(str) {
    if (str !== "true" && str !== "false") return str;
    return (str === "true");
  };

  // custom get data api method
  function getData (node) {
    var attrs = node.attributes || []
      , data = {};

    if (!attrs.length) return data;

    $.each(attrs, function (i, attr) {
      var nodeName = attr.nodeName.replace(/delayscale/, 'delayScale');
      if (/^data-in-*/.test(nodeName)) {
        data.in = data.in || {};
        data.in[nodeName.replace(/data-in-/, '')] = stringToBoolean(attr.nodeValue);
      } else if (/^data-out-*/.test(nodeName)) {
        data.out = data.out || {};
        data.out[nodeName.replace(/data-out-/, '')] =stringToBoolean(attr.nodeValue);
      } else if (/^data-*/.test(nodeName)) {
        data[nodeName.replace(/data-/, '')] = stringToBoolean(attr.nodeValue);
      }
    })

    return data;
  }

  function shuffle (o) {
      for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

  function animate ($t, effect, cb) {
    $t.addClass('animated ' + effect)
      .css('visibility', 'visible')
      .show();

    $t.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $t.removeClass('animated ' + effect);
        cb && cb();
    });
  }

  function animateTokens ($tokens, options, cb) {
    var that = this
      , count = $tokens.length;

    if (!count) {
      cb && cb();
      return;
    }

    if (options.shuffle) $tokens = shuffle($tokens);
    if (options.reverse) $tokens = $tokens.toArray().reverse();

    $.each($tokens, function (i, t) {
      var $token = $(t);

      function complete () {
        if (isInEffect(options.effect)) {
          $token.css('visibility', 'visible');
        } else if (isOutEffect(options.effect)) {
          $token.css('visibility', 'hidden');
        }
        count -= 1;
        if (!count && cb) cb();
      }

      var delay = options.sync ? options.delay : options.delay * i * options.delayScale;

      $token.text() ?
        setTimeout(function () { animate($token, options.effect, complete) }, delay) :
        complete();
    });
  };

  var Textillate = function (element, options) {
    var base = this
      , $element = $(element);

    base.init = function () {
      base.$texts = $element.find(options.selector);

      if (!base.$texts.length) {
        base.$texts = $('<ul class="texts"><li>' + $element.html() + '</li></ul>');
        $element.html(base.$texts);
      }

      base.$texts.hide();

      base.$current = $('<span>')
        .html(base.$texts.find(':first-child').html())
        .prependTo($element);

      if (isInEffect(options.in.effect)) {
        base.$current.css('visibility', 'hidden');
      } else if (isOutEffect(options.out.effect)) {
        base.$current.css('visibility', 'visible');
      }

      base.setOptions(options);

      base.timeoutRun = null;

      setTimeout(function () {
        base.options.autoStart && base.start();
      }, base.options.initialDelay)
    };

    base.setOptions = function (options) {
      base.options = options;
    };

    base.triggerEvent = function (name) {
      var e = $.Event(name + '.tlt');
      $element.trigger(e, base);
      return e;
    };

    base.in = function (index, cb) {
      index = index || 0;

      var $elem = base.$texts.find(':nth-child(' + ((index||0) + 1) + ')')
        , options = $.extend(true, {}, base.options, $elem.length ? getData($elem[0]) : {})
        , $tokens;

      $elem.addClass('current');

      base.triggerEvent('inAnimationBegin');

      base.$current
        .html($elem.html())
        .lettering('words');

      if (base.options.type == "char") {
        base.$current.find('[class^="word"]')
            .css({
              'display': 'inline-block',
              // fix for poor ios performance
              '-webkit-transform': 'translate3d(0,0,0)',
              '-moz-transform': 'translate3d(0,0,0)',
              '-o-transform': 'translate3d(0,0,0)',
              'transform': 'translate3d(0,0,0)'
            })
            .each(function () { $(this).lettering() });
      }

      $tokens = base.$current
        .find('[class^="' + base.options.type + '"]')
        .css('display', 'inline-block');

      if (isInEffect(options.in.effect)) {
        $tokens.css('visibility', 'hidden');
      } else if (isOutEffect(options.in.effect)) {
        $tokens.css('visibility', 'visible');
      }

      base.currentIndex = index;

      animateTokens($tokens, options.in, function () {
        base.triggerEvent('inAnimationEnd');
        if (options.in.callback) options.in.callback();
        if (cb) cb(base);
      });
    };

    base.out = function (cb) {
      var $elem = base.$texts.find(':nth-child(' + ((base.currentIndex||0) + 1) + ')')
        , $tokens = base.$current.find('[class^="' + base.options.type + '"]')
        , options = $.extend(true, {}, base.options, $elem.length ? getData($elem[0]) : {})

      base.triggerEvent('outAnimationBegin');

      animateTokens($tokens, options.out, function () {
        $elem.removeClass('current');
        base.triggerEvent('outAnimationEnd');
        if (options.out.callback) options.out.callback();
        if (cb) cb(base);
      });
    };

    base.start = function (index) {
      setTimeout(function () {
        base.triggerEvent('start');

      (function run (index) {
        base.in(index, function () {
          var length = base.$texts.children().length;

          index += 1;

          if (!base.options.loop && index >= length) {
            if (base.options.callback) base.options.callback();
            base.triggerEvent('end');
          } else {
            index = index % length;

            base.timeoutRun = setTimeout(function () {
              base.out(function () {
                run(index)
              });
            }, base.options.minDisplayTime);
          }
        });
      }(index || 0));
      }, base.options.initialDelay);
    };

    base.stop = function () {
      if (base.timeoutRun) {
        clearInterval(base.timeoutRun);
        base.timeoutRun = null;
      }
    };

    base.init();
  }

  $.fn.textillate = function (settings, args) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('textillate')
        , options = $.extend(true, {}, $.fn.textillate.defaults, getData(this), typeof settings == 'object' && settings);

      if (!data) {
        $this.data('textillate', (data = new Textillate(this, options)));
      } else if (typeof settings == 'string') {
        data[settings].apply(data, [].concat(args));
      } else {
        data.setOptions.call(data, options);
      }
    })
  };

  $.fn.textillate.defaults = {
    selector: '.texts',
    loop: false,
    minDisplayTime: 200,
    initialDelay: 0,
    in: {
      effect: 'fadeInLeftBig',
      delayScale: 1.8,
      delay: 520,
      sync: false,
      reverse: false,
      shuffle: false,
      callback: function () {}
    },
    out: {
      effect: 'hinge',
      delayScale: 1.5,
      delay: 500,
      sync: false,
      reverse: false,
      shuffle: false,
      callback: function () {}
    },
    autoStart: true,
    inEffects: [],
    outEffects: [ 'hinge' ],
    callback: function () {},
    type: 'char'
  };

}(jQuery));

$(function () {
    $('.tlt').textillate();
});

// catchtextを動かす(loop)
$('.letters').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter' data-letter='$&'>$&</span>"));
});

anime.timeline(
     {loop: true}
   )
    .add({
        targets: '.letter',
        scale: {
         value: [0, 1],
         duration: 350
       },
        translateY : [function() { return anime.random(-360, 360); }, 0],
        translateX : [function() { return anime.random(-360, 0); }, 0],
        opacity: [0, 1],
        filter: {
        value: ["blur(15px)", "blur(0px)"],
        duration: 800 //文字をぼかす
        },
        duration: 3850, //textが動く速さ
        elasticity: 50, //文字が弾かれる速さ
        delay: function(el, i) {
          return 35 * (i+1)
        },
        update: function(anim) {
          // console.log(anim.currentTime + 'ms'); // Get current animation time with `myAnimation.currentTime`, return value in ms.
          // console.log(anim.progress + '%'); // Get current animation progress with `myAnimation.progress`, return value in %
        },
        begin: function(anim, target) {
          console.log(anim.began); // true after 1000ms
          
        }

    }).add({
        targets: '.letter',
        opacity: 0,
        duration: 1500,//fadeout 
        easing: "easeOutExpo",
        delay: 4500//fadein
    });

// 背景アニメーション
var rain = (function(){
	
	var c = document.getElementById("c"),
			ctx = c.getContext("2d");
	
	c.width = innerWidth;
	c.height = innerHeight;
	
	var lines = [],
			maxSpeed = 5,
			spacing = 5,
			xSpacing = 0,
			n = innerWidth / spacing,
      colors = [
        "rgba(250, 250, 250, 0.5)", 
        // "rgba(232, 232, 232, 0.5)",
        // "rgba(247, 224, 163, 0.7)"
              ],
			i;
	
	for (i = 0; i < n; i++){
		xSpacing += spacing;
		lines.push({
			x: xSpacing,
			y: Math.round(Math.random()*c.height),
			width: 1.3,
			height: Math.round(Math.random()*(innerHeight/10)),
			speed: Math.random()*maxSpeed + 1,
			color: colors[Math.floor(Math.random() * colors.length)]
		});
	}
	
	
	function draw(){
		var i;
		ctx.clearRect(0,0,c.width,c.height);
		
		for (i = 0; i < n; i++){
			ctx.fillStyle = lines[i].color;
			ctx.fillRect(lines[i].x, lines[i].y, lines[i].width, lines[i].height);
			lines[i].y += lines[i].speed;
			
			if (lines[i].y > c.height)
				lines[i].y = 0 - lines[i].height;
		}
		
		requestAnimationFrame(draw);
		
	}
	
	draw();
	
}());


// スクロール量に応じて#conceptを表示する
var offset = $('#concept').offset().top;
$(window).scroll(function () {
  //スクロール量を表示するための記述（不要であれば削除）
  $('#scroll-amount').text($(this).scrollTop() + 'px');

  //スクロール量がh1-200px以上の際の命令（数値は自由に変更可）
  if($(this).scrollTop() > offset - 200){
   $.when( 
    $("#concept").css({
      opacity:1
    })
  ).done(function(){
    $(".linebox01").css({
      // width:"500px",
      // /* 速度 */
      // transition:"0.5s",
      // /* 実行のタイミング */
      // "transition-delay":"0.5s"
      "animation": "fill 1.0s",
      "animation-fill-mode": "forwards" 
    })
  })
  }
  //それ以外の場合の命令
  else{
    $("#concept").css({
      opacity:0
    })
  }
});


// スクロール量に応じて#about-meを表示する
var offset2 = $('#about-me').offset().top;
$(window).scroll(function () {
  //スクロール量がh1-200px以上の際の命令（数値は自由に変更可）
  if($(this).scrollTop() > offset2 - 200){
    $.when( 
      $("#about-me").css({
        opacity:1
      })
    ).done(function(){
      $(".linebox02").css({
        // width:"500px",
        // /* 速度 */
        // transition:"0.5s",
        // /* 実行のタイミング */
        // "transition-delay":"0.5s"
        "animation": "fill02 1.0s",
        "animation-fill-mode": "forwards" 
      })
    })
    }
  //それ以外の場合の命令
  else{
    $("#about-me").css({
      opacity:0
    })
  }
});
// back to top表示
$(function() {
    var appear = false;
    var pagetop = $('#pagetop');
    $(window).scroll(function () {
      if ($(this).scrollTop() > 2000) {
        if (appear == false) {
          appear = true;
          pagetop.fadeIn().animate({
            'bottom': '-10px'
          }, 800);
        }
      } else {
        if (appear) {
          appear = false;
          pagetop.fadeOut().animate({
            'bottom': '-40px' 
          }, 500);
        }
      }
    });

  // back to top　スムーススクロール
    pagetop.click(function () {
      $('body, html').animate({ scrollTop: 0 }, 1000);
      return false;
    });
  });