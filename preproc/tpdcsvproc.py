import csv
import re
import json # sina wile pana e ijo json la sina toki sama "json.dumps({dict})"

f = open("./dictionary.csv") # pali sin tan lipu "dictionary.ods"
l = []
for i in csv.reader(f):
    l.append(i)
f.close()

#for i in l:
#    print(i)

otmd = {}
otmd["words"] = []
#'''
for i in range(len(l)):
    w = {} # wan ni li lon insa poki pi nimi mute. ala li wile sona e nimi pi wan ni. 
    
    w["entry"] = {}
    w["entry"]["id"] = i
    w["entry"]["form"] = re.sub("\s+or\s+"," or ",l[i][0])

    w["translations"] = []

    for r in re.split("\n",l[i][1]):
        t = {} # selo ni li sama ijo "w" li poki pi nimi mute lon toki ante.
        g = re.match("(PRE\s?-\s?VERB||[A-Z]+)\s(.+)",r).groups()
        t["title"] = re.sub("PRE\s?-\s?VERB","PRE-VERB",g[0])
        t["forms"] = [g[1]]
        w["translations"].append(t)

    otmd["words"].append(w)
    #print(l[i][0])

fo = open("./dictionary.csv.json","w")
fo.write(json.dumps(otmd))
fo.close()

print("pali ale li pini. o lukin e lipu pali. ona li pona la mi wile lape.")
#   ''' 
