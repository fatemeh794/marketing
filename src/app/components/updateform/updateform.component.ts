import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Tag} from '../../interfaces/interfaces';
import {TagsService} from '../../services/tags.service';
import {PackageService} from '../../services/package.service';
import {PagesService} from '../../services/pages.service';
import {SitesService} from '../../services/sites.service';
import {GenderService} from '../../services/gender.service';
import {PaneladvertisementService} from '../../services/paneladvertisement.service';

@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.css']
})
export class UpdateformComponent implements OnInit {
  @Input() selectrow ;
  @Output()  editsiteinfo = new EventEmitter();
  selected: Tag[] = [] ;
  tags: any[] = [];
  sites: any[] = [];
  package: any[] = [];
  genders: any[] = [];
  pages: any[] = [];
  panels: any[] ;
  constructor(private tag: TagsService,
              private pkg: PackageService ,
              private page: PagesService ,
              private site: SitesService ,
              private gender: GenderService,
              private panel: PaneladvertisementService,
              public link: Router)
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

  updateinformation(data): any {
    if (data.Id){
      data.Id = this.selectrow.id; }
    else {
      data.id = this.selectrow.id;
    }
    this.editsiteinfo.emit(data);
  }
  getValues(): any {
    console.log(this.selected);
  }
  onFileSelected(event: Event): any {
    console.log(event);
    // @ts-ignore
    this.selectrow.profileImage = event.target.files[0] as File;
  }
  onFileSelected2(event: Event): any {
    console.log(event);
    // @ts-ignore
    this.selectrow.picture = event.target.files[0] as File;
  }
}
