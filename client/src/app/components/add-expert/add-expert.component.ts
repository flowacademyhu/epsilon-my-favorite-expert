import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-expert',
  templateUrl: './add-expert.component.html',
  styleUrls: ['./add-expert.component.css']
})
export class AddExpertComponent implements OnInit {
  expertForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.expertForm = new FormGroup({
      fullname: new FormControl(),
      phone: new FormControl(),
      country: new FormControl(),
      city: new FormControl(),
      street: new FormControl(),
      number: new FormControl()
    });
  }
onSubmit(): void {
  console.log(this.expertForm.value);
}


}
