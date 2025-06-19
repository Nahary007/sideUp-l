<?php
namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    public function index()
    {
        try {
            $services = Service::orderBy('created_at', 'desc')->get();
            return response()->json($services);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des services: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la récupération des services',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'type' => 'required|string|in:coaching,sophrologie,massage,formule',
                'duration' => 'required|integer|min:1',
                'price' => 'required|numeric|min:0',
                'description' => 'nullable|string|max:1000',
                'is_active' => 'boolean',
                'is_package' => 'boolean',
                'package_details' => 'nullable|array',
                'package_details.sessions' => 'nullable|integer|min:1',
                'package_details.pricePerSession' => 'nullable|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            $validated = $validator->validated();

            // Vérifier si un service avec le même nom existe déjà
            $existingService = Service::where('name', $validated['name'])->first();
            if ($existingService) {
                return response()->json([
                    'message' => 'Un service avec ce nom existe déjà'
                ], 409);
            }

            // Créer le service
            $service = Service::create([
                'name' => $validated['name'],
                'type' => $validated['type'],
                'duration' => $validated['duration'],
                'price' => $validated['price'],
                'description' => $validated['description'] ?? '',
                'is_active' => $validated['is_active'] ?? true,
                'is_package' => $validated['is_package'] ?? false,
                'package_details' => $validated['package_details'] ?? null,
            ]);

            return response()->json($service, 201);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la création du service: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la création du service',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $service = Service::findOrFail($id);
            return response()->json($service);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Service non trouvé'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération du service: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la récupération du service',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $service = Service::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|string|max:255',
                'type' => 'sometimes|string|in:coaching,sophrologie,massage,formule',
                'duration' => 'sometimes|integer|min:1',
                'price' => 'sometimes|numeric|min:0',
                'description' => 'nullable|string|max:1000',
                'is_active' => 'sometimes|boolean',
                'is_package' => 'sometimes|boolean',
                'package_details' => 'nullable|array',
                'package_details.sessions' => 'nullable|integer|min:1',
                'package_details.pricePerSession' => 'nullable|numeric|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Données invalides',
                    'errors' => $validator->errors()
                ], 422);
            }

            $validated = $validator->validated();

            // Vérifier si un autre service avec le même nom existe déjà
            if (isset($validated['name'])) {
                $existingService = Service::where('name', $validated['name'])
                    ->where('id', '!=', $id)
                    ->first();
                if ($existingService) {
                    return response()->json([
                        'message' => 'Un autre service avec ce nom existe déjà'
                    ], 409);
                }
            }

            // Mettre à jour le service
            $service->update($validated);

            return response()->json($service);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Service non trouvé'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la mise à jour du service: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du service',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $service = Service::findOrFail($id);
            
            // Vérifier si le service est utilisé dans des réservations
            $reservationsCount = \App\Models\Reservation::where('service', $service->type)->count();
            if ($reservationsCount > 0) {
                return response()->json([
                    'message' => 'Impossible de supprimer ce service car il est utilisé dans des réservations'
                ], 409);
            }

            $service->delete();
            
            return response()->json([
                'message' => 'Service supprimé avec succès'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Service non trouvé'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression du service: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la suppression du service',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleStatus($id)
    {
        try {
            $service = Service::findOrFail($id);
            $service->is_active = !$service->is_active;
            $service->save();

            return response()->json([
                'message' => 'Statut du service mis à jour avec succès',
                'service' => $service
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Service non trouvé'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la mise à jour du statut: ' . $e->getMessage());
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du statut',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}