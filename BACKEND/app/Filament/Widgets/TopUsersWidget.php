<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class TopUsersWidget extends BaseWidget
{
    protected static ?int $sort = 3;

    protected int | string | array $columnSpan = 'full';

    protected static ?string $heading = '🏆 Top Contributors Leaderboard';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                User::query()
                    ->where('role', '!=', 'admin')
                    ->withCount('pings')
                    ->orderByDesc('points')
                    ->orderByDesc('level')
                    ->limit(10)
            )
            ->columns([
                Tables\Columns\TextColumn::make('rank')
                    ->label('#')
                    ->state(static function (Tables\Columns\TextColumn $column, User $record): string {
                        $rowIndex = $column->getTable()->getRecords()->search(
                            fn ($r) => $r->getKey() === $record->getKey()
                        );
                        return match ((int) $rowIndex + 1) {
                            1 => '🥇',
                            2 => '🥈',
                            3 => '🥉',
                            default => '#' . ((int) $rowIndex + 1),
                        };
                    }),

                Tables\Columns\TextColumn::make('name')
                    ->label('User')
                    ->searchable()
                    ->sortable()
                    ->description(fn (User $record) => '@' . $record->username),

                Tables\Columns\BadgeColumn::make('role')
                    ->label('Role')
                    ->colors([
                        'warning' => 'passenger',
                        'success' => 'driver',
                    ]),

                Tables\Columns\TextColumn::make('level')
                    ->label('Level')
                    ->sortable()
                    ->formatStateUsing(fn (int $state) => "Lvl {$state}")
                    ->badge()
                    ->color('primary'),

                Tables\Columns\TextColumn::make('points')
                    ->label('Points')
                    ->numeric()
                    ->sortable()
                    ->formatStateUsing(fn (int $state) => number_format($state) . ' pts'),

                Tables\Columns\TextColumn::make('pings_count')
                    ->label('Total Pings')
                    ->numeric()
                    ->sortable()
                    ->formatStateUsing(fn (int $state) => number_format($state)),


                Tables\Columns\TextColumn::make('last_ping_time')
                    ->label('Last Active')
                    ->since()
                    ->sortable()
                    ->placeholder('Never') 
                    ->tooltip(fn (User $record) => 
                        $record->last_ping_time 
                            ? $record->last_ping_time->format('F d, Y H:i') 
                            : 'Never'
                    ),
                Tables\Columns\TextColumn::make('progress')
                    ->label('Progress to Next Level')
                    ->state(function (User $record): string {
                        $threshold    = (int) config('gamification.level_threshold', 100);
                        $pointsInLevel = $record->points % $threshold;
                        $percent       = round(($pointsInLevel / $threshold) * 100);
                        return "{$pointsInLevel}/{$threshold} ({$percent}%)";
                    }),
            ])
            ->defaultSort('points', 'desc')
            ->paginated(false)
            ->striped();
    }
}