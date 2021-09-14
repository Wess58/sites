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
  hybrids: any = [];
  toBeStarteds: any = [];
  toBeDeployeds: any = [];
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

    const sentence = site.siteName.slice(16) + ' ' + site.BHT + ' bht ' + '@' + site.tech_1;


    if (site.siteType === 'Lvps') {
      this.lvps.push(sentence);
    }

    if (site.siteType === 'Hybrid') {
      this.hybrids.push(sentence);
    }

    if (site.siteType === 'to be started') {
      this.toBeStarteds.push(sentence);
    }

    if (site.siteType === 'to be deployed') {
      this.toBeDeployeds.push(sentence);
    }
  }

  deselect(index: any, type: any): void {
    if (type === 'lvps') {
      this.lvps.splice(index, 1);
    }
    if (type === 'hybrids') {
      this.hybrids.splice(index, 1);

    }
    if (type === 'toBeStarteds') {
      this.toBeStarteds.splice(index, 1);
    }
    if (type === 'toBeDeployeds') {
      this.toBeDeployeds.splice(index, 1);

    }
  }

  copy(type: any): void {

    if (type === 'lvps') {
      navigator.clipboard.writeText('Lvps sites: ' + this.lvps);
    }

    if (type === 'hybrids') {
      navigator.clipboard.writeText('Hybrid sites: ' + this.hybrids);
    }

    if (type === 'toBeStarteds') {
      navigator.clipboard.writeText('Gen to be started: ' + this.toBeStarteds);
    }

    if (type === 'toBeDeployeds') {
      navigator.clipboard.writeText('Gen to be deployed: ' + this.toBeDeployeds);
    }


  }

}
