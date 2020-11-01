import {Component, OnInit,  EventEmitter, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SitesService} from '../../../services/sites.service';
import {GridOption} from '../../../interfaces/gridOption';
import {Site} from '../../../interfaces/interfaces';
import {AggregationFunction, ComponentType, DataType} from '../../../enums/datatype';



@Component({
  selector: 'app-siteform',
  templateUrl: './siteform.component.html',
  styleUrls: ['./siteform.component.css']
})
export class SiteformComponent implements OnInit {


  gridOptions: GridOption = undefined;
  tabledata: Site[] = [] ;


  constructor(private http: HttpClient  , private site: SitesService) { }

  ngOnInit(): void {
    this.gridOptions = {
      ColumnDefinitions: [
        {
          headerName: 'webSiteName',
          field: 'webSiteName',
          type: {
            dataType: DataType.Text,
            component: ComponentType.Text
          },
          sortable: true,
          aggregationFunction: AggregationFunction.None
        },
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
          headerName: 'tag',
          field: 'tags',
          type: {
            dataType: DataType.Text,
            component: ComponentType.Text
          },
          sortable: true,
          aggregationFunction: AggregationFunction.None
        },
      ],
      showCheckbox: true,
      filterable: true,
      paging: {recordsOfPage: 10},
      alternateColor: {color: '#bbb'}
    };

///////////////////////////////////////////////////////////////////////////////////////////////////////
    this.site.get().subscribe((data) => {
      console.log(data);
      this.tabledata = data;
    });
  }

  add(obj: Site): any {
    this.site.add(obj);
    console.log(obj);
  }
  delete(obj): any {
    for (const i of obj) {
      this.site.remove(i.id);
    }
  }

  update(obj): any {
    this.site.update( obj); }
}
