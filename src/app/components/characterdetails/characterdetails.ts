import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characterdetails.html',
  styleUrls: ['./characterdetails.css']
})
export class CharacterdetailsComponent {

  character: any;

  constructor(private service: CharacterService, private router: Router) {}

  ngOnInit() {
    this.character = this.service.selectedCharacter;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}