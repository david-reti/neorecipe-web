import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipetileComponent } from './recipetile.component';

describe('RecipetileComponent', () => {
  let component: RecipetileComponent;
  let fixture: ComponentFixture<RecipetileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipetileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipetileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
