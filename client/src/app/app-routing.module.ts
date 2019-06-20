import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoggedinComponent } from './components/loggedin/loggedin.component';
import { AddExpertComponent } from './components/add-expert/add-expert.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { LoggedinGuard } from './shared/guard/loggedinguard.service';
import { SearchUserComponent } from './components/search-user/search-user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {pathMatch: 'prefix', path: 'oauth2/redirect', component: LoggedinComponent},
  {path:  'add', component: AddExpertComponent, canActivate: [LoggedinGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [LoggedinGuard]},
  {path: 'list-experts', component: ListingComponent},
  {path: 'add-address', component: AddAddressComponent, canActivate: [LoggedinGuard]},
  {path: 'search-user', component: SearchUserComponent, canActivate: [LoggedinGuard]},
  {path: '**', component: LoginComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
