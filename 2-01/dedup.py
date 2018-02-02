groceryList = ["spam", "eggs", "spam", "milk", "spam", "cheese", "spam"]
dedupList = []

for item in groceryList:
    if item not in dedupList:
        dedupList.append(item)

print dedupList