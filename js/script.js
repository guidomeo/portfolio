function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function openFullscreen(elem) {

   // Load full res video
   let source = elem.firstChild
   source.setAttribute('src', source.getAttribute('src').replace("lowRes/",""));
   elem.load();

    // Go full screen
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

const age = document.getElementById('age');
age.innerHTML = getAge("03/31/1996");


new Slideshow('rotate_slideshow', 2500);
new Slideshow('roundpong_slideshow', 2500);

fitText(document.querySelector("h1"), 0.8);
fitText(document.querySelector("h2"), 1.2);
document.querySelectorAll("h3").forEach(element => {
    fitText(element, 1.4);
});

let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5

};
let callback = (entries, observer) => {
  entries.forEach(entry => {
    //if (entry.target.nodeName == "VIDEO") {
      if (entry.isIntersecting) {
        entry.target.play();
      }else{
        entry.target.pause();
      }
    //}
  })
}

let total = 0;
let current = 0;
let currentPercentage = 0;

document.querySelectorAll("video").forEach(element => {
  total++;

  element.play();

  element.addEventListener('click', function(e) {
      openFullscreen(element);
  }, false);

  let loadedPercentage = 0;
  let completed = false;

  element.addEventListener('progress', function() {
    if (completed) return;
    if (element.buffered.length == 0) return;

    currentPercentage -= loadedPercentage;
    loadedPercentage = (element.buffered.end(0) / element.duration) * 100;
    if (isNaN(loadedPercentage)) {
      loadedPercentage = 0;
      return;
    }

    currentPercentage += loadedPercentage;
    updateLoading();
    console.log(loadedPercentage +"%   " + element.firstChild.getAttribute('src'));
  });
  element.addEventListener('loadeddata', function() {
    console.log(element.readyState + " ___ " + element.firstChild.getAttribute('src'));
    if(element.readyState >= 3) {
      completed = true;
      currentPercentage -= loadedPercentage;
      loadedPercentage = 100;
      currentPercentage += loadedPercentage;
      current++;
      updateLoading();
    }
  });
});

/*document.querySelectorAll("img").forEach(element => {
  total++;

  element.addEventListener('load', function() {
    current++;
    updateLoading();
    var loadedPercentage = 100;
    currentPercentage += loadedPercentage;
    console.log(loadedPercentage +"%   " + element.src);
  });
});*/

function id(v){ return document.getElementById(v); }

let ovrl = id("overlay");
let prog = id("progress");
let stat = id("progstat");

function updateLoading() {
  var perc = Math.round(currentPercentage / total) + "%" /*+ " " + current + "/" + total*/;
  prog.style.width = perc;
  stat.innerHTML = "Loading "+ perc;

  if (current == total) {
    ovrl.style.opacity = 0;
    setTimeout(function(){ 
      ovrl.style.display = "none";
    }, 1200);
  }
}
/*
function id(v){ return document.getElementById(v); }
function loadbar() {
  var ovrl = id("overlay"),
      prog = id("progress"),
      stat = id("progstat"),
      toLoad = document.getElementsByTagName("img"),
      c = 0,
      tot = toLoad.length;
  if(tot == 0) return doneLoading();

  function toLoadLoaded(src){
    console.log(src);
    c += 1;
    var perc = ((100/tot*c) << 0) +"%";
    prog.style.width = perc;
    stat.innerHTML = "Loading "+ perc;
    if(c===tot) return doneLoading();
  }
  function doneLoading(){
    ovrl.style.opacity = 0;
    setTimeout(function(){ 
      ovrl.style.display = "none";
    }, 1200);
  }
  for(let i=0; i<tot; i++) {
    toLoad[i].onload  = () => toLoadLoaded(toLoad[i].src);
    toLoad[i].onerror = () => toLoadLoaded(toLoad[i].src);
  }    
}
document.addEventListener('DOMContentLoaded', loadbar, false);*/