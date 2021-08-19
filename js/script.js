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

function openFullscreen(myVideo) {
    var elem = myVideo;
    console.log(elem);
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

document.querySelectorAll("video").forEach(element => {
    element.addEventListener('click', function(e) {
        openFullscreen(element);
    }, false);
});
