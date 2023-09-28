//initialize variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressbar');
let songItems= Array.from(document.getElementsByClassName('songItem'));
let gif=document.getElementById('gif');
let masterSongName= document.getElementById('masterSongName');
let songs =[
    {songName:"Believer",filePath :"songs/1.mp3",coverPath:"covers/cover 1.png"},
    {songName:"Unstoppable",filePath :"songs/2.mp3",coverPath:"covers/cover 2.png"},
    {songName:"Kesariya Tera",filePath :"songs/3.mp3",coverPath:"covers/cover 3.png"},
    {songName:"Khairiyat Pucho",filePath :"songs/4.mp3",coverPath:"covers/cover 4.png"},
    {songName:"Apna Banale",filePath :"songs/5.mp3",coverPath:"covers/cover 5.png"},
    {songName:"Agar Tum Saath ho",filePath :"songs/6.mp3",coverPath:"covers/cover 6.png"},
    {songName:"Master the Blaster",filePath :"songs/7.mp3",coverPath:"covers/cover 7.png"},
    {songName:"Chitti Story",filePath :"songs/8.mp3",coverPath:"covers/cover 8.png"},
    {songName:"Aradhya - Khushi",filePath :"songs/9.mp3",coverPath:"covers/cover 9.png"},
    {songName:"Heeriye Heeriye",filePath :"songs/10.mp3",coverPath:"covers/cover 10.png"},
]
// audioElement.play()
songItems.forEach((element,i)=>{
    //console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})
masterSongName.style.opacity=0;
//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        masterSongName.innerText=songs[songIndex].songName;
        masterSongName.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        masterSongName.innerText=songs[songIndex].songName;
        masterSongName.style.opacity=0;

    }
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
      console.log('timeupdate');
      //update seekbar
       progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
       myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})   
//display pause only for songs which are clicked
const makeAllPlay=()=>{
       Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
       })
} 
const makemasterPlay=()=>{
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
}
const makemasterPause=()=>{
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
}
//play button in main page
let mainplay = Array.from(document.getElementsByClassName('songItemplay'));//play button in each song
mainplay.forEach((element)=>{
         element.addEventListener('click',(e)=>{
             makeAllPlay();
        if(audioElement.paused){
         songIndex=parseInt(e.target.id);
         e.target.classList.remove('fa-circle-play');
         e.target.classList.add('fa-circle-pause');
         audioElement.src=`songs/${songIndex+1}.mp3`;
         audioElement.currentTime=0;
         audioElement.play();
         makemasterPause();
         gif.style.opacity=1;
         masterSongName.innerText=songs[songIndex].songName;
         masterSongName.style.opacity=1;
        }
        else{
             audioElement.pause();
             e.target.classList.remove('fa-circle-pause');
             e.target.classList.add('fa-circle-play');
             makemasterPlay();
             gif.style.opacity=0;
             masterSongName.innerText=songs[songIndex].songName;
             masterSongName.style.opacity=0;
        }
        })
})
let previous=document.getElementById('previous');
let next=document.getElementById('next');
previous.addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterSongName.innerText=songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
    masterSongName.style.opacity=1;
})
next.addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
   audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterSongName.innerText=songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
    masterSongName.style.opacity=1;
})



