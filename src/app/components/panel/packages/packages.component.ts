import {Component, OnInit} from '@angular/core';
import {PackageService} from '../../../services/package.service';
import {GridOption} from '../../../interfaces/gridOption';
import {Package} from '../../../interfaces/interfaces';
import {AggregationFunction, ComponentType, DataFormat, DataType} from '../../../enums/datatype';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  constructor( private packag: PackageService ) {}

  gridOptions: GridOption = undefined;
  tabledata: Package[] = [] ;
  ngOnInit(): void {
    this.gridOptions = {
      ColumnDefinitions: [
        {
          headerName: 'PackageName',
          field: 'name',
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

    this.packag.get().subscribe((data) => {
      console.log(data);
      this.tabledata = data;
    });

  }
  add(obj): any {
    this.packag.add(obj);
  }
  delete(obj): any {
    for (const i of obj) {
      this.packag.remove(i.id);
    }
  }

  update(obj): any {
     this.packag.update( obj); }
}

