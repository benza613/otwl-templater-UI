import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-child-edit-cell',
    // tslint:disable-next-line:max-line-length
    template: `<button (click)="invokeParentEditMethod()" class="btn btn-info"><i style="font-size: 14px;" class="far fa-edit"></i> Edit</button>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class ChildEditElementComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentEditMethod() {
        this.params.context.componentParent.editElement(this.params.data, this.params.rowIndex);
    }

    refresh(): boolean {
        return false;
    }
}
