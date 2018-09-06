import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-child-del-cell',
    // tslint:disable-next-line:max-line-length
    template: `<button (click)="invokeParentDelMethod()" class="btn btn-danger"><i style="font-size: 14px;" class="fas fa-trash-alt"></i> Del</button>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class ChildDeleteElementComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentDelMethod() {
        this.params.context.componentParent.deleteElement(this.params.data, this.params.rowIndex);
    }

    refresh(): boolean {
        return false;
    }
}
