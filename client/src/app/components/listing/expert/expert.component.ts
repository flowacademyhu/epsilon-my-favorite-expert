import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {
  @Input()
  index: any;
  constructor() { }

  ngOnInit() {
  }

}
