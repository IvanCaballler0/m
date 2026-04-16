import { Injectable, signal } from '@angular/core';
import { ChatMessage } from '@models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ChatSupportService {
  private messages = signal<ChatMessage[]>([]);
  private isOpen = signal<boolean>(false);

  // Respuestas predefinidas tipo MCP (Model Context Protocol)
  private responses: Record<string, string[]> = {
    'hola': ['¡Hola! ¿En qué puedo ayudarte hoy?', '¡Bienvenido a nuestra tienda!'],
    'precio': ['Nuestros precios son competitivos y ofrecemos garantía de satisfacción.', '¿Te gustaría saber el precio de algún producto en específico?'],
    'envio': ['Realizamos envíos a todo el país. El tiempo de entrega es de 3-5 días hábiles.', 'El envío es gratis para compras superiores a $500.'],
    'devolucion': ['Aceptamos devoluciones dentro de los 30 días posteriores a la compra.', 'Para devoluciones, contacta a nuestro servicio al cliente.'],
    'pago': ['Aceptamos tarjetas de crédito, débito y PayPal.', 'Todos los pagos son procesados de forma segura.'],
    'default': ['Gracias por tu mensaje. Un agente te atenderá pronto.', '¿Podrías proporcionarme más detalles sobre tu consulta?']
  };

  getMessages() {
    return this.messages();
  }

  getIsOpen() {
    return this.isOpen();
  }

  toggleChat(): void {
    this.isOpen.update(open => !open);
    if (!this.isOpen() && this.messages().length === 0) {
      this.addWelcomeMessage();
    }
  }

  closeChat(): void {
    this.isOpen.set(false);
  }

  openChat(): void {
    this.isOpen.set(true);
    if (this.messages().length === 0) {
      this.addWelcomeMessage();
    }
  }

  sendMessage(text: string): void {
    const userMessage: ChatMessage = {
      id: this.generateId(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.update(msgs => [...msgs, userMessage]);
    
    // Simular respuesta automática
    setTimeout(() => {
      this.generateResponse(text);
    }, 1000);
  }

  private generateResponse(userText: string): void {
    const lowerText = userText.toLowerCase();
    let responseText = this.responses['default'][0];

    for (const [key, responses] of Object.entries(this.responses)) {
      if (key !== 'default' && lowerText.includes(key)) {
        responseText = responses[Math.floor(Math.random() * responses.length)];
        break;
      }
    }

    const supportMessage: ChatMessage = {
      id: this.generateId(),
      text: responseText,
      sender: 'support',
      timestamp: new Date()
    };

    this.messages.update(msgs => [...msgs, supportMessage]);
  }

  private addWelcomeMessage(): void {
    const welcomeMessage: ChatMessage = {
      id: this.generateId(),
      text: '¡Hola! Bienvenido al soporte de Ecommerce Shop. ¿En qué puedo ayudarte?',
      sender: 'support',
      timestamp: new Date()
    };

    this.messages.update(msgs => [...msgs, welcomeMessage]);
  }

  clearMessages(): void {
    this.messages.set([]);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
