import { TestBed } from '@angular/core/testing';

import { LoggedinGuard } from './loggedinguard.service';

describe('LoggedinguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggedinGuard = TestBed.get(LoggedinGuard);
    expect(service).toBeTruthy();
  });
});
