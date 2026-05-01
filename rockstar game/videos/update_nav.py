import os
import re

directory = r"c:\Users\dpari\OneDrive\Desktop\rockstar game"

pattern = re.compile(r'(<div class="nav-actions">\s*<button class="search-btn"><i class="fas fa-search"></i></button>\s*)<a href="[^"]+" class="user-btn"><i class="far fa-user-circle"></i></a>(\s*</div>)')

replacement = r'\1<a href="login.jsp" class="login-btn-nav" style="color: black; background: white; padding: 8px 16px; border-radius: 20px; font-weight: 700; text-decoration: none; margin-left: 15px; font-size: 14px; transition: 0.3s;">Log In</a>\n                    <a href="signin.jsp" class="user-btn" style="margin-left: 15px;"><i class="far fa-user-circle"></i></a>\2'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith((".html", ".jsp")):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content, count = pattern.subn(replacement, content)
                
                if count > 0:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
            except Exception as e:
                pass
