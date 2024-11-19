//gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

const swiperEl = document.querySelector(".environments-panels");
Object.assign(swiperEl, {
	slidesPerView: 1,
	parallax: true,
	speed: 1200,
	scrollbar: true,
	updateOnWindowResize: true,
	//grabCursor: true,
	// loop: true,
	//effect: "slide",
	pagination: {
		clickable: true,
	},
	direction: "vertical",
	mousewheelControl: true,
	// mousewheel: {
	// 	target: ".environments-panels",
	// 	forceToAxis: true,
	// 	releaseOnEdges: true,
	// },
	// mousewheelControl: true,
	touchReleaseOnEdges: true,
	//longSwipes: false,
	a11y: {
		prevSlideMessage: "Previous slide",
		nextSlideMessage: "Next slide",
	},
	//preventInteractionOnTransition: true,
	autoHeight: true,
	// breakpoints: {
	// 	1024: {
	// 		direction: "vertical",
	// 		// draggable: true,
	// 		mousewheel: {
	// 			// target: ".environments-panels",
	// 			forceToAxis: true,
	// 			releaseOnEdges: true,
	// 		},
	// 		autoHeight: true,
	// 		pagination: false,
	// 	},
	// },
});
swiperEl.initialize();


var swiper = new Swiper(".swiper-container", {
	slidesPerView: 3,
	spaceBetween: 3,
	mousewheelControl: true,
	parallax: true,
	freeMode: true,
	speed: 600,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});