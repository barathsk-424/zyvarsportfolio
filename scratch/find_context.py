import os

file_path = r'c:\Users\sk barath\OneDrive\Desktop\zyvarsportfolio\assets\index.js'
search_str = 'About'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        index = content.find(search_str)
        if index != -1:
            start = max(0, index - 300)
            end = min(len(content), index + 300)
            print(content[start:end])
        else:
            print("Not found")
else:
    print("File not found")
