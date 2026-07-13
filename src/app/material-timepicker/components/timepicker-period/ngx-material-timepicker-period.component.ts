import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { DateTime } from 'luxon';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';

@Component({
    selector: 'ngx-material-timepicker-period',
    templateUrl: 'ngx-material-timepicker-period.component.html',
    styleUrls: ['ngx-material-timepicker-period.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NgxMaterialTimepickerPeriodComponent {

    timePeriod = TimePeriod;
    isPeriodAvailable = true;

    @Input() selectedPeriod: TimePeriod | null;
    @Input() format: number;
    @Input() activeTimeUnit: TimeUnit;
    @Input() hours: ClockFaceTime[];
    @Input() minutes: ClockFaceTime[];
    @Input() minTime: DateTime;
    @Input() maxTime: DateTime;
    @Input() selectedHour: number | string;
    @Input() meridiems: string[];

    @Output() periodChanged = new EventEmitter<TimePeriod>();

    changePeriod(period: TimePeriod): void {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    }

    animationDone(): void {
        this.isPeriodAvailable = true;
    }

    private isSwitchPeriodAvailable(period: TimePeriod): boolean {
        const time = this.getDisabledTimeByPeriod(period);
        return !time.every(t => t.disabled);
    }

    private getDisabledTimeByPeriod(period: TimePeriod): ClockFaceTime[] {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return TimepickerTimeUtils.disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            case TimeUnit.MINUTE:
                return TimepickerTimeUtils.disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    }
}
