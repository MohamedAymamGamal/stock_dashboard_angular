import {Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {User} from '../../../services/user';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MenubarModule, TieredMenuModule, ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true,
})
export class Navbar implements OnInit {

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
  username:string = '';
  constructor(private user:User) {}
  ngOnInit(): void {
      this.getUserName()
  }


  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  getUserName(){
    this.user.UserName.subscribe((next)=>{
      this.username = next;
    })
  }

}
