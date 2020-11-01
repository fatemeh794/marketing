import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {ColorEvent} from 'ngx-color';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor() { }
  isShowDiv = true;
  show = false;
  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  toggle() {
    this.show = !this.show;
  }
  toggleDisplayDiv(): any {
    this.isShowDiv = !this.isShowDiv;
  }
}

