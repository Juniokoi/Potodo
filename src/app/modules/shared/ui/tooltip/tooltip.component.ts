import {Component, OnInit} from '@angular/core';
import {TooltipPosition} from './TooltipPosition.enums';
import {TooltipTheme} from "./TooltipTheme.enums";

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
    tooltip: string = 'yay';
    position: TooltipPosition = TooltipPosition.DEFAULT;
    theme: TooltipTheme = TooltipTheme.DEFAULT;
    visible: boolean = false;
    left: number = 0;
    top: number = 0;

    constructor() { }

  ngOnInit(): void {
  }

}