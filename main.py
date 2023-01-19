from os import listdir, path, system

## Convert PDFs to TXT
target_pdfs = '<target_files_location>'

# for pdf_filename in target_pdfs:
    pdf_path = path.join('<target_files_location>', pdf_filename)
    cmd = f'python3 ./src/ttmik_iyagi_pdf/convert_pdf_to_txt.py {pdf_path}'
    print('\t'.join(['RUNNING:', cmd]))
    system(cmd)


