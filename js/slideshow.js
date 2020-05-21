class Slideshow {
    constructor(htmlclass, transitionTime) {
        this.slides = document.getElementsByClassName(htmlclass);

        this.current = -1;
        this.next();

        const self = this;

        this.interval = setInterval(function(){self.next();}, transitionTime);

        for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].style.transition = '1.5s';
            this.slides[i].style.cursor = 'pointer';
            this.slides[i].addEventListener("click", function(){

                clearInterval(self.interval);

                self.next();

                self.interval = setInterval(function(){self.next();}, transitionTime);

            });
        }
    }

    next() {
        this.current = (this.current + 1) % this.slides.length;
        for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].style.visibility = 'hidden';
            this.slides[i].style.opacity = 0;
        }
        this.slides[this.current].style.visibility = 'visible';
        this.slides[this.current].style.opacity = 1;
    }
}