/**
 * Created by siddhartha on 24-06-2017.
 */
import {RouterModule, Routes} from '@angular/router';
import {SearchUsersComponent} from 'app/search-users/search-users.component';
import {UserComponent} from './user/user.component';

export const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', component: SearchUsersComponent},
  {path: 'user/:name', component: UserComponent}
];
export const routing = RouterModule.forRoot(routes);
