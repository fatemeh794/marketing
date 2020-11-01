import { Component, OnInit } from '@angular/core';
import {GetdataService} from '../../services/getdata.service';

export interface Pie {
 name: string;
 value: number;

}
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})

export class PiechartComponent implements OnInit {
  // saleData: Array<Pie>;
  constructor(private getData: GetdataService) { }

  saleData = [
    { name: 'Mobiles', value: 105000 },
    { name: 'Laptop', value: 55000 },
    { name: 'AC', value: 15000 },
    { name: 'Headset', value: 150000 },
    { name: 'Fridge', value: 20000 }
  ];

  ngOnInit(): void {
    // this.getData.piedata().subscribe((data) => {
    //   this.saleData = data ;
    //   console.log(this.saleData);
    // });
  }



}

