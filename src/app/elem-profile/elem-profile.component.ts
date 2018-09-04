import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { GridOptions } from 'ag-grid';
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

  compiledrules = '';
  rulelist = [
    {
      tloc: 'thead',
      trow: '',
      tcol: '',
      tkey: 'color',
      tval: 'red',
    },
    {
      tloc: 'thead',
      trow: '',
      tcol: '',
      tkey: 'border',
      tval: 'thin solid red',
    },
    {
      tloc: 'thead',
      trow: '*',
      tcol: '',
      tkey: 'font-family',
      tval: 'Helvetica',
    },
    {
      tloc: 'thead',
      trow: '2',
      tcol: '',
      tkey: 'border',
      tval: 'thin solid red',
    },
    {
      tloc: 'thead',
      trow: '1',
      tcol: '',
      tkey: 'font-family',
      tval: 'Helvetica',
    },
    {
      tloc: 'thead',
      trow: '',
      tcol: '3',
      tkey: 'font-style',
      tval: 'italic bold',
    }];

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
        { headerName: 'DEL' }
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
    console.log(form.value);
    this.rulelist.push({
      tloc: form.value.txtloc.name,
      trow: form.value.txtrow,
      tcol: form.value.txtcol,
      tkey: form.value.csskey.name,
      tval: form.value.cssval,
    });
    this.gridElApi.setRowData(this.rulelist);
    form.reset();

    this.ruleListTransform();
  }

  ruleListTransform() {

    this.httpService.postdata('http://localhost:8080/templater/transform/rule', { rulelist: this.rulelist }).subscribe(
      (r) => {
        console.log(r);

        this.compiledrules = r.data;
      });
  }
}
