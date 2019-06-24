import { Component, OnInit } from '@angular/core';
import { ExpertResourceService, Expert, Address } from 'src/app/api';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-add-expert',
  templateUrl: './add-expert.component.html',
  styleUrls: ['./add-expert.component.css']
})
export class AddExpertComponent implements OnInit {
  expert: Expert;
  profession: string;

  constructor(private translate: TranslateService, 
    private expertService: ExpertResourceService) {
    translate.setDefaultLang('en');
    this.expert = <Expert>{};
    this.expert.profession = new Array();
    this.expert.address = <Address>{};
   }

   switchLanguage(language: string) {
    this.translate.use(language);
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
    },(error)=> alert('Hibás cím!!!'))
}
}
