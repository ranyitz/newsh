CMD=""
WD="$PWD"
ARGS="$@"

if [ -d "$1" ]; then
    WD="$1"
    ARGS="${@:2}"
fi

if [ -n "$ARGS" ]; then
    CMD="$ARGS"
fi

    osascript <<EOF
tell application "iTerm2"
  tell current session of current window
    set new_session to split $SPLIT_DIRECTION with default profile
      tell new_session
        delay 1
		    write text "cd $WD;$CMD"
      end tell
  end tell
end tell
EOF
