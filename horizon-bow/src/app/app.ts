import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrajectoryChartComponent } from './trajectory-chart/trajectory-chart.component'; // <-- child

@Component({
  selector: 'app-root',
  standalone: true,             // important for modern Angular
  imports: [RouterOutlet, TrajectoryChartComponent], // import child components here
  templateUrl: './app.html',    // template file
  styleUrls: ['./app.scss']     // styles file (plural!)
})
export class App {
  protected readonly title = signal('horizon-bow');
}
