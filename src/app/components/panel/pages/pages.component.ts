import { Component, OnInit } from '@angular/core';
import {PagesService} from '../../../services/pages.service';
import {GridOption} from '../../../interfaces/gridOption';
import {Page} from '../../../interfaces/interfaces';
import {AggregationFunction, ComponentType, DataFormat, DataType} from '../../../enums/datatype';




@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  constructor( private pages: PagesService ) {}
  gridOptions: GridOption = undefined;
  tabledata: Page[] = [] ;
  ngOnInit(): void {
      this.gridOptions = {
          ColumnDefinitions: [
            {
              headerName: 'address',
              field: 'address',
              type: {
                dataType: DataType.Text,
                component: ComponentType.Text
              },
              sortable: true,
              aggregationFunction: AggregationFunction.None
            },
            {
              headerName: 'Create Date',
              field: 'createDate',
              sortable: false,
              type: {
                dataType: DataType.DateTime,
                component: ComponentType.Text,
                formatting: DataFormat['dd/MM/yy hh:mm:ss']
              },
              aggregationFunction: AggregationFunction.None
            },
          ],
          showCheckbox: true,
          filterable: true,
          paging: {recordsOfPage: 10},
          alternateColor: {color: '#bbb'}
        };


      this.pages.get().subscribe((data) => {
      console.log(data);
      this.tabledata = data;
    });

  }
  add(obj): any {
    this.pages.add(obj);
  }
  delete(obj): any {
    for (const i of obj) {
      this.pages.remove(i.id);
    }
  }

  update(obj): any {
    this.pages.update(obj); }
}
