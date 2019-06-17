## Test Task - Node REST API

### Description
- CRUD manipulations over the authors and their books
https://en.wikipedia.org/wiki/Create,_read,_update_and_delete

### Database structure
#### Author's fields
- first name
- last name
- birthday
- created at
- updated at

#### Book's fields
- title
- author
- iban
- published at
- created at
- updated at

### Task performance levels
1. CRUD logic
2. Linter + code formating
3. Validation
4. Tests

### Required packages:
```
git
node": 8.9.*
npm": >= 6.4
typescript: 3.1.*
ts-node: >= 7
framework: https://docs.nestjs.com/first-steps
mongodb: >= 3.4
typeorm: @stable
dotenv: @stable
class-validator: @stable
class-transformer: @stable
```

### Additional packages:
```
@nestjs/swagger

"tsconfig-paths": "^3.7.0",
"tslint": "^5.11.0",
"tslint-config-prettier": "^1.17.0"

"chai": "^4.2.0",
"mocha": "^5.2.0",
"sinon": "^7.1.1",
"supertest": "^3.3.0",

"nyc": "^13.1.0",
"prettier": "^1.15.2",

"nodemon": "^1.18.7",
```