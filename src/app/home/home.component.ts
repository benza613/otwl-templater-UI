import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { GridOptions } from 'ag-grid';
import { ChildEditElementComponent } from '../util/child-edit-element.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private getRowNodeId;
  private gridElApi;
  private gridEmlApi;
  elementData = [];

  columnDefs2 = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    { headerName: 'Price', field: 'price' }
  ];

  profileData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  public gridOptions: GridOptions;

  constructor(private httpService: HttpService) {

    this.gridOptions = <GridOptions>{
      columnDefs: [{ headerName: 'ID', field: 'elemid', width: 50 },
      { headerName: 'Element Name', field: 'elemname' },
      { headerName: 'Element Date', field: 'elemdate', width: 150 },
      {
        headerName: 'Edit',
        cellRendererFramework: ChildEditElementComponent,
        width: 150
      }],
      context: {
        componentParent: this
      },
      enableColResize: true,

    };

    // this.getRowNodeId = function (data) {
    //   return data.id;
    // };
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

    // tslint:disable-next-line:prefer-const

    this.httpService.postdata('http://localhost:8080/templater/api', { xyz: 300, xyz1: 200 }).subscribe(
      (r) => {
        console.log(r);
        // tslint:disable-next-line:triple-equals
        if (r.status == true) {
          this.elementData = r.data.elem;
        } else {
          alert(r.msg);
        }
      });
  }

  public methodFromParent(cellid) {
    // tslint:disable-next-line:prefer-const
    let rowNode = this.gridElApi.getRowNode(cellid);
    console.log(rowNode);

    // tslint:disable-next-line:prefer-const
    let newPrice = Math.floor(Math.random() * 100000);
    rowNode.setDataValue('elemname', newPrice);
  }

}
