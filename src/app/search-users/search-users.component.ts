import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SearchUsersService} from '../search-users.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
  place: string;
  language: string;
  page = 1;
  disablePrevButton = true;
  results: any[] = []; // This will hold the data coming from the service
  selected = false; // Flag to check if a user is clicked or not
  selectedUser: any; // presently Selected user details
  error_text = ''; // So called error reporting text to the end user
  constructor(private searchService: SearchUsersService, private router: Router) { }

  ngOnInit() {
  }


  search(place: string, language: string, page = 1) {
    this.selected = false;
    this.error_text = '';
    if (place || language) {
      this.place = place;
      this.language = language;
      this.searchService.getUsersByPlaceAndLanguage(place, language, page).subscribe(
        users => {
          this.results = users;
        },
        error => {
          this.results = [];
          this.error_text = 'Sorry! No Users found. Try again';
          console.error(error);
        }
      );
    }
  }

  getDetails(userName: string) {
    this.router.navigate(['/user', userName]);
  }
  getNextPage(place: string, language: string) {
    this.page = this.page + 1;
    this.disablePrevButton = false;
    window.scrollTo(0, 0);
    this.search(place, language, this.page);
  }

  getPrevPage(place: string, language: string) {
    this.page = this.page - 1;
    if (this.page === 1) {
      this.disablePrevButton = true;
    }
    window.scrollTo(0, 0);
    this.search(place, language, this.page);
  }

}
