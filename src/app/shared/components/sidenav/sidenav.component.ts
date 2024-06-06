import { Component, OnInit } from '@angular/core';
import { Link, Links } from '../../models/links.model';
import { Observable } from 'rxjs';
import { LinkService } from '../../services/link/link.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  links!: Observable<Link[]>;

  constructor(
    private linkService: LinkService
  ) {}

  ngOnInit(): void {
    this.getLinkAdmin();
  }

  getLinkAdmin(): void {
    this.links = this.linkService.getLinks().pipe(
      map((res: Links) => res.linksAdmin )
    );
  }
}
