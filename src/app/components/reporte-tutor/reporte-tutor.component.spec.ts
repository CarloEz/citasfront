import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTutorComponent } from './reporte-tutor.component';

describe('ReporteTutorComponent', () => {
  let component: ReporteTutorComponent;
  let fixture: ComponentFixture<ReporteTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
