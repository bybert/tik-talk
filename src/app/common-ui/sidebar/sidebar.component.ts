import {Component, inject} from '@angular/core'
import {SvgIconComponent} from '../svg-icon/svg-icon.component'
import {RouterLink} from '@angular/router'
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component'
import {ProfileService} from '../../data/services/profile.service'
import {AsyncPipe, JsonPipe} from '@angular/common'
import {firstValueFrom} from 'rxjs'
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    SubscriberCardComponent,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortlist()

  me = this.profileService.me

  menuItems = [
    {label: 'Моя страница', icon: 'home', link: 'home'},
    {label: 'Чаты', icon: 'chat', link: 'chat'},
    {label: 'Поиск', icon: 'search', link: 'search'}
  ]

  ngOnInit() {
    firstValueFrom(
      this.profileService.getMe()
    )
  }
}
