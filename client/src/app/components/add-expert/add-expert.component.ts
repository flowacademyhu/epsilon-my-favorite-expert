import { Component, OnInit } from '@angular/core';
import { ExpertService } from 'src/app/shared/services/expert.service';
import { Expert } from 'src/app/models/expert.model';
import { Address } from 'src/app/models/address.model';

@Component({
  selector: 'app-add-expert',
  templateUrl: './add-expert.component.html',
  styleUrls: ['./add-expert.component.css']
})
export class AddExpertComponent implements OnInit {
  //expertForm: FormGroup;
  expert: Expert;
  profession: string;
 
  constructor(private expertService: ExpertService) {
    this.expert = new Expert();
    this.expert.profession = new Array();
    this.expert.address = new Address();
   }

  ngOnInit() {
    // this.expertForm = new FormGroup({
   

    // });
  }
// onSubmit(): void {
//   console.log(this.expertForm.value);
//   this.expertService.addExpert(this.expertForm.value);
// }

addExpert() {
    this.expert.profession.push(this.profession);
    this.expertService.addExpert(this.expert).subscribe((data: any) => {
    console.log(data);
  });
}
}
