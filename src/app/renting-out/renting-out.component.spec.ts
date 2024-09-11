import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingOutComponent } from './renting-out.component';

describe('RentingOutComponent', () => {
  let component: RentingOutComponent;
  let fixture: ComponentFixture<RentingOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentingOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentingOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
