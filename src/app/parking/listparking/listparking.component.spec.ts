import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListparkingComponent } from './listparking.component';

describe('ListparkingComponent', () => {
  let component: ListparkingComponent;
  let fixture: ComponentFixture<ListparkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListparkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListparkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
