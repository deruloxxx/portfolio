
// 絞りこみアニメーション
$(function(){
  function resetBox(){
    $(".box_web,.box_graphic,.box_others").css("display","none");
}
  $(".all").on("click",function(){
    $.when(
      resetBox()).done(function(){ 
      　$(".box_all").fadeIn(2500);
    }); 
  }),
  $(".web").on("click",function(){
    $.when(
      resetBox()).done(function(){ 
      　$(".box_web").fadeIn(2500);
    }); 
  }),
  $(".graphic").on("click",function(){
    $.when(
      resetBox()).done(function(){ 
      　$(".box_graphic").fadeIn(2500);
    }); 
  }),
  $(".others").on("click",function(){
    $.when(
      resetBox()).done(function(){ 
      　$(".box_others").fadeIn(2500);
    }); 
  });
});

// hover状態維持
var searchItem = '.category';   
var activeClass = 'pick';     // 選択中のグループに付与されるclass名

$(function() {
    // 絞り込みを変更した時
    $(searchItem).on('click', function() {
        $(searchItem).removeClass(activeClass);
        $(this).addClass(activeClass);
    });
});

// hover animation

var articles = $('article > .item-wrapper');
articles.on({
    // マウスオーバー時
    'mouseenter':function() {
      var current = $(this);
       // 現在の.item-wrapperに .enter .easeセレクタを追加し、.leaveセレクタを削除
      current.addClass('enter ease').removeClass("leave");
      // 0.28秒後に .easeセレクタを削除
      setTimeout(function(){
        current.removeClass('ease');
      }, 280);
    },
    // マウスオーバー解除時
    'mouseleave':function() {
      var current = $(this);
      // 回転した状態をリセット
      current.css({"transform":"rotate(0)"});
      // .enterセレクタを削除し、.leaveセレクタを追加
      current.removeClass('enter').addClass("leave");
      // 光反射用の要素からstyle属性を削除し、初期状態に戻す
      $('figure > .lighting',this).removeAttr('style');
    }}
  );
  
  // 光源の色(RGB)
var lightingRgb = '255,255,255';
 
// カーソル移動中
articles.mousemove(function(e) {
  var current = $(this),
      // articleエリアにおける現在のカーソルのx座標 (原点=中心)
      x = current.width() - e.offsetX * 2,
      // articleエリアにおける現在のカーソルのy座標
      y = current.height() - e.offsetY * 2,
      // x軸方向の回転角度 (30は回転具合の調整用数値)
      rx = -x / 30,
      // y軸方向の回転角度 (24は回転具合の調整用数値)
      ry = y / 24,
      // 光反射用要素(.lighting)のグラデーション回転角度(+45は調整用)
      deg = Math.atan2(y, x) * (180 / Math.PI) + 45;
 
  // .item-wrapperを5%拡大して、x軸、y軸方向に回転
  current.css({"transform":"scale(1.05) rotateY("+rx+"deg) rotateX("+ry+"deg)"});
  // 光反射用要素のグラデーション
  $('figure > .lighting',this).css('background','linear-gradient('+deg+'deg, rgba('+lightingRgb+',0.32) 0%, rgba('+lightingRgb+',0) 100%)');
});
