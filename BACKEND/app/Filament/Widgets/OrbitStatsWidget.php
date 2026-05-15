<?php

namespace App\Filament\Widgets;

use App\Models\Ping;
use App\Models\User;
use App\Models\Vehicle;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class OrbitStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $todayPings     = Ping::whereDate('timestamp', today())->count();
        $yesterdayPings = Ping::whereDate('timestamp', today()->subDay())->count();

        $pingTrend = $yesterdayPings > 0
            ? round((($todayPings - $yesterdayPings) / $yesterdayPings) * 100, 1)
            : ($todayPings > 0 ? 100 : 0);

        
        $chartData = collect(range(6, 0))
            ->map(fn (int $daysAgo) => Ping::whereDate('timestamp', today()->subDays($daysAgo))->count())
            ->toArray();

        $activeVehicles = Vehicle::active()->count();
        $totalVehicles  = Vehicle::count();

        $totalUsers  = User::where('role', '!=', 'admin')->count();
        $activeUsers = User::where('role', '!=', 'admin')
            ->whereNotNull('last_ping_time')
            ->where('last_ping_time', '>=', now()->subDays(7))
            ->count();

        $totalPings = Ping::count();
        $ikotToday  = Ping::whereDate('timestamp', today())->where('type', 'ikot')->count();
        $todaToday  = Ping::whereDate('timestamp', today())->where('type', 'toda')->count();

        return [
            Stat::make('Total Pings Today', number_format($todayPings))
                ->description(
                    $pingTrend >= 0
                        ? "{$pingTrend}% up from yesterday"
                        : abs($pingTrend) . '% down from yesterday'
                )
                ->descriptionIcon(
                    $pingTrend >= 0
                        ? 'heroicon-m-arrow-trending-up'
                        : 'heroicon-m-arrow-trending-down'
                )
                ->color($pingTrend >= 0 ? 'success' : 'danger')
                ->chart($chartData),

            Stat::make('Active Vehicles', "{$activeVehicles} / {$totalVehicles}")
                ->description('Vehicles currently marked as active')
                ->descriptionIcon('heroicon-m-truck')
                ->color('primary'),

            Stat::make('Registered Users', number_format($totalUsers))
                ->description("{$activeUsers} active in the last 7 days")
                ->descriptionIcon('heroicon-m-users')
                ->color('warning'),

            Stat::make('All-Time Pings', number_format($totalPings))
                ->description("Today — Ikot: {$ikotToday} · Toda: {$todaToday}")
                ->descriptionIcon('heroicon-m-signal')
                ->color('info'),
        ];
    }
}