$(document).ready(function () {
    $('#my-menu').mmenu({
        extensions: ["theme-black", "border-none", "pagedim-black", "position-right", "fx-menu-slide", "offcanvas"],
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
});