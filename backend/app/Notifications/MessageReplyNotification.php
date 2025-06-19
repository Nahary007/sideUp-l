<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class MessageReplyNotification extends Notification
{
    use Queueable;

    protected string $reply;

    public function __construct(string $reply)
    {
        $this->reply = $reply;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Réponse à votre message')
            ->greeting('Bonjour,')
            ->line('Vous avez reçu une réponse à votre message envoyé sur notre site.')
            ->line('Réponse :')
            ->line($this->reply)
            ->salutation('Cordialement, l\'équipe');
    }
}
