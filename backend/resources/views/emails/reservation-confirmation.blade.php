<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation de réservation</title>
</head>
<body>
    <h2>Bonjour {{ $reservation['firstName'] }},</h2>

    <p>Nous avons bien reçu votre demande de réservation pour le <strong>{{ $reservation['date'] }}</strong> à <strong>{{ $reservation['time'] }}</strong>.</p>

    <p><strong>Votre réservation est actuellement en attente.</strong></p>

    <p>Vous recevrez une confirmation ou un refus sous 24 heures maximum.</p>

    <p>Merci pour votre confiance.</p>

    <br>
    <p>— L’équipe</p>
</body>
</html>
