import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { SearchUsersService } from './search-users.service';
import { UserComponent } from './user/user.component';
import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    SearchUsersComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [SearchUsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
