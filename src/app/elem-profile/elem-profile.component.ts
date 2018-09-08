import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { GridOptions } from 'ag-grid';
import { ChildRuleDelElementComponent } from '../util/child-rule-del-element.component';

import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-elem-profile',
  templateUrl: './elem-profile.component.html',
  styleUrls: ['./elem-profile.component.css']
})
export class ElemProfileComponent implements OnInit {

  private routeData: any;
  private elementData: any;
  private gridElApi;
  addRulePromise;

  compiledrules = '';
  rulelist = [];

  cssData = [
    { name: 'background' },
    { name: 'background-color' },
    { name: 'background-repeat' },
    { name: 'border' },
    { name: 'border-bottom' },
    { name: 'border-top' },
    { name: 'border-left' },
    { name: 'border-right' },
    { name: 'border-color' },
    { name: 'border-style' },
    { name: 'content' },
    { name: 'color' },
    { name: 'font' },
    { name: 'font-family' },
    { name: 'font-size' },
    { name: 'font-style' },
    { name: 'font-weight' },
  ];

  locData = [
    { name: 'thead' },
    { name: 'tbody' },
    { name: 'tfoot' },
    { name: 'caption' },
  ];

  selectedcsskey = undefined;
  selectedloc = undefined;

  public gridOptionsER: GridOptions;

  constructor(private route: ActivatedRoute, private httpService: HttpService) {

    this.gridOptionsER = <GridOptions>{
      columnDefs: [
        { headerName: 'Table Location', field: 'tloc' },
        { headerName: 'Table Row', field: 'trow' },
        { headerName: 'Table Column', field: 'tcol' },
        { headerName: 'CSS PROPERTY', field: 'tkey' },
        { headerName: 'PROPERTY VALUE', field: 'tval' },
        { headerName: 'DEL', cellRendererFramework: ChildRuleDelElementComponent }
      ],
      context: {
        componentParent: this
      },
      enableColResize: true,

    };
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.routeData = params;
        console.log(this.routeData); // {order: "popular"}

        this.httpService.postdata('http://localhost:8080/templater/api/get/elem', { elemid: this.routeData.elemid }).subscribe(
          (r) => {
            console.log(r);
            // tslint:disable-next-line:triple-equals
            if (r.status == true) {
              this.elementData = r.data;
              this.rulelist = this.elementData.rules;
            } else {
              alert(r.msg);
            }

            this.ruleListTransform();
          });

      });


  }

  onGridElRReady(params) {
    this.gridElApi = params.api;
    this.gridElApi.setGridAutoHeight(true);
    this.gridElApi.sizeColumnsToFit();
  }

  onAddRule(form: NgForm) {
    console.log('login button');
    if (!form.valid) {
      alert('Complete Missing Fields');
      return;
    }

    // tslint:disable-next-line:prefer-const
    let params = {
      tloc: form.value.txtloc.name,
      trow: form.value.txtrow,
      tcol: form.value.txtcol,
      tkey: form.value.csskey.name,
      tval: form.value.cssval,
      elemid: this.routeData.elemid,
      rid: ''
    };


    this.addRulePromise = new Promise((resolve, reject) => {
      this.httpService.postdata('http://localhost:8080/templater/api/set/elemrule', params).subscribe(
        (r) => {
          console.log(r);
          // tslint:disable-next-line:triple-equals
          if (r.status == true) {
            params.rid = r.data;
            this.rulelist.push(params);
            this.gridElApi.setRowData(this.rulelist);

            form.reset();

            this.ruleListTransform();

            resolve();
          } else {
            reject();
            alert(r.msg);
          }

        });

    });

  }

  public onDeleteRule(cellData, cellid) {
    const paramsdel = {
      ruleid: cellData.rid
    };

    this.httpService.postdata('http://localhost:8080/templater/api/del/elemrule', paramsdel).subscribe(
      (r) => {
        console.log(r);
        // tslint:disable-next-line:triple-equals
        if (r.status == true) {
          const selected = this.gridElApi.getFocusedCell();
          this.gridOptionsER.rowData.splice(selected.rowIndex, 1);

          this.gridElApi.setRowData(this.gridOptionsER.rowData);
          this.ruleListTransform();

        } else {

          alert(r.msg);
        }

      });
  }

  ruleListTransform() {

    const params = { elemname: JSON.parse(this.routeData.elemname), rulelist: JSON.stringify(this.rulelist) };

    this.httpService.postdata('http://localhost:8080/templater/transform/rule', params).subscribe(
      (r) => {
        console.log(r);

        this.compiledrules = r.data;
      });
  }
}
