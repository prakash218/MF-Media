var WIDTH = 1400;
var HEIGHT = 800;
var LEVERS = [];
var TOGGLES = [];
var KEYS = [];


function setup()
{
    cnv = createCanvas(WIDTH, HEIGHT);
    cnv.mousePressed(handle_mouse_click);
    cnv.mouseReleased(mouseReleased);

    for(var i = 0;i <= 4; ++i)
    {
        if(i == 0)
            LEVERS.push(new leverA1(i * 220 + 110, (HEIGHT * (3/4)) - 50, lever_left, lever_right));
        else if(i == 1)
            LEVERS.push(new leverC111_V3(i * 220 + 110, (HEIGHT * (3/4)) - 50, lever_left, lever_right));
        else if(i == 2)
            LEVERS.push(new leverC111_V1(i * 220 + 110, (HEIGHT * (3/4)) - 50, lever_left, lever_right));
        else if(i == 3)
            LEVERS.push(new leverAG5(i * 220 + 110, (HEIGHT * (3/4)) - 50, lever_left, lever_right));
        else if(i == 4)
            LEVERS.push(new leverV6(i * 220 + 110, (HEIGHT * (3/4)) - 50, lever_left, lever_right));
        TOGGLES.push(LEVERS[i]);
    }
    KEYS.push(new Key(WIDTH - 250, HEIGHT / 2 + 60, 10, 30, "A1", key_image));
    KEYS.push(new Key(WIDTH - 250, HEIGHT / 2 + 110, 10, 30, "C111_V3", key_image));
    KEYS.push(new Key(WIDTH - 250, HEIGHT / 2 + 160, 10, 30, "C111_V1", key_image));
    KEYS.push(new Key(WIDTH - 250, HEIGHT / 2 + 210, 10, 30, "AG5", key_image));
    KEYS.push(new Key(WIDTH - 250, HEIGHT / 2 + 260, 10, 30, "V6", key_image));

    
}


function preload()
{
    //load lever image
    lever_left = loadImage("images/lever_left.png");
    lever_right = loadImage("images/lever_right.png");
    key_image  = loadImage("images/key.png");
    emergencybtn = loadImage("images/emergencybtn.png");
}

function draw_track()
{
    //change line color to red
    strokeWeight(5);
    stroke(0);
    var Y_OFFSET = 50;
    line(20, HEIGHT / 4 + Y_OFFSET,WIDTH - 20, HEIGHT / 4 + Y_OFFSET);
    line(WIDTH / 2, HEIGHT / 4 + Y_OFFSET, WIDTH / 2 + 150, HEIGHT / 4 + Y_OFFSET - 200);
    line(WIDTH / 2 + 150, HEIGHT / 4 + Y_OFFSET - 200, WIDTH - 20, HEIGHT / 4 + Y_OFFSET - 200);
    strokeWeight(1)
    
    
}

function handle_mouse_click()
{
    mx = mouseX;
    my =  mouseY;
    for(var i = 0;i <= 4; ++i)
    {
        if(LEVERS[i].x <= mx && mx <= LEVERS[i].x + 100 && LEVERS[i].y + 210 <= my && my <= LEVERS[i].y + 240)
        {
            console.log(mx, my);
            LEVERS[i].toggle();
        }
    }
    for(var i = 0;i <= 4; ++i)
    {
        if(KEYS[i].over())
        {
            console.log('inside')
            KEYS[i].pressed();
        }
        // if(KEYS[i].x <= mx && mx <= KEYS[i].x + 20 && KEYS[i].y <= my && my <= KEYS[i].y + 40)
        // {
        //     if
        //     KEYS[i].pressed();
        //     console.log(mx, my);
        //     // KEYS[i].toggle();
        // }
    }
}

function draw_keybox()
{
    fill(0);
    stroke(255);
    strokeWeight(1);
    rect(WIDTH - 280, HEIGHT / 2 + 50, 250, 300);
    // write toggle inside the rect
    fill(0);
    for(var i = 0; i <= 4; ++i)
    {
        KEYS[i].update();
        KEYS[i].over();
        KEYS[i].show();
    }
}


function mouseReleased()
{
    for(var i = 0;i <= 4; ++i)
    {
        console.log('release')
        KEYS[i].released();
    }
}

function draw()
{
    background(0);


    fill(200);
    noStroke();
    rect(10, 10, WIDTH - 20, HEIGHT / 2 - 20);
    draw_track();
    for(var i = 0;i <= 4; ++i)
    {
        LEVERS[i].draw();
    }
    image(emergencybtn, WIDTH/2 - 30, HEIGHT/2 + 30, 50, 50);

    textSize(20);
    textAlign(CENTER);
    for(var i = 0;i <= 4; ++i)
    {
        fill(230);
        stroke(255);
        strokeWeight(1);
        rect(LEVERS[i].x, LEVERS[i].y + 210, 100, 30);
        // write toggle inside the rect
        fill(0)
        text("toggle", LEVERS[i].x + 50, LEVERS[i].y + 230);
        
    }
    draw_keybox();
    

}