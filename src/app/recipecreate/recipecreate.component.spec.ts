import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipecreateComponent } from './recipecreate.component';

describe('RecipecreateComponent', () => {
  let component: RecipecreateComponent;
  let fixture: ComponentFixture<RecipecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipecreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
