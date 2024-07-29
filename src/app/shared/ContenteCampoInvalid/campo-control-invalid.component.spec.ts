import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoControlInvalidComponent } from './campo-control-invalid.component';

describe('CampoControlInvalidComponent', () => {
  let component: CampoControlInvalidComponent;
  let fixture: ComponentFixture<CampoControlInvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoControlInvalidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampoControlInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
