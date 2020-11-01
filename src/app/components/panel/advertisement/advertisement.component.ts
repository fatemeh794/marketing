import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement, Package} from '../../../interfaces/interfaces';
import {AdvertisementService} from '../../../services/advertisement.service';
import {GridOption} from '../../../interfaces/gridOption';
import {AggregationFunction, ComponentType, DataFormat, DataType} from '../../../enums/datatype';


@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  constructor(private http: HttpClient , private advertisement: AdvertisementService ) {
  }
  gridOptions: GridOption = undefined;
  tabledata: Advertisement[] = [] ;
  ngOnInit(): void {
    this.gridOptions = {
      ColumnDefinitions: [
        {
          headerName: 'link',
          field: 'link',
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
        {
          headerName: 'picture',
          field: 'picture',
          sortable: false,
          type: {
            dataType: DataType.Image,
            component: ComponentType.Image,
          },
          aggregationFunction: AggregationFunction.None
        },
      ],
      showCheckbox: true,
      filterable: true,
      paging: {recordsOfPage: 10},
      alternateColor: {color: '#bbb'}
    };

    this.advertisement.get().subscribe((data) => {
      console.log(data);
      this.tabledata = data;
    });

  }
  add(obj): any {
    this.advertisement.uploadFile(obj);
  }
  delete(obj): any {
    for (const i of obj) {
      this.advertisement.remove(i.id);
    }
  }

  update(obj): any {
    this.advertisement.update( obj); }
}

