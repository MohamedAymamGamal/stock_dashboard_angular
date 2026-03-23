import {Component, inject, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {Toast} from '../../../services/toast';
import {ConfirmDialogService} from '../../../services/confirm-dialog.service';



@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MenubarModule, TieredMenuModule, ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true,
})
export class Navbar implements OnInit {

  protected readonly  auth = inject(AuthService);
  private  readonly toast = inject(Toast);
  private readonly dialog = inject(ConfirmDialogService);
  mobileMenuOpen = false;
  items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Stocks',
      icon: 'pi pi-chart-line',
      items: [
        {
          label: 'All Stocks',
          icon: 'pi pi-list',
          routerLink: '/dashboard/stocks'
        },
        {
          label: 'Watchlist',
          icon: 'pi pi-star',
          routerLink: '/dashboard/watchlist'
        },
        {
          label: 'Portfolio',
          icon: 'pi pi-wallet',
          routerLink: '/dashboard/portfolio'
        }
      ]
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-bar',
      items: [
        {
          label: 'Market Overview',
          icon: 'pi pi-globe',
          routerLink: '/dashboard/analytics/market'
        },
        {
          label: 'Performance',
          icon: 'pi pi-chart-pie',
          routerLink: '/dashboard/analytics/performance'
        },
        {
          label: 'Reports',
          icon: 'pi pi-file-pdf',
          routerLink: '/dashboard/analytics/reports'
        }
      ]
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          routerLink: '/dashboard/settings/profile'
        },
        {
          label: 'Preferences',
          icon: 'pi pi-sliders-h',
          routerLink: '/dashboard/settings/preferences'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          routerLink: '/auth/logout'
        }
      ]
    }
  ];



  ngOnInit(): void {
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  logout() {
    this.dialog.open({
      title: "logout",
      message: "are you sure you want to logout?",
      accept: () => {
        this.auth.logout();
        setTimeout(() => {
          this.toast.info('Logout');
        }, 600);
      },
      type:        'warning',
      acceptLabel: 'logout',
      rejectLabel: 'Cancel',
    })

  }

}
