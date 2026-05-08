<?php

namespace App\Http\Controllers;

use App\Models\Ping;
use Illuminate\Http\Request;

class LivePingsController extends Controller
{
    public function __construct(private GamificationService $gamification) {}

    public function index(): JsonResponse
    {
        $vehicleId = request()->query('vehicle_id');
        $limit     = min((int) request()->query('limit', 20), 50); // cap at 50

        $pings = Ping::with(['vehicle', 'location', 'user:user_id,username'])
            ->when(<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>v</mi><mi>e</mi><mi>h</mi><mi>i</mi><mi>c</mi><mi>l</mi><mi>e</mi><mi>I</mi><mi>d</mi><mo separator="true">,</mo><mi>f</mi><mi>n</mi><mo stretchy="false">(</mo></mrow><annotation encoding="application/x-tex">vehicleId, fn(</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">e</span><span class="mord mathnormal">hi</span><span class="mord mathnormal">c</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.07847em;">I</span><span class="mord mathnormal">d</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mord mathnormal">n</span><span class="mopen">(</span></span></span></span>q) => <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>q</mi><mo>−</mo><mo>&gt;</mo><mi>w</mi><mi>h</mi><mi>e</mi><mi>r</mi><mi>e</mi><msup><mo stretchy="false">(</mo><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mi>v</mi><mi>e</mi><mi>h</mi><mi>i</mi><mi>c</mi><mi>l</mi><msub><mi>e</mi><mi>i</mi></msub><msup><mi>d</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo separator="true">,</mo></mrow><annotation encoding="application/x-tex">q-&gt;where(&#x27;vehicle_id&#x27;,</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7778em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">q</span><span class="mord">−</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1.0019em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">h</span><span class="mord mathnormal" style="margin-right:0.02778em;">er</span><span class="mord mathnormal">e</span><span class="mopen"><span class="mopen">(</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">e</span><span class="mord mathnormal">hi</span><span class="mord mathnormal">c</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathnormal">d</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mpunct">,</span></span></span></span>vehicleId))
            ->latest('timestamp')
            ->limit($limit)
            ->get();

        return response()->json(['success' => true, 'data' => $pings]);
    }

    public function store(StorePingRequest $request): JsonResponse
    {
        $ping = Ping::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);

        // Award points
        $this->gamification->awardPingPoints(auth()->user());

        // Update the user's last_ping_time for cooldown tracking
        auth()->user()->update(['last_ping_time' => now()]);

        return response()->json([
            'success' => true,
            'message' => 'Ping submitted successfully.',
            'data'    => $ping->load(['vehicle', 'location', 'user:user_id,username']),
        ], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>p</mi><mi>i</mi><mi>n</mi><mi>g</mi><mo>=</mo><mi>P</mi><mi>i</mi><mi>n</mi><mi>g</mi><mo>:</mo><mo>:</mo><mi>f</mi><mi>i</mi><mi>n</mi><mi>d</mi><mi>O</mi><mi>r</mi><mi>F</mi><mi>a</mi><mi>i</mi><mi>l</mi><mo stretchy="false">(</mo></mrow><annotation encoding="application/x-tex">ping = Ping::findOrFail(</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">p</span><span class="mord mathnormal">in</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8778em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mord mathnormal">in</span><span class="mord mathnormal" style="margin-right:0.03588em;">g</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">::</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mord mathnormal">in</span><span class="mord mathnormal">d</span><span class="mord mathnormal" style="margin-right:0.02778em;">O</span><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mord mathnormal">ai</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mopen">(</span></span></span></span>id);

        // Only owner or admin can delete
        if (auth()->id() !== $ping->user_id && auth()->user()->role !== 'admin') {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $ping->delete();

        return response()->json(['success' => true, 'message' => 'Ping removed.']);
    }
}
