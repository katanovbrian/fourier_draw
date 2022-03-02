from math import *
import os
from xml.dom import minidom
import svg.path

# MAX VECTOR VALUES
MAX_VALUE = 800

p = ""
# OPEN RAW DATAS FILE
fpath = f"svgs/{p}.svg"
f = open(fpath, "r")
doc = minidom.parse(f)  # parseString also exists
path_strings = [path.getAttribute('d') for path
                in doc.getElementsByTagName('path')]

doc.unlink()
f.close()

# parse  path
path_strings = path_strings[0]
path = svg.path.parse_path(path_strings)

def f(t):
    return path.point(t)

t = 0
dt = .0001
pts = []
maximum = 0
while(t<1):
    y = f(t)
    pts.append(y)
    maximum = max(maximum,abs(y))
    t = t + dt

# CREATE END STRING
textReturn = f"let drawing_{p} = [\n"

for c in pts:
    textReturn += "    {re: " + str(MAX_VALUE*c.real/maximum) + ", im: " + str(MAX_VALUE * c.imag/maximum) + "},\n"
textReturn += "];"


# OUTPUT TO DATAS FILE
f2 = open(f"drawing_{p}.js", "w")
f2.write(textReturn)
f2.close()


# SUCCESS
print(f"SUCCESS converting SVG file to JS file: drawing_{p}.js")
