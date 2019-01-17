import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rename-form',
  templateUrl: './rename-form.component.html',
  styleUrls: ['./rename-form.component.css']
})


export class RenameFormComponent implements OnInit {
  @Input() profilename: string;
  @Input() anyData: any;

  myForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    

  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      profilename: this.anyData.elemname
    });
  }

  private submitForm() {
    this.activeModal.close(this.myForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
