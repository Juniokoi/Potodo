import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
    selector:'autofocus'
})
export class CustomAutoFocus implements OnInit{

    constructor(
        private elementRef: ElementRef
    ){}

    ngOnInit(){
        this.elementRef.nativeElement.focus();
    }
}