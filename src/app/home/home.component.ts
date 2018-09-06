import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { GridOptions } from 'ag-grid';
import { ChildEditElementComponent } from '../util/child-edit-element.component';
import { ChildDeleteElementComponent } from '../util/child-del-element.component';
import { ChildCopyElementComponent } from '../util/child-copy-element.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContentComponent } from '../util/modal-component';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';

import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
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
    { make: 'Fake Profile 1', model: 'Celica', price: 35000 },
    { make: 'Fake Profile 2', model: 'Mondeo', price: 32000 },
    { make: 'Fake Profile 3', model: 'Boxter', price: 72000 }
  ];

  modalDataSet: any = {
    elemName: '',
    typeList: ['Table'],
    typeSelected: undefined,
    action: undefined,
  };

  public gridOptions: GridOptions;

  constructor(public mdservice: NgxSmartModalService,
    private httpService: HttpService, private router: Router) {

    this.gridOptions = <GridOptions>{
      columnDefs: [{ headerName: 'ID', field: 'elemid', width: 50 },
      { headerName: 'Element Name', field: 'elemname' },
      { headerName: 'Element Date', field: 'elemdate', width: 150 },
      {
        headerName: 'Edit Profile',
        cellRendererFramework: ChildEditElementComponent,
      },
      {
        headerName: 'Delete Profile',
        cellRendererFramework: ChildDeleteElementComponent,
      },
      {
        headerName: 'Copy Profile',
        cellRendererFramework: ChildCopyElementComponent,
      }],
      context: {
        componentParent: this
      },
      enableColResize: true,

    };

  }

  onGridElReady(params) {
    this.gridElApi = params.api;
    this.gridElApi.setGridAutoHeight(true);
    this.gridElApi.sizeColumnsToFit();
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

  ngAfterViewInit() {

    this.mdservice.setModalData(this.modalDataSet, 'elemAddModal');


    this.mdservice.getModal('elemAddModal')
      .onClose.subscribe((modal: NgxSmartModalComponent) => {
        this.addNewElementOnClose(modal.getData());
      });
  }

  public editElement(cellData, cellid) {
    // let rowNode = this.gridElApi.getRowNode(cellid);
    // let newPrice = Math.floor(Math.random() * 100000);
    // rowNode.setDataValue('elemname', newPrice);

    const params = {
      elemid: JSON.stringify(cellData.elemid),
      elemname: JSON.stringify(cellData.elemname)
    };
    this.router.navigate(['/elem'], { queryParams: params });
  }

  public deleteElement(cellData, cellid) {
    const selected = this.gridElApi.getFocusedCell();
    this.gridOptions.rowData.splice(selected.rowIndex, 1);

    this.gridElApi.setRowData(this.gridOptions.rowData);
  }

  public addElement() {

    this.modalDataSet.elemName = '';
    this.modalDataSet.typeSelected = undefined;
    this.modalDataSet.action = undefined;

    this.mdservice.getModal('elemAddModal').open();

  }

  public addNewElementOnClose(x) {

    if (x.action === 'yes') {
      alert('yes');
    } else {
      alert('no');
    }
  }
}
