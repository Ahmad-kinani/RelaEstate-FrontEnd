import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrealestateComponent } from './addrealestate.component';

describe('AddrealestateComponent', () => {
  let component: AddrealestateComponent;
  let fixture: ComponentFixture<AddrealestateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddrealestateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddrealestateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
