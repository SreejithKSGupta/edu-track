import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxrowComponent } from './dialogboxrow.component';

describe('DialogboxrowComponent', () => {
  let component: DialogboxrowComponent;
  let fixture: ComponentFixture<DialogboxrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogboxrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogboxrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
