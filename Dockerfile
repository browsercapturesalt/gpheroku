FROM gitpod/workspace-full

RUN curl https://cli-assets.heroku.com/install-ubuntu.sh | sudo sh

COPY . .

RUN ls -l

CMD bash startserver.sh