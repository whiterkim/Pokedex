import os

files = os.listdir('.')
names = []
rows = 36
for i in range(1, rows + 1):
    columns = 37 if i != 36 else 11
    for j in range(1, columns + 1):
        name = 'row-' + str(i) + '-column-' + str(j) + '.png'
        names.append(name)

g1Forms = {
    3: 1,
    6: 2,
    9: 1,
    15: 1,
    18: 1,
    19: 1,
    20: 1,
    25: 8,
    26: 1,
    27: 1,
    28: 1,
    37: 1,
    38: 1,
    50: 1,
    51: 1,
    52: 2,
    53: 1,
    58: 1,
    59: 1,
    65: 1,
    74: 1,
    75: 1,
    76: 1,
    77: 1,
    78: 1,
    79: 1,
    80: 2,
    83: 1,
    88: 1,
    89: 1,
    94: 1,
    100: 1,
    101: 1,
    103: 1,
    105: 1,
    110: 1,
    115: 1,
    122: 1,
    127: 1,
    128: 3,
    130: 1,
    142: 1,
    144: 1,
    145: 1,
    146: 1,
    150: 2,
}
g2Forms = {
    157: 1,
    181: 1,
    194: 1,
    199: 1,
    201: 27,
    208: 1,
    211: 1,
    212: 1,
    214: 1,
    215: 1,
    222: 1,
    229: 1,
    248: 1,
}
g3Forms = {
    254: 1,
    257: 1,
    260: 1,
    263: 1,
    264: 1,
    282: 1,
    302: 1,
    303: 1,
    306: 1,
    308: 1,
    310: 1,
    319: 1,
    323: 1,
    334: 1,
    351: 3,
    354: 1,
    359: 1,
    362: 1,
    373: 1,
    376: 1,
    380: 1,
    381: 1,
    382: 1,
    383: 1,
    384: 1,
    386: 3,
}
g4Forms = {
    412: 2,
    413: 2,
    421: 1,
    422: 1,
    423: 1,
    428: 1,
    445: 1,
    448: 1,
    460: 1,
    475: 1,
    479: 5,
    483: 1,
    484: 1,
    487: 1,
    492: 1,
    493: 17,
}
g5Forms = {
    503: 1,
    531: 1,
    549: 1,
    550: 2,
    554: 1,
    555: 3,
    562: 1,
    570: 1,
    571: 1,
    585: 3,
    586: 3,
    618: 1,
    628: 1,
    641: 1,
    642: 1,
    645: 1,
    646: 2,
    647: 1,
    648: 1,
    649: 4,
}
g6Forms = {
    666: 19,
    669: 4,
    670: 5,
    671: 4,
    676: 9,
    678: 1,
    681: 1,
    705: 1,
    706: 1,
    710: 3,
    711: 3,
    713: 1,
    716: 1,
    718: 1,
    719: 1,
    720: 1,
}
g7Forms = {
    724: 1,
    741: 3,
    745: 2,
    476: 1,
    800: 3,
    801: 1,
}
g8Forms = {
    845: 2,
    849: 1,
    869: 8,
    875: 1,
    876: 1,
    877: 1,
    888: 1,
    889: 1,
    890: 1,
    893: 1,
    898: 2,
    902: 1,
    905: 1,
}
g9Forms = {
    916: 1,
    925: 1,
    931: 3,
    964: 1,
    978: 2,
    999: 1,
    1007: 1,
    1008: 1,
}

pokedexIndex = 0
form = 0
results = []
nameIndex = 0
while nameIndex < len(names):
    if pokedexIndex in g1Forms.keys():
        forms = g1Forms[pokedexIndex]
    elif pokedexIndex in g2Forms.keys():
        forms = g2Forms[pokedexIndex]
    elif pokedexIndex in g3Forms.keys():
        forms = g3Forms[pokedexIndex]
    elif pokedexIndex in g4Forms.keys():
        forms = g4Forms[pokedexIndex]
    elif pokedexIndex in g5Forms.keys():
        forms = g5Forms[pokedexIndex]
    elif pokedexIndex in g6Forms.keys():
        forms = g6Forms[pokedexIndex]
    elif pokedexIndex in g7Forms.keys():
        forms = g7Forms[pokedexIndex]
    elif pokedexIndex in g8Forms.keys():
        forms = g8Forms[pokedexIndex]
    elif pokedexIndex in g9Forms.keys():
        forms = g9Forms[pokedexIndex]
    else:
        forms = 0

    for form in range(forms + 1):
        result = {}
        result['index'] = nameIndex
        result['pokedexIndex'] = pokedexIndex
        result['form'] = form
        result['name'] = names[nameIndex]
        results.append(result)

        # print('%6d%6d-%2d    %s' % (nameIndex, pokedexIndex, form, names[nameIndex]))

        nameIndex += 1

    pokedexIndex += 1

    # if nameIndex > 1200:
    #     break

# print(results[-50:])

renameList = []
for result in results:
    oldName = result['name']
    newName = str(result['pokedexIndex'])
    if result['form'] != 0:
        newName += ('-' + str(result['form']))
    newName += '.png'

    renameList.append({'oldName': oldName, 'newName': newName})

    os.rename(oldName, newName)

# print(renameList[:50])
