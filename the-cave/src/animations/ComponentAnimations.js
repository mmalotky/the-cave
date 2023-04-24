import { gsap } from "gsap";

const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

//make hidden element visible
export function fadeOut(el) {
    gsap.to(el, {
        opacity:0,
        duration:1
    })
}

//make element invisible, delay set in ms
export function fadeIn(el, delay) {
    gsap.to(el, {
        opacity:1,
        duration:1,
        delay:delay/1000
    })
}

//set y position of element, rate in ms
export function verticalMove(el, y, rate) {
    gsap.to(el, {
        top: y * 2 * rem,
        ease:"linear",
        duration:rate/1000
    })
}

//set x position of element, rate in ms
export function horizontalMove(el, x, rate) {
    gsap.to(el, {
        left: x * 2 * rem,
        ease:"linear",
        duration:rate/1000
    })
}