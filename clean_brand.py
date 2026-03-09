import os
import glob

files = glob.glob('/Users/joelduran/Documents/GitHub/MacWaveT2/*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace both variations
    new_content = content.replace('Mac Wave T2', 'MacWave México')
    new_content = new_content.replace('MacWave T2', 'MacWave México')
    
    # Write back if changed
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(filepath)}")
