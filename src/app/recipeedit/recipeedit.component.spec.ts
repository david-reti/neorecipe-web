import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeeditComponent } from './recipeedit.component';

describe('RecipeeditComponent', () => {
  let component: RecipeeditComponent;
  let fixture: ComponentFixture<RecipeeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
