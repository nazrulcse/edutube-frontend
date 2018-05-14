import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSidenavComponent } from './sidenav.component';

describe('InstructorSidenavComponent', () => {
  let component: InstructorSidenavComponent;
  let fixture: ComponentFixture<InstructorSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
