import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipebooksComponent } from './recipebooks.component';

describe('RecipebooksComponent', () => {
  let component: RecipebooksComponent;
  let fixture: ComponentFixture<RecipebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipebooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
