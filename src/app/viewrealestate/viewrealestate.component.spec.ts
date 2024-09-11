import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrealestateComponent } from './viewrealestate.component';

describe('ViewrealestateComponent', () => {
  let component: ViewrealestateComponent;
  let fixture: ComponentFixture<ViewrealestateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewrealestateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewrealestateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
