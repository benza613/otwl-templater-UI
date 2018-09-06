import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-child-copy-cell',
    // tslint:disable-next-line:max-line-length
    template: `<button (click)="invokeParentCopyMethod()" class="btn btn-warning"><i style="font-size: 14px;" class="far fa-copy"></i> Copy</button>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class ChildCopyElementComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentCopyMethod() {
        this.params.context.componentParent.copyElement(this.params.data, this.params.rowIndex);
    }

    refresh(): boolean {
        return false;
    }
}
