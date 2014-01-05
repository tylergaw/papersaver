# Papersaver

Self hosting for drawings from [Paper](http://www.fiftythree.com/paper)

### How do I use this?

 1. Draw rad or not-so-rad things in the [Paper](http://www.fiftythree.com/paper) app on my iPad
 2. Email those images to a dedicated Gmail address I created just for this
 3. I have a NodeJS script running on my server that listens for new email to that address
 4. When I new email is received, the script grabs the image attachment and hands it off to Papersaver.js
 5. Papersaver creates a new directory in the contents folder of the site and creates a new markdown page for the image
 6. Wintersmith then rebuilds the markdown pages into html
 7. The new files are added, committed, and pushed to the Git repo
 8. My pretty or ugly drawings are then available at [http://lab.tylergaw.com/papers](http://lab.tylergaw.com/papers)

### Why did I do this?

I wanted a place on the Web for all of my little sketches to live. I did not want
to use Tumblr, Twitter, Flickr or any other third-party to be the canonical location
of all the images. Also for fun.

### What did I use?

 - [nvm](https://github.com/creationix/nvm) - To pretend I actually know or have the version of Node I need
 - [Wintersmith](https://github.com/jnordberg/wintersmith) - Static site generator in Node
   - http://davidtucker.net/articles/introduction-to-wintersmith
 - [Mail-listener2](https://github.com/chirag04/mail-listener2) - Great little package for getting mail through IMAP
 - [Optimist](https://github.com/substack/node-optimist) - To process args in the Papersaver CLI
 - [Forever](https://github.com/nodejitsu/forever) - To keep the mail listener script running

### What did I learn?

 - Learned how to use [Wintersmith](https://github.com/jnordberg/wintersmith) to generate static sites.
 - Learned the basics of [Grunt](http://gruntjs.com/) and used it to watch/compile Sass to CSS.
 - Leanred how to use npm's `--save`, `--save-optional`, and ``--save-dev` to keep `package.json` tidy.
