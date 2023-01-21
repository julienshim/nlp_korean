from os import listdir, path, system

## Convert PDFs to TXT
target_pdfs = '<target_files_location>'

# for pdf_filename in target_pdfs:
    pdf_path = path.join('<target_files_location>', pdf_filename)
    cmd = f'python3 ./src/ttmik_iyagi_pdf/convert_pdf_to_txt.py {pdf_path}'
    print('\t'.join(['RUNNING:', cmd]))
    system(cmd)

# Generate Vocabulary Lists for From PDF Converted TXT
target_txts = list(map(lambda x: x.replace('.pdf', '.txt'), target_pdfs))
for txt_filename in target_txts[0:2]:
    txt_path = path.join('<target_files_location>', txt_filename)
    cmd = f'python3 ./src/generate_vocab_csv_from_txt.py {txt_path}'
    print('\t'.join(['RUNNING:', cmd]))
    system(cmd)

# Generate Vocabulary Lists for Manually Created TXT
target_txts_special = '<target_files_location>'
for txt_filename in target_txts_special[0:2]:
    txt_path = path.join('<target_files_location>', txt_filename)
    cmd = f'python3 ./src/generate_vocab_csv_from_txt.py {txt_path}'
    print('\t'.join(['RUNNING:', cmd]))
    system(cmd)




