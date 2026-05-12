<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentPingsWidget extends BaseWidget
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
                // FIX: The previous rank column tried to call getRecords() on the column
                // at render time, which is not available. Use a simple state closure
                // with a static counter instead.
                Tables\Columns\TextColumn::make('rank')
                    ->label('#')
                    ->state(function (User $record, Tables\Columns\TextColumn $column): string {
                        static $counter = 0;
                        $counter++;
                        return match ($counter) {
                            1       => '🥇',
                            2       => '🥈',
                            3       => '🥉',
                            default => "#{$counter}",
                        };
                    }),

                Tables\Columns\TextColumn::make('name')
                    ->label('User')
                    ->searchable()
                    ->sortable()
                    ->description(fn (User $record): string => '@' . $record->username),

                // FIX: BadgeColumn removed in Filament v3+. Use TextColumn->badge().
                Tables\Columns\TextColumn::make('role')
                    ->label('Role')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'passenger' => 'warning',
                        'driver'    => 'success',
                        default     => 'gray',
                    }),

                Tables\Columns\TextColumn::make('level')
                    ->label('Level')
                    ->badge()
                    ->color('primary')
                    ->formatStateUsing(fn (int $state): string => "Lvl {$state}"),

                Tables\Columns\TextColumn::make('points')
                    ->label('Points')
                    ->numeric()
                    ->sortable()
                    ->formatStateUsing(fn (int $state): string => number_format($state) . ' pts'),

                Tables\Columns\TextColumn::make('pings_count')
                    ->label('Total Pings')
                    ->numeric()
                    ->sortable()
                    ->formatStateUsing(fn (int $state): string => number_format($state)),

                // app/Filament/Widgets/RecentPingsWidget.php

                Tables\Columns\TextColumn::make('last_ping_time')
                    ->label('Last Active')
                    ->since()
                    ->sortable()
                    ->placeholder('Never') 
                    ->tooltip(fn (User $record): string => 
                        $record->last_ping_time 
                            ? $record->last_ping_time->format('M d, Y H:i') 
                            : 'No activity recorded'
                    ),
                Tables\Columns\TextColumn::make('progress')
                    ->label('Next Level Progress')
                    ->state(function (User $record): string {
                        $threshold     = (int) config('gamification.level_threshold', 100);
                        $pointsInLevel = $record->points % $threshold;
                        $percent       = round(($pointsInLevel / $threshold) * 100);
                        return "{$pointsInLevel} / {$threshold} ({$percent}%)";
                    }),
            ])
            ->defaultSort('points', 'desc')
            ->paginated(false)
            ->striped();
    }
}