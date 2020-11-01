import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ModalService} from '../../../services/modal.service';
import {ColorEvent} from 'ngx-color';
import {SaveChangesService} from '../../../services/save-changes.service';


@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
// export interface Lists {
//   id: string;
//   primaryColor: string;
//   pin: boolean ;
//
//  }
export class DragdropComponent  implements OnInit {

 todo: any [] = null ;
  done: any [] = null ;


  bodyText: string;
  private receved1: any ;
  private receved2: any ;



  constructor(private modalService: ModalService , private storage: SaveChangesService) { }


  ngOnInit(): any{
    this.bodyText = 'This text can be updated in modal 1';
    this.receved1 = localStorage.getItem('mytodoarray');
    this.receved2 = localStorage.getItem('mydonearray');
    if (this.receved1 && this.receved2) {
      this.todo = JSON.parse(this.receved1);
      this.done = JSON.parse(this.receved2);
    }else {
      this.todo = [{ id : '1', primaryColor : '#F78DA7' , pin : false},
        {id : '2'  , primaryColor : '#D4A6D8' , pin : false},

      ];
      this.done = [
        // {id : '4', primaryColor : '#D4A6D5' , pin : false},
        // {id : '5', primaryColor : '#D4A6D9' , pin : false}
      ];
    }
  }

  openModal(id: string[]): any {
    this.modalService.open(id);
  }

  closeModal(id: string): any {
    this.modalService.close(id);
  }

  drop(event: CdkDragDrop<any[]>): any {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  changeComplete(obj , $event: ColorEvent): void {
    for (const item of this.todo) {
      if ( obj === item.id ){
      item.primaryColor = $event.color.hex; }
      this.storage.store(this.todo , this.done);
    }
  }

  pin(obj): any {
    for (const item of this.todo) {
      if ( obj === item.id ){
        if (item.pin === true ){item.pin = false ; }
        item.pin = true ; }
      this.storage.store(this.todo , this.done);
    }


  }

  save(): any {
    this.storage.store(this.todo , this.done);
  }
}

