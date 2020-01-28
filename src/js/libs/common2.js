var socialTypes =  {
  "fb": "http://www.facebook.com/share.php?u=",
  "vk": "http://vkontakte.ru/share.php?url=",
  "tw": "https://twitter.com/intent/tweet?url=",
  "ok": "http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl=",
  "mm": "http://connect.mail.ru/share?url=",
  "pin": "http://pinterest.com/pin/create/link/?url=",
  "gp": "https://plus.google.com/share?url="
};

function getMeta(name) {
  var meta = $('meta[property="og:'+name+'"]');
  return meta.length ? meta.attr('content') : '';
}

// Вызов счетчика цели
function yGoal(goal) {
  var yaCounter = 0;
  if (yaCounter != 0) eval('yaCounter' + yaCounter + '.reachGoal')(goal);
  //yaCounter34269185.reachGoal(goal);
}

function gGoal(goal) {
  if (typeof window['ga'] == 'function')
    ga('send', 'event', goal);
}

$(function () {
  // переход по шарингу
  $('.sharing__button').click(function() {
    var no_sharing = $(this).parent().attr('data-nosharing');
    if (no_sharing) return;
    // Находим тип кнопки
    var socialType;
    for (var name in socialTypes)
      if ($(this).hasClass(name)) { socialType = name; break; }
    if (socialType == undefined) return;

    // get Meta tags
    var url = getMeta('url');
    var title = getMeta('title');
    var description = getMeta('description');
    var image = getMeta('image');

    var parent = $(this).parent();
    var new_url = parent.attr('data-url');
    if (new_url) {
      url = new_url;
      image = '';
    }
    if (url == '') url = window.location.toString();

    var p_desc = parent.attr('data-description');
    if (p_desc) description = p_desc;
    var p_title = parent.attr('data-title');
    if (p_title) title = p_title;
    var p_image = parent.attr('data-image');
    if (p_image) image = p_image;
    //console.log(url,title,image,description);

    // make social link
    var $slink = encodeURIComponent(url);
    switch (socialType) {
      case 'tw':
        $slink += '&text='+encodeURIComponent(title); break;
      case 'pin':
        $slink += '&media='+encodeURIComponent(image); break;
      case 'mm':
        if (image != '') $slink += '&imageurl='+encodeURIComponent(image); break;
      /*case 'vk':
        if (image != '') $slink += '&image='+encodeURIComponent(image);
        if (title != '') $slink += '&title='+encodeURIComponent(title);
        if (description != '') $slink += '&description='+encodeURIComponent(description); break;*/
      case 'ok':
        if (image != '') $slink += '&st.imageUrl='+encodeURIComponent(image);
        //if (title != '') $slink += '&title='+encodeURIComponent(title);
        if (description != '') $slink += '&st.comments='+encodeURIComponent(description); break;
      /*case 'fb':
        if (image != '') $slink += '&p[images][0]='+encodeURIComponent(image);
        if (title != '') $slink += '&p[title]='+encodeURIComponent(title);
        if (description != '') $slink += '&p[summary]='+encodeURIComponent(description); break;*/
    }

    //console.log($slink);
    // Вызываем шаринг
    window.open(socialTypes[socialType]+$slink,socialType,'width=500,height=500,resizable=yes,scrollbars=yes,status=yes');

    // Вызов счетчика цели
    yGoal('share');
    yGoal('share_'+socialType);
    gGoal('share_'+socialType);
  });

  // close popup button
  $('.popup__content .popup__close').click(function() {
    closePopup($('.popup-window'));
    //$(this).parent().parent()
  });

  //Update resolution
  function updateRes() {
    var main = $('.main');
    if ($(window).width() > 768)
      main.removeClass('mobile').addClass('desktop');
    else
      main.removeClass('desktop').addClass('mobile');
  }

  updateRes();
  $(window).resize(function () { updateRes() });
});



// Open popup
function openPopup(name,win_name) {
  $('body').css("overflow","hidden");
  if (win_name != undefined) $(win_name).show();
  else $('.popup-window').empty().html($(name).clone(true).addClass('popup__content')).show();
}

// close popup
function closePopup(popup_win) {
  $('body').css("overflow","auto");
  popup_win.hide();
}

// scroll
function scrollToItem(item, add) {
  var item = $(item);
  $('html, body').animate({"scrollTop": item.offset().top + add},300);
}

//for sliders
function setNext(container,elem_name,inc) {
  var elements = container.find(elem_name);
  var cur = elements.filter('.current');
  cur = inc ? cur.next(elem_name) : cur.prev(elem_name);
  if (!cur.length) cur = inc ? elements.first() : elements.last();
  elements.removeClass('current');
  cur.addClass('current');
}