import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDeclarationsComponent } from './my-declarations.component';

describe('MyDeclarationsComponent', () => {
  let component: MyDeclarationsComponent;
  let fixture: ComponentFixture<MyDeclarationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDeclarationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
