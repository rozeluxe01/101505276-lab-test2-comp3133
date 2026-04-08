import { ChangeDetectorRef, Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private service: CharacterService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const house = params.get('house') ?? '';
      this.selectedHouse = house;
      this.loadCharacters(house);
    });
  }

  viewDetails(character: Character) {
    this.service.selectedCharacter = character;
    this.router.navigate(['/details', this.getCharacterRouteId(character)], {
      queryParams: this.selectedHouse ? { house: this.selectedHouse } : {}
    });
  }
  
  onFilter() {
    this.router.navigate(['/'], {
      queryParams: this.selectedHouse ? { house: this.selectedHouse } : {}
    });
  }

  private getCharacterRouteId(character: Character): string {
    return character.id || character.name;
  }

  private loadCharacters(house: string) {
    const request = house
      ? this.service.getCharactersByHouse(house)
      : this.service.getAllCharacters();

    request.subscribe((data) => {
      this.characters = data;
      this.cdr.detectChanges();
    });
  }
}
