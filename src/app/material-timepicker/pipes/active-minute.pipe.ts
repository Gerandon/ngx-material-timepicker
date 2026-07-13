import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'activeMinute',
    standalone: false
})
export class ActiveMinutePipe implements PipeTransform {

    transform(minute: number | null, currentMinute: number | null, gap: number, isClockFaceDisabled: boolean): boolean {
        if (minute == null || isClockFaceDisabled) {
            return false;
        }
        const defaultGap = 5;

        return ((currentMinute === minute) && (minute % (gap || defaultGap) === 0));
    }

}
