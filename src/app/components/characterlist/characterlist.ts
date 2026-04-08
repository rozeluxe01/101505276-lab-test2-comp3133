import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './characterlist.html',
  styleUrls: ['./characterlist.css']
})
export class CharacterlistComponent {

  characters: Character[] = [];
  houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];
  selectedHouse = '';

  constructor(private service: CharacterService, private router: Router) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.service.getAllCharacters().subscribe(data => {
      this.characters = data;
    });
  }

  viewDetails(character: Character) {
    this.service.selectedCharacter = character;
    this.router.navigate(['/details', this.getCharacterRouteId(character)]);
  }
  
  onFilter() {
    if (this.selectedHouse === '') {
      this.loadAll();
    } else {
      this.service.getCharactersByHouse(this.selectedHouse)
        .subscribe(data => {
          this.characters = data;
        });
    }
  }

  private getCharacterRouteId(character: Character): string {
    return character.id || character.name;
  }
}
