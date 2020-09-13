#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$DECRYPTER_PASSPHRASE" \
--output ./frontend/.env ./.github/secrets/frontend.env.gpg 