import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-child-cell',
    template: `<span><button (click)="invokeParentMethod()" class="btn btn-info">Edit</button></span>`,
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

    public invokeParentMethod() {
        this.params.context.componentParent.methodFromParent(this.params.data, this.params.rowIndex);
    }

    refresh(): boolean {
        return false;
    }
}
