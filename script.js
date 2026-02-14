$(document).ready(function(){
    // Initialize flipbook
    $("#book").turn({
        width: 800,
        height: 600,
        autoCenter: true,
        gradients: true,
        elevation: 50,
        when: {
            turned: function(event, page, view) {
                // optional: could trigger something on page flip
            },
            start: function(event) {
                // optional: could trigger something on start
            }
        }
    });

    // Navigation Buttons
    $('#prev').click(function(){
        $("#book").turn('previous');
    });

    $('#next').click(function(){
        $("#book").turn('next');
    });

    // Fade-in background music automatically on page load
    var audio = document.getElementById('bg-music');
    
    // Try to play immediately (some browsers may block)
    audio.volume = 0;
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Music started successfully
                fadeInMusic(audio, 5000); // 5-second fade-in
            })
            .catch(() => {
                // Browser blocked autoplay, fall back to first click
                $(document).one('click', function(){
                    audio.play();
                    fadeInMusic(audio, 5000);
                });
            });
    }

    // Function to fade in music
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


