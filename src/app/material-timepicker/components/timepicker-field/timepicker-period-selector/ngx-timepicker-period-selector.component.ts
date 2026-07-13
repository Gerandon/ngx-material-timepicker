import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { TimePeriod } from '../../../models/time-period.enum';
import { TIME_LOCALE } from '../../../tokens/time-locale.token';
import { Info } from 'luxon';

@Component({
    selector: 'ngx-timepicker-period-selector',
    templateUrl: 'ngx-timepicker-period-selector.component.html',
    styleUrls: ['./ngx-timepicker-period-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class NgxTimepickerPeriodSelectorComponent {

    @Input() isOpened: boolean;
    @Input() disabled: boolean;
    @Input()
    set selectedPeriod(period: TimePeriod) {
        if (period) {
            const periods = [TimePeriod.AM, TimePeriod.PM];
            this.localizedPeriod = this.meridiems[periods.indexOf(period)];
        }
    }

    @Output() periodSelected = new EventEmitter<TimePeriod>();

    period = TimePeriod;
    meridiems = Info.meridiems({locale: this.locale});
    localizedPeriod: string;

    constructor(@Inject(TIME_LOCALE) private locale: string) {
    }

    open(): void {
        if (!this.disabled) {
            this.isOpened = true;
        }
    }

    select(period: TimePeriod): void {
        this.periodSelected.next(period);
        this.isOpened = false;
    }

    backdropClick(): void {
        this.isOpened = false;
    }
}
