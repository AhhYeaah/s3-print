import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  
  camera = faCamera

  constructor(public router : Router) { }

  ngOnInit(): void {
  }

}
