export default {
    playerLaser : {
        cooldown : 0.5,
        damage : 1,
        image : './pics/SpaceShooterRedux/PNG/Lasers/laserBlue01.png',
        name : 'laser',
        sound : './sounds/8-Bit Sound Library/Wav/Shoot_00.wav',
        speed : 600,
        transforms : []
    },
    enemyLaser : {
        cooldown : 4,
        damage : 1,
        image : './pics/SpaceShooterRedux/PNG/Lasers/laserRed01.png',
        name : 'laser',
        sound : './sounds/8-Bit Sound Library/Wav/Shoot_02.wav',
        speed : 600,
        transforms : ['rotate(180deg)']
    },
    explosion : {
        sound : './sounds/8-Bit Sound Library/Wav/Explosion_00.wav'
    }
}