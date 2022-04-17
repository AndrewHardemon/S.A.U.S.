const WIDTH = 800-16
const HEIGHT = 600-59
const SPEED = 3
const COLOR = '#ffffff'
const WALL_THICKNESS = 1;

const DIRECTION = {
    IDLE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
    //add more?
}

// Editable Global Variables
const colors = ['#1abc9c', '#2ecc71', '#3498db', '#e74c3c', '#9b59b6']

const Square = {
    new: function (incrementedSpeed){ //possibly add dynamic positions
        let width = 10;
        let height = 10; 
        return {
            width,
            height,
            x: (WIDTH/2) - (width/2),
            y: (HEIGHT/2) - (height/2),
            moveX: DIRECTION.IDLE,
            moveY: DIRECTION.IDLE,
            speed: incrementedSpeed || SPEED
        }
    }
}

const Ball = {
    new: function (incrementedSpeed){ //possibly add dynamic positions
        let radius = 10;
        return {
            radius,
            x: (WIDTH/2) - radius,
            y: (HEIGHT/2) - radius,
            moveX: DIRECTION.IDLE,
            moveY: DIRECTION.IDLE,
            speed: incrementedSpeed || SPEED
        }
    }
}

const Wall = {
    new: function (side) {
        //Initialize the Height and Width
        let width, height;

        if(side === "left" || side === "right") {
            width = WALL_THICKNESS
            height = HEIGHT
        } else if (side === "up" || side === "down"){
            width = WIDTH
            height = WALL_THICKNESS
        } else {
            throw new Error("Side is an invalid property (init height width)")
        }

        //Initialize the x y coordinates
        let x, y;
        switch(side){
            case "up": x = 0; y = HEIGHT-WALL_THICKNESS;
                break;
            case "down": x = 0; y = 0;
                break;
            case "left": x = 0; y = 0;
                break;
            case "right": x = WIDTH-WALL_THICKNESS; y = 0;
                break;
            default:
                throw new Error("Side is an invalid property (init x y)")
        }

        return {
            width,
            height,
            x,
            y,
            move: DIRECTION.IDLE, //should always be IDLE,
            speed: 0 //possibly null
        }
    }
}

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

// Initialize Canvas
canvas.width = WIDTH;
canvas.height = HEIGHT;

let pause = false;
const runProgram = () => {
    //Grab data from localstorage or elsewhere
    //Draw the Canvas
    update();
    draw();

    if(!pause){
        // runProgram()
    }

    // // const item1 = document.createElement("span")
    // const item1 = document.getElementById("item1")
    // // document.body.appendChild(item1)
    // item1.classList.add("dot")
    // item1.classList.add("dialog")
    // // item1.style.transform = "translateY(1000px)"
    // // item1.style.transition = "all 6s"
    
}

const wall_up = Wall.new("up");
const wall_down = Wall.new("down")
const wall_left = Wall.new("left")
const wall_right = Wall.new("right")

const walls = [wall_up, wall_down, wall_left, wall_right]
const ball1 = Ball.new()
ball1.moveX = DIRECTION.RIGHT
ball1.moveY = DIRECTION.DOWN
const draw = () => {
    //Clear Canvas
    context.clearRect(0,0,WIDTH,HEIGHT)
    //Fill Canvas
    context.fillStyle = "white"
    context.fillRect(0,0,WIDTH,HEIGHT)
    
    //Create Items
    

    context.fillStyle = "red"
    // context.fillRect(ball1.x, ball1.y, ball1.width, ball1.height)
    context.beginPath()
    context.arc(ball1.x, ball1.y, ball1.radius, 0, Math.PI * 2, true)
    context.stroke();
    context.fill("evenodd")

    // context.fillRect(100,100,100,100)
    
    

    walls.forEach(wall => {
        context.fillStyle = "red"
        context.fillRect(wall.x, wall.y, wall.width, wall.height)
        context.fillStyle = "red"
    })



    update(ball1)
    console.log("hello")
    requestAnimationFrame(draw)
}

const update = (...rest) => {
    rest.forEach(item => {
        if(item.moveX === DIRECTION.RIGHT){
            item.x += item.speed 
        } else if(item.moveX === DIRECTION.LEFT){
            item.x -= item.speed
        } else {
            console.log("Help", item.moveX)
        }
    
        if(item.x <= WALL_THICKNESS || item.x >= WIDTH - WALL_THICKNESS) {
            item.moveX = item.moveX === DIRECTION.RIGHT ? DIRECTION.LEFT : DIRECTION.RIGHT
        }
        
    
        if(item.moveY === DIRECTION.UP){
            item.y += item.speed 
        } else if(item.moveY === DIRECTION.DOWN){
            item.y -= item.speed
        }else {
            console.log("Help", item.moveY)
        }
    
    
        if(item.y <= WALL_THICKNESS || item.y >= HEIGHT - WALL_THICKNESS) {
            item.moveY = item.moveY === DIRECTION.UP ? DIRECTION.DOWN : DIRECTION.UP
        }
    })
    // if(ball1.x <= 0)
}


runProgram()

document.addEventListener("keydown", function(key){
    if(pause){
        runProgram()
    }
    pause = !pause
})

// const Program = {
//     initialize: function(){
//         this.
//     }
// }