<script>
  import { onMount, tick } from 'svelte'
  import { openStates } from './uiState.js'

  const _ORD = ['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth']
  const ord = n => _ORD[n] ?? `${n + 1}th`

  const TABS = ['File','Home','Insert','Layout','References','Review','View','Help']
  let activeTab = 'Home'

  // ── Paste dropdown ────────────────────────────────────────────
  let pasteDropOpen = false
  let pasteArrEl    = null
  let pasteDropPos  = { top: 0, left: 0 }

  function calcPastePos() {
    if (pasteArrEl) {
      const r = pasteArrEl.getBoundingClientRect()
      pasteDropPos = { top: r.bottom + 2, left: r.left }
    }
  }
  function togglePasteDrop() { calcPastePos(); pasteDropOpen = !pasteDropOpen }
  function closePasteDrop()  { pasteDropOpen = false }

  // ── Font name dropdown ────────────────────────────────────────
  let fontDropOpen = false
  let fontSelEl    = null
  let fontDropPos  = { top: 0, left: 0, width: 0 }

  const FONTS = [
    'Calibri', 'Calibri Light', 'Cambria', 'Arial', 'Times New Roman',
    'Verdana', 'Georgia', 'Trebuchet MS', 'Garamond', 'Book Antiqua',
    'Palatino Linotype', 'Courier New', 'Consolas', 'Impact', 'Comic Sans MS',
  ]

  function calcFontPos() {
    if (fontSelEl) {
      const r = fontSelEl.getBoundingClientRect()
      fontDropPos = { top: r.bottom + 2, left: r.left, width: Math.max(r.width, 200) }
    }
  }
  function toggleFontDrop() { calcFontPos(); fontDropOpen = !fontDropOpen }
  function closeFontDrop()  { fontDropOpen = false }

  // ── Styles dropdown (style gallery more) ─────────────────────
  let stylesDropOpen = false
  let stylesArrEl    = null
  let stylesDropPos  = { top: 0, left: 0 }

  const STYLES = [
    { name: 'Normal',        preview: 'AaBbCcDd', weight: 400, size: 11 },
    { name: 'No Spacing',    preview: 'AaBbCcDd', weight: 400, size: 11 },
    { name: 'Heading 1',     preview: 'AaBbCc',   weight: 700, size: 16, color: '#2b579a' },
    { name: 'Heading 2',     preview: 'AaBbCc',   weight: 700, size: 13, color: '#2b579a' },
    { name: 'Heading 3',     preview: 'AaBbCc',   weight: 400, size: 12, color: '#2b579a', style: 'italic' },
    { name: 'Heading 4',     preview: 'AaBbCc',   weight: 700, size: 11, color: '#2b579a' },
    { name: 'Title',         preview: 'AaBbCc',   weight: 300, size: 20 },
    { name: 'Subtitle',      preview: 'AaBbCc',   weight: 400, size: 13, color: '#595959' },
    { name: 'Subtle Emph.',  preview: 'AaBbCcDd', weight: 400, size: 11, color: '#595959', style: 'italic' },
    { name: 'Emphasis',      preview: 'AaBbCcDd', weight: 400, size: 11, style: 'italic' },
    { name: 'Intense Emph.', preview: 'AaBbCcDd', weight: 700, size: 11, color: '#2b579a', style: 'italic' },
    { name: 'Strong',        preview: 'AaBbCcDd', weight: 700, size: 11 },
  ]

  function calcStylesPos() {
    if (stylesArrEl) {
      const r = stylesArrEl.getBoundingClientRect()
      stylesDropPos = { top: r.bottom + 2, left: r.left }
    }
  }
  function toggleStylesDrop() { calcStylesPos(); stylesDropOpen = !stylesDropOpen }
  function closeStylesDrop()  { stylesDropOpen = false }

  // ── Find dropdown ─────────────────────────────────────────────
  let findDropOpen = false
  let findArrEl    = null
  let findDropPos  = { top: 0, left: 0 }

  function calcFindPos() {
    if (findArrEl) {
      const r = findArrEl.getBoundingClientRect()
      findDropPos = { top: r.bottom + 2, left: r.left }
    }
  }
  function toggleFindDrop() { calcFindPos(); findDropOpen = !findDropOpen }
  function closeFindDrop()  { findDropOpen = false }

  // ── Dictate dropdown ──────────────────────────────────────────
  let dictateDropOpen = false
  let dictateArrEl    = null
  let dictateDropPos  = { top: 0, left: 0 }

  function calcDictatePos() {
    if (dictateArrEl) {
      const r = dictateArrEl.getBoundingClientRect()
      dictateDropPos = { top: r.bottom + 2, left: r.left }
    }
  }
  function toggleDictateDrop() { calcDictatePos(); dictateDropOpen = !dictateDropOpen }
  function closeDictateDrop()  { dictateDropOpen = false }

  // ── Auto-open from URL ─────────────────────────────────────────
  onMount(async () => {
    await new Promise(r => requestAnimationFrame(r))
    if ($openStates.has('paste-dropdown'))   { calcPastePos();   pasteDropOpen   = true }
    if ($openStates.has('font-name-dropdown'))  { calcFontPos();  fontDropOpen  = true }
    if ($openStates.has('styles-dropdown'))  { calcStylesPos();  stylesDropOpen  = true }
    if ($openStates.has('find-dropdown'))    { calcFindPos();    findDropOpen    = true }
    if ($openStates.has('dictate-dropdown')) { calcDictatePos(); dictateDropOpen = true }
  })
</script>

<div class="flex-shrink-0 bg-white border-b border-wd-border" alt-id="Word ribbon">

  <!-- ── Tab bar + user controls ─────────────────────────────── -->
  <div
    class="flex items-center h-[30px] border-b border-gray-200"
    alt-id="Ribbon tab navigation bar with user controls on the right"
  >
    {#each TABS as id, i}
      <button
        class="h-[30px] px-[10px] text-xs border-none cursor-pointer flex items-center whitespace-nowrap
               {id === activeTab
                 ? 'text-wd-blue border-b-2 border-wd-blue font-semibold'
                 : 'text-wd-text border-b-2 border-transparent hover:bg-gray-100'}"
        alt-id="{id === activeTab ? `${id} ribbon tab, currently active, ${ord(i)} tab in ribbon tab bar` : `${id} ribbon tab, ${ord(i)} tab in ribbon tab bar`}"
        on:click={() => activeTab = id}
      >
        {id}
      </button>
    {/each}

    <div class="flex-1"></div>

    <!-- User controls right of tab bar -->
    <div class="flex items-center gap-0.5 pr-2" alt-id="User controls in ribbon tabs row">
      <button
        class="flex items-center h-7 px-2 gap-1 text-[11px] text-wd-text rounded hover:bg-gray-100 border-none bg-transparent cursor-pointer"
        alt-id="Comments button in Word ribbon user controls, first button in user controls group"
      >
        <i class="fa-regular fa-comment text-wd-muted text-[13px]"></i>
        <span>Comments</span>
      </button>
      <button
        class="flex items-center h-7 px-2 gap-1 text-[11px] text-wd-text rounded hover:bg-gray-100 border-none bg-transparent cursor-pointer"
        alt-id="Catch up button in Word ribbon user controls, second button in user controls group"
      >
        <i class="fa-regular fa-bell text-wd-muted text-[13px]"></i>
        <span>Catch up</span>
      </button>
      <button
        class="flex items-center h-7 px-2 gap-1 text-[11px] text-wd-text rounded hover:bg-gray-100 border-none bg-transparent cursor-pointer"
        alt-id="Editing mode dropdown button, third button in user controls group"
      >
        <i class="fa-regular fa-pen-to-square text-wd-muted text-[13px]"></i>
        <span>Editing</span>
        <i class="fa-regular fa-angle-down text-wd-muted text-[9px]"></i>
      </button>
      <button
        class="h-7 px-3 bg-wd-blue text-white text-[11px] font-semibold rounded cursor-pointer border-none hover:bg-wd-blue-dark"
        alt-id="Share document button, fourth button in user controls group"
      >
        Share
      </button>
    </div>
  </div>

  <!-- ── Home toolbar ───────────────────────────────────────── -->
  {#if activeTab !== 'File'}
  <div
    class="flex items-center h-[32px] px-1 gap-0 overflow-x-auto"
    alt-id="Home ribbon toolbar"
  >

    <!-- ── Clipboard ─────────────────────────────────────────── -->
    <div class="rg" style="position:relative;" alt-id="Clipboard ribbon group">

      <!-- Paste split button -->
      <div class="paste-split" alt-id="Paste split button in clipboard group">
        <button class="paste-icon" alt-id="Paste action button, first element in clipboard group" title="Paste">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="4" width="11" height="13" rx="1.5" fill="#c8932a"/>
            <rect x="4" y="2.5" width="5" height="3" rx="1" fill="#a07020"/>
            <rect x="4" y="7" width="8" height="10" rx="1" fill="white" stroke="#c8c6c4" stroke-width="0.5"/>
            <rect x="5.5" y="9"  width="5" height="1" rx="0.4" fill="#c8c6c4"/>
            <rect x="5.5" y="11" width="5" height="1" rx="0.4" fill="#c8c6c4"/>
            <rect x="5.5" y="13" width="3" height="1" rx="0.4" fill="#c8c6c4"/>
          </svg>
        </button>
        <button
          bind:this={pasteArrEl}
          class="paste-arr"
          alt-id="Paste options dropdown arrow button, second element in clipboard group"
          title="Paste Options"
          on:click={togglePasteDrop}
        >
          <i class="fa-regular fa-angle-down" style="font-size:8px;color:#605e5c;"></i>
        </button>
      </div>

      <!-- Cut -->
      <button class="rb-xs" alt-id="Cut button, third element in clipboard group" title="Cut">
        <i class="fa-regular fa-scissors" style="font-size:13px;"></i>
      </button>
      <!-- Copy -->
      <button class="rb-xs" alt-id="Copy button, fourth element in clipboard group" title="Copy">
        <i class="fa-regular fa-copy" style="font-size:13px;"></i>
      </button>
      <!-- Format Painter -->
      <button class="rb-xs" alt-id="Format Painter button, fifth element in clipboard group" title="Format Painter">
        <i class="fa-regular fa-paintbrush" style="font-size:13px;color:#3a6ea5;"></i>
      </button>

      <!-- ── Paste dropdown ─────────────────────────────────── -->
      {#if pasteDropOpen}
        <div
          style="position:fixed;inset:0;z-index:100;"
          alt-id="Overlay blocking lower layers while paste dropdown is open"
          on:click={closePasteDrop}
          aria-hidden="true"
        ></div>
        <div
          class="drop-panel"
          style="position:fixed;top:{pasteDropPos.top}px;left:{pasteDropPos.left}px;z-index:101;min-width:220px;"
          alt-id="Paste options dropdown panel"
        >
          <button class="drop-item" alt-id="Paste option, first item in paste dropdown" on:click={closePasteDrop}>
            <i class="fa-regular fa-clipboard drop-icon"></i>
            <span class="drop-label">Paste</span>
            <span class="drop-kbd">⌘V</span>
          </button>
          <button class="drop-item" alt-id="Paste Special option, second item in paste dropdown" on:click={closePasteDrop}>
            <i class="fa-regular fa-clipboard-list drop-icon"></i>
            <span class="drop-label">Paste Special...</span>
          </button>
          <button class="drop-item" alt-id="Set Default Paste option, third item in paste dropdown" on:click={closePasteDrop}>
            <i class="fa-regular fa-gear drop-icon"></i>
            <span class="drop-label">Set Default Paste...</span>
          </button>
        </div>
      {/if}
    </div>

    <!-- ── Font ──────────────────────────────────────────────── -->
    <div class="rg" style="position:relative;" alt-id="Font ribbon group">

      <!-- Font name selector -->
      <div
        bind:this={fontSelEl}
        class="font-input-wrap"
        role="button"
        tabindex="0"
        alt-id="Font name selector dropdown, currently Calibri Body, first element in font group"
        on:click={toggleFontDrop}
        on:keydown={e => e.key === 'Enter' && toggleFontDrop()}
      >
        <input
          class="font-input"
          type="text"
          value="Calibri (Body)"
          alt-id="Font name text input field, currently Calibri Body"
          readonly
        />
        <i class="fa-regular fa-angle-down" style="font-size:8px;color:#605e5c;flex-shrink:0;"></i>
      </div>

      <!-- Font size -->
      <div class="rsel" style="width:36px;justify-content:center;" alt-id="Font size selector, currently 10, second element in font group">
        <span>10</span>
        <i class="fa-regular fa-angle-down" style="font-size:8px;color:#605e5c;"></i>
      </div>

      <!-- Grow / Shrink -->
      <button class="rb-xs" alt-id="Grow font size button, third element in font group" title="Grow Font" style="font-size:11px;font-weight:700;">
        A<sup style="font-size:7px;">+</sup>
      </button>
      <button class="rb-xs" alt-id="Shrink font size button, fourth element in font group" title="Shrink Font" style="font-size:11px;font-weight:700;">
        A<sup style="font-size:7px;">−</sup>
      </button>

      <!-- Change case -->
      <button class="rb-xs" alt-id="Change case dropdown button, fifth element in font group" title="Change Case" style="font-size:11px;">
        Aa<i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;margin-left:1px;"></i>
      </button>

      <!-- Clear formatting -->
      <button class="rb-xs" alt-id="Clear all formatting button, sixth element in font group" title="Clear All Formatting" style="font-size:13px;">
        <i class="fa-regular fa-eraser"></i>
      </button>

      <div class="sep"></div>

      <!-- B I U S -->
      <button class="rb-xs" alt-id="Bold formatting button, seventh element in font group" title="Bold" style="font-weight:700;font-size:14px;">B</button>
      <button class="rb-xs" alt-id="Italic formatting button, eighth element in font group" title="Italic" style="font-style:italic;font-size:14px;">I</button>
      <button class="rb" alt-id="Underline formatting dropdown button, ninth element in font group" title="Underline" style="font-size:14px;text-decoration:underline;padding:0 1px;">
        U <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>
      <button class="rb-xs" alt-id="Strikethrough button, tenth element in font group" title="Strikethrough" style="text-decoration:line-through;font-size:13px;">S</button>
      <button class="rb-xs" alt-id="Subscript button, eleventh element in font group" title="Subscript" style="font-size:11px;">
        X<sub style="font-size:7px;">2</sub>
      </button>
      <button class="rb-xs" alt-id="Superscript button, twelfth element in font group" title="Superscript" style="font-size:11px;">
        X<sup style="font-size:7px;">2</sup>
      </button>

      <div class="sep"></div>

      <!-- Text effects, highlight, color -->
      <button class="rb" alt-id="Text effects dropdown button in font group" title="Text Effects and Typography" style="font-size:13px;">
        <span class="color-ic"><span style="font-style:italic;font-weight:700;">A</span><span class="bar" style="background:linear-gradient(90deg,#e74c3c,#3498db,#2ecc71);"></span></span>
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>
      <button class="rb" alt-id="Text highlight color dropdown button in font group" title="Text Highlight Color" style="font-size:13px;">
        <span class="color-ic"><span>A</span><span class="bar" style="background:#ffff00;"></span></span>
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>
      <button class="rb" alt-id="Font color dropdown button in font group" title="Font Color" style="font-size:13px;">
        <span class="color-ic"><span>A</span><span class="bar" style="background:#e74c3c;"></span></span>
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>

      <!-- Font dropdown -->
      {#if fontDropOpen}
        <div
          style="position:fixed;inset:0;z-index:100;"
          alt-id="Overlay blocking lower layers while font name dropdown is open"
          on:click={closeFontDrop}
          aria-hidden="true"
        ></div>
        <div
          class="drop-panel"
          style="position:fixed;top:{fontDropPos.top}px;left:{fontDropPos.left}px;width:{fontDropPos.width}px;z-index:101;max-height:280px;overflow-y:auto;"
          alt-id="Font name dropdown panel"
        >
          {#each FONTS as font, i}
            <button
              class="drop-item"
              style="font-family:'{font}';"
              alt-id="Font option {font}, {ord(i)} item in font name dropdown"
              on:click={closeFontDrop}
            >
              {font}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- ── Paragraph ──────────────────────────────────────────── -->
    <div class="rg" alt-id="Paragraph ribbon group">
      <!-- List buttons -->
      <button class="rb" alt-id="Bullets list dropdown button, first element in paragraph group" title="Bullets">
        <i class="fa-regular fa-list-ul" style="font-size:12px;"></i>
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>
      <button class="rb" alt-id="Numbering list dropdown button, second element in paragraph group" title="Numbering">
        <i class="fa-regular fa-list-ol" style="font-size:12px;"></i>
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>
      <button class="rb" alt-id="Multilevel list dropdown button, third element in paragraph group" title="Multilevel List">
        <i class="fa-regular fa-list-tree" style="font-size:12px;"></i>
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>

      <div class="sep"></div>

      <!-- Indent -->
      <button class="rb-xs" alt-id="Decrease indent button, fourth element in paragraph group" title="Decrease Indent">
        <i class="fa-regular fa-indent" style="font-size:12px;transform:scaleX(-1);"></i>
      </button>
      <button class="rb-xs" alt-id="Increase indent button, fifth element in paragraph group" title="Increase Indent">
        <i class="fa-regular fa-indent" style="font-size:12px;"></i>
      </button>
      <!-- Sort -->
      <button class="rb-xs" alt-id="Sort button, sixth element in paragraph group" title="Sort">
        <i class="fa-regular fa-arrow-down-a-z" style="font-size:12px;"></i>
      </button>
      <!-- Show/Hide -->
      <button class="rb-xs" alt-id="Show hide paragraph marks button, seventh element in paragraph group" title="Show/Hide" style="font-weight:700;">
        ¶
      </button>

      <div class="sep"></div>

      <!-- Alignment -->
      <button class="rb-xs" alt-id="Align left button, eighth element in paragraph group" title="Align Left">
        <i class="fa-regular fa-align-left" style="font-size:12px;"></i>
      </button>
      <button class="rb-xs" alt-id="Align center button, ninth element in paragraph group" title="Align Center">
        <i class="fa-regular fa-align-center" style="font-size:12px;"></i>
      </button>
      <button class="rb-xs" alt-id="Align right button, tenth element in paragraph group" title="Align Right">
        <i class="fa-regular fa-align-right" style="font-size:12px;"></i>
      </button>
      <button class="rb-xs" alt-id="Justify button, eleventh element in paragraph group" title="Justify">
        <i class="fa-regular fa-align-justify" style="font-size:12px;"></i>
      </button>

      <div class="sep"></div>

      <!-- Line spacing, shading, borders -->
      <button class="rb" alt-id="Line and paragraph spacing dropdown button, twelfth element in paragraph group" title="Line Spacing">
        <i class="fa-regular fa-line-height" style="font-size:12px;"></i>
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>
      <button class="rb" alt-id="Shading dropdown button in paragraph group" title="Shading">
        <span class="color-ic" style="font-size:12px;"><i class="fa-regular fa-fill-drip"></i><span class="bar" style="background:#ffff00;"></span></span>
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>
      <button class="rb" alt-id="Borders dropdown button in paragraph group" title="Borders">
        <i class="fa-regular fa-border-all" style="font-size:12px;"></i>
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>
    </div>

    <!-- ── Styles ─────────────────────────────────────────────── -->
    <div class="rg" style="position:relative;" alt-id="Styles ribbon group">
      <!-- Inline style gallery -->
      <div class="styles-gallery" alt-id="Styles gallery in ribbon styles group">
        <button class="style-btn" alt-id="Heading 2 style button in styles gallery, first visible style in gallery">
          <span style="font-weight:700;font-size:10px;color:#2b579a;">Heading 2</span>
          <span style="font-size:8px;color:#888;">AaBbCc</span>
        </button>
        <button class="style-btn" alt-id="Heading 1 style button in styles gallery, second visible style in gallery">
          <span style="font-weight:700;font-size:11px;color:#2b579a;">Heading 1</span>
          <span style="font-size:8px;color:#888;">AaBbCc</span>
        </button>
        <button class="style-btn" alt-id="Heading 4 style button in styles gallery, third visible style in gallery">
          <span style="font-weight:700;font-size:10px;color:#2b579a;">Heading 4</span>
          <span style="font-size:8px;color:#888;">AaBbCc</span>
        </button>
      </div>

      <!-- More styles dropdown -->
      <button
        bind:this={stylesArrEl}
        class="rb"
        style="padding:0 3px;align-self:stretch;"
        alt-id="More styles dropdown button in styles group"
        title="More"
        on:click={toggleStylesDrop}
      >
        <i class="fa-regular fa-angle-down" style="font-size:10px;color:#605e5c;"></i>
      </button>

      <!-- Styles gallery dropdown -->
      {#if stylesDropOpen}
        <div
          style="position:fixed;inset:0;z-index:100;"
          alt-id="Overlay blocking lower layers while styles dropdown is open"
          on:click={closeStylesDrop}
          aria-hidden="true"
        ></div>
        <div
          class="drop-panel"
          style="position:fixed;top:{stylesDropPos.top}px;left:{stylesDropPos.left - 200}px;z-index:101;width:260px;"
          alt-id="Styles dropdown panel"
        >
          <div style="padding:4px 8px 2px;font-size:10px;font-weight:600;color:#605e5c;">STYLES</div>
          {#each STYLES as s, i}
            <button
              class="drop-item"
              style="font-weight:{s.weight};font-size:{s.size}px;{s.color ? `color:${s.color};` : ''}{s.style ? `font-style:${s.style};` : ''}"
              alt-id="{s.name} style option, {ord(i)} item in styles dropdown"
              on:click={closeStylesDrop}
            >
              {s.preview} <span style="font-size:10px;color:#888;font-weight:400;font-style:normal;margin-left:6px;">{s.name}</span>
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- ── Editing ─────────────────────────────────────────────── -->
    <div class="rg" style="position:relative;" alt-id="Editing ribbon group">
      <!-- Find split button -->
      <div class="paste-split" alt-id="Find split button in editing group">
        <button class="paste-icon" style="width:auto;padding:0 5px;font-size:11px;gap:3px;display:flex;align-items:center;" alt-id="Find action button, first element in editing group" title="Find">
          <i class="fa-regular fa-magnifying-glass" style="font-size:12px;"></i>
          Find
        </button>
        <button
          bind:this={findArrEl}
          class="paste-arr"
          alt-id="Find dropdown arrow button, second element in editing group"
          title="Find Options"
          on:click={toggleFindDrop}
        >
          <i class="fa-regular fa-angle-down" style="font-size:8px;color:#605e5c;"></i>
        </button>
      </div>

      <!-- Replace -->
      <button class="rb-txt" alt-id="Replace button, third element in editing group" title="Replace">
        <i class="fa-regular fa-right-left" style="font-size:12px;"></i>
        Replace
      </button>

      <!-- Select dropdown -->
      <button class="rb-txt" alt-id="Select dropdown button, fourth element in editing group" title="Select">
        <i class="fa-regular fa-object-group" style="font-size:12px;"></i>
        Select
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>

      <!-- Find dropdown -->
      {#if findDropOpen}
        <div
          style="position:fixed;inset:0;z-index:100;"
          alt-id="Overlay blocking lower layers while find dropdown is open"
          on:click={closeFindDrop}
          aria-hidden="true"
        ></div>
        <div
          class="drop-panel"
          style="position:fixed;top:{findDropPos.top}px;left:{findDropPos.left}px;z-index:101;min-width:180px;"
          alt-id="Find dropdown panel"
        >
          <button class="drop-item" alt-id="Find option, first item in find dropdown" on:click={closeFindDrop}>
            <i class="fa-regular fa-magnifying-glass drop-icon"></i>
            <span class="drop-label">Find</span>
            <span class="drop-kbd">⌘F</span>
          </button>
          <button class="drop-item" alt-id="Advanced Find option, second item in find dropdown" on:click={closeFindDrop}>
            <i class="fa-regular fa-magnifying-glass-plus drop-icon"></i>
            <span class="drop-label">Advanced Find...</span>
          </button>
          <button class="drop-item" alt-id="Go To option, third item in find dropdown" on:click={closeFindDrop}>
            <i class="fa-regular fa-arrow-right drop-icon"></i>
            <span class="drop-label">Go To...</span>
          </button>
        </div>
      {/if}
    </div>

    <!-- ── Dictate ─────────────────────────────────────────────── -->
    <div class="rg" style="position:relative;" alt-id="Voice ribbon group">
      <!-- Dictate split button -->
      <div class="paste-split" alt-id="Dictate split button in voice group">
        <button class="paste-icon" style="width:auto;padding:0 5px;font-size:11px;gap:3px;display:flex;align-items:center;" alt-id="Dictate action button, first element in voice group" title="Dictate">
          <i class="fa-regular fa-microphone" style="font-size:12px;color:#c8372d;"></i>
          Dictate
        </button>
        <button
          bind:this={dictateArrEl}
          class="paste-arr"
          alt-id="Dictate dropdown arrow button, second element in voice group"
          on:click={toggleDictateDrop}
        >
          <i class="fa-regular fa-angle-down" style="font-size:8px;color:#605e5c;"></i>
        </button>
      </div>

      <!-- Dictate dropdown -->
      {#if dictateDropOpen}
        <div
          style="position:fixed;inset:0;z-index:100;"
          alt-id="Overlay blocking lower layers while dictate dropdown is open"
          on:click={closeDictateDrop}
          aria-hidden="true"
        ></div>
        <div
          class="drop-panel"
          style="position:fixed;top:{dictateDropPos.top}px;left:{dictateDropPos.left}px;z-index:101;min-width:180px;"
          alt-id="Dictate dropdown panel"
        >
          <button class="drop-item" alt-id="Dictate option, first item in dictate dropdown" on:click={closeDictateDrop}>
            <i class="fa-regular fa-microphone drop-icon" style="color:#c8372d;"></i>
            <span class="drop-label">Dictate</span>
          </button>
          <button class="drop-item" alt-id="Transcribe option, second item in dictate dropdown" on:click={closeDictateDrop}>
            <i class="fa-regular fa-file-audio drop-icon"></i>
            <span class="drop-label">Transcribe</span>
          </button>
        </div>
      {/if}
    </div>

    <!-- ── Editor ─────────────────────────────────────────────── -->
    <div class="rg" alt-id="Editor ribbon group">
      <button class="rb-txt" alt-id="Editor button in editor group, first element in editor group">
        <i class="fa-regular fa-spell-check" style="font-size:12px;"></i>
        Editor
      </button>
    </div>

    <!-- ── Add-ins ────────────────────────────────────────────── -->
    <div class="rg border-r-0" alt-id="Add-ins ribbon group">
      <button class="rb-txt" alt-id="Add-ins dropdown button, first element in add-ins group">
        <i class="fa-regular fa-puzzle-piece" style="font-size:12px;"></i>
        Add-ins
        <i class="fa-regular fa-angle-down" style="font-size:7px;color:#605e5c;"></i>
      </button>
    </div>

  </div>
  {/if}

</div>

<style>
  /* ── Ribbon group ─────────────────────────────────────────── */
  .rg {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 3px;
    gap: 1px;
    border-right: 1px solid #e0e0e0;
    flex-shrink: 0;
  }

  /* ── Icon-only button ─────────────────────────────────────── */
  .rb {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 26px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 3px;
    padding: 0 3px;
    color: #242424;
    font-size: 14px;
    gap: 2px;
    flex-shrink: 0;
  }
  .rb:hover { background: #e8e8e8; }

  .rb-xs {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 26px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 3px;
    padding: 0;
    color: #242424;
    font-size: 13px;
    flex-shrink: 0;
  }
  .rb-xs:hover { background: #e8e8e8; }

  .rb-txt {
    display: flex;
    align-items: center;
    height: 26px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 3px;
    padding: 0 5px;
    color: #242424;
    font-size: 11px;
    gap: 3px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .rb-txt:hover { background: #e8e8e8; }

  .rsel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #c8c6c4;
    border-radius: 2px;
    background: #fff;
    height: 22px;
    padding: 0 5px;
    cursor: pointer;
    font-size: 11px;
    gap: 4px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* ── Font input ───────────────────────────────────────────── */
  .font-input-wrap {
    display: flex;
    align-items: center;
    width: 120px;
    height: 22px;
    border: 1px solid #d0d0d0;
    border-radius: 2px;
    background: #fff;
    padding: 0 4px 0 6px;
    gap: 3px;
    cursor: pointer;
    flex-shrink: 0;
  }
  .font-input-wrap:hover { border-color: #999; }
  .font-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 12px;
    font-family: inherit;
    color: #242424;
    cursor: pointer;
    min-width: 0;
  }

  /* ── Paste split button ───────────────────────────────────── */
  .paste-split {
    display: flex;
    align-items: center;
    height: 26px;
    border-radius: 3px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .paste-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 26px;
    height: 26px;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0 3px;
  }
  .paste-icon:hover { background: #e8e8e8; }
  .paste-arr {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 26px;
    border: none;
    border-left: 1px solid #d0d0d0;
    background: none;
    cursor: pointer;
    padding: 0;
  }
  .paste-arr:hover { background: #e8e8e8; }

  /* ── Generic dropdown panel ───────────────────────────────── */
  .drop-panel {
    background: #ffffff;
    border: 1px solid #d0d0d0;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.15);
    border-radius: 3px;
    padding: 4px 0;
  }
  .drop-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px 12px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 12px;
    font-family: inherit;
    color: #242424;
    text-align: left;
    gap: 8px;
    white-space: nowrap;
  }
  .drop-item:hover { background: #f3f2f1; }
  .drop-icon  { font-size: 13px; color: #605e5c; width: 16px; flex-shrink: 0; }
  .drop-label { flex: 1; }
  .drop-kbd   { font-size: 11px; color: #888; }

  /* ── Separator ────────────────────────────────────────────── */
  .sep {
    width: 1px;
    height: 18px;
    background: #d0d0d0;
    margin: 0 1px;
    flex-shrink: 0;
  }

  /* ── Color indicator ──────────────────────────────────────── */
  .color-ic {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
  }
  .color-ic > span:first-child {
    font-size: 13px;
    font-weight: 600;
    line-height: 1.1;
  }
  .bar {
    height: 2px;
    width: 12px;
    border-radius: 1px;
  }

  /* ── Styles gallery ───────────────────────────────────────── */
  .styles-gallery {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 100%;
  }
  .style-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 26px;
    min-width: 70px;
    padding: 0 6px;
    border: 1px solid #d0d0d0;
    border-radius: 2px;
    background: #fff;
    cursor: pointer;
    line-height: 1.2;
    gap: 1px;
    flex-shrink: 0;
  }
  .style-btn:hover { background: #f3f2f1; border-color: #999; }
</style>
