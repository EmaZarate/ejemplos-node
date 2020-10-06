import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardImportComponent } from './dashboard-import.component';

describe('DashboardImportComponent', () => {
  let component: DashboardImportComponent;
  let fixture: ComponentFixture<DashboardImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
