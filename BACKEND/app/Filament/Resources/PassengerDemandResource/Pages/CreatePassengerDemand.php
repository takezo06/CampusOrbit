<?php

namespace App\Filament\Resources\PassengerDemandResource\Pages;

use App\Filament\Resources\PassengerDemandResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePassengerDemand extends CreateRecord
{
    protected static string $resource = PassengerDemandResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}