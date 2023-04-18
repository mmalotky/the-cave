import { horizontalMove, verticalMove } from "../animations/ComponentAnimations";
import { checkCoords } from "../levels/LevelLoader";

export function entityMovement(entity, playerX, playerY, gameOver, tickrate) {
    const step = entity.movement.charAt(0);

    //pause movement if an entity collides with a player
    const playerCollision = function(x, y) {
        return playerX === 16-x && playerY === 8-y;
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


export function entityView(entity, playerX, playerY, level) {
    //estabilsh direction and range of view
    const direction = entity.direction.charAt(0);
    entity.direction = entity.direction.substring(1) + direction;
    const range = entity.range;

    //check direction for player
    switch(direction) {
        case 'r':
            for(let x = entity.x; x < entity.x + range; x++) {
                if(checkCoords(level, 16-x, 8-entity.y) != 0) {
                    break;
                }
                if(16-playerX === x && 8-playerY === entity.y) {
                    return true;
                }
            }
            break;
        case 'l':
            for(let x = entity.x; x > entity.x - range; x--) {
                if(checkCoords(level, 16-x, 8-entity.y) != 0) {
                    break;
                }
                if(16-playerX === x && 8-playerY === entity.y) {
                    return true;
                }
            }
            break;
        case 'u':
            for(let y = entity.y; y > entity.y - range; y--) {
                if(checkCoords(level, 16-entity.x, 8-y) != 0) {
                    break;
                }
                if(16-playerX === entity.x && 8-playerY === y) {
                    return true;
                }
            }
            break;
        case 'd':
            for(let y = entity.y; y < entity.x + range; y++) {
                if(checkCoords(level, 16-entity.x, 8-y) != 0) {
                    break;
                }
                if(16-playerX === entity.x && 8-playerY === y) {
                    return true;
                }
            }
            break;
    }

    return false;
}