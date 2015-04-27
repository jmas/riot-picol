# riot-picol
RiotJS app example: Grab palette of colors from image.

# install
Install nodejs and bower components.
```
npm i
cd public/ && bower i
```

# development
```
npm i riot -g
```
Start watching `public/tags/*` for changes and auto build `public/tags.js`.
```
riot -w -m public/tags/ public/tags.js
```
Run server in development mode.
```
node bin/www
```

# production
Make `build` folder.
```
r.js -o build.js
```
Run server in production mode.
```
NODE_ENV=production node bin/www
```
