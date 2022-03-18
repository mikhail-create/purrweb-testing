const slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next'),
    dotItems = document.getElementById('dots');

function slide(slider, items, prev, next, dotsItems) {
    let posInitial,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        dots = dotsItems.getElementsByClassName('dot'),
        dotsLenght = dots.length,
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        dot = 0,
        allowShift = true;

    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    slider.classList.add('loaded');

    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    function configureDots() {
        for (dot; dot < dotsLenght; dot++) {
            let temp = dot + 1
            dots[dot].addEventListener('click', function () { showSlide(temp) });
        }
    }

    function recolorDots() {
        for (let dot = 0; dot < dotsLenght; dot++) {
            if (dot == index) {
                dots[dot].classList.add('active')
            } else {
                dots[dot].classList.remove('active')
            }
        }
    }

    function showSlide(n) {
        index = n - 1;
        recolorDots(index)
        items.style.left = -(n * slideSize) + "px";
    }

    function shiftSlide(dir) {
        if (allowShift) {
            posInitial = items.offsetLeft;

            if (dir === 1) {
                if (index === slidesLength - 1) {
                    items.style.left = "-400px";
                    index = 0;
                    recolorDots()
                } else {
                    items.style.left = (posInitial - slideSize) + "px";
                    index++;
                    recolorDots()
                }
            } else if (dir === -1) {
                if (index === 0) {
                    items.style.left = -(slidesLength * slideSize) + "px";
                    index = slidesLength - 1;
                    recolorDots()
                } else {
                    items.style.left = (posInitial + slideSize) + "px";
                    index--;
                    recolorDots()
                }
            }
        };
        allowShift = false;
        next.classList.add('disabled');
        prev.classList.add('disabled');
        setTimeout(() => {
            allowShift = true;
            next.classList.remove('disabled');
            prev.classList.remove('disabled');
        }, 1000);
    }
    recolorDots()
    configureDots()
}
slide(slider, sliderItems, prev, next, dotItems);