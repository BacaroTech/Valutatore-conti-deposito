import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  datas: number[] = [];

  loadComponentChild: boolean = false;

  constructor(private router : Router) { }

  ngOnInit(): void {
    let href: string[] = this.router.url.split("/");
    if(href.length == 3){
      //when get old generated report
      this.loadComponentChild = true;
    }
  }
  
  formCapital: FormGroup = new FormGroup({
    start: new FormControl(),
    percent: new FormControl(),
    years: new FormControl()
  })

  ngSubmit(){
    console.log(this.formCapital.value); 
    this.router.navigateByUrl("/calculate/1")
  }

}
