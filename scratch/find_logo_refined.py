
import os

file_path = r'c:\Users\sk barath\OneDrive\Desktop\zyvarsportfolio\assets\index.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

indices = [i for i in range(len(content)) if content.startswith('logo.png', i)]
for idx in indices:
    start = max(0, idx - 100)
    end = min(len(content), idx + 100)
    print(f"Match at {idx}: ...{content[start:end]}...")
