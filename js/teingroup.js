gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

const tlEnvironments = gsap.timeline({
	scrollTrigger: {
		trigger: "#environments",
		start: "-100px bottom",
		toggleActions: "restart none none none",
	},
	defaults: {
		duration: 0.5,
	},
});

const panels = gsap.utils.toArray(".panel-graphic .nav-env li");
tlEnvironments.from(panels, {
	autoAlpha: 0,
	xPercent: -100,
	stagger: 0.1,
})

let userActiveAnchor = CSSRulePlugin.getRule(".nav-env li a"),
	userActive = CSSRulePlugin.getRule(".nav-env li a:after");

gsap.set(userActive, {
	cssRule: {
		opacity: 0,
		scale: 0.75,
	},
});
const tlUserOn = gsap.timeline({
	defaults: {
		duration: 1,
	},
});

tlUserOn.to(userActive, {
	cssRule: {
		opacity: 1,
		scale: 1,
	},
});

tlUserOn.pause();


const panelsEnv = gsap.utils.toArray(".panel-graphic .nav-env .env");
const tlTransitionsEnvironments = gsap.timeline({
	defaults: {
		duration: 0.3,
		ease: "sine.inOut",
	},
});

tlTransitionsEnvironments
	.from(panelsEnv, {
		autoAlpha: 1,
	})
	.to(panelsEnv, {
		autoAlpha: 0,
	})
	.from(
		"#env-end a",
		{
			autoAlpha: 0,
			scale: 0.75,
		},
		"<0.3"
	)
	.to("#env-end a", {
		autoAlpha: 1,
		scale: 1,
	});

	tlTransitionsEnvironments.pause();

function activeEnvironmentPanel() {
	let hash = window.location.hash;
	const endSlide = document.getElementById("env-end");

	if (hash) {
		let linkClass = document.querySelectorAll(".nav-env li a");
		linkClass.forEach((x) => x.classList.remove("active-env"));
		document
			.querySelector('a[href="' + hash + '"]')
			.classList.add("active-env");
		tlUserOn.restart();
	} else {
		document.getElementById("dynamicUser").classList.add("active-env");
	}

	if (hash === "#env-end") {
		
		endSlide.classList.add("show-end");
		tlTransitionsEnvironments.restart();
	} else {
		endSlide.classList.remove("show-end");
		//tlTransitionsEnvironments.reverse();
		tlTransitionsEnvironments.progress(0).pause();
		
	}
}	

function userOnEnvironment() {
	let userMain = document.getElementById("dynamicUser");

	if (userMain.classList.contains("active-env")) {
		userMain.classList.remove("inactive-user");
	} else {
		userMain.classList.add("inactive-user");
	}
}

document.addEventListener("DOMContentLoaded", function (event) {
	activeEnvironmentPanel();
	userOnEnvironment();
});

window.addEventListener("hashchange", () => {
	activeEnvironmentPanel();
	userOnEnvironment();
});
