import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-resin-timer',
  templateUrl: './resin-timer.page.html',
  styleUrls: ['./resin-timer.page.scss'],
})
export class ResinTimerPage implements OnInit {

  constructor() { }

  ngOnInit() {
    LocalNotifications.requestPermissions().then(() => {
      console.log('Notification permissions granted');
    }).catch(err => {
      console.log('Notification permissions denied', err);
    })

    LocalNotifications.addListener('localNotificationReceived', (notification) => {
      console.log('Notification received:', notification);
    })

    this.schedule();
  }

  async schedule() {
    const scheduled = await LocalNotifications.schedule({
      notifications: [{
        id: 1,
        title: 'Resin Timer',
        body: 'Your timer is done!',
        iconColor: '#488AFF',
        schedule: {
          at: new Date(Date.now() + 1000 * 10),
          repeats: true,
        }
      }]
    });
  }

}
