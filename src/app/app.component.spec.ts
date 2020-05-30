import {TestBed, async, fakeAsync} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterStateSnapshot} from '@angular/router';

describe('AppComponent', () => {
  // tslint:disable-next-line:prefer-const
  let state: RouterStateSnapshot;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    router = TestBed.get(Router);
    router.initialNavigation();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('navigate to "" redirects you to /home', () => {
    router.navigate(['']).then(() => {
      expect(state.url).toBe('/home');
    });
  });

  it('navigate to "search" takes you to /search', () => {
    router.navigate(['/animals']).then(() => {
      expect(state.url).toBe('/animals');
    });
  });

  it('navigate to "search" takes you to /search', () => {
    router.navigate(['/manage-zoo']).then(() => {
      expect(state.url).toBe('/manage-zoo');
    });
  });
});
