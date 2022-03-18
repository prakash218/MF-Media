var WIDTH = 1400;
var HEIGHT = 800;
var LEVERS = [];
var TOGGLES = [];
var KEYS = [];
var dragging = false;
var current = null;
var last_key = null;
var KEY_HOLES = [];
var function_called = false;
var key_nature = 'locked';

function setup()
{
    cnv = createCanvas(WIDTH, HEIGHT);
    cnv.mousePressed(handle_mouse_click);
    cnv.mouseReleased(mouseReleased);
    cnv.doubleClicked(rotatekey);
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
        KEY_HOLES.push([LEVERS[i], LEVERS[i].get_pos()])
    }
    KEYS.push(new Key(WIDTH - 250, HEIGHT / 2 + 60, 10, 30, "AN", key_image));
    KEYS.push(new Key(WIDTH - 250, HEIGHT / 2 + 110, 10, 30, "5N", key_image));
    KEYS.push(new Key(WIDTH - 250, HEIGHT / 2 + 160, 10, 30, "5", key_image));
    KEYS.push(new Key(WIDTH - 250, HEIGHT / 2 + 210, 10, 30, "5R", key_image));
    KEYS.push(new Key(WIDTH - 250, HEIGHT / 2 + 260, 10, 30, "6N", key_image));

    
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
    function_called = false;
    dragging = true;
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
            KEYS[i].pressed();
            current = KEYS[i];
            
        }
    }
}
function rotatekey()
{
    if(key_nature == 'locked'){
        last_key.w = 30
        last_key.h = 10
        last_key.y = last_key.y + 10
        last_key.x = last_key.x - 10
        last_key.show();
        key_nature = 'unlocked';
    }
    else if(key_nature == 'unlocked'){
        last_key.w = 10
        last_key.h = 30
        last_key.y = last_key.y 
        last_key.x = last_key.x 
        last_key.show();
        key_nature = 'locked';
    }
}



function isMouseInside(x, y, w, h, mx, my){
    if(mx > x && mx < x+w && my > y && my < y + h){
     return true; 
    } else {
     return false; 
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


function check_key(key){
    mx = mouseX;
    my =  mouseY;
    curr_key = key
    var flag = false;
    for(var i = 0; i <= 4; i++) {
        for(var j = 0; j < LEVERS[i].keycodes.length; j++) {
            checking = LEVERS[i].keycodes[j];
            if(curr_key.type == checking ) {
                if(isMouseInside(LEVERS[i].offset[j][0] + LEVERS[i].x - 10, LEVERS[i].offset[j][1] + LEVERS[i].y - 10, 20, 20, mx, my))
                {
                    console.log("key found");
                    curr_key.x = LEVERS[i].offset[j][0] + LEVERS[i].x - 5;
                    curr_key.y = LEVERS[i].offset[j][1] + LEVERS[i].y - 15;
                    flag = true;
                    // doubleClicked(curr_key);
                    last_key = curr_key;
                    break;
                }
            }

        }
        if(flag) break;
    }
}

function mouseReleased()
{
    for(var i = 0;i <= 4; ++i)
    {
        KEYS[i].released();
    
    }
    dragging = false;
    if(function_called == false){
        check_key(current);
        function_called = true;
    }
    current = null;
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
    if(dragging && current){
        for(lever of LEVERS){
            lever.show_outline(current.type);
        }
    }
    

}