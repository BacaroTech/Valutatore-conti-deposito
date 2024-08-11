import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import Filter from 'src/app/model/filter';

@Component({
  selector: 'app-chart-revenue',
  templateUrl: './chart-revenue.component.html',
  styleUrls: ['./chart-revenue.component.css']
})
export class ChartRevenueComponent implements OnInit, OnChanges {

  @Input()
  value: number[] = [];

  @Input()
  parameters: Filter|null = null

  chart: any = null;

  constructor() { }
  
  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.chart == null){
      this.buildChart();
    }else{
      this.chart.data.labels = this.buildYear();
      this.chart.update();
    }
  }

  private buildChart(){
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.buildYear(),
        datasets: [
          {
            label: '# of Votes',
            data: this.value,
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

  private buildYear(): string[] {
    let currentYear = new Date().getFullYear()
    let years: string[] = [];
    years.push(String(currentYear));

    for(let i = 1; i < this.parameters!.year+1; i++){
      years.push(String(currentYear+i))
    }

    console.log(years)
    return years;
  }
}
