function goToPage(id) {
    document.getElementById("bottom_menu").style.display = "none";

    let numberOfPages = 4;

    for(let i=1; i<=numberOfPages; i++)
    {
      let pageElem = document.getElementById("page"+i);
      let buttonElems = document.querySelectorAll(".button"+i);

      let visible = (i == id);

      pageElem.style.display = visible ? "block" : "none";

      buttonElems.forEach(e => e.classList.remove("isDisabled"));
      
      if (visible) {
        document.getElementById("bottom_menu").style.display = "block";
        buttonElems.forEach(e => e.classList.add("isDisabled"));
        pageElem.scrollIntoView({behavior: "smooth"});
      }
    }
}


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
   elem.play();

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
fitText(document.querySelectorAll("h3"), 1.4);

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

  let interval = setInterval(()=>{
    if(element.readyState >= 3){
      currentPercentage -= loadedPercentage;
      loadedPercentage = 100;
      currentPercentage += loadedPercentage;
      current++;
      updateLoading();
      clearInterval(interval);
      return;
    }  

    if (element.buffered.length == 0) return;
    currentPercentage -= loadedPercentage;
    loadedPercentage = (element.buffered.end(0) / element.duration) * 100;
    if (isNaN(loadedPercentage)) {
      loadedPercentage = 0;
      return;
    }
    currentPercentage += loadedPercentage;
    updateLoading();
},300);
});

function id(v){ return document.getElementById(v); }

let ovrl = id("overlay");
let prog = id("progress");
let stat = id("progstat");

function updateLoading() {
  var perc = Math.round(currentPercentage / total) + "%";
  prog.style.width = perc;
  stat.innerHTML = "Loading "+ perc;

  if (current == total) {
    setTimeout(function(){
      document.body.style.overflow = 'visible';
      document.body.style.overflow = 'overlay';
      ovrl.style.opacity = 0;
      ovrl.style.display = "none";
      goToPage(-1);
    }, 1200);
  }
}