import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from './services/http/api.service';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  subscription = new Subscription();
  subject = new Subject<any>();
  current_version: number;
  notification: any[] = [];

  constructor(
    private apiService: ApiService,
    public alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.apiService.getNotifications().subscribe(res => {
      console.log('notifications', res);
      this.notification = res;
      if (this.notification.length > 0) {
        App.getInfo().then(res => {
          console.log(res);
          this.current_version = parseFloat(res.version);
          const incoming_version = parseFloat(this.notification[0].value);
          if (this.current_version < incoming_version) {
            this.presentUpdateAlertCtrl(incoming_version);
          }
        });
      }
    }))
  }

  async presentUpdateAlertCtrl(message: any) {
    const alert = await this.alertController.create({
      header: `New Version Available! v${message}` ,
      subHeader: `changes: ${this.notification[0].descriptions}`,
      buttons: [
        {
          text: 'NOT NOW',
          cssClass: 'secondary',
          role: 'cancel',
          handler: () => {
            console.log('not now');
          }
        },
        {
          text: 'UPDATE',
          handler: () => {
            console.log('update');
            this.openBrowser(this.notification[0].url);
          }
        }
      ]
    });
    await alert.present();
  }

  openBrowser(url: any) {
    const open = Browser.open({url: url})
    console.log('browser open', open);
  }
}
