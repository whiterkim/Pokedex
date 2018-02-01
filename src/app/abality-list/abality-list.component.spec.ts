import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbalityListComponent } from './abality-list.component';

describe('AbalityListComponent', () => {
  let component: AbalityListComponent;
  let fixture: ComponentFixture<AbalityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbalityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbalityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
