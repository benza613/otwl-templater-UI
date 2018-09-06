import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-child-cell-del',
    // tslint:disable-next-line:max-line-length
    template: `<button (click)="delRule_ParentMethod()" class="btn btn-danger"><i style="font-size: 12px;" class="fas fa-trash-alt"></i> DEL</button>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class ChildRuleDelElementComponent implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public delRule_ParentMethod() {
        this.params.context.componentParent.onDeleteRule(this.params.data, this.params.rowIndex);
    }

    refresh(): boolean {
        return false;
    }
}
