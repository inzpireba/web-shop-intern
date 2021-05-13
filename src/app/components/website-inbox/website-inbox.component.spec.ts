import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteInboxComponent } from './website-inbox.component';

describe('WebsiteInboxComponent', () => {
  let component: WebsiteInboxComponent;
  let fixture: ComponentFixture<WebsiteInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
