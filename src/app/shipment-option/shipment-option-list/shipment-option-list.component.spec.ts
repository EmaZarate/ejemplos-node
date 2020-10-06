import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentOptionListComponent } from './shipment-option-list.component';

describe('ShipmentOptionListComponent', () => {
  let component: ShipmentOptionListComponent;
  let fixture: ComponentFixture<ShipmentOptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentOptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
