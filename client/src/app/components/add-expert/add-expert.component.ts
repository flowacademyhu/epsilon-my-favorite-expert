import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExpertResourceService, Expert, Address } from 'src/app/api';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-expert',
  templateUrl: './add-expert.component.html',
  styleUrls: ['./add-expert.component.css']
})
export class AddExpertComponent implements OnInit {
  @ViewChild('myForm')
  addExpertForm: NgForm;
  input: ElementRef;

  expert: Expert;
  profession: string;
  showAlert = false;
  successMessage: string;
  private _success = new Subject<string>();
  staticAlertClosed = false;

  constructor(private translate: TranslateService, private expertService: ExpertResourceService) {

    this.expert = <Expert>{};
    this.expert.profession = new Array();
    this.expert.address = <Address>{};
   }

  ngOnInit() {
  }
addProfession() {
  this.expert.profession.push(this.profession);
  this.profession = '';
}
addExpert() {
    this.expert.profession.push(this.profession);
    this.expertService.addExpertUsingPOST(this.expert).subscribe((data: any) => {
    console.log(data);
    this.expert.name = '';
    this.expert.address = <Address>{};
    this.expert.createdAt = new Date();
    this.expert.deletedAt = null;
    this.expert.phone = '';
    this.profession = '';
    this.expert.profession = new Array();
    this.addExpertForm.reset();
    }, (error) => {
      setTimeout(() => this.staticAlertClosed = true, 4000);
      this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
      debounceTime(5000));
    this.showAlert = true;
    this.staticAlertClosed = false;
  });
}
}
