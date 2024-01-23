import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCompanyComponent } from './validate-company.component';

describe('ValidateCompanyComponent', () => {
  let component: ValidateCompanyComponent;
  let fixture: ComponentFixture<ValidateCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
