import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopcontentComponent } from './topcontent.component';

describe('TopcontentComponent', () => {
  let component: TopcontentComponent;
  let fixture: ComponentFixture<TopcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
