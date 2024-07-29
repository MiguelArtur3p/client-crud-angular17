import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastsErrorComponent } from './toasts-error.component';

describe('ToastsErrorComponent', () => {
  let component: ToastsErrorComponent;
  let fixture: ComponentFixture<ToastsErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastsErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
