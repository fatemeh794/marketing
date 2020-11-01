import {Component, OnInit} from '@angular/core';
import {TagsService} from '../../../services/tags.service';
import {AggregationFunction, ComponentType, DataFormat, DataType} from '../../../enums/datatype';
import {GridOption} from '../../../interfaces/gridOption';




@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})

export class TagsComponent implements OnInit {

  constructor( private tagsService: TagsService ) {}
  gridOptions: GridOption = undefined;
  tabledata: any[] = [] ;

  ngOnInit(): void {
    this.gridOptions = {
      ColumnDefinitions: [
        {
          headerName: 'TagsName',
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

    this.tagsService.gettags().subscribe((data) => {
      console.log(data);
      this.tabledata = data;
      });

  }
  add(obj): any {
    this.tagsService.addtags(obj);
  }
  delete(obj): any {
   for (const i of obj) {
     this.tagsService.removetag(i.id);
   }
  }

  update(obj): any {
    this.tagsService.updatetags( obj ); }
}
