# run electron app
# npm install electron -g
# npm start

# use webpack to build reactjs
# npm install webpack webpack-cli -g
# build reactjs -> webpack --watch

# use koala app to build scss and js
# scss -> src/scss/style.scss => output path: src/public/css/style.css
# js -> src/js/<filename.js> => output path: src/public/js/<filename.js>

#how to build app
# step1: build all scss and reactjs
# step2: remove file webpack.config.js
# step3: open file package.json and remove "devDependencies", "webpack"
# step5: npm run release