import { Component, OnInit } from '@angular/core';
import Deposit from 'src/app/model/deposit';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  deposits: Deposit[] = [
    new Deposit("conto 1", "descrizione 1", "link1"),
    new Deposit("conto 1", "descrizione 1", "link1"),
    new Deposit("conto 1", "descrizione 1", "link1"),
    new Deposit("conto 1", "descrizione 1", "link1"),
    new Deposit("conto 1", "descrizione 1", "link1"),
    new Deposit("conto 1", "descrizione 1", "link1"),
    new Deposit("conto 1", "descrizione 1", "link1"),
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
