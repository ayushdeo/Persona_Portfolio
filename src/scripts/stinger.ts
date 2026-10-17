// Original acid-jazz stinger for the intro, synthesized with Web Audio.
// No samples: drums, bass and brass-style stabs are built from oscillators
// and noise. Locked to the intro timeline: BEAT = 0.45s, final hit on beat 7.

const BEAT = 0.45;

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

function noiseBuffer(ctx: AudioContext, seconds: number) {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
}

// Cheap room: decaying stereo noise as a convolution impulse
function impulse(ctx: AudioContext, seconds: number) {
    const len = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
        const d = buf.getChannelData(c);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    return buf;
}

export function playStinger(ctx: AudioContext, letterTimes: number[]) {
    const t0 = ctx.currentTime + 0.03;
    const at = (beat: number) => t0 + beat * BEAT;

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 8;
    comp.attack.value = 0.002;
    const master = ctx.createGain();
    master.gain.value = 0.42;
    master.connect(comp).connect(ctx.destination);

    const verb = ctx.createConvolver();
    verb.buffer = impulse(ctx, 1.8);
    const verbOut = ctx.createGain();
    verbOut.gain.value = 0.3;
    verb.connect(verbOut).connect(master);

    const send = (node: AudioNode, wet = 0) => {
        node.connect(master);
        if (wet > 0) {
            const g = ctx.createGain();
            g.gain.value = wet;
            node.connect(g).connect(verb);
        }
    };

    const noise = noiseBuffer(ctx, 2);

    const kick = (t: number, level = 1) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.frequency.setValueAtTime(150, t);
        o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
        g.gain.setValueAtTime(level, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        o.connect(g);
        send(g);
        o.start(t);
        o.stop(t + 0.4);
    };

    const hiss = (
        t: number,
        { dur = 0.1, type = "highpass" as BiquadFilterType, freq = 7000, q = 0.7, level = 0.3, wet = 0, loop = false } = {},
    ) => {
        const s = ctx.createBufferSource();
        s.buffer = noise;
        s.loop = loop;
        const f = ctx.createBiquadFilter();
        f.type = type;
        f.frequency.value = freq;
        f.Q.value = q;
        const g = ctx.createGain();
        g.gain.setValueAtTime(level, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        s.connect(f).connect(g);
        send(g, wet);
        s.start(t);
        s.stop(t + dur + 0.05);
        return { f, g };
    };

    const snare = (t: number, level = 0.5) => {
        hiss(t, { dur: 0.18, type: "bandpass", freq: 1800, q: 0.8, level, wet: 0.3 });
        const o = ctx.createOscillator();
        o.type = "triangle";
        const g = ctx.createGain();
        o.frequency.setValueAtTime(220, t);
        g.gain.setValueAtTime(level * 0.6, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        o.connect(g);
        send(g);
        o.start(t);
        o.stop(t + 0.12);
    };

    const hat = (t: number, level: number) => hiss(t, { dur: 0.05, freq: 8000, level });

    // Detuned-saw stab, filter-swept like a brass hit
    const stab = (t: number, notes: number[], { dur = 0.35, level = 0.15, cutoff = 3200, wet = 0.35 } = {}) => {
        const f = ctx.createBiquadFilter();
        f.type = "lowpass";
        f.Q.value = 2;
        f.frequency.setValueAtTime(cutoff, t);
        f.frequency.exponentialRampToValueAtTime(500, t + dur);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(level, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        f.connect(g);
        send(g, wet);
        for (const n of notes) {
            for (const detune of [-8, 8]) {
                const o = ctx.createOscillator();
                o.type = "sawtooth";
                o.frequency.value = midi(n);
                o.detune.value = detune;
                o.connect(f);
                o.start(t);
                o.stop(t + dur + 0.05);
            }
        }
    };

    const bass = (t: number, n: number, dur = 0.2, level = 0.28) => {
        const o = ctx.createOscillator();
        o.type = "square";
        o.frequency.value = midi(n);
        const f = ctx.createBiquadFilter();
        f.type = "lowpass";
        f.frequency.setValueAtTime(1500, t);
        f.frequency.exponentialRampToValueAtTime(220, t + dur);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(level, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        o.connect(f).connect(g);
        send(g);
        o.start(t);
        o.stop(t + dur + 0.05);
    };

    const riser = (t: number, dur: number) => {
        const { f, g } = hiss(t, { dur, type: "bandpass", freq: 400, q: 3, level: 0.0001, wet: 0.2, loop: true });
        f.frequency.setValueAtTime(400, t);
        f.frequency.exponentialRampToValueAtTime(7000, t + dur);
        g.gain.cancelScheduledValues(t);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.22, t + dur);
    };

    // ---- beat 0: the slam
    kick(at(0), 1.1);
    hiss(at(0), { dur: 1.0, freq: 5000, level: 0.22, wet: 0.5 });
    stab(at(0), [48, 51, 55, 58, 62], { dur: 0.6, level: 0.17 }); // Cm9

    // ---- groove
    [2, 4, 6].forEach((b) => kick(at(b)));
    [1, 3, 5, 6].forEach((b) => snare(at(b)));
    for (let b = 0.5; b < 7; b += 0.5) hat(at(b), b % 1 ? 0.12 : 0.06);
    (
        [
            [0, 36, 0.3], [0.75, 36, 0.15], [1.5, 39, 0.2], [2, 41, 0.2], [2.75, 43, 0.15],
            [3.5, 46, 0.2], [4, 36, 0.25], [4.75, 48, 0.15], [5, 46, 0.15], [5.5, 43, 0.15],
            [6, 41, 0.2], [6.5, 39, 0.2],
        ] as const
    ).forEach(([b, n, d]) => bass(at(b), n, d));

    // ---- each ransom letter lands on a rim click
    letterTimes.forEach((s) => hiss(t0 + s, { dur: 0.07, type: "bandpass", freq: 3200, q: 2, level: 0.35 }));

    // ---- harmony + build
    stab(at(3), [44, 48, 51, 55, 58], { dur: 0.3 }); // Abmaj9
    stab(at(5), [46, 50, 53, 57], { dur: 0.3 }); // Bbmaj7
    riser(at(5), 2 * BEAT);

    // ---- beat 7: final hit as the screen wipes away
    kick(at(7), 1.2);
    snare(at(7), 0.6);
    hiss(at(7), { dur: 1.6, freq: 4000, level: 0.28, wet: 0.6 });
    stab(at(7), [48, 55, 58, 62, 63, 67], { dur: 1.5, level: 0.19, cutoff: 4500, wet: 0.5 });
    bass(at(7), 24, 1.2, 0.32);
}
