import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersChat } from './users-chat';

describe('UsersChat', () => {
  let component: UsersChat;
  let fixture: ComponentFixture<UsersChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
