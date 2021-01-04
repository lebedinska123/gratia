
$(document).ready(function() {
    var currentPosition = 0;
    var prevPosition = null;
    var slides = $('.offer-slider__img');
    var numberOfSlides = slides.length;
    var marginLeft;

    var sliderNumNavigation = $(".slider-number__item");
    
    $(slides[currentPosition]).css({"opacity": "1"});
    $(sliderNumNavigation[currentPosition]).css({"color": "#c58e5e"});
    
    $('#slidesContainer').css('overflow', 'hidden');

    $('.offer-wrapper')
        .prepend('<div class="arrow arrow-left" id="leftControl"></div>')
        .append('<div class="arrow arrow-right" id="rightControl"></div>');


    function moveRight(prevPosition, currentPosition) {
        $(slides[prevPosition]).animate({
            marginLeft: "100%",
            opacity: 0,
        }, duration = 700, complete = function() {
            $(slides[prevPosition]).css({"marginLeft": marginLeft});
        });
    };

    function moveLeft(prevPosition, currentPosition) {
        $(slides[prevPosition]).animate({
            marginLeft: "-100%",
            opacity: 0,
        }, duration = 700, complete = function() {
            $(slides[prevPosition]).css({"marginLeft": marginLeft});
        });
    };

    function moveFade(prevPosition, currentPosition) {
        $(slides[prevPosition]).animate({
            opacity: 0,
        }, duration = 700);
    };

    sliderNumNavigation.bind('click', function(event) {
        prevPosition = currentPosition;
        currentPosition = Number(event.target.innerHTML) - 1;

        $(sliderNumNavigation[currentPosition]).css({"color": "#c58e5e"});
        $(sliderNumNavigation[prevPosition]).css({"color": "#ffffff"});

        moveFade(prevPosition, currentPosition);
        $(slides[currentPosition]).animate({
            opacity: 1,
        }, duration=700);
    });

    $('.arrow').bind('click', function() {
        // Определение новой позиции
        prevPosition = currentPosition;
        currentPosition = ($(this).attr('id')=='rightControl') ? (currentPosition+1)%numberOfSlides : (currentPosition-1+numberOfSlides)%numberOfSlides;

        marginLeft = $(slides[prevPosition]).css("marginLeft");

        $(sliderNumNavigation[currentPosition]).css({"color": "#c58e5e"});
        $(sliderNumNavigation[prevPosition]).css({"color": "#ffffff"});


        // Move slideInner using margin-left
        $(this).attr('id') == 'rightControl' ? (moveRight(prevPosition, currentPosition)) : (moveLeft(prevPosition, currentPosition))

        $(slides[currentPosition]).animate({
            opacity: 1,
        }, duration=700);
    });

    // Auto slider
    function autoSlider() {
        setInterval(function() {
            prevPosition = currentPosition;
            currentPosition = ($(this).attr('id')=='rightControl') ? (currentPosition+1)%numberOfSlides : (currentPosition-1+numberOfSlides)%numberOfSlides;
            
            $(sliderNumNavigation[currentPosition]).css({"color": "#c58e5e"});
            $(sliderNumNavigation[prevPosition]).css({"color": "#ffffff"});
            
            moveFade(prevPosition, currentPosition);
            $(slides[currentPosition]).animate({
                opacity: 1,
            }, duration=700);

        }, 7000);

    }

    if($(window).width() <= 576) {
        autoSlider();
    }


    // Move to next section arrow-down
    $(".arrow-down").bind('click', function() {
        event.preventDefault();
        var sc = $(this).attr("href");
        var dn = $(sc).offset().top;

        $('html, body').animate({scrollTop: dn}, 600);
    });

    // Open mobile menu
    $(".mobile-menu-btn").bind("click", function() {
        $(".mobile-menu").css({"display": "flex"});
        $("body").css({"overflow": "hidden"});
    });

    $(".mobile-menu__close-btn").bind("click", function(event) {
        event.preventDefault();
        $(".mobile-menu").css({"display": "none"});
        $("body").css({"overflow": "visible"});
    });

});