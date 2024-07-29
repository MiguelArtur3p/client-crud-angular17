import { TestBed } from '@angular/core/testing';

import { CidadeValidatorService } from './cidade-validator.service';

describe('ValidarCidadeService', () =>
{
    let service: CidadeValidatorService;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CidadeValidatorService);
    });

    it('should be created', () =>
    {
        expect(service).toBeTruthy();
    });
});
