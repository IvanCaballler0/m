import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatSupportService } from '@core/services/chat-support.service';
import { ChatMessage } from '@models/product.model';

@Component({
  selector: 'app-chat-support',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chat-container">
      <!-- Botón flotante -->
      <button 
        class="chat-toggle-btn" 
        (click)="toggleChat()"
        *ngIf="!chatService.getIsOpen()">
        <span class="chat-icon">💬</span>
        <span class="chat-label">Soporte</span>
      </button>

      <!-- Ventana de chat -->
      <div class="chat-window" *ngIf="chatService.getIsOpen()">
        <div class="chat-header">
          <h3>Soporte al Cliente</h3>
          <button class="close-btn" (click)="closeChat()">×</button>
        </div>
        
        <div class="chat-messages" #messagesContainer>
          <div 
            *ngFor="let message of chatService.getMessages()" 
            class="message"
            [class.user-message]="message.sender === 'user'"
            [class.support-message]="message.sender === 'support'">
            <div class="message-content">
              <p>{{ message.text }}</p>
              <span class="message-time">{{ message.timestamp | date:'HH:mm' }}</span>
            </div>
          </div>
          
          <div *ngIf="isLoading" class="typing-indicator">
            <span>Escribiendo...</span>
          </div>
        </div>
        
        <div class="chat-input">
          <input 
            type="text" 
            [(ngModel)]="messageText"
            (keyup.enter)="sendMessage()"
            placeholder="Escribe tu mensaje..."
            [disabled]="isLoading"
          />
          <button (click)="sendMessage()" [disabled]="!messageText.trim() || isLoading">
            Enviar
          </button>
        </div>
        
        <div class="quick-questions">
          <p class="quick-title">Preguntas frecuentes:</p>
          <button (click)="sendQuickQuestion('¿Cuáles son los métodos de pago?')">Métodos de pago</button>
          <button (click)="sendQuickQuestion('¿Tiempo de envío?')">Tiempo de envío</button>
          <button (click)="sendQuickQuestion('¿Política de devoluciones?')">Devoluciones</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }

    .chat-toggle-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 25px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .chat-toggle-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    }

    .chat-icon {
      font-size: 20px;
    }

    .chat-label {
      font-weight: 600;
    }

    .chat-window {
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .chat-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-header h3 {
      margin: 0;
      font-size: 18px;
    }

    .close-btn {
      background: transparent;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .message {
      display: flex;
      max-width: 80%;
    }

    .user-message {
      align-self: flex-end;
    }

    .support-message {
      align-self: flex-start;
    }

    .message-content {
      padding: 12px 16px;
      border-radius: 12px;
      position: relative;
    }

    .user-message .message-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-bottom-right-radius: 4px;
    }

    .support-message .message-content {
      background: #f1f3f4;
      color: #333;
      border-bottom-left-radius: 4px;
    }

    .message-content p {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
    }

    .message-time {
      font-size: 11px;
      opacity: 0.7;
      margin-top: 4px;
      display: block;
    }

    .typing-indicator {
      align-self: flex-start;
      background: #f1f3f4;
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 14px;
      color: #666;
    }

    .chat-input {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid #e0e0e0;
    }

    .chat-input input {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid #ddd;
      border-radius: 20px;
      outline: none;
      font-size: 14px;
    }

    .chat-input input:focus {
      border-color: #667eea;
    }

    .chat-input button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }

    .chat-input button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .quick-questions {
      padding: 12px 16px;
      border-top: 1px solid #e0e0e0;
      background: #f9f9f9;
    }

    .quick-title {
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
    }

    .quick-questions button {
      display: inline-block;
      background: white;
      border: 1px solid #667eea;
      color: #667eea;
      padding: 6px 12px;
      border-radius: 15px;
      font-size: 12px;
      cursor: pointer;
      margin-right: 6px;
      margin-bottom: 6px;
      transition: all 0.3s ease;
    }

    .quick-questions button:hover {
      background: #667eea;
      color: white;
    }
  `]
})
export class ChatSupportComponent {
  chatService = inject(ChatSupportService);
  messageText = '';
  isLoading = false;

  toggleChat(): void {
    this.chatService.toggleChat();
  }

  closeChat(): void {
    this.chatService.closeChat();
  }

  sendMessage(): void {
    if (!this.messageText.trim()) return;
    
    this.isLoading = true;
    this.chatService.sendMessage(this.messageText);
    this.messageText = '';
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  sendQuickQuestion(question: string): void {
    this.messageText = question;
    this.sendMessage();
  }
}
