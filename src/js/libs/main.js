"use strict";

$(window).on('load', function () {
  $(".loader img").fadeOut(700);
  $(".loader").delay(300).fadeOut(700);
});

$('body').on('click', '.header__button', function () {
  $(this).toggleClass('is-active');
  $('.nav').toggleClass('active');
});

// Р“Р»Р°РІРЅР°СЏ

if ($('.wrapper--main').length) {
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

  $('.js-game, .js-winners').on('click', function (e) {
    e.preventDefault();
    $('.overlay').show();
    $('.game').addClass('active');
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

  var interviewNames = [{
    name: 'Igor Gulyaev',
    href: '/interview#igor_gulyaev',
    src: '/img/interview/gulyaev/cover.jpg',
    mark: 'designer_1'
  }, {
    name: 'Yuliya Bazhina',
    href: '/interview#yuliya_bazhina',
    src: '/img/interview/bazhina/cover.jpg',
    mark: 'designer_2'
  }, {
    name: 'Julia Dalakian',
    href: '/interview#julia_dalakian',
    src: '/img/interview/dalakian/cover.jpg',
    mark: 'designer_3'
  }, {
    name: 'BellaВ Potemkina',
    href: '/interview#bella_potemkina',
    src: '/img/interview/potemkina/cover.jpg',
    mark: 'designer_4'
  }, {
    name: 'Elena Zemtsova',
    href: '/interview#elena_zemtsova',
    src: '/img/interview/zemtsova/cover.jpg',
    mark: 'designer_5'
  }, {
    name: 'ChloС‘',
    href: '/interview#chloe',
    src: '/img/interview/chloe/cover.jpg',
    mark: 'designer_6'
  }];

  // interviewNames.sort(function () {
  //   return Math.random() - 0.5;
  // });

  var app2 = new Vue({
    el: '.interview__list',
    data: {
      interviews: interviewNames
    },
    methods: {
      ga: function (_ga) {
        function ga(_x) {
          return _ga.apply(this, arguments);
        }

        ga.toString = function () {
          return _ga.toString();
        };

        return ga;
      }(function (mark) {
        ga('send', 'event', mark);
      })
    }
  });

  // if (window.innerWidth > 767) {
  //   $('.interview__name').hover(function () {
  //     $('.interview__photo').removeClass('active');
  //     $(this).parent().find('.interview__photo').addClass('active');
  //   }, function () {
  //     $('.interview__photo').removeClass('active');
  //     $('.interview__list li:first-child .interview__photo').addClass('active');
  //   });
  // }
}

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

  var app = new Vue({
    el: '.wrapper--iv',
    data: {
      designer: interviewData[0],
      slider: interviewData[0],
      all: interviewData
    },
    mounted: function mounted() {
      var ivSlider = $('.iv-slider');

      ivSlider.slick({
        speed: 800,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',

        prevArrow: '<button class="slick-arrow slick-prev" type="button" onclick="ga(\'send\',\'event\',\'prev_designer\');"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175"><path d="M145.188 238.575l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1l-215.4-215.5z"/></svg></button>',

        nextArrow: '<button class="slick-arrow slick-next" type="button" onclick="ga(\'send\',\'event\',\'next_designer\');"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175"><path d="M360.731 229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1 0s-5.3 13.8 0 19.1l215.5 215.5-215.5 215.5c-5.3 5.3-5.3 13.8 0 19.1 2.6 2.6 6.1 4 9.5 4 3.4 0 6.9-1.3 9.5-4l225.1-225.1c5.3-5.2 5.3-13.8.1-19z"/></svg></button>',

        responsive: [{
          breakpoint: 768,
          settings: {
            touchMove: false,
            touchThreshold: 100
          }
        }]
      });

      ivSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        app.slider = interviewData[nextSlide];

        setTimeout(function () {
          app.designer = interviewData[nextSlide];
        }, 400);

        location.hash = interviewData[nextSlide].hash;
      });
    },

    methods: {
      otherClick: function otherClick(index) {
        $('.iv-slider').slick('slickGoTo', index, true);
      }
    }
  });

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