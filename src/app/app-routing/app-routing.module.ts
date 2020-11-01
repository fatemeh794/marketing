import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes , RouterModule , ActivatedRoute} from '@angular/router';
import {PanelComponent} from '../components/panel/panel.component';
import {LoginComponent} from '../components/login/login.component';
import {DragdropComponent} from '../components/panel/dragdrop/dragdrop.component';
import {TagsComponent} from '../components/panel/tags/tags.component';
import {PackagesComponent} from '../components/panel/packages/packages.component';
import {SiteformComponent} from '../components/panel/siteform/siteform.component';
import {PagesComponent} from '../components/panel/pages/pages.component';
import {UsersComponent} from '../components/panel/users/users.component';
import {AdvertisementComponent} from '../components/panel/advertisement/advertisement.component';
import {AdvertisementpanelComponent} from '../components/panel/advertisementpanel/advertisementpanel.component';


const routes: Routes = [
  {path: 'main', component: PanelComponent ,
  children: [
    {
      path: 'sites', component: SiteformComponent
    },
    {
      path: 'dragdrop', component: DragdropComponent
    },
    {
      path: 'tags', component: TagsComponent
    },
    {
      path: 'packages', component: PackagesComponent
    },
    {
      path: 'pages', component: PagesComponent
    },
    {
      path: 'users', component: UsersComponent
    },
    {
      path: 'panels', component: AdvertisementpanelComponent
    },
    {
      path: 'advertisement', component: AdvertisementComponent
    },
    {
      path: '', redirectTo: 'dragdrop', pathMatch: 'full'
    },
  ]

  },
  {path: '**', component: LoginComponent}
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes), RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
