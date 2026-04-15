<script>
  // Simulated page state — current page
  let currentPage = 1
  const totalPages = 2
</script>

<!-- Document canvas — scrollable gray area -->
<div
  class="flex-1 bg-[#ebebeb] overflow-auto flex flex-col items-center py-6 gap-6"
  alt-id="Word document scrollable canvas area"
>

  <!-- ── PAGE 1 ─────────────────────────────────────────────── -->
  <div
    class="word-page shadow-md"
    alt-id="Word document page 1 of 2"
  >
    <!-- Ruler indicator (left) shown by small icon in screenshot -->
    <div class="page-body" alt-id="Word document page 1 body content area">

      <!-- Sample Document Title -->
      <h1
        class="doc-title"
        alt-id="Sample Document title heading, page 1 title, document heading"
      >
        Sample Document
      </h1>

      <!-- Intro paragraph -->
      <p class="doc-p" alt-id="Document introduction paragraph, first paragraph in Sample Document">
        This document was created using accessibility techniques for headings, lists, image alternate text, tables,
        and columns. It should be completely accessible using assistive technologies such as screen readers.
      </p>

      <!-- Headings section -->
      <h2
        class="doc-h2"
        alt-id="Headings section heading, first section heading in Sample Document"
      >
        Headings
      </h2>
      <p class="doc-p" alt-id="Headings section body text in Sample Document">
        There are eight section headings in this document. At the beginning, "Sample Document" is a
        <span style="color:#2b579a;text-decoration:underline;cursor:pointer;">level 1</span> heading.
        The main section headings, such as "Headings" and "Lists" are level 2 headings. The Tables
        section contains two sub-headings, "Simple Tables" and "Complex Tables", which are both level 3
        headings.
      </p>

      <!-- Lists section -->
      <h2
        class="doc-h2"
        alt-id="Lists section heading, second section heading in Sample Document"
      >
        Lists
      </h2>
      <p class="doc-p" alt-id="Lists section introductory paragraph in Sample Document">
        The following outline of the sections of this document is an ordered (numbered) list with six items. The
        fifth item, "Tables," contains a nested unordered (bulleted) list with two items.
      </p>

      <!-- Numbered list -->
      <ol class="doc-ol" alt-id="Numbered list of document sections in Lists section">
        <li alt-id="Headings list item, first item in numbered sections list">Headings</li>
        <li alt-id="Lists list item, second item in numbered sections list">Lists</li>
        <li alt-id="Links list item, third item in numbered sections list">Links</li>
        <li alt-id="Images list item, fourth item in numbered sections list">Images</li>
        <li alt-id="Tables list item, fifth item in numbered sections list">
          Tables
          <ul class="doc-ul" alt-id="Nested bullet list under Tables item">
            <li alt-id="Simple Tables sub-item, first item in nested Tables bullet list">Simple Tables</li>
            <li alt-id="Complex Tables sub-item, second item in nested Tables bullet list">Complex Tables</li>
          </ul>
        </li>
        <li alt-id="Columns list item, sixth item in numbered sections list">Columns</li>
      </ol>

      <!-- Links section -->
      <h2
        class="doc-h2"
        alt-id="Links section heading, third section heading in Sample Document"
      >
        Links
      </h2>
      <p class="doc-p" alt-id="Links section body text in Sample Document">
        In web documents, links can point different locations on the page, different pages, or even
        downloadable documents, such as Word documents or PDFs.
      </p>
      <p class="doc-p" style="margin-bottom:2px;" alt-id="Top of this Page link in links section">
        <button class="doc-link" alt-id="Top of this Page hyperlink in links section, first link">Top of this Page</button>
      </p>
      <p class="doc-p" style="margin-bottom:2px;" alt-id="Sample Document link in links section">
        <button class="doc-link" alt-id="Sample Document hyperlink in links section, second link">Sample Document</button>
      </p>
      <p class="doc-p" style="margin-bottom:8px;" alt-id="Sample Document Word file download link in links section">
        <button class="doc-link" alt-id="Sample Document Word file download hyperlink in links section, third link">Sample Document Word</button>
      </p>

      <!-- Images section -->
      <h2
        class="doc-h2"
        alt-id="Images section heading, fourth section heading in Sample Document"
      >
        Images
      </h2>

      <!-- Image + caption row -->
      <div class="flex gap-4 items-start mb-3" alt-id="Images section content with icon and caption">
        <!-- Icon image placeholder -->
        <div
          class="flex-shrink-0 w-[72px] h-[72px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded flex items-center justify-center border border-gray-300"
          alt-id="Web Accessibility icon image in Images section, circular logo with number 1"
        >
          <div class="flex flex-col items-center justify-center">
            <div class="w-8 h-8 rounded-full bg-[#c8372d] flex items-center justify-center text-white text-xs font-bold mb-0.5">1</div>
            <div class="text-[6px] text-gray-400 uppercase tracking-wider">ACCESS</div>
          </div>
        </div>

        <!-- Caption text -->
        <p class="doc-p" alt-id="Images section caption text, description of web accessibility icon">
          Documents may contain images. For example, there is an image of the web
          accessibility symbol to the left of this paragraph. Its alternate text is "Web
          Access Symbol."
        </p>
      </div>

      <p class="doc-p" alt-id="Alt text guidance paragraph in Images section">
        All text should communicate what an image conveys, not how it looks.
      </p>

    </div>
  </div>

  <!-- ── PAGE 2 ─────────────────────────────────────────────── -->
  <div
    class="word-page shadow-md"
    alt-id="Word document page 2 of 2"
  >
    <div class="page-body" alt-id="Word document page 2 body content area">

      <!-- Pie chart section (continuation) -->
      <div class="flex gap-6 items-start mb-6" alt-id="Pie chart and legend section on page 2">
        <!-- Pie chart placeholder -->
        <div
          class="flex-shrink-0 w-[110px] h-[110px] relative"
          alt-id="Pie chart image showing screen reader market share on page 2"
        >
          <svg viewBox="0 0 100 100" width="110" height="110">
            <!-- JAWS - blue ~34% -->
            <path d="M50,50 L50,5 A45,45 0 0,1 89.6,27.5 Z" fill="#4472c4"/>
            <!-- NVDA - red ~19% -->
            <path d="M50,50 L89.6,27.5 A45,45 0 0,1 88.9,74.7 Z" fill="#ed7d31"/>
            <!-- Window-Eyes - green ~14% -->
            <path d="M50,50 L88.9,74.7 A45,45 0 0,1 66.2,93.8 Z" fill="#a9d18e"/>
            <!-- System Access - dark ~13% -->
            <path d="M50,50 L66.2,93.8 A45,45 0 0,1 28.4,92.0 Z" fill="#44546a"/>
            <!-- VoiceOver ~8% -->
            <path d="M50,50 L28.4,92.0 A45,45 0 0,1 5.0,50.0 Z" fill="#ffc000"/>
            <!-- Other - gray ~12% -->
            <path d="M50,50 L5.0,50.0 A45,45 0 0,1 50.0,5.0 Z" fill="#7030a0"/>
          </svg>
        </div>

        <!-- Legend -->
        <div class="flex flex-col gap-1 text-[10px]" alt-id="Pie chart legend on page 2">
          <div class="flex items-center gap-1" alt-id="JAWS legend item, first item in pie chart legend">
            <span class="w-3 h-3 inline-block flex-shrink-0" style="background:#4472c4;"></span>
            <span>JAWS</span>
          </div>
          <div class="flex items-center gap-1" alt-id="NVDA legend item, second item in pie chart legend">
            <span class="w-3 h-3 inline-block flex-shrink-0" style="background:#ed7d31;"></span>
            <span>NVDA</span>
          </div>
          <div class="flex items-center gap-1" alt-id="Window-Eyes legend item, third item in pie chart legend">
            <span class="w-3 h-3 inline-block flex-shrink-0" style="background:#a9d18e;"></span>
            <span>Window-Eyes</span>
          </div>
          <div class="flex items-center gap-1" alt-id="System Access legend item, fourth item in pie chart legend">
            <span class="w-3 h-3 inline-block flex-shrink-0" style="background:#44546a;"></span>
            <span>System Access</span>
          </div>
          <div class="flex items-center gap-1" alt-id="VoiceOver legend item, fifth item in pie chart legend">
            <span class="w-3 h-3 inline-block flex-shrink-0" style="background:#ffc000;"></span>
            <span>VoiceOver</span>
          </div>
        </div>

        <!-- Description text beside chart -->
        <p class="doc-p" alt-id="Screen reader market share description text beside pie chart on page 2">
          Some images, such as charts or graphs, require long descriptions, but not all document types allow this.
          In web pages, long descriptions may be provided in several ways: on the page below the image, as a link
          below the image, or as a link on the image.
        </p>
      </div>

      <!-- Tables section -->
      <h2
        class="doc-h2"
        alt-id="Tables section heading, fifth section heading in Sample Document, page 2"
      >
        Tables
      </h2>

      <!-- Simple Tables sub-heading -->
      <h3
        class="doc-h3"
        alt-id="Simple Tables sub-heading, first sub-heading in Tables section on page 2"
      >
        Simple Tables
      </h3>
      <p class="doc-p" alt-id="Simple Tables description paragraph on page 2">
        Simple tables have a uniform number of columns and rows, without any merged cells.
      </p>

      <!-- Simple table -->
      <table class="doc-table" alt-id="Simple tables data table in Tables section on page 2">
        <thead alt-id="Simple tables table header row">
          <tr>
            <th class="doc-th" alt-id="Screen Reader column header, first column header in simple tables table">Screen Reader</th>
            <th class="doc-th" alt-id="Responses column header, second column header in simple tables table">Responses</th>
            <th class="doc-th" alt-id="Share column header, third column header in simple tables table">Share</th>
          </tr>
        </thead>
        <tbody>
          <tr alt-id="JAWS data row, first data row in simple tables table">
            <td class="doc-td" alt-id="JAWS screen reader cell, row label in first data row of simple tables table">JAWS</td>
            <td class="doc-td" alt-id="JAWS responses value cell, 853 in first data row of simple tables table">853</td>
            <td class="doc-td" alt-id="JAWS share value cell, 49% in first data row of simple tables table">49%</td>
          </tr>
          <tr alt-id="NVDA data row, second data row in simple tables table">
            <td class="doc-td" alt-id="NVDA screen reader cell, row label in second data row of simple tables table">NVDA</td>
            <td class="doc-td" alt-id="NVDA responses value cell in second data row of simple tables table">546</td>
            <td class="doc-td" alt-id="NVDA share value cell in second data row of simple tables table">31%</td>
          </tr>
          <tr alt-id="Window-Eyes data row, third data row in simple tables table">
            <td class="doc-td" alt-id="Window-Eyes screen reader cell, row label in third data row of simple tables table">Window-Eyes</td>
            <td class="doc-td" alt-id="Window-Eyes responses value cell in third data row of simple tables table">233</td>
            <td class="doc-td" alt-id="Window-Eyes share value cell in third data row of simple tables table">13%</td>
          </tr>
          <tr alt-id="VoiceOver data row, fourth data row in simple tables table">
            <td class="doc-td" alt-id="VoiceOver screen reader cell, row label in fourth data row of simple tables table">VoiceOver</td>
            <td class="doc-td" alt-id="VoiceOver responses value cell in fourth data row of simple tables table">125</td>
            <td class="doc-td" alt-id="VoiceOver share value cell in fourth data row of simple tables table">7%</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>

</div>

<style>
  .word-page {
    width: 680px;
    min-height: 880px;
    background: #ffffff;
    flex-shrink: 0;
  }

  .page-body {
    padding: 72px 90px 72px 90px;
    min-height: 880px;
  }

  /* ── Typography ───────────────────────────────────────────── */
  .doc-title {
    font-size: 22px;
    font-weight: 300;
    color: #c8372d;
    margin-bottom: 10px;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }

  .doc-h2 {
    font-size: 14px;
    font-weight: 700;
    color: #2b579a;
    margin-top: 18px;
    margin-bottom: 6px;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }

  .doc-h3 {
    font-size: 12px;
    font-weight: 700;
    color: #2b579a;
    margin-top: 12px;
    margin-bottom: 4px;
    font-family: 'Segoe UI', system-ui, sans-serif;
  }

  .doc-p {
    font-size: 11px;
    line-height: 1.6;
    color: #242424;
    margin-bottom: 8px;
    font-family: 'Calibri', 'Segoe UI', sans-serif;
  }

  .doc-link {
    color: #2b579a;
    text-decoration: underline;
    cursor: pointer;
    font-size: 11px;
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
  }

  .doc-ol {
    font-size: 11px;
    line-height: 1.7;
    color: #242424;
    padding-left: 28px;
    margin-bottom: 8px;
    font-family: 'Calibri', 'Segoe UI', sans-serif;
    list-style-type: decimal;
  }

  .doc-ul {
    font-size: 11px;
    line-height: 1.7;
    color: #242424;
    padding-left: 20px;
    margin-top: 2px;
    list-style-type: disc;
  }

  /* ── Table ────────────────────────────────────────────────── */
  .doc-table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 12px;
    font-size: 11px;
    font-family: 'Calibri', 'Segoe UI', sans-serif;
  }

  .doc-th {
    background: #2b579a;
    color: #ffffff;
    font-weight: 600;
    padding: 5px 10px;
    text-align: left;
    border: 1px solid #1e3f6f;
    font-size: 11px;
  }

  .doc-td {
    padding: 4px 10px;
    border: 1px solid #c8c6c4;
    color: #242424;
    font-size: 11px;
  }

  tr:nth-child(even) .doc-td {
    background: #dce6f1;
  }
</style>
