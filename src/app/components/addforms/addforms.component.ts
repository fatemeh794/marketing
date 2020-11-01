import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Advertisement, Package, Page, Panel, Site, Tag, TagData, User} from '../../interfaces/interfaces';
import {TagsService} from '../../services/tags.service';
import {PackageService} from '../../services/package.service';
import {SitesService} from '../../services/sites.service';
import {GenderService} from '../../services/gender.service';
import {Router} from '@angular/router';
import {PagesService} from '../../services/pages.service';
import {AdvertisementService} from '../../services/advertisement.service';
import {PaneladvertisementService} from '../../services/paneladvertisement.service';

@Component({
  selector: 'app-addforms',
  templateUrl: './addforms.component.html',
  styleUrls: ['./addforms.component.css']
})
export class AddformsComponent implements OnInit {

  @Input() addform ;
  @Input() updateform ;
  @Output()  addinfo = new EventEmitter();
  siteinformation: Site = {WebSiteName: '' , Address: '', Tags: [{Name: ''}] , PackageId: '', } ;
  taginformation: TagData = {name: '' , id: '' } ;
  pageinformation: Page = {address: '' , id: '' , siteid: '' } ;
  packageinformation: Package = {name: '' , id: '' } ;
  userinformation: User = {FirstName: '' , LastName: '' , GenderId: '' , Email: '' , Password: '' , ProfileImage: null , Id: ''} ;
  panelinformation: Panel = {Description: ''  , Id: '' , OurPageId: '' } ;
  data: Advertisement = {link: '' , picture: null , PanelId: '' , fileName: '' , bannerAddress: '' , Id: ''};
  tags: any[] = [];
  sites: any[] = [];
  package: any[] = [];
  genders: any[] = [];
  pages: any[] = [];
  panels: any[] ;
  open = false ;
  selected: any[]  ;

  constructor(private tag: TagsService,
              private pkg: PackageService ,
              private page: PagesService ,
              private site: SitesService ,
              private gender: GenderService,
              public link: Router ,
              private advertisement: AdvertisementService ,
              private panel: PaneladvertisementService)
  {
  }


  ngOnInit(): void {
    this.tag.gettags().subscribe(data => {
      this.tags = data;
    });
    this.pkg.get().subscribe(data => {
      this.package = data;
    });
    this.site.get().subscribe(data => {
      this.sites = data;
    });
    this.gender.get().subscribe(data => {
      this.genders = data;
    });
    this.page.get().subscribe(data => {
      this.pages = data;
    });
    this.panel.get().subscribe(data => {
      this.panels = data ;
    });
  }
  onclose(obj): any {
    this.siteinformation.Tags = [];
    for (const i of obj) {
      this.siteinformation.Tags.push({Name: i});
    }
    console.log(this.siteinformation.Tags);
  }
  addinformation(obj): any {
    this.addinfo.emit(obj);
  }

  onFileSelected(event: Event): any {
    console.log(event);
    // @ts-ignore
    this.userinformation.ProfileImage = event.target.files[0] as File;
  }
  onFileSelected2(event: Event): any {
    // @ts-ignore
    this.data.picture = event.target.files[0] as File;
  }
}
