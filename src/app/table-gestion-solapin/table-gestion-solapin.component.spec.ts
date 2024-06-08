import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGestionSolapinComponent } from './table-gestion-solapin.component';

describe('TableGestionSolapinComponent', () => {
  let component: TableGestionSolapinComponent;
  let fixture: ComponentFixture<TableGestionSolapinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableGestionSolapinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableGestionSolapinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
