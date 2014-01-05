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

### Setup

Before anything you'll need to go through the rigamoral of making sure Node is
setup correctly. Papersaver was built using node 0.10.24.

 1. Clone the repo, navigate to the papersaver directory
 2. Install node dependencies: `npm install` That will install all the dependencies,
 optional, and dev dependencies.
 3. You should be able to preview the site now with Wintersmith's preview server: `wintersmith preview`.
 If everything is in place go to `http://localhost:8080/papers/` to see it.
 4. Are you working on the CSS? Run `grunt watch`. That will look for any changes to `sass` files
 and recompile them to `css` files.
 5. All good? Let's head on to flavor country.

### Usage

#### Adding new Papers via papersaver-cli

 - `node papersaver-cli.js -i /path/to/local/image.jpg -g false`. The `-g false`
 will keep Papersaver from adding, committing, and pushing the new files to the Git repo.
 - If there are no errors, refresh the page. You should see the `/path/to/local/image.jpg`
 - That command created the new files and built the static site with `wintersmith build -X`.
 Don't believe me? Check the contents of `/papersaver/build`. See the numbered directory? That's
 the Paper just added. Run that same command again and you'll get another one. Boosh! Computers!
 - The CLI can be used as the only method of adding new Papers, but let's look at another,
 more automated way of doing so.

#### Adding new Papers via email

Paper (the app) allows you to email sketches. We're going to send
sketches to a specified email address and they'll then be saved with Papersaver.

 - Highly recommended step 1: Create a new email address that will only be used for this.
 You'll be accessing this account programmatically over IMAP, while your server
 should be set up in a secure way,
 there's always a chance that the account could be compromised. It
 only takes a few minutes to set up a new, dedicated Gmail–or other free account.
 - On your new email account (you made one right?) Enable IMAP.
