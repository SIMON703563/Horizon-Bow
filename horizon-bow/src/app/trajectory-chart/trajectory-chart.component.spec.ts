import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajectoryChartComponent } from './trajectory-chart.component';

describe('TrajectoryChartComponent', () => {
  let component: TrajectoryChartComponent;
  let fixture: ComponentFixture<TrajectoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrajectoryChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrajectoryChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
