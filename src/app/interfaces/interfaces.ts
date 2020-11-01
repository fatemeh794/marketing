export interface Package {
  name: string;
  id: string;
}

export interface Page {
  address: string ;
  id: string;
  siteid: string;
}
export interface Site {
  WebSiteName: string;
  Address: string;
  Tags: Array<Tag>;
  PackageId: string;
  Id?: string;
}
export interface Tag {
  Name: string;
}


export interface TagData {
  name: string;
  id: string;
}
export interface User {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  ProfileImage: File  ;
  GenderId: string;
  Id?: string;

}
export interface Advertisement {
  picture: File;
  bannerAddress?: string;
  fileName: string;
  link: string;
  Id?: string;
  PanelId: string;

}
export interface Panel {
  Description: string ;
  Id: string;
  OurPageId: string ;
}
