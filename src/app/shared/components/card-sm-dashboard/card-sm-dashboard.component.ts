import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DashboardCard } from '../../models/DashboardCard.model';

@Component({
  selector: 'app-card-sm-dashboard',
  templateUrl: './card-sm-dashboard.component.html',
  styleUrls: ['./card-sm-dashboard.component.css']
})
export class CardSmDashboardComponent implements OnInit {

  @Input() cardInfo: DashboardCard;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateRelative = () => this.router.navigate([this.cardInfo.navigateToRelative], { relativeTo: this.route });
}
