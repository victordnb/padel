import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipistaComponent } from './multipista.component';

describe('MultipistaComponent', () => {
  let component: MultipistaComponent;
  let fixture: ComponentFixture<MultipistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipistaComponent]
    });
    fixture = TestBed.createComponent(MultipistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
