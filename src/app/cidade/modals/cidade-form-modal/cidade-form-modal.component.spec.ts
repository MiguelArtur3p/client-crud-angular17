import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadeFormModalComponent } from './cidade-form-modal.component';

describe('CidadeFormModalComponent', () =>
{
    let component: CidadeFormModalComponent;
    let fixture: ComponentFixture<CidadeFormModalComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [CidadeFormModalComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CidadeFormModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
