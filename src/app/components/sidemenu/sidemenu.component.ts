import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {

  constructor() { }
  isShowDiv = true;
  show = false;
  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  toggle(): any {
    this.show = !this.show;
  }
}
