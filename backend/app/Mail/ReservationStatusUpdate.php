<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationStatusUpdate extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;

    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    public function build()
    {
        $subject = match($this->reservation->status) {
            'confirmed' => 'Votre réservation est confirmée',
            'cancelled' => 'Votre réservation a été annulée',
            default => 'Mise à jour de votre réservation'
        };

        return $this->subject($subject)
                    ->view('emails.reservation-status-update');
    }
}