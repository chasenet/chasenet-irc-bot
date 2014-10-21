#! /bin/sh
# /etc/init.d/chasebot-service.sh

# Supplied by no-ip.com
# Modified for Debian GNU/Linux by Eivind L. Rygge <eivind@rygge.org>
# corrected 1-17-2004 by Alex Docauer <alex@docauer.net>

# . /etc/rc.d/init.d/functions  # uncomment/modify for your killproc

DAEMON=/usr/local/bin/chasebot
NAME=chasebot

test -x $DAEMON || exit 0

case "$1" in
    start)
    echo -n "Starting chasebot"
    start-stop-daemon --start --exec $DAEMON
    echo "Chasebot"
    ;;
    stop)
    echo -n "Shutting down chasebot"
    start-stop-daemon --stop --oknodo --retry 30 --exec $DAEMON
    echo "Chasebot."
    ;;

    restart)
    echo -n "Restarting chasebot "
    start-stop-daemon --stop --oknodo --retry 30 --exec $DAEMON
    start-stop-daemon --start --exec $DAEMON
    echo "chasebot."
    ;;

    *)
    echo "Usage: $0 {start|stop|restart}"
    exit 1
esac
exit 0

