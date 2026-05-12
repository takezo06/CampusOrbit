<?php

namespace App\Filament\Resources\PassengerDemandResource\Pages;

use App\Filament\Resources\PassengerDemandResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPassengerDemand extends EditRecord
{
    protected static string $resource = PassengerDemandResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}