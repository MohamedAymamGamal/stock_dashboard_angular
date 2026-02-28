import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Button, ButtonDirective} from "primeng/button";
import {Router, RouterOutlet} from "@angular/router";
import {Step, StepList, StepPanel, StepPanels, Stepper} from "primeng/stepper";

@Component({
  selector: 'app-welcome',
    imports: [
        CommonModule,
        Button,
        RouterOutlet,
        Step,
        StepList,
        StepPanel,
        StepPanels,
        Stepper

    ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  activeStep: number = 1;

  // Dashboard features
  dashboardFeatures = [
    {
      value: '24/7',
      label: 'Market Access',
      bgColor: 'bg-blue-50',
      valueColor: 'text-blue-600'
    },
    {
      value: 'Live',
      label: 'Price Updates',
      bgColor: 'bg-green-50',
      valueColor: 'text-green-600'
    },
    {
      value: '100+',
      label: 'Markets',
      bgColor: 'bg-purple-50',
      valueColor: 'text-purple-600'
    }
  ];

  // Portfolio features
  portfolioFeatures = [
    {
      icon: 'pi pi-check-circle',
      iconColor: 'text-green-500',
      bgColor: 'bg-gray-200',
      textColor: 'text-gray-600',
      name: 'Automated portfolio rebalancing'
    },
    {
      icon: 'pi pi-check-circle',
      iconColor: 'text-green-500',
      bgColor: 'bg-gray-200',
      textColor: 'text-gray-800',
      name: 'Risk assessment tools'
    },
    {
      icon: 'pi pi-check-circle',
      iconColor: 'text-green-500',
      bgColor: 'bg-gray-200',
      textColor: 'text-gray-800',
      name: 'Performance tracking'
    },
    {
      icon: 'pi pi-check-circle',
      iconColor: 'text-green-500',
      bgColor: 'bg-gray-200',
      textColor: 'text-gray-800',
      name: 'Diversification analysis'
    }
  ];

  // Analytics features
  analyticsFeatures = [
    {
      icon: '🤖',
      title: 'AI Predictions',
      description: 'Machine learning models for market forecasting'
    },
    {
      icon: '📉',
      title: 'Risk Analysis',
      description: 'Comprehensive risk assessment and mitigation'
    },
    {
      icon: '📊',
      title: 'Custom Reports',
      description: 'Detailed reports tailored to your needs'
    },
    {
      icon: '🎯',
      title: 'Smart Alerts',
      description: 'Real-time notifications for important events'
    }
  ];

  // Trust indicators
  trustIndicators = [
    {
      icon: 'pi pi-shield',
      color: 'text-green-500',
      label: 'Secure'
    },
    {
      icon: 'pi pi-chart-line',
      color: 'text-blue-500',
      label: 'Real-time'
    },
    {
      icon: 'pi pi-mobile',
      color: 'text-purple-500',
      label: 'Mobile'
    }
  ];

  constructor(private router: Router) {}

  onStepChange(step: number) {
    this.activeStep = step;
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
