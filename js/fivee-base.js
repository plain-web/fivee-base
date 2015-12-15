/*
*/

$(function (){
/*========================================================================
	placeholder
======================================================================== */
// var keys;
// var inputKeys;
// var placeholder = {
//   keys: function(self){
//     keys = self.parents('.js-ph-box').children('.js-ph');
//   },
//   inputKeys: function(self){
//     inputKeys = self.val();
//     keys = self.parents('.js-ph-box').children('.js-ph');
//   }
// }

// $('.js-ph input').on({
//   'focus': function(){
//   var self = $(this);
//   placeholder.keys(self);
//   keys.hide();
//   },
//   'blur': function(){
//     var self = $(this);
//     placeholder.inputKeys(self);
//     placeholder.keys(self);
//     if(!inputKeys){
//       keys.show();
//     }else{
//       keys.hide();
//     }
//   }
// });

// $('.js-ph-box input').each( function(){
//   var self = $(this);
//   placeholder.inputKeys(self);
//   placeholder.keys(self);
//   if(!inputKeys){
//     keys.show();
//   }else{
//     keys.hide();
//   }
// });
/*========================================================================
  scrolltop arrow
======================================================================== */
$(window).scroll(function() {
  var scPosi = $(document).scrollTop();
  var scTop = $('.js-scrolltop');
  if(scPosi > 600){
    scTop.fadeIn(600);
  }else{
    scTop.fadeOut(400);
  }
});
/*========================================================================
  scrolltop
======================================================================== */
//check remove contents
var pageTopRemove =  $('.js-pageTop-remove');
if(pageTopRemove){
  pageTopRemoveVal = pageTopRemoveHeightSum();
}else{
  pageTopRemoveVal = 0;
}
//sum remove contents
function pageTopRemoveHeightSum(){
  var pageTopRemoveHeightTotal = 0;
  var pageTopCounter = 0;
  pageTopRemove.each(function() {
    pageTopRemoveHeightTotal += $(this).outerHeight(true);
    pageTopCounter++;
  });
  return pageTopRemoveHeightTotal;
}
//scroll handler
$('a[href*=#]:not([href=#])').on('click', function(){
  if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var pageTopTarget = $(this.hash);
        pageTopTarget = pageTopTarget.length ? pageTopTarget : $('[name=' + this.hash.slice(1) +']');
    var scPosition = pageTopTarget.offset();
    if(pageTopTarget.length) {
      $('html,body').animate({
        scrollTop: scPosition.top - pageTopRemoveVal
      }, 1000);
      return false;
    }
  }
});
$('#js-pageTop').on('click', function(){
  $('html,body').animate({
    scrollTop: 0
  }, 1000);
})
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
//         if( i === 0){$('.js-load-header').html(html);}
//         if( i === 1){$('.js-load-footer').html(html);}
//         if( i === 2){$('.js-load-nav').html(html);}
//         if( i === 3){$('.js-load-components').html(html);}
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
var clickThis, returnClass, targetClass, thisClass;
function thisClassGet(clickThis, returnClass){
  //get class
  thisClass = $(clickThis).attr('class');
  //split class　
  thisClass = thisClass.split(" ");
  //return class
  thisClass = $.grep(thisClass, function(value, index) {
    return value.indexOf(returnClass) >= 0;
  });
  targetClass = '.' + thisClass;
  return targetClass;
}

/*========================================================================
  focus target
======================================================================== */
$('body').on('click', '.js-focus-on', function(){
  $('.js-focus-target').addClass('is-focus');
  //show cartain
  $('.js-cartain').show();
  //click cartain
  $('.js-cartain').on('click', function(){
    $('.js-focus-target').removeClass('is-focus');
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
// var gridTarget = $('.js-equalizer-width li'); //target
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
//   var hHeight = $('#js-Header').outerHeight();
//   var fHeight = $('#js-Footer').outerHeight();
//   var cHeight = hHeight + fHeight;
//   cHeight = wHeight - cHeight;
//   $('#js-LeftCanvas').css('height', cHeight);
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
nav
======================================================================== */
$('.js-nav a').on('click', function(){
  //parents class
  var navClass = $(this).parents('.js-nav');
  //parent click class
  var parentClass = $(this).parent('li');

  //background-color
  navClass.find('li').removeClass('is-current');
  parentClass.addClass('is-current');

  //presence class
  var hasclass = parentClass.attr('class');
  if(hasclass){
    var matchKey = hasclass.match('parent');
    if(matchKey){
      clickThis = parentClass;
      returnClass = 'js-nav-parent-num';
      targetClass = thisClassGet(clickThis, returnClass);
      targetClass = targetClass.replace('parent', 'child');
      //caret
      var webFont = parentClass.find('.js-nav-caret i').eq(0);
      var webFontClass = webFont.attr('class');
      //toggle targetClass
      var openFlg = navClass.find(targetClass).is(':visible');
      if(!openFlg){
        navClass.find(targetClass).show(500);
        //web font
        if(webFont && webFontClass){
          webFontClass = webFontClass.replace('down', 'up');
          $(webFont).removeClass().addClass(webFontClass);
        }
      }else{
        navClass.find(targetClass).hide(100);
        //web font
        if(webFont && webFontClass){
          webFontClass = webFontClass.replace('up', 'down');
          $(webFont).removeClass().addClass(webFontClass);
        }
      }
    }
  }
});
/*========================================================================
   nav current / page load
======================================================================== */
var navCurrent = $('.js-nav .is-current').parents('ul'); 
//presence class
var hasclass = navCurrent.attr('class');
if(hasclass){
  var matchKey = hasclass.match('child');
  if(matchKey){
    navCurrent.show(500);
    //caret
    var webFont = navCurrent.parents('li').find('.js-nav-caret i').eq(0);
    var webFontClass = webFont.attr('class');
    //web font
    if(webFont && webFontClass){
      webFontClass = webFontClass.replace('down', 'up');
      $(webFont).removeClass().addClass(webFontClass);
    }
  }
}
/*========================================================================
   collapse nav
======================================================================== */
// $('main').on('click', '.js-navCollapse-switcher', function(){
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
  tooltip
======================================================================== */
var toolTipFlg = 'off';
var toolTipHiretsu = [];
var toolTipTimer = false;
var tip = $('.js-tooltip');
var tipWrap = $('.js-tooltip-wrap');
var tipBody = $('.js-tooltip-posi');

//mouseover
$( ".js-tooltip-hover" ).on({
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
tip.on({
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
  if( toolTipTimer !== false ) {
    clearTimeout(toolTipTimer);
  }
  toolTipTimer = setTimeout( function(){
    var lastFlg = toolTipHiretsu[toolTipHiretsu.length-1];
    if( lastFlg === 'off'){
      tip.hide(300, function(){
        $(this).removeClass('is-show');
        tipBody.css({
          top: 0,
          left: 0
        });
      })
      toolTipHiretsu = [];
    }else{
      return false;
    }
  }, 500);
}
//show tooltip
function toolTipOn(target){
  var headerHeight = 40;
  var tipPosi = target.offset();
  var topPosi = tipPosi.top - headerHeight;
  var leftPosi = tipPosi.left;
  var keyword = target.find('.js-tooltip-key').text();
  tipWrap.text('').text(keyword);
  tip.show();
  var tipHeight = tipWrap.outerHeight(true);
  tipBody.css({
    top: topPosi - tipHeight - 7,
    left: leftPosi
  });
  tip.addClass('is-show');
};
/*========================================================================
  bookmark
======================================================================== */
var bookmartFlg = 0;
$('.js-bookmark-open').on('click', function(){
  var bookmarkIcon = $(this).children('i');
  bookmartFlg++;
  if(bookmartFlg === 1){
    bookmarkIcon.removeClass('fa-star-o').addClass('fa-star');
  }
  if(bookmartFlg === 2){
    bookmarkIcon.removeClass('fa-star').addClass('fa-star-o');

    var thisSelecter = $(this);
    returnClass = 'js-template';
    popupHandler.popupPosi(thisSelecter, returnClass);
    
    bookmartFlg = 0;
  }
});
/*========================================================================
  popup
======================================================================== */
var popupFlgCheck = $('body');
var popupFlgCount = ['off'];
var popupFlg, lastFlg;

$('.js-popup-open').on('click', function(){
  lastFlg = popupFlgCount[popupFlgCount.length-1];
  if(lastFlg === 'off'){
    var thisSelecter = $(this);
    returnClass = 'js-template';
    popupHandler.popupPosi(thisSelecter, returnClass);
  }
});
var popupHandler = {
  popupPosi: function(thisSelecter, returnClass){
    var windowWidth = $(window).outerWidth(true);
    var popupPosi = thisSelecter.position();
    var topPosi = popupPosi.top;
        topPosi = topPosi + thisSelecter.outerHeight(true) + 7 ;
    var thisWidth = thisSelecter.outerWidth(true);
    var rightPosi = windowWidth - popupPosi.left - thisWidth;
    //this
    clickThis = thisSelecter;
    //return class
    returnClass = returnClass;
    //target class
    targetClass = thisClassGet(clickThis, returnClass);

    popupHandler.popupShow(topPosi, rightPosi, targetClass);
  },
  popupShow: function(topPosi, rightPosi, targetClass){
    //show contents
    $('.js-popup > .st-body').removeClass('is-current');
    $('.js-popup ' + targetClass).addClass('is-current');

    //position
    $('.js-popup ' + targetClass).css({
      top:'',
      left:'',
      right:''
    }).css({
      top: topPosi,
      bottom: 'auto',
      right: rightPosi,
      left: 'auto'
    });
    popupShowHide();
  }
}
/*========================================================================
  popup inset
======================================================================== */
$('.js-popup-inset-open').on('click', function(){
  lastFlg = popupFlgCount[popupFlgCount.length-1];
  if(lastFlg === 'off'){
    var thisSelecter = $(this);
    returnClass = 'js-template';
    popupInsetHandler.popupPosi(thisSelecter, returnClass);
  }
});
var popupInsetHandler = {
  popupPosi: function(thisSelecter, returnClass){
    var popupPosi = thisSelecter.offset();
    var topPosi = popupPosi.top;
        topPosi = topPosi + thisSelecter.outerHeight(true);
    //this
    clickThis = thisSelecter;
    //return class
    returnClass = returnClass;
    //target class
    targetClass = thisClassGet(clickThis, returnClass);

    popupInsetHandler.popupShow(topPosi, targetClass);
  },
  popupShow: function(topPosi, targetClass){
    //show contents
    $('.js-popup > .st-body').removeClass('is-current');
    $('.js-popup ' + targetClass).addClass('is-current');

    //position
    $('.js-popup ' + targetClass).css({
      top:'',
      left:'',
      right:''
    }).css({
      top: topPosi,
      bottom: 'auto',
      right: 10,
      left: 10
    });
    popupShowHide();
  }
}
function popupShowHide(){
  //show popup
  $('.js-popup').show(100, function() {
    popupFlg = 'popupOpen';
    popupFlgCount.push(popupFlg);
  });
  //hide popup
  $('body').on('click', function(){
    lastFlg = popupFlgCount[popupFlgCount.length-1];
    if(lastFlg === 'popupOpen'){
      $('.js-popup').hide(100);
      popupFlgCount = ['off'];
      $(this).off();
    }
  });
}
/*========================================================================
  modal 
======================================================================== */
$('.js-modal-open').on('click', function(){
  //this
  clickThis = $(this);
  //return class
  returnClass = 'js-modal-num';
  //target class
  targetClass = thisClassGet(clickThis, returnClass);

  var thisModal = $('.js-modal').children(targetClass)
  var modalWidth = thisModal.outerWidth()/2;

  //show contents
  $('.js-modal-posi').removeClass('is-current');
  thisModal.addClass('is-current').css('margin-left', -modalWidth);

  //show modal
  $('.js-modal').show();

  //show cartain
  $('.js-cartain').show().addClass('is-gray');

  //click close button
  $('.js-modal-close, .js-cartain').on('click', function(){
    $('.js-modal').hide();
    $('.js-cartain').hide().addClass('is-gray');
  });
});
/*========================================================================
  toast 
======================================================================== */
$('body').on('click', '.js-toast-open', function(){
  clickThis = $(this);
  returnClass = 'js-toast-num';
  targetClass = thisClassGet(clickThis, returnClass);

  //show contents
  $('.js-toast-posi').removeClass('is-current');
  $('.js-toast').find(targetClass).addClass('is-current');

  //show toast
  $('.js-toast').show();

  //show cartain
  $('.js-cartain').show().addClass('ef-bg-white ef-op05');

  //set　timer
  var timer;
  timer = setTimeout( function(){ 
    $('.js-toast').hide(700);
    $('.js-cartain').hide(700);
  }, 4000);

  //click cartain
  $('.js-load-components').on('click', '.js-cartain', function(){
    $('.js-toast').hide(700);
    $('.js-cartain').hide(700);
    clearTimeout(timer);　
  });
});
/*========================================================================
  loader
======================================================================== */
$('.js-loader-on').on('click', function(){
  $('.js-loader').show();
});
$('.js-loader-off').on('click', function(){
  $('.js-loader').hide();
});
/*========================================================================
  collapse
======================================================================== */
$('.js-collapse').on('click', function(){
  //this
  clickThis = $(this);
  //return class
  returnClass = 'js-collapse-';
  //target class
  targetClass = thisClassGet(clickThis, returnClass);
  targetClass = targetClass.replace("js-collapse-", "js-collapse-num");
  $(targetClass).slideToggle();
  //icon
  // var point = $(targetClass).children();
  // var option = point.attr('class');

  // if( option === 'fa fa-caret-down' ){
  //   point.removeClass().addClass('fa fa-caret-up')
  // }
  // else if( option === 'fa fa-caret-up' ){
  //   point.removeClass().addClass('fa fa-caret-down')
  // }else{
  //   return false;
  // }
});
/*========================================================================
  tab
======================================================================== */
$('#js-TabSelect li a').on('click', function(){
  //tab
  $('#js-TabSelect li').removeClass('current');
  $(this).parents('li').addClass('current');
  var id = $(this).parents('li').attr('id');
  id = '#' + id.replace("js-Tab", "js-Tab-Contents");
  //contents
  $('.js-tab-switcher').removeClass('current');
  $(id).addClass('current');
});
/*========================================================================
  table hightlight
======================================================================== */
//select
$('.js-tr-select tr').on('click', function(){
  $(this).toggleClass('is-select');
});

//colgroup
// $('.js-col-on').on('click', function(){
//   var id = '.' + $(this).attr('id');
//   //contents
//   $('.js-col-lighting').removeClass('ef-bg-green');
//   $(id).addClass('ef-bg-green');
// });
/*========================================================================
   same label
======================================================================== */
//click target
// $( '.js-label-same-table td, .js-label-same-table th' ).on({
//   'mouseenter': function(){
//     //this
//     clickThis = $(this);
//     //return class
//     returnClass = 'js-same-';
//     //target class
//     targetClass = thisClassGet(clickThis, returnClass);
//     $(targetClass).addClass('is-focus');
//   },
//   'mouseleave': function(parentClass){
//     //delete class
//     $(this).parents('.js-label-same-table').find('.is-focus').removeClass('is-focus');
//   }
// });
/*========================================================================
  checkbox
======================================================================== */
$('.js-check input').on('change', function(){
  //presence class
  var hasclass = $(this).attr('class');
  if(hasclass){
    var matchKeyParent = hasclass.match('parent');
    var matchKeyChild = hasclass.match('child');
    //allcheck
    if(matchKeyParent){
      var clickThis = $(this);
      var returnClass = 'js-check-parent-num';
      var targetClass = thisClassGet(clickThis, returnClass);
      targetClass = targetClass.replace('parent', 'child');

      //check 'checked'
      var targetChecked = $(this).prop('checked');
      //on off
      if( targetChecked ){
        $(targetClass).prop("checked", true);
      }else{
        $(targetClass).prop("checked", false);
      }
      //after check
      checkedHandler.trHightLight(targetClass)
    }
    //singlecheck
    if(matchKeyChild){
      var clickThis = $(this);
      var returnClass = 'js-check-child-num';
      var targetClass = thisClassGet(clickThis, returnClass);

      //after check
      checkedHandler.trHightLight(targetClass)
    }
  }
});

//event handler
var checkedHandler = {
  trHightLight: function(targetClass){
    $('input'+ targetClass).parents('tr').removeClass('is-highlight');
    $('input'+ targetClass + ':checked').parents('tr').addClass('is-highlight');
  }

  
}
/*========================================================================
  view html
======================================================================== */
var drawFlg = [];
var drawClassFlg = [];

$('.js-html-show').on('click', function(){
  //return targetClass
  clickThis = $(this);
  returnClass = 'js-example-num';
  targetClass = thisClassGet(clickThis, returnClass);
  //filepath
  var fileUrl = '../doc/' + targetClass.replace(".js-example-num", "") + '.txt';
  //draw html
  var drawClass = targetClass.slice(0,23).replace(".js-example-num", ".js-example-tag-num");
  //check array
  var checkValue = $.inArray(targetClass, drawFlg);
  //check last array
  var lastValue = drawFlg[drawFlg.length-1];
  //check last array
  var lastDrawClassValue = drawClassFlg[drawClassFlg.length-1];
  
  $.ajax({
    url:fileUrl,
    dataType : 'text',
    success: function(data){
      //　button toggle/////////////////////////////////////////////////////////
      var htmlSouce = data.replace(/\r\n/g,"\n"); // trim for firefox

      if( checkValue === -1){ //check same value
        $(drawClass + ' textarea').text('').text(htmlSouce);
        $(drawClass).show(300);
        drawFlg = [];　
        drawFlg.push(targetClass);
      }else if( targetClass !== lastValue){　//　check targClass and value
        $(drawClass + ' textarea').text('').text(htmlSouce);
        drawFlg.push(targetClass);
      }else{
        $(drawClass).hide(300);
        drawFlg = [];
      }
      //draw area /////////////////////////////////////////////////////////
      if( drawClass !== lastDrawClassValue){　//　check targClass and value
        $(lastDrawClassValue).hide(300);
        drawClassFlg = [];
        drawClassFlg.push(drawClass);
      }
    }
  });
});
/*========================================================================
  mediaquery aside
======================================================================== */
var asideFlg = 0;
$('.js-aside-open').on('click', function(){
  asideFlg++;
  if(asideFlg === 1){
    $('.js-aside').addClass('transition').delay(500).addClass('is-open');
    //click body
    $('main:not(.js-aside)').on('click', function(){
      $('.js-aside').removeClass('is-open').delay(1000).queue(function() {
        $(this).removeClass('transition').dequeue();
      });
      asideFlg = 0;
      $(this).off();
    })
  }
  if(asideFlg === 2){
    $('.js-aside').removeClass('is-open').delay(1000).queue(function() {
      $(this).removeClass('transition').dequeue();
    });
    asideFlg = 0;
  }
});
/*========================================================================
  mediaquery slide nav
======================================================================== */
var slideNavFlg = 0;
$('.js-slide-nav-open').on('click', function(){
  slideNavFlg++;
  if(slideNavFlg === 1){
    $('.js-slide-nav').addClass('transition').delay(500).addClass('is-open');
    //click body
    $('main:not(.js-slide-nav)').on('click', function(){
      $('.js-slide-nav').removeClass('is-open').delay(1000).queue(function() {
        $(this).removeClass('transition').dequeue();
      });
      slideNavFlg = 0;
      $(this).off();
    })
  }
  if(slideNavFlg === 2){
    $('.js-slide-nav').removeClass('is-open').delay(1000).queue(function() {
      $(this).removeClass('transition').dequeue();
    });
    slideNavFlg = 0;
  }
});
////////////////////////////////////////////////////////////
});