<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PingResource\Pages;
use App\Models\Location;
use App\Models\Ping;
use App\Models\Vehicle;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions;
use BackedEnum;

class PingResource extends Resource
{
    protected static ?string $model = Ping::class;

    protected static BackedEnum|string|null $navigationIcon = 'heroicon-o-signal';

    protected static ?int $navigationSort = 1;

    protected static ?string $label = 'Live Ping';

    protected static ?string $pluralLabel = 'Live Pings';

    public static function getNavigationGroup(): ?string
    {
        return 'Live Operations';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            \Filament\Schemas\Components\Section::make('Ping Details')->schema([
                \Filament\Forms\Components\Select::make('vehicle_id')
                    ->label('Vehicle')
                    ->options(Vehicle::all()->mapWithKeys(fn ($v) => [$v->vehicle_id => "{$v->plate_number} ({$v->vehicle_type})"]))
                    ->required()
                    ->searchable(),
                \Filament\Forms\Components\Select::make('user_id')
                    ->label('Reported By')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable(),
                \Filament\Forms\Components\Select::make('location_id')
                    ->label('Location (Spotted At)')
                    ->options(Location::pluck('location_name', 'location_id'))
                    ->required()
                    ->searchable(),
                
                

                \Filament\Forms\Components\Select::make('type')
                    ->options(['ikot' => 'Ikot', 'toda' => 'Toda'])
                    ->required(),

                

                \Filament\Forms\Components\Textarea::make('note')
                    ->nullable()
                    ->maxLength(200)
                    ->columnSpanFull(),
                \Filament\Forms\Components\DateTimePicker::make('timestamp')
                    ->required()
                    ->default(now()),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('ping_id')->label('ID')->sortable(),
                Tables\Columns\TextColumn::make('vehicle.plate_number')->label('Vehicle')->searchable(),
                Tables\Columns\TextColumn::make('user.name')->label('Reported By')->searchable(),
                Tables\Columns\TextColumn::make('location.location_name')->label('Spotted At')->searchable(),
                
                
                
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) { 
                        'ikot' => 'primary', 
                        'toda' => 'warning', 
                        default => 'gray' 
                    }),
                Tables\Columns\TextColumn::make('timestamp')->dateTime()->sortable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')->options(['ikot' => 'Ikot', 'toda' => 'Toda']),
                Tables\Filters\SelectFilter::make('vehicle_id')->label('Vehicle')->relationship('vehicle', 'plate_number'),
                Tables\Filters\SelectFilter::make('location_id')->label('Location')->relationship('location', 'location_name'),
            ])
            ->actions([
                \Filament\Actions\ViewAction::make(), 
                \Filament\Actions\DeleteAction::make()
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make()
                ])
            ])
            ->defaultSort('timestamp', 'desc');
    }

    public static function getRelations(): array { return []; }

    public static function getPages(): array
    {
        return ['index' => Pages\ListPings::route('/')];
    }
}