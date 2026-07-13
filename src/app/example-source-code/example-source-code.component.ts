import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-example-source-code',
    templateUrl: './example-source-code.component.html',
    styleUrls: ['./example-source-code.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExampleSourceCodeComponent {

    animationState = 'inactive';

    @Input() sourceCode: string;

    toggleAnimState(): void {
        this.animationState = this.animationState === 'inactive' ? 'active' : 'inactive';
    }

}
