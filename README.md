# typescript2-almond
Proof-of-concept for a TypeScript 2 project using AlmondJS and RequireJS to bundle and minify sources.

# Why AlmondJS
I've made this example to show a working project using AlmondJS in combination with TypeScript. You could easily bypass AlmondJS and include RequireJS if you like but that's not the goal here. And I've found more often than not that I want to bundle all my JavaScript files into 1 and have the browser download it in 1 single pass instead of having to first load RequireJS and then have RequireJS do another request to load the rest of the script.
The reason I've made this example is because I've got some older projects which are using AlmondJS as module runner and I wanted to use TypeScript in those projects.
Everything is working quite well except for using node_modules dependencies. Where as with Webpack those dependencies are compiled correctly and automagically this is not the case when using RJS optimizer and AlmondJS. RJS optimizer has no notion of node_modules so in order for it to work correctly you'll have to copy the imported dependency to the working folder in order for RJS to find it and bundle it with the rest of your code.
This really prevents you from easily plugging in 3rd party dependencies.

# Conclusion
If you write all the code yourself then go ahead and use it and you'll find no problems with it. But if you rely on 3rd party plugins installed via NPM then I can only recommend against using RJS/Almond.
