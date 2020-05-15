import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Move } from '../../model/moves';
import { MoveService } from '../../service/move.service';

@Component({
  selector: 'app-move-detail',
  templateUrl: './move-detail.component.html',
  styleUrls: ['./move-detail.component.css']
})
export class MoveDetailComponent implements OnInit {
  @Input() move: Move;
  key: string;

  constructor(
    private moveService: MoveService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.key = params['key'];
      this.getMove(this.key);
    });
  }

  async getMove(key: string): Promise<void> {
    this.move = await this.moveService.getMoveFromKey(key);
  }


  goMove(id: number): void {
    this.router.navigate(['/move', id]);
  }
}
