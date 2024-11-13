import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMusicPage } from './edit-music.page';

describe('EditMusicPage', () => {
  let component: EditMusicPage;
  let fixture: ComponentFixture<EditMusicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMusicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
