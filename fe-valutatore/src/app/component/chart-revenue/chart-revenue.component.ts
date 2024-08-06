import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-revenue',
  templateUrl: './chart-revenue.component.html',
  styleUrls: ['./chart-revenue.component.css']
})
export class ChartRevenueComponent implements OnInit {

  @Input()
  value: number[] = [];

  @Input()
  parameters: any = null

  chart: any = [];

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true
      },
    });
  }

}
