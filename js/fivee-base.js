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
  scrolltop arrow
======================================================================== */
$(window).scroll(function() {
  var scPosi = $(document).scrollTop();
  var scTop = $('.jq-scrolltop');
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
var pageTopRemove =  $('.jq-pageTop-remove');
if(pageTopRemove){
  var pageTopRemoveVal = pageTopRemoveHeightSum();
}else{
  var pageTopRemoveVal = 0;
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
$('#jq-pageTop').on('click', function(){
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
  //console.log(targetClass);
  return targetClass;
}

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
nav
======================================================================== */
$('.jq-nav a').on('click', function(){
  //parents class
  var navClass = $(this).parents('.jq-nav');
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
      returnClass = 'jq-nav-parent-num';
      targetClass = thisClassGet(clickThis, returnClass);
      targetClass = targetClass.replace('parent', 'child');
      //caret
      var webFont = parentClass.find('.jq-nav-caret i').eq(0);
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
var navCurrent = $('.jq-nav .is-current').parents('ul'); 
//presence class
var hasclass = navCurrent.attr('class');
if(hasclass){
  var matchKey = hasclass.match('child');
  if(matchKey){
    navCurrent.show(500);
    //caret
    var webFont = navCurrent.parents('li').find('.jq-nav-caret i').eq(0);
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
  bookmark
======================================================================== */
var bookmartFlg = 0;
$('.jq-bookmark-open').on('click', function(){
  var bookmarkIcon = $(this).children('i');
  bookmartFlg++;
  if(bookmartFlg === 1){
    bookmarkIcon.removeClass('fa-star-o').addClass('fa-star');
  }
  if(bookmartFlg === 2){
    bookmarkIcon.removeClass('fa-star').addClass('fa-star-o');

    var thisSelecter = $(this);
    returnClass = 'jq-template';
    popupHandler.popupPosi(thisSelecter, returnClass);
    
    bookmartFlg = 0;
  }
});
/*========================================================================
  popup
======================================================================== */
$('.jq-popup-open').on('click', function(){
  var thisSelecter = $(this);
  returnClass = 'jq-template';
  popupHandler.popupPosi(thisSelecter, returnClass);
});
var popupHandler = {
  popupPosi: function(thisSelecter, returnClass){
    var windowWidth = $(window).outerWidth(true);
    var popupPosi = thisSelecter.position();
    var topPosi = popupPosi.top;
        topPosi = topPosi + thisSelecter.outerHeight(true);
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
    $('.jq-popup > .st-body').removeClass('is-current');
    $('.jq-popup ' + targetClass).addClass('is-current');

    //position
    $('.jq-popup ' + targetClass).css({
      top:'',
      left:'',
      right:''
    }).css({
      top: topPosi,
      right: rightPosi
    });
    //show popup
    $('.jq-popup').show(300,
      function(){
        $('main').addClass('jq-popup-close');
      });

    //click close popup
    $('body').on('click', '.jq-popup-close:not(.jq-popup)', function(){
      $('.jq-popup').hide(300);
      $(this).removeClass('jq-popup-close');
    });
  }
}
/*========================================================================
  modal 
======================================================================== */
$('.jq-modal-open').on('click', function(){
  //this
  clickThis = $(this);
  //return class
  returnClass = 'jq-modal-num';
  //target class
  targetClass = thisClassGet(clickThis, returnClass);

  var thisModal = $('.jq-modal').children(targetClass)
  var modalWidth = thisModal.outerWidth()/2;

  //show contents
  $('.jq-modal-posi').removeClass('is-current');
  thisModal.addClass('is-current').css('margin-left', -modalWidth);

  //show modal
  $('.jq-modal').show();

  //show cartain
  $('.jq-cartain').show().addClass('is-gray');

  //click close button
  $('.jq-modal-close, .jq-cartain').on('click', function(){
    $('.jq-modal').hide();
    $('.jq-cartain').hide().addClass('is-gray');
  });
});
/*========================================================================
  toast 
======================================================================== */
$('body').on('click', '.jq-toast-open', function(){
  clickThis = $(this);
  returnClass = 'jq-toast-num';
  targetClass = thisClassGet(clickThis, returnClass);

  //show contents
  $('.jq-toast-posi').removeClass('is-current');
  $('.jq-toast').find(targetClass).addClass('is-current');

  //show toast
  $('.jq-toast').show();

  //show cartain
  $('.jq-cartain').show().addClass('ef-bg-white ef-op05');

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
//select
$('.jq-tr-select tr').on('click', function(){
  $(this).toggleClass('is-select');
});

//colgroup
// $('.jq-col-on').on('click', function(){
//   var id = '.' + $(this).attr('id');
//   //contents
//   $('.jq-col-lighting').removeClass('ef-bg-green');
//   $(id).addClass('ef-bg-green');
// });
/*========================================================================
   same label
======================================================================== */
//click target
// $( '.jq-label-same-table td, .jq-label-same-table th' ).on({
//   'mouseenter': function(){
//     //this
//     clickThis = $(this);
//     //return class
//     returnClass = 'jq-same-';
//     //target class
//     targetClass = thisClassGet(clickThis, returnClass);
//     $(targetClass).addClass('is-focus');
//   },
//   'mouseleave': function(parentClass){
//     //delete class
//     $(this).parents('.jq-label-same-table').find('.is-focus').removeClass('is-focus');
//   }
// });
/*========================================================================
  checkbox
======================================================================== */
$('.jq-check input').on('change', function(){
  //presence class
  var hasclass = $(this).attr('class');
  if(hasclass){
    var matchKeyParent = hasclass.match('parent');
    var matchKeyChild = hasclass.match('child');
    //allcheck
    if(matchKeyParent){
      var clickThis = $(this);
      var returnClass = 'jq-check-parent-num';
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
      var returnClass = 'jq-check-child-num';
      var targetClass = thisClassGet(clickThis, returnClass);

      //after check
      checkedHandler.trHightLight(targetClass)
    }
  }
  console.log(hasclass)
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

$('.jq-html-show').on('click', function(){
  //return targetClass
  clickThis = $(this);
  returnClass = 'jq-example-num';
  targetClass = thisClassGet(clickThis, returnClass);
  //filepath
  var fileUrl = 'doc/' + targetClass.replace(".jq-example-num", "") + '.txt';
  //draw html
  var drawClass = targetClass.slice(0,23).replace(".jq-example-num", ".jq-example-tag-num");
  //check array
  var checkValue = $.inArray(targetClass, drawFlg);
  //check last array
  var lastValue = drawFlg[drawFlg.length-1];
  //check last array
  var lastDrawClassValue = drawClassFlg[drawClassFlg.length-1];
  
      console.log(drawClass)
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
////////////////////////////////////////////////////////////
});