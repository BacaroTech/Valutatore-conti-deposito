import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Filter from 'src/app/model/filter';
import { ReportService } from 'src/app/services/report.service';

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
  modalIsOpen: boolean = false;

  linkToShare: string = "";

  formCapital: FormGroup | any = null;

  constructor(
    private router : Router,
    private report : ReportService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    let url: string[] = this.router.url.split("/")
    if(url.length > 2){
      this.report.getReportById(url.at(2) as any).subscribe(x => {
        this.formCapital = new FormGroup({
          start: new FormControl<Number>(x[0].base),
          percent: new FormControl<Number>(x[0].percentuale),
          years: new FormControl<Number>(x[0].anni)
        })

        this.parameters = new Filter(
          this.formCapital.value.start,
          this.formCapital.value.percent,
          this.formCapital.value.years
        )
      })
      this.loadComponentChild = true
    }else{
      this.formCapital = new FormGroup({
        start: new FormControl<Number>(0),
        percent: new FormControl<Number>(0),
        years: new FormControl<Number>(0)
      })
    }
    this.isError = false;
    this.isLoading = false;
  }
  
  
  ngSubmit(){
    this.isLoading = true;
    this.parameters = new Filter(
      this.formCapital.value.start,
      this.formCapital.value.percent,
      this.formCapital.value.years
    )
    if(this.formCapital.value.start > 0 && this.formCapital.value.percent > 0 && this.formCapital.value.years > 0){
      this.loadComponentChild = true;
      this.report.addReport({
        base: this.formCapital.value.start,
        percentuale: this.formCapital.value.percent,
        anni: this.formCapital.value.years
      }).subscribe(res => {
        this.linkToShare = "http://localhost:4200/calculate/"+res.id
      })
      this.isError = false;
      this.isLoading = false;
    }else{
      this.isError = true;
      this.isLoading = false;
    }
  }

  openModal(){
    document.getElementById("modal")?.classList.remove("hidden");
    document.getElementById("bgModal")?.classList.remove("hidden");
    this.modalIsOpen = true;
  }

  closeModal(){
    document.getElementById("modal")?.classList.add("hidden");
    document.getElementById("bgModal")?.classList.add("hidden");
    this.modalIsOpen = false;
  }

}
