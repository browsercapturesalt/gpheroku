FROM ubuntu

RUN curl https://cli-assets.heroku.com/install-ubuntu.sh | sudo sh

CMD bash startserver.sh