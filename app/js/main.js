$(function() {
    $('.top__slider-list').slick({
        centerMode: false,
        centerPadding: '60px',
        slidesToShow: 1,
        // slidesToScroll: 1,
        // arrows: true,
        prevArrow: '.top__slider-btn-left',
        nextArrow: '.top__slider-btn-right',
        infinite: false,
    });

    $('.choice-client__catalog-list').slick({
        centerMode: false,
        // centerPadding: '60px',
        slidesToShow: 4,
        slidesToScroll: 4,
        // arrows: true,
        prevArrow: '.choice-client__slider-left-btn',
        nextArrow: '.choice-client__slider-right-btn',
        infinite: false,
    });
});