import { horizontalMove, verticalMove } from "../animations/ComponentAnimations";

export function entityMovement(entity, playerX, playerY, tickrate) {
    const step = entity.movement.charAt(0);

    const playerCollision = function(x, y) {
        return playerX === 32-x && playerY === 16-y;
    }
    
    switch(step) {
        case 'r':
            if(playerCollision(entity.x + 1, entity.y)) {
                return;
            }

            entity.x++;
            horizontalMove("#" + entity.id, entity.x, tickrate*2);
            break;
        case 'l':
            if(playerCollision(entity.x - 1, entity.y)) {
                return;
            }

            entity.x--;
            horizontalMove("#" + entity.id, entity.x, tickrate*2);
            break;
        case 'u':
            if(playerCollision(entity.x, entity.y - 1)) {
                return;
            }

            entity.y--;
            verticalMove("#" + entity.id, entity.y, tickrate*2);
            break;
        case 'd':
            if(playerCollision(entity.x, entity.y + 1)) {
                return;
            }

            entity.y++;
            verticalMove("#" + entity.id, entity.y, tickrate*2);
            break;
    }

    entity.movement = entity.movement.substring(1) + step;
}