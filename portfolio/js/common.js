// マウス追従アニメーション
var
cursor = $(".cursor"),
follower = $(".follower"),
cWidth = 8, //カーソルの大きさ
fWidth = 10, //フォロワーの大きさ
delay =  13, //数字を大きくするとフォロワーが遅れて来る
mouseX = 0, //マウスのX座標
mouseY = 0, //マウスのY座標
posX = 0, //フォロワーのX座標
posY = 0; //フォロワーのX座標

//カーソルの遅延アニメーション
TweenMax.to({}, .001, {
  repeat: -1,
  onRepeat: function() {
    posX += (mouseX - posX) / delay;
    posY += (mouseY - posY) / delay;
    
    TweenMax.set(follower, {
        css: {    
          left: posX - (fWidth / 2),
          top: posY - (fWidth / 2)
        }
    });
    
    TweenMax.set(cursor, {
        css: {    
          left: mouseX - (cWidth / 2),
          top: mouseY - (cWidth / 2)
        }
    });
  }
});
//マウス座標を取得
$(document).on("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});
$("a").on({
  "mouseenter": function() {
    follower.addClass("follower-active");
  },
  "mouseleave": function() {
    follower.removeClass("follower-active");
  }
});
// class fadeoutを外す
  $(window).on('load', function(){
    $('body').removeClass('fadeout');
  });
  
  $(function() {
    // ハッシュリンク(#)と別ウィンドウでページを開く場合を除く
    $('a:not([href^="#"]):not([target])').on('click', function(e){
      e.preventDefault(); // ナビゲートをキャンセル
      url = $(this).attr('href'); // 遷移先のURLを取得
      if (url !== '') {
        $('body').addClass('fadeout');
        // bodyに class="fadeout"を挿入
        setTimeout(function(){
          window.location = url;  
        }, 1000) // 1秒後に取得したURLに遷移
        $('#nav').remove(),
        $('#pagetop').remove();
      }
      return false;
    });
  });

  // スクロール制御
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
      const y = window.scrollY
      const height = document.body.scrollHeight - window.innerHeight
      const progress = y / height
      TweenMax.to(tl1, 0.5, {progress: progress, ease:Power3.easeOut})
  })
  const tl1 = new TimelineMax().pause()

  tl1.from('main', 0, { y: '0%' })
      .to('main' , 1, { y: '33%', ease: Power0.easeNone })

})
// プラグイン
$(".ripples").ripples({
	dropRadius: 40, //波紋の大きさ
	perturbance: 0.03, //波紋のぶれ
	resolution: 556, //波紋が広がる速度
	interactive: true,
	crossOrigin: ""
});