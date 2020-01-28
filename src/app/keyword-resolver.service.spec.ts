import { TestBed } from '@angular/core/testing';

import { KeywordResolverService } from './keyword-resolver.service';

describe('KeywordResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeywordResolverService = TestBed.get(KeywordResolverService);
    expect(service).toBeTruthy();
  });
});
