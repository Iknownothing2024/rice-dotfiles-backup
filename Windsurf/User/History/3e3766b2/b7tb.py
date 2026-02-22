import os
import json
import re

# 配置路径
SOURCE_DIR = './public/shitsays'  # 你的 md 文件存放目录
OUTPUT_FILE = './public/shitsays/ShitSaysData.json'

def parse_md_file(filename, filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 使用正则匹配 Frontmatter (--- ... ---)
    # 匹配模式：开始的 ---，中间的内容，结束的 ---，以及剩下的正文
    pattern = re.compile(r'^---\s*\n(.*?)\n---\s*\n(.*)', re.DOTALL)
    match = pattern.match(content)

    entry = {
        "id": filename.replace('.md', ''),
        "date": "",
        "author": "Unknown",
        "content": content.strip()
    }

    if match:
        frontmatter_raw = match.group(1)
        entry["content"] = match.group(2).strip()
        
        # 解析元数据
        for line in frontmatter_raw.split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip().lower()
                value = value.strip().strip('"').strip("'")
                if key in entry or key == "date" or key == "author":
                    entry[key] = value

    return entry

def build_json():
    all_entries = []
    
    if not os.path.exists(SOURCE_DIR):
        print(f"错误: 找不到目录 {SOURCE_DIR}")
        return

    for filename in os.listdir(SOURCE_DIR):
        if filename.endswith('.md'):
            print(f"正在处理: {filename}")
            filepath = os.path.join(SOURCE_DIR, filename)
            entry = parse_md_file(filename, filepath)
            all_entries.append(entry)

    # 在存入 JSON 前直接排好序（日期从新到旧）
    # 这样前端连 .sort() 都省了
    all_entries.sort(key=lambda x: x['date'], reverse=True)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_entries, f, ensure_ascii=False, indent=2)
    
    print(f"成功！已生成 {OUTPUT_FILE}，包含 {len(all_entries)} 条数据。")

if __name__ == "__main__":
    build_json()