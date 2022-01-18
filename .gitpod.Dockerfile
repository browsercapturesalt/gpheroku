FROM gitpod/workspace-full

RUN curl https://cli-assets.heroku.com/install-ubuntu.sh | sudo sh

RUN gp env

RUN eval ${gp env -e)
