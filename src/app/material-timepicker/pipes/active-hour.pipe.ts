import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'activeHour',
    standalone: false
})
export class ActiveHourPipe implements PipeTransform {

    transform(hour: number | null, currentHour: number | null, isClockFaceDisabled: boolean): boolean {
        if (hour == null || isClockFaceDisabled) {
            return false;
        }

        return hour === currentHour;
    }

}
