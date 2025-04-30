

(function ($) {
  "use strict";
  $(document).on("ready", function () {
    /*======================================================================================
      Header Sticky JS
    =======================================================================================*/
    $(window).on("scroll", function (event) {
      var scroll = $(window).scrollTop();
      if (scroll < 100) {
        $(".header-main ").removeClass("sticky");
      } else {
        $(".header-main ").addClass("sticky");
      }
    });

    /*======================================================================================
      Wow JS
    =======================================================================================*/
    var window_width = $(window).width();
    if (window_width > 767) {
      new WOW().init();
    }

    /*======================================================================================
      CounterUp JS
   =======================================================================================*/
    function odometerPackage() {
      const odometerElements = document.querySelectorAll(".odometer");
      /**
       * Initializes odometer elements when they become visible in the viewport.
       *
       * @param {Array} entries - The array of IntersectionObserver entries.
       * @param {IntersectionObserver} observer - The IntersectionObserver instance.
       */
      function initOdometer(entries, observer) {
        // Loop through each IntersectionObserver entry
        entries.forEach((entry) => {
          // If the target element is visible in the viewport
          if (entry.isIntersecting) {
            // Select the odometer element within the target element
            const odometerElement = entry.target.querySelector(".odometer");
            // Get the value attribute from the odometer element
            const elementValue = Number(
              odometerElement.getAttribute("data-counter-value")
            );
            // Create a new Odometer instance
            const od = new Odometer({
              el: odometerElement, // Set the element to be the odometer element
              value: 0, // Set the initial value to 0
              format: "", // Use the default format
              theme: "digital", // Use the digital theme
            });
            // Update the odometer with the element value
            od.update(elementValue);
            // Stop observing the target element once it's initialized
            observer.unobserve(entry.target);
          }
        });
      }
      // Initialize IntersectionObserver for each odometer element
      odometerElements &&
        odometerElements.forEach((item) => {
          const observer = new IntersectionObserver(initOdometer);
          observer.observe(item.parentElement);
        });
    }
    odometerPackage();

    /*======================================================================================
      Nice Select JS
   =======================================================================================*/
    $("select").niceSelect();

    /*======================================================================================
      Video Popup JS
   =======================================================================================*/
    $(".popup-video").magnificPopup({
      type: "iframe",
    });

    /*======================================================================================
      Hobble Effect JS
   =======================================================================================*/
    function hobbleEffect() {
      $(document)
        .on("mousemove", ".bx-hobble", function (event) {
          var halfW = this.clientWidth / 2;
          var halfH = this.clientHeight / 2;
          var coorX = halfW - (event.pageX - $(this).offset().left);
          var coorY = halfH - (event.pageY - $(this).offset().top);
          var degX1 = (coorY / halfH) * 8 + "deg";
          var degY1 = (coorX / halfW) * -8 + "deg";
          var degX3 = (coorY / halfH) * -15 + "px";
          var degY3 = (coorX / halfW) * 15 + "px";

          $(this)
            .find(".bx-hover-layer-1")
            .css("transform", function () {
              return (
                "perspective( 800px ) translate3d( 0, 0, 0 ) rotateX(" +
                degX1 +
                ") rotateY(" +
                degY1 +
                ")"
              );
            });
          $(this)
            .find(".bx-hover-layer-2")
            .css("transform", function () {
              return (
                "perspective( 800px ) translateX(" +
                degX3 +
                ") translateY(" +
                degY3 +
                ") scale(1.02)"
              );
            });
        })
        .on("mouseout", ".bx-hobble", function () {
          $(this).find(".bx-hover-layer-1").removeAttr("style");
          $(this).find(".bx-hover-layer-2").removeAttr("style");
        });
    }
    hobbleEffect();

    /*======================================================================================
      SVG Animated JS
    =======================================================================================*/
    function setupSVGAnimation(svg) {
      const paths = svg.querySelectorAll("path");
      paths.forEach((path) => {
        const length = path.getTotalLength(); // Get path length
        path.style.strokeDasharray = length; // Set dasharray to path length
        path.style.strokeDashoffset = length; // Hide path initially
      });
    }

    // Initialize all SVGs with animation setup
    document.querySelectorAll(".animated-svg").forEach(setupSVGAnimation);

    // Intersection Observer for triggering animation
    const observers = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const svg = entry.target;
            svg.querySelectorAll("path").forEach((path) => {
              path.style.strokeDashoffset = "0"; // Animate path
            });
            observers.unobserve(svg); // Stop observing once animated
          }
        });
      },
      { threshold: 0.5 } // Trigger animation when 50% visible
    );

    // Observe each SVG
    document.querySelectorAll(".animated-svg").forEach((svg) => {
      observers.observe(svg);
    });

    /*======================================================================================
      Progress JS
    =======================================================================================*/

    // Function to animate linear progress bars (service section)
    function animateLinearProgress(container) {
      const percentage = parseInt(
        container.getAttribute("data-percentage"),
        10
      );
      const progressEl = container.querySelector(".progress");
      const percentageEl = container
        .closest(".progress-item")
        .querySelector(".progress-item__percentage");

      let current = 0;
      progressEl.style.width = "0%";

      const interval = setInterval(() => {
        if (current >= percentage) {
          clearInterval(interval);
        } else {
          current++;
          progressEl.style.width = current + "%";
          percentageEl.innerText = current + "%";
        }
      }, 10);
    }

    // Function to animate circular progress bars (why-choose section)
    function animateCircularProgress(container) {
      const percentage = parseInt(
        container.getAttribute("data-percentage"),
        10
      );
      const circle = container.querySelector(".progress");
      const textEl = container.querySelector(".progress-text");

      const radius = circle.getAttribute("r");
      const circumference = 2 * Math.PI * radius;

      // Set initial values
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;

      let current = 0;
      textEl.innerText = "0%";

      const interval = setInterval(() => {
        if (current >= percentage) {
          clearInterval(interval);
        } else {
          current++;
          const offset = circumference - (current / 100) * circumference;
          circle.style.strokeDashoffset = offset;
          textEl.innerText = current + "%";
        }
      }, 10);
    }

    // Intersection Observer for linear progress bars
    const linearObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateLinearProgress(entry.target);
            linearObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Intersection Observer for circular progress bars
    const circularObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCircularProgress(entry.target);
            circularObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe linear progress bars
    document
      .querySelectorAll(".linear-progress .progress-container")
      .forEach((container) => {
        linearObserver.observe(container);
      });

    // Observe circular progress bars
    document
      .querySelectorAll(".circle-progress .progress-container")
      .forEach((container) => {
        circularObserver.observe(container);
      });

    /*======================================================================================
      Isotope JS
    =======================================================================================*/
    $(".filter-active").imagesLoaded(function () {
      if ($(".filter-active").length > 0) {
        var t = $(".filter-active").isotope({
          itemSelector: ".filter-item",
          filter: "*",
          masonry: { columnWidth: 0 },
        });

        $(".filter-menu-active").on("click", "button", function () {
          var s = $(this).attr("data-filter");
          t.isotope({ filter: s });
        });

        $(".filter-menu-active").on("click", "button", function (event) {
          event.preventDefault();
          $(this).addClass("active").siblings(".active").removeClass("active");
        });
      }
    });

    /*======================================================================================
      Hero Slider One
    =======================================================================================*/
    $(".bx-hero__slider").owlCarousel({
      items: 1,
      autoplay: true,
      loop: true,
      margin: 0,
      touchDrag: false,
      mouseDrag: true,
      autoplayTimeout: 9000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 9000,
      merge: true,
      dots: true,
      nav: false,
    });

    /*======================================================================================
      Hero Slider Two
    =======================================================================================*/
    $(".bx-hero__slider-2").owlCarousel({
      items: 1,
      autoplay: true,
      loop: true,
      margin: 0,
      touchDrag: false,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 5000,
      merge: true,
      dots: false,
      nav: true,
      navText: [
        "<i class='fi-rr-arrow-left'></i>",
        "<i class='fi-rr-arrow-right'></i>",
      ],
    });

    /*======================================================================================
      Text Move Slider JS
    =======================================================================================*/

    if (document.querySelector(".text-move_slider")) {
      var textMove = new Swiper(".text-move_slider", {
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 58,
        speed: 5000,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },

        breakpoints: {
          768: {
            // Tablets and larger screens
            spaceBetween: 40,
          },
          0: {
            // Mobile screens
            spaceBetween: 32, // Adjust spacing for smaller screens
          },
        },
      });
    }

    if (document.querySelector(".text-move_slider-reverse")) {
      var textMoveReverse = new Swiper(".text-move_slider-reverse", {
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 58,
        speed: 5000,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
          reverseDirection: true,
        },

        breakpoints: {
          768: {
            // Tablets and larger screens
            spaceBetween: 40,
          },
          0: {
            // Mobile screens
            spaceBetween: 32, // Adjust spacing for smaller screens
          },
        },
      });
    }

    /*======================================================================================
      Text Move Slider Two JS 
    =======================================================================================*/
    if (document.querySelector(".text-move_slider-2")) {
      var textMove2 = new Swiper(".text-move_slider-2", {
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 58,
        speed: 5000,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
        breakpoints: {
          768: {
            // Tablets and larger screens
            spaceBetween: 40,
          },
          0: {
            // Mobile screens
            spaceBetween: 32, // Adjust spacing for smaller screens
          },
        },
      });
    }

    /*======================================================================================
      Text Move Slider Three JS
    =======================================================================================*/
    if (document.querySelector(".text-move_slider-3")) {
      var textMove = new Swiper(".text-move_slider-3", {
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 0,
        speed: 4000,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
      });
    }

    if (document.querySelector(".text-move_slider-reverse-3")) {
      var textMoveReverse = new Swiper(".text-move_slider-reverse-3", {
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 0,
        speed: 4000,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
          reverseDirection: true,
        },
      });
    }

    /*======================================================================================
      Partner Slider JS
    =======================================================================================*/
    $(".bx-partner__slider").owlCarousel({
      items: 6,
      autoplay: true,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      dots: false,
      nav: false,
      margin: 24,
      responsive: {
        300: {
          items: 2,
        },
        480: {
          items: 2,
        },

        768: {
          items: 4,
        },
        1024: {
          items: 4,
          autoplay: true,
          loop: true
        },
        1200: {
          items: 6,
        },
      },
    });

    /*======================================================================================
      Testimonial Slider JS
    =======================================================================================*/
    $(".bx-testimonial__slider").owlCarousel({
      items: 4,
      autoplay: true,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      dots: false,
      nav: false,
      margin: 30,
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 2,
        },
        1200: {
          items: 3,
        },
        1400: {
          items: 4,
        },
      },
    });

    /*======================================================================================
      Testimonial Slider Two JS
    =======================================================================================*/
    $(".bx-testimonial__slider-2").owlCarousel({
      items: 1,
      autoplay: true,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      smartSpeed: 500,
      merge: true,
      dots: true,
      nav: false,
      margin: 30,
    });

    /*======================================================================================
      Testimonial Slider Three JS
    =======================================================================================*/
    $(".bx-testimonial__slider-3").owlCarousel({
      items: 2,
      autoplay: true,
      margin: 100,
      loop: true,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      dots: false,
      nav: true,
      navText: [
        "<i class='fi-rr-arrow-left'></i>",
        "<i class='fi-rr-arrow-right'></i>",
      ],
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1024: {
          items: 2,
        },
        1200: {
          items: 2,
        },
      },
    });

    /*======================================================================================
      Testimonial Slider Four JS
    =======================================================================================*/
    $(".bx-testimonial__slider-4").owlCarousel({
      items: 2,
      autoplay: true,
      loop: true,
      margin: 30,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      dots: true,
      nav: false,
      responsive: {
        300: {
          items: 1,
        },
        480: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 1,
        },
        1200: {
          items: 2,
        },
      },
    });

    /*======================================================================================
      Testimonial Slider Five JS
    =======================================================================================*/
    $(".bx-testimonial__slider-5").owlCarousel({
      items: 3,
      autoplay: true,
      loop: true,
      margin: 40,
      touchDrag: true,
      mouseDrag: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      smartSpeed: 500,
      merge: true,
      dots: true,
      nav: false,
      responsive: {
        300: {
          items: 1,
          margin: 16,
        },
        480: {
          items: 2,
          margin: 24,
        },
        768: {
          items: 2,
          margin: 32,
        },
        1024: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });

    /*======================================================================================
      Features Slider JS
    =======================================================================================*/
    $(".bx-features__slider").owlCarousel({
      items: 3,
      autoplay: true,
      loop: true,
      margin: 0,
      autoplayTimeout: 4000,
      autoplayHoverPause: false,
      autoWidth: true,
      smartSpeed: 1000,
      merge: true,
      dots: false,
      nav: false,
      responsive: {
        300: {
          items: 1,
          autoWidth: false,
        },
        480: {
          items: 2,
          autoWidth: false,
        },
        768: {
          items: 2,
          autoWidth: false,
        },
        1024: {
          items: 2,
          autoWidth: false,
        },
        1200: {
          items: 3,
        },
      },
    });

    /*======================================================================================
      About Showcase Slider JS 
    =======================================================================================*/
    if (document.querySelector(".bx-about__showcase__slider")) {
      var showCase = new Swiper(".bx-about__showcase__slider", {
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 65,
        speed: 3000,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
      });
    }
  });

  /*======================================================================================
    Custom Cursor JS
  =======================================================================================*/
  function gsap_ed_custom_cursor() {
    var cursorBall = document.getElementById("cursor-ball");
    if (cursorBall) {
      let mouse = { x: 0, y: 0 };
      let pos = { x: 0, y: 0 };
      let ratio = 0.99;
      let active = false;
      gsap.set(cursorBall, {
        xPercent: -50,
        yPercent: -50,
        borderWidth: "1px",
        width: "40px",
        height: "40px",
      });
      document.addEventListener("mousemove", mouseMove);
      function mouseMove(e) {
        var scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        mouse.x = e.pageX;
        mouse.y = e.pageY - scrollTop;
      }
      gsap.ticker.add(updatePosition);
      function updatePosition() {
        if (!active) {
          pos.x += (mouse.x - pos.x) * ratio;
          pos.y += (mouse.y - pos.y) * ratio;
          gsap.to(cursorBall, { duration: 0.4, x: pos.x, y: pos.y });
        }
      }

      // Common Area
      $("a, button, input[type=submit]").on("mouseenter", function (e) {
        gsap.to(cursorBall, {
          borderColor: "rgba(34, 34, 34, 0.05",
          scale: 1.7,
          opacity: 0.15,
          backgroundColor: "rgba(34, 34, 34, 0.2)",
        });
      });
      $("a, button, input[type=submit]").on("mouseleave", function (e) {
        gsap.to(cursorBall, {
          borderColor: "rgba(156, 156, 156, 0.5)",
          scale: 1,
          opacity: 1,
          backgroundColor: "transparent",
          width: "40px",
          height: "40px",
        });
        gsap.ticker.add(updatePosition);
      });
    }
  }
  gsap_ed_custom_cursor();

  /*======================================================================================
    Smooth Scroll JS
  =======================================================================================*/
  function smoothScroll() {
    // Handle smooth scrolling when clicking links
    $(".smooth a").on("click", function (event) {
      // Remove active class from all links
      $(".smooth a").removeClass("active");

      // Add active class to the clicked link
      $(this).addClass("active");

      var target = $(this.getAttribute("href"));
      if (target.length) {
        event.preventDefault();
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: target.offset().top - 90,
            },
            1000
          );
      }
    });

    // Handle active class when scrolling
    $(window).on("scroll", function () {
      var currentPosition = $(this).scrollTop();

      // Check each section
      $("section").each(function () {
        var sectionTop = $(this).offset().top - 100;
        var sectionBottom = sectionTop + $(this).outerHeight();
        var sectionId = $(this).attr("id");

        // If the current scroll position is within this section
        if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
          // Remove active class from all links
          $(".smooth a").removeClass("active");

          // Add active class to the corresponding navigation link
          $(".smooth a[href='#" + sectionId + "']").addClass("active");
        }
      });
    });
  }
  smoothScroll();

  if ($("#smooth-wrapper").length && $("#smooth-content").length) {
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollSmoother,
      TweenMax,
      ScrollToPlugin
    );

    gsap.config({
      nullTargetWarn: false,
    });

    let smoother = ScrollSmoother.create({
      smooth: 0.5,
      effects: true,
      smoothTouch: 0.5,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });

    // Create a function that handles the sticky effect
    function createStickyEffect() {
      // Clear any existing ScrollTriggers to prevent duplicates
      ScrollTrigger.getAll().forEach((st) => st.kill());

      // Only create sticky effect if viewport width is 1200px or more
      if (window.innerWidth >= 1200) {
        gsap.utils.toArray("[data-scroll-sticky]").forEach((sticky) => {
          ScrollTrigger.create({
            trigger: sticky,
            start: "top top+=12%", // Match your CSS top: 12%
            endTrigger: ".sticky-element", // The element where stickiness should end
            end: "bottom-=20% top+=12%",
            pin: true,
            pinSpacing: false,
          });
        });
      }
    }

    // Create the effect on initial load
    createStickyEffect();

    // Handle window resize
    $(window).on("resize", function () {
      createStickyEffect();
    });
  }

  /*======================================================================================
    Preloader JS
  =======================================================================================*/
  var prealoaderOption = $(window);
  prealoaderOption.on("load", function () {
    var preloader = jQuery("#preloader");
    var preloaderArea = jQuery("#preloader");
    setTimeout(function () {
      preloader.addClass("preloaded");
      setTimeout(function () {
        preloaderArea.fadeOut("slow");
      }, 1000);
    }, 500);
  });
})(jQuery);

/*======================================================================================
  Mobile Menu Offcanvas JS 
=======================================================================================*/
var getSiblings = function (elem) {
  const siblings = [];
  let sibling = elem.parentNode.firstChild;
  for (; sibling;)
    1 === sibling.nodeType && sibling !== elem && siblings.push(sibling),
      (sibling = sibling.nextSibling);
  return siblings;
},
  slideUp = (target, time) => {
    const duration = time || 500;
    (target.style.transitionProperty = "height, margin, padding"),
      (target.style.transitionDuration = duration + "ms"),
      (target.style.boxSizing = "border-box"),
      (target.style.height = target.offsetHeight + "px"),
      target.offsetHeight,
      (target.style.overflow = "hidden"),
      (target.style.height = 0),
      window.setTimeout(() => {
        (target.style.display = "none"),
          target.style.removeProperty("height"),
          target.style.removeProperty("overflow"),
          target.style.removeProperty("transition-duration"),
          target.style.removeProperty("transition-property");
      }, duration);
  },
  slideDown = (target, time) => {
    const duration = time || 500;
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;
    "none" === display && (display = "block"), (target.style.display = display);
    const height = target.offsetHeight;
    (target.style.overflow = "hidden"),
      (target.style.height = 0),
      target.offsetHeight,
      (target.style.boxSizing = "border-box"),
      (target.style.transitionProperty = "height, margin, padding"),
      (target.style.transitionDuration = duration + "ms"),
      (target.style.height = height + "px"),
      window.setTimeout(() => {
        target.style.removeProperty("height"),
          target.style.removeProperty("overflow"),
          target.style.removeProperty("transition-duration"),
          target.style.removeProperty("transition-property");
      }, duration);
  };

const offcanvasHeader = function () {
  (offcanvasMenu = document.querySelector(".offcanvas__menu")),
    offcanvasMenu &&
    offcanvasMenu
      .querySelectorAll(".offcanvas__sub_menu")
      .forEach(function (ul) {
        const subMenuToggle = document.createElement("button");
        subMenuToggle.classList.add("offcanvas__sub_menu_toggle"),
          ul.parentNode.appendChild(subMenuToggle);
      });

  let mobileMenuWrapper = document.querySelector(".offcanvas__menu_ul");
  mobileMenuWrapper &&
    mobileMenuWrapper.addEventListener("click", function (e) {
      let targetElement = e.target;
      if (targetElement.classList.contains("offcanvas__sub_menu_toggle")) {
        const parent = targetElement.parentElement;
        parent.classList.contains("active")
          ? (targetElement.classList.remove("active"),
            parent.classList.remove("active"),
            parent
              .querySelectorAll(".offcanvas__sub_menu")
              .forEach(function (subMenu) {
                subMenu.parentElement.classList.remove("active"),
                  subMenu.nextElementSibling.classList.remove("active"),
                  slideUp(subMenu);
              }))
          : (targetElement.classList.add("active"),
            parent.classList.add("active"),
            slideDown(targetElement.previousElementSibling),
            getSiblings(parent).forEach(function (item) {
              item.classList.remove("active"),
                item
                  .querySelectorAll(".offcanvas__sub_menu")
                  .forEach(function (subMenu) {
                    subMenu.parentElement.classList.remove("active"),
                      subMenu.nextElementSibling.classList.remove("active"),
                      slideUp(subMenu);
                  });
            }));
      }
    });
};
offcanvasHeader();

/*======================================================================================
  Element Move JS
=======================================================================================*/
const elementWrapper = document.querySelector(".element-wrapper");
const elementMove = document.querySelectorAll(".element-move");
const elementMoveX = document.querySelectorAll(".element-move-x");

elementWrapper.addEventListener("mousemove", (e) => {
  const { clientX: mouseX, clientY: mouseY } = e;

  const centerX = elementWrapper.clientWidth / 2;
  const centerY = elementWrapper.clientHeight / 2;

  const offsetX = (mouseX - centerX) / 70;
  const offsetY = (mouseY - centerY) / 70;

  elementMove.forEach((image, index) => {
    const offset = index + 1;
    image.style.transform = `translate(${offsetX * offset}px, ${offsetY * offset
      }px)`;
  });
  elementMoveX.forEach((image, index) => {
    const offset = index + 2;
    image.style.transform = `translate(${offsetX * offset}px)`;
  });
});

/*======================================================================================
  Increment Decrement JS
=======================================================================================*/

// Function to handle quantity increment and decrement
const decreaseButtons = document.querySelectorAll(
  ".ed-cart__quantity-decrease"
);
const increaseButtons = document.querySelectorAll(
  ".ed-cart__quantity-increase"
);

// Only proceed if both decrease and increase buttons exist in the DOM
if (decreaseButtons.length > 0 && increaseButtons.length > 0) {
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const quantityInput = this.nextElementSibling;
      if (quantityInput) {
        // Check if quantity input exists
        let quantity = parseInt(quantityInput.value);

        if (quantity > 1) {
          quantity--;
          quantityInput.value = quantity;
        }
      }
    });
  });

  increaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const quantityInput = this.previousElementSibling;
      if (quantityInput) {
        // Check if quantity input exists
        let quantity = parseInt(quantityInput.value);

        quantity++;
        quantityInput.value = quantity;
      }
    });
  });
}

/*======================================================================================
  Word Animation JS
=======================================================================================*/
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    // Check if the device is not mobile before running animations
    if (!isMobileDevice()) {
      TitleAnimationActive();
      gsap.delayedCall(0.5, () => ScrollTrigger.refresh()); // Refresh GSAP triggers after animations are applied
    } else {
      // For mobile devices, make all animation elements visible without animation
      makeAnimatedElementsVisible();
    }
  }, 300); // Delay ensures elements are fully rendered before animation
});

// Function to detect mobile devices
function isMobileDevice() {
  return (
    window.innerWidth <= 768 ||
    navigator.maxTouchPoints > 0 ||
    /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
  );
}

// Function to make all animated elements visible on mobile without animation
function makeAnimatedElementsVisible() {
  let animationItems = document.querySelectorAll(".has_word_anim");
  animationItems.forEach((item) => {
    // Make sure all words are visible
    item.style.opacity = 1;
    item.style.visibility = "visible";

    // If SplitText was already applied in another context, revert it
    if (window.SplitText) {
      const splitInstance = new SplitText(item);
      if (splitInstance && typeof splitInstance.revert === "function") {
        splitInstance.revert();
      }
    }
  });
}

function TitleAnimationActive() {
  let animationItems = document.querySelectorAll(".has_word_anim");

  animationItems.forEach((item) => {
    let stagger = item.getAttribute("data-stagger") || 0.04;
    let translateX = item.getAttribute("data-translateX") || 0;
    let translateY = item.getAttribute("data-translateY") || 0;
    let onScroll = item.getAttribute("data-on-scroll") || 1;
    let delay = item.getAttribute("data-delay") || 0.1;
    let duration = item.getAttribute("data-duration") || 0.75;

    let splitText = new SplitText(item, { type: "chars, words" });

    let animationProps = {
      duration: duration,
      delay: delay,
      x: translateX || 20, // Default X movement
      y: translateY || 0,
      autoAlpha: 0,
      stagger: stagger,
    };

    if (onScroll == 1) {
      animationProps.scrollTrigger = {
        trigger: item,
        start: "top 90%",
        end: "bottom 70%",
        toggleActions: "play none none none",
      };
    }

    gsap.from(splitText.words, animationProps);
  });
}

/*======================================================================================
  Fade Animation JS
=======================================================================================*/

let fadeArray_items = document.querySelectorAll(".has_fade_anim");
if (fadeArray_items.length > 0) {
  fadeArray_items.forEach((item) => {
    let fade_direction = "bottom";
    let onscroll_value = 1;
    let duration_value = 1.15;
    let fade_offset = 50;
    let delay_value = 0.15;
    let ease_value = "power2.out";

    if (item.getAttribute("data-fade-offset")) {
      fade_offset = parseFloat(item.getAttribute("data-fade-offset"));
    }
    if (item.getAttribute("data-duration")) {
      duration_value = parseFloat(item.getAttribute("data-duration"));
    }
    if (item.getAttribute("data-fade-from")) {
      fade_direction = item.getAttribute("data-fade-from");
    }
    if (item.getAttribute("data-on-scroll")) {
      onscroll_value = parseInt(item.getAttribute("data-on-scroll"));
    }
    if (item.getAttribute("data-delay")) {
      delay_value = parseFloat(item.getAttribute("data-delay"));
    }
    if (item.getAttribute("data-ease")) {
      ease_value = item.getAttribute("data-ease");
    }

    let animation_settings = {
      opacity: 0,
      ease: ease_value,
      duration: duration_value,
      delay: delay_value,
    };

    if (fade_direction === "top") animation_settings.y = -fade_offset;
    if (fade_direction === "left") animation_settings.x = -fade_offset;
    if (fade_direction === "bottom") animation_settings.y = fade_offset;
    if (fade_direction === "right") animation_settings.x = fade_offset;

    if (onscroll_value === 1) {
      animation_settings.scrollTrigger = {
        trigger: item,
        start: "top 85%",
      };
    }

    gsap.from(item, animation_settings);
  });
}
