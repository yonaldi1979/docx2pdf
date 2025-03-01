from flask import Flask, request, send_file, render_template
import os
import uuid
import subprocess

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return "Tidak ada file yang dipilih"

        file = request.files['file']
        if file.filename == '':
            return "Nama file kosong"

        if file:
            # Simpan file DOCX
            docx_filename = f"{uuid.uuid4()}_{file.filename}"
            docx_path = os.path.join(UPLOAD_FOLDER, docx_filename)
            file.save(docx_path)

            # Path hasil PDF
            pdf_filename = docx_filename.replace(".docx", ".pdf")
            pdf_path = os.path.join(UPLOAD_FOLDER, pdf_filename)

            try:
                # Konversi pakai LibreOffice CLI
                subprocess.run([
                    "soffice",
                    "--headless",
                    "--convert-to", "pdf",
                    "--outdir", UPLOAD_FOLDER,
                    docx_path
                ], check=True)

                return send_file(pdf_path, as_attachment=True)

            except subprocess.CalledProcessError as e:
                return f"Konversi gagal: {str(e)}"

    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
