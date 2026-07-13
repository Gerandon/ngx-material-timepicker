import {
    ApplicationRef,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector,
    Optional,
    Type,
    createComponent
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
    NgxMaterialTimepickerContainerComponent
} from '../components/ngx-material-timepicker-container/ngx-material-timepicker-container.component';
import { TimepickerConfig } from '../models/timepicker-config.interface';

@Injectable({
    providedIn: 'root'
})
export class DomService {

    private componentRef: ComponentRef<NgxMaterialTimepickerContainerComponent>;

    constructor(private appRef: ApplicationRef,
                private injector: Injector,
                @Optional() @Inject(DOCUMENT) private document: any) {
    }

    appendTimepickerToBody(timepicker: Type<NgxMaterialTimepickerContainerComponent>, config: TimepickerConfig): void {
        this.componentRef = createComponent(timepicker, { environmentInjector: this.appRef.injector, elementInjector: this.injector });

        Object.keys(config as any).forEach((key) => {
            (this.componentRef.instance as any)[key] = (config as any)[key];
        });

        this.appRef.attachView(this.componentRef.hostView);

        const domElement: HTMLElement = (this.componentRef.hostView as EmbeddedViewRef<NgxMaterialTimepickerContainerComponent>)
            .rootNodes[0];

        this.document.body.appendChild(domElement);
    }

    destroyTimepicker(): void {
        this.componentRef.destroy();
        this.appRef.detachView(this.componentRef.hostView);
    }
}
