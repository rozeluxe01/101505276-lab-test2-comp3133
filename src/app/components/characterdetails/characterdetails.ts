import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characterdetails.html',
  styleUrls: ['./characterdetails.css']
})
export class CharacterdetailsComponent {

  character?: Character;
  isLoading = true;

  constructor(
    private service: CharacterService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const routeId = this.route.snapshot.paramMap.get('id');
    const selectedCharacter = this.service.selectedCharacter as Character | undefined;

    if (!routeId) {
      this.isLoading = false;
      this.router.navigate(['/']);
      return;
    }

    if (selectedCharacter && this.matchesCharacter(routeId, selectedCharacter)) {
      this.character = selectedCharacter;
      this.isLoading = false;
      return;
    }

    this.service.getAllCharacters().subscribe({
      next: (characters) => {
        this.character = characters.find((character) =>
          this.matchesCharacter(routeId, character)
        );
        this.isLoading = false;

        if (!this.character) {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    });
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
      return;
    }

    this.router.navigate(['/']);
  }

  private matchesCharacter(routeId: string, character: Character): boolean {
    return routeId === (character.id || character.name);
  }
}
