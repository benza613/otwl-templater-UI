import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-elem-add',
  templateUrl: './elem-add.component.html',
  styleUrls: ['./elem-add.component.css']
})
export class ElemAddComponent implements OnInit, AfterViewInit {

  formData = {
    elemname: '',
    typeList: [],
    typeSelected: undefined,
    action: undefined
  };

  constructor(public mdservice: NgxSmartModalService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.mdservice.getModal('elemAddModal')
      .onOpen.subscribe((modal: NgxSmartModalComponent) => {
        this.formData = modal.getData();
      });
  }

  no() {
    this.formData.action = 'no';
    this.mdservice.getModal('elemAddModal').close();
  }

  add() {
    this.formData.action = 'yes';
    this.mdservice.getModal('elemAddModal').close();

  }
}
