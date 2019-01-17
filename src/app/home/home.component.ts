import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { GridOptions } from 'ag-grid';
import { ChildEditElementComponent } from '../util/child-edit-element.component';
import { ChildDeleteElementComponent } from '../util/child-del-element.component';
import { ChildCopyElementComponent } from '../util/child-copy-element.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';

import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  public getRowNodeId;
  public gridElApi;
  public gridEmlApi;

  public home_subscribers: any = {};

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
    copyid: undefined
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

    this.home_subscribers.elemDiag = this.mdservice.getModal('elemAddModal').onClose.subscribe((modal: NgxSmartModalComponent) => {
      this.add_COpy_ElementOnClose(modal.getData());
    });
  }


  ngOnDestroy() {
    // reset modal data variable locking
    this.mdservice.resetModalData('elemAddModal');
    // unsubscribe to avoid multiple listeners
    this.home_subscribers.elemDiag.unsubscribe();
  }

  public editElement(cellData, cellid) {

    const params = {
      elemid: cellData.elemid,
      elemname: cellData.elemname
    };
    this.router.navigate(['/elem'], { queryParams: params });
  }

  public deleteElement(cellData, cellid) {
    console.log(cellData);
    const paramsdel = {
      elemid: cellData.elemid
    };

    this.httpService.postdata('http://localhost:8080/templater/api/del/elem', paramsdel).subscribe(
      (r) => {
        console.log(r);
        // tslint:disable-next-line:triple-equals
        if (r.status == true) {
          const selected = this.gridElApi.getFocusedCell();
          this.gridOptions.rowData.splice(selected.rowIndex, 1);

          this.gridElApi.setRowData(this.gridOptions.rowData);

        } else {

          alert(r.msg);
        }

      });
  }

  public addElement() {

    this.modalDataSet.elemName = '';
    this.modalDataSet.typeSelected = undefined;
    this.modalDataSet.action = undefined;
    this.modalDataSet.copyid = undefined;
    console.log(this.modalDataSet);

    this.mdservice.getModal('elemAddModal').open();

  }

  public copyElement(cellData, cellid) {
    this.modalDataSet.elemName = '';
    this.modalDataSet.typeSelected = undefined;
    this.modalDataSet.action = undefined;
    this.modalDataSet.copyid = cellData.elemid;

    this.mdservice.getModal('elemAddModal').open();
  }

  public add_COpy_ElementOnClose(x) {

    if (x.action === 'yes') {

      if (x.copyid === undefined) {
        const paramsadd = {
          elemName: x.elemName,
          typeSelected: x.typeSelected
        };

        this.httpService.postdata('http://localhost:8080/templater/api/set/elem', paramsadd).subscribe(
          (r) => {
            console.log(r);
            // tslint:disable-next-line:triple-equals
            if (r.status == true) {

              const newRow = {
                elemid: r.elemid,
                elemname: r.elemName,
                elemdate: r.elemdate
              };

              this.elementData.push(newRow);
              this.gridElApi.setRowData(this.elementData);

            } else {

              alert(r.msg);
            }

          });
      } else {
        const paramscopy = {
          elemName: x.elemName,
          copyid: x.copyid,
          typeSelected: x.typeSelected
        };

        this.httpService.postdata('http://localhost:8080/templater/api/copy/elem', paramscopy).subscribe(
          (r) => {
            console.log(r);
            // tslint:disable-next-line:triple-equals
            if (r.status == true) {

              const newRow = {
                elemid: r.elemid,
                elemname: x.elemName,
                elemdate: r.elemdate
              };

              this.elementData.push(newRow);
              this.gridElApi.setRowData(this.elementData);

            } else {

              alert(r.msg);
            }

          });
      }


    } else {
      console.log('no');
    }

  }

}
