$(document).ready(function(){
    function initFlipbook() {
        const containerWidth = $('.book-container').width();
        const containerHeight = containerWidth * 0.75; // maintain 4:3 ratio
        $("#book").turn({
            width: containerWidth,
            height: containerHeight,
            autoCenter: true,
            gradients: true,
            elevation: 50
        });
    }

    // Initialize flipbook
    initFlipbook();

    // Reinitialize on window resize
    $(window).resize(function() {
        $("#book").turn('destroy').remove(); // remove old book
        $('.book-container').html('<div id="book">' + $('.book-container #book').html() + '</div>');
        initFlipbook();
    });

    // Navigation Buttons
    $('#prev').click(function(){
        $("#book").turn('previous');
    });

    $('#next').click(function(){
        $("#book").turn('next');
    });

    // Background music
    var audio = document.getElementById('bg-music');
    audio.volume = 0;
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => fadeInMusic(audio, 5000))
            .catch(() => {
                $(document).one('click', function(){
                    audio.play();
                    fadeInMusic(audio, 5000);
                });
            });
    }

    function fadeInMusic(audioElement, duration) {
        var stepTime = 100;
        var step = stepTime / duration;
        var fadeInterval = setInterval(function(){
            if(audioElement.volume < 1.0){
                audioElement.volume = Math.min(audioElement.volume + step, 1.0);
            } else {
                clearInterval(fadeInterval);
            }
        }, stepTime);
    }
});
