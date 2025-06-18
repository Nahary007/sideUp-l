@component('mail::message')
# Votre réservation est confirmée !

Bonjour {{ $reservation->clientName }},

Votre réservation pour le service **{{ ucfirst($reservation->service) }}** le **{{ $reservation->date }} à {{ $reservation->time }}** a été annulé.

Merci pour votre confiance.

@endcomponent
