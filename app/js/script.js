$(function(){

    $('.menu__linck').on('click', function(e){
        e.preventDefault();
        $('html,body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);

        $('.menu__linck').removeClass('active');
        $(this).addClass('active');

        if($(window).width() <= 760 && $('#menu-toggle').is(':checked')) {
            $('.menu-button').trigger('click');
        }
      
    });
    
});

ScrollReveal().reveal('.nav-wrapp', { delay: 600, distance: '60px', duration: 500, origin: 'top' });

ScrollReveal().reveal('.offer', { delay: 1200, distance: '100%', duration: 500, origin: 'left' });
ScrollReveal().reveal('.main-header__img', { delay: 1200, distance: '60px', duration: 500, origin: 'right' });

ScrollReveal().reveal('.about-me__block', { delay: 500, distance: '60px', duration: 500, origin: 'left' });

ScrollReveal().reveal('.love', { delay: 500, distance: '60px', duration: 500, origin: 'bottom'});
ScrollReveal().reveal('.finances', { delay: 500, distance: '60px', duration: 500, origin: 'bottom' });

$('.reviews-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 300,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  });

  $('.accordion__header').on('click', function(){
    $(this).toggleClass('showed');
    $(this).next('.accordion__body').slideToggle(400);
  });