<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    /**
     * Primary key for the News table.
     */
    protected $primaryKey = 'news_id';

    /**
     * Attributes that are mass assignable.
     */
    protected $fillable = ['title', 'content', 'author_id', 'is_pinned', 'category'];

    /**
     * Relationship: Each news post is written by a User (Admin).
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id', 'user_id');
    }
}