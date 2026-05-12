score = 0;
cross = true;
let gameEnded = false;
let isPaused = false;

let audiogoPlayed = false;
let audio = new Audio('stbg.mp3');
audio.loop = true;
let audiogo = new Audio('look-away.mp3');


window.addEventListener("load", () => {
    audio.play().catch(() => {
        const unlock = () => {
            audio.play();
            window.removeEventListener('keydown', unlock);
            window.removeEventListener('mousedown', unlock);
        };
        window.addEventListener('keydown', unlock);
        window.addEventListener('mousedown', unlock);
    });
});



const savedMuteStatus = localStorage.getItem('isMuted') === 'true';

if (savedMuteStatus) {
    audio.muted = true;           
    audiogo.muted = true;             
}


function forcePlay() {
    if (window.AudioContext || window.webkitAudioContext) {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        if (context.state === 'suspended') {
            context.resume();
        }
    }

    audio.play().then(() => {
        console.log("Success! Audio is playing.");
        window.removeEventListener('keydown', forcePlay);
        window.removeEventListener('mousedown', forcePlay);
        window.removeEventListener('touchstart', forcePlay);
    }).catch(err => {
        console.log("Still waiting for a real click or keypress...");
    });
}

window.addEventListener('keydown', forcePlay);
window.addEventListener('mousedown', forcePlay);
window.addEventListener('touchstart', forcePlay);
window.addEventListener('load', forcePlay);




document.onkeydown = function (e) {
    console.log("Key code is : ", e.keyCode);
    if (e.keyCode === 38) {
        let steve = document.querySelector('.steve');
        if (!steve) return; 
        steve.classList.add('animateSteve');
        setTimeout(() => {
            steve.classList.remove('animateSteve')
        }, 700)
    }
    if (e.keyCode === 39) {
        let steve = document.querySelector('.steve');
        steveX = parseInt(window.getComputedStyle(steve, null).getPropertyValue('left'));
        steve.style.left = steveX + 112 + "px";   
    }
    if (e.keyCode === 37) {
        let steve = document.querySelector('.steve');
        let steveX = parseInt(window.getComputedStyle(steve, null).getPropertyValue('left'));
        steve.style.left = (steveX - 112) + "px";  
    }

}

setInterval(() => {
    if (isPaused) return; 

    let steve = document.querySelector('.steve');
    gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    if (!steve || !obstacle) return; 

    sx = parseInt(window.getComputedStyle(steve, null).getPropertyValue('left'));    
    sy = parseInt(window.getComputedStyle(steve, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));  
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(sx - ox);         
    offsetY = Math.abs(sy - oy);       



    if (offsetX < 73 && offsetY < 75) {
        if (!gameEnded) {
            gameEnded = true;    

            let overContainer = document.querySelector('#pauseOverlay-over');
            overContainer.classList.remove('hidden');
            overContainer.style.display = 'flex';

            let scoreDisplay = overContainer.querySelector('.score-display');
            scoreDisplay.innerHTML = "Your Score: " + score;


            obstacle.classList.remove('obstacleAni');              


            if (!audiogoPlayed) {
                audiogo.play();
                audiogoPlayed = true;

            }

            setTimeout(() => {
                audiogo.pause();
            }, 1000);

            setTimeout(() => {
                audio.pause();
            }, 100);
        }
    }



    else if (offsetX < 145 && offsetY > 80 && cross && !gameEnded) {    
        score += 1;
        updateScore(score);
        cross = false;                 
        setTimeout(() => {
            cross = true;             
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));  

            // newDur = aniDur - 0.1;                                                                                
            if(score < 17) {
                let newDur = aniDur -0.1;

                if(newDur < 0.5)newDur = 0.5;

                obstacle.style.animationDuration = newDur + 's';                                                     
                console.log('New Animation Duration: ', newDur);
            }
            
        }, 500);

    }

}, 10)






function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}


const pauseBtn = document.getElementById("pauseBtn");
const pauseOverlay = document.getElementById("pauseOverlay");
const resumeBtn = document.getElementById("resumeBtn");
const restartBtn = document.getElementById("restartBtn");



pauseBtn.addEventListener("click", function () {
    isPaused = true;

    pauseOverlay.style.display = "flex";

    let obstacle = document.querySelector('.obstacle');
    let steve = document.querySelector('.steve');

    obstacle.style.animationPlayState = 'paused';

    let steveX = window.getComputedStyle(steve).getPropertyValue('left');       
    steve.style.left = steveX;

    steve.classList.remove('animateSteve');
});


resumeBtn.addEventListener("click", function () {
    isPaused = false;

    pauseOverlay.style.display = "none";

    let obstacle = document.querySelector('.obstacle');

    obstacle.style.animationPlayState = 'running';
});

restartBtn.addEventListener("click", function () {
    location.reload(); 
});




const backBtn = document.querySelector('#backBtn');

backBtn.addEventListener('click', () => {
    {
        window.location.href = 'index.html'
    }
})