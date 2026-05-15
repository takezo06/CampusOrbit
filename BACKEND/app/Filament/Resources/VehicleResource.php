<?php

namespace App\Filament\Resources;

use App\Filament\Resources\VehicleResource\Pages;
use App\Models\Vehicle;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Schemas\Schema;
use Filament\Actions; 
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput; 
use Filament\Forms\Components\Select;    
use Filament\Forms\Components\Toggle;    
use BackedEnum;

class VehicleResource extends Resource
{
    protected static ?string $model = Vehicle::class;

    protected static BackedEnum|string|null $navigationIcon = 'heroicon-o-truck';

    protected static ?int $navigationSort = 1;

    public static function getNavigationGroup(): ?string
    {
        return 'Fleet Management';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Vehicle Details')->schema([
                TextInput::make('plate_number')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(10)
                    ->label('Plate Number'),
                TextInput::make('body_number')
                    ->required()
                    ->maxLength(10)
                    ->label('Body Number'),
                Select::make('vehicle_type')
                    ->options(['ikot' => 'Ikot', 'toda' => 'Toda'])
                    ->required()
                    ->label('Vehicle Type'),
                Toggle::make('is_active')
                    ->label('Active')
                    ->default(true),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('vehicle_id')->label('ID')->sortable(),
                Tables\Columns\TextColumn::make('plate_number')->label('Plate Number')->searchable(),
                Tables\Columns\TextColumn::make('body_number')->label('Body Number')->searchable(),
                Tables\Columns\TextColumn::make('vehicle_type')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) { 
                        'ikot' => 'primary', 
                        'toda' => 'warning', 
                        default => 'gray' 
                    }),
                Tables\Columns\IconColumn::make('is_active')->label('Active')->boolean(),
                Tables\Columns\TextColumn::make('pings_count')->label('Total Pings')->counts('pings')->sortable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('vehicle_type')->options(['ikot' => 'Ikot', 'toda' => 'Toda']),
                Tables\Filters\TernaryFilter::make('is_active')->label('Active Status')->trueLabel('Active Only')->falseLabel('Inactive Only'),
            ])
            ->actions([
                Actions\EditAction::make(), 
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array { return []; }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListVehicles::route('/'),
            'create' => Pages\CreateVehicle::route('/create'),
            'edit'   => Pages\EditVehicle::route('/{record}/edit'),
        ];
    }
}