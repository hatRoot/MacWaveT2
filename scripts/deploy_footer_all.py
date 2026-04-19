import glob
import os

def sync_all_footers():
    base_dir = '/Users/joelduran/Documents/GitHub/MacWaveT2'
    
    with open(os.path.join(base_dir, 'index.html'), 'r', encoding='utf-8') as f:
        master_content = f.read()
    
    start_tag = '<footer class="main-footer">'
    end_tag = '</footer>'
    
    start_idx = master_content.find(start_tag)
    end_idx = master_content.find(end_tag, start_idx) + len(end_tag)
    
    # Grab the whole footer chunk from the newly modified index.html
    new_footer_chunk = master_content[start_idx:end_idx]

    # Find all HTML files in the root dir
    all_html_files = glob.glob(os.path.join(base_dir, '*.html'))
    
    for filepath in all_html_files:
        if 'index.html' in filepath:
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            target_content = f.read()
            
        t_start_idx = target_content.find(start_tag)
        if t_start_idx == -1:
            continue
            
        t_end_idx = target_content.find(end_tag, t_start_idx) + len(end_tag)
        
        # Replace the old footer in target with the new_footer_chunk
        final_content = target_content[:t_start_idx] + new_footer_chunk + target_content[t_end_idx:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(final_content)
            
        print(f"Sincronizado: {os.path.basename(filepath)}")

sync_all_footers()
