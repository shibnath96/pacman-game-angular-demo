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
        if( nextLeft == this.EAT_COIN ) {
          this.scoreUpdate( this.EAT_COIN );
        } else if( nextLeft == this.EAT_BIG_COIN ) {
          this.scoreUpdate( this.EAT_BIG_COIN );
        }
        this.pacmanMove = 4;
        this.pacmanMoved( this.initPacmanX, this.initPacmanY );
        this.initPacmanY --;
      }
      
    }else if ( event.keyCode == 38) {
      //Up Arrow Key ^
      let nextUp = this.initPacmanX - 1;
      if( this.gameMap[ nextUp ][ this.initPacmanY ] == this.WALL ) {
        console.log('Wall');//Pacman can't be moved away towards it's up
        
      }else {
        //Pacman will move one step away towards it's up
        this.pacmanMove = 1;//Set the pacman face towards up
        this.pacmanMoved( this.initPacmanX, this.initPacmanY );
        this.initPacmanX --;
      }

    }else if ( event.keyCode == 39) {
      //Right Arrow Key >
      let nextRight = this.initPacmanY + 1;

      if ( this.gameMap[this.initPacmanX][nextRight] == this.WALL ) {
        console.log('Wall');//Pacman can't be moved away towards it's right
      }else {
        //Pacman will move one step away towards it's right
        this.pacmanMove = 2;//Set the pacman face towards right
        this.pacmanMoved( this.initPacmanX, this.initPacmanY );
        this.initPacmanY ++;
      }
      
    }else if ( event.keyCode == 40) {
      //Down Arrow Key v
      let nextUp = this.initPacmanX + 1;
      if( this.gameMap[ nextUp ][ this.initPacmanY ] == this.WALL ) {
        console.log('Wall');//Pacman can't be moved away towards it's down
      }else {
        //Pacman will move one step away towards it's left
        this.pacmanMove = 3;//Set the pacman face towards left
        this.pacmanMoved( this.initPacmanX, this.initPacmanY );
        this.initPacmanX ++;
      }
      
    }else if ( event.keyCode == 13) {
      //Enter Key 
      console.log('Enter Key press ');
      
    }
    console.log(this.initPacmanX,this.initPacmanY);
    this.gameMap [ this.initPacmanX ][ this.initPacmanY ] =5;
  }

  pacmanMoved( x , y ) {
    this.gameMap[x][y] = 2; //Replacing the pacman with black block
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

    console.log(this.initPacmanX,this.initPacmanY);
    
  }

  scoreUpdate( coin ) {
    if( coin == this.EAT_COIN) {
      this.totalScore = this.totalScore + this.eatCoin;
    } else if( coin == this.EAT_BIG_COIN) {
      this.totalScore = this.totalScore + this.eatBigCoin;  
    }
  }


}
