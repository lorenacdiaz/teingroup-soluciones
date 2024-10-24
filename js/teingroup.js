gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

// Desktop
let mm = gsap.matchMedia();
	mm.add("(min-width: 1024px)", () => {
	window.onload = function () {
		const itemsEnvironments = gsap.utils.toArray(
			document.querySelectorAll(".list-environments .item .square")
		);
		const environmentsLine = CSSRulePlugin.getRule(
			".list-environments:after"
		);

		const tlTeingroupBanner = gsap.timeline({
			scrollTrigger: {
				trigger: "#environmentsInfo",
				start: "-100px bottom",
				toggleActions: "restart none none none",
			},
			defaults: {
				duration: 0.75,
			},
		});

		tlTeingroupBanner
			.from("#environmentsInfo", {
				autoAlpha: 0,
				y: 50,
				ease: "power1.in",
			})
			.from(
				"#logo",
				{
					autoAlpha: 0,
					scale: 0.75,
					y: -10,
					ease: "back",
				},
				">-0.5"
			)
			.from(
				".rib-top",
				{
					autoAlpha: 0,
					translateX: -50,
				},
				"<"
			)
			.from(
				".rib-bottom",
				{
					autoAlpha: 0,
					translateX: -50,
				},
				"<"
			)
			.from(
				".ico-user",
				{
					autoAlpha: 0,
					scale: 0.5,
					duration: 0.5,
					stagger: 0.2,
				},
				">"
			)
			.from(
				".radial",
				{
					autoAlpha: 0,
					scale: 1.5,
					ease: "expoScale(0.5, 3, power2.inOut)",
				},
				">"
			)
			.from(
				".users-bg",
				{
					autoAlpha: 0,
					y: 40,
				},
				">-0.5"
			)
			.to(
				".radial",
				{
					duration: 1.25,
					rotation: 360,
				},
				">-0.5"
			)
			.from(
				".list-environments .item",
				{
					autoAlpha: 0,
					x: -30,
					stagger: 0.5,
				},
				">-0.5"
			)
			.from(
				environmentsLine,
				{
					cssRule: {
						autoAlpha: 0,
						height: 0,
						zIndex: 0,
					},
				},
				">"
			)
			.from(
				".arrow-panel",
				{
					autoAlpha: 0,
					x: -30,
				},
				">-0.5"
			);
	};

});

	
