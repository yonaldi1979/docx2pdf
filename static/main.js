function uploadFile() {
    let formData = new FormData(document.getElementById('uploadForm'));
    let progressContainer = document.getElementById('progressContainer');
    let progressBar = document.getElementById('progressBar');
    let downloadLink = document.getElementById('downloadLink');

    progressContainer.classList.remove('hidden');
    downloadLink.classList.add('hidden');

    fetch('/upload', {method: 'POST', body: formData})
        .then(response => response.json())
        .then(data => {
            checkProgress(data.file_id);
        })
        .catch(error => console.error('Upload gagal', error));
}

function checkProgress(fileId) {
    fetch(`/progress/${fileId}`)
        .then(response => response.json())
        .then(data => {
            let progressBar = document.getElementById('progressBar');
            progressBar.value = data.progress;

            if (data.progress < 100) {
                setTimeout(() => checkProgress(fileId), 500);
            } else if (data.file_name) {
                let downloadLink = document.getElementById('downloadLink');
                downloadLink.href = `/uploads/${data.file_name}`;
                downloadLink.classList.remove('hidden');
                refreshFileList();
            }
        })
        .catch(error => console.error('Gagal ambil progress', error));
}

function deleteFile(filename) {
    fetch(`/delete/${filename}`, {method: 'POST'})
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                refreshFileList();
            } else {
                alert('Gagal hapus file');
            }
        });
}

function refreshFileList() {
    fetch('/')
        .then(response => response.text())
        .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, 'text/html');
            let newFileList = doc.getElementById('fileList').innerHTML;
            document.getElementById('fileList').innerHTML = newFileList;
        });
}
