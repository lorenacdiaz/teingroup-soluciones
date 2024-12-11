gsap.registerPlugin(ScrollTrigger, CSSRulePlugin, Draggable);

const tlEnvironments = gsap.timeline({
	scrollTrigger: {
		trigger: "#environments",
		start: "-100px bottom",
		toggleActions: "restart none none none",
	},
	defaults: {
		duration: 0.75,
	},
});

const panels = gsap.utils.toArray(".panel-graphic .nav-env li");
tlEnvironments.from(panels, {
	autoAlpha: 0,
	xPercent: -30,
	stagger: 0.3,
})

let userActiveAnchor = CSSRulePlugin.getRule(".nav-env li a"),
	userActive = CSSRulePlugin.getRule(".nav-env li a:after");

gsap.set(userActive, {
	cssRule: {
		opacity: 0,
		scale: 0.75,
		// backgroundColor: "#b165a5",
	},
});
const tlUserOn = gsap.timeline({
	defaults: {
		duration: 1,
		// reversed: false
		pause: true,
	},
});

tlUserOn.to(userActive, {
	cssRule: {
		opacity: 1,
		// backgroundColor: "#640656",
		scale: 1,
	},
	// yoyo: true,
	// repeat: -1,
	// ease: "elastic.out(1,0.3)",
});

Draggable.create("#avatar", {
	type: "x, y",
	dragClickables: "true"
})

function activeEnvironmentPanel() {
	let hash = window.location.hash;
	if (hash) {
		let linkClass = document.querySelectorAll(".nav-env li a");
		linkClass.forEach((x) => x.classList.remove("active-env"));
		document
			.querySelector('a[href="' + hash + '"]')
			.classList.add("active-env");
		//tlUserOn.reversed(!tlUserOn.reversed());
		tlUserOn.restart();
	}
}	

function userOnEnvironment() {
	let userMain = document.getElementById("dynamicUser");

	if (userMain.classList.contains("active-env")) {
		userMain.classList.remove("inactive-user");
	} else {
		userMain.classList.add("inactive-user");
	}
	console.log('user main', userMain);
}

window.addEventListener("hashchange", () => {
	activeEnvironmentPanel();
	userOnEnvironment();
});


document.addEventListener("DOMContentLoaded", function (event) {
	activeEnvironmentPanel();
	userOnEnvironment();
});


