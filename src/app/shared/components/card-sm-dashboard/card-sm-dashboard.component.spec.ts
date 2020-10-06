import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSmDashboardComponent } from './card-sm-dashboard.component';

describe('CardSmDashboardComponent', () => {
  let component: CardSmDashboardComponent;
  let fixture: ComponentFixture<CardSmDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSmDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
