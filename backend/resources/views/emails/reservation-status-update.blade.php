<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mise à jour de votre réservation</title>
</head>
<body>
    <h2>Bonjour {{ $reservation->first_name }},</h2>

    @if($reservation->status === 'confirmed')
        <p><strong>Excellente nouvelle ! Votre réservation est confirmée.</strong></p>
        
        <h3>Détails de votre rendez-vous :</h3>
        <ul>
            <li><strong>Service :</strong> {{ $reservation->service }}</li>
            <li><strong>Date :</strong> {{ \Carbon\Carbon::parse($reservation->date)->format('d/m/Y') }}</li>
            <li><strong>Heure :</strong> {{ $reservation->time }}</li>
            <li><strong>Lieu :</strong> {{ $reservation->location }}</li>
            @if($reservation->duration)
                <li><strong>Durée :</strong> {{ $reservation->duration }}</li>
            @endif
        </ul>

        <p>Nous avons hâte de vous rencontrer !</p>
        
    @elseif($reservation->status === 'cancelled')
        <p><strong>Nous sommes désolés, mais votre réservation a dû être annulée.</strong></p>
        
        @if($reservation->admin_notes)
            <p><strong>Motif :</strong> {{ $reservation->admin_notes }}</p>
        @endif
        
        <p>N'hésitez pas à nous contacter pour reprogrammer votre séance à une autre date.</p>
        
    @else
        <p>Le statut de votre réservation a été mis à jour.</p>
        
        <h3>Détails de votre réservation :</h3>
        <ul>
            <li><strong>Service :</strong> {{ $reservation->service }}</li>
            <li><strong>Date :</strong> {{ \Carbon\Carbon::parse($reservation->date)->format('d/m/Y') }}</li>
            <li><strong>Heure :</strong> {{ $reservation->time }}</li>
            <li><strong>Statut :</strong> {{ ucfirst($reservation->status) }}</li>
        </ul>
    @endif

    @if($reservation->admin_notes && $reservation->status !== 'cancelled')
        <p><strong>Note :</strong> {{ $reservation->admin_notes }}</p>
    @endif

    <hr>
    <p>Pour toute question, n'hésitez pas à nous contacter :</p>
    <ul>
        <li>Téléphone : +33 1 23 45 67 89</li>
        <li>Email : contact@side-up.fr</li>
    </ul>

    <br>
    <p>— L'équipe Side-Up</p>
</body>
</html>