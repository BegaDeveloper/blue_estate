import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnChanges {
  isInViewComp: boolean = false;
  forLogout: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  about() {
    this.router.navigate(['/main/about']);
  }

  listView() {
    this.router.navigate(['/main/how-to']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
