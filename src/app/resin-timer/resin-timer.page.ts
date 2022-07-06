import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-resin-timer',
  templateUrl: './resin-timer.page.html',
  styleUrls: ['./resin-timer.page.scss'],
})
export class ResinTimerPage implements OnInit {
  datetime: any;
  resin_value: number = 0;
  resin_formula: number = 0;
  resin_time_to_full = new Date();
  resin_time_left: string = '';
  isContentLoaded: boolean = false;

  constructor(
    public toastController: ToastController
  ) { }

  ngOnInit() {
    Storage.get({ key: 'resin_time_left' }).then(res => {
      this.resin_time_left = res.value;
    });

    Storage.get({ key: 'resin_value' }).then(res => {
      this.resin_value = parseInt(res.value);
    });

    LocalNotifications.requestPermissions().then(() => {
      console.log('Notification permissions granted');
    }).catch(err => {
      console.log('Notification permissions denied', err);
    })

    LocalNotifications.addListener('localNotificationReceived', (notification) => {
      console.log('Notification received:', notification);
    })
  }

  ionViewDidEnter() {
    this.isContentLoaded = true;
  }

  async resetResin() {
    if (this.resin_time_left) {
      await Storage.remove({ key: 'resin_time_left' });
      await Storage.remove({ key: 'resin_value' });
      this.resin_value = 0;
      this.resin_time_left = '';
    }
  }

  getResinValue(event) {
    Storage.set({
      key: 'resin_value',
      value: this.resin_value.toString()
    })
    this.resin_value = event.target.value;
    this.resin_formula = (160 - this.resin_value) * 8 * 60;
    this.resin_time_to_full = new Date(Date.now() + 1000 * this.resin_formula);
    const date = new Date(this.resin_time_to_full);
    this.resin_time_left = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  }

  reduceResinValue() {
    this.resin_value -= 1;
  }

  addResinValue() {
    this.resin_value += 1;
  }

  async schedule() {
    await Storage.set({
      key: 'resin_time_left',
      value: this.resin_time_left
    })
    const toast = await this.toastController.create({
      header: 'Timer Set',
      message: `Scheduled at ${this.resin_time_left}`,
      duration: 2000,
      position: 'top',
      color: 'success',
      animated: true,
      translucent: true,
    })
    toast.present();

    await LocalNotifications.createChannel({
      id: 'resin_timer',
      name: 'Resin Timer',
      description: 'Resin Timer',
      importance: 5,
      visibility: 1,
      vibration: true,
      lights: true,
      sound: 'zhongli.wav',
    }).then(() => {
      LocalNotifications.schedule({
        notifications: [{
          id: 1,
          channelId: 'resin_timer',
          title: 'Resin Timer',
          body: 'Your resin fully replanished!',
          iconColor: '#488AFF',
          schedule: {
            at: this.resin_time_to_full,
            allowWhileIdle: true
          },
          sound: 'zhongli.wav',
        }]
      });
    });
  }

}
