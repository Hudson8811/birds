/*var things = [
  {name: 'Фоны', items: ['Вещь_1','Вещь_2','Вещь_3','Вещь_4','Вещь_5','Вещь_6','Вещь_7','Вещь_8','Вещь_9','Вещь_10']},
  {name: 'Топы и платья', items: ['Вещь_1','Вещь_2','Вещь_3','Вещь_4','Вещь_5','Вещь_6','Вещь_7','Вещь_8','Вещь_9','Вещь_10']},
  {name: 'Брюки и юбки', items: ['Вещь_1','Вещь_2','Вещь_3','Вещь_4','Вещь_5','Вещь_6','Вещь_7','Вещь_8','Вещь_9','Вещь_10']},
  {name: 'Верхняя одежда', items: ['Вещь_1','Вещь_2','Вещь_3','Вещь_4','Вещь_5','Вещь_6','Вещь_7','Вещь_8','Вещь_9','Вещь_10']},
  {name: 'Обувь', items: ['Вещь_1','Вещь_2','Вещь_3','Вещь_4','Вещь_5','Вещь_6','Вещь_7','Вещь_8','Вещь_9','Вещь_10']},
  {name: 'Аксессуары', items: ['Вещь_1','Вещь_2','Вещь_3','Вещь_4','Вещь_5','Вещь_6','Вещь_7','Вещь_8','Вещь_9','Вещь_10']}
];*/

var collage_items = $('.collage__item');
var game_button = $('.next-button-game');
var groups = $('.choose__group');

var cur_collages;

$(function () {

  //ulogin
  /*uLogin.customInit('uLogin_main', {
    redirect_uri: '',
    display: 'buttons',
    fields: 'first_name,last_name,email,sex,city',
    providers: 'vkontakte,facebook,odnoklassniki,twitter',
    mobilebuttons: 0,
    hidden: 'other',
    callback: 'authorise'
  });*/


  //region rules checkbox
  var rules = $('.form__checks');
  var checker = $('.social-checker');
  checker.click(function () {
    rules.animate({'opacity': 0}, 300).animate({'opacity': 1}, 300);
  });

  $('.form__checks input').change(function () {
    checker.toggle();
  });
  //endregion

  //likes
  $('body').on('click', '.info__likes', function(){
    if ($(this).is('.checked')) return;
    var obj = $(this);
    var id = $(this).attr('data-id');
    //console.log($(this).attr('data-id'));
    $.post('/add_like',{id:id},function(data) {
      //console.log(data);
      if (data.result) return;
      $('.item__info .info__likes[data-id='+id+']').text(data.count);
      obj.html(data.count);
      //obj.addClass('checked');
    },'json')
  });


  //region init game
  setGroup();
  if (window.showGame == undefined || window.showGame <= 0)
    slickGroup();
  //selectThing();

  //load collages of current user
  $.post('/get_collages',{}, function (data) {
    cur_collages = data;
    //console.log(data);
  },'json');


  //show game view
  if (window.showGame !== undefined) {
    var id = window.showGame;
    //console.log(window.showGame);
    $.fn.fullpage.setAllowScrolling(false);
    $('.overlay').show();
    $('.game').addClass('active');
    if (id > 0) {
      toggleView();
      var item = $('.gallery__item[data-id='+id+']');
      if (item.length) {
        $.post('/get_collages',{}, function (data) {
          cur_collages = data;
          //console.log(data);
          popupOpen(item);
        },'json');
      }
    }
  }

  //close game view
  $('.close-button').click(function () {
    /*$.fn.fullpage.setAllowScrolling(true);
    $('.overlay').hide();
    $('.game').removeClass('active');*/
    window.history.pushState("", "", "http://freshlook.woman.ru/");
  });
  //endregion


  $('.next-button-game').click(function () {
    toggleView();
  });

  //region Sliding




  // sinhronize sliders
  $('.group__slider1, .group__slider2').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    if (!inClick) {
      slider1.slick('slickGoTo',nextSlide,false);
      /*var cur = slider1.find('.slider1__item.slick-current');
      cur.addClass('selected').siblings().removeClass('selected');*/

    //inClick = false;
    slider2.slick('slickGoTo',nextSlide,true);
    }
    updateTooltip(nextSlide);
  });

  $('.group__slider1, .group__slider2').on('afterChange', function (event, slick, currentSlide) {
    inClick = false;
  });

  //next slide
  $('.slider_wrap .slider__button').click(function () {
   var inc = $(this).hasClass('right');
   var command = inc ? 'slickNext' : 'slickPrev';
   //var group = $(this).closest('.choose__group');
   var slider2 = group.find('.group__slider2');
   slider2.slick(command);
  });

  $('.slider_wrap1 .slider__button').click(function () {
    var inc = $(this).hasClass('right');
    var command = inc ? 'slickNext' : 'slickPrev';
    //var group = $(this).closest('.choose__group');
    var slider1 = group.find('.group__slider2');
    slider1.slick(command);
  });

  var inClick = false;
  //click slide
  $('.slider1__item').mouseenter(function () {
    /*$(this).addClass('selected').siblings().removeClass('selected');*/
    inClick = true;
    /*console.log('qqq');
    console.log($(this).index(),slider2.slick('slickCurrentSlide'));*/
    slider2.slick('slickGoTo',$(this).index(),true);//attr('data-slick-index')
  });

  $('.slider2__item, .slider1__item').click(function () {
    selectThing();
  });
  //endregion

  //region Choose
  //hide intro
  $('.game_choose').click(function () {
    $('.collage_intro').hide();
  });

  //choose group
  $('.menu__item').click(function () {
    if ($(this).hasClass('selected')) return;
    $(this).addClass('selected').siblings().removeClass('selected');
    var group = $('.choose__group').eq($(this).index());
    group.addClass('selected').siblings().removeClass('selected');
    setGroup();
    slickGroup();
  });

  //choose thing
  function selectThing() {
    var item = slider2.find('.slider2__item.slick-current');
    item.addClass('selected');

    var img = item.find('img').attr('src');
    if (group.index() === groups.length-1)
      $('.game__collage .collage__back img').attr('src', img);
    else {
      $('.game__send').show();
      var ind = group.index();
      var cur_item = $('.collage__item').eq(ind);
      cur_item.attr('data-imaged',1);
      cur_item.find('img').attr('src',img);
    }
  }

  //hover thing
  /*collage_items.hover(function () {
    //console.log($(this).find('img').attr('src'));
    if ($(this).find('img').attr('src') === undefined) return;
    $(this).css({'backgroundColor':'rgba(255, 255, 255,.5)','zIndex':'10'});
    $(this).find('.delete_cross').show();
  }, function () {
    $(this).css({'backgroundColor':'transparent','zIndex':'1'});
    $(this).find('.delete_cross').hide();
  });*/

  //click thing
  collage_items.click(function () {
    $(this).removeAttr('data-imaged');
    $(this).find('img').removeAttr('src');
    //$(this).css({'backgroundColor':'transparent','zIndex':'1'});
    //$(this).find('.delete_cross').hide();
  });
  //endregion

/*
  //collage send
  $('.game__send').click(function () {
    var items = [];
    for (var i = 0; i < collage_items.length; i++) {
      var obj = $(collage_items[i]);
      var img = obj.find('img').attr('src');
      if (img === undefined) continue;
      items[items.length] = {group: obj.index(),img:img}
    }
    var res = {backgroung: $('.collage__back img').attr('src'), items: items}
    var res_s = JSON.stringify(res);
    var form = $('.game__form');
    form.find('input').val(res_s);
    form.submit();
    //console.log(res,res_s);
    /!*$.post('/create_collage/',res,function (res1) {
      console.log(res1);
    })*!/
  });
*/


// handle items
  var gallery_items = $('.gallery__item');
  var load_count = 21;
  var gallery_container = $('.gallery__items');
  function loadGallery() {
    var loaded = Number(gallery_container.attr('data-loaded'));
    var end_item = loaded + load_count;
    if (end_item > gallery_items.length) {
      end_item = gallery_items.length;
      $('.galery__load').hide();
    }
    for (var i = loaded; i < end_item; i++) {
      var item = gallery_items.eq(i);
      var img = item.find('img');
      img.attr('src',item.attr('data-img'));
      item.css('display','inline-block');
    }
    gallery_container.attr('data-loaded',end_item);
  }

  $('.galery__load').click(function () {
    loadGallery();
  });
  loadGallery();
});

//region toggle game/gallery
var inGame = true;
var game = $('.game__container');
var gallery = $('.gallery__container');
var toggle_button = $('.next-button-game span');
function toggleView() {
  inGame = !inGame;
  if (!inGame) {
    game.hide();
    gallery.show();
    toggle_button.html('Собери<br/>fresh-лук');
  }
  else {
    game.show();
    gallery.hide();
    toggle_button.html('Победители<br>и участники');
    slickGroup();
  }

}

$('.js-winners').on('click', function (e) {
  e.preventDefault();
  game.hide();
  gallery.show();
  toggle_button.html('Собери<br/>fresh-лук');
});

$('.js-game').on('click', function (e) {
  e.preventDefault();
  game.show();
  gallery.hide();
  toggle_button.html('Победители<br>и участники');
  slickGroup();
});
//endregion

//region Popup

//open social popup
$('.game__send span').click(function () {
  makeData();
  $('.popup__container').show();
  $('.game__social').css('display','inline-block');
});

$('.gallery__item').click(function (e) {
  if ($(e.target).hasClass('info__likes')) return;
  popupOpen($(this));
});

//close popup
$('.popup-close').click(function () {
  $('.popup__container').hide();
  $('.popup__container').children().hide();
  var data = $('.game__social').attr('data-redirect');
  if (data != undefined) window.location = '/game/'+data;
  //$('meta[property="og:url"]').attr('content','http://freshlook.woman.ru/');
  //game_button.show();
});

var popup = $('.gallery__cp-popup');
function setPopup(item) {
  if (item === undefined) return;
  //var img = item.find('img').attr('src');
  var img = item.attr('data-img');
  var liker = item.find('.info__likes');
  var id = liker.attr('data-id');
  var name = item.attr('data-name');
  var likes = liker.text();
  var isCurrent = $.inArray(Number(id),cur_collages) >= 0;
  var text = isCurrent
    ? 'Попроси друзей проголосовать за твой образ. <br/>Чем больше лайков – тем выше шанс на победу!'
    : 'Поделиться в соцсетях';
  //console.log(img,id,popup);
  popup.find('.cp__picture').attr('src',img);
  popup.find('.cp__name').text(name);
  popup.find('.social__intro').html(text);
  popup.find('.social__buttons').attr('data-url','http://freshlook.woman.ru/game/'+id);
  var popup_liker = popup.find('.info__likes');
  popup_liker.attr('data-id',id);
  popup_liker.text(likes);
  popup.attr('data-cur',item.index());
  //$('meta[property="og:url"]').attr('content','http://freshlook.woman.ru/game/'+id);
}


function popupOpen(item) {
  if (item === undefined) return;
  setPopup(item);
  $('.popup__container').show();
  $('.gallery__cp-popup').css('display','inline-block');
  //game_button.hide();
}

$('.gallery__cp-popup .slider__button').click(function () {
  var inc = $(this).hasClass('right');
  var cur_item = $('.gallery__item').eq(popup.attr('data-cur'));
  var item = inc ? cur_item.next() : cur_item.prev();
  if (item.length) setPopup(item);
});
//endregion

//set current group
var group, slider1, slider2;
function setGroup() {
  group = $('.choose__group.selected');
  slider1 = group.find('.group__slider1');
  slider2 = group.find('.group__slider2');
}

function updateTooltip(slide) {
  var tooltip = $('.choose__tooltip');
  if (group.index() == groups.length - 1) {
    tooltip.hide();
    return;
  }
  tooltip.show();
  var tooltip_name = tooltip.find('.tooltip__object');
  var item = slider2.find('.slider2__item').eq(slide).find('img');

  tooltip_name.text(item.attr('title'));
}

//init sliders
function slickGroup() {
  if (group.attr('data-slicked') == 1) return;
  slider1.slick({
    //lazyLoad: 'ondemand',
    accessibility: false,
    arrows: false,
    touchThreshold: 20,
    //slidesToScroll: 6,
    //focusOnSelect: true,
    swipeToSlide: true,
    //infinite: false,
    speed: 600,
    slidesToShow: 4,
    infinite: false
  });
  slider2.slick({
    //lazyLoad: 'ondemand',
    accessibility: false,
    arrows: false,
    speed: 600,
    slidesToShow: 1,
    infinite: false
  });
  updateTooltip(0);
  group.attr('data-slicked',1);
}

function makeData() {
  var items = [];
  var add = undefined;
  for (var i = 0; i < collage_items.length; i++) {
    var item = $(collage_items[i]);
    var img_owner = item.find('img');
    var img = img_owner.attr('src');
    //console.log('curitem',item,img_owner,img);
    if (img === undefined) continue;
    var group = item.index();
    if (group != 1) items[items.length] = {group: group,img:img};
    else add = {group: group,img:img}
  }
  if (add != undefined) items.push(add);
  var res = {backgroung: $('.collage__back img').attr('src'), items: items};
  var res_s = JSON.stringify(res);
  console.log(res);
  Cookies.set('collage_data',res_s)
}


function authorise(token) {
  $.post('/authorize',{token:token},function (d) {
    if (d.result === 0) {
      //send collage

      var res_s = Cookies.get('collage_data');
      $.post('/create_collage/',{data:res_s},function (data) {
        //console.log(data);
        //window.location = '/game/'+data;
        //make greetings popup
        $('.game__social').attr('data-redirect',data);
        $('.game__social .social__buttons').hide();
        $('.game__social .form__checks').hide();
        $('.game__social .social__intro').css('textAlign','center')
          .html('<b>Поздравляем!</b><br/>Теперь вы участник конкурса фреш-луков. Собирайте лайки на нашем сайте и выигрывайте призы!');

        //open game & popup for mobile
        $.fn.fullpage.setAllowScrolling(false);
        $('.overlay').show();
        $('.game').addClass('active');
        $('.popup__container').show();
        $('.game__social').css('display','inline-block');
      });
    }
  },'json');
}

