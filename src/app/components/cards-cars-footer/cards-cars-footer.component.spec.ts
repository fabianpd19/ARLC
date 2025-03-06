import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsCarsFooterComponent } from './cards-cars-footer.component';

describe('CardsCarsFooterComponent', () => {
  let component: CardsCarsFooterComponent;
  let fixture: ComponentFixture<CardsCarsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsCarsFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsCarsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
