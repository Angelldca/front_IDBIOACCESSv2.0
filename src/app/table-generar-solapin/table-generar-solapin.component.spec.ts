import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGenerarSolapinComponent } from './table-generar-solapin.component';

describe('TableGenerarSolapinComponent', () => {
  let component: TableGenerarSolapinComponent;
  let fixture: ComponentFixture<TableGenerarSolapinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableGenerarSolapinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableGenerarSolapinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
