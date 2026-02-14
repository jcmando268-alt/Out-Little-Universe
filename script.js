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
    
    // Fade-in music function
function fadeInMusic(audioElement, duration){
    audioElement.volume = 0; // start muted
    audioElement.play().catch(()=>{}); // attempt play
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

// Music element
var audio = document.getElementById('bg-music');

// Try autoplay first
var playPromise = audio.play();
if(playPromise !== undefined){
    playPromise
        .then(()=>fadeInMusic(audio, 5000)) // autoplay allowed
        .catch(()=> {
            // Autoplay blocked → wait for first click
            $(document).one('click', function(){
                fadeInMusic(audio, 5000);
            });
        });
}

});

