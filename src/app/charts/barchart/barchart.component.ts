import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  ssaleData: any[];
  view: number[];
  constructor(private http: HttpClient ) { }


  ngOnInit(): void {
    this.http.get <any>( 'https://run.mocky.io/v3/b04ee415-44f1-4450-af22-36ddd83a3106 ')
      .subscribe(res => {
        console.log(res);
        this.ssaleData = res;
      });
  }

  // onResize(event): any {
  //   this.view = [event.target.innerWidth / 2.5, 250];
  // }

}
