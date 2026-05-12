let audio = new Audio('stbg.mp3');
audio.loop = true;


const startBtn = document.getElementById("start-G");
if (startBtn) {
    startBtn.onclick = () => {
        window.location.href = 'start.html'
    };
}



const exitBtn = document.querySelector('#exit-G');

if (exitBtn) {
    exitBtn.onclick = () => {
        window.location.href = 'https://www.google.com'
    }
}


const muteBtn = document.querySelector('#mute-unmute');

if (muteBtn) {

    muteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;

        localStorage.setItem('isMuted', audio.muted);

        if (audio.muted) {
            muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>Unmute';
        } else {
            muteBtn.innerHTML = '<i class="fa-sharp fa-solid fa-volume-up"></i>Mute';
        }
    });
}



const startAutoMusic = () => {
    audio.play().catch(error => {         
    });

    document.removeEventListener('mousemove', startAutoMusic);
    document.removeEventListener('click', startAutoMusic);
};

document.addEventListener('mousemove', startAutoMusic);
document.addEventListener('click', startAutoMusic);





const openManual = document.querySelector('.openManual');
const manualOverlay = document.querySelector('.manualOverlay');
const backBtn = document.querySelector('#backBtn');


openManual.addEventListener('click', () =>{
    manualOverlay.style.display = 'flex';
});

backBtn.addEventListener('click', () =>{
    manualOverlay.style.display = 'none';
});

window.addEventListener('click', (e)=>{
    if(e.target === manualOverlay){
        manualOverlay.style.display = 'none';
    }
});


window.addEventListener("load", () => {
    const loader = document.getElementById("loader-wrapper");
    const batTrigger = document.getElementById("audio-trigger");

    if (sessionStorage.getItem("hasLoaded")) {
        if (loader) {
            loader.style.display = "none"; 
        }
        audio.play().catch(() => console.log("Waiting for one click to resume audio"));
        return; 
    }


    setTimeout(() => {
        const batText = document.querySelector('.bat-text');
        if (batText && !sessionStorage.getItem("hasLoaded")) {
            batText.innerHTML = "SYSTEM WAITING : CLICK THE BAT TO SYNC";
            batText.style.color = "#ffff00"; 
            batText.style.textShadow = "0 0 10px #ff0000"; 
        }
    }, 5000);


    if (batTrigger) {
        batTrigger.addEventListener('click', () => {
            audio.play().then(() => {
                batTrigger.style.transition = "opacity 0.5s";
                batTrigger.style.opacity = "0";
                batTrigger.style.pointerEvents = "none";

                setTimeout(() => {
                    if (loader) {
                        loader.classList.add("loader-hidden");
                        sessionStorage.setItem("hasLoaded", "true");
                    }
                }, 2000); 
            });
        }, { once: true });
    }
});