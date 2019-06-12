import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Input()
  data: any;
  receivedFile: any[];
  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.receivedFile = this.dataservice.getData();
  }

}
