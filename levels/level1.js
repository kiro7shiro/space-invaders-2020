import { Enemy } from '../js/Enemy.js'
import WEAPONS from './weapons.js'

export default {
    enemies : [{
        cooldown : 0.5,
        hitpoints : 1,
        image : './pics/SpaceShooterRedux/PNG/Enemies/enemyBlack1.png',
        name : 'enemy1', 
        speed : 600,
        weapon : WEAPONS.enemyLaser
    }],
    spawn : function(game, players) {
        players.forEach(player => {
            var x, y = 0
            x = game.width / 2
            y = game.height - player.height - 10
            if (!player.isVisible()) player.show()
            player.setPosition(x, y)
        })
        const enemySpacing = (game.width - 160) / 9
        for (let row = 0; row < 3; row++) {
            const y = 70 + row * 80
            for (let col = 0; col < 10;col++) {
                const x = col * enemySpacing + 80
                game.enemies.push(new Enemy(
                    game.element,
                    x, y,
                    Object.assign(this.enemies[0], {name : 'enemy' + game.enemies.length})
                ))
            }
        }
    }
}