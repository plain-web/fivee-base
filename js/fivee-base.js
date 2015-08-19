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
  load common parts　
======================================================================== */
// var navType = $('body').attr('id');

// //nav type
// if( navType === 'nav-type00'){
//   var pageUrl = ['header.html', 'footer.html', 'nav-00.html', 'components.html'];
// }

// //get parts
// for( var i = 0; i < pageUrl.length; i++){
//   function pageGet(i){
//     var urlList = pageUrl[i];
//     $.ajax({
//       type: 'GET',
//       url: urlList,
//       dataType: 'html',
//       timeout: 20000,
//       success: function(html){
//         //ｈｔｍｌ
//         if( i === 0){$('.jq-load-header').html(html);}
//         if( i === 1){$('.jq-load-footer').html(html);}
//         if( i === 2){$('.jq-load-nav').html(html);}
//         if( i === 3){$('.jq-load-components').html(html);}
//       },
//       error: function(){
//           //error 
//       }
//     });
//   }
//   pageGet(i);
// }
/*========================================================================
  [return] return targetClass
======================================================================== */
function thisClassGet(clickThis, returnClass){
  //get class
  var thisClass = $(clickThis).attr('class');
  //split class　
  thisClass = thisClass.split(" ");
  //return class
  var thisClass = $.grep(thisClass, function(value, index) {
    return value.indexOf(returnClass) >= 0;
  });
  var targetClass = '.' + thisClass;
  //console.log(targetClass);
  return targetClass;
}
/*========================================================================
   same label
======================================================================== */
//click target
// $( '.jq-label-same-table td, .jq-label-same-table th' ).on({
//   'mouseenter': function(){
//     //this
//     var clickThis = $(this);
//     //return class
//     var returnClass = 'jq-same-';
//     //target class
//     var targetClass = thisClassGet(clickThis, returnClass);
//     $(targetClass).addClass('is-focus');
//   },
//   'mouseleave': function(parentClass){
//     //delete class
//     $(this).parents('.jq-label-same-table').find('.is-focus').removeClass('is-focus');
//   }
// });
/*========================================================================
  focus target
======================================================================== */
$('body').on('click', '.jq-focus-on', function(){
  $('.jq-focus-target').addClass('is-focus');
  //show cartain
  $('.jq-cartain').show();
  //click cartain
  $('.jq-cartain').on('click', function(){
    $('.jq-focus-target').removeClass('is-focus');
    $(this).hide();
  });
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
  equalizer
======================================================================== */
// var gridTarget = $('.jq-equalizer-width li'); //target
// var listHiretsu = []; 

// if(gridTarget){
//   $(gridTarget).each(function(i) {
//     var targetWidth = $(gridTarget).eq(i).width(); //get width
//     listHiretsu.push(targetWidth);
//   });

//   var maxWidth =  Math.max.apply(null, listHiretsu); //max
//   $(gridTarget).width(maxWidth); 
// }
/*========================================================================
	resize
======================================================================== */
// function resize(){
//   var wHeight = $(window).height();
//   var hHeight = $('#jq-Header').outerHeight();
//   var fHeight = $('#jq-Footer').outerHeight();
//   var cHeight = hHeight + fHeight;
//   cHeight = wHeight - cHeight;
//   $('#jq-LeftCanvas').css('height', cHeight);
// }

// var timer = false;
// $(window).resize(function() {
//   if (timer !== false) {
//     clearTimeout(timer);
//   }
//   timer = setTimeout(function() {
//     resize();
//   }, 40);
// });
// resize();

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
   collapse nav
======================================================================== */
// $('main').on('click', '.jq-navCollapse-switcher', function(){
//   var id = '.' + $(this).attr('id');
//   var thisSwitch = $(this);

//   $(id).animate({width: 'toggle'}, 300);

//   //option icon
//   var point = $(this).children();
//   var option = point.attr('class');

//   //callback
//   if( option === 'fa fa-caret-left' ){
//     point.removeClass().addClass('fa fa-caret-right'); //icon
//     $('.main-contents').animate({'margin-left': '50px'}, 300); //right column
//     $(thisSwitch).css('height', '500px'); //switch
//   }else if( option === 'fa fa-caret-right' ){
//     point.removeClass().addClass('fa fa-caret-left'); //icon
//     $('.main-contents').animate({'margin-left': '250px'}, 300); //right column
//     $(thisSwitch).css('height', ''); //switch
//   }else{
//     return false;
//   }
// });
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
// $('body').on('click', '.jq-popup-open', function(){
//   var windowWidth = $(window).outerWidth(true);
//   var popupPosi = $(this).offset();
//   var topPosi = popupPosi.top + 25;
//       topPosi = topPosi - 90; //header height
//   var thisWidth = $(this).width();
//   var rightPosi = windowWidth - popupPosi.left - thisWidth + 7;
//   //this
//   var clickThis = $(this);
//   //return class
//   var returnClass = 'jq-popup-num';
//   //target class
//   var targetClass = thisClassGet(clickThis, returnClass);

//   var clicker = $(this).children('.jq-clickable');
//   popupMenuOn(topPosi, rightPosi, targetClass, clicker);
// });

// function popupMenuOn(topPosi, rightPosi, targetClass, clicker){
//   //show contents
//   $('.jq-popup-posi').removeClass('is-current');
//   $('.jq-popup').children(targetClass).addClass('is-current');

//   //position
//   $('.jq-popup-posi').css({
//     top:'',
//     left:'',
//     right:''
//   }).css({
//     top: topPosi,
//     right: rightPosi
//   });
//   //show popup
//   $('.jq-popup').show(300);

//   //show cartain
//   $('.jq-cartain').show();

//   //click close button
//   $('.jq-popup-close, .jq-cartain').on('click', function(){
//     $('.jq-popup').hide(300);
//     $('.jq-cartain').hide();
//   });
// };
/*========================================================================
  modal 
======================================================================== */
// $('body').on('click', '.jq-modal-open', function(){
//   //this
//   var clickThis = $(this);
//   //return class
//   var returnClass = 'jq-modal-num';
//   //target class
//   var targetClass = thisClassGet(clickThis, returnClass);

//   //show contents
//   $('.jq-modal-posi').removeClass('is-current');
//   $('.jq-modal').children(targetClass).addClass('is-current');

//   //show modal
//   $('.jq-modal').show();

//   //show cartain
//   $('.jq-cartain').show();

//   //click close button
//   $('.jq-modal-close, .jq-cartain').on('click', function(){
//     $('.jq-modal').hide();
//     $('.jq-cartain').hide();
//   });
// });
/*========================================================================
  toast 
======================================================================== */
$('body').on('click', '.jq-toast-open', function(){
  var clickThis = $(this);
  var returnClass = 'jq-toast-num';
  var targetClass = thisClassGet(clickThis, returnClass);

  //show contents
  $('.jq-toast-posi').removeClass('is-current');
  $('.jq-toast').find(targetClass).addClass('is-current');

  //show toast
  $('.jq-toast').show();

  //show cartain
  $('.jq-cartain').show().addClass('fw-bg-white fw-op05');

  //set　timer
  var timer;
  timer = setTimeout( function(){ 
    $('.jq-toast').hide(700);
    $('.jq-cartain').hide(700);
  }, 4000);

  //click cartain
  $('.jq-load-components').on('click', '.jq-cartain', function(){
    $('.jq-toast').hide(700);
    $('.jq-cartain').hide(700);
    clearTimeout(timer);　
  });
});
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
  //get id
  var id = '.' + $(this).attr('id');
  $(id).slideToggle();

  //icon
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
// $('.jq-col-on').on('click', function(){
//   var id = '.' + $(this).attr('id');
//   //contents
//   $('.jq-col-lighting').removeClass('fw-bg-green');
//   $(id).addClass('fw-bg-green');
// });
// /*========================================================================
//   view html
// ======================================================================== */
// //get id
$('.jq-text-load').on('click', function(){
  var textFile =$(this).attr('id');
  textFile = 'doc/' + textFile.replace("jq-file-", "") + '.txt';
  var title = $(this).text().trim();

  //load　text
  $.ajax({
    url:textFile,
    dataType : 'text',
    success: function(data){
      //show cartain
      $('.jq-cartain').show();

      //show title
      $('.jq-souce-title').text('').text(title);

      //show modal
      $('.jq-souce-view').text(data.replace(/\r\n/g,"\n")); //firefoxの改行を消す
      $('.jq-modal, .jq-modal-souce-viwer').slideDown(300);

      //close botton
      $('.jq-modal-close, .jq-cartain').on('click', function(){
        $('.jq-modal, .jq-modal-souce-viwer').slideUp(300);
        $('.jq-cartain').hide();
      });
    }
  });
});
/*========================================================================
  view html
======================================================================== */
$('.jq-html-show').on('click', function(){
  var clickThis = $(this);
  var returnClass = 'jq-example-num';
  var targetClass = thisClassGet(clickThis, returnClass);

  fileUrl = 'doc/' + targetClass.replace(".jq-example-num", "") + '.txt';
  var drawClass = targetClass.slice(0,18);
      drawClass = drawClass.replace(".jq-example-num", ".jq-example-tag-num");
var drawFlg = false;
  $.ajax({
    url:fileUrl,
    dataType : 'text',
    success: function(data){
      var htmlSouce = data.replace(/\r\n/g,"\n"); // trim for firefox

      $(drawClass).find('code').text('').text(htmlSouce);

      
      if( drawFlg === targetClass){
        $(drawClass).hide(300);
      }else{
        $(drawClass).show(300);
        drawFlg = targetClass;
      }
      console.log(drawFlg,targetClass)
    }
  });
});
////////////////////////////////////////////////////////////
});