import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomChat } from './random-chat';

describe('RandomChat', () => {
  let component: RandomChat;
  let fixture: ComponentFixture<RandomChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
