/**
 * <box-shadow-generator> — visual CSS box-shadow builder with live preview + copy. Zero dependencies.
 * Built & maintained by SGBP — Singapore Build Partners (https://sgbp.tech). MIT.
 */
class BoxShadowGenerator extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: "open" }); this._defaults(); }
  _defaults() { this.x = 0; this.y = 8; this.blur = 24; this.spread = -6; this.color = "#1a1a2e"; this.opacity = 25; this.inset = false; }
  connectedCallback() { this.render(); }
  _rgba() {
    const h = this.color.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${(this.opacity / 100).toFixed(2)})`;
  }
  _css() { return `box-shadow: ${this.inset ? "inset " : ""}${this.x}px ${this.y}px ${this.blur}px ${this.spread}px ${this._rgba()};`; }
  _update() {
    const $ = (s) => this.shadowRoot.querySelector(s);
    $("#box").style.boxShadow = this._css().replace("box-shadow: ", "").replace(/;$/, "");
    $("#out").textContent = this._css();
  }
  render() {
    const ctrls = [["x", "Offset X", -50, 50], ["y", "Offset Y", -50, 50], ["blur", "Blur", 0, 100], ["spread", "Spread", -50, 50], ["opacity", "Opacity %", 0, 100]];
    this.shadowRoot.innerHTML = `
      <style>
        *,*::before,*::after{box-sizing:border-box}
        :host{display:block;width:100%;max-width:520px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
        .card{border:1px solid #e2e2e2;border-radius:12px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:16px}
        .stage{display:flex;align-items:center;justify-content:center;height:150px;background:#fafafa;border:1px solid #eee;border-radius:10px;margin-bottom:14px}
        .box{width:96px;height:64px;background:#fff;border-radius:10px;border:1px solid #eee}
        .ctrl{display:flex;align-items:center;gap:10px;margin:7px 0}
        .ctrl label{font-size:12px;font-weight:600;color:#555;width:78px;flex:0 0 auto}
        input[type=range]{flex:1;min-width:0;accent-color:#EB0028}
        .ctrl output{font-size:12px;font-family:ui-monospace,monospace;color:#333;width:38px;text-align:right;flex:0 0 auto}
        .extra{display:flex;align-items:center;gap:14px;margin:10px 0 2px}
        .extra label{font-size:12px;font-weight:600;color:#555}
        input[type=color]{width:42px;height:30px;padding:0;border:1px solid #ccc;border-radius:6px;background:none;cursor:pointer}
        input[type=color]::-webkit-color-swatch-wrapper{padding:2px}input[type=color]::-webkit-color-swatch{border:0;border-radius:4px}input[type=color]::-moz-color-swatch{border:0;border-radius:4px}
        .chk{display:flex;align-items:center;gap:6px}
        .outwrap{margin-top:14px;display:flex;align-items:stretch;gap:8px}
        pre{flex:1;min-width:0;background:#1a1a1a;color:#f4f4f4;border-radius:8px;padding:10px 12px;font-family:ui-monospace,monospace;font-size:12px;line-height:1.5;margin:0;overflow-x:auto;white-space:pre-wrap;word-break:break-word}
        .btns{display:flex;flex-direction:column;gap:6px;flex:0 0 auto}
        button{font:inherit;font-size:12px;font-weight:700;border-radius:8px;padding:8px 12px;cursor:pointer}
        .copy{color:#fff;background:#EB0028;border:0}.reset{color:#555;background:#fff;border:1px solid #ccc}
      </style>
      <div class="card">
        <div class="stage"><div class="box" id="box"></div></div>
        ${ctrls.map(([k, lab, mn, mx]) => `<div class="ctrl"><label>${lab}</label>
          <input type="range" id="r-${k}" min="${mn}" max="${mx}" value="${this[k]}"><output id="o-${k}">${this[k]}</output></div>`).join("")}
        <div class="extra">
          <span class="chk"><label>Color</label><input type="color" id="color" value="${this.color}"></span>
          <span class="chk"><input type="checkbox" id="inset" ${this.inset ? "checked" : ""}><label for="inset">Inset</label></span>
        </div>
        <div class="outwrap"><pre id="out"></pre><div class="btns"><button class="copy" id="copy">Copy</button><button class="reset" id="reset">Reset</button></div></div>
      </div>`;
    const $ = (s) => this.shadowRoot.querySelector(s);
    ctrls.forEach(([k]) => $(`#r-${k}`).addEventListener("input", (e) => { this[k] = +e.target.value; $(`#o-${k}`).textContent = e.target.value; this._update(); }));
    $("#color").addEventListener("input", (e) => { this.color = e.target.value; this._update(); });
    $("#inset").addEventListener("change", (e) => { this.inset = e.target.checked; this._update(); });
    $("#copy").addEventListener("click", () => { navigator.clipboard && navigator.clipboard.writeText(this._css()); const b = $("#copy"), o = b.textContent; b.textContent = "Copied"; setTimeout(() => b.textContent = o, 900); });
    $("#reset").addEventListener("click", () => { this._defaults(); this.render(); });
    this._update();
  }
}
if (!customElements.get("box-shadow-generator")) customElements.define("box-shadow-generator", BoxShadowGenerator);
