namespace SpriteKind {
    export const Zombie = SpriteKind.create()
    export const Pickup = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    setAimDirection(0, -1)
})
function setAimDirection (dx: number, dy: number) {
    if (dx == 0 && dy == 0) {
        return
    }
    aimDx = dx
    aimDy = dy
}
function startWave (w: number) {
    if (w < 0 || w >= wavePlans.length) {
        return
    }
    waveIndex = w
    zombiesRemainingToSpawn = wavePlans[w].zombieCount
zombiesAlive = 0
    game.splash("WAVE " + (w + 1), wavePlans[w].lore)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    setAimDirection(-1, 0)
})
// filled in later
function updateHud () {
	
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    setAimDirection(1, 0)
})
function gameOverLose () {
    game.over(false)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    setAimDirection(0, 1)
})
function createPlayer () {
    player2 = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . . f 1 1 1 1 1 1 1 1 f . . . 
        . . f 1 1 1 1 1 1 1 1 1 f . . . 
        . . f 1 1 1 1 f f 1 1 1 f . . . 
        . . f 1 1 1 f 1 1 f 1 1 f . . . 
        . . f 1 1 1 1 1 1 1 1 1 f . . . 
        . . . f 1 1 1 1 1 1 1 f . . . . 
        . . . . f f 1 1 1 1 f . . . . . 
        . . . . . . f f f f . . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(player2, 85, 85)
    player2.setStayInScreen(true)
    scene.cameraFollowSprite(player2)
}
function gameOverWin () {
    game.over(true)
}
let player2: Sprite = null
let zombiesAlive = 0
let waveIndex = 0
let aimDy = 0
let aimDx = 0
let wavePlans: number[] = []
let reloading = false
let zombiesRemainingToSpawn = 0
type WavePlan = {
    zombieCount: number
    zombieSpeed: number
    spawnIntervalMs: number
    lore: string
}
let maxHealth = 100
let health = 100
let clipSize = 8
let ammoInClip = 8
let reserveAmmo = 40
wavePlans = [
{ zombieCount: 6, zombieSpeed: 25, spawnIntervalMs: 800, lore: "Day 1: The announcements never ended." },
{ zombieCount: 8, zombieSpeed: 28, spawnIntervalMs: 750, lore: "Day 2: The cafeteria went silent." },
{ zombieCount: 10, zombieSpeed: 30, spawnIntervalMs: 700, lore: "Day 3: Lockdown became life." },
{ zombieCount: 12, zombieSpeed: 33, spawnIntervalMs: 650, lore: "Day 4: We stopped waiting for help." },
{ zombieCount: 14, zombieSpeed: 36, spawnIntervalMs: 600, lore: "Day 5: The halls belong to them now." },
{ zombieCount: 16, zombieSpeed: 39, spawnIntervalMs: 560, lore: "Day 6: We learned to run quietly." },
{ zombieCount: 18, zombieSpeed: 42, spawnIntervalMs: 520, lore: "Day 7: The nurse's office ran out." },
{ zombieCount: 20, zombieSpeed: 45, spawnIntervalMs: 480, lore: "Day 8: The gym doors broke." },
{ zombieCount: 22, zombieSpeed: 48, spawnIntervalMs: 440, lore: "Day 9: Nobody answers texts anymore." },
{ zombieCount: 25, zombieSpeed: 52, spawnIntervalMs: 400, lore: "Day 10: I can't believe my father did this to me." }
]
aimDx = 1
createPlayer()
startWave(0)
