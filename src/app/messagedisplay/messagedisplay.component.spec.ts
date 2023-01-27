import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagedisplayComponent } from './messagedisplay.component';

describe('MessagedisplayComponent', () => {
  let component: MessagedisplayComponent;
  let fixture: ComponentFixture<MessagedisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagedisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
