import { TestBed } from '@angular/core/testing';

import { TratarErrosService } from './tratar-erros.service';

describe('TratarErrosService', () => {
  let service: TratarErrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TratarErrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
