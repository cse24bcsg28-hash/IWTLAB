import os

directory = r"c:\Users\dpari\OneDrive\Desktop\rockstar game"

for file in os.listdir(directory):
    if file.endswith('.html'):
        filepath = os.path.join(directory, file)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace('href="login.jsp"', 'href="login.html"')
            new_content = new_content.replace('href="signin.jsp"', 'href="signin.html"')
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
        except Exception as e:
            pass
