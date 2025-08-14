console.log("拡張機能：まとめZIP自動生成版読み込み完了");

document.addEventListener("keydown", async (e) => {
    if (e.altKey && e.key.toLowerCase() === "z") {
        console.log("Alt+Z detected: Saving thread as ZIP...");
        await saveThreadAsZip();
    }
});

async function saveThreadAsZip() {
    if (typeof JSZip === "undefined") {
        alert("JSZipが読み込まれていません。本物の jszip.min.js に置き換えてください。");
        return;
    }
    const zip = new JSZip();
    const html = document.documentElement.outerHTML;
    zip.file("full_thread.html", html);
    zip.file("handover_meta.txt", "このスレッドの要約や引き継ぎ用メモが入ります。");

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thread_backup.zip";
    a.click();
    URL.revokeObjectURL(url);
}
