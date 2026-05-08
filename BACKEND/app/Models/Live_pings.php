<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Live_pings extends Model
{
    public function users(): BelongsTo{
        return $this->belongsTo(Users::class, 'foreign_key');
    }
    public function vehicles(): BelongsTo{
        return $this->belongsTo(Vehicles::class, 'foreign_key');
    }
    public function location(): BelongsTo{
        return $this->belongsTo(Locations::class, 'foreign_key');
    }
}
