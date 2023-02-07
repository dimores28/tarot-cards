$(function(){

    $('.menu__linck').on('click', function(e){
        e.preventDefault();
        $('html,body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);

        // $('.menu__linck').removeClass('active');
        // $(this).addClass('active');

        if($(window).width() <= 760 && $('#menu-toggle').is(':checked')) {
            $('.menu-button').trigger('click');
        }
      
    });
    
});

// ScrollReveal().reveal('.nav-wrapp', { delay: 600, distance: '60px', duration: 500, origin: 'top' });

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
    centerMode: true,
    centerPadding: '60px',

    responsive: [
        {
            breakpoint: 1023,
            settings: {
                arrows: false,
                centerPadding: '40px',
                slidesToShow: 1,
                variableWidth: true,
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerPadding: '40px',
                slidesToShow: 1,
                dots: false,
            }
        }
        ]
});

  $('.accordion__header').on('click', function(){
    $(this).toggleClass('showed');
    $(this).next('.accordion__body').slideToggle(400);
  });

  // Cache selectors
var topMenu = $("#top-menu"),
topMenuHeight = topMenu.outerHeight() + 70,
// All list items
menuItems = topMenu.find("a"),
// Anchors corresponding to menu items
scrollItems = menuItems.map(function(){
  var item = $($(this).attr("href"));
  if (item.length) { return item; }
});

  // Bind to scroll
$(window).scroll(function(){

    // Get container scroll position
    // if($("#contacts")[0].offsetTop - $(this).scrollTop() < 460)
    // {
    //   topMenuHeight += 500;
    // }

    var fromTop = $(this).scrollTop() + topMenuHeight;

 
    // Get id of current scroll item
    var cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";
    // Set/remove active class
    menuItems
      .parent().removeClass("active")
      .end().filter("[href='#"+id+"']").parent().addClass("active");
 });​



 (function() {
  /**
     author: @manufosela
     2013/08/27    copyleft 2013

     ShootingStar class Main Methods:
     launch: launch shooting stars every N seconds received by              param. 10 seconds by default.
      launchStar: launch a shooting star. Received options                  object by param with:
               - dir (direction between 0 and 1)
               - life (between 100 and 400)
               - beamSize (between 400 and 700)
               - velocity (between 2 and 10)
  **/

  ShootingStar = function(id) {
    this.n = 0;
    this.m = 0;
    this.defaultOptions = {
      velocity: 8,
      starSize: 10,
      life: 300,
      beamSize: 400,
      dir: -1
    };
    this.options = {};
    id = (typeof id != "undefined") ? id : "";
    this.capa = ($(id).lenght > 0) ? "body" : id;
    this.wW = $(this.capa).innerWidth();
    this.hW = $(this.capa).innerHeight();
  };

  ShootingStar.prototype.addBeamPart = function(x, y) {
    this.n++;
    var name = this.getRandom(100, 1);
    $("#star" + name).remove();
    $(this.capa).append("<div id='star" + name + "'></div>");
    $("#star" + name).append("<div id='haz" + this.n + "' class='haz' style='position:absolute; color:#FF0; width:10px; height:10px; font-weight:bold; font-size:" + this.options.starSize + "px'>·</div>");
    if (this.n > 1) $("#haz" + (this.n - 1)).css({
      color: "rgba(255,255,255,0.5)"
    });
    $("#haz" + this.n).css({
      top: y + this.n,
      left: x + (this.n * this.options.dir)
    });
  }

  ShootingStar.prototype.delTrozoHaz = function() {
    this.m++;
    $("#haz" + this.m).animate({
      opacity: 0
    }, 75);
    if (this.m >= this.options.beamSize) {
      $("#ShootingStarParams").fadeOut("slow");
    }
  }

  ShootingStar.prototype.getRandom = function(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ShootingStar.prototype.toType = function(obj) {
    if (typeof obj === "undefined") {
      return "undefined"; /* consider: typeof null === object */
    }
    if (obj === null) {
      return "null";
    }
    var type = Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1] || '';
    switch (type) {
      case 'Number':
        if (isNaN(obj)) {
          return "nan";
        } else {
          return "number";
        }
      case 'String':
      case 'Boolean':
      case 'Array':
      case 'Date':
      case 'RegExp':
      case 'Function':
        return type.toLowerCase();
    }
    if (typeof obj === "object") {
      return "object";
    }
    return undefined;
  }

  ShootingStar.prototype.launchStar = function(options) {
    if (this.toType(options) != "object") {
      options = {};
    }
    this.options = $.extend({}, this.defaultOptions, options);
    this.n = 0;
    this.m = 0;
    var i = 0,
      l = this.options.beamSize,
      x = this.getRandom(this.wW - this.options.beamSize - 100, 100),
      y = this.getRandom(this.hW - this.options.beamSize - 100, 100),
      self = this;
    for (; i < l; i++) {
      setTimeout(function() {
        self.addBeamPart(x, y);
      }, self.options.life + (i * self.options.velocity));
    }
    for (i = 0; i < l; i++) {
      setTimeout(function() {
        self.delTrozoHaz()
      }, self.options.beamSize + (i * self.options.velocity));
    }
    $("#ShootingStarParams").html("Launching shooting star. PARAMS: wW: " + this.wW + " - hW: " + this.hW + " - life: " + this.options.life + " - beamSize: " + this.options.beamSize + " - velocity: " + this.options.velocity);
    $("#ShootingStarParams").fadeIn("slow");
  }

  ShootingStar.prototype.launch = function(everyTime) {
    if (this.toType(everyTime) != "number") {
      everyTime = 10;
    }
    everyTime = everyTime * 1000;
    this.launchStar();
    var self = this;
    setInterval(function() {
      var options = {
        dir: (self.getRandom(1, 0)) ? 1 : -1,
        life: self.getRandom(400, 100),
        beamSize: self.getRandom(700, 400),
        velocity: self.getRandom(10, 4)
      }
      self.launchStar(options);
    }, everyTime);
  }

})();

$(document).ready(function() {
  var mainAnimation = new ShootingStar("main");
  var footerAnimation = new ShootingStar("footer");

  mainAnimation.launch();
  footerAnimation.launch();
});

