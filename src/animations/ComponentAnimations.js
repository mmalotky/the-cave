import { gsap } from "gsap";

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