<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceAppointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceAppointmentController extends Controller
{
    public function index()
    {
        $serviceAppointments = ServiceAppointment::with(['customer', 'listing' => function ($query) {
            $query->select('id', 'make_id', 'model_id')->with(['make:id,name', 'model:id,name']);
        }, 'assignedTo'])->latest()->paginate(15);

        return Inertia::render('admin/service-appointments/index', [
            'service_appointments' => $serviceAppointments,
        ]);
    }

    public function show($id)
    {
        $serviceAppointment = ServiceAppointment::with(['customer', 'listing' => function ($query) {
            $query->select('id', 'make_id', 'model_id')->with(['make:id,name', 'model:id,name']);
        }, 'assignedTo'])->findOrFail($id);

        return Inertia::render('admin/service-appointments/show', [
            'service_appointment' => $serviceAppointment,
        ]);
    }

    public function update(Request $request, $id)
    {
        $serviceAppointment = ServiceAppointment::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|max:255',
            'scheduled_date' => 'required|date',
            'scheduled_time' => 'nullable|string|max:255',
            'technician_notes' => 'nullable|string',
            'cost' => 'nullable|numeric|min:0',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $serviceAppointment->update($validated);

        return redirect()->back()->with('success', 'Service appointment updated successfully.');
    }

    public function destroy($id)
    {
        $serviceAppointment = ServiceAppointment::findOrFail($id);
        $serviceAppointment->delete();

        return redirect()->route('admin.service-appointments.index')
            ->with('success', 'Service appointment deleted successfully.');
    }
}
