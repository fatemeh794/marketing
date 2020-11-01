import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {GridOption} from '../../interfaces/gridOption';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  selectedrows: any = [];
  currentrows: any ;

  @Input()  gridOptions: GridOption = undefined;
  @Input() data ;
  @Output()  add = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(  private modalService: ModalService) {}



  ngOnInit(): void {
     }

  addRowData( object ): any {
    this.data.push(object);
    this.add.emit(object);
  }

  updateRowData(obj): any {
      this.edit.emit(obj);
  }
  deleteRowData(obj): any {
    this.data.splice(this.selectedrows, this.selectedrows.length);
    console.log(obj);
    this.remove.emit(obj);
  }

  // tslint:disable-next-line:no-shadowed-variable
  openModal( id: any ): any {
    this.modalService.open(id);
  }
  closeModal( id: any ): any {
    this.modalService.close(id);
  }
}
