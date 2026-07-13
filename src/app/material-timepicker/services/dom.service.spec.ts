import { DomService } from './dom.service';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimepickerConfig } from '../models/timepicker-config.interface';
import {
    NgxMaterialTimepickerContainerComponent
} from '../components/ngx-material-timepicker-container/ngx-material-timepicker-container.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TIME_LOCALE } from '../tokens/time-locale.token';

describe('DomService', () => {
    let service: DomService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepickerContainerComponent],
            providers: [
                {provide: TIME_LOCALE, useValue: 'en-US'}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        service = TestBed.inject(DomService);

        TestBed.compileComponents();
    });

    describe('appendTimepickerToBody', () => {

        it('should append provided timepicker to body', () => {
            service.appendTimepickerToBody(NgxMaterialTimepickerContainerComponent, {} as TimepickerConfig);
            const expected = document.getElementsByTagName('ngx-material-timepicker-container')[0];

            expect(document.body.lastChild).toEqual(expected);
        });
    });

});
