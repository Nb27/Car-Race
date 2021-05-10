class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,220);
    car1.addImage("car1",car1_img);
    car1.scale=0.4;
    car2 = createSprite(300,220);
    car2.addImage("car2",car2_img);
    car2.scale=0.4;
    cars = [car1, car2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    Player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(75,75,75));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = width / 2 - 655 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 455;
        //use data form the database to display the cars in y direction
        y = displayHeight/1.25 - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3500){
      gameState = 2;
      player.rank +=1;
      Player.updateCarsAtEnd(player.rank);
      swal({
        title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
        text: "You reached the finish line successfully",
        imageUrl:
          "https://github.com/Nb27/Car-Race/blob/master/images/cup.png?raw=true",
        imageSize: "100x100",
        confirmButtonText: "Ok",
      });
    }
   
    drawSprites();
  }

  end(){
  }
}