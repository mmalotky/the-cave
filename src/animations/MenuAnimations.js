import { gsap } from "gsap";

export function closeMenu(el) {
    gsap.to(el, {
        opacity:0,
        duration:1
    })
}