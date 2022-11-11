import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
    @Input() percentage!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}