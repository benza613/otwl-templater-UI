import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private gridElApi;
  private gridEmlApi;

  columnDefs2 = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];

  columnDefs1 = [
    { headerName: 'Element ID', field: 'elemid' },
    { headerName: 'Element Name', field: 'elemname' },
    { headerName: 'Element Type', field: 'elemtype' }
  ];

  elementData = [
    { elemid: '1', elemname: 'EA', elemtype: 35000 },
    { elemid: '2', elemname: 'eml-prof13', elemtype: 32000 },
    { elemid: '4', elemname: 'EZ', elemtype: 32000 },
    { elemid: '5', elemname: 'EAD', elemtype: 32000 },
    { elemid: '3', elemname: 'EC', elemtype: 72000 }
  ];

  profileData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  constructor() {
  }

  onGridElReady(params) {
    this.gridElApi = params.api;
    this.gridElApi.setGridAutoHeight(true);
  }

  onGridEmlReady(params) {
    this.gridEmlApi = params.api;
    this.gridEmlApi.setGridAutoHeight(true);
  }

  ngOnInit() {
  }

}
