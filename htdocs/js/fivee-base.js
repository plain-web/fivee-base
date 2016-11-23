/*! ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 *
 * Fivee-base
 * ver.2.0.0 / 2016.11.23
 * http://plain-web.com/fivee-base/apps/
 * Released under MIT license. Copyright 2016 Yusuke Maruyama.
 *
 * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ !*/

(function($){
/*========================================================================
  [common]fixed contents remove
======================================================================== */
//check remove contents
var pageTopRemove =  $('.js-posi-remove');
if(pageTopRemove.length){
  fixContentsRemoveVal = pageTopRemoveHeightSum();
}else{
  fixContentsRemoveVal = 0;
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
/*========================================================================
  [common] return targetClass
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
  [common]get os
======================================================================== */
var getOs;
function osSearch(getOs){
  var ua = navigator.userAgent.toLowerCase();
  var isiPhone = (ua.indexOf('iphone') > -1);
  var isiPad = (ua.indexOf('ipad') > -1);
  var isAndroid = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1);
  var isAndroidTablet = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1);

  if(isiPhone){getOs = 'iphone';}
  if(isiPad){getOs = 'ipad';}
  if(isAndroid){getOs = 'android';}
  if(isAndroidTablet){getOs = 'androidTablet';}
  return getOs;
}
/*========================================================================
  [common] input text chacker
======================================================================== */
function inputChecker(targetTxt) {
 if (targetTxt.match(/[^A-Za-z0-9]+/)) { //only en
  return false;
 }
 return true;
}
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
//scroll handler
$('a[href*=#]:not([href=#])').on('click', function(){
  if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var pageTopTarget = $(this.hash);
        pageTopTarget = pageTopTarget.length ? pageTopTarget : $('[name=' + this.hash.slice(1) +']');
    var scPosition = pageTopTarget.offset();
    if(pageTopTarget.length) {
      $('html,body').animate({
        scrollTop: scPosition.top - fixContentsRemoveVal
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
  equalizer
======================================================================== */
var equalizerHere = $('#js-eql');
if(equalizerHere.length){
  var eqlWidthTarget = $('.js-eql-width'); //target
  var eqlHeightTarget = $('.js-eql-height'); //target
  //width
  if(eqlWidthTarget.length){
    var eqlWidthHiretsu = []; 
    if(eqlWidthTarget){
      $(eqlWidthTarget).each(function(i) {
        var targetWidth = $(eqlWidthTarget).eq(i).outerWidth(true); //get width
        eqlWidthHiretsu.push(targetWidth);
      });
      var maxWidth =  Math.max.apply(null, eqlWidthHiretsu); //max
      $(eqlWidthTarget).width(maxWidth); 
    }
  }
  //height
  if(eqlHeightTarget.length){
    var eqlHeightHiretsu = []; 
    if(eqlHeightTarget){
      $(eqlHeightTarget).each(function(i) {
        var targetHeight = $(eqlHeightTarget).eq(i).outerHeight(true); //get width
        eqlHeightHiretsu.push(targetHeight);
      });
      var maxWidth =  Math.max.apply(null, eqlHeightHiretsu); //max
      $(eqlHeightTarget).height(maxWidth); 
    }
  }
}
/*========================================================================
 nav
======================================================================== */
$('.js-nav-main a').on('click', function(){
  //parents class
  var navClass = $(this).parents('.js-nav-main');
  //parent click class
  var parentClass = $(this).parent('li');

  //presence class
  var hasclass = parentClass.attr('class');
  if(hasclass){
    var matchKey = hasclass.match('parent');

    if(matchKey){
      clickThis = parentClass;
      returnClass = 'js-nav-main-parent';
      targetClass = thisClassGet(clickThis, returnClass);
      targetClass = targetClass.replace('parent', 'child');
      //icon
      var iconArrow = $(this).find('.js-ic-arrow').children();
      var iconFolder = $(this).find('.js-ic-folder').children();
      var iconFolderArrow = $(this).find('.js-ic-folder-arrow').children();

      var iconArrowClass = iconArrow.attr('class');
      var iconFolderClass  = iconFolder.attr('class');
      var iconFolderArrowClass  = iconFolderArrow.attr('class');

      //toggle targetClass
      var openFlg = navClass.find(targetClass).is(':visible');
      if(!openFlg){
        navClass.find(targetClass).show(300);
        parentClass.addClass('is-open');
        //icon
        if(iconArrowClass){
          iconArrowClass = iconArrowClass.replace('down', 'up');
          $(iconArrow).removeClass().addClass(iconArrowClass);
        }
        if(iconFolderClass){
          iconFolderClass = iconFolderClass.replace('folder', 'folder-open');
          $(iconFolder).removeClass().addClass(iconFolderClass);
        }
        if(iconFolderArrowClass){
          iconFolderArrowClass = iconFolderArrowClass.replace('right', 'down');
          $(iconFolderArrow).removeClass().addClass(iconFolderArrowClass);
        }
      }else{
        navClass.find(targetClass).hide(100);
        parentClass.removeClass('is-open');
        //icon
        if(iconArrowClass){
          iconArrowClass = iconArrowClass.replace('up', 'down');
          $(iconArrow).removeClass().addClass(iconArrowClass);
        }
        if(iconFolderClass){
          iconFolderClass = iconFolderClass.replace('folder-open', 'folder');
          $(iconFolder).removeClass().addClass(iconFolderClass);
        }
        if(iconFolderArrowClass){
          iconFolderArrowClass = iconFolderArrowClass.replace('down', 'right');
          $(iconFolderArrow).removeClass().addClass(iconFolderArrowClass);
        }
      }
    }
  }else{
    //background-color
    navClass.find('li').removeClass('is-current');
    parentClass.addClass('is-current');      
  }
});
/*========================================================================
   nav current / page load
======================================================================== */
var navMain = $('.js-nav-main');
if(navMain.length){
  var navCurrent = $('.js-nav-main .is-current').parents('ul'); 
  navCurrent.parent('li').addClass('is-open'); 
  //presence class
  var hasclass = navCurrent.attr('class');
  if(hasclass){
    var matchKey = hasclass.match('child');
    if(matchKey){
      navCurrent.show(100);
      var pageLoadIconParent = navCurrent.parents('li');
      //icon
      var iconArrow = pageLoadIconParent.find('.js-ic-arrow').children();
      var iconFolder = pageLoadIconParent.find('.js-ic-folder').children();
      var iconFolderArrow = pageLoadIconParent.find('.js-ic-folder-arrow').children();

      var iconArrowClass = iconArrow.attr('class');
      var iconFolderClass  = iconFolder.attr('class');
      var iconFolderArrowClass  = iconFolderArrow.attr('class');

      if(iconArrowClass){
        iconArrowClass = iconArrowClass.replace('down', 'up');
        $(iconArrow).removeClass().addClass(iconArrowClass);
      }
      if(iconFolderClass){
        iconFolderClass = iconFolderClass.replace('folder', 'folder-open');
        $(iconFolder).removeClass().addClass(iconFolderClass);
      }
      if(iconFolderArrowClass){
        iconFolderArrowClass = iconFolderArrowClass.replace('right', 'down');
        $(iconFolderArrow).removeClass().addClass(iconFolderArrowClass);
      }
    }
  }
}
/*========================================================================
  tooltip
======================================================================== */
var toolTipFlg = 'off';
var toolTipHiretsu = [];
var toolTipTimer = false;
var tip = $('.js-tooltip');
var tipWrap = $('.js-tooltip-wrap');
var tipBody = $('.js-tooltip > .st-body');
var balloonBody = $('.js-balloon');
var tipTrigger = '.js-tooltip-hover';
var tipCloseSpeed = 300;
var tipCloseTimer = 500;
var target,checkStates;
//search os
getOs = osSearch(getOs);
if(getOs === 'iphone' || getOs === 'ipad'){
  //mouseover
  $(tipTrigger).on('click', function(){
    checkStates = $(this).hasClass('is-on');
    if(!checkStates){
      target = $(this);
      toolTipOn(target);

      toolTipFlg = 'on';
      toolTipQuickOff(toolTipFlg);
      $(tipTrigger).removeClass('is-on');
      $(this).addClass('is-on');
    }else{
      toolTipFlg = 'off';
      toolTipQuickOff(toolTipFlg);
      $(tipTrigger).removeClass('is-on');
    }
  });
}else{
  //mouseover
  $( ".js-tooltip-hover" ).on({
    'mouseenter': function(){
      target = $(this);
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
}
//hide tooltip
function toolTipQuickOff(toolTipFlg){
  toolTipHiretsu.push(toolTipFlg);
  if( toolTipTimer !== false ) {
    clearTimeout(toolTipTimer);
  }
  toolTipTimer = setTimeout( function(){
    var lastFlg = toolTipHiretsu[toolTipHiretsu.length-1];
    if( lastFlg === 'off'){
      tip.hide(tipCloseSpeed, function(){
        $(this).removeClass('is-show');
        tipBody.css({
          top: 0,
          left: 0,
          marginTop:''
        });
      })
      toolTipHiretsu = [];
    }else{
      return false;
    }
  }, 0);
}
//hide tooltip
function toolTipOff(toolTipFlg){
  toolTipHiretsu.push(toolTipFlg);
  if( toolTipTimer !== false ) {
    clearTimeout(toolTipTimer);
  }
  toolTipTimer = setTimeout( function(){
    var lastFlg = toolTipHiretsu[toolTipHiretsu.length-1];
    if( lastFlg === 'off'){
      tip.hide(tipCloseSpeed, function(){
        $(this).removeClass('is-show');
        tipBody.css({
          top: 0,
          left: 0,
          marginTop:''
        });
      })
      toolTipHiretsu = [];
    }else{
      return false;
    }
  }, tipCloseTimer);
}
//show tooltip
function toolTipOn(target){
  var tipPosi = target.offset();
  var wWidth = $(window).outerWidth(true);
  var topPosi = tipPosi.top;
  var leftPosi = tipPosi.left;
  var keyword = target.find('.js-tooltip-key').text();
  tipWrap.text('').text(keyword);
  tip.show();
  var tipWidth = tipWrap.outerWidth(true);
  var tipHeight = tipWrap.outerHeight(true);
  var overPosi = tipWidth + leftPosi;
  var diffPosi = overPosi - wWidth;
  balloonBody.css('margin-left', '');
  //right position
  if(wWidth < overPosi){
    leftPosi = leftPosi - diffPosi;
    balloonBody.css('margin-left', diffPosi);
  }
  tipBody.css({
    top: topPosi - tipHeight - 7,
    left: leftPosi,
    // marginTop:-fixContentsRemoveVal + 'px'
  });
  tip.addClass('is-show');
};
/*========================================================================
  popup
======================================================================== */
var popupClickCnt = 0;
var popupTrigger = '.js-popup-open';
var popupCloseTrigger = '.js-popup-close';
var popupCloseTouch = 'body > *';
var popupTriggerRemove = '.js-popup-open, .js-popup, .js-bookmark-open';
var popupWrap = '.js-popup';
var popupArrow = '.js-popup-arrow';
var popupActive = 'is-on';
var popupPosiFIx = 'is-fixed';
var popupShowSpeed = 0;
var popupLowMargin = 7;
var popupArrowEdgeLimit = 20;
var thisSelector, windowWidth, popupPosi, topPosi, triggerWidth,leftPosi;
var popupLeftDiff, popupArrowPosi, popupWidth, totalLeftPosi, positionType;

$(popupTrigger).on('click', function(){
  thisSelector = $(this);
  if(thisSelector.hasClass(popupActive)){
    $(popupWrap).hide( function(){
      $(popupTrigger + '.' + popupActive).removeClass(popupActive);
    });
  }else{
    $(popupTrigger + '.' + popupActive).removeClass(popupActive);
    thisSelector.addClass(popupActive);
    returnClass = 'js-tpl';
    positionType = thisSelector.hasClass(popupPosiFIx);
    popupHandler.popupPosi(thisSelector, returnClass);
  }
});
var popupHandler = {
  popupPosi: function(thisSelector, returnClass){
    windowWidth = $(window).outerWidth(true);
    popupPosi = thisSelector.offset();
    topPosi = popupPosi.top;
    topPosi = topPosi + thisSelector.outerHeight(true) + 7 ;
    triggerWidth = thisSelector.outerWidth(true);
    leftPosi = popupPosi.left;
    //this
    clickThis = thisSelector;
    //return class
    returnClass = returnClass;
    //target class
    targetClass = thisClassGet(clickThis, returnClass);

    popupHandler.popupShow(topPosi, leftPosi, targetClass);
  },
  popupShow: function(topPosi, leftPosi, targetClass){
    //show contents
    $(popupWrap + ' > .st-body').removeClass('is-current');
    $(popupWrap + ' > .st-body' + targetClass).addClass('is-current');

    $(popupWrap).css({
      opacity: '0',
      display: 'block'
    });

    popupWidth = $(popupWrap + ' > .st-body' + targetClass).outerWidth(true);
    totalLeftPosi = leftPosi + popupWidth;
    popupArrowPosi = triggerWidth / 2;

    //trigger width > popupWidth
    if( triggerWidth > popupWidth){
      popupArrowPosi = popupArrowEdgeLimit;
    }
    //overflow right
    if(windowWidth <= totalLeftPosi){
      popupLeftDiff = totalLeftPosi - windowWidth + popupLowMargin;
      leftPosi = leftPosi - popupLeftDiff;
      popupArrowPosi = popupArrowPosi + popupLeftDiff;
    }
    //overflow left
    if( leftPosi < popupLowMargin){
      leftPosi = popupLowMargin
    }
    //limit arrow posi
    if( popupArrowPosi < popupArrowEdgeLimit){
      popupArrowPosi = popupArrowEdgeLimit;
    }

    if(positionType){
      topPosi = topPosi - $(window).scrollTop();
      leftPosi = leftPosi + $(window).scrollLeft();
      //position
      $(popupWrap + ' > .st-body' + targetClass).css({
        position:'',
        top:' ',
        left:'',
        right:'',
        marginTop:''
      }).css({
        position:'fixed',
        top: topPosi,
        bottom: 'auto',
        right: 'auto',
        left: leftPosi
      }).addClass(popupPosiFIx);
    }else{
      //position
      $(popupWrap + ' > .st-body' + targetClass).css({
        position:'',
        top:'',
        left:'',
        right:'',
        marginTop:''
      }).css({
        top: topPosi,
        bottom: 'auto',
        right: 'auto',
        left: leftPosi,
      }).removeClass(popupPosiFIx);
    }
    //arrow
    $(popupArrow).css('left', '').css('left', popupArrowPosi);

    //show popup
    $(popupWrap).fadeTo(popupShowSpeed, 1, function(){
      popupClickCnt++;
      if(popupClickCnt === 1){
        //find out 'js-popup-open'
        $(popupCloseTouch).on('click', function(e){
          var findOutTrigger = $(e.target).closest(popupTriggerRemove).length;
          // popupClickCnt++;
          if( !findOutTrigger ){
            $(popupWrap).hide();
            $(popupTrigger + '.' + popupActive).removeClass(popupActive);
            popupClickCnt = 0;
            $(this).off();
          }
          // return false;
        });
      }
    });
  }
}
//close popup
$(popupCloseTrigger).on('click', function(){
  $(popupWrap).hide( function(){
    $(popupTrigger + '.' + popupActive).removeClass(popupActive);
  });
});
/*========================================================================
  bookmark
======================================================================== */
var bookmarkOpen = $('.js-bookmark-open')
var bookmarkDelete = $('.js-bookmark-delete')
var bookmarkIcon, thisSelector;
bookmarkOpen.on('click', function(){
  bookmarkIcon = $(this).children('i');
  thisSelector = $(this);
  if(thisSelector.hasClass(popupActive)){
    returnClass = 'js-tpl';
    popupHandler.popupPosi(thisSelector, returnClass);
  }
  bookmarkIcon.removeClass('fa-star-o').addClass('fa-star');
  thisSelector.addClass(popupActive);
  bookmarkDelete.on('click', function(){
    bookmarkIcon.removeClass('fa-star').addClass('fa-star-o');
    thisSelector.removeClass(popupActive);
  });
});
/*========================================================================
  modal 
======================================================================== */
$('.js-modal-open').on('click', function(){
  //this
  clickThis = $(this);
  //return class
  returnClass = 'js-tpl';
  //target class
  targetClass = thisClassGet(clickThis, returnClass);

  var modalClass = $('.js-modal');
  var modalTargetClass = $('.js-modal > .st-body' + targetClass);

  //show contents
  $('.js-modal > .st-body').removeClass('is-current').css('margin-left', '');
  modalTargetClass.addClass('is-current');

  var modalWidth = modalTargetClass.outerWidth()/2;

  //show modal
  modalTargetClass.css('margin-left', -modalWidth);
  modalClass.show();

  //show cartain
  $('.js-cartain').show();

  //click close button
  $('.js-modal-close, .js-cartain').on('click', function(){
    modalClass.hide();
    $('.js-cartain').hide();
  });
});
/*========================================================================
  message
======================================================================== */
$('.js-message-open').on('click', function(){
  clickThis = $(this);
  returnClass = 'js-tpl';
  targetClass = thisClassGet(clickThis, returnClass);

  $('.js-message > .st-body').removeClass('is-open');
  $('.js-message > .st-body' + targetClass).addClass('is-open');
});

$('.js-message-close').on('click', function(){
  $('.js-message > .st-body').removeClass('is-open');
});
/*========================================================================
  toast 
======================================================================== */
var toastWrap = '.js-toast';
var toastTrigger = '.js-toast-open';
var toastCenteredWrap = '.js-toast-centered';
var toastCenteredTrigger = '.js-toast-centered-open';
var speedFadeout = 700;
var speedTimer = 4000;
var toastTImer;

$(toastTrigger).on('click', function(){
  clickThis = $(this);
  returnClass = 'js-tpl';
  targetClass = thisClassGet(clickThis, returnClass);

  clearTimeout(toastTImer);
  $( toastWrap + ' > .st-body').hide();
  var targetWidth = $( toastWrap + ' > .st-body' + targetClass).css('margin-left', '').show().outerWidth(true)/2;
  $( toastWrap + ' > .st-body' + targetClass).css('margin-left', -targetWidth);
 
  //set　timer
  toastTImer = setTimeout( function(){ 
    $( toastWrap + ' > .st-body' + targetClass).fadeOut(speedFadeout);
  }, speedTimer);

  $('.js-toast-close').on('click', function(){
    $( toastWrap + ' > .st-body' + targetClass).hide();
    clearTimeout(toastTImer);　
  });
});

// centered
$(toastCenteredTrigger).on('click', function(){
  clickThis = $(this);
  returnClass = 'js-tpl';
  targetClass = thisClassGet(clickThis, returnClass);

  clearTimeout(toastTImer);
  $( toastCenteredWrap + ' > .st-body').hide();
  var targetHeight = $( toastCenteredWrap + ' > .st-body' + targetClass).css('margin-top', '').show().outerHeight()/2;
  $( toastCenteredWrap + ' > .st-body' + targetClass).css('margin-top', -targetHeight);
  $('.js-cartain').show();
 
  //set　timer
  toastTImer = setTimeout( function(){ 
    $( toastCenteredWrap + ' > .st-body' + targetClass).fadeOut(speedFadeout);
    $('.js-cartain').fadeOut(speedFadeout);
  }, speedTimer);

  $('.js-toast-close, .js-cartain').on('click', function(){
    $( toastCenteredWrap + ' > .st-body' + targetClass).hide();
    $('.js-cartain').fadeOut(speedFadeout);
    clearTimeout(toastTImer);　
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
  loader absolute
======================================================================== */
$('.js-loader-abs-on').on('click', function(){
  var thisPosi = $(this).offset();
  var thisPosiTop = thisPosi.top;
  var thisPosiLeft = thisPosi.left;
  $('.js-loader-abs > .st-body').css({
    top:'',
    left:''
  }).css({
    top: thisPosiTop,
    left: thisPosiLeft
  });
  $('.js-loader-abs').show();
});
$('.js-loader-abs-off').on('click', function(){
  $('.js-loader-abs').hide();
});
/*========================================================================
  collapse
======================================================================== */
$('.js-collapse').on('click', function(){
  clickThis = $(this);
  returnClass = 'js-collapse-parent';
  targetClass = thisClassGet(clickThis, returnClass);
  targetClass = targetClass.replace("js-collapse-parent", "js-collapse-child");
  $(targetClass).slideToggle();
  //icon
  var point = $(this).children();
  var option = point.attr('class');

  if( option.match('down') ){
    option = option.replace('down', 'up');
    point.removeClass().addClass(option)
  }
  else if( option.match('up') ){
    option = option.replace('up', 'down');
    point.removeClass().addClass(option)
  }else{
    return false;
  }
});
/*========================================================================
   collapse slide
======================================================================== */
$('.js-collapse-slide').on('click', function(){
  clickThis = $(this);
  returnClass = 'js-collapse-slide-parent';
  targetClass = thisClassGet(clickThis, returnClass);
  targetClass = targetClass.replace("js-collapse-slide-parent", "js-collapse-slide-child");

  $(targetClass).stop().animate({width: 'toggle'}, 300);

  //icon
  var point = $(this).children();
  var option = point.attr('class');

  if( option.match('left') ){
    option = option.replace('left', 'right');
    point.removeClass().addClass(option)
  }
  else if( option.match('right') ){
    option = option.replace('right', 'left');
    point.removeClass().addClass(option)
  }else{
    return false;
  }
});
/*========================================================================
  tab / open
======================================================================== */
$('.js-tab-select > li').on('click', function(){
  var parentTab = $(this).parents('.js-tab');
  var childTab = $(parentTab).find('.js-tab-select').children('li');
  var childContent = $(parentTab).find('.js-tab-content').children('li');
  //tab
  childTab.removeClass('is-current');
  $(this).addClass('is-current');
  var listNum = $(this).index();
  //content
  childContent.removeClass('is-current');
  childContent.eq(listNum).addClass('is-current');
});
/*========================================================================
  tab scroll / open
======================================================================== */
$('.js-tab-scroll-select > li').on('click', function(){
  var parentTab = $(this).parents('.js-tab-scroll');
  var childTab = $(parentTab).find('.js-tab-scroll-select').children('li');
  var childContent = $(parentTab).find('.js-tab-scroll-content').children('li');
  //tab
  childTab.removeClass('is-current');
  $(this).addClass('is-current');
  var listNum = $(this).index();
  //content
  childContent.removeClass('is-current');
  childContent.eq(listNum).addClass('is-current');
});
/*========================================================================
  tab scroll handler
======================================================================== */
var tabWrap = $('.js-tab-scroll');
var tabFirstContact = tabWrap.length;
var tabSelect = $('.js-tab-scroll-select');
var tabMoveView = $('.js-tab-scroll-select > li:visible');
var tabDisable = 'is-disabled';
var tabScrollLeft = $('.js-tab-arrow-right');
var tabArrowLeft = $('.js-tab-arrow-right');
var tabScrollRight = $('.js-tab-arrow-left');
var tabArrowRight = $('.js-tab-arrow-left');
var tabMoveValue = 400;//move value
var tabArrowWidth = 74;//arrow tab width
var tabResetFlg = false;
var clickTabLeftFlg = false;
var clickTabRightFlg = false;

//scroll handler
var tabScrollHandler = {
  tabSetStart: function(){
    var tabWidth = tabWrap.outerWidth(true);//tab area width
    var activeArea = tabWidth - tabArrowWidth;
    tabSelect.width(tabScrollHandler.tabWidthSum());
    var totalTabWidth = tabScrollHandler.tabWidthSum();
    if(activeArea < totalTabWidth){
      movePossible = totalTabWidth - activeArea;
      tabArrowLeft.removeClass(tabDisable);
      return movePossible;
    }else{
      tabArrowLeft.addClass(tabDisable);
      tabArrowRight.addClass(tabDisable);
      movePossible = 0;
      return movePossible;
    }
  },
  tabSetReset: function(){
    tabSelect.animate({
      left: 0
    }, 0,
      function() {
        movePossible = tabScrollHandler.tabSetStart();
        tabResetFlg = true;
        tabArrowRight.addClass(tabDisable);
      }
    );
  },
  tabWidthSum: function(){
    var tabLength = tabMoveView.length;
    var totalTabWidth = 0;
    var tabCounter = 0;
    tabMoveView.each(function() {
      totalTabWidth += $(this).outerWidth(true);
      tabCounter++;
      if(tabCounter === tabLength){
        totalTabWidth = totalTabWidth + 7;
      }
    });
    return totalTabWidth;
  }
}
/*========================================================================
  tab scroll / window resize
======================================================================== */
if(tabFirstContact){
  var movePossible = tabScrollHandler.tabSetStart();
  var resizeTimer = false;
  $(window).resize(function() {
    if (!resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function() {
      tabScrollHandler.tabSetReset();
    }, 40);
  });
  tabScrollLeft.on('click', function(){
    if(!clickTabLeftFlg){
      clickTabLeftFlg = true;

      var movePossibleLeft = -movePossible; 
      var currentPosiLeft = tabSelect.position();
          currentPosiLeft = currentPosiLeft.left;
      if(currentPosiLeft === movePossibleLeft){
        clickTabLeftFlg = false;
        return false;
      }
      tabArrowRight.removeClass(tabDisable);
      currentPosiLeft -= tabMoveValue;
      if(tabResetFlg === true){
        currentPosiLeft = -tabMoveValue;
        tabResetFlg = false;
      }
      if( currentPosiLeft < movePossibleLeft){
        moveDiff = currentPosiLeft - movePossibleLeft;
        currentPosiLeft = currentPosiLeft - moveDiff;
      }
      tabSelect.animate({
        left: currentPosiLeft
      }, 400,
        function() {
          clickTabLeftFlg = false;
          if(currentPosiLeft === movePossibleLeft){
            tabArrowLeft.addClass(tabDisable);
          }
        }
      );
    }else{
      return false;
    }
  });
  tabScrollRight.on('click', function(){
    if(!clickTabRightFlg){
      clickTabRightFlg = true;
      var movePossibleRight = 0;
      var currentPosiLeft = tabSelect.position();
          currentPosiLeft = currentPosiLeft.left;
      if(currentPosiLeft === movePossibleRight){
        clickTabRightFlg = false;
        return false;
      }
      tabArrowLeft.removeClass(tabDisable);
      currentPosiLeft += tabMoveValue;
      if(tabResetFlg === true){
        currentPosiLeft = tabMoveValue;
        tabResetFlg = false;
      }
      if( currentPosiLeft > movePossibleRight){
        moveDiff = currentPosiLeft - movePossibleRight;
        currentPosiLeft = currentPosiLeft - moveDiff;
      }
      tabSelect.animate({
        left: currentPosiLeft
      }, 400,
        function() {
          clickTabRightFlg = false;
          if(currentPosiLeft === movePossibleRight){
            tabArrowRight.addClass(tabDisable);
          }
        }
      );
    }else{
      return false;
    }
  });
}
/*========================================================================
  table hightlight
======================================================================== */
//select
$('.js-select-tr tr').on('click', function(){
  $(this).toggleClass('is-select');
});
  
//colgroup focus
$('.js-col a').on('click', function(){
  var parentClass = $(this).parents('li').index();
  //contents
  $('.js-col-on colgroup col').removeClass('is-focus');
  $('.js-col-on colgroup col').eq(parentClass).addClass('is-focus');
});
/*========================================================================
   same label
======================================================================== */
$( '.js-sameclass td, .js-sameclass th' ).on({
  'mouseenter': function(){
    var matchKey = 'js-sameclass-num';
    var hoverThis = $(this).attr('class');
    if(hoverThis){
      if(hoverThis.match(matchKey)){
        clickThis = $(this);
        returnClass = matchKey;
        thisClassGet(clickThis, returnClass);
        $(targetClass).addClass('is-focus');
      }
    }
  },
  'mouseleave': function(){
    //delete class
    $(this).parents('.js-sameclass').find('.is-focus').removeClass('is-focus');
  }
});
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
      checkedHandler.trHightLight(targetClass);
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
  nav block
======================================================================== */
$('.js-nav-block a').on('click', function(){
  //parents class
  var navClass = $(this).parents('.js-nav-block');
  clickThis = navClass;
  returnClass = 'js-nav-block-select';
  var targetSection = thisClassGet(clickThis, returnClass);
  targetSection = targetSection.replace('select', 'content');

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
      returnClass = 'js-nav-block-parent';
      targetClass = thisClassGet(clickThis, returnClass);
      targetClass = targetClass.replace('parent', 'child');
      //toggle targetClass
      $(targetSection).find('ul:eq(0)').children('li').hide();
      $(targetSection).find(targetClass).fadeToggle();
    }
  }
});
/*========================================================================
  pagination
======================================================================== */
var pagenation = '.js-pagination';
var pagenationList = pagenation + ' li';
var notouchClass, parentList, listNum, pagenationGroup;
$(pagenationList + ' a').on('click', function(){
  clickThis = $(this).parents(pagenation);
  returnClass = 'js-grp';
  targetClass = thisClassGet(clickThis, returnClass);
  pagenationGroup = targetClass;

  notouchClass = $(this).parents('li').hasClass('js-notouch');

  if(!notouchClass){
    $(pagenationGroup + pagenationList).removeClass('is-current');
    parentList = $(this).parent('li');
    listNum = parentList.index();
    $(pagenation + pagenationGroup).each(function(){
      $(this).find('li').eq(listNum).addClass('is-current');
    });
  }
});
/*========================================================================
  promotion bottom
======================================================================== */
var promoFooter = $("#js-promo-footer");
if(promoFooter.length){
  var scollSpeed = 300; //scroll speed
  var promoWrap = $("#js-promo-footer > .st-body");
  var pageFooterPosi = $(".js-page-footer");
  var bottomPosition,footerOffset,bottomLimit,docHeight,winHeight,noWheight,resizeTimer,bottomLimit;
  //footer
  function footerPosi(){
    footerOffset = pageFooterPosi.offset();
    bottomLimit = $(document).outerHeight() - footerOffset.top;
    return bottomLimit;
  }
  //initial
  function initialPosi(){
    docHeight = $(document).outerHeight();
    winHeight = window.innerHeight;
    noWheight = docHeight - winHeight;
    bottomPosition =  noWheight - $(window).scrollTop();
    if(pageFooterPosi.length){
      bottomLimit = footerPosi();
      drowPromoPosiFooter()
    }else{
      drowPromoPosi();
    }
  }
  //resize
  resizeTimer = false;
  $(window).resize(function() {
    if (!resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function() {
      initialPosi();
    }, 40);
  });
  //footer search
  if(pageFooterPosi.length){
    $(window).scroll(function() {
      bottomLimit = footerPosi();
      drowPromoPosiFooter();
    });
  }else{
    $(window).scroll(function() {
      drowPromoPosi();
    });
  }
  //footer
  function drowPromoPosiFooter(){
    bottomPosition =  noWheight - $(window).scrollTop();
    if(bottomLimit >= bottomPosition){
      bottomPosition = bottomLimit;
    }
    promoWrap.stop().animate({
      bottom: bottomPosition
    },scollSpeed );
  }
  //no footer
  function drowPromoPosi(){
    bottomPosition =  noWheight - $(window).scrollTop();
    promoWrap.stop().animate({
      bottom: bottomPosition
    },scollSpeed );
  }
  initialPosi();
}
/*========================================================================
  remover UL / DL / TR
======================================================================== */
var removerTrigger = $('.js-remover-tri');
var removerClass = '.js-remover';
var removeSpeed = 400;
var thisParent, removerTarget, removerTargetWidth;

removerTrigger.on('click', function(){
  thisParent = $(this).parents(removerClass);
  //get tagname '.js-remover'
  parentNameUl = thisParent.get(0).tagName;
  // ul
  if(parentNameUl === 'UL'){
    removerTarget = $(this).parents('li');
    removerTarget.addClass('is-remove');
    thisParent.find('.is-remove').hide(removeSpeed);
  }
});
/*========================================================================
  number counter
======================================================================== */
var numCounter = $('.js-numCounter');
if(numCounter.length){
  var numCounterStart = 0;
  var numCounterSpeed = 2000;
  numCounterRun();
}
function numCounterRun(){
  numCounter.each(function(){
    var numCounterEnd = $(this).text();
    if( numCounterStart < numCounterEnd){
      $(this).animate({count: numCounterEnd}, {
        duration: numCounterSpeed,
        easing: 'linear',
        progress: function() { 
          $(this).text(Math.ceil(this.count)); 
        },
        queue: false
      });
    }
  });
}
/*========================================================================
  state current
======================================================================== */
var stateCurrentWrap = $('.js-state-current');
var stateCurrent = '.js-state-current';
var isCurrentTrigger = $(stateCurrent + ' a');
var isCurrent = 'is-current';
var thisParent;
if(stateCurrentWrap.length){
  $(isCurrentTrigger).on('click', function(){
    thisParent = $(this).parents(stateCurrent);
    thisParentList = $(this).parent('li');
    thisParent.find('.' + isCurrent).removeClass(isCurrent);

    if(thisParentList.length){
      thisParentList.addClass(isCurrent);
    }else{
      $(this).addClass(isCurrent);
    }
  })
}
/*========================================================================
  ellipsis text size
======================================================================== */
var ellipsis = $('#js-ellipsis');
var ellipsisWrap = $('.js-ellipsis');
var afterTxt = '…';
var textLimit,targetTxt,textLength,matchChaset;

if(ellipsis.length){
  $(ellipsisWrap).each(function(){
    //return targetClass
    clickThis = $(this);
    returnClass = 'js-limit-txt';
    targetClass = thisClassGet(clickThis, returnClass);
    targetClass = targetClass.replace('.js-limit-txt', '');
    
    textLimit = parseInt(targetClass);
    targetTxt = $(this).text();
    matchChaset = inputChecker(targetTxt);

    //analyze text
    textLength = 0;
    if(!matchChaset){
      for(var i = 0; i < targetTxt.length; i++) {
        textLength += targetTxt.charCodeAt(i) <= 255 ? 0.5 : 1;
        if (textLength > textLimit) {
          targetTxt = targetTxt.substr(0, i) + afterTxt;
          break;
        }
      }
    }else{ // only en
      for(var i = 0; i < targetTxt.length; i++) {
        textLength += targetTxt.charCodeAt(i) <= 255 ? 1 : 1;
        if (textLength > textLimit) {
          targetTxt = targetTxt.substr(0, i) + afterTxt;
          break;
        }
      }
    }
    $(this).text(targetTxt);
  });
}
/*========================================================================
  clone 
======================================================================== */
var cloneWrap = '.js-clone';
var cloneTri = '.js-clone-tri';
var cloneTarget = '.js-clone-target';
$(cloneTri + ' a').on('click', function(){
  cloneWrap = $(this).parents(cloneWrap);
  cloneTarget = cloneWrap.find(cloneTarget).clone(true);
  cloneTri = cloneWrap.find(cloneTri);
  cloneTri.before(cloneTarget);
});
/*========================================================================
  mediaquery aside
======================================================================== */
var asideTriClass = $('.js-aside-main-open');

if(asideTriClass.length){
  var asideFlg = 0;
  var asideClass = $('.js-aside-main');
  var removeTarget = '.js-aside-main, .js-aside-remove';
  var pageContents = $('.js-page-contents')

  asideTriClass.on('click', function(){
    asideFlg++;

    // click trigger
    if(asideFlg === 1){
      asideClass.addClass('is-transition').delay(500).addClass('is-open');
      pageContents.addClass('is-transition').addClass('is-behind');

      // click document
      $(document).on('click', function(e){
        if( $(e.target).closest(removeTarget).length ){
          return;
        }
        asideClose();
      });
    }
    // click trigger
    if(asideFlg === 2){asideClose();}
  });

  // close aside
  function asideClose(){
    asideClass.removeClass('is-open').delay(500).queue(function() {
      $(this).removeClass('is-transition').dequeue();
    });
    pageContents.removeClass('is-behind').delay(500).queue(function() {
      $(this).removeClass('is-transition').dequeue();
    });
    asideFlg = 0;
    return asideFlg;
  }
}
/*========================================================================
  mediaquery slide nav
======================================================================== */
var slideNavFlg = 0;
$('.js-nav-slide-open').on('click', function(){
  slideNavFlg++;
  if(slideNavFlg === 1){
    $('.js-nav-slide').addClass('is-transition').delay(500).addClass('is-open');
    //click body
    $('.js-page-contents:not(.js-nav-slide)').on('click', function(){
      $('.js-nav-slide').removeClass('is-open').delay(1000).queue(function() {
        $(this).removeClass('is-transition').dequeue();
      });
      slideNavFlg = 0;
      $(this).off();
    })
  }
  if(slideNavFlg === 2){
    $('.js-nav-slide').removeClass('is-open').delay(1000).queue(function() {
      $(this).removeClass('is-transition').dequeue();
    });
    slideNavFlg = 0;
  }
});
////////////////////////////////////////////////////////////
})(jQuery);