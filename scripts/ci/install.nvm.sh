#!/bin/bash -e

NODE_VERSION=10

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh | bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install $NODE_VERSION
nvm use $NODE_VERSION
nvm alias default $NODE_VERSION