export default {
    playerLaser : {
        cooldown : 0.5,
        hitpoints : 1,
        id : 'laser',
        image : './pics/SpaceShooterRedux/PNG/Lasers/laserBlue01.png',
        sound : './sounds/8-Bit Sound Library/Wav/Shoot_01.wav',
        speed : 600,
        transforms : []
    },
    enemyLaser : {
        cooldown : 4,
        hitpoints : 1,
        id : 'laser',
        image : './pics/SpaceShooterRedux/PNG/Lasers/laserRed01.png',
        sound : './sounds/8-Bit Sound Library/Wav/Shoot_02.wav',
        speed : 600,
        transforms : ['rotate(180deg)']
    }
}