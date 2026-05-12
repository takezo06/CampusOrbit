<?php

namespace App\Filament\Resources\PassengerDemandResource\Pages;

use App\Filament\Resources\PassengerDemandResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPassengerDemands extends ListRecords
{
    protected static string $resource = PassengerDemandResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}