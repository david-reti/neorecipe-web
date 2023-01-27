import { TestBed } from '@angular/core/testing';

import { RecipebookService } from './recipebook.service';

describe('RecipebookService', () => {
  let service: RecipebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
