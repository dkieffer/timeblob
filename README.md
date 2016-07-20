# Time Blob
Time Blob is a time tracker designed for [Sandstorm.io](https://sandstorm.io)

Check out [the project overview](/project-overview.md) to see an outline of what we are developing, and what we want to add.

The project is currently in a prototyping phase. To see the where we are at with the prototype simply open index.html in your browser. For the prototype we are using Javascript and JQuery. Contact [David](mailto:david@polyhedral.studio) if you are interested in getting involved.


# How to develop
Follow instructions at https://docs.sandstorm.io/en/latest/vagrant-spk/installation/ to install vagrant-spk and its requirements.

Clone the repo:
```
git clone https://github.com/dkieffer/timeblob.git
cd timeblob
```

Start up the dev version of Sandstorm:
```
vagrant-spk vm up
```
(You'll need to do that everytime you modify `./sandstorm/setup.sh`)

You can access your dev version of Sandstorm at http://local.sandstorm.io:6080

Add Timeblob to your dev version of Sandstorm

```
vagrant-spk dev
```

### Running tests
Before sending a commit, please consider adding tests to verify functionality.

... Information about how to install pip and other silliness ...

Once you have the requirements installed, please run the following to run the tests:

```
./manage.py tests
```

Everything should pass.
