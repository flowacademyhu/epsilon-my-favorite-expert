import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedinComponent } from './components/loggedin/loggedin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ListingComponent } from './components/listing/listing.component';
import { ExpertComponent } from './components/listing/expert/expert.component';
import { AddExpertComponent } from './components/add-expert/add-expert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/listing/user/user.component';
import { RequestinterceptorService } from './requestinterceptor.service';
import { FormsModule } from '@angular/forms';
import { AddAddressComponent } from './add-address/add-address.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchUserComponent } from './components/listing/search-user/search-user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoggedinComponent,
    ProfileComponent,
    ListingComponent,
    ExpertComponent,
    AddExpertComponent,
    UserComponent,
    AddAddressComponent,
    HeaderComponent,
    SearchUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
}),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [HttpClientModule,
    {provide: HTTP_INTERCEPTORS, useClass: RequestinterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
