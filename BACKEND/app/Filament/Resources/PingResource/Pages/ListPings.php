<?php

namespace App\Filament\Resources\PingResource\Pages;

use App\Filament\Resources\PingResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPings extends ListRecords
{
    protected static string $resource = PingResource::class;

    protected function getHeaderActions(): array
    {
        return [
        
        ];
    }
}