import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AggregationFunction, ComponentType,  DataType} from '../../enums/datatype';
import * as _ from 'lodash';
import {ColumnDefinition, GridOption} from '../../interfaces/gridOption';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Output() deletedata = new EventEmitter();
  @Output() updatedata = new EventEmitter();
  @Input() public gridOptions: GridOption = undefined;
  @Input() public gridData: any = undefined;
  @Input() public originalData: any = undefined;
  selectedRows: any = [];
  currentRows: any = undefined;
  sorting = false;
  filterable = false;
  paging: any = undefined;
  filter: any = {};
  checkAll: boolean;
  ComponentType: typeof ComponentType = ComponentType;
  DataType: typeof DataType = DataType;
  AggregationFunction: typeof AggregationFunction = AggregationFunction;
  test: any;
  columnNoCategory: Array<ColumnDefinition> = [];
  private orderBy = 'desc';
  private pages: any;
  private currentPageNumber = 0;
  private totalRow: any;

  constructor() {
  }

  ngOnInit(): void {
    this.originalData = [...this.gridData];
    if (this.gridOptions.showCheckbox) {
      this.gridOptions.ColumnDefinitions = [
        {
          headerName: 'checkbox',
          field: 'checkbox',
          sortable: false,
          type: {dataType: DataType.Boolean, component: ComponentType.Checkbox},
        }, ...this.gridOptions.ColumnDefinitions];

      this.columnNoCategory = _.filter(this.gridOptions.ColumnDefinitions, (o: ColumnDefinition) => {
        return o.category == null;
      });
      console.log(this.columnNoCategory);
      this.test = _.groupBy(this.gridOptions.ColumnDefinitions, 'category');
      console.log(this.test);
    }

    this.filterable = this.gridOptions.filterable;
    if (this.filterable) {
      let i;
      for (i = 0; i < this.gridOptions.ColumnDefinitions.length; i++) {
        if (this.gridOptions.ColumnDefinitions[i].field !== 'checkbox') {
          this.filter[this.gridOptions.ColumnDefinitions[i].field] = '';
        }
      }
    }
    if (this.gridOptions.paging) {
      this.paging = this.gridOptions.paging;
      this.doPaging(this.gridData);
    }
  }

  changeSelection(event, row): any {
    if (event.target.checked) {
      this.selectedRows.push(row);
    } else {
      const id = this.selectedRows.indexOf(row);
      if (this.selectedRows.indexOf(row) !== -1) {
        this.selectedRows.splice(id, 1);
      }
    }
    this.checkAll = false;
    this.currentRows = row;
    console.log(this.currentRows);
    console.log(this.selectedRows);
    this.updatedata.emit(this.currentRows);
    this.deletedata.emit(this.selectedRows);
  }

  sort(column): any {
    this.sorting = !this.sorting;
    this.orderBy = this.sorting ? 'desc' : 'asc';
    this.gridData = _.orderBy(this.gridData, [column.field], [(this.orderBy)]);
  }

  filtering(): any {
    console.log('filtering');
    const dataSource = [...this.originalData];
    const tempfilter = {};
    let column;
    for (column of this.gridOptions.ColumnDefinitions) {
      if (column.field !== 'checkbox'
        && this.filter[column.field] !== '') {
        tempfilter[column.field] = this.filter[column.field];
      }
    }
    if (!_.isEmpty(tempfilter)) {
      this.doPaging(_.filter(dataSource, tempfilter));
    } else {
      this.doPaging([...this.originalData]);
    }
  }

  doPaging(dataSource): any {
    console.log('doPaging');
    this.totalRow = dataSource.length;
    if (this.paging) {
      this.pages = _.chunk(dataSource, this.paging.recordsOfPage);
      this.gridData = this.pages[0];
    } else {
      this.gridData = dataSource;
    }
  }

  getPage(pageData: any, pageNumber): any {
    this.currentPageNumber = pageNumber;
    this.gridData = pageData;
    this.checkAll = false;
  }

  checkOrUncheck(event): any {
    console.log('checkOrUncheck');
    this.checkAll = event.target.checked;
    this.selectedRows = event.target.checked ? [...this.gridData] : [];
    console.log(this.selectedRows);

  }

  calcSum(field: string): number {
    return _.sumBy(this.gridData, field);
  }

  calcAvg(field: any): any {
    return _.meanBy(this.gridData, field);
  }

  calcMax(field: any): any {
    return _.maxBy(this.gridData, field)[field];

  }

  calcMin(field: any): any {
    return _.minBy(this.gridData, field)[field];

  }

  getColumnFistRow(): any {
    const firstRow: any = [];
    for (const item of this.gridOptions.ColumnDefinitions) {
      if (item.headerName === 'checkbox') {
        continue;
      }
      if (item.category == null) {
        firstRow.push({
          colSpan: 1, rowSpan: 2,
          name: item.headerName,
          field: item.field,
          sortable: item.sortable
        });
      } else {
        const conut = _.filter(firstRow, (x) => x.name === item.category).length;
        if (conut === 0) {
          firstRow.push(
            {
              colSpan: this.test[item.category].length,
              rowSpan: 1,
              name: item.category
            });
        }
      }
    }
    return firstRow;
  }

  getColumnSecondRow(): Array<ColumnDefinition> {
    const secondRow: any = [];
    for (const item of this.gridOptions.ColumnDefinitions) {
      if (item.headerName === 'checkbox') {
        continue;
      }
      if (item.category != null) {
        secondRow.push(item);
      }
    }
    return secondRow;
  }
}


