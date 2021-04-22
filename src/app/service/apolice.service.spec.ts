import { TestBed } from '@angular/core/testing';

import { ApoliceService } from './apolice.service';

describe('ApoliceService', () => {
  let service: ApoliceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApoliceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
