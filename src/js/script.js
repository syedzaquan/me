document.fonts.ready.then((fontFaceSet) => {

  // Place your JavaScript code here that depends on font loading
  initializeApp(); // Example function to initialize your app
});

function initializeApp() {
  // Reset page on refresh
  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0);
  // }
  //Smooth Scrollbar

  const lenis = new Lenis({
    duration: 3
  });

  let mm = gsap.matchMedia();

  var today = new Date();
  var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

  var hour = today.getHours();

  var ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  var minute = today.getMinutes();

  minute = addLeadingZero(minute);

  var dateNtime = date + ' ' + hour + ':' + minute + '' + ampm;

  var clockElement = document.querySelector('.clock');
  clockElement.innerHTML = dateNtime;

  function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
  }



  lenis.on('scroll', (e) => {
    // console.log(e)
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  $(".tooltip-trigger").hover(function () {
    $(".hero-tooltip").toggleClass("show");
  });

  document.querySelector("body").addEventListener("mousemove", eyeball);

  function eyeball() {
    const eye = document.querySelectorAll(".eyes .eye");
    eye.forEach(function (eye) {
      let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;

      let radian = Math.atan2(event.pageX - x, event.pageY - y);
      let rotate = radian * (180 / Math.PI) * -1 - 270;
      eye.style.transform = "rotate(" + rotate + "deg)";
    });
  }

  //++++++++++++++++++++++++++++++++++++++++++//
  //-------------------GSAP-------------------//
  //++++++++++++++++++++++++++++++++++++++++++//
  ScrollTrigger.create({
    trigger: ".ribbon",
    start: "top top",
    end: "bottom top",
    pin: ".ribbon",
    pinSpacing: false,
    // markers: true,
  });

  const mainTimeline = gsap.timeline();

  // mainTimeline.from('.hero-title h1', {
  //   x: -500,
  //   duration: 1,
  //   opacity: 0,
  //   delay: 1,
  //   ease: Back.easeOut.config(1.4),
  // });

  // mainTimeline.to('.code', {
  //   duration: 1,
  //   rotate: -2.5,
  //   ease: Back.easeOut.config(1.4),
  // });

  // mainTimeline.from('.fa-light', {
  //   x: -300,
  //   y: -100,
  //   duration: 5,
  //   opacity: 0,
  // });



  mm.add("(min-width: 500px)", () => {
    ScrollTrigger.create({
      trigger: ".skills-wrapper",
      start: "top top",
      end: "bottom top",
      pin: ".skills-wrapper h2",
      pinSpacing: false,
      // markers: true,
    });
  });

  mainTimeline.to('.hero', {
    y: 0,
    opacity: 1,
    duration: 1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    ease: "power3.out",
  });

  mainTimeline.to('.hero', {
    scale: 1,
    width: '100%',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    duration: 1,
    // delay: 0.5,
    onStart: () => {
      $('body').addClass('loading');
      $('body').removeClass('loaded');


      setTimeout(() => {
        lenis.stop();
      }, 200);

      lenis.scrollTo("top", {
        immediate: true
      });
    },
    ease: "power3.out",
  });

  // mainTimeline.to('.hero', {
  //   width: '100%',
  // });

  // var heroText = new SplitType(".hero-title h1");

  // const heroChars = document.querySelectorAll('.hero-title h1 .char');
  const heroCode = document.querySelector('.hero-title .code');

  const heroTl = gsap.timeline();

  mainTimeline.from('.ribbon', {
    opacity: 0,
    duration: 1,
    ease: Back.easeOut.config(1.4),
  });



  var splitText = new SplitType(".hero-title .hero-intro, .montigo, .skills-box span", {
    types: "lines, words"
  });

  const heroIntroWord = document.querySelectorAll('.hero-title .hero-intro .word');

  mainTimeline.from('.hero h1', {
    yPercent: 50,
    duration: 1,
    ease: "power4",
  });

  mainTimeline.to(heroCode, {
    duration: 1,
    rotate: -2.5,
    ease: Back.easeOut.config(1.4),
  });

  mainTimeline.from(heroIntroWord, {
    filter: "blur(10px)",
    duration: 1,
    yPercent: 100,
    opacity: 0,
    ease: "power4",
    stagger: 0.025,
    skewY: 7,
    onComplete: () => {
      lenis.start();
      $('body').addClass('loaded');
      $('body').removeClass('loading');
    },
  });



  const scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".rolling-text",
      start: "top center-=20%",
      end: "bottom center-=20%",
      // start: "top bottom-=100px",
      // end: "bottom bottom-=100px",
      scrub: true,
      // markers: true,
    }
  });

  mm.add("(min-width: 500px)", () => {
    scrollTimeline.to([".hero", ".ribbon"], {
      width: '95%',
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
    })
  });



  // scrollTimeline.to(".ribbon", {
  //   opacity: 0,
  // })

  // scrollTimeline.to([".hero", ".ribbon"], {
  //   width: 1800,
  //   borderBottomRightRadius: 50,
  //   borderBottomLeftRadius: 50,
  // }).to(".ribbon", {
  //   opacity: 0,
  // });

  const scrollingTextItems = gsap.utils.toArray('.rolling-text-item');
  const scrollingTextTimeline = horizontalLoop(scrollingTextItems, {
    repeat: -1
  });

  let speedTween;

  ScrollTrigger.create({
    trigger: ".rolling-text",
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      if (speedTween) speedTween.kill();
      speedTween = gsap.timeline()
        .to(scrollingTextTimeline, {
          timeScale: 4 * self.direction,
          duration: 0.25
        })
        .to(scrollingTextTimeline, {
          timeScale: 2 * self.direction,
          duration: 0.5
        }, "+=0.5");
    },
  });



  // heroTl.from(heroChars, {
  //   duration: 0.5,
  //   yPercent: 100,
  //   ease: "power4",
  //   stagger: 0.025
  // });

  // heroTl.from(heroCode, {
  //   y: 100,
  //   duration: 0.75,
  //   opacity: 0,
  //   ease: Back.easeOut.config(1.4),
  // }, "-=1.5");

  // heroTl.from('.hero-title h5', {
  //   y: 500,
  //   duration: 1,
  //   opacity: 0,
  //   ease: Back.easeOut.config(1.4),
  // });

  const introTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".introduction",
      start: "top center",
      end: "center center",
      // scrub: true,
      // markers: true,
    }
  });

  var montigoSplit = $('.montigo .word');
  var skillSplit = $('.skills-box span .word');

  introTimeline.from(montigoSplit, {
    filter: "blur(10px)",
    duration: 1.5,
    yPercent: 100,
    opacity: 0,
    ease: "power4",
    stagger: 0.025,
    skewY: 7,
  });

  // introTimeline.from(montigoSplit, {
  //   duration: 1,
  //   yPercent: 100,
  //   opacity: 0,
  //   ease: "power4",
  //   stagger: 0.025,
  //   skewY: 7,
  // });

  introTimeline.from(skillSplit, {
    duration: 1,
    yPercent: 100,
    opacity: 0,
    ease: "power4",
    stagger: 0.025,
    skewY: 7,
  });

  introTimeline.to(".introduction", {
    // yPercent: -10
  });

  const workTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".works-wrapper",
      start: "top center",
      end: "center center",
      scrub: true,
      // markers: true,
    }
  });

  workTimeline.to(".introduction", {
    // width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#fcfbf5',
    duration: 4,
    ease: "power3.out",
  });

  // ScrollTrigger.create({
  //   trigger: ".works-wrapper",
  //   start: "top top", 
  //   end: "bottom 150px",
  //   pin: ".instructions-text",
  // });

  // const fixInstructionsText = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".works-wrapper",
  //     start: "top top",
  //     end: "center top",
  //     scrub: false,
  //     markers: true,
  //     onEnter: () => fixInstructionsText.restart(), // Restart when entering
  //     onLeaveBack: () => fixInstructionsText.restart(), // Restart when scrolling back
  //   }
  // });

  // fixInstructionsText.to(".instructions-text", {
  //   left: "unset",
  //   top: "0%",
  //   height: 188,
  //   maxHeight: 188,
  //   ease: "power3.out",
  // });

  mm.add("(min-width: 500px)", () => {
    gsap.from('.card-item-wrapper', {
      scrollTrigger: {
        trigger: ".card-stack-wrapper",
        start: "top center",
        end: "center center",
        // markers: true
      },
      filter: "grayscale(1)",
      duration: 1.5,
      xPercent: -50,
      ease: Back.easeOut.config(1.1)
    });
  });



  gsap.from('.footer-sticky', {
    // filter: "blur(10px)",
    scrollTrigger: {
      start: 'top bottom',
      end: 'bottom top',
      trigger: '.footer-sticky',
      toggleClass: 'stickem',
      scrub: true
      // markers: true
    }
  });

  const footerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".works-wrapper",
      start: "center center",
      end: "bottom center",
      scrub: true,
      // markers: true,
    }
  });

  footerTimeline.to(".introduction", {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  })

  // const footerTimeline = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".footer-sticky",
  //     start: "top center",
  //     end: "center center",
  //     scrub: true,
  //     markers: true,
  //   }
  // });

  // footerTimeline
  //   // Change the footer background color
  //   .to(".introduction", {
  //     backgroundColor: '#14342B',
  //     duration: 4,
  //     ease: "power3.out",
  //   })
  //   // Change the font color of the .say-hi element
  //   .to(".say-hi", {
  //     color: '#FFFFFF', // or any other color you want
  //     duration: 4,
  //     ease: "power3.out",
  //   }, "<") // "<" ensures this runs at the same time as the previous animation
  //   // Change the font color of the .footer-email element
  //   .to(".footer-email", {
  //     color: '#FFFFFF', // or any other color you want
  //     duration: 4,
  //     ease: "power3.out",
  //   }, "<");

  //++++++++++++++++++++++++++++++++++++++++++//
  //---------------Work Section---------------//
  //++++++++++++++++++++++++++++++++++++++++++//

  $('.card-stack-item').on('click', function (event) {
    event.stopPropagation();

    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $('.card-stack-item').removeClass('active');
      $(this).addClass('active');
    }
  });

  $(document).on('click', function () {
    $('.card-stack-item').removeClass('active');
  });

  // let accordionTl = gsap.timeline({
  //   scrollTrigger: {
  //     toggleActions: "restart none none reverse",
  //     trigger: $(".additional-section")[0], // Make sure it's the DOM element
  //     pin: true,
  //     pinSpacing: true,
  //     start: "top top",
  //     end: "+=2000",
  //     scrub: true,
  //     // markers: true,
  //     onLeave: () => {
  //       $(".additional-section").css("left", "56px");
  //     }
  //   }
  // });


  // accordionTl
  //   .from($(".additional-section-wrapper"), {
  //     stagger: {
  //       each: 2,
  //       yoyo: true,
  //       repeat: 1
  //     },
  //     height: 0,
  //     paddingBottom: 0,
  //     paddingTop: 0,
  //     opacity: 1,
  //     duration: 1,
  //     marginBottom: 0,
  //     ease: "power3.inOut",
  //   });


  mm.add("(min-width: 500px)", () => {
    ScrollTrigger.create({
      trigger: ".works-wrapper",
      start: "top top",
      end: "bottom top",
      pin: ".works-wrapper-title",
      pinSpacing: false,
      // markers: true,
    });

    ScrollTrigger.create({
      trigger: ".works-wrapper",
      start: "top top",
      end: "bottom top",
      pin: ".instructions-text",
      pinSpacing: false,
      // markers: true,
    });
  });
}