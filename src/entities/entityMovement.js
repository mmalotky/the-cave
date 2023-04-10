import { horizontalMove, verticalMove } from "../animations/ComponentAnimations";

export function entityMovement(entity, tickrate) {
    const step = entity.movement.charAt(0);
    
    switch(step) {
        case 'r':
            entity.x++;
            horizontalMove("#" + entity.id, entity.x, tickrate*2);
            break;
        case 'l':
            entity.x--;
            horizontalMove("#" + entity.id, entity.x, tickrate*2);
            break;
        case 'u':
            entity.y--;
            verticalMove("#" + entity.id, entity.y, tickrate*2);
            break;
        case 'd':
            entity.y++;
            verticalMove("#" + entity.id, entity.y, tickrate*2);
            break;
    }

    entity.movement = entity.movement.substring(1) + step;
}