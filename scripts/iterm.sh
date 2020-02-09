CMD=""
WD="$PWD"
args="$@"

if [ -d "$1" ]; then
    WD="$1"
    args="${@:2}"
fi

if [ -n "$args" ]; then
    CMD="$args"
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
