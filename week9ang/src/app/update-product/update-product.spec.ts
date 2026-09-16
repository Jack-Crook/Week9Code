import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { UpdateProduct } from './update-product';

describe('UpdateProduct', () => {
  let component: UpdateProduct;
  let fixture: ComponentFixture<UpdateProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProduct],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
