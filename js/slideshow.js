 let slideIndex = 1;
    function showSlide(n) {
        const slides = document.getElementsByClassName('slide');
        const dots = document.getElementsByClassName('dot');
        if (!slides.length) return;
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        for (let i = 0; i < slides.length; i++) slides[i].classList.remove('active');
        for (let i = 0; i < dots.length; i++) dots[i].classList.remove('active');
        slides[slideIndex - 1].classList.add('active');
        if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add('active');
    }
    window.changeSlide = (n) => { slideIndex += n; showSlide(slideIndex); };
    window.currentSlide = (n) => { slideIndex = n; showSlide(slideIndex); };
    showSlide(slideIndex);