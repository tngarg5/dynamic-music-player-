//Mapping audio without id
const music = document.querySelector('audio');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Anthing1',
        artist: 'Someone1'
    },
    {
        name: 'jacinto-2',
        displayName: 'Anthing2',
        artist: 'Someone2'
    },
    {
        name: 'jacinto-3',
        displayName: 'Anthing3',
        artist: 'Someone3'
    }

];

// Play Pause functions
let isPalying = false;
// play
function palyAudio() {
    isPalying = true;
    playBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
//   pause
function pauseAudio() {
    isPalying = false;
    playBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event listner
playBtn.addEventListener('click', () => (isPalying ? pauseAudio() : palyAudio()));

//Update DOM (add the array values to DOM)(dynamic loading from folder)
function loadsongs(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
// current Song
let songIndex = 0;

// Prev song function
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadsongs(songs[songIndex]);
    palyAudio();
}


// next song function
function nextSong() {
        songIndex++;
        // console.log(songIndex);
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }
        loadsongs(songs[songIndex]);
        palyAudio();
    
}
// Update progress bar and time
function updateProgressBar(e){
    if(isPalying){
        const{duration, currentTime} = e.srcElement;
        console.log(duration, currentTime);
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds < 10){
            durationSeconds=`0${durationSeconds}`;
           }
           if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
           }

        //    calculating current time in text
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds < 10){
            currentSeconds=`0${currentSeconds}`;
           }
           if(currentSeconds){
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
           }

        
    }
}
//    functionality to jump on any part of song
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}

//OnLoad
loadsongs(songs[songIndex]);

// eventListeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

