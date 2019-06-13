import { Component, OnInit, Input } from '@angular/core';
import { Expert } from 'src/app/models/expert.model';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {
  @Input()
  expert: Expert;
  constructor() { }

  ngOnInit() {
  }

}
