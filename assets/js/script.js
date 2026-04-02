(function ($) {
	"use strict";

	// loader js
	$(window).on("load", function () {
		$(".fullpage_loader").fadeOut("slow", function () {
			$(this).remove(1000);
		});
	});

	// Offcanvas menu js
	$(".offcanvas-btn").on('click', function () {
		$(".offcanvas-menu, .offcanvas-overlay").addClass("active")
	});
	$(".offcanvas-overlay, .offcasvas-close").on('click', function () {
		$(".offcanvas-menu, .offcanvas-overlay").removeClass("active")
	});

	/* Data Background js */
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
	})

	// fixed menu js
	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 120) {
			$("#sticky-header").removeClass("sticky-menu");
			$("#header-fixed-height").removeClass("active-height");

		} else {
			$("#sticky-header").addClass("sticky-menu");
			$("#header-fixed-height").addClass("active-height");
		}
	});

	// Services slider js
	const services = new Swiper('.services-slider', {
		loop: true,
		spaceBetween: 24,
		slidesPerView: 3,
		speed: 1500,
		autoplay: {
			delay: 4000,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 16,
			},
			576: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 3,
			}
		}
	});

	// Accordion js
	document.addEventListener("DOMContentLoaded", function () {
		const accordion = document.getElementById("accordionExample");
		if (!accordion) return;
		accordion.addEventListener("show.bs.collapse", function (e) {
			// Remove "active" from all items
			accordion.querySelectorAll(".accordion-item").forEach(item => {
				item.classList.remove("active");
			});

			// Add "active" to the clicked item's parent
			const parentItem = e.target.closest(".accordion-item");
			if (parentItem) {
				parentItem.classList.add("active");
			}
		});

		accordion.addEventListener("hide.bs.collapse", function (e) {
			const parentItem = e.target.closest(".accordion-item");
			if (parentItem) {
				parentItem.classList.remove("active");
			}
		});
	});

	// Testimonial slider js
	var project = new Swiper(".testimonial-slider", {
		loop: true,
		spaceBetween: 24,
		slidesPerView: 1,
		speed: 1500,
		autoplay: {
			delay: 4000,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// Thumbnail slider
	const thumbSwiper = new Swiper(".thumb-slider", {
		slidesPerView: 3,
		spaceBetween: 15,
		watchSlidesProgress: true,
	});

	// Big image slider
	const bigImageSwiper = new Swiper(".big-image-slider", {
		slidesPerView: 1,
		allowTouchMove: false
	});

	// Text slider
	const textSwiper = new Swiper(".testimonial-two-slider", {
		slidesPerView: 1,
		loop: true,

		navigation: {
			nextEl: ".next-btn",
			prevEl: ".prev-btn",
		},

		thumbs: {
			swiper: thumbSwiper,
		},

		on: {
			slideChange: function () {
				bigImageSwiper.slideTo(this.realIndex);
			}
		}
	});

	// Thumbnail click e big image + text change
	thumbSwiper.on("click", function () {
		const index = thumbSwiper.clickedIndex;
		textSwiper.slideToLoop(index);
		bigImageSwiper.slideTo(index);
	});

	// video popup js
	$('.vidplay').magnificPopup({
		type: 'iframe',
		iframe: {
			markup: '<div class="mfp-iframe-scaler">' +
				'<div class="mfp-close"></div>' +
				'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
				'</div>',
			patterns: {
				youtube: {
					index: 'youtube.com/',
					id: 'v=',
					src: 'https://www.youtube.com/embed/%id%?autoplay=1'
				},
			},
			srcAction: 'iframe_src',
		}
	});

	// Service hover active js
	document.querySelectorAll('.service-item-two').forEach(item => {
		item.addEventListener('mouseenter', function () {
			document.querySelectorAll('.service-item-two').forEach(el => el.classList.remove('active'));
			this.classList.add('active');
		});
	});

	document.addEventListener("DOMContentLoaded", function () {
		// Split text animation
		if ($(".split-text").length > 0) {
			let st = $(".split-text");
			if (st.length == 0) return;
			gsap.registerPlugin(SplitText);
			st.each(function (index, el) {
				el.split = new SplitText(el, {
					type: "lines,words,chars",
					linesClass: "tp-split-line"
				});
				gsap.set(el, {
					perspective: 400
				});
				if ($(el).hasClass('right')) {
					gsap.set(el.split.chars, {
						opacity: 0,
						x: "50",
						ease: "Back.easeOut",
					});
				}
				if ($(el).hasClass('left')) {
					gsap.set(el.split.chars, {
						opacity: 0,
						x: "-50",
						ease: "circ.out",
					});
				}
				if ($(el).hasClass('up')) {
					gsap.set(el.split.chars, {
						opacity: 0,
						y: "80",
						ease: "circ.out",
					});
				}
				if ($(el).hasClass('down')) {
					gsap.set(el.split.chars, {
						opacity: 0,
						y: "-80",
						ease: "circ.out",
					});
				}
				el.anim = gsap.to(el.split.chars, {
					scrollTrigger: {
						trigger: el,
						start: "top 90%",
					},
					x: "0",
					y: "0",
					rotateX: "0",
					scale: 1,
					opacity: 1,
					duration: 0.6,
					stagger: 0.03,
				});
			});
		}

		// Image reveal js
		let revealContainers = document.querySelectorAll(".reveal");
		revealContainers.forEach((container) => {
			let image = container.querySelector("img");
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					toggleActions: "play none none none"
				}
			});

			tl.set(container, {
				autoAlpha: 1
			});

			if (container.classList.contains('zoom-out')) {
				// Zoom-out effect
				tl.from(image, 1.5, {
					scale: 1.4,
					ease: Power2.out
				});
			} else if (container.classList.contains('left') || container.classList.contains('right')) {
				let xPercent = container.classList.contains('left') ? -100 : 100;
				tl.from(container, 1.5, {
					xPercent,
					ease: Power2.out
				});
				tl.from(image, 1.5, {
					xPercent: -xPercent,
					scale: 1,
					delay: -1.5,
					ease: Power2.out
				});
			} else if (container.classList.contains('up') || container.classList.contains('down')) {
				let yPercent = container.classList.contains('up') ? 100 : -100;
				tl.from(container, 1.5, {
					yPercent,
					ease: Power2.out
				});
				tl.from(image, 1.5, {
					yPercent: -yPercent,
					scale: 1,
					delay: -1.5,
					ease: Power2.out
				});
			}
		});
	});

	// /* Odometer Active js */
	$('.odometer').appear(function (e) {
		var odo = $(".odometer");
		odo.each(function () {
			var countNumber = $(this).attr("data-count");
			$(this).html(countNumber);
		});
	});

	// Feature move and active js
	var feature_item = gsap.utils.toArray('.feature-item');
	let hover_img = gsap.utils.toArray(".hover-image");

	// Function to move the service image on mouse move
	function FeatureImageMove(event, item) {
		const contentBox = item.getBoundingClientRect();
		const dx = (event.clientX - contentBox.x - contentBox.width / 1) / 3;
		const dy = (event.clientY - contentBox.y - contentBox.height / 1) / 10;

		hover_img.forEach((img) => {
			gsap.to(img, {
				x: dx,
				y: dy,
			});
		});
	}

	// Apply effects to all feature items
	feature_item.forEach((item, i) => {
		item.addEventListener("mousemove", (event) => {
			FeatureImageMove(event, item);
		});

		item.addEventListener("mouseleave", () => {
			hover_img.forEach((img) => {
				gsap.to(img, {
					x: 0,
					y: 0
				});
			});
		});
	});

	// Add active team class on hover
	$('.feature-item').hover(function () {
		$('.feature-item').removeClass('active-feature');
		$(this).addClass('active-feature');
	});

	// back to top js
	let btn = $(".scroll-to-top");

	$(window).scroll(function () {
		btn.toggleClass("show", $(window).scrollTop() > 300);
	});

	btn.click(function (e) {
		e.preventDefault();
		if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
			$("html").animate({
					scrollTop: 0,
				},
				1000
			);
		} else {
			$("html, body").animate({
					scrollTop: 0,
				},
				0
			);
		}
	});

	// Mobile menu js start
	$(".mobile-topbar .bars").on("click", function () {
		$(".mobile-menu-overlay,.mobile-menu-main").addClass("active");
		return false;
	});

	$(".close-mobile-menu,.mobile-menu-overlay").on("click", function () {
		$(".mobile-menu-overlay,.mobile-menu-main").removeClass("active");
	});

	$('.sub-mobile-menu ul').hide();
	$(".sub-mobile-menu a").on("click", function () {
		$('.sub-mobile-menu ul').not($(this).next("ul")).slideUp(300);
		$(".sub-mobile-menu a i").not($(this).find("i")).removeClass("fa-chevron-up").addClass("fa-chevron-down");
		$(this).next("ul").slideToggle(300);
		$(this).find("i").toggleClass("fa-chevron-up fa-chevron-down");
	});
})(jQuery);