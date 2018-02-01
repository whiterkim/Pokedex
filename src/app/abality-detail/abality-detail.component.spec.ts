import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbalityDetailComponent } from './abality-detail.component';

describe('AbalityDetailComponent', () => {
  let component: AbalityDetailComponent;
  let fixture: ComponentFixture<AbalityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbalityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbalityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
