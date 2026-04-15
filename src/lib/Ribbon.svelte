<script>
  import { onMount, tick } from 'svelte'
  import { openStates } from './uiState.js'

  const _ORD = ['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth','nineteenth','twentieth']
  const ord = n => _ORD[n] ?? `${n + 1}th`

  const TABS = ['File','Home','Insert','Layout','References','Review','View','Help']
  let activeTab = 'Home'

  // ── Undo dropdown ─────────────────────────────────────────────
  let undoDropOpen = false
  let undoBtnEl    = null
  let undoDropPos  = { top: 0, left: 0 }

  function calcUndoPos() {
    if (undoBtnEl) { const r = undoBtnEl.getBoundingClientRect(); undoDropPos = { top: r.bottom + 2, left: r.left } }
  }
  function toggleUndoDrop() { calcUndoPos(); undoDropOpen = !undoDropOpen }
  function closeUndoDrop()  { undoDropOpen = false }

  // ── Clipboard dropdown ────────────────────────────────────────
  let clipDropOpen = false
  let clipBtnEl    = null
  let clipDropPos  = { top: 0, left: 0 }

  function calcClipPos() {
    if (clipBtnEl) { const r = clipBtnEl.getBoundingClientRect(); clipDropPos = { top: r.bottom + 2, left: r.left } }
  }
  function toggleClipDrop() { calcClipPos(); clipDropOpen = !clipDropOpen }
  function closeClipDrop()  { clipDropOpen = false }

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
    if (fontSelEl) { const r = fontSelEl.getBoundingClientRect(); fontDropPos = { top: r.bottom + 2, left: r.left, width: Math.max(r.width, 200) } }
  }
  function toggleFontDrop() { calcFontPos(); fontDropOpen = !fontDropOpen }
  function closeFontDrop()  { fontDropOpen = false }

  // ── Styles dropdown ───────────────────────────────────────────
  let stylesDropOpen = false
  let stylesBtnEl    = null
  let stylesDropPos  = { top: 0, left: 0, width: 0 }

  const STYLES = [
    { name: 'Normal',        weight: 400, size: 11, color: '#242424' },
    { name: 'No Spacing',    weight: 400, size: 11, color: '#242424' },
    { name: 'Heading 1',     weight: 700, size: 16, color: '#2b579a' },
    { name: 'Heading 2',     weight: 700, size: 13, color: '#2b579a' },
    { name: 'Heading 3',     weight: 400, size: 12, color: '#2b579a', style: 'italic' },
    { name: 'Heading 4',     weight: 700, size: 11, color: '#2b579a' },
    { name: 'Title',         weight: 300, size: 20, color: '#242424' },
    { name: 'Subtitle',      weight: 400, size: 13, color: '#595959' },
    { name: 'Strong',        weight: 700, size: 11, color: '#242424' },
    { name: 'Emphasis',      weight: 400, size: 11, color: '#242424', style: 'italic' },
    { name: 'Quote',         weight: 400, size: 11, color: '#595959', style: 'italic' },
  ]

  function calcStylesPos() {
    if (stylesBtnEl) { const r = stylesBtnEl.getBoundingClientRect(); stylesDropPos = { top: r.bottom + 2, left: r.left, width: Math.max(r.width, 200) } }
  }
  function toggleStylesDrop() { calcStylesPos(); stylesDropOpen = !stylesDropOpen }
  function closeStylesDrop()  { stylesDropOpen = false }

  // ── Find dropdown ─────────────────────────────────────────────
  let findDropOpen = false
  let findBtnEl    = null
  let findDropPos  = { top: 0, left: 0 }

  function calcFindPos() {
    if (findBtnEl) { const r = findBtnEl.getBoundingClientRect(); findDropPos = { top: r.bottom + 2, left: r.left } }
  }
  function toggleFindDrop() { calcFindPos(); findDropOpen = !findDropOpen }
  function closeFindDrop()  { findDropOpen = false }

  // ── Dictate dropdown ──────────────────────────────────────────
  let dictateDropOpen = false
  let dictateBtnEl    = null
  let dictateDropPos  = { top: 0, left: 0 }

  function calcDictatePos() {
    if (dictateBtnEl) { const r = dictateBtnEl.getBoundingClientRect(); dictateDropPos = { top: r.bottom + 2, left: r.left } }
  }
  function toggleDictateDrop() { calcDictatePos(); dictateDropOpen = !dictateDropOpen }
  function closeDictateDrop()  { dictateDropOpen = false }

  // ── Auto-open from URL ─────────────────────────────────────────
  onMount(async () => {
    await new Promise(r => requestAnimationFrame(r))
    if ($openStates.has('undo-dropdown'))           { calcUndoPos();    undoDropOpen    = true }
    if ($openStates.has('clipboard-dropdown'))       { calcClipPos();    clipDropOpen    = true }
    if ($openStates.has('font-name-dropdown'))       { calcFontPos();    fontDropOpen    = true }
    if ($openStates.has('heading-style-dropdown'))   { calcStylesPos();  stylesDropOpen  = true }
    if ($openStates.has('find-dropdown'))            { calcFindPos();    findDropOpen    = true }
    if ($openStates.has('dictate-dropdown'))         { calcDictatePos(); dictateDropOpen = true }
  })
</script>

<div class="flex-shrink-0 bg-white border-b border-wd-border" alt-id="Word ribbon">

  <!-- ── Tab bar ─────────────────────────────────────────────── -->
  <div class="flex items-center h-[28px] border-b border-gray-200" alt-id="Ribbon tab navigation bar with user controls on the right">
    {#each TABS as id, i}
      <button
        class="h-[28px] px-[10px] text-[11px] border-none cursor-pointer flex items-center whitespace-nowrap
               {id === activeTab ? 'text-wd-blue border-b-2 border-wd-blue font-semibold' : 'text-wd-text border-b-2 border-transparent hover:bg-gray-100'}"
        alt-id="{id === activeTab ? `${id} ribbon tab, currently active, ${ord(i)} tab in ribbon tab bar` : `${id} ribbon tab, ${ord(i)} tab in ribbon tab bar`}"
        on:click={() => activeTab = id}
      >{id}</button>
    {/each}

    <div class="flex-1"></div>

    <div class="flex items-center gap-0.5 pr-1" alt-id="User controls in ribbon tabs row">
      <button class="uctl" alt-id="Comments button, first button in user controls group">
        <i class="fa-regular fa-comment text-wd-muted text-[11px]"></i><span>Comments</span>
      </button>
      <button class="uctl" alt-id="Catch up button, second button in user controls group">
        <i class="fa-regular fa-bell text-wd-muted text-[11px]"></i><span>Catch up</span>
      </button>
      <button class="uctl" alt-id="Editing mode dropdown button, third button in user controls group">
        <i class="fa-regular fa-pen-to-square text-wd-muted text-[11px]"></i>
        <span>Editing</span><i class="fa-regular fa-angle-down arr-icon"></i>
      </button>
      <button class="h-6 px-3 bg-wd-blue text-white text-[11px] font-semibold rounded cursor-pointer border-none hover:bg-wd-blue-dark"
        alt-id="Share document button, fourth button in user controls group">Share</button>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════════
       Toolbar row
       ══════════════════════════════════════════════════════════ -->
  {#if activeTab !== 'File'}
  <div class="flex items-center h-[36px] px-1 overflow-hidden gap-0" alt-id="Home ribbon toolbar, compact single row">

    <!-- 1. Undo (expandable) -->
    <div class="split" style="position:relative;" alt-id="Undo expandable button">
      <button class="tbtn" alt-id="Undo button, first element in toolbar" title="Undo">
        <i class="fa-regular fa-rotate-left" style="font-size:14px;"></i>
      </button>
      <button bind:this={undoBtnEl} class="split-arr" alt-id="Undo dropdown arrow" on:click={toggleUndoDrop}>
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>

      {#if undoDropOpen}
        <div style="position:fixed;inset:0;z-index:100;" on:click={closeUndoDrop} aria-hidden="true" alt-id="Overlay while undo dropdown open"></div>
        <div class="drop-panel" style="position:fixed;top:{undoDropPos.top}px;left:{undoDropPos.left}px;z-index:101;min-width:120px;" alt-id="Undo dropdown panel">
          <button class="drop-item" alt-id="Undo option, first item in undo dropdown" on:click={closeUndoDrop}>
            <i class="fa-regular fa-rotate-left drop-icon"></i><span class="drop-label">Undo</span>
          </button>
          <button class="drop-item" alt-id="Redo option, second item in undo dropdown" on:click={closeUndoDrop}>
            <i class="fa-regular fa-rotate-right drop-icon"></i><span class="drop-label">Redo</span>
          </button>
        </div>
      {/if}
    </div>

    <div class="vsep"></div>

    <!-- 2. Clipboard (expandable — split button) -->
    <div style="position:relative;" class="flex items-center flex-shrink-0" alt-id="Clipboard expandable button area">
      <div class="split" alt-id="Clipboard split button">
        <button class="tbtn" alt-id="Clipboard paste button, second element in toolbar" title="Paste">
          <svg width="15" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="4" width="11" height="13" rx="1.5" fill="#c8932a"/>
            <rect x="4" y="2.5" width="5" height="3" rx="1" fill="#a07020"/>
            <rect x="4" y="7" width="8" height="10" rx="1" fill="white" stroke="#c8c6c4" stroke-width="0.5"/>
            <rect x="5.5" y="9" width="5" height="1" rx="0.4" fill="#c8c6c4"/>
            <rect x="5.5" y="11" width="5" height="1" rx="0.4" fill="#c8c6c4"/>
            <rect x="5.5" y="13" width="3" height="1" rx="0.4" fill="#c8c6c4"/>
          </svg>
        </button>
        <button bind:this={clipBtnEl} class="split-arr" alt-id="Clipboard dropdown arrow button" on:click={toggleClipDrop}>
          <i class="fa-regular fa-angle-down arr-icon"></i>
        </button>
      </div>

      {#if clipDropOpen}
        <div style="position:fixed;inset:0;z-index:100;" on:click={closeClipDrop} aria-hidden="true" alt-id="Overlay while clipboard dropdown open"></div>
        <div class="drop-panel" style="position:fixed;top:{clipDropPos.top}px;left:{clipDropPos.left}px;z-index:101;min-width:200px;" alt-id="Clipboard dropdown panel">
          <button class="drop-item" alt-id="Cut option, first item in clipboard dropdown" on:click={closeClipDrop}>
            <i class="fa-regular fa-scissors drop-icon"></i><span class="drop-label">Cut</span><span class="drop-kbd">⌘X</span>
          </button>
          <button class="drop-item" alt-id="Copy option, second item in clipboard dropdown" on:click={closeClipDrop}>
            <i class="fa-regular fa-copy drop-icon"></i><span class="drop-label">Copy</span><span class="drop-kbd">⌘C</span>
          </button>
          <button class="drop-item" alt-id="Paste option, third item in clipboard dropdown" on:click={closeClipDrop}>
            <i class="fa-regular fa-clipboard drop-icon"></i><span class="drop-label">Paste</span><span class="drop-kbd">⌘V</span>
          </button>
          <button class="drop-item" alt-id="Paste Special option, fourth item in clipboard dropdown" on:click={closeClipDrop}>
            <i class="fa-regular fa-clipboard-list drop-icon"></i><span class="drop-label">Paste Special...</span>
          </button>
        </div>
      {/if}
    </div>

    <!-- 3. Format Painter (no dropdown) -->
    <button class="tbtn" alt-id="Format Painter button, third element in toolbar" title="Format Painter">
      <i class="fa-regular fa-paintbrush" style="font-size:14px;color:#3a6ea5;"></i>
    </button>

    <div class="vsep"></div>

    <!-- 4. Font Name (expandable via field) -->
    <div bind:this={fontSelEl} class="field-box" style="width:100px;" role="button" tabindex="0"
      alt-id="Font name selector dropdown, currently Calibri Body, fourth element in toolbar"
      on:click={toggleFontDrop} on:keydown={e => e.key === 'Enter' && toggleFontDrop()}>
      <span class="field-text">Calibri (Body)</span>
      <i class="fa-regular fa-angle-down arr-icon"></i>
    </div>

    {#if fontDropOpen}
      <div style="position:fixed;inset:0;z-index:100;" on:click={closeFontDrop} aria-hidden="true" alt-id="Overlay while font dropdown open"></div>
      <div class="drop-panel" style="position:fixed;top:{fontDropPos.top}px;left:{fontDropPos.left}px;width:{fontDropPos.width}px;z-index:101;max-height:260px;overflow-y:auto;" alt-id="Font name dropdown panel">
        {#each FONTS as font, i}
          <button class="drop-item" style="font-family:'{font}';" alt-id="Font option {font}, {ord(i)} item in font dropdown" on:click={closeFontDrop}>{font}</button>
        {/each}
      </div>
    {/if}

    <!-- 5. Font Size (expandable via field) -->
    <div class="field-box" style="width:32px;justify-content:center;" alt-id="Font size selector dropdown, currently 11, fifth element in toolbar">
      <span>11</span><i class="fa-regular fa-angle-down arr-icon"></i>
    </div>

    <!-- 6. Increase font size (no dropdown) -->
    <button class="tbtn" alt-id="Increase font size button, sixth element in toolbar" title="Increase Font Size" style="font-size:12px;font-weight:700;">
      A<sup style="font-size:7px;vertical-align:super;">+</sup>
    </button>

    <!-- 7. Decrease font size (no dropdown) -->
    <button class="tbtn" alt-id="Decrease font size button, seventh element in toolbar" title="Decrease Font Size" style="font-size:10px;font-weight:700;">
      A<sup style="font-size:7px;vertical-align:super;">−</sup>
    </button>

    <div class="vsep"></div>

    <!-- 8. Bold (no dropdown) -->
    <button class="tbtn" alt-id="Bold formatting button, eighth element in toolbar" title="Bold" style="font-weight:800;font-size:14px;">B</button>

    <!-- 9. Italic (no dropdown) -->
    <button class="tbtn" alt-id="Italic formatting button, ninth element in toolbar" title="Italic" style="font-style:italic;font-size:14px;font-weight:600;">I</button>

    <!-- 10. Underline (no dropdown) -->
    <button class="tbtn" alt-id="Underline formatting button, tenth element in toolbar" title="Underline">
      <span class="u-letter">U</span>
    </button>

    <div class="vsep"></div>

    <!-- 11. Highlight (expandable — split button) -->
    <div class="split" alt-id="Highlight color split button">
      <button class="tbtn" alt-id="Highlight color button, eleventh element in toolbar" title="Highlight Color">
        <span class="color-ic"><span style="font-size:13px;">A</span><span class="bar" style="background:#ffd000;"></span></span>
      </button>
      <button class="split-arr" alt-id="Highlight color dropdown arrow button">
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>
    </div>

    <!-- 12. Font color (expandable — split button) -->
    <div class="split" alt-id="Font color split button">
      <button class="tbtn" alt-id="Font color button, twelfth element in toolbar" title="Font Color">
        <span class="color-ic"><span style="font-size:13px;">A</span><span class="bar" style="background:#e74c3c;"></span></span>
      </button>
      <button class="split-arr" alt-id="Font color dropdown arrow button">
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>
    </div>

    <!-- 13. Clear formatting (no dropdown) -->
    <button class="tbtn" alt-id="Clear formatting button, thirteenth element in toolbar" title="Clear All Formatting">
      <i class="fa-regular fa-text-slash" style="font-size:13px;"></i>
    </button>

    <!-- 14. More font options (overflow dots) -->
    <button class="tbtn-dots" alt-id="More font options button, fourteenth element in toolbar" title="More Font Options">···</button>

    <div class="vsep"></div>

    <!-- 15. Bulleted Library (expandable — split button) -->
    <div class="split" alt-id="Bulleted list library split button">
      <button class="tbtn" alt-id="Bulleted list button, fifteenth element in toolbar" title="Bullets">
        <i class="fa-regular fa-list-ul" style="font-size:13px;"></i>
      </button>
      <button class="split-arr" alt-id="Bulleted list library dropdown arrow button">
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>
    </div>

    <!-- 16. Numbering Library (expandable — split button) -->
    <div class="split" alt-id="Numbering list library split button">
      <button class="tbtn" alt-id="Numbering list button, sixteenth element in toolbar" title="Numbering">
        <i class="fa-regular fa-list-ol" style="font-size:13px;"></i>
      </button>
      <button class="split-arr" alt-id="Numbering list library dropdown arrow button">
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>
    </div>

    <!-- 17. Checklist (no dropdown) -->
    <button class="tbtn" alt-id="Checklist button, seventeenth element in toolbar" title="Checklist">
      <i class="fa-regular fa-square-check" style="font-size:13px;"></i>
    </button>

    <!-- 18. Decrease list level (no dropdown) -->
    <button class="tbtn" alt-id="Decrease list level button, eighteenth element in toolbar" title="Decrease List Level">
      <i class="fa-regular fa-outdent" style="font-size:13px;"></i>
    </button>

    <!-- 19. Increase list level (no dropdown) -->
    <button class="tbtn" alt-id="Increase list level button, nineteenth element in toolbar" title="Increase List Level">
      <i class="fa-regular fa-indent" style="font-size:13px;"></i>
    </button>

    <div class="vsep"></div>

    <!-- 20. Text Alignment (expandable — split button) -->
    <div class="split" alt-id="Text alignment library split button">
      <button class="tbtn" alt-id="Text alignment button, twentieth element in toolbar" title="Text Alignment">
        <i class="fa-regular fa-align-left" style="font-size:13px;"></i>
      </button>
      <button class="split-arr" alt-id="Text alignment dropdown arrow button">
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>
    </div>

    <!-- 21. Border library (expandable — split button) -->
    <div class="split" alt-id="Border library split button">
      <button class="tbtn" alt-id="Border button, 21st element in toolbar" title="Borders">
        <i class="fa-regular fa-border-all" style="font-size:13px;"></i>
      </button>
      <button class="split-arr" alt-id="Border library dropdown arrow button">
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>
    </div>

    <!-- 22. Paragraph Shading (expandable — split button) -->
    <div class="split" alt-id="Paragraph shading split button">
      <button class="tbtn" alt-id="Paragraph shading button, 22nd element in toolbar" title="Shading">
        <span class="color-ic"><i class="fa-regular fa-fill-drip" style="font-size:12px;"></i><span class="bar" style="background:#ffd000;"></span></span>
      </button>
      <button class="split-arr" alt-id="Paragraph shading dropdown arrow button">
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>
    </div>

    <!-- 23. Line spacing (expandable — split button) -->
    <div class="split" alt-id="Line spacing split button">
      <button class="tbtn" alt-id="Line spacing button, 23rd element in toolbar" title="Line and Paragraph Spacing">
        <i class="fa-regular fa-line-height" style="font-size:13px;"></i>
      </button>
      <button class="split-arr" alt-id="Line spacing dropdown arrow button">
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>
    </div>

    <!-- 24. Paragraph options (no dropdown) -->
    <button class="tbtn" alt-id="Paragraph options button, 24th element in toolbar" title="Paragraph Settings">
      <i class="fa-regular fa-sliders" style="font-size:13px;"></i>
    </button>

    <!-- 25. More paragraph options (overflow dots) -->
    <button class="tbtn-dots" alt-id="More paragraph options button, 25th element in toolbar" title="More Paragraph Options">···</button>

    <div class="vsep"></div>

    <!-- 26. Heading and other styles (expandable) -->
    <div style="position:relative;" class="flex items-center flex-shrink-0" alt-id="Heading and styles expandable button area">
      <button bind:this={stylesBtnEl} class="field-box" style="min-width:90px;" alt-id="Heading and other styles expandable dropdown, 26th element in toolbar" on:click={toggleStylesDrop}>
        <span class="field-text">Heading 1</span>
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>

      {#if stylesDropOpen}
        <div style="position:fixed;inset:0;z-index:100;" on:click={closeStylesDrop} aria-hidden="true" alt-id="Overlay while styles dropdown open"></div>
        <div class="drop-panel" style="position:fixed;top:{stylesDropPos.top}px;left:{stylesDropPos.left}px;width:{stylesDropPos.width}px;z-index:101;" alt-id="Heading and styles dropdown panel">
          {#each STYLES as s, i}
            <button
              class="drop-item"
              style="font-weight:{s.weight};font-size:{Math.min(s.size, 13)}px;{s.color ? `color:${s.color};` : ''}{s.style ? `font-style:${s.style};` : ''}"
              alt-id="{s.name} style option, {ord(i)} item in styles dropdown"
              on:click={closeStylesDrop}
            >{s.name}</button>
          {/each}
        </div>
      {/if}
    </div>

    <div class="vsep"></div>

    <!-- 27. Find (expandable) -->
    <div class="split flex-shrink-0" style="position:relative;" alt-id="Find expandable button">
      <button class="tbtn-txt" alt-id="Find action button, 27th element in toolbar" title="Find">
        <i class="fa-regular fa-magnifying-glass" style="font-size:12px;color:#605e5c;"></i>
        Find
      </button>
      <button bind:this={findBtnEl} class="split-arr" alt-id="Find dropdown arrow" on:click={toggleFindDrop}>
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>

      {#if findDropOpen}
        <div style="position:fixed;inset:0;z-index:100;" on:click={closeFindDrop} aria-hidden="true" alt-id="Overlay while find dropdown open"></div>
        <div class="drop-panel" style="position:fixed;top:{findDropPos.top}px;left:{findDropPos.left}px;z-index:101;min-width:180px;" alt-id="Find dropdown panel">
          <button class="drop-item" alt-id="Find option, first item in find dropdown" on:click={closeFindDrop}>
            <i class="fa-regular fa-magnifying-glass drop-icon"></i><span class="drop-label">Find</span><span class="drop-kbd">⌘F</span>
          </button>
          <button class="drop-item" alt-id="Replace option, second item in find dropdown" on:click={closeFindDrop}>
            <i class="fa-regular fa-right-left drop-icon"></i><span class="drop-label">Replace</span><span class="drop-kbd">⌘H</span>
          </button>
          <button class="drop-item" alt-id="Go To option, third item in find dropdown" on:click={closeFindDrop}>
            <i class="fa-regular fa-arrow-right drop-icon"></i><span class="drop-label">Go To...</span>
          </button>
        </div>
      {/if}
    </div>

    <!-- 28. Dictate (expandable) -->
    <div class="split flex-shrink-0" style="position:relative;" alt-id="Dictate expandable button">
      <button class="tbtn-txt" alt-id="Dictate action button, 28th element in toolbar" title="Dictate">
        <i class="fa-solid fa-microphone" style="font-size:12px;color:#c8372d;"></i>
        Dictate
      </button>
      <button bind:this={dictateBtnEl} class="split-arr" alt-id="Dictate dropdown arrow" on:click={toggleDictateDrop}>
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>

      {#if dictateDropOpen}
        <div style="position:fixed;inset:0;z-index:100;" on:click={closeDictateDrop} aria-hidden="true" alt-id="Overlay while dictate dropdown open"></div>
        <div class="drop-panel" style="position:fixed;top:{dictateDropPos.top}px;left:{dictateDropPos.left}px;z-index:101;min-width:160px;" alt-id="Dictate dropdown panel">
          <button class="drop-item" alt-id="Dictate option, first item in dictate dropdown" on:click={closeDictateDrop}>
            <i class="fa-solid fa-microphone drop-icon" style="color:#c8372d;"></i><span class="drop-label">Dictate</span>
          </button>
          <button class="drop-item" alt-id="Transcribe option, second item in dictate dropdown" on:click={closeDictateDrop}>
            <i class="fa-regular fa-file-audio drop-icon"></i><span class="drop-label">Transcribe</span>
          </button>
        </div>
      {/if}
    </div>

    <!-- 29. Editor (no dropdown) -->
    <button class="tbtn-txt flex-shrink-0" alt-id="Editor button, 29th element in toolbar">
      <i class="fa-regular fa-spell-check" style="font-size:12px;"></i>
      Editor
    </button>

    <!-- 30. Add-ins (expandable — split button) -->
    <div class="split flex-shrink-0" alt-id="Add-ins split button">
      <button class="tbtn-txt" alt-id="Add-ins button, 30th element in toolbar">
        <i class="fa-regular fa-puzzle-piece" style="font-size:12px;"></i>
        Add-ins
      </button>
      <button class="split-arr" alt-id="Add-ins dropdown arrow button">
        <i class="fa-regular fa-angle-down arr-icon"></i>
      </button>
    </div>

    <!-- spacer to push more-options arrow to far right -->
    <div class="flex-1"></div>

    <!-- 31. More options arrow at the very right -->
    <button class="tbtn flex-shrink-0" alt-id="More toolbar options arrow button, last element at far right of toolbar" title="More Options">
      <i class="fa-regular fa-angle-down" style="font-size:10px;color:#605e5c;"></i>
    </button>

  </div>
  {/if}

</div>

<style>
  .arr-icon {
    font-size: 8px !important;
    color: #605e5c;
    flex-shrink: 0;
  }

  .uctl {
    display: flex;
    align-items: center;
    height: 24px;
    padding: 0 6px;
    gap: 4px;
    font-size: 11px;
    color: #242424;
    border-radius: 3px;
    border: none;
    background: none;
    cursor: pointer;
    white-space: nowrap;
  }
  .uctl:hover { background: #f0f0f0; }

  .tbtn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 28px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 3px;
    padding: 0 3px;
    color: #242424;
    font-size: 13px;
    gap: 2px;
    flex-shrink: 0;
  }
  .tbtn:hover { background: #e8e8e8; }

  .tbtn-txt {
    display: flex;
    align-items: center;
    height: 28px;
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
  .tbtn-txt:hover { background: #e8e8e8; }

  .split {
    display: flex;
    align-items: center;
    height: 28px;
    border-radius: 3px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .split-arr {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 28px;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  }
  .split-arr:hover { background: #e8e8e8; }

  .tbtn-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 28px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 3px;
    padding: 0 1px;
    color: #888;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    flex-shrink: 0;
  }
  .tbtn-dots:hover { background: #e8e8e8; }

  .vsep {
    width: 1px;
    height: 18px;
    background: #d8d8d8;
    margin: 0 3px;
    flex-shrink: 0;
  }

  .field-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #c8c6c4;
    border-radius: 2px;
    background: #fff;
    height: 22px;
    padding: 0 4px 0 6px;
    cursor: pointer;
    gap: 3px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .field-box:hover { border-color: #888; }
  .field-text {
    font-size: 11px;
    color: #242424;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }

  .u-letter {
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-decoration: underline;
    text-decoration-color: #e74c3c;
    text-underline-offset: 2px;
    text-decoration-thickness: 2px;
  }

  .color-ic {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
  }
  .bar {
    height: 3px;
    width: 12px;
    border-radius: 1px;
    margin-top: 0px;
  }

  .drop-panel {
    background: #ffffff;
    border: 1px solid #d0d0d0;
    box-shadow: 2px 4px 10px rgba(0,0,0,0.15);
    border-radius: 3px;
    padding: 3px 0;
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
  .drop-icon  { font-size: 12px; color: #605e5c; width: 14px; flex-shrink: 0; }
  .drop-label { flex: 1; }
  .drop-kbd   { font-size: 10px; color: #888; }
</style>
