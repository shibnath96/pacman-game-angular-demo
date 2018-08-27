import { Component, OnInit, HostListener, ViewChild } from '@angular/core';

//Services 
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'Pacman Game';
  gameMap : Array<Object>;
  initPacmanX: any; initPacmanY: any;
  WALL: number = 0; PACMAN: number = 5; ROAD: number = 2;
  EAT_COIN: number = 1; EAT_BIG_COIN:number = 4; GHOST: number = 3;
  totalScore: number = 0; eatCoin : number = 2; eatBigCoin = 4;
  pacmanMove:number = 2; // 1 ==> up, 2==>right, 3==>down, 4==>left 

  //Gost properties
  ghostY:number; ghostX:number;
  ghostRunning: boolean = false;
  ghostCrashed: boolean = false;
  ghostFreeMove: number; // 1--> Up, 2-->Right, 3--> Down, 4--> Left

  @HostListener('window:keydown', ['$event'])
  controlKeyboardEvent(event) {

    if ( event.keyCode == 37) {
      //Left Arrow Key < (20,8) 
      let nextLeftY = this.initPacmanY - 1;
      let nextLeft = this.gameMap[this.initPacmanX][nextLeftY]
      if ( nextLeft == this.WALL ) {
        console.log('Wall');//Pacman Can't be moved away towards it's left
      }else {
        //Pacman will move one step away towards it's left
        //Set the pacman face towards left
        
        this.scoreUpdate( nextLeft );//For updating score
        this.pacmanMove = 4;//Setting pacman's face towards left
        this.pacmanMoved( this.initPacmanX, this.initPacmanY );
        
        if(this.initPacmanY == 0){
          //When pacman reached at left end point of map 
          this.initPacmanY = this.gameMap[this.initPacmanY]['length'] - 1;//Setting pacman's new position to right end of map
          this.scoreUpdate( this.gameMap[this.initPacmanX][this.initPacmanY] );
        }else {
          this.initPacmanY --;
        }
      }
      
    }else if ( event.keyCode == 38) {
      //Up Arrow Key ^
      if( this.initPacmanX == 0) {
        //When pacman reach extrem up end to game map
        this.pacmanMoved( this.initPacmanX, this.initPacmanY );
        this.scoreUpdate( this.gameMap[this.initPacmanX][this.initPacmanY] );
        this.initPacmanX = this.gameMap.length - 1;
        this.pacmanMove = 1;//Set the pacman face towards up
      }else {
        let nextUpX = this.initPacmanX - 1;
        let nextUp = this.gameMap[ nextUpX ][ this.initPacmanY ];
        if( nextUp == this.WALL ) {
          console.log('Wall');//Pacman can't be moved away towards it's up
          
        }else {
          //Pacman will move one step away towards it's up
          this.pacmanMove = 1;//Set the pacman face towards up
          this.scoreUpdate( nextUp );//Udating score
          this.pacmanMoved( this.initPacmanX, this.initPacmanY );
          this.initPacmanX --;
        }
      }
      

    }else if ( event.keyCode == 39) {
      //Right Arrow Key >
      let nextRightY = this.initPacmanY + 1;
      let nextRight = this.gameMap[this.initPacmanX][nextRightY];
      if ( nextRight == this.WALL ) {
        console.log('Wall');//Pacman can't be moved away towards it's right
      }else {
        //Pacman will move one step away towards it's right
        this.pacmanMove = 2;//Set the pacman face towards right
        this.scoreUpdate( nextRight );//Updating score
        this.pacmanMoved( this.initPacmanX, this.initPacmanY );

        if( this.initPacmanY == this.gameMap[this.initPacmanY]['length'] - 1 ) {
          this.initPacmanY = 0;
          this.scoreUpdate( this.gameMap[this.initPacmanX][this.initPacmanY] )
        }else {
          this.initPacmanY ++;
        }
        
      }
      
    }else if ( event.keyCode == 40) {
      //Down Arrow Key v
      if( this.initPacmanX == this.gameMap.length - 1 ) {
       //When pacman reach extrem down end to game map 
        this.pacmanMoved( this.initPacmanX, this.initPacmanY );
        this.scoreUpdate( this.gameMap[this.initPacmanX][this.initPacmanY] );
        this.initPacmanX = 0;
        this.pacmanMove = 3;
      } else {
        let nextUpX = this.initPacmanX + 1;
        let nextUp = this.gameMap[ nextUpX ][ this.initPacmanY ];
        if( nextUp == this.WALL ) {
          console.log('Wall');//Pacman can't be moved away towards it's down
        }else {
          //Pacman will move one step away towards it's left
          this.pacmanMove = 3;//Set the pacman face towards left
          this.scoreUpdate( nextUp );//Updating score
          this.pacmanMoved( this.initPacmanX, this.initPacmanY );
        
          this.initPacmanX ++;
        }
      }
      
    }else if ( event.keyCode == 13) {
      //Enter Key 
      this.ghostRunning = true;
      this.ghostRun();
      
    }
    
    console.log(this.initPacmanX,this.initPacmanY);
    this.gameMap [ this.initPacmanX ][ this.initPacmanY ] = 5;
  }

  pacmanMoved( x , y ) {
    this.gameMap[x][y] = 2; //Replacing the pacman with black block
  }

  scoreUpdate( step ) {
 
    if( step == this.EAT_COIN ) {
      this.totalScore = this.totalScore + this.eatCoin;
    } else if( step == this.EAT_BIG_COIN ) {
      this.totalScore = this.totalScore + this.eatBigCoin;
    }
    
  }

  constructor( private services : GlobalService ) {
    document.title = this.title;
    this.gameMap = services.map;
  }

  ngOnInit() {
    let map = this.gameMap;
    //Initial pacman coordinate (20,8)

    for(let i = 0; i<map.length; i++){
      for(let j = 0 ; j< map[i]['length'] ; j++){
        if(map[i][j] === 5) {
          
          this.initPacmanX = i;
          this.initPacmanY = j;
        }
      }
    }
    
  }

  ghostRun() {
    
    if( this.ghostRunning ){
      console.log('Ghost started run!');
      for(let i = 0; i<this.gameMap.length; i++){
        for(let j = 0 ; j< this.gameMap[i]['length'] ; j++){
          if(this.gameMap[i][j] == 3) {
            
            this.ghostX = i;
            this.ghostY = j;
          }
        }
      }
  
      console.log('Ghost located at : GameMap['+this.ghostX+']['+this.ghostY+']=' + this.gameMap[this.ghostX][this.ghostY]);
      let i = 0;

      let run = setInterval( () => {
        //Initial coordinate of ghost(10,9);
        
        //Checking which direction the ghost can take to roam in ghost map
        //let move = Math.floor((Math.random() * 4) + 1);
        let move = 1;
        if( move == 1){
          //move up
          this.moveUp();
        }else if( move == 2) {
          //move right
          this.moveRight();
        }else if( move == 3) {
          //move down
          this.moveDown();
        }else if( move == 4 ) {
          //move left
          this.moveLeft();
        }
  
        //Terminating condition
        if( i == 10)
          clearInterval(run);
        i++;
      }, 400 );

    }

  }
  prevCoin;
  ghostMoved( x, y ) {
    console.log(this.prevCoin);
    this.gameMap[x][y] = this.prevCoin; 
  }

  moveUp() {
    console.log('moveUp');
    if(this.ghostX == 0){
      console.log('Ghost reach extreme up of map');
    } else {
      if(this.gameMap[ this.ghostX - 1 ][ this.ghostY ] !== this.WALL){

        let nextUp = this.gameMap[ this.ghostX - 1 ][ this.ghostY ];
        if( nextUp == this.EAT_COIN) {
          this.prevCoin = this.EAT_COIN;
        }else if(nextUp == this.EAT_BIG_COIN){
          this.prevCoin = this.EAT_BIG_COIN;
        }else{
          this.prevCoin = this.ROAD;
        }
        this.swapPosition(this.ghostX - 1, this.ghostY);
        this.ghostMoved( this.ghostX, this.ghostY );
        this.ghostX --;
      }
    }
  }

  moveRight() {
    console.log('moveRight');
    
  }

  moveDown() {
    console.log('moveDown');
    if(this.ghostX == 0){
      console.log('Ghost reach extreme down of map');
    } else {
      
    }
  }

  moveLeft() {
    console.log('moveLeft');
    
  }

  swapPosition(newX, newY) {
    this.gameMap[ newX ][ newY ] = 3;
  }

}
