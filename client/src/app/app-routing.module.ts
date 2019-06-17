import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoggedinComponent } from './components/loggedin/loggedin.component';
import { AddExpertComponent } from './components/add-expert/add-expert.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddAddressComponent } from './add-address/add-address.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'oauth2/redirect', component: LoggedinComponent},
  {path: 'add', component: AddExpertComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'list-experts', component: ListingComponent},
  {path: 'add-address', component: AddAddressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
