import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlternativesPage } from './alternatives.page';

describe('AlternativesPage', () => {
  let component: AlternativesPage;
  let fixture: ComponentFixture<AlternativesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternativesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
