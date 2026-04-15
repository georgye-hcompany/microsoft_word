<script>
  import Ribbon   from './lib/Ribbon.svelte'
  import Document from './lib/Document.svelte'
</script>

<div class="flex flex-col h-screen overflow-hidden bg-white" alt-id="Microsoft Word application window">

  <!-- ── Title bar ──────────────────────────────────────────── -->
  <div
    class="flex items-center h-8 px-2 bg-white flex-shrink-0 gap-1 border-b border-gray-100"
    alt-id="Word application title bar"
  >
    <!-- Word logo -->
    <div class="w-8 h-8 flex items-center justify-center flex-shrink-0" alt-id="Microsoft Word application logo icon">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="22" height="22" rx="2" fill="#2b579a"/>
        <text x="4" y="16" font-size="14" font-weight="700" fill="white" font-family="Georgia,serif">W</text>
      </svg>
    </div>

    <!-- Quick access toolbar -->
    <div class="flex items-center gap-0.5" alt-id="Quick access toolbar in Word title bar">
      <button
        class="w-[26px] h-[26px] flex items-center justify-center rounded text-wd-muted text-sm hover:bg-gray-100 border-none bg-transparent cursor-pointer"
        alt-id="AutoSave toggle button in quick access toolbar, first button in quick access toolbar"
        title="AutoSave"
      >
        <i class="fa-regular fa-cloud-arrow-up" style="font-size:13px;"></i>
      </button>
      <button
        class="w-[26px] h-[26px] flex items-center justify-center rounded text-wd-muted text-sm hover:bg-gray-100 border-none bg-transparent cursor-pointer"
        alt-id="Save button in quick access toolbar, second button in quick access toolbar"
        title="Save"
      >
        <i class="fa-regular fa-floppy-disk" style="font-size:13px;"></i>
      </button>
      <button
        class="w-[26px] h-[26px] flex items-center justify-center rounded text-wd-muted text-sm hover:bg-gray-100 border-none bg-transparent cursor-pointer"
        alt-id="Undo quick access toolbar button, third button in quick access toolbar"
        title="Undo"
      >
        <i class="fa-regular fa-arrow-rotate-left"></i>
      </button>
      <button
        class="w-[26px] h-[26px] flex items-center justify-center rounded text-wd-muted text-sm hover:bg-gray-100 border-none bg-transparent cursor-pointer"
        alt-id="Redo quick access toolbar button, fourth button in quick access toolbar"
        title="Redo"
      >
        <i class="fa-regular fa-arrow-rotate-right"></i>
      </button>
    </div>

    <!-- Document name (tab style) -->
    <div class="flex items-center gap-1 px-2 h-7" alt-id="Document name tab area in title bar">
      <span
        class="text-[12px] text-wd-text font-medium"
        alt-id="Document title showing sample1"
      >
        sample1
      </span>
    </div>

    <!-- Search (centered) -->
    <div class="flex-1 flex items-center justify-center" alt-id="Document title and search center area">
      <div
        class="flex items-center bg-gray-100 rounded-2xl px-4 py-1 gap-2 min-w-[260px] text-[11px] text-wd-muted cursor-text hover:border hover:border-gray-300 hover:bg-white"
        alt-id="Word search bar, search for tools help and more"
      >
        <i class="fa-regular fa-magnifying-glass text-[13px]"></i>
        <span>Search for tools, help, and more (Option ⌘)</span>
      </div>
    </div>

    <!-- Right: user avatar + controls -->
    <div class="flex items-center gap-1" alt-id="Title bar right area with user controls">
      <!-- Settings / notifications -->
      <button
        class="w-[26px] h-[26px] flex items-center justify-center rounded text-wd-muted hover:bg-gray-100 border-none bg-transparent cursor-pointer"
        alt-id="Settings or notifications button in title bar, first button in title bar right area"
        title="Settings"
      >
        <i class="fa-regular fa-gear text-[13px]"></i>
      </button>

      <!-- User avatar -->
      <div
        class="w-7 h-7 rounded-full bg-[#6264a7] flex items-center justify-center text-white text-[11px] font-bold cursor-pointer flex-shrink-0"
        alt-id="User profile avatar button, user initials YG"
      >
        Y
      </div>
    </div>
  </div>

  <!-- ── Ribbon ──────────────────────────────────────────────── -->
  <Ribbon />

  <!-- ── Outline / Navigation pane toggle + doc area ─────────── -->
  <div class="flex flex-1 overflow-hidden" alt-id="Document content area with optional navigation pane">

    <!-- Left mini outline strip (visible in screenshot as thin icon strip) -->
    <div
      class="flex-shrink-0 w-[22px] bg-[#f3f3f3] border-r border-wd-border flex flex-col items-center pt-2 gap-1"
      alt-id="Left sidebar toggle strip in document area"
    >
      <button
        class="w-5 h-5 flex items-center justify-center text-wd-muted rounded hover:bg-gray-200 border-none bg-transparent cursor-pointer text-[11px] font-bold"
        alt-id="Document navigation outline toggle button, page outline icon"
        title="Navigation Pane"
      >
        <i class="fa-regular fa-bars" style="font-size:10px;"></i>
      </button>
    </div>

    <!-- ── Scrollable document canvas ───────────────────────── -->
    <Document />
  </div>

  <!-- ── Status bar ─────────────────────────────────────────── -->
  <div
    class="flex items-center h-5 px-2 bg-[#2b579a] text-white text-[11px] flex-shrink-0 gap-3"
    alt-id="Word document status bar"
  >
    <!-- Left: page / word count / language -->
    <span alt-id="Page indicator showing Page 1 of 2 in status bar, first element in status bar">Page 1 of 2</span>
    <span class="text-[#c7d9f5]" aria-hidden="true">|</span>
    <span alt-id="Word count showing 441 words in status bar, second element in status bar">441 words</span>
    <span class="text-[#c7d9f5]" aria-hidden="true">|</span>
    <span alt-id="Language indicator showing English US in status bar, third element in status bar">English (US)</span>
    <span class="text-[#c7d9f5]" aria-hidden="true">|</span>
    <span alt-id="Track changes status indicator in status bar, fourth element in status bar">
      <i class="fa-regular fa-check-circle text-[10px]"></i>
      Track Changes: Off
    </span>

    <div class="flex-1"></div>

    <!-- Right: Editor suggestions, view controls, zoom -->
    <button
      class="flex items-center gap-1 text-[11px] text-white hover:text-white/80 border-none bg-transparent cursor-pointer"
      alt-id="Editor suggestions button in status bar, first button in status bar right controls"
    >
      <i class="fa-regular fa-pen-nib text-[10px]"></i>
      Editor Suggestions: Showing
    </button>

    <span class="text-[#c7d9f5]" aria-hidden="true">|</span>

    <!-- View mode buttons -->
    <div class="flex items-center gap-0.5" alt-id="Document view mode buttons in status bar right area">
      <button
        class="w-5 h-4 flex items-center justify-center text-white hover:bg-white/20 rounded border-none bg-transparent cursor-pointer"
        alt-id="Print Layout view button in status bar, first view mode button"
        title="Print Layout"
      >
        <i class="fa-regular fa-file" style="font-size:10px;"></i>
      </button>
      <button
        class="w-5 h-4 flex items-center justify-center text-white hover:bg-white/20 rounded border-none bg-transparent cursor-pointer"
        alt-id="Read Mode view button in status bar, second view mode button"
        title="Read Mode"
      >
        <i class="fa-regular fa-book-open" style="font-size:10px;"></i>
      </button>
      <button
        class="w-5 h-4 flex items-center justify-center text-white hover:bg-white/20 rounded border-none bg-transparent cursor-pointer"
        alt-id="Web Layout view button in status bar, third view mode button"
        title="Web Layout"
      >
        <i class="fa-regular fa-globe" style="font-size:10px;"></i>
      </button>
    </div>

    <span class="text-[#c7d9f5]" aria-hidden="true">|</span>

    <!-- Zoom -->
    <button
      class="text-[11px] text-white cursor-pointer px-1 rounded hover:bg-white/20 border-none bg-transparent"
      alt-id="Zoom percentage button showing 100 percent in status bar"
    >
      100%
    </button>
    <input
      type="range"
      min="10" max="400" value="100"
      class="w-[60px] cursor-pointer"
      style="accent-color:#ffffff;"
      alt-id="Zoom level slider in status bar"
      aria-label="Zoom"
    />
  </div>

</div>
