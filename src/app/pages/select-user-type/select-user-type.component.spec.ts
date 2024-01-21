import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserTypeComponent } from './select-user-type.component';

describe('SelectUserTypeComponent', () => {
  let component: SelectUserTypeComponent;
  let fixture: ComponentFixture<SelectUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectUserTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
