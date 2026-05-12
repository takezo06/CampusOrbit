<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LocationResource\Pages;
use App\Models\Location;
use Filament\Forms;
use Filament\Actions;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use BackedEnum;

class LocationResource extends Resource
{
    protected static ?string $model = Location::class;

    protected static BackedEnum|string|null $navigationIcon = 'heroicon-o-map-pin';

    protected static ?int $navigationSort = 2;

    public static function getNavigationGroup(): ?string
    {
        return 'Fleet Management';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            // Layout components like Section use the Schemas namespace
            \Filament\Schemas\Components\Section::make('Location Details')->schema([
                // Form input components use the Forms namespace
                \Filament\Forms\Components\TextInput::make('location_name')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(100)
                    ->label('Location Name'),
                \Filament\Forms\Components\Textarea::make('description')
                    ->nullable()
                    ->rows(3)
                    ->columnSpanFull(),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('location_id')->label('ID')->sortable(),
                Tables\Columns\TextColumn::make('location_name')->label('Location Name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('description')->limit(50)->toggleable(),
                Tables\Columns\TextColumn::make('pings_count')->label('Total Pings')->counts('pings')->sortable(),
                Tables\Columns\TextColumn::make('demands_count')->label('Demand Records')->counts('demands')->sortable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([])
            ->actions([
                \Filament\Actions\EditAction::make(), 
                \Filament\Actions\DeleteAction::make()
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('location_name');
    }

    public static function getRelations(): array { return []; }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListLocations::route('/'),
            'create' => Pages\CreateLocation::route('/create'),
            'edit'   => Pages\EditLocation::route('/{record}/edit'),
        ];
    }
}