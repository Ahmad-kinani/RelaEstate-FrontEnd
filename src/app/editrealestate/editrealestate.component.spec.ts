import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditrealestateComponent } from './editrealestate.component';

describe('EditrealestateComponent', () => {
  let component: EditrealestateComponent;
  let fixture: ComponentFixture<EditrealestateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditrealestateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditrealestateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
