/*
*/

$(function (){
/*========================================================================
	placeholder
======================================================================== */
var keys;
var inputKeys;
var placeholder = {
  keys: function(self){
    keys = self.parents('.jq-ph-box').children('.jq-ph');
  },
  inputKeys: function(self){
    inputKeys = self.val();
    keys = self.parents('.jq-ph-box').children('.jq-ph');
  }
}

$('.jq-ph input').on({
  'focus': function(){
  var self = $(this);
  placeholder.keys(self);
  keys.hide();
  },
  'blur': function(){
    var self = $(this);
    placeholder.inputKeys(self);
    placeholder.keys(self);
    if(!inputKeys){
      keys.show();
    }else{
      keys.hide();
    }
  }
});

$('.jq-ph-box input').each( function(){
  var self = $(this);
  placeholder.inputKeys(self);
  placeholder.keys(self);
  if(!inputKeys){
    keys.show();
  }else{
    keys.hide();
  }
});
/*========================================================================
	Login
======================================================================== */
// var userId = $('#userId');
// var userPs = $('#userPs');
// var alertToast = $('#toastAlert');
// var success = $('#toastSuccess');

// $('#signIn').on('click', function(){
// 	var userIdInfo = userId.val();
// 	var userPsInfo = userPs.val();

// 	var idKey = 'admin';
// 	var psKey = 'admin';

// 	var keyFlg = false;

// 	if( userIdInfo.match( idKey ) && userPsInfo.match( psKey )){
// 		document.location = "portal.html";
// 	}else{
// 		alertToast.show(300);
// 	}

// });
/*========================================================================
	resize
======================================================================== */
function resize(){
  var wHeight = $(window).height();
  var hHeight = $('#jq-Header').outerHeight();
  var fHeight = $('#jq-Footer').outerHeight();
  var cHeight = hHeight + fHeight;
  cHeight = wHeight - cHeight;
  $('#jq-LeftCanvas').css('height', cHeight);
}

var timer = false;
$(window).resize(function() {
  if (timer !== false) {
    clearTimeout(timer);
  }
  timer = setTimeout(function() {
    resize();
  }, 40);
});
resize();

/*========================================================================
side menu
======================================================================== */
//CSS
$('.jq-menu-parents').on('click', function(){
  var target = $(this).hasClass('current');
  if( target ){
    $(this).removeClass('current');
    var id = '.' + $(this).attr('id');
    $(id).slideToggle().removeClass('enable');
  }else{
    $(this).addClass('current');
    var id = '.' + $(this).attr('id');
    $(id).slideToggle().addClass('enable');
  }
});
/*========================================================================
  bookmark
======================================================================== */
var bookmartFlg = 0;
$('.jq-bookmark-on').on('click', function(){
  bookmartFlg++;
  if(bookmartFlg === 1){
    //console.log('one');
  }
  if(bookmartFlg === 2){
    $(this).removeClass('active');
    bookmartFlg = 0;
    //console.log('two');
  }
});

/*========================================================================
  tooltip
======================================================================== */
var toolTipFlg = 'off';
var toolTipHiretsu = [];
var toolTipTimer = false;

//mouseover
$( ".jq-tooltip-hover" ).on({
  'mouseenter': function(){
    var target = $(this);
    toolTipOn(target);

    toolTipFlg = 'on';
    toolTipOff(toolTipFlg);
  },
  'mouseleave': function(){
    toolTipFlg = 'off';
    toolTipOff(toolTipFlg);
  }
});
//remove mouseover
$('.jq-tooltip').on({
  'mouseenter': function(){
    toolTipFlg = 'on';
    toolTipOff(toolTipFlg);
  },
  'mouseleave': function(){
    toolTipFlg = 'off';
    toolTipOff(toolTipFlg);
  }
});
//hide tooltip
function toolTipOff(toolTipFlg){
  toolTipHiretsu.push(toolTipFlg);
  //console.log(toolTipHiretsu);
  if( toolTipTimer !== false ) {
    clearTimeout(toolTipTimer);
  }
  toolTipTimer = setTimeout( function(){
    var lastFlg = toolTipHiretsu[toolTipHiretsu.length-1];
    //console.log(lastFlg);
    if( lastFlg === 'off'){
      $('.jq-tooltip').hide(300);
      toolTipHiretsu = [];
    }else{
      return false;
    }
  }, 1800);
}
//show tooltip
function toolTipOn(target){
  var tipPosi = target.offset();
  var topPosi = tipPosi.top - 37;
  var leftPosi = tipPosi.left;
  var keyword = target.find('.jq-tooltip-key').text();
  $('.jq-tooltip-box').text('').text(keyword);
  $('.jq-tooltip-posi').css({
    top: topPosi,
    left: leftPosi
  });
  $('.jq-balloon').css({
    top: tipPosi.top - 10,
    left: tipPosi.left + 4
  });
  $('.jq-tooltip').show(150);
};
/*========================================================================
  popup
======================================================================== */
$('.jq-popup-open').on('click', function(){
  var windowWidth = $(window).outerWidth(true);
  var popupPosi = $(this).position();
  var topPosi = popupPosi.top + 25;
  var thisWidth = $(this).width();
  var rightPosi = windowWidth - popupPosi.left - thisWidth + 10;
  var id = '.jq-popup-content1';
  var clicker = $(this).children('.jq-clickable');
  popupMenuOn(topPosi, rightPosi, id, clicker);
});

function popupMenuOn(topPosi, rightPosi, id, clicker){
  //コンテンツの表示
  $('.jq-popup-changer').removeClass('current');
  $(id).addClass('current');

  //ポップアップの座標
  $('.jq-popup-posi').css({
    top: topPosi,
    right: rightPosi
  });
  //ポップアップ表示
  $('.jq-popup').show(300);

  //背景のカーテンも一緒に表示
  $('.jq-cartain').show();

  //閉じるボタン
  $('.jq-popup-close, .jq-cartain').on('click', function(){
    $('.jq-popup').hide(300);
    $('.jq-cartain').hide();
  });
};
/*========================================================================
  loader
======================================================================== */
$('.jq-loader-on').on('click', function(){
  $('.jq-loader').show();
});
$('.jq-loader-off').on('click', function(){
  $('.jq-loader').hide();
});
/*========================================================================
  collapse
======================================================================== */
$('.jq-collapse-switcher').on('click', function(){
  //トリガーのidを取得して同じクラス名があれば開く
  var id = '.' + $(this).attr('id');
  $(id).slideToggle();

  //オプションで開閉アイコンがあれば処理
  var point = $(this).children();
  var option = point.attr('class');

  if( option === 'fa fa-caret-down' ){
    point.removeClass().addClass('fa fa-caret-up')
  }
  else if( option === 'fa fa-caret-up' ){
    point.removeClass().addClass('fa fa-caret-down')
  }else{
    return false;
  }
});
/*========================================================================
  tab
======================================================================== */
$('#jq-TabSelect li a').on('click', function(){
  //tab
  $('#jq-TabSelect li').removeClass('current');
  $(this).parents('li').addClass('current');
  var id = $(this).parents('li').attr('id');
  id = '#' + id.replace("jq-Tab", "jq-Tab-Contents");
  //contents
  $('.jq-tab-switcher').removeClass('current');
  $(id).addClass('current');
});
/*========================================================================
  table hightlight
======================================================================== */

//
$('.jq-col-on').on('click', function(){
  var id = '.' + $(this).attr('id');
  //contents
  $('.jq-col-lighting').removeClass('fw-bg-green');
  $(id).addClass('fw-bg-green');
});
/*========================================================================
  HTMLソース表示
======================================================================== */
//押したトリガーのIDを取得して、同じ名前のテキストファイルがあれば処理をする
$('.jq-text-load').on('click', function(){
  var textFile =$(this).attr('id');
  textFile = 'doc/' + textFile.replace("jq-file-", "") + '.txt';
  var title = $(this).text().trim();

  //非同期でテキストファイルを読込
  $.ajax({
    url:textFile,
    dataType : 'text',
    success: function(data){
      //alert(data);
      //背景のカーテンも一緒に表示
      $('.jq-cartain').show();

      //タイトルを表示
      $('.jq-souce-title').text('').text(title);

      //モーダルを表示
      $('.jq-souce-view').text(data.replace(/\r\n/g,"\n")); //firefoxの改行を消す
      $('.jq-modal, .jq-modal-souce-viwer').slideDown(300);

      //閉じるボタン
      $('.jq-modal-close, .jq-cartain').on('click', function(){
        $('.jq-modal, .jq-modal-souce-viwer').slideUp(300);
        $('.jq-cartain').hide();
      });
    }
  });
});
////////////////////////////////////////////////////////////
});