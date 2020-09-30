#!/bin/sh

# Decrypt the file
ls -a


gpg --quiet --batch --yes --decrypt --passphrase="$DECRYPTER_PASSPHRASE" \
--output ./backend/.env ./.github/secrets/backend.env.gpg