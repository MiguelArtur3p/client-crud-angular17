import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadeListModalComponent } from './cidade-list-modal.component';

describe('CidadeListModalComponent', () =>
{
    let component: CidadeListModalComponent;
    let fixture: ComponentFixture<CidadeListModalComponent>;

    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            declarations: [CidadeListModalComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CidadeListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
