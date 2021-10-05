import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteLiderComponent } from './reporte-lider.component';

describe('ReporteLiderComponent', () => {
  let component: ReporteLiderComponent;
  let fixture: ComponentFixture<ReporteLiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteLiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteLiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
