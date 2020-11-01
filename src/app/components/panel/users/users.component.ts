import { Component, OnInit } from '@angular/core';
import {GridOption} from '../../../interfaces/gridOption';
import {HttpClient} from '@angular/common/http';
import {AdduserService} from '../../../services/adduser.service';
import {User} from '../../../interfaces/interfaces';
import {AggregationFunction, ComponentType, DataFormat, DataType} from '../../../enums/datatype';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  gridOptions: GridOption = undefined;
  tabledata: User[] = [] ;
  constructor(private http: HttpClient  , private user: AdduserService) { }

  ngOnInit(): void {
    this.gridOptions = {
      ColumnDefinitions: [
        {
          category: 'Contact',
          headerName: 'Email',
          field: 'email',
          type: {
            dataType: DataType.Text,
            component: ComponentType.Text
          },
          sortable: true,
          aggregationFunction: AggregationFunction.Average
        },
        {
          category: 'Contact',
          headerName: 'First Name',
          field: 'firstName',
          type: {
            dataType: DataType.Text,
            component: ComponentType.Text
          },
          sortable: true,
          aggregationFunction: AggregationFunction.None
        },
        {
          category: 'Contact',
          headerName: 'Last Name',
          field: 'lastName',
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
          category: 'pic',
          headerName: 'Profile Image',
          field: 'profileImage',
          type: {
            dataType: DataType.Image,
            component: ComponentType.Image
          },
          sortable: false,
        },
        {
          category: 'pic',
          headerName: 'Flag',
          field: 'flag',
          type: {
            dataType: DataType.ImageLink,
            component: ComponentType.Image
          },
          sortable: false,
        }
      ],
      showCheckbox: true,
      filterable: true,
      paging: {recordsOfPage: 10},
      alternateColor: {color: '#bbb'}
    };


///////////////////////////////////////////////////////////////////////////////////////////////////////
    this.user.get().subscribe((data) => {
      console.log(data);
      this.tabledata = data;
    });
  }

  add(obj: User): any {
    this.user.uploadFile(obj);
  }
  delete(obj): any {
    for (const i of obj) {
      this.user.remove(i.id);
    }
  }

  update(obj: User): any {
    this.user.update( obj ); }
}
