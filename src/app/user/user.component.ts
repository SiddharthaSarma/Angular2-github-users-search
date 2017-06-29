import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchUsersService} from 'app/search-users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user;
  public repos;
  public name: string;
  private _sub;

  constructor(private _searchService: SearchUsersService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      this.name = params['name']; // (+) converts string 'id' to a number
      this.getDetails(this.name);
      this.getRepos(this.name);
      // In a real app: dispatch action to load the details here.
    });
  }

  getDetails(username: string) {
    this._searchService.getDetailsByUserName(username).subscribe(
      userDetails => {
        this.user = userDetails;
      },
      error => {
        console.error(error);
      }
    );
  }

  getRepos(username: string) {
    this._searchService.getRepos(username).subscribe(
      repos => {
        this.repos = repos;
      },
      error => {
        console.error(error);
      }
    );
  }
}
