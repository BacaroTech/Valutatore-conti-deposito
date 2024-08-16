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
      this.chart.data.datasets[0].data = this.buildValue();
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
            label: 'Revenues',
            data: this.buildValue(),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
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

    for(let i = 1; i < this.parameters!.anni+1; i++){
      years.push(String(currentYear+i))
    }
    return years;
  }

  private buildValue(){
    let moneyByYear: number[] = [];
    moneyByYear.push(this.parameters?.base as number);
    for(let i = 1; i < this.parameters!.anni+1; i++){
      moneyByYear.push(moneyByYear[moneyByYear.length - 1] + 
        ((moneyByYear[moneyByYear.length - 1] * (this.parameters?.percentuale as number))/100))
    }
    return moneyByYear;
  }
}
