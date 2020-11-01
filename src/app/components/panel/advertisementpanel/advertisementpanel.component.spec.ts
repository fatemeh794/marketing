import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementpanelComponent } from './advertisementpanel.component';

describe('AdvertisementpanelComponent', () => {
  let component: AdvertisementpanelComponent;
  let fixture: ComponentFixture<AdvertisementpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
