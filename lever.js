class Key {
    constructor(x, y, w, h, type, img) {
  
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?
  
  
      this.x = x;
      this.y = y;
      // Dimensions
      this.w = w;
      this.h = h;
      this.type = type;
      this.img = img
    }
  
    over() {
      // Is mouse over object
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.rollover = true;
        console.log('here');
        return true;
      } else {
        this.rollover = false;
        return false;
      }
  
    }
  
    update() {
  
      // Adjust location if being dragged
      if (this.dragging) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
      }
  
    }
  
    show() {
  
      stroke(0);
      // Different fill based on state
      if (this.dragging) {
        fill(230,230,20);
        rect(this.x, this.y, this.w, this.h);
      } else if (this.rollover) {
        fill(200,200,40);
        rect(this.x, this.y, this.w, this.h);
      } else {
        // fill(230,230,20);
        image(this.img, this.x, this.y);
      }
    }
  
    pressed() {
      // Did I click on the rectangle?
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
      }
    }
  
    released() {
      // Quit dragging
      this.dragging = false;
    }
  }

class Lever{
    constructor(x, y, left_img, right_img, name){
        this.name = name;
        console.log("lever created");
        this.x = x;
        this.y = y;
        this.left_img = left_img;
        this.right_img = right_img;
        this.img = this.left_img
        this.dir = 'left';
    }
    toggle()
    {
        if(this.dir == 'left')
        {
            this.img = this.right_img;
            this.dir = 'right';
        }
        else
        {
            this.img = this.left_img;
            this.dir = 'left';
        }
    }
    draw()
    {
        image(this.img, this.x, this.y, 100, 200);
        textSize(15);
        if(this.keys >= 1)
        {
            fill(200);
            circle(this.x + 75, this.y + 100, 20);
            fill(0);
            text(this.keycodes[0], this.x + 75, this.y + 130);
        }
        if(this.keys >= 2)
        {
            fill(200);
            circle(this.x + 75, this.y + 25, 20);
            fill(0);
            text(this.keycodes[1], this.x + 75, this.y + 55);
        }
        if(this.keys >= 3)
        {
            fill(200);
            circle(this.x + 25, this.y + 25, 20);
            fill(0);
            text(this.keycodes[2], this.x + 25, this.y + 55);
        }
        if (this.keys >= 4)
        {
            fill(200);
            circle(this.x + 25, this.y + 100, 20);
            fill(0);
            text(this.keycodes[3], this.x + 25, this.y + 130);
        }
        strokeWeight(5);
        fill(255);

        text(this.name, this.x + 50, this.y - 10);
        strokeWeight(1);
        // fill(255);
        // rect(this.x, this.y, 100, 100);
    }
}

class leverA1 extends Lever{
    constructor(x, y, left_img, right_img){
        super(x, y, left_img, right_img, 'A1');
        this.keys = 1
        this.keycodes = ['AN'];
        console.log("leverA1 created");
    }
    
    
}

class leverC111_V3 extends Lever{
    constructor(x, y, left_img, right_img){
        super(x, y, left_img, right_img, 'C111_V3');
        this.keys = 3
        this.keycodes = ['6N', 'AN', '5R'];
        console.log("leverC111_V3 created");
    }
    
}

class leverC111_V1 extends Lever{
    constructor(x, y, left_img, right_img){
        super(x, y, left_img, right_img, 'C111_V1');
        this.keys = 3
        this.keycodes = ['6N', 'AN', '5N'];
        console.log("leverC111_V1 created");
    }
    
}

class leverAG5 extends Lever{
    constructor(x, y, left_img, right_img){
        super(x, y, left_img, right_img, 'AG5');
        this.keys = 4
        this.keycodes = ['5R', '5N', '5', '5'];

        console.log("leverC111_V1 created");
    }
    
}


class leverV6 extends Lever{
    constructor(x, y, left_img, right_img){
        super(x, y, left_img, right_img, 'V6');
        this.keys = 2
        this.keycodes = ['6N', '5'];
        console.log("leverA1 created");
    }
    
}