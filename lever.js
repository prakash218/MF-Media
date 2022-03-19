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
      this.angle = 0;
    }
  
    over() {
      // Is mouse over object
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.rollover = true;
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
      } else if (this.rollover) {
        fill(200,200,40);
        
      } else {
        fill(230,230,20);
      }
	  rect(this.x, this.y, this.w, this.h);
	  textSize(15);
	  text(this.type, this.x + this.w + 12, this.y + this.h / 2 + 5);
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
        this.x = x;
        this.y = y;
        this.left_img = left_img;
        this.right_img = right_img;
        this.img = this.left_img
        this.dir = 'left';
		this.offset = {0:[75,100],1:[75,25], 2:[25,25], 3:[25,100]}
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
	show_outline(type)
	{
		for(var i = 0; i < this.keycodes.length; ++i)
		{
			if(type == this.keycodes[i])
			{
				stroke(255,0,0);
				strokeWeight(5);
				noFill();
				circle(this.x + this.offset[i][0], this.y + this.offset[i][1], 20)
			}
		}
	}
	get_pos()
	{
		var res = [];
		for(var i = 0; i < this.keycodes.length; ++i)
		{
			res.push([this.x + this.offset[i][0], this.y + this.offset[i][1]]);
		}
		return res;
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
    }
    
    
}

class leverC111_V3 extends Lever{
    constructor(x, y, left_img, right_img){
        super(x, y, left_img, right_img, 'C111_V3');
        this.keys = 3
        this.keycodes = ['6N', 'AN', '5R'];
    }
    
}

class leverC111_V1 extends Lever{
    constructor(x, y, left_img, right_img){
        super(x, y, left_img, right_img, 'C111_V1');
        this.keys = 3
        this.keycodes = ['6N', 'AN', '5N'];
    }
    
}

class leverAG5 extends Lever{
    constructor(x, y, left_img, right_img){
        super(x, y, left_img, right_img, 'AG5');
        this.keys = 4
        this.keycodes = ['5R', '5N', '5', '5'];

    }
    
}


class leverV6 extends Lever{
    constructor(x, y, left_img, right_img){
        super(x, y, left_img, right_img, 'V6');
        this.keys = 2
        this.keycodes = ['6N', '5'];
    }
    
}