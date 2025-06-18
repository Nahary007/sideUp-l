<!DOCTYPE html>
<html>
<head>
    <title>Confirmation de réservation</title>
</head>
<body>
    <h1>Votre réservation est confirmée !</h1>
    <p>Merci, {{ $reservation->nom ?? 'Client' }}.</p>
</body>
</html>