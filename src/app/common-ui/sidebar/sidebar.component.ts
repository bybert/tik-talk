import {Component} from '@angular/core'
import {SvgIconComponent} from '../svg-icon/svg-icon.component'
import {RouterLink} from '@angular/router'
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    RouterLink,
    SubscriberCardComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    {label: 'Моя страница', icon: 'home', link: 'home'},
    {label: 'Чаты', icon: 'chat', link: 'chat'},
    {label: 'Поиск', icon: 'search', link: 'search'}
  ]
}
