import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxaddComponent } from './dialogboxadd.component';

describe('DialogboxaddComponent', () => {
  let component: DialogboxaddComponent;
  let fixture: ComponentFixture<DialogboxaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogboxaddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogboxaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
