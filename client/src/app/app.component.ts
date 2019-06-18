import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-favorite-expert';

  constructor(
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      if (params == null) {
        console.log()
      } else {
        localStorage.setItem('token', params['token']);
      }
    });
  }
}
