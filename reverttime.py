### Changes the accessed and modified times to match the date recorded in the
### contents of each file, in cases where file update times have been
### inaccurately updated in the case of a git clone/pull to a new device etc

import os
import datetime
import time

def listdir_fullpath(d):
    return [os.path.join(d, f) for f in os.listdir(d)]

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

folder = "C:\\Users\\david.odonohue\\Videos\\Project\\Website\\promathean.github.io"

for file in listdir_fullpath(folder):
    if file.endswith(".html"):
        fp = open(file, "r")
        content = fp.readlines()
        for line in content:
            if "Last updated:" in line:
                l = line.split(" ")
                index = line.index("Last updated:")
                year = int(l[5][:-6])
                month = int(months.index(l[4])) + 1
                day = int(l[3])
                date = datetime.datetime(year=year, month=month, day=day, hour=0, minute=0, second=0)
                modTime = time.mktime(date.timetuple())
                os.utime(file, (modTime, modTime))