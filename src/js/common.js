$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.up-button').addClass('up-button_active');
        } else {
            $('.up-button').removeClass('up-button_active');
        }
    })
    $('.up-button').click(function(){
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
        $('.up-button').removeClass('up-button_active');
    })


    $('#my-menu').mmenu({
        extensions: ["theme-black", "border-none", "pagedim-black", "position-right", "fx-menu-slide", "offcanvas"],
        onClick: {
            close: "true",
            setSelected: "false"
        },
        navbar: {
            title: "<img src='img/logo-1.svg' alt='Салон S&Mitler'>"
        },
    });
    var api = $('#my-menu').data("mmenu");
    api.bind('open:finish', function () {
        $('.hamburger__line').addClass('hamburger__line_active');
    })
    api.bind('close:finish', function () {
        $('.hamburger__line').removeClass('hamburger__line_active');
    })

    // carousel

    $('.services-carousel').owlCarousel({
        nav: true,
        loop: true,
        smartSpeed: 700,
        navText: ['<i class="fas fa-angle-double-left"></i>', '<i class="fas fa-angle-double-right"></i>'],
        responsiveClass: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            800: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });
    $('.reviews__carousel').owlCarousel({
        loop: true,
        smartSpeed: 700,
        items: 1,
        center: true,
    })
    $('.partners-carousel').owlCarousel({
        loop: true,
        smartSpeed: 700,
        items: 4,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            580: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })



    function serviceContent() {
        $('.services-item').each(function () {
            var t = $(this);
            var h = t.find('.services-content').outerHeight();
            t.find('.services-item__img').css('min-height', h);
        })
    }
    // setTimeout(serviceContent, 500);
    serviceContent();
});
$(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut('slow');
})