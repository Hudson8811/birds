"use strict";

$(window).on('load', function () {
  $(".loader img").fadeOut(700);
  $(".loader").delay(300).fadeOut(700);
});

$('body').on('click', '.header__button', function () {
  $(this).toggleClass('is-active');
  $('.nav').toggleClass('active');
  $('.nav').toggleClass('active');
});



  var nextButton = $('.next-button');
  var headerItem = $('.header__item');

  var nextButtonText = ['РљР°Рє РІРґРѕС…РЅРѕРІР»СЏСЋС‚СЃСЏ <br>РґРёР·Р°Р№РЅРµСЂС‹?', 'РЎРµРєСЂРµС‚С‹ СѓС…РѕРґР° <br>Р·Р° РјРѕРґРЅРѕР№ РѕРґРµР¶РґРѕР№', 'РЎРѕР±СЂР°С‚СЊ СЃРІРµР¶РёР№ РѕР±СЂР°Р·'];

  $('.slider').fullpage({
    anchors: ['first', 'second', 'third', 'contest'],
    controlArrows: false,
    verticalCentered: false,
    responsiveWidth: 768,
    scrollingSpeed: 800,
    easingcss3: 'cubic-bezier(0.645, 0.045, 0.355, 1)',

    onLeave: function onLeave(index, nextIndex, direction) {
      $('.logos').removeClass('active');

      headerItem.removeClass('active');
      nextButton.removeClass('pink');
      nextButton.removeClass('hidden');

      if (nextIndex === 1) {
        headerItem.eq(0).addClass('active');
        nextButton.find('span').html(nextButtonText[0]);
      } else if (nextIndex === 2) {
        headerItem.eq(1).addClass('active');
        nextButton.addClass('pink');
        nextButton.find('span').html(nextButtonText[1]);
      } else if (nextIndex === 3) {
        headerItem.eq(2).addClass('active');
        nextButton.addClass('pink');
        nextButton.find('span').html(nextButtonText[2]);
      } else if (nextIndex === 4) {
        headerItem.eq(3).addClass('active');
        nextButton.addClass('hidden');
      } else {
        nextButton.addClass('hidden');
      }

      $('.overlay').hide();
      $('.game').removeClass('active');
    },
    afterLoad: function afterLoad(anchorLink, index) {
      $('.logos').addClass('active');

      if (index === 1) {
        headerItem.eq(0).addClass('active');
      }
    }
  });

  nextButton.on('click', function () {
    $.fn.fullpage.moveSectionDown();
  });

  var closeButton = $('.close-button');
  var gameButton = $('.next-button-game');

  $('.js-game').on('click', function (e) {
    e.preventDefault();
    var game = $(this).data('game');
    $('.overlay').show();
    $('#game-'+game).addClass('active');
    $.fn.fullpage.setAllowScrolling(false);
  });

  $('.overlay, .close-button').on('click', function () {
    $('.overlay').hide();
    $('.game').removeClass('active');
    $.fn.fullpage.setAllowScrolling(true);
  });

  if (window.innerWidth < 768) {
    $('.nav a').on('click', function () {
      $('.header__button').removeClass('is-active');
      $('.nav').removeClass('active');
    });
  }


  // interviewNames.sort(function () {
  //   return Math.random() - 0.5;
  // });



  // if (window.innerWidth > 767) {
  //   $('.interview__name').hover(function () {
  //     $('.interview__photo').removeClass('active');
  //     $(this).parent().find('.interview__photo').addClass('active');
  //   }, function () {
  //     $('.interview__photo').removeClass('active');
  //     $('.interview__list li:first-child .interview__photo').addClass('active');
  //   });
  // }

// РРЅС‚РµСЂРІСЊСЋ

if ($('.wrapper--iv').length) {
  var hashListener = function hashListener() {
    switch (location.hash) {
      case '#igor_gulyaev':
        ivSlider.slick('slickGoTo', 0, true);
        break;
      case '#yuliya_bazhina':
        ivSlider.slick('slickGoTo', 1, true);
        break;
      case '#julia_dalakian':
        ivSlider.slick('slickGoTo', 2, true);
        break;
      case '#bella_potemkina':
        ivSlider.slick('slickGoTo', 3, true);
        break;
      case '#elena_zemtsova':
        ivSlider.slick('slickGoTo', 4, true);
        break;
      case '#chloe':
        ivSlider.slick('slickGoTo', 5, true);
        break;
    }
  };

  var ivSlider = $('.iv-slider');

  hashListener();

  window.addEventListener("hashchange", function () {
    hashListener();
  });

  $('.header__item').eq(1).addClass('active');

  var moveTo = new MoveTo({
    duration: 800,
    easing: 'easeInOutCubic'
  });

  moveTo.addEaseFunction('easeInOutCubic', function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  });

  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    if (target !== '#') {
      moveTo.move($(target)[0]);
    }
  });
}

if ($('.wrapper--ig').length) {
  $('.header__item').eq(2).addClass('active');
}

