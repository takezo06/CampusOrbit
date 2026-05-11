<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('live_pings', function (Blueprint $table) {
            $table->id('ping_id');
            $table->foreignId('vehicle_id')->constrained('vehicles', 'vehicle_id');
            $table->foreignId('location_id')->constrained('locations', 'location_id');
            $table->foreignId('destination_id')->nullable()->constrained('locations', 'location_id');
            $table->foreignId('user_id')->constrained('users', 'user_id');
            $table->enum('type', ['ikot', 'toda']);
            $table->string('note', 200)->nullable();
            $table->timestamp('timestamp')->useCurrent();
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_pings');
    }
};
