import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationError, NavigationEnd, NavigationCancel, Event } from '@angular/router';

@Component({
  selector: 'app-inside-routing',
  templateUrl: './inside-routing.component.html',
  styleUrls: ['./inside-routing.component.css']
})
export class InsideRoutingComponent implements OnInit {

  title = 'Backoffice';
  isLoading = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('auth_tokenn');
    if (token) {
      if (this.router.url) {
        this.router.navigateByUrl(this.router.url);
      } else {
        this.router.navigate(['/orders']);
      }
    } else {
      this.router.navigate(['/login']);
    }

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      }

      if (event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.isLoading = false;
      }
    });
  }

}
