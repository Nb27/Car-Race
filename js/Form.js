class Form {

  constructor() {
    this.logoImg = "../images/logo.png";
    this.logo = createImg(this.logoImg);
    this.input = createInput("");
    this.button = createButton('Start Game');
    this.greeting = createElement('h2');
    this.reset = createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.logo.hide();
  }

  display(){
    
    this.logo.position(displayWidth/2.3 - 250, 0);

    this.input.position(displayWidth/2.3 - 40 , displayHeight/2 - 80);
    this.input.class("customInput");
    this.button.position(displayWidth/2.3-10, displayHeight/2);
    this.button.class("customButton")
    this.reset.position(displayWidth-100,20);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2.3 - 70, displayHeight/4);
    });

    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      this.display();
    });

  }
}