import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomMatchComponent } from './random-match.component';

describe('RandomMatchComponent', () => {
  let component: RandomMatchComponent;
  let fixture: ComponentFixture<RandomMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomMatchComponent]
    });
    fixture = TestBed.createComponent(RandomMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
