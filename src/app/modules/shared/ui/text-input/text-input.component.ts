import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
    selector: 'text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {
    @Input()
    placeholder: string = "";

    @Output()
    $value = new EventEmitter();
    @Output()
    $blur = new EventEmitter();
    @Output()
    $esc = new EventEmitter();
    @Output()
    $enter = new EventEmitter();

    @Input('InitValue')
    inputValue = "";

    inputFocused = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    emitEscape() {
        this.$esc.emit(true)
    }

    emitEnter() {
        this.$enter.emit(true)
    }

    emitValue() {
        this.$value.emit(this.inputValue);
    }

    applyVisual() {
        const _focused = this.inputFocused;
        const _empty = this.inputValue !== null && this.inputValue !== "";

        return {
            'focused': _focused || _empty
        };
    }

    handleLabel(status: string): void {
        switch (status) {
            case "focus":
                this.inputFocused = true;
                break;
            case "blur":
                this.inputFocused = false;
                this.$blur.emit(true)
                break;
        }
        this.applyVisual();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Escape')
            this.emitEscape()

        if (event.key === 'Enter')
            this.emitEnter()
    }

}