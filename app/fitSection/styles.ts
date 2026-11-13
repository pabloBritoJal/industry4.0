export const STYLES = `
.fb-app{--accent:#c6f36b;--bg:#0c0e0c;--panel:#141714;--panel2:#1b1f1b;--border:#2b302b;--muted:#a3aaa1;min-height:100vh;background:var(--bg);color:#f0f1ea;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.45;color-scheme:dark;padding:0 16px 120px}
.fb-app *{box-sizing:border-box}
.fb-app button,.fb-app input{font:inherit;color:inherit;touch-action:manipulation}
.fb-app button{cursor:pointer;border:0;background:none}
.fb-app button:disabled{opacity:.4;cursor:default}
.fb-app :focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.fb-app h1,.fb-app h2,.fb-app p,.fb-app dl,.fb-app dd,.fb-app ol{margin:0;padding:0}
.fb-shell{max-width:720px;margin:0 auto}
.fb-header{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;padding:28px 0 20px;flex-wrap:wrap}
.fb-eyebrow{color:var(--accent);font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.fb-header h1{font-size:clamp(28px,7vw,40px);line-height:1.05;margin-top:6px;letter-spacing:-.02em}
.fb-sub{color:var(--muted);margin-top:8px;max-width:44ch}
.fb-date{display:grid;gap:4px;font-size:11px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase}
.fb-date input{background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:9px 10px;font-size:14px;text-transform:none;letter-spacing:0}
.fb-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;position:sticky;top:0;z-index:5;background:var(--bg);padding:8px 0}
.fb-tab{position:relative;display:grid;justify-items:center;gap:0;padding:10px 6px;border:1px solid var(--border)!important;border-radius:12px;background:var(--panel)!important;color:var(--muted)}
.fb-tab b{font-size:20px;color:inherit}
.fb-tab span{font-size:12px}
.fb-tab[aria-pressed=true]{background:var(--tab)!important;border-color:var(--tab)!important;color:#12150e}
.fb-tab i{position:absolute;top:-6px;right:-4px;min-width:20px;height:20px;border-radius:10px;background:#f0f1ea;color:#12150e;font-size:11px;font-style:normal;font-weight:700;display:grid;place-items:center;padding:0 5px}
.fb-summary{margin:12px 0 18px}
.fb-progress{height:8px;border-radius:4px;background:var(--panel2);overflow:hidden}
.fb-progress span{display:block;height:100%;background:var(--accent);transition:width .25s}
.fb-summary dl{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
.fb-summary dl div{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:10px 12px}
.fb-summary dt{font-size:11px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase}
.fb-summary dd{font-size:20px;font-weight:700;margin-top:2px}
.fb-alert{background:#3a2a10;border:1px solid #7a5a1a;border-radius:12px;padding:12px 14px;margin-bottom:16px;font-size:13px}
.fb-list{list-style:none;display:grid;gap:12px}
.fb-card{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:14px;transition:border-color .2s}
.fb-card[data-complete=true]{border-color:var(--accent)}
.fb-card-head{display:flex;gap:12px;align-items:center}
.fb-index{color:var(--muted);font-size:12px;font-variant-numeric:tabular-nums;align-self:flex-start;padding-top:3px}
.fb-card-title{flex:1;min-width:0}
.fb-card-title h2{font-size:17px;line-height:1.2}
.fb-card-title p{color:var(--muted);font-size:13px;margin-top:2px}
.fb-reps{text-align:right;display:grid}
.fb-reps strong{color:var(--accent);font-size:16px;white-space:nowrap}
.fb-reps span{font-size:11px;color:var(--muted)}
.fb-prev{display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px;margin-top:12px;padding:8px 10px;background:var(--panel2);border-radius:10px;font-size:13px}
.fb-prev span{color:var(--muted)}
.fb-prev button{margin-left:auto;color:var(--accent);font-weight:700;font-size:13px;padding:6px 8px}
.fb-prev-empty{color:var(--muted)}
.fb-tip{margin-top:8px;color:var(--accent);font-size:13px;font-weight:700}
.fb-sets{display:grid;gap:8px;margin-top:12px}
.fb-set{display:grid;grid-template-columns:54px 1fr 1fr 52px;gap:8px;align-items:center}
.fb-set-n{font-size:12px;color:var(--muted)}
.fb-set label{position:relative;display:block}
.fb-set input{width:100%;height:52px;background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:0 34px 0 12px;font-size:18px;font-weight:700;font-variant-numeric:tabular-nums}
.fb-set input::placeholder{color:#5b625a;font-weight:400}
.fb-set small{position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:11px;color:var(--muted);pointer-events:none}
.fb-check{height:52px;border:1px solid var(--border)!important;border-radius:12px;background:var(--bg)!important;font-size:22px;font-weight:900}
.fb-check[aria-pressed=true]{background:var(--accent)!important;border-color:var(--accent)!important;color:#12150e}
.fb-set[data-done=true] input{border-color:var(--accent)}
.fb-more{margin-top:10px;color:var(--muted);font-size:13px;padding:8px 0;text-decoration:underline;text-underline-offset:3px}
.fb-detail{display:grid;gap:10px;padding-top:6px;font-size:14px}
.fb-images{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.fb-images img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px;background:var(--panel2)}
.fb-note{color:var(--muted);font-size:13px}
.fb-footer{display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;align-items:center;margin-top:24px;padding-top:18px;border-top:1px solid var(--border)}
.fb-footer button{border:1px solid var(--border)!important;border-radius:10px;padding:10px 14px;font-size:14px}
.fb-confirm{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:13px}
.fb-danger{background:#ff6b5e!important;border-color:#ff6b5e!important;color:#240a07!important;font-weight:700}
.fb-rest{position:fixed;left:12px;right:12px;bottom:12px;z-index:10;max-width:696px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:12px;background:#f0f1ea;color:#12150e;border-radius:16px;padding:12px 14px;box-shadow:0 8px 30px rgba(0,0,0,.5)}
.fb-rest[data-finished=true]{background:var(--accent)}
.fb-rest span{display:block;font-size:11px;letter-spacing:.1em;text-transform:uppercase;opacity:.7}
.fb-rest strong{font-size:24px;font-variant-numeric:tabular-nums}
.fb-rest-actions{display:flex;gap:6px}
.fb-rest-actions button{border:1px solid rgba(0,0,0,.25)!important;border-radius:10px;padding:10px 12px;font-weight:700;font-size:14px}
.fb-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.fb-tags span{border:1px solid var(--border);border-radius:99px;padding:3px 10px;font-size:12px;color:var(--muted)}
.fb-views{display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:4px;background:var(--panel);border:1px solid var(--border);border-radius:12px;margin-bottom:12px}
.fb-views button{padding:10px;border-radius:9px;color:var(--muted);font-weight:700}
.fb-views button[aria-selected=true]{background:var(--accent);color:#12150e}
.fb-week{display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin:0 0 14px;font-size:13px;color:var(--muted)}
.fb-week span{display:grid;justify-items:center;width:30px;padding:4px 0;border-radius:8px;border:1px solid var(--border);font-weight:700}
.fb-week span[data-on=true]{border-color:var(--accent);color:var(--accent)}
.fb-week small{font-size:10px}
.fb-week em{font-style:normal;flex-basis:100%;font-size:12px}
.fb-day{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap;margin-top:8px}
.fb-day h2{font-size:24px;margin-top:4px}
.fb-warmup{background:var(--panel);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:12px;padding:12px 14px;margin-bottom:12px;font-size:14px}
.fb-warmup p{color:var(--muted);margin-top:4px}.fb-warmup ul{margin:6px 0 0;padding-left:18px;color:var(--muted)}
.fb-pairnote{color:var(--muted);font-size:13px;margin:0 0 12px}
.fb-pairnote strong{color:#f0f1ea}
.fb-pairs{display:grid;gap:18px}
.fb-pair{display:grid;gap:8px}
.fb-pair-head{display:flex;justify-content:space-between;color:var(--muted);font-size:11px;letter-spacing:.12em;text-transform:uppercase}
.fb-rest-setup{margin-top:24px;background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:14px;display:grid;gap:10px}
.fb-rest-setup div{display:flex;gap:8px}
.fb-rest-setup button{flex:1;border:1px solid var(--border)!important;border-radius:10px;padding:10px;font-weight:700}
.fb-rest-setup label{display:flex;gap:8px;align-items:center;font-size:13px;color:var(--muted)}
.fb-notes{display:grid;gap:12px;margin-top:12px}
.fb-notes section{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:14px;font-size:14px;display:grid;gap:8px}
.fb-notes ol{list-style:none;display:grid;gap:8px}
.fb-notes li{display:flex;gap:12px;align-items:baseline}
.fb-notes li span{color:var(--accent);font-size:12px}
.fb-notes li strong{display:block}
.fb-notes p{color:var(--muted)}
.fb-guide{display:grid;gap:14px}
.fb-guide h2{font-size:28px;line-height:1.1}
.fb-steps{display:grid;gap:10px}
.fb-steps article{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:14px;display:grid;gap:6px}
.fb-steps article span{color:var(--accent);font-size:12px}
.fb-steps h3,.fb-volume h3{margin:0;font-size:18px}
.fb-steps p{margin:0;color:var(--muted)}
.fb-steps strong{font-size:13px}
.fb-volume{background:var(--panel);border:1px solid var(--border);border-radius:16px;padding:14px;display:grid;gap:8px}
.fb-volume-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-top:1px solid var(--border)}
.fb-volume-row strong{display:block}
.fb-volume-row small{color:var(--muted);font-size:12px}
.fb-volume-row span{font-size:20px;font-weight:700;color:var(--accent)}
@media(min-width:640px){.fb-app{padding:0 28px 120px}.fb-card{padding:18px}}
@media(prefers-reduced-motion:reduce){.fb-progress span{transition:none}}
`;
