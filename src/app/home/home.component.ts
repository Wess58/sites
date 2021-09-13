import { Component, OnInit, HostListener } from '@angular/core';
import sites from '../jsons/sites.json';

import { style, animate, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  @HostListener('document:click', ['$event']) onClick(event: any) {
    // console.log(event.target.attributes ?.id ?.nodeValue);

    if (event.target.attributes ?.id ?.nodeValue === 'special') {
      this.open = true;
    } else {
      this.open = false;
    }
  }

  sites = sites;
  selectedList: any = [];
  filteredSites: any = [];
  lvps: any = [];
  hybrid: any = [];
  toBeStarted: any = [];
  toBeDeployed: any = [];
  searchTerm: any;
  open = false;



  constructor() { }

  ngOnInit(): void {

  }


  search(): void {

    this.filteredSites = [];
    this.sites.forEach((site: any) => {
      if (site.siteName.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        this.filteredSites.push(site);
      }
    });
  }

  selectSite(site: any): void {

    const sentence = site.siteName.slice(16) + ' ' + site.BHT + ' bht';


    if (site.siteType === 'Lvps') {
      this.lvps.push(sentence);
    }

    if (site.siteType === 'Hybrid') {
      this.hybrid.push(sentence);
    }

    if (site.siteType === 'to be started') {
      this.toBeStarted.push(sentence);
    }

    if (site.siteType === 'to be deployed') {
      this.toBeDeployed.push(sentence);
    }
  }

}
