import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ChatSupportComponent } from '@shared/components/chat/chat-support.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ChatSupportComponent],
  template: `
    <div class="app-container">
      <app-header />
      <main class="main-content">
        <router-outlet />
      </main>
      <app-chat-support />
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      padding: 20px;
    }
  `]
})
export class AppComponent {}
