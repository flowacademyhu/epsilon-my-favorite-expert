import { Component, OnInit } from '@angular/core';
import { ExpertService } from 'src/app/shared/services/expert.service';
import { Expert } from 'src/app/models/expert.model';
import { Address } from 'src/app/models/address.model';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-expert',
  templateUrl: './add-expert.component.html',
  styleUrls: ['./add-expert.component.css']
})
export class AddExpertComponent implements OnInit {
  expert: Expert;
  profession: string;

  constructor(private translate: TranslateService, private expertService: ExpertService) {
    translate.setDefaultLang('en');
    this.expert = new Expert();
    this.expert.profession = new Array();
    this.expert.address = new Address();
   }

   switchLanguage(language: string) {
    this.translate.use(language);
}
  ngOnInit() {
  }

addExpert() {
    this.expert.profession.push(this.profession);
    this.expertService.addExpert(this.expert).subscribe((data: any) => {
    console.log(data);
    this.expert.name = '';
    this.expert.address = new Address();
    this.expert.created_at = '';
    this.expert.deleted_at = '';
    this.expert.phone = '';
    this.profession = '';
    this.expert.phone = '';
  });
}
}
