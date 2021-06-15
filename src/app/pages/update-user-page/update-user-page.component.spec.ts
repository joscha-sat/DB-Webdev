import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserPageComponent } from './update-user-page.component';

describe('UpdateUserPageComponent', () => {
  let component: UpdateUserPageComponent;
  let fixture: ComponentFixture<UpdateUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
