document.addEventListener("DOMContentLoaded",(function(){const t=new Lenis({duration:3});let e=gsap.matchMedia();var o=new Date,r=o.getDate()+"/"+(o.getMonth()+1)+"/"+o.getFullYear(),i=o.getHours(),a=i>=12?"PM":"AM";i=i%12||12;var n,s=o.getMinutes(),c=r+" "+i+":"+(s=(n=s)<10?"0"+n:n)+a;document.querySelector(".clock").innerHTML=c,t.on("scroll",(t=>{})),t.on("scroll",ScrollTrigger.update),gsap.ticker.add((e=>{t.raf(1e3*e)})),gsap.ticker.lagSmoothing(0),$(".tooltip-trigger").hover((function(){$(".hero-tooltip").toggleClass("show")})),document.querySelector("body").addEventListener("mousemove",(function(){document.querySelectorAll(".eyes .eye").forEach((function(t){let e=t.getBoundingClientRect().left+t.clientWidth/2,o=t.getBoundingClientRect().top+t.clientHeight/2,r=Math.atan2(event.pageX-e,event.pageY-o)*(180/Math.PI)*-1-270;t.style.transform="rotate("+r+"deg)"}))})),ScrollTrigger.create({trigger:".ribbon",start:"top top",end:"bottom top",pin:".ribbon",pinSpacing:!1});const l=gsap.timeline();e.add("(min-width: 500px)",(()=>{ScrollTrigger.create({trigger:".skills-wrapper",start:"top top",end:"bottom top",pin:".skills-wrapper h2",pinSpacing:!1})})),l.to(".hero",{y:0,opacity:1,duration:1,borderBottomLeftRadius:50,borderBottomRightRadius:50,ease:"power3.out"}),l.to(".hero",{scale:1,width:"100%",borderBottomRightRadius:0,borderBottomLeftRadius:0,duration:1,onStart:()=>{$("body").addClass("loading"),$("body").removeClass("loaded"),setTimeout((()=>{t.stop()}),200),t.scrollTo("top",{immediate:!0})},ease:"power3.out"});new SplitType(".hero-title h1");document.querySelectorAll(".hero-title h1 .char");const d=document.querySelector(".hero-title .code"),g=gsap.timeline();l.from(".ribbon",{opacity:0,duration:1,ease:Back.easeOut.config(1.4)});new SplitType(".hero-title .hero-intro, .montigo, .skills-box span",{types:"lines, words"});const p=document.querySelectorAll(".hero-title .hero-intro .word");l.from(".hero h1",{yPercent:50,duration:1,ease:"power4"}),l.to(d,{duration:1,rotate:-2.5,ease:Back.easeOut.config(1.4)}),l.from(p,{filter:"blur(10px)",duration:1,yPercent:100,opacity:0,ease:"power4",stagger:.025,skewY:7,onComplete:()=>{t.start(),$("body").addClass("loaded"),$("body").removeClass("loading")}});const u=gsap.timeline({scrollTrigger:{trigger:".rolling-text",start:"top center-=20%",end:"bottom center-=20%",scrub:!0}});e.add("(min-width: 500px)",(()=>{u.to([".hero",".ribbon"],{width:"95%",borderBottomRightRadius:50,borderBottomLeftRadius:50})}));const m=gsap.utils.toArray(".rolling-text-item"),h=horizontalLoop(m,{repeat:-1});let b;ScrollTrigger.create({trigger:".rolling-text",start:"top bottom",end:"bottom top",onUpdate:t=>{b&&b.kill(),b=gsap.timeline().to(h,{timeScale:4*t.direction,duration:.25}).to(h,{timeScale:2*t.direction,duration:.5},"+=0.5")}}),g.from(".hero-title h5",{y:500,duration:1,opacity:0,ease:Back.easeOut.config(1.4)});const w=gsap.timeline({scrollTrigger:{trigger:".introduction",start:"top center",end:"center center"}});var f=$(".montigo .word"),y=$(".skills-box span .word");w.from(f,{filter:"blur(10px)",duration:1.5,yPercent:100,opacity:0,ease:"power4",stagger:.025,skewY:7}),w.from(y,{duration:1,yPercent:100,opacity:0,ease:"power4",stagger:.025,skewY:7}),w.to(".introduction",{});gsap.timeline({scrollTrigger:{trigger:".works-wrapper",start:"top center",end:"center center",scrub:!0}}).to(".introduction",{borderBottomLeftRadius:0,borderBottomRightRadius:0,backgroundColor:"#fcfbf5",duration:4,ease:"power3.out"}),e.add("(min-width: 500px)",(()=>{gsap.from(".card-item-wrapper",{scrollTrigger:{trigger:".card-stack-wrapper",start:"top center",end:"center center"},filter:"grayscale(1)",duration:1.5,xPercent:-50,ease:Back.easeOut.config(1.1)})})),gsap.from(".footer-sticky",{scrollTrigger:{start:"top bottom",end:"bottom top",trigger:".footer-sticky",toggleClass:"stickem",scrub:!0}});gsap.timeline({scrollTrigger:{trigger:".works-wrapper",start:"center center",end:"bottom center",scrub:!0}}).to(".introduction",{borderBottomLeftRadius:50,borderBottomRightRadius:50}),$(".card-stack-item").on("click",(function(t){t.stopPropagation(),$(this).hasClass("active")?$(this).removeClass("active"):($(".card-stack-item").removeClass("active"),$(this).addClass("active"))})),$(document).on("click",(function(){$(".card-stack-item").removeClass("active")})),e.add("(min-width: 500px)",(()=>{ScrollTrigger.create({trigger:".works-wrapper",start:"top top",end:"bottom top",pin:".works-wrapper-title",pinSpacing:!1}),ScrollTrigger.create({trigger:".works-wrapper",start:"top top",end:"bottom top",pin:".instructions-text",pinSpacing:!1})}))}));