import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentOptionFormComponent } from './shipment-option-form.component';

describe('ShipmentOptionFormComponent', () => {
  let component: ShipmentOptionFormComponent;
  let fixture: ComponentFixture<ShipmentOptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentOptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentOptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
