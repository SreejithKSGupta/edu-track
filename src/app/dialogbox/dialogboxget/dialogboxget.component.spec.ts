import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxgetComponent } from './dialogboxget.component';

describe('DialogboxgetComponent', () => {
  let component: DialogboxgetComponent;
  let fixture: ComponentFixture<DialogboxgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogboxgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogboxgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
