import { horizontalMove, verticalMove } from "../animations/ComponentAnimations";

export function entityMovement(entity, playerX, playerY, gameOver, tickrate) {
    const step = entity.movement.charAt(0);

    //pause movement if an entity collides with a player
    const playerCollision = function(x, y) {
        return playerX === 32-x && playerY === 16-y;
    }
    
    //change entity position based on the current step in the movement string
    switch(step) {
        case 'r':
            if(playerCollision(entity.x + 1, entity.y)) {
                if(entity.gameover) {
                    gameOver();
                }
                return;
            }

            entity.x++;
            horizontalMove("#" + entity.id, entity.x, tickrate*2);
            break;
        case 'l':
            if(playerCollision(entity.x - 1, entity.y)) {
                if(entity.gameover) {
                    gameOver();
                }
                return;
            }

            entity.x--;
            horizontalMove("#" + entity.id, entity.x, tickrate*2);
            break;
        case 'u':
            if(playerCollision(entity.x, entity.y - 1)) {
                if(entity.gameover) {
                    gameOver();
                }
                return;
            }

            entity.y--;
            verticalMove("#" + entity.id, entity.y, tickrate*2);
            break;
        case 'd':
            if(playerCollision(entity.x, entity.y + 1)) {
                if(entity.gameover) {
                    gameOver();
                }
                return;
            }

            entity.y++;
            verticalMove("#" + entity.id, entity.y, tickrate*2);
            break;
    }

    //run the movement string like a tape
    entity.movement = entity.movement.substring(1) + step;
}