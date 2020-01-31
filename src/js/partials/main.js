var collage1 = {"1":'',"2":'',"3":'',"4":'',"5":'',"6":''},
    collage2 = {"1":'',"2":'',"3":'',"4":'',"5":'',"6":''},
    collage3 = {"1":'',"2":'',"3":'',"4":'',"5":'',"6":''},
    collage4 = {"1":'',"2":'',"3":'',"4":'',"5":'',"6":''},
    collage5 = {"1":'',"2":'',"3":'',"4":'',"5":'',"6":''};

var hash = '';
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

        var persId = $('.game.active').data('id');
        var catId = item.data('cat');
        var itemId = item.data('item');
        var count = 0;
        switch (persId) {
            case 1:
                collage1[catId] = itemId;
                count = countItems(collage1);
                break;
            case 2:
                collage2[catId] = collage2;
                count = countItems(collage1);
                break;
            case 3:
                collage3[catId] = itemId;
                count = countItems(collage3);
                break;
            case 4:
                collage4[catId] = itemId;
                count = countItems(collage4);
                break;
            case 5:
                collage5[catId] = itemId;
                count = countItems(collage5);
                break;
            default:
                break;
        }
        checkCount(count);

        if (group.index() === $('.game.active .choose__group').length)
            $('.game__collage .collage__back img').attr('src', img);
        else {
            var ind = group.index();
            var cur_item = $('.game.active .collage__item').eq(ind);
            cur_item.attr('data-imaged',1);
            cur_item.find('img').attr('src',img);
        }
    }

    function countItems(array){
        var m = 0;
        for (var i = 1; i < 6; i++) {
            if (array[i] != ''){
                m++;
            }
        }
        return m;
    }

    function checkCount(count){
        if (count >= 4){
            $('.game.active .game__auth').show();
        } else {
            $('.game.active .game__auth').hide();
        }
    }

    $('.collage__item').click(function () {
        $(this).removeAttr('data-imaged');
        $(this).find('img').removeAttr('src')
        var persId = $('.game.active').data('id');
        var catId = $(this).data('cat');
        var count = 0;
        switch (persId) {
            case 1:
                collage1[catId] = '';
                count = countItems(collage1);
                break;
            case 2:
                collage2[catId] = '';
                count = countItems(collage2);
                break;
            case 3:
                collage3[catId] = '';
                count = countItems(collage3);
                break;
            case 4:
                collage4[catId] = '';
                count = countItems(collage4);
                break;
            case 5:
                collage5[catId] = '';
                count = countItems(collage5);
                break;
            default:
                break;
        }
        checkCount(count);
    });


    window.auth = function (data) {
        $.ajax({
            type: "POST",
            url: "/authorize/",
            data: data,
            success: function(data) {
                if (data.length > 0) {
                    $('.game__auth_top').html('<button class="btn" onclick="sendCollage(this);">Подтвердить</button>');
                }
            },
            error: function () {
                alert('Ошибка авторизации для продолжения');
            }
        });
    }

    function checkAuth(type) {
        $.ajax({
            type: "POST",
            url: "/get_hashcode/",
            success: function(data) {
                if (JSON.parse(data).hashcode != '' && JSON.parse(data).hashcode != undefined) {
                    if (type != 'only_hash')
                        $('.game__auth_top').html('<button class="btn" onclick="sendCollage(this);">Подтвердить</button>');
                    hash = JSON.parse(data).hashcode;
                }
            }
        });
    }
    checkAuth();


    function objLength(obj){
        var i=0;
        for (var x in obj){
            if(obj.hasOwnProperty(x)){
                i++;
            }
        }
        return i;
    }

    //gallery
    var collages = "";
    var collagesCount = "";
    var showedCollages = 0;

    var collagesData = function() {
        return $.ajax({
            type: "POST",
            url: "/get_collages/"
        });
    }
    collagesData().then(function(response) {
        collages = JSON.parse(response).collages;
        collagesCount = objLength(collages);

        addGallery();
    });



    function addGallery() {
        var htmlOut = '';

        showedCollages = showedCollages + 4;
        start = showedCollages - 4;
        if (showedCollages > collagesCount) {
            showedCollages = collagesCount;
            $('.js-add-gallery').hide();
        }

        for (var i = start; i < showedCollages; i++) {

            var name = collages[i+1].name != undefined ? collages[i+1].name : '';
            var likes = collages[i+1].likes != undefined ? collages[i+1].likes : '0';
            var image = collages[i+1].image;
            htmlOut += '<div class="block" data-id="'+image+'">';
            htmlOut += '<div class="img-block">';
            htmlOut += '<img src="/collages/'+image+'.jpg" alt="photo">';
            htmlOut += '</div>';
            htmlOut += '<div class="bottom-block">';
            htmlOut += '<div class="name">'+name+'</div>';
            htmlOut += '<div class="like-count">';
            htmlOut += '<div class="likes">'+likes+'</div>';
            htmlOut += '<div class="like-block"><img src="img/like.png" alt="like" onclick="addLike('+image+');"></div>';
            htmlOut += '</div>';
            htmlOut += '</div>';
            htmlOut += '</div>';
        }
        $('#modalgallery .flex-block').append(htmlOut);
    }

    $('.js-add-gallery').click(function () {
        addGallery();
    });






});

function addLike(id) {
    $.ajax({
        type: "POST",
        url: "/add_like/",
        data: { id : id },
        success: function(data) {
            var parse = JSON.parse(data);
            var likes = parse.likes;

            var block = $('#modalgallery div[data-id='+id+']');
            block.find('.likes').html(likes);
            block.find('.like-block').html('<img src="img/like-b.png" alt="like">');
        }
    });
}

function sendCollage(elem) {
    $(elem).attr('disabled',true);
    var persId = $('.game.active').data('id');
    var theme = $('.game.active .day-look span').html();
    var dataCollage = '';
    switch (persId) {
        case 1:
            dataCollage = collage1;
            break;
        case 2:
            dataCollage = collage3;
            break;
        case 3:
            dataCollage = collage4;
            break;
        case 4:
            dataCollage = collage5;
            break;
        case 5:
            dataCollage = collage6;
            break;
        default:
            return false;
    }


    $.ajax({
        type: "POST",
        url: "/save_collage/",
        data: { person : persId, items: dataCollage, theme: theme },
        success: function(data) {

            //ответ от сервера
            var parse = JSON.parse(data);
            var image = parse.image;

            if (image != '' && image != undefined){
                $(elem).hide();
                $('.game.active .save_image').attr('href','/collages/'+image+'.jpg');
                $('.game.active .game__send').show();

                $('.game.active').addClass('inactive');
                $('.game.active .game_choose').prepend('<div class="game__thnaks"><div class="title">ПОЗДРАВЛЯЕМ!</div><div class="text">Теперь ты участник конкурса "Собери потрясающий лук в стиле Харли Квинн и хищных птиц Готэма". Теперь дело за малым - стать лучше всех! Делись своим потрясающим луком в социальных сетях и набери больше всех лайков!</div></div>')

            }
        }
    });
}



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

        var $slink = encodeURIComponent(url);
        switch (socialType) {
            case 'tw':
                $slink += '&text='+encodeURIComponent(title); break;
            /*case 'pin':
                $slink += '&media='+encodeURIComponent(image); break;*/
            /* case 'mm':
                if (image != '') $slink += '&imageurl='+encodeURIComponent(image); break;*/
            case 'vk':
              if (image != '') $slink += '&image='+encodeURIComponent(image);
              if (title != '') $slink += '&title='+encodeURIComponent(title);
              if (description != '') $slink += '&description='+encodeURIComponent(description); break;
            case 'ok':
                if (image != '') $slink += '&st.imageUrl='+encodeURIComponent(image);
                //if (title != '') $slink += '&title='+encodeURIComponent(title);
                if (description != '') $slink += '&st.comments='+encodeURIComponent(description); break;
            case 'fb':
              if (image != '') $slink += '&p[images][0]='+encodeURIComponent(image);
              if (title != '') $slink += '&p[title]='+encodeURIComponent(title);
              if (description != '') $slink += '&p[summary]='+encodeURIComponent(description); break;
        }

        if (hash === '') checkAuth('only_hash');
        $slink += '&u='+encodeURIComponent(hash);
        // Вызываем шаринг
        window.open(socialTypes[socialType]+$slink,socialType,'width=500,height=500,resizable=yes,scrollbars=yes,status=yes');
        afterShare(socialType);
    });
});

function afterShare(social) {
    $.ajax({
        type: "POST",
        url: "/new_share/",
        data: { social_share : social },
        success: function(data) {
            console.log('share ok');
        }
    });
}

$('.btn-burger').on('click', function () {
    $('.mobile-menu').toggleClass('active');
    $('.over-menu').toggleClass('active');
});
$('.close-btn').on('click', function () {
    $('.mobile-menu').removeClass('active');
    $('.over-menu').removeClass('active');
});