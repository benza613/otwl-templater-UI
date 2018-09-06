import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-ngbd-modal-content',
    templateUrl: './modal-component.html',
})
export class NgbdModalContentComponent {
    @Input() name;

    constructor(public activeModal: NgbActiveModal) { }
}
