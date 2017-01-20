ATTENTION: Time Blob is in early development; many parts of the prototype are not yet functional.

# Time Blob
Time Blob is a free<sup>*</sup> time tracking web app. We are building it for [Sandstorm](https://sandstorm.io), an open source platform for Linux servers. Once you install Time Blob on your server, you can then access the app via web browser from any computer or phone.

Once we have a working prototype (which we do not yet have), there are few things to note about how to get started using Time Blob. As a prerequisite _you'll need your own Linux server_. Then you'll need to install Sandstorm. Once Sandstorm is installed, you'll be able to go the Sandstorm App Market, find Time Blob, and click install. Then you should be seconds away from up and running.

We'd love it if you are interested in helping develop Time Blob. Contact [David](mailto:david@dkieffer.xyz), or keep reading to dive right in.

# How to develop

Clone the repo:
```
git clone https://github.com/dkieffer/timeblob.git
cd timeblob
```

You need the following things installed:
* Python 2.7
* Node.js
* GNU Make
* GNU/Linux or Mac OS

Run the following command to prepare your directory:

```
make prepare
```

## How to develop locally (without Sandstorm)

For most development, Sandstorm's Vagrant startup is just too slow. If you can do your
development without Sandstorm we highly recommend it.

### Run tests
Timeblob has tests for the Django web service and for Angular. You can run all running:
```
make test
```

If you'd like to run just the Django tests, run:

```
make pytest
```

Or the Angular tests, run:

```
make jstest
```

### Run Timeblob for testing

Run the following command:

```
make
```

You can then go to http://localhost:8000 and explore Timeblob


## How to develop locally on Sandstorm

Follow instructions at https://docs.sandstorm.io/en/latest/vagrant-spk/installation/ to install vagrant-spk and its requirements.


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


<sup>*</sup> Open Source, AGPLv3, see license for details
