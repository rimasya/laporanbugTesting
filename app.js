/* BugHunt Lab — intentionally imperfect practice app.
   Four functional defects are planted for students to discover.
   This is a static demo; no file is uploaded and no data leaves the browser. */
const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "bughuntlab_reports_v1";
const submissionForm = $("submission-form");
const reportForm = $("report-form");
let lastSubmission = null;

function localTime() {
  return new Date().toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
}

$("file-input").addEventListener("change", () => {
  const file = $("file-input").files[0];
  $("file-info").textContent = file
    ? `${file.name} · ${(file.size / (1024 * 1024)).toFixed(2)} MB`
    : "Belum ada file dipilih.";
});

submissionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("student-name").value.trim();
  const className = $("student-class").value;
  const assignment = $("assignment").value;
  const file = $("file-input").files[0];

  if (!name || !className || !assignment || !file) {
    $("form-message").textContent = "Lengkapi semua data sebelum mengirim.";
    return;
  }

  // PLANTED DEFECT 1: file type is not validated against actual extension here.
  // PLANTED DEFECT 2: file size is not checked against the stated 10 MB limit.
  // PLANTED DEFECT 3: the deadline is shown in the rules but not enforced.
  // PLANTED DEFECT 4: repeated submissions are allowed; no duplicate guard exists.

  lastSubmission = {
    name, className, assignment,
    filename: file.name,
    size: file.size,
    submittedAt: new Date().toISOString()
  };

  $("form-message").textContent = "Pengumpulan berhasil disimpan (simulasi).";
  $("submission-status").textContent = "Terkirim";
  $("submission-time").textContent = localTime();
});

function getReports() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch (_) { return []; }
}
function setReports(reports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[c]));
}
function renderReports() {
  const tbody = $("reports-table");
  const reports = getReports();
  if (!reports.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty">Belum ada laporan. Tambahkan temuan melalui formulir di atas.</td></tr>';
    return;
  }
  tbody.innerHTML = reports.slice().reverse().map(r => {
    const sev = r.severity.toLowerCase();
    return `<tr>
      <td>${escapeHTML(r.id)}</td>
      <td>${escapeHTML(r.title)}</td>
      <td><span class="severity sev-${escapeHTML(sev)}">${escapeHTML(r.severity)}</span></td>
      <td>${escapeHTML(r.priority)}</td>
      <td>New</td>
      <td>${escapeHTML(r.createdAt)}</td>
    </tr>`;
  }).join("");
}
reportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reports = getReports();
  const report = {
    id: `BR-${String(reports.length + 1).padStart(3, "0")}`,
    title: $("bug-title").value.trim(),
    feature: $("bug-feature").value,
    severity: $("severity").value,
    priority: $("priority").value,
    steps: $("steps").value.trim(),
    expected: $("expected").value.trim(),
    actual: $("actual").value.trim(),
    evidence: $("evidence").value.trim(),
    createdAt: localTime()
  };
  reports.push(report);
  setReports(reports);
  renderReports();
  reportForm.reset();
  $("report-message").textContent = `Laporan ${report.id} disimpan di browser ini. Ekspor CSV untuk mengirimkannya kepada dosen.`;
});
function csvCell(value) {
  return '"' + String(value ?? "").replace(/"/g, '""') + '"';
}
$("export-btn").addEventListener("click", () => {
  const reports = getReports();
  if (!reports.length) {
    alert("Belum ada laporan untuk diekspor.");
    return;
  }
  const columns = ["id","title","feature","severity","priority","steps","expected","actual","evidence","createdAt"];
  const rows = [columns.join(","), ...reports.map(r => columns.map(k => csvCell(r[k])).join(","))];
  const blob = new Blob(["\uFEFF" + rows.join("\r\n")], {type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "bughunt-defect-reports.csv"; a.click();
  URL.revokeObjectURL(url);
});
$("clear-btn").addEventListener("click", () => {
  if (confirm("Hapus semua laporan yang tersimpan di browser ini? Tindakan ini tidak bisa dibatalkan.")) {
    localStorage.removeItem(STORAGE_KEY);
    renderReports();
    $("report-message").textContent = "Data laporan lokal telah dihapus.";
  }
});
renderReports();
