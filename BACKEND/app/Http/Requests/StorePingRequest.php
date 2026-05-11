<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Set to true so users can actually send pings
    }

    public function rules(): array
    {
        return [
            'vehicle_id'  => 'required|integer|exists:vehicles,vehicle_id',
            'location_id' => 'required|integer|exists:locations,location_id',
            'status'      => 'required|string|in:active,inactive',
            'note'        => 'nullable|string|max:255',
        ];
    }
}