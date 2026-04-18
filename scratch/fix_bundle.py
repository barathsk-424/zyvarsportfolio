import os

file_path = r'c:\Users\sk barath\OneDrive\Desktop\zyvarsportfolio\assets\index.js'

with open(file_path, 'rb') as f:
    content = f.read()

# Fix encoding issues (searching for the byte patterns)
# â€“ (E2 80 93 in UTF-8, but if read as windows-1252/latin1 and written back)
# Actually, let's just do string replacement on the UTF-8 decoded content.
try:
    text = content.decode('utf-8')
    
    # Symbols
    text = text.replace('â€“', '–')
    text = text.replace('Â©', '©')
    
    # Resume links (mapping to /images/ as per user request)
    text = text.replace('resumeUrl:"/barath-resume.pdf"', 'resumeUrl:"./images/barath-resume.pdf"')
    text = text.replace('resumeUrl:"/jeeva-bharathi.pdf"', 'resumeUrl:"./images/jeeva-bharathi.pdf"')
    text = text.replace('resumeUrl:"/mokkesh.pdf"', 'resumeUrl:"./images/mokkesh.pdf"')
    
    # Image paths in root (using ./ is safer)
    text = text.replace('image:"/barath.png"', 'image:"./barath.png"')
    text = text.replace('image:"/jeeva.png"', 'image:"./jeeva.png"')
    text = text.replace('image:"/mokkesh.svg"', 'image:"./mokkesh.svg"')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Successfully patched index.js")
except Exception as e:
    print(f"Error: {e}")
