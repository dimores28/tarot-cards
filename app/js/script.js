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