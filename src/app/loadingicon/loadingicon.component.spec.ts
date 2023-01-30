import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingiconComponent } from './loadingicon.component';

describe('LoadingiconComponent', () => {
  let component: LoadingiconComponent;
  let fixture: ComponentFixture<LoadingiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingiconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
