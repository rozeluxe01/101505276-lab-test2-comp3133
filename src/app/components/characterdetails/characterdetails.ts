import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  private selectedHouse = '';

  constructor(
    private service: CharacterService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.selectedHouse = this.route.snapshot.queryParamMap.get('house') ?? '';
    const selectedCharacter = this.service.selectedCharacter as Character | undefined;

    if (!routeId) {
      this.isLoading = false;
      this.navigateHome();
      return;
    }

    if (selectedCharacter && this.matchesCharacter(routeId, selectedCharacter)) {
      this.character = selectedCharacter;
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }

    this.service.getAllCharacters().subscribe({
      next: (characters) => {
        this.character = characters.find((character) =>
          this.matchesCharacter(routeId, character)
        );
        this.isLoading = false;
        this.cdr.detectChanges();

        if (!this.character) {
          this.navigateHome();
        }
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.navigateHome();
      }
    });
  }

  goBack() {
    this.navigateHome();
  }

  private matchesCharacter(routeId: string, character: Character): boolean {
    return routeId === (character.id || character.name);
  }

  private navigateHome() {
    const homeUrl = this.selectedHouse
      ? `/?house=${encodeURIComponent(this.selectedHouse)}`
      : '/';

    window.location.href = homeUrl;
  }
}
