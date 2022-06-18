import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-resin-timer',
  templateUrl: './resin-timer.page.html',
  styleUrls: ['./resin-timer.page.scss'],
})
export class ResinTimerPage implements OnInit {
  datetime: any;
  resin_value: number = 0;
  resin_time_to_full = new Date();
  resin_time_left: string = '';

  constructor(
    public toastController: ToastController
  ) { }

  ngOnInit() {
    LocalNotifications.requestPermissions().then(() => {
      console.log('Notification permissions granted');
    }).catch(err => {
      console.log('Notification permissions denied', err);
    })

    LocalNotifications.addListener('localNotificationReceived', (notification) => {
      console.log('Notification received:', notification);
    })
  }

  getResinValue(event) {
    this.resin_value = event.target.value;
    const resin_seconds_to_full = this.resin_value * 8 * 60;
    this.resin_time_to_full = new Date(Date.now() + 1000 * resin_seconds_to_full);
    const date = new Date(this.resin_time_to_full);
    this.resin_time_left = date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  async schedule() {
    const toast = await this.toastController.create({
      header: 'Resin Set',
      message: `Notification scheduled at ${this.resin_time_left}`,
      duration: 2000,
      position: 'top',
      color: 'success',
      animated: true,
      translucent: true,
    })
    toast.present();
    await LocalNotifications.schedule({
      notifications: [{
        id: 1,
        title: 'Resin Timer',
        body: 'Your timer is done!',
        iconColor: '#488AFF',
        schedule: {
          at: this.resin_time_to_full,
        }
      }]
    });
  }

}
