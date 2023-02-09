import { TestBed } from '@angular/core/testing';

import { CompletedrecipesService } from './completedrecipes.service';

describe('CompletedrecipesService', () => {
  let service: CompletedrecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedrecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
