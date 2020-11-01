import { Component, OnInit } from '@angular/core';
import {GridOption} from '../../../interfaces/gridOption';
import {AggregationFunction, ComponentType, DataFormat, DataType} from '../../../enums/datatype';
import {PaneladvertisementService} from '../../../services/paneladvertisement.service';
import {Panel} from '../../../interfaces/interfaces';

@Component({
  selector: 'app-advertisementpanel',
  templateUrl: './advertisementpanel.component.html',
  styleUrls: ['./advertisementpanel.component.css']
})
export class AdvertisementpanelComponent implements OnInit {
  constructor( private panel: PaneladvertisementService ) {}

  gridOptions: GridOption = undefined;
  tabledata: Panel[] = [] ;
  ngOnInit(): void {
    this.gridOptions = {
      ColumnDefinitions: [
        {
          headerName: 'OurPage.Address',
          field: 'description',
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

    this.panel.get().subscribe((data) => {
      console.log(data);
      this.tabledata = data;
    });

  }
  add(obj): any {
    this.panel.add(obj);
  }
  delete(obj): any {
    for (const i of obj) {
      this.panel.remove(i.id);
    }
  }

  update(obj): any {
    this.panel.update(obj); }
}
