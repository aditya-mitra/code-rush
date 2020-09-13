#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$DECRYPTER_PASSPHRASE" \
--output ./backend/.env ./.github/secrets/backend.env.gpg 