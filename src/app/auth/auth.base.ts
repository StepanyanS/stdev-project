import { Message } from '../shared/models/message.model';

export abstract class AuthBase {
  message: Message;

  protected newMessage(message: string, type: string) {
    this.message = new Message(message, type);
  }

  protected showMessage(message: Message): void {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }
}
