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



ScrollReveal().reveal('.love', { delay: 500 });
ScrollReveal().reveal('.finances', { delay: 600, distance: '60px', duration: 500, origin: 'bottom' });