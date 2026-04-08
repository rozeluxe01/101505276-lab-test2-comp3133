import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './characterfilter.html',
  styleUrls: ['./characterfilter.css']
})
export class CharacterfilterComponent {

  houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
  selectedHouse = '';
  characters: any[] = [];

  constructor(private service: CharacterService) {}

  onSelect() {
    this.service.getCharactersByHouse(this.selectedHouse)
      .subscribe(data => {
        this.characters = data;
      });
  }
}