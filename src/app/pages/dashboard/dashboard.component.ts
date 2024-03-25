import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import { AuthService } from 'src/app/services/auth.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
} from 'ng-apexcharts';
import { ActivatedRoute, Router } from '@angular/router';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit{
  currentUser: any;
  
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel',
  };

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  telaAlgodonPrediccion: number[] =   [97, 253, 443, 518, 505, 222, 218, 440, 224, 437, 218, 206, 94, 504, 395, 428, 371, 475, 391, 286, 333];
  telaAlgodonConsumoReal: number[] =  [71, 278, 430, 510, 491, 244, 219, 450, 244, 443, 236, 233, 112, 491, 400, 424, 391, 470, 395, 282];
  telaSedaPrediccion: number[] =      [99, 116, 458, 522, 472, 498, 224, 117, 297, 284, 424, 410, 290, 173, 246, 187, 311, 272, 240, 404, 368];
  telaSedaConsumoReal: number[] =     [94, 92, 445, 510, 450, 493, 220, 85, 311, 279, 430, 420, 309, 167, 245, 170, 353, 280, 232, 397];
  telaLinoPrediccion: number[] =      [238, 302, 109, 182, 406, 164, 131, 355, 323, 242, 150, 414, 302, 111, 126, 236, 500, 420, 445, 236, 280];
  telaLinoConsumoReal: number[] =     [214, 301, 65, 176, 395, 152, 118, 371, 333, 248, 137, 410, 330, 79, 116, 217, 504, 427, 440, 268];
  telaEncajePrediccion: number[] =    [328, 469, 141, 143, 365, 290, 206, 239, 192, 494, 119, 167, 355, 121, 172, 386, 108, 143, 378, 411, 137];
  telaEncajeConsumoReal: number[] =   [333, 458, 159, 143, 386, 303, 216, 242, 222, 496, 140, 168, 391, 118, 167, 397, 98, 152, 389, 423];

  series: any[] = [
    {
      name: 'Predicción de consumo de tela de algodón',
      data: this.telaAlgodonPrediccion,
    },
    {
      name: 'Consumo de tela de algodón real',
      data: this.telaAlgodonConsumoReal,
    },
  ];
  selectedData: string = 'Tela de algodón';

  constructor(private authService: AuthService, private route: ActivatedRoute,
    private router: Router) {

    this.chartOptions = {
      series: this.series,
      chart: {
        height: 500,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#FFC000', '#2F75B5'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        dashArray: [8, 0]
      },
      title: {
        text: 'Histórico vs Predicción',
        align: 'center',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ['Julio - 2022', 'Agosto - 2022', 'Septiembre - 2022', 'Octubre - 2022', 'Noviembre - 2022', 'Diciembre - 2022', 'Enero - 2023', 'Febrero - 2023', 'Marzo - 2023', 'Abril - 2023', 'Mayo - 2023', 'Junio - 2023', 'Julio - 2023', 'Agosto - 2023', 'Septiembre - 2023', 'Octubre - 2023', 'Noviembre - 2023', 'Diciembre - 2023', 'Enero - 2024', 'Febrero - 2024', 'Marzo - 2024'],
        title: {
          text: 'FECHA',
        },
      },
      yaxis: {
        title: {
          text: 'CONSUMO',
        },
        min: 5,
        max: 550,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };
  }
  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  updateChart(): void {
    switch (this.selectedData) {
      case 'Tela de algodón':
        this.series = [
          {
            name: 'Predicción de consumo de tela de algodón',
            data: this.telaAlgodonPrediccion,
          },
          {
            name: 'Consumo de tela de algodón real',
            data: this.telaAlgodonConsumoReal,
          },
        ];
        break;
      case 'Tela de seda':
        this.series = [
          {
            name: 'Predicción de consumo de tela de seda',
            data: this.telaSedaPrediccion,
          },
          {
            name: 'Consumo de tela de seda real',
            data: this.telaSedaConsumoReal,
          },
        ];
        break;
      case 'Tela de lino':
        this.series = [
          {
            name: 'Predicción de consumo de tela de lino',
            data: this.telaLinoPrediccion,
          },
          {
            name: 'Consumo de tela de lino real',
            data: this.telaLinoConsumoReal,
          },
        ];
        break;
      case 'Tela de encaje':
        this.series = [
          {
            name: 'Predicción de consumo de tela de encaje',
            data: this.telaEncajePrediccion,
          },
          {
            name: 'Consumo de tela de encaje real',
            data: this.telaEncajeConsumoReal,
          },
        ];
        break;
      default:
        break;
      }
      this.chartOptions.series = this.series;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
