To convert this project into an Angular application called **Horizon Bow**, we need to follow a structured process. Below is a guide on how to set up the project, organize the code, and make the chart interactive within an Angular context.

### Steps to Convert to Angular:

1. **Set Up Angular Application**:
   First, you need to create a new Angular project. If you haven’t installed Angular CLI, you can do so by running:

   ```bash
   npm install -g @angular/cli
   ```

   Then, create a new Angular project called `horizon-bow`:

   ```bash
   ng new horizon-bow
   cd horizon-bow
   ```

2. **Install Chart.js**:
   The code relies on **Chart.js** for plotting the graph, so you'll need to install it. You can install **Chart.js** and the **chartjs-adapter-date-fns** adapter for time series data.

   ```bash
   npm install chart.js chartjs-adapter-date-fns
   ```

3. **Create a Component for the Chart**:
   Next, we will create an Angular component to display the chart.

   Run the following command to generate a new component called `trajectory-chart`:

   ```bash
   ng generate component trajectory-chart
   ```

4. **Update the `trajectory-chart.component.ts`**:
   In the `trajectory-chart.component.ts`, you will integrate the logic from the provided HTML and JavaScript code.

   ```typescript
   import { Component, OnInit, AfterViewInit } from '@angular/core';
   import { Chart, registerables } from 'chart.js';

   Chart.register(...registerables);

   @Component({
     selector: 'app-trajectory-chart',
     templateUrl: './trajectory-chart.component.html',
     styleUrls: ['./trajectory-chart.component.css']
   })
   export class TrajectoryChartComponent implements OnInit, AfterViewInit {
     ngOnInit(): void {}

     ngAfterViewInit(): void {
       const ctx = document.getElementById('myChart') as HTMLCanvasElement;

       // Time Series Data (example)
       const entryPrice = 120;
       const targetPrice = 150;
       const horizonLengthDays = 7; // Fixed horizon length (1 week)
       const numDataPoints = 100; // More data points for finer resolution

       // Generate time series labels for 100 points (over 7 days)
       const timeSeriesLabels = [];
       const startDate = new Date('2023-01-01');
       for (let i = 0; i < numDataPoints; i++) {
         const newDate = new Date(startDate.getTime() + (i * (1000 * 60 * 60 * 24) / numDataPoints));
         timeSeriesLabels.push(newDate);
       }

       // Function to generate oscillating data with random noise (fluctuates, but trends upward)
       function generateOscillatingData(entryPrice, targetPrice, numPoints) {
         const data = [];
         let currentPrice = entryPrice;
         const trend = (targetPrice - entryPrice) / (numPoints - 1); // The overall upward trend
         const noiseFactor = 5; // How much noise (fluctuations) to introduce, higher value increases volatility

         for (let i = 0; i < numPoints; i++) {
           const noise = (Math.random() - 0.5) * noiseFactor; // Random noise between -1 and 1
           currentPrice += trend + noise; // Apply trend and noise
           if (currentPrice < entryPrice) currentPrice = entryPrice; // Prevent price from going below entry
           if (currentPrice > targetPrice) currentPrice = targetPrice; // Prevent price from exceeding target
           data.push(currentPrice);
         }
         return data;
       }

       // More data points for actual price with oscillation
       const actualPriceData = generateOscillatingData(entryPrice, targetPrice, numDataPoints);

       // Expected price is still a straight line from entry to target
       const expectedPriceData = timeSeriesLabels.map((date, index) => {
         return entryPrice + (targetPrice - entryPrice) * (index / (numDataPoints - 1));
       });

       // Convex Bézier Arc Calculation (bow shape)
       const arcData = timeSeriesLabels.map((date, index) => {
         const normalizedTime = index / (numDataPoints - 1); // Normalize to [0, 1]
         
         // Control points for Bézier curve
         const controlPoint1 = entryPrice + (targetPrice - entryPrice) * 0.35 + 10;  // Control point higher than entry
         const controlPoint2 = entryPrice + (targetPrice - entryPrice) * 0.65 + 10;  // Control point higher than target

         const bezierY = Math.pow(1 - normalizedTime, 3) * entryPrice +
                         3 * Math.pow(1 - normalizedTime, 2) * normalizedTime * controlPoint1 +
                         3 * (1 - normalizedTime) * Math.pow(normalizedTime, 2) * controlPoint2 +
                         Math.pow(normalizedTime, 3) * targetPrice;

         return bezierY;
       });

       // Scalping line (exit point at 11:15am with 141-142 price)
       const scalpingStartIndex = Math.floor(numDataPoints * 0.5); // Approximate 11:15 AM (50% of the way)
       const scalpingStartPrice = 141; // Price around 141-142 at 11:15am

       // Generate the scalping line from 11:15 AM price to the expected target
       const scalpingLineData = [];
       for (let i = scalpingStartIndex; i < numDataPoints; i++) {
         const timeProgress = (i - scalpingStartIndex) / (numDataPoints - scalpingStartIndex); // Normalize for the remainder
         const scalpingPrice = scalpingStartPrice + (targetPrice - scalpingStartPrice) * timeProgress; // Smooth path
         scalpingLineData.push(scalpingPrice);
       }

       // Prepopulate scalpingLineData with placeholder values before 11:15 AM (if needed)
       for (let i = 0; i < scalpingStartIndex; i++) {
         scalpingLineData.unshift(scalpingStartPrice); // Placeholder value to start the line at the 11:15 price
       }

       const config = {
         type: 'line',
         data: {
           labels: timeSeriesLabels,
           datasets: [
             {
               label: 'Actual Price Progress',
               data: actualPriceData,
               borderColor: 'rgba(75, 192, 192, 1)',
               backgroundColor: 'rgba(75, 192, 192, 0.7)', // Blue background for the actual price
               fill: 'origin', // Fill below actual price
               borderWidth: 0, // Remove the line
               pointRadius: 0, // Remove plot points
               tension: 0 // Straight line, no curve
             },
             {
               label: 'Expected Price Progress (String)',
               data: expectedPriceData,
               borderColor: 'rgba(0, 0, 255, 1)',  // Blue color for expected price
               backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red background for expected price
               fill: 'origin', // Fill below expected price
               borderWidth: 0, // Remove the line
               pointRadius: 0, // Remove plot points
               tension: 0.4
             },
             {
               label: 'Trajectory Arc (Bow)',
               data: arcData,
               borderColor: 'rgba(255, 159, 64, 1)', // Orange color for the arc
               backgroundColor: 'rgba(0, 255, 0, 0.2)', // Green background for the arc
               fill: 'origin', // Fill below arc
               borderWidth: 0, // Remove the line
               pointRadius: 0, // Remove plot points
               tension: 0.4,
               borderDash: [] // Solid line for the arc
             },
             {
               label: 'Scalping Exit',
               data: scalpingLineData,
               borderColor: 'rgba(255, 0, 0, 1)', // Red color for scalping exit
               backgroundColor: 'rgba(255, 0, 0, 0.3)', // Light red for the scalping area
               fill: 'origin', // Fill below scalping line
               borderWidth: 2,
               pointRadius: 0,
               tension: 0,
               borderDash: [5, 5] // Dashed line for the scalping exit
             }
           ]
         },
         options: {
           scales: {
             x: {
               type: 'time', // Time axis
               time: {
                 unit: 'hour', // Use a finer granularity (hourly data points for 7 days)
                 tooltipFormat: 'll'
               },
               title: {
                 display: true,
                 text: 'Date'
               }
             },
             y: {
               title: {
                 display: true,
                 text: 'Price Progress (Normalized)'
               }
             }
           },
           responsive: true,
           plugins: {
             legend: {
               position: 'top',
             },
             tooltip: {
               mode: 'nearest',
               intersect: false,
               callbacks: {
                 label: function(tooltipItem) {
                   return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toFixed(2);
                 }
               }
             }
           }
         }
       };

       // Create the chart
       new Chart(ctx, config);
     }
   }

   ```

### 5. **Update the HTML Template (`trajectory-chart.component.html`)**:

In the `trajectory-chart.component.html`, you just need the `<canvas>` tag to hold the chart:

```html
<h2>Trajectory Arc with Background Fill</h2>
<canvas id="myChart"></canvas>
```

### 6. **Add Styling (`trajectory-chart.component.css`)**:

You can add basic styling to the component to ensure the chart fits well within the page. Here's an example:

```css
canvas {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
```

### 7. **Include the Component in the Main Application**:

To display the `TrajectoryChartComponent` in the application, you will need to add it to the `app.component.html`.

In `app.component.html`:

```html
<app-trajectory-chart></app-trajectory-chart>
```

### 8. **Run the Application**:

Now, you can run the Angular app by executing the following command:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200` to see the chart in action.

### Conclusion

With these changes, you’ve successfully converted the **Trajectory Arc** chart into an Angular application. The Angular component will dynamically generate and display the chart, using the same logic from your provided HTML and JavaScript. You can extend this by adding features like dynamic data input, additional interactivity, or even backend integration to fetch real-time data.
