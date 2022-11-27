import {
    ApplicationRef,
    ComponentRef,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    ViewContainerRef
} from '@angular/core';
import {TooltipComponent} from "./tooltip.component";
import {TooltipPosition} from "./TooltipPosition.enums";
import {TooltipTheme} from './TooltipTheme.enums';

@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements OnDestroy {
    @Input() tooltip = '';
    @Input() tooltipPosition: TooltipPosition = TooltipPosition.DEFAULT;
    @Input() theme: TooltipTheme = TooltipTheme.DEFAULT;
    @Input() showDelay = 0;
    @Input() hideDelay = 0;
    @Input() tooltipAlways: boolean = false;

    componentRef!: ComponentRef<any>;
    private showTimeout?: number;
    private hideTimeout?: number;
    private touchTimeout?: number;

    constructor(
        private elementRef: ElementRef,
        private appRef: ApplicationRef,
        private viewContainer: ViewContainerRef
    ) {
    }

    ngOnDestroy() {
        this.destroy()
    }

    // For Dynamic
    @HostListener('mousemove', ['$event'])
    onMouseMove($event: MouseEvent): void {
        if (this.componentRef !== undefined && this.tooltipPosition === TooltipPosition.DYNAMIC) {
            this.componentRef.instance.left = $event.clientX;
            this.componentRef.instance.top = $event.clientY;
            this.componentRef.instance.tooltip = this.tooltip;
        }
    }

    //For mobile
    @HostListener('touchstart', ['$event'])
    onTouchStart(): void {
        window.clearTimeout(this.touchTimeout);
        this.touchTimeout = window.setTimeout(this.initializeTooltip.bind(this), 500);
    }

    @HostListener('touchend')
    onTouchEnd(): void {
        window.clearTimeout(this.touchTimeout);
        this.setHideTooltipTimeout();
    }

    //For desktop
    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.initializeTooltip();

    }

    //For desktop
    @HostListener('mouseleave')
    onMouseLeave(): void {
        if (this.componentRef.instance.visible) {
            this.setHideTooltipTimeout();
        }

        this.destroy();
    }

    initializeTooltip() {
        this.componentRef = this.viewContainer.createComponent(TooltipComponent);
        this.setTooltipComponentProperties();
        this.showTimeout = window.setTimeout(this.showTooltip.bind(this), this.showDelay);
    }

    setTooltipComponentProperties() {
        this.componentRef.instance.tooltip = this.tooltip;
        this.componentRef.instance.position = this.tooltipPosition;
        this.componentRef.instance.theme = this.theme;

        const {left, right, top, bottom} = this.elementRef.nativeElement.getBoundingClientRect();

        switch (this.tooltipPosition) {
            case TooltipPosition.BELOW: {
                this.componentRef.instance.left = Math.round((right - left) / 2 + left);
                this.componentRef.instance.top = Math.round(bottom);
                break;
            }
            case TooltipPosition.ABOVE: {
                this.componentRef.instance.left = Math.round((right - left) / 2 + left);
                this.componentRef.instance.top = Math.round(top);
                break;
            }
            case TooltipPosition.RIGHT: {
                this.componentRef.instance.left = Math.round(right);
                this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
                break;
            }
            case TooltipPosition.LEFT: {
                this.componentRef.instance.left = Math.round(left);
                this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
                break;
            }
            default: {
                break;
            }
        }
        setTimeout(() => {
        } , 400)
    }

    private showTooltip() {
        this.componentRef.instance.visible = true;
    }
    private hideTooltip() {
        if (this.componentRef !== undefined)
            this.componentRef.instance.visible = false;
    }

    private setHideTooltipTimeout() {
        this.hideTimeout = window.setTimeout(this.hideTooltip.bind(this), this.hideDelay);
    }

    destroy(): void {
        if (this.componentRef !== undefined) {
            window.clearInterval(this.showTimeout);
            window.clearInterval(this.hideDelay);
            this.componentRef.destroy();
        }
    }
}