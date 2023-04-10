import { gsap } from "gsap";

const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

export function fadeOut(el) {
    gsap.to(el, {
        opacity:0,
        duration:1
    })
}

export function fadeIn(el, rate) {
    gsap.to(el, {
        opacity:1,
        duration:1,
        delay:rate/1000
    })
}

export function verticalMove(el, y, rate) {
    gsap.to(el, {
        top: y * rem,
        ease:"linear",
        duration:rate/1000
    })
}

export function horizontalMove(el, x, rate) {
    gsap.to(el, {
        left: x * rem,
        ease:"linear",
        duration:rate/1000
    })
}