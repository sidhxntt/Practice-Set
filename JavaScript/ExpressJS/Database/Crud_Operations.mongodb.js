use('CRUD-DB');

db.createCollection( 'users' );

db.getCollection( "users" ).insertMany(
    [
        {
          "name": "Alice",
          "age": 25,
          "email": "alice@example.com",
          "address": {
            "street": "456 Elm St",
            "city": "Sometown",
            "state": "NY",
            "zipcode": "54321"
          },
          "phone_numbers": ["111-222-3333"],
          "is_active": true,
          "preferences": {
            "theme": "light",
            "language": "en"
          }
        },
        {
          "name": "Bob",
          "age": 35,
          "email": "bob@example.com",
          "address": {
            "street": "789 Oak St",
            "city": "Othertown",
            "state": "TX",
            "zipcode": "67890"
          },
          "phone_numbers": ["444-555-6666"],
          "is_active": false,
          "preferences": {
            "theme": "dark",
            "language": "fr"
          }
        },
        {
          "name": "Charlie",
          "age": 28,
          "email": "charlie@example.com",
          "address": {
            "street": "321 Pine St",
            "city": "Anothertown",
            "state": "CA",
            "zipcode": "13579"
          },
          "phone_numbers": ["777-888-9999"],
          "is_active": true,
          "preferences": {
            "theme": "light",
            "language": "es"
          }
        },
        {
          "name": "David",
          "age": 40,
          "email": "david@example.com",
          "address": {
            "street": "654 Birch St",
            "city": "Yetanothertown",
            "state": "FL",
            "zipcode": "24680"
          },
          "phone_numbers": ["222-333-4444"],
          "is_active": true,
          "preferences": {
            "theme": "dark",
            "language": "de"
          }
        },
        {
          "name": "Eve",
          "age": 22,
          "email": "eve@example.com",
          "address": {
            "street": "987 Maple St",
            "city": "Differenttown",
            "state": "WA",
            "zipcode": "97531"
          },
          "phone_numbers": ["555-666-7777"],
          "is_active": false,
          "preferences": {
            "theme": "light",
            "language": "it"
          }
        },
        {
          "name": "Frank",
          "age": 33,
          "email": "frank@example.com",
          "address": {
            "street": "135 Walnut St",
            "city": "Uniqueville",
            "state": "IL",
            "zipcode": "80246"
          },
          "phone_numbers": ["888-999-0000"],
          "is_active": true,
          "preferences": {
            "theme": "dark",
            "language": "jp"
          }
        },
        {
          "name": "Grace",
          "age": 29,
          "email": "grace@example.com",
          "address": {
            "street": "246 Cedar St",
            "city": "Specialtown",
            "state": "OH",
            "zipcode": "36912"
          },
          "phone_numbers": ["111-222-3333", "444-555-6666"],
          "is_active": true,
          "preferences": {
            "theme": "light",
            "language": "ru"
          }
        },
        {
          "name": "Henry",
          "age": 45,
          "email": "henry@example.com",
          "address": {
            "street": "369 Oak St",
            "city": "Remarkabletown",
            "state": "MI",
            "zipcode": "75319"
          },
          "phone_numbers": ["777-888-9999", "222-333-4444"],
          "is_active": false,
          "preferences": {
            "theme": "dark",
            "language": "pt"
          }
        },
        {
          "name": "Ivy",
          "age": 27,
          "email": "ivy@example.com",
          "address": {
            "street": "555 Pine St",
            "city": "Quirktown",
            "state": "CO",
            "zipcode": "80215"
          },
          "phone_numbers": ["555-666-7777", "888-999-0000"],
          "is_active": true,
          "preferences": {
            "theme": "light",
            "language": "kr"
          }
        },
        {
          "name": "Jack",
          "age": 32,
          "email": "jack@example.com",
          "address": {
            "street": "777 Elm St",
            "city": "Whimsytown",
            "state": "AZ",
            "zipcode": "96385"
          },
          "phone_numbers": ["111-222-3333", "777-888-9999"],
          "is_active": false,
          "preferences": {
            "theme": "dark",
            "language": "cn"
          }
        }
      ]
      
)