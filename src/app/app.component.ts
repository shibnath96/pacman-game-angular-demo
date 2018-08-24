import { Component, OnInit } from '@angular/core';

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

  constructor( private services : GlobalService ) {
    document.title = this.title;
    this.gameMap = services.map;
  }

  ngOnInit() {}

}
