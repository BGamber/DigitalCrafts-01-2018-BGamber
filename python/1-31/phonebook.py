phonebook_dict = {
  'Alice': '703-493-1834',
  'Bob': '857-384-1234',
  'Elizabeth': '484-584-2923'
}

print phonebook_dict['Elizabeth']

phonebook_dict['Kareem'] = '938-489-1234'

if 'Alice' in phonebook_dict:
    del phonebook_dict['Alice']

phonebook_dict['Bob'] = '968-345-2345'

print phonebook_dict

ramit = {
  'name': 'Ramit',
  'email': 'ramit@gmail.com',
  'interests': ['movies', 'tennis'],
  'friends': [
    {
      'name': 'Jasmine',
      'email': 'jasmine@yahoo.com',
      'interests': ['photography', 'tennis']
    },
    {
      'name': 'Jan',
      'email': 'jan@hotmail.com',
      'interests': ['movies', 'tv']
    }
  ]
}

print ramit['email']
print ramit['interests'][0]
for friend in ramit['friends']:
    if friend['name'] == 'Jasmine':
         print friend['email']
for friend in ramit['friends']:
    if friend['name'] == 'Jan':
        print friend['interests'][1]

