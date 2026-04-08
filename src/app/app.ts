import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true, // ✅ ensure this is here
  imports: [RouterOutlet, RouterModule], // 🔥 ADD RouterModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('101505276-lab-test2-comp3133');
}