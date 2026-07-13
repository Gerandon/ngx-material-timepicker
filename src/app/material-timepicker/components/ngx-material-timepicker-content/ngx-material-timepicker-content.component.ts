import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ngx-material-timepicker-content',
    templateUrl: './ngx-material-timepicker-content.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NgxMaterialTimepickerContentComponent {
    @Input() appendToInput: boolean;
    @Input() inputElement: any;
}
