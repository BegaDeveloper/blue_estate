import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateViewComponent } from './estate-view.component';

describe('EstateViewComponent', () => {
  let component: EstateViewComponent;
  let fixture: ComponentFixture<EstateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
