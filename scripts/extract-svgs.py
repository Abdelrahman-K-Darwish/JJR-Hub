import re, glob, hashlib, json

svg_re = re.compile(r'<svg\b[^>]*>.*?</svg>', re.S)
inner_shape_re = re.compile(r'<(path|circle|line|polyline|polygon|rect|ellipse)\b[^>]*/?>', re.S)

seen = {}
for fname in sorted(glob.glob('legacy/*.html')):
    content = open(fname, encoding='utf-8').read()
    for m in svg_re.finditer(content):
        svg = m.group(0)
        shape_tags = inner_shape_re.finditer(svg)
        norm_parts = []
        for st in shape_tags:
            tag = st.group(0)
            tag2 = re.sub(r'\s(fill|stroke|class|id)="[^"]*"', '', tag)
            norm_parts.append(tag2.strip())
        key = '|'.join(norm_parts)
        if not key:
            continue
        h = hashlib.md5(key.encode()).hexdigest()[:10]
        if h not in seen:
            seen[h] = {'count': 0, 'norm': norm_parts}
        seen[h]['count'] += 1

WANTED = ['64e48d4cf6','838eb19232','987e82d9bb','fb0a50fee2','be20056019','c47193400a',
'1a6ee86ded','18459384ef','5c922f88b8','68d04f0e9a','9279d688a2','5fc92aeca9','a4c0802aa8',
'1994a5a6c1','c76943ba87','34647cbdc2','c00259f72c','8c3e288118','7471190d28','d4716d3f10',
'f87fe91cb7','c5f0bb52d7','b2ed3b0dc6','b41ff4b584','944db5405a','81a7095e37','c528598e5b',
'd4aadf187f','03e183c754','48101e3d1e','34d1a5888f','235b7cef13','39c399a831','1e5396b4f4',
'c5e1534567','2006b37645','f343045cb7','b8a850ee9d','fa1c8eef01']

for h in WANTED:
    print(f"{h}: {json.dumps(seen[h]['norm'])}")
