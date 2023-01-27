import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongerroroutletComponent } from './longerroroutlet.component';

describe('LongerroroutletComponent', () => {
  let component: LongerroroutletComponent;
  let fixture: ComponentFixture<LongerroroutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongerroroutletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongerroroutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
