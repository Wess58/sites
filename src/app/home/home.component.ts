import { Component, OnInit } from '@angular/core';
import sites from '../jsons/sites.json';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sites = sites;


  constructor() { }

  ngOnInit(): void {

    console.log(this.sites[10]);

  }

}
