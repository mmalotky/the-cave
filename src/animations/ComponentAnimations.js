import { gsap } from "gsap";

const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

export function fadeOut(el) {
    gsap.to(el, {
        opacity:0,
        duration:1
    })
}

export function fadeIn(el) {
    gsap.to(el, {
        opacity:1,
        duration:1
    })
}

export function verticalMove(el, y) {
    gsap.to(el, {
        top: y * rem,
        duration:1
    })
}

export function horizontalMove(el, x) {
    gsap.to(el, {
        left: x * rem,
        duration:1
    })
}