import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  closeMenu(){
    document.getElementById("rightMenu")?.classList.add("hidden");
  }

  openMenu(){
    console.log("hello")
    document.getElementById("rightMenu")?.classList.remove("hidden");
  }

}
