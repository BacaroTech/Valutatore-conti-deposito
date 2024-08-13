import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Filter from 'src/app/model/filter';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  datas: number[] = [];
  parameters: Filter | null = null;

  loadComponentChild: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private router : Router) { }

  ngOnInit(): void {

  }
  
  formCapital: FormGroup = new FormGroup({
    start: new FormControl<Number>(0),
    percent: new FormControl<Number>(0),
    years: new FormControl<Number>(0)
  })

  ngSubmit(){
    this.isLoading = true;
    this.parameters = new Filter(
      this.formCapital.value.start,
      this.formCapital.value.percent,
      this.formCapital.value.years
    )
    if(this.formCapital.value.start > 0 && this.formCapital.value.percent > 0 && this.formCapital.value.years > 0){
      this.loadComponentChild = true;
      this.isError = false;
      this.isLoading = false;
    }else{
      this.isError = true;
      this.isLoading = false;
    }
  }

}
