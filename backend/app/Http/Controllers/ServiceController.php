<?php
namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(Service::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|string',
            'duration' => 'required|integer',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'is_package' => 'boolean',
            'package_details' => 'nullable|array',
        ]);

        $service = Service::create($validated);
        return response()->json($service, 201);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string',
            'type' => 'string',
            'duration' => 'integer',
            'price' => 'numeric',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'is_package' => 'boolean',
            'package_details' => 'nullable|array',
        ]);

        $service->update($validated);
        return response()->json($service);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();
        return response()->json(null, 204);
    }
}
