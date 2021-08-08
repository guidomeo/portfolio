const audio_page = new Audio();
audio_page.src = "audio/page.mp3";
audio_page.preload = 'auto';
const audio_menu = new Audio();
audio_menu.src = "audio/menu.mp3";
audio_menu.preload = 'auto';

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

const age = document.getElementById('age');
age.innerHTML = getAge("03/31/1996");

function goToPage(str) {
	location.hash = str;

	const page = document.getElementById(str+'_page');
	
	if (page != null) {
		page.style.display = 'block';
		page.style.opacity = 1;
		audio_page.play();

		hideMenu();
	}
}


function menu() {
	location.hash = "";

	audio_menu.play();

	const pages = document.getElementsByClassName('page');
	for (var i = 0; i < pages.length; i++) {

		pages[i].style.opacity = 0;
		const page = pages[i];
		setTimeout(function() { page.style.display = 'none'; }, 500);
	}
	const page = document.getElementById('menu_page');
	page.style.display = 'block';
	page.style.opacity = 1;

	const title = document.getElementById('title');
	title.style.marginTop = '7vh';
	title.style.cursor = 'default';

	document.getElementsByTagName("h1")[0].style.fontSize = getComputedStyle(document.documentElement).getPropertyValue('--max-h1');

	const h2 = document.getElementsByTagName("h2")[0];
	h2.style.fontSize = getComputedStyle(document.documentElement).getPropertyValue('--max-h2');
	h2.style.visibility = 'visible';
	h2.style.opacity = 1;

	document.getElementsByTagName("body")[0].style.overflowY = 'hidden';
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

	/*const footer = document.getElementsByTagName("footer")[0];
	footer.style.visibility = 'visible';
	footer.style.opacity = 1;*/
}

function hideMenu() {
	const page = document.getElementById('menu_page');
	page.style.opacity = 0;
	setTimeout(function() { page.style.display = 'none'; }, 500);

	const title = document.getElementById('title');
	title.style.marginTop = '5vh';
	title.style.cursor = 'pointer';

	document.getElementsByTagName("h1")[0].style.fontSize = getComputedStyle(document.documentElement).getPropertyValue('--min-h1');

	const h2 = document.getElementsByTagName("h2")[0];
	h2.style.fontSize = getComputedStyle(document.documentElement).getPropertyValue('--min-h2');
	h2.style.visibility = 'hidden';
	h2.style.opacity = 0;

	document.getElementsByTagName("body")[0].style.overflowY = 'scroll';

	/*const footer = document.getElementsByTagName("footer")[0];
	footer.style.visibility = 'hidden';
	footer.style.opacity = 0;*/
}

window.onhashchange = function() {
	
	const str = location.hash.replace('#','');
	
	if (str == "") {
		menu();
	}
	else
	{
		goToPage(str);
	}
};

const str = location.hash.replace('#','');
if (str != "") {
	goToPage(str);
}


new Slideshow('double_slideshow', 3500);
new Slideshow('rotate_slideshow', 3500);
new Slideshow('roundpong_slideshow', 3500);