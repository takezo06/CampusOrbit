<?php

namespace App\Http\Controllers;

use App\Models\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'login'    => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>u</mi><mi>s</mi><mi>e</mi><mi>r</mi><mo>=</mo><mi>U</mi><mi>s</mi><mi>e</mi><mi>r</mi><mo>:</mo><mo>:</mo><mi>w</mi><mi>h</mi><mi>e</mi><mi>r</mi><mi>e</mi><msup><mo stretchy="false">(</mo><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mi>e</mi><mi>m</mi><mi>a</mi><mi>i</mi><msup><mi>l</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo separator="true">,</mo></mrow><annotation encoding="application/x-tex">user = User::where(&#x27;email&#x27;,</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right:0.02778em;">ser</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.10903em;">U</span><span class="mord mathnormal" style="margin-right:0.02778em;">ser</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">::</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1.0019em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">h</span><span class="mord mathnormal" style="margin-right:0.02778em;">er</span><span class="mord mathnormal">e</span><span class="mopen"><span class="mopen">(</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mord mathnormal">e</span><span class="mord mathnormal">mai</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mpunct">,</span></span></span></span>request->login)
            ->orWhere('username', $request->login)
            ->first();

        if (! <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>u</mi><mi>s</mi><mi>e</mi><mi>r</mi><mi mathvariant="normal">∣</mi><mi mathvariant="normal">∣</mi><mo stretchy="false">!</mo><mi>H</mi><mi>a</mi><mi>s</mi><mi>h</mi><mo>:</mo><mo>:</mo><mi>c</mi><mi>h</mi><mi>e</mi><mi>c</mi><mi>k</mi><mo stretchy="false">(</mo></mrow><annotation encoding="application/x-tex">user || ! Hash::check(</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right:0.02778em;">ser</span><span class="mord">∣∣</span><span class="mclose">!</span><span class="mord mathnormal" style="margin-right:0.08125em;">H</span><span class="mord mathnormal">a</span><span class="mord mathnormal">s</span><span class="mord mathnormal">h</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">::</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">c</span><span class="mord mathnormal">h</span><span class="mord mathnormal">ec</span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="mopen">(</span></span></span></span>request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'The credentials you entered are incorrect.',
            ], 401);
        }

        // Update device IP on login
        <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>u</mi><mi>s</mi><mi>e</mi><mi>r</mi><mo>−</mo><mo>&gt;</mo><mi>u</mi><mi>p</mi><mi>d</mi><mi>a</mi><mi>t</mi><mi>e</mi><mo stretchy="false">(</mo><msup><mo stretchy="false">[</mo><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mi>d</mi><mi>e</mi><mi>v</mi><mi>i</mi><mi>c</mi><msub><mi>e</mi><mi>i</mi></msub><msup><mi>p</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo>=</mo><mo>&gt;</mo></mrow><annotation encoding="application/x-tex">user-&gt;update([&#x27;device_ip&#x27; =&gt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right:0.02778em;">ser</span><span class="mord">−</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1.0019em;vertical-align:-0.25em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal">p</span><span class="mord mathnormal">d</span><span class="mord mathnormal">a</span><span class="mord mathnormal">t</span><span class="mord mathnormal">e</span><span class="mopen">(</span><span class="mopen"><span class="mopen">[</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mord mathnormal">d</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">i</span><span class="mord mathnormal">c</span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord"><span class="mord mathnormal">p</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=&gt;</span></span></span></span>request->ip()]);

        <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>t</mi><mi>o</mi><mi>k</mi><mi>e</mi><mi>n</mi><mo>=</mo></mrow><annotation encoding="application/x-tex">token =</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">t</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span></span></span></span>user->createToken('orbit-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'data'    => ['token' => <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>t</mi><mi>o</mi><mi>k</mi><mi>e</mi><mi>n</mi><msup><mo separator="true">,</mo><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mi>u</mi><mi>s</mi><mi>e</mi><msup><mi>r</mi><mo mathvariant="normal" lspace="0em" rspace="0em">′</mo></msup><mo>=</mo><mo>&gt;</mo></mrow><annotation encoding="application/x-tex">token, &#x27;user&#x27; =&gt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.9463em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">t</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.03148em;">k</span><span class="mord mathnormal">e</span><span class="mord mathnormal">n</span><span class="mpunct"><span class="mpunct">,</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal">se</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7519em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">′</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=&gt;</span></span></span></span>user->makeHidden(['password'])],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['success' => true, 'message' => 'Logged out.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $request->user()]);
    }

    public function dashboard(Request $request): JsonResponse
    {
        <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>u</mi><mi>s</mi><mi>e</mi><mi>r</mi><mo>=</mo></mrow><annotation encoding="application/x-tex">user  =</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right:0.02778em;">ser</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span></span></span></span>request->user();
        $threshold = (int) config('gamification.level_threshold', 100);

        return response()->json([
            'success' => true,
            'data'    => [
                'user'           => $user,
                'level_progress' => [
                    'current'       => $user->points,
                    'next_level_at' => <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>u</mi><mi>s</mi><mi>e</mi><mi>r</mi><mo>−</mo><mo>&gt;</mo><mi>l</mi><mi>e</mi><mi>v</mi><mi>e</mi><mi>l</mi><mo>∗</mo></mrow><annotation encoding="application/x-tex">user-&gt;level *</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right:0.02778em;">ser</span><span class="mord">−</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord mathnormal">e</span><span class="mord mathnormal" style="margin-right:0.01968em;">l</span><span class="mord">∗</span></span></span></span>threshold,
                    'percentage'    => (<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>u</mi><mi>s</mi><mi>e</mi><mi>r</mi><mo>−</mo><mo>&gt;</mo><mi>p</mi><mi>o</mi><mi>i</mi><mi>n</mi><mi>t</mi><mi>s</mi></mrow><annotation encoding="application/x-tex">user-&gt;points %</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right:0.02778em;">ser</span><span class="mord">−</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">p</span><span class="mord mathnormal">o</span><span class="mord mathnormal">in</span><span class="mord mathnormal">t</span><span class="mord mathnormal">s</span></span></span></span>threshold) / $threshold * 100,
                ],
                'recent_pings' => $user->pings()->with('location', 'vehicle')->latest()->limit(10)->get(),
                'ping_count'   => $user->pings()->count(),
            ],
        ]);
    }

    public function stats(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => [
                'daily_passengers'    => 100,  // Replace with real query when data exists
                'active_locations'    => \App\Models\Location::count(),
                'active_vehicles'     => \App\Models\Vehicle::active()->count(),
                'registered_operators' => \App\Models\User::where('role', 'driver')->count(),
            ],
        ]);
    }
}
