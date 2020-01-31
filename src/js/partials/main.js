$(document).ready(function() {

    var nextButton = $('.next-button');
    var headerItem = $('.header__item');

    var group, slider1, slider2;

    //fullpage init
    $('.slider').fullpage({
        anchors: ['first', 'second', 'third'],
        controlArrows: false,
        verticalCentered: false,
        responsiveWidth: 768,
        scrollingSpeed: 800,
        easingcss3: 'cubic-bezier(0.645, 0.045, 0.355, 1)',

        onLeave: function onLeave(index, nextIndex, direction) {
            headerItem.removeClass('active');
            if (nextIndex.index === 0) {
                headerItem.eq(0).addClass('active');
            } else if (nextIndex.index === 1) {
                headerItem.eq(1).addClass('active');
                nextButton.addClass('pink');
            } else if (nextIndex.index === 2) {
                headerItem.eq(2).addClass('active');
                nextButton.addClass('pink');
            } else {
                nextButton.addClass('hidden');
            }
            $('.game').removeClass('active');
        },
        afterLoad: function afterLoad(anchorLink, index) {
            if (index.index === 0) {
                headerItem.eq(0).addClass('active');
            }
        }
    });

    //first screen arrow
    nextButton.on('click', function () {
        $.fn.fullpage.moveSectionDown();
    });



    //close game
    var closeButton = $('.close-button');
    closeButton.on('click', function () {
        $('.game').removeClass('active');
        $.fn.fullpage.setAllowScrolling(true);
    });

    //change group
    $('.menu__item').click(function () {
        if ($(this).hasClass('selected')) return;
        $(this).addClass('selected').siblings().removeClass('selected');
        var group = $('.choose__group').eq($(this).index());
        group.addClass('selected').siblings().removeClass('selected');
        var id = $('.game.active').data('id');
        setGroup(id);
        slickGroup();
    });

    var images = "";
    function getData() {
        $.ajax({
            type: "POST",
            url: "/get_items/",
            success: function(data) {
                if (data.length){
                    images = JSON.parse(data);

                    //open game
                    $('.js-game').on('click', function (e) {
                        e.preventDefault();
                        var game = $(this).data('game');
                        $('#game-'+game).addClass('active');
                        $.fn.fullpage.setAllowScrolling(false);
                        generateSliders(game);
                        setGroup(game);
                        slickGroup();
                        sliderControl();
                    });
                } else {
                    console.log('empty data');
                }
            },
            error: function () {
                alert('Ошибка получения каталога');
            }
        });
    }

    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    function generateLook() {
        var looksAttay = ['вечеринка', 'выход в свет', 'на работу', 'повседневный наряд', 'свидание'];
        var randomLook = looksAttay[ randomInteger(0, looksAttay.length-1) ];

        $('#game-1').find('.day-look span').html(randomLook);
        $('#game-2').find('.day-look span').html(randomLook);
        $('#game-3').find('.day-look span').html(randomLook);
        $('#game-4').find('.day-look span').html(randomLook);
        $('#game-5').find('.day-look span').html(randomLook);
        $('#game-6').find('.day-look span').html(randomLook);
    }
    generateLook();

    function generateSliders(id) {

        // 1 - Харли - 4
        // 2 - Кассандра - 3
        // 3 - Охотница - 2
        // 4 - Канарейка - 1
        // 5 - Рене - 5

        var persId = id;
        console.log(images.items);
        var persName = images.items[id].name;

        var gamePop = $('#game-'+persId);


        var chooseGroups = gamePop.find('.choose__groups');
        var n = 0;
        $.each( images.items[id].part, function( index, value ) {
            var outHtml = '';
            var outHtml1 = '';
            var outHtml2 = '';
            var selected = '';
            if (n === 0 ){
                selected = 'selected';
            }

            var catId = index;
            // 1 - шорты
            // 2  топы
            // 3 - обувь
            // 4 - верхняя одежда
            // 5 - Аксессуары
            // 6 - Сумки

            outHtml += '<div class="choose__group '+selected+'">';

            outHtml1 += '<div class="slider_wrap1">';
            outHtml2 += '<div class="slider_wrap">';
            outHtml1 += '<div class="slider__button left"></div>';
            outHtml2 += '<div class="slider__button left"></div>';
            outHtml1 += '<div class="slider__button right"></div>';
            outHtml2 += '<div class="slider__button right"></div>';
            outHtml1 += '<div class="group__slider1">';
            outHtml2 += '<div class="group__slider2">';
            $.each(value, function( index, value ) {
                var itemId = index;
                var itemLink = value;

                outHtml1 += ' <div class="slider1__item" data-item="'+itemId+'" data-cat="'+catId+'">';
                outHtml1 += '<img src="'+itemLink+'" alt="" >';
                outHtml1 += '</div>';

                outHtml2 += ' <div class="slider2__item" data-item="'+itemId+'" data-cat="'+catId+'">';
                outHtml2 += '<img src="'+itemLink+'" alt="" >';
                outHtml2 += '</div>';
            });
            outHtml1 += '</div></div>';
            outHtml2 += '</div></div>';

            outHtml += outHtml1 + outHtml2;
            outHtml += '</div>';

            chooseGroups.append(outHtml);
            n++;
        });
        setGroup(1);
        slickGroup();
    }


    getData();




    //slider
    function setGroup(id) {
        group = $('#game-'+id+' .choose__group.selected');
        slider1 = group.find('.group__slider1');
        slider2 = group.find('.group__slider2');
    }

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
            slidesToShow: 3,
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
        group.attr('data-slicked',1);
    }

    function sliderControl(){
        $('.group__slider1, .group__slider2, .slider_wrap .slider__button, .slider_wrap1 .slider__buttonm, .slider2__item, .slider1__item').off();
        // sinhronize sliders
        $('.game.active .group__slider1, .group__slider2').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            if (!inClick) {
                slider1.slick('slickGoTo',nextSlide,false);
                slider2.slick('slickGoTo',nextSlide,true);
            }
        });

        $('.game.active .group__slider1, .group__slider2').on('afterChange', function (event, slick, currentSlide) {
            inClick = false;
        });

        //next slide
        $('.game.active .slider_wrap .slider__button').click(function () {
            var inc = $(this).hasClass('right');
            var command = inc ? 'slickNext' : 'slickPrev';
            var slider2 = group.find('.group__slider2');
            slider2.slick(command);
        });

        $('.game.active .slider_wrap1 .slider__button').click(function () {
            var inc = $(this).hasClass('right');
            var command = inc ? 'slickNext' : 'slickPrev';
            var slider1 = group.find('.group__slider2');
            slider1.slick(command);
        });

        var inClick = false;
        //click slide
        $('.game.active .slider1__item').mouseenter(function () {
            inClick = true;
            slider2.slick('slickGoTo',$(this).index(),true);
        });

        $('.game.active .slider2__item, .slider1__item').click(function () {
            selectThing();
        });
    }

    function selectThing() {
        var item = slider2.find('.slider2__item.slick-current');
        item.addClass('selected');

        var img = item.find('img').attr('src');

        console.log(group.index());
        console.log($('.game.active .choose__group').length);
        if (group.index() === $('.game.active .choose__group').length)
            $('.game__collage .collage__back img').attr('src', img);
        else {
            $('.game__send').show();
            var ind = group.index();
            var cur_item = $('.game.active .collage__item').eq(ind);
            cur_item.attr('data-imaged',1);
            cur_item.find('img').attr('src',img);
        }
    }

    $('.collage__item').click(function () {
        $(this).removeAttr('data-imaged');
        $(this).find('img').removeAttr('src');
    });




});