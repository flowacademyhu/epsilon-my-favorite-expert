import { TestBed } from '@angular/core/testing';

import { RequestinterceptorService } from './requestinterceptor.service';

describe('RequestinterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestinterceptorService = TestBed.get(RequestinterceptorService);
    expect(service).toBeTruthy();
  });
});
