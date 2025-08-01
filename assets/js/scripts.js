function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}  

docReady(function() {
    // hides invisible content from screen readers
    function setAriaHidden(index, swiper) {
        index = (index && index >= 3) ? 0 : (index && index <= -1) ? 2 : index;
        let currentSlide = 	swiper.slides[index];
        currentSlide.setAttribute("aria-hidden", false)
        let counter = 2;
        do {
            if (counter != index) {
                swiper.slides[counter].setAttribute("aria-hidden", true)
            }
            counter--;
        } while(counter != -1);
    }

    // defines aria-label text
    function allyText(force_index = false) {
        let index = (force_index >= -1) ? force_index : (text_swiper && text_swiper.hasOwnProperty('activeIndex')) ? text_swiper.activeIndex : 0;
        
        let ally_text;
        switch (index) {
            case 0:
                ally_text = "Robert Family Slide";
                break;
            case 1:
                ally_text = "Mason Family Slide";
                break;
            case 2:
                ally_text = "Smith Family Slide";
                break;

            case -1:
            case 3:
                ally_text = "None";
                break;
            default:
                break;
        }
        return ally_text;
    }

    // slider for the images
    img_swiper = new Swiper('.img-slider.swiper', {
        a11y: {
            prevSlideMessage: 'Previous slide: none',
            nextSlideMessage: 'Next slide: ' + allyText(1),
            firstSlideMessage: 'This is the ' + allyText(0) + '.',
            lastSlideMessage: 'This is the ' + allyText(2) + '.',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },

            1100: {
                slidesPerView: 1.1,
                slidesOffsetAfter: 120,

            },
        },
        initialSlide: 0,
        on: {
			afterInit: function () {
                let activeIndex = parseInt(this.activeIndex);
				setAriaHidden(activeIndex, this);
				this.slides[0].ariaLabel = allyText(0);
				this.slides[1].ariaLabel = allyText(1);
				this.slides[2].ariaLabel = allyText(2);
		        this.pagination.bullets[0].ariaLabel = "jump to the " + allyText(0);
		        this.pagination.bullets[1].ariaLabel = "jump to the " + allyText(1);
		        this.pagination.bullets[3].ariaLabel = "jump to the " + allyText(2);
			},
			slideChange: function () {
                let activeIndex = parseInt(this.activeIndex);
				setAriaHidden(activeIndex, this);
		        this.pagination.bullets[0].ariaLabel = "jump to the " + allyText(0);
		        this.pagination.bullets[1].ariaLabel = "jump to the " + allyText(1);
		        this.pagination.bullets[3].ariaLabel = "jump to the " + allyText(2);
            },
            slideChangeTransitionEnd: function () {
                let activeIndex = parseInt(this.activeIndex);
				setAriaHidden(activeIndex, this);
            },
		},
        pagination: {
            el: '.swiper-pagination',
		    clickable: true,
        },
        spaceBetween: 30,
    });

    // slider for the text on the left
    text_swiper = new Swiper('.text-slider.swiper', {
        a11y: {
            prevSlideMessage: 'Previous slide: none',
            nextSlideMessage: 'Next slide: ' + allyText(1),
            firstSlideMessage: 'This is the ' + allyText(0) + '.',
            lastSlideMessage: 'This is the ' + allyText(2) + '.',
        },
        autoplay: {
            delay: 12000
        },
        centeredSlides: true,
        controller: {
            control: img_swiper
        },
        initialSlide: 0,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1,
        on: {
            afterInit: function () {
                let activeIndex = parseInt(this.activeIndex);
				setAriaHidden(activeIndex, this);
				this.slides[0].ariaLabel = allyText(0);
				this.slides[1].ariaLabel = allyText(1);
				this.slides[2].ariaLabel = allyText(2);
			},
			slideChange: function () {
                let activeIndex = parseInt(this.activeIndex);
				setAriaHidden(activeIndex, this);
			},
            slideChangeTransitionEnd: function () {
                let activeIndex = parseInt(this.activeIndex);
				setAriaHidden(activeIndex, this);
                this.navigation.prevEl.ariaLabel = 'Previous slide: ' + allyText(activeIndex - 1);
                this.navigation.nextEl.ariaLabel = 'Next slide: ' + allyText(activeIndex + 1);
            },
        },
    });

    img_swiper.controller.control = text_swiper;

    //swiper has some bug that causes it to add an extra button, this removes the button that is not in use
    let last_pagination_button = document.querySelector(".img-slider .swiper-pagination-bullet:nth-of-type(4)");
    (last_pagination_button) ? last_pagination_button.parentElement.removeChild(last_pagination_button.previousSibling) : false;

});



