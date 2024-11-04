gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);


/**
Entry Module. ALL RESOLUTIONS.
 */
let wordsTags = {
	slides: gsap.utils.toArray(".item-tag"),
	list: gsap.utils.toArray(".tags-slider"),
	duration: 0.3,
	lineHeight: 40
}

let wordsSlide = gsap.timeline({
	paused: true,
	repeat: -1,
});

wordsTags.slides.forEach(function (slide, i) {
	let label = "slide + i";
	wordsSlide.add(label);

	if (i > 0) {
		wordsSlide.to(
			wordsTags.list,
			{
				duration: wordsTags.duration,
				y: i * -1 * wordsTags.lineHeight,
			},
			label
		);

		let letters = document.querySelectorAll(".tags-slider .item-tag");
		wordsSlide.from(
			letters,
			{
				duration: wordsTags.duration,
				y: 40,
				stagger: wordsTags.duration / 10,
			},
			label
		);
		wordsSlide.to({}, { duration: 1 });
	}
})


//wordsSlide.play();
function icoHoverOn() {
	wordsSlide.play();
}

function icoHoverOff() {
	wordsSlide.pause();
}


// const itemEnv = document.querySelectorAll(".env-indicator li");
// itemEnv.forEach(function(item) {
// 	const tags = item.querySelector(".tags-slider");
// 	const tlTags = gsap.timeline({
// 		paused: true
// 	});
// 	tlTags.from(tags, {
// 		autoAlpha: 0,
// 		duration: 1
// 	});
// 	item.addEventListener("mouseenter", function () {
// 		tlTags.play();
// 	});
// 	item.addEventListener("mouseleave", function () {
// 		tlTags.pause();
// 	});

// });

const icoEnv = document.querySelectorAll(".env-indicator li");

const tlDynamicEnvModule = gsap.timeline({
	scrollTrigger: {
		trigger: "#dynamicsEnvironments",
		start: "-100px bottom",
        toggleActions: "restart none none none",
	},
	defaults: {
		duration: 0.75,
		
	},
});

tlDynamicEnvModule
	.from("#dynamicsEnvironments", {
		autoAlpha: 0,
		y: 100,
		ease: "power1.inOut",
	})
	.from(".mod-user", {
		autoAlpha: 0,
		scale: 0.85,
		ease: "power",
	})
	.from(
		".arc",
		{
			autoAlpha: 0,
			rotate: -45,
			transformOrigin: "center center",
			ease: "power",
			duration: 1,
		},
		">-0.5"
	)
	.from(icoEnv, {
		autoAlpha: 0,
		xPercent: -10,
		stagger: 0.1,
		duration: 1,
		ease: "sine.out"
	},">-0.5");


/**
Navigation. ALL RESOLUTIONS.
 */
const panelEnv = gsap.utils.toArray(".environments .env");

// window.addEventListener("DOMContentLoaded", () => {
// 	const observer = new IntersectionObserver((entries) => {
// 		entries.forEach((entry) => {
// 			const id = entry.target.getAttribute("id");
// 			if (entry.intersectionRatio > 0) {
// 				document
// 					.querySelector(`.env-indicator li a[data="#${id}"]`)
// 					.classList.add("active");
// 			} else {
// 				document
// 					.querySelector(`.env-indicator li a[data="#${id}"]`)
// 					.classList.remove("active");
// 			}
// 		});
// 	});
// 	document.querySelectorAll(".env-indicator li[id]").forEach((panelEnv) => {
// 		observer.observe(panelEnv);
// 	});
// });

/** 
Desktop View
 */
let mm = gsap.matchMedia(),
	breakpoint = 1024;

mm.add(
	{
		isDesktop: `(min-width: ${breakpoint}px)`,
		isMobile: `(max-width: ${breakpoint - 1}px)`,
	},
	(context) => {
		let { isDesktop, isMobile } = context.conditions;

		/** Animations */
		let environments = document.querySelectorAll(".environments .env"),
			outerWrappers = gsap.utils.toArray(".environments .env .outer"),
			innerWrappers = gsap.utils.toArray(".environments .env .inner"),
			headings = gsap.utils.toArray(".environments .env .heading"),
			intro = gsap.utils.toArray(".environments .env .intro"),
			tags = document.querySelectorAll(".environments .env-tags"),
			subtitle = document.querySelectorAll(".environments .env h3"),
			currentIndex = -1,
			wrap = gsap.utils.wrap(0, environments.length),
			animating;

		gsap.set(outerWrappers, { yPercent: isDesktop ? 100 : '', xPercent: isMobile ? 100 : '' });
		gsap.set(innerWrappers, { yPercent: isDesktop ? -100 : '', xPercent: isMobile ? -100 : '' });

		/** onClick */
		const indicators = document.querySelectorAll(
			".env-indicator .item-env, .env-indicator .dot"
		);
		
		
		/** Panel environments */
		function gotoEnvironment(index, direction) {
			index = wrap(index);
			animating = true;
			let fromTop = direction === -1,
				dFactor = fromTop ? -1 : 1,
				tlEnvironments = gsap.timeline({
					defauls: { duration: 1.25, esae: "power1.inOut" },
					onComplete: () => (animating = false),
				});
			
			if (currentIndex >= 0) {
				gsap.set(environments[currentIndex], { zIndex: 0 });
				tlEnvironments.set(environments[currentIndex], {
					autoAlpha: 0,
				});
			}
			gsap.set(environments[index], { autoAlpha: 1, zIndex: 1 });
			tlEnvironments
				.fromTo(
					[outerWrappers[index], innerWrappers[index]],
					{
						yPercent: isDesktop
							? (i) => (i ? -100 * dFactor : 100 * dFactor)
							: "",
						xPercent: isMobile
							? (i) => (i ? -100 * dFactor : 100 * dFactor)
							: "",
					},
					{
						yPercent: isDesktop ? 0 : "",
						xPercent: isMobile ? 0 : "",
					},
					0
				)
				.from(headings[index], {
					autoAlpha: 0,
					y: 30,
					ease: "power2",
					duration: 1,
				})
				.from(intro[index], {
					autoAlpha: 0,
					y: 30,
					ease: "power2",
					duration: 1,
				}, "<")
				.from(subtitle[index], {
					autoAlpha: 0,
					y: 30,
					ease: "power2",
					duration: 1
				}, "<")
				.from(tags[index], {
					autoAlpha: 0,
					y: 30,
					ease: "power2",
					duration: 1,
				}, "<")
				;

			currentIndex = index;
		}

		Observer.create({
			target: "#dynamicsEnvironments",
			type: "wheel,touch,pointer",
			wheelSpeed: -1,
			onDown: () => !animating && gotoEnvironment(currentIndex - 1, -1),
			onUp: () => !animating && gotoEnvironment(currentIndex + 1, 1),
			tolerance: 10,
			preventDefault: true,
		});

		gotoEnvironment(0, 1);

		Array.from(indicators).forEach(function (dot, i) {
			dot.addEventListener("click", function () {
				if (i === 0) {
					console.log('Indicator:', i);
					gotoEnvironment(1, 1);
				}
				if (i === 1) {
					console.log("Indicator:", i);
					gotoEnvironment(2, 1);
				}
				if (i === 2) {
					console.log("Indicator:", i);
					gotoEnvironment(3, 1);
				}
				if (i === 3) {
					console.log("Indicator:", i);
					gotoEnvironment(4, 1);
				}
			});
		});
		/** End Animations */

		// onUserPanelMobile();
		// window.addEventListener("resize", onUserPanelMobile());

	}
);


/** User Panel Mobile */
function userPanelMobile() {
	let userPanel = document.getElementById("userPanel");
	let panelPresentation = document.getElementById("panelPresentation");
	let panelDesktop = document.getElementById("userPanelDesktop");

	if (window.innerWidth < 1024) {
		panelPresentation.append(userPanel);
	} else {
		console.log("Es Deskopt")
		panelDesktop.append(userPanel);
	}
}
window.addEventListener("resize", userPanelMobile);




