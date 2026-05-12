<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PassengerDemandResource\Pages;
use App\Models\Location;
use App\Models\PassengerDemand;
use Filament\Forms;
use Filament\Actions;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use BackedEnum;

class PassengerDemandResource extends Resource
{
    protected static ?string $model = PassengerDemand::class;

    protected static BackedEnum|string|null $navigationIcon = 'heroicon-o-user-group';

    protected static ?int $navigationSort = 2;

    protected static ?string $label = 'Passenger Demand';

    protected static ?string $pluralLabel = 'Passenger Demands';

    public static function getNavigationGroup(): ?string
    {
        return 'Live Operations';
    }

public static function form(Schema $schema): Schema
{
    return $schema->components([
        \Filament\Schemas\Components\Section::make('Demand Details')->schema([
            \Filament\Schemas\Components\Select::make('location_id')
                ->label('Location')
                ->options(Location::pluck('location_name', 'location_id'))
                ->required()
                ->searchable()
                ->preload(),
            \Filament\Schemas\Components\TextInput::make('passenger_count')
                ->label('Passenger Count')
                ->numeric()
                ->required()
                ->default(1)
                ->minValue(1)
                ->maxValue(9999),
        ])->columns(2),
    ]);
}

public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\TextColumn::make('demand_id')->label('ID')->sortable(),
            Tables\Columns\TextColumn::make('location.location_name')->label('Location')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('passenger_count')->label('Passengers Waiting')->numeric()->sortable()->badge()->color(fn (int $state): string => match (true) { $state >= 20 => 'danger', $state >= 10 => 'warning', default => 'success' }),
            Tables\Columns\TextColumn::make('created_at')->label('Recorded At')->dateTime('M d, Y H:i')->sortable(),
            Tables\Columns\TextColumn::make('updated_at')->label('Last Updated')->since()->sortable()->toggleable(isToggledHiddenByDefault: true),
        ])
        ->filters([
            Tables\Filters\SelectFilter::make('location_id')->label('Location')->options(Location::pluck('location_name', 'location_id'))->searchable()
        ])
        ->actions([
            \Filament\Actions\EditAction::make(), 
            \Filament\Actions\DeleteAction::make()
        ])
        ->bulkActions([
            \Filament\Actions\BulkActionGroup::make([
                \Filament\Actions\DeleteBulkAction::make(),
            ]),
        ])
        ->defaultSort('created_at', 'desc');
}

    public static function getRelations(): array { return []; }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListPassengerDemands::route('/'),
            'create' => Pages\CreatePassengerDemand::route('/create'),
            'edit'   => Pages\EditPassengerDemand::route('/{record}/edit'),
        ];
    }
}
