import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsCarsComponent } from './icons-cars.component';

describe('IconsCarsComponent', () => {
  let component: IconsCarsComponent;
  let fixture: ComponentFixture<IconsCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
