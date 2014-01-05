# Papersaver

Self hosting for drawings from [Paper](http://www.fiftythree.com/paper)

### How am I using this?

 1. Draw rad or not-so-rad things in the [Paper](http://www.fiftythree.com/paper)
 app on my iPad
 2. Email those images to a dedicated Gmail address I created just for this
 3. I have a Node script running on my server that listens for new email to
 that address
 4. When I new email is received, the script grabs the image attachment and hands
 it off to Papersaver.js
 5. Papersaver creates a new directory in the contents folder of the site and
 creates a new markdown page for the image
 6. Wintersmith then rebuilds the markdown pages into html
 7. The new files are added, committed, and pushed to the Git repo
 8. My pretty or ugly drawings are then available at [http://lab.tylergaw.com/papers](http://lab.tylergaw.com/papers)

### Why did I do this?

I wanted a place on the Web for all of my little sketches to live. I did not want
to use Tumblr, Twitter, Flickr or any other third-party to be the canonical location
of all the images. Also for fun.

### What did I use?

 - [nvm](https://github.com/creationix/nvm) - To pretend I actually know or have
 the version of Node I need
 - [Wintersmith](https://github.com/jnordberg/wintersmith) - Static site generator
 in Node
   - http://davidtucker.net/articles/introduction-to-wintersmith
 - [Mail-listener2](https://github.com/chirag04/mail-listener2) - Great little
 package for getting mail through IMAP
 - [Optimist](https://github.com/substack/node-optimist) - To process args in the
 Papersaver CLI
 - [Forever](https://github.com/nodejitsu/forever) - To keep the mail listener
 script running till the cows come home, and then some.

### What did I learn?

 - Learned how to use [Wintersmith](https://github.com/jnordberg/wintersmith) to
 generate static sites.
 - Learned the basics of [Grunt](http://gruntjs.com/) and used it to watch/compile
 Sass to CSS.
 - Leanred how to use npm's `--save`, `--save-optional`, and ``--save-dev` to keep
 `package.json` tidy.

### Setup

Before anything you'll need to go through the rigamoral of making sure Node is
setup correctly. Papersaver was built using node 0.10.24.

 1. Clone the repo, navigate to the papersaver directory
 2. Install node dependencies: `npm install` That will install all the dependencies,
 optional, and dev dependencies.
 3. You should be able to preview the site now with Wintersmith's preview server:
 `wintersmith preview`.
 If everything is in place go to `http://localhost:8080/papers/` to see it.
 4. Are you working on the CSS? Run `grunt watch`. That will look for any changes
 to `sass` files and recompile them to `css` files.
 5. All good? Let's head on to flavor country.

### Usage

#### Adding new Papers via cli

 1. `node papersaver-cli.js -i /path/to/local/image.jpg -g false`. The `-g false`
 will keep Papersaver from adding, committing, and pushing the new files to the Git repo.
 2. If there are no errors, refresh the page. You should see the `/path/to/local/image.jpg`
 3. That command created the new files and built the static site with `wintersmith build -X`.
 Don't believe me? Check the contents of `/papersaver/build`. See the numbered directory?
 That's the Paper just added. Run that same command again and you'll get another
 one. Boosh! Computers!
 4. The cli can be used as the only method of adding new Papers, but let's look at
 another, more automated way of doing so.

#### Adding new Papers via email

Paper (the app) allows you to email sketches. We're going to send
sketches to a specified email address and they'll then be saved with Papersaver.

 1. Highly recommended step 1: Create a new email address that will only be used
 for this. You'll be accessing this account programmatically with IMAP, while
 your server should be set up in a secure way,
 there's always a chance that the account could be compromised. It
 only takes a few minutes to set up a new, dedicated Gmail–or other free account.
 2. On your new email account enable IMAP (you made a new account right?).
 3. Create a mail settings file named `mail-settings.json` in the root dir. There
 is a sample settings file `mail-settings.sample.json` to base it off.
 4. Note the settings `fromWhitelist` and `toWhitelist`. You should use those to
 provide a little bit of security against anyone adding anything to your Papers.
 5. The `toWhitelist` is the best chance of keeping things secure. Your main email
 can be found `you.papersaver@gmail.com`, but if you restrict things to a modified
 version it's less likely to be found. I use a `+` modifier like; `myaddr+hardthingtoguess@gmail.com`.
 6. Note that `mail-settings.json` is ignored by git so you'll need to recreate that
 file on all servers that you deploy Papersaver. You do not want that settings file
 added to any kind of public repo.
 7. `papersaver-mail-listener.js` needs to stay running on your server. If it isn't
 running it won't know when new emails come in.
 8. You'll need to keep the process running in the background. There are a few
 ways to do this; screen, tmux, nohup, bunch more that I don't know about. I'm
 using screen.
 9. In a new shell: `screen`
 10. Navigate to the directory where `papersaver-mail-listener.js` lives.
 11. I'm using Forever to run the process. It's not completely necessary, could just
 run the script with `node`, but I'm interested in how I can use Forever in the
 future.
 12. Start the process with `forever papersaver-mail-listener.js`. When you see
 "Connected to IMAP server, listening for mail." you're up and running. Feel free
 to close that shell. The process will stay running. Like the cli script, you can
 also use the `-g` flag to supress Git updating. `forever papersaver-mail-listener.js -g false`
 13. Hop over to your iPad(s) that you'll use Paper.
 14. Add a new contact with the email address(s) that you specified in `toWhitelist`.
 Helps to give it a name. I use "Paper Saver".
 15. Getting close to computer magic now. Open up Paper.
 16. Using the Share menu of a page, select "Send Email"
 17. Add the Paper Saver address to the to field. Boosh!
 18. Allow some time for the email to arrive, then refresh the preivew site. If
 things went right you should see the saved Paper!
 19. When the email was received, step 3 in the cli usage happens.

If the Paper didn't show up, double check that your `fromWhitelist` and `toWhitelist`
settings match the email address you sent the page from and to.

#### Serving the static site

In the usage examples, I was looking at the Wintersmith preview site. That's not
the actual site that will be shown. Here's how I'm hosting the built site.

 1. I'm running an Nginx on Rackspace VPS.
 2. Every setup is going to be a little different, but the main thing I'm doing
 is using an Nginx server conf to set the `build` directory as the webroot of
 `http://lab.tylergaw.com/papers/`.

Here's a truncated version of the conf

    server {
      listen 80;
      server_name lab.tylergaw.com;
      ...
      location /papers {
        alias /path/to/public/files/papersaver/build/papers/;
      }
      ...
    }

